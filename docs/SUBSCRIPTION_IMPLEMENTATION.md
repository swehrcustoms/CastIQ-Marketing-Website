# Subscription implementation

Five offerings, from `src/data/pricing.ts` and `src/subscriptions/catalog.ts`:

| Offering | Price |
|---|---|
| Freemium | $0 |
| Monthly Standard | $4.99/month |
| Annual Standard | $39.99/year |
| Monthly Premium | $8.99/month |
| Annual Premium | $69.99/year |

Annual amounts are yearly charges. `annualPricePerMonth` is labeled as a comparison, not a second bill. Premium inherits Standard entitlements in `ENTITLEMENTS`. Interval does not change features.

`LIVE_CHECKOUT_ENABLED` remains false. Plan buttons for Standard and Premium say “Coming soon” and call `requestCheckout`, which rejects client prices and returns `checkout_disabled` or `provider_not_configured`. `createCheckoutSession` refuses to run until `STRIPE_SECRET_KEY` exists, and even then it refuses until price IDs are approved. No Stripe SDK is installed. No card form was added.

Intended plan storage is `sessionStorage` key `castiq.intendedPlan`. It is ignored by `tierFromMembership` and `tierFromUntrustedClient`.

Firestore client writes to `users/{uid}/membership` stay denied.
