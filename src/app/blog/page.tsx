import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/structured-data';
import Blog from '@/components/pages/Blog';

export const metadata: Metadata = {
  title: 'Web Design & SEO Guides for GTA Businesses | Zenara Blog',
  description:
    'Practical guides on web design, local SEO, website costs and hiring a designer, written for small businesses and professional firms in Markham and across the GTA.',
  alternates: { canonical: 'https://zenaradesigns.com/blog' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Web Design & SEO Guides for GTA Businesses | Zenara Blog',
    description:
      'Practical guides on web design, local SEO, website costs and hiring a designer, written for small businesses and professional firms in Markham and across the GTA.',
    url: 'https://zenaradesigns.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design & SEO Guides for GTA Businesses | Zenara Blog',
    description:
      'Practical guides on web design, local SEO, website costs and hiring a designer, written for small businesses and professional firms in Markham and across the GTA.',
  },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }])} />
      <Blog />
    </>
  );
}
