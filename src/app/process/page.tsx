import type { Metadata } from 'next';
import Process from '@/components/pages/Process';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/service-content';
import { processPhases } from '@/lib/process-data';
import { processPageFaqSchema } from '@/lib/faq-data';

const PROCESS_URL = 'https://zenaradesigns.com/process';

const processBreadcrumb = breadcrumbSchema('/process', [
  { name: 'Home', url: '/' },
  { name: 'Our Process', url: '/process' },
]);

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${PROCESS_URL}#howto`,
  name: 'How Zenara Designs Builds a Custom Website',
  description:
    'Our fixed-price, six-phase web design process — from discovery and prototyping through build, quality testing, launch, and ongoing support.',
  step: processPhases.map((phase, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: phase.phase,
    text: phase.tagline,
  })),
};

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
      <JsonLd schema={howToSchema} />
      <JsonLd schema={processPageFaqSchema} />
      <Process />
    </>
  );
}
