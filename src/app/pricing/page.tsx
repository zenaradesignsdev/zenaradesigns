import type { Metadata } from 'next';
import Pricing from '@/components/pages/Pricing';

export const metadata: Metadata = {
  title: 'Web Design Packages from $499 — Compare Plans & Pricing | Zenara',
  description:
    "Compare 3 web design packages with transparent pricing for Toronto & GTA businesses. See exactly what's included at every tier — no hidden fees. Free custom quote within 24 hours.",
  alternates: { canonical: 'https://zenaradesigns.com/pricing' },
  openGraph: {
    title: 'Web Design Packages from $499 — Compare Plans & Pricing | Zenara',
    description:
      "Compare 3 web design packages with transparent pricing for Toronto & GTA businesses. See exactly what's included at every tier — no hidden fees. Free custom quote within 24 hours.",
    url: 'https://zenaradesigns.com/pricing',
  },
};

export default function PricingPage() {
  return <Pricing />;
}
