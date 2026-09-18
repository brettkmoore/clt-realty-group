'use client'

import { useEffect, useRef } from 'react'

/**
 * The hero footage. A client component for one reason: React does not
 * write the `muted` attribute into server-rendered HTML, and Chrome's
 * autoplay policy reads the attribute, so a server-rendered
 * `<video autoPlay muted>` can stay paused. Setting the property and
 * calling play() after mount is the reliable path. Reduced motion is
 * respected: the video never starts and the poster shows instead.
 *
 * The footage is Candace's own listing film of a one story home on
 * acreage in Monroe, Union County ("1215 Autumn Cove, Cinematic.mp4" in
 * her Drive), cut on 2026-09-18 to the caption-free, slow shots only:
 * the exterior push, the front close, the living room and kitchen, the
 * back field and the closing aerials. Graded once (saturation 0.85, a
 * small lift in the blacks) and the poster is a frame of the graded
 * output, so the still and the footage match and nothing flashes when
 * the video takes over. Muted, thirty-four seconds, 1080 and 720 H.264
 *
 */
export const HERO_POSTER = '/hero/autumn-cove-poster.webp'

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    v.muted = true
    v.defaultMuted = true
    const p = v.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }, [])

  return (
    <video ref={ref} className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={HERO_POSTER} aria-hidden="true">
      <source src="/hero/autumn-cove-1080.mp4" type="video/mp4" media="(min-width: 1280px)" />
      <source src="/hero/autumn-cove-720.mp4" type="video/mp4" />
    </video>
  )
}
