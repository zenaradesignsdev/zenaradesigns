import type { Metadata } from 'next';
import BusinessCardsService from '@/components/pages/services/BusinessCardsService';

export const metadata: Metadata = {
  title: 'Business Card Design Toronto | Print-Ready Cards | Zenara Designs',
  description: 'Professional business card design for Toronto & GTA professionals. Premium print-ready designs that make lasting first impressions. Fast turnaround.',
  alternates: { canonical: 'https://zenaradesigns.com/services/business-cards' },
  openGraph: {
    title: 'Business Card Design Toronto | Print-Ready Cards | Zenara Designs',
    description: 'Professional business card design for Toronto & GTA professionals. Premium print-ready designs that make lasting first impressions. Fast turnaround.',
    url: 'https://zenaradesigns.com/services/business-cards',
  },
};

export default function BusinessCardsPage() {
  return <BusinessCardsService />;
}
