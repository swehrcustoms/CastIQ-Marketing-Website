import { Link } from 'react-router-dom';
import { usePageMeta } from '../../marketing/meta';

export function ForGuidesPage() {
  usePageMeta(
    'Guides and partners',
    'Information for Minnesota fishing guides who want to hear about CastIQ. This is not a marketplace or a paid partner program.',
    '/for-guides',
  );
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-black uppercase tracking-tight">Guides and partners</h1>
      <p className="mt-4 text-castiq-muted">
        CastIQ is a Minnesota fishing information product. This page is for guides and related businesses who want to follow along. It is not a guide marketplace, and it does not enroll anyone in a paid partnership.
      </p>
      <p className="mt-4 text-castiq-muted">
        If you want to talk about using CastIQ with clients, send a note through the contact form and choose partnership. We will only reply if someone on the team can.
      </p>
      <Link to="/contact" className="ciq-btn-primary mt-6 inline-flex">Send a partnership note</Link>
    </div>
  );
}
