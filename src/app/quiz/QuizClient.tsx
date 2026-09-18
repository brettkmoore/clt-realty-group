'use client'

import { useState } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'

import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { business } from '@/lib/site'
import { buyerQuestions, sellerQuestions, tiers, type Path } from '@/content/quiz'

type Phase = 'welcome' | 'path' | 'quiz' | 'result'
type Track = 'buying' | 'selling' | 'both' | 'investor' | 'curious'

const field =
  'mt-2 block w-full bg-field px-3.5 py-2.5 text-base text-ink outline-1 -outline-offset-1 outline-rule placeholder:text-ink-faint focus:outline-2 focus:-outline-offset-2 focus:outline-ink'
const label = 'block text-sm/6 font-semibold text-ink'

/**
 * Intro with the path choice, six scenarios with an explanation after
 * each answer, a result tier, then contact capture that posts the score
 * and every answer to /api/contact alongside the details. Nobody fails;
 * every tier lands on the same next step.
 */
export function QuizClient() {
  const [phase, setPhase] = useState<Phase>('welcome')
  const [path, setPath] = useState<Path>('buying')
  const [track, setTrack] = useState<Track>('buying')
  const [nickname, setNickname] = useState('')
  const [capErrors, setCapErrors] = useState<Record<string, string>>({})
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<{ scenario: string; picked: string; correct: boolean }[]>([])
  const [sent, setSent] = useState<'idle' | 'sending' | 'sent' | 'not-connected' | 'error'>('idle')

  const questions = path === 'selling' ? sellerQuestions : buyerQuestions
  const q = questions[index]
  const score = answers.filter((a) => a.correct).length
  const tier = [...tiers].reverse().find((t) => score >= t.min) ?? tiers[0]

  /* Buddy Buck's five doors. Selling takes the seller set; every other door takes the buyer set. */
  const TRACKS: [Track, string, string][] = [
    ['selling', 'Selling', 'The expired listing, the low appraisal, pricing for the weakest room.'],
    ['buying', 'Buying', 'Pre-approval, buying from afar, the second negotiation, the state line.'],
    ['both', 'Both', 'Selling one and buying the next. Start with the buyer set.'],
    ['investor', 'Investing', 'A rental, a duplex, a portfolio. The buyer set, with the title problem in it.'],
    ['curious', 'Just curious', 'Shopping for an agent, or just want to see how you do.'],
  ]

  function start(t: Track) {
    setTrack(t)
    setPath(t === 'selling' ? 'selling' : 'buying')
    setIndex(0)
    setPicked(null)
    setAnswers([])
    setPhase('quiz')
  }

  function retake(p: Path) {
    setPath(p)
    setIndex(0)
    setPicked(null)
    setAnswers([])
    setPhase('quiz')
  }

  function answer(i: number) {
    if (picked !== null) return
    setPicked(i)
    setAnswers((a) => [...a, { scenario: q.scenario, picked: q.choices[i].text, correct: Boolean(q.choices[i].correct) }])
  }

  function next() {
    if (index < questions.length - 1) {
      setIndex(index + 1)
      setPicked(null)
    } else {
      setPhase('result')
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>
    const errs: Record<string, string> = {}
    if (!data.firstName?.trim()) errs.firstName = 'Needed to continue.'
    if (!data.lastName?.trim()) errs.lastName = 'Needed to continue.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? '')) errs.email = 'That email does not look right.'
    if ((data.phone ?? '').replace(/\D/g, '').length < 10) errs.phone = 'A ten digit phone number, please.'
    setCapErrors(errs)
    if (Object.keys(errs).length) return
    setSent('sending')
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, role: track, source: 'quiz', quizScore: `${score} of ${questions.length}`, quizTier: tier.title, quizAnswers: answers }),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      setSent(json.ok ? 'sent' : json.error === 'not-connected' ? 'not-connected' : 'error')
    } catch {
      setSent('error')
    }
  }

  const progress = phase === 'result' ? 100 : phase === 'quiz' ? ((index + (picked !== null ? 1 : 0)) / questions.length) * 100 : phase === 'path' ? 4 : 0

  return (
    <>
      <section className="bg-night py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="text-[13px] font-semibold tracking-[0.1em] uppercase text-cream/70">Real Estate IQ Quiz</p>
            <h1 className="mt-4 font-display text-[2.25rem]/[1.06] text-cream sm:text-5xl/[1.04]">Six moments from my own closings. What would you do?</h1>
            <p className="mt-5 text-lg/8 text-cream/85">
              Every scenario is one I actually handled, in Rock Hill, Charlotte, Waxhaw or Mooresville. Pick what you
              would do and I will tell you what worked. About four minutes, and it ends with where you are in the
              process.
            </p>
          </div>
        </Container>
      </section>
      <div className="h-1 bg-rule" aria-hidden="true">
        <div className="h-1 bg-pink transition-[width] duration-500" style={{ width: `${progress}%` }} />
      </div>

      {phase === 'welcome' ? (
        <section className="py-16 sm:py-24">
          <Container>
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl text-ink">Think buying or selling a house is not that hard?</h2>
              <p className="mt-3 text-base/7 text-ink-soft">
                Six real scenarios. Pick what you would do. I will tell you what actually worked, and at the end,
                where you are in the process. Nobody fails this. Everybody learns which moment would have cost them.
              </p>
              <form
                className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  setPhase('path')
                }}
              >
                <div className="w-full max-w-xs">
                  <label htmlFor="quiz-nickname" className={label}>
                    What should I call you? <span className="font-normal text-ink-faint">(optional)</span>
                  </label>
                  <input id="quiz-nickname" name="nickname" type="text" autoComplete="given-name" value={nickname} onChange={(e) => setNickname(e.target.value)} className={`${field} aria-[invalid=true]:outline-pink`} />
                </div>
                <Button type="submit">Let&rsquo;s go</Button>
              </form>
            </div>
          </Container>
        </section>
      ) : null}

      {phase === 'path' ? (
        <section className="py-16 sm:py-24">
          <Container>
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl text-ink">{nickname ? `${nickname}, are` : 'Are'} you buying, selling, or both?</h2>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {TRACKS.map(([t, title, detail]) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => start(t)}
                    className="border border-rule bg-field p-6 text-left transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <span className="block font-display text-2xl text-ink">{title}</span>
                    <span className="mt-2 block text-sm/6 text-ink-soft">{detail}</span>
                    <span className="mt-4 block text-[13px] font-semibold tracking-[0.14em] uppercase text-blue">Start</span>
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {phase === 'quiz' ? (
        <section className="py-16 sm:py-24">
          <Container>
            <div className="max-w-2xl">
              <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">
                Question {index + 1} of {questions.length}
              </p>
              <h2 className="mt-4 font-display text-2xl/[1.25] text-ink sm:text-3xl/[1.2]">{q.scenario}</h2>
              <div className="mt-8 space-y-3">
                {q.choices.map((c, i) => {
                  const revealed = picked !== null
                  const isPicked = picked === i
                  return (
                    <button
                      key={c.text}
                      type="button"
                      disabled={revealed}
                      onClick={() => answer(i)}
                      className={clsx(
                        'flex w-full items-start gap-x-4 border p-4 text-left text-base/7 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
                        !revealed && 'border-rule bg-field text-ink hover:border-ink',
                        revealed && c.correct && 'border-blue bg-blue-soft text-ink',
                        revealed && isPicked && !c.correct && 'border-pink bg-pink-soft text-ink',
                        revealed && !isPicked && !c.correct && 'border-rule text-ink-faint',
                      )}
                    >
                      <span className="mt-0.5 font-display text-lg text-ink-faint">{String.fromCharCode(65 + i)}</span>
                      <span>{c.text}</span>
                    </button>
                  )
                })}
              </div>
              {picked !== null ? (
                <div className="mt-8 border-l-2 border-blue pl-5">
                  <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">{q.choices[picked].correct ? 'That is what I did' : 'Here is what actually worked'}</p>
                  <p className="mt-2 text-base/7 text-ink-soft">{q.explanation}</p>
                  <p className="mt-6">
                    <Button type="button" onClick={next}>
                      {index < questions.length - 1 ? 'Next question' : 'See where you stand'}
                    </Button>
                  </p>
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {phase === 'result' ? (
        <section className="py-16 sm:py-24">
          <Container>
            <div className="max-w-2xl">
              <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">
                {score} of {questions.length}
              </p>
              <h2 className="mt-4 font-display text-[2rem]/[1.1] text-ink sm:text-4xl/[1.1]">{nickname ? `${nickname}: ${tier.title.charAt(0).toLowerCase()}${tier.title.slice(1)}` : tier.title}</h2>
              <p className="mt-5 text-lg/8 text-ink-soft">{tier.body}</p>

              {sent === 'sent' ? (
                <div className="mt-10 border-t border-rule pt-8">
                  <p className="font-display text-2xl text-ink">Got it. I will reach out shortly.</p>
                  <p className="mt-3 text-base/7 text-ink-soft">
                    In the meantime,{' '}
                    <Link href="/stories/" className="tap text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                      the stories behind these questions
                    </Link>{' '}
                    are all on the site.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="mt-10 space-y-6 border-t border-rule pt-8">
                  <div>
                    <h3 className="font-display text-2xl text-ink">Tell me where to reach you and I will follow up on your answers.</h3>
                    <p className="mt-2 text-sm/6 text-ink-soft">No booking calendar. I call or text at a time I know I am free.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="q-first" className={label}>First name</label>
                      <input id="q-first" name="firstName" aria-invalid={Boolean(capErrors.firstName)} aria-describedby={capErrors.firstName ? 'q-first-err' : undefined} type="text" autoComplete="given-name" required className={`${field} aria-[invalid=true]:outline-pink`} />
                      {capErrors.firstName ? <p id="q-first-err" className="mt-2 text-sm/6 text-pink">{capErrors.firstName}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="q-last" className={label}>Last name</label>
                      <input id="q-last" name="lastName" aria-invalid={Boolean(capErrors.lastName)} aria-describedby={capErrors.lastName ? 'q-last-err' : undefined} type="text" autoComplete="family-name" required className={`${field} aria-[invalid=true]:outline-pink`} />
                      {capErrors.lastName ? <p id="q-last-err" className="mt-2 text-sm/6 text-pink">{capErrors.lastName}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="q-email" className={label}>Email</label>
                      <input id="q-email" name="email" aria-invalid={Boolean(capErrors.email)} aria-describedby={capErrors.email ? 'q-email-err' : undefined} type="email" autoComplete="email" inputMode="email" required className={`${field} aria-[invalid=true]:outline-pink`} />
                      {capErrors.email ? <p id="q-email-err" className="mt-2 text-sm/6 text-pink">{capErrors.email}</p> : null}
                    </div>
                    <div>
                      <label htmlFor="q-phone" className={label}>Phone</label>
                      <input id="q-phone" name="phone" aria-invalid={Boolean(capErrors.phone)} aria-describedby={capErrors.phone ? 'q-phone-err' : undefined} type="tel" autoComplete="tel" inputMode="tel" required className={`${field} aria-[invalid=true]:outline-pink`} />
                      {capErrors.phone ? <p id="q-phone-err" className="mt-2 text-sm/6 text-pink">{capErrors.phone}</p> : null}
                    </div>
                  </div>
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="q-company">Company</label>
                    <input id="q-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  {sent === 'not-connected' ? (
                    <p className="border-l-2 border-pink pl-4 text-sm/6 text-ink-soft">
                      The form is not connected yet. Call or text{' '}
                      <a href={`tel:${business.phoneE164}`} className="tap text-ink underline decoration-ink/25 underline-offset-4 figure">{business.phone}</a>.
                    </p>
                  ) : null}
                  {sent === 'error' ? <p className="border-l-2 border-pink pl-4 text-sm/6 text-ink-soft">That did not go through. Call or text {business.phone}.</p> : null}
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Button type="submit" disabled={sent === 'sending'}>{sent === 'sending' ? 'Sending' : 'Send to Candace'}</Button>
                    <a href={`tel:${business.phoneE164}`} className="tap text-sm/6 text-ink-soft hover:text-ink figure">Or call or text {business.phone}</a>
                    <button type="button" onClick={() => retake(path === 'buying' ? 'selling' : 'buying')} className="tap text-sm/6 text-ink-soft underline decoration-ink/25 underline-offset-4 hover:text-ink">
                      Take the {path === 'buying' ? 'seller' : 'buyer'} set
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
