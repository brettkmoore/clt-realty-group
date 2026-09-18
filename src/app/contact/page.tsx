import type { Metadata } from 'next'

import { Container } from '@/components/Container'
import { ContactForm } from '@/components/ContactForm'
import { FactList } from '@/components/FactList'
import { SchemaGraph } from '@/components/SchemaGraph'
import { breadcrumb } from '@/lib/schema'
import { business, gbp, areaSentence } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Candace L. Thompson',
  description: `Call or text ${business.phone}, email ${business.email}, or send a note. Serving ${areaSentence}.`,
  alternates: { canonical: '/contact/' },
}

/**
 * Tailwind Plus, Marketing, Contact sections, "Simple centered" (React,
 * v4.3), from Brett's account 2026-09-17, restructured 2026-09-18: the
 * header stacks on top on the narrow measure, the contact facts follow
 * as a 40/60 list with hairlines, and the form sits below them. The
 * split-with-pattern layout was retired because it put the header in
 * one column and the content in the other.
 */
export default function ContactPage() {
  return (
    <>
      <SchemaGraph nodes={[breadcrumb([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])]} />
      <div className="bg-field py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="text-base/7 font-semibold text-blue">Contact</p>
            <h1 className="mt-2 font-display text-[2.5rem]/[1.05] text-pretty text-ink sm:text-5xl/[1.05]">Call, text, or send a note.</h1>
            <p className="mt-6 text-lg/8 text-ink-soft">
              The fastest way to reach me is my cell, and I answer it, because a call can be a client who needs me
              right now. Or send me a few details below and I will reach out. There is no booking calendar on
              purpose: I would rather call you at a time I know I am free.
            </p>
          </div>
          <div className="mt-14">
            <FactList
              items={[
                {
                  label: 'Phone',
                  value: (
                    <a href={`tel:${business.phoneE164}`} className="tap text-ink figure hover:underline hover:underline-offset-4">
                      {business.phone}
                    </a>
                  ),
                },
                {
                  label: 'Email',
                  value: (
                    <a href={`mailto:${business.email}`} className="tap text-ink hover:underline hover:underline-offset-4">
                      {business.email}
                    </a>
                  ),
                },
                ...gbp.hours.map((h) => ({ label: `Hours, ${h.label.toLowerCase()}`, value: <span className="figure">{h.display}</span> })),
                {
                  label: 'Service area',
                  value: (
                    <>
                      {areaSentence}.{' '}
                      <a href={gbp.mapsUrl} target="_blank" rel="noopener noreferrer" className="tap text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                        Find me on Google
                      </a>
                    </>
                  ),
                },
                { label: 'Brokerage', value: `${business.brokerage.name}, ${business.brokerage.address}. Office ${business.brokerage.phone}.` },
              ]}
            />
          </div>
          <div className="mt-16 max-w-xl border-t border-rule pt-12">
            <h2 className="font-display text-2xl text-ink">Tell me what you are trying to do</h2>
            <p className="mt-2 text-base/7 text-ink-soft">A few taps, no calendar. I reach out myself.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
