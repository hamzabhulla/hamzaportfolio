# Hamza Bhulla, Full-Stack Web Developer

**Portfolio:** [hamzabhulla.vercel.app](https://hamzabhulla.vercel.app), based in Lahore, Pakistan, working remotely worldwide

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase)](https://supabase.com/)

I build production web apps end to end: real-time messaging, commerce, and business dashboards, with React, TypeScript, and Next.js. This repository is my portfolio: the live site, its source, and the engineering behind it.

**Open to remote full-time roles and freelance work.** The fastest way to reach me is [heyhamza.dev@gmail.com](mailto:heyhamza.dev@gmail.com).

## Featured work

| Project | What it is | Stack | Links |
| --- | --- | --- | --- |
| **VibeTalk** | Real-time messaging app: rooms, direct messages, presence, voice notes, WebRTC voice/video calls, web push, and group end-to-end encryption. | React, TypeScript, Supabase, WebRTC | [Live](https://vibetalk.hamzabhulla.workers.dev) / [Source](https://github.com/hamzabhulla/VibeTalk) |
| **Ember & Co.** | Restaurant storefront with ordering, reservations, Stripe payments, order tracking, and staff operations. | React, TypeScript, Express, Supabase, Stripe | [Live](https://embercoui.vercel.app) / [Source](https://github.com/hamzabhulla/embercoui) |
| **WebNotepad** | Offline-first writing app: rich text, checklists, drawing, import/export, installable PWA, optional sync. | JavaScript, PWA, Service Workers, Upstash Redis | [Live](https://easynotepad.vercel.app) / [Source](https://github.com/hamzabhulla/web-notepad) |
| **WhatsApp Concierge** | Booking-bot operations dashboard for a real client: leads, conversations, properties, training, and pairing. The client did not continue hosting, so the deployment is no longer live. | React, JavaScript, Supabase, Row Level Security | [Source](https://github.com/hamzabhulla/WhatsApp-Concierge-ResideElite) |

More work: [github.com/hamzabhulla](https://github.com/hamzabhulla)

## What I do

- **Real-time web apps**: chat, presence, calls, and live updates with Supabase Realtime and WebRTC.
- **Commerce & dashboards**: storefronts with payments, and operations dashboards that real businesses run on.
- **AI-assisted automation**: booking bots and workflow automation that handle customer conversations and follow-ups.
- **Offline-first & mobile-friendly**: PWAs and responsive layouts that work on low-end devices and flaky networks.
- **Search-visible sites**: structured data, sitemaps, and social previews built in from the start, not bolted on.

## Engineering quality

This site is held to the same standard as client work:

- **Type-safe**: TypeScript in strict mode, ESLint with React Hooks rules, zero warnings tolerated.
- **Tested**: Vitest unit tests plus a production smoke test that rebuilds the app and checks every route, its metadata, schema, and social preview.
- **CI on every push**: lint → typecheck → test → build → smoke test (`.github/workflows/ci.yml`).
- **Secure by default**: Content Security Policy, `nosniff`, `DENY` framing, and referrer/permissions policies on every response.
- **Accessible**: keyboard-operable accordion and navigation, visible focus states, `aria-expanded` states, and `prefers-reduced-motion` support.
- **Fast & static**: 15 statically generated pages, self-hosted images, no external image hot-linking.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript (strict) |
| Styling | Custom CSS, PostCSS Autoprefixer |
| Data & realtime | Supabase (PostgreSQL, Auth, Realtime, Row Level Security) |
| Payments | Stripe |
| Calls | WebRTC |
| Testing | Vitest, production smoke test (`scripts/smoke-test.mjs`) |
| Hosting | Vercel |

## Run locally

Requirements: Node.js 20.9+, npm.

```bash
git clone https://github.com/hamzabhulla/hamzaportfolio.git
cd hamzaportfolio
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Environment variables (see `.env.example` for the full list):

```dotenv
NEXT_PUBLIC_SITE_URL=https://hamzabhulla.vercel.app
NEXT_PUBLIC_CONTACT_EMAIL=heyhamza.dev@gmail.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |
| `npm run test` | Run the Vitest unit tests |
| `npm run smoke-test` | Verify the built site: routes, metadata, schema, sitemap, robots, social preview |
| `npm run lint` | ESLint (TypeScript + React Hooks rules) |
| `npm run typecheck` | TypeScript type checking without emitting files |

## Project structure

```text
app/
  page.tsx                      # Homepage
  web-developer-lahore/         # Freelance web developer in Lahore
  web-developer-muridke/        # Web developer in Muridke (service area)
  api/projects/route.ts         # Project data as JSON
  globals.css                   # Design system, responsive layout
  layout.tsx                    # Metadata and structured data
  opengraph-image.tsx           # Generated social preview image
  robots.ts / sitemap.ts        # robots.txt and sitemap.xml routes
  llms.txt/route.ts             # llms.txt for AI crawlers
components/                     # Navigation, hero, projects, about, skills, FAQ, contact
lib/
  mock-data.ts                  # Featured project content
  site-url.ts                   # Canonical site URL handling
  social-links.ts               # Social profile destinations
  to-plain-text.ts              # HTML-to-text for schema matching
public/                         # Local visual assets
scripts/smoke-test.mjs          # Production smoke test (self-rebuilding)
.github/workflows/ci.yml        # CI: lint, typecheck, test, build, smoke test
```

## Contact

- **Email:** [heyhamza.dev@gmail.com](mailto:heyhamza.dev@gmail.com)
- **GitHub:** [github.com/hamzabhulla](https://github.com/hamzabhulla)
- **LinkedIn:** [linkedin.com/in/hamza-mohsin-67b00840a](https://www.linkedin.com/in/hamza-mohsin-67b00840a)
- **Instagram:** [@hamzabhulla_](https://www.instagram.com/hamzabhulla_/)
- **Facebook:** [@hamzabhulla.dev](https://www.facebook.com/hamzabhulla.dev/)
- **X:** [@hamzabuild](https://x.com/hamzabuild)

---

Built by **Hamza Bhulla**, Lahore, Pakistan.
