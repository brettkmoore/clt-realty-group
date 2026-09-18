'use client'

import Link from 'next/link'
import { clsx } from 'clsx'

import { useContactModal } from '@/components/ContactModal'

/**
 * Opens the contact pop-up. It is a real link to /contact/ underneath,
 * so without JavaScript, in a reader, or when opened in a new tab it
 * still lands on the contact page. `variant="header"` is the small
 * uppercase control in the site header; the default is the primary
 * button.
 */
const styles = {
  primary: clsx(
    'inline-flex items-center justify-center px-7 py-[17px]',
    'border border-pink bg-pink text-cream btn-shine',
    'text-[13px] font-semibold tracking-[0.14em] uppercase',
    'hover:border-pink-hover hover:bg-pink-hover',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink',
  ),
  header:
    'btn-shine inline-flex min-h-11 items-center justify-center border border-pink bg-pink px-4 text-[12px] font-semibold tracking-[0.16em] text-cream uppercase hover:border-pink-hover hover:bg-pink-hover sm:px-6',
}

export function ContactTrigger({ children, className, variant = 'primary', onOpen }: { children: React.ReactNode; className?: string; variant?: keyof typeof styles; onOpen?: () => void }) {
  const { open } = useContactModal()
  return (
    <Link
      href="/contact/"
      className={clsx(className, styles[variant])}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        onOpen?.()
        open()
      }}
    >
      {children}
    </Link>
  )
}
