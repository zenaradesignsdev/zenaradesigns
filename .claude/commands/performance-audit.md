You are performing a performance audit of a Zenara Designs project. This is a Next.js 14 App Router site. The target is Lighthouse ≥ 90 on all four categories on every page, measured on a production Vercel build. Work through every step in order.

The full performance standard is in `blueprints/performance.md`. Treat it as your reference throughout.

---

## Step 1 — Production Build

Run:
```bash
npm run build 2>&1
```

Report:
- Whether the build succeeded or failed (paste any errors in full)
- Any warnings: missing dependencies, large bundle warnings, deprecated API usage
- The First Load JS table output by Next.js for every route — flag any route over **150 KB**
- The rendering strategy for each route: `○` (Static), `●` (SSG), `ƒ` (Dynamic) — flag any route that is Dynamic when it should be Static

---

## Step 2 — 'use client' Audit

Find every client component:
```bash
grep -rln "'use client'" src/
```

For each file found, read it and assess:
- Does it genuinely require client rendering? A component needs `'use client'` only if it uses: `useState`, `useReducer`, `useEffect`, `useRef` with DOM interaction, browser APIs (`window`, `document`), or event handlers that update state.
- If a component is `'use client'` only because one small child needed interactivity — the child should be extracted into its own `'use client'` component, leaving the parent as a Server Component.
- Flag any `'use client'` component that is pure markup with no hooks or event handlers.

---

## Step 3 — Image Audit

Search for raw `<img>` tags (bypasses Next.js optimisation entirely):
```bash
grep -rn "<img " src/ --include="*.tsx"
```
Flag every occurrence — all images must use `<Image>` from `next/image` or the project's `SafeImage` wrapper.

For every `<Image>` usage, read the surrounding context and check:
1. **`sizes` prop** — present on any image wider than ~640px? Without it, the browser fetches the full-resolution image on mobile. Good default: `sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px"`
2. **`priority`** — exactly one `priority` image per page (the LCP element). Flag pages with multiple or zero priority images where a large above-fold image is present.
3. **`alt` prop** — present on all images.
4. **`fill` mode** — if used, does the parent have `position: relative` and explicit dimensions (either `width`+`height`, an `aspect-ratio`, or a fixed height class)?
5. **`quality`** — default (85) is correct. Flag values under 75 (visible degradation) or over 90 (unnecessary file size).

---

## Step 4 — Font Loading

Read `src/lib/fonts.ts` and `src/app/layout.tsx`.

Check:
- Fonts are loaded exclusively via `next/font/google` or `next/font/local` — never via a `<link>` CDN tag
- Every font declaration has `display: 'swap'`
- Weight arrays are explicit, not `'variable'` or loading all weights: only the weights actually used in the design
- The font CSS variable (e.g. `--font-sans`) is applied to `<html>` in the root layout via the `className` prop

Search for any CDN font references that should not exist:
```bash
grep -rn "fonts.googleapis.com\|fonts.gstatic.com" src/ public/
```
Flag any result (the CSP may allow these origins, but the actual font loading must go through `next/font`).

---

## Step 5 — CSS Animations vs Framer Motion

Check if Framer Motion is used:
```bash
grep -rln "framer-motion" src/
```

**If Framer Motion is NOT found** — this project uses CSS animations. Check:
- Animations in `globals.css` only animate `opacity` and `transform` — not `width`, `height`, `top`, `left`, `margin`, or `padding` (layout-triggering properties cause jank)
- `will-change` is not applied broadly (only on elements that are actively animating, removed after animation)
- `IntersectionObserver` is used for scroll-triggered animations — not a scroll event listener
- Animations are paused for off-screen elements (check for IntersectionObserver `disconnect` on unobserve)

**If Framer Motion IS found** — check:
- `LazyMotion` with `domAnimation` wraps the app in `src/components/providers.tsx` (reduces bundle ~79KB)
- Components use `m.div` with `LazyMotion`, not `motion.div`
- `useReducedMotion` is used to respect accessibility preferences
- No LCP elements (hero heading, hero image) are animated — this delays the LCP score
- All `whileInView` use `viewport={{ once: true }}` (re-animating on every scroll is expensive)

---

## Step 6 — JavaScript Bundle

Read `src/components/providers.tsx` and `src/app/layout.tsx`.

Check:
- Heavy below-the-fold components (Calendly embed, Google Reviews, large carousels) are wrapped in `next/dynamic` with `ssr: false` and a placeholder — this prevents them from blocking the initial render
- No large libraries are imported wholesale in client components: no `import * as _ from 'lodash'`, no full `date-fns` import

Search for potential bundle issues:
```bash
grep -rn "import \* from" src/ --include="*.ts" --include="*.tsx"
```
Flag wildcard imports in client components.

Check if `@next/bundle-analyzer` is set up in `next.config.mjs` — note its presence or absence as a diagnostic tool.

---

## Step 7 — Static vs Dynamic Rendering

Search for forced dynamic rendering:
```bash
grep -rn "force-dynamic\|export const dynamic" src/app/ --include="*.ts" --include="*.tsx"
```

For each occurrence: does this page genuinely require dynamic rendering (reads user cookies, session data, or request-time headers)? If not, flag it — unnecessary dynamic rendering defeats Vercel's edge caching and increases TTFB.

Key pages that must be Static:
- `/` (homepage)
- `/about`, `/services`, `/pricing`, `/process`, `/projects`
- All location pages (`/lawyers/[location]`, etc.) — they use `generateStaticParams` and must be SSG

Key pages that are correctly Dynamic:
- `/api/reviews` and `/api/send-email` (server functions, not pages)

---

## Step 8 — Third-Party Scripts

Search for all script usage:
```bash
grep -rn "next/script\|<Script\|<script" src/ --include="*.tsx" --include="*.ts"
```

For each `<Script>`:
- Is it using `next/script` (not a raw `<script>` tag)?
- Is the `strategy` appropriate?
  - `afterInteractive`: Google Analytics, GTM — scripts that need to run after page is interactive
  - `lazyOnload`: chat widgets, non-critical embeds — lowest priority, loads during idle time
  - `beforeInteractive`: only for scripts that must run before hydration (rare — flag if used unnecessarily)
- Does the CSP in `next.config.mjs` include this script's origin in `script-src`?

Flag any raw `<script>` tags — they bypass `next/script`'s performance optimisations.

---

## Step 9 — API Route Caching

Read every file under `src/app/api/`:

For routes that return data that does not change per-request (e.g. Google Reviews):
- Does the `fetch` call include `next: { revalidate: N }` for ISR caching?
- Is the route in `next.config.mjs` `headers()` configured with `Cache-Control: public, s-maxage=N, stale-while-revalidate=M`?

For routes that must not be cached (e.g. contact form):
- Does the `next.config.mjs` header set `Cache-Control: no-store`?

---

## Step 10 — Console Statements

Search for console output that may leak to production:
```bash
grep -rn "console\.log\|console\.warn\|console\.debug" src/ --include="*.ts" --include="*.tsx"
```

- `console.log` and `console.debug` outside of catch blocks: flag all — they pollute browser dev tools for clients
- `console.warn` in production code: flag unless it is an intentional developer warning
- `console.error` inside `catch` blocks: acceptable

---

## Step 11 — Tailwind Dynamic Classes

Search for dynamically constructed class names:
```bash
grep -rn "className={\`\|cn(\`\|clsx(\`" src/ --include="*.tsx"
```

For each result: are any class names partially constructed from variables? (e.g. `` `text-${color}-500` `` or `` `grid-cols-${count}` ``)
Tailwind's JIT compiler cannot detect these at build time — they will be purged and the styles will not apply in production. Flag every occurrence.

---

## Final Report

### ✅ Passing
List every check that passed with a specific observation.

### ⚠️ Issues Found
For each issue:
- **File**: exact path and line number
- **Issue**: what is wrong
- **Performance impact**: estimated effect (e.g. "adds ~79KB to client JS bundle", "prevents static generation — every request hits the server", "browser loads 2× the image pixels on mobile")
- **Fix**: exact change needed

### 📊 Build Output Summary
Paste the full First Load JS route table from Step 1.

### 📋 Pre-Deploy Performance Checklist
Output the checklist from `blueprints/performance.md` with each item marked:
- `[x]` confirmed passing
- `[ ]` needs attention

Include a one-line note for any `[ ]` item.
