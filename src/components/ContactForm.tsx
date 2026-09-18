'use client'

import { useState } from 'react'
import { clsx } from 'clsx'

import { Button } from '@/components/Button'
import { business } from '@/lib/site'

/**
 * ===================================================================
 *  THE FORM. CAPTURE, NOT BOOKING.
 * ===================================================================
 *
 * Candace, 2026-09-18: no calendar booking. Her Calendly is not synced
 * to her real calendar and she does not want to be booked when she is
 * not free. She wants to capture enough to reach out herself, and to
 * let people call or text her directly. Both paths, no scheduler.
 *
 * Mostly tappable choices and one open box, because every typed field
 * is a drop-off on a phone and structured answers are filterable for
 * her later. Progressive disclosure: a buyer never sees the seller
 * fields. The seller path is framed as what they get, a market snapshot
 * of their home, not as data we want. Address is typed because it has
 * to be. One optional "anything else" box at the end, where the real
 * motivation usually shows up. In the pop-up (`compact`) only the
 * shared fields show, with a link to the long questionnaire for the
 * chosen path; the /contact/ page shows the buyer and seller blocks.
 *
 * Posts to /api/contact, which forwards everything to the GoHighLevel
 * inbound webhook. Until that is connected the form says so and hands
 * the visitor the phone number instead of pretending. The same
 * component renders inside the pop-up (`compact`) and on /contact/.
 */
const field =
  'mt-2 block w-full bg-field px-3.5 py-2.5 text-base text-ink outline-1 -outline-offset-1 outline-rule placeholder:text-ink-faint focus:outline-2 focus:-outline-offset-2 focus:outline-ink'
const label = 'block text-sm/6 font-semibold text-ink'

type Role = 'buying' | 'selling' | 'both'
type State = { status: 'idle' | 'sending' | 'sent' | 'not-connected' | 'error'; message?: string }

const ROLES: { value: Role; title: string; detail: string }[] = [
  { value: 'buying', title: 'Buying', detail: 'Looking for a home' },
  { value: 'selling', title: 'Selling', detail: 'I own a home to sell' },
  { value: 'both', title: 'Both', detail: 'Selling one, buying the next' },
]
const TIMELINES = ['As soon as possible', 'In the next 3 months', '3 to 6 months', 'Later this year or next', 'Just exploring']
const PREAPPROVAL = ['Pre-approved', 'Started the process', 'Not yet', 'Paying cash']
const PRICE_BANDS = ['Under $250K', '$250K to $350K', '$350K to $450K', '$450K to $600K', '$600K to $800K', 'Over $800K']
const BEDS = ['1', '2', '3', '4', '5+']
const BATHS = ['1', '1.5', '2', '2.5', '3+']

function Chips({
  name,
  legend,
  options,
  value,
  onChange,
  hint,
}: {
  name: string
  legend: string
  options: string[]
  value: string
  onChange: (v: string) => void
  hint?: string
}) {
  return (
    <fieldset>
      <legend className={label}>{legend}</legend>
      {hint ? <p className="mt-1 text-sm/6 text-ink-soft">{hint}</p> : null}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value === o
          return (
            <label
              key={o}
              className={clsx(
                'cursor-pointer select-none border px-4 py-2.5 text-sm/6 transition-colors',
                checked ? 'border-blue bg-blue text-cream' : 'border-rule bg-field text-ink hover:border-ink',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink',
              )}
            >
              <input type="radio" name={name} value={o} checked={checked} onChange={() => onChange(o)} className="sr-only" />
              {o}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function ContactForm({ compact = false }: { compact?: boolean } = {}) {
  const [state, setState] = useState<State>({ status: 'idle' })
  const [role, setRole] = useState<Role | ''>('')
  const [timeline, setTimeline] = useState('')
  const [preapproval, setPreapproval] = useState('')
  const [priceBand, setPriceBand] = useState('')
  const [beds, setBeds] = useState('')
  const [baths, setBaths] = useState('')

  const selling = role === 'selling' || role === 'both'
  const buying = role === 'buying' || role === 'both'

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setState({ status: 'sending' })
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, role, timeline, preapproval, priceBand, beds, baths, source: compact ? 'pop-up' : 'contact page' }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      if (json.ok) {
        setState({ status: 'sent' })
        form.reset()
      } else if (json.error === 'not-connected') {
        setState({ status: 'not-connected' })
      } else {
        setState({ status: 'error', message: json.error })
      }
    } catch {
      setState({ status: 'error', message: 'The message could not be sent.' })
    }
  }

  if (state.status === 'sent') {
    return (
      <div className="border-t border-rule pt-8">
        <p className="font-display text-2xl text-ink">Got it. I will reach out shortly.</p>
        <p className="mt-3 text-base/7 text-ink-soft">
          If it cannot wait, call or text{' '}
          <a href={`tel:${business.phoneE164}`} className="tap text-ink underline decoration-ink/25 underline-offset-4 figure">
            {business.phone}
          </a>
          .
        </p>
      </div>
    )
  }

  const busy = state.status === 'sending'

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-first" className={label}>
            First name
          </label>
          <input id="cf-first" name="firstName" type="text" autoComplete="given-name" required className={field} />
        </div>
        <div>
          <label htmlFor="cf-last" className={label}>
            Last name
          </label>
          <input id="cf-last" name="lastName" type="text" autoComplete="family-name" required className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            Email
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" inputMode="email" required className={field} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>
            Phone
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={field} />
        </div>
      </div>

      {/* The one question that decides what follows. */}
      <fieldset>
        <legend className={label}>What are you trying to do?</legend>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ROLES.map((r) => {
            const checked = role === r.value
            return (
              <label
                key={r.value}
                className={clsx(
                  'cursor-pointer select-none border px-4 py-3 transition-colors',
                  checked ? 'border-blue bg-blue text-cream' : 'border-rule bg-field text-ink hover:border-ink',
                  'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink',
                )}
              >
                <input type="radio" name="roleChoice" value={r.value} checked={checked} onChange={() => setRole(r.value)} required className="sr-only" />
                <span className="block text-sm/6 font-semibold">{r.title}</span>
                <span className={clsx('block text-xs/5', checked ? 'text-cream/80' : 'text-ink-soft')}>{r.detail}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {selling && !compact ? (
        <div className="space-y-6 border-l-2 border-blue pl-5">
          <div>
            <p className="font-display text-xl text-ink">Your market snapshot</p>
            <p className="mt-1 text-sm/6 text-ink-soft">
              Tell me about the home and I will put together what it would likely bring this month, from the closed
              sales around it. No obligation.
            </p>
          </div>
          <div>
            <label htmlFor="cf-address" className={label}>
              Property address
            </label>
            <input id="cf-address" name="address" type="text" autoComplete="street-address" placeholder="Street, city, state" required={selling} className={field} />
          </div>
          <Chips name="beds" legend="Bedrooms" options={BEDS} value={beds} onChange={setBeds} />
          <Chips name="baths" legend="Bathrooms" options={BATHS} value={baths} onChange={setBaths} />
          <div>
            <label htmlFor="cf-improvements" className={label}>
              What have you updated since you bought it?
            </label>
            <p className="mt-1 text-sm/6 text-ink-soft">Roof, HVAC, kitchen, floors, a finished space. It changes the number, so it goes in the snapshot.</p>
            <textarea id="cf-improvements" name="improvements" rows={3} className={field} />
          </div>
        </div>
      ) : null}

      {buying && !compact ? (
        <div className="space-y-6 border-l-2 border-blue pl-5">
          <div>
            <p className="font-display text-xl text-ink">What you are looking for</p>
          </div>
          <Chips name="preapproval" legend="Financing" options={PREAPPROVAL} value={preapproval} onChange={setPreapproval} hint="Started the process counts. I can help with the rest." />
          <div>
            <label htmlFor="cf-location" className={label}>
              Where
            </label>
            <p className="mt-1 text-sm/6 text-ink-soft">A town, a side of the state line, or a few neighborhoods. Rough is fine.</p>
            <input id="cf-location" name="location" type="text" placeholder="Rock Hill, Fort Mill, south Charlotte" className={field} />
          </div>
          <Chips name="priceBand" legend="Price range" options={PRICE_BANDS} value={priceBand} onChange={setPriceBand} />
        </div>
      ) : null}

      {role ? <Chips name="timeline" legend="When" options={TIMELINES} value={timeline} onChange={setTimeline} /> : null}

      {compact && role ? (
        <p className="text-sm/6 text-ink-soft">
          Want to go deeper? The{' '}
          {buying ? (
            <a href="/buyers/#questionnaire" className="tap text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
              buyer questionnaire
            </a>
          ) : null}
          {buying && selling ? ' and the ' : null}
          {selling ? (
            <a href="/sellers/#questionnaire" className="tap text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
              seller questionnaire
            </a>
          ) : null}{' '}
          {buying && selling ? 'take' : 'takes'} four minutes and {buying && selling ? 'set' : 'sets'} up the first call properly.
        </p>
      ) : null}

      <div>
        <label htmlFor="cf-message" className={label}>
          Anything else I should know? <span className="font-normal text-ink-faint">(optional)</span>
        </label>
        <textarea id="cf-message" name="message" rows={compact ? 3 : 4} className={field} />
      </div>

      {/* Honeypot. Bots fill it; people never see it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'not-connected' ? (
        <p className="border-l-2 border-pink pl-4 text-sm/6 text-ink-soft">
          The form is not connected yet. Call or text{' '}
          <a href={`tel:${business.phoneE164}`} className="tap text-ink underline decoration-ink/25 underline-offset-4 figure">
            {business.phone}
          </a>{' '}
          or email{' '}
          <a href={`mailto:${business.email}`} className="tap text-ink underline decoration-ink/25 underline-offset-4">
            {business.email}
          </a>
          .
        </p>
      ) : null}
      {state.status === 'error' ? <p className="border-l-2 border-pink pl-4 text-sm/6 text-ink-soft">{state.message}</p> : null}

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button type="submit" disabled={busy}>
          {busy ? 'Sending' : 'Send to Candace'}
        </Button>
        <a href={`tel:${business.phoneE164}`} className="tap text-sm/6 text-ink-soft hover:text-ink figure">
          Or call or text {business.phone}
        </a>
      </div>
      <p className="text-xs/5 text-ink-faint">
        No booking, no calendar. I read every one of these myself and reach out the same day when I can.
      </p>
    </form>
  )
}
