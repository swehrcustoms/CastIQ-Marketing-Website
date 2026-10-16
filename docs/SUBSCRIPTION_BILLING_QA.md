# Subscription billing QA

| Check | Result |
|---|---|
| Five approved prices | PASS (`tests/mvpLaunch.test.ts` and catalog test) |
| Client-supplied price rejected | PASS (`requestCheckout`) |
| Checkout disabled by default | PASS |
| Success URL grants access | PASS — it does not; result is `free` |
| Stripe test card payment | BLOCKED — no secret, no price IDs, no SDK |
| Webhook signature, retries, out-of-order events | NOT TESTED |
| Customer portal | NOT TESTED — button is disabled |
| Membership client write | PASS by rule review: `allow write: if false` |

No test charge was created.
