# Zenara Designs — SEO Implementation Inventory

**Purpose:** context dump of what is *already built* on zenaradesigns.com so research/recommendations don't repeat it.
**Stack:** Next.js 14 App Router · TypeScript · Tailwind · Vercel · GA4 (`G-XEHPLPLX0S`) · no CMS (content lives in typed TS modules)
**Generated from codebase audit:** 2026-07-28 (branch `main`, latest SEO commit `e44d8d6`)

---

## 1. Site architecture / page inventory

**~124 indexable URLs**, all statically generated:

| Group | Count | Route pattern |
|---|---|---|
| Core pages | 12 | `/`, `/about`, `/pricing`, `/contact`, `/contact/schedule`, `/projects`, `/process`, `/faq`, `/security`, `/mobile`, `/locations`, `/blog` |
| Service pages | 7 | `/services`, `/services/{web-design, ecommerce, logo-design, business-cards, seo, hosting}` |
| Industry hubs | 4 | `/lawyers`, `/accountants`, `/clinics`, `/renovations` |
| **City landing pages** | 19 | `/web-design/[city]` |
| **Industry × city pages** | 76 | `/{lawyers\|accountants\|clinics\|renovations}/[location]` |
| Blog posts | 6 | `/blog/[slug]` |
| Excluded from index | — | `/payments` (disallowed in robots), `/api/*` |

**19 GTA cities covered:** Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Hamilton, Scarborough, North York, Etobicoke, Pickering, Ajax, Whitby, Oshawa, Newmarket, Aurora, Stouffville.

---

## 2. Programmatic local content (already hand-differentiated)

- `src/lib/city-content.ts` (1,192 lines) — each of the 19 city pages has **unique** hero intro, long-form intro, local-economy paragraph, 8 real neighbourhood names, 3 bespoke "why us" points, cross-links to all 4 industry pages in that city, and unique FAQs. No fabricated stats/reviews/clients.
- `src/lib/location-content.ts` (1,629 lines) — unique per-city copy + FAQs for the 76 industry×location pages.
- `src/lib/industry-content.ts`, `src/lib/service-content.ts`, `src/lib/faq-data.ts`, `src/lib/team.ts` — typed single sources of truth shared by both the server route (metadata + SSR schema) and the presentational component.
- `/locations` is a hub page linking all 19 city pages; homepage has an Industries section linking the 4 industry hubs.

---

## 3. Metadata

- **Every one of the 30 route files exports `metadata` or `generateMetadata`** — unique title + description per page, including all 95 programmatic city/location pages.
- **Canonical URL on every page** (`alternates.canonical`); zero pages missing.
- Root `layout.tsx`: `metadataBase`, title template set to `'%s'` (fixed a previous "| Zenara | Zenara Designs" doubling bug), robots index/follow, `lang="en-CA"`, `locale: en_CA`.
- **Open Graph** on every page: title, description, url, type, images. Blog posts pull OG image from `post.featuredImage`.
- **Twitter card**: `summary_large_image`, `@zenaradesigns`.
- Full icon set + `site.webmanifest` + `theme-color`.
- Titles/descriptions were rewritten across 13 pages in a dedicated GSC-driven pass (commit `1c4d18b`).

---

## 4. Structured data (JSON-LD)

**Server-rendered** (`<script type="application/ld+json" data-ssr="true">` — readable by AI crawlers that don't execute JS), via a `JsonLd` server component:

| Page | Schemas |
|---|---|
| Root layout (sitewide) | `LocalBusiness` (areaServed × 8 cities, GeoCircle 50km, hours, priceRange, paymentAccepted, sameAs, `hasOfferCatalog`), `Organization`, `WebSite` |
| `/web-design/[city]` ×19 | `Service` + `FAQPage` + `BreadcrumbList` |
| `/faq` | `FAQPage` + `BreadcrumbList` |
| All 6 `/services/*` | `Service` + `FAQPage` + `BreadcrumbList` |
| `/pricing` | 3× `Product`/`Offer` (CAD, priceValidUntil) + `BreadcrumbList` |
| 4 industry hubs | `FAQPage` + `BreadcrumbList` |
| `/about` | `AboutPage` + 2× `Person` (E-E-A-T: real founders, universities, degrees, `knowsAbout`) + `Organization` + `CollegeOrUniversity` |
| 76 industry×location pages | `FAQPage` |

**Schema hygiene already fixed** (commit `7c45762`): removed fake street address ("123 King Street West"), removed fabricated `aggregateRating` (4.9 / 47 reviews), removed invalid `Review` schema on `/services`, removed broken `SearchAction` pointing at a non-existent `/search`, unified `foundingDate` to 2024, deduped `Organization`/`WebSite` that were double-emitted.

**Known remaining gap:** `src/components/StructuredData.tsx` (client-side `useEffect` injection) is still used on Home, Contact, Projects, Process, Security, Schedule, Mobile, Blog, Locations, and the 4 location detail components — this schema is invisible to non-JS crawlers.

---

## 5. Technical SEO

- **`src/app/sitemap.ts`** — dynamic `MetadataRoute.Sitemap`, ~124 URLs, per-group `priority`/`changeFrequency`, `lastModified` set at build time (blog posts use real `updatedAt`/`publishedAt`).
- **`src/app/robots.ts`** — allow `/`, disallow `/api/` + `/payments`, sitemap + host declared.
- **`src/middleware.ts`** — sends `X-Robots-Tag: noindex, nofollow` on any non-canonical host (Vercel previews, `project*.zenaradesigns.com` demo subdomains served by this app).
- **www → apex 301** permanent redirect in `next.config.mjs`.
- **`public/llms.txt`** — GEO/AEO file listing business info, service area, all services with URLs, pricing ($999 / $1,999 / $4,999+), and key page links.
- Security headers: HSTS preload, CSP (GA4 endpoints allowlisted), X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy (incl. `interest-cohort=()`), COOP/CORP.
- Images: `next/image`, AVIF + WebP, constrained deviceSizes/imageSizes.
- Fonts via `next/font` (no external font CDN). Preconnect + dns-prefetch to googletagmanager.

---

## 6. On-page / content structure

- **Exactly one intent-aligned `<h1>` per page** — fixed in commit `e44d8d6` (footer decorative wordmark demoted from `<h1>` to `aria-hidden` div; `/about`, `/services`, `/pricing`, `/projects`, `/contact` given real H1s; duplicate H1 on `/security` demoted; `/pricing` plan names corrected from h3-before-h2 to h2).
- Blog: 6 long-form posts — `importance-of-website-for-business`, `how-much-does-a-website-cost-toronto`, `seo-guide-small-business-toronto`, `website-vs-social-media-business`, `choosing-web-designer-gta`, `bad-website-costing-business-money`. Each with `BlogPosting` schema, featured image, published/updated dates.
- Internal linking mesh: every city page → 4 industry×city pages; `/locations` hub → all 19 cities; homepage Industries section → 4 hubs; footer → industry hubs.
- Accessibility: SkipLinks component, alt text, semantic HTML, keyboard nav (PageSpeed a11y = 100).

---

## 7. Measurement / tooling already in place

- **GA4** installed with `anonymize_ip`, afterInteractive strategy.
- **Google Search Console API access working** — `npm run gsc-audit` (`scripts/gsc-audit.js`) pulls live query/page/indexing data with `webmasters.readonly` scope against `sc-domain:zenaradesigns.com`.
- **`npm run pagespeed-audit`** (`scripts/pagespeed-audit.js`).
- Web-vitals reporting (`src/lib/web-vitals.ts`, `PerformanceMonitor`).
- **Google Business Profile is live**, and `/api/reviews` + a `GoogleReviews` component pull real GBP reviews into the site.
- Claude Code custom audit agents committed in `.claude/`: `seo-audit`, `performance-audit`, `security-audit`, `mobile-audit` slash commands (commit `dad8385`).
- Existing internal docs: `SEO-RANKING-PLAN.md` (296-line master plan), `gsc-audit-report.md`, `gsc-findings.md`, `pagespeed-audit-report.md`, `page-content-audit.md`.

---

## 8. Current performance baseline (last measured)

- **Search Console, 28 days to May 30 2026:** 4 clicks / 1,280 impressions, avg position **36.3**, CTR **0.3%**. Impressions ~3× since March (398 → 1,280).
- **Indexing:** ~79 indexed / 17 not indexed. Sitemap healthy, 0 coverage errors, 0 mobile issues.
- **Top impression pages:** `/lawyers` (252 impr, pos 47.8), `www.` homepage (179), `projectfour.zenaradesigns.com` (165 impr, **pos 5.7** — rogue demo subdomain outranking the main site), `/projects` (108), `/services/seo` (100), `/clinics` (98).
- **Real queries surfacing (all pos 40–96, 0 clicks):** `accounting firm markham`, `business card design toronto`, `business card designer barrie`, `bathroom renovations pickering/aurora`, `custom ecommerce solutions toronto`, `clinic design agency`, `behavioral health website design services`.
- **PageSpeed (Mar 17):** Performance 86 mobile / 93 desktop; Accessibility, Best Practices, SEO all **100**. LCP 4.2s mobile + render-blocking CSS are the drags.
- Self-assessed at time of plan: SEO 8/10 · GEO 6/10 · AEO 5/10.

---

## 9. Known gaps — NOT yet done (safe to recommend)

**Technical / on-site**
1. Rogue demo subdomains (`projectfour.`, `projecttwo.zenaradesigns.com`) are separate Vercel projects — still need source-level noindex + GSC Removals.
2. ~10 pages still inject schema client-side via `useEffect` (invisible to AI crawlers) — Home, Contact, Projects, Process, Security, Schedule, Mobile, Blog, Locations, location detail components.
3. No image sitemap in the repo (an `image-sitemap.xml` with 15 URLs exists in GSC from an older deploy but isn't generated by this codebase).
4. LCP 4.2s on mobile / render-blocking CSS unaddressed. No CWV field-data monitoring.
5. No `Article`/`HowTo`/`VideoObject` schema; no `speakable`; no author `Person` schema on blog posts (author is an Organization).
6. `sameAs` links point to Twitter/LinkedIn/Facebook profiles that may not be active; only Instagram is linked in the footer.
7. No hreflang (single-locale site — likely fine, not evaluated).

**Content**
8. Only 6 blog posts; no publishing cadence, no topic-cluster/pillar structure, no comparison or "cost" calculator pages beyond one post.
9. No case studies with results — `/projects` shows work but no outcome data (only 4–5 clients, all word-of-mouth).
10. No service × city matrix beyond web design (e.g. no `/seo/[city]`, `/logo-design/[city]`).
11. City pages were AI-drafted from real GTA knowledge but flagged for human review; not yet reviewed.

**Off-site (nothing built here)**
12. **Zero link building** — no backlinks, no directory citations, no NAP consistency work, no digital PR.
13. **GBP is set up but not actively worked** — no weekly Google Posts, no review-generation system, no Q&A, no photo cadence, no service/product listings.
14. Not submitted to **Bing Webmaster Tools** / IndexNow.
15. No local citations (Yelp, Yellow Pages CA, Clutch, DesignRush, Chamber of Commerce, etc.).
16. **No reviews on GBP yet at scale** — review count/rating is a direct local-pack ranking factor.

**Automation**
17. No AI agents running on a schedule — all SEO work is manual, ad-hoc Claude Code sessions in the codebase. No automated blog pipeline, no GBP post automation, no rank tracking, no automated GSC triage, no content-refresh loop.
