import Link from 'next/link';
import { ArrowRight, Printer, Gem, Palette, Clock, Layers, Ruler, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StructuredData from '@/components/StructuredData';

const features = [
  {
    icon: Printer,
    title: 'Print-Ready Files',
    description: 'CMYK-optimized, bleed-included, 300 DPI files ready for any professional printer. No back-and-forth with print shops — your files are production-perfect from day one.',
  },
  {
    icon: Gem,
    title: 'Premium Materials',
    description: 'We design for premium stocks: thick 16pt cardstock, soft-touch lamination, spot UV, foil stamping, and letterpress. Your card should feel as impressive as it looks.',
  },
  {
    icon: Palette,
    title: 'Brand-Consistent Design',
    description: 'Every card aligns perfectly with your existing brand identity — same colours, typography, and visual language. Consistency builds recognition and trust.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Design concepts delivered within 3-5 business days. Rush options available for urgent networking events, conferences, or business launches.',
  },
  {
    icon: Layers,
    title: 'Double-Sided Layouts',
    description: 'Strategic front and back designs that maximize the 3.5" x 2" real estate. Key info on front, differentiators on back — every square millimetre works for you.',
  },
  {
    icon: Ruler,
    title: 'Custom Sizes & Shapes',
    description: 'Standard, square, mini, rounded corners, die-cut — we design for any format. Stand out from the stack with a card shape that matches your brand personality.',
  },
  {
    icon: Sparkles,
    title: 'Finishing Options',
    description: 'Matte, gloss, soft-touch, spot UV, embossing, debossing, edge painting, and foil. We guide you through finishing options that elevate your card from good to unforgettable.',
  },
  {
    icon: CheckCircle,
    title: 'Print Vendor Coordination',
    description: 'We work directly with trusted GTA print vendors to ensure colour accuracy and quality control. Optional print management so you don\'t have to worry about a thing.',
  },
];

const differentiators = [
  {
    title: 'Design + Print Expertise',
    description: 'We understand both digital design and print production. Your card is designed with print constraints in mind, eliminating costly reprints and colour mismatches.',
  },
  {
    title: 'Brand Package Integration',
    description: 'Already working on your logo or website with us? Your business cards integrate seamlessly into your complete brand identity for maximum impact.',
  },
  {
    title: 'Multiple Design Concepts',
    description: 'We present 3-4 unique concepts per project. You\'re not stuck with one direction — explore options and choose the design that resonates most.',
  },
  {
    title: 'Lifetime Source Files',
    description: 'You own every file we create. AI, PSD, PDF, and print-ready files are yours forever — update contact info, reprint anytime, no extra licensing fees.',
  },
];

const faqs = [
  {
    question: 'How much does professional business card design cost in Toronto?',
    answer: 'Business card design at Zenara Designs starts at $150 for a single-sided card and ranges to $400+ for a double-sided premium design with multiple concepts. Print costs are separate and depend on quantity, stock, and finishing options. We can coordinate with GTA print vendors on your behalf.',
  },
  {
    question: 'What file formats do I receive for printing?',
    answer: 'You receive print-ready PDF files with crop marks and bleed, CMYK-optimized files at 300 DPI, and full-resolution PNG exports. We also provide all source files (AI, PSD) so you own your design forever and can reprint or update contact information at any time.',
  },
  {
    question: 'Can you match my existing brand colours and fonts?',
    answer: 'Absolutely. Every card we design is built on your existing brand identity — matching exact Pantone/CMYK colour codes, typefaces, logo usage, and visual style. If you don\'t have brand guidelines yet, we can develop your full identity alongside the card design.',
  },
  {
    question: 'How fast can you design my business cards?',
    answer: 'Design concepts are typically delivered within 3–5 business days. Rush turnaround (24–48 hours) is available for time-sensitive events like conferences or networking functions. Reach out with your deadline and we will confirm availability before booking.',
  },
  {
    question: 'Do you offer premium finishes like spot UV or foil?',
    answer: 'Yes. We design for premium finishing options including spot UV coating, foil stamping (gold, silver, rose gold), soft-touch lamination, embossing, debossing, edge painting, and letterpress. We guide you through the options that will best complement your brand and budget.',
  },
];

const BusinessCardsService = () => {
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
        <div className="bg-star" style={{ top: '7%', left: '4%' }}></div>
        <div className="bg-star" style={{ top: '9%', left: '17%' }}></div>
        <div className="bg-star" style={{ top: '5%', left: '30%' }}></div>
        <div className="bg-star" style={{ top: '13%', left: '44%' }}></div>
        <div className="bg-star" style={{ top: '8%', left: '57%' }}></div>
        <div className="bg-star" style={{ top: '16%', left: '70%' }}></div>
        <div className="bg-star" style={{ top: '11%', left: '83%' }}></div>
        <div className="bg-star" style={{ top: '6%', left: '94%' }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 mb-6 mx-auto"></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-6">
            <span className="font-light opacity-90">Premium </span>
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Business Cards</span>
            <span className="block font-light opacity-90 mt-2">That Leave an Impression</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light tracking-[0.01em] mb-8">
            Print-ready business card designs for Toronto & GTA professionals. Premium materials, brand-consistent design, and fast turnaround — your first impression, perfected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                <Link href="/contact" className="flex items-center gap-2 relative z-10 group-hover:text-white">
                  <span className="relative z-10">Get A Quote</span>
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
                { label: 'Logo Design', href: '/services/logo-design' },
                { label: 'Web Design', href: '/services/web-design' },
                { label: 'Web Hosting', href: '/services/hosting' },
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
                <span className="block font-light opacity-90">Make Every Handshake</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Count</span>
              </h2>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                A great business card is a conversation starter. Let us design cards that represent you with the same professionalism you bring to every meeting.
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
          { name: 'Business Cards', url: '/services/business-cards' },
        ]}
      />
      <StructuredData
        type="serviceOffering"
        services={[
          {
            name: 'Business Card Design Toronto',
            description: 'Professional business card design for Toronto & GTA professionals. Premium print-ready designs with spot UV, foil, and soft-touch options. 3–5 day turnaround.',
            features: ['Print-Ready Files', 'Premium Materials', 'Brand-Consistent Design', 'Fast Turnaround', 'Double-Sided Layouts', 'Finishing Options'],
            emoji: '🃏',
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

export default BusinessCardsService;
