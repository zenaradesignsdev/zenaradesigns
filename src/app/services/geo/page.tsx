import type { Metadata } from 'next';
import GeoService from '@/components/pages/services/GeoService';
import { JsonLd } from '@/components/JsonLd';
import { serviceContent, serviceSchema, faqPageSchema, serviceBreadcrumb } from '@/lib/service-content';

const entry = serviceContent['geo'];

export const metadata: Metadata = {
  title: 'GEO & AI Search Optimization | Markham & GTA | Zenara',
  description:
    'Get cited by ChatGPT, Perplexity, Gemini and Google AI Overviews. Generative engine optimization for GTA businesses — structured data, entity signals, answer-shaped content.',
  keywords: ['generative engine optimization', 'GEO services Toronto', 'AI search optimization', 'ChatGPT SEO', 'Perplexity optimization', 'AI Overviews optimization Markham'],
  alternates: { canonical: 'https://zenaradesigns.com/services/geo' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'GEO & AI Search Optimization | Markham & GTA | Zenara',
    description:
      'Get cited by ChatGPT, Perplexity, Gemini and Google AI Overviews. Generative engine optimization for GTA businesses.',
    url: 'https://zenaradesigns.com/services/geo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEO & AI Search Optimization | Markham & GTA | Zenara',
    description:
      'Get cited by ChatGPT, Perplexity, Gemini and Google AI Overviews. Generative engine optimization for GTA businesses — structured data, entity signals, answer-shaped content.',
  },
};

export default function GeoPage() {
  return (
    <>
      <JsonLd schema={serviceBreadcrumb(entry)} />
      <JsonLd schema={serviceSchema(entry)} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <GeoService />
    </>
  );
}
