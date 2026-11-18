'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { CheckCircle } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    const website = (new FormData(e.currentTarget).get('website') as string) || '';

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setStatus('error');
        setError(data?.error || 'Signup failed. Please try again shortly.');
        return;
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setError('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <p className="flex h-11 items-center gap-2 text-sm text-cyan-300" role="status">
        <CheckCircle className="h-4 w-4" aria-hidden="true" />
        Subscribed — thanks for joining!
      </p>
    );
  }

  const submitting = status === 'submitting';

  return (
    <div className="max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="flex overflow-hidden rounded-full border border-white/15 bg-slate-950/60 focus-within:border-cyan-400/60"
      >
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address for our newsletter
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email for our newsletter"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          aria-invalid={status === 'error' || undefined}
          aria-describedby="footer-newsletter-note"
          className="h-11 min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-slate-400 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={submitting}
          className="m-1 rounded-full bg-white/10 px-4 text-sm font-medium text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Sending…' : 'Subscribe'}
        </button>
        {/* Honeypot — hidden from people, filled by bots */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      </form>
      {status === 'error' ? (
        <p id="footer-newsletter-note" role="alert" className="mt-2 px-4 text-xs text-red-300">
          {error}
        </p>
      ) : (
        // CASL: say what people are signing up for and that they can leave.
        <p id="footer-newsletter-note" className="mt-2 px-4 text-xs text-slate-400">
          Occasional website tips for small businesses. Unsubscribe anytime.{' '}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-cyan-400">
            Privacy
          </Link>
        </p>
      )}
    </div>
  );
}
