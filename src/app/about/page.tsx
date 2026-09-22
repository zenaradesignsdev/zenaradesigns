import type { Metadata } from 'next';
import About from '@/components/pages/About';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/service-content';
import { team } from '@/lib/team';

const ABOUT_URL = 'https://zenaradesigns.com/about';
const ORG_ID = 'https://zenaradesigns.com/#organization';

const personId = (name: string) =>
  `${ABOUT_URL}#${name.toLowerCase().replace(/[^a-z]+/g, '-')}`;

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

// Organization with declared founders (Pratik & Kavin only).
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Zenara Designs',
  url: 'https://zenaradesigns.com',
  description: 'the GTA web design agency building fast, modern, conversion-focused websites for local service businesses.',
  foundingDate: '2024',
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
    'Zenara Designs is a Toronto web design agency built by engineers from Waterloo and Ottawa. We build fast, modern websites for law firms, clinics, and GTA businesses. See our team and process.',
  alternates: { canonical: 'https://zenaradesigns.com/about' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Meet the Team Behind Zenara — Markham Web Design | Zenara',
    description:
      'Zenara Designs is a Toronto web design agency built by engineers from Waterloo and Ottawa. We build fast, modern websites for law firms, clinics, and GTA businesses. See our team and process.',
    url: 'https://zenaradesigns.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet the Team Behind Zenara — Markham Web Design | Zenara',
    description:
      'Zenara Designs is a Toronto web design agency built by engineers from Waterloo and Ottawa. We build fast, modern websites for law firms, clinics, and GTA businesses. See our team and process.',
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
