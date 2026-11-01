import HeroSection from '@/components/home/HeroSection';
import AgencyPartnersSection from '@/components/home/AgencyPartnersSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import ProcessSection from '@/components/home/ProcessSection';
import DifferentiatorsSection from '@/components/home/DifferentiatorsSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import CTABand from '@/components/home/CTABand';
import { ReviewsStrip } from '@/components/ReviewsStrip';

const Home = () => {
  return (
    <div className="m-0 p-0">
      <HeroSection />
      <AgencyPartnersSection />
      <PortfolioSection />
      <ProcessSection />
      <DifferentiatorsSection />
      <IndustriesSection />
      {/* Server-rendered so the review text is in the initial HTML. */}
      <ReviewsStrip headingId="home-reviews" className="py-16 sm:py-20 md:py-24 bg-black" />
      <CTABand />
    </div>
  );
};

export default Home;
