# Zenara Designs — SEO / GEO / AEO Ranking Plan

> **Goal:** Rank on page 1 for **"web design [city]"** / **"website design [city]"** across the GTA, plus the broad **"web design Toronto/GTA"** terms — with genuinely rich, locally-specific content (no thin, copy-paste, or AI-slop pages) — while fixing the technical issues that are currently capping visibility.
>
> **Status:** Master plan + live implementation progress (below). **Not pushed** — pending review.
>
> **Date:** 2026-05-31 · Built on **live Search Console data** (`gsc-audit-report.md`, generated 2026-05-31 12:29) + PageSpeed (Mar 17) + full code review.

---

## ✅ Implementation progress (2026-05-31)

**Shipped & verified locally (build + tsc + lint all green; schema validated in built HTML):**
- ✅ **Phase 0.2** — removed invalid/fabricated Review schema from `/services` (fixes the GSC rich-result error).
- ✅ **Phase 0.1 (code mitigation)** — `src/middleware.ts` adds `X-Robots-Tag: noindex` to any non-canonical host (preview/subdomain leak). *Subdomains that are separate deployments still need source-level noindex + GSC Removals.*
- ✅ **Phase 2** — new `/web-design/[city]` route + `src/lib/city-content.ts` with **19 hand-written GTA city pages** (SSR Service + FAQPage + Breadcrumb); added to sitemap; `/locations` rebuilt as a hub linking all 19.
- ✅ **Phase 4.3** — `public/llms.txt`.
- ✅ **Phase 4.1 (SSR schema rollout)** — server-rendered schema via new `JsonLd` component + `src/lib/service-content.ts` / `src/lib/industry-content.ts`:
  - `/faq` (FAQPage + Breadcrumb)
  - all 6 `/services/*` (Service + FAQPage + Breadcrumb)
  - `/pricing` (3× Product + Breadcrumb)
  - 4 industry hubs `/lawyers`, `/accountants`, `/clinics`, `/renovations` (FAQPage + Breadcrumb)
  - Client `StructuredData` injection removed from those pages (also eliminated duplicate Organization/WebSite that was double-emitted on top of `layout.tsx`).
- ✅ **Bug fix** — `/pricing` title said "from $499"; real Starter price is **$999** — corrected.
- ✅ **Lint fix** — `NotFound.tsx` `<a>` → `<Link>` (the one pre-existing lint error).
- ✅ Sitemap `lastModified` → build-time; FAQ data extracted to `src/lib/faq-data.ts`.

**Remaining / not done (needs your input or lower value):**
- ⏳ **Phase 0.1 infra** — noindex `project*.zenaradesigns.com` at their Vercel source + GSC Removals (can't do from this repo).
- ⏳ **Indexing** — resubmit sitemap, Request Indexing for orphans; export the "17 not indexed" list (§2).
- ⏳ **`/about` E-E-A-T** — needs real founder names/credentials.
- ⏳ **Per-city content** — 19 pages drafted from real GTA knowledge; **human review recommended** before relying on them (§11).
- ⏳ **CWV/LCP**, GBP/reviews/citations (§8.2, §10) — off-code / need profiling.
- ⏳ Location detail components (`LawyerLocation` etc.) still client-inject `localBusiness`+breadcrumb — **low value** (they already SSR their FAQPage; `localBusiness` is already global in `layout.tsx`). Other info pages (Home, About, Contact, Projects, Process, etc.) still use client schema.

---

## 0. How to use this document

Work top-down by phase. **Phase 0 is urgent** (active problems suppressing rankings). Each item lists the **file(s)**, the **change**, **acceptance criteria**, and **regression risk**. §12 is the verification protocol every change must pass so we ship improvements with **no new bugs**.

---

## 1. Current state (live evidence)

**Audit scores:** SEO 8/10 · GEO 6/10 · AEO 5/10.

**Search Console — 28 days to May 30, 2026 (`gsc-audit-report.md`):**
- **4 clicks / 1,280 impressions**, avg position **36.3**, sitewide CTR **0.3%**. Impressions ~3× since March (398 → 1,280); Google shows us more but we rank too low to earn clicks.
- **Indexing (URL inspection of 59 known URLs): 55 indexed, 0 coverage errors, 0 mobile issues.** Your own report's Page Indexing view shows **79 indexed / 17 not indexed (2 reasons)** across the full property — addressed in §2.
- Both sitemaps healthy: `sitemap.xml` (105 URLs) + `image-sitemap.xml` (15), 0 errors.
- **Highest-impression pages:** `/lawyers` (252 impr, pos 47.8), `www.` homepage (179), **`projectfour.zenaradesigns.com` (165, pos 5.7)**, `/projects` (108), `/services/seo` (100), `/clinics` (98).
- **Real queries we surface for** (all ranking 40–96, 0 clicks): `accounting firm markham`, `business card design toronto`, `business card designer barrie`, `bathroom renovations pickering/aurora`, `custom ecommerce solutions toronto`, `clinic design agency`, `behavioral health website design services`. **Almost no "web design [city]" impressions** — because those pages don't exist yet (§7).

**PageSpeed (Mar 17):** Performance 86 mobile / 93 desktop; Accessibility / Best Practices / SEO all **100**. LCP 4.2s + render-blocking CSS are the mobile drags.

> ✅ **GSC API access is now working** (re-auth with the `webmasters.readonly` scope succeeded). Re-run anytime: `npm run gsc-audit` with `GSC_SITE_URL="sc-domain:zenaradesigns.com"`.

---

## 2. Page indexing deep-dive — "79 indexed / 17 not indexed (2 reasons)"

You have **105 URLs in the sitemap** but only ~79 indexed. The 17 "not indexed" almost certainly fall into the two reasons GSC is reporting, both of which we can act on. Confirm the exact labels in **GSC → Pages → "Why pages aren't indexed"**, then apply:

| Likely reason | What it means | Pages affected | Fix |
|---|---|---|---|
| **"Page with redirect"** | A URL 301s elsewhere (counted as not-indexed) | `www.zenaradesigns.com/*`, and the rogue **`projectfour.` / `projecttwo.`** subdomains | Expected for `www` (already 301'd — see §3.3). The **subdomains are the real problem → §3.1.** |
| **"Crawled — currently not indexed"** | Google crawled but judged the page too thin / low-value to index | `/mobile`, `/blog/importance-of-website-for-business`, possibly thin `/services/*` | Strengthen content + internal links (§8); the city-page mesh (§7) helps. |
| **"URL is unknown to Google"** (if present) | Never discovered | `/blog` index | Internal links + resubmit + Request Indexing (§6). |

**Goal:** get the 17 down to only the genuinely-intentional redirects. Most of the gap is the subdomain leak (§3.1) and a handful of thin pages (§8).

> **Action:** export the exact "not indexed" list from GSC so we can map all 17 precisely. The script can't see the aggregate Page-Indexing report — only per-URL inspection — so this one export from you closes the loop.

---

## 3. 🔴 Phase 0 — Critical issues found in live data (fix first)

### 3.1 Rogue subdomains competing with the main site — **most urgent**
`projectfour.zenaradesigns.com` (**165 impressions, position 5.7** — outranking the main domain on some queries) and `projecttwo.zenaradesigns.com` (8 impr) are indexed in Google. These are almost certainly **client demo / preview deployments** (separate Vercel projects) on subdomains.

**Why it matters:** they split ranking signals, create duplicate-content competition with `zenaradesigns.com`, and leak unfinished work into search. A demo site ranking 5.7 is *stealing* authority that should consolidate on your domain.

**Fix (infrastructure — not in this repo's main build):**
- Add **`X-Robots-Tag: noindex, nofollow`** to every preview/demo deployment (Vercel: set on the demo project, or via its own `next.config`/`vercel.json` headers), **or** password-protect them (Vercel "Deployment Protection"), **or** serve a `robots.txt` disallow on those subdomains.
- Once noindexed, use **GSC → Removals** to fast-track de-indexing (add the subdomains as properties first).
- Long-term: host client demos on a path or a non-indexable domain, or behind auth.
- **Acceptance:** `site:zenaradesigns.com -inurl:www` shows no `project*.zenaradesigns.com` results; subdomains return `X-Robots-Tag: noindex`.

### 3.2 🔴 Invalid Review schema on `/services` (rich-result error + guidelines violation)
GSC reports **8× "Review snippets: Missing field `itemReviewed`"** on `/services`. Source: `generateReviewSchema()` in `src/components/StructuredData.tsx` emits `Review` objects with no `itemReviewed`, fed by `TESTIMONIALS` in `src/components/pages/Services.tsx` (line ~118) — and **those testimonials are fabricated placeholders** ("Taylor R.", "Dr. Lina P.", all 5★), the same class of fake reviews you already removed from schema in commit `7c45762`.

**Two issues:** (a) the schema is invalid (missing required field), and (b) marking up **fake** reviews violates Google's review-snippet policy and risks a manual action.

**Fix (choose one — recommend A):**
- **A (recommended):** **Remove the review structured data** — delete `<StructuredData type="review" reviews={TESTIMONIALS} />` at `Services.tsx:833`. Optionally also remove/replace the visual fake testimonials (business call). No fake review markup anywhere until you have **real** reviews.
- **B:** If you keep it, the schema must (1) use real, verifiable reviews, and (2) nest `itemReviewed` (e.g. the `LocalBusiness`/`Service`) — but do **not** do this with fabricated content.
- **File(s):** `src/components/pages/Services.tsx`; optionally prune `generateReviewSchema`/`generateAggregateRatingSchema` from `src/components/StructuredData.tsx` if unused after removal.
- **Acceptance:** Rich Results Test on `/services` shows 0 review errors; `npm run gsc-audit` Rich Result Issues = 0.

### 3.3 `www` → non-www redirect — verify (likely already fine)
`next.config.mjs` already 301s `www.zenaradesigns.com/*` → `zenaradesigns.com/*`. GSC listing `www` as "Page with redirect" is therefore **expected, not a bug**. **Action:** just confirm the canonical (non-www) homepage is the indexed one and `www` carries no `self`-canonical. No code change expected.

---

## 4. The core growth gap & strategy

We rank for **industry + city** long-tail (76 unique `/{industry}/{city}` pages) but have **nothing targeting the higher-volume "web design [city]"** queries:

| Search term | Intent | Page targeting it today |
|---|---|---|
| `web design toronto` | Commercial | Homepage only (diluted) |
| `web design mississauga / brampton / vaughan / markham …` | Commercial | ❌ None (only a card on `/locations`) |
| `website design [city]` | Commercial | ❌ None |

`/locations` crams ~13 cities onto **one** page as cards — so no city can rank for its own query. **Creating a genuinely-rich city web-design page set is the #1 growth lever.** Competitors on page 1 (Web Sharx, Webstudio, Web Vertical Domains, Web Swiggy, Consensus Creative, Parachute Design — §16) all run dedicated content-rich city/service pages with visible portfolios, real reviews, and transparent pricing.

**Three workstreams, in priority order:** (0/1) fix what's suppressing us → (2) build the city pages → (3) earn authority off-page.

---

## 5. Phase 1 — Foundation & indexing

| # | Change | File(s) | Acceptance | Risk |
|---|---|---|---|---|
| 1.1 | ✅ **Done** — SSR FAQ schema on `/faq` | `src/app/faq/page.tsx`, `src/lib/faq-data.ts`, `src/components/pages/FAQ.tsx` | `FAQPage`+`BreadcrumbList`+29 Qs in raw HTML (verified) | shipped, build green |
| 1.2 | ✅ **Done** — sitemap `lastModified` build-time | `src/app/sitemap.ts` | fresh `lastmod` each deploy | shipped |
| 1.3 | Resubmit `sitemap.xml` in GSC; **Request Indexing** for `/blog`, `/mobile`, blog post | — (GSC console) | URLs move to Indexed | none |
| 1.4 | Audit internal links to "crawled-not-indexed" pages; ensure footer/hub link to every indexable page | `Footer.tsx`, hub pages | each page has ≥2 internal inbound links | low |

---

## 6. Phase 2 — City web-design landing pages (the growth engine)

### Route
Create **`/web-design/[city]`** (keyword-in-path; e.g. `/web-design/mississauga`).
- Static-generate via `generateStaticParams()` for the 19 GTA cities already in `sitemap.ts`.
- Add to `sitemap.ts` (priority 0.8, monthly); link from `/locations`, footer, and `/services/web-design`.
- **301 the old `/locations` city cards → new pages**; keep `/locations` as the hub/index (§8).
- *Decision needed (§15): `/web-design/[city]` (recommended) vs `/locations/[city]`.*

### Anti-thin-content model (the important part)
Extend the data model (new `src/lib/city-content.ts`; current `LocationContent` is only `localContext` + 3 FAQs). **Every field hand-written per city** — assemble *components*, never interpolate one paragraph 19 times:

- **`intro` (120–180 words):** the city's economy, who its businesses are, why a strong site matters *here*.
- **`neighborhoods` (6–10 real):** e.g. Mississauga → Square One, Port Credit, Streetsville, Meadowvale, Erin Mills, Cooksville — woven into copy.
- **`localStats` (2–4, cited):** population, business count, dominant sectors, growth — accurate, never invented.
- **`industriesServed`:** city-specific sectors, each **linking to the matching `/{industry}/{city}`** page (internal mesh).
- **`whyZenara` (city-framed):** 3–4 differentiators for that market.
- **`localExample`:** a real project or an honestly-labeled illustrative scenario — **never a fake testimonial.**
- **`faqs` (4–6 city-specific):** power server-rendered `FAQPage` schema.
- **`pricingNote`:** transparent starting prices, locally framed.

**Rules:** ≥ 700–1,000 words **unique** body copy per page; ≥ 3 verifiable local specifics; written in the Zenara voice; one primary keyword per page; human-reviewed; built in batches (start Toronto, Mississauga, Brampton, Vaughan, Markham).

### Schema per city page (**server-rendered**, see §9)
`LocalBusiness` (areaServed = city) · `Service` (Web Design) · `FAQPage` · `BreadcrumbList` (Home → Web Design → City) — emitted as `<script data-ssr>` in the server `page.tsx`, like `/faq`.

---

## 7. Phase 3 — Fix & strengthen existing pages

| Page | Live-data symptom | Change | File(s) |
|---|---|---|---|
| **Homepage** | 179+58 impr, CTR 0.6–1.7% at pos 3.6–7.2 | Lead H1/title with "Web Design Toronto & the GTA"; add internal-link block to city pages | `Home.tsx`, `layout.tsx` title |
| **`/locations`** | 46 impr, 0% CTR, pos 25 | Convert to true hub: intro + linked grid to every `/web-design/[city]`; better title | `Locations.tsx` |
| **`/lawyers`** | **252 impr, 0% CTR, pos 47.8** (our #1 impression page!) | Expand copy + internal links + sharper title/meta; it's close to traffic | `Lawyers.tsx`, `app/lawyers/page.tsx` |
| **`/clinics`** | 98 impr, pos 47.7 | Same treatment | `Clinics.tsx` |
| **`/services/seo`** | 100 impr, pos 74.8 | Expand thin page; SSR schema; target "SEO services Toronto" | `services/SeoService.tsx` + page |
| **`/projects`** | 108 impr, pos 42.7, 0% CTR | Title/meta rewrite; ensure real portfolio depth | `Projects.tsx` |
| **`/services/*` (all 6)** | 211 B output, client-only schema | Expand copy; **move schema to SSR** (§9) | `services/*` + pages |
| **`/about`** | "Crawled, not indexed" risk; E-E-A-T weak for a no-storefront SAB | Add founders, credentials, process, real proof | `About.tsx` |
| **`/mobile`, blog post** | "Crawled, not indexed" | Strengthen or consolidate; add internal links | respective files |
| **Low-CTR titles** | `/pricing`, `/process`, `/security`, `/renovations*` 0% CTR | Benefit-led title/description rewrites | per-page `metadata` |

---

## 8. Phase 4 — Technical / GEO / Core Web Vitals

1. **SSR all important schema.** Most static pages inject JSON-LD client-side (`StructuredData` → `useEffect` → `document`). Googlebot renders JS so it sees it, but **AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) don't run JS** → schema invisible to AI search. Roll out the `/faq` SSR pattern to all `/services/*`, `/pricing`, `/about`, and city pages. **Biggest GEO lever.** *(Do this per-page and remove the matching client injection to avoid duplicate schema — see §12 regression check.)*
2. **Core Web Vitals (mobile):** LCP 4.2s + render-blocking CSS. Preload the LCP hero image; review the two render-blocking CSS files (`experimental.optimizeCss` is on — verify it helps, not hurts); defer non-critical JS. Target LCP < 2.5s.
3. **`llms.txt`:** add `/llms.txt` (who we are, services, service area, key URLs) so AI engines cite us accurately. Low effort/risk.
4. **robots.ts:** AI crawlers already allowed (`*`) — keep. No change.
5. **Entity/NAP consistency:** `Zenara Designs` · `(647) 835-1077` · `info@zenaradesigns.com` identical everywhere; verify all `sameAs` profiles in `structured-data.ts` exist and are claimed.

---

## 9. GEO / AEO specifics

- **Question-phrased H2s + 40–60 word direct answers** on city/service pages → featured snippets + AI Overview citations.
- **Server-rendered `FAQPage` on every city + service page** (§6, §8).
- **Factual density** (real local stats, not adjectives) is what AI engines synthesize.
- Spot-check Perplexity / ChatGPT Search / Google AI Overviews for "web design [city]" after launch.

---

## 10. Phase 5 — Off-page authority (not code, but decisive)

A no-storefront service-area business with **no reviews** has a hard local-rank ceiling (§16 sources). In parallel:
1. **Google Business Profile** — create/claim as a Service-Area Business (hidden address, up to 20 GTA areas), category "Web designer", real photos/posts. ~32% of local ranking signal.
2. **Real reviews** — request from every client; target 4.8★ (you correctly removed fakes — now earn real ones; ties to §3.2).
3. **Citations** — consistent NAP on Clutch, DesignRush, Google/Bing Places, Canadian directories.
4. **Links** — local sponsorships, partner backlinks, GTA business-blog guest posts.

---

## 11. Content quality guardrails (no "AI slop")

Every new/expanded page must pass before merge:
- [ ] ≥ 700 words **unique** body copy (city pages); no paragraph reused with only the city name swapped.
- [ ] ≥ 3 **verifiable** local specifics (neighborhoods, districts, real stats).
- [ ] **No invented clients, reviews, awards, or stats.** Illustrative scenarios labeled honestly.
- [ ] Zenara voice — polished, confident, minimal (Bay-Street test).
- [ ] One primary keyword per page; natural language, no stuffing.
- [ ] Human-reviewed before publish.

---

## 12. Implementation safety protocol — ship with **no new bugs**

Run for **every** change, in order:

1. **Type-check:** `npx tsc --noEmit` → 0 errors.
2. **Build:** `npm run build` → succeeds; confirm new routes prerender (`○`/`●`) and no route unexpectedly flips to dynamic (`ƒ`).
3. **Schema regression (the #1 risk in this plan):** when moving schema to SSR, **remove the corresponding client `<StructuredData>` injection** so the page doesn't emit the same schema twice. Verify in built HTML:
   `grep -c '"@type":"FAQPage"' .next/server/app/<route>.html` → exactly 1.
4. **Rich Results validation:** paste each changed page into Google's Rich Results Test (or re-run `npm run gsc-audit` post-deploy) → 0 errors. Specifically confirm the `/services` review error is gone (§3.2).
5. **No fabricated content** shipped (§3.2, §11).
6. **Internal links resolve:** no 404s from new city ↔ industry mesh (`npm run build` will surface bad `Link` targets that are typed; spot-check others).
7. **Redirects:** any `/locations` → `/web-design/[city]` 301s tested (no loops; old URL → 200 at new URL).
8. **CWV didn't regress:** `npm run pagespeed-audit` (set `PSI_API_KEY` to avoid the quota wall we hit) → perf not lower than baseline 86/93.
9. **Lint:** ESLint isn't initialized in this repo (it prompts interactively). Decide once: run `next lint` setup and pick "Strict", or skip — don't let it block CI silently.
10. **One concern per commit**, conventional-commit messages; **do not push until reviewed** (per project policy).

---

## 13. Prioritized roadmap

**Phase 0 — Critical (this week):**
- [ ] noindex/protect `project*.zenaradesigns.com` subdomains + GSC Removals (§3.1)
- [ ] Remove invalid/fake Review schema on `/services` (§3.2)
- [ ] Export GSC "not indexed" list; map all 17 (§2)
- [ ] Confirm `www` 301/canonical (§3.3)

**Phase 1 — Foundation (week 1):** resubmit sitemap + Request Indexing; internal-link orphans. (1.1/1.2 already shipped.)

**Phase 2 — City pages (weeks 2–4):** build `/web-design/[city]` + `city-content.ts`; write top-5 cities first, then the rest; 301 `/locations` cards; build the mesh.

**Phase 3 — Existing pages (parallel):** `/lawyers`, `/clinics`, `/services/seo`, homepage, `/about`, low-CTR titles.

**Phase 4 — Technical/GEO (parallel):** SSR-schema rollout; LCP; `llms.txt`.

**Phase 5 — Authority (ongoing):** GBP, reviews, citations, links.

---

## 14. How we'll measure

- **GSC weekly** (`npm run gsc-audit`): impressions/clicks/position for "web design [city]"; indexed count (target 17→≤5 intentional); CTR on rewritten titles; Rich Result Issues = 0.
- **PageSpeed** (`npm run pagespeed-audit`, needs `PSI_API_KEY`): LCP < 2.5s mobile.
- **Leads:** consultation submissions attributed to city pages.
- **AI visibility:** Perplexity / ChatGPT Search / AI Overviews citations for target queries.

---

## 15. Open decisions for you

1. **Route:** `/web-design/[city]` (recommended) vs `/locations/[city]`?
2. **City scope:** all 19, or start top 5–6 by volume?
3. **Per-city copy:** you write it, or I draft against §11 guardrails for your review?
4. **Subdomains:** what are `projectfour`/`projecttwo` — Vercel preview deploys, client demos, or DNS subdomains? (Determines the §3.1 fix.)
5. **Testimonials:** remove the fake ones entirely, or keep visually but drop the schema (§3.2)?
6. **GBP:** any existing profile to claim, and who owns review outreach?

---

## 16. Appendix

### Live GSC snapshot (28 days → May 30, 2026)
- Clicks 4 · Impressions 1,280 · CTR 0.3% · Avg pos 36.3
- Indexed (inspected) 55/59 · Rich-result errors 1 (`/services`) · Mobile issues 0
- Top impression pages: `/lawyers` 252 · `www/` 179 · `projectfour.` 165 · `/projects` 108 · `/services/seo` 100 · `/clinics` 98
- Full report: `gsc-audit-report.md`

### Research sources
- [Toronto SEO 2026 — what moves rankings](https://bizstori.ca/toronto-seo-in-2026-what-actually-moves-rankings-for-local-businesses/)
- [Local SEO Toronto 2026 — Maps & AI Search](https://cyberlinkdigital.com/local-seo-toronto-2026/)
- [Whitespark 2026 Local Search Ranking Factors](https://whitespark.ca/local-search-ranking-factors/)
- [SangFroid — city pages & local landing page examples](https://www.sangfroidwebdesign.com/local-seo/city-pages-good-seo-local-landing-page-examples/)
- [SangFroid — ranking surrounding cities (2026)](https://www.sangfroidwebdesign.com/local-seo/city-pages/)
- [Search Engine Land — programmatic SEO guide](https://searchengineland.com/guide/programmatic-seo)
- [Neil Patel — local landing pages that convert](https://neilpatel.com/blog/the-step-by-step-guide-to-designing-local-landing-pages-that-convert/)
- [12AM Agency — local SEO for service-area businesses](https://12amagency.com/blog/local-seo-strategy-for-service-area-businesses/)
- [Orange SEO — ranking without a physical location (Jan 2026)](https://www.orangeseo.net/blog/2026/1/15/how-service-area-businesses-can-rank-on-google-without-a-physical-location)
- [Google — manage service areas for SABs](https://support.google.com/business/answer/9157481?hl=en)
- Competitor page-1 set: [Web Sharx](https://www.websharx.ca/), [Webstudio](https://www.webstudio.ca/), [Web Vertical Domains](https://webverticaldomains.com/), [Web Swiggy](https://www.webswiggy.ca/website-designing-services/), [Consensus Creative](https://consensuscreative.com/), [Parachute Design](https://parachutedesign.ca/)
