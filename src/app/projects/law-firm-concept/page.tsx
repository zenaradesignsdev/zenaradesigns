import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import LawFirmConcept from '@/components/pages/LawFirmConcept';
import { ORGANIZATION_ID, SITE_URL } from '@/lib/constants';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

// A static segment, so it takes precedence over /projects/[slug] (whose
// dynamicParams = false would otherwise 404 it). Not in case-studies.ts on
// purpose: that list is real client work only.
const PATH = '/projects/law-firm-concept';
const URL = `${SITE_URL}${PATH}`;
const TITLE = 'Law Firm Website Concept: Design Case Study | Zenara';
const DESCRIPTION =
  'A concept site for a fictional Ontario law firm: how we structure practice areas, fees and intake, and what we would change under the Law Society rules.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'article',
    images: [{ url: '/images/project2.png', alt: 'The Pickering Law Firm concept website homepage' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/images/project2.png'] },
};

export default function LawFirmConceptPage() {
  return (
    <>
      <JsonLd
        schema={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Projects', url: '/projects' },
          { name: 'Law firm concept', url: PATH },
        ])}
      />
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          '@id': `${URL}#concept`,
          name: 'Law firm website concept',
          headline: TITLE,
          description: DESCRIPTION,
          url: URL,
          image: `${SITE_URL}/images/project2.png`,
          creator: { '@id': ORGANIZATION_ID },
          genre: 'Concept design',
          keywords: 'law firm website design, Ontario, concept',
        }}
      />
      <LawFirmConcept />
    </>
  );
}
