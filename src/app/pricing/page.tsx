import type { Metadata } from 'next';
import Pricing from '@/components/pages/Pricing';

export const metadata: Metadata = {
  title: 'Web Design Pricing Toronto | Transparent Packages | Zenara',
  description:
    "Transparent web design pricing for Toronto & GTA businesses. Compare packages, see exactly what's included, and get a free custom quote within 24 hours. No hidden fees.",
  alternates: { canonical: 'https://zenaradesigns.com/pricing' },
  openGraph: {
    title: 'Web Design Pricing Toronto | Transparent Packages | Zenara',
    description:
      "Transparent web design pricing for Toronto & GTA businesses. Compare packages, see exactly what's included, and get a free custom quote within 24 hours. No hidden fees.",
    url: 'https://zenaradesigns.com/pricing',
  },
};

export default function PricingPage() {
  return <Pricing />;
}
