import { Link } from 'react-router-dom';
import { usePageMeta } from '../../marketing/meta';

const FEATURES = [
  {
    title: 'Lake search',
    body: 'Search the Minnesota DNR lake catalog by name. County and nearby town help when more than one lake shares a name.',
    status: 'Available',
    href: '/search',
  },
  {
    title: 'Fishing reports',
    body: 'A signed-in angler can see which species were reported, and when. Lure, depth, structure, and the written report are Standard and Premium.',
    status: 'Standard and Premium',
    href: '/search',
  },
  {
    title: 'Species information',
    body: 'Filter and read species context that is stored for a lake. CastIQ does not invent species that are missing from the record.',
    status: 'Available',
    href: '/search',
  },
  {
    title: 'Lake surveys',
    body: 'Survey and stocking panels open for lakes where that data has been loaded. An empty survey means it is not in CastIQ yet.',
    status: 'Available when loaded',
    href: '/search',
  },
  {
    title: 'Seasonal tactics',
    body: 'The lure list for a lake is Standard and Premium. Free accounts still see the species on the lake.',
    status: 'Standard and Premium',
    href: '/tactics',
  },
  {
    title: 'Ice fishing information',
    body: 'Ice pages and safety links are informational. They do not certify that ice is safe.',
    status: 'Available, with limits',
    href: '/ice',
  },
  {
    title: 'Saved lakes',
    body: 'Signed-in anglers can save lakes on their profile. That is not a separate paid dashboard.',
    status: 'Available after sign-in',
    href: '/profile',
  },
  {
    title: 'Lake mapping',
    body: 'Map views render when the Mapbox token is configured for the deployment. Contour products are not described as complete.',
    status: 'Available when configured',
    href: '/search',
  },
];

export function FeaturesPage() {
  usePageMeta(
    'Features',
    'CastIQ features: Minnesota lake search, report dates and species, surveys, ice information, and saved lakes. Lure, depth, and tactics are Standard and Premium.',
    '/features',
  );
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-black uppercase tracking-tight">Features</h1>
      <p className="mt-4 max-w-3xl text-castiq-muted">
        Each item below is something the current CastIQ app can do. Lure, depth, structure, the written report, and seasonal tactics require Standard or Premium. Alerts, unlimited history, and premium AI are not listed because they are not finished products.
      </p>
      <ul className="mt-10 space-y-4">
        {FEATURES.map((feature) => (
          <li key={feature.title} className="rounded-2xl border border-white/10 bg-castiq-blue p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold">{feature.title}</h2>
              <span className="rounded-full border border-cyan-400/40 px-3 py-1 text-xs uppercase tracking-wide text-castiq-teal">{feature.status}</span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-castiq-muted">{feature.body}</p>
            <Link to={feature.href} className="mt-4 inline-flex text-sm font-semibold text-castiq-teal">Open it</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
