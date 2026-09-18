import { Container } from '@/components/Container'
import { Eyebrow, Heading } from '@/components/Text'
import { gbp, production, profiles } from '@/lib/site'
import { reviews } from '@/content/reviews'

/**
 * Tailwind Plus, Marketing, Testimonials, "Grid" (React, v4.3), from
 * Brett's account 2026-09-17. Three of it, as type: no card, no ring,
 * no shadow, no avatar, no star glyphs. Each quote is a real Google
 * review, quoted as written and attributed the way the reviewer signed
 * it, with the month it was posted. The full set lives in
 * src/content/reviews.ts with its source and read date.
 */
export function Reviews() {
  return (
    <section aria-labelledby="reviews-heading" className="border-t border-rule bg-field py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>In their words</Eyebrow>
          <Heading id="reviews-heading" className="mt-6">
            Five stars on Google and on Zillow.
          </Heading>
          <p className="mt-6 text-lg/8 text-ink-soft">
            {gbp.rating.value} from {gbp.rating.count} reviews on Google and {production.zillowRating.value} from{' '}
            {production.zillowRating.count} on Zillow, as of {production.zillowRating.readOn.slice(0, 4)}. Three of them, quoted as they were
            written.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 border-t border-rule pt-12 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.author} className="flex flex-col">
              <blockquote className="flex-auto font-display text-[1.375rem]/[1.4] text-ink">
                <p>&ldquo;{r.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 text-sm/6 text-ink-soft">
                <span className="font-semibold text-ink">{r.author}</span>
                <span className="block">
                  Google review, {r.when}. {r.context}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <a href={gbp.reviewsUrl} target="_blank" rel="noopener noreferrer" className="tap text-[13px] font-semibold tracking-[0.14em] uppercase text-ink border-b border-ink/25 pb-1 hover:border-ink">
            Read all {gbp.rating.count} on Google
          </a>
          <a href={profiles.zillow} target="_blank" rel="noopener noreferrer" className="tap text-[13px] font-semibold tracking-[0.14em] uppercase text-ink border-b border-ink/25 pb-1 hover:border-ink">
            Read all {production.zillowRating.count} on Zillow
          </a>
        </p>
      </Container>
    </section>
  )
}
