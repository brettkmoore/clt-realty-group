import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { InteriorHero } from '@/components/InteriorHero'
import { StoryCard } from '@/components/StoryCard'
import { ClosingAsk } from '@/components/ClosingAsk'
import { SchemaGraph } from '@/components/SchemaGraph'
import { breadcrumb } from '@/lib/schema'
import { areas } from '@/lib/site'
import { getStories } from '@/lib/stories'

export const metadata: Metadata = {
  title: 'Stories from the field',
  description:
    'Real transactions in Rock Hill, Charlotte, Waxhaw, Gastonia, Mooresville and the towns between, told by Candace L. Thompson without client names or addresses, with the numbers that mattered.',
  alternates: { canonical: '/stories/' },
}

export default async function StoriesPage() {
  const stories = await getStories()
  return (
    <>
      <SchemaGraph nodes={[breadcrumb([{ name: 'Home', path: '/' }, { name: 'Stories', path: '/stories/' }])]} />
      <InteriorHero eyebrow="Stories" title="Real deals in real neighborhoods, one at a time.">
        <p>
          Every story here is a transaction I handled. I leave out the client&rsquo;s name and the street address and
          keep everything else: the market that week, the problem, the decision I made, and the number at the end.
        </p>
        <p className="text-base/7">
          By area:{' '}
          {areas.map((a, i) => (
            <span key={a.slug}>
              {i > 0 ? ', ' : ''}
              <Link href={`/areas/${a.slug}/`} className="tap text-cream underline decoration-cream/40 underline-offset-4 hover:decoration-cream">
                {a.name}
              </Link>
            </span>
          ))}
          .
        </p>
      </InteriorHero>
      {[
        { id: 'seller-stories', title: 'Seller stories', items: stories.filter((s) => s.role !== 'Buyer story') },
        { id: 'buyer-stories', title: 'Buyer stories', items: stories.filter((s) => s.role === 'Buyer story') },
      ].map((group, gi) => (
        <section key={group.id} id={group.id} className={gi === 0 ? 'py-20 lg:py-28' : 'border-t border-rule py-20 lg:py-28'}>
          <Container>
            <h2 className="font-display text-[2rem]/[1.1] text-ink sm:text-[2.5rem]/[1.1]">{group.title}</h2>
            <p className="mt-3 text-base/7 text-ink-soft">{group.items.length === 1 ? 'One story' : `${group.items.length} stories`}</p>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((story, i) => (
                <StoryCard key={story.slug} story={story} priority={gi === 0 && i < 3} />
              ))}
            </div>
          </Container>
        </section>
      ))}

      <ClosingAsk heading="Your move could be the next one." secondaryHref="/areas/" secondaryLabel="See the areas" />
    </>
  )
}
