import type { Metadata } from 'next';
import Services from '@/components/pages/Services';

export const metadata: Metadata = {
  title: 'Web Design Services Toronto | Business Cards & Logo | Zenara',
  description:
    'Complete web design services in Toronto & GTA. Custom websites, business cards, logo design, and digital marketing. Get a free consultation for your project today!',
  alternates: { canonical: 'https://zenaradesigns.com/services' },
  openGraph: {
    title: 'Web Design Services Toronto | Business Cards & Logo | Zenara',
    description:
      'Complete web design services in Toronto & GTA. Custom websites, business cards, logo design, and digital marketing. Get a free consultation for your project today!',
    url: 'https://zenaradesigns.com/services',
  },
};

export default function ServicesPage() {
  return <Services />;
}
