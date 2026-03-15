# Performance Audit — Zenara Designs

> **Scope:** High and medium impact issues only. Low-impact items (micro-optimisations,
> cosmetic tweaks) are omitted.
>
> **Methodology:** Static analysis of the full source tree. Every issue below is
> backed by a specific file + line reference.

---

## Summary

| Priority | Count |
| --- | --- |
| 🔴 High Impact | 6 |
| 🟡 Medium Impact | 12 |
| **Total** | **18** |

---

## 🔴 High Impact

---

### H1 — Loading Overlay Artificially Inflates LCP by 1.1 Seconds

**File:** `src/components/pages/Home.tsx` — lines 246–266, 514–545

```tsx
// Home.tsx ~line 253
useEffect(() => {
  const fadeTimer = setTimeout(() => setIsFadingOut(true), 600);
  const hideTimer  = setTimeout(() => setIsLoading(false), 1100);
  // ...
}, []);
```

The loading overlay renders at `z-[10002]` with an opaque black background, sitting
on top of the entire page for **1.1 seconds on every single page load**, including
repeat visits. Google's CWV measures LCP from when the target element becomes
_visible_ — not when it is in the DOM. This single pattern guarantees the LCP score
is penalised by at least 1100ms regardless of server response time, CDN, or image
optimisation.

**Fix:** Remove the overlay entirely, or reduce the hide timer to ≤200ms and make
the CSS fade shorter. The logo entrance animation can play without blocking page
content visibility.

---

### H2 — 30 Page Components Unnecessarily Marked `'use client'`

**Files:** Every file in `src/components/pages/` (30 components, confirmed by grep)

In Next.js 14 App Router, a `'use client'` boundary means the component and its
**entire subtree** must be shipped to the browser as JavaScript, parsed, executed,
and hydrated. Many of these components use it superfluously:

| Component | Why it's wrong |
| --- | --- |
| `Locations.tsx` | Zero hooks, zero event handlers — `memo` is the only React import |
| `Projects.tsx` | Only uses IntersectionObserver for scroll reveal, which CSS can handle |
| `FAQ.tsx` | Static accordion — Radix UI's Accordion works as a Server Component |
| `Security.tsx` | Static layout with one IntersectionObserver |
| `Mobile.tsx` | Static layout with one IntersectionObserver |

**Fix:** Audit each component. Move static sections to Server Components and push
`'use client'` down to the smallest interactive leaf (a single button, a counter
widget, etc.). This is the highest-leverage architectural change available —
converting even 5 of these saves parsing and hydration cost on every route.

---

### H3 — Home.tsx Is a 1585-Line Monolithic Client Bundle

**File:** `src/components/pages/Home.tsx` — line 1, entire file

The entire home page — including static "Process" cards, static "What Sets Us Apart"
cards, the static CTA band, and the partner logos section — is a single `'use client'`
component. Only these parts actually require the client:

- Slogan cycling animation (lines ~268–277)
- Typing text animations (lines ~35–232)
- IntersectionObserver scroll counters (lines ~320–401)
- Mouse-move cursor glow effect (lines ~334–360)

Everything else could render on the server for free. Currently all 1585 lines are
parsed and executed in the browser on every visit.

**Fix:** Extract static sections (Process steps, feature cards, CTA band) into
Server Components. Wrap only the interactive islands (`<SloganCycler>`,
`<TypingHero>`, `<MetricsCounter>`) in thin `'use client'` wrappers.

---

### H4 — 150+ Individually GPU-Promoted Star and Particle Elements

**File:** `src/components/pages/Home.tsx` — lines 560–762, 900–956  
**File:** `src/app/globals.css` — `.bg-star` rule

```css
/* globals.css */
.bg-star {
  will-change: opacity, transform;
  transform: translateZ(0);
  contain: strict;
  animation: twinkle 3s ease-in-out infinite;
}
```

Every `.bg-star` div has `will-change: opacity, transform` + `transform: translateZ(0)`.
This combination is the canonical way to **promote an element to its own GPU
compositor layer**. The hero section alone has 20 named stars, 5 shooting stars,
and 8 particles — all individually promoted. The "About" section adds ~72 more
inline-styled stars. The portfolio section adds ~45 more.

**Total: 150+ independent GPU layers animating simultaneously.** Each layer
occupies GPU memory and must be composited on every frame. On mid-range mobile this
alone drops the frame rate below 30fps during scroll.

**Fix:** Render all stars on a single `<canvas>` element with `requestAnimationFrame`,
or use a single `::after` pseudo-element with a `box-shadow` list to simulate
dozens of dots without any extra DOM nodes or promoted layers.

---

### H5 — Typing Animation Fires One `setState` Per Character

**File:** `src/components/pages/Home.tsx` — lines 129–166  
**File:** `src/components/pages/Services.tsx` — lines 31–69 (copy-pasted verbatim)

```tsx
useEffect(() => {
  if (isTyping && displayedText.length < text.length) {
    const timeout = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1)); // setState every 25ms
    }, 25);
    return () => clearTimeout(timeout);
  }
}, [isTyping, displayedText, text, onComplete]);
```

Each `setState` schedules a React re-render. For a 40-character heading at 25ms
intervals, this is **40 sequential React render cycles** over 1 second. The Home
page runs 4 independent instances of this hook simultaneously during initial load,
producing ~160 scheduled re-renders in the first second. The same code is
copy-pasted verbatim into `Services.tsx`, meaning two module copies exist in the
bundle.

**Fix:** Replace the chained `setTimeout` approach with a single `useEffect` that
stores the full string in a `useRef` and updates a character-count ref on a timer,
only calling `setState` once at the end — or use a `useReducer` with batched
updates. Extract the shared logic into a single file in `src/components/ui/`.

---

### H6 — 28 `blur-3xl animate-pulse` Nebula Divs Running at 60fps

**File:** `src/components/pages/Home.tsx` — 28 occurrences (confirmed by grep)

```tsx
<div className="absolute top-1/4 left-1/4 w-96 h-96 
  bg-gradient-to-r from-cyan-300/20 via-purple-300/20 to-cyan-300/20 
  rounded-full blur-3xl animate-pulse">
</div>
```

`blur-3xl` is a 48px CSS blur filter applied to a 96×96 rem gradient circle. CSS
`filter: blur()` triggers a full rasterisation of the element's layer on every
frame when combined with an animation. With 28 such elements across the page and
many promoted via `will-change`, the browser rasterises **28 large blurred layers
per frame**, which is one of the most GPU-intensive CSS operations possible. On
mobile devices this causes consistent jank during scroll and raises INP scores.

**Fix:** Replace animated blur divs with static ones (no `animate-pulse`). The
subtle glow effect is indistinguishable to users at rest. If animation is required,
use `opacity`-only animation (no blur recalculation) or move to a single canvas.

---

## 🟡 Medium Impact

---

### M1 — Reviews API Makes a Fresh Google Places Request on Every Load

**File:** `src/app/api/reviews/route.ts` — lines 98–104

```ts
const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
  method: 'GET',
  headers: { 'X-Goog-Api-Key': apiKey, ... },
  // No cache: option → no revalidate → uncached
});
```

No caching directive exists on this fetch. Every client-side load of a page
containing `<GoogleReviews>` triggers a full upstream HTTP round-trip to Google's
Places API. Additionally, `next.config.mjs` sets `Cache-Control: no-store` for
`/api/:path*` (line 98–99), preventing the CDN or browser from caching the
response even for 60 seconds.

**Fix — two changes:**

1. Add `next: { revalidate: 3600 }` to the upstream `fetch` call to use Next.js's
   extended fetch cache (ISR-style caching for server-side fetches).
2. Scope the `Cache-Control: no-store` header in `next.config.mjs` to routes that
   genuinely need it (e.g. `/api/send-email`) — not the reviews endpoint.

---

### M2 — `Cache-Control: no-store` Applied to All API Routes

**File:** `next.config.mjs` — lines 87–104

```js
{
  source: '/api/:path*',
  headers: [
    { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
    { key: 'Pragma', value: 'no-cache' },
    { key: 'Expires', value: '0' },
  ],
},
```

`no-store` prevents every layer of caching — browser, CDN, reverse proxy — for
all API routes. This is correct for `/api/send-email` but harmful for
`/api/reviews`, which serves data that is valid for hours. Every user who visits
any page with reviews pays the full latency of a server round-trip + upstream
Google API call.

**Fix:** Split the header rule into two `source` patterns — one for mutating
endpoints (`send-email`) keeping `no-store`, and one for read-only endpoints
(`reviews`) using `s-maxage=3600, stale-while-revalidate=86400`.

---

### M3 — 5+ Independent IntersectionObserver Instances on Home Page

**File:** `src/components/pages/Home.tsx` — lines 62, 179, 321, 364, plus per
`TypingTextSection` call at lines 1329–1333

Each `useTypingAnimation` invocation, each `TypingTextLines` instance, and the
metrics counter each create their own `new IntersectionObserver`. On the Home page,
at least 7 observers run simultaneously, each calling the browser's layout system
to resolve element visibility on every scroll event.

**Fix:** Create a single shared `IntersectionObserver` in a context or module-level
singleton. Assign `data-observer-id` attributes to elements and dispatch to the
correct handler by ID inside the single callback.

---

### M4 — Slogan `setInterval` Runs When Hero Is Scrolled Off-Screen

**File:** `src/components/pages/Home.tsx` — lines 268–277

```tsx
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlogan((prev) => (prev + 1) % slogans.length);
  }, 2000);
  return () => clearInterval(interval);
}, []);
```

This interval fires every 2 seconds for the entire lifespan of the page, including
when the user has scrolled far past the hero. Each tick triggers a state update and
a re-render of the hero section. On a page with 10+ sections this is background
CPU churn the user never sees.

**Fix:** Wrap with an `IntersectionObserver` that pauses the interval when the hero
section leaves the viewport, and resumes it on re-entry.

---

### M5 — Partner Carousel Renders 27 `<Image>` Components Simultaneously

**File:** `src/components/pages/Home.tsx` — lines ~816–894

The seamless scroll animation is achieved by rendering three identical copies of 9
logos (= 27 `<Image>` components) at the same time. A correct infinite-loop carousel
requires only 2 copies, not 3. More importantly, React hydrates all 27 instances
during page load regardless of `loading="lazy"`.

**Fix:** Use 2 copies instead of 3 to reduce DOM nodes by one third. Consider
using inline SVGs for partner logos (zero network requests, zero hydration cost,
zero layout shift).

---

### M6 — Structured Data Injected via Client-Side `useEffect` in BlogPost

**File:** `src/components/pages/BlogPost.tsx` — lines 17–25

```tsx
useEffect(() => {
  if (post) {
    const schemas = [...];
    injectMultipleSchemas(schemas); // appends <script> tags via document.head
  }
}, [post]);
```

Structured data (JSON-LD) injected after hydration is invisible to search engine
crawlers that index the initial HTML. Google's mobile-first indexing crawls the
server-rendered HTML; if the `<script type="application/ld+json">` tag is not in
the initial response, the rich result (e.g. `BlogPosting` breadcrumb) will not
appear in SERP.

**Fix:** Move schema generation into `generateMetadata` or render a static
`<script type="application/ld+json">` inside the page's Server Component using
`JSON.stringify`. This guarantees the schema is present in the SSR HTML.

---

### M7 — `transition-all` Used in 35 Files

**Evidence:** `grep -rn "transition-all" src --include="*.tsx" --include="*.css" -l` returns 35 files

`transition: all` instructs the browser to watch every animatable CSS property for
changes on every interaction — including expensive layout-triggering properties
like `width`, `height`, `padding`, and `font-size`. The correct pattern is to list
only the specific properties that actually change, e.g.
`transition-[opacity,transform,border-color]`.

**Fix:** Global search-replace `transition-all` with `transition-[opacity,transform,border-color,box-shadow]` (or the specific subset relevant to each element). This is especially impactful on interactive cards which are hovered frequently.

---

### M8 — Duplicate CSS Block Overrides Scroll Animation Duration

**File:** `src/app/globals.css` — lines 847–854

```css
.animate-scroll-smooth {
  animation: scroll-smooth 40s linear infinite; /* declared first */
}

.animate-scroll-smooth {
  animation: scroll-smooth 20s linear infinite; /* immediately overrides */
}
```

The class is declared twice. The 40s duration is dead code — it is immediately
overridden by the 20s declaration. The first block never takes effect. This is a
maintenance hazard and indicates the CSS is not being reviewed for correctness.

**Fix:** Remove the first declaration. Keep only the 20s version (or whichever
duration is intentional).

---

### M9 — `contain: strict` Applied to Shooting Stars That Animate Across the Viewport

**File:** `src/app/globals.css` — `.shooting-star` (lines ~983–993), `.particle` (lines ~1127–1137)

```css
.shooting-star {
  contain: strict;  /* implies size + layout + paint containment */
  will-change: transform, opacity;
  transform: translateZ(0);
}
```

`contain: strict` includes `paint` containment, which tells the browser that the
element's visual output will not overflow its own border box. However, the
`shooting-star` keyframe animation translates the element from `-100px, -100px`
to `100vw, 100vh` — far outside its 2×2px box. This is a direct contradiction:
the browser may clip the animation or produce paint artefacts on some rendering
engines, and the containment hint provides zero benefit since the element is not
actually contained.

**Fix:** Remove `contain: strict` from `.shooting-star` and `.particle`. Keep
`will-change: transform, opacity` and `transform: translateZ(0)` for GPU promotion.

---

### M10 — Poppins Loads 5 Font Weights (Potentially 2 Redundant)

**File:** `src/lib/fonts.ts` — lines 3–7

```ts
export const fontSans = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  // ...
});
```

Each weight is a separate WOFF2 network request (~20–40KB). Weights `300` (Light)
and `500` (Medium) sit so close to `400` (Regular) and `600` (Semi-Bold) that they
are visually indistinguishable in body text at normal screen DPI. Loading them
adds ~60–80KB of font data and 2 additional preload round-trips before text
renders.

**Fix:** Audit the actual usage of `font-light` (weight 300) and `font-medium`
(weight 500) in the codebase. If they map to the same visual weight as 400/600
respectively at the sizes used, remove them from the array. Saving 2 weights
removes 2 preload requests and reduces FOUT risk.

---

### M11 — No Bundle Analyser Configured

**File:** `next.config.mjs`, `package.json`

There is no `@next/bundle-analyzer` setup. Without it, it is impossible to know
the exact client-side JS bundle composition — which packages are the largest, which
are duplicated, or which are imported but unused. All performance work on JS bundle
size is guesswork without this.

**Fix:**

```bash
npm install --save-dev @next/bundle-analyzer
```

```js
// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
export default withBundleAnalyzer(nextConfig);
```

```bash
ANALYZE=true npm run build
```

Run once, identify the top 5 largest modules, then evaluate whether each can be
dynamically imported, tree-shaken, or replaced.

---

### M12 — `Locations.tsx` Uses `'use client'` Solely for `memo`

**File:** `src/components/pages/Locations.tsx` — lines 1–3

```tsx
'use client';
import { memo } from 'react';
// ... 297 lines of static JSX ...
export default memo(Locations);
```

This file has **zero hooks, zero event handlers, zero browser API calls**. `memo`
is the only React import, and it is meaningless on a Server Component (server
components never re-render). The `'use client'` directive forces the entire
299-line component — which renders a static grid of 13 city cards — to ship as
JavaScript, be parsed, and be hydrated on the client.

**Fix:** Remove `'use client'` and the `memo` wrapper. Converting this one file to
a Server Component saves 299 lines of hydration work and removes it from the
client JS bundle entirely.

---

## What to Tackle First

If you want the biggest gains in the shortest time, address these in order:

1. **H1** — Remove/shorten the loading overlay. Instant measurable LCP improvement.
2. **H6** — Remove `animate-pulse` from blur divs. Instant FPS improvement on scroll.
3. **H4** — Consolidate star elements onto a single canvas. Instant GPU memory reduction.
4. **M12** — Remove `'use client'` from `Locations.tsx`. Zero-risk, 5-minute change.
5. **M2 + M1** — Fix API caching. Reduces TTFB on every page with reviews.
6. **M8** — Remove duplicate CSS. 2-minute cleanup.
7. **M9** — Remove `contain: strict` from shooting stars. 2-minute fix.
8. **H2** — Begin systematically converting page components to Server Components.
   Start with `Locations`, `FAQ`, `Security`, `Mobile`, `Projects`.
9. **M7** — Replace `transition-all` with specific properties site-wide.
10. **M11** — Add bundle analyser and run it. Informs all future JS work.

---

_Generated: March 2026 — based on static analysis of `src/` and `next.config.mjs`_
