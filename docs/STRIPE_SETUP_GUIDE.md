# Stripe setup guide

Do this in test mode first. Do not switch on live charges from this guide.

1. Create a Stripe account and stay in test mode.
2. Create four recurring prices only: $4.99 monthly, $39.99 yearly, $8.99 monthly, $69.99 yearly.
3. Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` with Firebase secrets. Never put the secret in `VITE_` variables.
4. Install `stripe` in `functions` only after the prices exist.
5. Change `createCheckoutSession` to map an allowlisted SKU to those server-side price IDs, verify the Firebase ID token (the callable already has `request.auth`), and create a Checkout Session. Ignore any price sent by the browser.
6. Add a webhook on the raw body, verify the signature, and make processing idempotent with the event id. Update `users/{uid}/membership` with the Admin SDK only.
7. Point the Stripe Customer Portal at plan changes, payment methods, and cancellation.
8. Success and cancel URLs may be `/checkout/success` and `/checkout/cancel`. Those pages must keep calling `tierFromSuccessUrl()`, which returns `free`.
9. Leave `LIVE_CHECKOUT_ENABLED` false until a person approves activation.

`createCheckoutSession` currently returns `failed-precondition` and creates no charge.
