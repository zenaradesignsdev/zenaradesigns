import { memo, useMemo } from 'react';
import { Check, Star, ArrowRight, Layers, Rocket, Gem } from 'lucide-react';
import { useScrollToTop, useSEO } from '@/hooks';
import { Button } from '@/components/ui/button';

interface SubscriptionPlan {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  monthlyPrice: number;
  features: string[];
  bestFor: string;
  popular?: boolean;
  checkoutUrl: string;
}

const Payment = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Subscription Plans | Hosting & Maintenance | Zenara Designs",
    description: "Choose your hosting and maintenance plan. Zenara Core ($45/mo), Grow ($70/mo), or Prime ($150/mo). Secure, reliable, and fully managed.",
    canonical: "https://zenaradesigns.com/payments",
    noindex: true // Private page, don't index
  });

  const subscriptionPlans = useMemo<SubscriptionPlan[]>(() => [
    {
      id: 'core',
      name: 'Zenara Core',
      icon: Layers,
      monthlyPrice: 45,
      features: [
        'Managed hosting (modern stack) + SSL',
        'Monitoring + basic security checks',
        'Daily backups + restore support',
        '30 min/month minor updates + email support (1–2 business days)'
      ],
      bestFor: 'Simple sites, portfolios, new businesses',
      popular: false,
      checkoutUrl: 'https://buy.stripe.com/00wcN51rN05R1VJ93D9sk00'
    },
    {
      id: 'grow',
      name: 'Zenara Grow',
      icon: Rocket,
      monthlyPrice: 70,
      features: [
        'Everything in Core, plus:',
        'Monthly performance check + light optimization (speed, UX, small fixes)',
        'Lead form monitoring (submission tests + alerts if something breaks)',
        'Google Analytics setup + monthly traffic summary',
        '60 min/month updates (text, images, links, small section tweaks)',
        'Priority support (1 business day)'
      ],
      bestFor: 'Professional individuals, local businesses, service providers',
      popular: true,
      checkoutUrl: 'https://buy.stripe.com/aFafZhgmH19V6bZ7Zz9sk01'
    },
    {
      id: 'prime',
      name: 'Zenara Prime',
      icon: Gem,
      monthlyPrice: 150,
      features: [
        'Everything in Grow, plus:',
        'Advanced performance tuning (Core Web Vitals)',
        'Integrations support (booking, email, CRM, payments)',
        '120 min/month updates + simple new pages/sections (within included time)',
        'Same-day support'
      ],
      bestFor: 'High-conversion sites, coaches, growing brands',
      popular: false,
      checkoutUrl: 'https://buy.stripe.com/8x200jgmH3i37g36Vv9sk02'
    }
  ], []);

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

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block font-light opacity-90">Choose Your</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Subscription Plan</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Reliable hosting and maintenance for your website. Fully managed, secure, and optimized.
            </p>
          </div>

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12">
            {subscriptionPlans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <div key={plan.id} className={`group relative ${plan.popular ? 'lg:scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-1.5 sm:space-x-2 shadow-2xl whitespace-nowrap">
                        <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current flex-shrink-0" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={`bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border shadow-2xl transition-all duration-500 min-h-[550px] sm:min-h-[600px] flex flex-col relative overflow-hidden lg:group-hover:-translate-y-2 ${
                    plan.popular 
                      ? 'border-cyan-400/50 shadow-cyan-500/20 lg:hover:shadow-cyan-500/30' 
                      : 'border-slate-800/50 lg:hover:shadow-cyan-500/20'
                  }`}>
                    {/* Box glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
                    
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                          <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-white relative z-10" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-semibold mb-2 text-white tracking-tight">
                          <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{plan.name}</span>
                        </h3>
                        <div className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4">
                          <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            ${plan.monthlyPrice}
                          </span>
                          <span className="text-lg sm:text-xl text-white/60 font-light">
                            /month
                          </span>
                        </div>
                        <p className="text-white/60 text-sm sm:text-base mt-3 font-light">{plan.bestFor}</p>
                      </div>

                      <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex-shrink-0">
                        {/* Custom Subscribe Button */}
                        <div className="relative w-full rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                          <a
                            href={plan.checkoutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold w-full flex items-center justify-center gap-2 group/button"
                          >
                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                            <span className="flex items-center justify-center relative z-10 group-hover/button:text-white whitespace-nowrap">
                              Subscribe Now
                              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover/button:translate-x-1" />
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional Note */}
          <div className="mt-8 sm:mt-12 text-center">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              <p className="text-white/60 text-sm sm:text-base font-light relative z-10">
                <em>Complex custom development, e-commerce, and major redesigns are quoted separately.</em>
              </p>
            </div>
          </div>

          {/* Hosting Only Option - Simple, Less Prominent */}
          <div className="mt-8 sm:mt-12 text-center max-w-2xl mx-auto">
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 relative overflow-hidden">
              {/* Box glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 relative z-10 tracking-tight">
                <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Hosting Only</span>
              </h3>
              <p className="text-white/60 text-sm sm:text-base mb-4 font-light relative z-10">Basic hosting without maintenance services</p>
              <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
                <span className="text-2xl sm:text-3xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">$20</span>
                </span>
                <span className="text-white/60 text-sm sm:text-base font-light">/month</span>
              </div>
              <div className="relative w-full sm:w-auto rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 mx-auto inline-block relative z-10">
                <a
                  href="https://buy.stripe.com/14A3cv5I38Cn1VJdjT9sk03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-2.5 sm:py-3 text-sm font-semibold w-full sm:w-auto flex items-center justify-center gap-2 group/button"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                  <span className="flex items-center justify-center relative z-10 group-hover/button:text-white whitespace-nowrap">
                    Subscribe to Hosting
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Payment);
