import { test } from '@playwright/test';
import { BASE_URL } from '../src/shared.js';
import { quantityFeedbackIsAcceptable } from '../src/boundary-feedback.js';
import { Ledger, site, navigate, detail, addToCart, viewCart, cart, emptyCart, validLine, errorSummary } from '../src/journey.js';

// Invalid input can trigger a live debug response; never persist trace/network bodies.
// Explicit screenshots show only the publicly rendered product/cart UI.
test.use({ trace: 'off', screenshot: 'off', video: 'off' });

test('quantity boundary exploration @journey', async ({ page }, testInfo) => {
  const ledger = new Ledger(testInfo, 'quantity-boundaries');
  for (const value of ['1', '0', '-1', '1.5', '']) {
    try {
      await emptyCart(page);
      await navigate(page, '/product_details/1');
      const product = await detail(page);
      await page.locator(site.quantity).fill(value);
      const validity = await page.locator(site.quantity).evaluate((el: HTMLInputElement) => ({ value: el.value,
        min: el.min, max: el.max, step: el.step, required: el.required, valid: el.validity.valid,
        rangeUnderflow: el.validity.rangeUnderflow, stepMismatch: el.validity.stepMismatch, valueMissing: el.validity.valueMissing, validationMessage: el.validationMessage, html: el.outerHTML }));
      const feedback = await addToCart(page, value);
      const browserFeedback = await page.locator(site.quantity).evaluate((el: HTMLInputElement) => ({ valid: el.validity.valid, validationMessage: el.validationMessage }));
      const visibleQuantityErrors = await page.locator(site.quantity).evaluate((el: HTMLInputElement) => {
        const ids = `${el.getAttribute('aria-errormessage') ?? ''} ${el.getAttribute('aria-describedby') ?? ''}`.trim().split(/\s+/).filter(Boolean);
        const associated = ids.map(id => document.getElementById(id)).filter((node): node is HTMLElement => !!node);
        const alerts = [...document.querySelectorAll<HTMLElement>('.product-information [role="alert"], .product-information .alert')];
        return [...new Set([...associated, ...alerts].filter(node => {
          const style = getComputedStyle(node);
          return style.display !== 'none' && style.visibility !== 'hidden' && node.getClientRects().length > 0;
        }).map(node => node.innerText.trim()).filter(Boolean))];
      });
      const inputEvidence = await ledger.screenshot(page, `quantity-${value || 'empty'}-feedback`);
      await viewCart(page);
      const rows = await cart(page);
      const accepted = rows.find(r => r.id === 'product-1');
      const assumption = 'Physical product quantities are positive whole numbers. Invalid values must not create zero/negative/fractional cart lines; blank input must be rejected or resolve to a valid positive quantity.';
      const passed = value === '1' ? !!accepted && validLine(accepted, 1) : value === ''
        ? !accepted || Number.isInteger(Number(accepted.quantity)) && Number(accepted.quantity) > 0 && validLine(accepted, Number(accepted.quantity))
        : !accepted;
      ledger.record(`J-QUANTITY-${value || 'EMPTY'}`, { value, url: `${BASE_URL}/product_details/1` },
        value === '1' ? 'Quantity 1 produces one correctly priced cart item' : 'No invalid quantity cart line is created',
        assumption, { product, validity, feedback, cart: rows }, passed ? 'pass' : 'fail',
        [await ledger.screenshot(page, `quantity-${value || 'empty'}`)]);
      const feedbackPassed = quantityFeedbackIsAcceptable({ value, cartRowCreated: !!accepted,
        requestObserved: feedback.requestObserved, httpStatus: feedback.status, successModalVisible: feedback.modalVisible,
        modalText: feedback.modalText, nativeValid: browserFeedback.valid, nativeMessage: browserFeedback.validationMessage,
        visibleErrors: visibleQuantityErrors });
      ledger.record(`J-QUANTITY-${value || 'EMPTY'}-FEEDBACK`, { value },
        value === '1' ? 'Successful add provides accurate confirmation' : 'Invalid input is rejected with useful feedback and no HTTP 5xx response',
        'Customer confidence and graceful invalid-input handling; HTML constraints where present',
        { validity, browserFeedback, visibleQuantityErrors, response: feedback, cartRowCreated: !!accepted }, feedbackPassed ? 'pass' : 'fail', [inputEvidence]);
    } catch (error) {
      ledger.record(`J-QUANTITY-${value || 'EMPTY'}`, value, 'Boundary can be assessed through detail and cart',
        'Assessment exploration', errorSummary(error), 'blocked');
    }
  }
  try { await emptyCart(page); } catch { /* each recorded row retains its observed state */ }
  await ledger.save();
});







