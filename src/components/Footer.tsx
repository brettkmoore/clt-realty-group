import Image from 'next/image'
import Link from 'next/link'

import { EqualHousing } from '@/components/EqualHousing'
import { agent, areas, business, gbp, legal, profiles } from '@/lib/site'

/**
 * Tailwind Plus, Marketing, Footers, "4-column with company mission"
 * (React, v4.3), from Brett's account 2026-09-17, carrying the Carolina
 * compliance block.
 *
 * Top: her logo, the service area in prose, social. Three link columns:
 * Working with Candace, Learn more, Get in touch. Then a trust row set
 * as type with hairlines (never badges), and the legal block: agent
 * identification with both license numbers, the firm identification
 * with the Keller Williams Connected mark, the ownership statement KW
 * requires on every website, the two state disclosure links, the
 * REALTOR mark sentence and Equal Housing. Wording is flagged for the
 * market center's confirmation in docs/open-items.
 */
const social = [
  {
    name: 'Facebook',
    href: profiles.facebook,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: profiles.youtube,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Google Business Profile',
    href: gbp.mapsUrl,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </svg>
    ),
  },
  {
    name: 'Keller Williams profile',
    href: profiles.kw,
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 3 2 12h3v8h5v-5h4v5h5v-8h3L12 3z" />
      </svg>
    ),
  },
]

const columns = [
  {
    title: 'Working with Candace',
    items: [
      { title: 'Buying a home', href: '/buyers/' },
      { title: 'Selling a home', href: '/sellers/' },
      { title: 'Stories from the field', href: '/stories/' },
      { title: 'Areas served', href: '/areas/' },
      { title: 'About Candace', href: '/about/' },
      { title: 'Questions people ask', href: '/#questions' },
      { title: 'Real Estate IQ Quiz', href: '/quiz/' },
    ],
  },
  {
    title: 'Areas',
    items: areas.map((a) => ({ title: `${a.name}, ${a.state}`, href: `/areas/${a.slug}/` })),
  },
]

const columnHeading = 'text-sm/6 font-semibold text-ink'
const columnLink = 'tap text-sm/6 text-ink-soft hover:text-ink'
const legalLink = 'tap underline decoration-ink/25 underline-offset-4 hover:decoration-ink'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Image
              src="/brand/clt-realty-group-logo.webp"
              alt="CLT Realty Group logo: the Charlotte skyline with the South Carolina palmetto and crescent, and the name Candace L. Thompson, MBA"
              width={800}
              height={576}
              sizes="240px"
              className="h-auto w-60"
            />
            <p className="text-sm/6 text-balance text-ink-soft">{legal.serviceAreaSentence}</p>
            <div className="flex gap-x-6">
              {social.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-ink-faint hover:text-ink">
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {columns.map((column) => (
                <div key={column.title} className="first:mt-0 md:mt-0 [&:not(:first-child)]:mt-10 md:[&:not(:first-child)]:mt-0">
                  <h3 className={columnHeading}>{column.title}</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {column.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={columnLink}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className={columnHeading}>Get in touch</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href={`tel:${business.phoneE164}`} className={`${columnLink} figure`}>
                      Call or text {business.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${business.email}`} className={columnLink}>
                      {business.email}
                    </a>
                  </li>
                  <li>
                    <Link href="/contact/" className={columnLink}>
                      Send a note
                    </Link>
                  </li>
                  {business.mailingAddress ? (
                    <li className="text-sm/6 text-ink-soft">
                      <span className="block">{agent.name}</span>
                      <span className="block whitespace-pre-line">{business.mailingAddress}</span>
                    </li>
                  ) : null}
                  <li>
                    <a href={gbp.reviewUrl} target="_blank" rel="noopener noreferrer" className={columnLink}>
                      Leave a Google review
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className={columnHeading}>Hours and office</h3>
                <ul role="list" className="mt-6 space-y-4 text-sm/6 text-ink-soft">
                  {gbp.hours.map((h) => (
                    <li key={h.label}>
                      {h.label}
                      <span className="block figure">{h.display}</span>
                    </li>
                  ))}
                  <li>
                    {business.brokerage.name}
                    <span className="block">{business.brokerage.street}</span>
                    <span className="block">
                      {business.brokerage.city}, {business.brokerage.state} {business.brokerage.zip}
                    </span>
                    <a href={`tel:${business.brokerage.phoneE164}`} className={`${columnLink} figure block`}>
                      Office {business.brokerage.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* The trust row. Set as type with hairlines, never as badges. */}
        <div className="mt-16 border-t border-rule pt-8 sm:mt-20 lg:mt-24">
          <ul role="list" className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] font-semibold tracking-[0.12em] uppercase text-ink-soft">
            <li className="flex items-center gap-x-3">
              <Image src="/brand/keller-williams.webp" alt="Keller Williams" width={842} height={560} sizes="48px" className="h-8 w-auto" />
              <span>{business.brokerage.name}</span>
            </li>
            <li>REALTOR&reg;</li>
            <li>Licensed in South Carolina and North Carolina</li>
            <li>Equal Housing Opportunity</li>
          </ul>
        </div>

        {/* The legal block. */}
        <div className="mt-8 border-t border-rule pt-8">
          <div className="flex flex-col gap-y-8 lg:flex-row lg:items-start lg:justify-between lg:gap-x-12">
            <div className="max-w-3xl space-y-4 text-sm/6 text-ink-soft">
              <p className="text-ink">
                {agent.displayName}, REALTOR&reg;.{' '}
                {business.licenses.map((l, i) => (
                  <span key={l.abbr}>
                    {i > 0 ? ' ' : ''}
                    {l.state} real estate license {l.number}.
                  </span>
                ))}
              </p>
              <p>
                {legal.teamSentence}{' '}
                <a href={business.brokerage.url} target="_blank" rel="noopener noreferrer" className={legalLink}>
                  {business.brokerage.name}
                </a>
                , {business.brokerage.address}, office {business.brokerage.phone}. {legal.ownership} {legal.franchisorSentence}
              </p>
              <p className="flex flex-wrap gap-x-4 gap-y-1 text-[13px]/6">
                <a href={legal.ncDisclosure.url} target="_blank" rel="noopener noreferrer" className={legalLink}>
                  {legal.ncDisclosure.label}
                </a>
                <a href={legal.scDisclosure.url} target="_blank" rel="noopener noreferrer" className={legalLink}>
                  {legal.scDisclosure.label}
                </a>
              </p>
              <p>{legal.realtorMark}</p>
              <p>
                {year} {business.name}. All rights reserved.
              </p>
            </div>
            <EqualHousing />
          </div>
        </div>
      </div>
    </footer>
  )
}
