import { useId, useState } from 'react'
import { NEWSLETTER } from '../data/siteContent.js'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'
import { SectionMark } from './SectionMark.jsx'

export function Newsletter() {
  const nameId = useId()
  const emailId = useId()
  const [status, setStatus] = useState('idle') // idle | submitted

  const handleSubmit = (event) => {
    event.preventDefault()
    // No backend wired up yet — this just confirms the submission client-side.
    setStatus('submitted')
  }

  return (
    <section className="relative overflow-hidden bg-cocoa py-16 text-primary-foreground lg:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SectionMark light />
            <RevealText as="h2" text={NEWSLETTER.heading} className="text-3xl font-semibold sm:text-4xl" />
            <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
              {NEWSLETTER.subtext}
            </p>

            {status === 'submitted' ? (
              <p className="mt-8 text-sm font-semibold text-primary-foreground">
                Thanks — you're on the list. We'll be in touch with practical updates, not spam.
              </p>
            ) : (
              <form
                className="mt-8 flex max-w-xl flex-col gap-6 sm:flex-row sm:items-end"
                onSubmit={handleSubmit}
              >
                <div className="flex-1">
                  <label htmlFor={nameId} className="sr-only">
                    Name
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border-b border-primary-foreground/35 bg-transparent py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor={emailId} className="sr-only">
                    Email address
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full border-b border-primary-foreground/35 bg-transparent py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none"
                  />
                </div>
                <button type="submit" className="btn-outline-light shrink-0">
                  {NEWSLETTER.cta}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
