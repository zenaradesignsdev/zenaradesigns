import type { Metadata } from 'next';
import About from '@/components/pages/About';

export const metadata: Metadata = {
  title: 'About Zenara Designs | Web Design Team Toronto | Zenara',
  description:
    "Meet Toronto's leading web design team at Zenara Designs. Learn about our expertise, process, and commitment to creating exceptional digital experiences for GTA businesses. Contact us today!",
  alternates: { canonical: 'https://zenaradesigns.com/about' },
  openGraph: {
    title: 'About Zenara Designs | Web Design Team Toronto | Zenara',
    description:
      "Meet Toronto's leading web design team at Zenara Designs. Learn about our expertise, process, and commitment to creating exceptional digital experiences for GTA businesses. Contact us today!",
    url: 'https://zenaradesigns.com/about',
  },
};

export default function AboutPage() {
  return <About />;
}
