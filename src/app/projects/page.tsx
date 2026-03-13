import type { Metadata } from 'next';
import Projects from '@/components/pages/Projects';

export const metadata: Metadata = {
  title: 'Web Design Portfolio | Toronto & GTA Projects | Zenara',
  description:
    'Browse Zenara\'s portfolio of custom web design projects for Toronto & GTA businesses. Real websites, real results — law firms, accountants, clinics, and more.',
  alternates: { canonical: 'https://zenaradesigns.com/projects' },
  openGraph: {
    title: 'Web Design Portfolio | Toronto & GTA Projects | Zenara',
    description:
      'Browse Zenara\'s portfolio of custom web design projects for Toronto & GTA businesses. Real websites, real results — law firms, accountants, clinics, and more.',
    url: 'https://zenaradesigns.com/projects',
  },
};

export default function ProjectsPage() {
  return <Projects />;
}
