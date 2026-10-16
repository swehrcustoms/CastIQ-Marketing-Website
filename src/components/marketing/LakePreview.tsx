import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchDnrLakes, type CatalogLake } from '../../services/dnrLakeSearch';

export function LakePreview() {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<CatalogLake[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const query = term.trim();
    if (query.length < 2) {
      setMessage('Enter at least two letters of a lake name.');
      return;
    }
    setStatus('loading');
    setMessage(null);
    try {
      const hits = await searchDnrLakes(query, 5);
      setResults(hits);
      setStatus('done');
      if (hits.length === 0) setMessage('No Minnesota DNR lake matched that name.');
    } catch {
      setResults([]);
      setStatus('error');
      setMessage('The Minnesota DNR lake search did not respond. Nothing was invented in its place.');
    }
  }

  return (
    <div className="rounded-3xl border border-cyan-400/30 bg-[#08162c] p-4 shadow-[0_0_40px_rgba(6,182,212,0.12)] sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-castiq-teal">Public lake lookup</p>
      <h3 className="mt-2 text-xl font-semibold">Search the Minnesota DNR lake catalog</h3>
      <p className="mt-2 text-sm text-castiq-muted">
        This uses the same DNR search CastIQ uses. It shows name, county, and nearby town. Fishing reports stay in the app after you sign in.
      </p>
      <form onSubmit={(event) => void onSubmit(event)} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="lake-preview">Lake name</label>
        <input
          id="lake-preview"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Try Leech or Minnetonka"
          className="ciq-input min-h-11 flex-1"
        />
        <button type="submit" className="ciq-btn-primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Searching…' : 'Look up lake'}
        </button>
      </form>
      {message ? <p className="mt-3 text-sm text-castiq-muted" role="status">{message}</p> : null}
      <ul className="mt-4 space-y-2">
        {results.map((lake) => (
          <li key={lake.id} className="rounded-xl border border-white/10 bg-castiq-blue-dark px-4 py-3">
            <p className="font-semibold">{lake.name}</p>
            <p className="text-sm text-castiq-muted">
              {[lake.county ? `${lake.county} County` : null, lake.nearestTown].filter(Boolean).join(' · ') || 'Location details vary'}
            </p>
            <Link
              to={`/login?lake=${encodeURIComponent(lake.id)}`}
              state={{ from: `/lake/${lake.id}` }}
              className="mt-2 inline-flex text-sm font-semibold text-castiq-teal"
            >
              Sign in to open this lake
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
