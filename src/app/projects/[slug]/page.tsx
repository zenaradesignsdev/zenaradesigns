import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/structured-data';
import { caseStudySlugs, getCaseStudy } from '@/lib/case-studies';
import CaseStudy from '@/components/pages/case-studies/CaseStudy';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  const url = `https://zenaradesigns.com/projects/${cs.slug}`;
  const image = { url: cs.screens.hero.src, width: cs.screens.hero.width, height: cs.screens.hero.height, alt: `${cs.name} website homepage` };

  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: cs.metaTitle, description: cs.metaDescription, url, type: 'article', images: [image] },
    twitter: { card: 'summary_large_image', title: cs.metaTitle, description: cs.metaDescription, images: [image.url] },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  return (
    <>
      <JsonLd
        schema={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Projects', url: '/projects' },
          { name: cs.name, url: `/projects/${cs.slug}` },
        ])}
      />
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          '@id': `https://zenaradesigns.com/projects/${cs.slug}#case-study`,
          name: `${cs.name} case study`,
          headline: cs.metaTitle,
          description: cs.metaDescription,
          url: `https://zenaradesigns.com/projects/${cs.slug}`,
          image: `https://zenaradesigns.com${cs.screens.hero.src}`,
          creator: { '@id': 'https://zenaradesigns.com/#organization' },
          about: { '@type': 'Organization', name: cs.facts[0].value, url: cs.liveUrl },
          keywords: cs.deliverables.join(', '),
        }}
      />
      <CaseStudy slug={cs.slug} />
    </>
  );
}
