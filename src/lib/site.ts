/**
 * ===================================================================
 *  EVERY NAMEABLE FACT ABOUT THE BUSINESS, IN ONE FILE.
 * ===================================================================
 *
 * Metadata, the footer, the contact page, the Google Business Profile
 * block and every JSON-LD node read from here. Nothing else in the repo
 * types a phone number, an email, a license number or a city name.
 *
 * SOURCES, so a future session knows what is verified and what is not:
 *
 *   Google Business Profile, read 2026-09-18 via Outscraper:
 *     name "Candace L Thompson, CLT Realty Group at Keller Williams",
 *     category Real estate agent, service-area business with no street
 *     address shown, phone +1 704-778-0779, open 8 a.m. to 7 p.m. every
 *     day, verified, 5.0 from 32 reviews, place ID and CID below.
 *   candacelthompson.kw.com, read live in Chrome 2026-09-18:
 *     "Candace Thompson", License #: 72014-SC; 259158-NC, email
 *     candacethompsonrealtor@gmail.com, KW Connected, 901 Dave Gibson
 *     Blvd., Fort Mill, SC 29708.
 *   Her own logo (02_Brand_Assets/Logos): "CLT Realty Group /
 *     Candace L. Thompson, MBA". The MBA is hers; the transcripts say
 *     the undergraduate degree is from the University of South Carolina
 *     and the master's was completed online (2026-09-03 session).
 *   Meeting transcripts, 2026-08-18 to 2026-09-09: born and raised in
 *     Rock Hill, lives in Rock Hill, office in Fort Mill, sells the
 *     Charlotte market and the surrounding South Carolina towns. Member
 *     of Alpha Kappa Alpha Sorority, Incorporated, Omega Tau Omega
 *     chapter, Fort Mill. Now full time in real estate after years of
 *     doing it alongside another job.
 *   PAD vault, People/Candace-Thompson.md: market center main line
 *     (803) 835-2300; the 901 Dave Gibson address is the market
 *     center's, not hers.
 *
 * OPEN, in docs/open-items: the year she was first licensed, whether
 * "CLT Realty Group" is a registered team or assumed name in either
 * state, both license numbers read back by Candace, a mailing address
 * of her own, and the exact wording KW Connected wants in the footer.
 */

export const siteUrl = 'https://cltrealtygroup.net'

/**
 * Review build. While true, robots.txt turns crawlers away and every
 * page carries noindex. Flip to false at launch and nothing else changes.
 */
export const HIDE_FROM_SEARCH_ENGINES = true

export const business = {
  name: 'CLT Realty Group',
  /** The name on her Google Business Profile, verbatim. */
  gbpName: 'Candace L Thompson, CLT Realty Group at Keller Williams',
  legalNote: 'CLT Realty Group, Candace L. Thompson at Keller Williams Connected',
  brokerage: {
    /** The market center DBA. The franchise company is Keller Williams Realty, LLC. */
    name: 'Keller Williams Connected',
    franchisor: 'Keller Williams Realty, LLC',
    url: 'https://www.kw.com',
    address: '901 Dave Gibson Blvd., Fort Mill, SC 29708',
    street: '901 Dave Gibson Blvd.',
    city: 'Fort Mill',
    state: 'SC',
    zip: '29708',
    phone: '(803) 835-2300',
    phoneE164: '+18038352300',
  },
  phone: '(704) 778-0779',
  phoneE164: '+17047780779',
  email: 'candacethompsonrealtor@gmail.com',
  /**
   * Both license numbers, exactly as her Keller Williams page prints
   * them on 2026-09-18. Neither has been read back to her yet.
   */
  licenses: [
    { state: 'South Carolina', abbr: 'SC', number: '72014', commission: 'South Carolina Real Estate Commission', url: 'https://llr.sc.gov/re/' },
    { state: 'North Carolina', abbr: 'NC', number: '259158', commission: 'North Carolina Real Estate Commission', url: 'https://www.ncrec.gov/' },
  ],
  /**
   * A mailing address of her own for the footer. Null until Candace
   * supplies one. The market center address is the brokerage's and is
   * shown as such; it is never presented as hers.
   */
  mailingAddress: null as string | null,
  description:
    'Candace L. Thompson, MBA, helps buyers and sellers in Rock Hill, Fort Mill, York and the rest of York County, across the line in Charlotte, and in Waxhaw, Matthews, Pineville and Monroe. A Rock Hill native, licensed in both Carolinas, with Keller Williams Connected in Fort Mill.',
} as const

/**
 * Production, read live from her Zillow profile on 2026-09-18
 * (zillow.com/profile/Candace%20Thompson). Set as type, never as a card.
 * No career dollar volume is published: multiplying the total by the
 * average would invent a figure, and the average is drawn from a recent
 * subset. Candace supplies a career volume if she wants one shown.
 */
export const production = {
  totalSales: 304,
  salesLast12Months: 17,
  yearsExperience: 19,
  priceRange: '$60,000 to $625,000',
  averagePrice: '$355,000',
  zillowRating: { value: '5.0', count: 19, readOn: '2026-09-18' },
  specialties: ["Buyer's agent", 'Listing agent', 'Relocation', 'Foreclosure', 'New construction'],
  /**
   * CAREER SALES VOLUME. Null until Candace supplies the figure by email
   * (Brett, 2026-09-18). Set it as a display string, for example
   * '$95 million', with the date and source in this comment, and the
   * record section shows it. Never compute or estimate it.
   */
  careerVolume: null as string | null,
} as const

export const agent = {
  name: 'Candace L. Thompson',
  displayName: 'Candace L. Thompson, MBA',
  firstName: 'Candace',
  givenName: 'Candace',
  familyName: 'Thompson',
  jobTitle: 'REALTOR®, CLT Realty Group at Keller Williams Connected',
  /**
   * Two professional headshots are in her Drive. Brett, 2026-09-18: the
   * pink blazer portrait on the site "is not the one they want," so the
   * outdoor pink cardigan portrait (3000 by 4200 source, "My picture.jpg")
   * is shown until they choose. The other is kept at
   * /about/candace-l-thompson.webp. Swap the three lines below to change.
   */
  headshot: '/about/candace-l-thompson-cardigan.webp',
  headshotWidth: 1200,
  headshotHeight: 1680,
  headshotAlt: 'Candace L. Thompson, real estate agent for Rock Hill, Fort Mill and Charlotte, in a pink cardigan outdoors',
  degrees: ['MBA'],
  /** From her Zillow bio, read 2026-09-18. */
  mba: 'Bellevue University',
  alumniOf: 'University of South Carolina',
  memberships: ['Alpha Kappa Alpha Sorority, Incorporated, Omega Tau Omega chapter, Fort Mill, South Carolina'],
} as const

/** Google Business Profile. Everything here was read from the live profile on 2026-09-18. */
export const gbp = {
  placeId: 'ChIJ2yArHRKFVogRzrvo7xNEYZ4',
  cid: '0x885685121d2b20db:0x9e614413efe8bbce',
  mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ2yArHRKFVogRzrvo7xNEYZ4',
  reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ2yArHRKFVogRzrvo7xNEYZ4',
  reviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJ2yArHRKFVogRzrvo7xNEYZ4',
  geo: { latitude: 35.0418224, longitude: -80.9870123 },
  /**
   * Read from the profile on 2026-09-18, set as type on the page and
   * never as review markup. Update the two numbers and the date together
   * or not at all.
   */
  rating: { value: '5.0', count: 32, readOn: '2026-09-18' },
  hours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      label: 'Every day',
      opens: '08:00',
      closes: '19:00',
      display: '8 a.m. to 7 p.m.',
    },
  ],
} as const

/**
 * Her public profiles. The YouTube channel is titled "Candace L.
 * Thompson, Realtor" at the handle @CLTRealtyGroup (read 2026-09-18);
 * the newer LiveMove Charlotte handle from the 2026-09-04 session is not
 * yet confirmed live and is not listed. LinkedIn and Instagram are linked
 * from her Keller Williams page but the exact URLs were not readable
 * there; they are null until confirmed.
 */
export const profiles = {
  kw: 'https://candacelthompson.kw.com/',
  facebook: 'https://www.facebook.com/CLTRealtyGroup',
  youtube: 'https://www.youtube.com/@CLTRealtyGroup',
  zillow: 'https://www.zillow.com/profile/Candace%20Thompson',
  linkedin: null as string | null,
  instagram: null as string | null,
  googleMaps: gbp.mapsUrl,
} as const

/**
 * Her line. Chosen with Brett on 2026-08-28 as the homepage headline;
 * demoted on 2026-09-18 (Brett: a good quote for Candace, not the tagline
 * for the business). It appears as her own words, attributed, on the
 * homepage About band and the About page.
 */
export const tagline = 'Your home should be your sanctuary.'

export type Area = {
  slug: string
  name: string
  county: string
  state: 'NC' | 'SC'
  stateName: 'North Carolina' | 'South Carolina'
  zip: string[]
  /** Miles and minutes from the Fort Mill office, from a live drive on the research date. */
  fromOffice?: string
}

/**
 * The service area, in the order her business actually falls. Rock Hill
 * is her densest market (seven of the eleven case studies, "21 closed
 * transactions and counting" in her own neighborhood guide), Fort Mill is
 * the office and the Google Business Profile pin, Charlotte is the
 * market she names first, York is her second busiest town. Then the rest
 * of York County, Indian Land, and the North Carolina towns south and
 * east of Charlotte. Each has a page at /areas/<slug>/. Gastonia and
 * Mooresville have stories but no page yet.
 */
export const areas: Area[] = [
  { slug: 'rock-hill', name: 'Rock Hill', county: 'York County', state: 'SC', stateName: 'South Carolina', zip: ['29730', '29732'], fromOffice: '12 miles, about 19 minutes' },
  { slug: 'fort-mill', name: 'Fort Mill', county: 'York County', state: 'SC', stateName: 'South Carolina', zip: ['29708', '29715'], fromOffice: 'Home base' },
  { slug: 'charlotte', name: 'Charlotte', county: 'Mecklenburg County', state: 'NC', stateName: 'North Carolina', zip: ['28273', '28214', '28216', '28262'], fromOffice: '19 miles, about 28 minutes to Uptown' },
  { slug: 'york', name: 'York', county: 'York County', state: 'SC', stateName: 'South Carolina', zip: ['29745'], fromOffice: '21 miles, about 36 minutes' },
  { slug: 'tega-cay', name: 'Tega Cay', county: 'York County', state: 'SC', stateName: 'South Carolina', zip: ['29708'], fromOffice: '5 miles, about 12 minutes' },
  { slug: 'lake-wylie', name: 'Lake Wylie', county: 'York County', state: 'SC', stateName: 'South Carolina', zip: ['29710'], fromOffice: '7 miles, about 21 minutes' },
  { slug: 'clover', name: 'Clover', county: 'York County', state: 'SC', stateName: 'South Carolina', zip: ['29710'], fromOffice: '19 miles, about 45 minutes' },
  { slug: 'indian-land', name: 'Indian Land', county: 'Lancaster County', state: 'SC', stateName: 'South Carolina', zip: ['29707', '29720'], fromOffice: '9 miles, about 21 minutes' },
  { slug: 'waxhaw', name: 'Waxhaw', county: 'Union County', state: 'NC', stateName: 'North Carolina', zip: ['28173'], fromOffice: '19 miles, about 40 minutes' },
  { slug: 'matthews', name: 'Matthews', county: 'Mecklenburg County', state: 'NC', stateName: 'North Carolina', zip: ['28104', '28105'], fromOffice: '25 miles, about 32 minutes' },
  { slug: 'pineville', name: 'Pineville', county: 'Mecklenburg County', state: 'NC', stateName: 'North Carolina', zip: ['28134'], fromOffice: '9 miles, about 20 minutes' },
  { slug: 'monroe', name: 'Monroe', county: 'Union County', state: 'NC', stateName: 'North Carolina', zip: ['28110', '28112'], fromOffice: '28 miles, about 55 minutes' },
]

export const areaNames = areas.map((a) => a.name)
export const areaSentence =
  'Rock Hill, Fort Mill, Charlotte, York, Tega Cay, Lake Wylie, Clover, Indian Land, Waxhaw, Matthews, Pineville and Monroe'
export const areaShort = 'Rock Hill, Fort Mill, Charlotte and the Carolina towns around them'

export const nav = {
  header: [
    { title: 'Buyers', href: '/buyers/' },
    { title: 'Sellers', href: '/sellers/' },
    { title: 'Stories', href: '/stories/' },
    { title: 'Areas', href: '/areas/' },
    { title: 'About', href: '/about/' },
  ],
  action: { title: 'Contact', href: '/contact/' },
} as const

/**
 * The footer's compliance copy.
 *
 * South Carolina, S.C. Code 40-57-135(E): every advertisement identifies
 * the full name of the brokerage firm; on the internet a link to the
 * firm's homepage satisfies it. North Carolina, 21 NCAC 58A .0105: an
 * advertisement carries the name of the firm the broker is affiliated
 * with, and 58A .0103(c) requires an assumed name to be registered
 * before advertising under it. Neither state requires the license number
 * in an advertisement; both are shown anyway because the number is what
 * lets a consumer look her up.
 *
 * Keller Williams Identity and Style Guide 07.18, section 3.1: a website
 * must carry the market center DBA logo, the ownership statement (may be
 * placed in the footer) and local board and commission compliance. The
 * ownership statement wording is the one on kwri.kw.com on 2026-09-18.
 * Read from a mirror of the guide; KW Connected should confirm against
 * the current guide on KWConnect before launch.
 */
export const legal = {
  teamSentence: 'CLT Realty Group is Candace L. Thompson at Keller Williams Connected.',
  ownership: 'Each Keller Williams® office is independently owned and operated.',
  franchisorSentence:
    'Keller Williams Realty, LLC, a franchise company, is an Equal Opportunity Employer and supports the Fair Housing Act.',
  realtorMark:
    'REALTOR® is a registered collective membership mark that identifies real estate professionals who are members of the National Association of REALTORS® and subscribe to its Code of Ethics.',
  serviceAreaSentence:
    'Serving Rock Hill, Fort Mill, York, Tega Cay, Lake Wylie, Clover and Indian Land in South Carolina, and Charlotte, Waxhaw, Matthews, Pineville and Monroe in North Carolina.',
  /**
   * The two consumer disclosures each state requires at first
   * substantial contact. Linked from the footer so a visitor can read
   * them before the first call. The North Carolina form is Working With
   * Real Estate Agents; the South Carolina form is the Disclosure of Real
   * Estate Brokerage Relationships. Each links to the regulator's site
   * because the exact PDF locations move; docs/open-items asks Candace to
   * supply her own copies.
   */
  ncDisclosure: { label: 'North Carolina: Working With Real Estate Agents', url: 'https://www.ncrec.gov/' },
  scDisclosure: { label: 'South Carolina: Disclosure of Real Estate Brokerage Relationships', url: 'https://llr.sc.gov/re/' },
}
