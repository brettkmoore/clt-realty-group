import { Container } from '@/components/Container'

/**
 * Tailwind Plus, Marketing, Header sections, "Simple with eyebrow"
 * (React, v4.3), from Brett's account 2026-09-17. The eyebrow is the rose,
 * the heading is Playfair, the supporting paragraph holds a reading measure.
 */
export function PageIntro({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="bg-field py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          {eyebrow ? <p className="text-base/7 font-semibold text-blue">{eyebrow}</p> : null}
          <h1 className="mt-2 font-display text-[2.75rem]/[1.05] tracking-[-0.01em] text-ink sm:text-6xl/[1.04] lg:text-7xl/[1.02]">
            {title}
          </h1>
          {children ? <div className="mt-8 space-y-6 text-lg font-medium text-pretty text-ink-soft sm:text-xl/8">{children}</div> : null}
        </div>
      </Container>
    </div>
  )
}
