import type { Metadata } from 'next';
import Lawyers from '@/components/pages/Lawyers';
import { JsonLd } from '@/components/JsonLd';
import { generateServiceSchema } from '@/lib/structured-data';
import { faqPageSchema, breadcrumbSchema } from '@/lib/service-content';
import { industryContent } from '@/lib/industry-content';

const entry = industryContent['lawyers'];

export const metadata: Metadata = {
  title: 'Law Firm Website Design Toronto & GTA | Zenara',
  description:
    'Websites for small and mid-size Ontario law firms in Toronto and the GTA, written to the Law Society’s marketing rules. Fixed pricing, live in 1–2 weeks.',
  alternates: { canonical: 'https://zenaradesigns.com/lawyers' },
  openGraph: {
    title: 'Law Firm Website Design Toronto & GTA | Zenara',
    description:
      'Websites for small and mid-size Ontario law firms in Toronto and the GTA, written to the Law Society’s marketing rules. Fixed pricing, live in 1–2 weeks.',
    url: 'https://zenaradesigns.com/lawyers',
    images: [{ url: 'https://zenaradesigns.com/images/lawyer-gavel-office.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Law Firm Website Design Toronto & GTA | Zenara',
    description:
      'Websites for small and mid-size Ontario law firms in Toronto and the GTA, written to the Law Society’s marketing rules. Fixed pricing, live in 1–2 weeks.',
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
      <JsonLd
        schema={generateServiceSchema(
          'Law Firm Web Design',
          'Website design for small and mid-size law firms in Toronto and across the GTA. Practice-area pages, lawyer profiles and consultation intake, written to the Law Society of Ontario’s marketing rules.',
          entry.path
        )}
      />
      <Lawyers />
    </>
  );
}
