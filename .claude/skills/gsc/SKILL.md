---
name: gsc
description: Google Search Console for zenaradesigns.com — use whenever the user mentions Search Console, GSC, rankings, impressions, clicks, CTR, indexing, sitemaps, or asks how the site is doing in Google. Covers checking the session, pulling data with scripts/gsc/gsc, analysing it, and turning findings into code changes.
---

# Google Search Console — zenaradesigns.com

Full access setup and history: `GOOGLE-INTEGRATIONS.md` §1. This skill is the day-to-day workflow.

## 1. Session first

A project hook (`.claude/hooks/google-session-check.py`, shared with Keyword Planner) checks the session whenever a prompt mentions
GSC topics and adds the result to context. Act on it:

| Hook says | Do |
|---|---|
| access is **active** | Go straight to the data. |
| **waiting on a Google sign-in** (browser already opened) | Tell the user in one line to finish signing in as `admin@zenaradesigns.com`, then run `scripts/gsc/gsc status --wait 240` (Bash timeout ≥ 250000 ms). Continue when it exits 0. |
| check **failed** | Run `scripts/gsc/gsc status` and report the reason. |
| nothing (prompt didn't trigger it) | Run `scripts/gsc/gsc status --quiet` before the first data call. |

If `status` exits **2** and no browser was opened, run `scripts/gsc/gsc login` with
`run_in_background: true` (it opens the browser and waits for the user), then
`scripts/gsc/gsc status --wait 240`. Exit 3 = setup problem (gcloud missing / impersonation
denied) — report it, don't try to fix IAM yourself. Exit 4 = network.

## 2. Commands

Always invoke exactly as `scripts/gsc/gsc …` from the repo root (that's what the permission
rules match). Property is fixed to `sc-domain:zenaradesigns.com`; URLs must be on
`zenaradesigns.com` or a subdomain.

```bash
scripts/gsc/gsc status [--quiet] [--wait SECS]
scripts/gsc/gsc site                                   # permission level
scripts/gsc/gsc query [--days 28 | --start D --end D] [--dims query,page,...] [--type web]
                      [--filter DIM:OP:EXPR ...] [--limit 25 | --all] [--sort clicks|impressions|ctr|position]
                      [--state all|final] [--agg auto|byPage|byProperty] [--json]
scripts/gsc/gsc compare [--days 28] [--dims page] [--limit 20]   # period vs previous period + movers
scripts/gsc/gsc sitemaps                               # submitted sitemaps, errors, warnings
scripts/gsc/gsc sitemap <sitemap-url>                  # full JSON for one
scripts/gsc/gsc inspect <url> [<url> ...]              # index verdict, coverage, canonicals, crawl, rich results
scripts/gsc/gsc submit-sitemap <sitemap-url>           # WRITE (allowed)
scripts/gsc/gsc delete-sitemap <sitemap-url>           # WRITE (asks the user first)
```

- Dimensions: `query, page, country, device, date, searchAppearance, hour` (hour = last ~10 days).
- Types: `web, image, video, news, discover, googleNews`.
- Filter ops: `equals, notEquals, contains, notContains, includingRegex, excludingRegex`
  (e.g. `--filter query:excludingRegex:zenara` for non-brand, `--filter page:contains:/blog`).
- `--state all` (default) includes fresh partial data; use `final` for settled comparisons.
- Use `--json` and a short `python3` script when you need to join or compute; don't eyeball big tables.

## 3. Playbooks

- **How are we doing?** `compare --days 28` (pages), then `compare --days 28 --dims query`.
  Compare against `GSC-BASELINE-2026-09-22.md` and the baseline in `GOOGLE-INTEGRATIONS.md` §5.
- **Quick wins:** `query --dims query,page --days 90 --all --json` → queries at position 8–20 with
  real impressions. Those pages get title/H1/intro/internal-link work first.
- **Low CTR:** pages with many impressions, position ≤ 10 and CTR well below peers → rewrite
  `<title>`/meta description in the page's metadata.
- **Brand vs non-brand:** filter `query:excludingRegex:zenara` vs `query:includingRegex:zenara`.
- **City/service pages** (e.g. `/accountants/toronto`, `/clinics`): `query --filter page:contains:<path> --dims query`
  to see what they actually rank for; cross-check volumes with `~/.config/zenara/gads` (see §2 of the integrations doc).
- **Indexing:** `inspect` the URL(s). Check verdict, coverage, google vs user canonical, last crawl.
  www vs apex duplicates and noindexed demo subdomains are known issues (§6 of the integrations doc).
- **Cannibalisation:** `query --dims query,page --all --json` → queries where 2+ pages get impressions.

## 4. Making changes

1. Fix the cause in code (metadata, headings, copy, internal links, canonicals, `src/app/sitemap.ts`
   `lastmod`, structured data). Follow the existing patterns in `src/`.
2. Run `npm run lint` and `npm run type-check`; the user reviews and deploys (Vercel).
3. After deploy: `scripts/gsc/gsc submit-sitemap https://zenaradesigns.com/sitemap.xml` and
   `inspect` the changed URLs. IndexNow (Bing) runs automatically from `.github/workflows/indexnow.yml`.
4. The API **cannot** request indexing or remove URLs — for an urgent page, tell the user to click
   "Request indexing" in the GSC UI. Fresh sitemap `lastmod` is the API-side lever.

## 5. Rules

- Never print, echo, log or store an access token. Never call `gcloud auth print-access-token` directly.
- Never create service-account keys (org policy blocks them; don't work around it).
- Never run `gcloud auth application-default login` — ADC holds only the legacy Keyword Planner fallback login.
- This CLI is for zenaradesigns.com only. Client properties use `~/.config/zenara/gsc` and only when asked.
- Quotas: URL Inspection 2,000/day for the property — inspect in targeted batches, not the whole sitemap.
  Search Analytics returns top rows only and hides anonymised queries; say so when totals don't add up.
- Report numbers with their date range and data state.
