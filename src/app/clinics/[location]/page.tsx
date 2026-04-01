import type { Metadata } from 'next';
import ClinicLocation from '@/components/pages/ClinicLocation';
import { clinicLocationContent } from '@/lib/location-content';

const locations = [
  { id: 'markham', city: 'Markham' },
  { id: 'vaughan', city: 'Vaughan' },
  { id: 'pickering', city: 'Pickering' },
  { id: 'ajax', city: 'Ajax' },
  { id: 'oshawa', city: 'Oshawa' },
  { id: 'whitby', city: 'Whitby' },
  { id: 'richmond-hill', city: 'Richmond Hill' },
  { id: 'newmarket', city: 'Newmarket' },
  { id: 'aurora', city: 'Aurora' },
  { id: 'stouffville', city: 'Stouffville' },
  { id: 'toronto', city: 'Toronto' },
  { id: 'mississauga', city: 'Mississauga' },
  { id: 'brampton', city: 'Brampton' },
  { id: 'oakville', city: 'Oakville' },
  { id: 'burlington', city: 'Burlington' },
  { id: 'hamilton', city: 'Hamilton' },
  { id: 'scarborough', city: 'Scarborough' },
  { id: 'north-york', city: 'North York' },
  { id: 'etobicoke', city: 'Etobicoke' },
];

interface Props {
  params: { location: string };
}

export function generateStaticParams() {
  return locations.map((loc) => ({ location: loc.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loc = locations.find((l) => l.id === params.location);
  const city = loc?.city ?? params.location;

  return {
    title: `Wellness Clinic Web Design ${city} | Professional Clinic Websites | Zenara`,
    description: `Professional web design for ${city} wellness clinics. Establish clinical authority, prioritize patient experience, and convert visitors. Free consultation.`,
    alternates: { canonical: `https://zenaradesigns.com/clinics/${params.location}` },
    openGraph: {
      images: [{ url: 'https://zenaradesigns.com/images/clinic-practitioner.png' }],
    },
  };
}

export default function ClinicLocationPage({ params }: Props) {
  const content = clinicLocationContent[params.location];
  const faqSchema =
    content?.faqs && content.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: content.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          data-ssr="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ClinicLocation />
    </>
  );
}
