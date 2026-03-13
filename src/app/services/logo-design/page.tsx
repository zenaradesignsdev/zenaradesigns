import type { Metadata } from 'next';
import LogoDesignService from '@/components/pages/services/LogoDesignService';

export const metadata: Metadata = {
  title: 'Logo Design Toronto | Custom Brand Identity | Zenara Designs',
  description: 'Professional logo design for Toronto & GTA businesses. Custom brand identity, color palettes, and brand guidelines that make your business memorable. Free consultation.',
  alternates: { canonical: 'https://zenaradesigns.com/services/logo-design' },
  openGraph: {
    title: 'Logo Design Toronto | Custom Brand Identity | Zenara Designs',
    description: 'Professional logo design for Toronto & GTA businesses. Custom brand identity, color palettes, and brand guidelines that make your business memorable. Free consultation.',
    url: 'https://zenaradesigns.com/services/logo-design',
  },
};

export default function LogoDesignPage() {
  return <LogoDesignService />;
}
