import type { Metadata } from 'next';
import About from '@/components/pages/About';

export const metadata: Metadata = {
  title: 'Meet the Team Behind Zenara — Toronto Web Design Agency | Zenara',
  description:
    'Zenara Designs is a Toronto web design agency built by engineers from Waterloo and Ottawa. We build fast, modern websites for law firms, clinics, and GTA businesses. See our team and process.',
  alternates: { canonical: 'https://zenaradesigns.com/about' },
  openGraph: {
    title: 'Meet the Team Behind Zenara — Toronto Web Design Agency | Zenara',
    description:
      'Zenara Designs is a Toronto web design agency built by engineers from Waterloo and Ottawa. We build fast, modern websites for law firms, clinics, and GTA businesses. See our team and process.',
    url: 'https://zenaradesigns.com/about',
  },
};

export default function AboutPage() {
  return <About />;
}
