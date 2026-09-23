# Google Search Console Baseline — Pre-Restructure

> **Snapshot taken:** 2026-09-22 (export from GSC → Performance → Search results, Web, Last 28 days)
> **Data window:** 2026-08-24 → 2026-09-20 (GSC lags ~2 days)
> **Launch this is measured against:** commit `51c19b6` — site restructure deployed to production 2026-09-22
> **Property type:** Domain property (includes `www.` and the `project*.zenaradesigns.com` concept subdomains)
> **Raw export:** `~/Downloads/zenaradesigns.com-Performance-on-Search-2026-09-22/` (Chart, Queries, Pages, Countries, Devices CSVs)

Every number below is **before** the restructure went live. Compare against a fresh
28-day export taken **no earlier than 2026-10-20** (4 weeks post-launch), ideally again
at 2026-11-03 (6 weeks) once rankings settle.

---

## Headline totals (28 days)

| Metric | Value |
|---|---|
| Clicks | **6** |
| Impressions | **1,185** |
| CTR | **0.51%** |
| Avg position (impression-weighted) | **56.6** |

### Trend inside the window

| Period | Impressions | Clicks | Avg position |
|---|---|---|---|
| 2026-08-24 → 2026-09-06 | 769 | 4 | 63.1 |
| 2026-09-07 → 2026-09-20 | 416 | 2 | 44.7 |

Impressions were **falling** and position **improving** through the window — Google was
already shedding the deep-ranking doorway pages (`/{industry}/{city}`, retired cities).
Expect this to continue post-launch: fewer junk impressions, better average position.
**Judge success on clicks and on impressions for target queries, not raw impression count.**

### Devices

| Device | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| Desktop | 5 | 1,100 | 0.45% | 59.6 |
| Mobile | 1 | 82 | 1.22% | 18.5 |
| Tablet | 0 | 3 | 0% | 3.7 |

### Countries
Canada: 4 clicks / 1,068 impressions / pos 59.8 (90% of impressions). US: 0 / 66 / pos 20.4.
Everything else is noise (≤ 8 impressions each).

---

## Pages (all 38 with impressions)

What happened to each URL in the restructure is in the right-hand column.

| Page | Clicks | Impr. | Pos. | Post-launch status |
|---|---|---|---|---|
| `https://www.zenaradesigns.com/` | 3 | 122 | 9.7 | 308 → `/` (www consolidated) |
| `projectfour.zenaradesigns.com/` | 1 | 49 | 7.8 | concept subdomain (unchanged) |
| `/` | 1 | 21 | 6.4 | live |
| `/about` | 1 | 11 | 4.3 | live |
| `/lawyers` | 0 | 368 | 69.8 | live (rewritten hub) |
| `/mobile` | 0 | 110 | 75.8 | 308 → `/services/web-design` |
| `/clinics` | 0 | 106 | 68.8 | live (rewritten hub) |
| `/web-design/richmond-hill` | 0 | 67 | 73.1 | live |
| `/services/seo` | 0 | 60 | 64.5 | live |
| `/web-design/etobicoke` | 0 | 57 | 59.4 | 308 → `/locations` (retired city) |
| `/services/web-design` | 0 | 38 | 27.4 | live |
| `/accountants/toronto` | 0 | 36 | 46.0 | 308 → `/accountants` |
| `/projects` | 0 | 32 | 69.8 | live (case studies removed; links to live sites) |
| `/services/logo-design` | 0 | 30 | 50.6 | 308 → `/services/branding` |
| `/locations` | 0 | 22 | 84.1 | live |
| `/lawyers/newmarket` | 0 | 19 | 50.4 | 308 → `/lawyers` |
| `/renovations` | 0 | 17 | 66.3 | live |
| `/contact/schedule` | 0 | 16 | 14.0 | live |
| `/services/business-cards` | 0 | 16 | 52.7 | 308 → `/services/branding` |
| `projectthree.zenaradesigns.com/` | 0 | 13 | 9.9 | concept subdomain |
| `/contact` | 0 | 10 | 51.4 | live |
| `/lawyers/ajax` | 0 | 7 | 44.6 | 308 → `/lawyers` |
| `/blog/website-vs-social-media-business` | 0 | 7 | 78.4 | live |
| `/pricing` | 0 | 6 | 6.5 | live |
| `/accountants/north-york` | 0 | 6 | 49.8 | 308 → `/accountants` |
| `/services/ecommerce` | 0 | 6 | 64.8 | live |
| `/services` | 0 | 3 | 4.0 | live |
| `/accountants/scarborough` | 0 | 3 | 4.7 | 308 → `/accountants` |
| `/services/hosting` | 0 | 3 | 7.0 | 308 → `/services/website-maintenance` |
| `/accountants/oshawa` | 0 | 3 | 67.7 | 308 → `/accountants` |
| `projectthree.zenaradesigns.com/contact` | 0 | 2 | 12.0 | concept subdomain |
| `/renovations/stouffville` | 0 | 2 | 21.5 | 308 → `/renovations` |
| `/accountants/newmarket` | 0 | 2 | 53.5 | 308 → `/accountants` |
| `projecttwo.zenaradesigns.com/` | 0 | 2 | 67.5 | concept subdomain |
| `/renovations/vaughan` | 0 | 2 | 73.5 | 308 → `/renovations` |
| `/renovations/toronto` | 0 | 1 | 3.0 | 308 → `/renovations` |
| `/clinics/ajax` | 0 | 1 | 10.0 | 308 → `/clinics` |
| `/renovations/ajax` | 0 | 1 | 11.0 | 308 → `/renovations` |
| `/accountants/whitby` | 0 | 1 | 71.0 | 308 → `/accountants` |

**Pages that did not exist yet (baseline = 0):** `/services/branding`, `/services/geo`,
`/services/website-maintenance`, `/services/website-redesign`, `/industries/family-law`,
`/industries/real-estate-law`, `/industries/physiotherapy`, `/industries/dental`,
`/blog/website-launch-checklist`, and the city pages `/web-design/markham`,
`/web-design/stouffville`, `/web-design/scarborough` (no impressions in window).

### Where the redirected impressions should land

| Destination | Baseline impr. on its own URL | Impr. from redirected URLs feeding it |
|---|---|---|
| `/services/web-design` | 38 | 110 (`/mobile`) |
| `/services/branding` | 0 | 46 (`/services/logo-design`, `/services/business-cards`) |
| `/accountants` | 0 | 51 (6 city pages) |
| `/lawyers` | 368 | 26 (`/lawyers/newmarket`, `/lawyers/ajax`) |
| `/renovations` | 17 | 8 (5 city pages) |
| `/locations` | 22 | 57 (`/web-design/etobicoke`) |
| `/` | 21 | 122 (`www.` homepage) |

---

## Queries

Only **one query produced a click** (`seo company in markham`, 1 impression, pos 141 — an outlier).
108 queries total. Grouped by intent, with the page that should now own each group:

### Law firm web design → `/lawyers`, `/industries/family-law`, `/industries/real-estate-law`
| Query | Impr. | Pos. |
|---|---|---|
| law firm web design agency | 71 | 73.1 |
| toronto law firm web design | 66 | 57.7 |
| law firm web design toronto | 29 | 59.9 |
| law firm website design service | 27 | 75.5 |
| web design law firms in canada | 24 | 74.3 |
| family lawyer web design company | 20 | 79.8 |
| web designer law firms | 19 | 74.4 |
| law firm website design company | 19 | 77.6 |
| law firm web design companies | 18 | 77.7 |
| law firm web design company toronto | 3 | 46.0 |
| digital agency for lawyers in toronto | 3 | 73.3 |
| *(+ ~15 more at 1–3 impressions, pos 46–87)* | | |

**Largest single cluster (~330 impressions) — all ranking page 6–8.** The #1 thing to watch.

### Mobile web design → now `/services/web-design`
| Query | Impr. | Pos. |
|---|---|---|
| mobile web design toronto | 65 | 78.5 |
| mobile friendly website design toronto | 23 | 75.7 |
| mobile website design toronto | 2 | 81.0 |

### Healthcare / clinic → `/clinics`, `/industries/physiotherapy`, `/industries/dental`
| Query | Impr. | Pos. |
|---|---|---|
| web design services for neurofeedback clinics | 31 | 71.4 |
| neurofeedback clinic website design services | 29 | 68.5 |
| toronto wellness website design | 25 | 58.6 |
| healthcare website design agency toronto | 9 | 77.4 |
| healthcare web design toronto | 7 | 76.6 |

### City queries
| Query | Impr. | Pos. | Page now |
|---|---|---|---|
| web design etobicoke | 41 | 59.8 | retired → `/locations` (expect decline — intentional) |
| web design richmond hill | 23 | 74.5 | `/web-design/richmond-hill` |
| website design richmond hill | 11 | 71.0 | `/web-design/richmond-hill` |
| website design etobicoke | 8 | 61.3 | retired |
| etobicoke web design | 7 | 53.6 | retired |
| website design company richmond hill | 7 | 78.1 | `/web-design/richmond-hill` |
| richmond hill website design | 6 | 81.7 | `/web-design/richmond-hill` |
| web design newmarket | 4 | 19.8 | retired |
| markham web design | 1 | 9.0 | `/web-design/markham` ← **primary target, near-zero baseline** |

**Primary target cities (Markham, Stouffville, Scarborough) had essentially no visibility.**
Any impressions for these post-launch are net new.

### SEO services → `/services/seo`
| Query | Impr. | Pos. |
|---|---|---|
| seo strategy development toronto | 28 | 73.1 |
| organic search strategies toronto | 10 | 70.5 |
| gta seo | 8 | 49.3 |
| gta seo services | 5 | 37.4 |

### Branding / logo → now `/services/branding`
| Query | Impr. | Pos. |
|---|---|---|
| logo designer | 7 | 5.7 |
| logo design in toronto | 7 | 64.3 |
| logo creation toronto | 4 | 60.8 |

### Brand / navigational
| Query | Impr. | Pos. |
|---|---|---|
| zenara | 24 | 7.3 |
| nova motion (concept project) | 4 | 6.8 |

### Generic / noise (not worth tracking)
`design` (39, pos 4.6), `graphic design`, `accounting firms architects` (19), `customizing
website design in zaracart`, `ledgeradvisory.in`, `northledger.com`, typos (`desgin`, `deaign`).

---

## What to compare at the 4- and 6-week checkpoints

1. **Clicks** — baseline 6. Anything consistently above ~2/week is real movement.
2. **Law-firm query cluster** — baseline ~330 impr. at pos 57–80. Goal: position under 30.
3. **Primary-city queries** (Markham / Stouffville / Scarborough) — baseline ≈ 0. Any
   impressions are new; track position for `web design markham` specifically.
4. **Brand query `zenara`** — baseline pos 7.3. Should move toward 1–3 with the www
   consolidation.
5. **www vs non-www** — baseline split 122 vs 21 homepage impressions. Post-launch, the
   `www.` row should fade and `/` should absorb it.
6. **Redirected URLs** — should disappear from the Pages report within 4–8 weeks, with
   their destinations (table above) picking up impressions.
7. **Expected declines (intentional, not a regression):** Etobicoke / Newmarket / other
   retired-city queries, `/mobile`, and the `/{industry}/{city}` pages.

## Observations for later

- **Concept subdomains were indexed** (`projectfour`, `projectthree`, `projecttwo` —
  66 impressions, 1 click). **Fixed 2026-09-22:** all four concept sites (`projectone`–`projectfour`)
  now send `X-Robots-Tag: noindex, nofollow` plus a robots meta tag. Expect these rows to drop
  out of the Pages report within a few weeks — that is intended, not lost traffic.
- **Desktop-heavy** (93% of impressions). Mobile ranks far better (pos 18.5 vs 59.6) on the
  little volume it gets — worth watching as the restructure lands.
