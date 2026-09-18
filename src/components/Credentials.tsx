/**
 * Tailwind Plus, Marketing, Stats sections, "Two-column description"
 * (React, v4.3), from Brett's account 2026-09-17. Only the <dl> from it:
 * a hairline on the left of each figure, set as type. No card, no pill,
 * nothing that reads as a control. Brett's rule for any stats block.
 */
export function Credentials({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-4">
      {items.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-y-3 border-l border-rule pl-6">
          <dt className="text-base/7 text-ink-soft">{stat.label}</dt>
          <dd className="font-display text-3xl text-ink figure">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
