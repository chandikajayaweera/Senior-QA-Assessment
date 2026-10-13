import { chromium, type Page } from '@playwright/test';
import { resolve } from 'node:path';
import { BASE_URL, createRun, writeJson } from '../src/shared.js';

const run = await createRun('mobile-touch');
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true,
  hasTouch: true, locale: 'en-GB', timezoneId: 'Asia/Colombo' });
const page = await context.newPage();
page.setDefaultTimeout(10000);
await page.addInitScript(() => {
  const events: unknown[] = [];
  (window as typeof window & { qaTouchEvents?: unknown[] }).qaTouchEvents = events;
  for (const type of ['touchstart', 'touchend', 'touchcancel', 'click']) {
    document.addEventListener(type, event => {
      const target = event.target instanceof Element ? event.target : null;
      events.push({ type, timestamp: performance.now(), tag: target?.tagName,
        id: target?.id, className: target?.className, text: target?.textContent?.trim().slice(0, 60) });
    }, { capture: true, passive: true });
  }
});
const screenshots: string[] = [];
const checks: Array<Record<string, unknown>> = [];
const record = (id: string, expected: string, actual: unknown, passed: boolean) =>
  checks.push({ id, checkedAt: new Date().toISOString(), input: '390 x 844 touch-enabled Chromium emulation',
    expected, basis: 'Assessment mobile usability; emulated touch events, not a physical-device test',
    actual, status: passed ? 'pass' : 'fail' });
async function scrollFacts(page: Page) {
  return page.locator('#cart_info_table').evaluate(table => {
    for (let parent = table.parentElement; parent; parent = parent.parentElement) {
      if (parent.scrollWidth > parent.clientWidth + 1 && /auto|scroll/.test(getComputedStyle(parent).overflowX)) {
        const box = parent.getBoundingClientRect();
        return { id: parent.id, className: parent.className, scrollLeft: parent.scrollLeft,
          scrollWidth: parent.scrollWidth, clientWidth: parent.clientWidth,
          rect: { top: box.top, left: box.left, right: box.right, height: box.height } };
      }
    }
    return null;
  });
}
try {
  await page.goto(BASE_URL + '/products', { waitUntil: 'domcontentloaded' });
  await page.locator('#search_product').tap();
  await page.locator('#search_product').fill('top');
  const searched = page.waitForURL('**/products?search=top');
  await page.locator('#submit_search').tap();
  await searched;
  record('TOUCH-SEARCH', 'Tapping search opens current matching results', {
    url: page.url(), resultHeading: await page.locator('.features_items h2.title').innerText(),
  }, await page.locator('a[href="/product_details/1"]').count() > 0);
  await page.locator('a[href="/product_details/1"]').first().tap();
  await page.waitForURL('**/product_details/1');
  await page.locator('#quantity').tap();
  await page.locator('#quantity').fill('3');
  const added = page.waitForResponse(response => new URL(response.url()).pathname.startsWith('/add_to_cart/'));
  await page.locator('.product-information button.cart').tap();
  const response = await added;
  await page.locator('#cartModal').waitFor({ state: 'visible' });
  record('TOUCH-ADD', 'Tapping add with quantity 3 shows a successful confirmation', {
    httpStatus: response.status(), requestUrl: response.url(),
    message: await page.locator('#cartModal').innerText(),
  }, response.status() === 200);
  const cartNavigation = page.waitForURL('**/view_cart');
  await page.locator('#cartModal').getByRole('link', { name: 'View Cart', exact: true }).tap();
  await cartNavigation;
  await page.locator('#cart_info_table').scrollIntoViewIfNeeded();
  const before = await scrollFacts(page);
  await page.screenshot({ path: resolve(run.dir, 'mobile-cart-before-pan.png'), fullPage: true });
  screenshots.push('mobile-cart-before-pan.png');
  await page.locator('#cart_info_table').scrollIntoViewIfNeeded();
  const current = await scrollFacts(page);
  if (current) {
    const session = await context.newCDPSession(page);
    const startX = Math.min(365, current.rect.right - 25);
    const endX = Math.max(25, startX - 180);
    const y = Math.max(20, Math.min(810, current.rect.top + Math.min(90, current.rect.height - 10)));
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: startX, y }] });
    for (let step = 1; step <= 6; step++) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove',
        touchPoints: [{ x: startX + (endX - startX) * step / 6, y }] });
      await page.waitForTimeout(25);
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForFunction(() => {
      const table = document.querySelector('#cart_info_table');
      for (let parent = table?.parentElement; parent; parent = parent.parentElement) {
        if (parent.scrollLeft > 0) return true;
      }
      return false;
    }, undefined, { timeout: 5000 });
    await session.detach();
  }
  const after = await scrollFacts(page);
  record('TOUCH-CART-PAN', 'An emulated leftward swipe exposes horizontally clipped cart columns', {
    before, after, implementation: 'Chromium Input.dispatchTouchEvent start/move/end',
    documentWidth: await page.evaluate(() => document.documentElement.scrollWidth),
  }, !!before && !!after && after.scrollLeft > before.scrollLeft);
  const deleteControl = page.locator('#product-1 .cart_quantity_delete');
  const deletionRect = await deleteControl.boundingBox();
  record('TOUCH-REMOVE-VISIBILITY', 'The removal control is visible after the table swipe', deletionRect,
    !!deletionRect && deletionRect.x >= 0 && deletionRect.x + deletionRect.width <= 390);
  await page.screenshot({ path: resolve(run.dir, 'mobile-cart-after-pan.png'), fullPage: true });
  screenshots.push('mobile-cart-after-pan.png');
  // A swipe can leave kinetic scrolling active; allow it to settle before a separate tap.
  await page.waitForTimeout(500);
  const removalPromise = page.waitForResponse(response => new URL(response.url()).pathname.startsWith('/delete_cart/'),
    { timeout: 8000 }).catch(() => null);
  const targetRect = await deleteControl.boundingBox();
  if (!targetRect) throw new Error('Removal target disappeared before touch tap.');
  const x = targetRect.x + targetRect.width / 2, y = targetRect.y + targetRect.height / 2;
  const hitTest = await page.evaluate(({ x, y }) => {
    const hit = document.elementFromPoint(x, y);
    const anchor = hit?.closest('.cart_quantity_delete');
    return { tag: hit?.tagName, className: hit?.className, deletionProduct: anchor?.getAttribute('data-product-id') };
  }, { x, y });
  await page.touchscreen.tap(x, y);
  const removalResponse = await removalPromise;
  const touchEvents = await page.evaluate(() => (window as typeof window & { qaTouchEvents?: unknown[] }).qaTouchEvents ?? []);
  if (removalResponse?.ok()) await page.locator('#product-1').waitFor({ state: 'detached', timeout: 8000 });
  const emptyText = await page.locator('#cart_items').innerText();
  record('TOUCH-REMOVE', 'Tapping removal leaves a clear empty-cart state', {
    text: emptyText, removalRequestObserved: !!removalResponse, httpStatus: removalResponse?.status() ?? null, touchEvents, hitTest, targetRect,
  }, !!removalResponse?.ok() && /empty/i.test(emptyText) && await page.locator('.cart_quantity_delete').count() === 0);
  await page.screenshot({ path: resolve(run.dir, 'mobile-cart-after-remove.png'), fullPage: true });
  screenshots.push('mobile-cart-after-remove.png');
} catch (error) {
  checks.push({ id: 'TOUCH-EXECUTION', checkedAt: new Date().toISOString(), expected: 'Complete the touch smoke',
    actual: error instanceof Error ? error.message : String(error), status: 'blocked' });
} finally {
  // Cleanup is limited to this newly isolated guest session.
  try {
    await page.goto(BASE_URL + '/view_cart', { waitUntil: 'domcontentloaded', timeout: 15000 });
    for (let attempt = 0; attempt < 3 && await page.locator('.cart_quantity_delete').count(); attempt++) {
      const button = page.locator('.cart_quantity_delete').first();
      await button.tap();
      await page.waitForTimeout(300);
    }
  } catch { /* any remaining session is discarded on context close */ }
  await writeJson(resolve(run.dir, 'touch-record.json'), {
    runId: run.id, startedAt: run.startedAt, finishedAt: new Date().toISOString(),
    browser: browser.version(), viewport: { width: 390, height: 844 }, hasTouch: true,
    physicalDevice: false, checks,
    screenshots,
  });
  await context.close();
  await browser.close();
}
console.log(JSON.stringify({ runId: run.id, outputDir: run.dir,
  statuses: checks.map(check => ({ id: check.id, status: check.status })) }, null, 2));
process.exitCode = checks.some(check => check.status === 'blocked') ? 2 : checks.some(check => check.status === 'fail') ? 1 : 0;



