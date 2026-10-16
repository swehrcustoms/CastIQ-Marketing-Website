import { useEffect } from 'react';
import { PlanPicker } from '../components/marketing/PlanPicker';
import {
  PRICING_DISCLAIMER,
  PRICING_HERO,
} from '../data/pricing';
import { track } from '../marketing/analytics';
import { usePageMeta } from '../marketing/meta';

export function Pricing() {
  usePageMeta('Pricing', 'CastIQ plans: Freemium, Standard at $4.99/month or $39.99/year, and Premium at $8.99/month or $69.99/year. Paid checkout is not open.', '/pricing');

  useEffect(() => {
    track('pricing_viewed');
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-castiq-teal">Plans</p>
      <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">{PRICING_HERO.title}</h1>
      <p className="mt-4 max-w-3xl text-castiq-muted">{PRICING_HERO.description}</p>
      <div className="mt-10">
        <PlanPicker />
      </div>
      <section className="mt-12" aria-labelledby="plan-access">
        <h2 id="plan-access" className="text-2xl font-semibold">What each plan can open</h2>
        <p className="mt-2 text-sm text-castiq-muted">
          Monthly and annual copies of a plan open the same features. The number limits below are proposed and are not turned on. There is no free trial.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="text-xs text-castiq-muted">
                <th className="py-2 pr-3 font-medium">Access</th>
                <th className="py-2 pr-3 font-medium">Freemium</th>
                <th className="py-2 pr-3 font-medium">Standard</th>
                <th className="py-2 font-medium">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10"><td className="py-2 pr-3">Lake search</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
              <tr className="border-t border-white/10"><td className="py-2 pr-3">Report dates and sources</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
              <tr className="border-t border-white/10"><td className="py-2 pr-3">Full report detail</td><td>Proposed: 3 / 30 days</td><td>Eligible reports</td><td>Retained reports</td></tr>
              <tr className="border-t border-white/10"><td className="py-2 pr-3">Saved lakes</td><td>Proposed: 2</td><td>Proposed: 10</td><td>Unlimited</td></tr>
              <tr className="border-t border-white/10"><td className="py-2 pr-3">Ice safety</td><td>Always</td><td>Always</td><td>Always</td></tr>
              <tr className="border-t border-white/10"><td className="py-2 pr-3">Compare lakes and trends</td><td>No</td><td>No</td><td>When the data supports it</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <p className="mt-6 text-xs text-castiq-muted">{PRICING_DISCLAIMER}</p>
    </div>
  );
}
