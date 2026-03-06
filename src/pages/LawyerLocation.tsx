import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Scale, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollToTop, useSEO } from '@/hooks';
import { memo, useEffect, useMemo } from 'react';
import StructuredData from '@/components/StructuredData';
import { generateLocalBusinessSchema } from '@/lib/structured-data';
import lawyerGavelOffice from '@/assets/lawyer-gavel-office.png';
import NotFound from './NotFound';

// GTA Locations data - matches Lawyers.tsx
const locations = [
  {
    id: 'markham',
    city: 'Markham',
    description: 'Serving law firms in Markham\'s thriving business district, from Unionville to Downtown Markham. Specializing in corporate law, real estate law, and immigration law firm websites.',
    keywords: ['law firm web design Markham', 'lawyer website design Markham', 'legal website Markham']
  },
  {
    id: 'vaughan',
    city: 'Vaughan',
    description: 'Professional web design for Vaughan law firms, including Woodbridge, Thornhill, and Maple. Expertise in family law, personal injury, and commercial litigation websites.',
    keywords: ['law firm web design Vaughan', 'lawyer website design Vaughan', 'legal website Vaughan']
  },
  {
    id: 'pickering',
    city: 'Pickering',
    description: 'Custom legal websites for Pickering law firms. Serving criminal defense, real estate, and estate planning practices throughout the Durham Region.',
    keywords: ['law firm web design Pickering', 'lawyer website design Pickering', 'legal website Pickering']
  },
  {
    id: 'ajax',
    city: 'Ajax',
    description: 'Modern web solutions for Ajax law firms. Specializing in family law, immigration, and small business legal services websites.',
    keywords: ['law firm web design Ajax', 'lawyer website design Ajax', 'legal website Ajax']
  },
  {
    id: 'oshawa',
    city: 'Oshawa',
    description: 'Professional legal website design for Oshawa law firms. Serving personal injury, employment law, and criminal defense practices.',
    keywords: ['law firm web design Oshawa', 'lawyer website design Oshawa', 'legal website Oshawa']
  },
  {
    id: 'whitby',
    city: 'Whitby',
    description: 'Secure, compliant websites for Whitby law firms. Expertise in real estate law, wills and estates, and corporate law firm websites.',
    keywords: ['law firm web design Whitby', 'lawyer website design Whitby', 'legal website Whitby']
  },
  {
    id: 'richmond-hill',
    city: 'Richmond Hill',
    description: 'High-performance legal websites for Richmond Hill law firms. Specializing in immigration law, family law, and business law firm websites.',
    keywords: ['law firm web design Richmond Hill', 'lawyer website design Richmond Hill', 'legal website Richmond Hill']
  },
  {
    id: 'newmarket',
    city: 'Newmarket',
    description: 'Custom web design for Newmarket law firms. Serving personal injury, real estate, and estate planning practices.',
    keywords: ['law firm web design Newmarket', 'lawyer website design Newmarket', 'legal website Newmarket']
  },
  {
    id: 'aurora',
    city: 'Aurora',
    description: 'Professional legal website solutions for Aurora law firms. Expertise in family law, criminal defense, and corporate law websites.',
    keywords: ['law firm web design Aurora', 'lawyer website design Aurora', 'legal website Aurora']
  },
  {
    id: 'stouffville',
    city: 'Stouffville',
    description: 'Modern web design for Stouffville law firms. Specializing in real estate law, wills and estates, and small business legal services.',
    keywords: ['law firm web design Stouffville', 'lawyer website design Stouffville', 'legal website Stouffville']
  }
];

const LawyerLocation = () => {
  const { location: locationSlug } = useParams<{ location: string }>();
  const navigate = useNavigate();
  useScrollToTop();

  // Find the location data
  const locationData = useMemo(() => {
    return locations.find(loc => loc.id === locationSlug);
  }, [locationSlug]);

  // If location not found, show 404
  if (!locationData) {
    return <NotFound />;
  }

  const { city, description, keywords } = locationData;

  // SEO meta tags
  useSEO({
    title: `Law Firm Web Design ${city} | Professional Legal Websites | Zenara`,
    description: `Professional web design for ${city} law firms. Build trust, showcase expertise, and convert visitors. ${keywords.join(', ')}. Free consultation.`,
    canonical: `https://zenaradesigns.com/lawyers/${locationSlug}`
  });

  // Inject structured data
  useEffect(() => {
    const schema = generateLocalBusinessSchema();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    
    return () => {
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        if (script.textContent?.includes('LocalBusiness')) {
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
            <span className="block font-light opacity-90">Law Firm Web Design</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">{city}</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4 mb-4">
            Professional web design services for {city} law firms. Build trust, establish credibility, and convert visitors into consultations with a modern, high-performing website.
          </p>
          <p className="text-base sm:text-lg text-white/50 max-w-3xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4 mb-8">
            {description}
          </p>
        </div>

        {/* Image Section */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center">
              <img 
                src={lawyerGavelOffice}
                alt={`Professional law firm web design services in ${city}`}
                className="w-full h-full object-cover rounded-2xl"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Section 1: Why Your City Law Firm Needs a Professional Website */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Why Your {city} Law Firm Needs a</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Professional Website</span>
              </h2>
              
              <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                In today's digital-first legal market, your website is often the first interaction potential clients have with your {city} law firm. <span className="text-cyan-300 font-semibold">78% of people research lawyers online before making contact</span>, and that number rises to <span className="text-cyan-300 font-semibold">92% among younger demographics</span>. Without a professional, trustworthy website, your firm is invisible to the majority of potential clients.
              </p>
              
              <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                First impressions are formed in just 0.05 seconds, and <span className="text-cyan-300 font-semibold">94% of those impressions are design-related</span>. A professional website signals competence, attention to detail, and technological capability. Conversely, a poorly designed or outdated website can instantly erode trust, causing potential clients to question your firm's capabilities and move on to a competitor.
              </p>
              
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 mt-8">The Cost of a Bad Website</h3>
              <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                Law firms with outdated websites lose <span className="text-cyan-300 font-semibold">40-60% of potential clients who bounce</span>. The average law firm loses <span className="text-cyan-300 font-semibold">$50,000 to $100,000+ annually</span> in missed opportunities from poor web presence. Firms with professional websites see <span className="text-cyan-300 font-semibold">3x more consultation requests</span> compared to those with outdated sites.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: How We Help City Law Firms */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-6 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">How We Help {city}</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Law Firms Succeed Online</span>
              </h2>
              
              <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                Zenara Designs specializes in creating professional, high-performing websites for law firms across the Greater Toronto Area, including {city}. We understand the unique needs of legal practices and design websites that build trust, showcase expertise, and convert visitors into consultations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Custom Design for Legal Practices</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light">
                      Every website is custom-designed to reflect your firm's unique brand, practice areas, and client base. No templates, no generic designs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Local SEO Optimization</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light">
                      We optimize your website to rank for local searches like "{city} family lawyer" and "{city} real estate attorney" to capture ready-to-consult prospects.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Trust-Building Features</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light">
                      Consultation booking systems, practice area showcases, case studies, attorney profiles, and client testimonials that build credibility.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Fast, Secure, and Reliable</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light">
                      Built on modern technology for fast load times, superior performance, and 24/7 reliability that your clients expect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Local SEO for City Law Firms */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Local SEO for {city} Law Firms</span>
              </h3>
              
              <p className="text-white/60 mb-6 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                With <span className="text-cyan-300 font-semibold">68% of users performing local searches</span> before contacting a law firm, local SEO is critical for acquiring clients in {city}. We implement a "Local Authority Engine" that ensures your firm appears in Google Map Pack for city-specific searches.
              </p>
              
              <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-light tracking-[0.01em]">
                Our local SEO strategy includes location-specific content, Google Business Profile optimization, local schema markup, and citation building to ensure your {city} law firm is the first choice for local clients searching for legal services.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Ready to Transform Your</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">{city} Law Firm's Digital Presence?</span>
              </h2>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Contact us today for a free consultation about your law firm's web design needs. We'll analyze your current site and provide a roadmap to digital excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* CTA 1: Contact Page */}
                <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group w-full sm:w-auto">
                    <Link to="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        Get Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
                
                {/* CTA 2: Lawyers Page */}
                <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group w-full sm:w-auto">
                    <Link to="/lawyers" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        View All Services
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

export default memo(LawyerLocation);
