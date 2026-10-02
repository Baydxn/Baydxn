# Bayd XN — Code. Design. Digital Craft.

A premium, interactive digital-book portfolio for **Bayd XN** — web developer, UI/UX designer, graphic designer and digital product builder.

The site is built as one continuous experience: the fixed navigation acts as the book's index, every route is a chapter, and page transitions double as page turns.

---

## Positioning

**Craft + code + design + engineering + digital product thinking.**

The technology behind a project is treated as secondary to the quality of the finished work.
The stack is framed as: *"Modern tools. Thoughtful engineering. Purpose-built experiences."*

---

## Chapters

| Route | Chapter |
| --- | --- |
| `/` | Index — Code. Design. Digital Craft. |
| `/about` | Not Just a Website. |
| `/services` | What I Build |
| `/work` | Selected Work |
| `/work/:slug` | Project case study |
| `/process` | From Idea to Interface. |
| `/solutions` | What Are You Trying to Solve? |
| `/testimonies` | Words From People I've Worked With |
| `/faq` | Questions, Answered. |
| `/contact` | Have an Idea Worth Building? |
| `*` | 404 — This Page Doesn't Exist. |

---

## Design System

**Monochrome only.** Black, white, off-white and subtle grayscale. No loud gradients, no neon.

### Typography

| Role | Family |
| --- | --- |
| Display / headings | Bricolage Grotesque (rounded, modern, medium-heavy) |
| Body | Plus Jakarta Sans |
| Technical / labels | JetBrains Mono |
| Editorial accent | Instrument Serif |

Custom utilities (see `src/index.css`):

- `.text-outline` / `.text-outline-faint` / `.text-outline-thick` — monochrome stroke display type
- `.text-sheen` — grayscale animated ink sheen
- `.font-accent` / `.font-accent-italic` — serif pull-quotes and emphasis
- `.marquee-track`, `.grain`, `.link-underline`, `.no-scrollbar`, `.tabular`

---

## Motion

Animation communicates quality rather than decorating the page. Every animation collapses to a simplified form under `prefers-reduced-motion`.

- **Route transitions** — `AnimatePresence mode="wait"` drives a fade / rise / unblur / page-fold sequence (`App.tsx` + `PageLayout.tsx`)
- **`RevealText`** — word-by-word editorial headline reveal (never a typewriter)
- **`Reveal`** — scroll-triggered entrance for cards and blocks
- **`PageTurnSweep`** — a light sweep across the viewport on each route change
- **`ScrollProgress`** — spring-damped reading-progress bar
- **`Marquee`** — infinite editorial ticker
- **`RotatingHeroText`** — I design. / I build. / I refine. / I deliver.

---

## Content Architecture

All content lives in typed data modules so the UI never hardcodes copy — a future CMS or admin dashboard can drive the site without rebuilding the frontend.

```
src/data/
  siteConfig.ts     brand, navigation chapters, social + WhatsApp, routes
  projects.ts       portfolio projects + case-study fields
  services.ts       four service disciplines, capabilities, deliverables
  testimonials.ts   client testimonials (placeholder-flagged)
  faqs.ts           FAQ entries
  solutions.ts      problem -> solution pairs
  process.ts        six-stage process timeline
```

Shared types live in `src/types/index.ts`.

### Replacing placeholder content

- **Projects** — edit `src/data/projects.ts` and drop artwork into `public/assets/projects/`
- **Testimonials** — edit `src/data/testimonials.ts`; entries flagged `isPlaceholderNote: true` render a "DEMO / READY FOR REAL COPY" badge. No testimonials or statistics are presented as real.
- **Portrait** — replace `public/assets/bayd-portrait-*.jpg`

---

## Contact

- **WhatsApp** — [+234 912 514 2256](https://wa.me/2349125142256)
- **Email** — [cc99187197@gmail.com](mailto:cc99187197@gmail.com)
- **X** — [@Bayd_xn](https://x.com/Bayd_xn)

The floating WhatsApp button and every CTA open WhatsApp pre-filled with:

> Hello Bayd XN 👋, I came across your portfolio and I'd like to know more about your services.

---

## Contact Form Delivery

The brief submitted on `/contact` is delivered to an inbox. The delivery channel is
chosen automatically from environment variables — no code changes required.

| Priority | Variable(s) | Provider |
| --- | --- | --- |
| 1 | `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms — free, unlimited, no account |
| 2 | `VITE_EMAILJS_SERVICE_ID` + `_TEMPLATE_ID` + `_PUBLIC_KEY` | EmailJS — 200 emails/month free |
| 3 | `VITE_CONTACT_API_URL` | Custom endpoint (see `api/contact.ts`) |

If none are configured the form still works: it formats the brief and hands it to
WhatsApp rather than pretending an email was sent.

### Setup (recommended — about 2 minutes)

1. Go to **[web3forms.com](https://web3forms.com)**
2. Enter the inbox: `cc99187197@gmail.com`
3. Copy the **Access Key** you receive by email
4. Create `.env` in the project root:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

5. Restart the dev server (`npm run dev`) — or redeploy, see below.

The inbox is bound to the key itself, so no email address needs to live in the source.

### Deploying to Vercel — important

`.env` is git-ignored, so it is **not** deployed with your repository. Because Vite
inlines `VITE_` variables at **build time**, the key must exist when Vercel builds.

**Option A — Vercel dashboard (recommended)**

1. Repo → **Settings** → **Environment Variables**
2. Add `VITE_WEB3FORMS_ACCESS_KEY` for **Production**, **Preview** and **Development**
3. Redeploy (a fresh deploy is required — env vars are baked in at build time)

**Option B — commit the key**

Because a Web3Forms access key is public by design, you may also place it directly in
`.env.example` and commit that file. The trade-off is that scrapers can then read the
key and use your quota, so Option A is preferable.

### Verifying on the live site

Submit the form from your **deployed** domain. Some providers reject requests that
originate from `localhost`, so the production URL is the authoritative test. A working
submission shows **"Brief Delivered."** with a `TRANSMITTED • DELIVERY CONFIRMED` badge,
and the brief arrives in the inbox with `Reply-To` set to the visitor's address.

### Notes

- The brief is sent as JSON, which Web3Forms accepts alongside `FormData`
- The visitor's email is used as `Reply-To`, so hitting reply goes straight to them
- Custom fields (`company`, `project_type`, `budget_range`) appear as separate rows
- All three delivery options can be tested with an intentionally invalid key — the form
  shows a retryable error instead of a false success

### Env variables

All variables are documented in [`.env.example`](./.env.example). Only `VITE_`-prefixed
values are inlined into the browser bundle — which is correct here, because these keys
are designed to be public. **Never** prefix a private secret with `VITE_`; server-only
values (Resend API key, SMTP password) belong in the Vercel dashboard without the prefix.

### Custom backend (optional)

`api/contact.ts` is a Vercel Function that delivers briefs through
[Resend](https://resend.com) using plain `fetch` — no extra npm dependency. Enable it by
setting `VITE_CONTACT_API_URL=/api/contact` plus these **server-only** variables:

```
RESEND_API_KEY      # https://resend.com/api-keys
CONTACT_TO_EMAIL    # cc99187197@gmail.com
CONTACT_FROM_EMAIL  # onboarding@resend.dev until a domain is verified
```

`vercel.json` adds an SPA fallback so deep links such as `/work/geezmart` survive a hard
refresh, while leaving `/api/*` routed to the function above.

### Delivery behaviour

- Per-field validation with accessible error messaging (`aria-invalid`, `aria-describedby`)
- Hidden honeypot field silently absorbs bot submissions
- 15-second request timeout, with a retryable failure state
- Fields are disabled while a submission is in flight
- The success state only claims delivery when the provider confirmed it

---

## Content Protection

Client-side discouragement of casual copying, without breaking normal use or accessibility:

- context menu disabled
- image dragging and selection disabled
- CSS-rendered / grain-overlaid portfolio imagery
- `alt` text preserved and body copy remains fully selectable

This cannot prevent screenshots or developer tools — it only discourages casual copying.

---

## Getting Started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check (tsc -b) + production build
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Tech Stack

React 19 · TypeScript · Vite · React Router · Tailwind CSS v4 · Framer Motion · Lucide

No private credentials are exposed and no secrets are required to run the project.

---

## Roadmap

- [ ] Connect contact submissions to a backend (Firebase / Supabase)
- [ ] Move projects, testimonials and FAQ content to a CMS
- [ ] Optional admin dashboard for content management

---

© 2026 Bayd XN. All rights reserved.
