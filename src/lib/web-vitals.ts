import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import { logger } from './logger';

// Core Web Vitals thresholds
const VITALS_THRESHOLDS = {
  LCP: 2500, // 2.5s
  INP: 200,  // 200ms
  CLS: 0.1,  // 0.1
  FCP: 1800, // 1.8s
  TTFB: 800  // 800ms
};

// Send Web Vitals to GA4
function sendToGA4(metric: any) {
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_map: {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_delta: metric.delta,
        metric_rating: metric.rating
      }
    });
  }
}

// Log Web Vitals for debugging
function logWebVitals(metric: any) {
  const threshold = VITALS_THRESHOLDS[metric.name as keyof typeof VITALS_THRESHOLDS];
  const isGood = threshold ? metric.value <= threshold : true;
  
  logger.debug(`[Web Vitals] ${metric.name}:`, {
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
    threshold: threshold,
    isGood: isGood,
    element: metric.element?.tagName || 'N/A'
  });
}

// Initialize Web Vitals tracking
export function initWebVitals() {
  // Largest Contentful Paint
  onLCP((metric) => {
    logWebVitals(metric);
    sendToGA4(metric);
  });

  // Interaction to Next Paint (replaces FID)
  onINP((metric) => {
    logWebVitals(metric);
    sendToGA4(metric);
  });

  // Cumulative Layout Shift
  onCLS((metric) => {
    logWebVitals(metric);
    sendToGA4(metric);
  });

  // First Contentful Paint
  onFCP((metric) => {
    logWebVitals(metric);
    sendToGA4(metric);
  });

  // Time to First Byte
  onTTFB((metric) => {
    logWebVitals(metric);
    sendToGA4(metric);
  });

}

// Performance observer for additional metrics
export function initPerformanceObserver() {
  if ('PerformanceObserver' in window) {
    // Observe LCP candidates
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      logger.debug('[Performance] LCP Element:', {
        element: lastEntry.element?.tagName,
        url: lastEntry.url,
        size: lastEntry.size,
        startTime: lastEntry.startTime
      });
    });
    
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      logger.warn('LCP observer not supported:', e);
    }

    // Observe layout shifts
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          logger.debug('[Performance] Layout Shift:', {
            value: (entry as any).value,
            sources: (entry as any).sources?.map((s: any) => ({
              element: s.element?.tagName,
              previousRect: s.previousRect,
              currentRect: s.currentRect
            }))
          });
        }
      }
    });
    
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      logger.warn('CLS observer not supported:', e);
    }
  }
}

// Resource timing analysis
export function analyzeResourceTiming() {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource');
    const slowResources = resources.filter((resource: any) => 
      resource.duration > 1000 || resource.transferSize > 100000
    );
    
    if (slowResources.length > 0) {
      logger.warn('[Performance] Slow Resources:', slowResources.map((r: any) => ({
        name: r.name,
        duration: r.duration,
        size: r.transferSize,
        type: r.initiatorType
      })));
    }
  }
}
