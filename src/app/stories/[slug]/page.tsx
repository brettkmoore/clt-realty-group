import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { StoryCard } from '@/components/StoryCard'
import { ClosingAsk } from '@/components/ClosingAsk'
import { SchemaGraph } from '@/components/SchemaGraph'
import { Heading, Eyebrow } from '@/components/Text'
import { absolute, AGENT_ID, PERSON_ID, breadcrumb, cityNode, imageNode, placeNode } from '@/lib/schema'
import { agent, areas, areaShort, business, siteUrl } from '@/lib/site'
import { formatDate, getStories, getStory } from '@/lib/stories'

export async function generateStaticParams() {
  const stories = await getStories()
  return stories.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const story = await getStory(slug)
  if (!story) return {}
  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: `/stories/${story.slug}/` },
    openGraph: {
      type: 'article',
      title: story.title,
      description: story.summary,
      publishedTime: story.date,
      authors: [agent.name],
      images: story.image ? [{ url: story.image, width: 1600, height: 1067 }] : undefined,
    },
  }
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = await getStory(slug)
  if (!story) notFound()

  const all = await getStories()
  const related = [
    ...all.filter((s) => s.slug !== story.slug && s.area === story.area),
    ...all.filter((s) => s.slug !== story.slug && s.area !== story.area),
  ].slice(0, 3)
  const area = areas.find((a) => a.slug === story.area)
  const path = `/stories/${story.slug}/`
  const imageId = `${siteUrl}${path}#image`

  return (
    <>
      <SchemaGraph
        nodes={[
          {
            '@type': 'BlogPosting',
            '@id': `${siteUrl}${path}#article`,
            headline: story.title,
            description: story.summary,
            image: story.image ? { '@id': imageId } : undefined,
            datePublished: story.date,
            dateModified: story.date,
            author: { '@id': PERSON_ID },
            publisher: { '@id': AGENT_ID },
            mainEntityOfPage: { '@type': 'WebPage', '@id': absolute(path) },
            inLanguage: 'en-US',
            articleSection: story.role,
            about: cityNode(story.city, story.county, story.state),
            contentLocation: placeNode(story.city, story.state),
            wordCount: story.body.trim().split(/\s+/).length,
          },
          ...(story.image ? [imageNode({ path: story.image, caption: story.alt ?? story.title, city: story.city, state: story.state, id: imageId })] : []),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Stories', path: '/stories/' },
            { name: story.title, path },
          ]),
        ]}
      />

      <article>
        <header className="pt-10 sm:pt-14">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Stories', href: '/stories/' }, { name: story.city, href: area ? `/areas/${area.slug}/` : '/stories/' }]} />
              <Eyebrow className="mt-8">
                {story.role} <span className="text-ink-faint">&middot;</span> {story.city}, {story.county}
              </Eyebrow>
              <Heading as="h1" level="section" className="mt-4">
                {story.title}
              </Heading>
              <p className="mt-6 text-sm/6 text-ink-faint">
                <time dateTime={story.date}>{formatDate(story.date)}</time> <span aria-hidden="true">&middot;</span> {story.readMinutes} min read{' '}
                <span aria-hidden="true">&middot;</span> By {agent.name}, {business.name} <span aria-hidden="true">&middot;</span> {story.city}, {story.state}
              </p>
            </div>
          </Container>
        </header>

        {story.image ? (
          <Container className="mt-10">
            <figure className="mx-auto max-w-5xl">
              <Image src={story.image} alt={story.alt ?? story.title} width={1600} height={1067} sizes="(min-width: 1024px) 1024px, 100vw" priority className="w-full" />
            </figure>
          </Container>
        ) : null}

        <Container className="mt-12 sm:mt-16">
          {story.facts.length ? (
            <div className="mx-auto mb-14 max-w-[40rem]">
              <h2 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">The numbers</h2>
              <dl className="mt-4 divide-y divide-rule border-y border-rule text-base/7">
                {story.facts.map((f) => (
                  <div key={f.label} className="grid gap-x-6 py-3 sm:grid-cols-3">
                    <dt className="text-ink-soft">{f.label}</dt>
                    <dd className="text-ink figure sm:col-span-2">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          <div className="prose-story mx-auto max-w-[40rem]" dangerouslySetInnerHTML={{ __html: story.html }} />
          <footer className="mx-auto mt-14 max-w-[40rem] border-t border-rule pt-8">
            <p className="font-display text-xl text-ink">{agent.name}</p>
            <p className="mt-1 text-sm/6 text-ink-soft">
              {business.name}. Serving {areaShort}.{' '}
              <a href={`tel:${business.phoneE164}`} className="tap text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink figure">
                {business.phone}
              </a>
            </p>
            <p className="mt-4 text-xs/5 text-ink-faint">
              Names and addresses are left out of every story on purpose. The transactions are real and the records
              are on file. {business.legalNote}. {business.licenses.map((l) => `${l.abbr} license ${l.number}`).join(', ')}.
            </p>
          </footer>
        </Container>
      </article>

      {related.length ? (
        <section className="mt-20 border-t border-rule py-20 lg:py-28">
          <Container>
            <Eyebrow>More stories</Eyebrow>
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <ClosingAsk heading="Ready to write your own?" secondaryHref={area ? `/areas/${area.slug}/` : '/areas/'} secondaryLabel={area ? `More about ${area.name}` : 'See the areas'} />
    </>
  )
}
