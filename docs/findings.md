# Prioritised findings and developer handover

The valid-quantity journey succeeded on both reviewed viewports. The confirmed issues below come from executed browser/network/DOM checks; they do not imply that every site component was assessed.

Priority is this review's judgment: P1 address first, P2 address next, P3 planned improvement. Severity describes observed impact, not a claim about an organisation's internal severity policy. Repeated test failures are grouped into issues rather than counted as separate bugs.

| ID | Type | Severity / priority | Customer impact |
| --- | --- | --- | --- |
| F-01 | Functional: invalid cart quantity | High / P1 | Zero or negative items and incorrect shopping totals can enter the cart |
| F-03 | Public diagnostic information exposure | Moderate / P1 | Ordinary invalid input returns internal diagnostic information |
| F-02 | Functional: invalid-input failure handling | Moderate / P2 | Fractional/blank input causes HTTP 500 without useful rejection |
| F-04 | Accessibility: search-button purpose | Moderate / P2 | Icon glyph does not provide an understandable action name |
| F-05 | Accessibility: quantity association | Moderate / P2 | Quantity has no programmatic name; label selection does not focus it |
| F-06 | Accessibility: confirmation focus/semantics | Moderate / P2 | Keyboard focus stays behind the visible confirmation |
| F-07 | Accessibility: text contrast | Moderate / P2 | Price and add action fall below measured contrast requirements |

## F-01 — Zero and negative quantities create cart lines

**Goal:** choose a valid number of physical products and trust the cart total. **Scope:** product 1, Blue Top, desktop/mobile; guest cart.

**Reproduce:** start with an empty isolated cart; open /product_details/1; replace Quantity with 0; select Add to cart and View Cart. Clear the cart and repeat with -1.

**Expected/basis:** the rendered number field has min=1; physical product quantities are assumed to be positive whole numbers. Invalid input should be rejected without altering the cart.

**Actual:** both requests returned HTTP 200 and a success confirmation. Quantity 0 produced Rs.0; quantity -1 produced Rs.-500 against unit price Rs.500. Both viewports reproduced this. Evidence: [desktop quantity ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/boundaries-quantity-boundary-exploration-journey-desktop/quantity-boundaries.json), [mobile quantity ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/boundaries-quantity-boundary-exploration-journey-mobile/quantity-boundaries.json); J-QUANTITY-0 and J-QUANTITY--1, with linked screenshots.

**Cause established:** the [public cart handler](../artifacts/investigation-2026-10-09T14-43-52-703Z-18168/cart.js) sends the input's raw value without a validity guard; the observed endpoint accepts these values and retains invalid cart lines. Backend storage/validation implementation requires internal access. No order/payment exploitation was tested.

**Recommend/check correction:** enforce positive integer quantities at client and server boundaries, explain rejection, and retain the prior cart. Verify 0/-1 rejection plus 1/3 success, exact line/aggregate arithmetic, persistence, removal, and safe direct-endpoint handling.

## F-02 — Fractional and blank quantity return HTTP 500

**Goal:** recover from a typing mistake with clear feedback. **Reproduce:** in an empty guest cart on product 1, enter 1.5, then separately blank, and select Add to cart.

**Expected/basis:** the number field's default step makes 1.5 invalid; blank should be rejected clearly or resolve to a valid positive quantity under the stated shopping assumption. Neither case should cause a server error.

**Actual:** /add_to_cart/1?quantity=1.5 and ?quantity= returned HTTP 500; no cart row or success modal appeared. Cart-state checks pass because no invalid row exists, while feedback checks fail. Evidence: [desktop quantity ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/boundaries-quantity-boundary-exploration-journey-desktop/quantity-boundaries.json), [mobile quantity ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/boundaries-quantity-boundary-exploration-journey-mobile/quantity-boundaries.json); J-QUANTITY-1.5-FEEDBACK and J-QUANTITY-EMPTY-FEEDBACK.

**Cause established:** allowlisted response diagnostics report ValueError and failed integer conversion for the submitted values. The shown public handler has a success callback but no explicit error callback. A specific backend source line and all validation branches were not verified.

**Recommend/check correction:** reject unsuitable input before mutation, return a controlled client-error response when server rejection is needed, and show an associated readable error. Recheck fractional/blank input, unchanged prior cart, no HTTP 5xx, useful keyboard-accessible feedback, and valid adds. A controlled server rejection with useful feedback can be acceptable; absence of a request is not the only valid design.

## F-03 — Invalid input exposes public diagnostic pages

**Goal:** receive a safe error response. **Reproduce:** the ordinary guest fractional/blank Add to cart steps from F-02; inspect the failing response.

**Expected/basis:** public error responses should not expose deployment/source/request diagnostics. The [Django deployment checklist](https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/#debug) recommends disabling debug responses for production.

**Actual:** HTTP 500 responses were identified as diagnostic pages, reporting ValueError and including traceback/settings/request metadata in the initially observed response. Shareable evidence deliberately removes those contents; responseDiagnostic retains allowlisted facts and a SHA-256 digest. Evidence: [desktop quantity ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/boundaries-quantity-boundary-exploration-journey-desktop/quantity-boundaries.json), [mobile quantity ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/boundaries-quantity-boundary-exploration-journey-mobile/quantity-boundaries.json), and [redaction record](../artifacts/tooling/evidence-redaction.json).

**Impact/cause:** internal diagnostic information is publicly returned by the error-handling path. No credential compromise or exploitable account/payment impact is claimed. Maintainers must confirm deployment settings and complete server-side error handling internally.

**Recommend/check correction:** serve a minimal safe public error, keep diagnostics in controlled server logs, and verify both invalid-input responses and a safe unexpected-error path contain no debug traceback, settings, paths, or request metadata. Retain validation and valid-cart regression checks.

## F-04 — Search button exposes an icon glyph as its name

**Goal:** identify and activate product search with assistive technology. **Reproduce:** on /products inspect #submit_search's accessible name, then compare it with the search field and activate it using Tab/Enter.

**Expected/basis:** the action should have a meaningful programmatic name; [WCAG 2.2 4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value).

**Actual:** the textbox is named Search Product, but the button is named the private-use icon glyph U+F002. Scoped axe reports button-name; keyboard activation itself works. Evidence: [desktop guest ledger](../artifacts/tests-2026-10-09T14-52-39-959Z-3844/results/journey-search-details-car-8380b-guest-account-entry-journey-desktop/journey.json), [mobile guest ledger](../artifacts/tests-2026-10-09T14-52-39-959Z-3844/results/journey-search-details-car-8380b-guest-account-entry-journey-mobile/journey.json); FE-SEARCH-NAME and FE-SEARCH-AXE.

**Cause/recommendation:** the captured button contains an icon without meaningful text or an explicit purpose name. Give it an accessible name such as Search products and hide the decorative icon from name computation. Verify the computed name, Tab/Enter activation, and current API/UI matching results.

## F-05 — Visible Quantity label is not associated with its input

**Goal:** identify/edit quantity reliably. **Reproduce:** on product 1 inspect #quantity's accessible snapshot and select the visible Quantity label.

**Expected/basis:** preserve the label/input relationship and meaningful control name; [WCAG 1.3.1](https://www.w3.org/TR/WCAG22/#info-and-relationships) and [4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value).

**Actual:** baseline snapshot is an unnamed spinbutton; selecting the label does not focus the input. Captured label has no for attribute. Both viewports reproduce it. Evidence: [desktop demo ledger](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/results/demo-quantity-label-association-before-and-after-demo-desktop/quantity-label-demo.json), [mobile demo ledger](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/results/demo-quantity-label-association-before-and-after-demo-mobile/quantity-label-demo.json); DEMO-BASELINE-ASSOCIATION, plus FE-QUANTITY-NAME in the guest ledgers.

**Recommend/check correction:** associate the existing label with the unique quantity input. [IMP-01 code and before/after proof](../demo/README.md) changes the name to Quantity:, makes label selection focus the field, and preserves keyboard entry and Rs.500 × 3 = Rs.1500. Verify the source fix on both layouts; this demonstration does not fix F-01/F-02.

## F-06 — Add confirmation leaves keyboard focus behind it

**Goal:** use confirmation actions after adding an item. **Reproduce:** focus Quantity, enter 3, Tab to Add to cart, Enter; after the visible confirmation opens, Tab then Shift+Tab.

**Expected/basis:** confirmation interactions should have understandable semantics and a logical focus order; [WCAG 2.4.3](https://www.w3.org/TR/WCAG22/#focus-order) and [4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value).

**Actual:** focus remains on Add to cart; Tab goes to background Write Your Review; Shift+Tab returns to Add to cart. Captured #cartModal has no dialog role/accessible dialog association. Evidence: [desktop guest ledger](../artifacts/tests-2026-10-09T14-52-39-959Z-3844/results/journey-search-details-car-8380b-guest-account-entry-journey-desktop/journey.json), [mobile guest ledger](../artifacts/tests-2026-10-09T14-52-39-959Z-3844/results/journey-search-details-car-8380b-guest-account-entry-journey-mobile/journey.json); FE-MODAL-KEYBOARD and add-confirmation screenshots.

**Cause/recommendation:** the public success handler changes CSS classes to show the panel without managing focus in the shown handler. Use a properly named dialog with focus entry/return and background isolation, or a suitable nonmodal status interaction. Verify reachable actions and sensible Tab/Shift+Tab, dismissal and focus return. The two-key sample does not prove every trapping/dismissal behavior or actual screen-reader announcement.

## F-07 — Price and add text have insufficient contrast

**Goal:** read the price and purchase action. **Reproduce:** inspect the rendered price and Add to cart styles on product 1 at either viewport.

**Expected/basis:** [WCAG 2.2 1.4.3](https://www.w3.org/TR/WCAG22/#contrast-minimum) thresholds apply to the rendered text sizes.

**Actual:** price #fe980f on white, 30px bold, measures 2.16:1 against a 3:1 requirement. Add to cart white on #fe980f, 15px normal, measures 2.16:1 against 4.5:1. Scoped axe reports both; independent calculation from the captured colours gives 2.1622:1. Evidence: [desktop guest ledger](../artifacts/tests-2026-10-09T14-52-39-959Z-3844/results/journey-search-details-car-8380b-guest-account-entry-journey-desktop/journey.json), [mobile guest ledger](../artifacts/tests-2026-10-09T14-52-39-959Z-3844/results/journey-search-details-car-8380b-guest-account-entry-journey-mobile/journey.json); FE-DETAIL-AXE, color-contrast nodes.

**Cause/recommendation:** the observed orange/white text combination provides inadequate contrast. For example, #a85400 against white calculates 5.3393:1; validate a chosen brand-compatible treatment in actual states. Check default/hover/focus text contrast, price readability, and unchanged interactions. Broader site contrast was not audited.

## Usability concerns and improvement proposals

**UX-01 — Mobile cart requires horizontal panning (P3).** At 390px, table columns including the full total/removal action initially extend beyond the 358px scroll container. The document itself has no horizontal overflow. The [verified touch probe](../artifacts/mobile-touch-2026-10-09T15-10-51-203Z-8332/touch-record.json) pans the container 0→96px, exposes removal, and removes the item successfully. This is additional customer effort, not a proved broken action or automatic WCAG reflow defect. Consider a mobile item layout showing name, price, quantity, total and removal together; trade-off is greater vertical space. Screenshots are in that touch-run folder.

**CONTENT-01 — Product titles are generic (P3).** All 34 detail pages have Automation Exercise - Product Details. Titles exist; none identifies the specific product. Consider Blue Top | Automation Exercise for product 1 to help distinguish pages/tabs.

**CONTENT-02 — Main-image alternatives are generic (P2 content review).** All 34 use ecommerce website products. Attributes exist and are nonempty; wording utility needs editorial review. For the inspected representative image, Blue Top shown on a model is a concrete conservative example. Determine whether each image is informative and what detail is useful rather than mechanically duplicating surrounding text.

Both content concerns are recorded per product in the [complete catalogue](../artifacts/catalogue/2026-10-09T15-05-24-208Z/catalogue.md); factual presence checks pass. No additional personal design preferences are reported.

**IMP-01 — Quantity-label association.** The browser-only demonstrated change addresses F-05. Code, before/after DOM/screenshots, removal/reapplication, keyboard and cart preservation are in [the demo](../demo/README.md). Shipping it requires a real source/template change.

## Documentation and optional API interoperability review

**DOC-01 (P3):** missing search_product returns HTTP 200 with JSON responseCode 400 and the exact documented message. Application rejection works. Clarify whether the documentation's Response Code refers to transport, application, or both before filing a status defect.

**DOC-02 (P3):** the unmatched sentinel returns HTTP/JSON 200 with products=[]. This matches the stated assumption; document the no-match contract.

**IMP-API-01 (optional, P3):** all three parseable JSON responses advertise text/html; charset=utf-8. Consider application/json after consumer-compatibility review. The executed client parsed them; no failed integration is claimed. [Exact API evidence](technical-assessment.md).

