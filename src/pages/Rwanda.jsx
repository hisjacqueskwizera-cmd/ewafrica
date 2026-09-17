import { ArrowRight, CheckCircle2, FileText, Mail, Map, Plane, ShieldCheck, Signpost, Users } from 'lucide-react'
import { useEffect } from 'react'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { OverlandRoutesSection } from '../components/RouteCard.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { RWANDA_PAGE } from '../data/siteContent.js'

const ICONS = { FileText, Map, Signpost, Users, ShieldCheck, Mail, Plane }

export function Rwanda() {
  useEffect(() => {
    document.title = 'Explore Rwanda | East-West Africa Link'
  }, [])

  const { hero, services, routes, benefits, closing } = RWANDA_PAGE

  return (
    <>
      {/* Hero — the same full-viewport hero every destination page shares,
          lifted from About Us. Rwanda's "Land of a Thousand Hills"
          subheading folds into the description paragraph. */}
      <DestinationHero
        heading="Explore Rwanda"
        description={`${hero.subheading}. ${hero.description}`}
        backgroundImage={hero.image}
        backgroundImageAlt={hero.imageAlt}
      />

      {/* Our Services for Rwanda */}
      <section id="rwanda-services" className="scroll-mt-28 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="mx-auto flex items-center justify-center gap-3">
              <span className="h-px w-10 border-t border-copper/50" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-copper">
                How We Can Help
              </span>
              <span className="h-px w-10 border-t border-copper/50" aria-hidden="true" />
            </span>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              Our Services for Rwanda
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Practical guidance. Personalized support. A smoother journey.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = ICONS[service.icon]
              return (
                <Reveal key={service.title} delay={i * 90}>
                  <article className="flex h-full flex-col rounded-2xl bg-card shadow-card">
                    <div className="aspect-4/3 overflow-hidden rounded-t-2xl">
                      <img
                        src={service.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>
                    <span className="relative z-10 -mt-6 ml-6 grid size-14 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground shadow-card">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div className="flex flex-1 flex-col p-6 pt-3">
                      <h3 className="text-lg font-bold text-primary">{service.title}</h3>
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
                      <HashLink
                        to={
                          service.title === 'Travel Planner'
                            ? '/travel-planner?destination=rwanda'
                            : service.title === 'Border Crossing Guide'
                              ? '/travel-planner/border-crossing-guide?from=rwanda'
                              : service.title === 'Personal Visa Guidance'
                                ? '/personal-visa-guidance/rwanda'
                                : '/#contact'
                        }
                        className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-cocoa px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                      >
                        View Details
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </HashLink>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular overland routes — shared with every other country page,
          see RouteCard.jsx. */}
      <OverlandRoutesSection countryName="Rwanda" slug="rwanda" routes={routes} />

      {/* Benefits row — same flat, outline-icon treatment as the trust row
          elsewhere, just different content: what makes this service worth
          using, not general trust statements. */}
      <section className="bg-cream pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {benefits.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="flex flex-col items-center gap-3 text-center lg:px-6">
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

      {/* Closing banner — a centered italic quote, not a farewell strip. */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative isolate overflow-hidden rounded-3xl bg-cocoa p-8 text-center text-primary-foreground shadow-card sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-56 animate-float rounded-full bg-copper/20 blur-3xl"
            />
            <p className="relative text-xl italic leading-relaxed text-primary-foreground sm:text-2xl">
              {closing.quote}
            </p>
            <HashLink
              to={closing.cta.to}
              className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
            >
              {closing.cta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </HashLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
