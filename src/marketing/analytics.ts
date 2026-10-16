export type AnalyticsEvent =
  | 'landing_viewed'
  | 'feature_section_viewed'
  | 'pricing_viewed'
  | 'billing_interval_selected'
  | 'plan_selected'
  | 'signup_started'
  | 'checkout_started'
  | 'checkout_abandoned'
  | 'support_submitted';

/** No analytics vendor is configured. Events stay local and never include payment data. */
export function track(event: AnalyticsEvent, props?: Record<string, string>): void {
  if (import.meta.env.DEV) {
    console.info('[castiq]', event, props ?? {});
  }
}
