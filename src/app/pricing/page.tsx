import type { Metadata } from 'next';
import Pricing from '@/components/pages/Pricing';

export const metadata: Metadata = {
  title: 'Pricing Plans | Web Design Toronto | Zenara Designs',
  description:
    'Transparent web design pricing in Toronto & GTA. Get detailed costs for small business websites, e-commerce, and enterprise solutions. Request your free quote today!',
  alternates: { canonical: 'https://zenaradesigns.com/pricing' },
  openGraph: {
    title: 'Pricing Plans | Web Design Toronto | Zenara Designs',
    description:
      'Transparent web design pricing in Toronto & GTA. Get detailed costs for small business websites, e-commerce, and enterprise solutions. Request your free quote today!',
    url: 'https://zenaradesigns.com/pricing',
  },
};

export default function PricingPage() {
  return <Pricing />;
}
