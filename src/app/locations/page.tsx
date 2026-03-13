import type { Metadata } from 'next';
import Locations from '@/components/pages/Locations';

export const metadata: Metadata = {
  title: 'Web Design Services GTA | Toronto, Mississauga | Zenara',
  description:
    'Web design services across the GTA. Serving Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington. Contact us for local service!',
  alternates: { canonical: 'https://zenaradesigns.com/locations' },
  openGraph: {
    title: 'Web Design Services GTA | Toronto, Mississauga | Zenara',
    description:
      'Web design services across the GTA. Serving Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington. Contact us for local service!',
    url: 'https://zenaradesigns.com/locations',
  },
};

export default function LocationsPage() {
  return <Locations />;
}
