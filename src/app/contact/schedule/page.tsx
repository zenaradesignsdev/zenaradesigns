import type { Metadata } from 'next';
import Schedule from '@/components/pages/Schedule';

export const metadata: Metadata = {
  title: 'Book a Free Web Design Consultation | Toronto | Zenara',
  description:
    'Schedule a free 30-minute call with Zenara Designs to discuss your website project. Easy online booking, flexible times. Serving Toronto & all GTA.',
  alternates: { canonical: 'https://zenaradesigns.com/contact/schedule' },
  openGraph: {
    title: 'Book a Free Web Design Consultation | Toronto | Zenara',
    description:
      'Schedule a free 30-minute call with Zenara Designs to discuss your website project. Easy online booking, flexible times. Serving Toronto & all GTA.',
    url: 'https://zenaradesigns.com/contact/schedule',
  },
};

export default function SchedulePage() {
  return <Schedule />;
}
