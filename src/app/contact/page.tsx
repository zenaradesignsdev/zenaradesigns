import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/structured-data';
import Contact from '@/components/pages/Contact';

export const metadata: Metadata = {
  title: 'Start Your Website Project — Free Quote in 24 Hours | Zenara',
  description:
    'Tell us about your business and get a custom web design quote within 24 hours. No commitment. Websites, logos and business cards for Markham and the GTA.',
  alternates: { canonical: 'https://zenaradesigns.com/contact' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Start Your Website Project — Free Quote in 24 Hours | Zenara',
    description:
      'Tell us about your business and get a custom web design quote within 24 hours. No commitment. Websites, logos and business cards for Markham and the GTA.',
    url: 'https://zenaradesigns.com/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start Your Website Project — Free Quote in 24 Hours | Zenara',
    description:
      'Tell us about your business and get a custom web design quote within 24 hours. No commitment. Websites, logos and business cards for Markham and the GTA.',
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])} />
      <Contact />
    </>
  );
}
