'use client'

import { useEffect, useRef } from 'react'

/**
 * The hero footage. A client component for one reason: React does not
 * write the `muted` attribute into server-rendered HTML, and Chrome's
 * autoplay policy reads the attribute, so a server-rendered
 * `<video autoPlay muted>` can stay paused. Setting the property and
 * calling play() after mount is the reliable path. Reduced motion is
 * respected: the video never starts and the poster shows instead.
 */
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
    <video
      ref={ref}
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero/porter-estate-poster.webp"
      aria-hidden="true"
    >
      <source src="/hero/porter-estate-1080.mp4" type="video/mp4" media="(min-width: 1280px)" />
      <source src="/hero/porter-estate-720.mp4" type="video/mp4" />
    </video>
  )
}
