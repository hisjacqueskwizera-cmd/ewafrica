import { ArrowLeft, ArrowRight } from 'lucide-react'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'

export const GHANA_GUIDE_PAGES = [
  { label: 'Before You Travel', to: '/ghana/practical-guide' },
  { label: 'Experience Ghana', to: '/ghana/practical-guide/experience' },
  { label: 'Travel Smarter', to: '/ghana/practical-guide/travel-smarter' },
]

/**
 * Previous/Next buttons at the bottom of each Ghana Practical Guide page —
 * the sticky "Page 1/2/3" bar (GuidePageSubNav) up top handles jumping
 * straight to any page; this is the linear "keep reading" path.
 */
export function GhanaGuideFooterNav({ current }) {
  const prev = current > 0 ? GHANA_GUIDE_PAGES[current - 1] : null
  const next = current < GHANA_GUIDE_PAGES.length - 1 ? GHANA_GUIDE_PAGES[current + 1] : null

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
