import Link from 'next/link';
import { ArrowRight, Pen, Droplets, Type, BookOpen, Eye, Layers, Target, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StructuredData from '@/components/StructuredData';

const features = [
  {
    icon: Pen,
    title: 'Custom Logo Creation',
    description: 'Hand-crafted logos designed from scratch. We explore dozens of concepts and refine until your mark perfectly captures your brand\'s essence and values.',
  },
  {
    icon: Droplets,
    title: 'Color Psychology',
    description: 'Strategic color palette selection backed by psychology research. Every hue is chosen to evoke the right emotions and resonate with your target audience.',
  },
  {
    icon: Type,
    title: 'Typography Selection',
    description: 'Curated typeface pairing that reinforces your brand personality. From bold and modern to elegant and timeless, typography sets the tone for everything.',
  },
  {
    icon: BookOpen,
    title: 'Brand Guidelines',
    description: 'Comprehensive brand style guides covering logo usage rules, color codes, typography specs, spacing requirements, and do\'s and don\'ts for consistency.',
  },
  {
    icon: Eye,
    title: 'Visual Identity System',
    description: 'Beyond the logo — icons, patterns, graphic elements, and imagery direction that create a cohesive visual language across all touchpoints.',
  },
  {
    icon: Layers,
    title: 'Multi-Format Delivery',
    description: 'Your logo delivered in every format you\'ll ever need: SVG, PNG, PDF, EPS, and more. Light and dark variants, with and without tagline, social media sizes.',
  },
  {
    icon: Target,
    title: 'Market Research',
    description: 'Competitor analysis and industry research inform every design decision. Your brand stands out because we understand what already exists in your space.',
  },
  {
    icon: Repeat,
    title: 'Unlimited Revisions',
    description: 'We iterate until you\'re thrilled. Every round of feedback brings us closer to a logo you\'ll be proud to put on everything from signage to business cards.',
  },
];

const differentiators = [
  {
    title: 'Strategy Before Design',
    description: 'We don\'t open Illustrator until we understand your audience, competitors, and goals. Research-driven design produces logos that last decades, not months.',
  },
  {
    title: 'Full Brand Ecosystem',
    description: 'Your logo is the seed — we grow the entire brand identity around it, from business cards to website design, ensuring everything feels unified.',
  },
  {
    title: 'Original & Trademarked',
    description: 'Every design is 100% original and eligible for trademark registration. No clip art, no stock icons, no recycled concepts from other clients.',
  },
  {
    title: 'Cross-Platform Ready',
    description: 'Designed to look stunning at any size: from a favicon on a browser tab to a billboard on the highway. Scalability is baked into every concept.',
  },
];

const faqs = [
  {
    question: 'How much does a professional logo design cost in Toronto?',
    answer: 'Professional logo design at Zenara Designs starts at $500 for a standalone logo and ranges to $2,500+ for a complete brand identity package including guidelines, colour palette, and typography system. We provide fixed-price quotes after a free consultation — no hourly billing.',
  },
  {
    question: 'How many logo concepts will I receive?',
    answer: 'We present 3–4 distinct logo concepts per project, each exploring a different visual direction. After you choose a direction, we refine through unlimited revision rounds until you are completely satisfied. You won\'t be locked into a concept that doesn\'t feel right.',
  },
  {
    question: 'What file formats are included with my logo?',
    answer: 'You receive every file format you will ever need: SVG, PNG (transparent & white backgrounds), PDF, EPS, and AI source files. We also provide light and dark variants, with and without tagline, and social media-optimized sizes for profile pictures and cover photos.',
  },
  {
    question: 'Can my logo be trademarked?',
    answer: 'Yes. Every logo we design is 100% original — no stock icons, no clip art, no templates. Original custom logos are eligible for trademark registration in Canada through the Canadian Intellectual Property Office (CIPO). We recommend consulting a trademark lawyer for formal registration.',
  },
  {
    question: 'Do you also design business cards and websites to match?',
    answer: 'Yes — brand consistency across every touchpoint is our specialty. Once your logo is finalized, we can extend the identity to business cards, letterhead, email signatures, and your full website. Everything will share the same visual language and feel like one unified brand.',
  },
];

const LogoDesignService = () => {
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-star" style={{ top: '6%', left: '5%' }}></div>
        <div className="bg-star" style={{ top: '11%', left: '18%' }}></div>
        <div className="bg-star" style={{ top: '8%', left: '32%' }}></div>
        <div className="bg-star" style={{ top: '15%', left: '47%' }}></div>
        <div className="bg-star" style={{ top: '5%', left: '60%' }}></div>
        <div className="bg-star" style={{ top: '13%', left: '73%' }}></div>
        <div className="bg-star" style={{ top: '10%', left: '86%' }}></div>
        <div className="bg-star" style={{ top: '17%', left: '93%' }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 mb-6 mx-auto"></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-6">
            <span className="font-light opacity-90">Professional </span>
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Logo Design</span>
            <span className="block font-light opacity-90 mt-2">& Brand Identity</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light tracking-[0.01em] mb-8">
            Custom brand identity design for Toronto & GTA businesses. From logo creation to complete brand guidelines, we craft visual identities that make your business unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                <Link href="/contact" className="flex items-center gap-2 relative z-10 group-hover:text-white">
                  <span className="relative z-10">Start Your Brand</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                </Link>
              </Button>
            </div>
            <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                <Link href="/pricing" className="flex items-center gap-2 relative z-10 group-hover:text-white">
                  <span className="relative z-10">View Pricing</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                  <span className="absolute inset-0 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 relative z-10">
        {/* What We Offer */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">What We</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Offer</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-300/20 via-purple-300/20 to-cyan-300/20 border border-cyan-500/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:border-cyan-400/50 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-cyan-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Zenara */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Why Choose</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Zenara Designs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-white/50 text-sm mb-4 font-light">Explore related services</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Business Cards', href: '/services/business-cards' },
                { label: 'Web Design', href: '/services/web-design' },
                { label: 'SEO Services', href: '/services/seo' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center text-cyan-400 hover:text-purple-400 transition-colors text-sm font-medium group/link"
                >
                  {link.label}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-8 sm:mb-12 text-center leading-[1.1] tracking-[-0.04em]">
            <span className="block font-light opacity-90">Frequently Asked</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">{faq.question}</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-light">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Ready for a Brand</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">That Stands Out?</span>
              </h2>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Your logo is the face of your business. Let us design a brand identity that captures your vision and leaves a lasting impression on every customer.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                    <Link href="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        Book Free Consultation
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
                <div className="relative rounded-full p-[2px] bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                    <Link href="/pricing" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        See Pricing Plans
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

      {/* Breadcrumb Schema */}
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: 'Logo Design', url: '/services/logo-design' },
        ]}
      />
      <StructuredData
        type="serviceOffering"
        services={[
          {
            name: 'Logo Design & Brand Identity Toronto',
            description: 'Professional logo design and brand identity for Toronto & GTA businesses. Custom logos, colour palettes, typography, and complete brand guidelines with unlimited revisions.',
            features: ['Custom Logo Creation', 'Color Psychology', 'Typography Selection', 'Brand Guidelines', 'Visual Identity System', 'Multi-Format Delivery'],
            emoji: '✏️',
          },
        ]}
      />
      <StructuredData
        type="faq"
        faqs={faqs}
      />
    </div>
  );
};

export default LogoDesignService;
