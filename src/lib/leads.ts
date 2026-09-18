import 'server-only'

/**
 * ===================================================================
 *  ONE PLACE EVERY LEAD GOES THROUGH.
 * ===================================================================
 *
 * The contact pop-up, the /contact/ page, the buyers questionnaire, the
 * sellers questionnaire and the IQ quiz all post to /api/contact/, and
 * that route calls deliverLead(). The destination is chosen by one
 * environment variable, LEAD_DESTINATION, so moving from one system to
 * another is one change on Vercel and not four forms:
 *
 *   ghl-webhook   POST the lead to CONTACT_WEBHOOK_URL, an inbound
 *                 webhook trigger inside her GoHighLevel sub-account
 *                 (Automations, Workflows, trigger "Inbound Webhook").
 *                 Zero code on the GoHighLevel side beyond the workflow.
 *   ghl-api       Create the contact directly through the GoHighLevel
 *                 API using GHL_TOKEN (a Private Integration token for
 *                 her sub-account, scope contacts.write) and
 *                 GHL_LOCATION_ID. Fields land as contact fields; the
 *                 rest lands as a note on the contact.
 *   email         Send the lead as an email through Resend using
 *                 RESEND_API_KEY, LEAD_FROM and LEAD_TO. The fallback if
 *                 GoHighLevel is not ready.
 *   log           Write the lead to the server log only and report
 *                 "not connected" so the visitor is shown the phone
 *                 number. The default when nothing is configured.
 *                 It never pretends.
 *
 * Whatever the destination, the route answers { ok: true } only when
 * the lead actually landed somewhere a person will read it.
 */
export type Lead = Record<string, unknown> & {
  firstName: string
  lastName?: string
  email?: string
  phone?: string
  source?: string
}

export type Delivery = { ok: true } | { ok: false; reason: 'not-connected' | 'failed'; detail?: string }

const destination = (process.env.LEAD_DESTINATION ?? (process.env.CONTACT_WEBHOOK_URL ? 'ghl-webhook' : 'log')).trim()

function summarize(lead: Lead) {
  const skip = new Set(['firstName', 'lastName', 'email', 'phone', 'name', 'company'])
  return Object.entries(lead)
    .filter(([k, v]) => !skip.has(k) && v !== '' && v != null)
    .map(([k, v]) => `${k}: ${typeof v === 'string' ? v : JSON.stringify(v)}`)
    .join('\n')
}

async function toWebhook(lead: Lead): Promise<Delivery> {
  const url = process.env.CONTACT_WEBHOOK_URL
  if (!url) return { ok: false, reason: 'not-connected' }
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
  return res.ok ? { ok: true } : { ok: false, reason: 'failed', detail: `webhook ${res.status}` }
}

async function toGhlApi(lead: Lead): Promise<Delivery> {
  const token = process.env.GHL_TOKEN
  const locationId = process.env.GHL_LOCATION_ID
  if (!token || !locationId) return { ok: false, reason: 'not-connected' }
  const headers = { Authorization: `Bearer ${token}`, Version: '2021-07-28', 'Content-Type': 'application/json' }
  const res = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      locationId,
      firstName: lead.firstName,
      lastName: lead.lastName ?? '',
      email: lead.email || undefined,
      phone: lead.phone || undefined,
      address1: typeof lead.address === 'string' ? lead.address : undefined,
      source: `cltrealtygroup.net ${lead.source ?? 'form'}`,
      tags: ['website', String(lead.source ?? 'form'), String(lead.role ?? '')].filter(Boolean),
    }),
  })
  if (!res.ok) return { ok: false, reason: 'failed', detail: `ghl upsert ${res.status}` }
  const json = (await res.json()) as { contact?: { id?: string } }
  const id = json.contact?.id
  if (id) {
    await fetch(`https://services.leadconnectorhq.com/contacts/${id}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ body: `Website ${lead.source ?? 'form'} on ${new Date().toISOString()}\n\n${summarize(lead)}` }),
    }).catch(() => {})
  }
  return { ok: true }
}

async function toEmail(lead: Lead): Promise<Delivery> {
  const key = process.env.RESEND_API_KEY
  const to = process.env.LEAD_TO
  const from = process.env.LEAD_FROM ?? 'CLT Realty Group <leads@cltrealtygroup.net>'
  if (!key || !to) return { ok: false, reason: 'not-connected' }
  const name = `${lead.firstName} ${lead.lastName ?? ''}`.trim()
  const text = `${name}\n${lead.email ?? ''}\n${lead.phone ?? ''}\n\n${summarize(lead)}`
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: to.split(',').map((s) => s.trim()), reply_to: lead.email || undefined, subject: `New ${lead.source ?? 'website'} lead: ${name}`, text }),
  })
  return res.ok ? { ok: true } : { ok: false, reason: 'failed', detail: `resend ${res.status}` }
}

export async function deliverLead(lead: Lead): Promise<Delivery> {
  try {
    switch (destination) {
      case 'ghl-webhook':
        return await toWebhook(lead)
      case 'ghl-api':
        return await toGhlApi(lead)
      case 'email':
        return await toEmail(lead)
      default:
        console.warn('[lead] LEAD_DESTINATION is not set; the lead was logged and the visitor was told to call.')
        console.log('[lead]', JSON.stringify(lead))
        return { ok: false, reason: 'not-connected' }
    }
  } catch (err) {
    return { ok: false, reason: 'failed', detail: err instanceof Error ? err.message : 'unknown' }
  }
}
