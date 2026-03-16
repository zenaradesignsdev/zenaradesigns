'use client';

import dynamic from 'next/dynamic';
import { TooltipProvider } from '@/components/ui/tooltip';
import ErrorBoundary from '@/components/ErrorBoundary';

const Toaster = dynamic(() => import('@/components/ui/toaster').then((m) => ({ default: m.Toaster })), { ssr: false });
const Sonner = dynamic(() => import('@/components/ui/sonner').then((m) => ({ default: m.Toaster })), { ssr: false });
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
      </TooltipProvider>
    </ErrorBoundary>
  );
}
