import { useScrollToTop, useSEO } from '@/hooks';
import { memo } from 'react';

const Locations = () => {
  useScrollToTop();
  
  // SEO meta tags - Indexed for local SEO and city-specific searches
  useSEO({
    title: "Web Design Services GTA | Toronto, Mississauga, Brampton, Vaughan | Zenara Designs",
    description: "Professional web design and development services across the Greater Toronto Area. Serving Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington.",
    keywords: "web design toronto, web design mississauga, web design brampton, web design vaughan, web design markham, web design richmond hill, web design oakville, web design burlington",
    canonical: "https://zenaradesigns.ca/locations"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Web Design Services Across the Greater Toronto Area
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            Professional web design, business card design, and logo design services for businesses in Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {locations.map((location, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">
                Web Design {location.city}
              </h2>
              <p className="text-slate-300 mb-4 text-sm">
                {location.description}
              </p>
              
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">Services:</h3>
                <ul className="space-y-1">
                  {location.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="text-slate-300 text-xs">
                      • {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">Neighborhoods:</h3>
                <div className="flex flex-wrap gap-1">
                  {location.neighborhoods.map((neighborhood, neighborhoodIndex) => (
                    <span key={neighborhoodIndex} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                      {neighborhood}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Why Choose Zenara Designs for Your GTA Web Design Project?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">8</div>
              <div className="text-slate-300">GTA Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
              <div className="text-slate-300">Neighborhoods Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">100+</div>
              <div className="text-slate-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-slate-300">Local Support</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Ready to Start Your Web Design Project?
          </h2>
          <p className="text-slate-300 mb-6">
            Contact us today for a free consultation about your web design, business card, or logo design needs in your GTA city
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
          >
            Get Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(Locations);
