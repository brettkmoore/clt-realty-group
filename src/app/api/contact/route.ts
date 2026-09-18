import { NextResponse } from 'next/server'

/**
 * The contact form's endpoint. It forwards the submission as JSON to
 * CONTACT_WEBHOOK_URL, which is expected to be a GoHighLevel inbound
 * webhook for the Deborah Rose Miller Real Estate Group sub-account. Until
 * that variable is set, it answers honestly that the form is not connected
 * and the page shows the phone number and email instead. Nothing is
 * silently dropped.
 */
export async function POST(request: Request) {
  const webhook = process.env.CONTACT_WEBHOOK_URL
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not read the form.' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const intent = String(body.intent ?? '').trim()
  const message = String(body.message ?? '').trim()
  const honeypot = String(body.company ?? '').trim()

  if (honeypot) return NextResponse.json({ ok: true })
  if (!name || (!email && !phone)) {
    return NextResponse.json({ ok: false, error: 'A name and either an email or a phone number are needed.' }, { status: 400 })
  }

  if (!webhook) {
    return NextResponse.json(
      { ok: false, error: 'not-connected' },
      { status: 503 },
    )
  }

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      phone,
      intent,
      message,
      source: 'cltrealtygroup.net contact form',
      submittedAt: new Date().toISOString(),
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: 'The message could not be delivered.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
