import { useScrollToTop, useSEO } from '@/hooks';
import { memo } from 'react';

const FAQ = () => {
  useScrollToTop();
  
  // SEO meta tags - Indexed for long-tail keywords
  useSEO({
    title: "FAQ - Web Design & Development Toronto | Pricing, Timelines & Process | Zenara Designs",
    description: "Get answers to frequently asked questions about web design, development, and digital marketing services in Toronto & GTA. Learn about pricing, timelines, and our proven process.",
    keywords: "web design faq toronto, web development questions gta, toronto web agency faq, website design cost toronto, how long to build website gta",
    canonical: "https://zenaradesigns.ca/faq"
  });

  const faqs = [
    {
      question: "What is the cost of web design in Toronto?",
      answer: "Our web design packages in Toronto start at $2,500 for small business websites. Custom e-commerce and enterprise solutions range from $5,000 to $15,000. We offer competitive pricing for Toronto businesses with flexible payment plans."
    },
    {
      question: "How long does it take to build a website in the GTA?",
      answer: "Typical website development in the GTA takes 2-4 weeks for small business sites, 4-8 weeks for e-commerce platforms, and 8-12 weeks for complex enterprise solutions. We serve Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington."
    },
    {
      question: "Do you provide business card design services in Toronto?",
      answer: "Yes! We offer professional business card design services across the GTA including Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington. Our packages include design, printing, and digital files."
    },
    {
      question: "What is included in logo design services in the GTA?",
      answer: "Our logo design services in the GTA include 3 initial concepts, unlimited revisions, vector and raster formats, brand guidelines, and usage rights. We serve all Greater Toronto Area cities with fast turnaround times."
    },
    {
      question: "Do you offer SEO services for Toronto businesses?",
      answer: "Absolutely! We provide comprehensive SEO services for Toronto businesses including keyword research, on-page optimization, local SEO, Google My Business optimization, and ongoing SEO maintenance to improve search rankings."
    },
    {
      question: "Can you help with e-commerce website development in Toronto?",
      answer: "Yes! We specialize in e-commerce website development for Toronto businesses using platforms like Shopify, WooCommerce, and custom solutions. We handle payment integration, inventory management, and mobile optimization."
    },
    {
      question: "What makes your web design agency different in Toronto?",
      answer: "As a Toronto-based web design agency, we understand local business needs. We offer personalized service, competitive pricing, fast turnaround times, and comprehensive support for businesses across the GTA including Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington."
    },
    {
      question: "Do you provide website maintenance services in the GTA?",
      answer: "Yes! We offer ongoing website maintenance services for GTA businesses including security updates, content updates, performance optimization, backup management, and technical support. Our maintenance plans start at $99/month."
    },
    {
      question: "Can you redesign an existing website for a Toronto business?",
      answer: "Absolutely! We specialize in website redesigns for Toronto businesses. We analyze your current site, identify improvement opportunities, and create a modern, mobile-responsive design that improves user experience and conversions."
    },
    {
      question: "What industries do you serve in the Greater Toronto Area?",
      answer: "We serve all industries across the GTA including restaurants, real estate, healthcare, legal services, retail, professional services, nonprofits, and startups. Our experience spans Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and Burlington."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions - Web Design Toronto
          </h1>
          <p className="text-xl text-slate-300">
            Common questions about web design, business cards, and logo design services in Toronto & GTA
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-3">
                {faq.question}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-300 mb-6">
            Have more questions about our web design services in Toronto?
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(FAQ);
