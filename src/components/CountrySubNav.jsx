import { SectionSubNav } from './SectionSubNav.jsx'

/**
 * The same "Overview / Services / Popular Routes / Gallery / Practical
 * Guide" sub-nav Rwanda has, generalized so every other country page can
 * share it — sticks under the fixed header and highlights the section the
 * visitor is currently looking at (see SectionSubNav).
 *
 * Every tab beyond Overview targets an anchor on the country page:
 * - Services: the "Travel Services in {Country}" section, given a
 *   matching `id="services"` on each page.
 * - Popular Routes: `id="popular-routes"`, set once on the shared
 *   OverlandRoutesSection (RouteCard.jsx). Pass `hasRoutes={false}` for a
 *   country page without that section (Ghana), so the tab isn't offered
 *   rather than going nowhere.
 * - Photo & Video Gallery: `id="gallery"`, set once on the shared
 *   PhotoGallerySection (PhotoGallery.jsx) — pass `galleryTo` instead for
 *   a country whose gallery isn't that shared component (Tanzania's
 *   custom one still carries the same id, so its default works too).
 *
 * Not every country has a dedicated Practical Guide page yet — pass
 * `practicalGuideTo` only for the ones that do; the tab is omitted
 * otherwise rather than linking to something that doesn't exist.
 */
export function CountrySubNav({ slug, countryName, galleryTo, practicalGuideTo, hasRoutes = true }) {
  const base = `/${slug}`

  const tabs = [
    { label: 'Overview', to: base },
    { label: 'Services', to: `${base}#services` },
    ...(hasRoutes ? [{ label: 'Popular Routes', to: `${base}#popular-routes` }] : []),
    { label: 'Photo & Video Gallery', to: galleryTo ?? `${base}#gallery` },
    ...(practicalGuideTo ? [{ label: 'Practical Guide', to: practicalGuideTo }] : []),
  ]

  return <SectionSubNav tabs={tabs} ariaLabel={`${countryName} page sections`} />
}
