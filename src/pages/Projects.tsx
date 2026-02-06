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
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-purple-900">
      {/* Hero Section */}
      <section className="projects-hero min-h-screen py-16 sm:py-20 md:py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Background Stars */}
          <div className="bg-star" style={{ top: '5%', left: '5%' }}></div>
          <div className="bg-star" style={{ top: '10%', left: '15%' }}></div>
          <div className="bg-star" style={{ top: '15%', left: '25%' }}></div>
          <div className="bg-star" style={{ top: '8%', left: '35%' }}></div>
          <div className="bg-star" style={{ top: '12%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '18%', left: '55%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '65%' }}></div>
          <div className="bg-star" style={{ top: '14%', left: '75%' }}></div>
          <div className="bg-star" style={{ top: '20%', left: '85%' }}></div>
          <div className="bg-star" style={{ top: '9%', left: '95%' }}></div>
          
          <div className="bg-star" style={{ top: '25%', left: '8%' }}></div>
          <div className="bg-star" style={{ top: '30%', left: '18%' }}></div>
          <div className="bg-star" style={{ top: '35%', left: '28%' }}></div>
          <div className="bg-star" style={{ top: '28%', left: '38%' }}></div>
          <div className="bg-star" style={{ top: '32%', left: '48%' }}></div>
          <div className="bg-star" style={{ top: '38%', left: '58%' }}></div>
          <div className="bg-star" style={{ top: '26%', left: '68%' }}></div>
          <div className="bg-star" style={{ top: '34%', left: '78%' }}></div>
          <div className="bg-star" style={{ top: '40%', left: '88%' }}></div>
          <div className="bg-star" style={{ top: '29%', left: '98%' }}></div>
          
          <div className="bg-star" style={{ top: '45%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '50%', left: '13%' }}></div>
          <div className="bg-star" style={{ top: '55%', left: '23%' }}></div>
          <div className="bg-star" style={{ top: '48%', left: '33%' }}></div>
          <div className="bg-star" style={{ top: '52%', left: '43%' }}></div>
          <div className="bg-star" style={{ top: '58%', left: '53%' }}></div>
          <div className="bg-star" style={{ top: '46%', left: '63%' }}></div>
          <div className="bg-star" style={{ top: '54%', left: '73%' }}></div>
          <div className="bg-star" style={{ top: '60%', left: '83%' }}></div>
          <div className="bg-star" style={{ top: '49%', left: '93%' }}></div>
          
          <div className="bg-star" style={{ top: '65%', left: '6%' }}></div>
          <div className="bg-star" style={{ top: '70%', left: '16%' }}></div>
          <div className="bg-star" style={{ top: '75%', left: '26%' }}></div>
          <div className="bg-star" style={{ top: '68%', left: '36%' }}></div>
          <div className="bg-star" style={{ top: '72%', left: '46%' }}></div>
          <div className="bg-star" style={{ top: '78%', left: '56%' }}></div>
          <div className="bg-star" style={{ top: '66%', left: '66%' }}></div>
          <div className="bg-star" style={{ top: '74%', left: '76%' }}></div>
          <div className="bg-star" style={{ top: '80%', left: '86%' }}></div>
          <div className="bg-star" style={{ top: '69%', left: '96%' }}></div>
          
          <div className="bg-star" style={{ top: '85%', left: '4%' }}></div>
          <div className="bg-star" style={{ top: '90%', left: '14%' }}></div>
          <div className="bg-star" style={{ top: '95%', left: '24%' }}></div>
          <div className="bg-star" style={{ top: '88%', left: '34%' }}></div>
          <div className="bg-star" style={{ top: '92%', left: '44%' }}></div>
          <div className="bg-star" style={{ top: '98%', left: '54%' }}></div>
          <div className="bg-star" style={{ top: '86%', left: '64%' }}></div>
          <div className="bg-star" style={{ top: '94%', left: '74%' }}></div>
          <div className="bg-star" style={{ top: '100%', left: '84%' }}></div>
          <div className="bg-star" style={{ top: '89%', left: '94%' }}></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Title */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-8 text-white leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Web Design Portfolio Toronto
                </span>
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-medium text-base sm:text-lg">
                  Something amazing is coming soon
                </span>
              </div>
            </div>

            {/* Coming Soon Card */}
            <div className="coming-soon-card bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
              {/* Glassmorphism Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
              
              <div className="relative z-10">
                {/* Rocket Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
                
                {/* Coming Soon Text */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                  Coming Soon
                </h2>
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
                  Thanks for your patience!
                </p>
                <p className="text-sm text-transparent mt-4">
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