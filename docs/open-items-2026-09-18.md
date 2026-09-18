# Open items for the review pass with Candace

## Media, first

**Every photograph and every frame of video on the site is Candace's own.** Nothing was borrowed from the Deborah Rose build or from stock. What was found in her Drive on 2026-09-18 and used:

- **Hero video.** `1215 Autumn Cove, Cinematic.mp4` (204 MB, 85 seconds, 1080p, a Monroe listing film with her on camera and burned-in captions through parts of it). Cut to the caption-free, slow shots only (exterior push, front close, living room, kitchen, back field, closing aerials), graded once, audio stripped, and delivered as 1080p and 720p H.264 (the VP9 WebM came out larger than the H.264 and was dropped), with a poster frame taken from the graded output. Final sizes are in the build report and in `public/hero/`. Nothing else in `04_Video` (both subfolders are empty).
- **Headshot.** `candace-thompson-headshot-01.jpg`, 1200 by 1600, used at 96 and 128 pixels as a circle and in the schema. `My picture.jpg` (3000 by 4200) is also in the Headshots folder and was not used.
- **Logo.** `clt-realty-logo-primary.png`, 1422 by 1023, in the footer at 240 pixels.
- **Story photos.** Seven hero photos from her listing folders in `01_Listings`.

**What she still owes:**

- Photos for four stories with no listing folder: the Mooresville duplex, the Rock Hill new construction build, the Rock Hill single level townhome, the Waxhaw purchase.
- Calmer footage if she wants a different hero. The Autumn Cove film is the only video in the Drive.
- **The gold question.** The brand assets log says the logo PNG was rasterized from a vector named `all gold.eps` on her desktop. There is no gold anywhere in the rendered logo (it is blue, magenta and slate, sampled pixel by pixel). Either the source file is misnamed or a separate gold variant exists on her desktop that nobody has looked at. No `.eps`, `.ai`, `.svg` or anything named gold is in the Drive. Brett should know before the site locks to magenta and blue.
- The `00_Master_Tracker` sheet (exported 2026-09-18) lists more listing folders with hero photos chosen (Autumn Cove Monroe, Gants Road York, Dauphine Drive Charlotte, Wharton Lane Columbia, Dillon Way Fort Mill, Water Oak Pineville, Island View Lancaster and others). None of those transactions has a case study yet, so none is on the site. The tracker also confirms 767 Gants Rd is York, not Clover, and that `03_Events_Marketing` and `06_Unsorted_NeedsReview` are empty.


Written after the first build on 2026-09-18. What the site currently says, where it came from, and what needs an answer before launch. Numbered so a call can walk it top to bottom. Nothing here was invented; where a fact is unknown the site says less rather than guessing.

## Settled in this build

- **Name: Candace, with an a.** Her email, her logo ("Candace L. Thompson, MBA"), her Keller Williams page and all seven transcripts agree. Brett's brief said "Candice"; the Drive folder `Brett K Moore/Clients/Candice` is empty and misspelled. Built as Candace L. Thompson. **Brett confirms before launch.**
- Brokerage: Keller Williams Connected, 901 Dave Gibson Blvd., Fort Mill, SC 29708, office (803) 835-2300. From her Keller Williams page, read live in Chrome on 2026-09-18, and the PAD vault.
- Phone (704) 778-0779 and email candacethompsonrealtor@gmail.com, confirmed on her Google Business Profile and her Keller Williams page.
- Google Business Profile located and wired in: "Candace L Thompson, CLT Realty Group at Keller Williams", verified, service-area business with no address, open 8 a.m. to 7 p.m. every day, 5.0 from 32 reviews, coordinates in Fort Mill. Place ID in `src/lib/site.ts`.
- Positioning: comfort and sanctuary, from the 2026-08-28 archetype session. Homepage headline is "Your home should be your sanctuary," her own line, chosen that day.
- Palette: 60 percent white, 30 percent blue, 10 percent pink, agreed 2026-08-28. Blue and pink sampled from her logo. Fonts are Fraunces and DM Sans; Deborah's site uses Playfair and Geist, so nothing is shared.
- Eleven stories, one per case study in Drive, rewritten in her voice without em dashes, client names or addresses. Seven have a hero photo from her listing folders; four have none (below).
- Twelve area pages from the neighborhood guides in Drive, with the school ratings and "who buys here" profiles removed for fair housing.
- Three real Google reviews quoted on the homepage, verbatim, attributed as signed.
- Footer built to the Keller Williams Identity and Style Guide section 3.1 (market center logo, ownership statement, local compliance) plus both state disclosures, both license numbers and Equal Housing.

## Articles: the count, and the deals with none

**Eleven articles exist and eleven are published.** Every folder in the Drive was swept on 2026-09-18 for anything article-shaped: Case_Studies (11 files), Neighborhood_Research (12 town guides, used for the area pages, plus civic photo folders), 06_Unsorted_NeedsReview (empty), 03_Events_Marketing (empty), 04_Video (both subfolders empty), 07_Client_Dossiers (11, one per case study, none without an article), the Master Tracker, and the `Best Known Brand/Clients/Candace Thompson` folder on Brett's own Drive (empty). The twelve neighborhood guides are research drafts, not articles in her voice, so they are area pages rather than blog posts.

**Deals in the tracker with no article.** Every listing row in `00_Master_Tracker` that has no case study, 46 addresses. This is the list for her call. Each has a Facebook photo album and most have a Drive folder with heroes already chosen, so an article on any of them is a conversation with her and nothing else.

- 1215 Autumn Cv, Monroe, NC
- 1202 Midwood Dr, Monroe, NC
- 767 Gants Rd, York, SC
- 9824 Dauphine Dr, Charlotte, NC
- 108 Wharton Ln, Columbia, SC
- 706 Dillon Way, Fort Mill, SC
- 130 Water Oak Dr, Pineville, NC
- 11228 Island View Ln, Lancaster, SC
- 10920 Walking Path, Charlotte, NC
- 9704 Cayenne Dr, Charlotte, NC
- 6828 Trimbach Way, Charlotte, NC
- 1645 Riverside Rd, Lancaster, SC
- 911 Balsam Terrace, Charlotte, NC
- 14542 Greenpoint Ln, Huntersville, NC
- 432 Summit St, Rock Hill, SC
- 4107 Sunset Ridge, Rock Hill, SC
- 1399 Edgefield, York, SC
- 3637 Warp St, Charlotte, NC
- 4024 Whittier Ln, Tega Cay, SC
- 4007 Mt Gallant Rd, Rock Hill, SC
- 723 Carolina Ave, Rock Hill, SC
- 1121 Capps Hollow, Charlotte, NC
- 119 Foote St, Chester, SC
- 11807 Broadwater, Charlotte, NC
- 5915 Fenway Dr, Charlotte, NC
- 553 Sansberry, York, SC
- 1816 Azalea Ave, Kannapolis, NC
- 838 Coach House Ct, Rock Hill, SC
- 4335 Bridge Pointe, Harrisburg, NC
- 132 Reid St, Rock Hill, SC
- 118 Waterlynn Club Dr, Mooresville, NC
- 2225 Century Oaks, Charlotte, NC
- 5224 Deerton, Charlotte, NC
- 820 Chestnut St, Rock Hill, SC
- 846 Jefferson Ave, Rock Hill, SC
- 124 Reid St, Rock Hill, SC
- 9112 Korniv Dr, Charlotte, NC
- 118 Jason Ct, Fort Mill, SC
- 130 Reid St, 
- 843 S Stonewall Ave, Rock Hill, SC
- 415 Presidio Dr, Rock Hill, SC
- 12724 Persimmon Tree, Charlotte, NC
- 810 Rutledge, Catawba, SC
- 124 Morning Dew, Mount Holly, NC
- 5931 Versage, Mint Hill, NC
- 141 Niven Rd, Lancaster, SC

**Three articles have no photo folder at all** (buyer-side purchases, so she never photographed them): 120 Fosters Glen Place, Mooresville, NC (article written, no photo folder); 548 Cambria St, Rock Hill, SC (article written, no photo folder); 6017 Lowergate Dr, Waxhaw, NC (article written, no photo folder).

**Four articles carry a fallback hero** from another of her listings, captioned as such on the page and named truthfully in the alt text: the Rock Hill new construction build (shows 4107 Sunset Ridge, Rock Hill), the Rock Hill single level townhome (shows 432 Summit St, Rock Hill), the Waxhaw purchase (shows 1215 Autumn Cove, Monroe, the same county), and the Mooresville duplex (shows 14542 Greenpoint Ln, Huntersville, the next town south). Each is replaced the day she supplies a photo of the actual property.

## Facts for Candace to confirm

1. **Both license numbers.** SC 72014 and NC 259158 are printed on her Keller Williams page. Neither regulator's lookup could be fetched to corroborate (ncrec.gov returns 403 to automated requests; the SC lookup loops). Read both back to her.
2. **The year she was first licensed.** Not in any source. One review says she has been a client's agent for ten years; another says she sold them a home in 2019; another met her eight years ago. The site says "years" and gives no number until she does.
3. **Whether CLT Realty Group is registered anywhere.** North Carolina rule 58A .0103(c) requires an assumed name to be filed and reported to the commission before advertising under it. South Carolina defines a "team" as two or more licensees; she is one person. The site presents CLT Realty Group as her personal brand at Keller Williams Connected. She should confirm with her broker-in-charge how the name is registered in each state and whether the footer sentence is the one they want.
4. **The Keller Williams Connected DBA logo.** The style guide requires the market center's own DBA logo, which is hosted on KWConnect behind a login. The footer currently shows the generic KW mark with "Keller Williams Connected" set as type beside it. She should pull the DBA logo from KWConnect and it replaces `public/brand/keller-williams.webp`.
5. **The three quoted reviewers.** Zachary Thomas, Didi Aboyeji and Reba Jones. Public reviews, but she should be comfortable with those three names on her homepage. Any can be swapped from the 32 on the profile.
6. **The MBA.** On her logo and confirmed in the 2026-09-03 session (undergraduate at the University of South Carolina, master's online). The site does not name the MBA institution. She can add it.
7. **Alpha Kappa Alpha.** The About page names the sorority and the Omega Tau Omega graduate chapter in Fort Mill, from the 2026-09-03 session, and describes the chapter's national targets in her words. She should confirm she wants the chapter named on a business site and that the wording respects the sorority's own rules on members' commercial use of the name.
8. **The Blooms and Brunch event** is mentioned on the homepage and About page because two Google reviews describe it. Confirm it is something she wants associated with the business.
9. **The numbers in each story.** All from her case studies. Two need her eye: the Charlotte townhome story says it closed in August 2026 (the 2026-08-28 transcript says "early August"); the Waxhaw story has no year at all, so the closing date is left off.
10. **Service area.** Twelve towns with pages: Charlotte, Rock Hill, Fort Mill, Tega Cay, Lake Wylie, York, Clover, Indian Land, Waxhaw, Matthews, Pineville, Monroe. Gastonia and Mooresville have stories but no page. She also named Lancaster, Concord, Cornelius, Huntersville, Harrisburg, Columbia and Blythewood in the 2026-08-19 session; none has a page. The Google profile's service area should list the same towns the site does.
11. **Median prices and drive times on the area pages** are quoted as "in the September 2026 research" and come from the neighborhood guides. They will go stale. Decide whether to keep them dated or remove the numbers.
12. **LinkedIn and Instagram.** Both are linked from her Keller Williams page but the URLs were not readable. They are null in `src/lib/site.ts` and absent from the footer and schema until supplied.
13. **YouTube.** The channel is "Candace L. Thompson, Realtor" at @CLTRealtyGroup as of 2026-09-18. The 2026-09-04 session moved her to "LiveMove Charlotte" as a handle and a second site. If the channel handle changes, update `profiles.youtube`.

## Assets still needed

14. **Real photos for the four fallback heroes.** See the articles section above. The Mooresville duplex, the Rock Hill new construction build, the Rock Hill single level townhome and the Waxhaw purchase.
15. **The hero photo choices.** For the two sensitive stories (the divorce and the loss) an interior was chosen over the exterior and the filename carries no address. For the other five the filename carries the address per Brett's rule and the alt text does not. Two minutes on `/stories/` confirms she is comfortable with each.
16. **The vector logo.** `all gold.eps` is on her desktop. The site uses the 1422 by 1023 PNG rasterized from it, displayed at 240 pixels, so it is sharp. The vector is wanted for a favicon and print. The current favicon is a drawn crescent on blue.
17. **The listing video.** `1215 Autumn Cove, Cinematic.mp4` (214 MB, a Monroe listing) sits in the Drive root. It could become a hero video the way Deborah's site has one, cut to forty seconds with the address card removed. Not used yet.
18. **Additional headshots.** Three files on her desktop failed to transfer per the brand assets log. "My picture.jpg" (3000 by 4200) did land in Drive and was not inspected for this build.

## From the 2026-09-18 review call, built

- Hero fits one laptop screen; portrait beside the call to action with her name under it; her real mark in the header.
- Contact is a blurred pop-up from every Contact control, and /contact/ stays as the indexable page with the same form.
- The form: first and last name, email, phone; buying, selling or both; sellers get address, bedrooms, bathrooms and an improvements note framed as their market snapshot; buyers get financing, location and price band; a timeline; one optional open box. No calendar.
- Real Estate IQ Quiz at /quiz/, six scenarios per path from her case studies, result tier, contact capture at the end into the same webhook. Linked from the homepage and the footer.
- **Two calls to action, as built:** primary "Talk with Candace" opens the form (information capture); secondary "Or call or text (704) 778-0779" as a plain link beside it. Alternatives worth Brett's eye: "Get my market snapshot" for sellers and "Tell me what you're looking for" for buyers as page-specific primaries.
- **Still to decide:** whether the quiz belongs in the header nav (currently the homepage section and the footer link it), and the wording of the primary button.

## From the second review call, 2026-09-18, built

- **Below the fold is proof now.** 304 homes sold, 17 in the last twelve months, 19 years, 5.0 from 19 on Zillow and 5.0 from 32 on Google, the five specialties, both licenses, MBA from Bellevue University and BS from the University of South Carolina. All read live from her Zillow profile on 2026-09-18 and set as type. **Career sales volume is not published**: multiplying 304 by the $355,000 average would invent a figure. Candace supplies a career volume if she wants one shown. Awards: none found on Zillow, Google or her Keller Williams page; she supplies any she wants listed.
- **The blue is an accent only.** Every blue background band is gone; article and quiz headers are near-black.
- **Copy cut as asked:** "the payment has to let you sleep," "What it is like to have me on your side," the three "how I work" items, "nobody is judging you," "I am" for "I'm," and Keller Williams Connected out of the hero sentence. "Your home should be your sanctuary" stays as her quote on the About band and About page, no longer the headline.
- **The MBA as a capability.** Hero headline: "A real estate agent who thinks like an analyst." The paragraph says what the degree changed rather than that she has it. Brett and Candace should read that sentence and push back on the word "analyst" if it is not her.
- **Headshot.** Two professional portraits exist in the Drive: the pink blazer studio portrait (1200 by 1600, previously on the site) and the pink cardigan outdoor portrait (3000 by 4200, "My picture.jpg", now on the site). Brett said the blazer was not the one they want; the cardigan is the only other. Both are in `public/about/`; one line in `src/lib/site.ts` swaps them. The tracker lists Facebook albums "Profile pictures" and "Business Pic" that were never ingested; if the one they want is there, it needs to be uploaded to the Drive.
- **Zillow reviews.** The rating and count are on the site. The nineteen review texts could not be read from Zillow in this session (the reviews tab loads nothing readable to automation); the three quotes on the homepage remain from Google. Candace confirms which quotes she wants used, from either profile.

## Where the leads go. Decide this before anyone shares the link widely.

Four native forms now exist (pop-up and contact page, buyer questionnaire on /buyers/, seller questionnaire on /sellers/, the IQ quiz). All of them post to one handler with the destination behind one Vercel environment variable, `LEAD_DESTINATION`. **As shipped, nothing is configured**, so every form tells the visitor plainly that it is not connected and gives the phone number and email. No lead is silently dropped, and none is delivered either.

What each option takes:

1. **GoHighLevel inbound webhook (recommended, zero code).** In her sub-account: Automations, create a workflow, trigger "Inbound Webhook", copy the URL. On Vercel set `CONTACT_WEBHOOK_URL` to it (and optionally `LEAD_DESTINATION=ghl-webhook`). The workflow maps the fields to a contact and can text her. Ten minutes for Brett.
2. **GoHighLevel API.** A Private Integration token for her sub-account with contacts write scope, plus its location ID, as `GHL_TOKEN` and `GHL_LOCATION_ID`, with `LEAD_DESTINATION=ghl-api`. The handler upserts the contact and adds every answer as a note. The agency token in `~/.secrets/bnb.env` was tried on 2026-09-18 and is rejected as invalid, so this needs a fresh token.
3. **Email fallback.** A Resend API key with a verified sending domain, `LEAD_TO=candacethompsonrealtor@gmail.com`, `LEAD_DESTINATION=email`. Nothing on hand today supports sending email without a key.

## Decisions to raise

- **The pink.** The logo crescent is #ff04f8; white on it is 3.17:1. Per Brett's instruction the hue was held and the lightness lowered to #d103cc, 4.57:1 with white (hover #ad02a9, 6.20:1). It is visibly slightly less electric than the logo. Brett can push back if he wants the raw value somewhere other than the logo artwork.
- **The header over the homepage video** is transparent until the page scrolls, then white. A white bar above a full-screen hero would mean the video does not fill the screen. Brett can ask for it opaque.
- **Interior heroes on phones.** 16 by 9 is 211 pixels tall at 375 wide and will not hold a headline and a paragraph, so below the tablet breakpoint the band is 4 by 5. From tablet up it is 16 by 9 on all four pages.
- **About has no video.** Brett left it open. It has the standard header structure with a 128 pixel circle portrait beside the H1. Easy to add the video band if he wants it.

19. **Em dashes.** Her case studies use them constantly. Brett's rule for every site is none, and this build follows it. The copy gate fails on any em dash.
20. **The Google rating on the page.** 5.0 from 32 is set as type with the read date, and never as markup. Deborah's site shows no rating because hers was 3.0 from 2. If Candace would rather not show a number at all, remove the two sentences in `GoogleProfile.tsx`.
21. **Fair housing.** The stories describe past clients' circumstances (a family that outgrew a townhome, a widow, a divorce, veterans, a family relocating for a child's college) as narrative. The neighborhood guides' school ratings and buyer profiles were deliberately left out. Local ordinances beyond the federal seven classes were not checked. A pass by Keller Williams Connected's compliance desk before launch is the right move.
22. **A second site.** The 2026-09-04 session agreed on a separate LiveMove Charlotte site. Nothing here builds toward it; the YouTube channel is linked from this one.

## Technical, before launch

23. **Preview link.** Vercel project `clt-realty-group` on the Brett K Moore (Pro) team, linked to `brettkmoore/clt-realty-group`, every push to `main` redeploys. Stable URL: https://clt-realty-group-best-known-brand.vercel.app. Vercel Authentication was switched off for this project on 2026-09-18 at Brett's request so Candace can open the link without a Vercel login. The link is public to anyone who has it and hidden from search by the noindex header and robots.txt, which stay on regardless.
24. **Repository.** Candace's own repo `candacelthompson/candace-thompson-realtor-website` exists (created 2026-08-26, one commit, a README only) and Brett has push access to it. Per the brief this build lives in `brettkmoore/clt-realty-group` (private). Her repo's Vercel project is set to auto-deploy `main`, so nothing was pushed there. At launch: push this code to her repo, or transfer this one to her account and re-point Vercel.
25. **Domain.** cltrealtygroup.net is hers at GoDaddy and currently redirects to candacelthompson.kw.com. Note that cltrealtygroup.com belongs to an unrelated Texas agent; do not use it.
26. **Search visibility.** `HIDE_FROM_SEARCH_ENGINES` is `true`. Flip it at launch. Every non-canonical host is also noindexed at the header.
27. **Contact form.** `CONTACT_WEBHOOK_URL` on Vercel, pointed at her GoHighLevel sub-account's inbound webhook (staged 2026-09-09). Until then the form tells the visitor it is not connected and shows the phone and email.
28. **Google Business Profile website field** is empty. At launch it becomes cltrealtygroup.net.
29. **State disclosure links.** The footer links the two commissions' home pages for the North Carolina Working With Real Estate Agents disclosure and the South Carolina Disclosure of Real Estate Brokerage Relationships. Her own PDFs of each, hosted on this domain, would be sturdier.
30. **Keller Williams footer wording.** The ownership statement is the one on kwri.kw.com on 2026-09-18. The Identity and Style Guide was read from a 2018 mirror; KW Connected should confirm against the current guide on KWConnect.

## Process notes

- Brett's brief was treated as the approved design and the Deborah Rose repo as the approved architecture. No brainstorming questions were asked because the session was non-interactive; the decisions above are the ones a reviewer would have been asked about.
- The seven transcripts were exported from Google Docs through Chrome and kept out of the repo. The case studies and dossiers stay in Drive.
