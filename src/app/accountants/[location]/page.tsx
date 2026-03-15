import type { Metadata } from 'next';
import AccountantLocation from '@/components/pages/AccountantLocation';

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
    title: `Accounting Firm Web Design ${city} | CPA Websites That Convert | Zenara`,
    description: `Web design for ${city} accounting firms. Professional CPA websites that build trust, attract clients, and rank in local search. Fully managed. Free consultation.`,
    alternates: { canonical: `https://zenaradesigns.com/accountants/${params.location}` },
    openGraph: {
      title: `Accounting Firm Web Design ${city} | CPA Websites That Convert | Zenara`,
      description: `Web design for ${city} accounting firms. Professional CPA websites that build trust, attract clients, and rank in local search. Fully managed. Free consultation.`,
      url: `https://zenaradesigns.com/accountants/${params.location}`,
      images: [{ url: 'https://zenaradesigns.com/images/accountant-computer-office.png' }],
    },
  };
}

export default function AccountantLocationPage() {
  return <AccountantLocation />;
}
