# Website design system

Tokens already live in `tailwind.config.cjs` and `src/index.css`:

- Navy `#0c1f3d` (`castiq-blue-dark`)
- Secondary navy `#1a3a5c` (`castiq-blue`)
- Cyan `#06b6d4` (`castiq-teal`)
- Text `#f8fafc` (`castiq-white`)
- Muted `#94a3b8` (`castiq-muted`)

Marketing pages reuse `.ciq-btn-primary`, `.ciq-btn-secondary`, `.ciq-input`, and `.ciq-card`. No second component library was added.

Shared pieces: `BrandLogo`, `MarketingHeader`, `MarketingFooter`, `PublicMarketingLayout`, `AccountLayout`, `PlanPicker`, `LakePreview`.

Focus states use the existing `:focus-visible` outline. The marketing header collapses to a Menu button under the `lg` breakpoint. The fishing app bottom nav is not rendered in the marketing or account layouts.
