import type { Metadata } from 'next';
import Security from '@/components/pages/Security';

export const metadata: Metadata = {
  title: 'Website Security Best Practices | SSL, Uptime & Protection | Zenara',
  description:
    'Learn about essential website security measures including SSL certificates, uptime monitoring, anti-spam protection, and maintenance. Keep your Toronto business website secure.',
  alternates: { canonical: 'https://zenaradesigns.com/security' },
  openGraph: {
    title: 'Website Security Best Practices | SSL, Uptime & Protection | Zenara',
    description:
      'Learn about essential website security measures including SSL certificates, uptime monitoring, anti-spam protection, and maintenance. Keep your Toronto business website secure.',
    url: 'https://zenaradesigns.com/security',
  },
};

export default function SecurityPage() {
  return <Security />;
}
