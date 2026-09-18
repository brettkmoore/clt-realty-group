import Link from 'next/link'

import { Button } from '@/components/Button'

/** Tailwind Plus, Feedback, 404 pages, "Simple" (React, v4.3), rethemed. */
export default function NotFound() {
  return (
    <div className="grid min-h-full place-items-center bg-field px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-blue">404</p>
        <h1 className="mt-4 font-display text-5xl text-balance text-ink sm:text-7xl">Page not found</h1>
        <p className="mt-6 text-lg font-medium text-pretty text-ink-soft sm:text-xl/8">
          That page has moved or never existed. The stories and the areas are the best places to start.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-8">
          <Button href="/">Go back home</Button>
          <Link href="/contact/" className="tap text-sm font-semibold text-ink">
            Contact Candace
          </Link>
        </div>
      </div>
    </div>
  )
}
