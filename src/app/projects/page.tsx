import type { Metadata } from 'next';
import Projects from '@/components/pages/Projects';

export const metadata: Metadata = {
  title: 'Websites We Built for Toronto Law Firms, Clinics & More | Zenara',
  description:
    'Browse real web design projects for GTA businesses — law firms, accounting firms, clinics, and contractors. See the designs, the approach, and the results behind each build.',
  alternates: { canonical: 'https://zenaradesigns.com/projects' },
  openGraph: {
    title: 'Websites We Built for Toronto Law Firms, Clinics & More | Zenara',
    description:
      'Browse real web design projects for GTA businesses — law firms, accounting firms, clinics, and contractors. See the designs, the approach, and the results behind each build.',
    url: 'https://zenaradesigns.com/projects',
  },
};

export default function ProjectsPage() {
  return <Projects />;
}
