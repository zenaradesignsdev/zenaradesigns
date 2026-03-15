import type { Metadata } from 'next';
import Security from '@/components/pages/Security';

export const metadata: Metadata = {
  title: 'Website Security | SSL, Uptime & Spam Protection | Zenara',
  description:
    'Protect your Toronto business website with SSL certificates, uptime monitoring, and anti-spam tools. See the security practices Zenara builds into every site we deliver.',
  alternates: { canonical: 'https://zenaradesigns.com/security' },
  openGraph: {
    title: 'Website Security | SSL, Uptime & Spam Protection | Zenara',
    description:
      'Protect your Toronto business website with SSL certificates, uptime monitoring, and anti-spam tools. See the security practices Zenara builds into every site we deliver.',
    url: 'https://zenaradesigns.com/security',
  },
};

export default function SecurityPage() {
  return <Security />;
}
