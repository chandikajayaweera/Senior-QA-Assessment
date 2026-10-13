# Focused technical assessment

The top journey and valid-quantity totals agree across the reviewed surfaces. Invalid quantities and focused frontend checks reveal the separately prioritised [findings](findings.md). Investigation uses observed browser behavior, public client code and allowlisted response diagnostics; private backend access was unavailable.

## API requests and documentation comparison

All requests were form-encoded POSTs to https://automationexercise.com/api/searchProduct on 9 October 2026, 14:33:26–14:33:28 UTC. The same run captured the [API documentation](../artifacts/tests-2026-10-09T14-33-24-715Z-3848/documentation/api-list.html) at HTTP 200.

| Test | Exact encoded body | HTTP | JSON code | Actual body/conclusion |
| --- | --- | --- | --- | --- |
| TC-API-01 | search_product=top | 200 | 200 | 14 products; documented success passes; [complete record](../artifacts/tests-2026-10-09T14-33-24-715Z-3848/results/api-TC-API-01-search-top-api/api-record.json) |
| TC-API-02 | search_product=qa_no_match_7f7b51a8795a | 200 | 200 | products=[]; passes explicit no-match assumption, which docs do not specify; [complete record](../artifacts/tests-2026-10-09T14-33-24-715Z-3848/results/api-TC-API-02-search-unmatched-sentinel-api/api-record.json) |
| TC-API-03 | Empty form body; required field omitted | 200 | 400 | Exact documented missing-field message; application rejection passes; transport wording ambiguous; [complete record](../artifacts/tests-2026-10-09T14-33-24-715Z-3848/results/api-TC-API-03-omit-required-search-product-api/api-record.json) |

Missing-parameter body:

```json
{"responseCode":400,"message":"Bad request, search_product parameter is missing in POST request."}
```

Each complete record contains method/URL/body, timestamp, HTTP status, relevant headers, full parsed response and conclusion. Adjacent response.txt files preserve the complete bodies.

All three responses declare text/html; charset=utf-8 despite parseable JSON. Parsing succeeded; consumer interoperability was not assessed. The documentation's Response Code wording does not clearly establish an HTTP transport contract. Keep DOC-01/DOC-02 and IMP-API-01 separate from confirmed failures.

The top response includes products whose category, rather than name, matches Tops & Shirts. Browser relevance therefore compares current API/UI identities, not an invented requirement that every product name contains top.

## Required product comparison and shopping flow

| Surface | Product ID/name | Unit price |
| --- | --- | --- |
| Search API | 1 / Blue Top | Rs.500 |
| Rendered top search | 1 / Blue Top | Rs.500 |
| Product detail | 1 / Blue Top | Rs.500 |
| Cart | product-1 / Blue Top | Rs.500 |

Both guest ledgers verify quantity **3**, cart total **Rs.1500**, and unchanged values after reload. Category browsing, adding a distinct second product at quantity 1, correct line totals, removing only that second product, guest Register/Login entry, and empty-cart explanation also executed successfully.

Evidence: [desktop guest ledger](../artifacts/tests-2026-10-09T14-52-39-959Z-3844/results/journey-search-details-car-8380b-guest-account-entry-journey-desktop/journey.json), [mobile guest ledger](../artifacts/tests-2026-10-09T14-52-39-959Z-3844/results/journey-search-details-car-8380b-guest-account-entry-journey-mobile/journey.json); TECH-CROSS-SURFACE and J-* records retain exact raw strings, DOM and screenshots. Decimal-safe comparisons use integer minor units and displayed currency; Rs. is not assigned a national currency.

Owned accounts reached /checkout on both viewports. Address details and Place Order were visible; line/aggregate total was Rs.1500 and matched the row sum. Both carts were emptied and both selected-run accounts deleted. Evidence: [desktop checkout ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/checkout-dedicated-owned-account-reaches-checkout-journey-desktop/authenticated-checkout.json), [mobile checkout ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/checkout-dedicated-owned-account-reaches-checkout-journey-mobile/authenticated-checkout.json). No Place Order/payment submission occurred.

## Quantity boundaries and investigation

| Input | Browser constraint/state | Observed add result on both viewports | Conclusion |
| --- | --- | --- | --- |
| 1 | Valid | HTTP 200; quantity 1 / Rs.500; success confirmation | Pass |
| 0 | min=1 underflow | HTTP 200; quantity 0 / Rs.0; success confirmation | Cart integrity and rejection-feedback fail |
| -1 | min=1 underflow | HTTP 200; quantity -1 / Rs.-500; success confirmation | Cart integrity and rejection-feedback fail |
| 1.5 | Default step mismatch | HTTP 500; no row or success modal | Cart safety alone passes; graceful handling fails |
| Blank | Field is not required; native validity allows blank | HTTP 500; no row or success modal | Cart safety alone passes; graceful handling fails against stated assumption |

Evidence: [desktop quantity ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/boundaries-quantity-boundary-exploration-journey-desktop/quantity-boundaries.json), [mobile quantity ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/boundaries-quantity-boundary-exploration-journey-mobile/quantity-boundaries.json). Positive whole quantities are a shopping assumption; min=1 and fractional-step behavior are directly recorded HTML constraints.

[Public client investigation](../artifacts/investigation-2026-10-09T14-43-52-703Z-18168/client-investigation.json) fetched cart.js at HTTP 200. Lines 34–45 read quantity.value and pass it to Ajax without a shown validity guard; the shown handler has a success callback and no explicit error callback.

The safe diagnostic records identify ValueError and the submitted-value integer-conversion failure. Their quantityIntegerConversionLinePresent field is false: a particular backend source line is not verified. Debug response detection supports F-03; raw traceback, paths, cookies, metadata and settings are omitted. Internal access is needed to confirm complete parsing, validation/storage logic, deployment settings, and downstream order effects.

## Frontend evidence

| Control/interaction | What works | Observed issue |
| --- | --- | --- |
| Search | Textbox named Search Product; Tab/Enter reaches and activates search | Action button exposes icon glyph U+F002; axe button-name failure |
| Quantity | Native number field accepts valid editing; layout fits reviewed widths | Visible label has no association; unnamed accessible snapshot |
| Add | Keyboard add returns HTTP 200, shows accurate confirmation, stores correct quantity/total | Price/action text measured 2.16:1; confirmation does not take keyboard focus |
| Confirmation | View Cart and Continue Shopping are visibly present | Tab moves to background Write Your Review; no captured dialog-name/role association |
| Mobile cart | No document overflow; scripted add/remove works | Table needs horizontal panning to expose total/removal |

Relevant standards are referenced at the individual findings. Focus styles, HTML, accessible snapshots, scoped axe nodes and actual Tab/Shift+Tab/Enter events are in the guest ledgers. This sample does not establish every focus state, modal dismissal path or actual assistive-technology announcement.

The [final touch probe](../artifacts/mobile-touch-2026-10-09T15-10-51-203Z-8332/touch-record.json) executes search/add taps, a paced Chromium touch swipe (scrollLeft 0→96), removal visibility and a directly hit-tested removal tap. All five checks pass; request observation confirms removal HTTP 200 and an empty cart. It is emulation, not a physical device. The first touch attempt timed out on removal and remains an inconclusive development record.

## Complete catalogue and demonstrated improvement

The latest [catalogue report](../artifacts/catalogue/2026-10-09T15-05-24-208Z/catalogue.md) covers 34 API and 34 catalogue IDs, union 34, all 34 completed, no blocked rows/service errors. All 374 factual checks pass: identity/name/price consistency, detail document/content, title/primary heading, main-image HTTP/decode, and alt presence/nonempty value.

Every primary product heading is h2. That is not automatically a missing-heading defect. Titles/alternative text are present but generic on all 34, so wording is flagged separately for content review. Inventory is a start-of-run discovery from two independent live surfaces, not a transactional snapshot.

[IMP-01](../demo/README.md) associates the quantity label with the existing input. Separate pristine/patched contexts prove native name Quantity:, label-selection focus, keyboard entry, removal/idempotent reapplication, and unchanged Rs.500 × 3 = Rs.1500 on both viewports. Other findings remain unfixed on the hosted site.

