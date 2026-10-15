'use client'

import { useMemo, useState } from 'react'

import { Field, Result, money, moneyExact, note, num, payment } from '@/components/calculators/fields'

export function MortgageCalculator() {
  const [price, setPrice] = useState('400000')
  const [down, setDown] = useState('80000')
  const [rate, setRate] = useState('6.5')
  const [years, setYears] = useState('30')
  const [tax, setTax] = useState('2800')
  const [ins, setIns] = useState('1600')
  const [hoa, setHoa] = useState('0')

  const result = useMemo(() => {
    const principal = Math.max(0, num(price) - num(down))
    const pi = payment(principal, num(rate), num(years))
    const monthlyTax = num(tax) / 12
    const monthlyIns = num(ins) / 12
    const monthlyHoa = num(hoa)
    const total = pi + monthlyTax + monthlyIns + monthlyHoa
    const n = Math.round(num(years) * 12)
    const interest = pi * n - principal
    return { principal, pi, monthlyTax, monthlyIns, monthlyHoa, total, interest }
  }, [price, down, rate, years, tax, ins, hoa])

  return (
    <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16">
      <form className="grid gap-6 sm:grid-cols-2 lg:col-span-3" onSubmit={(e) => e.preventDefault()}>
        <Field id="price" label="Home price" value={price} onChange={setPrice} prefix="$" />
        <Field id="down" label="Down payment" value={down} onChange={setDown} prefix="$" />
        <Field id="rate" label="Interest rate" value={rate} onChange={setRate} suffix="%" step="0.01" />
        <Field id="years" label="Loan term" value={years} onChange={setYears} suffix="yr" />
        <Field id="tax" label="Property tax, a year" value={tax} onChange={setTax} prefix="$" />
        <Field id="ins" label="Homeowners insurance, a year" value={ins} onChange={setIns} prefix="$" />
        <Field id="hoa" label="HOA, a month" value={hoa} onChange={setHoa} prefix="$" />
      </form>
      <dl className="grid content-start gap-y-8 lg:col-span-2">
        <Result label="Monthly payment" value={moneyExact(result.total)} />
        <Result label="Principal and interest" value={moneyExact(result.pi)} />
        <Result label="Loan amount" value={money(result.principal)} />
        <Result label="Interest over the loan" value={money(result.interest)} />
        <p className="text-sm/6 text-ink-soft">{note}</p>
      </dl>
    </div>
  )
}
