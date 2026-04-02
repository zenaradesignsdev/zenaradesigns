'use client';

import { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  /** Each array item renders as one animated line */
  lines: React.ReactNode[];
  className?: string;
  /** Class applied to every inner line element */
  lineClassName?: string;
  /** ms between each line starting (default 120) */
  staggerMs?: number;
  /** ms delay before the first line fires (default 0) */
  baseDelayMs?: number;
}

/**
 * Webflow-style clip-slide-up reveal.
 * Each line starts hidden below an overflow:hidden clip and slides into view
 * when the component enters the viewport.
 */
export const TextReveal = ({
  lines,
  className = '',
  lineClassName = '',
  staggerMs = 120,
  baseDelayMs = 0,
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div
            className={`transition-[opacity,transform] duration-700 ${lineClassName} ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[110%]'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: visible ? `${baseDelayMs + i * staggerMs}ms` : '0ms',
            }}
          >
            {line}
          </div>
        </div>
      ))}
    </div>
  );
};
