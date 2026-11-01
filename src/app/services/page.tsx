import type { Metadata } from 'next';
import Services from '@/components/pages/Services';
import { JsonLd } from '@/components/JsonLd';
import { ReviewsStrip } from '@/components/ReviewsStrip';
import { breadcrumbSchema } from '@/lib/service-content';

export const metadata: Metadata = {
  title: 'Web Design, SEO & Branding Services | Zenara Designs',
  description:
    'Everything your Markham or GTA business needs online: websites, e-commerce, branding, SEO, GEO, redesigns, and managed maintenance. All 7 services with pricing.',
  alternates: { canonical: 'https://zenaradesigns.com/services' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Web Design, SEO & Branding Services | Zenara Designs',
    description:
      'Everything your Markham or GTA business needs online: websites, e-commerce, branding, SEO, GEO, redesigns, and managed maintenance. All 7 services with pricing.',
    url: 'https://zenaradesigns.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design, SEO & Branding Services | Zenara Designs',
    description:
      'Everything your Markham or GTA business needs online: websites, e-commerce, branding, SEO, GEO, redesigns, and managed maintenance. All 7 services with pricing.',
  },
};

const servicesBreadcrumb = breadcrumbSchema('/services', [
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/services' },
]);

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={servicesBreadcrumb} />
      <Services
        reviews={
          <ReviewsStrip
            headingId="services-reviews"
            className="py-16 sm:py-20 md:py-24 bg-black"
            background={
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute -top-10 -left-10 w-[500px] h-[400px] bg-cyan-500/[0.09] rounded-full blur-[120px]" />
                <div className="absolute -bottom-10 -right-10 w-[500px] h-[400px] bg-purple-600/[0.10] rounded-full blur-[120px]" />
              </div>
            }
          />
        }
      />
    </>
  );
}
