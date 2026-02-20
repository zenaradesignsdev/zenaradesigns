import { Rocket } from 'lucide-react';
import { useScrollToTop, useSEO } from '@/hooks';
import { memo } from 'react';
import StructuredData from '@/components/StructuredData';

const Projects = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Web Design Portfolio Toronto | Custom Websites & Projects | Zenara",
    description: "View our portfolio of custom web design projects in Toronto & GTA. See real examples of business websites, e-commerce solutions, and digital campaigns. Get inspired for your project!",
    canonical: "https://zenaradesigns.com/projects"
  });
  
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="projects-hero min-h-screen py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
          {/* Accent gradients with theme colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Background Stars */}
          <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
          <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
          <div className="bg-star" style={{ top: '15%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '9%', left: '58%' }}></div>
          <div className="bg-star" style={{ top: '18%', left: '68%' }}></div>
          <div className="bg-star" style={{ top: '7%', left: '78%' }}></div>
          <div className="bg-star" style={{ top: '14%', left: '88%' }}></div>
          <div className="bg-star" style={{ top: '11%', left: '95%' }}></div>
          <div className="bg-star" style={{ top: '25%', left: '5%' }}></div>
          <div className="bg-star" style={{ top: '28%', left: '15%' }}></div>
          <div className="bg-star" style={{ top: '32%', left: '28%' }}></div>
          <div className="bg-star" style={{ top: '26%', left: '42%' }}></div>
          <div className="bg-star" style={{ top: '35%', left: '55%' }}></div>
          <div className="bg-star" style={{ top: '29%', left: '68%' }}></div>
          <div className="bg-star" style={{ top: '38%', left: '82%' }}></div>
          <div className="bg-star" style={{ top: '27%', left: '92%' }}></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Title */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight mb-6 sm:mb-8 text-white leading-[0.95] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Web Design</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Portfolio Toronto</span>
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-light text-base sm:text-lg">
                  Something amazing is coming soon
                </span>
              </div>
            </div>

            {/* Coming Soon Card */}
            <div className="coming-soon-card bg-slate-900/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              
              <div className="relative z-10">
                {/* Rocket Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-full"></div>
                    <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />
                  </div>
                </div>
                
                {/* Coming Soon Text */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white mb-3 sm:mb-4 leading-[0.95] tracking-[-0.04em]">
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Coming Soon</span>
                </h2>
                <p className="text-lg sm:text-xl text-white/60 leading-[1.7] font-light tracking-[0.01em]">
                  Thanks for your patience!
                </p>
                <p className="text-sm text-white/40 mt-4 font-light">
                  Last updated: January 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Breadcrumb Schema */}
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Projects', url: '/projects' }
        ]} 
      />
    </div>
  );
};

export default memo(Projects);