import type { Metadata } from 'next';
import Locations from '@/components/pages/Locations';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/service-content';
import { citySlugs, cityContent } from '@/lib/city-content';

const LOCATIONS_URL = 'https://zenaradesigns.com/locations';

const locationsBreadcrumb = breadcrumbSchema('/locations', [
  { name: 'Home', url: '/' },
  { name: 'Locations', url: '/locations' },
]);

const areasServedSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${LOCATIONS_URL}#areas-served`,
  name: 'Areas Served by Zenara Designs',
  itemListElement: citySlugs.map((slug, index) => {
    const content = cityContent[slug];
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: `Web Design ${content.city}`,
      url: `https://zenaradesigns.com/web-design/${content.slug}`,
    };
  }),
};

export const metadata: Metadata = {
  title: 'Web Design Near You | Markham & the GTA | Zenara',
  description:
    'Web design for businesses in Markham, Stouffville, Scarborough, Toronto, Richmond Hill and across the GTA. Check your area and book a free consultation.',
  alternates: { canonical: 'https://zenaradesigns.com/locations' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Web Design Near You | Markham & the GTA | Zenara',
    description:
      'Web design for businesses in Markham, Stouffville, Scarborough, Toronto, Richmond Hill and across the GTA. Check your area and book a free consultation.',
    url: 'https://zenaradesigns.com/locations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design Near You | Markham & the GTA | Zenara',
    description:
      'Web design for businesses in Markham, Stouffville, Scarborough, Toronto, Richmond Hill and across the GTA. Check your area and book a free consultation.',
  },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd schema={locationsBreadcrumb} />
      <JsonLd schema={areasServedSchema} />
      <Locations />
    </>
  );
}
