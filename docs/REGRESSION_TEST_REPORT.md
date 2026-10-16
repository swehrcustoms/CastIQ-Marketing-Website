# Regression test report

Commands run in this folder on 2026-10-15:

- `npm run typecheck` — PASS
- `npm test` — PASS, 14 tests
- `npm run lint` — PASS

Not run: `npm run build` in this pass, Firebase emulators, Mapbox, live DNR search from a browser, authenticated lake detail.

Preserved by code review, not by a fresh end-to-end click-through: lake search page, lake detail tabs, species filters, ice page, tactics page, favorites, profile, `/guides` → `/tactics`, Firebase auth handler rewrites in `vercel.json`.

Changed behavior: `/` is the marketing homepage. After onboarding, the app opens `/search`. Unknown URLs use the marketing 404 instead of the login wall.
