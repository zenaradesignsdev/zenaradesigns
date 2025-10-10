import { Link } from 'react-router-dom';
import { Star, ArrowRight, CheckCircle, Layers, Heart, ChevronLeft, ChevronRight, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollToTop, useSEO } from '@/hooks';
import { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import logo from '@/assets/zenaralogo-transparentbg.png';
import realEstateWebImage from '@/assets/website-example-realestate.png';
import rocketWebImage from '@/assets/website-example-rocket.png';
import gardenWebImage from '@/assets/website-example-garden.png';
import travelWebImage from '@/assets/website-example-travel.png';
import moonImage from '@/assets/moon.png';

const Services = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  
  // SEO meta tags
  useSEO({
    title: "Web Design & Development Services Toronto | Business Cards & Logo Design GTA | Zenara Designs",
    description: "Professional web design, development, business cards, and logo design services in Toronto & GTA. Custom websites, e-commerce solutions, and digital marketing for small businesses.",
    keywords: "web design toronto, web development gta, business cards toronto, logo design gta, website design mississauga, digital marketing toronto",
    canonical: "https://zenaradesigns.com/services"
  });
  
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [imageVisibleItems, setImageVisibleItems] = useState<number[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleItemIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        setVisibleItems(prev => [...prev, index]);
      } else {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        setVisibleItems(prev => prev.filter(item => item !== index));
      }
    });
  }, []);

  const handleImageIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-image-index') || '0');
        setImageVisibleItems(prev => [...prev, index]);
      } else {
        const index = parseInt(entry.target.getAttribute('data-image-index') || '0');
        setImageVisibleItems(prev => prev.filter(item => item !== index));
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleItemIntersection, { threshold: 0.2 });
    const imageObserver = new IntersectionObserver(handleImageIntersection, { threshold: 0.3 });

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    imageRefs.current.forEach((ref) => {
      if (ref) imageObserver.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      imageRefs.current.forEach((ref) => {
        if (ref) imageObserver.unobserve(ref);
      });
    };
  }, [handleItemIntersection, handleImageIntersection]);

  const services = useMemo(() => [
    {
      emoji: "💻",
      title: "Website Design & Development",
      description: "Complete web solutions built for performance and conversion.",
      features: [
        "Dedicated web designer and mock-ups made for customers",
        "Modern web design with cutting-edge web stack",
        "Fully responsive on mobile and optimized for all devices",
        "Performance, security, and privacy built-in",
        "SEO optimization for better search rankings",
        "Custom features, forms, and integrations"
      ]
    },
    {
      emoji: "🔒",
      title: "Web Hosting & Security", 
      description: "Enterprise-grade hosting with built-in security and monitoring.",
      features: [
        "Affordable hosting solutions that fit your budget",
        "Scalable hosting that grows with your business",
        "Automated backup deployments for peace of mind",
        "Global CDNs for lightning-fast loading worldwide",
        "Uptime monitoring and instant alerts",
        "Basic WAF and security recommendations",
        "SSL included with every hosting plan"
      ]
    },
    {
      emoji: "🔧",
      title: "Maintenance & Support",
      description: "Keep your site running smoothly with ongoing care.",
      features: [
        "Monthly security and performance updates",
        "Amazing uptime with 99.9% reliability",
        "Content changes and copy revisions",
        "Bug fixes and compatibility updates",
        "Small feature additions and improvements",
        "Priority technical support when you need it",
        "Complete setup support and guidance"
      ]
    },
    {
      emoji: "🎨",
      title: "Brand & Collateral",
      description: "Complete brand identity and marketing materials.",
      features: [
        "Custom logo design and comprehensive brand guidelines",
        "Business card design with print-ready files",
        "Social media profile and cover setup",
        "Complete brand kit handoff with all assets",
        "Google Business setup and optimization",
        "Additional brand-related services available on request"
      ]
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      quote: "Zenara delivered a clean, fast site in days. Our conversion rate jumped 40% within the first month.",
      author: "Taylor R.",
      role: "Small Business Owner",
      rating: 5
    },
    {
      quote: "Traffic up, inquiries doubled. The team understood exactly what we needed and delivered beyond expectations.",
      author: "Dr. Lina P.", 
      role: "Clinic Director",
      rating: 5
    },
    {
      quote: "Seamless process from mockup to launch. Professional, responsive, and the site performs beautifully.",
      author: "Mark H.",
      role: "Contractor", 
      rating: 5
    },
    {
      quote: "Finally, a web team that speaks our language. Fast delivery without compromising on quality.",
      author: "Emma K.",
      role: "Marketing Director",
      rating: 5
    },
    {
      quote: "Our new website has been a game-changer. Professional, fast, and exactly what we envisioned.",
      author: "Sarah M.",
      role: "E-commerce Owner",
      rating: 5
    },
    {
      quote: "Outstanding work! The team was responsive, creative, and delivered on time. Highly recommended.",
      author: "James L.",
      role: "Startup Founder",
      rating: 5
    },
    {
      quote: "The attention to detail and user experience is incredible. Our customers love the new site.",
      author: "Maria G.",
      role: "Restaurant Owner",
      rating: 5
    },
    {
      quote: "From concept to completion, Zenara made the entire process smooth and stress-free.",
      author: "David C.",
      role: "Consultant",
      rating: 5
    }
  ], []);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-swipe functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">

      {/* Services Showcase - Space Theme */}
      <section className="services-showcase py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle Stars */}
          <div className="absolute top-16 left-16 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle"></div>
          <div className="absolute top-32 right-24 w-1 h-1 bg-purple-300 rounded-full animate-twinkle delay-1000"></div>
          <div className="absolute top-48 left-1/3 w-1 h-1 bg-teal-300 rounded-full animate-twinkle delay-2000"></div>
          <div className="absolute top-24 right-1/3 w-1 h-1 bg-violet-300 rounded-full animate-twinkle delay-500"></div>
          
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 border border-cyan-500/30">
              <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-cyan-300">Our Services</span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-white relative">
              Complete <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent relative">
                Digital Solutions
                {/* Moon behind Solutions */}
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 md:-top-8 md:-right-8 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-15 animate-levitate">
                  <img 
                    src={moonImage} 
                    alt="Moon"
                    className="w-full h-full object-contain"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed px-4">
              From concept to launch, we deliver comprehensive web solutions that transform your business and delight your customers.
            </p>
          </div>
          
          <div className="space-y-12 sm:space-y-16">
            {services.map((service, index) => (
              <div 
                key={index} 
                ref={(el) => (itemRefs.current[index] = el)}
                data-index={index}
                className={`group transition-all duration-1000 ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 sm:gap-12`}>
                  {/* Image Section */}
                  <div className="flex-1 w-full">
                    <div 
                      ref={(el) => (imageRefs.current[index] = el)}
                      data-image-index={index}
                      className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-1000 w-full h-64 sm:h-72 md:h-80 ${
                        imageVisibleItems.includes(index) 
                          ? 'opacity-100 translate-x-0' 
                          : index % 2 === 0 
                            ? 'opacity-0 -translate-x-12' 
                            : 'opacity-0 translate-x-12'
                      }`}
                    >
                      <img 
                        src={index === 0 ? realEstateWebImage : index === 1 ? rocketWebImage : index === 2 ? gardenWebImage : travelWebImage} 
                        alt={service.title}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        style={{ 
                          objectFit: 'contain',
                          objectPosition: 'center center',
                          transform: (index === 0 || index === 3) ? 'scale(1.5)' : 'scale(1)'
                        }}
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1">
                    <div className="service-card bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl h-full flex flex-col relative overflow-hidden">
                      {/* Glassmorphism Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 flex-shrink-0">
                          <div className="text-4xl sm:text-5xl md:text-6xl">
                            {service.emoji}
                          </div>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h3>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed flex-shrink-0">
                          {service.description}
                        </p>
                        
                        <ul className="space-y-2 sm:space-y-3 flex-grow">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3 text-slate-300">
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories - Space Theme */}
      <section className="services-testimonials py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-black via-slate-900 to-purple-900">
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          {/* Shooting Stars */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-twinkle"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-twinkle delay-1000"></div>
          <div className="absolute top-60 left-1/3 w-1 h-1 bg-teal-400 rounded-full animate-twinkle delay-2000"></div>
          <div className="absolute top-32 right-1/4 w-1 h-1 bg-violet-400 rounded-full animate-twinkle delay-500"></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 border border-cyan-500/30">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-cyan-300">Success Stories</span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-white">
              What Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              Real results from real businesses who trusted us with their digital transformation
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="testimonial-card bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl h-full flex flex-col relative overflow-hidden">
                      {/* Glassmorphism Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                      
                      <div className="relative z-10 flex flex-col h-full text-center">
                        <div className="flex items-center justify-center mb-6 sm:mb-8 flex-shrink-0">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 fill-current mx-1" />
                          ))}
                        </div>
                        
                        <blockquote className="text-slate-300 text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 sm:mb-12 flex-grow font-medium">
                          "{testimonial.quote}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center space-x-3 sm:space-x-4 flex-shrink-0">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-white text-lg sm:text-xl">{testimonial.author}</div>
                            <div className="text-cyan-300 text-base sm:text-lg">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full border-2 border-cyan-400/50 shadow-2xl hover:bg-white/20 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center text-white hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-full border-2 border-cyan-400/50 shadow-2xl hover:bg-white/20 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center text-white hover:scale-110"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 scale-50 sm:scale-100">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-cyan-400 scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA - Space Theme */}
      <section className="services-cta py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-black via-purple-900 to-slate-900">
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          {/* Shooting Stars */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-twinkle"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-twinkle delay-1000"></div>
          <div className="absolute top-60 left-1/3 w-1 h-1 bg-teal-400 rounded-full animate-twinkle delay-2000"></div>
          <div className="absolute top-32 right-1/4 w-1 h-1 bg-violet-400 rounded-full animate-twinkle delay-500"></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl relative overflow-hidden">
            {/* Glassmorphism Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 border border-cyan-500/30">
                <Rocket className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-cyan-300">Ready to Launch?</span>
              </div>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 sm:mb-8">
                Ready to Transform Your <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Business?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4">
                Let's create something amazing together. Every great website starts with a conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 rounded-2xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  <Link to="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="border-2 border-cyan-400 text-cyan-300 bg-cyan-500/10 px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 rounded-2xl font-semibold text-base sm:text-lg backdrop-blur-sm w-full sm:w-auto">
                  <Link to="/projects">View Our Work</Link>
                </Button>
              </div>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 text-slate-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                  <span className="text-xs sm:text-sm">Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                  <span className="text-xs sm:text-sm">Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                  <span className="text-xs sm:text-sm">Quality Assured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Services);