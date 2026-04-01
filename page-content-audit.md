# Page Content Audit — Indexing Risk & Improvement Plan
_Last updated: Mar 30, 2026_

---

## Methodology

Every page in the sitemap (105 URLs) was analyzed for:
- **Word count** — Google rarely indexes pages under ~300 words of unique content
- **Content uniqueness** — duplicate/templated content triggers "crawled but not indexed"
- **Internal linking** — orphan pages with few inbound links get deprioritized
- **Structured data** — pages with schema markup get richer SERP features
- **Search intent match** — does the content answer what the target query is actually asking?

Pages are ranked from **highest risk** (most likely to be excluded from the index) to **lowest risk**.

---

## Risk Tier 1 — High Risk (Action Required)

### 1. Dynamic Location Pages (~58 pages)
**Routes:** `/lawyers/[location]`, `/accountants/[location]`, `/clinics/[location]`, `/renovations/[location]`
**Word count:** ~800-1,000 per page
**Unique content per page:** ~100-150 words (2-3 sentences)

**Problem:**
These pages are the single biggest indexing risk. Each industry has 14-19 location variants (Toronto, Mississauga, Brampton, Vaughan, etc.) that share ~60% identical content — same statistics, same feature lists, same testimonials, same FAQ answers. The only unique content is 2-3 sentences mentioning the city name.

Google's [helpful content system](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) specifically targets "creating many pages for different cities or states to try to rank for those searches." With 58 near-identical pages, Google will likely:
- Index 1-2 per industry and suppress the rest as duplicates
- Apply a soft penalty to the entire `/[industry]/[location]` pattern
- Show "Duplicate without user-selected canonical" in GSC

**Current state in GSC:** All location pages show "URL unknown to Google" — they haven't been crawled yet. Once Google does crawl them, expect most to land in "crawled but not indexed."

**Improvement Plan:**

| Action | Priority | Impact |
|--------|----------|--------|
| Add 150-200 words of genuinely unique content per city (local landmarks, business districts, competitor landscape, relevant bylaws) | Critical | Differentiates pages enough to pass duplicate filter |
| Add city-specific testimonials or case studies where available | High | Strongest uniqueness signal |
| Vary the FAQ answers per city (e.g., "What do Toronto lawyers pay for websites?" vs "What do Mississauga lawyers pay?") | High | FAQ content is currently 100% identical across locations |
| Add a "Businesses we've helped in [City]" section with real project links | Medium | Internal linking + unique content |
| Consider consolidating to top 5-6 cities per industry instead of 14-19 | Medium | Fewer, stronger pages > many thin pages |
| Add LocalBusiness structured data with city-specific `areaServed` | Medium | Helps Google understand geographic intent |
| Implement `hreflang` or canonical strategy if pages are too similar | Low | Fallback if unique content isn't feasible |

**Target:** Each location page should have at least 300 words of content that appears on no other page on the site.

---

## Risk Tier 2 — Moderate Risk (Should Improve)

### 2. Blog Index Page (`/blog`)
**Word count:** ~200 words
**Unique content:** Minimal — page title, subtitle, and a grid of post cards

**Problem:**
The blog index is a structural page with almost no indexable content of its own. It's essentially a list of links. Google may index it as a thin page or skip it entirely. Currently shows "URL unknown to Google" in GSC.

Blog index pages can rank for queries like "zenara designs blog" or "toronto web design tips," but only if they have enough content to demonstrate topical authority.

**Improvement Plan:**

| Action | Priority | Impact |
|--------|----------|--------|
| Add a 100-150 word intro paragraph explaining what the blog covers and who it's for | High | Gives Google content to index |
| Add category/tag filtering if post count grows beyond 10 | Medium | Creates additional indexable facets |
| Add a "Featured Post" hero section at the top | Low | Increases engagement signals |

---

### 3. Contact Page (`/contact`)
**Word count:** ~400-500 words
**Unique content:** Mostly form fields and labels

**Problem:**
Contact pages are inherently thin — they exist for conversion, not content. Google generally indexes them but ranks them poorly. The bigger risk is that the page's primary content is a form, which Google can't meaningfully parse.

Currently "URL unknown to Google" in GSC.

**Improvement Plan:**

| Action | Priority | Impact |
|--------|----------|--------|
| Add a 100-word paragraph above the form explaining what happens after submission (response time, what to expect) | Medium | Adds indexable content |
| Wrap contact info (phone, email) in `<address>` element | Medium | Semantic HTML signal for local SEO |
| Add a mini FAQ below the form (3-4 questions about working with Zenara) | Medium | Adds 200+ words of unique content |
| Ensure the page has LocalBusiness structured data | Low | Already partially in place via layout |

---

### 4. Projects/Portfolio Page (`/projects`)
**Word count:** ~600-700 words
**Unique content:** Project cards with short descriptions

**Problem:**
Portfolio pages often struggle with thin content because the "content" is primarily visual (screenshots, project cards). Google can't index images as effectively as text. The page has some good text (project descriptions, client names, industry tags) but could be stronger.

Was previously indexed but may lose ranking to competitors with detailed case studies.

**Improvement Plan:**

| Action | Priority | Impact |
|--------|----------|--------|
| Expand each project card with 2-3 sentences about the challenge, solution, and result | High | Transforms thin cards into mini case studies |
| Add measurable outcomes where possible ("40% increase in leads", "2s faster load time") | High | Google values E-E-A-T signals like demonstrated expertise |
| Link each project to the relevant service and industry page | Medium | Strengthens internal link graph |
| Add a summary paragraph at the top ("We've built 20+ websites for Toronto businesses...") | Medium | Adds indexable intro content |

---

## Risk Tier 3 — Low Risk (Monitor)

### 5. About Page (`/about`)
**Word count:** ~800-1,000 words
**Status in GSC:** "Crawled but not indexed" for 5+ months

**Problem:**
Google has seen this page and chosen not to index it. This is worse than "URL unknown" — it means Google actively decided the content wasn't worth indexing. Possible reasons:
- Content may read as generic agency boilerplate
- No E-E-A-T signals (team bios, credentials, years of experience)
- Competing with thousands of similar "about us" pages

**Improvement Plan:**

| Action | Priority | Impact |
|--------|----------|--------|
| Add detailed team bios with names, roles, credentials, and photos | Critical | E-E-A-T is the #1 ranking factor for service businesses |
| Add specific founding story (why Zenara was started, what problem it solves) | High | Unique narrative content Google can't find elsewhere |
| Add client logos or "trusted by" section with real company names | High | Trust signals |
| Add a timeline or milestones section | Medium | Unique content that differentiates from boilerplate |
| Request re-indexing in GSC after improvements | Critical | Google already rejected this page — must re-submit |

---

### 6. Services Hub Page (`/services`)
**Word count:** ~800-1,000 words
**Status in GSC:** "Crawled but not indexed" for 5+ months

**Problem:**
Same as About — Google crawled it and said "no." The services hub is likely too similar to the individual service pages, creating a near-duplicate situation. Hub pages need to offer something the subpages don't.

**Improvement Plan:**

| Action | Priority | Impact |
|--------|----------|--------|
| Add a unique intro paragraph that isn't repeated on any subpage (positioning statement, why Zenara's approach is different) | High | Differentiates from subpages |
| Add a comparison table or "which service is right for you?" section | High | Unique content format Google favors |
| Add pricing starting points or "from $X" indicators | Medium | Attracts commercial-intent queries |
| Ensure internal links to all 6 service subpages are prominent | Medium | Establishes hub-and-spoke architecture |
| Request re-indexing in GSC after improvements | Critical | Must re-submit after changes |

---

### 7. Mobile Page (`/mobile`)
**Word count:** ~800-1,000 words
**Status in GSC:** "Crawled but not indexed"

**Problem:**
Third page Google has actively rejected. "Mobile-first design" is a highly competitive topic dominated by major publications (Smashing Magazine, Google's own docs). The page may not offer enough unique value to compete.

**Improvement Plan:**

| Action | Priority | Impact |
|--------|----------|--------|
| Add Toronto-specific mobile usage statistics or case studies | High | Localizes the content, reduces competition |
| Add before/after screenshots of mobile optimizations | High | Visual proof of expertise |
| Add specific technical details (responsive breakpoints, performance budgets) | Medium | Demonstrates depth of knowledge |
| Consider merging into the services hub if it can't be differentiated | Low | Fewer, stronger pages > many weak ones |
| Request re-indexing in GSC after improvements | Critical | Must re-submit |

---

## Risk Tier 4 — No Risk (Strong Pages)

These pages have sufficient unique content and are either already indexed or likely to be indexed without issues.

### Individual Service Pages (6 pages)
**Routes:** `/services/web-design`, `/services/ecommerce`, `/services/logo-design`, `/services/business-cards`, `/services/seo`, `/services/hosting`
**Word count:** 2,600-3,200 words each
**Assessment:** Excellent depth. Each page has unique hero content, detailed feature breakdowns, process explanations, and FAQs with page-specific answers. These are among the strongest pages on the site.

### Industry Hub Pages (4 pages)
**Routes:** `/lawyers`, `/accountants`, `/clinics`, `/renovations`
**Word count:** 4,500-5,500 words each
**Assessment:** Very strong. Extensive industry-specific content, tailored messaging, relevant statistics, and detailed service descriptions. These should index and rank well for industry-specific queries.

### FAQ Page (`/faq`)
**Word count:** 2,200-2,600 words
**Assessment:** Strongest content page on the site. Comprehensive Q&A format that Google loves. Has FAQPage structured data. Should rank for long-tail "how much does web design cost in Toronto" type queries.

### Pricing Page (`/pricing`)
**Word count:** 1,200-1,500 words
**Assessment:** Strong commercial page with clear pricing tiers, feature comparisons, and FAQ section. Product structured data in place. Fixed heading hierarchy (h3 -> h2) already deployed.

### Process Page (`/process`)
**Word count:** 1,000-1,200 words
**Assessment:** Good depth with 6-step breakdown. Unique content that competitors don't typically have. Should index without issues.

### Security Page (`/security`)
**Word count:** 800-1,000 words
**Assessment:** Niche topic with low competition. Unique content about SSL, backups, monitoring. Should index and potentially rank for "website security toronto" type queries.

### Locations Hub Page (`/locations`)
**Word count:** 800-1,000 words
**Assessment:** Good hub page with city listings and recently added industry cross-links. Highest impression page (124 in 28 days). Should index; focus on improving CTR via title/meta optimization.

### Blog Posts (6 posts)
**Word count:** 1,200-1,800 words each
**Assessment:** Good depth per post. BlogPosting structured data with SSR (server-rendered JSON-LD). Featured images linked in OG tags. Should index without issues once Google crawls them.

### Homepage (`/`)
**Word count:** 1,500-2,000+ words (across all sections)
**Assessment:** Strong page with multiple content sections, industry links, CTAs, and structured data. Already indexed. Main improvement: add "Toronto" to h1 (noted in gsc-findings.md).

---

## Priority Action Summary

### Immediate (This Week)
1. Begin adding unique city-specific content to location pages — start with top 5 cities per industry
2. Add team bios and founding story to About page, then request re-indexing
3. Add unique positioning content to Services hub, then request re-indexing
4. Add intro paragraph to blog index page

### Short-Term (Next 2 Weeks)
5. Expand project descriptions into mini case studies
6. Add FAQ section below contact form
7. Localize Mobile page content with Toronto-specific data
8. Consider consolidating location pages to top 5-6 cities if unique content isn't feasible

### Ongoing
9. Monitor GSC "crawled but not indexed" pages weekly
10. Track which location pages get indexed vs suppressed
11. Add new blog posts targeting commercial keywords (see content strategy in gsc-findings.md)
12. Request re-indexing for any page after significant content additions

---

## Key Metrics

| Category | Pages | Risk Level | Indexing Forecast |
|----------|-------|------------|-------------------|
| Location pages | ~58 | High | Expect 70%+ to be "crawled not indexed" without unique content |
| Blog index | 1 | Moderate | Will index but rank poorly |
| Contact | 1 | Moderate | Will index, limited ranking potential |
| Projects | 1 | Moderate | Indexed but vulnerable to rank drops |
| About | 1 | Low-Moderate | Currently rejected — needs content overhaul |
| Services hub | 1 | Low-Moderate | Currently rejected — needs differentiation |
| Mobile | 1 | Low-Moderate | Currently rejected — needs localization |
| Service subpages | 6 | None | Strong, will index |
| Industry hubs | 4 | None | Very strong, will index |
| FAQ, Pricing, Process, Security, Locations, Homepage | 6 | None | Strong, will index |
| Blog posts | 6 | None | Good, will index |

**Bottom line:** The site's core pages are strong. The critical risk is the ~58 location pages, which represent 55% of the sitemap but have only ~15% unique content each. Fixing these is the single highest-impact action for getting from 15 indexed pages to 80+.
