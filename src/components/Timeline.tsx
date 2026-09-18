import { Container } from '@/components/Container'

export type TimelineItem = { label: string; name: string; description: string }

/**
 * Tailwind Plus, Marketing, Stats sections, "Timeline" (React, v4.3), from
 * Brett's account 2026-09-17. Used for a process rather than dates: the
 * time slot carries the step number, because the steps happen in this
 * order and the order is the information. The rule between steps is the
 * component's own hairline. No cards, no numbers as decoration.
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="bg-field py-16 sm:py-24">
      <Container>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {items.map((item) => (
            <div key={item.name}>
              <p className="flex items-center text-sm/6 font-semibold text-blue">
                <svg viewBox="0 0 4 4" aria-hidden="true" className="mr-4 size-1 flex-none">
                  <circle r={2} cx={2} cy={2} fill="currentColor" />
                </svg>
                {item.label}
                <span aria-hidden="true" className="absolute -ml-2 h-px w-screen -translate-x-full bg-rule sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" />
              </p>
              <p className="mt-6 font-display text-xl/8 text-ink">{item.name}</p>
              <p className="mt-1 text-base/7 text-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
