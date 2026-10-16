import type { BillingInterval, PlanTier } from '../data/pricing';

export const PUBLIC_ORIGIN = 'https://castiq-app.vercel.app';

export const MARKETING_NAV = [
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
] as const;

export const PUBLIC_SITEMAP_PATHS = [
  '/',
  '/features',
  '/how-it-works',
  '/pricing',
  '/about',
  '/faq',
  '/contact',
  '/for-guides',
  '/legal/terms',
  '/legal/privacy',
  '/legal/refunds',
] as const;

export type IntendedTier = 'free' | PlanTier;

export interface IntendedPlan {
  tier: IntendedTier;
  interval: BillingInterval;
}

const PLAN_KEY = 'castiq.intendedPlan';

export function saveIntendedPlan(plan: IntendedPlan): void {
  sessionStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export function readIntendedPlan(): IntendedPlan | null {
  try {
    const raw = sessionStorage.getItem(PLAN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as IntendedPlan;
    if (parsed.tier !== 'free' && parsed.tier !== 'standard' && parsed.tier !== 'premium') return null;
    if (parsed.interval !== 'monthly' && parsed.interval !== 'annual') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearIntendedPlan(): void {
  sessionStorage.removeItem(PLAN_KEY);
}

/** Selecting a plan never grants paid access. */
export function destinationAfterAuth(input: {
  created: boolean;
  from: string;
  intendedTier: IntendedTier | null;
}): string {
  if (input.created) return '/onboarding';
  if (input.intendedTier === 'standard' || input.intendedTier === 'premium') return '/account/billing';
  if (!input.from || input.from === '/' || input.from === '/login' || input.from === '/sign-in') return '/search';
  return input.from;
}

export function destinationAfterOnboarding(intendedTier: IntendedTier | null): string {
  if (intendedTier === 'standard' || intendedTier === 'premium') return '/account/billing';
  return '/search';
}
