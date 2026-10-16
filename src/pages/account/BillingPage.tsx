import { Link } from 'react-router-dom';
import { LIVE_CHECKOUT_ENABLED } from '../../data/pricing';
import { readIntendedPlan } from '../../marketing/journey';
import { usePageMeta } from '../../marketing/meta';
import { requestCheckout } from '../../subscriptions/billing';
import { track } from '../../marketing/analytics';

export function BillingPage() {
  usePageMeta('Billing', 'CastIQ billing status. Paid checkout is not open.', '/account/billing');
  const intended = readIntendedPlan();
  const checkout = intended && intended.tier !== 'free'
    ? requestCheckout({ sku: `${intended.tier}_${intended.interval}` })
    : null;

  return (
    <div>
      <h1 className="text-3xl font-bold">Billing</h1>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="rounded-2xl border border-white/10 p-4">
          <dt className="text-castiq-muted">Subscription</dt>
          <dd>No paid subscription. The account is on the free experience.</dd>
        </div>
        <div className="rounded-2xl border border-white/10 p-4">
          <dt className="text-castiq-muted">Renewal date</dt>
          <dd>None. CastIQ is not charging.</dd>
        </div>
        <div className="rounded-2xl border border-white/10 p-4">
          <dt className="text-castiq-muted">Status</dt>
          <dd>{LIVE_CHECKOUT_ENABLED ? 'Checkout flag is on, but no provider price is configured.' : 'Coming soon. Live checkout is disabled.'}</dd>
        </div>
      </dl>
      {intended && intended.tier !== 'free' ? (
        <p className="mt-4 text-sm text-castiq-muted" role="status">
          You asked about {intended.tier} billed {intended.interval}. Checkout result: {checkout && !checkout.ok ? checkout.code.replaceAll('_', ' ') : 'unavailable'}.
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/pricing" className="ciq-btn-primary" onClick={() => track('pricing_viewed')}>Compare plans</Link>
        <button type="button" className="ciq-btn-secondary" disabled>
          Payment portal unavailable
        </button>
      </div>
      <p className="mt-4 text-xs text-castiq-muted">
        Card details will be collected by Stripe’s hosted checkout and customer portal after test keys and price IDs are approved. CastIQ will not build its own card form.
      </p>
    </div>
  );
}
