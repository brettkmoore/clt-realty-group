import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SchemaGraph } from '@/components/SchemaGraph'
import { agentNode, brokerageNode, franchisorNode, headshotNode, personNode, websiteNode } from '@/lib/schema'
import { agent, business, siteUrl, HIDE_FROM_SEARCH_ENGINES } from '@/lib/site'

import '@/styles/tailwind.css'

/*
 * Fraunces for headings: a warm, soft serif that reads as comfort rather
 * than authority, which is the brand. DM Sans for everything else.
 */
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--font-fraunces',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name}. Candace L. Thompson, MBA. Rock Hill, Fort Mill, Charlotte and the Carolina towns around them.`,
    template: `%s · ${business.name}`,
  },
  description: business.description,
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: business.name,
    title: `${business.name}. Candace L. Thompson, MBA.`,
    description: business.description,
    images: [{ url: agent.headshot, width: agent.headshotWidth, height: agent.headshotHeight, alt: agent.headshotAlt }],
  },
  twitter: { card: 'summary_large_image' },
  robots: HIDE_FROM_SEARCH_ENGINES ? { index: false, follow: false } : { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${fraunces.variable} ${dmSans.variable}`}>
      <body className="flex min-h-full flex-col bg-field font-sans text-ink">
        <SchemaGraph nodes={[websiteNode(), agentNode(), personNode(), headshotNode(), brokerageNode(), franchisorNode()]} />
        <Navbar />
        <main className="flex-auto">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
