import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import Layout from "./components/Layout/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import { SecurityProvider } from "./components/SecurityProvider";
import { initLazyLoading } from "./utils/imageLoader";
import PerformanceMonitor from "./components/PerformanceMonitor";
import { performanceMetrics } from "./utils/performance";
import { logger } from "./lib/logger";

// Import critical pages directly for SSR/prerendering
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";

// Lazy load secondary SEO pages
const FAQ = lazy(() => import("./pages/FAQ"));
const Locations = lazy(() => import("./pages/Locations"));
const Process = lazy(() => import("./pages/Process"));
const Security = lazy(() => import("./pages/Security"));
const Mobile = lazy(() => import("./pages/Mobile"));
const Payment = lazy(() => import("./pages/Payment"));
const Lawyers = lazy(() => import("./pages/Lawyers"));
const LawyerLocation = lazy(() => import("./pages/LawyerLocation"));
const Accountants = lazy(() => import("./pages/Accountants"));
const AccountantLocation = lazy(() => import("./pages/AccountantLocation"));
const Renovations = lazy(() => import("./pages/Renovations"));
const RenovationLocation = lazy(() => import("./pages/RenovationLocation"));
const Clinics = lazy(() => import("./pages/Clinics"));
const ClinicLocation = lazy(() => import("./pages/ClinicLocation"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize performance monitoring
    if (process.env.NODE_ENV === 'development') {
      // Measure page load performance
      const pageMetrics = performanceMetrics.measurePageLoad();
      if (pageMetrics) {
        logger.debug('🚀 Page Load Performance:', pageMetrics);
      }
      
      // Measure bundle size
      performanceMetrics.measureBundleSize();
      
      // Monitor memory usage
      const memoryUsage = performanceMetrics.getMemoryUsage();
      if (memoryUsage) {
        logger.debug('💾 Memory Usage:', memoryUsage);
      }
      
      // Monitor scroll performance
      const cleanupScrollMonitoring = performanceMetrics.measureScrollPerformance();
      
      return () => {
        cleanupScrollMonitoring();
      };
    }
  }, []);

  return (
    <ErrorBoundary>
      <SecurityProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
          <BrowserRouter>
            <Layout>
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading...</p>
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
                  <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
                  <Route path="/services" element={<ErrorBoundary><Services /></ErrorBoundary>} />
                  <Route path="/projects" element={<ErrorBoundary><Projects /></ErrorBoundary>} />
                  <Route path="/pricing" element={<ErrorBoundary><Pricing /></ErrorBoundary>} />
                  <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
                  <Route path="/contact/schedule" element={<ErrorBoundary><Schedule /></ErrorBoundary>} />
                  
                      {/* Hidden SEO Pages - Not in main navigation */}
                      <Route path="/faq" element={<ErrorBoundary><FAQ /></ErrorBoundary>} />
                      <Route path="/locations" element={<ErrorBoundary><Locations /></ErrorBoundary>} />
                      <Route path="/process" element={<ErrorBoundary><Process /></ErrorBoundary>} />
                      <Route path="/security" element={<ErrorBoundary><Security /></ErrorBoundary>} />
                      <Route path="/mobile" element={<ErrorBoundary><Mobile /></ErrorBoundary>} />
                      <Route path="/payments" element={<ErrorBoundary><Payment /></ErrorBoundary>} />
                      <Route path="/lawyers" element={<ErrorBoundary><Lawyers /></ErrorBoundary>} />
                      <Route path="/lawyers/:location" element={<ErrorBoundary><LawyerLocation /></ErrorBoundary>} />
                      <Route path="/accountants" element={<ErrorBoundary><Accountants /></ErrorBoundary>} />
                      <Route path="/accountants/:location" element={<ErrorBoundary><AccountantLocation /></ErrorBoundary>} />
                      <Route path="/renovations" element={<ErrorBoundary><Renovations /></ErrorBoundary>} />
                      <Route path="/renovations/:location" element={<ErrorBoundary><RenovationLocation /></ErrorBoundary>} />
                      <Route path="/clinics" element={<ErrorBoundary><Clinics /></ErrorBoundary>} />
                      <Route path="/clinics/:location" element={<ErrorBoundary><ClinicLocation /></ErrorBoundary>} />
                      
                      {/* Blog Routes */}
                      <Route path="/blog" element={<ErrorBoundary><Blog /></ErrorBoundary>} />
                      <Route path="/blog/:slug" element={<ErrorBoundary><BlogPost /></ErrorBoundary>} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </SecurityProvider>
      {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
    </ErrorBoundary>
  );
};

export default App;
