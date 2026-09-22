import type { Metadata } from 'next';
import FAQ from '@/components/pages/FAQ';
import { faqPageSchema } from '@/lib/faq-data';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://zenaradesigns.com/faq#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zenaradesigns.com' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://zenaradesigns.com/faq' },
  ],
};

export const metadata: Metadata = {
  title: 'FAQ | Markham Web Design | Pricing & Process | Zenara',
  description:
    'Answers to common web design questions for GTA businesses — pricing, timelines, and how our process works from kickoff to launch.',
  alternates: { canonical: 'https://zenaradesigns.com/faq' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'FAQ | Markham Web Design | Pricing & Process | Zenara',
    description:
      'Answers to common web design questions for GTA businesses — pricing, timelines, and how our process works from kickoff to launch.',
    url: 'https://zenaradesigns.com/faq',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | Markham Web Design | Pricing & Process | Zenara',
    description:
      'Answers to common web design questions for GTA businesses — pricing, timelines, and how our process works from kickoff to launch.',
  },
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        data-ssr="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <script
        type="application/ld+json"
        data-ssr="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQ />
    </>
  );
}
