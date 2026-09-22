import { useLocation } from 'react-router-dom'
import { HashLink } from './HashLink.jsx'

// Matches Header.jsx's fixed 84px bar — every country page's sub-nav
// sticks directly under it, the same treatment Rwanda's dedicated
// RwandaSubNav already uses.
const HEADER_HEIGHT = 84

/**
 * The same "Overview / Services / Popular Routes / Gallery / Practical
 * Guide" sub-nav Rwanda has, generalized so every other country page can
 * share it — sticks under the fixed header and highlights the section the
 * visitor is currently looking at.
 *
 * Every tab beyond Overview targets an anchor that actually exists on
 * every country page already:
 * - Services: the "Travel Services in {Country}" section, given a
 *   matching `id="services"` on each page.
 * - Popular Routes: `id="popular-routes"`, set once on the shared
 *   OverlandRoutesSection (RouteCard.jsx) so every country page has it
 *   automatically.
 * - Photo & Video Gallery: `id="gallery"`, set once on the shared
 *   PhotoGallerySection (PhotoGallery.jsx) — pass `galleryTo` instead for
 *   a country whose gallery isn't that shared component (Tanzania's
 *   custom one still carries the same id, so its default works too).
 *
 * Not every country has a dedicated Practical Guide page yet — pass
 * `practicalGuideTo` only for the ones that do (Zambia); the tab is
 * omitted otherwise rather than linking to something that doesn't exist.
 */
export function CountrySubNav({ slug, countryName, galleryTo, practicalGuideTo }) {
  const { pathname, hash } = useLocation()
  const base = `/${slug}`

  const tabs = [
    { label: 'Overview', to: base },
    { label: 'Services', to: `${base}#services` },
    { label: 'Popular Routes', to: `${base}#popular-routes` },
    { label: 'Photo & Video Gallery', to: galleryTo ?? `${base}#gallery` },
  ]
  if (practicalGuideTo) {
    tabs.push({ label: 'Practical Guide', to: practicalGuideTo })
  }

  const isActive = (tab) => {
    const [tabPath, tabHash] = tab.to.split('#')
    if (tabPath !== pathname) return false
    if (tab.label === 'Overview') return !hash
    return hash === `#${tabHash}`
  }

  return (
    <div
      className="sticky z-30 border-b border-border/70 bg-cream/95 backdrop-blur-sm"
      style={{ top: HEADER_HEIGHT }}
    >
      <nav
        className="mx-auto flex h-14 w-[95%] items-center gap-6 overflow-x-auto text-sm font-semibold lg:justify-center"
        aria-label={`${countryName} page sections`}
      >
        {tabs.map((tab) => (
          <HashLink
            key={tab.label}
            to={tab.to}
            className={`shrink-0 whitespace-nowrap border-b-2 pb-1 transition-colors ${
              isActive(tab)
                ? 'border-copper text-primary'
                : 'border-transparent text-muted-foreground hover:text-primary'
            }`}
          >
            {tab.label}
          </HashLink>
        ))}
      </nav>
    </div>
  )
}
