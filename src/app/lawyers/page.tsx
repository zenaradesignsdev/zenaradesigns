import type { Metadata } from 'next';
import Lawyers from '@/components/pages/Lawyers';
import { JsonLd } from '@/components/JsonLd';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';
import { faqPageSchema, breadcrumbSchema } from '@/lib/service-content';
import { industryContent } from '@/lib/industry-content';

const entry = industryContent['lawyers'];

export const metadata: Metadata = {
  title: 'Law Firm Web Design Markham & GTA | Zenara',
  description:
    'Websites for GTA law firms in Markham, Scarborough, Toronto, and Mississauga. Built to earn trust and rank locally. Fixed pricing, live in 1–2 weeks.',
  alternates: { canonical: 'https://zenaradesigns.com/lawyers' },
  openGraph: {
    title: 'Law Firm Web Design Markham & GTA | Zenara',
    description:
      'Websites for GTA law firms in Markham, Scarborough, Toronto, and Mississauga. Built to earn trust and rank locally. Fixed pricing, live in 1–2 weeks.',
    url: 'https://zenaradesigns.com/lawyers',
    images: [{ url: 'https://zenaradesigns.com/images/lawyer-gavel-office.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Law Firm Web Design Markham & GTA | Zenara',
    description:
      'Websites for GTA law firms in Markham, Scarborough, Toronto, and Mississauga. Built to earn trust and rank locally. Fixed pricing, live in 1–2 weeks.',
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
      {/* Moved here from a useEffect inside Lawyers.tsx so it is server-rendered. */}
      <JsonLd schema={generateLocalBusinessSchema()} />
      <JsonLd
        schema={generateServiceSchema(
          'Law Firm Web Design',
          'Web design for law firms and legal practices across the GTA. Practice-area pages, case results, and consultation intake that build trust and convert visitors into consultations.'
        )}
      />
      <Lawyers />
    </>
  );
}
