import { NextResponse } from 'next/server'

import { deliverLead, type Lead } from '@/lib/leads'

/**
 * Every form on the site posts here. Validation, the honeypot, then
 * deliverLead(), which owns the destination (src/lib/leads.ts).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not read the form.' }, { status: 400 })
  }
  const firstName = String(body.firstName ?? body.name ?? '').trim()
  const lastName = String(body.lastName ?? '').trim()
  const email = String(body.email ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const honeypot = String(body.company ?? '').trim()
  if (honeypot) return NextResponse.json({ ok: true })
  if (!firstName || (!email && !phone)) {
    return NextResponse.json({ ok: false, error: 'A name and either an email or a phone number are needed.' }, { status: 400 })
  }
  const { company: _company, ...rest } = body
  void _company
  const lead: Lead = { ...rest, firstName, lastName, email, phone, source: String(body.source ?? 'form'), site: 'cltrealtygroup.net', submittedAt: new Date().toISOString() }
  const result = await deliverLead(lead)
  if (result.ok) return NextResponse.json({ ok: true })
  if (result.reason === 'not-connected') return NextResponse.json({ ok: false, error: 'not-connected' }, { status: 503 })
  console.error('[lead] delivery failed:', result.detail)
  return NextResponse.json({ ok: false, error: 'The message could not be delivered.' }, { status: 502 })
}
