---
name: keyword-planner
description: Google Ads Keyword Planner (read-only) for Zenara — use whenever the user mentions Keyword Planner, keyword research, search volume, keyword ideas, CPC/bids, seasonality, or which keywords/pages to target. Covers the session check, scripts/gads/gads, combining volumes with Search Console rankings, and turning findings into pages.
---

# Keyword Planner — read-only keyword research

Setup, IDs and history: `GOOGLE-INTEGRATIONS.md` §2. This skill is the day-to-day workflow.

## 1. Session first

The project hook (`.claude/hooks/google-session-check.py`) checks the session whenever a prompt
mentions keyword topics and adds the result to context. It shares one gcloud login with Search Console.

| Hook says | Do |
|---|---|
| access is **active** | Go straight to the data. |
| **waiting on a Google sign-in** | Tell the user in one line to finish signing in as `admin@zenaradesigns.com`, then run `scripts/gads/gads status --wait 240` (Bash timeout ≥ 250000 ms). |
| check **failed**, exit 3 | Setup, usually the service account isn't in Google Ads yet. Quote the step from the message (Ads → Admin → Access and security → add `zenara-gsc@…` as **Read only**); don't attempt it yourself. |
| nothing | Run `scripts/gads/gads status --quiet` before the first data call. |

If `status` exits 2 and no browser opened, run `scripts/gads/gads login` with `run_in_background: true`,
then `status --wait 240`.

## 2. Commands

Invoke exactly as `scripts/gads/gads …` from the repo root.

```bash
scripts/gads/gads ideas "seed one, seed two" [--file seeds.txt] [--url https://site] [--geo GTA] [--limit 50] [--min-volume 10]
scripts/gads/gads volume "kw one, kw two" [--file list.txt] [--geo Toronto,Markham] [--csv]
scripts/gads/gads history "kw one, kw two" [--file list.txt] [--months 24] [--csv]
scripts/gads/gads geo Pickering Ajax Whitby          # location IDs (Canada)
scripts/gads/gads opportunities [--days 90] [--min-pos 4] [--max-pos 40] [--exclude zenara] [--limit 30]
scripts/gads/gads accounts | status
```

### Bulk (hundreds or thousands of keywords)

- Write the list to a file (one per line, or CSV — first column) and use `--file`:
  `scripts/gads/gads volume --file /tmp/keywords.txt --csv > /tmp/volumes.csv`
- `volume`/`history`: up to 10,000 keywords per Google request (the CLI sends 5,000 at a time), max 10 locations.
  Every input gets a row: Google merges near-duplicates ("website"/"websites"), shown as `merged with: …`;
  keywords with no data show `no data`.
- `ideas`: more than 20 seeds are batched automatically; each batch follows up to `--max-pages` result pages.
- The planning service allows ~1 request/second; the CLI throttles and retries rate-limit errors itself.
  A 600-keyword volume check is one request, so build lists generously, but don't loop the CLI per keyword.
- Use `--csv` (or `--json`) and a short `python3` script to join with Search Console data or rank pages.

- **Default geo is the GTA (9252726).** Narrow to the city the page targets (`--geo Markham`); never
  quote national (Canada, 2124) numbers for local pages.
- `--json` for anything you'll compute on; results are cached 30 days (`--no-cache` to refresh).
- `--url` seeds ideas from a page; use it on competitor or client pages.

If `status` passes but `ideas`/`volume` return a permission error, the service account's Google Ads
access level is too low: tell the user to change it from Read only to **Standard** (the CLI stays read-only
through its endpoint allowlist).

## 3. Reading the numbers

- With no ad spend, volumes are **rounded buckets** (10, 20, 30, 50, 70, 140, 260…). Use them to rank
  ideas, not as forecasts.
- Local terms look tiny (10–70/mo) but convert well; don't discard them.
- `comp`/bids are advertiser competition, not SEO difficulty. High top-of-page bids = commercial intent.
- `close variants` means Google merged spellings; don't build separate pages for them.

## 4. Playbooks

- **Where to focus next:** `opportunities --days 90`. Queries we already rank 4–40 for, with real volume,
  ranked by rough clicks gained at position 3. `pages > 1` = cannibalisation; consolidate.
- **New page or not?** `ideas` for the topic + `scripts/gsc/gsc query --filter query:contains:<term>`.
  Volume with no ranking page → new page candidate. Ranking page exists → improve that page.
- **City/service pages:** `volume "<service> <city>, <city> <service>" --geo <City>` per city; compare
  with the existing `/[industry]/[city]` pages and `SEO-RANKING-PLAN.md`.
- **Seasonality:** `history --months 24` before scheduling content (e.g. accountant terms around tax season).
- **Client pitches:** `ideas --url <client site>` and `volume` for their city to size the opportunity.

## 5. Making changes

Findings become code: new or updated pages, titles/H1s, internal links and sitemap `lastmod` in
`src/`, following existing patterns. Then lint/type-check; the user deploys. After deploy, follow the
GSC skill (submit sitemap, inspect URLs).

## 6. Rules

- Read-only. Never create campaigns, ads, budgets, conversions or billing, and never add mutate endpoints
  to the CLI or call the Ads API another way (curl is blocked).
- Never print or store tokens. Never create service-account keys.
- Report volumes with their geo, and note they're bucketed estimates.
