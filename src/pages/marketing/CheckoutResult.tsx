import { Link } from 'react-router-dom';
import { tierFromSuccessUrl } from '../../subscriptions/billing';
import { usePageMeta } from '../../marketing/meta';

export function CheckoutResult({ kind }: { kind: 'success' | 'cancel' }) {
  const success = kind === 'success';
  usePageMeta(
    success ? 'Checkout return' : 'Checkout canceled',
    'A checkout return does not change your CastIQ plan by itself.',
    success ? '/checkout/success' : '/checkout/cancel',
  );
  const ignored = tierFromSuccessUrl();
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold">{success ? 'Back from checkout' : 'Checkout was not completed'}</h1>
      <p className="mt-4 text-castiq-muted">
        {success
          ? 'Opening this page does not activate Standard or Premium. Access changes only after a verified billing event is stored.'
          : 'No payment was recorded from this page. Your account stays on the free experience.'}
      </p>
      <p className="mt-2 text-sm text-castiq-muted">Current access from this URL: {ignored}.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/account/billing" className="ciq-btn-primary">Billing</Link>
        <Link to="/pricing" className="ciq-btn-secondary">Pricing</Link>
      </div>
    </div>
  );
}
