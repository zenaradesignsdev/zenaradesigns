# Site Audit — SEO, Performance, Mobile

_Generated 2026-08-26 · Against the current working tree (uncommitted)_

> **Status: all 15 findings implemented and verified (2026-08-26).** Row numbers match the section numbers below.
> Verified on a clean production build: 56 static pages, `lint` clean (1 accepted `<img>` warning), `type-check` clean,
> 31 routes returning 200, correct 404s on every dynamic route, and zero console errors.

Scope: all 55 static pages, the full `src/` tree, `next.config.mjs`, and a clean production build (`npm run build` → `npm run start`). Medium-to-high impact only; micro-optimisations deliberately omitted.

**Evidence levels used below:**

| Tag | Meaning |
| --- | --- |
| **Measured** | I reproduced it against a running production build or the built bundle. Numbers are real. |
| **Verified** | Confirmed by reading the actual code at the cited line. |
| **Reported** | Surfaced by an audit pass, plausible, but not independently reproduced. Confirm before acting. |

---

## 0. Priority summary

| # | Finding | Impact | Effort | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Homepage hero CTA clipped and unreachable on phones | Conversion | S | Measured | ✅ Done |
| 2 | `/blog/*` returns HTTP 200 for any slug (soft 404) | Indexing | XS | Measured | ✅ Done |
| 3 | Sitewide JSON-LD still sells deleted services | SEO trust | S | Verified | ✅ Done |
| 4 | Whole-page `'use client'` inflates 6 routes to 148–156 kB | LCP/INP | L | Measured | ✅ Done |
| 5 | Hero `<h1>` animation gates the LCP element (~21 pages) | LCP | M | Verified | ✅ Done |
| 6 | Font loads weight 800 (0 uses), omits 200 (125 uses) | Render bug | XS | Measured | ✅ Done |
| 7 | Dead Sonner toaster ships 33.5 kB on every page | Bundle | XS | Measured | ✅ Done |
| 8 | Competing `priority` images; portfolio shots at `quality=60` | LCP | XS | Verified | ✅ Done |
| 9 | No real OG image; no page sets a Twitter card | Social CTR | M | Verified | ✅ Done |
| 10 | Breadcrumb schema client-injected on 5 pages | SEO | M | Verified | ✅ Done |
| 11 | `/services` omits 2 services; stale copy on it and the 404 page | SEO/brand | S | Verified | ✅ Done |
| 12 | `sitemap.ts` stamps every URL "modified now" each deploy | Crawl budget | XS | Verified | ✅ Done |
| 13 | Pricing feature lists render at 12px on mobile | Readability | XS | Verified | ✅ Done |
| 14 | No click-to-call outside footer / contact page | Conversion | S | Verified | ✅ Done |
| 15 | Touch targets rely on a breakpoint-scoped global override | Mobile a11y | XS | Verified | ✅ Done |

---

## P0 — Fix first

### 1. The homepage hero CTA is clipped off-screen on phones — ✅ FIXED

**Where:** `src/components/home/HeroSection.tsx:105`

```
className="hero-section h-screen flex items-center justify-center relative overflow-hidden ..."
```

**Measured at 375×667 (iPhone SE/8), production build:**

| Metric | Value |
| --- | --- |
| Hero content needs | ~840–870 px |
| Hero rendered height | 667 px (`h-screen`) |
| Clipped | ~175–200 px |
| "Launch Your Project" CTA | y = 634 → **682** |
| Fits in viewport | **No** |

`h-screen` compiles to literal `height:100vh` — confirmed in the built CSS (`.h-screen{height:100vh}`); Tailwind 3.4 does **not** auto-upgrade to `dvh`. Combined with `overflow-hidden` and `items-center`, the excess is silently cropped from both ends with no scroll affordance. The primary conversion button is cut off and cannot be reached.

This is not an old-device edge case. At **390×844 (iPhone 14/15)** the CTA sits at y=771; iOS Safari with the address bar showing leaves roughly 734 px visible, so it falls outside the usable area there too.

There is no visual glitch and no error — the button is simply absent.

**Fixed 2026-08-26:** `h-screen` → `min-h-screen`; `overflow-hidden` moved from the section onto the two `absolute inset-0` decorative layers (all it was ever needed for — the blur circles overhang); inner box `h-full` → `w-full` plus bottom padding.

Verified at 375×667 on a production build: hero now grows to 750 px, `clipped: false`, `overflow: visible`, CTA reachable by scrolling, no horizontal overflow, background gradients still clip correctly.

---

### 2. `/blog/<anything>` returns HTTP 200 with "Page not found" — ✅ FIXED

**Where:** `src/app/blog/[slug]/page.tsx` — no `notFound()` call, no `dynamicParams = false`.

**Measured against a clean production build:**

```
/blog/this-post-does-not-exist  -> HTTP 200   <-- soft 404
/blog/another-fake-one          -> HTTP 200   <-- soft 404
/projects/nope                  -> HTTP 404   OK
/industries/fake                -> HTTP 404   OK
/web-design/nowhere             -> HTTP 404   OK
```

`blog/[slug]` is the **only** dynamic route missing this guard. Its three siblings all have both `dynamicParams = false` and `notFound()`. Instead, `BlogPost.tsx:20` renders a `<NotFound />` component inside a 200 response.

This is precisely the unbounded-doorway-page problem already deliberately closed for `/{industry}/{city}` (see the comment in `next.config.mjs`) — it was just missed on blog. Google can crawl an unlimited set of `/blog/*` URLs all returning 200.

**Fixed 2026-08-26:** added `export const dynamicParams = false;` and `if (!post) notFound();`.

Verified on a production build — `/blog/this-post-does-not-exist` → **404**, `/blog/another-fake` → **404**, real posts still 200.

---

### 3. Sitewide structured data still sells deleted services

**Where:** `src/app/layout.tsx` — lines 81–82, 124–141, 154–155, 175

This JSON-LD is server-rendered into `<head>` on **every page** (`data-ssr="true"`), so it is the schema Google actually parses. It currently:

- describes the business around "business cards, logo design" — both merged into `/services/branding` and 301'd
- lists `Offer` entries named `Business Cards Design` and `Logo Design GTA` — pages that no longer exist
- leads with "Toronto & GTA" while every page title now leads with Markham

Schema that contradicts on-page content is a trust signal problem, and it actively undersells the current service lineup.

**Fix:** rewrite the three description strings and replace the offer catalog with the seven live services (Web Design, Branding, Website Maintenance, SEO, GEO, E-Commerce, Website Redesign). `areaServed` is already correct — leave it.

---

## P1 — Performance

### 4. Whole-page `'use client'` is inflating six routes

**Measured** (shared baseline = 87.4 kB):

| Route | First Load JS | Over baseline |
| --- | --- | --- |
| `/contact` | **156 kB** | +69 kB |
| `/accountants` `/clinics` `/lawyers` `/faq` `/renovations` | **148 kB** | ~+61 kB |
| `/services/*` (7 pages) | 122 kB | +35 kB |

Root cause: `Accountants.tsx`, `Clinics.tsx`, `Lawyers.tsx`, `Renovations.tsx`, `FAQ.tsx`, `Contact.tsx` (~2,886 lines combined) each open with `'use client'` for the whole file, while the genuine client need is tiny — one `useState` driving a cosmetic image fade, plus a `useEffect` that hand-injects JSON-LD. `FAQ.tsx` has **zero hooks** and is client-only because it composes two components that are already client components.

Consequence: every static copy string, plus the whole `MiniContactForm` import graph (`zod` ≈ 13.25 kB gzip, Radix Accordion ≈ 4.2 kB, sanitisation helpers ≈ 4.2 kB), ships in the initial bundle for a below-the-fold form most visitors never reach.

**The pattern to copy already exists in this repo.** `src/components/pages/WebDesignCity.tsx:68` is a Server Component with a comment explaining exactly this reasoning, and `src/app/accountants/page.tsx:26` already SSRs its schema via `<JsonLd>`.

**Fix, per page:**
1. Drop `'use client'` from the five page components.
2. Delete the `useEffect` schema injection; add one more `<JsonLd schema={...} />` in the matching `page.tsx` (this also fixes finding #10 for those routes).
3. Extract the hero fade `useState` into a small leaf client component, or drop it.
4. Wrap `<MiniContactForm>` and the FAQ `<Accordion>` in `next/dynamic()` — they're below the fold, and Next excludes dynamic chunks from First Load JS.

**Expected:** those six routes drop to roughly 90–100 kB, and `/contact` falls under the 150 kB ceiling.

---

### 5. The LCP element is animated on ~21 pages

**Where:** `src/components/ui/text-reveal.tsx:70-72`, used with `as="h1"` across 21 page components.

`TextReveal` renders each line at `opacity-0 translate-y-[155%]` and only flips to visible after **hydration completes and an IntersectionObserver fires**, over a 700 ms transition with per-line stagger. On these text-heavy pages the `<h1>` *is* the LCP candidate, so LCP cannot be recorded until that whole chain finishes.

Two clarifications worth having:

- **SEO is fine.** The text is present in the server HTML — crawlers read it. Only the paint is delayed.
- **But it is worse than a perf issue.** With `opacity-0` as the server-rendered state and JS as the only path to visibility, if JS fails or is blocked the `<h1>` stays invisible permanently on all 21 pages.

The homepage already does this correctly — `HeroSection.tsx` uses a plain CSS `hero-text-fade` class with no JS gate.

**Fix:** stop wrapping hero `<h1>` elements in `TextReveal`; use the CSS-only approach the homepage already uses. Keep `TextReveal` for below-the-fold section headings.

---

### 6. Font loads a weight nothing uses and omits the one used 125 times — ✅ FIXED

**Where:** `src/lib/fonts.ts:5` — `weight: ['300','400','500','600','700','800']`

**Measured usage across `src/`:**

| Class | Weight | Usages | Loaded? |
| --- | --- | --- | --- |
| `font-extralight` | 200 | **125** | ❌ No |
| `font-extrabold` | 800 | **0** | ✅ Yes |
| `font-black` | 900 | 4 | ❌ No |

So the extralight styling used on most hero headings is being synthesised from weight 300 and never renders as designed, while a weight with zero usages is downloaded on every page.

**Fixed 2026-08-26:** `weight` is now `['200','300','400','500','600','700']`.

---

### 7. A dead toast library ships on every page — ✅ FIXED

**Where:** `src/components/providers.tsx:7,16`

- `<Sonner />` is mounted globally, but `sonner`'s `toast()` is **never called anywhere**. Only the shadcn `useToast` is used (`Contact.tsx:31`, `MiniContactForm.tsx:32`). **Measured:** chunk `6763.js` = **33.5 kB**, fetched on the homepage for zero benefit.
- `<TooltipProvider>` wraps the entire app, but no `Tooltip` is ever rendered — pulling `@radix-ui/react-tooltip` into the shared chunk.

**Fixed 2026-08-26:** both removed from `providers.tsx`; `src/components/ui/sonner.tsx` and `src/components/ui/tooltip.tsx` deleted; `npm uninstall sonner @radix-ui/react-tooltip`.

Verified: no `sonner` or tooltip code remains in any built chunk. Note the reported First Load JS is unchanged, because these were `dynamic()` imports which Next excludes from that metric — the saving is real bytes fetched at runtime, not the build-table number.

---

### 8. Four `priority` images compete on every page — ✅ FIXED

**Where:** `HeroSection.tsx:98,180` and `Navbar.tsx:249,369`

`priority` preloads eagerly; using it on several images per page makes them contend for early bandwidth and dilutes the hint. The nav logo (`Navbar.tsx:369`) carries it on *every* page and is never an LCP candidate. The homepage's real LCP is the H1 text, so neither hero logo needs it either.

**Fixed 2026-08-26 — with one correction to the original recommendation.** `HeroSection.tsx:98` **keeps** its `priority`: on inspection that image sits inside a full-screen `z-[10002]` loading overlay, so it genuinely is the first paint and the LCP candidate. Removing it would have hurt LCP. Instead `priority` was removed from `HeroSection.tsx:180` (same logo, but behind the overlay, and its different `sizes` generated a second competing preload) and from `Navbar.tsx:369` (32×32, every page, never LCP).

`quality={60}` → `85` on `PortfolioSection.tsx:135` and `Services.tsx:380`.

---

## P2 — SEO completeness

### 9. No real Open Graph image; no page sets a Twitter card

- `public/og-image.*` **does not exist**. Every share falls back to `web-app-manifest-512x512.png` — a 512×512 square icon, not the 1200×630 landscape format social platforms expect. Links render as a small logo tile instead of a preview card.
- `layout.tsx:46` defines a `twitter` block, but **zero** `page.tsx` files override it. Next does not deep-merge `twitter`/`openGraph` across segments, so all 55 pages share the homepage's card. Sharing a case study or `/services/seo` shows homepage copy.

**Fix:** create a real 1200×630 `public/og-image.jpg`; add a per-page `twitter` block derived from the `openGraph` values each page already sets.

### 10. Breadcrumb schema still client-injected on 5 pages

`Home.tsx:29`, `Contact.tsx:511`, `Schedule.tsx:167`, `Projects.tsx:697`, `Blog.tsx:266` still use `<StructuredData>`, which injects JSON-LD in a `useEffect` — invisible to crawlers that don't execute JS. 17 other pages already migrated to the SSR `<JsonLd>` component. The homepage is the highest-value URL for sitelinks and is among the ones missed.

**Fix:** move schema construction into the matching `page.tsx` and render via `<JsonLd>`, as `src/app/industries/[slug]/page.tsx` already does.

### 11. `/services` omits two live services and its copy is stale

- `Services.tsx:102` — `SUB_SERVICES` is missing `/services/geo` and `/services/website-redesign`. The hub page that should pass authority to them doesn't mention either.
- `src/app/services/page.tsx:6` — title still advertises "Logo & Business Cards"; description says "Toronto business", "managed hosting", and "6 services" (there are 7).
- `src/app/not-found.tsx:5,16` — title `"... | Zenara Designs Toronto"` and `<h1>Web Design Toronto - Page Not Found</h1>`. Keyword-stuffed and off-brand post-repositioning.

### 12. `sitemap.ts` marks every URL modified on every deploy

`src/app/sitemap.ts:8` — `const lastModified = new Date()` is shared by ~50 static routes. Every deploy tells Google all 50 pages changed. Search engines discount `lastmod` when it's always "now", which then devalues it for pages that genuinely did change. The blog routes already do this correctly via `post.updatedAt ?? post.publishedAt`.

**Fix:** use real per-section dates; only bump when content changes.

---

## P3 — Mobile

### 13. Pricing feature lists render at 12px

`Pricing.tsx:367,592` — `text-xs sm:text-sm` on actual plan-feature copy, combined with `text-white/60`. This is the page most likely to convert a mobile visitor, at half the 16px body minimum and reduced contrast. **Fix:** `text-sm sm:text-base` minimum.

### 14. No click-to-call outside the footer and contact page

Only two `tel:` links exist sitewide (`Footer.tsx:175`, `Contact.tsx:225`). A mobile visitor from search must open the hamburger → Contact → scroll, or scroll to the footer, before they can call. **Fix:** add a `tel:` action in the mobile header, or a `sm:hidden` sticky "Call now" bar, using `BUSINESS_PHONE_E164` from `constants.ts:6`.

### 15. Touch targets that rely on a global override

`Navbar.tsx:447` hamburger is `w-10 h-10` (40px); `Contact.tsx:348,370,389` selects are `h-10 sm:h-11` — mobile-first inverted. Both currently reach 44px only via the blanket rule in `globals.css:372`, which is scoped `max-width: 768px`. Between 769px and `lg:`, the hamburger is still visible but reverts to a true 40px. **Fix:** set `w-11 h-11` / `h-11` directly in the markup.

---

## Corrections — things that look like findings but aren't

Worth recording so they don't get "fixed" later:

- **`date-fns` is used**, in `BlogCard.tsx:7` and `BlogMetadata.tsx:3`. An audit pass reported it unused; that is wrong. Do not remove it.
- **`src/components/pages/NotFound.tsx` is used**, by `BlogPost.tsx:20`. Reported as a deletable duplicate; it is not. (The separate root `src/app/not-found.tsx` is the one with stale copy — see #11.)
- **`critters` must stay.** Nothing imports it, but `experimental.optimizeCss` in `next.config.mjs` loads it internally and the build fails without it.
- **`PerformanceMonitor` is correctly gated** — lazy-loaded *and* dev-only, so `web-vitals` never reaches production.
- **`sharp` not installed locally** is a non-issue; Vercel provides it.
- **`GoogleReviews.tsx:172` raw `<img>`** is an accepted tradeoff: 48×48, lazy, below the fold, from a Google CDN not in `remotePatterns`.

Already healthy and worth preserving: redirect coverage is complete for every deleted route; `robots.ts` correctly keeps `/payments` crawlable so its `noindex` is actually seen; all 55 pages are static; `prefers-reduced-motion` is handled globally; the mobile nav has proper scroll-lock, Escape handling, and route-change close; no dynamically-constructed Tailwind class names anywhere.

---

## Suggested sequence

1. **#2 blog soft-404** and **#6 font weights** — minutes each, zero risk.
2. **#1 hero clipping** — small change, directly recovers a blocked conversion path.
3. **#7 dead toaster**, **#8 priority images** — quick bundle wins.
4. **#3 stale schema**, **#11 stale copy** — copy-only, no code risk.
5. **#4 server components** — the biggest win, but the largest diff. Do one page first (`FAQ.tsx`, which has no hooks) to establish the pattern, then repeat.
6. **#5 LCP animation** — pairs naturally with #4.
7. Remainder as capacity allows.

## Verifying

```bash
npm run lint && npm run type-check && npm run build
npm run start   # then re-run the soft-404 check:
for u in /blog/fake /projects/fake /industries/fake /web-design/fake; do
  echo "$u -> $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000$u)"
done
```

Watch First Load JS in the build table for `/contact`, `/accountants`, `/clinics`, `/lawyers`, `/faq`, `/renovations` — the target is ~90–100 kB against the 87.4 kB baseline.

---

## Implementation log — 2026-08-26

All 15 findings applied. Nothing committed.

### Route weight (First Load JS, shared baseline 87.4 → 87.5 kB)

| Route | Before | After |
| --- | --- | --- |
| `/accountants` `/clinics` `/lawyers` `/faq` `/renovations` | 148 kB | **109 kB** |
| `/services/*` (7 pages) | 122 kB | **102 kB** |
| `/contact` | 156 kB | **151 kB** |

`/contact` moves least because its form is the page's purpose and sits at the fold, so it can't be deferred. The win there is different: the page is now a Server Component with the form as the only client island, so ~330 lines of static JSX no longer hydrate.

### Notable decisions

- **`HeroSection.tsx:98` kept its `priority`.** The audit said to remove it; on inspection that image is inside a full-screen `z-[10002]` loading overlay, so it genuinely is the first paint. Removed it from the hero logo behind the overlay and the nav logo instead.
- **`TextReveal` now renders `h1` immediately** rather than adding a prop at 21 call sites. A new `h1` can't accidentally reintroduce the LCP gate.
- **`MiniContactForm` is deferred via `LazyMiniContactForm`** (`ssr: false` + a sized placeholder) only on pages where it sits below the fold. This is what took the industry/FAQ pages from 135 kB to 109 kB.
- **`twitter.images` is deliberately not set per page.** Next derives it from `openGraph.images`; setting it explicitly overrode each page's own photo with the generic card.

### Found while implementing (beyond the original findings)

- **20 pages had no `og:image` at all** — not the square-icon fallback the audit assumed. Defining `openGraph` in a page replaces the layout's block wholesale rather than merging, so those pages shipped with no social image. Fixed by adding `images: ['/opengraph-image']` to each.
- The OG image is now generated at build time by `src/app/opengraph-image.tsx` (`next/og`), served as a real 1200×630 PNG, instead of a hand-made asset.
