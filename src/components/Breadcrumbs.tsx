import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  name: string;
  /** Omitted for the current page, which is rendered as plain text. */
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

// Visible breadcrumb trail. Pass the same names and URLs as the page's
// BreadcrumbList JSON-LD, so what Google reads matches what visitors see.
export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className={cn('mb-6 text-sm text-white/40', className)}>
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, i) => (
        <li key={item.name} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">/</span>}
          {item.href ? (
            // inline-flex centres the text inside the 44px mobile tap target
            // that globals.css gives every link.
            <Link href={item.href} className="inline-flex items-center hover:text-cyan-300 transition-colors">
              {item.name}
            </Link>
          ) : (
            <span aria-current="page" className="text-white/70">
              {item.name}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
