import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LIVE_CHECKOUT_ENABLED,
  PLANS,
  annualPricePerMonth,
  annualSavings,
  priceFor,
  type BillingInterval,
} from '../../data/pricing';
import { track } from '../../marketing/analytics';
import { saveIntendedPlan, type IntendedTier } from '../../marketing/journey';

export function BillingIntervalToggle({
  interval,
  onChange,
}: {
  interval: BillingInterval;
  onChange: (interval: BillingInterval) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-[#08162c] p-1" role="radiogroup" aria-label="Billing interval">
      {(['monthly', 'annual'] as const).map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={interval === option}
          className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
            interval === option ? 'bg-castiq-teal text-castiq-blue-dark' : 'text-castiq-muted'
          }`}
          onClick={() => {
            track('billing_interval_selected', { interval: option });
            onChange(option);
          }}
        >
          {option === 'monthly' ? 'Monthly' : 'Annual'}
        </button>
      ))}
    </div>
  );
}

export function PlanPicker({ compact = false }: { compact?: boolean }) {
  const [interval, setInterval] = useState<BillingInterval>('annual');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<string | null>(null);

  function choose(tier: IntendedTier) {
    saveIntendedPlan({ tier, interval });
    track('plan_selected', { tier, interval });
    if (tier === 'free') {
      track('signup_started', { tier: 'free' });
      navigate(user ? '/search' : '/login', { state: { from: '/search', mode: 'signup' } });
      return;
    }
    if (!LIVE_CHECKOUT_ENABLED) {
      setNotice('Coming soon. CastIQ is not charging for Standard or Premium yet. Your plan choice is saved, and it does not unlock paid features.');
      navigate(user ? '/account/billing' : '/login', { state: { from: '/account/billing', mode: 'signup' } });
      return;
    }
    track('checkout_started', { tier, interval });
    navigate(user ? '/account/billing' : '/login', { state: { from: '/account/billing', mode: 'signup' } });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <BillingIntervalToggle interval={interval} onChange={setInterval} />
        <p className="text-xs text-castiq-muted">Annual prices are one yearly charge, not a monthly bill.</p>
      </div>
      <ul className="mt-6 grid gap-4 lg:grid-cols-3">
        <li className="rounded-2xl border border-white/10 bg-castiq-blue p-6">
          <h3 className="text-lg font-semibold">Freemium</h3>
          <p className="mt-2 text-3xl font-bold text-castiq-teal">$0</p>
          <p className="mt-2 text-sm text-castiq-muted">Search lakes, read public report dates, and open ice safety guidance.</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Lake and species search</li>
            <li>Dated public report previews</li>
            <li>Ice safety guidance and official source links</li>
          </ul>
          <button type="button" className="ciq-btn-secondary mt-6 w-full" onClick={() => choose('free')}>
            {user ? 'Open CastIQ' : 'Start Free'}
          </button>
        </li>
        {PLANS.map((plan) => {
          const price = priceFor(plan.tier, interval);
          const perMonth = annualPricePerMonth(plan.tier);
          const savings = annualSavings(plan.tier);
          return (
            <li
              key={plan.tier}
              className={`rounded-2xl border bg-castiq-blue p-6 ${plan.tier === 'premium' ? 'border-castiq-teal shadow-[0_0_32px_rgba(6,182,212,0.18)]' : 'border-white/10'}`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-castiq-teal">{price.display}</p>
              {interval === 'annual' ? (
                <p className="mt-1 text-xs text-castiq-muted">
                  About {perMonth.display} if you spread the yearly charge across 12 months. Save {savings.display} ({savings.percent}%) versus 12 monthly payments.
                </p>
              ) : (
                <p className="mt-1 text-xs text-castiq-muted">
                  Billed every month. Annual charge is {priceFor(plan.tier, 'annual').display}.
                </p>
              )}
              <p className="mt-3 text-sm text-castiq-muted">{plan.subtitle}</p>
              {'inherits' in plan && plan.inherits ? <p className="mt-3 text-sm font-medium">{plan.inherits}</p> : null}
              <ul className="mt-3 space-y-2 text-sm">
                {plan.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {!compact ? (
                <p className="mt-3 text-xs text-castiq-muted">
                  Several Premium items are not sold as working features yet. Checkout stays closed until they are.
                </p>
              ) : null}
              <button type="button" className="ciq-btn-primary mt-6 w-full" onClick={() => choose(plan.tier)}>
                {LIVE_CHECKOUT_ENABLED ? `Continue with ${plan.name}` : 'Coming soon'}
              </button>
            </li>
          );
        })}
      </ul>
      {notice ? <p className="mt-4 text-sm text-castiq-muted" role="status">{notice}</p> : null}
      <p className="mt-4 text-center text-sm">
        <Link to="/pricing" className="text-castiq-teal hover:underline">See the full plan comparison</Link>
      </p>
    </div>
  );
}
