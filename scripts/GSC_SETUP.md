# Google Search Console — Setup Guide (zenaradesigns.com)

> Updated 2026-11-01. The old JSON-key instructions are gone: the Workspace org blocks
> service-account key creation (`iam.disableServiceAccountKeyCreation`), and keys aren't needed.
> Full background, IDs and history: [`GOOGLE-INTEGRATIONS.md`](../GOOGLE-INTEGRATIONS.md) §1.
> No tokens, keys or client secrets are stored anywhere in this repo — credentials come from your
> gcloud login at runtime.

## How it works (keyless)

```
your gcloud login (Zenara admin Google account)
   └─ IAM Credentials generateAccessToken (you hold Token Creator on the SA)
        └─ 1-hour token for the Zenara GSC service account
             └─ Search Console API on sc-domain:zenaradesigns.com (SA is a Full user)
```

Nothing secret lives in the repo. Tokens exist only in the memory of the process using them.
Reads use the `webmasters.readonly` scope; only sitemap submit/delete use `webmasters`.

## One-time machine setup

The Cloud project, service account, impersonation grant and GSC user are already in place
(2026-10-03). On a new machine you only need:

1. **gcloud CLI**: `brew install --cask google-cloud-sdk`
2. **Sign in**: `scripts/gsc/gsc login` (opens a browser; use the Zenara admin account)
3. **Check**: `scripts/gsc/gsc status` → `GSC session: OK`

In Claude Code you can skip step 2 — the project hook opens the sign-in for you the first time
you mention Search Console (see `GOOGLE-INTEGRATIONS.md` → "In Claude Code").

## Tools

| Tool | What it's for |
|---|---|
| `scripts/gsc/gsc` | Interactive CLI: query, compare, sitemaps, inspect, submit/delete sitemaps. `-h` for usage. |
| `npm run gsc-audit` | Full Markdown audit report (`scripts/gsc-audit.js`) → `gsc-audit-report.md` (git-ignored). |

### `npm run gsc-audit`

```bash
npm run gsc-audit
# Optional overrides:
GSC_DAYS=90 GSC_MAX_URLS=150 GSC_OUTPUT_FILE=reports/audit-march.md npm run gsc-audit
```

Covers sitemap health, 28-day performance, low-CTR pages, per-URL inspection (index/coverage/
canonical), rich-result issues and prioritised action items. It uses the same keyless chain as the
CLI. `GSC_SITE_URL` defaults to `sc-domain:zenaradesigns.com`.

Keep `GSC_MAX_URLS` ≤ 200: URL Inspection is capped at 2,000 calls/day for the property.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `GSC session: NOT READY — Google sign-in needed` (exit 2) | `scripts/gsc/gsc login` |
| `gcloud CLI not found` (exit 3) | Install gcloud (above) |
| `not allowed to impersonate` (exit 3) | The admin account needs `roles/iam.serviceAccountTokenCreator` on the GSC service account (Cloud Console → IAM → Service Accounts) |
| `Search Console said 403` | The SA isn't a user on the property — GSC → Settings → Users and permissions → add the SA email as **Full** |
| Network error (exit 4) | Check connectivity / VPN and retry |
| URL Inspection `quotaExceeded` | Daily 2,000/property cap reached; resets the next day |
