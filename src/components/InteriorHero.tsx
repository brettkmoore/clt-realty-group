import Image from 'next/image'

import { HeroVideo, HERO_POSTER } from '@/components/HeroVideo'

/**
 * ===================================================================
 *  THE INTERIOR HERO. SIXTEEN BY NINE OF FOOTAGE, TYPE OVER IT.
 * ===================================================================
 *
 * Brett, 2026-09-18: "for the buyers, sellers, stories, and areas pages,
 * we can do more of a standard 16 by 9 video header, but I want that
 * standard 16 by 9 video header to be the entire background with the
 * text over the top of the video." The band is CSS aspect-ratio, not a
 * pixel height, so all four pages are identical at any width. Below
 * the tablet breakpoint 16 by 9 is 211 pixels tall on a phone and will
 * not hold an eyebrow, a headline and a paragraph, so the band switches
 * to 4 by 5 there. The same footage, the same graded poster, the same
 * directional scrim as the homepage; only the height differs.
 *
 * Eyebrow, H1 and intro stack on top, left aligned, on the narrow
 * measure. Content follows below the band at full width. Never the
 * header in one column and the content in the other.
 */
export function InteriorHero({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <section aria-label="Introduction" className="hero-interior relative isolate flex flex-col justify-end overflow-hidden bg-night">
      <div className="absolute inset-0 -z-20">
        <HeroVideo />
        <Image src={HERO_POSTER} alt="" width={1920} height={1080} priority fetchPriority="high" sizes="100vw" className="hero-still absolute inset-0 h-full w-full object-cover" />
      </div>
      <div aria-hidden="true" className="hero-scrim-y absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-scrim-x absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-7xl px-6 pt-20 pb-10 sm:pb-14 lg:px-8 lg:pb-16">
        <div className="max-w-2xl">
          {eyebrow ? <p className="text-[13px] font-semibold tracking-[0.1em] uppercase text-cream/85">{eyebrow}</p> : null}
          <h1 className="mt-3 font-display text-[2.25rem]/[1.06] tracking-[-0.01em] text-pretty text-cream sm:text-5xl/[1.04] lg:text-6xl/[1.03]">
            {title}
          </h1>
          {children ? <div className="mt-5 space-y-4 text-base/7 text-pretty text-cream/90 sm:text-lg/8">{children}</div> : null}
        </div>
      </div>
    </section>
  )
}
