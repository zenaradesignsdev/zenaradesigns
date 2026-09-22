import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/structured-data';
import Blog from '@/components/pages/Blog';

export const metadata: Metadata = {
  title: 'Blog | Web Design Tips & Insights | Zenara Designs',
  description:
    'Read our latest blog posts about web design, digital marketing, business growth, and online presence. Expert insights for Toronto businesses and entrepreneurs.',
  alternates: { canonical: 'https://zenaradesigns.com/blog' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Blog | Web Design Tips & Insights | Zenara Designs',
    description:
      'Read our latest blog posts about web design, digital marketing, business growth, and online presence. Expert insights for Toronto businesses and entrepreneurs.',
    url: 'https://zenaradesigns.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Web Design Tips & Insights | Zenara Designs',
    description:
      'Read our latest blog posts about web design, digital marketing, business growth, and online presence. Expert insights for Toronto businesses and entrepreneurs.',
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
