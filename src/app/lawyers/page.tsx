import type { Metadata } from 'next';
import Lawyers from '@/components/pages/Lawyers';

export const metadata: Metadata = {
  title: 'Law Firm Web Design GTA | Trust & Credibility | Zenara',
  description:
    'Professional web design for law firms in Markham, Vaughan, Pickering & across GTA. Build trust, showcase expertise, convert visitors. 78% research online first. Free consultation.',
  alternates: { canonical: 'https://zenaradesigns.com/lawyers' },
  openGraph: {
    title: 'Law Firm Web Design GTA | Trust & Credibility | Zenara',
    description:
      'Professional web design for law firms in Markham, Vaughan, Pickering & across GTA. Build trust, showcase expertise, convert visitors. 78% research online first. Free consultation.',
    url: 'https://zenaradesigns.com/lawyers',
    images: [{ url: 'https://zenaradesigns.com/images/lawyer-gavel-office.png' }],
  },
};

export default function LawyersPage() {
  return <Lawyers />;
}
