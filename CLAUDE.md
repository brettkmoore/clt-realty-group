# Claude instructions for this repo

The code says how the site works. This file carries the decisions the code cannot express on its own. Read `README.md` for where things live and `docs/open-items-2026-09-18.md` for what is unverified.

## Her name

**Candace, with an a.** Candace L. Thompson, MBA. Her email, her logo, her Keller Williams page and every meeting transcript agree. A Drive folder titled "Candice" and one Google review that says "Candice" are misspellings. Never "fix" the name toward them. The name is displayed with the middle initial and a period, as on her logo, except where a platform already holds it another way.

## Constraints that a future session would otherwise break in good faith

**The palette is hers, not a designer's.** Sixty percent white, thirty percent blue, ten percent pink, agreed with Candace on 2026-08-28. The blue and the pink are sampled from her logo. The blue labels; the pink is the one action color and fills nothing but the primary button. Do not add a third accent and do not swap the pink for something "more professional." She wears pink on the hard days and takes every headshot in it. That is the brand.

**"Your home should be your sanctuary" is the homepage line.** Chosen with Brett on 2026-08-28 from a phrase she has said to clients for years. Do not rewrite it into a tagline about service or results. Comfort and sanctuary is the positioning; competence is shown in the stories, never claimed in a headline.

**The Google rating is shown as type and never as markup.** 5.0 from 32 reviews, read 2026-09-18, dated on the page. No `aggregateRating`, no `review` nodes, no star glyphs, no widget. Update the number, the count and the date together or not at all. The three quoted reviews in `src/content/reviews.ts` are real, verbatim and attributed as the reviewer signed them; Candace confirms the names before launch.

**No client names and no street addresses in published body copy or alt text.** The eleven stories are anonymized versions of her case studies. The dossiers in Drive are internal and are never linked or quoted. Street addresses may appear in image filenames, alt text and hero captions (Brett, 2026-09-18), never in body copy. On the seven stories that show their own property, the alt text names the neighborhood and city without the house number, because the story is anonymized and the alt text is read aloud with it. On the four fallback heroes the alt text names the photographed property in full, because that property is not the story's client. The two stories about a divorce and a death carry no address anywhere, including the filename. The copy gate blocks the dossier surnames and street names.

**Fair housing.** Describe the property and the place, never the people who live there or who would fit. Name a school district as a fact with the instruction to verify the address; never rate it and never make it a reason to buy. The neighborhood guides in Drive rate districts and profile "who buys here"; that content was deliberately left out of the area pages and must not be restored. Nothing about "safe," "family-friendly," "quiet," "young professionals," "retirees" or a religious institution as an amenity. In alt text, never describe people. Age-restricted communities may be named as such because that is a legal fact about the property.

**No em dashes in site copy.** Brett's standing rule. Rewrite into two sentences. Never an en dash or a double hyphen instead. Her case studies are full of them; they were removed on the way in.

**Nothing unclickable may look clickable.** No decorative pills, badges or cards that read as buttons. Eyebrows and metadata are set as type. Stats and facts are definition lists with hairlines, never bordered cards. Photos take no radius, with one exception Brett set on 2026-09-18: the article hero and the story cards take rounded corners, modeled on buddybuck.com's blog, where the photograph breaks the seam between the deep blue header band and the white body. The category on an article is a real link to the filtered index, never a pill.

**Every article has a hero photo.** Eleven articles exist and eleven were found, after sweeping every folder in the Drive (Case_Studies, Neighborhood_Research, 06_Unsorted, 03_Events, 04_Video, the dossiers and the tracker). Seven have their own property's photo. Four use a fallback from another of her listings, with a caption that says so and an alt text that names the photographed property truthfully; never write the story's town onto a photo of a different town. The four are listed in docs/open-items and are replaced the day she supplies the real photos.

**Keller Williams, not eXp.** Nothing from the Deborah Rose build's Texas or eXp compliance applies here. The Keller Williams Identity and Style Guide (section 3.1) requires the market center DBA logo and the ownership statement on every website. The footer carries both. Two states license her; the footer names both commissions and both numbers.

## Layout rules learned on the Deborah Rose build, applied here from the start

Brett, 2026-09-18: "All of these improvements that we're making for the Deborah Rose Real Estate website, make sure to pass that information along to the Candace Thompson build, because I don't want to see that one make the same mistakes." In order of how much it mattered.

1. **Section headers stack on top. Never beside.** Eyebrow, heading and intro paragraph go on top, left aligned, on the narrow measure. The content, table, list or cards go below, spanning full width. Brett rejected the header-in-one-column, content-in-the-other split twice before it became a rule. `FeatureSplit`, `GoogleProfile`, the About credentials, the area page and the contact page were all restructured to this before the first review.
2. **Video heroes are full bleed with a directional dark overlay and white type.** Cinematic and luxury. The scrim is a directional gradient (`.hero-scrim-y` and `.hero-scrim-x`), densest where the type sits, open elsewhere; never a flat black at fifty percent, which is exactly what reads as a template. The footage is graded (slight desaturation, a small lift in the blacks) and the poster is a frame of the graded output under the same overlay, so nothing flashes when the video takes over. Slow footage only. Never the video in a side column beside text. Contrast is measured against the brightest frame of the loop, not the first: white needs 4.5:1 on the paragraph and 3:1 on the headline, and if it fails the overlay deepens; the video never shrinks and the treatment is never abandoned.
3. **The homepage hero fills the screen; interior heroes share one aspect ratio.** Home is `100dvh` with a `100vh` fallback, the header transparent over the footage until the page scrolls. Buyers, sellers, stories and areas use `InteriorHero`: CSS `aspect-ratio` 16 by 9 from the tablet breakpoint up and 4 by 5 below it, so all four are identical at any width with no per-page value to drift. If a headline overflows, shorten the headline; do not grow the band. About has the same header structure with no video.
4. **Never upscale an image. Read the natural dimensions first.** Her headshot is 1200 by 1600 and is never rendered wider than that; story photos are 1600 wide and never rendered wider. Check the file before sizing any panel.
5. **No giant photo panels of the agent.** A small circular portrait, 96 to 128 pixels, beside or above the H1. It reads as intentional and stays sharp.
6. **Primary buttons use the brand accent, never black.** Here the pink from her logo, adjusted once for contrast (below). Verify 4.5:1 with white and keep the focus ring visible.
7. **Tables and lists: full width, asymmetric columns, hairlines.** `FactList` is two fifths label to three fifths value with hairline rules between rows. Never a fifty-fifty split and never boxes or cards.
8. **A rule that was withdrawn; do not reapply it.** The Deborah build was once told never to float text over moving footage. Brett overruled it: the technique is fine, bad execution (dark text on untreated bright footage) was the problem. A dark directional overlay with white type is a legitimate luxury treatment.

## Decisions from the 2026-09-18 review call with Brett and Candace

- **The hero fits one laptop screen.** Eyebrow, headline, paragraph and both actions are visible at 1440 by 780 with browser chrome (verified down to 1150 by 580). The header is 3.5rem on phones and 4rem from the small breakpoint up. The round portrait is never at the top of the hero; it sits beside the call to action with "Candace L. Thompson, MBA" under it. Brett: "I don't like that photo being in a little circle right there at the top, that looks weird." If something new needs room in the hero, take it from padding, never from the fold.
- **Her real mark is in the header.** The skyline, palmetto and crescent cropped from her own logo, beside the type wordmark. The full lockup is in the footer and on the About page. Do not replace the mark with a drawn icon.
- **Contact is a pop-up and a page.** The header Contact button, the hero button and every closing ask open `ContactModal`, which blurs the page behind it (modeled on createchurchmedia.com). `/contact/` stays as the canonical, indexable page with the same `ContactForm` inline, because a modal has no URL and cannot be indexed, cited by an answer engine or linked from her Google Business Profile. One form, two doors. Never delete the page.
- **No booking calendar, anywhere.** Candace's Calendly is not synced to her real calendar and she does not want to be booked when she is not free. The form captures details so she reaches out herself, and every form and quiz ends with the call-or-text line beside the submit button. Do not add a scheduler, an embed, or a "book a call" control.
- **The form is mostly taps, one open box, with progressive disclosure.** Buying, selling or both; sellers see address, bedrooms, bathrooms and an improvements note framed as their market snapshot; buyers see financing (including "Started the process"), location and a price band; then a timeline and one optional "anything else" box. A buyer never sees the seller fields.
- **The IQ quiz is a lead capture instrument.** Six scenarios per path, every one from her own case studies with the explanation in her voice, a result tier where nobody fails, then contact capture that posts the score and every answer to the same `/api/contact/` as the form. Modeled on yournextstepteam.com and buddybuck.com, both read from their source. No school is rated in any question.

## The pink, exactly

The crescent in her logo samples at #ff04f8. White type on it measures 3.17:1. Brett, 2026-09-18: "just do a slight adjustment on her pink color to the point where we can get it a 4.5 to one ratio." The hue is held and the lightness lowered until white clears with a small margin: **#d103cc, 4.57:1 with white**; hover **#ad02a9, 6.20:1**. There is one pink on the site. Do not reintroduce the raw logo value outside the logo artwork, and do not "refine" the pink toward a different hue.

## Her media

Every photograph and every frame of video on this site is hers, from the CLT Realty Group Digital Assets Drive. Nothing is borrowed from another client's site and nothing is stock. The hero loop is cut from her own listing film "1215 Autumn Cove, Cinematic.mp4" using only the caption-free, slow shots. If a future asset gap appears, the page says less; it never borrows.

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
- Deploy is push to `main`; Vercel builds. Nothing else. Project `clt-realty-group` on the Brett K Moore Pro team (created 2026-09-18 through the dashboard import; the API token cannot create projects). Preview at https://clt-realty-group-best-known-brand.vercel.app, public (Vercel Authentication switched off 2026-09-18 at Brett's request) and hidden from search by the noindex header until the custom domain is attached.
