'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';

const Toaster = dynamic(() => import('@/components/ui/toaster').then((m) => ({ default: m.Toaster })), { ssr: false });
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Toaster />
      {children}
      {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
    </ErrorBoundary>
  );
}
