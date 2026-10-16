import { usePageMeta } from '../../marketing/meta';

export function RefundsPage() {
  usePageMeta(
    'Billing and cancellation',
    'CastIQ is not charging customers yet. This page is not an approved refund policy.',
    '/legal/refunds',
  );
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-castiq-teal">Draft — not legal approval</p>
      <h1 className="mt-3 text-4xl font-bold">Billing and cancellation</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-castiq-muted">
        <p>CastIQ is not collecting subscription payments. There are no active paid subscriptions to refund or cancel.</p>
        <p>When billing is approved, cancellation and invoices are planned to run through the payment provider’s customer portal. A refund policy still needs separate legal approval before it is published as binding.</p>
        <p>Choosing a plan on the website only remembers your preference in this browser session. It does not start a charge.</p>
      </div>
    </div>
  );
}
