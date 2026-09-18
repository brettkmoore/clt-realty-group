import type { Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { ClosingAsk } from '@/components/ClosingAsk'
import { SchemaGraph } from '@/components/SchemaGraph'
import { breadcrumb } from '@/lib/schema'
import { agent, business, tagline } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Candace L. Thompson, MBA',
  description:
    'Candace L. Thompson, MBA, is a Rock Hill native with Keller Williams Connected in Fort Mill, licensed in South Carolina and North Carolina, selling homes across Charlotte and the towns around it. Here is who she is and how she works.',
  alternates: { canonical: '/about/' },
}

const CREDENTIALS = [
  ...business.licenses.map((l) => ({ name: `${l.state} real estate license`, detail: `${l.commission}, ${l.number}` })),
  { name: 'Brokerage', detail: `${business.brokerage.name}, ${business.brokerage.address}` },
  { name: 'Education', detail: `Master of Business Administration. Undergraduate degree, ${agent.alumniOf}.` },
  { name: 'REALTOR®', detail: 'Member of the National Association of REALTORS® and bound by its Code of Ethics' },
  { name: 'Community', detail: agent.memberships[0] },
]

/**
 * Tailwind Plus, Content sections, "With image on the left" (React,
 * v4.3): the biography beside the headshot, the photograph a plain
 * rectangle, then the credentials as a definition list set as type.
 */
export default function AboutPage() {
  return (
    <>
      <SchemaGraph nodes={[breadcrumb([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])]} />

      <div className="bg-field px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-4">
            <Image
              src={agent.headshot}
              alt={agent.headshotAlt}
              width={agent.headshotWidth}
              height={agent.headshotHeight}
              sizes="(min-width: 1024px) 360px, 100vw"
              priority
              className="w-full max-w-sm lg:sticky lg:top-[calc(var(--nav-h)+2rem)]"
            />
          </div>
          <div className="max-w-3xl lg:col-span-8">
            <p className="text-base/7 font-semibold text-blue">About</p>
            <h1 className="mt-2 font-display text-[2.5rem]/[1.05] text-pretty text-ink sm:text-5xl/[1.05] lg:text-6xl/[1.04]">
              I am Candace L. Thompson, and I sell homes where I grew up.
            </h1>
            <p className="mt-8 text-xl/8 text-ink sm:text-2xl/9">{tagline}</p>
            <div className="mt-10 max-w-2xl space-y-6 text-lg/8 text-ink-soft">
              <p>
                I was born and raised in Rock Hill, South Carolina, and I live there now. My office is Keller Williams
                Connected in Fort Mill, on the north side of town near the Charlotte line, and I sell the Charlotte
                market and the South Carolina towns around it. I hold licenses in both states because my clients do
                not stop at the state line, and neither does the math on where to buy.
              </p>
              <p>
                I did my undergraduate degree at the University of South Carolina in Columbia, which is why my market
                still reaches that far south when a client needs it to, and I earned my MBA online while I was working.
                For years real estate was the job I did alongside another one. A client I had just closed with heard
                me say I had to get to my other job and could not believe it. He said he had felt like my only client
                every time he called. That is still the standard I hold myself to, and now I do this full time.
              </p>
              <p>
                I have sold through a recession and through a pandemic. The recession is where I learned to tell
                clients to stay inside a payment they can carry when life changes, because I sat with people who did
                not. The pandemic is where I learned that when a family has to move regardless of the market, the job
                is to keep going and adapt rather than wait for the world to make sense again.
              </p>
              <p>
                The line on my homepage is one I have said to clients for years. Home is the one place where nobody
                is judging you, where you can rest and be yourself and feel safe enough to plan the rest of your life.
                Your home should be your sanctuary. Finding that for a buyer, or selling one with the care it deserves,
                is the whole job.
              </p>
              <h2 className="mt-16 font-display text-3xl text-ink">CLT Realty Group is one person.</h2>
              <p>
                CLT are my initials, and by coincidence the airport code for Charlotte. When you hire CLT Realty Group
                you get me: my phone, my showings, my negotiation, my walkthrough on your new build. The logo carries
                the Charlotte skyline on one side and South Carolina&rsquo;s palmetto and crescent on the other, because
                that is exactly where I work.
              </p>
              <h2 className="mt-16 font-display text-3xl text-ink">Community</h2>
              <p>
                I am a member of Alpha Kappa Alpha Sorority, Incorporated, through the Omega Tau Omega graduate chapter
                in Fort Mill. Our chapter&rsquo;s work runs on national targets that come around every four years, and
                they always center on family, children, the environment, wealth building and uplifting the community.
                That last pair is the reason I describe my business as bridging the wealth gap and building the
                community one house at a time. The events I host, like the brunch and bouquet afternoon my past clients
                still write about in their reviews, come from the same place.
              </p>
              <p>
                I also run a YouTube channel about living in and moving to the Charlotte area. If you are relocating
                from out of state, that is a good place to start before we talk.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-rule bg-field py-24 sm:py-32">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-5">
              <p className="text-base/7 font-semibold text-blue">Credentials</p>
              <h2 className="mt-2 font-display text-[2.25rem]/[1.1] text-ink sm:text-5xl/[1.05]">Licenses, brokerage and education.</h2>
            </div>
            <dl className="mt-10 divide-y divide-rule border-y border-rule lg:col-span-7 lg:mt-0">
              {CREDENTIALS.map((c) => (
                <div key={c.name} className="grid gap-x-8 py-4 sm:grid-cols-2">
                  <dt className="text-ink">{c.name}</dt>
                  <dd className="text-ink-soft">{c.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <ClosingAsk heading="If that sounds like the help you need, call me." secondaryHref="/stories/" secondaryLabel="Read the stories first" />
    </>
  )
}
