You are performing a security audit of a Zenara Designs project. This is a Next.js 14 App Router site. Work through every step in order. Be specific — quote the exact file and line number when flagging an issue. Do not skip steps.

The full security standard is in `blueprints/security.md`. Treat it as your reference throughout.

---

## Step 1 — Security Headers

Read `next.config.mjs`.

Check that the production `securityHeaders` array contains all of the following:
- `Strict-Transport-Security` with `max-age=31536000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera, microphone, geolocation, and interest-cohort
- `Content-Security-Policy` (CSP)

For the CSP:
- `script-src` must NOT contain `unsafe-eval` in the production branch
- `unsafe-inline` in `script-src` is acceptable only when a nonce strategy is not in use
- For every third-party origin loaded by the app (Google Analytics, GTM, Calendly, Stripe, Fonts, Brevo, etc.) verify a corresponding entry exists in the relevant CSP directive
- `default-src` must be `'self'`
- `object-src` must be `'none'`

Flag: any missing header, any CSP permitting `unsafe-eval` in production, any third-party origin loaded without a CSP allowance.

---

## Step 2 — Environment Variables

Read `.env.example`.

Check:
- All required vars are documented: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `GOOGLE_PLACES_API_KEY` (and any others present)
- Every var has a comment explaining what it is and where to obtain it
- No actual secret values appear — only placeholder strings like `your_key_here`

Search the codebase for `NEXT_PUBLIC_` prefixed variables:
- Each one must be genuinely public (site URL, analytics IDs, public keys)
- Flag any API key or secret mistakenly prefixed with `NEXT_PUBLIC_`

Search for hardcoded secrets in source files. Run:
```bash
grep -rn "sk_live\|sk_test\|re_[a-zA-Z0-9]\|Bearer \|apiKey:\|api_key\s*=\|password:" src/ --include="*.ts" --include="*.tsx"
```
Flag any result that looks like a real credential (not a comment or type definition).

---

## Step 3 — API Routes

Find all route handlers:
```bash
find src/app/api -name "route.ts"
```

Read every file found. For each route handler, verify:

1. **Input validation** — request body is parsed inside a `try/catch`, then validated with Zod `safeParse()` before any field is accessed. Flag if fields are accessed directly from `request.json()` without schema validation.
2. **Env var guard** — required env vars are checked at the top of the handler; returns HTTP 500 with a generic message if any are missing (never exposes which var is missing).
3. **Error responses** — catch blocks return generic messages, not `error.message` or stack traces.
4. **HTTP method check** — the handler only processes the intended method (e.g. `POST` only for a contact form). Flag if all methods are handled identically.
5. **Rate limiting** — present on any route that sends email, writes to a database, or calls a paid external API. Check for an in-memory store with a sliding window, or a Redis-backed solution for multi-instance deployments.

For the send-email route specifically, also verify:
- Honeypot field (`website`) is checked server-side — if populated, returns HTTP 200 silently without sending email
- Both outbound emails (team notification + user confirmation) have correct `from`, `to`, and `replyTo` fields
- `from` uses the `CONTACT_FROM_EMAIL` env var, not a hardcoded address

---

## Step 4 — Contact Form Security

Search for the contact form component and its Zod schema:
```bash
grep -rln "z.object\|useForm\|zodResolver" src/components
```

Read the schema file and form component found.

Check the schema:
- Every text field has `.max()` — no field accepts unlimited input
- `name` and `message` have a max of at least 500 characters
- `email` uses `z.string().email()`
- `phone` regex requires at least one digit (not just punctuation or formatting characters)
- Honeypot field (`website`) is defined as `.max(0).optional()`

Check the form component:
- Honeypot input is positioned off-screen via CSS (`absolute`, `left-[-9999px]` or equivalent) — NOT `display:none` or `visibility:hidden` (detectable by bots)
- Honeypot has `tabIndex={-1}` and `autoComplete="off"`
- Honeypot wrapper has `aria-hidden="true"`
- Form element has `noValidate` so browser native validation doesn't interfere

---

## Step 5 — Dependency Audit

Run:
```bash
npm audit --audit-level=moderate 2>&1
```

Report:
- Total count of critical, high, and moderate vulnerabilities
- Which direct dependencies (not transitive) are affected
- Recommended resolution for each: patch available, investigate, or acceptable risk

---

## Step 6 — Secrets Scan

Run each search and report findings:

```bash
grep -rn "sk_live\|sk_test\|re_[A-Za-z0-9_-]\{20\}" src/ --include="*.ts" --include="*.tsx"
grep -rn "hardcoded@\|noreply@\|info@" src/ --include="*.ts" --include="*.tsx"
```

Check `.gitignore` contains:
- `.env`
- `.env.*` (with `!.env.example` exception)
- `node_modules`
- `.next`

Flag if `.env.local` is not excluded.

---

## Step 7 — Image Remote Patterns

Read the `images` block in `next.config.mjs`.

Check:
- `remotePatterns` is used — not the deprecated `domains` array
- No wildcard hostname (`**`) is present
- Only hostnames the project explicitly fetches images from are listed (e.g. Google user photos for reviews, CDN domain for client assets)

---

## Step 8 — Cookie and Storage Usage

Search for browser storage usage:
```bash
grep -rn "document\.cookie\|localStorage\|sessionStorage" src/ --include="*.ts" --include="*.tsx"
```

- `document.cookie` must never appear — flag any occurrence
- `localStorage` and `sessionStorage` must not store tokens, emails, or any PII
- Cookie reads in server context must use `next/headers` — `cookies()` from `'next/headers'`

---

## Final Report

### ✅ Passing
List every check that passed with a one-line confirmation.

### ⚠️ Issues Found
For each issue:
- **File**: exact path and line number
- **Issue**: what is wrong
- **Risk**: what an attacker could do
- **Fix**: the exact change needed (code snippet if helpful)

### 📋 Pre-Deploy Security Checklist
Output the checklist from `blueprints/security.md` with each item marked:
- `[x]` confirmed passing
- `[ ]` needs attention

Include a one-line note for any `[ ]` item explaining the gap found.
