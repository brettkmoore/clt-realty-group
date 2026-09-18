# CLT Realty Group

The website for Candace L. Thompson, MBA, cltrealtygroup.net. Residential real estate across Charlotte, North Carolina and the South Carolina towns around it: Rock Hill, Fort Mill, Tega Cay, Lake Wylie, York, Clover and Indian Land, plus Waxhaw, Matthews, Pineville and Monroe in North Carolina. Keller Williams Connected, Fort Mill.

Built 2026-09-18 by Best Known Brand on the same playbook as deborahroserealestate.com. Next.js 16, React 19, Tailwind CSS 4, deployed on Vercel.

## Run it

```
pnpm install
pnpm dev
```

Then open http://localhost:3000.

```
pnpm typecheck      # tsc
pnpm lint           # eslint
pnpm check:copy     # the copy gate, see below
pnpm build          # production build
```

## Where things live

| What | Where |
|---|---|
| Every fact about the business: name, phone, email, licenses, brokerage, hours, service area, Google profile IDs | `src/lib/site.ts` |
| The eleven client stories, one Markdown file each with front matter | `content/stories/` |
| The twelve area pages' copy | `src/content/areas.ts` |
| The FAQ blocks on the home, buyers and sellers pages | `src/content/faq.ts` |
| The three quoted Google reviews | `src/content/reviews.ts` |
| The IQ quiz questions, explanations and result tiers | `src/content/quiz.ts` |
| The contact pop-up and the form it shares with /contact/ | `src/components/ContactModal.tsx`, `src/components/ContactForm.tsx` |
| JSON-LD builders (RealEstateAgent + LocalBusiness, Person, ImageObject, Organization, WebSite, BlogPosting, BreadcrumbList, FAQPage) | `src/lib/schema.ts` |
| Design tokens and the few CSS rules utilities cannot carry | `src/styles/tailwind.css` |
| Her logo and the Keller Williams mark | `public/brand/` |
| Her headshot, 1200 by 1600, never upscaled | `public/about/` |
| One hero photo per story that has one, 1600px WebP | `public/stories/` |
| Tailwind Plus Marketing UI Blocks, the source for every section component | `vendor/tailwind-plus/` |
| What is unverified and what Candace must confirm | `docs/open-items-2026-09-18.md` |

## Components

Every section is built from a Tailwind Plus Marketing block, rethemed to the tokens in `src/styles/tailwind.css`. Each component's header comment names its block. The mapping:

| Site component | Tailwind Plus block |
|---|---|
| `Navbar` | Elements, Headers, With call-to-action |
| `Hero` | Heroes, Split with image (headshot beside the copy, nothing behind the words) |
| `FeatureThree` | Feature sections, Simple three column with small icons |
| `FeatureSplit` | Feature sections, With product screenshot on left |
| `Timeline` | Stats sections, Timeline (used for a process) |
| `AreaGrid` | Feature sections, Simple 3x2 grid (twelve items) |
| `StoryCard` | Blog sections, Three-column with images |
| `Reviews` | Testimonials, Grid (three, set as type) |
| `GoogleProfile` | Stats sections, Two-column description |
| `PageIntro` | Header sections, Simple with eyebrow |
| `FAQList` | FAQ sections, Two columns |
| `ClosingAsk` | CTA sections, Simple justified |
| `Footer` | Footers, 4-column with company mission |
| Contact page | Contact sections, Split with pattern |
| About page | Content sections, With image on the left |
| 404 | Feedback, 404 pages, Simple |

What was stripped from every block, on purpose: rounded corners on photos and panels, drop shadows, the indigo accent, announcement pills, arrow glyphs on links, star glyphs, and any container that reads as a button without being one.

## Routes

`/` home, `/buyers/`, `/sellers/`, `/about/`, `/stories/` and `/stories/<slug>/`, `/areas/` and `/areas/<slug>/`, `/contact/`, `/quiz/`, `/sitemap.xml`, `/robots.txt`. `/blog/`, `/case-studies/` and `/neighborhoods/` redirect to `/stories/` and `/areas/`.

## Search visibility

`HIDE_FROM_SEARCH_ENGINES` in `src/lib/site.ts` is `true`. Robots disallows everything and every page carries noindex. Every host other than cltrealtygroup.net also answers `X-Robots-Tag: noindex, nofollow` regardless. Flip the flag to `false` at launch.

## The contact form

`/api/contact/` forwards submissions from the form and the quiz as JSON, every field included, to `CONTACT_WEBHOOK_URL` (a GoHighLevel inbound webhook; her sub-account was staged on 2026-09-09). Until that environment variable is set on Vercel, the form tells the visitor it is not connected and shows the phone number and email instead.

## Adding a story

Copy any file in `content/stories/`, change the front matter, write the body in Markdown, run `pnpm check:copy`. `order` decides the sequence; `date` is the closing date where known or the publication date. `area` must be one of the twelve slugs in `src/lib/site.ts` or `null`. `state` is `NC` or `SC`. The hero photo goes in `public/stories/` at 1600px wide; the alt text follows the pattern feature, property, neighborhood, city, state, and never contains a street address or a person.

## The copy gate

`scripts/check-copy.mjs` fails on em dashes, en dashes, double hyphens in prose, the "not X, it's Y" reframe, British spellings, fair housing phrases that describe people rather than property, any client surname from the internal dossiers, and any dossier street address outside an image filename. It runs on `content/` and `src/`. Run it before every commit.

## Rules that are not negotiable

- No client names and no street addresses in any story or alt text.
- Every number in marketing copy has a record behind it: her case studies, her Google profile, or her Keller Williams page.
- Nothing that cannot be clicked may look clickable. No pills, no badges, no decorative cards.
- Photos take no border radius. The pink fills the primary button and nothing else.
- American spelling. No em dashes. Candace with an a.
