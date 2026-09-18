# Claude instructions for this repo

The code says how the site works. This file carries the decisions the code cannot express on its own. Read `README.md` for where things live and `docs/open-items-2026-09-18.md` for what is unverified.

## Her name

**Candace, with an a.** Candace L. Thompson, MBA. Her email, her logo, her Keller Williams page and every meeting transcript agree. A Drive folder titled "Candice" and one Google review that says "Candice" are misspellings. Never "fix" the name toward them. The name is displayed with the middle initial and a period, as on her logo, except where a platform already holds it another way.

## Constraints that a future session would otherwise break in good faith

**The palette is hers, not a designer's.** Sixty percent white, thirty percent blue, ten percent pink, agreed with Candace on 2026-08-28. The blue and the pink are sampled from her logo. The blue labels; the pink is the one action color and fills nothing but the primary button. Do not add a third accent and do not swap the pink for something "more professional." She wears pink on the hard days and takes every headshot in it. That is the brand.

**"Your home should be your sanctuary" is the homepage line.** Chosen with Brett on 2026-08-28 from a phrase she has said to clients for years. Do not rewrite it into a tagline about service or results. Comfort and sanctuary is the positioning; competence is shown in the stories, never claimed in a headline.

**The Google rating is shown as type and never as markup.** 5.0 from 32 reviews, read 2026-09-18, dated on the page. No `aggregateRating`, no `review` nodes, no star glyphs, no widget. Update the number, the count and the date together or not at all. The three quoted reviews in `src/content/reviews.ts` are real, verbatim and attributed as the reviewer signed them; Candace confirms the names before launch.

**No client names and no street addresses in published body copy or alt text.** The eleven stories are anonymized versions of her case studies. The dossiers in Drive are internal and are never linked or quoted. Street addresses may appear in image filenames (Brett, 2026-09-18) but do not appear in alt text on this site, because the alt text is read aloud with the story and the story is anonymized. The two stories about a divorce and a death carry no address anywhere, including the filename. The copy gate blocks the dossier surnames and street names.

**Fair housing.** Describe the property and the place, never the people who live there or who would fit. Name a school district as a fact with the instruction to verify the address; never rate it and never make it a reason to buy. The neighborhood guides in Drive rate districts and profile "who buys here"; that content was deliberately left out of the area pages and must not be restored. Nothing about "safe," "family-friendly," "quiet," "young professionals," "retirees" or a religious institution as an amenity. In alt text, never describe people. Age-restricted communities may be named as such because that is a legal fact about the property.

**No em dashes in site copy.** Brett's standing rule. Rewrite into two sentences. Never an en dash or a double hyphen instead. Her case studies are full of them; they were removed on the way in.

**Nothing unclickable may look clickable.** No decorative pills, badges or cards that read as buttons. Eyebrows and metadata are set as type. Stats and facts are definition lists with hairlines, never bordered cards. Photos take no radius.

**Keller Williams, not eXp.** Nothing from the Deborah Rose build's Texas or eXp compliance applies here. The Keller Williams Identity and Style Guide (section 3.1) requires the market center DBA logo and the ownership statement on every website. The footer carries both. Two states license her; the footer names both commissions and both numbers.

## Where her voice comes from

Every sentence in her first person is derived from her eleven case studies in the CLT Realty Group Digital Assets Drive (`05_Content/Case_Studies`) and from what she said in the seven meeting transcripts of August and September 2026. Read three case studies before writing anything in her voice. The rhythm: state the assumption most people make, say what she did instead and why, give the number, close on what the client needed rather than on the deal. Plainspoken. "That is the job." "I would never steer someone away from." "Here is the thing." She talks about the payment letting you sleep, about not rushing anyone, and about doing whatever the house needs, including sweeping it out herself.

## Canonical facts, one place

`src/lib/site.ts` is the only file that types the business name, phone, email, license numbers, brokerage, hours, service area, coordinates, profile URLs or Google Business Profile IDs. Change a fact there and every page, the footer and the schema follow.

- Business name: CLT Realty Group. It is one person. Google Business Profile name: Candace L Thompson, CLT Realty Group at Keller Williams.
- Phone: (704) 778-0779. Email: candacethompsonrealtor@gmail.com.
- Brokerage: Keller Williams Connected, 901 Dave Gibson Blvd., Fort Mill, SC 29708, (803) 835-2300. The address is the market center's, never hers.
- Licenses: South Carolina 72014, North Carolina 259158, as printed on her Keller Williams page on 2026-09-18. Awaiting her own confirmation.
- Service area: twelve towns with a page each, Charlotte first. Gastonia and Mooresville have stories and no page.

## The Tailwind Plus components

`vendor/tailwind-plus/` holds the Marketing UI Blocks download from Brett's Tailwind Plus account (2026-09-17). Each site component names the block it came from in its header comment. When a new section is needed, start from a block there rather than hand-rolling one. The repo is private, which is what keeps the license clean.

## Launch checklist, not yet done

- `HIDE_FROM_SEARCH_ENGINES` in `src/lib/site.ts` is `true`. Flip it to `false` at launch.
- Every host except cltrealtygroup.net answers `X-Robots-Tag: noindex, nofollow` (next.config.mjs, keyed on the request host). Review links on *.vercel.app stay out of Google without anything to undo at launch.
- `CONTACT_WEBHOOK_URL` must be set on Vercel before the contact form delivers anything.
- cltrealtygroup.net currently redirects to her Keller Williams page. It is registered at GoDaddy in her name and must be pointed at Vercel at launch.
- Her Google Business Profile has no website set. At launch it becomes cltrealtygroup.net.
- Deploy is push to `main`; Vercel builds. Nothing else.
