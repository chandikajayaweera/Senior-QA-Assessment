import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { test, expect, request } from '@playwright/test';
import { BASE_URL, normalizeName, parsePrice } from '../src/shared.js';
import { Ledger, site, navigate, snapshotControl, activeControl, layout, axe, detail, addToCart, viewCart, cart, emptyCart, sameName, samePrice, validLine, errorSummary } from '../src/journey.js';

// These tests collect passing behaviour and defects in a per-check ledger. A suite pass means
// collection completed; customer-facing failures remain explicitly marked fail in that ledger.
test('search, details, cart, browse and guest account entry @journey', async ({ page, request }, testInfo) => {
  const ledger = new Ledger(testInfo, 'journey');
  try {
    const searchResponse = await request.post(`${BASE_URL}/api/searchProduct`, { form: { search_product: 'top' } });
    const searchBody = await searchResponse.json();
    const products: { id: number; name: string; price: string }[] = searchBody.products ?? [];
    expect(products.length, 'matching products prerequisite').toBeGreaterThan(0);
    ledger.facts.api = { url: searchResponse.url(), httpStatus: searchResponse.status(), body: searchBody };
    await navigate(page, '/products');
    const search = page.locator(site.search), submit = page.locator(site.searchButton);
    await search.fill('top');
    await search.focus();
    const searchStructure = { field: await snapshotControl(search), button: await snapshotControl(submit), axe: await axe(page, '#search_product, #submit_search') };
    ledger.facts.searchStructure = searchStructure;
    ledger.record('FE-SEARCH-AXE', '#search_product, #submit_search', 'Scoped automated accessibility check completes without violations',
      'Automated WCAG check supplements keyboard inspection; incomplete/manual items are not asserted as passes', searchStructure.axe,
      searchStructure.axe.status === 'blocked' ? 'blocked' : searchStructure.axe.violations.length ? 'fail' : 'pass');
    ledger.record('FE-SEARCH-NAME', { url: page.url() }, 'Search field and search button expose names describing their purpose',
      'WCAG 2.2 2.4.6 Headings and Labels; 4.1.2 Name, Role, Value. An icon-font glyph is not a meaningful Search label.', searchStructure,
      /Search Product/.test(searchStructure.field.aria) && /button "[^\"]*search[^\"]*"/i.test(searchStructure.button.aria) ? 'pass' : 'fail');
    await page.keyboard.press('Tab');
    const searchTab = await activeControl(page);
    ledger.record('FE-SEARCH-TAB', 'Tab from search field', 'Focus reaches the search action', 'WCAG 2.2 2.1.1 Keyboard', searchTab, searchTab.id === 'submit_search' ? 'pass' : 'fail');
    const searchNavigation = page.waitForURL('**/products?search=top', { timeout: 20000 });
    await page.keyboard.press('Enter');
    await searchNavigation;
    await expect(page.getByRole('heading', { name: 'Searched Products', exact: true })).toBeVisible();
    const cards = await page.locator(site.cards).evaluateAll(elements => elements.map(el => ({
      href: el.querySelector('a[href*="/product_details/"]')?.getAttribute('href') ?? '',
      name: el.querySelector('.productinfo p')?.textContent?.trim() ?? '',
      price: el.querySelector('.productinfo h2')?.textContent?.trim() ?? ''
    })));
    const first = cards.find(p => products.some(api => p.href === `/product_details/${api.id}`));
    expect(first, 'UI/API matching product prerequisite').toBeTruthy();
    const apiProduct = products.find(p => first!.href === `/product_details/${p.id}`)!;
    ledger.facts.searchResults = cards;
    ledger.record('J-SEARCH', 'top, Tab then Enter', 'Search shows relevant products and opens a matching detail page',
      'Assessment required journey; compare result IDs with live search API because top also matches category Tops & Shirts', { url: page.url(), count: cards.length, products: cards },
      cards.length > 0 && cards.length === products.length && cards.every(p => products.some(api => p.href === '/product_details/' + api.id)) ? 'pass' : 'fail',
      [await ledger.screenshot(page, 'search-results')]);
    await page.locator(`a[href="${first!.href}"]`).first().click();
    await page.waitForURL(`**${first!.href}`);
    const product = await detail(page);
    ledger.facts.product = product;
    await page.locator(site.quantity).scrollIntoViewIfNeeded();
    await page.locator(site.quantity).focus();
    const detailStructure = { quantity: await snapshotControl(page.locator(site.quantity)), add: await snapshotControl(page.locator(site.addButton)),
      axe: await axe(page, site.detail), layout: await layout(page, site.quantity) };
    ledger.facts.detailStructure = detailStructure;
    ledger.record('FE-DETAIL-AXE', site.detail, 'Scoped automated accessibility check completes without violations',
      'Automated WCAG check supplements keyboard inspection; incomplete/manual items are not asserted as passes', detailStructure.axe,
      detailStructure.axe.status === 'blocked' ? 'blocked' : detailStructure.axe.violations.length ? 'fail' : 'pass');
    ledger.record('FE-QUANTITY-NAME', { quantity: 3, url: page.url() }, 'Quantity input has an accessible name associated with its visible label',
      'WCAG 2.2 1.3.1 Info and Relationships; 4.1.2 Name, Role, Value', detailStructure.quantity,
      /spinbutton "Quantity:?"/.test(detailStructure.quantity.aria) ? 'pass' : 'fail', [await ledger.screenshot(page, 'detail-before-add')]);
    const detailLayout = detailStructure.layout;
    ledger.record('FE-DETAIL-LAYOUT', testInfo.project.use.viewport, 'Quantity and add controls are visible within viewport width without horizontal overflow',
      'Assessment mobile usability; WCAG 2.2 1.4.10 Reflow at the reviewed width', detailLayout,
      detailLayout.control?.withinWidth && !detailLayout.viewport.horizontalOverflow ? 'pass' : 'fail');
    const feedback = await addToCart(page, '3', true);
    ledger.facts.addFeedback = feedback;
    ledger.record('J-ADD-FEEDBACK', { product: product.name, quantity: 3, action: 'Tab from quantity then Enter' },
      'Keyboard activation adds item and confirms success', 'WCAG 2.2 2.1.1; assessment shopping behaviour', feedback,
      feedback.status === 200 && feedback.modalVisible && /added to cart/i.test(feedback.modalText ?? '') ? 'pass' : 'fail',
      [await ledger.screenshot(page, 'add-confirmation')]);
    const modal = page.locator(site.addModal);
    if (feedback.modalVisible) {
      const modalKeyboard = { before: await activeControl(page) };
      await page.keyboard.press('Tab');
      const afterTab = await activeControl(page);
      await page.keyboard.press('Shift+Tab');
      const afterShiftTab = await activeControl(page);
      ledger.record('FE-MODAL-KEYBOARD', 'Tab / Shift+Tab after add confirmation',
        'Keyboard focus remains reachable in the modal with suitable dialog semantics', 'WCAG 2.2 2.1.1; 2.4.3 Focus Order',
        { ...modalKeyboard, afterTab, afterShiftTab, dialogHtml: feedback.modalHtml },
        await page.evaluate(() => !!document.querySelector('#cartModal')?.contains(document.activeElement)) ? 'pass' : 'fail');
    }
    await viewCart(page);
    const initialCart = await cart(page);
    const selectedRow = initialCart.find(r => r.id === `product-${apiProduct.id}`);
    expect(selectedRow, 'selected cart row prerequisite').toBeTruthy();
    ledger.facts.crossSurface = { api: apiProduct, search: first, detail: product, cart: selectedRow };
    ledger.record('TECH-CROSS-SURFACE', { search: 'top', productId: apiProduct.id, quantity: 3 },
      'Product name and unit price agree across API/search/detail/cart; line total equals unit price × 3',
      'Assessment explicit comparison; integer minor-unit calculation', ledger.facts.crossSurface,
      sameName(apiProduct.name, first!.name, product.name, selectedRow!.name) && samePrice(apiProduct.price, first!.price, product.price, selectedRow!.price)
        && validLine(selectedRow!, 3) ? 'pass' : 'fail', [await ledger.screenshot(page, 'cart-quantity-three')]);
    await page.reload({ waitUntil: 'domcontentloaded' });
    const reloadedCart = await cart(page);
    ledger.record('J-CART-RELOAD', 'reload cart', 'Cart preserves selected product and quantity across refresh',
      'Ordinary shopping expectation; session-level only', reloadedCart,
      reloadedCart.length === initialCart.length && JSON.stringify(reloadedCart.map(({ html, ...r }) => r)) === JSON.stringify(initialCart.map(({ html, ...r }) => r)) ? 'pass' : 'fail');
    await navigate(page, '/products');
    await page.locator('.left-sidebar a[href="#Women"]').click();
    const category = page.locator('#Women').getByRole('link', { name: 'Tops', exact: true });
    await category.click();
    await page.waitForURL('**/category_products/**');
    const categoryData = { url: page.url(), heading: await page.locator('.features_items h2.title').innerText(),
      productCount: await page.locator(site.cards).count() };
    ledger.record('J-BROWSE', 'Women → Tops', 'Category browse shows products with usable detail links', 'Assessment browsing journey', categoryData,
      categoryData.productCount > 0 && /tops/i.test(categoryData.heading) ? 'pass' : 'fail', [await ledger.screenshot(page, 'browse-category')]);
    const secondLink = page.locator(`a[href*="/product_details/"]:not([href="${first!.href}"])`).first();
    const secondPath = await secondLink.getAttribute('href');
    expect(secondPath, 'distinct second product prerequisite').toBeTruthy();
    await secondLink.click();
    await page.waitForURL(`**${secondPath}`);
    const secondProduct = await detail(page);
    await addToCart(page, '1');
    await viewCart(page);
    const twoItemCart = await cart(page);
    const secondId = secondPath!.split('/').pop();
    const secondRow = twoItemCart.find(r => r.id === `product-${secondId}`);
    ledger.record('J-CART-TWO', { first: apiProduct.name, second: secondProduct.name, quantities: [3, 1] },
      'Both distinct items and their line totals appear', 'Shopping expectation; decimal-safe arithmetic', twoItemCart,
      twoItemCart.length === 2 && !!secondRow && validLine(secondRow, 1) && twoItemCart.some(r => r.id === `product-${apiProduct.id}` && validLine(r, 3)) ? 'pass' : 'fail',
      [await ledger.screenshot(page, 'cart-two-products')]);
    const cartLayout = await layout(page, '#cart_info_table');
    ledger.record('FE-CART-LAYOUT', testInfo.project.use.viewport, 'Cart price, quantity, total and removal remain readable and operable',
      'Assessment mobile journey; horizontal table scrolling is assessed as usability rather than automatically a WCAG defect', cartLayout,
      cartLayout.control?.withinWidth && !cartLayout.viewport.horizontalOverflow ? 'pass' : 'fail');
    await page.locator(`#product-${secondId} .cart_quantity_delete`).click();
    await page.locator(`#product-${secondId}`).waitFor({ state: 'detached' });
    const afterRemoval = await cart(page);
    ledger.record('J-REMOVE', `Remove ${secondProduct.name}`, 'Only the chosen item is removed; remaining item and quantity are unchanged',
      'Assessment cart removal', afterRemoval,
      afterRemoval.length === 1 && afterRemoval[0].id === `product-${apiProduct.id}` && validLine(afterRemoval[0], 3) ? 'pass' : 'fail');
    await page.getByText('Proceed To Checkout', { exact: true }).click();
    await page.locator(site.guestModal).waitFor({ state: 'visible' });
    const gate = { text: await page.locator(site.guestModal).innerText(), html: await page.locator(site.guestModal).evaluate(el => el.outerHTML) };
    ledger.record('J-GUEST-CHECKOUT', 'Proceed To Checkout as guest', 'Guest is directed to account entry before checkout',
      'Observed site account requirement; not a claim that guest checkout is required', gate,
      /Register.*Login/i.test(gate.text) ? 'pass' : 'fail', [await ledger.screenshot(page, 'guest-checkout-gate')]);
    await page.locator(site.guestModal).getByRole('link', { name: 'Register / Login' }).click();
    await page.waitForURL('**/login');
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    ledger.record('J-ACCOUNT-ENTRY', 'Follow guest Register / Login', 'Login and registration entry points are available', 'Assessment account entry',
      { url: page.url(), loginHeading: await page.getByRole('heading', { name: 'Login to your account' }).innerText(),
        signupHeading: await page.getByRole('heading', { name: 'New User Signup!' }).innerText() }, 'pass', [await ledger.screenshot(page, 'account-entry')]);
    await emptyCart(page);
    const emptyState = { rows: await cart(page), text: await page.locator('#cart_items').innerText() };
    ledger.record('J-EMPTY-CART', 'Remove all guest items', 'Empty cart explains state and provides shopping onward action', 'Shopping expectation', emptyState,
      emptyState.rows.length === 0 && /empty/i.test(emptyState.text) ? 'pass' : 'fail', [await ledger.screenshot(page, 'empty-cart')]);
  } catch (error) {
    ledger.record('J-EXECUTION', 'current phase', 'All planned journey checks execute', 'Automation prerequisite', errorSummary(error), 'blocked');
    throw error;
  } finally { await ledger.save(); }
});



