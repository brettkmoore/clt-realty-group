'use client'

import { useMemo, useState } from 'react'
import { clsx } from 'clsx'

import { Button } from '@/components/Button'
import { business } from '@/lib/site'

/**
 * ===================================================================
 *  THE QUESTIONNAIRE ENGINE. INLINE, NATIVE, IN HER TYPE AND COLOR.
 * ===================================================================
 *
 * Brett, 2026-09-18: Becca's and Buddy's questionnaires push people out
 * to JotForm in a new tab. Candace's live on her own site. This one
 * component renders both the buyers and the sellers questionnaire from
 * a config (src/content/questionnaires.ts): steps, fields, and `show`
 * predicates for progressive disclosure, so a buyer never sees a seller
 * question and a seller who is not buying never sees the buyer block.
 *
 * Principles applied: tappable choices wherever a sensible option set
 * exists, typed fields only where they must be (an address), one open
 * box at the end, progress shown, inline validation on Next rather than
 * on submit, a real label on every field, contact capture as the last
 * step, and a result state that always offers the next step. Every
 * submission goes to /api/contact/ and from there through the single
 * lead handler.
 */
export type Field =
  | { kind: 'chips'; name: string; label: string; options: string[]; hint?: string; required?: boolean; multi?: boolean }
  | { kind: 'text'; name: string; label: string; hint?: string; placeholder?: string; required?: boolean; autoComplete?: string; inputMode?: 'text' | 'numeric' | 'tel' | 'email' }
  | { kind: 'textarea'; name: string; label: string; hint?: string; required?: boolean }

export type Step = {
  id: string
  title: string
  intro?: string
  fields: Field[]
  /** Return false to skip the step or hide the field for the current answers. */
  show?: (answers: Answers) => boolean
}

export type Answers = Record<string, string | string[]>

export type QuestionnaireConfig = {
  source: string
  role: 'buying' | 'selling'
  eyebrow: string
  title: string
  intro: string
  steps: Step[]
  /** Shown on the result screen. */
  thanks: { title: string; body: string }
}

const inputClass =
  'mt-2 block w-full bg-field px-3.5 py-2.5 text-base text-ink outline-1 -outline-offset-1 outline-rule placeholder:text-ink-faint focus:outline-2 focus:-outline-offset-2 focus:outline-ink aria-[invalid=true]:outline-pink'
const labelClass = 'block text-sm/6 font-semibold text-ink'

function isEmpty(v: string | string[] | undefined) {
  return v == null || v === '' || (Array.isArray(v) && v.length === 0)
}

const CONTACT_STEP: Step = {
  id: 'contact',
  title: 'Where should I reach you?',
  intro: 'No booking calendar. I read every one of these myself and call or text at a time I know I am free.',
  fields: [
    { kind: 'text', name: 'firstName', label: 'First name', required: true, autoComplete: 'given-name' },
    { kind: 'text', name: 'lastName', label: 'Last name', required: true, autoComplete: 'family-name' },
    { kind: 'text', name: 'email', label: 'Email', required: true, autoComplete: 'email', inputMode: 'email' },
    { kind: 'text', name: 'phone', label: 'Phone', required: true, autoComplete: 'tel', inputMode: 'tel' },
    { kind: 'chips', name: 'preferredContact', label: 'Best way to reach you', options: ['Text', 'Call', 'Email'] },
  ],
}

function validate(field: Field, value: string | string[] | undefined): string | null {
  if (field.required && isEmpty(value)) return field.kind === 'chips' ? 'Pick one to continue.' : 'Needed to continue.'
  if (field.kind === 'text' && typeof value === 'string' && value) {
    if (field.inputMode === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'That email does not look right.'
    if (field.inputMode === 'tel' && value.replace(/\D/g, '').length < 10) return 'A ten digit phone number, please.'
  }
  return null
}

export function Questionnaire({ config }: { config: QuestionnaireConfig }) {
  const [answers, setAnswers] = useState<Answers>({})
  const [stepIndex, setStepIndex] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'not-connected' | 'error'>('idle')

  const steps = useMemo(() => [...config.steps.filter((s) => !s.show || s.show(answers)), CONTACT_STEP], [config.steps, answers])
  const step = steps[Math.min(stepIndex, steps.length - 1)]
  const isLast = stepIndex >= steps.length - 1
  const progress = ((stepIndex + 1) / steps.length) * 100

  function set(name: string, value: string | string[]) {
    setAnswers((a) => ({ ...a, [name]: value }))
    setErrors((e) => {
      if (!e[name]) return e
      const next = { ...e }
      delete next[name]
      return next
    })
  }

  function checkStep(): boolean {
    const next: Record<string, string> = {}
    for (const f of step.fields) {
      const msg = validate(f, answers[f.name])
      if (msg) next[f.name] = msg
    }
    setErrors(next)
    if (Object.keys(next).length) {
      const first = document.getElementById(`${config.source}-${Object.keys(next)[0]}`)
      first?.focus()
      return false
    }
    return true
  }

  function onNext() {
    if (!checkStep()) return
    setStepIndex((i) => i + 1)
    document.getElementById(`${config.source}-top`)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!checkStep()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, role: answers.role ?? config.role, source: config.source }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      setStatus(json.ok ? 'sent' : json.error === 'not-connected' ? 'not-connected' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div id={`${config.source}-top`} className="scroll-mt-24 border-t border-rule pt-10">
        <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">Sent</p>
        <h3 className="mt-3 font-display text-3xl text-ink">{config.thanks.title}</h3>
        <p className="mt-4 max-w-2xl text-lg/8 text-ink-soft">{config.thanks.body}</p>
        <p className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={`tel:${business.phoneE164}`}>Call or text {business.phone}</Button>
          <Button variant="quiet" href="/stories/">
            Read the stories meanwhile
          </Button>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate id={`${config.source}-top`} className="scroll-mt-24">
      <div className="flex items-baseline justify-between gap-x-6">
        <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">
          Step {stepIndex + 1} of {steps.length}
        </p>
        <p className="text-sm/6 text-ink-faint">{isLast ? 'Last step' : `${steps.length - stepIndex - 1} more after this`}</p>
      </div>
      <div className="mt-3 h-1 bg-rule" aria-hidden="true">
        <div className="h-1 bg-pink transition-[width] duration-500" style={{ width: `${progress}%` }} />
      </div>

      <fieldset className="mt-10">
        <legend className="font-display text-[1.75rem]/[1.2] text-ink sm:text-3xl">{step.title}</legend>
        {step.intro ? <p className="mt-3 max-w-2xl text-base/7 text-ink-soft">{step.intro}</p> : null}
        <div className="mt-8 space-y-8">
          {step.fields.map((f) => {
            const id = `${config.source}-${f.name}`
            const err = errors[f.name]
            const value = answers[f.name]
            if (f.kind === 'chips') {
              const selected = f.multi ? ((value as string[] | undefined) ?? []) : value
              return (
                <fieldset key={f.name} aria-describedby={err ? `${id}-err` : undefined}>
                  <legend className={labelClass}>
                    {f.label} {f.required ? null : <span className="font-normal text-ink-faint">(optional)</span>}
                  </legend>
                  {f.hint ? <p className="mt-1 text-sm/6 text-ink-soft">{f.hint}</p> : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {f.options.map((o, i) => {
                      const checked = f.multi ? (selected as string[]).includes(o) : selected === o
                      return (
                        <label
                          key={o}
                          className={clsx(
                            'cursor-pointer select-none border px-4 py-2.5 text-sm/6 transition-colors',
                            checked ? 'border-blue bg-blue text-cream' : 'border-rule bg-field text-ink hover:border-ink',
                            'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink',
                          )}
                        >
                          <input
                            id={i === 0 ? id : undefined}
                            type={f.multi ? 'checkbox' : 'radio'}
                            name={f.name}
                            value={o}
                            checked={checked}
                            onChange={() => {
                              if (f.multi) {
                                const cur = selected as string[]
                                set(f.name, cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o])
                              } else set(f.name, o)
                            }}
                            className="sr-only"
                          />
                          {o}
                        </label>
                      )
                    })}
                  </div>
                  {err ? (
                    <p id={`${id}-err`} className="mt-2 text-sm/6 text-pink">
                      {err}
                    </p>
                  ) : null}
                </fieldset>
              )
            }
            if (f.kind === 'textarea') {
              return (
                <div key={f.name}>
                  <label htmlFor={id} className={labelClass}>
                    {f.label} {f.required ? null : <span className="font-normal text-ink-faint">(optional)</span>}
                  </label>
                  {f.hint ? <p className="mt-1 text-sm/6 text-ink-soft">{f.hint}</p> : null}
                  <textarea id={id} name={f.name} rows={4} value={(value as string) ?? ''} onChange={(e) => set(f.name, e.target.value)} aria-invalid={Boolean(err)} aria-describedby={err ? `${id}-err` : undefined} className={inputClass} />
                  {err ? (
                    <p id={`${id}-err`} className="mt-2 text-sm/6 text-pink">
                      {err}
                    </p>
                  ) : null}
                </div>
              )
            }
            return (
              <div key={f.name}>
                <label htmlFor={id} className={labelClass}>
                  {f.label} {f.required ? null : <span className="font-normal text-ink-faint">(optional)</span>}
                </label>
                {f.hint ? <p className="mt-1 text-sm/6 text-ink-soft">{f.hint}</p> : null}
                <input
                  id={id}
                  name={f.name}
                  type={f.inputMode === 'email' ? 'email' : f.inputMode === 'tel' ? 'tel' : 'text'}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  value={(value as string) ?? ''}
                  onChange={(e) => set(f.name, e.target.value)}
                  onBlur={() => {
                    const msg = validate(f, answers[f.name])
                    setErrors((e) => (msg ? { ...e, [f.name]: msg } : e))
                  }}
                  aria-invalid={Boolean(err)}
                  aria-describedby={err ? `${id}-err` : undefined}
                  className={inputClass}
                />
                {err ? (
                  <p id={`${id}-err`} className="mt-2 text-sm/6 text-pink">
                    {err}
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>
      </fieldset>

      {status === 'not-connected' ? (
        <p className="mt-8 border-l-2 border-pink pl-4 text-sm/6 text-ink-soft">
          The form is not connected yet, so nothing was sent. Call or text{' '}
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
      {status === 'error' ? <p className="mt-8 border-l-2 border-pink pl-4 text-sm/6 text-ink-soft">That did not go through. Call or text {business.phone}.</p> : null}

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        {isLast ? (
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending' : 'Send to Candace'}
          </Button>
        ) : (
          <Button type="button" onClick={onNext}>
            Next
          </Button>
        )}
        {stepIndex > 0 ? (
          <button type="button" onClick={() => setStepIndex((i) => i - 1)} className="tap text-sm/6 text-ink-soft underline decoration-ink/25 underline-offset-4 hover:text-ink">
            Back
          </button>
        ) : null}
        <a href={`tel:${business.phoneE164}`} className="tap text-sm/6 text-ink-soft hover:text-ink figure">
          Or call or text {business.phone}
        </a>
      </div>
    </form>
  )
}
