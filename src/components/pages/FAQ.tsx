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
import StructuredData from '@/components/StructuredData';

const FAQ = () => {
  // Compiled FAQs from all pages
  const faqSections = [
    {
      title: "Pricing & Packages",
      icon: DollarSign,
      faqs: [
        {
          question: "What are your web design packages and pricing?",
          answer: "We offer three main packages: Starter ($999) for individuals with 1-3 pages and 1 week turnaround, Small Business ($1,999) for businesses with up to 6 pages and 2-3 weeks turnaround, and Pro ($4,999+) for advanced functionality with unlimited pages and 3-4 weeks turnaround. All include mobile-responsive design, SEO optimization, and SSL security."
        },
        {
          question: "Do you offer payment plans?",
          answer: "Yes! We offer 50% upfront and 50% on completion for all projects. For Pro projects over $10k, we can discuss custom payment schedules. We accept e-transfers, cheques, and credit cards."
        },
        {
          question: "What's included in each pricing plan?",
          answer: "Starter includes 1-3 pages and basic features. Small Business includes up to 6 pages with custom sections and 2 revisions. Pro includes unlimited pages, advanced integrations, and priority support. All plans include mobile optimization, SEO basics, SSL security, and hosting."
        },
        {
          question: "Are there any hidden costs?",
          answer: "No hidden costs! Our pricing is transparent and includes everything listed. The only additional costs would be if you request features beyond what's included in your chosen plan, and we'll always discuss these upfront."
        },
        {
          question: "Can I upgrade my plan during the project?",
          answer: "Absolutely! You can upgrade from Starter to Small Business or Pro at any time. We'll adjust the pricing accordingly and add the new features to your project."
        },
        {
          question: "Do you provide business card design services?",
          answer: "Yes! We offer professional business card design services across the GTA. Our packages range from $149-$399 for professional cards and $299-$599 for executive cards with premium finishes like foil stamping and embossing."
        }
      ]
    },
    {
      title: "Process & Timeline",
      icon: Clock,
      faqs: [
        {
          question: "How long does it take to build a website?",
          answer: "Most websites are completed within 2-4 weeks, depending on complexity and requirements. Simple sites can be ready in 1-2 weeks, while more complex projects with custom features may take 3-4 weeks. Our specific timelines are: Starter (1 week), Small Business (2-3 weeks), and Pro (3-4 weeks). We work efficiently while ensuring quality results."
        },
        {
          question: "What's your design process?",
          answer: "We follow a proven 6-step process: Discovery & Planning, Design & Wireframes, Development & Coding, Content Integration, Testing & Optimization, and Launch & Support. We keep you involved throughout each step to ensure the final product meets your vision."
        },
        {
          question: "How many revisions are included?",
          answer: "Starter includes 1 round of revisions, Small Business includes 2 rounds, and Pro includes unlimited revisions. Additional revision rounds can be purchased if needed."
        },
        {
          question: "What if I need changes after launch?",
          answer: "All plans include post-launch support (14-60 days depending on plan). After that, we offer maintenance packages for ongoing updates, security, and support."
        },
        {
          question: "What's included in your web design package?",
          answer: "Our packages include custom design, fully responsive development, SEO optimization, SSL security setup, performance optimization, and post-launch support. We also provide brand guidelines, logo design options, and business card design as part of our comprehensive service."
        }
      ]
    },
    {
      title: "Services & Features",
      icon: Zap,
      faqs: [
        {
          question: "Can you help with e-commerce development?",
          answer: "Yes! We specialize in e-commerce development using platforms like Shopify, WooCommerce, and custom solutions. Small e-commerce stores start at $2,999-$4,999, with enterprise solutions available by quote."
        },
        {
          question: "What's included in logo design services?",
          answer: "Our logo design services include 3 initial concepts, unlimited revisions, vector and raster formats, brand guidelines, and usage rights. Basic logo design starts at $99-$199, with complete brand identity available by quote."
        },
        {
          question: "Do you offer SEO services?",
          answer: "Absolutely! We provide comprehensive SEO services including keyword research, on-page optimization, local SEO, Google My Business optimization, and ongoing SEO maintenance to improve search rankings."
        },
        {
          question: "What industries do you serve?",
          answer: "We serve all industries across the GTA including restaurants, real estate, healthcare, legal services, retail, professional services, nonprofits, and startups. Our experience spans Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington."
        },
        {
          question: "What makes your websites different?",
          answer: "We focus on business results, not just aesthetics. Every design decision is made with conversion optimization in mind. We use modern, fast-loading technologies, ensure mobile-first responsive design, and build with SEO best practices from day one. Plus, you get direct access to our team throughout the project."
        }
      ]
    },
    {
      title: "Technical & Support",
      icon: Shield,
      faqs: [
        {
          question: "Do you provide hosting and maintenance?",
          answer: "Yes! We offer comprehensive hosting solutions with 99.9% uptime guarantee, automated backups, and ongoing maintenance support. Our hosting plans include SSL certificates, CDN integration, and 24/7 monitoring. We also provide monthly maintenance packages for updates and support. Hosting can be handled internally for $10-$30/month (SSL included) or we can help you set up with external providers."
        },
        {
          question: "Do you handle hosting and domain setup?",
          answer: "Yes! We can handle hosting internally for $10-$30/month (SSL included) or help you set up with external providers. We also assist with domain registration and DNS setup."
        },
        {
          question: "What happens if I'm not satisfied with the design?",
          answer: "We work closely with you throughout the process to ensure you love the result. If you're not satisfied, we'll work with you to make it right. Our goal is your success and satisfaction."
        },
        {
          question: "Do you provide website maintenance services?",
          answer: "Yes! We offer ongoing website maintenance services including security updates, content updates, performance optimization, backup management, and technical support. Our maintenance plans start at $99/month."
        },
        {
          question: "Can you help with existing websites?",
          answer: "We can assist with existing websites if they use a similar technology stack to our preferred modern frameworks. If your current site uses a different technology stack, we typically recommend building a new site with our modern approach for optimal performance and maintainability."
        },
        {
          question: "What are CASL compliance requirements?",
          answer: "Canada's Anti-Spam Legislation (CASL) requires explicit consent for commercial emails. We ensure all contact forms and email marketing integrations comply with CASL, including proper consent mechanisms, unsubscribe options, and sender identification."
        },
        {
          question: "What hosting locations work best for Toronto traffic?",
          answer: "We recommend hosting with Canadian data centers or US East Coast servers for optimal Toronto performance. This reduces latency to under 50ms for GTA users. We use CDN services with Toronto edge locations."
        }
      ]
    },
    {
      title: "Toronto & GTA Specific",
      icon: Rocket,
      faqs: [
        {
          question: "What makes your agency different in Toronto?",
          answer: "As a Toronto-based web design agency, we understand local business needs. We offer personalized service, competitive pricing, fast turnaround times, and comprehensive support for businesses across the GTA."
        },
        {
          question: "Do you offer in-person meetings in Toronto?",
          answer: "Yes! We offer in-person consultations at your Toronto office or convenient downtown locations. We can meet at coffee shops in the Financial District, Yorkville, or other central locations. For GTA businesses, we can arrange meetings at local co-working spaces."
        },
        {
          question: "What do Toronto customers expect from local business websites?",
          answer: "Toronto customers expect fast-loading, mobile-first websites with clear contact information, local business hours, and easy navigation. They also value local testimonials, neighborhood-specific content, and Google My Business integration."
        },
        {
          question: "What are the mobile usage trends in the GTA?",
          answer: "Over 70% of GTA residents use mobile devices for local business searches. Toronto has excellent 5G coverage, so we optimize for fast mobile loading across iPhones, Android devices, and various screen sizes."
        },
        {
          question: "Can you help with Toronto-specific integrations?",
          answer: "Absolutely! We integrate with Toronto-specific services like TTC route planning, local weather APIs, Toronto event calendars, and Canadian payment processors. We can also connect your website with local business networks."
        },
        {
          question: "What's your experience with Toronto's tech startup scene?",
          answer: "We work with many Toronto startups and understand the fast-paced, budget-conscious nature of the local tech scene. We offer startup-friendly pricing, rapid development cycles, and scalable solutions that grow with your business."
        }
      ]
    }
  ];

  // Flatten all FAQs for structured data
  const allFaqs = faqSections.flatMap(section => section.faqs);

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
      
      {/* Structured Data */}
      <StructuredData 
        type="faq" 
        faqs={allFaqs}
      />
      
      {/* Breadcrumb Schema */}
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' }
        ]} 
      />
    </div>
  );
};

export default FAQ;
