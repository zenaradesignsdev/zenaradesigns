import type { Metadata } from 'next';
import Schedule from '@/components/pages/Schedule';

export const metadata: Metadata = {
  title: 'Schedule a Meeting | Contact Zenara Designs | Toronto',
  description:
    'Book a meeting with Zenara Designs to discuss your web design project. Schedule a 30-minute consultation call with our team in Toronto & GTA.',
  alternates: { canonical: 'https://zenaradesigns.com/contact/schedule' },
  openGraph: {
    title: 'Schedule a Meeting | Contact Zenara Designs | Toronto',
    description:
      'Book a meeting with Zenara Designs to discuss your web design project. Schedule a 30-minute consultation call with our team in Toronto & GTA.',
    url: 'https://zenaradesigns.com/contact/schedule',
  },
};

export default function SchedulePage() {
  return <Schedule />;
}
