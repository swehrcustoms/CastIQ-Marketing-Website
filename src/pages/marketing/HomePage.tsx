import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { LakePreview } from '../../components/marketing/LakePreview';
import { PlanPicker } from '../../components/marketing/PlanPicker';
import { track } from '../../marketing/analytics';
import { usePageMeta } from '../../marketing/meta';
import { PUBLIC_ORIGIN } from '../../marketing/journey';

const VALUE = [
  {
    title: 'Find Your Water',
    body: 'Search Minnesota lakes and use county and nearby-town details to pick the right water when names repeat.',
  },
  {
    title: 'Understand the Conditions',
    body: 'Review dated fishing reports and the lake information that has actually been loaded. Missing fields stay blank.',
  },
  {
    title: 'Plan Your Approach',
    body: 'Look at species and ice information in the same signed-in workspace. Seasonal tactics open with Standard or Premium.',
  },
];

const STEPS = [
  {
    title: 'Choose Your Lake',
    body: 'Search by lake name. County and nearby town help you tell similarly named waters apart.',
  },
  {
    title: 'Explore the Intelligence',
    body: 'Open species information, available surveys, and water details. Lure, depth, the written report, and tactics open with Standard or Premium.',
  },
  {
    title: 'Prepare for Your Trip',
    body: 'Use the dates on reports and surveys to see how fresh the information is before you decide how to fish.',
  },
];

export function HomePage() {
  usePageMeta(
    'Minnesota fishing reports and lake search',
    'Find Minnesota fishing information in CastIQ. Search lakes, review dated fishing reports, and prepare for your next trip.',
    '/',
  );

  const featuresSeen = useRef(false);

  useEffect(() => {
    track('landing_viewed');
    const scriptId = 'castiq-org-schema';
    if (document.getElementById(scriptId)) return;
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CastIQ',
      applicationCategory: 'SportsApplication',
      operatingSystem: 'Web',
      url: PUBLIC_ORIGIN,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Minnesota lake search, dated fishing reports, and fishing information.',
    });
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-castiq-teal">Minnesota fishing intelligence</p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Fish smarter. Know more. Catch more.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-castiq-muted">
            Find the Minnesota fishing information you need without bouncing between websites. Explore lakes, review fishing reports, discover species-specific insights, and prepare for your next trip with CastIQ.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/login" state={{ from: '/search', mode: 'signup' }} className="ciq-btn-primary min-h-12 px-6">
              Explore CastIQ Free
            </Link>
            <Link to="/how-it-works" className="ciq-btn-secondary min-h-12 px-6">See How It Works</Link>
          </div>
        </div>
        <LakePreview />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold">Less Time Researching. More Time Fishing.</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {VALUE.map((item) => (
            <li key={item.title} className="rounded-2xl border border-white/10 bg-castiq-blue p-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-castiq-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold">How CastIQ Works</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-white/10 p-6">
              <p className="font-mono text-sm text-castiq-teal">0{index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-castiq-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" onMouseEnter={() => {
        if (featuresSeen.current) return;
        featuresSeen.current = true;
        track('feature_section_viewed');
      }}>
        <h2 className="text-3xl font-bold">What you can use today</h2>
        <p className="mt-3 max-w-3xl text-castiq-muted">
          Lake search, report dates and species, surveys that have been loaded, ice information, saved lakes, and maps when a map token is configured. Lure, depth, the written report, and tactics are Standard and Premium. Real-time alerts, a finished regulation sync, and premium AI are not advertised as complete.
        </p>
        <Link to="/features" className="ciq-btn-primary mt-6 inline-flex">Explore features</Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold">Plans</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-castiq-muted">
          Freemium, Standard, and Premium. Monthly and annual billing use the approved prices. There is no free trial, and paid checkout is not open.
        </p>
        <div className="mt-8">
          <PlanPicker compact />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold">Why CastIQ</h2>
        <p className="mt-4 max-w-3xl text-castiq-muted">
          CastIQ puts Minnesota lake search, report dates, and species context in one interface so you spend less time hopping between agency pages and report sites. Lure, depth, and tactics open with Standard or Premium. Sources and dates stay attached to the information.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold">Trust</h2>
        <p className="mt-4 max-w-3xl text-castiq-muted">
          Customer quotes, ratings, and partner logos will be added only when they are real. Lake figures in search come from the Minnesota DNR response for that water. Report dates are shown inside the app.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-castiq-blue to-[#08162c] px-6 py-12">
          <h2 className="text-3xl font-bold">Your Next Fishing Trip Starts Here.</h2>
          <p className="mt-3 max-w-xl text-castiq-muted">Explore Minnesota lakes, find the information that matters, and build a better game plan.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/login" state={{ from: '/search', mode: 'signup' }} className="ciq-btn-primary min-h-12 px-6">Get Started Free</Link>
            <Link to="/pricing" className="ciq-btn-secondary min-h-12 px-6">Compare Plans</Link>
          </div>
        </div>
      </section>
    </>
  );
}
