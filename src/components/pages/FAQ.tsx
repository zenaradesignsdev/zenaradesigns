import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  ChevronDown,
  ArrowRight,
  DollarSign,
  Clock,
  Zap,
  Shield,
  Rocket
} from 'lucide-react';
import { faqSections as faqContent } from '@/lib/faq-data';

const FAQ = () => {
  // Re-attach section icons to the shared FAQ content (kept icon-free in the
  // data module so it can be imported by the server component for SSR schema).
  const sectionIcons = [DollarSign, Clock, Zap, Shield, Rocket];
  const faqSections = faqContent.map((section, index) => ({
    ...section,
    icon: sectionIcons[index] ?? DollarSign,
  }));

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
            <span className="block font-light opacity-90">Everything You Need to</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Know</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
            Get answers to common questions about our web design, business card, and logo design services in Toronto & GTA
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12 sm:space-y-16">
          {faqSections.map((section, sectionIndex) => {
            const IconComponent = section.icon;
            return (
              <div key={sectionIndex} className="space-y-6">
                {/* Section Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center shadow-lg">
                    <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-cyan-400/30 blur-md opacity-70 animate-pulse rounded-xl"></div>
                    <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white relative z-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight">
                    <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">{section.title}</span>
                  </h2>
                </div>

                {/* FAQ Accordion */}
                <Accordion type="single" collapsible className="w-full space-y-4 sm:space-y-6">
                  {section.faqs.map((faq, faqIndex) => {
                    const itemValue = `${sectionIndex}-${faqIndex}`;
                    return (
                      <AccordionItem 
                        key={faqIndex} 
                        value={itemValue}
                        className="border border-slate-800/50 rounded-xl bg-slate-900/90 backdrop-blur-sm data-[state=open]:bg-gradient-to-r data-[state=open]:from-cyan-500/20 data-[state=open]:via-purple-500/20 data-[state=open]:to-cyan-500/20 data-[state=open]:border-cyan-500/50 transition-all duration-200 relative overflow-hidden min-h-[80px] sm:min-h-[90px] flex flex-col"
                      >
                        {/* Gradient vertical bar on the left */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-300 via-purple-300 to-cyan-300 rounded-l-xl z-10"></div>
                        <AccordionTrigger 
                          className="px-4 sm:px-6 py-4 sm:py-5 hover:no-underline text-left data-[state=open]:text-white data-[state=closed]:text-white/80 relative overflow-hidden group w-full min-h-[80px] sm:min-h-[90px] flex items-center pl-5 sm:pl-7"
                        >
                          {/* Hover background animation - left to right */}
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-xl"></div>
                          <span className="font-light text-base sm:text-lg pr-4 flex-1 relative z-10 group-hover:text-white transition-colors duration-300">{faq.question}</span>
                          <ChevronDown className="h-5 w-5 shrink-0 data-[state=closed]:text-white/60 data-[state=open]:text-white group-hover:text-white transition-all duration-200 relative z-10" />
                        </AccordionTrigger>
                        <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-5 text-white/60 text-sm sm:text-base leading-[1.7] font-light tracking-[0.01em]">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            {/* Box glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full animate-pulse"></div>
                <span className="text-cyan-300 font-light text-lg sm:text-xl">
                  Still have questions? We're here to help!
                </span>
              </div>
              <p className="text-white/60 mb-8 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
                Can't find the answer you're looking for? Our team is ready to help you with your web design needs.
              </p>
              <div className="flex justify-center">
                <div className="relative w-full sm:w-auto rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                  <Button asChild className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold w-full sm:w-auto group">
                    <Link href="/contact" className="flex items-center justify-center">
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white whitespace-nowrap">
                        Contact Us Today
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FAQPage + breadcrumb JSON-LD are server-rendered in src/app/faq/page.tsx */}
    </div>
  );
};

export default FAQ;
