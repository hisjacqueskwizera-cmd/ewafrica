import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_INFO } from '../data/siteContent.js'

// Shared reading layout for the site's legal documents (Terms, Privacy,
// Refund Policy, Disclaimer). A left-hand section nav on desktop plus a
// single scrolling column of prose — plain and quiet by design, since
// these pages exist to be read carefully, not to sell anything.
export function LegalPage({ title, effectiveDate, lastUpdated, sections, children }) {
  useEffect(() => {
    document.title = `${title} | East-West Africa Link`
  }, [title])

  return (
    <div className="bg-cream pt-[84px]">
      <section className="border-b border-border bg-card px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <span className="section-eyebrow">East-West Africa Link</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] font-normal leading-[1.15] text-primary">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {effectiveDate ? <>Effective Date: {effectiveDate}</> : null}
            {effectiveDate && lastUpdated ? ' · ' : null}
            {lastUpdated ? <>Last Updated: {lastUpdated}</> : null}
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[220px_1fr]">
          {sections && sections.length > 0 ? (
            <nav className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-1 border-l border-border pl-5 text-sm">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="py-1.5 text-muted-foreground transition-colors hover:text-copper"
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </nav>
          ) : null}

          <div className="legal-prose max-w-none text-primary">{children}</div>
        </div>
      </section>

      <section className="border-t border-border bg-card px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-sm text-muted-foreground">
          <p className="font-semibold text-primary">Questions?</p>
          <p className="mt-2">
            East-West Africa Link LLC · {CONTACT_INFO.address}
            <br />
            Email:{' '}
            <a href={CONTACT_INFO.emailHref} className="text-copper hover:underline">
              {CONTACT_INFO.email}
            </a>
          </p>
          <p className="mt-6">
            <Link to="/" className="text-copper hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

// A numbered/lettered section heading with a stable id for the side nav and
// deep-linking (e.g. /terms-and-conditions#visa-immigration).
export function LegalSection({ id, heading, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-border py-8 first:pt-0 last:border-0">
      <h2 className="font-display text-xl font-semibold text-cocoa lg:text-2xl">{heading}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-primary/90 lg:text-base">
        {children}
      </div>
    </section>
  )
}
