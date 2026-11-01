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
  title: 'Web Design Process: 6 Phases, Fixed Price | Zenara Designs',
  description:
    'Our fixed-price, six-phase process: Discovery, Prototyping, Build, Testing, Launch and Support. Custom web design for GTA businesses, with no templates.',
  alternates: { canonical: 'https://zenaradesigns.com/process' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Web Design Process: 6 Phases, Fixed Price | Zenara Designs',
    description:
      'Our fixed-price, six-phase process: Discovery, Prototyping, Build, Testing, Launch and Support. Custom web design for GTA businesses, with no templates.',
    url: 'https://zenaradesigns.com/process',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design Process: 6 Phases, Fixed Price | Zenara Designs',
    description:
      'Our fixed-price, six-phase process: Discovery, Prototyping, Build, Testing, Launch and Support. Custom web design for GTA businesses, with no templates.',
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
