# Shopping journey QA assessment

The valid-quantity shopping journey worked on desktop and mobile Chromium emulation, including owned-account checkout entry. Quantity validation, public error diagnostics, and focused accessibility checks identified issues requiring correction. [Prioritised findings](docs/findings.md) separate confirmed defects from improvement proposals.

Reviewed live website: https://automationexercise.com. Execution date: **9 October 2026**. Desktop: **1366 × 768**. Mobile: **390 × 844**, touch-enabled emulation. No order or payment was submitted.

## Read the results

| Deliverable | Link |
| --- | --- |
| Prioritised findings and developer handover | [Findings](docs/findings.md) |
| API, product/cart consistency, frontend investigation | [Technical assessment](docs/technical-assessment.md) |
| Executed inputs, expected bases, actual results, status | [Test record](docs/test-record.md) |
| Complete current catalogue: every discovered product | [Markdown](artifacts/catalogue/2026-10-09T15-05-24-208Z/catalogue.md), [CSV](artifacts/catalogue/2026-10-09T15-05-24-208Z/catalogue.csv), [JSON](artifacts/catalogue/2026-10-09T15-05-24-208Z/catalogue.json) |
| Frontend code, before/after evidence, preservation checks | [Quantity-label demonstration](demo/README.md) |
| Recommendation, assumptions, limits, future checking | [Recommendation](docs/recommendation.md) |
| Requirement-to-evidence mapping | [Traceability](docs/traceability.md) |
| Environment, workflow, actual elapsed time | [Execution log](docs/execution-log.md) |

The catalogue refresh covered **34 API/catalogue products**, with **374 factual checks passing** and no blocked rows. All names/prices agreed; pages/images were available; titles, primary product headings and nonempty alt attributes existed. All 34 products have separate generic-title/alternative-text content-review flags.

Two complete live refresh commands took **41.057 seconds** and **37.751 seconds**, including command startup and usable report generation. [Timing evidence](artifacts/catalogue-rehearsals.jsonl). These are observed durations on this machine with dependencies/browser installed, not a guarantee under future service/network failure.

## Setup

Open a terminal in the folder containing this README. Use Node.js **22 or newer** and npm. Tested runtime: **Node v22.22.0**, Windows x64, Chromium **156.0.8078.4**. Dependency versions are pinned and a lockfile is included.

Windows PowerShell:

```powershell
npm.cmd ci
npx.cmd playwright install chromium
npm.cmd run typecheck
npm.cmd run test:tooling
```

Other shells:

```sh
npm ci
npx playwright install chromium
npm run typecheck
npm run test:tooling
```

Outbound HTTPS access to the live site and Playwright's browser download service is required.

## Repeat the work

| Command | What it executes |
| --- | --- |
| `npm run test:api` | The three documented search cases once |
| `npm run test:journey` | Guest journeys, quantity probes, and owned-account checkout on both viewports, sequentially |
| `npm run test:demo` | Pristine versus patched label association and unchanged cart behavior |
| `npm run catalogue:refresh` | Fresh API/catalogue discovery, all-product rendered audit, JSON/CSV/Markdown reports |
| `npm run test:tooling` | Offline collection-model, reporting, and boundary-feedback fixtures |
| `npm run typecheck` | TypeScript validation |

Use `npm.cmd` instead of `npm` on PowerShell if script policy blocks npm's PowerShell shim. Run live commands sequentially; these checks are not load tests.

Additional reproducible probes:

```powershell
npm.cmd exec -- tsx scripts/mobile-touch-smoke.ts
npm.cmd exec -- tsx scripts/investigate-frontend.ts
```

The first tests touch search/add, table panning and removal in Chromium emulation. The second saves the public cart handler for investigation.

No existing account credentials are needed. Checkout creates a unique synthetic account owned by the run, clears its cart, stops before Place Order, and deletes that account. Check its cleanup ledger. The ignored `.private/` directory is recovery storage if deletion fails; exclude it from folder sharing. Also exclude `node_modules/`; dependencies are recreated from the lockfile.

`QA_BASE_URL` optionally changes the base URL. The submitted evidence uses the live website. Leave `QA_RUN_ID` unset, or supply a fresh value, to preserve previous test artifacts. Values are read from the shell environment; .env templates are not automatically loaded. On PowerShell, for example, set `$env:QA_BASE_URL = 'https://automationexercise.com'`; on a POSIX shell use `export QA_BASE_URL='https://automationexercise.com'`. Defaults require no environment configuration.

## Locate and interpret evidence

Tests write `artifacts/<run-id>/results/`, `results.json`, and `playwright-report/`. Catalogue runs write `artifacts/catalogue/<timestamp>/catalogue.{json,csv,md}`, source/detail evidence, and incremental `checkpoint.jsonl`.

A journey/demo **suite pass means evidence collection completed**. Inspect each ledger's pass/fail/blocked checks; suite success does not erase observed site defects. Demo baseline association failures deliberately establish the existing problem.

Catalogue exit codes: **0** complete/no factual failures; **1** complete with factual failures to review; **2** incomplete. Editorial flags are separate. Failed sources/deadlines block dependent checks and disclose inventory uncertainty rather than silently passing.

Example report viewer:

```powershell
npx.cmd playwright show-report artifacts/tests-2026-10-09T14-52-39-959Z-3844/playwright-report
```

The review is browser-scripted exploration plus evidence inspection. It does not claim human user research, physical-device testing, full WCAG conformance, other-browser coverage, internal backend access, or a completed purchase. Assumptions and untested behaviors are listed in the recommendation.