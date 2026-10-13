# Requirement traceability

| Requirement | Executed checks and finding links | Deliverable |
| --- | --- | --- |
| REQ-01 customer journey on desktop/mobile | J-SEARCH/BROWSE/ADD/CART/REMOVE/ACCOUNT/EMPTY; owned checkout; TOUCH-*; UX-01 | [Test record](test-record.md), guest/checkout/touch ledgers |
| REQ-02a three search API cases | TC-API-01/02/03; DOC-01/DOC-02 and optional header review | [Technical assessment](technical-assessment.md) |
| REQ-02b four-surface product and total | TECH-CROSS-SURFACE; J-CART-TWO/REMOVE; J-AUTH-CHECKOUT aggregate | Technical assessment and raw ledgers |
| REQ-02c semantics/keyboard/feedback/mobile | FE-*; boundary state/feedback; F-01–F-07; scoped axe and actual key/touch events | [Findings](findings.md), test record |
| REQ-02 investigation and cause limits | Public cart.js; safe responseDiagnostic; private backend unknowns | Technical assessment |
| REQ-03 frontend improvement | IMP-01, DEMO-*; named label/focus, keyboard, reversal/idempotence and unchanged cart | [Code and before/after](../demo/README.md) |
| REQ-04 every current discovered product | 34/34 complete; all 374 factual checks pass; content flags separate | [Latest report](../artifacts/catalogue/2026-10-09T15-05-24-208Z/catalogue.md), CSV/JSON/evidence |
| REQ-04 refresh within five minutes | Two complete live commands: 41.057s/37.751s | [Timed rehearsals](../artifacts/catalogue-rehearsals.jsonl) |
| REQ-05 executed record and developer handover | Exact input/basis/actual/status in ledgers; issue steps/impact/cause/correction checks | Findings and test record |
| REQ-06 recommendation and useful future checking | Evidence-bounded suitability, priority, uncertainty and regression plan | [Recommendation](recommendation.md) |
| Submission repeatability/assumptions/time | Pinned lockfile, documented commands, fixture cases, run/evidence IDs | [README](../README.md), [execution log](execution-log.md) |
| Fresh report workflow and actual 157s report adjustment rehearsal , [rehearsal evidence](../artifacts/tooling/report-adjustment-rehearsal.json) |

Requirement IDs describe assessment coverage. Test IDs identify observations; finding/improvement IDs classify their meaning; product IDs and run timestamps identify evidence. Blocked development attempts are preserved and are not passed off as completed final checks.

