# Google Search Console & Google Ads (Keyword Planner) — Integration Guide

> **Set up:** 2026-10-03 (Claude Code session, admin@zenaradesigns.com)
> **Purpose:** let Claude read Search Console data and Keyword Planner data directly from the
> terminal, so SEO work is driven by real numbers instead of guesses.
> **Credentials:** none are stored in this repo — and none ever should be. Everything below
> authenticates through the local `gcloud` login on the machine running Claude.

If you are a future Claude session: read this whole file before touching either API. The
"Rules" sections are standing instructions from the Zenara team.

---

## At a glance

| Thing | Value |
|---|---|
| Google account that owns everything | `admin@zenaradesigns.com` |
| Google Cloud project | `composed-region-490022-b2` (display name "My First Project") |
| Search Console property | `sc-domain:zenaradesigns.com` (Domain property — covers `www.` and all subdomains) |
| GSC service account | `zenara-gsc@composed-region-490022-b2.iam.gserviceaccount.com` (Full user in GSC) |
| Google Ads manager account (MCC) | **399-958-8184** "Zenara Designs" — CAD, America/Toronto |
| Google Ads API access level | **Basic** (approved 2026-10-03) |
| GSC helper script | `~/.config/zenara/gsc` (local machine, not in repo) |
| Keyword Planner helper script | `~/.config/zenara/gads` (local machine, not in repo) |

Both helper scripts are plain bash/python using `curl`/`urllib` — **no npm or pip dependencies**.

---

## 1. Google Search Console

### How access works (keyless)

The Workspace org enforces `iam.disableServiceAccountKeyCreation`, so **service-account JSON
keys cannot be created — don't try, and don't disable the policy.** Instead:

1. The gcloud user `admin@zenaradesigns.com` holds `roles/iam.serviceAccountTokenCreator` on the
   `zenara-gsc@…` service account.
2. The helper calls IAM Credentials `generateAccessToken` to mint a **1-hour** token for the
   service account with the `https://www.googleapis.com/auth/webmasters` scope (full, not
   read-only).
3. That token calls the Search Console API. Tokens live only in shell variables — never printed,
   never written to disk.

The service account is a **Full** user on `sc-domain:zenaradesigns.com`. Google's API cannot add
users, so granting access to another property is a manual step in the GSC UI (see below).

### Commands

```bash
~/.config/zenara/gsc sites                                   # properties the SA can see
~/.config/zenara/gsc query <site> [days=28] [dims=query] [limit=25]
~/.config/zenara/gsc sitemaps <site>
~/.config/zenara/gsc submit-sitemap <site> <sitemap-url>
~/.config/zenara/gsc delete-sitemap <site> <sitemap-url>
~/.config/zenara/gsc inspect <site> <page-url>               # URL Inspection: index/coverage/canonical
```

- `<site>` must match `gsc sites` exactly, e.g. `sc-domain:zenaradesigns.com`.
- `dims` is a comma list of `query,page,country,device,date,searchAppearance`.
- `query` ends the window **2 days ago** (GSC data lags ~2–3 days). Max lookback ≈ 16 months (`480`).
- Output is raw JSON — pipe through a small `python3` formatter.

Examples:

```bash
# Top pages, last 90 days
~/.config/zenara/gsc query sc-domain:zenaradesigns.com 90 page 50
# Daily trend
~/.config/zenara/gsc query sc-domain:zenaradesigns.com 28 date 40
# Is a page indexed? What canonical did Google pick?
~/.config/zenara/gsc inspect sc-domain:zenaradesigns.com https://zenaradesigns.com/accountants/toronto
```

### Adding a client's Search Console property

Ask the client (or whoever owns their property) to go to **GSC → Settings → Users and
permissions → Add user**, enter `zenara-gsc@composed-region-490022-b2.iam.gserviceaccount.com`,
and choose **Full** (or Restricted for read-only). It appears in `gsc sites` immediately.

### Gotchas

- **zsh variable modifiers:** in zsh, `"$SA:generateAccessToken"` is parsed as `$SA` + the `:g`
  modifier and silently corrupts the URL (404). Always write `${SA}:generateAccessToken`, or run
  the code under bash (the helper is bash).
- **Never print a token** to the terminal/conversation, even for debugging. Print HTTP status
  codes or error messages only.
- **Sitemap `indexed: 0`** in the sitemaps API is a deprecated field and is always 0. Use
  `inspect` or the GSC Pages report for real index status.
- **The Links report (backlinks) is not in the API.** Export it from GSC → Links → *Export
  external links → Latest links* and read the CSV.
- **"Request indexing" and the Removals tool are UI-only** — the API cannot trigger a recrawl.
  The closest API lever is submitting a sitemap with fresh `<lastmod>` dates.
- If gcloud says *"Reauthentication failed"*, the user login expired: run
  `gcloud auth login admin@zenaradesigns.com --force` in the background (it opens a browser;
  the human completes sign-in).

---

## 2. Google Ads — Keyword Planner (read-only)

### Rules (standing instructions)

- **Never create campaigns, ads, budgets, or enter billing/payment details.** Zenara has no ad
  budget. Google Ads exists here *only* so Claude can read keyword research for SEO.
- The helper only calls read-only planning/lookup endpoints. Keep it that way.
- If the Ads UI pushes a "create your first campaign" wizard, abandon it — don't click through.

### How access works

Google **sunset developer tokens on 2026-09-09**. API access is now tied to the Google Cloud
project, managed at *Cloud Console → Google Ads API → Overview* (`/google/ads-apis/overview`).

| Level | What it allows | Status |
|---|---|---|
| Test | Test accounts only | — |
| Explorer | Production accounts, 2,880 ops/day, **no planning services** | granted 2026-10-03 |
| **Basic** | 15,000 ops/day, **KeywordPlanIdeaService allowed** | **approved 2026-10-03** |

Basic required **brand verification** of the Cloud project's OAuth app, which in turn required a
public privacy policy — hence `/privacy` (commit `cf6178a`). Brand verification passed and was
published on 2026-10-03.

Auth chain:

1. OAuth **Desktop** client "Zenara Keyword Planner CLI" in the Cloud project. Its client file
   lives at `~/.config/zenara/gads-oauth-client.json` (chmod 600, **never commit, never print**).
2. One-time sign-in stored as gcloud Application Default Credentials (ADC) with the
   `https://www.googleapis.com/auth/adwords` scope:

   ```bash
   gcloud auth application-default login \
     --client-id-file="$HOME/.config/zenara/gads-oauth-client.json" \
     --scopes=https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform
   ```

   Run it in the background; it opens a browser. Google shows an "unverified app" screen for the
   `adwords` scope — that's expected for our own app (Advanced → Go to Zenara Designs → Allow).
3. The helper gets a token with `gcloud auth application-default print-access-token` and calls
   `https://googleads.googleapis.com/v23/…` with header `x-goog-user-project: composed-region-490022-b2`.
   No `developer-token` header is needed any more.

The OAuth consent app is **External + In production** (production means refresh tokens don't
expire weekly). **Don't switch it to Internal** without asking — an existing "n8n Sheets" OAuth
client in the same project uses it.

### Accounts

| Customer ID | What | Use it? |
|---|---|---|
| **399-958-8184** | Manager account "Zenara Designs" — ENABLED | **Yes — default.** Keyword ideas work directly against it. |
| 287-879-4093 | Abandoned signup, stuck at payment step ("setup in progress") | No — returns `CUSTOMER_NOT_ENABLED` |
| 284-072-5841 | Abandoned sub-account signup, stuck at campaign wizard | No — returns `CUSTOMER_NOT_ENABLED` |

The abandoned accounts can't serve ads or charge anything; leave them alone. A new MCC also
can't create client accounts via the API (`CREATION_DENIED_INELIGIBLE_MCC` until it has
$1,000+ spend history) — not needed anyway.

### Commands

```bash
~/.config/zenara/gads accounts
~/.config/zenara/gads ideas "seed one, seed two" [--url https://site.ca] [--geo Toronto,Markham] [--limit 50]
~/.config/zenara/gads volume "kw one, kw two" [--geo Toronto]
~/.config/zenara/gads geo "Markham"
```

- `--geo` accepts names (resolved via `geoTargetConstants:suggest`, Canada) or numeric IDs.
  Default is all of Canada (`2124`) — **always narrow to GTA cities**, national numbers mislead.
- `--url` seeds ideas from a page (useful on competitor sites).
- Env overrides: `GADS_CUSTOMER` (default `3999588184`), `GADS_LOGIN_CUSTOMER`.

Useful geo IDs:

| Location | ID |
|---|---|
| Canada | 2124 |
| Toronto (city) | 1002451 |
| Greater Toronto Area | 9252726 |
| Markham (city) | 1002334 |
| Scarborough | 1002416 |
| Mississauga | 1002350 |
| Brampton | 1002191 |

Example:

```bash
~/.config/zenara/gads ideas "law firm website design, web design for lawyers" --geo 9252726 --limit 40
```

### Reading the numbers

- With no ad spend, volumes are **rounded buckets** (10, 70, 140, 260…), and low-volume terms may
  show no competition/bid data. Good enough to rank page ideas; not precise forecasting.
- Local intent terms look tiny ("10–70/mo") but convert well — don't discard them.
- Best targets = terms that **appear in both** Keyword Planner and our GSC queries at positions
  ~10–40 without a dedicated page yet.

Sample (2026-10-03, Markham): `website design markham` / `markham web design` / `web design markham`
— 70 searches/mo each, MEDIUM competition, top-of-page bid $3.78–$15.39.

### Error → meaning

| Error | Meaning / fix |
|---|---|
| `DEVELOPER_TOKEN_NOT_APPROVED` … "not allowed for use with explorer access" | Access level dropped below Basic — check Cloud Console Ads API overview |
| `CUSTOMER_NOT_ENABLED` | Using an abandoned account — use `3999588184` |
| `ADC login missing/expired` (from helper) | Re-run the `gcloud auth application-default login` command above |
| 401 / `invalid_grant` | Same — refresh token revoked or expired |

---

## 3. What was done on 2026-10-03

**Search Console**
- Enabled `searchconsole.googleapis.com`; created `zenara-gsc` service account; granted keyless
  impersonation; added SA as Full user on `sc-domain:zenaradesigns.com`.
- Demo subdomains `projectone`–`projectfour.zenaradesigns.com` were already `noindex` (since
  2026-09-22), but Google hadn't recrawled them. Pushed **temporary** `sitemap.xml` files to the
  `legal-project`, `physio-project`, and `accounting-project` repos and submitted them to GSC to
  trigger a recrawl. Resubmitted `https://zenaradesigns.com/sitemap.xml`.

**Google Ads**
- Enabled `googleads.googleapis.com`; created MCC 399-958-8184; got Explorer → Basic access.
- Created OAuth desktop client; signed in once via ADC.
- Added `/privacy` page (footer link + sitemap) — commit `cf6178a`. Required for brand
  verification; also needed for PIPEDA since the site has contact/newsletter/payment forms.
- Brand verification (home page, privacy URL, authorized domain `zenaradesigns.com`) — verified
  and published.

---

## 4. Baseline findings (2026-10-03) — for future comparison

From GSC (domain property):
- **Last 28 days:** 1,023 impressions, 4 clicks. Impressions roughly doubled from 2026-09-24
  (~60–85/day) but average position was 50–65.
- **Branded:** "zenara" — 84 impressions, position 7.9.
- **City landing pages rank deep:** `/accountants/toronto` pos ~43, `/clinics` pos ~67 (147 impr, 0 clicks).
- **www and non-www both indexed** as separate URLs — check the 301 to the apex domain and
  canonicals so link equity isn't split.
- **Sitemap:** 43 URLs submitted, no errors. `image-sitemap.xml` last read 2026-01-02.

Backlinks (GSC Links export, "Latest links"): **14 links from 8 domains** — 6 are client footer
credits (fungenevents.ca ×4, pattysdelights.com ×3, ashcamcuttingsolution.ca ×3, jbloans.ca,
heroes-catering.com, iksmartsolution.ca), plus our Nextdoor page and one spam domain list.
No independent editorial links yet. Client sites without a footer credit: realtorabishan,
vasanlaw; tamilbookstore not yet live/crawled.

---

## 5. Open follow-ups

- [ ] **Remove the temporary demo sitemaps** once `gsc inspect` shows "Excluded by 'noindex'
      tag" for `projecttwo/`, `projectthree/`, `projectthree/contact`, `projectfour/`:
      `gsc delete-sitemap` each one, then delete the `sitemap.xml` files from the three demo repos.
- [ ] Fix www → apex 301 / canonical consistency.
- [ ] `projecttwo` (legal demo) has a canonical pointing at `https://pickeringlawfirm.com/` —
      harmless while noindexed, fix if the demo is reused.
- [ ] Heroes Catering site points canonical/OG/schema/sitemap at the non-existent
      `heroscatering.com` (live domain is `heroes-catering.com`) and lists a dead email — fix
      prompt was drafted 2026-10-03.
- [ ] Re-run the 28-day GSC comparison vs `GSC-BASELINE-2026-09-22.md` on/after 2026-10-20.

---

## 6. Security notes

- **Never commit** `~/.config/zenara/*`, gcloud credentials, OAuth client JSON files, or any
  access token. None of these belong in this repo.
- Never create a service-account key file (org policy blocks it; don't work around it).
- Customer IDs, the project ID, and the service-account email in this file are identifiers,
  not secrets — they grant nothing without the gcloud login on an authorised machine.
- If a token or client secret is ever exposed, rotate it: delete/recreate the OAuth client in
  Cloud Console → Google Auth Platform → Clients, and revoke the ADC login with
  `gcloud auth application-default revoke`.
