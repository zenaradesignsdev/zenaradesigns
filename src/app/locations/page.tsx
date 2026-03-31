import type { Metadata } from 'next';
import Locations from '@/components/pages/Locations';

export const metadata: Metadata = {
  title: 'Web Design Near You — Serving 19 GTA Cities | Zenara',
  description:
    'Local web design for Toronto, Mississauga, Markham, Vaughan, Brampton, Richmond Hill, and 13 more GTA cities. See if we serve your area and book a free consultation today.',
  alternates: { canonical: 'https://zenaradesigns.com/locations' },
  openGraph: {
    title: 'Web Design Near You — Serving 19 GTA Cities | Zenara',
    description:
      'Local web design for Toronto, Mississauga, Markham, Vaughan, Brampton, Richmond Hill, and 13 more GTA cities. See if we serve your area and book a free consultation today.',
    url: 'https://zenaradesigns.com/locations',
  },
};

export default function LocationsPage() {
  return <Locations />;
}
