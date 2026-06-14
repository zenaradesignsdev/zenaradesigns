import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WebDesignCity from '@/components/pages/WebDesignCity';
import { cityContent, citySlugs } from '@/lib/city-content';

interface Props {
  params: { city: string };
}

export function generateStaticParams() {
  return citySlugs.map((city) => ({ city }));
}

export function generateMetadata({ params }: Props): Metadata {
  const content = cityContent[params.city];
  if (!content) return {};

  const url = `https://zenaradesigns.com/web-design/${content.slug}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
      type: 'website',
    },
  };
}

export default function WebDesignCityPage({ params }: Props) {
  const content = cityContent[params.city];
  if (!content) notFound();

  const url = `https://zenaradesigns.com/web-design/${content.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: `Web Design ${content.city}`,
    serviceType: 'Web Design and Development',
    description: content.metaDescription,
    url,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Zenara Designs',
      url: 'https://zenaradesigns.com',
      email: 'info@zenaradesigns.com',
      telephone: '+16478351077',
      priceRange: '$$',
    },
    areaServed: { '@type': 'City', name: content.city },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zenaradesigns.com' },
      { '@type': 'ListItem', position: 2, name: 'Web Design', item: 'https://zenaradesigns.com/services/web-design' },
      { '@type': 'ListItem', position: 3, name: content.city, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        data-ssr="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        data-ssr="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        data-ssr="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <WebDesignCity content={content} />
    </>
  );
}
