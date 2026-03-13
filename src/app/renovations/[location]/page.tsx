import type { Metadata } from 'next';
import RenovationLocation from '@/components/pages/RenovationLocation';

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
    title: `Renovation Company Web Design ${city} | Professional Contractor Websites | Zenara`,
    description: `Professional web design for ${city} renovation companies. Showcase projects, capture leads, and grow your business. Free consultation.`,
    alternates: { canonical: `https://zenaradesigns.com/renovations/${params.location}` },
    openGraph: {
      images: [{ url: 'https://zenaradesigns.com/images/renovation-backyard.png' }],
    },
  };
}

export default function RenovationLocationPage() {
  return <RenovationLocation />;
}
