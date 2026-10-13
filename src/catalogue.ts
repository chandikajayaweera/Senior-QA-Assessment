import { chromium, request, type APIRequestContext, type Browser, type Page } from '@playwright/test';
import { appendFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { BASE_URL, writeJson, writeText } from './shared.js';
import { assessProduct, blockedProduct, parseProductsApi, reconcileCatalogueLinks, reconcileInventory, summarizeRows, type CatalogueRun, type DetailFacts,
  type InventoryValue, type ProductRow, type SourceRecord } from './catalogue-model.js';

// Structural selectors are necessary because product/image regions lack stable accessible names.
// Keep them centralized so a template change becomes an explicit parser failure, not a false pass.
const adapter = {
  cards: '.product-image-wrapper',
  cardName: '.productinfo p',
  cardPrice: '.productinfo h2',
  detailLink: 'a[href*="/product_details/"]',
  catalogueRegion: '.features_items',
  pagination: '.pagination a[href], a[rel="next"][href]',
  productRegion: '.product-information',
  productHeading: '.product-information h1, .product-information h2, .product-information [role="heading"]',
  productPrice: '.product-information > span > span',
  mainImage: '.view-product > img',
};
const transientStatuses = new Set([500, 502, 503, 504]);
const isTransientNetworkError = (error: unknown) => /ECONNRESET|ETIMEDOUT|ENOTFOUND|EAI_AGAIN|ERR_CONNECTION_RESET|ERR_CONNECTION_CLOSED|ERR_TIMED_OUT|Timeout.*exceeded|timed? out/i.test(error instanceof Error ? error.message : String(error));
class DeadlineError extends Error {}
class RateLimitError extends Error {}

class ControlledStarts {
  private tail: Promise<void> = Promise.resolve();
  private nextStart = 0;
  constructor(private readonly deadline: number, private readonly intervalMs: number) {}
  async start(): Promise<void> {
    const turn = this.tail.then(async () => {
      const delay = Math.max(0, this.nextStart - performance.now());
      if (performance.now() + delay >= this.deadline) throw new DeadlineError('Collection deadline reached before next controlled request.');
      if (delay) await new Promise<void>(done => setTimeout(done, delay));
      if (performance.now() >= this.deadline) throw new DeadlineError('Collection deadline reached.');
      this.nextStart = performance.now() + this.intervalMs;
    });
    this.tail = turn.catch(() => {});
    await turn;
  }
}

export type CatalogueOptions = {
  baseUrl?: string;
  outputDir?: string;
  collectionDeadlineMs?: number;
  reportTargetMs?: number;
  headless?: boolean;
};

export async function collectCatalogue(options: CatalogueOptions = {}): Promise<CatalogueRun> {
  const startedAt = new Date().toISOString();
  const start = performance.now();
  const collectionDeadlineMs = options.collectionDeadlineMs ?? 240000;
  const reportTargetMs = options.reportTargetMs ?? 270000;
  const deadline = start + collectionDeadlineMs;
  const baseUrl = options.baseUrl ?? BASE_URL;
  const runId = startedAt.replaceAll(':', '-').replaceAll('.', '-');
  const outputDir = resolve(options.outputDir ?? join('artifacts', 'catalogue', runId));
  const evidenceDir = join(outputDir, 'evidence');
  await mkdir(evidenceDir, { recursive: true });
  await writeText(join(outputDir, 'checkpoint.jsonl'), '');
  const limiter = new ControlledStarts(deadline, 1000);
  const serviceErrors: string[] = [];
  const source = (name: SourceRecord['name']): SourceRecord => ({
    name, status: 'blocked', httpStatus: null, observedAt: startedAt, urls: [], recordCount: 0, evidence: [],
  });
  const sources = [source('api'), source('catalogue')];
  let browser: Browser | undefined;
  let api: APIRequestContext | undefined;
  let apiValues: InventoryValue[] = [];
  const catalogueValues: InventoryValue[] = [];
  let rows: ProductRow[] = [];
  let stopReason: string | null = null;
  const environment: CatalogueRun['environment'] = {
    node: process.version, platform: process.platform, architecture: process.arch, baseUrl,
    browser: 'Chromium', headless: options.headless ?? true, timezone: 'UTC',
    inventorySnapshot: 'Start-of-run sources; no transactional snapshot across independent live surfaces.',
  };
  const remaining = (maximum: number) => {
    const available = Math.floor(deadline - performance.now());
    if (available <= 0) throw new DeadlineError('Collection deadline reached.');
    return Math.min(maximum, available);
  };
  const describe = (error: unknown) => error instanceof Error ? error.message : String(error);
  const handleStop = (error: unknown) => {
    if (error instanceof DeadlineError || error instanceof RateLimitError) stopReason ??= describe(error);
  };
  const rateLimited = (url: string, retryAfter: string | undefined) => {
    // Abort rather than issue further requests during the server's requested cooldown.
    throw new RateLimitError('HTTP 429 at ' + url + '; Retry-After: ' + (retryAfter ?? 'unspecified') + '. Collection stopped to respect rate limiting.');
  };
  const get = async (url: string, evidencePrefix: string) => {
    if (!api) throw new Error('API request context unavailable.');
    for (let attempt = 0; attempt < 2; attempt++) {
      if (stopReason) throw new DeadlineError(stopReason);
      await limiter.start();
      try {
        const response = await api.get(url, { timeout: remaining(8000), failOnStatusCode: false, maxRedirects: 5,
          headers: { 'Cache-Control': 'no-cache' } });
        await writeJson(join(evidenceDir, evidencePrefix + '-request-' + (attempt + 1) + '.json'), {
          checkedAt: new Date().toISOString(), method: 'GET', url, finalUrl: response.url(), httpStatus: response.status(),
          contentType: response.headers()['content-type'] ?? null, retryAfter: response.headers()['retry-after'] ?? null,
        });
        if (response.status() === 429) rateLimited(url, response.headers()['retry-after']);
        if (transientStatuses.has(response.status()) && attempt === 0) {
          await response.dispose();
          continue;
        }
        return response;
      } catch (error) {
        handleStop(error);
        if (error instanceof DeadlineError || error instanceof RateLimitError || attempt === 1 || !isTransientNetworkError(error)) throw error;
        await writeJson(join(evidenceDir, evidencePrefix + '-request-error-' + (attempt + 1) + '.json'), {
          checkedAt: new Date().toISOString(), method: 'GET', url, error: describe(error),
        });
      }
    }
    throw new Error('GET retry loop exhausted.');
  };
  const navigate = async (page: Page, url: string) => {
    const attempts: Array<{ attempt: number; checkedAt: string; httpStatus?: number; finalUrl?: string; error?: string }> = [];
    for (let attempt = 0; attempt < 2; attempt++) {
      if (stopReason) throw new DeadlineError(stopReason);
      await limiter.start();
      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: remaining(8000) });
        const httpStatus = response?.status() ?? null;
        attempts.push({ attempt: attempt + 1, checkedAt: new Date().toISOString(),
          ...(httpStatus !== null ? { httpStatus } : {}), finalUrl: page.url() });
        if (httpStatus === 429) rateLimited(url, response?.headers()['retry-after']);
        if (httpStatus !== null && transientStatuses.has(httpStatus) && attempt === 0) continue;
        return { httpStatus, attempts };
      } catch (error) {
        attempts.push({ attempt: attempt + 1, checkedAt: new Date().toISOString(), error: describe(error) });
        handleStop(error);
        if (error instanceof DeadlineError || error instanceof RateLimitError || attempt === 1 || !isTransientNetworkError(error)) throw error;
      }
    }
    throw new Error('Navigation retry loop exhausted.');
  };
  const screenshot = async (page: Page, filename: string): Promise<boolean> => {
    if (deadline - performance.now() < 1500) return false;
    try {
      await page.screenshot({ path: join(evidenceDir, filename), fullPage: false, timeout: remaining(1200) });
      return true;
    } catch { return false; }
  };

  try {
    api = await request.newContext({ baseURL: baseUrl, timeout: 8000, ignoreHTTPSErrors: false });
    try {
      const record = sources[0]!;
      const url = new URL('/api/productsList', baseUrl).href;
      record.urls = [url];
      const response = await get(url, 'api-products');
      record.httpStatus = response.status();
      const raw = await response.text();
      await writeText(join(evidenceDir, 'api-products-body.txt'), raw);
      await writeJson(join(evidenceDir, 'api-products-response.json'), {
        method: 'GET', url, checkedAt: new Date().toISOString(), httpStatus: response.status(),
        contentType: response.headers()['content-type'] ?? null, body: raw,
      });
      record.evidence = ['evidence/api-products-response.json', 'evidence/api-products-body.txt'];
      const body: unknown = JSON.parse(raw);
      apiValues = parseProductsApi(response.status(), body);
      record.recordCount = apiValues.length;
      record.status = 'pass';
      record.observedAt = new Date().toISOString();
      await response.dispose();
    } catch (error) {
      handleStop(error);
      sources[0]!.error = describe(error);
      serviceErrors.push('API inventory: ' + describe(error));
    }

    if (!stopReason) {
      try {
        browser = await chromium.launch({ headless: options.headless ?? true, timeout: remaining(10000) });
        environment.chromiumVersion = browser.version();
        const context = await browser.newContext({ viewport: { width: 1366, height: 768 }, serviceWorkers: 'block' });
        const page = await context.newPage();
        try {
          const record = sources[1]!;
          const pending = [new URL('/products', baseUrl).href];
          const seen = new Set<string>();
          while (pending.length) {
            const url = pending.shift()!;
            if (seen.has(url)) continue;
            seen.add(url);
            const navigation = await navigate(page, url);
            record.httpStatus = navigation.httpStatus;
            record.urls.push(url);
            const index = String(record.urls.length).padStart(3, '0');
            await writeText(join(evidenceDir, 'catalogue-' + index + '.html'), await page.content());
            await writeJson(join(evidenceDir, 'catalogue-' + index + '-navigation.json'), navigation);
            record.evidence.push('evidence/catalogue-' + index + '.html', 'evidence/catalogue-' + index + '-navigation.json');
            if (navigation.httpStatus === null || navigation.httpStatus < 200 || navigation.httpStatus >= 300) {
              throw new Error('Catalogue document HTTP ' + navigation.httpStatus + ' at ' + url);
            }
            const extracted = await page.evaluate(selectors => {
              const links = [...document.querySelectorAll<HTMLAnchorElement>(selectors.detailLink)];
              const cards = [...document.querySelectorAll(selectors.cards)];
              const values = cards.flatMap(card => {
                const link = card.querySelector<HTMLAnchorElement>(selectors.detailLink);
                if (!link) return [];
                const id = new URL(link.href).pathname.match(/\/product_details\/(\d+)\/?$/)?.[1];
                if (!id) return [];
                return [{ id, name: card.querySelector(selectors.cardName)?.textContent?.trim() ?? null,
                  price: card.querySelector(selectors.cardPrice)?.textContent?.trim() ?? null, detailUrl: link.href }];
              });
              const pagination = [...document.querySelectorAll<HTMLAnchorElement>(selectors.pagination)].map(link => link.href);
              return { values, pagination, regionPresent: !!document.querySelector(selectors.catalogueRegion),
                detailUrls: links.map(link => link.href), detailLinkCount: links.length };
            }, adapter);
            const linkReconciliation = reconcileCatalogueLinks(extracted.values, extracted.detailUrls, baseUrl);
            // Preserve every usable discovered ID before reporting an incomplete adapter/source.
            catalogueValues.push(...linkReconciliation.values);
            await writeJson(join(evidenceDir, 'catalogue-' + index + '-semantic.json'), { ...extracted, linkReconciliation });
            record.evidence.push('evidence/catalogue-' + index + '-semantic.json');
            if (!extracted.regionPresent || linkReconciliation.invalidDetailUrls.length || linkReconciliation.missingCardIds.length) {
              throw new Error('Catalogue selectors/link schema no longer describe every discovered product; coverage cannot be trusted. Unmapped product IDs: ' +
                (linkReconciliation.missingCardIds.join(', ') || 'none') + '; invalid same-origin detail URLs: ' + linkReconciliation.invalidDetailUrls.length + '.');
            }
            if (index === '001' && await screenshot(page, 'catalogue-representative.png')) record.evidence.push('evidence/catalogue-representative.png');
            for (const next of extracted.pagination) {
              const nextUrl = new URL(next);
              const expected = new URL('/products', baseUrl);
              if (nextUrl.origin === expected.origin && nextUrl.pathname === expected.pathname && !seen.has(nextUrl.href) && !pending.includes(nextUrl.href)) {
                pending.push(nextUrl.href);
              }
            }
          }
          record.recordCount = catalogueValues.length;
          record.status = 'pass';
          record.observedAt = new Date().toISOString();
        } catch (error) {
          handleStop(error);
          sources[1]!.recordCount = catalogueValues.length;
          sources[1]!.error = describe(error);
          serviceErrors.push('Catalogue inventory: ' + describe(error));
        } finally {
          await page.close().catch(() => {});
        }

        const inventory = reconcileInventory(apiValues, catalogueValues, baseUrl);
        rows = inventory.map(item => blockedProduct(item, stopReason ?? 'Product has not yet been visited.'));
        let cursor = 0;
        let representativeTaken = false;
        const audit = async (page: Page) => {
          while (cursor < inventory.length && !stopReason) {
            const index = cursor++;
            const item = inventory[index]!;
            const filename = 'product-' + item.id;
            const imageResponses = new Map<string, { httpStatus: number; contentType: string | null }>();
            const onResponse = (response: import('@playwright/test').Response) => {
              if (response.request().resourceType() === 'image') imageResponses.set(response.url(), {
                httpStatus: response.status(), contentType: response.headers()['content-type'] ?? null,
              });
            };
            page.on('response', onResponse);
            try {
              const navigation = await navigate(page, item.detailUrl);
              try {
                await page.locator(adapter.productRegion).waitFor({ state: 'attached', timeout: remaining(1500) });
              } catch (error) {
                if (error instanceof DeadlineError) throw error;
                // Missing region is a recorded content failure, not an extraction crash.
              }
              const extracted = await page.evaluate(selectors => {
                const heading = document.querySelector<HTMLElement>(selectors.productHeading);
                const image = document.querySelector<HTMLImageElement>(selectors.mainImage);
                const price = document.querySelector(selectors.productPrice);
                return {
                  productRegionPresent: !!document.querySelector(selectors.productRegion),
                  name: heading?.textContent?.trim() ?? null,
                  price: price?.textContent?.trim() ?? null,
                  title: document.querySelector('title')?.textContent ?? null,
                  heading: { tag: heading?.tagName.toLowerCase() ?? null, text: heading?.textContent?.trim() ?? null },
                  image: { present: !!image, url: image?.currentSrc || image?.src || null,
                    altPresent: image?.hasAttribute('alt') ?? false, altText: image?.getAttribute('alt') ?? null },
                };
              }, adapter);
              let decoded: boolean | null = null;
              let width: number | null = null;
              let height: number | null = null;
              if (extracted.image.present) {
                try {
                  await page.waitForFunction(selector => {
                    const image = document.querySelector<HTMLImageElement>(selector);
                    return !!image && image.complete && image.naturalWidth > 0 && image.naturalHeight > 0;
                  }, adapter.mainImage, { timeout: remaining(3000) });
                } catch (error) {
                  if (error instanceof DeadlineError) throw error;
                }
                const dimensions = await page.locator(adapter.mainImage).evaluate(element => {
                  const image = element as HTMLImageElement;
                  return { decoded: image.complete && image.naturalWidth > 0 && image.naturalHeight > 0,
                    width: image.naturalWidth, height: image.naturalHeight, url: image.currentSrc || image.src || null };
                });
                decoded = dimensions.decoded;
                width = dimensions.width;
                height = dimensions.height;
                extracted.image.url = dimensions.url;
              }
              let imageResponse = extracted.image.url ? imageResponses.get(extracted.image.url) : undefined;
              let transportError: string | undefined;
              if (imageResponse?.httpStatus === 429) rateLimited(extracted.image.url!, undefined);
              if (extracted.image.url && !imageResponse && !stopReason) {
                try {
                  const response = await get(extracted.image.url, filename + '-image');
                  // GET (rather than HEAD) ensures the image resource actually returns a body.
                  await response.body();
                  imageResponse = { httpStatus: response.status(), contentType: response.headers()['content-type'] ?? null };
                  await response.dispose();
                } catch (error) {
                  handleStop(error);
                  transportError = describe(error);
                  serviceErrors.push('Product ' + item.id + ' image probe: ' + describe(error));
                }
              }
              const facts: DetailFacts = {
                httpStatus: navigation.httpStatus, finalUrl: page.url(), ...extracted,
                image: { ...extracted.image, httpStatus: imageResponse?.httpStatus ?? null,
                  contentType: imageResponse?.contentType ?? null, decoded, width, height,
                  ...(transportError ? { transportError } : {}) },
              };
              const row = assessProduct(item, facts, { api: sources[0]!.status === 'pass', catalogue: sources[1]!.status === 'pass' });
              await writeText(join(evidenceDir, filename + '.html'), await page.content());
              await writeJson(join(evidenceDir, filename + '-semantic.json'), { facts, navigationAttempts: navigation.attempts, checks: row.checks });
              row.evidence = ['evidence/' + filename + '.html', 'evidence/' + filename + '-semantic.json'];
              const takeRepresentative = !representativeTaken;
              if (takeRepresentative) representativeTaken = true;
              if ((row.factualFindings.length || takeRepresentative) && await screenshot(page, filename + '.png')) {
                row.evidence.push('evidence/' + filename + '.png');
              }
              rows[index] = row;
              await appendFile(join(outputDir, 'checkpoint.jsonl'), JSON.stringify(row) + '\n', 'utf8');
            } catch (error) {
              handleStop(error);
              const row = blockedProduct(item, describe(error), true);
              row.evidence.push('evidence/' + filename + '-error.json');
              await writeJson(join(evidenceDir, filename + '-error.json'), { checkedAt: row.checkedAt, url: item.detailUrl, error: describe(error) });
              rows[index] = row;
              await appendFile(join(outputDir, 'checkpoint.jsonl'), JSON.stringify(row) + '\n', 'utf8');
              serviceErrors.push('Product ' + item.id + ': ' + describe(error));
            } finally {
              page.off('response', onResponse);
            }
          }
        };
        if (!stopReason) {
          const pages = await Promise.all([context.newPage(), context.newPage()]);
          await Promise.all(pages.map(audit));
          await Promise.all(pages.map(auditPage => auditPage.close().catch(() => {})));
        }
        for (let index = 0; index < rows.length; index++) {
          if (!rows[index]!.visited) {
            rows[index] = blockedProduct(inventory[index]!, stopReason ?? 'Collection interrupted before this product could be visited.');
            await appendFile(join(outputDir, 'checkpoint.jsonl'), JSON.stringify(rows[index]) + '\n', 'utf8');
          }
        }
        await context.close().catch(() => {});
      } catch (error) {
        handleStop(error);
        if (!sources[1]!.error && sources[1]!.status !== 'pass') sources[1]!.error = describe(error);
        serviceErrors.push('Browser collection: ' + describe(error));
      }
    }
  } catch (error) {
    handleStop(error);
    serviceErrors.push('Collector setup: ' + describe(error));
  } finally {
    await browser?.close().catch(() => {});
    await api?.dispose().catch(() => {});
  }
  if (!rows.length && (apiValues.length || catalogueValues.length)) {
    rows = reconcileInventory(apiValues, catalogueValues, baseUrl).map(item => blockedProduct(item, stopReason ?? 'Browser collection unavailable.'));
    for (const row of rows) await appendFile(join(outputDir, 'checkpoint.jsonl'), JSON.stringify(row) + '\n', 'utf8');
  }
  if (stopReason && !serviceErrors.includes(stopReason)) serviceErrors.push(stopReason);
  for (const record of sources) {
    if (record.status === 'blocked' && !record.error) record.error = stopReason ?? 'Source was not collected.';
  }
  const finishedAt = new Date().toISOString();
  return {
    schemaVersion: 1, runId, startedAt, finishedAt, durationMs: performance.now() - start, outputDir, environment,
    config: { collectionDeadlineMs, reportTargetMs, workers: 2, controlledStartIntervalMs: 1000 },
    sources, ...summarizeRows(rows, sources, serviceErrors), serviceErrors, rows,
  };
}
