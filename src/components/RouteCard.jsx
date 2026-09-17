import { ArrowRight } from 'lucide-react'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'

/**
 * One card in a "Popular Overland Routes" grid — a full-bleed photo tile
 * (not a rounded card with a separate image block) with a permanent
 * bottom-up gradient, a second hover-only darkening overlay, a hover zoom
 * on the photo, and a bottom-left text block whose title lifts slightly on
 * hover. Originally Tanzania's own card (via DestinationPage.jsx); pulled
 * out here so every country page's overland-routes section can share the
 * exact same design rather than each bespoke page re-implementing its own
 * (often simpler) variant.
 *
 * `route` is `{ to, image, text }` — `to` is the neighbouring country's
 * name, rendered as "{countryName} → {route.to}".
 */
export function RouteCard({ countryName, route }) {
  return (
    <HashLink to="/#contact" className="group relative block aspect-[3/4] overflow-hidden bg-cocoa">
      <img
        src={route.image}
        alt={`Landscape along the route between ${countryName} and ${route.to}`}
        loading="lazy"
        className="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black opacity-0 transition-opacity duration-[450ms] ease-out group-hover:opacity-[0.45]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="truncate text-2xl font-semibold text-primary-foreground transition-transform duration-[450ms] ease-out group-hover:-translate-y-2.5">
          {countryName} → {route.to}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-primary-foreground/80">{route.text}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/90 transition-colors group-hover:text-gold">
          Explore Route
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </HashLink>
  )
}

/**
 * The full section wrapper — heading, intro paragraph, and the full-bleed
 * grid of RouteCards — so every country page renders this identically by
 * construction instead of copy-pasting the section markup 7 times.
 */
export function OverlandRoutesSection({ countryName, routes }) {
  return (
    <section className="overflow-hidden py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Popular Overland Routes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Travelling beyond {countryName}? We can help you research routes between {countryName}{' '}
            and neighbouring countries.
          </p>
        </Reveal>
      </div>

      {/* Breaks out of the max-w-7xl container above so all the cards sit
          in one row that reaches close to both edges of the screen. */}
      <div className="mt-10 grid grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-5 lg:px-3">
        {routes.map((route, i) => (
          <Reveal key={route.to} delay={i * 90}>
            <RouteCard countryName={countryName} route={route} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
