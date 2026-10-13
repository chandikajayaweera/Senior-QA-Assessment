import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { test, expect, request } from '@playwright/test';
import { BASE_URL, parsePrice } from '../src/shared.js';
import { Ledger, navigate, detail, addToCart, viewCart, cart, emptyCart, validLine, sameName } from '../src/journey.js';

// This file runs without credential-bearing traces or automatic screenshots.
test.use({ trace: 'off', screenshot: 'off', video: 'off' });

  test('dedicated owned account reaches checkout @journey', async ({ page }, testInfo) => {
    const ledger = new Ledger(testInfo, 'authenticated-checkout');
    const api = await request.newContext({ baseURL: BASE_URL, timeout: 30000 });
    const identity = crypto.randomBytes(8).toString('hex');
    const email = `qa-assessment-${identity}@example.test`;
    const password = crypto.randomBytes(20).toString('base64url');
    const credentialPath = path.resolve('.private', `${testInfo.project.name}-${identity}.json`);
    let created = false;
    let originalFailure: unknown;
    try {
      await fs.mkdir(path.dirname(credentialPath), { recursive: true });
      await fs.writeFile(credentialPath, JSON.stringify({ email, password, purpose: 'New account owned by this assessment only', created: false }));
      const create = await api.post('/api/createAccount', { form: {
        name: 'QA Assessment', email, password, title: 'Mr', birth_date: '1', birth_month: '1', birth_year: '1990',
        firstname: 'QA', lastname: 'Assessment', company: 'Test Only', address1: 'Synthetic Test Address', address2: 'No Delivery',
        country: 'India', zipcode: '000000', state: 'Test State', city: 'Test City', mobile_number: '0000000000'
      } });
      const body = await create.json();
      expect(body.responseCode, 'fresh owned account creation').toBe(201);
      created = true;
      await fs.writeFile(credentialPath, JSON.stringify({ email, password, purpose: 'New account owned by this assessment only', created: true }));
      ledger.record('J-OWN-ACCOUNT-CREATE', 'Unique synthetic identity; credentials excluded', 'Provision only a newly owned test account',
        'Assessment use-own-accounts requirement; documented createAccount API', { httpStatus: create.status(), responseCode: body.responseCode, message: body.message }, 'pass');
      await navigate(page, '/login');
      await page.locator('[data-qa="login-email"]').fill(email);
      await page.locator('[data-qa="login-password"]').fill(password);
      await page.locator('[data-qa="login-button"]').click();
      await expect(page.getByText('Logged in as', { exact: false })).toBeVisible({ timeout: 20000 });
      await emptyCart(page);
      ledger.record('J-OWN-ACCOUNT-RESET', 'Owned account login and cart reset', 'Authenticated session is established with an empty cart',
        'Account-backed state isolation', { loggedIn: true, cartRows: await cart(page) }, (await cart(page)).length === 0 ? 'pass' : 'fail');
      await navigate(page, '/product_details/1');
      const product = await detail(page);
      await addToCart(page, '3');
      await viewCart(page);
      await page.getByText('Proceed To Checkout', { exact: true }).click();
      await page.waitForURL('**/checkout', { timeout: 20000 });
      const checkoutRows = await cart(page, '#cart_items table tr:has(.cart_description h4)');
      const content = await page.locator('#cart_items').innerText();
      const checkoutTable = page.locator('#cart_items table').filter({ hasText: product.name }).first();
      const tableHtml = await checkoutTable.evaluate(el => el.outerHTML);
      const aggregateRow = checkoutTable.locator('tr').filter({ hasText: 'Total Amount' });
      const aggregate = (await aggregateRow.locator('.cart_total_price').innerText()).trim();
      const aggregatePrice = parsePrice(aggregate);
      const linePrices = checkoutRows.map(row => parsePrice(row.total));
      const aggregateMatchesLines = !!aggregatePrice && linePrices.every(line => line && line.currency === aggregatePrice.currency)
        && aggregatePrice.minor === linePrices.reduce((sum, line) => sum + (line?.minor ?? 0), 0);
      const placeOrder = page.getByRole('link', { name: 'Place Order', exact: true });
      const checkout = { url: page.url(), content, rows: checkoutRows, totalAmount: aggregate, aggregateMatchesLines, tableHtml, placeOrderVisible: await placeOrder.isVisible(),
        stoppedBeforeOrder: true };
      ledger.facts.checkout = checkout;
      const productRow = checkoutRows.find(r => sameName(r.name, product.name));
      ledger.record('J-AUTH-CHECKOUT', 'Owned account, Blue Top × 3', 'Checkout shows address, correct product quantity and line total, an aggregate equal to the line-total sum, and order continuation',
        'Assessment checkout; no order/payment submission authorised', checkout,
        /Address Details/.test(content) && !!productRow && validLine(productRow, 3) && aggregateMatchesLines && checkout.placeOrderVisible ? 'pass' : 'fail',
        [await ledger.screenshot(page, 'authenticated-checkout')]);
      await emptyCart(page);
      ledger.record('J-OWN-ACCOUNT-CART-CLEANUP', 'Remove owned-account test items', 'Test account cart is empty',
        'Assessment non-disruption', { rows: await cart(page) }, (await cart(page)).length === 0 ? 'pass' : 'fail');
    } catch (error) {
      // No message or call log from authentication errors is persisted because it may contain credentials.
      originalFailure = new Error('Authenticated checkout could not complete; see non-sensitive ledger and prior completed steps.');
      ledger.record('J-AUTH-EXECUTION', 'owned-account checkout', 'Reach checkout without submitting an order',
        'Assessment scope', { errorType: error instanceof Error ? error.name : typeof error, credentialsRedacted: true }, 'blocked');
    } finally {
      if (created) {
        try {
          const removed = await api.delete('/api/deleteAccount', { form: { email, password } });
          const result = await removed.json();
          const deleted = result.responseCode === 200;
          ledger.record('J-OWN-ACCOUNT-DELETE', 'Delete only account created in this test', 'Own disposable account is deleted',
            'Documented deleteAccount API; ownership confirmed by creation in this run',
            { httpStatus: removed.status(), responseCode: result.responseCode, message: result.message }, deleted ? 'pass' : 'fail');
          if (deleted) await fs.writeFile(credentialPath, JSON.stringify({ deleted: true, deletedAt: new Date().toISOString(), credentialsRemoved: true }));
          else originalFailure ??= new Error('Own test account cleanup failed; local private credentials retained for cleanup.');
        } catch {
          ledger.record('J-OWN-ACCOUNT-DELETE', 'Own account', 'Own disposable account is deleted', 'Ownership cleanup',
            { completed: false, credentialsRetainedLocally: true }, 'blocked');
          originalFailure ??= new Error('Own test account deletion could not be confirmed.');
        }
      }
      await api.dispose();
      await ledger.save();
    }
    if (originalFailure) throw originalFailure;
  });


