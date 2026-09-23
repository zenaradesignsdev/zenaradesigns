'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { PostHeading } from '@/lib/blog-outline';

interface BlogOutlineProps {
  headings: PostHeading[];
}

// Plain anchor links, so the outline works before (or without) JavaScript;
// the effect only adds the "you are here" highlight.
export const BlogOutline = ({ headings }: BlogOutlineProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="On this page">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">On this page</p>
      <ol className="space-y-1 border-l border-white/10">
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activeId === id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l py-1.5 pl-4 text-sm leading-snug font-light transition-colors',
                activeId === id
                  ? 'border-cyan-300 text-white'
                  : 'border-transparent text-white/45 hover:text-white/80'
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
