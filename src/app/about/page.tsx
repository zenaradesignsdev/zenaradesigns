import type { Metadata } from 'next';
import About from '@/components/pages/About';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/service-content';
import { ABOUT_URL, team, teamPersonId as personId } from '@/lib/team';
import { ORGANIZATION_ID } from '@/lib/constants';

const ORG_ID = ORGANIZATION_ID;

// Person schema per team member — named people with roles, credentials, and
// alumniOf are a core E-E-A-T signal. worksFor is asserted only for founders;
// contract collaborators get their role and credentials without an employment claim.
const personSchemas = team.map((member) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId(member.name),
  name: member.name,
  jobTitle: member.role,
  description: member.bio,
  knowsAbout: member.knowsAbout,
  alumniOf: { '@type': 'CollegeOrUniversity', name: member.school },
  ...(member.founder ? { worksFor: { '@id': ORG_ID } } : {}),
}));

// Adds the founders (Pratik & Kavin only) to the business node the root
// layout already describes. Same @id and type, so parsers merge the two
// instead of seeing a second, differently-worded organization.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Zenara Designs',
  founder: team
    .filter((m) => m.founder)
    .map((m) => ({ '@type': 'Person', '@id': personId(m.name), name: m.name })),
};

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${ABOUT_URL}#aboutpage`,
  url: ABOUT_URL,
  name: 'About Zenara Designs',
  mainEntity: { '@id': ORG_ID },
};

const aboutBreadcrumb = breadcrumbSchema('/about', [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
]);

export const metadata: Metadata = {
  title: 'Meet the Team Behind Zenara — Markham Web Design | Zenara',
  description:
    'Zenara Designs is a Markham web design studio founded by engineers from Waterloo and Ottawa, building fast websites for law firms, clinics and GTA businesses.',
  alternates: { canonical: 'https://zenaradesigns.com/about' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Meet the Team Behind Zenara — Markham Web Design | Zenara',
    description:
      'Zenara Designs is a Markham web design studio founded by engineers from Waterloo and Ottawa, building fast websites for law firms, clinics and GTA businesses.',
    url: 'https://zenaradesigns.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet the Team Behind Zenara — Markham Web Design | Zenara',
    description:
      'Zenara Designs is a Markham web design studio founded by engineers from Waterloo and Ottawa, building fast websites for law firms, clinics and GTA businesses.',
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={aboutBreadcrumb} />
      <JsonLd schema={aboutPageSchema} />
      <JsonLd schema={organizationSchema} />
      {personSchemas.map((schema) => (
        <JsonLd key={schema['@id'] as string} schema={schema} />
      ))}
      <About />
    </>
  );
}
