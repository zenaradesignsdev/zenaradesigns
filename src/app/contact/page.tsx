import type { Metadata } from 'next';
import Contact from '@/components/pages/Contact';

export const metadata: Metadata = {
  title: 'Get a Free Web Design Quote | Toronto & GTA | Zenara Designs',
  description:
    'Ready to start your project? Contact Zenara Designs for a free consultation. Web design, business cards & logo design for Toronto & GTA. We respond within 24 hours.',
  alternates: { canonical: 'https://zenaradesigns.com/contact' },
  openGraph: {
    title: 'Get a Free Web Design Quote | Toronto & GTA | Zenara Designs',
    description:
      'Ready to start your project? Contact Zenara Designs for a free consultation. Web design, business cards & logo design for Toronto & GTA. We respond within 24 hours.',
    url: 'https://zenaradesigns.com/contact',
  },
};

export default function ContactPage() {
  return <Contact />;
}
