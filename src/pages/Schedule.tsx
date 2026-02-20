import { useEffect, useRef } from 'react';
import { useScrollToTop, useSEO } from '@/hooks';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StructuredData from '@/components/StructuredData';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
      destroyBadgeWidget?: () => void;
    };
  }
}

const Schedule = () => {
  // Scroll to top when component mounts
  useScrollToTop();
  const location = useLocation();
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  
  // SEO meta tags
  useSEO({
    title: "Schedule a Meeting | Contact Zenara Designs | Toronto",
    description: "Book a meeting with Zenara Designs to discuss your web design project. Schedule a 30-minute consultation call with our team in Toronto & GTA.",
    canonical: "https://zenaradesigns.com/contact/schedule"
  });
  
  // Load Calendly script and initialize widget
  useEffect(() => {
    if (!widgetContainerRef.current) return;

    const widgetContainer = widgetContainerRef.current;
    const calendlyUrl = 'https://calendly.com/admin-zenaradesigns/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=67e8f9';

    // Clear container first
    widgetContainer.innerHTML = '';

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    const initWidget = () => {
      if (!widgetContainer) return;
      
      // Clear again to be safe
      widgetContainer.innerHTML = '';
      
      // Create the widget element
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'calendly-inline-widget';
      widgetDiv.setAttribute('data-url', calendlyUrl);
      widgetDiv.style.minWidth = '320px';
      widgetDiv.style.height = '700px';
      widgetDiv.style.width = '100%';
      widgetDiv.setAttribute('aria-label', 'Calendly scheduling widget');
      
      widgetContainer.appendChild(widgetDiv);

      // If Calendly API is available, use it to initialize
      if (window.Calendly && window.Calendly.initInlineWidget) {
        try {
          window.Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: widgetDiv
          });
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      }
    };

    if (existingScript) {
      // Script already loaded, wait a bit then initialize
      const timer = setTimeout(() => {
        initWidget();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Load the script
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.type = 'text/javascript';
      
      script.onload = () => {
        // Wait a bit for Calendly to be ready
        setTimeout(() => {
          initWidget();
        }, 300);
      };
      
      script.onerror = () => {
        console.error('Failed to load Calendly widget script');
      };
      
      document.head.appendChild(script);
    }

    // Cleanup: clear container when component unmounts
    return () => {
      if (widgetContainer) {
        widgetContainer.innerHTML = '';
      }
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
          {/* Accent gradients with theme colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
        </div>
        
        {/* Background Stars */}
        <div className="absolute inset-0">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <Link 
              to="/contact" 
              className="inline-flex items-center text-white/60 hover:text-white transition-colors font-light group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Contact
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-4 sm:mb-6 text-white leading-[1.1] tracking-[-0.04em]">
              <span className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Schedule a Meeting</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
              Book a time that works for you and let's discuss your project.
            </p>
          </div>

          {/* Calendly Widget */}
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div 
                ref={widgetContainerRef}
                style={{ minWidth: '320px', height: '700px', width: '100%' }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Schema */}
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
          { name: 'Schedule a Meeting', url: '/contact/schedule' }
        ]} 
      />
    </div>
  );
};

export default Schedule;
