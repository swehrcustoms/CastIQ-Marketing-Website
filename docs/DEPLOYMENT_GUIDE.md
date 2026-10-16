# Deployment guide

This folder is a copy of the CastIQ app plus the marketing site. It is not deployed.

Keep the existing Vercel project until someone approves a release of this tree.

Required frontend env (already used in production, do not commit `.env`):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_MAPBOX_ACCESS_TOKEN`
- `VITE_PAID_CHECKOUT_ENABLED=false`
- `VITE_SUBSCRIPTION_ENFORCEMENT=false`

`vercel.json` still proxies `/__/auth` and `/__/firebase` to `castiq-app.firebaseapp.com`, then falls back to `index.html`. Do not remove those rewrites.

Contact messages need `submitContactInquiry` deployed before the form can succeed. Until then the form says nothing was sent.

Do not set a canonical domain redirect until the domain is chosen. The sitemap currently names `castiq-app.vercel.app`.
