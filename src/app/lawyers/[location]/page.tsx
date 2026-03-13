import type { Metadata } from 'next';
import LawyerLocation from '@/components/pages/LawyerLocation';

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
    title: `Law Firm Web Design ${city} | Legal Websites That Convert | Zenara`,
    description: `Web design for ${city} law firms. Professional, trust-first websites that rank in local search and convert visitors into clients. Fast, mobile-ready. Free consultation.`,
    alternates: { canonical: `https://zenaradesigns.com/lawyers/${params.location}` },
    openGraph: {
      title: `Law Firm Web Design ${city} | Legal Websites That Convert | Zenara`,
      description: `Web design for ${city} law firms. Professional, trust-first websites that rank in local search and convert visitors into clients. Fast, mobile-ready. Free consultation.`,
      url: `https://zenaradesigns.com/lawyers/${params.location}`,
      images: [{ url: 'https://zenaradesigns.com/images/lawyer-professional-meeting.png' }],
    },
  };
}

export default function LawyerLocationPage() {
  return <LawyerLocation />;
}
