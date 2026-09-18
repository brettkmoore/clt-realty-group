import Link from 'next/link'
import { clsx } from 'clsx'

/**
 * Two controls. `primary` is the rose with white type and the
 * pressed-object shine (Brett, 2026-09-18: primary actions in the rose,
 * not black); `quiet` is a letterspaced text link with a hairline. A
 * second bordered button beside the first makes both ordinary, so there
 * is no outline variant. Without an href this renders a real <button>.
 *
 * Focus: the ring draws outside the fill with an offset, so on the white
 * page it is ink on white. On the dark hero the caller passes
 * `focus-visible:outline-cream`.
 */
const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-7 py-[17px]',
    'border border-pink bg-pink text-cream btn-shine',
    'text-[13px] font-semibold tracking-[0.14em] uppercase',
    'hover:border-pink-hover hover:bg-pink-hover',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink',
    'disabled:opacity-40',
  ),
  quiet: clsx(
    'tap inline-flex items-center',
    'text-[13px] font-semibold tracking-[0.14em] text-ink uppercase',
    'border-b border-ink/25 pb-1',
    'hover:border-ink',
  ),
  onDark: clsx(
    'inline-flex items-center justify-center px-7 py-[17px]',
    'border border-cream bg-cream text-ink btn-shine',
    'text-[13px] font-semibold tracking-[0.14em] uppercase',
    'hover:bg-paper',
  ),
}

type Props = { variant?: keyof typeof variants; className?: string; children: React.ReactNode } & (
  | { href: string; type?: never; onClick?: never; disabled?: never }
  | { href?: undefined; type?: 'submit' | 'button'; onClick?: () => void; disabled?: boolean }
)

export function Button({ variant = 'primary', className, children, ...props }: Props) {
  const cls = clsx(className, variants[variant])
  if (props.href) {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button type={props.type ?? 'button'} onClick={props.onClick} disabled={props.disabled} className={cls}>
      {children}
    </button>
  )
}
