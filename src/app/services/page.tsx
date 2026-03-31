import type { Metadata } from 'next';
import Services from '@/components/pages/Services';

export const metadata: Metadata = {
  title: 'Web Design, SEO, Logo & Business Cards — All Services | Zenara',
  description:
    'Everything your Toronto business needs online: custom websites, e-commerce, SEO, logo design, business cards, and managed hosting. See all 6 services with pricing and examples.',
  alternates: { canonical: 'https://zenaradesigns.com/services' },
  openGraph: {
    title: 'Web Design, SEO, Logo & Business Cards — All Services | Zenara',
    description:
      'Everything your Toronto business needs online: custom websites, e-commerce, SEO, logo design, business cards, and managed hosting. See all 6 services with pricing and examples.',
    url: 'https://zenaradesigns.com/services',
  },
};

export default function ServicesPage() {
  return <Services />;
}
