import type { Metadata } from 'next';
import Lawyers from '@/components/pages/Lawyers';
import { JsonLd } from '@/components/JsonLd';
import { faqPageSchema, breadcrumbSchema } from '@/lib/service-content';
import { industryContent } from '@/lib/industry-content';

const entry = industryContent['lawyers'];

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
  return (
    <>
      <JsonLd schema={breadcrumbSchema(entry.path, [
        { name: 'Home', url: '/' },
        { name: entry.breadcrumbLabel, url: entry.path },
      ])} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <Lawyers />
    </>
  );
}
