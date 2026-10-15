'use client'

export const fieldClass =
  'mt-2 block w-full bg-field px-3.5 py-2.5 text-base text-ink outline-1 -outline-offset-1 outline-rule placeholder:text-ink-faint focus:outline-2 focus:-outline-offset-2 focus:outline-ink figure'

export function Field({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = '1',
  min,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  prefix?: string
  suffix?: string
  step?: string
  min?: string
}) {
  return (
    <label htmlFor={id} className="block text-sm/6 font-semibold text-ink">
      {label}
      <span className="relative mt-2 block">
        {prefix ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ink-faint">{prefix}</span>
        ) : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClass} ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-10' : ''}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-ink-faint">{suffix}</span>
        ) : null}
      </span>
    </label>
  )
}

export function money(n: number) {
  if (!Number.isFinite(n)) return '—'
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export function moneyExact(n: number) {
  if (!Number.isFinite(n)) return '—'
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function num(v: string) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

/** Monthly principal and interest. rate is annual percent, termYears is years. */
export function payment(principal: number, annualRate: number, termYears: number) {
  const n = Math.round(termYears * 12)
  if (principal <= 0 || n <= 0) return 0
  const r = annualRate / 100 / 12
  if (r === 0) return principal / n
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-rule pl-6">
      <dt className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">{label}</dt>
      <dd className="mt-2 font-display text-3xl text-ink figure">{value}</dd>
    </div>
  )
}

export const note =
  'These are estimates, not a loan offer. Taxes, insurance, and rates change. Talk with Candace or a lender for numbers that fit you.'
