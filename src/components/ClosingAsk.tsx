import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ContactTrigger } from '@/components/ContactTrigger'

/**
 * Tailwind Plus, Marketing, CTA sections, "Simple justified" (React,
 * v4.3), from Brett's account 2026-09-17. One per page, last before the
 * footer. The heading is Playfair, the primary is the ink button, the
 * secondary is the quiet link without the arrow glyph. A hairline on top.
 */
export function ClosingAsk({
  heading = 'Tell me what you are trying to do.',
  children,
  secondaryHref = '/stories/',
  secondaryLabel = 'Read the stories first',
}: {
  heading?: string
  children?: React.ReactNode
  secondaryHref?: string | null
  secondaryLabel?: string
}) {
  return (
    <section aria-label="Next step" className="border-t border-rule bg-field">
      <Container className="py-24 sm:py-32">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-[2rem]/[1.1] text-ink sm:text-5xl/[1.05]">{heading}</h2>
            {children ? <p className="mt-6 text-lg/8 text-ink-soft">{children}</p> : null}
          </div>
          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-x-8 lg:mt-0 lg:shrink-0">
            <ContactTrigger>Contact Candace</ContactTrigger>
            {secondaryHref ? (
              <Button variant="quiet" href={secondaryHref}>
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
