import { clsx } from 'clsx'

type HeadingProps = {
  as?: 'div' | 'h1' | 'h2' | 'h3'
  level?: 'page' | 'section' | 'sub'
} & React.ComponentPropsWithoutRef<'h2'>

const levels = {
  page: 'font-display font-normal text-[2.5rem]/[1.05] tracking-[-0.01em] sm:text-5xl/[1.05] lg:text-6xl/[1.04]',
  section: 'font-display font-normal text-[2rem]/[1.1] sm:text-[2.5rem]/[1.1] lg:text-[2.75rem]/[1.1]',
  sub: 'font-display font-normal text-2xl/[1.2] sm:text-[1.75rem]/[1.2]',
}

export function Heading({ className, as: Element = 'h2', level, ...props }: HeadingProps) {
  const resolved = level ?? (Element === 'h1' ? 'page' : 'section')
  return <Element {...props} className={clsx(className, levels[resolved], 'text-ink')} />
}

/** A label above a heading. Type, never a pill. */
export function Eyebrow({ className, as: Element = 'p', ...props }: { as?: 'p' | 'span' | 'div' } & React.ComponentPropsWithoutRef<'p'>) {
  return <Element {...props} className={clsx(className, 'text-[13px] font-semibold tracking-[0.08em] uppercase text-blue')} />
}

export function Lead({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p className={clsx(className, 'text-[22px]/[1.4] text-ink')} {...props} />
}

export function Body({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return <p className={clsx(className, 'text-lg/8 text-ink-soft')} {...props} />
}
