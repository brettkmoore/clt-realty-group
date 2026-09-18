import Image from 'next/image'
import { clsx } from 'clsx'

/**
 * Her mark and her name. The mark is the top of her own logo
 * (02_Brand_Assets/Logos/clt-realty-logo-primary.png): the Charlotte
 * skyline, the palmetto and the crescent, cropped from the 1422 pixel
 * original and shown at 36 to 40 pixels tall, so it is always
 * downscaled and crisp. Brett, 2026-09-18: "the actual CLT Realty Group
 * logo is not on the site." It is now, in the header on every page, with
 * the full lockup in the footer and on the About page. The wordmark
 * beside it is type so it stays legible at header size, where the
 * lockup's own lettering would be four pixels tall. `tone="dark"` is for
 * the header over the homepage video.
 */
export function Logo({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'dark' }) {
  return (
    <span className={clsx(className, 'inline-flex items-center gap-x-3 whitespace-nowrap')}>
      <Image
        src="/brand/clt-mark.webp"
        alt=""
        width={444}
        height={200}
        sizes="90px"
        priority
        className={clsx('h-9 w-auto sm:h-10', tone === 'dark' && 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]')}
      />
      <span className="inline-flex flex-col leading-none">
        <span className={clsx('font-display text-[20px] leading-none tracking-[-0.01em] sm:text-[22px]', tone === 'dark' ? 'text-cream' : 'text-ink')}>
          CLT Realty Group
        </span>
        <span className={clsx('mt-1 hidden text-[9px] font-semibold uppercase leading-none tracking-[0.2em] sm:inline', tone === 'dark' ? 'text-cream/70' : 'text-blue')}>
          Candace L. Thompson, MBA
        </span>
      </span>
    </span>
  )
}
