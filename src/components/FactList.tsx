/**
 * A definition list set as type. Full width, hairline rules between
 * rows, the label in the narrow column and the value in the wide one
 * (two fifths to three fifths), never a fifty-fifty split and never a
 * box. Brett, 2026-09-18: labels need less room than values, and a
 * squeezed table wraps long entries onto three lines.
 */
export function FactList({ items, className = '' }: { items: { label: string; value: React.ReactNode }[]; className?: string }) {
  return (
    <dl className={`divide-y divide-rule border-y border-rule text-base/7 ${className}`}>
      {items.map((f) => (
        <div key={f.label} className="grid gap-x-8 py-4 sm:grid-cols-5">
          <dt className="text-ink-soft sm:col-span-2">{f.label}</dt>
          <dd className="text-ink sm:col-span-3">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}
