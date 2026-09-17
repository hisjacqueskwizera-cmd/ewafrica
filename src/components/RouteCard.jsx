import { ArrowRight } from 'lucide-react'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'

// The visual guts every card in this grid shares — a full-bleed photo, a
// permanent bottom-up gradient, a second hover-only darkening overlay, and
// a bottom-left text block whose title lifts slightly on hover — factored
// out so RouteCard (a real link, for an ordinary route) and
// RouteCardButton (a button that opens a modal, for a route with more
// detail than a teaser can hold) render identically without duplicating
// all of these classes.
function CardVisual({ image, imageAlt, title, text, ctaLabel }) {
  return (
    <>
      <img
        src={image}
        alt={imageAlt}
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
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-primary-foreground/80">{text}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/90 transition-colors group-hover:text-gold">
          {ctaLabel}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </>
  )
}

/**
 * One card in a "Popular Overland Routes" grid — a full-bleed photo tile
 * (not a rounded card with a separate image block). Originally Tanzania's
 * own card (via DestinationPage.jsx); pulled out here so every country
 * page's overland-routes section can share the exact same design rather
 * than each bespoke page re-implementing its own (often simpler) variant.
 *
 * `route` is `{ to, image, text }` — `to` is the neighbouring country's
 * name, rendered as "{countryName} → {route.to}".
 */
export function RouteCard({ countryName, route }) {
  return (
    <HashLink to="/#contact" className="group relative block aspect-[3/4] overflow-hidden bg-cocoa">
      <CardVisual
        image={route.image}
        imageAlt={`Landscape along the route between ${countryName} and ${route.to}`}
        title={`${countryName} → ${route.to}`}
        text={route.text}
        ctaLabel="Explore Route"
      />
    </HashLink>
  )
}

/**
 * Same card, same visual language — but a button that opens a modal
 * instead of a link, for a "route" with more to say than a teaser can
 * hold (e.g. Malawi's Lake Malawi ferry crossings, which cover three named
 * destinations plus a guide band — see the note on MALAWI_PAGE.lakeBorder
 * and Malawi.jsx's LakeCrossingsCard).
 */
export function RouteCardButton({ image, imageAlt, title, text, ctaLabel = 'Learn More', onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block aspect-[3/4] w-full overflow-hidden bg-cocoa text-left"
    >
      <CardVisual image={image} imageAlt={imageAlt} title={title} text={text} ctaLabel={ctaLabel} />
    </button>
  )
}

/**
 * The full section wrapper — heading, intro paragraph, and the full-bleed
 * grid of RouteCards — so every country page renders this identically by
 * construction instead of copy-pasting the section markup 7 times.
 *
 * `extraCard` is an optional single extra grid item appended after the
 * mapped `routes` (same grid, same sizing) — for a country that has one
 * more "route" than the rest but whose content doesn't fit RouteCard's own
 * `{ to, image, text }` shape, e.g. a RouteCardButton opening a modal.
 */
export function OverlandRoutesSection({ countryName, routes, extraCard }) {
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
        {extraCard && <Reveal delay={routes.length * 90}>{extraCard}</Reveal>}
      </div>
    </section>
  )
}
