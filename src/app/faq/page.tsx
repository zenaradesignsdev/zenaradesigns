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
  title: 'FAQ | Web Design Toronto | Pricing & Process | Zenara',
  description:
    'Get answers to web design questions in Toronto & GTA. Learn about pricing, timelines, and our proven process. Find solutions to your website needs today!',
  alternates: { canonical: 'https://zenaradesigns.com/faq' },
  openGraph: {
    title: 'FAQ | Web Design Toronto | Pricing & Process | Zenara',
    description:
      'Get answers to web design questions in Toronto & GTA. Learn about pricing, timelines, and our proven process. Find solutions to your website needs today!',
    url: 'https://zenaradesigns.com/faq',
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
