import { clsx } from 'clsx'

/**
 * The wordmark. Set as type so it stays crisp at every size: the team
 * name in Fraunces, her name in a small letterspaced sans in the blue.
 * Her raster logo (the skyline, the palmetto and the crescent) appears
 * in the footer and on the About page at a size it was drawn for.
 * `tone="dark"` is for the deep blue band.
 */
export function Logo({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'dark' }) {
  return (
    <span className={clsx(className, 'inline-flex items-baseline gap-x-2.5 whitespace-nowrap')}>
      <span className={clsx('font-display text-[22px] leading-none tracking-[-0.01em]', tone === 'dark' ? 'text-cream' : 'text-ink')}>
        CLT Realty Group
      </span>
      <span className={clsx('hidden text-[10px] font-semibold uppercase leading-none tracking-[0.2em] sm:inline', tone === 'dark' ? 'text-cream/70' : 'text-blue')}>
        Candace L. Thompson, MBA
      </span>
    </span>
  )
}
