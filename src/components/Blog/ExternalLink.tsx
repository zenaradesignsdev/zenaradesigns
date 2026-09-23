import type { ReactNode } from 'react';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}

// Outbound source links in post bodies: new tab, no referrer leak to the source.
export const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);
