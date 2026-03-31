# GSC Audit — Remaining Actions & Notes
_Last updated: Mar 30, 2026_

---

## Status of Code Fixes (All Complete)

The following have been implemented and are ready to deploy:

- Title/meta rewrites on 10 pages (pricing, process, projects, security, locations, contact, about, services, mobile, homepage)
- OG tag fixes (homepage, clinics, renovations — were missing title/description)
- Blog post OG images now pull from `post.featuredImage`
- Industries section added to homepage (direct links to /lawyers, /accountants, /clinics, /renovations)
- Industry cross-links added to /locations page
- Removed fake street address ("123 King Street West") from all structured data — now shows only Toronto, ON, CA
- Removed fabricated aggregateRating (4.9, 47 reviews) from all structured data
- Removed broken SearchAction pointing to non-existent /search route
- Fixed inconsistent foundingDate (was 2020 in some places, 2024 in others — now all 2024)
- Fixed heading hierarchy on Pricing page (h3 before h2 — plan names are now h2)

---

## Manual Actions Required (Non-Code)

### Google Search Console

1. **Request indexing for all 13 "URL unknown" pages** — After deploying the changes above, go to GSC > URL Inspection, paste each URL, and click "Request Indexing." Do ~10-12 per day:
   - `https://zenaradesigns.com/services/web-design`
   - `https://zenaradesigns.com/services/ecommerce`
   - `https://zenaradesigns.com/services/logo-design`
   - `https://zenaradesigns.com/services/business-cards`
   - `https://zenaradesigns.com/services/seo`
   - `https://zenaradesigns.com/services/hosting`
   - `https://zenaradesigns.com/blog`
   - `https://zenaradesigns.com/lawyers`
   - `https://zenaradesigns.com/accountants`
   - `https://zenaradesigns.com/renovations`
   - `https://zenaradesigns.com/clinics`
   - `https://zenaradesigns.com/faq`
   - `https://zenaradesigns.com/contact/schedule`

2. **Also request re-indexing for the 3 "crawled but not indexed" pages** — these have content that Google previously rejected. After deploy, request re-indexing:
   - `https://zenaradesigns.com/about`
   - `https://zenaradesigns.com/services`
   - `https://zenaradesigns.com/mobile`

3. **Resubmit the sitemap** — Go to GSC > Sitemaps, remove and re-add `https://zenaradesigns.com/sitemap.xml`.

4. **Check "Pages" report** — Under Indexing > Pages, review the "Why pages aren't indexed" breakdown for any issues not covered by the URL Inspection API.

5. **Submit to Bing Webmaster Tools** — Bing has ~6% of Canadian search market and powers DuckDuckGo. Submit the sitemap at `https://www.bing.com/webmasters`.

### Google Business Profile

GBP is set up: https://share.google/ChxZDvKY41OvbAiSc

Ongoing actions:
- **Post weekly updates** on GBP (new project launched, blog post, seasonal offer). Active GBP profiles rank better in local pack.
- **Collect Google Reviews** — Ask clients to leave reviews on the GBP listing. Even 5-10 genuine reviews make a major difference. Review count and rating directly affect local pack ranking.

### Link Building & Authority

4 client backlinks are in place. Additional opportunities:

- **Web design directories** — Clutch, DesignRush, UpCity, GoodFirms, The Manifest. Most have free agency listings.
- **Local business directories** — Yelp, Yellow Pages Canada, BBB, local chamber of commerce, Toronto Board of Trade.
- **Guest posts or partnerships** — Write guest content for Toronto business blogs, legal marketing publications, or healthcare marketing sites.

### Content Strategy

- **Write blog posts targeting commercial keywords** the site is currently invisible for:

| Target Query | Current Position | Blog Post Idea |
| --- | --- | --- |
| law firm web design toronto | 70.6 | "What Makes a Great Law Firm Website? [Toronto Examples]" |
| gta website design | 21.8 | "How to Choose a Web Design Agency in the GTA" |
| healthcare web design toronto | 64.5 | "Website Design for Toronto Health & Wellness Clinics" |
| neurofeedback clinic website design | 59.7 | "Why Clinics Need Specialized Website Design (Not Templates)" |

Each blog post should internally link to the relevant service page and industry hub.

---

## Remaining Code Issues (Lower Priority)

These were flagged by the SEO audit but are not critical blockers for GSC indexing:

### 1. Create a proper OG image (1200x630px)
- No `public/og-image.jpg` exists. The fallback is `web-app-manifest-512x512.png` (square, wrong aspect ratio).
- 18 pages inherit this square fallback for social sharing previews.
- **Action:** Design a branded 1200x630px image, save as `public/og-image.jpg`, and update `layout.tsx` OG images array.

### 2. StructuredData component is client-side only
- `src/components/StructuredData.tsx` is a `'use client'` component that injects JSON-LD via `document.head.appendChild()` in `useEffect`.
- FAQPage, Service, Product, and BreadcrumbList schemas injected this way are invisible to Googlebot in the initial HTML.
- The cleanup function also removes ALL `script[type="application/ld+json"]` on unmount — including server-rendered layout schemas.
- **Action:** Refactor to server component following the pattern in `blog/[slug]/page.tsx` lines 48-54.

### 3. Title lengths over 60 characters (18 pages)
- Google truncates at ~60 chars. Most affected: `renovations/[location]` (81 chars), `clinics/[location]` (74 chars), `accountants/[location]` (71 chars).
- **Action:** Trim titles. Examples:
  - `renovations/[location]`: "Renovation Web Design ${city} | Contractor Sites | Zenara" (57 chars)
  - `clinics/[location]`: "Clinic Web Design ${city} | Health Websites | Zenara" (52 chars)

### 4. Meta description lengths over 160 characters (17 pages)
- Google truncates descriptions at ~155-160 chars. The CTA at the end ("Free consultation.") gets cut off.
- **Action:** Trim to 140-155 characters across affected pages.

### 5. Homepage h1 missing location
- `<h1>` reads "Modern Web Design. Build/Launch/Scale" — no "Toronto" or "GTA".
- For local queries like "web design Toronto", the h1 is the strongest on-page signal.
- **Action:** Amend to include location, e.g. "Modern Web Design for Toronto & GTA".

### 6. Multiple `priority` images competing
- 4 images have `priority` on every page load (2 in HeroSection, 2 in Navbar). Only 1 should.
- **Action:** Keep only the main hero logo with `priority`, remove from loading screen and navbar images. Add `sizes` prop.

### 7. No `<address>` element for contact info
- Phone and email in Footer and Contact page are not wrapped in `<address>`.
- **Action:** Wrap contact blocks in `<address style="font-style: normal">`.

---

## Key Performance Metrics to Track

| Metric | Mar 30, 2026 | Target |
| --- | --- | --- |
| Indexed pages | 15 of 105 | 80+ |
| Total impressions (28d) | 398 | 1,000+ |
| Total clicks (28d) | 3 | 50+ |
| Average CTR | 0.8% | 3-5% |
| "law firm web design toronto" position | 70.6 | Top 20 |
| "gta website design" position | 21.8 | Top 10 |

---

_Re-run audit: `GSC_SITE_URL=sc-domain:zenaradesigns.com node scripts/gsc-audit.js`_
_Auth: `gcloud auth application-default login --scopes=https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform`_
