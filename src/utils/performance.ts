import { PERFORMANCE_THRESHOLDS } from '@/lib/constants';
import type { PerformanceMetrics, MemoryUsage, PerformanceMonitoringHook } from '@/lib/types';
import { logger } from '@/lib/logger';

// Performance monitoring utilities
export const performanceMetrics = {
  // Measure page load performance
  measurePageLoad: (): PerformanceMetrics | null => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
        largestContentfulPaint: performance.getEntriesByName('largest-contentful-paint')[0]?.startTime || 0,
        cumulativeLayoutShift: (performance.getEntriesByName('layout-shift')[0] as any)?.value || 0,
        firstInputDelay: (performance.getEntriesByName('first-input')[0] as any)?.processingStart || 0
      };
    }
    return null;
  },

  // Measure component render time
  measureRenderTime: (componentName: string, startTime: number) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Log performance metrics in development
      logger.debug(`🚀 ${componentName} render time: ${renderTime.toFixed(2)}ms`);
      
      return renderTime;
    }
    return 0;
  },

  // Measure image load performance
  measureImageLoad: (imageSrc: string, startTime: number) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      // Log performance metrics in development
      logger.debug(`🖼️ Image ${imageSrc} load time: ${loadTime.toFixed(2)}ms`);
      
      return loadTime;
    }
    return 0;
  },

  // Measure scroll performance
  measureScrollPerformance: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      let scrollStartTime = 0;
      let scrollEndTime = 0;
      
      const handleScrollStart = () => {
        scrollStartTime = performance.now();
      };
      
      const handleScrollEnd = () => {
        scrollEndTime = performance.now();
        const scrollTime = scrollEndTime - scrollStartTime;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`📜 Scroll performance: ${scrollTime.toFixed(2)}ms`);
        }
      };
      
      // Throttle scroll events using constants
      let scrollTimeout: NodeJS.Timeout;
      const throttledScrollEnd = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScrollEnd, PERFORMANCE_THRESHOLDS.SCROLL_DEBOUNCE);
      };
      
      window.addEventListener('scroll', handleScrollStart, { passive: true });
      window.addEventListener('scroll', throttledScrollEnd, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScrollStart);
        window.removeEventListener('scroll', throttledScrollEnd);
        clearTimeout(scrollTimeout);
      };
    }
    return () => {};
  },

  // Get memory usage (if available)
  getMemoryUsage: (): MemoryUsage | null => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
    return null;
  },

  // Measure bundle size impact
  measureBundleSize: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const resources = performance.getEntriesByType('resource');
      const jsResources = resources.filter(resource => 
        resource.name.includes('.js') && !resource.name.includes('node_modules')
      );
      
      const totalSize = jsResources.reduce((total, resource) => {
        return total + ((resource as any).transferSize || 0);
      }, 0);
      
      logger.debug(`📦 Bundle size: ${(totalSize / 1024).toFixed(2)}KB`);
      
      return totalSize;
    }
    return 0;
  }
};

// Performance monitoring hook
export const usePerformanceMonitoring = (componentName: string): PerformanceMonitoringHook => {
  const startTime = performance.now();
  
  return {
    measureRender: () => performanceMetrics.measureRenderTime(componentName, startTime),
    measureImageLoad: (imageSrc: string) => performanceMetrics.measureImageLoad(imageSrc, startTime)
  };
};
