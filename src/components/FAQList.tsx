import { business } from '@/lib/site'

export type FaqItem = { question: string; answer: string }

/**
 * Tailwind Plus, Marketing, FAQ sections, "Two columns" (React, v4.3),
 * from Brett's account 2026-09-17. Every answer is visible in the initial
 * HTML, so a reader, a crawler and the FAQPage schema read the same text.
 * The heading belongs to the page; this is the supporting line and the list.
 */
export function FAQList({ items }: { items: FaqItem[] }) {
  return (
    <div>
      <p className="max-w-2xl text-base/7 text-ink-soft">
        Have a different question? Call or text{' '}
        <a href={`tel:${business.phoneE164}`} className="tap font-semibold text-ink underline decoration-rule underline-offset-4 hover:decoration-ink figure">
          {business.phone}
        </a>{' '}
        and I will answer it.
      </p>
      <div className="mt-20">
        <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-6 sm:gap-y-16 lg:gap-x-10">
          {items.map((item) => (
            <div key={item.question}>
              <dt className="font-display text-xl text-ink">{item.question}</dt>
              <dd className="mt-2 text-base/7 text-ink-soft">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
