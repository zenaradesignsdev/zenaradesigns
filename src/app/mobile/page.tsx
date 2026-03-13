import type { Metadata } from 'next';
import Mobile from '@/components/pages/Mobile';

export const metadata: Metadata = {
  title: 'Mobile-First Web Design | Responsive Design Best Practices | Zenara',
  description:
    'Learn why mobile-first design is essential for Toronto businesses. Discover responsive design best practices, mobile optimization, and how to prioritize mobile users for better SEO and conversions.',
  alternates: { canonical: 'https://zenaradesigns.com/mobile' },
  openGraph: {
    title: 'Mobile-First Web Design | Responsive Design Best Practices | Zenara',
    description:
      'Learn why mobile-first design is essential for Toronto businesses. Discover responsive design best practices, mobile optimization, and how to prioritize mobile users for better SEO and conversions.',
    url: 'https://zenaradesigns.com/mobile',
  },
};

export default function MobilePage() {
  return <Mobile />;
}
