import Link from 'next/link';
import { ArrowRight, MapPin, Wrench, FileText, BarChart3, Search, Globe, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StructuredData from '@/components/StructuredData';

const features = [
  {
    icon: MapPin,
    title: 'Local SEO',
    description: 'Dominate Google Maps and local search results for Toronto & GTA queries. Google Business Profile optimization, local citations, and geo-targeted content strategies.',
  },
  {
    icon: Wrench,
    title: 'Technical SEO',
    description: 'Site speed optimization, crawlability audits, structured data markup, XML sitemaps, Core Web Vitals tuning, and mobile-first indexing compliance.',
  },
  {
    icon: FileText,
    title: 'Content Strategy',
    description: 'Keyword-researched content plans, blog calendars, landing page copy, and topic clusters that establish topical authority and drive organic traffic.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Monthly reports with ranking positions, traffic growth, conversion tracking, and ROI analysis. Data-driven insights that prove every dollar is working.',
  },
  {
    icon: Search,
    title: 'Keyword Research',
    description: 'In-depth keyword analysis identifying high-intent, low-competition opportunities specific to your industry and GTA market. We find the searches your competitors miss.',
  },
  {
    icon: Globe,
    title: 'On-Page Optimization',
    description: 'Title tags, meta descriptions, header hierarchy, internal linking, image alt text, and content optimization. Every page is tuned for maximum search visibility.',
  },
  {
    icon: TrendingUp,
    title: 'Link Building',
    description: 'White-hat backlink acquisition through digital PR, guest posting, local directories, and industry partnerships. Authority-building strategies that Google rewards.',
  },
  {
    icon: Target,
    title: 'Competitor Analysis',
    description: 'Detailed competitive audits revealing your competitors\' ranking strategies, content gaps, and backlink profiles. Turn their weaknesses into your opportunities.',
  },
];

const differentiators = [
  {
    title: 'GTA-Focused Expertise',
    description: 'We specialize in Toronto and GTA markets. Our local SEO strategies are built on deep knowledge of how Canadians search and what Google prioritizes for Ontario businesses.',
  },
  {
    title: 'No Long-Term Contracts',
    description: 'Our results speak for themselves. We earn your business every month with transparent reporting and measurable improvements — no lock-in periods required.',
  },
  {
    title: 'SEO + Web Design Integration',
    description: 'Unlike agencies that bolt SEO onto existing sites, we build it into the foundation. Sites designed and developed by us are optimized from the first line of code.',
  },
  {
    title: 'White-Hat Only',
    description: 'No shortcuts, no black-hat tricks, no PBNs. We follow Google\'s guidelines to the letter because sustainable rankings beat temporary spikes every time.',
  },
];

const faqs = [
  {
    question: 'How long does SEO take to show results in Toronto?',
    answer: 'Most Toronto businesses start seeing meaningful ranking improvements within 3–6 months of starting SEO. Local SEO and Google Business Profile optimization can show results faster — sometimes within 4–8 weeks. Technical fixes like site speed and structured data improvements can have an immediate positive impact on Core Web Vitals scores.',
  },
  {
    question: 'Do you offer local SEO for GTA businesses?',
    answer: 'Yes — local SEO is our specialty. We optimize your Google Business Profile, build local citations on Canadian directories, create geo-targeted landing pages, and implement LocalBusiness schema markup. Our strategies are built specifically for Toronto, Mississauga, Brampton, Vaughan, Markham, and surrounding GTA markets.',
  },
  {
    question: 'What is included in a free SEO audit?',
    answer: 'Our free SEO audit covers technical health (crawlability, site speed, Core Web Vitals, mobile usability), on-page factors (title tags, meta descriptions, heading structure), local SEO signals (Google Business Profile, citations), and a keyword gap analysis against your top 3 Toronto competitors. You receive a written report with prioritized action items.',
  },
  {
    question: 'Do you require long-term SEO contracts?',
    answer: 'No. We work month-to-month with no lock-in periods. Our results earn your continued business rather than a contract keeping you in place. We do recommend committing to at least 3–6 months to see meaningful results — SEO is a long-term investment — but you are free to cancel any time.',
  },
  {
    question: 'Can you do SEO for a website you didn\'t build?',
    answer: 'Absolutely. We perform SEO on any website — WordPress, Squarespace, Wix, custom-built, or any other platform. If your site has significant technical limitations, we will flag them with recommendations. For maximum results, a Next.js rebuild eliminates technical SEO barriers entirely, but it is not required to start improving your rankings.',
  },
];

const SeoService = () => {
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
        <div className="bg-star" style={{ top: '5%', left: '6%' }}></div>
        <div className="bg-star" style={{ top: '12%', left: '19%' }}></div>
        <div className="bg-star" style={{ top: '7%', left: '33%' }}></div>
        <div className="bg-star" style={{ top: '16%', left: '46%' }}></div>
        <div className="bg-star" style={{ top: '9%', left: '59%' }}></div>
        <div className="bg-star" style={{ top: '14%', left: '72%' }}></div>
        <div className="bg-star" style={{ top: '6%', left: '85%' }}></div>
        <div className="bg-star" style={{ top: '11%', left: '96%' }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 mb-6 mx-auto"></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-6">
            <span className="font-light opacity-90">Search Engine </span>
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Optimization</span>
            <span className="block font-light opacity-90 mt-2">for Toronto Businesses</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light tracking-[0.01em] mb-8">
            Data-driven SEO services that put your business on page one. Local SEO, technical optimization, content strategy, and measurable ranking improvements across the GTA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                <Link href="/contact" className="flex items-center gap-2 relative z-10 group-hover:text-white">
                  <span className="relative z-10">Get A Free SEO Audit</span>
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
                { label: 'Web Design', href: '/services/web-design' },
                { label: 'E-Commerce', href: '/services/ecommerce' },
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
                <span className="block font-light opacity-90">Ready to Rank on</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Page One?</span>
              </h2>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Get a free SEO audit and discover exactly where your website stands today — and a roadmap to get it ranking where it deserves.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                    <Link href="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        Get Free SEO Audit
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
          { name: 'SEO Services', url: '/services/seo' },
        ]}
      />
      <StructuredData
        type="serviceOffering"
        services={[
          {
            name: 'SEO Services Toronto',
            description: 'Professional SEO services for Toronto & GTA businesses. Local SEO, technical optimization, keyword research, and Google ranking improvements. Month-to-month, no contracts.',
            features: ['Local SEO', 'Technical SEO', 'Content Strategy', 'Keyword Research', 'On-Page Optimization', 'Link Building'],
            emoji: '🔍',
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

export default SeoService;
