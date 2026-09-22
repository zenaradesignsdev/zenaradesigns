import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/structured-data';
import Projects from '@/components/pages/Projects';

export const metadata: Metadata = {
  title: 'Websites We Built for Clinics, Contractors & More | Zenara',
  description:
    "Real websites we've built for GTA businesses — e-commerce, mortgage, events and catering — plus concept builds for law firms, accountants and clinics.",
  alternates: { canonical: 'https://zenaradesigns.com/projects' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Websites We Built for Clinics, Contractors & More | Zenara',
    description:
      "Real websites we've built for GTA businesses — e-commerce, mortgage, events and catering — plus concept builds for law firms, accountants and clinics.",
    url: 'https://zenaradesigns.com/projects',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Websites We Built for Clinics, Contractors & More | Zenara',
    description:
      "Real websites we've built for GTA businesses — e-commerce, mortgage, events and catering — plus concept builds for law firms, accountants and clinics.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd schema={generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Projects', url: '/projects' }])} />
      <Projects />
    </>
  );
}
