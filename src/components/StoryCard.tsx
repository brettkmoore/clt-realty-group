import Image from 'next/image'
import Link from 'next/link'

import { agent, business } from '@/lib/site'
import { formatDate, type Story } from '@/lib/stories'

/**
 * Tailwind Plus, Marketing, Blog sections, "Three-column with images"
 * (React, v4.3), from Brett's account 2026-09-17. One card of it. The
 * component's overlay-link pattern (`absolute inset-0` inside the title)
 * is kept, so the whole card is the link. Rethemed: the photo takes no
 * radius and no inset ring, the category is set as type rather than the
 * rounded-full pill, the title is Playfair, and the author row shows the
 * one author this site has.
 */
export function StoryCard({ story, priority = false }: { story: Story; priority?: boolean }) {
  const href = `/stories/${story.slug}/`
  return (
    <article className="group flex flex-col items-start justify-between">
      <div className="tile relative w-full">
        {story.image ? (
          <Image
            src={story.image}
            alt={story.alt ?? ''}
            width={1600}
            height={1067}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="aspect-video w-full rounded-xl bg-paper object-cover sm:aspect-2/1 lg:aspect-3/2"
          />
        ) : (
          <div className="flex aspect-video w-full items-end bg-paper p-6 sm:aspect-2/1 lg:aspect-3/2">
            <span className="font-display text-2xl text-ink-faint">{story.city}, {story.state}</span>
          </div>
        )}
      </div>
      <div className="flex max-w-xl grow flex-col justify-between">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={story.date} className="text-ink-faint">
            {formatDate(story.date)}
          </time>
          <Link
            href={`/stories/#${story.role === 'Buyer story' ? 'buyer-stories' : 'seller-stories'}`}
            className="tap relative z-10 font-semibold tracking-[0.08em] uppercase text-blue underline decoration-blue/25 underline-offset-4 hover:decoration-blue"
          >
            {story.role.replace(' story', ' stories')}
          </Link>
          <span className="text-ink-faint">{story.city}, {story.state}</span>
        </div>
        <div className="relative grow">
          <h3 className="mt-3 font-display text-[1.375rem]/[1.25] text-ink group-hover:text-ink-soft">
            <Link href={href}>
              <span className="absolute inset-0" />
              {story.title}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm/6 text-ink-soft">{story.summary}</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
          <Image src={agent.headshot} alt="" width={40} height={40} className="size-10 rounded-full bg-paper object-cover" />
          <div className="text-sm/6">
            <p className="font-semibold text-ink">{agent.name}</p>
            <p className="text-ink-soft">
              {business.name} <span aria-hidden="true">&middot;</span> {story.readMinutes} min read
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
