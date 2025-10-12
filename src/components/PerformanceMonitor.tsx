import { useEffect, useState } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

interface PerformanceMetrics {
  LCP: number | null;
  INP: number | null;
  CLS: number | null;
  FCP: number | null;
  TTFB: number | null;
}

const PerformanceMonitor = () => {
  // Early return for production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    LCP: null,
    INP: null,
    CLS: null,
    FCP: null,
    TTFB: null
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMetric = (name: string, value: number) => {
      setMetrics(prev => ({ ...prev, [name]: value }));
    };

    // Core Web Vitals
    onLCP((metric) => updateMetric('LCP', metric.value));
    onINP((metric) => updateMetric('INP', metric.value));
    onCLS((metric) => updateMetric('CLS', metric.value));
    onFCP((metric) => updateMetric('FCP', metric.value));
    onTTFB((metric) => updateMetric('TTFB', metric.value));

    // Show after 3 seconds
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const getRating = (metric: string, value: number) => {
    const thresholds: Record<string, { good: number; needsImprovement: number }> = {
      LCP: { good: 2500, needsImprovement: 4000 },
      INP: { good: 200, needsImprovement: 500 },
      CLS: { good: 0.1, needsImprovement: 0.25 },
      FCP: { good: 1800, needsImprovement: 3000 },
      TTFB: { good: 800, needsImprovement: 1800 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1 text-xs">
        {Object.entries(metrics).map(([metric, value]) => {
          if (value === null) return null;
          const rating = getRating(metric, value);
          const color = getRatingColor(rating);
          
          return (
            <div key={metric} className="flex justify-between items-center">
              <span className="font-medium">{metric}:</span>
              <span className={`${color} font-mono`}>
                {metric === 'CLS' ? value.toFixed(3) : `${Math.round(value)}ms`}
                <span className={`ml-1 text-xs ${color}`}>
                  ({rating.replace('-', ' ')})
                </span>
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
        Core Web Vitals thresholds: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1
      </div>
    </div>
  );
};

export default PerformanceMonitor;
