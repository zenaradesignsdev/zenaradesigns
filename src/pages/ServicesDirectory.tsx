import { useScrollToTop, useSEO } from '@/hooks';
import { memo } from 'react';

const ServicesDirectory = () => {
  useScrollToTop();
  
  // SEO meta tags - Indexed for comprehensive service coverage
  useSEO({
    title: "Complete Services Directory - Web Design, Development & Digital Marketing Toronto | Zenara Designs",
    description: "Comprehensive directory of web design, development, and digital marketing services in Toronto & GTA. Find specialized services for every business need across the Greater Toronto Area.",
    keywords: "web design services toronto, web development services gta, digital marketing toronto, business cards toronto, logo design mississauga, ecommerce development brampton",
    canonical: "https://zenaradesigns.ca/services-directory"
  });

  const services = [
    {
      category: "Web Design Services Toronto",
      services: [
        "Custom Website Design Toronto",
        "Responsive Web Design GTA", 
        "E-commerce Website Development Toronto",
        "Corporate Website Design Mississauga",
        "Small Business Website Design Brampton",
        "Portfolio Website Design Vaughan",
        "Restaurant Website Design Markham",
        "Real Estate Website Design Richmond Hill",
        "Healthcare Website Design Oakville",
        "Law Firm Website Design Burlington"
      ]
    },
    {
      category: "Business Card Design Toronto",
      services: [
        "Professional Business Card Design Toronto",
        "Custom Business Card Printing GTA",
        "Corporate Business Card Design Mississauga",
        "Creative Business Card Design Brampton",
        "Executive Business Card Design Vaughan",
        "Small Business Card Design Markham",
        "Real Estate Business Card Design Richmond Hill",
        "Medical Business Card Design Oakville",
        "Legal Business Card Design Burlington"
      ]
    },
    {
      category: "Logo Design Services GTA",
      services: [
        "Custom Logo Design Toronto",
        "Brand Identity Design GTA",
        "Corporate Logo Design Mississauga",
        "Startup Logo Design Brampton",
        "Restaurant Logo Design Vaughan",
        "Real Estate Logo Design Markham",
        "Healthcare Logo Design Richmond Hill",
        "Tech Company Logo Design Oakville",
        "Nonprofit Logo Design Burlington"
      ]
    },
    {
      category: "Digital Marketing Toronto",
      services: [
        "SEO Services Toronto",
        "Google Ads Management GTA",
        "Social Media Marketing Mississauga",
        "Local SEO Optimization Brampton",
        "Content Marketing Vaughan",
        "Email Marketing Markham",
        "PPC Advertising Richmond Hill",
        "Online Reputation Management Oakville",
        "Digital Strategy Burlington"
      ]
    },
    {
      category: "Web Development GTA",
      services: [
        "Custom Web Development Toronto",
        "Mobile App Development GTA",
        "E-commerce Development Mississauga",
        "WordPress Development Brampton",
        "Shopify Development Vaughan",
        "React Development Markham",
        "Node.js Development Richmond Hill",
        "API Development Oakville",
        "Database Development Burlington"
      ]
    },
    {
      category: "Graphic Design Toronto",
      services: [
        "Brand Identity Design Toronto",
        "Print Design GTA",
        "Marketing Materials Mississauga",
        "Social Media Graphics Brampton",
        "Brochure Design Vaughan",
        "Flyer Design Markham",
        "Banner Design Richmond Hill",
        "Poster Design Oakville",
        "Signage Design Burlington"
      ]
    }
  ];

  const locations = [
    "Toronto", "Mississauga", "Brampton", "Vaughan", "Markham", 
    "Richmond Hill", "Oakville", "Burlington", "Etobicoke", "Scarborough",
    "North York", "East York", "York", "Pickering", "Ajax", "Whitby"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Complete Web Design & Development Services Directory - Toronto & GTA
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            Comprehensive list of web design, business card design, logo design, and digital marketing services available across the Greater Toronto Area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((category, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">
                {category.category}
              </h2>
              <ul className="space-y-2">
                {category.services.map((service, serviceIndex) => (
                  <li key={serviceIndex} className="text-slate-300 text-sm">
                    • {service}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Service Areas - Greater Toronto Area
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {locations.map((location, index) => (
              <div key={index} className="text-center">
                <span className="text-slate-300 text-sm">
                  {location}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Ready to Get Started with Your Project?
          </h2>
          <p className="text-slate-300 mb-6">
            Contact us today for a free consultation about your web design, business card, or logo design needs in Toronto & GTA
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(ServicesDirectory);
