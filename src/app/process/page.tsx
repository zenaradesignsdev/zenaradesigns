import type { Metadata } from 'next';
import Process from '@/components/pages/Process';

export const metadata: Metadata = {
  title: 'Our 6-Step Web Design Process | Toronto Agency | Zenara',
  description:
    'See exactly how Zenara builds websites — from discovery and design to launch and ongoing support. A transparent, 6-step process built for Toronto & GTA businesses.',
  alternates: { canonical: 'https://zenaradesigns.com/process' },
  openGraph: {
    title: 'Our 6-Step Web Design Process | Toronto Agency | Zenara',
    description:
      'See exactly how Zenara builds websites — from discovery and design to launch and ongoing support. A transparent, 6-step process built for Toronto & GTA businesses.',
    url: 'https://zenaradesigns.com/process',
  },
};

export default function ProcessPage() {
  return <Process />;
}
