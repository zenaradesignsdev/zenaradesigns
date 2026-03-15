import Link from 'next/link';
import { ArrowRight, Server, Shield, Database, Globe, Activity, Headphones, RefreshCw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StructuredData from '@/components/StructuredData';

const features = [
  {
    icon: Server,
    title: 'Managed Hosting',
    description: 'Enterprise-grade infrastructure managed entirely by our team. No cPanel confusion, no server admin headaches — we handle everything so you can focus on your business.',
  },
  {
    icon: Shield,
    title: 'SSL & Security',
    description: 'Free SSL certificates, firewall protection, malware scanning, DDoS mitigation, and automated security patches. Your site stays protected against evolving threats.',
  },
  {
    icon: Database,
    title: 'Daily Backups',
    description: 'Automated daily backups with 30-day retention and one-click restore. Redundant off-site storage ensures your data is safe even in worst-case scenarios.',
  },
  {
    icon: Globe,
    title: 'Global CDN',
    description: 'Content delivery network with edge servers across North America and worldwide. Visitors in Toronto and Tokyo both get sub-second load times.',
  },
  {
    icon: Activity,
    title: 'Uptime Monitoring',
    description: '99.9% uptime SLA with 24/7 monitoring and instant alert systems. If anything goes wrong, we know about it before you do — and we fix it fast.',
  },
  {
    icon: Headphones,
    title: 'Priority Support',
    description: 'Direct access to our technical team — not a chatbot. Email, phone, and chat support with guaranteed response times for hosted clients.',
  },
  {
    icon: RefreshCw,
    title: 'Software Updates',
    description: 'Proactive dependency updates, framework patches, and security fixes applied during low-traffic windows. Your site stays current without breaking changes.',
  },
  {
    icon: Zap,
    title: 'Performance Tuning',
    description: 'Ongoing server-side optimization, caching strategies, image compression, and Core Web Vitals monitoring. Your site gets faster over time, not slower.',
  },
];

const differentiators = [
  {
    title: 'Built for Next.js',
    description: 'Our hosting infrastructure is optimized specifically for Next.js and React applications — not a generic shared hosting environment trying to run everything.',
  },
  {
    title: 'Design + Hosting, One Team',
    description: 'When the team that built your site also hosts it, issues get resolved 10x faster. No finger-pointing between your designer and your hosting provider.',
  },
  {
    title: 'Transparent Pricing',
    description: 'Plans from $45/month with no hidden bandwidth fees, no surprise overage charges, and no annual price hikes. What you see is what you pay.',
  },
  {
    title: 'Migration Included',
    description: 'Moving from another host? We handle the entire migration — DNS, email, SSL, and content — with zero downtime and zero cost.',
  },
];

const HostingService = () => {
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
        <div className="bg-star" style={{ top: '4%', left: '8%' }}></div>
        <div className="bg-star" style={{ top: '10%', left: '21%' }}></div>
        <div className="bg-star" style={{ top: '6%', left: '36%' }}></div>
        <div className="bg-star" style={{ top: '14%', left: '49%' }}></div>
        <div className="bg-star" style={{ top: '8%', left: '63%' }}></div>
        <div className="bg-star" style={{ top: '17%', left: '76%' }}></div>
        <div className="bg-star" style={{ top: '5%', left: '89%' }}></div>
        <div className="bg-star" style={{ top: '13%', left: '97%' }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 mb-6 mx-auto"></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-[1.1] tracking-[-0.04em] mb-6">
            <span className="font-light opacity-90">Managed </span>
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">Web Hosting</span>
            <span className="block font-light opacity-90 mt-2">& Maintenance</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light tracking-[0.01em] mb-8">
            99.9% uptime, SSL, CDN, daily backups, and priority support — all managed by the same team that built your site. Hosting plans from $45/month for Toronto businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                <Link href="/contact" className="flex items-center gap-2 relative z-10 group-hover:text-white">
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                </Link>
              </Button>
            </div>
            <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600">
              <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold group">
                <Link href="/pricing" className="flex items-center gap-2 relative z-10 group-hover:text-white">
                  <span className="relative z-10">View Plans</span>
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
                { label: 'SEO Services', href: '/services/seo' },
                { label: 'View Pricing', href: '/pricing' },
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

        {/* CTA Section */}
        <section>
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Stop Worrying About</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Your Website</span>
              </h2>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Let us handle the servers, security, and updates while you focus on running your business. Managed hosting that gives you peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                    <Link href="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        Get Started Today
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
                        Compare Plans
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
          { name: 'Web Hosting', url: '/services/hosting' },
        ]}
      />
    </div>
  );
};

export default HostingService;
