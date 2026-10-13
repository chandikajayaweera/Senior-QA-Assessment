# Executed testing record

Executed evidence is selected below by authoritative scope. Inputs, conditions, expected behavior and its basis, exact actual results, timestamps, status and screenshots are retained in each linked ledger. This is browser-scripted exploration plus evidence inspection, not human user research.

## Authoritative executions

| Scope | Result | Evidence |
| --- | --- | --- |
| Search API, 14:33:26–14:33:28 UTC | 3 pass / 0 fail / 0 blocked; suite 4.8s | [top](../artifacts/tests-2026-10-09T14-33-24-715Z-3848/results/api-TC-API-01-search-top-api/api-record.json), [unmatched](../artifacts/tests-2026-10-09T14-33-24-715Z-3848/results/api-TC-API-02-search-unmatched-sentinel-api/api-record.json), [omitted](../artifacts/tests-2026-10-09T14-33-24-715Z-3848/results/api-TC-API-03-omit-required-search-product-api/api-record.json) |
| Desktop guest journey, 14:52:44–14:53:00 | 13 pass / 5 fail / 0 blocked; collection completed | [desktop guest ledger](../artifacts/tests-2026-10-09T14-52-39-959Z-3844/results/journey-search-details-car-8380b-guest-account-entry-journey-desktop/journey.json) |
| Mobile guest journey, 14:53:04–14:53:22 | 12 pass / 6 fail / 0 blocked; collection completed | [mobile guest ledger](../artifacts/tests-2026-10-09T14-52-39-959Z-3844/results/journey-search-details-car-8380b-guest-account-entry-journey-mobile/journey.json) |
| Desktop quantity boundaries, 14:48:42–14:49:04 | 4 pass / 6 fail / 0 blocked | [desktop quantity ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/boundaries-quantity-boundary-exploration-journey-desktop/quantity-boundaries.json) |
| Mobile quantity boundaries, 14:49:42–14:50:03 | 4 pass / 6 fail / 0 blocked | [mobile quantity ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/boundaries-quantity-boundary-exploration-journey-mobile/quantity-boundaries.json) |
| Owned-account checkout, both viewports | 10 pass / 0 fail / 0 blocked; includes aggregate/cart/account cleanup | [desktop checkout ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/checkout-dedicated-owned-account-reaches-checkout-journey-desktop/authenticated-checkout.json), [mobile checkout ledger](../artifacts/tests-2026-10-09T14-48-37-520Z-18300/results/checkout-dedicated-owned-account-reaches-checkout-journey-mobile/authenticated-checkout.json) |
| Demo before/after, both viewports | 12 pass; 2 expected baseline association failures; collection tests pass in 18.1s | [desktop demo ledger](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/results/demo-quantity-label-association-before-and-after-demo-desktop/quantity-label-demo.json), [mobile demo ledger](../artifacts/tests-2026-10-09T14-55-55-792Z-17880/results/demo-quantity-label-association-before-and-after-demo-mobile/quantity-label-demo.json) |
| Final touch smoke, 15:10:51–15:11:00 | 5 pass / 0 fail / 0 blocked | [Touch ledger](../artifacts/mobile-touch-2026-10-09T15-10-51-203Z-8332/touch-record.json) |
| Latest complete catalogue | 34 products; 374 factual checks pass; 34 products flagged for editorial review | [Catalogue](../artifacts/catalogue/2026-10-09T15-05-24-208Z/catalogue.md) |
| Refresh rehearsal 1 / 2 | Complete; 41.057s / 37.751s end-to-end | [Timing record](../artifacts/catalogue-rehearsals.jsonl) |
| Final offline tooling/typecheck | 20/20 fixture cases pass; typecheck exits 0 | [Final verification](../artifacts/tooling/final-verification.json), [tooling stdout](../artifacts/tooling/tooling.stdout.txt), [typecheck stdout](../artifacts/tooling/typecheck.stdout.txt) |
| Clean lockfile install | npm ci completed successfully | [Install stdout](../artifacts/tooling/clean-install.stdout.txt) |
| Report-adjustment rehearsal | 157s; its 12 then-current fixtures and typecheck passed | [Rehearsal record](../artifacts/tooling/report-adjustment-rehearsal.json), [stdout](../artifacts/tooling/report-adjustment-rehearsal-stdout.txt) |

A suite pass means collection/verification completed. It is not the same as every site check passing. A blocked check cannot support a pass conclusion. Failed axe checks and specific naming checks can describe the same defect; there is no bug quota.

## API expectations and actual results

All three are form POSTs. TC-API-01 top returns HTTP 200/application 200/14 products against documented API 5 success. TC-API-02 uses qa_no_match_7f7b51a8795a and returns HTTP 200/application 200/empty products against an explicit no-match assumption. TC-API-03 omits search_product and returns HTTP 200/application 400/exact documented message; application rejection passes and transport ambiguity remains separate. [Full technical comparison](technical-assessment.md).

## Guest journey and frontend checks

Conditions: fresh anonymous contexts; desktop 1366×768 and mobile 390×844; matching product selected from current API/UI identities; quantity 3. Basis: assessment journey, documented/API consistency, rendered HTML/semantics, applicable WCAG criteria, or explicitly stated shopping assumptions. Each ledger stores the per-row expected text and basis.

| Check ID | Observed result | Desktop | Mobile |
| --- | --- | --- | --- |
| FE-SEARCH-AXE | button-name violation on #submit_search | fail | fail |
| FE-SEARCH-NAME | Field: Search Product; button: icon glyph U+F002 | fail | fail |
| FE-SEARCH-TAB | Tab focused #submit_search; Enter activated search | pass | pass |
| J-SEARCH | 14 matching API/UI product identities | pass | pass |
| FE-DETAIL-AXE | Quantity label and two 2.16:1 contrast failures | fail | fail |
| FE-QUANTITY-NAME | Unlabelled spinbutton in accessible snapshot | fail | fail |
| FE-DETAIL-LAYOUT | Quantity/control layout stayed within reviewed viewport width | pass | pass |
| J-ADD-FEEDBACK | HTTP 200; visible added-to-cart confirmation | pass | pass |
| FE-MODAL-KEYBOARD | Focus stayed on Add to cart; Tab moved to background Write Your Review | fail | fail |
| TECH-CROSS-SURFACE | Blue Top / Rs.500 on all four surfaces; 3 × 500 = 1500 | pass | pass |
| J-CART-RELOAD | Selected quantity/cart values survived reload | pass | pass |
| J-BROWSE | Women → Tops; 6 products | pass | pass |
| J-CART-TWO | Two distinct products; first quantity 3, second quantity 1; correct line totals | pass | pass |
| FE-CART-LAYOUT | Desktop table fits; mobile table extends inside a horizontal scroll container | pass | fail |
| J-REMOVE | Only second product removed; first remains at quantity 3 / Rs.1500 | pass | pass |
| J-GUEST-CHECKOUT | Guest prompted to Register / Login | pass | pass |
| J-ACCOUNT-ENTRY | Login and New User Signup entry points rendered | pass | pass |
| J-EMPTY-CART | Zero rows and explanatory empty-cart message | pass | pass |

The mobile layout failure is a heuristic flag requiring interpretation. The table is contained, touch panning works and removal succeeds; report it as UX-01 rather than an automatic reflow or broken-cart defect.

## Boundary cases and owned checkout

Each boundary starts from an empty owned guest-session cart. For both viewports, input 1 passes state and success-feedback checks; 0/-1 fail both because invalid rows/success confirmations are created; 1.5/blank pass the no-invalid-row check but fail feedback with HTTP 500. There are ten separate state/feedback checks per viewport. These distinctions prevent a safe empty cart from concealing a failed interaction.

The positive-whole-number rule is an assumption supported for 0/-1 by min=1 and for 1.5 by default step. Blank is not required in the existing HTML; reject clearly or choose a valid positive default. Current feedback fixtures allow appropriate client rejection and controlled server rejection; no-request behavior is not the only acceptable correction.

Authenticated checks create only new synthetic owned accounts, verify/reset cart state, add Blue Top×3, confirm address/line/aggregate Rs.1500 and order continuation, empty the cart and delete each account. No order is submitted. Credentials/traces are excluded from these tests.

## Tooling and repeatability limits

Offline fixtures cover union/deduplication/conflicts, source outages/unknown presence, malformed prices/missing content, HTTP/broken-image/decode outcomes, deadline-blocked rows, JSON/API source guards, unmapped-link visibility, CSV escaping/formula protection, and feedback interpretation. They test the model/report/helper functions; they do **not** inject every rate-limit, retry, pagination or deadline condition into a live full collector.

The complete refresh benchmark includes usable report generation and does not reuse historical data. Two runs returned the same 34-product inventory; that does not guarantee future inventory/network stability.

## Development and inconclusive records

Earlier collection attempts are preserved: initial fixture configuration/scoping issues, category whitespace and checkout-table selectors, and an overly narrow name-only search oracle were corrected. Those tool failures/incorrect oracles are not website defects. The first fractional/blank state-only results were also refined to keep failure feedback separate.

The first touch probe had four passes and an inconclusive removal timeout; the final hit-tested/paced probe passes. The exact cause of the initial timeout was not established. Historical debug responses were sanitised with recorded digests; factual outcomes were retained. See [execution log](execution-log.md) and [redaction record](../artifacts/tooling/evidence-redaction.json).

