# Quantity label improvement (IMP-01)

The product page shows `Quantity:` beside a number input. This demonstration connects that visible label to the existing `id="quantity"` input using the native HTML `for` attribute. The before-and-after browser checks establish whether the baseline exposes the expected accessible name and whether selecting the label focuses the input.

The patch is browser-local. It makes no network requests, does not replace the input, and does not change the quantity or add-to-cart handlers. Its benefit is a meaningful accessible name and the native larger label activation target. It is a narrow fix: other accessibility or cart-validation findings still require their own changes.

## Code and application

The complete reproducible code is [quantity-label.js](quantity-label.js). The essential change is:

```js
label.htmlFor = input.id;
```

To inspect manually, open a product detail page and paste the file contents in the browser's developer-tools console. Select the `Quantity:` label: the input should receive focus. Inspect the accessibility tree: the spinbutton should be named `Quantity`.

To remove the patch in that browser document:

```js
window.removeQuantityLabelDemo();
```

Reloading or leaving the document also removes it. Applying the script twice is safe; it retains the original `for` attribute for restoration. If future markup no longer matches, it stops with a clear error rather than changing a different field.

A hosted source fix would add `for="quantity"` to the existing visible label after confirming that the input ID is unique. The demonstration's temporary data attribute and removal function are only review helpers.

## Executed before-and-after result

On 9 October 2026, the desktop and mobile demonstration tests completed successfully in 18.1 seconds. Both viewports produced the same result:

| Check | Baseline | Browser patch |
|---|---|---|
| Accessible snapshot | `spinbutton: "1"` — no name | `spinbutton "Quantity:": "1"` |
| Selecting visible Quantity label | Input did not receive focus | Input received focus |
| Keyboard entry | Existing quantity control remained operable | Associated input accepted quantity 3 |
| Cart | Blue Top, Rs. 500 × 3 = Rs. 1500 | Same name, unit price, quantity, and total |
| Remove/reapply patch | Pristine context | Original attribute restored; repeat application retained correct naming |

The trailing colon in `Quantity:` comes from the existing visible label and is preserved. Baseline association is deliberately recorded as a failed site check; the before/after collection tests completed because they successfully demonstrated the change and verified the preserved cart behaviour.

| Environment | Before | After | Structured evidence |
|---|---|---|---|
| Desktop 1366 × 768 | [Screenshot](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/results/demo-quantity-label-association-before-and-after-demo-desktop/quantity-label-baseline.png) | [Screenshot](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/results/demo-quantity-label-association-before-and-after-demo-desktop/quantity-label-patched.png) | [Ledger](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/results/demo-quantity-label-association-before-and-after-demo-desktop/quantity-label-demo.json) |
| Mobile Chromium emulation 390 × 844 | [Screenshot](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/results/demo-quantity-label-association-before-and-after-demo-mobile/quantity-label-baseline.png) | [Screenshot](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/results/demo-quantity-label-association-before-and-after-demo-mobile/quantity-label-patched.png) | [Ledger](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/results/demo-quantity-label-association-before-and-after-demo-mobile/quantity-label-demo.json) |

The same folders contain `quantity-label-baseline-cart.png` and `quantity-label-patched-cart.png`. The [HTML report](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/playwright-report/index.html) groups these attachments.

This change improves the label association only. The separately observed zero/negative quantity acceptance, fractional/blank HTTP 500 failures, search-button naming, and confirmation-modal focus behaviour still require correction. The tests verify DOM naming, focus, keyboard editing, and cart arithmetic; they do not establish how an actual screen reader announces every interaction.

## Repeat verification

After dependency and Chromium installation from the README:

```powershell
npm run test:demo
```

The test runs pristine baseline and patched contexts on desktop 1366 × 768 and mobile Chromium emulation 390 × 844. Each run creates screenshots and `quantity-label-demo.json` attachments beneath `artifacts/<run-id>/results/`. Open the corresponding Playwright HTML report to compare them.

The evidence records the label/input DOM, accessible snapshot, label-click focus, layout, keyboard editing, add confirmation, and cart values. The patched context must expose the `Quantity` accessible name, allow keyboard entry of 3, restore the original attribute, tolerate repeat application, and produce the same correctly calculated cart as the baseline. Baseline accessibility failures are explicitly recorded as `fail`; a completed evidence-collection test is not a claim that the baseline site passes all checks.

Guest cart state is isolated by context. No account, order, payment, or live-site deployment is involved in this demonstration. The browser checks assess naming and keyboard operation; they do not substitute for a screen-reader user study.


