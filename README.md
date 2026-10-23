# Hamza Bhulla — Developer Portfolio

A responsive, single-page portfolio built to help hiring teams, founders, and clients quickly understand my work, technical range, and how to get in touch.

The focus is straightforward: clear project previews, concise explanations, a practical skills overview, and easy access to source code and social profiles—without inflated metrics or buzzword-heavy claims.

## What’s included

- **Project-led homepage** with short case-study summaries, technology tags, and demo/source links.
- **Responsive layout** designed for mobile first and expanded for desktop.
- **Interactive project-card stack** using CSS perspective and bounded pointer/touch dragging. Selecting a card brings it to the front; it returns to its original position on release.
- **Accessible interactions** with keyboard support, visible focus states, and reduced-motion handling.
- **Single-page navigation** for Work, About, Skills, and Contact, with social profile links in the desktop header and mobile menu.
- **Search and sharing metadata** including page titles/descriptions, canonical URL support, Open Graph/Twitter metadata, a generated social preview image, and Person/ProfilePage structured data.
- **Crawler routes** for /robots.txt and /sitemap.xml.
- **Project data endpoint** at /api/projects.

## Built with

| Area | Tools |
| --- | --- |
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Custom CSS with PostCSS Autoprefixer |
| Interaction | CSS perspective/transforms, pointer events, reduced-motion support |
| Icons | Lucide React, Simple Icons |
| Data foundation | Static project data; no database or external backend is required for the portfolio |

The homepage’s featured-project content currently lives in **lib/mock-data.ts**. The **/api/projects** route returns that data as JSON.

## Run locally

### Requirements

- Node.js 20.9 or newer
- npm

### Setup

~~~bash
git clone https://github.com/hamzabhulla/hamzaportfolio.git
cd hamzaportfolio
npm ci
~~~

Create a local environment file from the example:

~~~bash
cp .env.example .env.local
~~~

Set the values you actually use before testing deployment-specific metadata:

~~~dotenv
# Permanent production origin; do not set this to a temporary preview URL.
NEXT_PUBLIC_SITE_URL=https://your-domain.example

# Optional: override the default Instagram and Facebook profile links.
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_FACEBOOK_URL=

# Optional: Google Search Console HTML-tag verification value.
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=

# Optional: public contact email shown on the site.
NEXT_PUBLIC_CONTACT_EMAIL=
~~~

Start the development server:

~~~bash
npm run dev
~~~

Open http://localhost:3000.

## Useful commands

| Command | Purpose |
| --- | --- |
| npm run dev | Start the development server |
| npm run build | Create a production build |
| npm run start | Serve the production build locally |
| npm run smoke-test | Check the built site’s metadata, project API, sitemap, robots file, and social preview (after build) |
| npm run lint | Run ESLint with TypeScript and React Hooks rules |
| npm run typecheck | Run TypeScript type checking without emitting files |

## Deploy

The project can be deployed to Vercel or another platform that supports Next.js 16 and Node.js 20.9 or newer.

1. Import this repository into your hosting provider.
2. Configure the environment variables listed above.
3. Set **NEXT_PUBLIC_SITE_URL** to the permanent HTTPS domain after the domain is connected.
4. Run a production build and review the site at desktop and mobile widths.
5. Confirm that the contact email and all social links point to the intended accounts.

The portfolio currently links to these public profiles:

- [GitHub](https://github.com/hamzabhulla)
- [LinkedIn](https://www.linkedin.com/in/hamza-mohsin-67b00840a)
- [Instagram — @hamzabhulla_](https://www.instagram.com/hamzabhulla_/)
- [Facebook — @hamzabhulla.dev](https://www.facebook.com/hamzabhulla.dev/)
- [X — @hamzabuild](https://x.com/hamzabuild)

## Search-engine setup

The code provides metadata and crawler routes, but appearing in Google results is not automatic.

1. Deploy the site to its permanent domain and set **NEXT_PUBLIC_SITE_URL**.
2. Add the site to [Google Search Console](https://search.google.com/search-console/about).
3. If using HTML-tag verification, copy the verification content value into **NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION** and redeploy.
4. Submit **https://your-domain.example/sitemap.xml** in Search Console.
5. Inspect the canonical URL, page title, description, social preview, and mobile layout after deployment.

Search ranking and indexing depend on Google’s crawling and indexing decisions; this repository does not guarantee search placement.

## Project structure

~~~text
app/
  api/projects/route.ts  # JSON endpoint for project data
  globals.css            # Design system, responsive layout, interactions
  layout.tsx              # Metadata and structured data
  opengraph-image.tsx     # Generated social preview image
  page.tsx                # Single-page homepage composition
  robots.ts               # robots.txt route
  sitemap.ts              # sitemap.xml route
components/               # Navigation, hero, projects, about, skills, contact
lib/
  mock-data.ts            # Featured project content
  site-url.ts             # Canonical site URL handling
  social-links.ts         # Social profile destinations
public/                   # Local visual assets
~~~

## Contact

For remote roles, freelance work, or product collaborations, use the contact details and social links on the portfolio.

---

Built by **Hamza Bhulla**.
