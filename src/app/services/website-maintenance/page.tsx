import type { Metadata } from 'next';
import WebsiteMaintenanceService from '@/components/pages/services/WebsiteMaintenanceService';
import { JsonLd } from '@/components/JsonLd';
import { serviceContent, serviceSchema, faqPageSchema, serviceBreadcrumb } from '@/lib/service-content';

const entry = serviceContent['website-maintenance'];

export const metadata: Metadata = {
  title: 'Website Maintenance: Hosting & Analytics | Markham & GTA | Zenara',
  description: 'Managed hosting, uptime monitoring, and a plain-English monthly traffic report for GTA businesses. 99.9% uptime SLA, SSL, daily backups, GA4 setup. Plans from $45/month.',
  keywords: ['web hosting Toronto', 'managed hosting GTA', 'website maintenance Toronto', 'Next.js hosting', 'Google Analytics setup', 'monthly traffic report', 'website support Markham'],
  alternates: { canonical: 'https://zenaradesigns.com/services/website-maintenance' },
  openGraph: {
    images: ['/opengraph-image'],
    title: 'Website Maintenance: Hosting & Analytics | Markham & GTA | Zenara',
    description: 'Managed hosting, uptime monitoring, and a plain-English monthly traffic report for GTA businesses. 99.9% uptime SLA, SSL, daily backups, GA4 setup. Plans from $45/month.',
    url: 'https://zenaradesigns.com/services/website-maintenance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Maintenance: Hosting & Analytics | Markham & GTA | Zenara',
    description:
      'Managed hosting, uptime monitoring, and a plain-English monthly traffic report for GTA businesses. 99.9% uptime SLA, SSL, daily backups, GA4 setup. Plans from $45/month.',
  },
};

export default function WebsiteMaintenancePage() {
  return (
    <>
      <JsonLd schema={serviceBreadcrumb(entry)} />
      <JsonLd schema={serviceSchema(entry)} />
      <JsonLd schema={faqPageSchema(entry.path, entry.faqs)} />
      <WebsiteMaintenanceService />
    </>
  );
}
