import type { Metadata } from 'next';
import Mobile from '@/components/pages/Mobile';

export const metadata: Metadata = {
  title: 'Why Mobile-First Design Matters for Toronto Businesses | Zenara',
  description:
    '60% of GTA web traffic is mobile. Learn why mobile-first design is essential, see responsive best practices, and discover how mobile optimization improves SEO and conversions.',
  alternates: { canonical: 'https://zenaradesigns.com/mobile' },
  openGraph: {
    title: 'Why Mobile-First Design Matters for Toronto Businesses | Zenara',
    description:
      '60% of GTA web traffic is mobile. Learn why mobile-first design is essential, see responsive best practices, and discover how mobile optimization improves SEO and conversions.',
    url: 'https://zenaradesigns.com/mobile',
  },
};

export default function MobilePage() {
  return <Mobile />;
}
