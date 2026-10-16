# Customer journey QA

Automated: `npm test` — 14 passed, 0 failed (existing MVP tests plus `tests/unifiedSite.test.ts`). `npm run typecheck` passed. `npm run lint` passed.

| Journey | Result | Note |
|---|---|---|
| A. New free customer through a real lake | NOT TESTED | Needs Firebase env and a signed-in browser session |
| B. Monthly and annual Standard checkout | BLOCKED | Checkout is intentionally closed |
| C. Monthly and annual Premium checkout | BLOCKED | Same |
| D. Plan changes, failed payment, duplicate webhooks | BLOCKED | No Stripe events |
| E. Returning customer, Google, password reset | NOT TESTED | Existing auth code was not rewritten; redirects after login were unit-tested |
| Marketing homepage, pricing toggle, FAQ, mobile menu | See browser note in `REGRESSION_TEST_REPORT.md` | |

Unit checks that did pass: login/onboarding destinations, five SKUs, success URL does not grant a tier, `/guides` is not a marketing route.
