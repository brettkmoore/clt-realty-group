import Link from 'next/link'

import { Container } from '@/components/Container'

export type FeatureItem = {
  name: string
  description: string
  href: string
  linkLabel: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

/**
 * Tailwind Plus, Marketing, Feature sections, "Simple three column with
 * small icons" (React, v4.3), from Brett's account 2026-09-17. Rethemed:
 * the eyebrow and icons take the rose, the heading is Playfair, the
 * "Learn more" links keep their label but drop the arrow glyph and go to
 * real pages. Left aligned rather than centered, to match the rest of
 * the site's headings.
 */
export function FeatureThree({
  eyebrow,
  heading,
  intro,
  items,
  className = 'py-24 sm:py-32',
}: {
  eyebrow: string
  heading: string
  intro?: string
  items: FeatureItem[]
  className?: string
}) {
  return (
    <section className={`bg-field ${className}`}>
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base/7 font-semibold text-blue">{eyebrow}</h2>
          <p className="mt-2 font-display text-[2.25rem]/[1.1] text-pretty text-ink sm:text-5xl/[1.05]">{heading}</p>
          {intro ? <p className="mt-6 text-lg/8 text-ink-soft">{intro}</p> : null}
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 font-display text-2xl text-ink">
                  <item.icon aria-hidden="true" className="size-5 flex-none text-blue" />
                  {item.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-ink-soft">
                  <p className="flex-auto">{item.description}</p>
                  <p className="mt-6">
                    <Link href={item.href} className="tap text-sm/6 font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                      {item.linkLabel}
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
