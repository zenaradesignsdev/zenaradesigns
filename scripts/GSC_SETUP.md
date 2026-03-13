# Google Search Console Audit — Setup Guide

## What it does

Runs `scripts/gsc-audit.js` to pull data from Google Search Console and write a
structured Markdown report (`gsc-audit-report.md`) covering:

- **Sitemap health** — submitted URLs, indexed URLs, errors, warnings
- **Search performance** — clicks, impressions, CTR, avg position (last 28 days)
- **Low CTR pages** — high impression pages with poor click-through (title/meta issues)
- **URL inspection** — per-page indexing status, coverage state, fetch result
- **Mobile usability** — pages failing Google's mobile-friendly checks
- **Rich result issues** — structured data (JSON-LD) errors blocking snippets
- **Prioritised action items** — categorised High / Medium / Low for AI or human review

---

## One-time Setup

### Step 1 — Create a Google Cloud project & enable APIs

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Create a new project (e.g. `zenara-gsc-audit`)
3. Enable both APIs:
   - **Google Search Console API** → [Enable](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com)
   - **Google Webmasters API** → [Enable](https://console.cloud.google.com/apis/library/webmasters.googleapis.com)

### Step 2 — Create a Service Account

1. IAM & Admin → Service Accounts → **Create Service Account**
2. Give it a name: `gsc-audit-reader`
3. Skip role assignment (GSC controls access separately)
4. Click the account → **Keys** tab → **Add Key** → **JSON**
5. Download the JSON file — keep it secret, never commit it

### Step 3 — Grant the Service Account access to Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Select your property (`zenaradesigns.com`)
3. Settings → Users and permissions → **Add User**
4. Enter the service account's email (looks like `gsc-audit-reader@your-project.iam.gserviceaccount.com`)
5. Set permission: **Owner** or **Full** (Full is sufficient)

### Step 4 — Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
GSC_SITE_URL=https://zenaradesigns.com/

# Paste the full JSON from the downloaded key file (single line, all on one line):
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n..."}

# OR point to the file:
# GOOGLE_SERVICE_ACCOUNT_PATH=./secrets/gsc-service-account.json
```

> **Security note:** If using `GOOGLE_SERVICE_ACCOUNT_PATH`, store the key file
> outside the repo or in a folder that is `.gitignore`d (e.g. `./secrets/`).

---

## Running the audit

```bash
# Uses .env.local automatically (Next.js convention)
npm run gsc-audit

# Or pass vars inline:
GSC_SITE_URL=https://zenaradesigns.com/ \
GOOGLE_SERVICE_ACCOUNT_JSON='...' \
npm run gsc-audit

# Optional overrides:
GSC_DAYS=90 GSC_MAX_URLS=150 GSC_OUTPUT_FILE=reports/audit-march.md npm run gsc-audit
```

The report is written to `gsc-audit-report.md` (git-ignored by default).

---

## Reading the report with an AI

Once generated, open the report in Cursor or paste it into any AI chat. It is
structured so an AI can:

1. Read the **Executive Summary** for a quick count of issues
2. Scan **Action Items** (High → Medium → Low) to prioritise fixes
3. Drill into specific sections (Coverage Errors, Mobile Issues, Low CTR Pages)
4. Map each issue back to a file in `src/app/` or `src/components/` and apply a fix

Example prompt:

> "Here is my Google Search Console audit report. Please fix all High priority
> issues in the codebase, then address the Medium priority ones."

---

## Troubleshooting

| Error | Fix |
| --- | --- |
| `403 User does not have sufficient permission` | Make sure the service account email is added as a user in GSC |
| `404 Site not found` | Ensure `GSC_SITE_URL` matches the exact property URL in GSC (including trailing slash) |
| `GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON` | The JSON must be on a single line with escaped newlines in the private key (`\n`) |
| `Rate limit exceeded` | Lower `GSC_MAX_URLS` or increase `RATE_LIMIT_MS` in the script |
| URL inspection returns `_error` for every URL | The Search Console API URL Inspection requires the **exact** siteUrl that matches the verified property |
