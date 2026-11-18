'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { NAVIGATION_LINKS, FOOTER_ADDITIONAL_LINKS, SERVICE_LINKS, SERVICE_AREA_LINKS } from '@/lib/constants';

const INDUSTRY_LINKS = [
  { href: '/renovations', label: 'Renovations & Contractors' },
  { href: '/clinics', label: 'Physio & Wellness Clinics' },
  { href: '/accountants', label: 'Accountants & Brokers' },
  { href: '/lawyers', label: 'Law Firms' },
] as const;

type FooterLink = { readonly href: string; readonly label: string };

// Every link stays in the HTML on all screen sizes (internal-link mesh for
// crawl discovery); on phones the groups just collapse behind their headings.
const LINK_GROUPS: { id: string; title: string; links: readonly FooterLink[] }[] = [
  { id: 'company', title: 'Company', links: NAVIGATION_LINKS },
  { id: 'services', title: 'Services', links: SERVICE_LINKS },
  { id: 'industries', title: 'Industries', links: INDUSTRY_LINKS },
  { id: 'resources', title: 'Resources', links: FOOTER_ADDITIONAL_LINKS },
];

const linkClass = 'text-slate-300 hover:text-cyan-400 transition-colors text-sm';

function FooterGroup({
  id,
  title,
  open,
  onToggle,
  children,
  listClassName,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  listClassName: string;
}) {
  const panelId = `footer-${id}`;
  return (
    <div className="border-b border-white/10 md:border-0">
      <h2 className="text-sm font-normal text-white">
        {/* Phones: tap-to-expand heading */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between py-4 text-left md:hidden"
        >
          {title}
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
        {/* Tablet and up: plain heading, list always shown */}
        <span className="hidden md:mb-3 md:block">{title}</span>
      </h2>
      <ul id={panelId} className={`${open ? '' : 'max-md:hidden'} pb-5 md:pb-0 ${listClassName}`}>
        {children}
      </ul>
    </div>
  );
}

export default function FooterNav() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const toggle = (id: string) => setOpenGroup((current) => (current === id ? null : id));

  return (
    <nav aria-label="Footer" className="border-t border-white/10 md:grid md:grid-cols-4 md:gap-8 md:border-0 lg:col-span-8">
      {LINK_GROUPS.map((group) => (
        <FooterGroup
          key={group.id}
          id={group.id}
          title={group.title}
          open={openGroup === group.id}
          onToggle={() => toggle(group.id)}
          listClassName="grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1 md:gap-y-1.5"
        >
          {group.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </FooterGroup>
      ))}

      {/* Service areas — Markham-first internal link mesh */}
      <div className="md:col-span-4 md:mt-2 md:border-t md:border-white/10 md:pt-6">
        <FooterGroup
          id="areas"
          title="Areas We Serve"
          open={openGroup === 'areas'}
          onToggle={() => toggle('areas')}
          listClassName="flex flex-wrap gap-x-5 gap-y-3 md:gap-y-2"
        >
          {SERVICE_AREA_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </FooterGroup>
      </div>
    </nav>
  );
}
