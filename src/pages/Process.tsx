import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Code2, Search, Palette, Wrench, Rocket, Headphones, Clock, Users, Target, Zap, Shield, Globe, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollToTop, useSEO } from '@/hooks';
import { useState, useEffect, useRef, memo, useMemo } from 'react';
import { PERFORMANCE_THRESHOLDS } from '@/lib/constants';

interface ProcessStep {
  phase: string;
  details: string[];
  icon: React.ComponentType<any>;
  duration: string;
  deliverables: string[];
  tools: string[];
}

const Process = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Our Process | Web Design Toronto | Zenara Designs",
    description: "Discover our proven 6-step web design process in Toronto. From discovery to launch, we transform your ideas into high-performing digital solutions.",
    canonical: "https://zenaradesigns.com/process"
  });

  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<number[]>([]);

  // Process steps matching About page structure
  const process = useMemo((): ProcessStep[] => [
    {
      phase: "Discovery",
      details: [
        "Business goals analysis and strategy alignment",
        "Target audience research and behavior patterns", 
        "Competitive landscape review and market positioning",
        "Technical requirements gathering and infrastructure planning"
      ],
      icon: Search,
      duration: "1-2 weeks",
      deliverables: ["Project brief", "User personas", "Competitive analysis", "Technical specifications"],
      tools: ["Figma", "Google Analytics", "SEMrush", "User interviews"]
    },
    {
      phase: "Prototyping", 
      details: [
        "Mock-up designs and visual concepts",
        "Button/links design flow and user journey mapping",
        "Image/video placement design and content strategy",
        "Systems design and software architecture planning"
      ],
      icon: Palette,
      duration: "2-3 weeks",
      deliverables: ["Wireframes", "Design mockups", "Interactive prototypes", "Style guide"],
      tools: ["Figma", "Adobe Creative Suite", "Principle", "InVision"]
    },
    {
      phase: "Build",
      details: [
        "Modern development practices with React/Next.js",
        "Component-based architecture for scalability",
        "Performance optimization and Core Web Vitals",
        "Cross-browser testing and compatibility"
      ],
      icon: Code2,
      duration: "3-4 weeks",
      deliverables: ["Fully functional website", "Admin dashboard", "API documentation", "Performance report"],
      tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "Git", "Vercel"]
    },
    {
      phase: "Quality Testing",
      details: [
        "Performance testing and optimization",
        "Device compatibility check across all devices",
        "SEO optimization and meta tag implementation",
        "Mobile responsiveness and optimization",
        "Custom functionality testing"
      ],
      icon: Shield,
      duration: "1 week",
      deliverables: ["Test reports", "Performance metrics", "SEO audit", "Security scan"],
      tools: ["Lighthouse", "GTmetrix", "BrowserStack", "Screaming Frog"]
    },
    {
      phase: "Launch",
      details: [
        "DNS setup & SSL certificate configuration",
        "CDN configuration for global performance",
        "Analytics integration and tracking setup",
        "Domain hookup and email configuration",
        "Email notification config"
      ],
      icon: Rocket,
      duration: "2-3 days",
      deliverables: ["Live website", "Analytics setup", "SSL certificate", "Backup systems"],
      tools: ["Vercel", "Cloudflare", "Google Analytics", "Google Search Console"]
    },
    {
      phase: "Support",
      details: [
        "Monthly maintenance and updates",
        "Content updates and feature enhancements",
        "Security patches and software updates",
        "Performance monitoring and optimization"
      ],
      icon: Headphones,
      duration: "Ongoing",
      deliverables: ["Monthly reports", "Performance updates", "Security patches", "Support tickets"],
      tools: ["Monitoring tools", "GitHub", "Slack", "Analytics dashboards"]
    }
  ], []);

  // Timeline animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-timeline-index') || '0');
          if (entry.isIntersecting) {
            setVisibleTimelineItems(prev => 
              prev.includes(index) ? prev : [...prev, index]
            );
          } else {
            setVisibleTimelineItems(prev => 
              prev.filter(item => item !== index)
            );
          }
        });
      },
      { threshold: PERFORMANCE_THRESHOLDS.INTERSECTION_OBSERVER }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const stats = useMemo(() => [
    { label: "Average Project Duration", value: "6-8 weeks", icon: Clock },
    { label: "Client Satisfaction Rate", value: "98%", icon: Users },
    { label: "On-Time Delivery", value: "100%", icon: Target },
    { label: "Performance Score", value: "95+", icon: Zap }
  ], []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gradient Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        {/* Accent gradients with theme colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
      </div>
      
      {/* Space Background Elements */}
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
        
        {/* Nebula Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">How We</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Bring Ideas to Life</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              A proven methodology that transforms your vision into a digital masterpiece. From initial concept to ongoing support, we guide you through every step of the journey.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Process Timeline */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        </div>
        
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          {/* Background Stars */}
          <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
          <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
          <div className="bg-star" style={{ top: '15%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '9%', left: '58%' }}></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Our</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">6-Step Process</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              A detailed breakdown of how we transform your ideas into reality
            </p>
          </div>
          
          {/* Animated Vertical Timeline - Matching About page style */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-300 via-purple-300 to-cyan-300"></div>
              
              {/* Timeline Items */}
              <div className="space-y-8 sm:space-y-12">
                {process.map((phase, index) => {
                  const IconComponent = phase.icon;
                  return (
                    <div 
                      key={index} 
                      ref={(el) => (timelineRefs.current[index] = el)}
                      data-timeline-index={index}
                      className={`relative group transition-all duration-1000 ${
                        visibleTimelineItems.includes(index) 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-8'
                      }`}
                      style={{
                        transitionDelay: `${index * 200}ms`
                      }}
                    >
                      {/* Timeline Node with Number */}
                      <div className={`absolute left-4 sm:left-6 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-full border-2 border-slate-900 shadow-lg z-10 group-hover:scale-125 transition-all duration-1000 ${
                        visibleTimelineItems.includes(index) 
                          ? 'opacity-100' 
                          : 'opacity-0 -translate-x-8'
                      }`}
                      style={{
                        top: index === 0 ? '0rem' : '0.5rem',
                        left: 'calc(1.5rem - 1rem)',
                        transitionDelay: `${index * 200}ms`
                      }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/50 via-purple-300/50 to-cyan-300/50 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                          {index + 1}
                        </div>
                      </div>
                      
                      {/* Content Card - Matching About page style */}
                      <div className="timeline-card ml-12 sm:ml-16 bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 relative overflow-hidden">
                        {/* Box glow */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                        
                        {/* Glow Effect on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                          {/* Phase Header */}
                          <div className="mb-3 sm:mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">{phase.phase}</h3>
                              <div className="flex items-center space-x-2 text-cyan-300">
                                <Clock className="h-4 w-4" />
                                <span className="text-xs sm:text-sm font-light">{phase.duration}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Phase Details */}
                          <div className="mb-4 sm:mb-6">
                            <ul className="space-y-2 sm:space-y-3">
                              {phase.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-start space-x-2 sm:space-x-3 text-white/60">
                                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-xs sm:text-sm leading-relaxed font-light">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Deliverables and Tools */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-slate-800/50">
                            <div>
                              <h4 className="text-xs sm:text-sm font-semibold text-cyan-300 mb-2">Deliverables:</h4>
                              <ul className="space-y-1">
                                {phase.deliverables.map((deliverable, deliverableIndex) => (
                                  <li key={deliverableIndex} className="text-white/60 text-xs flex items-center font-light">
                                    <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2 flex-shrink-0"></div>
                                    {deliverable}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-semibold text-cyan-300 mb-2">Tools:</h4>
                              <ul className="space-y-1">
                                {phase.tools.map((tool, toolIndex) => (
                                  <li key={toolIndex} className="text-white/60 text-xs flex items-center font-light">
                                    <div className="w-1 h-1 bg-purple-400 rounded-full mr-2 flex-shrink-0"></div>
                                    {tool}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                      </div>
                      
                      {/* Connecting Arrow (except for last item) */}
                      {index < process.length - 1 && (
                        <div className="absolute left-5 sm:left-7 top-16 sm:top-20 w-0 h-0 border-l-3 border-r-3 border-t-6 sm:border-l-4 sm:border-r-4 sm:border-t-8 border-l-transparent border-r-transparent border-t-cyan-300/50"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Process Works */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          {/* Background Stars */}
          <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
          <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
          <div className="bg-star" style={{ top: '15%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '9%', left: '58%' }}></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Why Our Process</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Works</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Our methodology is built on years of experience and proven results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 text-center relative overflow-hidden group">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              <BarChart3 className="h-12 w-12 text-cyan-400 mx-auto mb-4 relative z-10" />
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Data-Driven Decisions</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light relative z-10">
                Every step is backed by analytics and user research to ensure your website performs at its best.
              </p>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 text-center relative overflow-hidden group">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4 relative z-10" />
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Collaborative Approach</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light relative z-10">
                You're involved at every stage with regular check-ins and feedback opportunities.
              </p>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 text-center relative overflow-hidden group">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              <Zap className="h-12 w-12 text-cyan-400 mx-auto mb-4 relative z-10" />
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Agile Methodology</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light relative z-10">
                Flexible approach that adapts to your needs and allows for changes along the way.
              </p>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 text-center relative overflow-hidden group">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              <Shield className="h-12 w-12 text-cyan-400 mx-auto mb-4 relative z-10" />
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Quality Assurance</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light relative z-10">
                Rigorous testing at every stage ensures your website is secure, fast, and reliable.
              </p>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 text-center relative overflow-hidden group">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              <Globe className="h-12 w-12 text-cyan-400 mx-auto mb-4 relative z-10" />
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Future-Proof Technology</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light relative z-10">
                Built with modern technologies that will serve your business for years to come.
              </p>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 text-center relative overflow-hidden group">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              <Headphones className="h-12 w-12 text-cyan-400 mx-auto mb-4 relative z-10" />
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Ongoing Support</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light relative z-10">
                Continuous support and maintenance to keep your website running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800/50 relative overflow-hidden group">
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                    <IconComponent className="h-8 w-8 text-cyan-400 mx-auto mb-3 relative z-10" />
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-2 relative z-10">
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-sm sm:text-base font-light relative z-10">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        </div>
        
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          {/* Background Stars */}
          <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
          <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
          <div className="bg-star" style={{ top: '15%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '9%', left: '58%' }}></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Ready to Start Your</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Project?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 sm:mb-12 max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
            Let's discuss your project and see how our proven process can bring your ideas to life.
          </p>
          <div className="flex justify-center">
            <div className="relative w-full sm:w-auto rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                <Link to="/contact" className="flex items-center justify-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                  <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Process);
