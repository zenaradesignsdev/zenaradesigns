import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import LawFirmChecklist, { CHECKLIST_REVIEWED } from '@/components/pages/LawFirmChecklist';
import { ORGANIZATION_ID, SITE_URL } from '@/lib/constants';
import { generateBreadcrumbSchema } from '@/lib/structured-data';
import { ABOUT_URL, findTeamMember, teamPersonId } from '@/lib/team';

const PATH = '/resources/ontario-law-firm-website-checklist';
const URL = `${SITE_URL}${PATH}`;
const TITLE = 'Ontario Law Firm Website Checklist: LSO, AODA, PIPEDA | Zenara';
const DESCRIPTION =
  'A pre-launch checklist for Ontario law firm websites: Law Society marketing rules, confidentiality, PIPEDA privacy, AODA accessibility, content and local search.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'article',
    images: ['/opengraph-image'],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const author = findTeamMember('Kavin Mural');

export default function OntarioLawFirmChecklistPage() {
  return (
    <>
      <JsonLd
        schema={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Law firm web design', url: '/lawyers' },
          { name: 'Ontario law firm website checklist', url: PATH },
        ])}
      />
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `${URL}#article`,
          headline: 'Ontario Law Firm Website Checklist',
          description: DESCRIPTION,
          url: URL,
          mainEntityOfPage: { '@type': 'WebPage', '@id': URL },
          datePublished: CHECKLIST_REVIEWED,
          dateModified: CHECKLIST_REVIEWED,
          author: author
            ? { '@type': 'Person', '@id': teamPersonId(author.name), name: author.name, url: ABOUT_URL }
            : { '@id': ORGANIZATION_ID },
          publisher: { '@id': ORGANIZATION_ID },
          about: ['Law Society of Ontario marketing rules', 'AODA website accessibility', 'PIPEDA', 'Law firm websites'],
        }}
      />
      <LawFirmChecklist />
    </>
  );
}
