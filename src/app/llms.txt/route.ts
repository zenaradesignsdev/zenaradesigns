// /llms.txt — a plain-text summary of the business for AI assistants and
// crawlers that don't run JavaScript. Google says it doesn't use llms.txt
// (Search Central, June 2026), but other assistants read it.
//
// Built from PRICES and the site constants rather than kept as a static file
// in /public, which went stale: it still quoted $999/$1,999 during the promo
// and linked service URLs that had since been merged and redirected.

import { BUSINESS_EMAIL, BUSINESS_PHONE, SITE_URL } from '@/lib/constants';
import { PRICES, formatCad, formatCadRange, packagePriceWithRegular } from '@/lib/pricing-data';

export const dynamic = 'force-static';

const url = (path: string) => `${SITE_URL}${path}`;

const body = () => `# Zenara Designs

> Web design and development agency based in Markham, Ontario, serving the Greater Toronto Area. We build fast, custom-coded websites at fixed, published prices for small businesses and professional firms: law firms, accounting firms, clinics, renovation companies and trades.

## About

- Name: Zenara Designs
- Type: Web design and development agency (service-area business, no storefront)
- Service area: Markham (home base), Stouffville, Scarborough, Toronto, Mississauga, Richmond Hill, Vaughan, Pickering, Ajax and Whitby
- Email: ${BUSINESS_EMAIL}
- Phone: ${BUSINESS_PHONE}
- Website: ${SITE_URL}
- Team: ${url('/about')}

## Website packages (CAD, fixed price)

- Starter: ${packagePriceWithRegular('starter')}. Up to 3 pages, 3–5 day turnaround.
- Small Business: ${packagePriceWithRegular('smallBusiness')}. Up to 6 pages, custom sections, 1–2 weeks.
- Pro: from ${formatCad(PRICES.pro.from)}. Advanced functionality and e-commerce, 3–4 weeks.
- Every package includes mobile-responsive design, on-page SEO setup and SSL.
- Logo design: ${formatCadRange(PRICES.logoDesign, '–')}. Business cards: ${formatCadRange(PRICES.businessCards, '–')}.
- Hosting and maintenance plans: ${formatCad(PRICES.subscriptions.core)}, ${formatCad(PRICES.subscriptions.grow)} or ${formatCad(PRICES.subscriptions.prime)} a month (10% off billed annually).
- Details: ${url('/pricing')}

## Services

- Custom web design (Toronto and the GTA): ${url('/services/web-design')}
- E-commerce websites: ${url('/services/ecommerce')}
- Logo design, brand identity and business cards: ${url('/services/branding')}
- Local SEO: ${url('/services/seo')}
- GEO / AI search visibility (ChatGPT, Perplexity, Gemini, AI Overviews): ${url('/services/geo')}
- Website maintenance, hosting and analytics: ${url('/services/website-maintenance')}
- Website redesign and migration: ${url('/services/website-redesign')}

## Industries

- Law firms: ${url('/lawyers')}
  - Family law: ${url('/industries/family-law')}
  - Real estate law: ${url('/industries/real-estate-law')}
- Accounting firms: ${url('/accountants')}
- Clinics: ${url('/clinics')}
  - Physiotherapy: ${url('/industries/physiotherapy')}
  - Dental: ${url('/industries/dental')}
- Renovation companies and trades: ${url('/renovations')}

## Cities

- Markham: ${url('/web-design/markham')}
- Toronto: ${url('/web-design/toronto')}
- Pickering, Ajax and Whitby: ${url('/web-design/pickering')}
- All locations: ${url('/locations')}

## Client work

Portfolio: ${url('/projects')}

- AshCam Cutting Solutions (industrial e-commerce): https://ashcamcuttingsolution.ca/
- FunGen Events (event planning): https://fungenevents.ca/
- JB Loans (mortgage brokerage): https://jbloans.ca/
- IK Smart Solution (security and smart home): https://www.iksmartsolution.ca/
- Patty's Delights (food and beverage): https://pattysdelights.com/
- Heroes Catering (catering): https://heroes-catering.com/
- Law firm concept (a fictional firm, not client work): ${url('/projects/law-firm-concept')}

## Guides

- How much does a website cost in Toronto: ${url('/blog/how-much-does-a-website-cost-toronto')}
- How much does a website cost in Markham: ${url('/blog/how-much-does-a-website-cost-markham')}
- Custom website vs. template: ${url('/blog/custom-website-vs-template-toronto')}
- Ontario law firm website checklist: ${url('/resources/ontario-law-firm-website-checklist')}
- Law firm website cost in Ontario: ${url('/blog/law-firm-website-cost-ontario')}
- Law firm SEO in Toronto: ${url('/blog/law-firm-seo-toronto')}
- All articles: ${url('/blog')}

## Key pages

- Process: ${url('/process')}
- FAQ: ${url('/faq')}
- Contact: ${url('/contact')}
`;

export function GET(): Response {
  return new Response(body(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
