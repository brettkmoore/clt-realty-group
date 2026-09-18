import { agent, areas, business, gbp, profiles, siteUrl } from '@/lib/site'

export type SchemaNode = Record<string, unknown>

export const AGENT_ID = `${siteUrl}/#agent`
export const PERSON_ID = `${siteUrl}/about/#person`
export const HEADSHOT_ID = `${siteUrl}/about/#headshot`
export const WEBSITE_ID = `${siteUrl}/#website`
export const BROKERAGE_ID = `${siteUrl}/#brokerage`
export const FRANCHISOR_ID = `${siteUrl}/#keller-williams`

export function absolute(path: string) {
  return path.startsWith('http') ? path : `${siteUrl}${path}`
}

const stateName = { NC: 'North Carolina', SC: 'South Carolina' } as const

export function cityNode(name: string, county: string, state: 'NC' | 'SC') {
  return {
    '@type': 'City',
    name,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: `${county}, ${stateName[state]}`,
      containedInPlace: { '@type': 'State', name: stateName[state] },
    },
  }
}

export function placeNode(city: string, state: 'NC' | 'SC') {
  return {
    '@type': 'Place',
    name: `${city}, ${stateName[state]}`,
    address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: state, addressCountry: 'US' },
  }
}

export function openingHours() {
  return gbp.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }))
}

/** The market center, Keller Williams Connected, the firm she is licensed with. */
export function brokerageNode(): SchemaNode {
  return {
    '@type': ['RealEstateAgent', 'Organization'],
    '@id': BROKERAGE_ID,
    name: business.brokerage.name,
    url: business.brokerage.url,
    telephone: business.brokerage.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.brokerage.street,
      addressLocality: business.brokerage.city,
      addressRegion: business.brokerage.state,
      postalCode: business.brokerage.zip,
      addressCountry: 'US',
    },
    parentOrganization: { '@id': FRANCHISOR_ID },
  }
}

/** The franchise company. Each office is independently owned and operated. */
export function franchisorNode(): SchemaNode {
  return {
    '@type': 'Organization',
    '@id': FRANCHISOR_ID,
    name: business.brokerage.franchisor,
    url: business.brokerage.url,
  }
}

/**
 * The sitewide entity. One node typed as both RealEstateAgent and
 * LocalBusiness: the first says what the practice is, the second carries
 * hours, geo and the map in the form local search consumes. The Google
 * Business Profile is attached through hasMap and sameAs so the profile
 * and the site describe one business. No aggregateRating: Google treats
 * a rating a business publishes about itself as self-serving, and the
 * real one lives on the profile.
 */
export function agentNode(): SchemaNode {
  return {
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    '@id': AGENT_ID,
    name: business.name,
    alternateName: [business.gbpName, 'Candace L. Thompson, REALTOR'],
    url: siteUrl,
    telephone: business.phoneE164,
    email: business.email,
    image: { '@id': HEADSHOT_ID },
    logo: absolute('/brand/clt-realty-group-logo.png'),
    description: business.description,
    priceRange: '$$',
    areaServed: areas.map((a) => cityNode(a.name, a.county, a.state)),
    geo: { '@type': 'GeoCoordinates', latitude: gbp.geo.latitude, longitude: gbp.geo.longitude },
    hasMap: gbp.mapsUrl,
    openingHoursSpecification: openingHours(),
    founder: { '@id': PERSON_ID },
    employee: { '@id': PERSON_ID },
    parentOrganization: { '@id': BROKERAGE_ID },
    sameAs: [gbp.mapsUrl, profiles.kw, profiles.zillow, profiles.facebook, profiles.youtube].filter(Boolean),
    knowsLanguage: ['en-US'],
  }
}

export function personNode(): SchemaNode {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: agent.name,
    alternateName: agent.displayName,
    givenName: agent.givenName,
    familyName: agent.familyName,
    honorificSuffix: 'MBA',
    jobTitle: agent.jobTitle,
    image: { '@id': HEADSHOT_ID },
    url: `${siteUrl}/about/`,
    telephone: business.phoneE164,
    email: business.email,
    worksFor: { '@id': AGENT_ID },
    memberOf: [
      { '@id': BROKERAGE_ID },
      ...agent.memberships.map((m) => ({ '@type': 'Organization', name: m })),
    ],
    alumniOf: { '@type': 'CollegeOrUniversity', name: agent.alumniOf },
    hasCredential: [
      ...business.licenses.map((l) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: `${l.state} real estate license`,
        identifier: l.number,
        recognizedBy: { '@type': 'Organization', name: l.commission, url: l.url },
      })),
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'Master of Business Administration', recognizedBy: { '@type': 'CollegeOrUniversity', name: agent.mba } },
    ],
    homeLocation: placeNode('Rock Hill', 'SC'),
    workLocation: placeNode('Fort Mill', 'SC'),
    knowsAbout: [
      'Residential real estate in York County, South Carolina and Charlotte, North Carolina',
      'Relocation to the Charlotte area from out of state',
      'New construction purchases',
      'Pricing a home that did not sell the first time',
    ],
    sameAs: [profiles.kw, profiles.zillow, profiles.facebook, profiles.youtube, profiles.linkedin, profiles.instagram].filter(Boolean),
    mainEntityOfPage: `${siteUrl}/about/`,
  }
}

/** The headshot as its own node, so both the business and the person point at one image. */
export function headshotNode(): SchemaNode {
  return {
    '@type': 'ImageObject',
    '@id': HEADSHOT_ID,
    contentUrl: absolute(agent.headshot),
    url: absolute(agent.headshot),
    caption: agent.headshotAlt,
    description: agent.headshotAlt,
    width: agent.headshotWidth,
    height: agent.headshotHeight,
    representativeOfPage: true,
    about: { '@id': PERSON_ID },
  }
}

export function websiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteUrl,
    name: business.name,
    alternateName: 'Candace L. Thompson, MBA, REALTOR',
    publisher: { '@id': AGENT_ID },
    inLanguage: 'en-US',
  }
}

export function breadcrumb(items: { name: string; path: string }[]): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  }
}

export function faqNode(items: { question: string; answer: string }[]): SchemaNode {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  }
}

export function graph(nodes: SchemaNode[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

/** A property photograph, with where it was taken. */
export function imageNode(opts: { path: string; caption: string; city: string; state: 'NC' | 'SC'; id: string; width?: number; height?: number }): SchemaNode {
  return {
    '@type': 'ImageObject',
    '@id': opts.id,
    contentUrl: absolute(opts.path),
    url: absolute(opts.path),
    caption: opts.caption,
    description: opts.caption,
    width: opts.width ?? 1600,
    height: opts.height ?? 1067,
    contentLocation: placeNode(opts.city, opts.state),
    creditText: business.name,
    copyrightNotice: business.name,
  }
}
