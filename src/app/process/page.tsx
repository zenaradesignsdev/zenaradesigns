import type { Metadata } from 'next';
import Process from '@/components/pages/Process';

export const metadata: Metadata = {
  title: 'How We Build Your Website in 6 Steps — Discovery to Launch | Zenara',
  description:
    'From initial call to live website in weeks. See the exact 6-step process Toronto & GTA businesses go through with Zenara — with timelines and what to expect at each stage.',
  alternates: { canonical: 'https://zenaradesigns.com/process' },
  openGraph: {
    title: 'How We Build Your Website in 6 Steps — Discovery to Launch | Zenara',
    description:
      'From initial call to live website in weeks. See the exact 6-step process Toronto & GTA businesses go through with Zenara — with timelines and what to expect at each stage.',
    url: 'https://zenaradesigns.com/process',
  },
};

export default function ProcessPage() {
  return <Process />;
}
