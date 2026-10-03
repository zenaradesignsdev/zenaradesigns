import type { Metadata } from 'next';
import Process from '@/components/pages/Process';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/service-content';
import { processPageFaqSchema } from '@/lib/faq-data';

const processBreadcrumb = breadcrumbSchema('/process', [
  { name: 'Home', url: '/' },
  { name: 'Our Process', url: '/process' },
]);

export const metadata: Metadata = {
  title: 'Our Web Design Process — 6 Phases, Fixed Price | Zenara',
  description:
    'Our fixed-price, six-phase process: Discovery, Prototyping, Build, Testing, Launch, and Support. Custom web design for Markham & GTA — no templates, no shortcuts.',
  alternates: { canonical: 'https://zenaradesigns.com/process' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Our Web Design Process — 6 Phases, Fixed Price | Zenara',
    description:
      'Our fixed-price, six-phase process: Discovery, Prototyping, Build, Testing, Launch, and Support. Custom web design for Markham & GTA — no templates, no shortcuts.',
    url: 'https://zenaradesigns.com/process',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Web Design Process — 6 Phases, Fixed Price | Zenara',
    description:
      'Our fixed-price, six-phase process: Discovery, Prototyping, Build, Testing, Launch, and Support. Custom web design for Markham & GTA — no templates, no shortcuts.',
  },
};

export default function ProcessPage() {
  return (
    <>
      <JsonLd schema={processBreadcrumb} />
      <JsonLd schema={processPageFaqSchema} />
      <Process />
    </>
  );
}
