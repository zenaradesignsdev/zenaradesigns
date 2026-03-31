import type { Metadata } from 'next';
import Home from '@/components/pages/Home';

export const metadata: Metadata = {
  title: 'Web Design Toronto | Business Cards & Logo Design | Zenara',
  description:
    "Toronto's leading web design agency. Professional websites, business cards & logo design for GTA businesses. Modern, fast, secure solutions.",
  alternates: { canonical: 'https://zenaradesigns.com' },
  openGraph: {
    title: 'Web Design Toronto | Business Cards & Logo Design | Zenara',
    description:
      "Toronto's leading web design agency. Professional websites, business cards & logo design for GTA businesses. Modern, fast, secure solutions.",
    url: 'https://zenaradesigns.com',
  },
};

export default function HomePage() {
  return <Home />;
}
