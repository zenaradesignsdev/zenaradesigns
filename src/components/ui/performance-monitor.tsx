import { useEffect, useState } from 'react';
import { performanceMetrics } from '@/lib/performance';

interface PerformanceMonitorProps {
  componentName: string;
  enabled?: boolean;
}

export function PerformanceMonitor({ 
  componentName, 
  enabled = process.env.NODE_ENV === 'development' 
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();
    
    const measureRender = () => {
      const renderTime = performanceMetrics.measureRenderTime(componentName, startTime);
      setMetrics({ renderTime });
    };

    // Measure after component mounts
    const timeoutId = setTimeout(measureRender, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [componentName, enabled]);

  if (!enabled || !metrics) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50 font-mono">
      <div>{componentName}: {metrics.renderTime?.toFixed(2)}ms</div>
    </div>
  );
}
