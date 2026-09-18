import Link from 'next/link'
import { MapPinIcon } from '@heroicons/react/20/solid'

import { Container } from '@/components/Container'
import { areaContent } from '@/content/areas'
import { areas } from '@/lib/site'

/**
 * Tailwind Plus, Marketing, Feature sections, "Simple 3x2 grid" (React,
 * v4.3), from Brett's account 2026-09-17. Twelve towns in a three
 * column grid. Each name is a link to its area page; the description is
 * the first sentence of that page. The icon is the same pin on every
 * item, in the blue.
 */
export function AreaGrid({ className = 'py-24 sm:py-32' }: { className?: string }) {
  return (
    <section aria-labelledby="areas-heading" className={`bg-field ${className}`}>
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 id="areas-heading" className="text-base/7 font-semibold text-blue">
            Where I work
          </h2>
          <p className="mt-2 font-display text-[2.25rem]/[1.1] text-pretty text-ink sm:text-5xl/[1.05]">
            Charlotte, and both sides of the state line around it.
          </p>
          <p className="mt-6 text-lg/8 text-ink-soft">
            I grew up in Rock Hill, I live there now, and my office is in Fort Mill. Most of my closings are in York
            County and south Charlotte, and I go wherever a client decides they want to be. Each town has its own page
            with what I tell buyers about it and the stories from there.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-ink-soft sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16">
          {areas.map((a) => (
            <div key={a.slug} className="relative pl-9">
              <dt className="inline font-semibold text-ink">
                <MapPinIcon aria-hidden="true" className="absolute top-1 left-1 size-5 text-blue" />
                <Link href={`/areas/${a.slug}/`} className="tap underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                  {a.name}
                </Link>
                <span className="font-normal text-ink-faint">, {a.stateName}.</span>
              </dt>{' '}
              <dd className="inline">{areaContent[a.slug].intro.split('. ')[0]}.</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
