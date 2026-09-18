import type { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { Button } from '@/components/Button'
import { Credentials } from '@/components/Credentials'
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
import { agent, business, gbp, production, tagline } from '@/lib/site'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/**
 * The figures below the fold. Zillow, read 2026-09-18, plus the Google
 * profile. Set as type. Update src/lib/site.ts and these follow.
 */
const FIGURES = [
  { label: 'homes sold, career', value: String(production.totalSales) },
  ...(production.careerVolume ? [{ label: 'career sales volume, per Candace', value: production.careerVolume }] : []),
  { label: 'homes sold in the last twelve months', value: String(production.salesLast12Months) },
  { label: 'years in real estate', value: String(production.yearsExperience) },
  { label: `on Zillow from ${production.zillowRating.count} reviews, and on Google from ${gbp.rating.count}`, value: production.zillowRating.value },
]

export default async function Home() {
  const stories = await getStories()
  const featured = stories.filter((s) => s.featured).slice(0, 3)
  const shown = featured.length === 3 ? featured : stories.slice(0, 3)

  return (
    <>
      <SchemaGraph nodes={[faqNode(homeFaq)]} />
      <Hero />

      {/*
       * Below the fold: proof. Brett, 2026-09-18: "this section of the
       * website right below the fold should show Candace's excellence, her
       * expertise. More stats, how many homes she sold, awards she's won."
       * The numbers are from her Zillow profile, read 2026-09-18, set as
       * type with hairlines. No cards, no pills, no boxes, no derived
       * dollar volume.
       */}
      <section aria-labelledby="record-heading" className="bg-field py-24 sm:py-32">
        <Container>
          <div className="max-w-2xl">
            <p className="text-base/7 font-semibold text-blue">The record</p>
            <h2 id="record-heading" className="mt-2 font-display text-[2.25rem]/[1.1] text-pretty text-ink sm:text-5xl/[1.05]">
              {production.yearsExperience} years. {production.totalSales} homes sold. Two states.
            </h2>
            <p className="mt-6 text-lg/8 text-ink-soft">
              Every number here is on my public record. My closings run from $60,000 to $625,000, on both sides of the
              state line, and many of the people I work with came from someone I already helped.
            </p>
          </div>
          <div className="mt-16">
            <Credentials items={FIGURES} />
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-8 border-t border-rule pt-10 sm:grid-cols-3">
            <div>
              <dt className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">What I do</dt>
              <dd className="mt-3 text-base/7 text-ink">{production.specialties.join('. ')}.</dd>
            </div>
            <div>
              <dt className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">Licensed in</dt>
              <dd className="mt-3 text-base/7 text-ink">
                {business.licenses.map((l) => `${l.state} (${l.number})`).join(' and ')}, with {business.brokerage.name}.
              </dd>
            </div>
            <div>
              <dt className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">Education</dt>
              <dd className="mt-3 text-base/7 text-ink">
                MBA, {agent.mba}. BS, {agent.alumniOf}.
              </dd>
            </div>
          </dl>
        </Container>
      </section>

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
              I&rsquo;m Candace L. Thompson.
            </h2>
            <p className="mt-8 text-xl/8 text-ink sm:text-2xl/9">
              Born and raised in Rock Hill, fifteen minutes from Charlotte. Nineteen years in real estate on both
              sides of the line, an MBA earned along the way, and clients who came back for their second and third
              homes.
            </p>
            <blockquote className="mt-10 max-w-2xl border-l-2 border-pink pl-6">
              <p className="font-display text-2xl/[1.3] text-ink sm:text-[1.75rem]/[1.3]">&ldquo;{tagline}&rdquo;</p>
              <footer className="mt-3 text-sm/6 text-ink-soft">What I have told clients for years, and still mean.</footer>
            </blockquote>
            <p className="mt-10">
              <Button variant="quiet" href="/about/">
                More about me
              </Button>
            </p>
          </div>
        </Container>
      </section>

      {/* The quiz, as a plain invitation on the plate width. */}
      <section aria-labelledby="quiz-heading" className="border-t border-rule bg-field py-24 sm:py-32">
        <Container>
          <div className="max-w-2xl">
            <p className="text-base/7 font-semibold text-blue">Real Estate IQ Quiz</p>
            <h2 id="quiz-heading" className="mt-2 font-display text-[2.25rem]/[1.1] text-ink sm:text-5xl/[1.05]">
              Six moments from my own closings. What would you do?
            </h2>
            <p className="mt-6 text-lg/8 text-ink-soft">
              The expired listing, the low appraisal, the house you cannot get into, the state line. Pick what you
              would do and I will tell you what worked. About four minutes.
            </p>
            <p className="mt-8">
              <Button href="/quiz/">Take the quiz</Button>
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
