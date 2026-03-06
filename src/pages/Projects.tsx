import { Rocket, ExternalLink, Scale } from 'lucide-react';
import { useScrollToTop, useSEO } from '@/hooks';
import { memo } from 'react';
import StructuredData from '@/components/StructuredData';
import renoProjectImage from '@/assets/reno-project.png';
import ashcamSiteImage from '@/assets/ashcam-site.png';
import jbloansImage from '@/assets/jbloans.png';
import pickeringLawImage from '@/assets/project2.png';
// Placeholder images - replace when actual images are available
import lawyerGavelOffice from '@/assets/lawyer-gavel-office.png';

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
      {/* Combined Hero & Projects Section */}
      <section className="min-h-screen pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-32 relative overflow-hidden bg-black">
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
          <div className="bg-star" style={{ top: '45%', left: '8%' }}></div>
          <div className="bg-star" style={{ top: '48%', left: '22%' }}></div>
          <div className="bg-star" style={{ top: '52%', left: '35%' }}></div>
          <div className="bg-star" style={{ top: '55%', left: '48%' }}></div>
          <div className="bg-star" style={{ top: '58%', left: '62%' }}></div>
          <div className="bg-star" style={{ top: '62%', left: '75%' }}></div>
          <div className="bg-star" style={{ top: '65%', left: '88%' }}></div>
          <div className="bg-star" style={{ top: '75%', left: '12%' }}></div>
          <div className="bg-star" style={{ top: '78%', left: '28%' }}></div>
          <div className="bg-star" style={{ top: '82%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '85%', left: '62%' }}></div>
          <div className="bg-star" style={{ top: '88%', left: '78%' }}></div>
          <div className="bg-star" style={{ top: '92%', left: '92%' }}></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/8 via-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight mb-4 sm:mb-6 text-white leading-[0.95] tracking-[-0.04em]">
              <span className="font-light opacity-90">Web Design </span>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Portfolio</span>
              </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 leading-[1.7] max-w-2xl mx-auto font-light tracking-[0.01em] mt-6">
              Explore our portfolio of custom web design projects for businesses across Toronto and the GTA.
            </p>
          </div>

          <h2 className="sr-only">Featured Projects</h2>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
            {/* Renovation Company Project */}
            <a
              href="https://projectone.zenaradesigns.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/50 hover:border-cyan-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden relative hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/30 group-hover:via-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-500 blur-xl"></div>
              
              {/* Box glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              <div className="relative z-10">
                {/* Project Preview */}
                <div className="aspect-video relative overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
                  
                  {/* Project Image */}
                  <img 
                    src={renoProjectImage} 
                    alt="Luxury Renovation Website - Professional luxury renovation and construction services" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 project-image"
                    style={{
                      willChange: 'transform'
                    }}
                    width="800"
                    height="450"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Project Info */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-xl sm:text-2xl mb-1 group-hover:text-cyan-300 transition-colors">
                        Luxury Renovation
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/30">
                          Web Design
                        </span>
                        <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                          Toronto
                </span>
              </div>
            </div>
                    <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 flex-shrink-0 ml-3 group-hover:scale-110" />
                  </div>
                  
                  <p className="text-slate-300 text-sm sm:text-base mb-6 font-light leading-relaxed flex-1">
                    Luxury renovation and construction services website designed for Toronto businesses. Modern, responsive design with seamless user experience. Showcasing premium craftsmanship and attention to detail.
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/50 group-hover:border-cyan-500/30 transition-colors mt-auto">
                    <span className="text-cyan-400 text-sm font-medium group-hover:text-purple-400 transition-colors">
                      View Live Site
                    </span>
                    <div className="flex items-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Pickering Law Firm Project */}
            <a
              href="https://projecttwo.zenaradesigns.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/50 hover:border-cyan-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden relative hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/30 group-hover:via-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-500 blur-xl"></div>
              
              {/* Box glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="relative z-10">
                {/* Project Preview */}
                <div className="aspect-video relative overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
                  
                  {/* Project Image */}
                  <img 
                    src={pickeringLawImage} 
                    alt="Pickering Law Firm Website - Professional legal services website design" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 project-image"
                    style={{
                      willChange: 'transform'
                    }}
                    width="800"
                    height="450"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Project Info */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-xl sm:text-2xl mb-1 group-hover:text-cyan-300 transition-colors">
                        Pickering Law Firm
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/30">
                          Web Design
                        </span>
                        <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                          Legal
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 flex-shrink-0 ml-3 group-hover:scale-110" />
                  </div>
                  
                  <p className="text-slate-300 text-sm sm:text-base mb-6 font-light leading-relaxed flex-1">
                    Professional law firm website designed to showcase legal expertise and build client trust. Modern, authoritative design with clear navigation and comprehensive service information.
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/50 group-hover:border-cyan-500/30 transition-colors mt-auto">
                    <span className="text-cyan-400 text-sm font-medium group-hover:text-purple-400 transition-colors">
                      View Live Site
                    </span>
                    <div className="flex items-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* AshCam Cutting Solutions Project */}
            <a
              href="https://ashcamcuttingsolution.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/50 hover:border-cyan-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden relative hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/30 group-hover:via-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-500 blur-xl"></div>
              
              {/* Box glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              <div className="relative z-10">
                {/* Project Preview */}
                <div className="aspect-video relative overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
                  
                  {/* Project Image */}
                  <img 
                    src={ashcamSiteImage} 
                    alt="AshCam Cutting Solutions Website - Construction blades and equipment e-commerce platform" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 project-image"
                    style={{
                      willChange: 'transform'
                    }}
                    width="800"
                    height="450"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Project Info */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-xl sm:text-2xl mb-1 group-hover:text-cyan-300 transition-colors">
                        AshCam Cutting Solutions
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/30">
                          E-commerce
                        </span>
                        <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                          Construction
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 flex-shrink-0 ml-3 group-hover:scale-110" />
                  </div>
                  
                  <p className="text-slate-300 text-sm sm:text-base mb-6 font-light leading-relaxed flex-1">
                    Construction company specializing in cutting blades and equipment. Modern e-commerce platform designed for industrial customers with seamless product browsing and ordering.
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/50 group-hover:border-cyan-500/30 transition-colors mt-auto">
                    <span className="text-cyan-400 text-sm font-medium group-hover:text-purple-400 transition-colors">
                      View Live Site
                    </span>
                    <div className="flex items-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* JB Loans Mortgage Broker Project */}
            <a
              href="https://jbloans.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/50 hover:border-cyan-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden relative hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/30 group-hover:via-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-500 blur-xl"></div>
              
              {/* Box glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              <div className="relative z-10">
                {/* Project Preview */}
                <div className="aspect-video relative overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
                  
                  {/* Project Image */}
                  <img 
                    src={jbloansImage} 
                    alt="JB Loans Mortgage Broker Website - Professional mortgage services platform" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 project-image"
                    style={{
                      willChange: 'transform'
                    }}
                    width="800"
                    height="450"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Project Info */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-xl sm:text-2xl mb-1 group-hover:text-cyan-300 transition-colors">
                        JB Loans
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/30">
                          Web Design
                        </span>
                        <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                          Mortgage Broker
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 flex-shrink-0 ml-3 group-hover:scale-110" />
                  </div>
                  
                  <p className="text-slate-300 text-sm sm:text-base mb-6 font-light leading-relaxed flex-1">
                    Professional mortgage broker website designed to help clients find the best loan solutions. Modern, user-friendly platform with seamless application process and expert guidance.
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/50 group-hover:border-cyan-500/30 transition-colors mt-auto">
                    <span className="text-cyan-400 text-sm font-medium group-hover:text-purple-400 transition-colors">
                      View Live Site
                    </span>
                    <div className="flex items-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
              </div>
            </div>
            </a>

            {/* Nova Motion Physio Project */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/50 hover:border-cyan-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden relative hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/30 group-hover:via-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-500 blur-xl"></div>
              
              {/* Box glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              <div className="relative z-10">
                {/* Project Preview */}
                <div className="aspect-video relative overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
                  
                  {/* Project Image */}
                  <img 
                    src={lawyerGavelOffice} 
                    alt="Nova Motion Physio Website - Professional physiotherapy and wellness clinic platform" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 project-image"
                    style={{
                      willChange: 'transform'
                    }}
                    width="800"
                    height="450"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Project Info */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-xl sm:text-2xl mb-1 group-hover:text-cyan-300 transition-colors">
                        Nova Motion Physio
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/30">
                          Web Design
                        </span>
                        <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                          Wellness
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 flex-shrink-0 ml-3 group-hover:scale-110" />
                  </div>
                  
                  <p className="text-slate-300 text-sm sm:text-base mb-6 font-light leading-relaxed flex-1">
                    Professional physiotherapy and wellness clinic website designed to showcase services and enable online appointment booking. Modern, clean design that builds trust and converts visitors into clients.
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/50 group-hover:border-cyan-500/30 transition-colors mt-auto">
                    <span className="text-cyan-400 text-sm font-medium group-hover:text-purple-400 transition-colors">
                      View Live Site
                    </span>
                    <div className="flex items-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Accounting Firm Project */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/50 hover:border-cyan-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden relative hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-cyan-500/30 group-hover:via-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-500 blur-xl"></div>
              
              {/* Box glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              <div className="relative z-10">
                {/* Project Preview */}
                <div className="aspect-video relative overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>
                  
                  {/* Project Image */}
                  <img 
                    src={lawyerGavelOffice} 
                    alt="Accounting Firm Website - Professional accounting and tax services platform" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 project-image"
                    style={{
                      willChange: 'transform'
                    }}
                    width="800"
                    height="450"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                {/* Project Info */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-xl sm:text-2xl mb-1 group-hover:text-cyan-300 transition-colors">
                        Accounting Firm
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full border border-cyan-500/30">
                          Web Design
                        </span>
                        <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                          Accounting
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 flex-shrink-0 ml-3 group-hover:scale-110" />
                  </div>
                  
                  <p className="text-slate-300 text-sm sm:text-base mb-6 font-light leading-relaxed flex-1">
                    Professional accounting firm website designed to showcase tax preparation, bookkeeping, and advisory services. Secure platform with client portal integration and modern design that builds credibility.
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/50 group-hover:border-cyan-500/30 transition-colors mt-auto">
                    <span className="text-cyan-400 text-sm font-medium group-hover:text-purple-400 transition-colors">
                      View Live Site
                    </span>
                    <div className="flex items-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </a>

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