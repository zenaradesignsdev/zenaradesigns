import type { Metadata } from 'next';
import WebDesignService from '@/components/pages/services/WebDesignService';

export const metadata: Metadata = {
  title: 'Custom Web Design Toronto | Professional Websites | Zenara Designs',
  description: 'Custom website design and development for Toronto & GTA businesses. Modern, responsive, SEO-optimized websites that convert visitors into customers. Free consultation.',
  alternates: { canonical: 'https://zenaradesigns.com/services/web-design' },
  openGraph: {
    title: 'Custom Web Design Toronto | Professional Websites | Zenara Designs',
    description: 'Custom website design and development for Toronto & GTA businesses. Modern, responsive, SEO-optimized websites that convert visitors into customers. Free consultation.',
    url: 'https://zenaradesigns.com/services/web-design',
  },
};

export default function WebDesignPage() {
  return <WebDesignService />;
}
