You are performing an SEO audit of a Zenara Designs project. This is a Next.js 14 App Router site for a local professional services business in the Toronto & GTA market. Work through every step in order. Be specific — quote the actual values found, and flag anything that looks like boilerplate placeholder text.

The full SEO standard is in `blueprints/seo.md`. Treat it as your reference throughout.

---

## Step 1 — Global Metadata (Root Layout)

Read `src/app/layout.tsx`.

Check the exported `metadata` object:
- `title.default` — is it client-specific? Does it lead with the primary keyword (service + location), not the brand name? Flag if it still contains generic text.
- `title.template` — is it `'%s | [Brand Name]'`? Does the brand name match the actual client?
- `description` — is it 150–160 characters? Does it mention the service type and city/GTA? Flag if it uses generic filler.
- `metadataBase` — set to the production URL with no trailing slash?
- `alternates.canonical` — set to the root URL?
- `openGraph.images` — does the image exist in `public/`? Is it 1200×630?
- `openGraph.locale` — set to `en_CA` for Canadian clients?
- `robots` — `index: true, follow: true` in production?

Also check the JSON-LD structured data blocks in `<head>`:
- Is there a `LocalBusiness` or industry-specific schema (`LegalService`, `AccountingService`, etc.)?
- Are `name`, `url`, `telephone`, `address`, and `areaServed` populated with real client data — not placeholders like `[Client Name]`?
- Is there a `WebSite` schema with `potentialAction` for sitelinks search?

---

## Step 2 — Per-Page Metadata

Find every page file:
```bash
find src/app -name "page.tsx" | sort
```

For each page, read the file and check:
1. Does it export `metadata` (static) or `generateMetadata` (dynamic)?
2. Is the `title` unique — no two pages share the same title string?
3. Is the `title` within 50–60 characters (check by counting)?
4. Is the `description` 150–160 characters and unique?
5. Does `alternates.canonical` match the page's own URL exactly?
6. Does `openGraph` include `title`, `description`, and `url`?
7. Does the title lead with the primary keyword, not the brand name?

Flag:
- Any page missing a `metadata` export entirely
- Any page where `description` is under 120 or over 170 characters
- Any duplicate title or description across pages
- Any `openGraph` block missing `url` (causes Google to use the wrong URL for rich previews)
- Dynamic routes (`[location]`, `[slug]`) that do not use `generateMetadata`

---

## Step 3 — Sitemap

Read `src/app/sitemap.ts`.

Check:
- Does it include an entry for every page found in Step 2? List any pages missing from the sitemap.
- Is the `baseUrl` the production domain with no trailing slash?
- Is `lastModified` a real date (not `new Date()` which changes every build and wastes crawl budget)? Note the date set.
- Are priorities set sensibly: homepage = 1.0, core service/conversion pages = 0.8–0.9, supporting pages = 0.6–0.7?
- Are dynamic routes (industry/location, blog slugs) generated from data arrays, not hardcoded?
- Are blog post entries using the post's `updatedAt` or `publishedAt` date?

---

## Step 4 — Robots

Read `src/app/robots.ts`.

Check:
- It is a `.ts` dynamic route — not a static `public/robots.txt` (which would take precedence and potentially be stale)
- `/api/` paths are disallowed
- No indexable pages are accidentally blocked
- The `sitemap` URL uses the production domain

Run:
```bash
ls public/robots.txt 2>/dev/null && echo "WARNING: static robots.txt exists and will override dynamic route"
```

---

## Step 5 — Structured Data

Search for JSON-LD in the codebase:
```bash
grep -rln "application/ld+json\|StructuredData\|JsonLd" src/
```

For each file found, read it and verify:
- Schema type is appropriate for the client industry (check `.claude/CLAUDE.md` for industry context): `LegalService` for law firms, `AccountingService` for accountants, `MedicalBusiness` for clinics, `HomeAndConstructionBusiness` for renovations
- `name`, `url`, `telephone`, `address.addressLocality`, and `areaServed` contain real values — not `[Client Name]`, `[Phone]`, or similar placeholders
- `LocalBusiness` schema includes `openingHours`, `priceRange`, and `paymentAccepted` where known
- `BreadcrumbList` schema is present on inner pages
- `BlogPosting` schema is present on blog post pages

Flag any schema using placeholder values — this actively harms trust signals.

---

## Step 6 — Canonical Tags

Verify canonical strategy across page types:

- Static pages: `alternates.canonical` in the page's `metadata` export matches its own URL
- Dynamic pages (`[location]`, `[slug]`): `generateMetadata` returns a canonical matching the specific URL (e.g. `/lawyers/aurora`, not `/lawyers/[location]`)
- Check that no two pages share the same canonical URL

---

## Step 7 — Semantic HTML and Heading Hierarchy

Read the page-level components rendered by each `page.tsx` (in `src/components/pages/`).

For each page component:
- Is there exactly one `<h1>`? Flag pages with zero or multiple `<h1>` tags.
- Does the `<h1>` text contain the primary keyword (service + city)? Flag if it is a tagline without keyword intent.
- Do headings follow logical hierarchy (`h1 → h2 → h3`, no skipping levels)?
- Is page content wrapped in a `<main>` element?
- Is navigation wrapped in `<nav>`?
- Is contact information (address, phone, email) wrapped in `<address>`?

---

## Step 8 — Image Alt Text

Search for all image usage:
```bash
grep -rn "<Image\|<img" src/ --include="*.tsx" | grep -v "node_modules"
```

For each image found, read the surrounding context and check:
- `alt` prop is present
- `alt` is descriptive — not `"image"`, `"photo"`, `"logo"` alone, or an empty string on a non-decorative image
- Decorative images (backgrounds, dividers) correctly use `alt=""`
- `<img>` tags are flagged — all images must use `next/image` (`<Image>`) for optimization

---

## Step 9 — Local SEO Signals

Read `.claude/CLAUDE.md` for the client's industry, city, and contact info. Then check:

- Is the city or service area mentioned explicitly in at least one `<h1>` or above-the-fold paragraph on the homepage?
- Phone numbers displayed on screen: are they wrapped in `<a href="tel:+1XXXXXXXXXX">`? International format?
- Email addresses displayed on screen: are they wrapped in `<a href="mailto:...">`?
- Does the contact page have a Google Maps embed or a link to Google Maps?
- Does the NAP (Name, Address, Phone) appear consistently wherever it is shown — same format, same phone number?

---

## Step 10 — Core Web Vitals Signals

Scan for common CWV issues in page and component files.

**LCP:**
- Does each page have exactly one `<Image priority>` — the largest above-the-fold image?
- Do priority images have a `sizes` prop to avoid loading full-resolution on mobile?

**CLS:**
- Do all `<Image>` components have explicit `width` and `height`, or use `fill` with a fixed-dimension parent?
- Are there iframes (Calendly, maps, video) without explicit `width` and `height`?

**INP:**
- Are there `'use client'` components that have no interactivity (no state, no event handlers)? They should be Server Components.

---

## Final Report

### ✅ Passing
List every check that passed with the specific value confirmed (e.g. `metadataBase: 'https://zenaradesigns.com' ✓`).

### ⚠️ Issues Found
For each issue:
- **File**: exact path and line number
- **Issue**: what is wrong or missing
- **Impact**: how this hurts search visibility (e.g. "Google may use the wrong OG URL", "duplicate titles dilute ranking signals")
- **Fix**: exact change needed

### 📋 Pre-Launch SEO Checklist
Output the checklist from `blueprints/seo.md` with each item marked:
- `[x]` confirmed passing
- `[ ]` needs attention

Include a one-line note for any `[ ]` item.
