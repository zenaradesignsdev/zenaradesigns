import type { Metadata } from 'next';
import Process from '@/components/pages/Process';

export const metadata: Metadata = {
  title: 'Our Process | Web Design Toronto | Zenara Designs',
  description:
    'Discover our proven 6-step web design process in Toronto. From discovery to launch, we transform your ideas into high-performing digital solutions.',
  alternates: { canonical: 'https://zenaradesigns.com/process' },
  openGraph: {
    title: 'Our Process | Web Design Toronto | Zenara Designs',
    description:
      'Discover our proven 6-step web design process in Toronto. From discovery to launch, we transform your ideas into high-performing digital solutions.',
    url: 'https://zenaradesigns.com/process',
  },
};

export default function ProcessPage() {
  return <Process />;
}
