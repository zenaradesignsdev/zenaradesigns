import type { Metadata } from 'next';
import Clinics from '@/components/pages/Clinics';
import { JsonLd } from '@/components/JsonLd';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';
import { faqPageSchema, breadcrumbSchema } from '@/lib/service-content';
import { industryContent } from '@/lib/industry-content';

const entry = industryContent['clinics'];

export const metadata: Metadata = {
  title: 'Clinic Web Design Markham & GTA | Zenara',
  description:
    'Websites for GTA physio, chiro, RMT, and dental clinics. Online booking, practitioner profiles, insurance info. Fixed pricing, live in 1–2 weeks.',
  alternates: { canonical: 'https://zenaradesigns.com/clinics' },
  openGraph: {
    title: 'Clinic Web Design Markham & GTA | Zenara',
    description:
      'Websites for GTA physio, chiro, RMT, and dental clinics. Online booking, practitioner profiles, insurance info. Fixed pricing, live in 1–2 weeks.',
    url: 'https://zenaradesigns.com/clinics',
    images: [{ url: 'https://zenaradesigns.com/images/clinic-practitioner.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinic Web Design Markham & GTA | Zenara',
    description:
      'Websites for GTA physio, chiro, RMT, and dental clinics. Online booking, practitioner profiles, insurance info. Fixed pricing, live in 1–2 weeks.',
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
      {/* Moved here from a useEffect inside Clinics.tsx so it is server-rendered. */}
      <JsonLd schema={generateLocalBusinessSchema()} />
      <JsonLd
        schema={generateServiceSchema(
          'Wellness Clinic Web Design',
          'Web design for physiotherapy, chiropractic, massage therapy, dental, and wellness clinics across the GTA. Online booking, practitioner profiles, and insurance information that turn visitors into confirmed appointments.'
        )}
      />
      <Clinics />
    </>
  );
}
