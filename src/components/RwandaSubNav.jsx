import { useLocation } from 'react-router-dom'
import { HashLink } from './HashLink.jsx'

// Matches Header.jsx's fixed 84px bar — this sub-nav sticks directly under
// it on every Rwanda page (Overview, Gallery, Practical Guide) so visitors
// can jump between sections without losing their place, the header, or
// this nav itself.
const HEADER_HEIGHT = 84

// Every tab's target sits just under the hero + this sub-nav (not the very
// top of the hero) — see the id + `scroll-mt` pair each page gives its
// first content section (rwanda-overview / gallery-overview /
// guide-overview) — so clicking a tab (even from another Rwanda page)
// lands on the actual content, not back at the top of a hero photo.
const TABS = [
  { label: 'Overview', to: '/rwanda#rwanda-overview' },
  { label: 'Services', to: '/rwanda#rwanda-services' },
  { label: 'Popular Routes', to: '/rwanda#popular-routes' },
  { label: 'Photo & Video Gallery', to: '/rwanda/gallery#gallery-overview' },
  { label: 'Practical Guide', to: '/rwanda/practical-guide#guide-overview' },
]

function isActive(tab, pathname, hash) {
  const [tabPath, tabHash] = tab.to.split('#')
  if (tabPath !== pathname) return false
  // /rwanda hosts three tabs (Overview / Services / Popular Routes), so
  // its own hash has to disambiguate between them. Gallery and Practical
  // Guide each have the whole page to themselves — any hash on their path
  // still means that tab is the active one.
  if (tabPath !== '/rwanda') return true
  if (tab.label === 'Overview') return !hash || hash === '#rwanda-overview'
  return hash === `#${tabHash}`
}

export function RwandaSubNav() {
  const { pathname, hash } = useLocation()

  return (
    <div
      className="sticky z-30 border-b border-border/70 bg-cream/95 backdrop-blur-sm"
      style={{ top: HEADER_HEIGHT }}
    >
      <nav
        className="mx-auto flex h-14 w-[95%] items-center gap-6 overflow-x-auto text-sm font-semibold lg:justify-center"
        aria-label="Rwanda page sections"
      >
        {TABS.map((tab) => {
          const active = isActive(tab, pathname, hash)
          return (
            <HashLink
              key={tab.label}
              to={tab.to}
              className={`shrink-0 whitespace-nowrap border-b-2 pb-1 transition-colors ${
                active
                  ? 'border-copper text-primary'
                  : 'border-transparent text-muted-foreground hover:text-primary'
              }`}
            >
              {tab.label}
            </HashLink>
          )
        })}
      </nav>
    </div>
  )
}
