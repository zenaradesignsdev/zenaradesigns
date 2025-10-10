import { useScrollToTop, useSEO } from '@/hooks';
import { memo } from 'react';

const PricingGuide = () => {
  useScrollToTop();
  
  // SEO meta tags - Indexed for high-intent pricing searches
  useSEO({
    title: "Web Design Pricing Guide Toronto | Website Development Costs GTA | Zenara Designs",
    description: "Transparent pricing guide for web design, development, and digital marketing services in Toronto & GTA. Get detailed costs for small business websites, e-commerce, and enterprise solutions.",
    keywords: "web design pricing toronto, website development cost gta, toronto web agency pricing, small business website cost, ecommerce website price toronto",
    canonical: "https://zenaradesigns.com/pricing-guide"
  });

  const pricingCategories = [
    {
      title: "Web Design Pricing Toronto",
      description: "Transparent pricing for web design services across the GTA",
      packages: [
        {
          name: "Small Business Website Toronto",
          price: "$2,500 - $4,000",
          features: [
            "5-10 pages",
            "Mobile responsive design",
            "SEO optimization",
            "Contact forms",
            "Google Analytics setup",
            "1 year hosting included"
          ]
        },
        {
          name: "E-commerce Website GTA",
          price: "$5,000 - $8,000",
          features: [
            "Product catalog",
            "Shopping cart",
            "Payment integration",
            "Inventory management",
            "Mobile optimization",
            "SSL certificate"
          ]
        },
        {
          name: "Corporate Website Toronto",
          price: "$8,000 - $15,000",
          features: [
            "20+ pages",
            "Custom functionality",
            "Advanced SEO",
            "Content management",
            "Multi-language support",
            "Priority support"
          ]
        }
      ]
    },
    {
      title: "Business Card Design Pricing GTA",
      description: "Professional business card design and printing services",
      packages: [
        {
          name: "Basic Business Cards Toronto",
          price: "$299 - $499",
          features: [
            "3 design concepts",
            "Unlimited revisions",
            "Print-ready files",
            "500 cards printed",
            "Premium cardstock",
            "Glossy finish"
          ]
        },
        {
          name: "Premium Business Cards GTA",
          price: "$499 - $799",
          features: [
            "5 design concepts",
            "Custom illustrations",
            "Foil stamping",
            "1000 cards printed",
            "Luxury cardstock",
            "Matte finish"
          ]
        },
        {
          name: "Executive Business Cards Toronto",
          price: "$799 - $1,299",
          features: [
            "Unlimited concepts",
            "Brand guidelines",
            "Die-cutting",
            "2000 cards printed",
            "Premium materials",
            "Special finishes"
          ]
        }
      ]
    },
    {
      title: "Logo Design Pricing Toronto",
      description: "Creative logo design services for businesses across the GTA",
      packages: [
        {
          name: "Startup Logo Design GTA",
          price: "$399 - $699",
          features: [
            "3 logo concepts",
            "Unlimited revisions",
            "Vector files",
            "Color variations",
            "Black & white versions",
            "Basic brand guidelines"
          ]
        },
        {
          name: "Professional Logo Design Toronto",
          price: "$699 - $1,299",
          features: [
            "5 logo concepts",
            "Custom typography",
            "Complete brand kit",
            "Business card design",
            "Letterhead design",
            "Social media kit"
          ]
        },
        {
          name: "Enterprise Logo Design GTA",
          price: "$1,299 - $2,499",
          features: [
            "Unlimited concepts",
            "Full brand identity",
            "Brand guidelines",
            "Marketing materials",
            "Website integration",
            "Ongoing support"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Web Design, Business Card & Logo Design Pricing Guide - Toronto & GTA
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            Transparent pricing for web design, business card design, and logo design services across Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington
          </p>
        </div>

        <div className="space-y-12">
          {pricingCategories.map((category, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {category.title}
              </h2>
              <p className="text-slate-300 mb-6">
                {category.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.packages.map((pkg, pkgIndex) => (
                  <div key={pkgIndex} className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-2xl font-bold text-cyan-400 mb-4">
                      {pkg.price}
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-slate-300 text-sm flex items-start">
                          <span className="text-cyan-400 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg p-8 border border-cyan-500/30">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Why Choose Zenara Designs for Your Toronto Web Design Project?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">100+</div>
              <div className="text-slate-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">98%</div>
              <div className="text-slate-300">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-slate-300">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">2-4</div>
              <div className="text-slate-300">Weeks Delivery</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-slate-300 mb-6">
            Get a free quote for your web design, business card, or logo design project in Toronto & GTA
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

export default memo(PricingGuide);
