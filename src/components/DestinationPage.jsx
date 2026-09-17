import {
  ArrowRight,
  BookOpen,
  Bus,
  CheckCircle2,
  FileText,
  Globe2,
  Handshake,
  MessageSquare,
  Shield,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useEffect } from 'react'
import { DestinationHero } from './DestinationHero.jsx'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'

const ICONS = {
  FileText,
  Bus,
  ShieldCheck,
  Users,
  Shield,
  Globe2,
  Handshake,
}

// Same card language as the homepage's "Explore our Destinations" ticker
// (DestinationsTicker's DestinationCard): full-bleed photo, square corners,
// a bottom-up black gradient, serif-weight title, and an uppercase
// "Explore" line that lifts + golds on hover.
function RouteCard({ countryName, route }) {
  return (
    <HashLink
      to="/#contact"
      className="group relative block aspect-[3/4] overflow-hidden bg-cocoa"
    >
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

// Solid cocoa pill — the "goes to a modal/tool" CTA shape the reference
// design uses inside a card, kept even though most of these still just
// link to /#contact (see the note on each *_PAGE's `services`) — the
// Travel Planner card is the one exception, since that flow now actually
// exists.
function CardCta({ to, children }) {
  return (
    <HashLink
      to={to}
      className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-cocoa px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
    >
      {children}
      <ArrowRight className="size-3.5" aria-hidden="true" />
    </HashLink>
  )
}

/**
 * The shared destination-page template — hero, services, overland routes,
 * first-timer's guide, "not sure which service" banner, trust row and a
 * farewell strip. Tanzania and every other country page are thin wrappers
 * around this, passing only their own copy (a `*_PAGE` object from
 * siteContent.js, shaped like TANZANIA_PAGE) plus the bits that vary by
 * name: the document title, the country's display name (used in route
 * card headings) and its siteContent.js `COUNTRIES` slug (used to deep-link
 * the Travel Planner card to the right destination). Pass `heroVideos`
 * (an array in HERO_VIDEOS' shape) for a page that rotates its own
 * dedicated clips instead of a static photo — Tanzania's the only one
 * that has any right now; everyone else's `hero` carries a plain
 * `backgroundImage`.
 */
export function DestinationPage({ documentTitle, countryName, slug, data, heroVideos }) {
  useEffect(() => {
    document.title = documentTitle
  }, [documentTitle])

  const { hero, services, guide, routes, askUs, trust, farewell } = data

  return (
    <>
      {/* Hero — the same full-viewport hero every destination page shares,
          lifted from About Us (see the comment on DestinationHero.jsx). */}
      <DestinationHero
        heading={`${hero.titleLine1} ${hero.titleAccent}`}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        backgroundImageAlt={hero.backgroundImageAlt}
        backgroundVideos={heroVideos}
      />

      {/* Travel Services — a dashed-rule-flanked label rather than the
          site's usual SectionTitle, since these cards are the page's real
          subject and the heading should stay out of the way. */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-4">
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Travel Services in {countryName}
            </h2>
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => {
              const Icon = ICONS[service.icon]
              return (
                <Reveal key={service.title} delay={i * 90}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-card">
                    <div className="aspect-4/3 overflow-hidden rounded-t-3xl">
                      <img
                        src={guide.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>
                    {/* Pulled up with a negative margin so it isn't clipped
                        by the image's own corner rounding. */}
                    <span className="relative z-10 -mt-6 ml-6 grid size-12 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground shadow-card">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-1 flex-col p-6 pt-3">
                      <h3 className="text-base font-bold text-primary">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.text}
                      </p>
                      <ul className="mt-4 flex-1 space-y-1.5">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                          >
                            <CheckCircle2
                              className="mt-0.5 size-3.5 shrink-0 text-copper"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <CardCta
                        to={
                          service.title === 'Travel Planner'
                            ? `/travel-planner?destination=${slug}`
                            : service.title.startsWith('Independent Tour Guides')
                              ? `/independent-tour-guide/${slug}`
                              : service.title === 'Border Crossing Guide'
                                ? `/travel-planner/border-crossing-guide?from=${slug}`
                                : service.title === 'Personal Visa Guidance'
                                  ? `/personal-visa-guidance/${slug}`
                                  : '/#contact'
                        }
                      >
                        {service.cta}
                      </CardCta>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Independent Tour Guide service is available in selected destinations and subject to
            guide availability.
          </p>
        </div>
      </section>

      {/* Popular overland routes — placed directly under Travel Services
          (home of the Border Crossing Guide card) so overland routing and
          border-crossing guidance read together. */}
      <section className="overflow-hidden py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Popular Overland Routes
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Travelling beyond {countryName}? We can help you research routes between{' '}
              {countryName} and neighbouring countries.
            </p>
          </Reveal>
        </div>

        {/* Breaks out of the max-w-7xl container above so all the cards sit
            in one row that reaches close to both edges of the screen, not
            just the container's own bounds — the same full-bleed treatment
            as the homepage's Explore our Destinations row. */}
        <div className="mt-10 grid grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-5 lg:px-3">
          {routes.map((route, i) => (
            <Reveal key={route.to} delay={i * 90}>
              <RouteCard countryName={countryName} route={route} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* First-time traveller's guide */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-card shadow-lift lg:flex lg:items-stretch">
            <div className="p-8 sm:p-10 lg:w-3/5 lg:p-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-copper">
                <BookOpen className="size-4" aria-hidden="true" />
                {guide.eyebrow}
              </span>
              <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{guide.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {guide.intro}
              </p>
              <div className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {guide.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
              <HashLink
                to={guide.cta.to}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {guide.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
            <div className="aspect-4/3 lg:aspect-auto lg:w-2/5">
              <img
                src={guide.image}
                alt={guide.imageAlt}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Not sure which service you need? */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative isolate overflow-hidden rounded-3xl bg-cocoa p-8 text-primary-foreground shadow-card sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 animate-float rounded-full bg-copper/20 blur-3xl"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4 sm:items-center">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                  <MessageSquare className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="section-eyebrow !text-gold">{askUs.eyebrow}</span>
                  <h2 className="mt-1 text-xl font-bold sm:text-2xl">{askUs.heading}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
                    {askUs.text}
                  </p>
                </div>
              </div>
              <HashLink
                to={askUs.cta.to}
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5 sm:self-center"
              >
                {askUs.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust row — same flat, dividers-only treatment as About Us. */}
      <section className="bg-cream pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {trust.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 text-center lg:px-6"
                >
                  <span className="grid size-12 place-items-center rounded-full border-2 border-copper text-copper">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* Farewell strip */}
      <section className="bg-cocoa py-6 text-center text-primary-foreground">
        <p className="text-sm font-bold">{farewell.heading}</p>
        <p className="mt-1 text-xs text-primary-foreground/70">{farewell.text}</p>
      </section>
    </>
  )
}
