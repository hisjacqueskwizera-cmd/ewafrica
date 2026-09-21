import { useLocation } from 'react-router-dom'
import { HashLink } from './HashLink.jsx'

// Matches Header.jsx's fixed 84px bar — this sub-nav sticks directly under
// it on every Rwanda page (Overview, Gallery, Practical Guide) so visitors
// can jump between sections without losing their place, the header, or
// this nav itself.
const HEADER_HEIGHT = 84

const TABS = [
  { label: 'Overview', to: '/rwanda' },
  { label: 'Services', to: '/rwanda#rwanda-services' },
  { label: 'Popular Routes', to: '/rwanda#popular-routes' },
  { label: 'Photo & Video Gallery', to: '/rwanda/gallery' },
  { label: 'Practical Guide', to: '/rwanda/practical-guide' },
]

function isActive(tab, pathname, hash) {
  if (tab.to.includes('#')) {
    const [tabPath, tabHash] = tab.to.split('#')
    return pathname === tabPath && hash === `#${tabHash}`
  }
  if (tab.to === '/rwanda') {
    return pathname === '/rwanda' && !hash
  }
  return pathname === tab.to
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
