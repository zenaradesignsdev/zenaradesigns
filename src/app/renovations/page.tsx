import type { Metadata } from 'next';
import Renovations from '@/components/pages/Renovations';
import { JsonLd } from '@/components/JsonLd';
import { faqPageSchema, breadcrumbSchema } from '@/lib/service-content';
import { industryContent } from '@/lib/industry-content';

const entry = industryContent['renovations'];

export const metadata: Metadata = {
  title: 'Renovation Company Web Design GTA | Construction Websites | Zenara',
  description:
    'Professional web design for renovation companies in Markham, Vaughan, Pickering & across GTA. Showcase projects, capture leads, and grow your construction business.',
  alternates: { canonical: 'https://zenaradesigns.com/renovations' },
  openGraph: {
    title: 'Renovation Company Web Design GTA | Construction Websites | Zenara',
    description:
      'Professional web design for renovation companies in Markham, Vaughan, Pickering & across GTA. Showcase projects, capture leads, and grow your construction business.',
    url: 'https://zenaradesigns.com/renovations',
    images: [{ url: 'https://zenaradesigns.com/images/renovation-backyard.png' }],
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
      <Renovations />
    </>
  );
}
