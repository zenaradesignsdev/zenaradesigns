You are performing a mobile responsiveness audit of a Zenara Designs project. This is a Next.js 14 App Router site for a local professional services business. The majority of visitors arrive on mobile — the site must feel intentional and effortless at 375px (iPhone SE). Work through every step in order.

The full mobile standard is in `blueprints/mobile.md`. Treat it as your reference throughout.

---

## Step 1 — Mobile-First Tailwind Patterns

Scan for desktop-first responsive patterns that fight Tailwind's mobile-first approach:
```bash
grep -rn "max-sm:\|max-md:\|max-lg:" src/ --include="*.tsx"
```
For each result: is the `max-` variant genuinely needed (e.g. hiding a decorative element on desktop), or is it compensating for a base style that was written desktop-first? The latter must be rewritten.

Scan for fixed arbitrary widths that could overflow on mobile:
```bash
grep -rn "w-\[" src/ --include="*.tsx"
```
For each result: at 375px viewport, would this overflow? If so, should it be `w-full max-w-[...]` instead?

Scan for grid layouts missing a mobile breakpoint:
```bash
grep -rn "grid-cols-[2-9]" src/ --include="*.tsx" | grep -v "sm:\|md:\|lg:\|xl:"
```
Flag every result — a grid starting at 2+ columns with no breakpoint prefix will break at 375px.

---

## Step 2 — Horizontal Overflow

Check `src/app/globals.css`:
- Is `overflow-x: hidden` set on `html` or `body`? Note it as a safety net — the root cause (below) should still be found.

Scan for negative margins that escape their containers:
```bash
grep -rn "\-mx-\|\-ml-\|\-mr-" src/ --include="*.tsx"
```
For each result: does the parent have `overflow-hidden` to contain the bleed? If not, flag it.

Scan for viewport-wide elements:
```bash
grep -rn "w-screen\|min-w-screen" src/ --include="*.tsx"
```
Flag any `w-screen` element that is not wrapped in `overflow-hidden` — it will cause horizontal scroll on every browser.

---

## Step 3 — Typography at Mobile

Read page and component files. For each, check:

**Minimum readable sizes:**
- Body text must not be smaller than `text-base` (16px) — flag `text-sm` on paragraph content
- Navigation links must be at least `text-base`
- Button labels must be at least `text-base`

**iOS auto-zoom prevention:**
Find the contact form component:
```bash
grep -rln "useForm\|<Input\|<Textarea" src/components --include="*.tsx"
```
Read the file found. Any `<Input>` or `<Textarea>` with `text-sm` or `text-xs` applied directly will trigger iOS auto-zoom on tap (Safari zooms in when the input font size is under 16px). Flag every occurrence.

**Heading sizes on mobile:**
- `<h1>` must start at `text-3xl` or larger (≥30px) at mobile — flag `text-2xl` or smaller as the base
- Long heading text must use `leading-tight` or `leading-snug` to prevent overlap at small sizes
- Body copy containers should have `max-w-prose` or a constrained max-width to prevent overly long lines on desktop

---

## Step 4 — Touch Targets

The minimum recommended touch target is 44×44px (Apple HIG) — 40px is acceptable for non-primary actions.

**Icon-only buttons:**
```bash
grep -rn "<button\|<Button" src/ --include="*.tsx"
```
For each button containing only an icon (no text): does it have at least `p-2.5` padding? An icon at `h-5 w-5` (20px) needs `p-2.5` (10px) on each side to reach 40px total.

**Navigation links:**
Read the navigation component. Do nav links have at least `py-2 px-3` padding?

**Primary CTAs:**
- Do CTAs use `size="lg"` (`h-11` = 44px) rather than default `size` (`h-10`)?
- Do primary CTAs use `w-full sm:w-auto` so they span the full width on mobile?

**Link lists:**
Are clickable list items separated by at least `space-y-2` (8px) to prevent accidental adjacent taps?

---

## Step 5 — Click-to-Call and Click-to-Email

Search for `tel:` and `mailto:` links:
```bash
grep -rn "tel:\|mailto:" src/ --include="*.tsx"
```

Also search for plain text phone patterns that may have been missed:
```bash
grep -rn '(\d\{3\})\|[0-9]\{3\}-[0-9]\{3\}-[0-9]\{4\}\|\+1' src/ --include="*.tsx"
```

Check:
- Every phone number displayed on screen is wrapped in `<a href="tel:+1XXXXXXXXXX">` using international format
- Every email displayed on screen is wrapped in `<a href="mailto:...">`
- On mobile, is there a primary above-the-fold or sticky CTA for phone/contact? Flag if the only conversion path requires scrolling significantly on a 375px screen.

---

## Step 6 — Mobile Navigation

Find the navigation component:
```bash
find src/components -name "Navbar*" -o -name "Nav*" -o -name "Header*" | head -5
```

Read the file found. Check:
- A hamburger/menu toggle is visible on mobile and hidden on `lg:` screens
- The menu button has at least `p-2.5` padding (44px touch target)
- The button has `aria-expanded`, `aria-controls`, and `aria-label="Open menu"` / `aria-label="Close menu"` attributes
- Body scroll is locked when the menu is open (look for `document.body.style.overflow = 'hidden'` or a CSS class)
- The menu closes on route change (look for a `usePathname` or `useRouter` effect)
- The menu closes on `Escape` key (look for a `keydown` event handler)
- The mobile menu contains all the same links as the desktop nav

---

## Step 7 — Forms on Mobile

Find the contact form component:
```bash
grep -rln "useForm\|zodResolver" src/components --include="*.tsx"
```

Read the file found. Check:
- Email input has `type="email"` — shows correct keyboard on iOS
- Phone input has `type="tel"` — shows numeric keypad on iOS
- Name input has `autoComplete="name"`
- Email input has `autoComplete="email"`
- Phone input has `autoComplete="tel"`
- Message textarea has `autoComplete="off"`
- All inputs are at least `h-10` (40px) — flagging anything shorter
- Every field has a visible `<label>` (or `<FormLabel>`) — no placeholder-only labels (placeholders disappear on focus)
- Submit button uses `w-full sm:w-auto` and `size="lg"`
- Honeypot field is positioned off-screen, not `display:none` or `visibility:hidden`

---

## Step 8 — Images on Mobile

Search for all image usage:
```bash
grep -rn "<Image" src/ --include="*.tsx"
```

For each image, check:
1. **`sizes` prop** — is it present and does it start with a mobile-appropriate value? e.g. `sizes="(max-width: 768px) 100vw, ..."` — without this, mobile browsers fetch the full desktop-sized image
2. **Aspect ratio for `fill` images** — does the parent use `aspect-video`, `aspect-square`, or `aspect-[W/H]`? Without a defined aspect ratio, the image height collapses to 0 until loaded (CLS)
3. **Hero/banner images** — if a landscape image would crop faces or key content at mobile aspect ratios, flag it for art direction consideration
4. **`priority`** — each page must have exactly one priority image (the LCP element)

---

## Step 9 — Safe Area Insets (Notch / Home Bar)

Search for fixed and sticky elements:
```bash
grep -rn "fixed\|sticky" src/ --include="*.tsx" | grep -v "node_modules"
```

For each fixed element:
- Fixed header at top: should include `pt-[env(safe-area-inset-top)]` or use `top-[env(safe-area-inset-top)]` to avoid the notch on iPhone
- Fixed element at bottom (sticky CTA bar, mobile nav bar): should include `pb-[env(safe-area-inset-bottom)]` to avoid the home bar on iPhone
- Fixed sidebar: should account for left/right safe area insets

If no fixed elements exist, note this as not applicable.

---

## Step 10 — CSS Animations on Mobile

This project uses CSS animations (not Framer Motion). Check:

Search for animation classes:
```bash
grep -rn "animate-\|transition-\|@keyframes" src/app/globals.css src/ --include="*.tsx"
```

For each animation:
- Does it only animate `opacity` and `transform`? Flag any animation of `width`, `height`, `top`, `left`, `margin`, or `padding` — these trigger layout recalculation and cause jank on mobile CPUs
- Are motion offsets kept small on mobile? (slide-in translations > 24px can feel jarring on a 375px screen)
- Is `@media (prefers-reduced-motion: reduce)` respected in `globals.css`? Users who have enabled reduced motion in system settings should not see animations.

---

## Step 11 — Spacing and Padding

Read page and section component files.

Check:
- Every full-width section has at least `px-4` horizontal padding — text must never touch the screen edge on mobile
- Content containers follow the standard pattern: `max-w-7xl mx-auto px-4 sm:px-6` (or similar)
- Vertical section padding uses mobile-first values: `py-12 sm:py-16 md:py-24` — not the same large value at all breakpoints
- No section or container has zero horizontal padding on mobile unless it is itself `overflow-hidden` (for intentional full-bleed backgrounds)

---

## Step 12 — Viewport Height

Search for viewport height usage:
```bash
grep -rn "100vh\|h-screen\|min-h-screen" src/ --include="*.tsx" --include="*.css"
```

For each `h-screen` or `100vh`:
- `h-screen` in modern Tailwind maps to `100svh` (small viewport height, excludes browser chrome) — acceptable
- Raw CSS `height: 100vh` does NOT account for the browser chrome bar on mobile — flag and suggest `100dvh` (dynamic viewport height) or `100svh`
- Hero sections using `h-screen`: does the content still fit when the browser chrome is visible (about 80px shorter than full screen height)?

---

## Final Report

### ✅ Passing
List every check that passed with a specific observation (e.g. "ContactForm: all inputs have correct `type` attributes and `autoComplete` values ✓").

### ⚠️ Issues Found
For each issue:
- **File**: exact path and line number
- **Issue**: what is wrong
- **User impact**: how this affects mobile visitors (e.g. "iOS Safari will zoom in when the user taps the phone field", "touch target is ~24px — users will frequently mis-tap adjacent links")
- **Fix**: exact change needed

### 🔴 Critical — Fix Before Launch
Separately call out any issue that would make the site unusable or lose conversions on mobile:
- Horizontal overflow at 375px viewport
- Phone numbers not wrapped in `tel:` links
- iOS input auto-zoom (inputs smaller than 16px)
- Touch targets under 32px on primary interactive elements
- No mobile navigation menu

### 📋 Pre-Launch Mobile Checklist
Output the checklist from `blueprints/mobile.md` with each item marked:
- `[x]` confirmed passing
- `[ ]` needs attention

Include a one-line note for any `[ ]` item.
