import Image from 'next/image'

import { Button } from '@/components/Button'
import { HeroVideo, HERO_POSTER } from '@/components/HeroVideo'
import { agent, business, tagline } from '@/lib/site'

/**
 * ===================================================================
 *  THE HOMEPAGE HERO. THE WHOLE SCREEN OF FOOTAGE, WHITE TYPE OVER IT.
 * ===================================================================
 *
 * Brett, 2026-09-18: "I would prefer it if the video took up the entire
 * hero section of the screen on a standard desktop size, and I'd prefer
 * if that also happened responsively on mobile." So the band is
 * 100dvh (100vh fallback), the footage fills it, the header sits over
 * it transparent until the page scrolls, and the copy is set in white
 * on a directional scrim: densest at the foot and the left where the
 * words are, open at the top right so the footage still reads as
 * footage. Never a flat wash.
 *
 * The poster still sits under the video at all times and is a graded
 * frame of the same footage, so a blocked autoplay shows the still and
 * a permitted one never flashes. It is the LCP element and loads with
 * priority. A small circular portrait, 96 pixels from a 1200 by 1600
 * source, sits above the headline; never a large photo panel of her.
 *
 * Built from Tailwind Plus, Marketing, Heroes, "Simple centered with
 * background image" (React, v4.3): full-bleed media, a scrim, copy on
 * top. Rethemed: left aligned, Fraunces, the pink button.
 */
export function Hero() {
  return (
    <section aria-label="Introduction" className="hero-full relative isolate -mt-[var(--nav-h)] flex flex-col justify-end overflow-hidden bg-night">
      <div className="absolute inset-0 -z-20">
        <HeroVideo />
        <Image
          src={HERO_POSTER}
          alt="Front of a one story home on open acreage under a summer sky in Monroe, Union County, North Carolina, from Candace L. Thompson's listing film"
          width={1920}
          height={1080}
          priority
          fetchPriority="high"
          sizes="100vw"
          className="hero-still absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div aria-hidden="true" className="hero-scrim-y absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-scrim-x absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-7xl px-6 pt-[calc(var(--nav-h)+3rem)] pb-12 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="max-w-2xl">
          <Image
            src={agent.headshot}
            alt={agent.headshotAlt}
            width={agent.headshotWidth}
            height={agent.headshotHeight}
            sizes="96px"
            className="size-24 rounded-full object-cover object-top ring-2 ring-cream/80"
          />
          <p className="mt-6 text-[13px] font-semibold tracking-[0.1em] uppercase text-cream/85">
            Charlotte, Fort Mill, Rock Hill and the Carolina towns around them
          </p>
          <h1 className="mt-4 font-display text-[2.5rem]/[1.04] tracking-[-0.01em] text-pretty text-cream sm:text-6xl/[1.03] lg:text-7xl/[1.02]">
            {tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg/8 text-cream/90 sm:text-xl/8">
            I am Candace L. Thompson, a Rock Hill native with Keller Williams Connected in Fort Mill. I sell homes on
            both sides of the state line, and I have never rushed a client through a decision to get to closing
            faster. The home has to be right, and the payment has to let you sleep.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="/contact/" className="focus-visible:outline-cream">
              Talk with Candace
            </Button>
            <a href={`tel:${business.phoneE164}`} className="tap text-sm/6 text-cream/85 hover:text-cream figure">
              Call or text {business.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
