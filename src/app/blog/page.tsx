import type { Metadata } from 'next';
import Blog from '@/components/pages/Blog';

export const metadata: Metadata = {
  title: 'Blog | Web Design Tips & Insights | Zenara Designs',
  description:
    'Read our latest blog posts about web design, digital marketing, business growth, and online presence. Expert insights for Toronto businesses and entrepreneurs.',
  alternates: { canonical: 'https://zenaradesigns.com/blog' },
  openGraph: {
    title: 'Blog | Web Design Tips & Insights | Zenara Designs',
    description:
      'Read our latest blog posts about web design, digital marketing, business growth, and online presence. Expert insights for Toronto businesses and entrepreneurs.',
    url: 'https://zenaradesigns.com/blog',
  },
};

export default function BlogPage() {
  return <Blog />;
}
