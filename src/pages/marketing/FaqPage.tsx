import { FormEvent, useMemo, useState } from 'react';
import { usePageMeta } from '../../marketing/meta';

const FAQS = [
  {
    q: 'What can I do without paying?',
    a: 'You can create an account, search Minnesota lakes, see which species were reported and when, and open ice guidance. Lure, depth, structure, the written report, and seasonal tactics are Standard and Premium.',
  },
  {
    q: 'Which waters are covered?',
    a: 'Search uses the Minnesota DNR lake catalog. A lake can appear in search even when CastIQ does not yet have a fishing report or survey for it.',
  },
  {
    q: 'How fresh is a fishing report?',
    a: 'Reports show their dates and sources inside the app. CastIQ does not rewrite a report to look newer than it is.',
  },
  {
    q: 'Is there a free trial of Standard or Premium?',
    a: 'No. The approved pricing does not include a free trial. Paid checkout is also not open yet.',
  },
  {
    q: 'What is the difference between Standard and Premium?',
    a: 'The pricing page lists the approved feature lists. Billing interval does not change those features. Several Premium items, including alerts and historical trends, are not sold as working features yet.',
  },
  {
    q: 'Can I cancel?',
    a: 'There is nothing to cancel until CastIQ starts charging. The billing page will use the payment provider’s portal when checkout is approved.',
  },
  {
    q: 'Does ice information mean the ice is safe?',
    a: 'No. Ice pages are informational and link to official sources. You have to judge ice conditions yourself.',
  },
];

export function FaqPage() {
  usePageMeta('FAQ', 'Answers about CastIQ accounts, Minnesota lake coverage, reports, plans, and ice information.', '/faq');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(FAQS[0].q);
  const visible = useMemo(
    () => FAQS.filter((item) => `${item.q} ${item.a}`.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-black uppercase tracking-tight">FAQ</h1>
      <form className="mt-6" onSubmit={(event: FormEvent) => event.preventDefault()}>
        <label htmlFor="faq-search" className="sr-only">Search questions</label>
        <input id="faq-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions" className="ciq-input w-full" />
      </form>
      <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
        {visible.map((item) => {
          const expanded = open === item.q;
          return (
            <div key={item.q}>
              <button type="button" className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left" aria-expanded={expanded} onClick={() => setOpen(expanded ? '' : item.q)}>
                <span className="font-medium">{item.q}</span>
                <span aria-hidden>{expanded ? '−' : '+'}</span>
              </button>
              {expanded ? <p className="px-4 pb-4 text-sm leading-relaxed text-castiq-muted">{item.a}</p> : null}
            </div>
          );
        })}
        {visible.length === 0 ? <p className="px-4 py-6 text-sm text-castiq-muted">No questions match that search.</p> : null}
      </div>
    </div>
  );
}
