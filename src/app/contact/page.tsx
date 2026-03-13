import type { Metadata } from 'next';
import Contact from '@/components/pages/Contact';

export const metadata: Metadata = {
  title: 'Contact Us | Web Design Toronto | Zenara Designs',
  description:
    'Contact Zenara Designs for professional web design, development, and digital marketing services in Toronto & GTA. Get a free quote for your project today.',
  alternates: { canonical: 'https://zenaradesigns.com/contact' },
  openGraph: {
    title: 'Contact Us | Web Design Toronto | Zenara Designs',
    description:
      'Contact Zenara Designs for professional web design, development, and digital marketing services in Toronto & GTA. Get a free quote for your project today.',
    url: 'https://zenaradesigns.com/contact',
  },
};

export default function ContactPage() {
  return <Contact />;
}
