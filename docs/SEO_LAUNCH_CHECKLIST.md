# SEO launch checklist

Done in this folder:

- Unique titles and descriptions via `usePageMeta` on marketing pages.
- Canonical link set to `https://castiq-app.vercel.app` plus the path. That is the current deployment, not a future branded domain.
- Open Graph title, description, and URL.
- `SoftwareApplication` JSON-LD on the homepage with a $0 offer only.
- `public/sitemap.xml` and `public/robots.txt`.
- Robots disallows `/account`, `/login`, `/onboarding`, `/profile`, `/checkout`, and `/lake/`.
- One `h1` on marketing pages.
- Lake preview results use the lake name as text, not an unlabeled image.

Not done:

- Prerendering. The app is still a Vite SPA, so crawlers that do not run JavaScript will see the shell. A prerender step was not added because it would be a new build pipeline.
- Social share image.
- Search Console property. Add it after the domain is chosen.
- FAQ rich results. Questions are on the page; JSON-LD was omitted so unpublished policy text is not marked up as a rich result.
