import { ArrowLeft, ArrowRight } from 'lucide-react'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'

const PAGES = [
  { label: 'Before You Travel', to: '/ghana/practical-guide' },
  { label: 'Experience Ghana', to: '/ghana/practical-guide/experience' },
  { label: 'Travel Smarter', to: '/ghana/practical-guide/travel-smarter' },
]

/**
 * The Ghana Practical Guide's page-flow nav — reused at the top (as a
 * "Page N of 3" pill row) and bottom (as Previous/Next buttons) of each of
 * the guide's three pages, so the whole thing reads as one guide split
 * into a flow rather than three unrelated pages.
 */
export function GhanaGuidePills({ current }) {
  return (
    <Reveal className="flex flex-wrap items-center justify-center gap-2">
      {PAGES.map((page, i) => (
        <HashLink
          key={page.to}
          to={page.to}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
            i === current
              ? 'border-copper bg-copper text-copper-foreground'
              : 'border-border text-muted-foreground hover:border-copper hover:text-copper'
          }`}
        >
          <span className="opacity-70">Page {i + 1}</span>
          {page.label}
        </HashLink>
      ))}
    </Reveal>
  )
}

export function GhanaGuideFooterNav({ current }) {
  const prev = current > 0 ? PAGES[current - 1] : null
  const next = current < PAGES.length - 1 ? PAGES[current + 1] : null

  return (
    <Reveal className="flex flex-col items-center gap-4 border-t border-border/60 pt-10 sm:flex-row sm:justify-between">
      {prev ? (
        <HashLink
          to={prev.to}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-copper"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>
            Page {current} <span className="text-muted-foreground/70">— {prev.label}</span>
          </span>
        </HashLink>
      ) : (
        <span />
      )}

      {next && (
        <HashLink to={next.to} className="btn-copper">
          Page {current + 2} — {next.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </HashLink>
      )}
    </Reveal>
  )
}
