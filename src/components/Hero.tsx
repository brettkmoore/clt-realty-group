import Image from 'next/image'

import { ContactTrigger } from '@/components/ContactTrigger'
import { HeroVideo, HERO_POSTER } from '@/components/HeroVideo'
import { agent, business, production } from '@/lib/site'

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
 * priority. A small circular portrait, 72 pixels from a 1200 by 1600
 * source, sits beside the call to action with her name under it; never
 * a large photo panel of her, and never up at the top of the hero.
 *
 * Built from Tailwind Plus, Marketing, Heroes, "Simple centered with
 * background image" (React, v4.3): full-bleed media, a scrim, copy on
 * top. Rethemed: left aligned, Fraunces, the pink button.
 */
export function Hero() {
  return (
    <section aria-label="Introduction" className="hero-full relative isolate -mt-[var(--nav-h)] flex flex-col justify-center overflow-hidden bg-night">
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
      <div aria-hidden="true" className="hero-scrim-center absolute inset-0 -z-10" />

      {/*
       * Brett and Candace, 2026-09-18, reviewing on her laptop: the call to
       * action was below the fold. Everything here is sized to fit one
       * screen at 1440 by 780 with browser chrome: a shorter header, the
       * headline capped at 4rem, tighter steps between the eyebrow, the
       * headline, the paragraph and the actions, and the portrait moved
       * out of the top and set beside the button with her name under it.
       */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-[var(--nav-h)] pb-10 lg:px-8">
        <div className="max-w-2xl text-left">
          <p className="text-[12px] font-semibold tracking-[0.1em] uppercase text-cream/85 sm:text-[13px]">
            Rock Hill, Fort Mill, Charlotte and the Carolina towns around them
          </p>
          <h1 className="mt-3 font-display text-[2.375rem]/[1.04] tracking-[-0.01em] text-pretty text-cream sm:text-[3.25rem]/[1.03] lg:text-[4rem]/[1.02]">
            Building legacies, one home at a time.
          </h1>
          <p className="mt-4 max-w-xl text-base/7 text-cream/90 sm:text-lg/7">
            I&rsquo;m Candace L. Thompson, a Rock Hill native and Carolina real estate expert. I educate my buyers,
            empower my sellers, and create win-win environments. I combine hometown
            knowledge, business expertise, and a passion for helping families build wealth through real estate.
            I&rsquo;ve been in the business for {production.yearsExperience} years with {production.totalSales} closings
            in North and South Carolina.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-5">
            <figure className="flex shrink-0 flex-col items-center">
              <Image
                src={agent.headshot}
                alt={agent.headshotAlt}
                width={agent.headshotWidth}
                height={agent.headshotHeight}
                sizes="72px"
                priority
                className="size-[72px] rounded-full object-cover object-top ring-2 ring-cream/80"
              />
              <figcaption className="mt-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-cream/85">{agent.displayName}</figcaption>
            </figure>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <ContactTrigger className="focus-visible:outline-cream">Talk with Candace</ContactTrigger>
              <a href={`tel:${business.phoneE164}`} className="tap text-sm/6 text-cream/85 hover:text-cream figure">
                Or call or text {business.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
