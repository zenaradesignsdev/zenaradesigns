import type { Metadata } from 'next';
import Projects from '@/components/pages/Projects';

export const metadata: Metadata = {
  title: 'Web Design Portfolio Toronto | Custom Websites & Projects | Zenara',
  description:
    'View our portfolio of custom web design projects in Toronto & GTA. See real examples of business websites, e-commerce solutions, and digital campaigns. Get inspired for your project!',
  alternates: { canonical: 'https://zenaradesigns.com/projects' },
  openGraph: {
    title: 'Web Design Portfolio Toronto | Custom Websites & Projects | Zenara',
    description:
      'View our portfolio of custom web design projects in Toronto & GTA. See real examples of business websites, e-commerce solutions, and digital campaigns. Get inspired for your project!',
    url: 'https://zenaradesigns.com/projects',
  },
};

export default function ProjectsPage() {
  return <Projects />;
}
