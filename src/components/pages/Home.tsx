import dynamic from 'next/dynamic';
import StructuredData from '@/components/StructuredData';
import HeroSection from '@/components/home/HeroSection';
import AgencyPartnersSection from '@/components/home/AgencyPartnersSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import ProcessSection from '@/components/home/ProcessSection';
import DifferentiatorsSection from '@/components/home/DifferentiatorsSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import CTABand from '@/components/home/CTABand';

const GoogleReviews = dynamic(() => import('@/components/GoogleReviews'), {
  ssr: false,
  loading: () => <div className="py-16 sm:py-20 md:py-24" style={{ backgroundColor: '#e5e7eb' }} />,
});

const Home = () => {
  return (
    <div className="m-0 p-0" role="main" aria-label="Home page">
      <HeroSection />
      <AgencyPartnersSection />
      <PortfolioSection />
      <ProcessSection />
      <DifferentiatorsSection />
      <IndustriesSection />
      <GoogleReviews />
      <CTABand />

      {/* Structured Data for SEO Sitelinks */}
      <StructuredData type="siteNavigation" />

      {/* Breadcrumb Schema */}
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[{ name: 'Home', url: '/' }]}
      />
    </div>
  );
};

export default Home;
