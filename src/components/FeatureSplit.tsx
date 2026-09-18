import { Container } from '@/components/Container'

export type SplitItem = {
  name: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

/**
 * Tailwind Plus, Marketing, Feature sections, "With product screenshot
 * on left" (React, v4.3), from Brett's account 2026-09-17, restructured
 * on 2026-09-18 to Brett's rule: the eyebrow, heading and intro stack on
 * top on the narrow measure, and the items follow below at full width
 * in two columns. The screenshot column is gone; nothing sits beside
 * the header. The icons take the blue.
 */
export function FeatureSplit({ eyebrow, heading, intro, items }: { eyebrow: string; heading: string; intro: string; items: SplitItem[] }) {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-base/7 font-semibold text-blue">{eyebrow}</h2>
          <p className="mt-2 font-display text-[2.25rem]/[1.1] text-pretty text-ink sm:text-5xl/[1.05]">{heading}</p>
          <p className="mt-6 text-lg/8 text-ink-soft">{intro}</p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 border-t border-rule pt-12 text-base/7 text-ink-soft lg:grid-cols-2">
          {items.map((item) => (
            <div key={item.name} className="relative pl-9">
              <dt className="inline font-semibold text-ink">
                <item.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-blue" />
                {item.name}
              </dt>{' '}
              <dd className="inline">{item.description}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
