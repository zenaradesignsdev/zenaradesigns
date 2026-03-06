import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Calendar, Heart, Users, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollToTop, useSEO } from '@/hooks';
import { memo, useEffect } from 'react';
import StructuredData from '@/components/StructuredData';
import { generateLocalBusinessSchema, generateServiceSchema } from '@/lib/structured-data';

const Clinics = () => {
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Wellness Clinic Web Design GTA | Health & Wellness Websites | Zenara",
    description: "Professional web design for wellness clinics in Markham, Vaughan, Pickering & across GTA. Modern platforms for massage therapy, chiropractic, physiotherapy, and holistic health. Free consultation.",
    canonical: "https://zenaradesigns.com/clinics"
  });

  // Inject structured data
  useEffect(() => {
    const schemas = [
      generateLocalBusinessSchema(),
      generateServiceSchema(
        'Wellness Clinic Web Design',
        'Professional web design and development services for wellness clinics, massage therapy, chiropractic, physiotherapy, and holistic health practices across the Greater Toronto Area. Modern platforms that build trust and convert visitors into appointments.'
      )
    ];
    
    // Inject all schemas
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    
    return () => {
      // Cleanup on unmount
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        if (script.textContent?.includes('Wellness Clinic Web Design')) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gradient Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
      </div>
      
      {/* Space Background Elements */}
      <div className="absolute inset-0">
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
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Wellness Clinic Web Design</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Greater Toronto Area</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4 mb-8">
            Modern, professional web design for wellness clinics, massage therapy, chiropractic, physiotherapy, and holistic health practices across the GTA. Build trust, showcase services, and convert visitors into appointments.
          </p>
          <div className="flex justify-center">
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                <Link to="/contact" className="flex items-center justify-center">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                  <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                    Book Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Section 1: Modern Wellness Practice */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">From Traditional Practice to</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Digital-First Client Acquisition</span>
              </h2>
              <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                The wellness industry in Ontario is experiencing rapid growth, with more clients than ever researching practitioners online before booking appointments. A professional website is essential for building trust, showcasing your expertise, and capturing new clients in the competitive GTA market.
              </p>
              <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                Modern wellness clinics need a digital presence that reflects their commitment to health and healing. Your website is often the first interaction potential clients have with your practice, making it crucial for establishing credibility and converting visitors into booked appointments.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Key Features */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Essential Features for</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Modern Wellness Clinics</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: Calendar,
                title: 'Online Appointment Booking',
                description: 'Seamless booking systems that integrate with your calendar, allowing clients to book appointments 24/7 and reducing no-shows with automated reminders.'
              },
              {
                icon: Heart,
                title: 'Service Showcase Pages',
                description: 'Dedicated pages for each service (massage therapy, chiropractic, physiotherapy, etc.) optimized for local search and conversion.'
              },
              {
                icon: Users,
                title: 'Practitioner Profiles',
                description: 'Professional bios and credentials that build personal connections with potential clients and showcase your team\'s expertise.'
              },
              {
                icon: FileText,
                title: 'Client Forms & Intake',
                description: 'Secure online intake forms and health questionnaires that streamline the client experience and reduce administrative time.'
              },
              {
                icon: Shield,
                title: 'HIPAA-Compliant Security',
                description: 'Secure platforms that protect client health information and ensure compliance with privacy regulations.'
              },
              {
                icon: CheckCircle,
                title: 'Client Testimonials',
                description: 'Social proof through client reviews and testimonials that build trust and demonstrate the effectiveness of your treatments.'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: CTA */}
        <section>
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-light text-lg sm:text-xl">
                  Ready to Transform Your Wellness Clinic's Digital Presence?
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Get Your</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Free Strategy Audit</span>
              </h2>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Contact us today for a free consultation about your wellness clinic's web design needs. We'll analyze your current site and provide a roadmap to digital excellence.
              </p>
              <div className="flex justify-center">
                <div className="relative w-full sm:w-auto rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                    <Link to="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        Book Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Structured Data */}
      <StructuredData 
        type="localBusiness"
      />
    </div>
  );
};

export default memo(Clinics);
