import type { Metadata } from 'next';
import Contact from '@/components/pages/Contact';

export const metadata: Metadata = {
  title: 'Start Your Website Project — Free Quote in 24 Hours | Zenara',
  description:
    'Tell us about your business and get a custom web design quote within 24 hours. No commitment, no pressure. Professional websites, business cards & logo design for Toronto & GTA.',
  alternates: { canonical: 'https://zenaradesigns.com/contact' },
  openGraph: {
    title: 'Start Your Website Project — Free Quote in 24 Hours | Zenara',
    description:
      'Tell us about your business and get a custom web design quote within 24 hours. No commitment, no pressure. Professional websites, business cards & logo design for Toronto & GTA.',
    url: 'https://zenaradesigns.com/contact',
  },
};

export default function ContactPage() {
  return <Contact />;
}
