import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Heading, Eyebrow } from '@/components/Text'
import { StoryCard } from '@/components/StoryCard'
import { ClosingAsk } from '@/components/ClosingAsk'
import { FactList } from '@/components/FactList'
import { SchemaGraph } from '@/components/SchemaGraph'
import { absolute, AGENT_ID, BROKERAGE_ID, breadcrumb, cityNode } from '@/lib/schema'
import { areaContent } from '@/content/areas'
import { agent, areas, business } from '@/lib/site'
import { getStoriesForArea } from '@/lib/stories'

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = areaContent[slug]
  if (!c) return {}
  return { title: c.title, description: c.metaDescription, alternates: { canonical: `/areas/${slug}/` } }
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const area = areas.find((a) => a.slug === slug)
  const c = areaContent[slug]
  if (!area || !c) notFound()

  const stories = await getStoriesForArea(slug)
  const others = areas.filter((a) => a.slug !== slug)
  const path = `/areas/${slug}/`

  return (
    <>
      <SchemaGraph
        nodes={[
          /*
           * A narrower RealEstateAgent node for this one city, identified by
           * this page's URL and tied back to the sitewide entity. The
           * sitewide node says "serves these six towns"; this one says
           * "serves this town, and here is the page about it."
           */
          {
            '@type': 'RealEstateAgent',
            '@id': `${absolute(path)}#agent`,
            name: `${business.name}, ${area.name}`,
            url: absolute(path),
            image: absolute(agent.headshot),
            telephone: business.phoneE164,
            email: business.email,
            description: c.metaDescription,
            areaServed: cityNode(area.name, area.county, area.state),
            parentOrganization: { '@id': AGENT_ID },
            memberOf: { '@id': BROKERAGE_ID },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Areas', path: '/areas/' },
            { name: area.name, path },
          ]),
        ]}
      />

      <section className="pt-10 pb-16 sm:pt-14 lg:pb-24">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Areas', href: '/areas/' }, { name: area.name, href: path }]} />
          <Eyebrow className="mt-8">
            {area.county} <span className="text-ink-faint">&middot;</span> {area.stateName}
          </Eyebrow>
          <Heading as="h1" className="mt-4 max-w-4xl">
            {c.title}
          </Heading>
          <div className="mt-8 max-w-3xl">
            <p className="text-[22px]/[1.4] text-ink">{c.intro}</p>
          </div>
          <div className="mt-10 max-w-3xl space-y-6 text-lg/8 text-ink-soft">
            {c.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="mt-14">
            <FactList
              items={[
                { label: 'Neighborhoods people ask about', value: c.neighborhoods.join(', ') },
                { label: 'Zip codes', value: <span className="figure">{area.zip.join(', ')}</span> },
                ...(area.fromOffice ? [{ label: 'From my Fort Mill office', value: area.fromOffice }] : []),
                {
                  label: 'Call or text',
                  value: (
                    <a href={`tel:${business.phoneE164}`} className="tap text-ink figure hover:underline hover:underline-offset-4">
                      {business.phone}
                    </a>
                  ),
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <section className="band py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What I tell buyers about {area.name}</Eyebrow>
            <p className="mt-6 font-display text-2xl/[1.35] text-ink sm:text-[1.75rem]/[1.35]">{c.candace}</p>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <Eyebrow>Stories from {area.name}</Eyebrow>
          {stories.length ? (
            <>
              <Heading className="mt-6 max-w-2xl">Transactions I have handled here.</Heading>
              <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {stories.map((s) => (
                  <StoryCard key={s.slug} story={s} />
                ))}
              </div>
            </>
          ) : (
            <>
              <Heading className="mt-6 max-w-2xl">No published story from {area.name} yet.</Heading>
              <p className="mt-6 max-w-2xl text-lg/8 text-ink-soft">
                I have closed here; the write-ups are still being pulled together from the records. In the meantime
                the stories from the neighboring towns show how I work.
              </p>
              <p className="mt-6">
                <Link href="/stories/" className="tap text-[13px] font-semibold tracking-[0.14em] uppercase text-ink border-b border-ink/25 pb-1 hover:border-ink">
                  All stories
                </Link>
              </p>
            </>
          )}
        </Container>
      </section>

      <section className="border-t border-rule py-12">
        <Container>
          <p className="text-sm text-ink-soft">
            Nearby:{' '}
            {others.map((o, i) => (
              <span key={o.slug}>
                {i > 0 ? ', ' : ''}
                <Link href={`/areas/${o.slug}/`} className="tap text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                  {o.name}
                </Link>
              </span>
            ))}
            .
          </p>
        </Container>
      </section>

      <ClosingAsk heading={`Buying or selling in ${area.name}?`} secondaryHref="/stories/" secondaryLabel="Read the stories">
        Tell me what you are trying to do and I will tell you what is realistic here this month.
      </ClosingAsk>
    </>
  )
}
