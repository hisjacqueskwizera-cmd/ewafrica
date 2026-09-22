import { useLocation } from 'react-router-dom'
import { HashLink } from './HashLink.jsx'

// CountrySubNav sticks at 84px (Header.jsx's fixed bar) and is itself 56px
// tall (h-14) plus its 1px bottom border — so this sticks directly under
// it, the same "stack of sticky bars" treatment CountrySubNav itself uses
// under the header.
const TOP = 84 + 56 + 1

/**
 * A second, nested sticky bar for a multi-page guide within a country —
 * "Page 1 / Page 2 / Page 3" pills that stay visible under CountrySubNav
 * as the visitor scrolls, the same way CountrySubNav itself stays visible
 * under the header. Generic (not Ghana-specific): pass `pages` (an array
 * of `{ label, to }`, one per page of the guide, in order) and it works
 * for any country's guide once it grows past a single page — Ghana's is
 * the first.
 */
export function GuidePageSubNav({ pages, guideLabel = 'Guide' }) {
  const { pathname } = useLocation()

  return (
    <div
      className="sticky z-20 border-b border-border/60 bg-cream/95 backdrop-blur-sm"
      style={{ top: TOP }}
    >
      <nav
        className="mx-auto flex h-14 w-[95%] items-center justify-center gap-2 overflow-x-auto"
        aria-label={`${guideLabel} pages`}
      >
        {pages.map((page, i) => {
          const isActive = pathname === page.to
          return (
            <HashLink
              key={page.to}
              to={page.to}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                isActive
                  ? 'border-copper bg-copper text-copper-foreground'
                  : 'border-border text-muted-foreground hover:border-copper hover:text-copper'
              }`}
            >
              <span className="opacity-70">Page {i + 1}</span>
              {page.label}
            </HashLink>
          )
        })}
      </nav>
    </div>
  )
}
