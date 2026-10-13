import path from 'node:path';
import { test, expect } from '@playwright/test';
import { Ledger, site, projectContext, navigate, snapshotControl, activeControl, layout, detail, addToCart, viewCart, cart, validLine } from '../src/journey.js';

// Before/after use separate contexts so neither cookies nor DOM mutations leak into the baseline.
test('quantity label association before and after @demo', async ({ browser }, testInfo) => {
  const ledger = new Ledger(testInfo, 'quantity-label-demo');
  const patchPath = path.resolve('demo/quantity-label.js');
  let baselineCart: unknown;
  let patchedCart: unknown;
  try {
    for (const variant of ['baseline', 'patched'] as const) {
      const context = await browser.newContext(projectContext(testInfo));
      const page = await context.newPage();
      try {
        await navigate(page, '/product_details/1');
        const product = await detail(page);
        const before = await snapshotControl(page.locator(site.quantity));
        if (variant === 'patched') await page.addScriptTag({ path: patchPath });
        const label = page.locator('.product-information label').filter({ hasText: /^Quantity:$/ });
        await page.locator('.product-information h2').click();
        await label.click();
        const labelFocusedInput = await page.locator(site.quantity).evaluate(el => document.activeElement === el);
        const after = await snapshotControl(page.locator(site.quantity));
        const visibleLayout = await layout(page, site.quantity);
        ledger.facts[variant] = { product, before, after, labelFocusedInput, focus: await activeControl(page), layout: visibleLayout,
          labelHtml: await label.evaluate(el => el.outerHTML) };
        const evidence = await ledger.screenshot(page, `quantity-label-${variant}`);
        ledger.record(`DEMO-${variant.toUpperCase()}-ASSOCIATION`, { viewport: testInfo.project.use.viewport, patchApplied: variant === 'patched' },
          'Visible Quantity label exposes the Quantity accessible name and focuses its input when selected',
          'WCAG 2.2 1.3.1 and 4.1.2; native HTML label association', ledger.facts[variant],
          labelFocusedInput && /spinbutton "Quantity:?"/.test(after.aria) ? 'pass' : 'fail', [evidence]);
        if (variant === 'patched') {
          await expect(page.getByRole('spinbutton', { name: /^Quantity:?$/ })).toBeVisible();
          expect(labelFocusedInput).toBe(true);
          await page.keyboard.press('ControlOrMeta+A');
          await page.keyboard.type('3');
          await expect(page.getByRole('spinbutton', { name: /^Quantity:?$/ })).toHaveValue('3');
          ledger.record('DEMO-KEYBOARD-EDIT', 'Select associated label, Ctrl+A, type 3', 'Quantity remains directly editable by keyboard',
            'Preserve existing input behaviour; WCAG 2.2 2.1.1', { inputValue: await page.locator(site.quantity).inputValue() }, 'pass');
          const originalFor = await label.getAttribute('data-qa-original-for');
          await page.evaluate(() => (window as typeof window & { removeQuantityLabelDemo?: () => void }).removeQuantityLabelDemo?.());
          const restoredFor = await label.getAttribute('for');
          ledger.record('DEMO-REMOVE', 'Run window.removeQuantityLabelDemo()', 'Original label attribute is restored',
            'Reversible browser-applied demonstration', { originalFor, restoredFor }, (originalFor || null) === restoredFor ? 'pass' : 'fail');
          expect(restoredFor).toBe(originalFor || null);
          await page.addScriptTag({ path: patchPath });
          await page.addScriptTag({ path: patchPath });
          await expect(page.getByRole('spinbutton', { name: /^Quantity:?$/ })).toBeVisible();
        }
        const feedback = await addToCart(page, '3', true);
        await viewCart(page);
        const rows = await cart(page);
        if (variant === 'baseline') baselineCart = rows.map(({ html, ...row }) => row);
        else patchedCart = rows.map(({ html, ...row }) => row);
        const selected = rows.find(row => row.id === 'product-1');
        ledger.record(`DEMO-${variant.toUpperCase()}-CART`, { product: product.name, quantity: 3, keyboardAdd: true },
          'Keyboard add preserves unit price, quantity 3, correct total, and success feedback',
          'Assessment improvement regression requirement', { feedback, cart: rows },
          !!selected && validLine(selected, 3) && feedback.modalVisible && feedback.status === 200 ? 'pass' : 'fail',
          [await ledger.screenshot(page, `quantity-label-${variant}-cart`)]);
        expect(selected).toBeTruthy();
        expect(validLine(selected!, 3)).toBe(true);
        expect(feedback.modalVisible).toBe(true);
      } finally { await context.close(); }
    }
    expect(patchedCart).toEqual(baselineCart);
    ledger.record('DEMO-CART-UNCHANGED', { baselineCart, patchedCart }, 'Baseline and patched cart values match exactly',
      'Frontend change modifies only label association', { equal: JSON.stringify(baselineCart) === JSON.stringify(patchedCart) }, 'pass');
  } catch (error) {
    ledger.record('DEMO-EXECUTION', 'before/after contexts', 'Complete both demonstration variants and regression checks',
      'Automation prerequisite', error instanceof Error ? error.message.split('\n').slice(0, 4).join('\n') : String(error), 'blocked');
    throw error;
  } finally { await ledger.save(); }
});

