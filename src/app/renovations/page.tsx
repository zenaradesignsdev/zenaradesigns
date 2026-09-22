import type { Metadata } from 'next';
import Renovations from '@/components/pages/Renovations';
import { JsonLd } from '@/components/JsonLd';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';
import { faqPageSchema, breadcrumbSchema } from '@/lib/service-content';
import { industryContent } from '@/lib/industry-content';

const entry = industryContent['renovations'];

export const metadata: Metadata = {
  title: 'Contractor Web Design Markham & GTA | Zenara',
  description:
    'Websites for GTA renovators, roofers, HVAC, electrical, and landscaping. Project galleries and quote forms. Fixed pricing, live in 1–2 weeks.',
  alternates: { canonical: 'https://zenaradesigns.com/renovations' },
  openGraph: {
    title: 'Contractor Web Design Markham & GTA | Zenara',
    description:
      'Websites for GTA renovators, roofers, HVAC, electrical, and landscaping. Project galleries and quote forms. Fixed pricing, live in 1–2 weeks.',
    url: 'https://zenaradesigns.com/renovations',
    images: [{ url: 'https://zenaradesigns.com/images/renovation-hero-exterior.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contractor Web Design Markham & GTA | Zenara',
    description:
      'Websites for GTA renovators, roofers, HVAC, electrical, and landscaping. Project galleries and quote forms. Fixed pricing, live in 1–2 weeks.',
  },
};

export default function RenovationsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(entry.path, [
        { name: 'Home', url: '/' },
        { name: entry.breadcrumbLabel, url: entry.path },
      ])} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      {/* Moved here from a useEffect inside Renovations.tsx so it is server-rendered. */}
      <JsonLd schema={generateLocalBusinessSchema()} />
      <JsonLd
        schema={generateServiceSchema(
          'Renovation & Contractor Web Design',
          'Web design for renovation companies and trades across the GTA — kitchen and bath remodelers, general contractors, roofing, HVAC, electrical, and landscaping. Project galleries and quote forms that turn browsers into booked estimates.'
        )}
      />
      <Renovations />
    </>
  );
}
