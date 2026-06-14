import type { Metadata } from 'next';
import Clinics from '@/components/pages/Clinics';
import { JsonLd } from '@/components/JsonLd';
import { faqPageSchema, breadcrumbSchema } from '@/lib/service-content';
import { industryContent } from '@/lib/industry-content';

const entry = industryContent['clinics'];

export const metadata: Metadata = {
  title: 'Wellness Clinic Web Design GTA | Health & Wellness Websites | Zenara',
  description:
    'Professional web design for wellness clinics in Markham, Vaughan, Pickering & across GTA. Modern platforms for massage therapy, chiropractic, physiotherapy, and holistic health. Free consultation.',
  alternates: { canonical: 'https://zenaradesigns.com/clinics' },
  openGraph: {
    title: 'Wellness Clinic Web Design GTA | Health & Wellness Websites | Zenara',
    description:
      'Professional web design for wellness clinics in Markham, Vaughan, Pickering & across GTA. Modern platforms for massage therapy, chiropractic, physiotherapy, and holistic health. Free consultation.',
    url: 'https://zenaradesigns.com/clinics',
    images: [{ url: 'https://zenaradesigns.com/images/clinic-practitioner.png' }],
  },
};

export default function ClinicsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(entry.path, [
        { name: 'Home', url: '/' },
        { name: entry.breadcrumbLabel, url: entry.path },
      ])} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <Clinics />
    </>
  );
}
