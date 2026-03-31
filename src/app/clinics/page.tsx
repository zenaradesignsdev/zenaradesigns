import type { Metadata } from 'next';
import Clinics from '@/components/pages/Clinics';

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
  return <Clinics />;
}
