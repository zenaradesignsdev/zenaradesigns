import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/structured-data';
import Schedule from '@/components/pages/Schedule';

export const metadata: Metadata = {
  title: 'Book a Free Web Design Consultation | GTA | Zenara',
  description:
    'Schedule a free 30-minute call with Zenara Designs to discuss your website project. Easy online booking, flexible times. Serving Toronto & all GTA.',
  alternates: { canonical: 'https://zenaradesigns.com/contact/schedule' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Book a Free Web Design Consultation | GTA | Zenara',
    description:
      'Schedule a free 30-minute call with Zenara Designs to discuss your website project. Easy online booking, flexible times. Serving Toronto & all GTA.',
    url: 'https://zenaradesigns.com/contact/schedule',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Web Design Consultation | GTA | Zenara',
    description:
      'Schedule a free 30-minute call with Zenara Designs to discuss your website project. Easy online booking, flexible times. Serving Toronto & all GTA.',
  },
};

export default function SchedulePage() {
  return (
    <>
      <JsonLd schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }, { name: 'Schedule', url: '/contact/schedule' }])} />
      <Schedule />
    </>
  );
}
