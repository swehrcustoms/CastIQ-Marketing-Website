import test from 'node:test';
import assert from 'node:assert/strict';
import { destinationAfterAuth, destinationAfterOnboarding, PUBLIC_SITEMAP_PATHS } from '../src/marketing/journey';
import { PURCHASE_SKUS } from '../src/subscriptions/catalog';
import { requestCheckout, tierFromSuccessUrl } from '../src/subscriptions/billing';

test('post-login destination stays in the app unless a paid plan was selected', () => {
  assert.equal(destinationAfterAuth({ created: false, from: '/', intendedTier: null }), '/search');
  assert.equal(destinationAfterAuth({ created: true, from: '/search', intendedTier: 'standard' }), '/onboarding');
  assert.equal(destinationAfterAuth({ created: false, from: '/lake/123', intendedTier: null }), '/lake/123');
  assert.equal(destinationAfterAuth({ created: false, from: '/pricing', intendedTier: 'premium' }), '/account/billing');
  assert.equal(destinationAfterOnboarding('standard'), '/account/billing');
  assert.equal(destinationAfterOnboarding(null), '/search');
});

test('public routes include marketing pages and do not reuse /guides', () => {
  assert.ok(PUBLIC_SITEMAP_PATHS.includes('/'));
  assert.ok(PUBLIC_SITEMAP_PATHS.includes('/pricing'));
  assert.ok(PUBLIC_SITEMAP_PATHS.includes('/for-guides'));
  assert.equal(PUBLIC_SITEMAP_PATHS.some((path) => path === '/guides'), false);
});

test('five purchase options stay the approved set and success URLs do not grant a tier', () => {
  assert.deepEqual(PURCHASE_SKUS.map((item) => item.sku), [
    'free',
    'standard_monthly',
    'standard_annual',
    'premium_monthly',
    'premium_annual',
  ]);
  assert.equal(tierFromSuccessUrl(), 'free');
  const checkout = requestCheckout({ sku: 'standard_monthly' });
  assert.equal(checkout.ok, false);
});
