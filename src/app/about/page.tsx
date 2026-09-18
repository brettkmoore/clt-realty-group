import type { Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { ClosingAsk } from '@/components/ClosingAsk'
import { FactList } from '@/components/FactList'
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
  ...business.licenses.map((l) => ({ label: `${l.state} real estate license`, value: `${l.commission}, ${l.number}` })),
  { label: 'Brokerage', value: `${business.brokerage.name}, ${business.brokerage.address}` },
  { label: 'Education', value: `Master of Business Administration. Undergraduate degree, ${agent.alumniOf}.` },
  { label: 'REALTOR®', value: 'Member of the National Association of REALTORS® and bound by its Code of Ethics' },
  { label: 'Community', value: agent.memberships[0] },
]

/**
 * The standard interior header structure with no video (Brett, 2026-09-18,
 * left it open; built without and raised in docs/open-items): eyebrow,
 * a small circular portrait beside the H1, the lead, all stacked on the
 * narrow measure. The biography follows below at full width, then the
 * credentials as a 40/60 definition list with hairlines.
 */
export default function AboutPage() {
  return (
    <>
      <SchemaGraph nodes={[breadcrumb([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])]} />

      <div className="bg-field py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="text-base/7 font-semibold text-blue">About</p>
            <div className="mt-4 flex items-start gap-x-6 sm:gap-x-8">
              <Image
                src={agent.headshot}
                alt={agent.headshotAlt}
                width={agent.headshotWidth}
                height={agent.headshotHeight}
                sizes="(min-width: 640px) 128px, 96px"
                priority
                className="size-24 shrink-0 rounded-full object-cover object-top ring-1 ring-rule sm:size-32"
              />
              <h1 className="font-display text-[2.5rem]/[1.05] text-pretty text-ink sm:text-5xl/[1.05] lg:text-6xl/[1.04]">
                I am Candace L. Thompson, and I sell homes where I grew up.
              </h1>
            </div>
            <p className="mt-8 text-xl/8 text-ink sm:text-2xl/9">{tagline}</p>
          </div>
        </Container>
      </div>

      <div className="bg-field pb-24 sm:pb-32">
        <Container>
          <div className="max-w-3xl space-y-6 text-lg/8 text-ink-soft">
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
        </Container>
      </div>

      <section className="border-t border-rule bg-field py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-base/7 font-semibold text-blue">Credentials</p>
            <h2 className="mt-2 font-display text-[2.25rem]/[1.1] text-ink sm:text-5xl/[1.05]">Licenses, brokerage and education.</h2>
          </div>
          <div className="mt-12">
            <FactList items={CREDENTIALS} />
          </div>
        </Container>
      </section>

      <ClosingAsk heading="If that sounds like the help you need, call me." secondaryHref="/stories/" secondaryLabel="Read the stories first" />
    </>
  )
}
