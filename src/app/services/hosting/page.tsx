import type { Metadata } from 'next';
import HostingService from '@/components/pages/services/HostingService';

export const metadata: Metadata = {
  title: 'Web Hosting & Maintenance Toronto | Managed Hosting | Zenara Designs',
  description: 'Managed web hosting and maintenance for Toronto businesses. 99.9% uptime SLA, SSL, global CDN, daily backups, and priority support. Plans from $45/month. Migration included.',
  keywords: ['web hosting Toronto', 'managed hosting GTA', 'website maintenance Toronto', 'Next.js hosting', 'managed website hosting Ontario', 'website support Toronto'],
  alternates: { canonical: 'https://zenaradesigns.com/services/hosting' },
  openGraph: {
    title: 'Web Hosting & Maintenance Toronto | Managed Hosting | Zenara Designs',
    description: 'Managed web hosting and maintenance for Toronto businesses. 99.9% uptime SLA, SSL, global CDN, daily backups, and priority support. Plans from $45/month. Migration included.',
    url: 'https://zenaradesigns.com/services/hosting',
  },
};

export default function HostingPage() {
  return <HostingService />;
}
