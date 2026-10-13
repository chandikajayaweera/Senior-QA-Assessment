import { normalizeName, parsePrice } from './shared.js';

export type CheckStatus = 'pass' | 'fail' | 'blocked';
export type Check = { status: CheckStatus; detail: string };
export type InventoryValue = { id: string; name: string | null; price: string | null; detailUrl?: string };
export type InventoryItem = {
  id: string;
  detailUrl: string;
  api: InventoryValue[];
  catalogue: InventoryValue[];
  conflicts: string[];
};
export type DetailFacts = {
  httpStatus: number | null;
  finalUrl: string | null;
  productRegionPresent: boolean;
  name: string | null;
  price: string | null;
  title: string | null;
  heading: { tag: string | null; text: string | null };
  image: {
    url: string | null;
    httpStatus: number | null;
    contentType: string | null;
    present: boolean;
    decoded: boolean | null;
    width: number | null;
    height: number | null;
    altPresent: boolean;
    altText: string | null;
    transportError?: string;
  };
};
export type ProductRow = InventoryItem & {
  checkedAt: string;
  visited: boolean;
  detail: DetailFacts | null;
  checks: Record<string, Check>;
  factualFindings: string[];
  contentReviewFlags: string[];
  evidence: string[];
  error?: string;
};
export type SourceRecord = {
  name: 'api' | 'catalogue';
  status: CheckStatus;
  httpStatus: number | null;
  observedAt: string;
  urls: string[];
  recordCount: number;
  evidence: string[];
  error?: string;
};
export type CatalogueRun = {
  schemaVersion: 1;
  runId: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  outputDir: string;
  environment: Record<string, string | number | boolean>;
  config: { collectionDeadlineMs: number; reportTargetMs: number; workers: number; controlledStartIntervalMs: number };
  sources: SourceRecord[];
  inventory: { apiUnique: number; catalogueUnique: number; union: number; attempted: number; completed: number; blocked: number };
  coverageComplete: boolean;
  serviceErrors: string[];
  rows: ProductRow[];
};

const check = (status: CheckStatus, detail: string): Check => ({ status, detail });
const comparisonKeys = ['sourceAgreement', 'nameAgreement', 'priceAgreement', 'detailAvailability', 'productContent',
  'titlePresent', 'primaryHeadingPresent', 'imageAvailability', 'imageDecoded', 'alternativeTextPresent', 'alternativeTextNonEmpty'];

export function parseProductsApi(httpStatus: number, body: unknown): InventoryValue[] {
  if (httpStatus !== 200) throw new Error('Products API requires documented HTTP 200; observed ' + httpStatus + '.');
  if (!body || typeof body !== 'object') throw new Error('Products API body is not an object.');
  const response = body as Record<string, unknown>;
  if (response.responseCode !== 200) {
    throw new Error('Products API requires documented application responseCode 200; observed ' + JSON.stringify(response.responseCode) + '.');
  }
  if (!Array.isArray(response.products)) throw new Error('Products API body has no products array; source schema cannot be established.');
  return response.products.map((value): InventoryValue => {
    if (!value || typeof value !== 'object') throw new Error('Products API contains a non-object product.');
    const product = value as Record<string, unknown>;
    const id = String(product.id ?? '');
    if (!/^\d+$/.test(id)) throw new Error('Products API contains a product without a usable numeric ID.');
    // Missing display fields remain null so the product is retained and dependent comparisons are blocked.
    return { id, name: typeof product.name === 'string' ? product.name : null,
      price: typeof product.price === 'string' ? product.price : null };
  });
}

export function reconcileCatalogueLinks(cardValues: InventoryValue[], detailUrls: string[], baseUrl: string) {
  const expectedOrigin = new URL(baseUrl).origin;
  const discovered = new Map<string, string>();
  const invalidDetailUrls: string[] = [];
  for (const href of detailUrls) {
    let url: URL;
    try { url = new URL(href, baseUrl); }
    catch { invalidDetailUrls.push(href); continue; }
    if (url.origin !== expectedOrigin) continue;
    const id = url.pathname.match(/\/product_details\/(\d+)\/?$/)?.[1];
    if (id) discovered.set(id, url.href);
    else if (url.pathname.includes('/product_details/')) invalidDetailUrls.push(url.href);
  }
  const cardIds = new Set(cardValues.map(value => value.id));
  const missingCardIds = [...discovered.keys()].filter(id => !cardIds.has(id));
  // Discovery precedes adapter validation. Never lose a product just because its card template changed.
  const values = [...cardValues, ...missingCardIds.map(id => ({
    id, name: null, price: null, detailUrl: discovered.get(id)!,
  }))];
  return { values, missingCardIds, invalidDetailUrls, discoveredIds: [...discovered.keys()] };
}

export function reconcileInventory(api: InventoryValue[], catalogue: InventoryValue[], baseUrl: string): InventoryItem[] {
  const items = new Map<string, InventoryItem>();
  for (const [source, values] of [['api', api], ['catalogue', catalogue]] as const) {
    for (const value of values) {
      let item = items.get(value.id);
      if (!item) {
        item = { id: value.id, detailUrl: value.detailUrl ?? new URL('/product_details/' + encodeURIComponent(value.id), baseUrl).href,
          api: [], catalogue: [], conflicts: [] };
        items.set(value.id, item);
      }
      if (source === 'catalogue' && value.detailUrl) item.detailUrl = value.detailUrl;
      // Repeated identical cards are not separate products. Preserve conflicting values.
      const existing = item[source];
      if (!existing.some(v => v.name === value.name && v.price === value.price && v.detailUrl === value.detailUrl)) existing.push(value);
    }
  }
  for (const item of items.values()) {
    for (const source of ['api', 'catalogue'] as const) {
      if (item[source].length > 1) item.conflicts.push(source + ' has conflicting records for product ID ' + item.id);
    }
  }
  return [...items.values()].sort((a, b) => Number(a.id) - Number(b.id) || a.id.localeCompare(b.id));
}

export function blockedProduct(item: InventoryItem, reason: string, visited = false): ProductRow {
  return { ...item, checkedAt: new Date().toISOString(), visited, detail: null,
    checks: Object.fromEntries(comparisonKeys.map(key => [key, check('blocked', reason)])),
    factualFindings: [], contentReviewFlags: [], evidence: [], error: reason };
}

export function assessProduct(item: InventoryItem, facts: DetailFacts, sourcesAvailable = { api: true, catalogue: true }): ProductRow {
  const checks: Record<string, Check> = {};
  const factualFindings: string[] = [];
  const contentReviewFlags: string[] = [];
  const add = (key: string, status: CheckStatus, detail: string) => {
    checks[key] = check(status, detail);
    if (status === 'fail') factualFindings.push(key + ': ' + detail);
  };
  const sourceOK = item.api.length === 1 && item.catalogue.length === 1 && item.conflicts.length === 0;
  const sourceAbsenceUnknown = (!item.api.length && !sourcesAvailable.api) || (!item.catalogue.length && !sourcesAvailable.catalogue);
  add('sourceAgreement', sourceAbsenceUnknown && !item.conflicts.length ? 'blocked' : sourceOK ? 'pass' : 'fail',
    sourceAbsenceUnknown && !item.conflicts.length ? 'Source outage/incomplete discovery prevents establishing whether this product is present in both inventories.'
      : sourceOK ? 'Present in both inventories with unambiguous values.'
      : item.conflicts.join('; ') || 'Missing from ' + (!item.api.length ? 'API inventory' : 'catalogue inventory') + '.');
  const httpOK = facts.httpStatus !== null && facts.httpStatus >= 200 && facts.httpStatus < 300;
  add('detailAvailability', facts.httpStatus === null ? 'blocked' : httpOK ? 'pass' : 'fail',
    facts.httpStatus === null ? 'Document HTTP status unavailable.' : 'Document HTTP ' + facts.httpStatus + '; final URL ' + facts.finalUrl);
  add('productContent', httpOK ? facts.productRegionPresent ? 'pass' : 'fail' : 'blocked',
    httpOK ? facts.productRegionPresent ? 'Expected product content region rendered.' : 'Expected product content region missing; possible error or redirected page.'
      : 'Dependent on available detail document.');
  if (!httpOK || !facts.productRegionPresent) {
    for (const key of comparisonKeys.filter(key => !(key in checks))) checks[key] = check('blocked', 'Dependent on available rendered product content.');
    return { ...item, checkedAt: new Date().toISOString(), visited: true, detail: facts, checks, factualFindings, contentReviewFlags, evidence: [] };
  }
  const names = [item.api[0]?.name, item.catalogue[0]?.name, facts.name];
  if (!sourceOK || names.some(value => value === null || value === undefined || normalizeName(value) === '')) {
    add('nameAgreement', 'blocked', 'All three unambiguous nonempty source names are required.');
  } else {
    const normalized = names.map(value => normalizeName(value!));
    add('nameAgreement', normalized.every(value => value === normalized[0]) ? 'pass' : 'fail',
      'API / catalogue / detail: ' + names.map(value => JSON.stringify(value)).join(' / '));
  }
  const rawPrices = [item.api[0]?.price, item.catalogue[0]?.price, facts.price];
  const prices = rawPrices.map(value => typeof value === 'string' ? parsePrice(value) : null);
  if (!sourceOK || prices.some(value => value === null)) {
    add('priceAgreement', 'blocked', 'All three unambiguous prices must parse; raw values: ' + rawPrices.map(value => JSON.stringify(value)).join(' / '));
  } else {
    add('priceAgreement', prices.every(value => value!.currency === prices[0]!.currency && value!.minor === prices[0]!.minor) ? 'pass' : 'fail',
      'API / catalogue / detail: ' + rawPrices.map(value => JSON.stringify(value)).join(' / '));
  }
  const title = facts.title?.trim() ?? '';
  add('titlePresent', title ? 'pass' : 'fail', title ? JSON.stringify(title) : 'Document title is missing or empty.');
  const heading = facts.heading.text?.trim() ?? '';
  add('primaryHeadingPresent', heading && facts.heading.tag ? 'pass' : 'fail',
    heading && facts.heading.tag ? facts.heading.tag + ': ' + JSON.stringify(heading) : 'Scoped product heading is missing or empty.');
  if (title && facts.name && !normalizeName(title).toLowerCase().includes(normalizeName(facts.name).toLowerCase())) {
    contentReviewFlags.push('Title is present but does not identify this product; review whether it helps distinguish detail pages.');
  }
  const image = facts.image;
  if (!image.present || !image.url) add('imageAvailability', 'fail', 'Main product image or source URL missing.');
  else if (image.httpStatus === null) add('imageAvailability', 'blocked', image.transportError ?? 'Image HTTP status unavailable.');
  else add('imageAvailability', image.httpStatus >= 200 && image.httpStatus < 300 ? 'pass' : 'fail',
    'Main image HTTP ' + image.httpStatus + (image.contentType ? ' (' + image.contentType + ')' : '') + '.');
  if (!image.present) add('imageDecoded', 'blocked', 'Main image missing.');
  else if (image.decoded === null) add('imageDecoded', 'blocked', 'Browser image decode could not be checked.');
  else add('imageDecoded', image.decoded ? 'pass' : 'fail',
    image.decoded ? 'Decoded with intrinsic dimensions ' + image.width + ' x ' + image.height + '.' : 'Image did not decode within the bounded wait.');
  add('alternativeTextPresent', image.present ? image.altPresent ? 'pass' : 'fail' : 'blocked',
    image.present ? image.altPresent ? 'alt attribute exists.' : 'Main product image has no alt attribute.' : 'Main image missing.');
  add('alternativeTextNonEmpty', image.present && image.altPresent ? image.altText?.trim() ? 'pass' : 'fail' : 'blocked',
    image.present && image.altPresent ? image.altText?.trim() ? JSON.stringify(image.altText) : 'Product image has empty alternative text; review whether informative content is lost.'
      : 'Dependent on an existing main image alt attribute.');
  if (image.altText && /ecommerce|website|^products?$|^product image$/i.test(image.altText)) {
    contentReviewFlags.push('Alternative text is present but generic; content review should determine what visual product information users need.');
  }
  return { ...item, checkedAt: new Date().toISOString(), visited: true, detail: facts, checks, factualFindings, contentReviewFlags, evidence: [] };
}

export function summarizeRows(rows: ProductRow[], sources: SourceRecord[], serviceErrors: string[] = []) {
  const completed = rows.filter(row => row.visited && Object.values(row.checks).every(value => value.status !== 'blocked')).length;
  return {
    inventory: {
      apiUnique: rows.filter(row => row.api.length > 0).length,
      catalogueUnique: rows.filter(row => row.catalogue.length > 0).length,
      union: rows.length,
      attempted: rows.filter(row => row.visited).length,
      completed,
      blocked: rows.length - completed,
    },
    coverageComplete: sources.length === 2 && sources.every(source => source.status === 'pass') &&
      completed === rows.length && serviceErrors.length === 0,
  };
}
