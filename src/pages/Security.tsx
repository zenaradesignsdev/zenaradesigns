import { Shield, Lock, Eye, Server, Clock, CheckCircle, AlertTriangle, ArrowRight, Zap, Globe, Database, Users } from 'lucide-react';
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
    canonical: "https://zenaradesigns.com/security",
    structuredData: {
      type: 'service',
      serviceName: 'Website Security Services',
      serviceDescription: 'Comprehensive website security solutions including SSL certificates, uptime monitoring, anti-spam protection, and regular security maintenance for businesses in Toronto and GTA.'
    }
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
    const observer = new IntersectionObserver(handleItemIntersection, { threshold: 0.2 });

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
    <div className="min-h-screen" role="main" aria-label="Security page">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-black via-red-900 to-purple-900">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Security-themed Stars */}
          <div className="absolute top-16 left-16 w-1 h-1 bg-red-300 rounded-full animate-twinkle"></div>
          <div className="absolute top-32 right-24 w-1 h-1 bg-orange-300 rounded-full animate-twinkle delay-1000"></div>
          <div className="absolute top-48 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-twinkle delay-2000"></div>
          <div className="absolute top-24 right-1/3 w-1 h-1 bg-red-300 rounded-full animate-twinkle delay-500"></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 border border-red-500/30">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-red-300">Website Security</span>
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-white leading-tight">
              Website Security <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Best Practices</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed px-4">
              Protect your Toronto business with enterprise-grade security measures. Learn why SSL certificates, uptime monitoring, and anti-spam protection are essential for your website's success.
            </p>
          </div>
        </div>
      </section>

      {/* Security Statistics */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Website Security <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Matters</span>
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto">
              The digital landscape is constantly evolving, and so are the threats. Here's why security should be your top priority.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityStats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl mx-auto mb-4 flex items-center justify-center text-white">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 border border-orange-500/30">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-orange-300">Security Features</span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-white">
              Essential Security <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Measures</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              Comprehensive security solutions to protect your website and business data
            </p>
          </div>
          
          <div className="space-y-8 sm:space-y-12">
            {securityFeatures.map((feature, index) => (
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
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 relative overflow-hidden">
                  {/* Glassmorphism Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                  
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                        <feature.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-slate-300 mb-4 text-base sm:text-lg leading-relaxed">
                          {feature.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-orange-300 mb-2">Why It's Important:</h4>
                          <p className="text-slate-300 text-sm">{feature.importance}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-orange-300 mb-3">Key Benefits:</h4>
                          <ul className="space-y-2">
                            {feature.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-start space-x-2 text-slate-300">
                                <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm leading-relaxed">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance & Updates */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-black via-slate-900 to-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 border border-red-500/30">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-red-300">Ongoing Protection</span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-white">
              Regular <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Maintenance</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              Security is not a one-time setup. It requires ongoing attention and updates to stay effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-red-500/20 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-red-300 text-sm font-semibold">
                    Frequency: {item.frequency}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Last Updated Date */}
          <div className="text-center mt-12">
            <p className="text-transparent text-sm">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Security);
