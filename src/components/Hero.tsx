import Image from 'next/image'

import { Button } from '@/components/Button'
import { agent, business, tagline } from '@/lib/site'

/**
 * ===================================================================
 *  THE HERO. A CLEAN SURFACE, HER LINE, HER FACE.
 * ===================================================================
 *
 * Built from Tailwind Plus, Marketing, Heroes, "Split with image"
 * (React, v4.3), from Brett's account 2026-09-17. Rethemed: the copy
 * sits on the white ground with nothing behind it, the photograph is a
 * plain rectangle with no radius, no ring and no offset, the pink
 * button is the one action. Brett's rule: text on a clean surface,
 * never over a busy photo.
 *
 * The headline is the line she has said to clients for years and chose
 * with Brett on 2026-08-28: "Your home should be your sanctuary." The
 * photograph is her own professional headshot at 1200 by 1600; it is
 * shown no wider than 640 pixels, so it is never upscaled.
 */
export function Hero() {
  return (
    <section aria-label="Introduction" className="relative isolate overflow-hidden bg-field">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-14 pt-16 pb-16 sm:pt-24 lg:grid-cols-12 lg:gap-x-12 lg:pt-28 lg:pb-28">
          <div className="lg:col-span-7 lg:self-center">
            <p className="text-[13px] font-semibold tracking-[0.1em] uppercase text-blue">
              Charlotte, Fort Mill, Rock Hill and the Carolina towns around them
            </p>
            <h1 className="mt-6 font-display text-[2.75rem]/[1.04] tracking-[-0.01em] text-pretty text-ink sm:text-6xl/[1.03] lg:text-7xl/[1.02]">
              {tagline}
            </h1>
            <p className="mt-8 max-w-xl text-lg/8 text-ink-soft sm:text-xl/8">
              I am Candace L. Thompson, a Rock Hill native with Keller Williams Connected in Fort Mill. I sell homes on
              both sides of the state line, and I have never rushed a client through a decision to get to closing
              faster. The home has to be right, and the payment has to let you sleep.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="/contact/">Talk with Candace</Button>
              <a href={`tel:${business.phoneE164}`} className="tap text-sm/6 text-ink-soft hover:text-ink figure">
                Call or text {business.phone}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Image
              src={agent.headshot}
              alt={agent.headshotAlt}
              width={agent.headshotWidth}
              height={agent.headshotHeight}
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 60vw, 100vw"
              priority
              className="mx-auto w-full max-w-md object-cover lg:max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
