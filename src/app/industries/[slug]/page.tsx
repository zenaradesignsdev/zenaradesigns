import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IndustryVerticalPage from '@/components/pages/IndustryVertical';
import { JsonLd } from '@/components/JsonLd';
import { industryVerticals, getIndustryVertical } from '@/lib/industry-verticals';
import { breadcrumbSchema, faqPageSchema } from '@/lib/service-content';

const BASE = 'https://zenaradesigns.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return industryVerticals.map((vertical) => ({ slug: vertical.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const vertical = getIndustryVertical(params.slug);
  if (!vertical) return { robots: { index: false, follow: false } };

  const url = `${BASE}/industries/${vertical.slug}`;
  return {
    title: vertical.metaTitle,
    description: vertical.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      images: ['/opengraph-image'],
      title: vertical.metaTitle,
      description: vertical.metaDescription,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: vertical.metaTitle,
      description: vertical.metaDescription,
    },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const vertical = getIndustryVertical(params.slug);
  if (!vertical) notFound();

  const path = `/industries/${vertical.slug}`;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema(path, [
          { name: 'Home', url: '/' },
          { name: vertical.parentLabel, url: vertical.parentHref },
          { name: vertical.name, url: path },
        ])}
      />
      <JsonLd schema={faqPageSchema(path, vertical.faqs)} />
      <IndustryVerticalPage vertical={vertical} />
    </>
  );
}
