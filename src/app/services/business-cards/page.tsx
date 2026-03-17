import type { Metadata } from 'next';
import BusinessCardsService from '@/components/pages/services/BusinessCardsService';

export const metadata: Metadata = {
  title: 'Business Card Design Toronto | Print-Ready Cards | Zenara Designs',
  description: 'Professional business card design for Toronto & GTA professionals. Premium print-ready designs with spot UV, foil, and soft-touch options. 3–5 day turnaround. Free consultation.',
  keywords: ['business card design Toronto', 'print-ready card design GTA', 'professional business cards Toronto', 'custom business card designer', 'premium business cards Toronto'],
  alternates: { canonical: 'https://zenaradesigns.com/services/business-cards' },
  openGraph: {
    title: 'Business Card Design Toronto | Print-Ready Cards | Zenara Designs',
    description: 'Professional business card design for Toronto & GTA professionals. Premium print-ready designs with spot UV, foil, and soft-touch options. 3–5 day turnaround. Free consultation.',
    url: 'https://zenaradesigns.com/services/business-cards',
  },
};

export default function BusinessCardsPage() {
  return <BusinessCardsService />;
}
