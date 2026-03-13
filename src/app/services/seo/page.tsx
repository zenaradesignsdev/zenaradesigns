import type { Metadata } from 'next';
import SeoService from '@/components/pages/services/SeoService';

export const metadata: Metadata = {
  title: 'SEO Services Toronto | Search Engine Optimization | Zenara Designs',
  description: 'Professional SEO services for Toronto & GTA businesses. Local SEO, technical optimization, content strategy, and Google ranking improvements. See measurable results.',
  alternates: { canonical: 'https://zenaradesigns.com/services/seo' },
  openGraph: {
    title: 'SEO Services Toronto | Search Engine Optimization | Zenara Designs',
    description: 'Professional SEO services for Toronto & GTA businesses. Local SEO, technical optimization, content strategy, and Google ranking improvements. See measurable results.',
    url: 'https://zenaradesigns.com/services/seo',
  },
};

export default function SeoPage() {
  return <SeoService />;
}
