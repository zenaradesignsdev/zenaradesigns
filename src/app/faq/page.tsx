import type { Metadata } from 'next';
import FAQ from '@/components/pages/FAQ';

export const metadata: Metadata = {
  title: 'FAQ | Web Design Toronto | Pricing & Process | Zenara',
  description:
    'Get answers to web design questions in Toronto & GTA. Learn about pricing, timelines, and our proven process. Find solutions to your website needs today!',
  alternates: { canonical: 'https://zenaradesigns.com/faq' },
  openGraph: {
    title: 'FAQ | Web Design Toronto | Pricing & Process | Zenara',
    description:
      'Get answers to web design questions in Toronto & GTA. Learn about pricing, timelines, and our proven process. Find solutions to your website needs today!',
    url: 'https://zenaradesigns.com/faq',
  },
};

export default function FAQPage() {
  return <FAQ />;
}
