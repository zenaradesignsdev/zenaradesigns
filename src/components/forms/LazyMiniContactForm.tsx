'use client';

import dynamic from 'next/dynamic';

/**
 * Defers MiniContactForm off the critical path.
 *
 * The form pulls in zod plus the shared validation/sanitisation helpers — the
 * single largest client dependency on the industry, FAQ and service pages —
 * and it always renders well below the fold. Loading it eagerly meant every
 * visitor paid for it during initial page load, including the ones who never
 * scrolled that far.
 *
 * `ssr: false` is deliberate: a quote form has no SEO value in the initial
 * HTML, and skipping SSR keeps it out of the server payload too. The
 * placeholder reserves the form's approximate height so deferring it does not
 * cause a layout shift when it swaps in.
 */
const MiniContactForm = dynamic(() => import('./MiniContactForm'), {
  ssr: false,
  loading: () => <div className="min-h-[520px]" aria-hidden="true" />,
});

interface LazyMiniContactFormProps {
  id: string;
  projectType: string;
  heading: string;
  subheading?: string;
  messagePlaceholder?: string;
}

const LazyMiniContactForm = (props: LazyMiniContactFormProps) => <MiniContactForm {...props} />;

export default LazyMiniContactForm;
