import type { Metadata } from 'next'
import { VideoCameraIcon, ScaleIcon, HomeModernIcon, MapIcon } from '@heroicons/react/20/solid'

import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { Timeline } from '@/components/Timeline'
import { FeatureSplit } from '@/components/FeatureSplit'
import { StoryCard } from '@/components/StoryCard'
import { FAQList } from '@/components/FAQList'
import { ClosingAsk } from '@/components/ClosingAsk'
import { SchemaGraph } from '@/components/SchemaGraph'
import { breadcrumb, faqNode } from '@/lib/schema'
import { buyersFaq } from '@/content/faq'
import { getStories } from '@/lib/stories'

export const metadata: Metadata = {
  title: 'Buying a home in Charlotte, Fort Mill, Rock Hill or the towns around them',
  description:
    'How Candace L. Thompson works with buyers on both sides of the state line: a budget you can carry, the North Carolina and South Carolina math run for your household, inspections she attends, and a second negotiation when the report earns one.',
  alternates: { canonical: '/buyers/' },
}

const STEPS = [
  {
    label: 'Step one',
    name: 'The first call',
    description:
      'What you are trying to do, when, and what you can carry comfortably. I tell you what is realistic in the part of the market you want right now. If the payment you have in mind would keep you up at night, I say so on this call, not at closing.',
  },
  {
    label: 'Step two',
    name: 'The lender and the line',
    description:
      'A pre-approval from a lender you trust, and the North Carolina and South Carolina comparison run for your actual household. South Carolina tends to win on the house. North Carolina often wins in the driveway. We settle which side of the line before we open a door.',
  },
  {
    label: 'Step three',
    name: 'The search',
    description:
      'Figure out how you want to live first, then the neighborhood. I verify the school district by address, never by mailing address, and I show you what I call the bonus areas when the neighborhood you love is out of reach. When nothing on the market fits, we widen the options rather than lower the standard.',
  },
  {
    label: 'Step four',
    name: 'The offer',
    description:
      'Built on what the comparable sales say and on what we already know about the house. When the roof and the HVAC are original, that goes into the first number, before the inspection. When you cannot get inside, I film the walkthrough myself and send you every angle you ask for.',
  },
  {
    label: 'Step five',
    name: 'Inspection to closing',
    description:
      'I attend the inspection, including on a new build, and if the report surfaces something real we negotiate a second time. You use your own attorney, never the seller’s, and if the seller is a corporation whose chain of title is unclear, that attorney is the one who catches it.',
  },
]

const BUILT_FOR = [
  {
    name: 'Buying your first home.',
    description:
      'Most of the reviews on my Google profile are from first-time buyers, and the word they use most is patient. You will understand every line of the contract before you sign it, and you will not be pushed past a budget you can carry.',
    icon: HomeModernIcon,
  },
  {
    name: 'Relocating from out of state.',
    description:
      'Video walkthroughs of what the listing photos leave out, answers across time zones, a full set of inspections to stand in for the visit you could not make, and a check on the house every two weeks until you arrive. One family bought in Waxhaw from upstate New York without ever walking through it.',
    icon: VideoCameraIcon,
  },
  {
    name: 'Choosing between the Carolinas.',
    description:
      'Charlotte, Fort Mill, Indian Land, Rock Hill and Waxhaw are one conversation with two tax codes. I run the property tax, the income tax and the vehicle tax for your household so the decision is arithmetic rather than assumption.',
    icon: MapIcon,
  },
  {
    name: 'Buying new construction.',
    description:
      'I have walked buyers through a six month build after nine months of resale searching came up empty. I go to the walkthrough and catch what the builder missed, and when the builder’s in-house lender offers an incentive, we compare it against the lender you already trust.',
    icon: ScaleIcon,
  },
]

export default async function BuyersPage() {
  const stories = (await getStories()).filter((s) => s.role === 'Buyer story').slice(0, 3)
  return (
    <>
      <SchemaGraph nodes={[faqNode(buyersFaq), breadcrumb([{ name: 'Home', path: '/' }, { name: 'Buyers', path: '/buyers/' }])]} />
      <PageIntro eyebrow="Buyers" title="Buying a home in Charlotte or the Carolina towns around it.">
        <p>
          The house is the part you will fall in love with. The payment, the state line and the inspection are the
          parts that decide whether you still love it in ten years, and those are the parts I will not let you rush.
        </p>
      </PageIntro>

      <Timeline items={STEPS} />

      <FeatureSplit
        eyebrow="Buyers I am built for"
        heading="Four situations where the way I work does the work."
        intro="Every one of these comes from a real transaction on this site or a real review on my Google profile."
        items={BUILT_FOR}
        image={{
          src: '/stories/342-pickens-st-rock-hill-sc-29730-exterior-dusk.webp',
          alt: 'Single story bungalow with a covered front porch photographed at dusk in downtown Rock Hill, South Carolina',
        }}
        imageSide="left"
      />

      {stories.length ? (
        <section className="bg-field py-24 sm:py-32">
          <Container>
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-base/7 font-semibold text-blue">Buyer stories</h2>
              <p className="mt-2 font-display text-[2.25rem]/[1.1] text-ink sm:text-5xl/[1.05]">How it went for other buyers.</p>
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
          <h2 className="font-display text-[2.25rem]/[1.1] text-ink sm:text-5xl/[1.05]">What buyers ask first.</h2>
          <div className="mt-10">
            <FAQList items={buyersFaq} />
          </div>
        </Container>
      </section>

      <ClosingAsk heading="Tell me what you are looking for and when you need it.">
        The first call costs nothing. You will leave it knowing what is realistic and what I would do first.
      </ClosingAsk>
    </>
  )
}
