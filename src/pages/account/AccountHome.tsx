import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { readIntendedPlan } from '../../marketing/journey';
import { usePageMeta } from '../../marketing/meta';

export function AccountHome() {
  usePageMeta('Account', 'Your CastIQ account.', '/account');
  const { user, profile } = useAuth();
  const intended = readIntendedPlan();
  const name = profile?.displayName || user?.displayName || 'Angler';
  return (
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="mt-2 text-castiq-muted">{profile?.email || user?.email}</p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 p-4">
          <dt className="text-xs uppercase tracking-wide text-castiq-muted">Current plan</dt>
          <dd className="mt-1 text-lg">Free</dd>
          <p className="mt-2 text-xs text-castiq-muted">Paid access is not assigned from a button click. Checkout is closed.</p>
        </div>
        <div className="rounded-2xl border border-white/10 p-4">
          <dt className="text-xs uppercase tracking-wide text-castiq-muted">Saved plan choice</dt>
          <dd className="mt-1 text-lg">{intended ? `${intended.tier} · ${intended.interval}` : 'None'}</dd>
          <p className="mt-2 text-xs text-castiq-muted">This is a preference for later checkout. It is not your subscription.</p>
        </div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/search" className="ciq-btn-primary">Open CastIQ</Link>
        <Link to="/account/billing" className="ciq-btn-secondary">Billing</Link>
        <Link to="/profile" className="ciq-btn-secondary">Saved lakes</Link>
        <Link to="/account/settings" className="ciq-btn-secondary">Settings</Link>
      </div>
    </div>
  );
}
