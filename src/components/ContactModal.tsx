'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { ContactForm } from '@/components/ContactForm'
import { business } from '@/lib/site'

/**
 * The contact form as a pop-up. Brett, 2026-09-18: "when we click on
 * contact it goes to a contact page, but I don't like how it looks at
 * all. What I would prefer is a contact form as a pop-up." Modeled on
 * createchurchmedia.com: the dialog opens over the page and the page
 * behind it blurs. The form inside is the same ContactForm the /contact/
 * page renders inline, so there is one form and two doors. The page
 * stays because a modal has no URL: it cannot be indexed, cited or
 * linked from her Google Business Profile.
 *
 * Built from Tailwind Plus, Application UI, Overlays, "Modal dialogs,
 * Simple with gray footer" (React, v4.3), from Brett's account
 * 2026-09-17: the Headless UI Dialog with backdrop and transition. The
 * backdrop takes a blur instead of a flat grey.
 */
type Ctx = { open: () => void; close: () => void; isOpen: boolean }
const ContactModalContext = createContext<Ctx | null>(null)

export function useContactModal() {
  const ctx = useContext(ContactModalContext)
  if (!ctx) throw new Error('useContactModal must be used inside ContactModalProvider')
  return ctx
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen])

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-ink/40 backdrop-blur-md transition-opacity duration-300 ease-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-6">
            <DialogPanel
              transition
              className="relative w-full max-w-2xl transform bg-field px-6 pt-8 pb-8 text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out data-closed:translate-y-4 data-closed:opacity-0 sm:my-8 sm:rounded-2xl sm:px-10 sm:pt-10 sm:pb-10"
            >
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-4 inline-flex size-11 items-center justify-center text-ink-faint hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
              <p className="text-[13px] font-semibold tracking-[0.08em] uppercase text-blue">Talk with Candace</p>
              <h2 className="mt-2 font-display text-[1.75rem]/[1.15] text-ink sm:text-3xl">Tell me what you are trying to do.</h2>
              <p className="mt-3 text-base/7 text-ink-soft">
                A few taps and I will reach out. Or skip the form and{' '}
                <a href={`tel:${business.phoneE164}`} className="tap text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink figure">
                  call or text {business.phone}
                </a>
                .
              </p>
              <div className="mt-8">
                <ContactForm compact />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </ContactModalContext.Provider>
  )
}
