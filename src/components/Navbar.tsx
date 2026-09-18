'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { Logo } from '@/components/Logo'
import { ContactTrigger } from '@/components/ContactTrigger'
import { nav, business } from '@/lib/site'

/**
 * Tailwind Plus, Marketing, Elements, Headers, "With call-to-action"
 * (React, v4.3), from Brett's account 2026-09-17. Rethemed: the indigo
 * rounded button is the site's rose button with no radius, the mark is the
 * type wordmark, the nav links are uppercase letterspaced with the rose
 * underline, the "Log in" slot carries the phone number. The mobile Dialog
 * is the component's own.
 */
/*
 * On the homepage the header sits over the full-screen video, transparent
 * with cream type, and gains its white ground the moment the page
 * scrolls (Brett, 2026-09-18: a white bar above a full-screen hero means
 * the video does not fill the screen). Everywhere else it is white from
 * the start.
 */
const linkClass = 'nav-link text-sm/6 tracking-[0.04em] uppercase'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const close = () => setMobileMenuOpen(false)
  const current = (href: string) => (pathname === href || pathname.startsWith(href) ? 'page' : undefined)
  const overHero = pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const tone = overHero ? 'text-cream/85 hover:text-cream' : 'text-ink-soft hover:text-ink'

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${overHero ? 'nav-over-hero' : 'border-rule bg-field'}`}>
      <nav aria-label="Global" className="mx-auto flex h-[var(--nav-h)] max-w-7xl items-center justify-between gap-x-6 px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 flex min-h-11 items-center p-1.5 hover:opacity-70">
            <span className="sr-only">{business.name}</span>
            <Logo tone={overHero ? 'dark' : 'ink'} />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {nav.header.map((item) => (
            <Link key={item.href} href={item.href} className={`${linkClass} ${tone}`} aria-current={current(item.href)}>
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <a href={`tel:${business.phoneE164}`} className={`tap hidden text-sm/6 whitespace-nowrap lg:block figure ${tone}`}>
            {business.phone}
          </a>
          <ContactTrigger variant="header">{nav.action.title}</ContactTrigger>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 inline-flex items-center justify-center p-2.5 ${overHero ? 'text-cream' : 'text-ink'}`}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel transition className="drawer fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-sm sm:border-l sm:border-rule">
          <div className="flex items-center gap-x-6">
            <Link href="/" onClick={close} className="-m-1.5 p-1.5">
              <span className="sr-only">{business.name}</span>
              <Logo />
            </Link>
            <ContactTrigger variant="header" className="ml-auto" onOpen={close}>
              {nav.action.title}
            </ContactTrigger>
            <button type="button" onClick={close} className="-m-2.5 p-2.5 text-ink">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-rule">
              <div className="space-y-2 py-6">
                {nav.header.map((item) => (
                  <Link key={item.href} href={item.href} onClick={close} className="-mx-3 block px-3 py-2 font-display text-2xl text-ink hover:bg-paper">
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <a href={`tel:${business.phoneE164}`} className="-mx-3 block px-3 py-2.5 text-base/7 text-ink-soft hover:bg-paper figure">
                  Call or text {business.phone}
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
