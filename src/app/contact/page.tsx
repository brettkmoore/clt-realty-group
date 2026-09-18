import type { Metadata } from 'next'
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'

import { ContactForm } from '@/components/ContactForm'
import { SchemaGraph } from '@/components/SchemaGraph'
import { breadcrumb } from '@/lib/schema'
import { business, gbp, areaSentence } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Candace L. Thompson',
  description: `Call or text ${business.phone}, email ${business.email}, or send a note. Serving ${areaSentence}.`,
  alternates: { canonical: '/contact/' },
}

/**
 * Tailwind Plus, Marketing, Contact sections, "Split with pattern" (React,
 * v4.3), from Brett's account 2026-09-17. The left half is the component's
 * patterned panel with the contact list and its icons; the right half is
 * the form, which lives in ContactForm so it can post. Stripped: the blurred
 * gradient blob, the rounded inputs, the indigo focus ring.
 */
export default function ContactPage() {
  return (
    <>
      <SchemaGraph nodes={[breadcrumb([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])]} />
      <div className="relative isolate bg-field">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-paper ring-1 ring-rule lg:w-1/2">
                <svg aria-hidden="true" className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-rule">
                  <defs>
                    <pattern x="100%" y={-1} id="contact-grid" width={200} height={200} patternUnits="userSpaceOnUse">
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" strokeWidth={0} className="fill-paper" />
                  <svg x="100%" y={-1} className="overflow-visible fill-field">
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect fill="url(#contact-grid)" width="100%" height="100%" strokeWidth={0} />
                </svg>
              </div>
              <h1 className="font-display text-[2.5rem]/[1.05] text-pretty text-ink sm:text-5xl/[1.05]">Call, text, or send a note.</h1>
              <p className="mt-6 text-lg/8 text-ink-soft">
                The fastest way to reach me is my cell, and I answer it, because a call can be a client who needs me
                right now. After hours, send a note here or by email and I will answer first thing.
              </p>
              <dl className="mt-10 space-y-4 text-base/7 text-ink-soft">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon aria-hidden="true" className="h-7 w-6 text-ink-faint" />
                  </dt>
                  <dd>
                    <a href={`tel:${business.phoneE164}`} className="tap text-ink figure hover:underline hover:underline-offset-4">
                      {business.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-ink-faint" />
                  </dt>
                  <dd>
                    <a href={`mailto:${business.email}`} className="tap text-ink hover:underline hover:underline-offset-4">
                      {business.email}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Hours</span>
                    <ClockIcon aria-hidden="true" className="h-7 w-6 text-ink-faint" />
                  </dt>
                  <dd>
                    {gbp.hours.map((h) => (
                      <span key={h.label} className="block">
                        {h.label}, <span className="figure">{h.display}</span>
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Service area</span>
                    <MapPinIcon aria-hidden="true" className="h-7 w-6 text-ink-faint" />
                  </dt>
                  <dd>
                    {areaSentence}.{' '}
                    <a href={gbp.mapsUrl} target="_blank" rel="noopener noreferrer" className="tap text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                      Find me on Google
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Brokerage</span>
                    <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-ink-faint" />
                  </dt>
                  <dd>
                    {business.brokerage.name}
                    <br />
                    {business.brokerage.address}
                    <br />
                    Office {business.brokerage.phone}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
