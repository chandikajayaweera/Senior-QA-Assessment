import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import type { Page, Locator, TestInfo, Browser, BrowserContextOptions } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { BASE_URL, normalizeName, parsePrice } from './shared.js';

// Structural selectors are needed because the baseline controls lack accessible names.
export const site = {
  search: '#search_product', searchButton: '#submit_search', cards: '.product-image-wrapper',
  cardInfo: '.productinfo', detail: '.product-information', quantity: '#quantity',
  addButton: '.product-information button.cart', addModal: '#cartModal',
  cartRows: '#cart_info_table tbody tr', checkout: '.check_out', guestModal: '#checkoutModal',
};
export type Status = 'pass' | 'fail' | 'blocked';
export type Check = { id: string; checkedAt: string; input: unknown; expected: string; basis: string; actual: unknown; status: Status; evidencepaths: string[] };
export class Ledger {
  checks: Check[] = [];
  facts: Record<string, unknown> = {};
  constructor(public testInfo: TestInfo, public name: string) {}
  record(id: string, input: unknown, expected: string, basis: string, actual: unknown, status: Status, evidencepaths: string[] = []) {
    this.checks.push({ id, checkedAt: new Date().toISOString(), input, expected, basis, actual, status, evidencepaths });
  }
  async screenshot(page: Page, name: string, fullPage = true) {
    const target = this.testInfo.outputPath(`${name}.png`);
    await page.screenshot({ path: target, fullPage, timeout: 15000 });
    await this.testInfo.attach(name, { path: target, contentType: 'image/png' });
    return path.relative(process.cwd(), target).replaceAll('\\', '/');
  }
  async save() {
    const target = this.testInfo.outputPath(`${this.name}.json`);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, JSON.stringify({ test: this.name, project: this.testInfo.project.name,
      viewport: this.testInfo.project.use.viewport, browser: 'Chromium', mobileEmulation: this.testInfo.project.use.isMobile ?? false,
      collectedAt: new Date().toISOString(), facts: this.facts, checks: this.checks }, null, 2));
    await this.testInfo.attach(this.name, { path: target, contentType: 'application/json' });
  }
}
export function projectContext(testInfo: TestInfo): BrowserContextOptions {
  return { viewport: testInfo.project.use.viewport, isMobile: testInfo.project.use.isMobile,
    hasTouch: testInfo.project.use.hasTouch, ignoreHTTPSErrors: testInfo.project.use.ignoreHTTPSErrors,
    userAgent: testInfo.project.use.userAgent, locale: testInfo.project.use.locale,
    timezoneId: testInfo.project.use.timezoneId, deviceScaleFactor: testInfo.project.use.deviceScaleFactor };
}
export async function navigate(page: Page, pathname: string) {
  const response = await page.goto(`${BASE_URL}${pathname}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response || !response.ok()) throw new Error(`Document prerequisite failed: ${pathname}, HTTP ${response?.status() ?? 'no response'}`);
  return response;
}
export async function snapshotControl(locator: Locator) {
  return { aria: await locator.ariaSnapshot(), html: await locator.evaluate(el => el.outerHTML),
    focusStyle: await locator.evaluate(el => { const style = getComputedStyle(el); return { outline: style.outline, boxShadow: style.boxShadow, border: style.border }; }) };
}
export async function activeControl(page: Page) {
  return page.evaluate(() => ({ tag: document.activeElement?.tagName, id: document.activeElement?.id,
    text: document.activeElement?.textContent?.trim(), html: document.activeElement?.outerHTML }));
}
export async function layout(page: Page, selector: string) {
  return page.evaluate(sel => {
    const viewport = { width: innerWidth, height: innerHeight, documentWidth: document.documentElement.scrollWidth,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1 };
    const el = document.querySelector(sel);
    if (!el) return { viewport, control: null };
    const r = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(innerWidth - 1, r.x + r.width / 2));
    const y = Math.max(0, Math.min(innerHeight - 1, r.y + r.height / 2));
    const hit = document.elementFromPoint(x, y);
    return { viewport, control: { x: r.x, y: r.y, width: r.width, height: r.height,
      withinWidth: r.x >= 0 && r.right <= innerWidth, hitIsControl: hit === el || !!(hit && el.contains(hit)) } };
  }, selector);
}
export async function axe(page: Page, selector: string) {
  try {
    const result = await new AxeBuilder({ page }).include(selector).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    return { scope: selector, status: 'completed' as const, checkedAt: new Date().toISOString(), violations: result.violations.map(v => ({ id: v.id, impact: v.impact,
      description: v.description, helpUrl: v.helpUrl, tags: v.tags, nodes: v.nodes.map(n => ({ html: n.html, target: n.target, failureSummary: n.failureSummary })) })),
      passes: result.passes.map(p => p.id), incomplete: result.incomplete.map(p => ({ id: p.id, nodes: p.nodes.map(n => n.target) })) };
  } catch (error) {
    return { scope: selector, status: 'blocked' as const, checkedAt: new Date().toISOString(), error: errorSummary(error) };
  }
}
export async function detail(page: Page) {
  const root = page.locator(site.detail);
  await root.waitFor({ state: 'visible' });
  return { url: page.url(), name: (await root.locator('h2').innerText()).trim(),
    price: (await root.locator('span > span').first().innerText()).trim(),
    quantityHtml: await root.locator(site.quantity).evaluate(el => el.outerHTML),
    availability: await root.innerText() };
}
export async function addToCart(page: Page, quantity: string, keyboard = false) {
  await page.locator(site.quantity).fill(quantity);
  const button = page.locator(site.addButton);
  const responsePromise = page.waitForResponse(res => new URL(res.url()).pathname.startsWith('/add_to_cart/'), { timeout: 8000 }).catch(() => null);
  if (keyboard) { await page.locator(site.quantity).focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Enter'); }
  else await button.click();
  const response = await responsePromise;
  let modalVisible = false;
  try { await page.locator(site.addModal).waitFor({ state: 'visible', timeout: response ? 5000 : 1000 }); modalVisible = true; } catch { /* retained as observation */ }
  const rawBody = response ? await response.text() : null;
  const isServerError = !!response && response.status() >= 500;
  const debugPageDetected = isServerError && !!rawBody && /Exception Type:|Traceback|Django/.test(rawBody)
    && /Request information|Settings|DEBUG/.test(rawBody);
  const integerConversionError = isServerError && !!rawBody && rawBody.includes('invalid literal for int() with base 10:');
  const responseDiagnostic = isServerError && rawBody != null ? {
    redacted: true, httpStatus: response!.status(), sha256: createHash('sha256').update(rawBody).digest('hex'),
    decodedUtf8Bytes: Buffer.byteLength(rawBody, 'utf8'), debugPageDetected,
    exceptionType: /<th>\s*Exception Type:\s*<\/th>\s*<td>\s*([A-Za-z][A-Za-z0-9_]*)\s*<\/td>/i.exec(rawBody)?.[1]
      ?? (integerConversionError ? 'ValueError' : null),
    exceptionMessage: integerConversionError ? 'invalid literal for int() with base 10: ' + JSON.stringify(quantity) : null,
    quantityIntegerConversionLinePresent: /int\(quantity\)/.test(rawBody),
    omitted: 'Raw traceback, paths, cookies, request metadata, settings and all non-allowlisted values',
  } : null;
  const result = { requestObserved: !!response, requestUrl: response?.url() ?? null, status: response?.status() ?? null, body: isServerError ? '[HTTP 5xx response redacted; see allowlisted responseDiagnostic]' : rawBody, responseDiagnostic, modalVisible,
    modalText: modalVisible ? await page.locator(site.addModal).innerText() : null,
    focus: await activeControl(page),
    modalHtml: modalVisible ? await page.locator(site.addModal).evaluate(el => el.outerHTML) : null };
  return result;
}
export async function viewCart(page: Page) {
  if (await page.locator(site.addModal).isVisible()) {
    await page.locator(site.addModal).getByRole('link', { name: 'View Cart', exact: true }).click();
    await page.waitForURL('**/view_cart', { timeout: 15000 });
  } else await navigate(page, '/view_cart');
}
export async function cart(page: Page, rowSelector = site.cartRows) {
  const rows = await page.locator(rowSelector).evaluateAll(elements => elements.map(el => ({
    id: el.id, name: el.querySelector('.cart_description h4')?.textContent?.trim() ?? '',
    price: el.querySelector('.cart_price')?.textContent?.trim() ?? '',
    quantity: el.querySelector('.cart_quantity')?.textContent?.trim() ?? '',
    total: el.querySelector('.cart_total_price')?.textContent?.trim() ?? '',
    html: el.outerHTML,
  })));
  return rows;
}
export async function emptyCart(page: Page) {
  await navigate(page, '/view_cart');
  for (let count = 0; count < 100 && await page.locator('.cart_quantity_delete').count(); count++) {
    const row = page.locator(site.cartRows).first();
    const rowId = await row.getAttribute('id');
    await row.locator('.cart_quantity_delete').click();
    if (rowId) await page.locator(`[id="${rowId}"]`).waitFor({ state: 'detached', timeout: 10000 });
  }
}
export function sameName(...names: string[]) { return new Set(names.map(normalizeName)).size === 1; }
export function samePrice(...prices: string[]) {
  const parsed = prices.map(parsePrice);
  return parsed.every(p => p != null) && new Set(parsed.map(p => JSON.stringify(p))).size === 1;
}
export function validLine(row: { price: string; quantity: string; total: string }, expectedQuantity: number) {
  const unit = parsePrice(row.price), total = parsePrice(row.total);
  return !!unit && !!total && unit.currency === total.currency && Number(row.quantity) === expectedQuantity && total.minor === unit.minor * expectedQuantity;
}
export function errorSummary(error: unknown) {
  // Credential-bearing calls are never passed into this helper.
  return error instanceof Error ? error.message.split('\n').slice(0, 5).join('\n') : String(error);
}





