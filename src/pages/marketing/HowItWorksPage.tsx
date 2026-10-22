import { Link } from 'react-router-dom';
import { LakePreview } from '../../components/marketing/LakePreview';
import { usePageMeta } from '../../marketing/meta';

export function HowItWorksPage() {
  usePageMeta(
    'How it works',
    'How CastIQ works: search a Minnesota lake, read dated fishing reports and surveys, then use that information to plan a trip.',
    '/how-it-works',
  );
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-black uppercase tracking-tight">How it works</h1>
      <p className="mt-4 max-w-3xl text-castiq-muted">
        You do not need to know fisheries jargon to start. A fishing report is a dated note about what someone caught or observed. A survey is an agency sample of fish in a lake, and it has a year. CastIQ shows those dates instead of hiding them.
      </p>
      <ol className="mt-10 space-y-6">
        <li className="rounded-2xl border border-white/10 p-6">
          <h2 className="text-2xl font-semibold">1. Choose your lake</h2>
          <p className="mt-2 text-castiq-muted">Type a name. If several lakes match, use the county and nearby town.</p>
          <div className="mt-4"><LakePreview /></div>
        </li>
        <li className="rounded-2xl border border-white/10 p-6">
          <h2 className="text-2xl font-semibold">2. Read what is actually there</h2>
          <p className="mt-2 text-castiq-muted">
            After you sign in, the lake page shows which species were reported, and when, plus surveys and water information that have been loaded. Lure, depth, and the written report are Standard and Premium. Species filters narrow the list. They do not create new data.
          </p>
        </li>
        <li className="rounded-2xl border border-white/10 p-6">
          <h2 className="text-2xl font-semibold">3. Plan the trip</h2>
          <p className="mt-2 text-castiq-muted">
            Use the date on a report and ice guidance as inputs. Lure, depth, and seasonal tactics open with Standard or Premium. CastIQ does not decide whether ice is safe or whether a regulation has changed today.
          </p>
          <Link to="/login" state={{ from: '/search', mode: 'signup' }} className="ciq-btn-primary mt-4 inline-flex">Get started free</Link>
        </li>
      </ol>
    </div>
  );
}
