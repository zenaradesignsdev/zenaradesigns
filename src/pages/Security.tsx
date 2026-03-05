import { Shield, Lock, Eye, Server, Clock, CheckCircle, AlertTriangle, ArrowRight, Zap, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollToTop, useSEO } from '@/hooks';
import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { PERFORMANCE_THRESHOLDS } from '@/lib/constants';

const Security = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Website Security Best Practices | SSL, Uptime & Protection | Zenara",
    description: "Learn about essential website security measures including SSL certificates, uptime monitoring, anti-spam protection, and maintenance. Keep your Toronto business website secure.",
    canonical: "https://zenaradesigns.com/security"
  });
  
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleItemIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        setVisibleItems(prev => [...prev, index]);
      } else {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        setVisibleItems(prev => prev.filter(item => item !== index));
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleItemIntersection, { threshold: PERFORMANCE_THRESHOLDS.INTERSECTION_OBSERVER });

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [handleItemIntersection]);

  const securityFeatures = useMemo(() => [
    {
      icon: Lock,
      title: "SSL Certificates",
      description: "Encrypt all data transmission between your website and visitors",
      benefits: [
        "Protects sensitive customer information",
        "Builds trust with visitors",
        "Required for online payments",
        "Improves SEO rankings",
        "Prevents data interception"
      ],
      importance: "Critical for any website handling personal or financial data"
    },
    {
      icon: Server,
      title: "Uptime Monitoring",
      description: "24/7 monitoring ensures your website is always accessible",
      benefits: [
        "99.9% uptime guarantee",
        "Instant alerts for downtime",
        "Automatic failover systems",
        "Performance tracking",
        "Revenue loss prevention"
      ],
      importance: "Every minute of downtime can cost your business potential customers"
    },
    {
      icon: Shield,
      title: "Anti-Spam Protection",
      description: "Advanced filtering prevents spam and malicious submissions",
      benefits: [
        "Blocks automated spam bots",
        "Protects contact forms",
        "Reduces server load",
        "Maintains data quality",
        "Prevents email flooding"
      ],
      importance: "Essential for maintaining professional communication channels"
    },
    {
      icon: Database,
      title: "Data Backup & Recovery",
      description: "Regular automated backups protect against data loss",
      benefits: [
        "Daily automated backups",
        "Multiple backup locations",
        "Quick recovery options",
        "Version control",
        "Disaster recovery planning"
      ],
      importance: "Protects against hardware failures, cyber attacks, and human error"
    },
    {
      icon: Eye,
      title: "Security Monitoring",
      description: "Continuous monitoring for threats and vulnerabilities",
      benefits: [
        "Real-time threat detection",
        "Malware scanning",
        "Vulnerability assessments",
        "Security alerts",
        "Incident response"
      ],
      importance: "Early detection prevents major security breaches"
    },
    {
      icon: Zap,
      title: "Performance Security",
      description: "Optimized performance with security-first approach",
      benefits: [
        "Fast loading times",
        "Secure hosting infrastructure",
        "CDN protection",
        "DDoS mitigation",
        "Resource optimization"
      ],
      importance: "Fast, secure websites provide better user experience and SEO benefits"
    }
  ], []);

  const securityStats = useMemo(() => [
    { label: "Websites Hacked Daily", value: "30,000+", icon: AlertTriangle },
    { label: "Average Downtime Cost", value: "$5,600/min", icon: Clock },
    { label: "SSL Adoption Rate", value: "95%+", icon: Lock },
    { label: "Spam Reduction", value: "99.7%", icon: Shield }
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
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Website Security</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Best Practices</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Protect your Toronto business with enterprise-grade security measures. Learn why SSL certificates, uptime monitoring, and anti-spam protection are essential for your website's success.
            </p>
          </div>
        </div>
      </section>

      {/* Security Statistics */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Why Website Security</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Matters</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              The digital landscape is constantly evolving, and so are the threats. Here's why security should be your top priority.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {securityStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 text-center relative overflow-hidden group">
                  {/* Box glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg relative z-10">
                    <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                    <IconComponent className="h-6 w-6 text-white relative z-10" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-2 relative z-10">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm sm:text-base font-light relative z-10">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Features */}
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
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Essential Security</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Measures</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Comprehensive security solutions to protect your website and business data
            </p>
          </div>
          
          <div className="space-y-8 sm:space-y-12">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index} 
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  className={`group transition-all duration-1000 ${
                    visibleItems.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                >
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 relative overflow-hidden">
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                    
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-4 sm:space-x-6">
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                          <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 relative z-10" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-tight">
                            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{feature.title}</span>
                          </h3>
                          <p className="text-white/60 mb-4 text-base sm:text-lg leading-relaxed font-light">
                            {feature.description}
                          </p>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-cyan-300 mb-2">Why It's Important:</h4>
                            <p className="text-white/60 text-sm font-light">{feature.importance}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold text-cyan-300 mb-3">Key Benefits:</h4>
                            <ul className="space-y-2">
                              {feature.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-start space-x-2 text-white/60">
                                  <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm leading-relaxed font-light">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Maintenance & Updates */}
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
              <span className="block font-light opacity-90">Regular</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Maintenance</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Security is not a one-time setup. It requires ongoing attention and updates to stay effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Monthly Security Updates",
                description: "Regular patches and updates to keep your website secure against new threats",
                icon: Shield,
                frequency: "Monthly"
              },
              {
                title: "Performance Monitoring",
                description: "Continuous monitoring of website performance and security metrics",
                icon: Zap,
                frequency: "24/7"
              },
              {
                title: "Backup Verification",
                description: "Regular testing and verification of backup systems to ensure data recovery",
                icon: Database,
                frequency: "Weekly"
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 h-full relative overflow-hidden">
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                    <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 relative z-10">
                      <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                      <IconComponent className="h-6 w-6 relative z-10" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 relative z-10 tracking-tight">
                      <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{item.title}</span>
                    </h3>
                    <p className="text-white/60 mb-4 text-sm leading-relaxed font-light relative z-10">
                      {item.description}
                    </p>
                    <div className="text-cyan-300 text-sm font-semibold relative z-10">
                      Frequency: {item.frequency}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Last Updated Date */}
          <div className="text-center mt-12">
            <p className="text-white/40 text-sm font-light">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Security);
