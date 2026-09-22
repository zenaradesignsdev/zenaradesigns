import type { Metadata } from 'next';
import Accountants from '@/components/pages/Accountants';
import { JsonLd } from '@/components/JsonLd';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';
import { faqPageSchema, breadcrumbSchema } from '@/lib/service-content';
import { industryContent } from '@/lib/industry-content';

const entry = industryContent['accountants'];

export const metadata: Metadata = {
  title: 'Accountant Web Design Markham & GTA | Zenara',
  description:
    'Websites for GTA CPAs, bookkeepers, and mortgage brokers. Secure client portals and document intake. Fixed pricing, live in 1–2 weeks.',
  alternates: { canonical: 'https://zenaradesigns.com/accountants' },
  openGraph: {
    title: 'Accountant Web Design Markham & GTA | Zenara',
    description:
      'Websites for GTA CPAs, bookkeepers, and mortgage brokers. Secure client portals and document intake. Fixed pricing, live in 1–2 weeks.',
    url: 'https://zenaradesigns.com/accountants',
    images: [{ url: 'https://zenaradesigns.com/images/accountant-computer-office.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accountant Web Design Markham & GTA | Zenara',
    description:
      'Websites for GTA CPAs, bookkeepers, and mortgage brokers. Secure client portals and document intake. Fixed pricing, live in 1–2 weeks.',
  },
};

export default function AccountantsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(entry.path, [
        { name: 'Home', url: '/' },
        { name: entry.breadcrumbLabel, url: entry.path },
      ])} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      {/* Moved here from a useEffect inside Accountants.tsx so it is server-rendered. */}
      <JsonLd schema={generateLocalBusinessSchema()} />
      <JsonLd
        schema={generateServiceSchema(
          'Accounting Firm Web Design',
          'Web design for accounting firms, bookkeepers, and mortgage brokers across the GTA. Secure client portals, service-line pages, and document intake that turn browsers into booked discovery calls.'
        )}
      />
      <Accountants />
    </>
  );
}
