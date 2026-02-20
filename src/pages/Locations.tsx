import { useScrollToTop, useSEO } from '@/hooks';
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  ArrowRight, 
  Building,
  CheckCircle
} from 'lucide-react';

const Locations = () => {
  useScrollToTop();
  
  // SEO meta tags - Indexed for local SEO and city-specific searches
  useSEO({
    title: "Web Design Services GTA | Toronto, Mississauga | Zenara",
    description: "Web design services across the GTA. Serving Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington. Contact us for local service!",
    canonical: "https://zenaradesigns.com/locations"
  });

  const locations = [
    {
      city: "Toronto",
      description: "Web design and development services in downtown Toronto, serving businesses in the financial district, entertainment district, and surrounding neighborhoods.",
      services: ["Web Design Toronto", "Business Cards Toronto", "Logo Design Toronto", "E-commerce Development Toronto"],
      neighborhoods: ["Downtown Toronto", "Financial District", "Entertainment District", "Yorkville", "Distillery District", "Harbourfront"]
    },
    {
      city: "Mississauga",
      description: "Professional web design services in Mississauga, serving businesses in Square One, Port Credit, and throughout the city.",
      services: ["Web Design Mississauga", "Business Cards Mississauga", "Logo Design Mississauga", "Digital Marketing Mississauga"],
      neighborhoods: ["Square One", "Port Credit", "Streetsville", "Meadowvale", "Clarkson", "Malton"]
    },
    {
      city: "Brampton",
      description: "Custom website design and development for Brampton businesses, from small startups to large corporations.",
      services: ["Web Design Brampton", "Business Cards Brampton", "Logo Design Brampton", "Website Maintenance Brampton"],
      neighborhoods: ["Downtown Brampton", "Bramalea", "Springdale", "Sandalwood", "Fletcher's Creek", "Heart Lake"]
    },
    {
      city: "Vaughan",
      description: "Leading web design agency in Vaughan, specializing in e-commerce and corporate website development.",
      services: ["Web Design Vaughan", "Business Cards Vaughan", "Logo Design Vaughan", "E-commerce Development Vaughan"],
      neighborhoods: ["Woodbridge", "Thornhill", "Maple", "Kleinburg", "Concord", "Vellore Village"]
    },
    {
      city: "Markham",
      description: "Innovative web design solutions for Markham businesses, with expertise in tech startups and professional services.",
      services: ["Web Design Markham", "Business Cards Markham", "Logo Design Markham", "Tech Startup Websites Markham"],
      neighborhoods: ["Downtown Markham", "Unionville", "Thornhill", "Milliken", "Markham Village", "Buttonville"]
    },
    {
      city: "Richmond Hill",
      description: "Professional web design services in Richmond Hill, serving diverse businesses from retail to healthcare.",
      services: ["Web Design Richmond Hill", "Business Cards Richmond Hill", "Logo Design Richmond Hill", "Healthcare Websites Richmond Hill"],
      neighborhoods: ["Downtown Richmond Hill", "Bayview", "Oak Ridges", "Langstaff", "Jefferson", "Crosby"]
    },
    {
      city: "Oakville",
      description: "Premium web design and development services for Oakville businesses, focusing on luxury brands and professional services.",
      services: ["Web Design Oakville", "Business Cards Oakville", "Logo Design Oakville", "Luxury Brand Websites Oakville"],
      neighborhoods: ["Downtown Oakville", "Bronte", "Glen Abbey", "West Oak Trails", "Iroquois Ridge", "Clearview"]
    },
    {
      city: "Burlington",
      description: "Creative web design solutions for Burlington businesses, specializing in tourism, hospitality, and local services.",
      services: ["Web Design Burlington", "Business Cards Burlington", "Logo Design Burlington", "Tourism Websites Burlington"],
      neighborhoods: ["Downtown Burlington", "Aldershot", "Appleby", "Millcroft", "Palmer", "Tansley"]
    }
  ];

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Web Design Services Across the</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Greater Toronto Area</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
            Professional web design, business card design, and logo design services for businesses in Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {locations.map((location, index) => (
            <div key={index} className="group">
              <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 relative overflow-hidden h-full flex flex-col">
                {/* Box glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg">
                      <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                      <Building className="h-5 w-5 sm:h-6 sm:w-6 text-white relative z-10" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                      <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{location.city}</span>
                    </h2>
                  </div>
                  
                  <p className="text-white/60 mb-6 text-sm sm:text-base leading-relaxed flex-grow font-light">
                    {location.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-cyan-300 mb-3 flex items-center space-x-2">
                      <span>Services</span>
                    </h3>
                    <ul className="space-y-2">
                      {location.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/60 text-sm font-light">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-sm font-semibold text-cyan-300 mb-3 flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Neighborhoods</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {location.neighborhoods.map((neighborhood, neighborhoodIndex) => (
                        <span key={neighborhoodIndex} className="text-xs bg-slate-800/50 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30 font-light">
                          {neighborhood}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden mb-16 sm:mb-20">
          {/* Box glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Why Choose Zenara Designs for Your</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">GTA Web Design Project?</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-2">8</div>
                  <div className="text-white/60 text-sm sm:text-base font-light">GTA Cities Served</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-2">50+</div>
                  <div className="text-white/60 text-sm sm:text-base font-light">Neighborhoods Covered</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-2">30+</div>
                  <div className="text-white/60 text-sm sm:text-base font-light">Projects Completed</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-2">24/7</div>
                  <div className="text-white/60 text-sm sm:text-base font-light">Local Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            {/* Box glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-light text-lg sm:text-xl">
                  Ready to Start Your Web Design Project?
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Get Your</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Free Consultation</span>
              </h2>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Contact us today for a free consultation about your web design, business card, or logo design needs in your GTA city
              </p>
              <div className="flex justify-center">
                <div className="relative w-full sm:w-auto rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                    <Link to="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        Get Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated Date */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-sm font-light">
            Last updated: January 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Locations);
