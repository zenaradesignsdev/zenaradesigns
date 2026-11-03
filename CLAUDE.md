# zenaradesigns.com — Claude Code notes

Zenara Designs' own website (Next.js 14 App Router, deployed on Vercel). See `README.md` for the stack and scripts.

## Google Search Console

Claude has keyless Search Console access for **sc-domain:zenaradesigns.com** through `scripts/gsc/gsc`
(read everything the API exposes; submit/delete sitemaps).

- A project hook (`.claude/hooks/google-session-check.py`) checks the session whenever a prompt mentions GSC topics and, if the Google login has
  expired, opens a browser sign-in for `admin@zenaradesigns.com`. Its result arrives as context.
- Workflow, commands and playbooks: `.claude/skills/gsc/SKILL.md`. Setup, IDs and history: `GOOGLE-INTEGRATIONS.md`.
- Always invoke the CLI as `scripts/gsc/gsc …` from the repo root. Reads and `submit-sitemap` are pre-approved;
  `delete-sitemap` asks first.
- Never print or store access tokens, never create service-account keys, and never use
  `gcloud auth application-default login` (ADC holds only the legacy Keyword Planner fallback login).

## Google Ads Keyword Planner (read-only)

`scripts/gads/gads` gives keyword ideas, search volumes, seasonality and an `opportunities` report that
joins volumes with our Search Console rankings. It shares the Search Console login and hook (one browser
sign-in covers both). Workflow: `.claude/skills/keyword-planner/SKILL.md`; setup: `GOOGLE-INTEGRATIONS.md` §2.
Read-only, always: never create campaigns, budgets or billing.

## SEO context

`SEO-RANKING-PLAN.md`, `SEO-IMPLEMENTED.md`, `SITE-AUDIT-2026-08.md`, `PAGE-MILESTONE-PLAN.md`,
`GSC-BASELINE-2026-09-22.md`.
