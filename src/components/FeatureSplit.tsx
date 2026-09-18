import Image from 'next/image'

import { Container } from '@/components/Container'

export type SplitItem = {
  name: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

/**
 * Tailwind Plus, Marketing, Feature sections, "With product screenshot on
 * left" (React, v4.3), from Brett's account 2026-09-17. The screenshot
 * slot carries a photograph of a home Deborah sold. Rethemed: no radius,
 * no shadow, no ring on the photo; the icons take the rose; the heading
 * is Playfair. `imageSide` flips the columns so the two pages that use it
 * mirror each other.
 */
export function FeatureSplit({
  eyebrow,
  heading,
  intro,
  items,
  image,
  imageSide = 'left',
}: {
  eyebrow: string
  heading: string
  intro: string
  items: SplitItem[]
  image: { src: string; alt: string }
  imageSide?: 'left' | 'right'
}) {
  return (
    <section className="overflow-hidden bg-paper py-24 sm:py-32">
      <Container>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className={imageSide === 'left' ? 'lg:ml-auto lg:pt-4 lg:pl-4' : 'lg:pt-4 lg:pr-8'}>
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-blue">{eyebrow}</h2>
              <p className="mt-2 font-display text-[2.25rem]/[1.1] text-pretty text-ink sm:text-5xl/[1.05]">{heading}</p>
              <p className="mt-6 text-lg/8 text-ink-soft">{intro}</p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-ink-soft lg:max-w-none">
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
            </div>
          </div>
          <div className={`flex items-start ${imageSide === 'left' ? 'justify-end lg:order-first' : 'justify-start'}`}>
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={1067}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-3xl max-w-none sm:w-228"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
