import type { Metadata } from 'next';
import Renovations from '@/components/pages/Renovations';

export const metadata: Metadata = {
  title: 'Renovation Company Web Design GTA | Construction Websites | Zenara',
  description:
    'Professional web design for renovation companies in Markham, Vaughan, Pickering & across GTA. Showcase projects, capture leads, and grow your construction business.',
  alternates: { canonical: 'https://zenaradesigns.com/renovations' },
  openGraph: {
    images: [{ url: 'https://zenaradesigns.com/images/renovation-backyard.png' }],
  },
};

export default function RenovationsPage() {
  return <Renovations />;
}
