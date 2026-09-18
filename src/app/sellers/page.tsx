import type { Metadata } from 'next'
import { ArrowPathIcon, WrenchScrewdriverIcon, HeartIcon, GlobeAmericasIcon } from '@heroicons/react/20/solid'

import { Container } from '@/components/Container'
import { InteriorHero } from '@/components/InteriorHero'
import { Timeline } from '@/components/Timeline'
import { FeatureSplit } from '@/components/FeatureSplit'
import { StoryCard } from '@/components/StoryCard'
import { FAQList } from '@/components/FAQList'
import { ClosingAsk } from '@/components/ClosingAsk'
import { SchemaGraph } from '@/components/SchemaGraph'
import { breadcrumb, faqNode } from '@/lib/schema'
import { sellersFaq } from '@/content/faq'
import { getStories } from '@/lib/stories'
import { QuestionnaireFor } from '@/components/QuestionnaireFor'
import { sellersQuestionnaire } from '@/content/questionnaires'

export const metadata: Metadata = {
  title: 'Selling a home in Rock Hill, Fort Mill, Charlotte or the towns around them',
  description:
    'How Candace L. Thompson sells homes on both sides of the state line: a price set for what buyers will actually see, the work that lets them see it, and a number she holds once it is right. Expired listings welcome.',
  alternates: { canonical: '/sellers/' },
}

const STEPS = [
  {
    label: 'Step one',
    name: 'The honest walk-through',
    description:
      'I walk your home the way a buyer will. What they will see, what they will not be able to see past, and which of those things is worth fixing. A different color in every room and an unfinished half bath cost a seller 39 days and no offers before we changed the plan.',
  },
  {
    label: 'Step two',
    name: 'The price',
    description:
      'From the closed sales in your immediate area and an honest read of the condition. Sometimes that means pricing for the weakest room on purpose, which drew multiple offers in three days on a ranch with 1960s bathrooms. Sometimes it means one accurate reprice on a listing that expired with someone else.',
  },
  {
    label: 'Step three',
    name: 'The presentation',
    description:
      'Professional photography and video, the listing on Instagram, Facebook and YouTube where the buyers for your kind of home actually are, and open houses when foot traffic will convert, including over a holiday weekend in a high visibility community.',
  },
  {
    label: 'Step four',
    name: 'The offers',
    description:
      'When several buyers want the house, I run the competition so it works for you. When one buyer tests the price, I hold the number we set, because chasing a listing’s history with another cut teaches buyers to wait you out.',
  },
  {
    label: 'Step five',
    name: 'Appraisal to closing',
    description:
      'If the appraisal comes in low we challenge it with our own comparable sales, and then we do the math on fighting further against closing. Then I stay on the buyer’s lender and the attorney until the wire clears, and the closing date is set to what you need, not to what is fastest.',
  },
]

const SOLD_THROUGH = [
  {
    name: 'A listing that expired with another agent.',
    description:
      'Ninety-six days and two price cuts with a previous agent, then full asking price in twenty days with me. A failed run is not a verdict on the house. It is usually one thing, and I find it.',
    icon: ArrowPathIcon,
  },
  {
    name: 'A home that needs work first.',
    description:
      'A discount rarely fixes what a buyer cannot picture. When the work is worth doing, I tell you exactly which work, and one seller relisted $35,000 higher and went under contract in two days. When it is not, we price honestly as-is and sell in five.',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'A sale you did not choose.',
    description:
      'A divorce, a death, a move that was not optional. No pressure, clear communication, and room to make the calls that are yours. I have let a closing stretch through three holidays because that is what my seller needed, and she still got full price in twelve days.',
    icon: HeartIcon,
  },
  {
    name: 'Selling from far away.',
    description:
      'I have sold for owners out of state and overseas, including a rental after a tenant was evicted. When there was debris left behind and no budget for a crew, I swept it out myself. Distance is my problem to solve, not yours.',
    icon: GlobeAmericasIcon,
  },
]

export default async function SellersPage() {
  const stories = (await getStories()).filter((s) => s.role === 'Seller story').slice(0, 3)
  return (
    <>
      <SchemaGraph nodes={[faqNode(sellersFaq), breadcrumb([{ name: 'Home', path: '/' }, { name: 'Sellers', path: '/sellers/' }])]} />
      <InteriorHero eyebrow="Sellers" title="Selling a home in Rock Hill, Fort Mill, Charlotte or the towns around them.">
        <p>
          Most of the sellers on this site had something working against them: a listing that had already failed,
          a house buyers could not see past, a tenant, a distance, a loss. Nineteen years and 304 closings taught
          me to price a home the way an analyst reads a market, and I will tell you the plan before you sign
          anything.
        </p>
      </InteriorHero>

      <Timeline items={STEPS} />

      <section id="questionnaire" aria-labelledby="seller-heading" className="scroll-mt-24 border-t border-rule bg-field py-24 sm:py-32">
        <Container>
          <div className="max-w-2xl">
            <p className="text-base/7 font-semibold text-blue">{sellersQuestionnaire.eyebrow}</p>
            <h2 id="seller-heading" className="mt-2 font-display text-[2.25rem]/[1.1] text-pretty text-ink sm:text-5xl/[1.05]">{sellersQuestionnaire.title}</h2>
            <p className="mt-6 text-lg/8 text-ink-soft">{sellersQuestionnaire.intro}</p>
          </div>
          <div className="mt-14 max-w-3xl">
            <QuestionnaireFor which="sellers" />
          </div>
        </Container>
      </section>

      <FeatureSplit
        eyebrow="Situations I have sold through"
        heading="Four sales where the plan mattered more than the market."
        intro="Every one of these is a real transaction on this site."
        items={SOLD_THROUGH}
      />

      {stories.length ? (
        <section className="bg-field py-24 sm:py-32">
          <Container>
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-base/7 font-semibold text-blue">Seller stories</h2>
              <p className="mt-2 font-display text-[2.25rem]/[1.1] text-ink sm:text-5xl/[1.05]">How it went for other sellers.</p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {stories.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-rule bg-field">
        <Container className="py-24 sm:py-32">
          <h2 className="font-display text-[2.25rem]/[1.1] text-ink sm:text-5xl/[1.05]">What sellers ask first.</h2>
          <div className="mt-10">
            <FAQList items={sellersFaq} />
          </div>
        </Container>
      </section>

      <ClosingAsk heading="Find out what your home would bring this month." secondaryHref="/sellers/#questionnaire" secondaryLabel="Or start your market snapshot">
        An honest read on price, preparation and timing, from the closed sales in your immediate area.
      </ClosingAsk>
    </>
  )
}
