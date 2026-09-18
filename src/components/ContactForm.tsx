'use client'

import { useState } from 'react'

import { Button } from '@/components/Button'
import { business } from '@/lib/site'

/* The component's field styles, squared: outline-1 on rule, outline-2 on ink when focused. */
const field =
  'mt-2.5 block w-full bg-field px-3.5 py-2 text-base text-ink outline-1 -outline-offset-1 outline-rule placeholder:text-ink-faint focus:outline-2 focus:-outline-offset-2 focus:outline-ink'
const label = 'block text-sm/6 font-semibold text-ink'

type State = { status: 'idle' | 'sending' | 'sent' | 'not-connected' | 'error'; message?: string }

/**
 * Posts to /api/contact. When the endpoint is not connected yet the form
 * says so and hands the visitor the phone number instead of pretending.
 */
export function ContactForm() {
  const [state, setState] = useState<State>({ status: 'idle' })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setState({ status: 'sending' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
        <p className="font-display text-2xl text-ink">Sent. I will be in touch.</p>
        <p className="mt-3 text-base/7 text-ink-soft">
          If it is urgent, call or text{' '}
          <a href={`tel:${business.phoneE164}`} className="tap text-ink underline decoration-ink/25 underline-offset-4 figure">
            {business.phone}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" required className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="intent" className={label}>
            I am thinking about
          </label>
          <select id="intent" name="intent" className={field} defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            <option value="buying">Buying</option>
            <option value="selling">Selling</option>
            <option value="both">Selling and buying</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            What you are trying to do, and when
          </label>
          <textarea id="message" name="message" rows={5} className={field} />
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {state.status === 'not-connected' ? (
        <p className="mt-6 text-base/7 text-ink" role="status">
          This form is not connected yet. Call or text{' '}
          <a href={`tel:${business.phoneE164}`} className="tap underline decoration-ink/25 underline-offset-4 figure">
            {business.phone}
          </a>{' '}
          or email{' '}
          <a href={`mailto:${business.email}`} className="tap underline decoration-ink/25 underline-offset-4">
            {business.email}
          </a>
          .
        </p>
      ) : null}
      {state.status === 'error' ? (
        <p className="mt-6 text-base/7 text-ink" role="status">
          {state.message ?? 'The message could not be sent.'} Call or text{' '}
          <a href={`tel:${business.phoneE164}`} className="tap underline decoration-ink/25 underline-offset-4 figure">
            {business.phone}
          </a>
          .
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button type="submit" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending' : 'Send the note'}
        </Button>
        <p className="text-sm text-ink-faint">A name and either an email or a phone number is enough.</p>
      </div>
    </form>
  )
}
