# Milestone: ~50 High-Quality Indexable Pages

_Drafted Aug 23, 2026 · **Implemented Aug 23, 2026** — see status below · Nothing committed_

## Implementation status

| Section | Status |
| --- | --- |
| §1.1 Hero H1 → "Markham & GTA Web Design." | ✅ Done — visual QA at 375/768/1440px still outstanding |
| §1.2 Timeline → 1–2 weeks | ✅ Done via **option (a)**, full tier re-cut: Starter 3–5 days / Small Business 1–2 weeks / Pro 3–4 weeks. All 50 claims swept |
| §4 Deletes (`/mobile`, `/security`) | ✅ Done — content folded forward, both 301'd |
| §5.1 `/process` redesign | ✅ Done — phases are now positions in a 10-day build; the "6-8 weeks average duration", "98% satisfaction" and "100% on-time" stats were removed |
| §5.2 `/projects` → case-study hub | ✅ Done — each real client links to its case study |
| §5.3 `/services/seo` rewrite | ⬜ **Not done** — deferred, see note below |
| §5.4 `/renovations` trades coverage | ✅ Done (Aug 23) — full re-design: genuine per-trade sections (kitchen/bath, additions/GC, roofing, HVAC, electrical, landscaping), sourced stats (Houzz, BrightLocal, CMHC — visible citations), new reusable `MiniContactForm` component, real Pexels photography replacing placeholder images, dropped the duplicated 3-step process block in favour of a link to `/process` |
| §5.5 `/locations` redesign | ⬜ **Not done** |
| §5.6 `/pricing` | ✅ Tier turnarounds re-cut |
| §6.1 Services +3 | ✅ Done — `/services/geo`, `/services/website-care`, `/services/website-redesign` (replaces the planned GBP page per client request) |
| §6.2 Industries +4 | ✅ Done at `/industries/{family-law, real-estate-law, physiotherapy, dental}` — option 1 URL shape |
| §6.3 Case studies +6 | ✅ Done — scope-and-capability outcomes only, **no invented metrics**; needs client sign-off before deploy |
| §6.4 Proof-gap fork | Resolved as **(A) follow the search data**, per the recommendation |
| §6.5 Resources +1 | ✅ Done — `/blog/website-launch-checklist` |
| §7 Sequencing | ⚠️ **Not followed** — all 13 pages built in one pass at client instruction, rather than gated behind indexing recovery |
| Demo sites on industry hubs | ✅ Done — all four hubs, `rel="nofollow"`, labelled as fictional |

**Final count: 49 URLs.** Core 10 (20.4%) · Services 10 (20.4%) · Locations 8 (16.3%) · Resources 7 (14.3%) · Case studies 6 (12.2%) · Industries 8 (16.3%).

`/services/seo`, `/renovations` and `/locations` are the three redesigns still outstanding — all three are rewrites of existing pages rather than new URLs, so they do not change the page count.

Follows the page-matrix cleanup (124 → 37 URLs). Sources: the Claude GSC diagnosis and the
GSC Strategy Final Stress Test, both covering May 22 – Aug 21, 2026.

---

## 1. The two copy changes requested

Both are one-line edits with a much larger blast radius than they look.

### 1.1 Hero H1 — "Markham Web Design." → "Markham & GTA Web Design."

`src/components/home/HeroSection.tsx:143`

```
Before:  Markham Web Design. {rotating slogan}
After:   Markham & GTA Web Design. {rotating slogan}
```

Straightforward, but two things to check:

- **Visual QA required.** The H1 runs `text-5xl` → `text-8xl` and is followed by an animated
  rotating slogan on the same line. Six extra characters at `xl:text-8xl` will change where the
  line breaks. Needs checking at 375px, 768px and 1440px before it ships.
- **Keeps the report's recommendation intact.** The stress test's §11 recommended
  *"Web Design & Local SEO in Markham for GTA Businesses"* — leading with Markham, qualifying with
  GTA. `Markham & GTA Web Design` is the same hierarchy, shorter. Good.
- The `<title>` (`Markham Web Design | Websites for GTA Businesses | Zenara`, 57 ch) already says
  both. No change needed there.

### 1.2 Timeline — "2–3 weeks" → "1–2 weeks"

The requested string is `HeroSection.tsx:149`. **It cannot be changed on its own.** There are
**50 timeline claims across 20 files**, and the hero is one of them. Changing it alone puts the
homepage in direct conflict with:

| Where | Currently says | Conflict |
| --- | --- | --- |
| `src/components/pages/Pricing.tsx:105` | Small Business "2–3 week turnaround" | The plan the hero is describing |
| `src/components/pages/Pricing.tsx:212, 220` | "Starter (1 week), Small Business (2-3 weeks), Pro (3-4 weeks)" | **Inside `FAQPage` schema** — Google can surface this answer directly |
| `src/lib/faq-data.ts:23, 58` | Same tier table, duplicated | Also in `FAQPage` schema |
| `src/lib/city-content.ts` ×7 | "Most projects launch in two to three weeks" | All 7 surviving city pages |
| `src/lib/service-content.ts:119` | "2–3 weeks… larger builds 4–6 weeks" | `/services/web-design` schema |
| `src/app/{layout,page}.tsx`, 4 industry hubs, `/services/web-design` | "live in 2–3 weeks" in meta descriptions | 13 meta descriptions |
| `public/llms.txt:25-27` | Tier table | AI-crawler-facing |
| `src/content/blog/choosing-web-designer-gta.tsx:41` | "should land in two to three weeks" | Argues the case for 2–3 |

**Two contradictions already exist and get worse, not better:**

1. **`src/components/home/DifferentiatorsSection.tsx:138` already says "1-2 weeks."** The homepage
   currently contradicts itself — hero says 2–3, differentiators say 1–2. This change fixes that.
2. **`/process` is the real problem.** `src/components/pages/Process.tsx` lists sequential phase
   durations of `1-2 weeks` → `2-3 weeks` → `3-4 weeks` → `1 week` → `2-3 days` → `Ongoing`. That
   reads as a **7–10 week** engagement. It contradicts 2–3 weeks today and would flatly contradict
   1–2 weeks. `/process` sits at **position 9.76** — one of the best positions on the site, so it
   is genuinely visible. See §5.1.

**Recommendation.** Do not ship a hero-only edit. Either:

- **(a) Re-cut the whole tier ladder** to Starter ~3–5 days / Small Business 1–2 weeks / Pro 3–4
  weeks, and sweep all 50 claims plus `/process`; or
- **(b) Say "most sites live in 1–2 weeks"** in the hero, keeping the tier table honest underneath,
  and fix only `/process` and the direct contradictions.

(b) is lower risk. The stress test and the Durham plan both warn this is a schema-marked public
commitment: *"If a build slips past 3 weeks the gap is public and quotable."* Tightening to 1–2
weeks makes that sharper. **Confirm which before I touch anything** — this is a commercial promise,
not a copy preference.

---

## 2. What the reports say about adding pages

Both reports converge on one instruction, and it is directly relevant to a "get to 50 pages"
milestone:

> **Do not broaden the footprint until indexing recovers.**

The evidence behind that:

| Signal | Value |
| --- | --- |
| Indexed pages | 89 → 55 across the window, still falling at the last data point |
| Excluded | 11 → 47 (43 crawled-not-indexed) |
| 35 geo/vertical pages | 850 impressions, **0 clicks**, weighted position 62.66 |
| Daily impressions | 63.1/day → 13.1/day (−79.2%) |

And the git finding from the cleanup pass: the last deploy before the June 12 deindexing was
**April 2** — nothing shipped in that window. What we *did* ship on June 14 (`e44d8d6`) added 19
new `/web-design/[city]` pages, and the decline continued (June 26 cliff, June 30 −6, July 10 −7).

**Google demoted the templated matrix; we responded by adding pages; it got worse.** Going 37 → 50
is the right destination and the wrong immediate action. The sequencing in §7 gates it.

The reports do support the *composition* proposed here. The stress test's priority queue asks for
exactly the two things this milestone adds most of:

- **Deepen legal and healthcare** — 269 and 213 core non-branded impressions respectively, against
  19 for renovation.
- **Real proof.** *"One launched client, credited on `/projects` with a backlink, is worth more
  than any on-page change in this plan."* The site currently has **zero case studies with
  outcomes.**

---

## 3. Page budget: where we are vs. the target

Current state is 37 indexable URLs.

| Cluster | Now | Target % | Target | Δ |
| --- | --- | --- | --- | --- |
| Core / company | 12 | 20% | 10 | **−2** |
| Services | 7 | 20% | 10 | **+3** |
| Locations | 8 | 15–20% | 8 | 0 |
| Industries | 4 | 15–20% | 8 | **+4** |
| Case studies | **0** | 15% | 7 | **+7** |
| Resources | 6 | 10–15% | 7 | **+1** |
| **Total** | **37** | | **50** | **+13** |

Current breakdown for reference:

- **Core (12):** `/`, `/about`, `/pricing`, `/contact`, `/contact/schedule`, `/projects`,
  `/process`, `/faq`, `/security`, `/mobile`, `/locations`, `/blog`
- **Services (7):** `/services` + `web-design`, `ecommerce`, `logo-design`, `business-cards`,
  `seo`, `hosting`
- **Industries (4):** `/lawyers`, `/accountants`, `/clinics`, `/renovations`
- **Locations (8):** `/web-design/{markham, stouffville, scarborough, toronto, mississauga,
  richmond-hill, vaughan, pickering}`
- **Resources (6):** six blog posts
- **Case studies (0):** none

---

## 4. Deletes

Two pages, both folding into a service page where the content actually belongs. Note the criterion
has shifted: in the cleanup pass I argued against removing these because nothing in the data said
they were *hurting*. In a capped 50-page budget the question is different — does the page earn its
slot. These two do not.

| Page | Evidence | Action |
| --- | --- | --- |
| **`/mobile`** | 564 lines, **6 impressions, position 76.5** — the worst-positioned core page. It is a service page ("mobile-first design") filed under company. Its argument is already made on `/services/web-design`. | Fold the substantive sections into `/services/web-design`, then **301 `/mobile` → `/services/web-design`** |
| **`/security`** | 411 lines, 4 impressions, position 15.25. SSL, backups, monitoring, uptime — this is the sales copy for `/services/hosting`, which already lists "SSL & Security", "Daily Backups", "Uptime Monitoring" as its features. Two pages arguing the same thing. | Fold into `/services/hosting`, then **301 `/security` → `/services/hosting`** |

**Deliberately kept:** `/contact/schedule` (49 impressions at position 13.65 — a conversion asset
with the second-best position in core) and `/process` (25 impressions at position 9.76). Both
survive; `/process` needs the redesign in §5.1.

Resulting core cluster (10): `/`, `/about`, `/pricing`, `/contact`, `/contact/schedule`,
`/projects`, `/process`, `/faq`, `/locations`, `/blog`.

---

## 5. Full redesigns

Six pages need rebuilding rather than editing. Ordered by evidence strength.

### 5.1 `/process` — the timeline contradiction

**Why:** phase durations sum to 7–10 weeks against a 1–2 week headline promise. Position 9.76 means
this is visible. This is the single most contradictory page on the site and it blocks §1.2.

**Redesign:** phases become *what happens*, not *how long it takes in isolation* — either express
each as a share of a 1–2 week total, or drop per-phase durations and state one honest end-to-end
range per tier. Must reconcile with `/pricing` and both `FAQPage` schemas.

### 5.2 `/projects` → case-study hub

**Why:** 162 impressions at position 44.65, zero clicks. Shows work with **no outcome data** — a
gap both reports name. Becomes the parent for the seven pages in §6.3.

**Redesign:** index page linking six real client case studies, with the four concept demos kept in
a clearly-labelled secondary section (they are now `noindex` + `nofollow` after the cleanup pass,
so they no longer compete).

### 5.3 `/services/seo` — highest-impression page on the site after the homepage

**Why:** **444 impressions, position 65.73, zero clicks.** The stress test's priority queue is
explicit: *"Rewrite around local SEO for Markham/GTA businesses; narrow irrelevant geography and
improve proof."* Position 65 on 444 impressions means it ranks for a lot it should not.

**Redesign:** narrow to local SEO for the eight service-area cities; remove broad/irrelevant
geographic and national-SEO framing; add real process detail and proof.

### 5.4 `/renovations` — claims trades it does not cover

**Why:** the meta description promises *"roofers, HVAC, electrical, and landscaping"* and one intro
line lists them, but every section on the page is kitchen/bath framing. Flagged in the cleanup pass
as out of scope there because writing trades content is new content — it belongs here.

**Redesign:** genuine sections per trade, or drop the claim. Also aligns title ("Contractor Web
Design Markham & GTA") with H1 ("Contractor & Renovation Web Design").

### 5.5 `/locations` — hub with no reason to exist

**Why:** 145 impressions, position 42.39, one click. After the cleanup pass removed its duplicate
link block it is eight city cards and not much else. The stress test asks it to *"link only to
indexable, unique market pages"* — which it now does — but it needs its own value.

**Redesign:** make it answer "which of these is me and what do you do there", with the service-area
map, coverage honesty (Markham base, service-area business), and links down to the industry hubs.

### 5.6 `/pricing` — depends on §1.2

**Why:** the tier turnarounds are the anchor every other timeline claim references. If option (a)
is chosen, this page is rebuilt; if (b), it is edited only.

---

## 6. New pages (+13)

### 6.1 Services +3 → 10

| New page | Rationale |
| --- | --- |
| `/services/website-redesign` | Distinct commercial intent from "web design"; a real query class; matches the actual sales conversation for businesses with an existing dated site |
| `/services/google-business-profile` | The GBP work is already on the roadmap (service-area switch, review generation). **Deliberately not `/services/local-seo`** — that would cannibalise `/services/seo` at 444 impressions |
| `/services/website-care` | Ongoing care plans as a commercial offer, distinct from `/services/hosting` (infrastructure). Absorbs the retention argument currently split across `/security` |

### 6.2 Industries +4 → 8 — **decision required, see §6.4**

The reports point at legal (269 core impressions) and healthcare (213). Sub-vertical depth under
those two is the evidence-backed choice:

- Family law · Real estate law (legal)
- Physiotherapy · Dental (healthcare)

**URL collision warning.** The cleanup pass shipped catch-all redirects `/{hub}/:city+ → /{hub}`
to close the doorway hole (`/lawyers/barrie` used to return 200). Next.js evaluates `redirects()`
*before* filesystem routes, so **`/lawyers/family-law` would be 301'd to `/lawyers`** and never
render. Options:

1. **`/industries/{slug}`** — e.g. `/industries/family-law`. Collision-free, no change to the
   wildcard, no reopening of the doorway hole. Two URL patterns coexist. **Recommended.**
2. Flat keyword URLs — `/family-law-website-design`. Strongest exact-match to query intent, also
   collision-free, but clutters the root namespace.
3. Narrow the wildcard with a negative lookahead — fragile, grows with every new page, and
   partially reopens what we just closed. **Not recommended.**

### 6.3 Case studies +7 → 7

The highest-value cluster in this milestone, and the only one backed entirely by real work.

`/projects` (hub, redesigned per §5.2) plus six client case studies:

| Client | URL | Vertical |
| --- | --- | --- |
| AshCam Cutting Solutions | `/projects/ashcam-cutting-solutions` | Manufacturing / industrial |
| JB Loans | `/projects/jb-loans` | Mortgage / finance |
| IK Smart Solution | `/projects/ik-smart-solution` | Smart home / trades |
| FunGen Events | `/projects/fungen-events` | Events |
| Patty's Delights | `/projects/pattys-delights` | Food / retail |
| Heroes Catering | `/projects/heroes-catering` | Catering / hospitality |

Each needs: the brief, what was built, and **a real outcome**. If outcome data does not exist,
publish what does — launch date, scope, what the client uses it for — rather than inventing
metrics. Every one of these needs client sign-off before publishing, and each should be asked for
a backlink at the same time.

### 6.4 The proof gap — a genuine strategic fork

Worth stating plainly, because it undercuts §6.2:

**All four industry hubs target verticals with zero clients. All six real clients sit in verticals
with no hub.**

| | Verticals | Clients | GSC core impressions |
| --- | --- | --- | --- |
| Industry hubs | lawyers, accountants, clinics, renovations | **0** | 269 / 31 / 213 / 19 |
| Real client base | manufacturing, mortgage, smart-home, events, catering, food | **6** | — |

So the case-study cluster and the industry cluster cannot currently reinforce each other. A visitor
on `/lawyers` finds no law firm in the portfolio. Two ways to resolve it:

- **(A) Follow the search data.** Keep legal/healthcare hubs, add the four sub-verticals in §6.2,
  and accept that case studies stay off-vertical until a legal or clinic client lands. Backed by
  482 core impressions. Matches the reports and CLAUDE.md's stated target industries.
- **(B) Follow the proof.** Add hubs where clients already exist — trades/manufacturing, mortgage
  brokers, events/hospitality — so each hub can point at real work. No search evidence supports
  these; it contradicts CLAUDE.md's positioning toward trust-critical professional services.

**Recommendation: (A), with one exception** — JB Loans gives genuine proof for mortgage brokers,
which the Durham plan already folded into `/accountants`. Surfacing that client on the accountants
hub closes one proof gap at zero page cost. **Your call before §6.2 is built.**

### 6.5 Resources +1 → 7

Six blog posts stay. Add one genuine resource rather than a seventh post — a website-launch
checklist or a costing worksheet is more linkable and more useful than another article. Keep
`/blog` as the cluster hub.

---

## 7. Sequencing — gated, not all at once

Shipping 13 new pages onto a site whose indexed count is still falling repeats the June 14 mistake.

| Stage | Work | Gate to proceed |
| --- | --- | --- |
| **0 — now** | Deploy the completed cleanup (37 URLs). Capture the GSC URL-inspection baseline **before** the 301s go live. Switch GBP to service-area mode. File Removals for `projectfour` / `projecttwo`. | — |
| **1 — weeks 1–2** | §1 copy decisions + `/process` (§5.1). No new URLs. | — |
| **2 — weeks 2–4** | Deletes (§4) and the redesigns in §5.2–5.6. Net **−2 URLs**. | — |
| **3 — week 4–6** | Re-pull GSC. **Hard gate: has the indexed-page count stopped falling?** | Indexed count flat or rising |
| **4 — weeks 6–9** | Case studies (+7). First because they are real, unique, client-backed, and each can carry a backlink. | Gate 3 passed |
| **5 — weeks 9–12** | Services +3, Resources +1. | Case studies indexing |
| **6 — week 12+** | Industries +4, after the §6.4 decision. | Everything above indexed |

Final count: 37 − 2 + 7 + 4 + 4 = **50**.

If gate 3 fails, stop. Adding pages to a site Google is actively de-indexing makes it worse, and
both reports say the same thing in different words.

---

## 8. Risks

| Risk | Assessment |
| --- | --- |
| **1–2 week promise becomes a public, schema-marked commitment** | **Real and sharper than 2–3.** Two `FAQPage` blocks mean Google can surface the answer directly. Mitigate by tiering — keep Pro at 3–4 weeks and route larger scopes there. See §1.2 |
| Indexing does not recover, gate 3 fails | Likely enough to plan for. Stages 4–6 do not start. The cleanup still stands on its own |
| Case studies blocked on client sign-off | The critical path for the largest cluster. Start the sign-off conversations during stage 2, not stage 4 |
| `/industries/` creates a second URL pattern | Accepted. The alternative reopens the doorway hole we just closed |
| Fabricated outcome metrics creep into case studies | The exact failure mode already removed from the site. Publish scope and dates when results are unavailable — never invent a number |
| 50 pages is still a template matrix in disguise | The test is whether each page would survive being read by a person. Case studies and sub-verticals pass; another city sweep would not |

---

## 9. Open questions

1. **§1.2** — option (a) full tier re-cut, or (b) hero-only "most sites" wording? Blocks all
   timeline work.
2. **§6.4** — follow the search data (A) or the proof (B)? Blocks the four industry pages.
3. **§6.2** — `/industries/{slug}` or flat keyword URLs?
4. Do outcome metrics exist for any of the six clients (traffic, enquiries, sales), or do the case
   studies publish scope-and-date only?
5. Is `/security` genuinely redundant with `/services/hosting`, or does it serve a sales purpose in
   conversations I cannot see from the code?
