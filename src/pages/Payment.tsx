import { memo, useMemo } from 'react';
import { Check, Star, CreditCard, ArrowRight } from 'lucide-react';
import { useScrollToTop, useSEO } from '@/hooks';

interface SubscriptionPlan {
  id: string;
  name: string;
  emoji: string;
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
      emoji: '🌱',
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
      emoji: '⚡',
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
      emoji: '👑',
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
    <div className="min-h-screen" role="main" aria-label="Payment page">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle"></div>
          <div className="absolute top-32 right-24 w-1 h-1 bg-purple-300 rounded-full animate-twinkle delay-1000"></div>
          <div className="absolute top-48 left-1/3 w-1 h-1 bg-teal-300 rounded-full animate-twinkle delay-2000"></div>
          <div className="absolute top-24 right-1/3 w-1 h-1 bg-violet-300 rounded-full animate-twinkle delay-500"></div>
          
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 mb-5 sm:mb-6 md:mb-8 border border-cyan-500/30">
              <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-cyan-400 animate-pulse flex-shrink-0" />
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-cyan-300">Hosting & Maintenance</span>
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white px-2">
              Choose Your <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Subscription Plan</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed px-4">
              Reliable hosting and maintenance for your website. Fully managed, secure, and optimized.
            </p>
          </div>

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 pt-4 sm:pt-6">
            {subscriptionPlans.map((plan) => {
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
                  
                  <div className={`pricing-card bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 border shadow-2xl transition-all duration-500 min-h-[550px] sm:min-h-[600px] flex flex-col relative overflow-hidden lg:group-hover:-translate-y-2 ${
                    plan.popular 
                      ? 'border-2 border-cyan-400 shadow-cyan-500/30 lg:hover:shadow-cyan-500/40' 
                      : 'border border-white/20 lg:hover:shadow-cyan-500/20'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-center mb-6 sm:mb-8 flex-shrink-0">
                        <div className="text-4xl mb-3">{plan.emoji}</div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">{plan.name}</h3>
                        <div className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 text-white">
                          ${plan.monthlyPrice}
                          <span className="text-lg sm:text-xl text-slate-400">
                            /month
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm sm:text-base mt-3">{plan.bestFor}</p>
                      </div>

                      <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex-shrink-0">
                        {/* Custom Subscribe Button */}
                        <a
                          href={plan.checkoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-block rounded-full p-[4px] transition-all duration-300 w-full group/button bg-gradient-to-r from-cyan-500 via-purple-600 to-violet-500 hover:from-cyan-600 hover:via-purple-700 hover:to-violet-600"
                        >
                          <span
                            className="w-full block bg-black hover:bg-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 group-hover/button:scale-105"
                          >
                            Subscribe Now
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover/button:translate-x-1" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional Note */}
          <div className="mt-8 sm:mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl max-w-3xl mx-auto">
              <p className="text-slate-300 text-sm sm:text-base">
                <em>Complex custom development, e-commerce, and major redesigns are quoted separately.</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Payment);
