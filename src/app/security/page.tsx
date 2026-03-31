import type { Metadata } from 'next';
import Security from '@/components/pages/Security';

export const metadata: Metadata = {
  title: 'How We Keep Your Website Secure — SSL, Backups & Monitoring | Zenara',
  description:
    'Every Zenara website ships with SSL, daily backups, uptime monitoring, and anti-spam protection. See the full security stack that protects your Toronto business site 24/7.',
  alternates: { canonical: 'https://zenaradesigns.com/security' },
  openGraph: {
    title: 'How We Keep Your Website Secure — SSL, Backups & Monitoring | Zenara',
    description:
      'Every Zenara website ships with SSL, daily backups, uptime monitoring, and anti-spam protection. See the full security stack that protects your Toronto business site 24/7.',
    url: 'https://zenaradesigns.com/security',
  },
};

export default function SecurityPage() {
  return <Security />;
}
