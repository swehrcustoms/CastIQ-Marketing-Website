import { FormEvent, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../services/firebase';
import { track } from '../../marketing/analytics';
import { usePageMeta } from '../../marketing/meta';

const CATEGORIES = ['product', 'account', 'billing', 'partnership', 'bug'] as const;

export function ContactPage() {
  usePageMeta('Contact', 'Contact CastIQ about the product, your account, billing, or a bug.', '/contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('product');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (honeypot) {
      setError('That submission could not be accepted.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Add a few more words so we can tell what you need.');
      return;
    }
    setStatus('sending');
    try {
      const submit = httpsCallable(functions, 'submitContactInquiry');
      await submit({ name: name.trim(), email: email.trim(), category, message: message.trim() });
      setStatus('sent');
      track('support_submitted', { category });
    } catch {
      setStatus('error');
      setError('The contact service is not available in this environment. Nothing was sent.');
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-black uppercase tracking-tight">Contact</h1>
      <p className="mt-4 text-castiq-muted">Tell us what you need. This form only succeeds after the contact function is deployed.</p>
      {status === 'sent' ? (
        <p className="mt-6 rounded-xl border border-cyan-400/40 p-4" role="status">Message received. We stored it for the CastIQ team.</p>
      ) : (
        <form onSubmit={(event) => void onSubmit(event)} className="mt-6 space-y-4">
          <label className="block text-sm">Name
            <input required value={name} onChange={(event) => setName(event.target.value)} className="ciq-input mt-1 w-full" autoComplete="name" />
          </label>
          <label className="block text-sm">Email
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="ciq-input mt-1 w-full" autoComplete="email" />
          </label>
          <label className="block text-sm">Category
            <select value={category} onChange={(event) => setCategory(event.target.value as (typeof CATEGORIES)[number])} className="ciq-input mt-1 w-full">
              {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="block text-sm">Message
            <textarea required value={message} onChange={(event) => setMessage(event.target.value)} className="ciq-input mt-1 min-h-32 w-full" />
          </label>
          <label className="hidden">Website
            <input value={honeypot} onChange={(event) => setHoneypot(event.target.value)} tabIndex={-1} autoComplete="off" />
          </label>
          {error ? <p className="text-sm text-castiq-red" role="alert">{error}</p> : null}
          <button type="submit" className="ciq-btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </div>
  );
}
