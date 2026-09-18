import type { Metadata } from 'next'
import { HandRaisedIcon, ScaleIcon, HomeModernIcon } from '@heroicons/react/20/solid'

import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { Button } from '@/components/Button'
import { FeatureThree } from '@/components/FeatureThree'
import { AreaGrid } from '@/components/AreaGrid'
import { StoryCard } from '@/components/StoryCard'
import { GoogleProfile } from '@/components/GoogleProfile'
import { Reviews } from '@/components/Reviews'
import { FAQList } from '@/components/FAQList'
import { ClosingAsk } from '@/components/ClosingAsk'
import { SchemaGraph } from '@/components/SchemaGraph'
import { faqNode } from '@/lib/schema'
import { homeFaq } from '@/content/faq'
import { getStories } from '@/lib/stories'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/**
 * The three things she brings that a search result cannot. Copy derived
 * from her own case studies and what she said in the August and
 * September 2026 sessions; the first person is hers.
 */
const HOW = [
  {
    name: 'I will not rush you.',
    description:
      'A client once told me he had assumed I had no other job because every time he called, I answered, and he felt like my only client. That is the standard. This is one of the largest decisions you will make, and you get my attention until it is right, not until it closes.',
    href: '/buyers/',
    linkLabel: 'How I work with buyers',
    icon: HandRaisedIcon,
  },
  {
    name: 'The payment has to let you sleep.',
    description:
      'I sold homes through the recession and sat across from people who were losing them. You can stretch a little. You do not get too wild. When I know a payment will keep you up at night, we find a different house, because I want you to still own your home in ten years.',
    href: '/stories/',
    linkLabel: 'Read the stories',
    icon: ScaleIcon,
  },
  {
    name: 'Whatever the house needs, I do.',
    description:
      'I have filmed a walkthrough for buyers who could not get in the door, checked on an empty house every two weeks until its owners arrived from New York, and swept out a rental myself so it could be photographed. The plan is whatever gets you the right outcome.',
    href: '/sellers/',
    linkLabel: 'How I work with sellers',
    icon: HomeModernIcon,
  },
]

export default async function Home() {
  const stories = await getStories()
  const featured = stories.filter((s) => s.featured).slice(0, 3)
  const shown = featured.length === 3 ? featured : stories.slice(0, 3)

  return (
    <>
      <SchemaGraph nodes={[faqNode(homeFaq)]} />
      <Hero />

      {/* The one deep blue band on the page: her line, said plainly. */}
      <section aria-labelledby="sanctuary-heading" className="bg-blue-deep">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-[13px] font-semibold tracking-[0.1em] uppercase text-cream/60">Why I do this</p>
            <h2 id="sanctuary-heading" className="mt-6 font-display text-[2rem]/[1.15] text-cream sm:text-[2.75rem]/[1.12]">
              Home is the one place where nobody is judging you. Where you can rest, and be yourself, and feel safe
              enough to plan the rest of your life.
            </h2>
            <p className="mt-8 max-w-2xl text-lg/8 text-cream/80">
              That is what I mean when I say your home should be your sanctuary. I have said it to clients for years.
              My job is to help you find the one that will be that for you, or to sell the one that was, with the care
              that deserves.
            </p>
          </div>
        </Container>
      </section>

      <FeatureThree
        eyebrow="How I work"
        heading="What it is like to have me on your side."
        items={HOW}
        className="py-24 sm:py-32"
      />

      {/* Tailwind Plus, Blog sections, "Three-column with images": the section around three StoryCards. */}
      <section aria-labelledby="stories-heading" className="bg-paper py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 id="stories-heading" className="text-base/7 font-semibold text-blue">
              Stories from the field
            </h2>
            <p className="mt-2 font-display text-[2.25rem]/[1.1] text-balance text-ink sm:text-5xl/[1.05]">
              Real deals in real neighborhoods.
            </p>
            <p className="mt-6 text-lg/8 text-ink-soft">
              Each one is a transaction I handled, told without the client&rsquo;s name or the street address, with
              the numbers that mattered and the decision that made the difference.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {shown.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
          <p className="mt-16">
            <Button variant="quiet" href="/stories/">
              All {stories.length} stories
            </Button>
          </p>
        </Container>
      </section>

      <AreaGrid />

      <Reviews />

      {/* Tailwind Plus, Content sections, "Centered" (React, v4.3): a single column on the plate width. */}
      <section aria-labelledby="about-heading" className="bg-paper py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p id="about-heading" className="text-base/7 font-semibold text-blue">
              About
            </p>
            <h2 className="mt-2 font-display text-[2.5rem]/[1.05] text-pretty text-ink sm:text-5xl/[1.05] lg:text-6xl/[1.04]">
              I am Candace L. Thompson.
            </h2>
            <p className="mt-8 text-xl/8 text-ink sm:text-2xl/9">
              Born and raised in Rock Hill. Office in Fort Mill. Licensed on both sides of the line, and now in real
              estate full time after years of doing it alongside another job without a single client noticing.
            </p>
            <div className="mt-10 max-w-2xl space-y-6 text-lg/8 text-ink-soft">
              <p>
                I did my undergraduate degree at the University of South Carolina and my MBA online while I was
                working. I am a member of Alpha Kappa Alpha Sorority, Incorporated, through the Omega Tau Omega
                chapter in Fort Mill, and the events I host for the community, like the brunch and bouquet afternoon
                my past clients still talk about, come out of the same place my business does.
              </p>
            </div>
            <p className="mt-10">
              <Button variant="quiet" href="/about/">
                More about me
              </Button>
            </p>
          </div>
        </Container>
      </section>

      <GoogleProfile />

      <section id="questions" className="border-t border-rule bg-field">
        <Container className="py-24 sm:py-32">
          <h2 className="font-display text-[2.25rem]/[1.1] text-ink sm:text-5xl/[1.05]">Things people ask on the first call.</h2>
          <div className="mt-10">
            <FAQList items={homeFaq} />
          </div>
        </Container>
      </section>

      <ClosingAsk heading="Tell me what you are trying to do." secondaryHref="/about/" secondaryLabel="Read about me first">
        Buying, selling, or both. The first call costs nothing and you will leave it knowing what is realistic.
      </ClosingAsk>
    </>
  )
}
