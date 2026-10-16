import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

const GROUPS = [
  {
    title: 'Product',
    links: [
      { to: '/features', label: 'Features' },
      { to: '/how-it-works', label: 'How it works' },
      { to: '/pricing', label: 'Pricing' },
      { to: '/search', label: 'Lake search' },
      { to: '/ice', label: 'Ice information' },
      { to: '/tactics', label: 'Tactics' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/for-guides', label: 'Guides and partners' },
      { to: '/faq', label: 'FAQ' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/legal/terms', label: 'Terms' },
      { to: '/legal/privacy', label: 'Privacy' },
      { to: '/legal/refunds', label: 'Billing and cancellation' },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#08162c]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <BrandLogo />
          <p className="mt-3 text-sm leading-relaxed text-castiq-muted">
            Minnesota fishing information in one place: lake search, dated reports, surveys, and tactics.
          </p>
        </div>
        {GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-castiq-muted">{group.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-castiq-white hover:text-castiq-teal">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-castiq-muted sm:px-6">
          © 2026 CastIQ. Report details vary by lake and source. Confirm regulations and ice conditions before you go.
        </p>
      </div>
    </footer>
  );
}
