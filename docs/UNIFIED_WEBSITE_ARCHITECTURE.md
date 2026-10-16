# Unified website architecture

Date: 2026-10-15. Source checkout: GitHub `swehrcustoms/CastIQ-App` (archive of the default branch), placed in this folder. The Lovable preview returned “Internal Lovable project” and was not inspected. Visual direction follows the written brief: dark navy `#0C1F3D`, cyan `#06B6D4`, uppercase hero, rounded cards.

## 1. Existing architecture

Vite + React 18 + TypeScript + React Router 6 + Tailwind. Firebase Auth (email/password and Google), Firestore, Cloud Functions, Mapbox. Deployed on Vercel (`vercel.json` rewrites Firebase auth handlers, then SPA fallback). `LIVE_CHECKOUT_ENABLED` is false. There is no Stripe dependency.

## 2. Working today

Minnesota DNR lake search, lake detail, species context, loaded surveys, tactics, ice pages, favorites, profiles, onboarding, email/password and Google sign-in, public pricing copy from `src/data/pricing.ts`.

## 3. Incomplete or deferred

Paid checkout, Stripe Customer Portal, webhook projection, premium alerts, extended history as a product, advanced filters, cross-lake compare, historical trends, approved refund policy, founder biographies, production analytics vendor, Sentry/Slack.

## 4. Routes preserved

`/search`, `/lake/:lakeId` and the live/fisheries/contours redirects, `/ice`, `/tactics`, `/guides` → `/tactics`, `/profile`, `/onboarding`, `/login`, `/sign-in` → `/login`, `/social`, `/border-waters`, `/regulations`, `/submit-report`, `/guide` → `/search`.

## 5. Auth and subscription gaps

One Firebase identity already covers the app. Paid entitlements are not enforced (`VITE_SUBSCRIPTION_ENFORCEMENT` defaults off). A success URL cannot grant a tier (`tierFromSuccessUrl`). Membership writes are denied to clients in `firestore.rules`.

## 6. Safe integration

`/` is now the public marketing homepage. The fishing app stays behind its existing shell and bottom nav. Marketing pages use `PublicMarketingLayout` and do not mount `AppNav`. `/app` redirects to `/search`. Onboarding and a bare login now land on `/search`, not the marketing homepage. A selected plan is stored only in `sessionStorage` and is not an entitlement.

## 7. New files

`src/components/marketing/*`, `src/pages/marketing/*`, `src/pages/account/*`, `src/marketing/*`, `functions/src/services/contact.ts`, `public/robots.txt`, `public/sitemap.xml`, `tests/unifiedSite.test.ts`, and these docs.

## 8. Existing files changed

`src/App.tsx`, `src/pages/Pricing.tsx`, `src/pages/Login.tsx`, `src/pages/Onboarding.tsx`, `functions/src/index.ts`, `firestore.rules`, `.env.example`, `package.json` test script.

## 9. Regression risks

Unknown URLs now 404 on the marketing layout instead of forcing login. `/about`, `/pricing`, and legal pages no longer show the fishing bottom nav. Logged-in visitors who open `/login` with a saved paid plan are sent to billing, which still does not charge them.

## 10. Credentials still required

Firebase web config (already used by the live app), Mapbox token, and — before any charge — Stripe test secret, webhook secret, and four price IDs. Do not commit them.

## Decisions that need a person

Turn on live or test charges. Approve Freemium caps (they stay proposed and off). Approve a refund policy. Approve founder copy. Choose the production domain. Deploy this folder. The Lovable project was not readable, so this is not a pixel match of that prototype.
