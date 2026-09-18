import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { InteriorHero } from '@/components/InteriorHero'
import { ClosingAsk } from '@/components/ClosingAsk'
import { SchemaGraph } from '@/components/SchemaGraph'
import { breadcrumb } from '@/lib/schema'
import { areaContent } from '@/content/areas'
import { areas } from '@/lib/site'
import { getStories } from '@/lib/stories'

export const metadata: Metadata = {
  title: 'Areas served: Rock Hill, Fort Mill, Charlotte and the Carolina towns around them',
  description:
    'The twelve towns Candace L. Thompson serves across Charlotte and York, Lancaster, Union and Mecklenburg counties, with what she tells buyers about each and the stories from there.',
  alternates: { canonical: '/areas/' },
}

export default async function AreasPage() {
  const stories = await getStories()
  return (
    <>
      <SchemaGraph nodes={[breadcrumb([{ name: 'Home', path: '/' }, { name: 'Areas', path: '/areas/' }])]} />
      <InteriorHero eyebrow="Areas" title="Twelve towns, two states, one market.">
        <p>
          Rock Hill, where I grew up and still live and where most of my closings are. Fort Mill, where my office is. Charlotte
          across the line, and the towns that flank all three. I go wherever a client decides they want to be. Each page carries what I
          tell buyers about the place, the neighborhoods people ask about, and the stories from there.
        </p>
      </InteriorHero>
      <section className="py-20 lg:py-28">
        <Container>
          <ul role="list" className="divide-y divide-rule border-y border-rule">
            {areas.map((a) => {
              const count = stories.filter((s) => s.area === a.slug).length
              const c = areaContent[a.slug]
              return (
                <li key={a.slug}>
                  <Link href={`/areas/${a.slug}/`} className="group grid gap-y-3 py-8 sm:grid-cols-12 sm:gap-x-8">
                    <div className="sm:col-span-4">
                      <span className="font-display text-3xl text-ink group-hover:underline group-hover:decoration-ink/30 group-hover:underline-offset-4">
                        {a.name}
                      </span>
                      <span className="mt-1 block text-sm text-ink-faint">
                        {a.county}, {a.stateName} <span aria-hidden="true">&middot;</span> {count === 1 ? '1 story' : `${count} stories`}
                      </span>
                    </div>
                    <p className="text-base/7 text-ink-soft sm:col-span-8">{c.intro}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>
      <ClosingAsk heading="Not sure which of these is right for you?" secondaryHref="/stories/" secondaryLabel="Read the stories">
        Tell me what you need from a location and I will tell you where I would look first.
      </ClosingAsk>
    </>
  )
}
