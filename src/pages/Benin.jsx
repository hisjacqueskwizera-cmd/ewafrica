import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Bus,
  CalendarDays,
  CheckCircle2,
  Compass,
  FileText,
  Globe2,
  Handshake,
  HeartPulse,
  Landmark,
  MapPin,
  Shield,
  Signpost,
  Users,
} from 'lucide-react'
import { useEffect } from 'react'
import { Accordion } from '../components/Accordion.jsx'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { BENIN_PAGE } from '../data/siteContent.js'

const ICONS = {
  FileText,
  Bus,
  Signpost,
  Users,
  Shield,
  Handshake,
  Briefcase,
  Globe2,
  CalendarDays,
  HeartPulse,
  Landmark,
  Compass,
  MapPin,
}

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

export function Benin() {
  useEffect(() => {
    document.title = 'Explore Benin | East-West Africa Link'
  }, [])

  const { hero, services, places, routes, guide, closing, trust, farewell } = BENIN_PAGE

  return (
    <>
      {/* Hero — the same full-viewport hero every destination page shares,
          lifted from About Us. */}
      <DestinationHero
        heading={hero.heading}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        backgroundImageAlt={hero.backgroundImageAlt}
      />

      {/* Travel Services in Benin — four cards, including Independent Tour
          Guides. */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-4">
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Travel Services in Benin
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
                        src={service.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>
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
                            ? '/travel-planner?destination=benin'
                            : service.title.startsWith('Independent Tour Guides')
                              ? '/independent-tour-guide/benin'
                              : service.title === 'Border Crossing Guide'
                                ? '/travel-planner/border-crossing-guide?from=benin'
                                : service.title === 'Personal Visa Guidance'
                                  ? '/personal-visa-guidance/benin'
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
            * Independent Tour Guide service is available in selected destinations and subject to
            guide availability.
          </p>
        </div>
      </section>

      {/* Where to go — real Benin destinations. */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Where to Go in Benin
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A handful of destinations worth building your trip around.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {places.map((place, i) => (
              <Reveal key={place.name} delay={i * 90}>
                <div className="flex h-full flex-col gap-2 rounded-2xl bg-card p-5 shadow-card">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-copper">
                    <MapPin className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm font-bold text-primary">{place.name}</h3>
                  <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
                    {place.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Popular overland routes */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Popular Overland Routes to Benin
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Routes, transportation connections and border procedures vary depending on your
              journey.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((route, i) => (
              <Reveal key={route.from} delay={i * 90}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card">
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={route.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-sm font-bold text-primary">{route.from} → Benin</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {route.text}
                    </p>
                    <HashLink
                      to="/#contact"
                      className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-cocoa px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                      Explore Route
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </HashLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Practical guide preview — an accordion of real topic summaries. */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-card shadow-lift lg:flex lg:items-stretch">
            <div className="p-8 sm:p-10 lg:w-3/5 lg:p-12">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                  <BookOpen className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-xl font-bold uppercase tracking-[0.08em] text-primary sm:text-2xl">
                  {guide.heading}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {guide.intro}
              </p>
              <div className="mt-5">
                <Accordion
                  items={guide.topics.map((topic) => ({ ...topic, icon: ICONS[topic.icon] }))}
                />
              </div>
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

      {/* Need Personalized Guidance? */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-cocoa text-primary-foreground shadow-card">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div className="flex flex-col gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                  <Compass className="size-5" aria-hidden="true" />
                </span>
                <span className="section-eyebrow !text-gold">{closing.eyebrow}</span>
                <p className="text-sm leading-relaxed text-primary-foreground/80">{closing.text}</p>
                <HashLink
                  to={closing.cta.to}
                  className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
                >
                  {closing.cta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </HashLink>
              </div>

              <div>
                <p className="text-sm font-semibold text-primary-foreground">
                  East-West Africa Link can help with:
                </p>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {closing.helpWith.map((item) => {
                    const Icon = ICONS[item.icon]
                    return (
                      <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                        <span className="grid size-11 place-items-center rounded-full border-2 border-copper text-copper">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-semibold text-primary-foreground">
                          {item.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust row — same flat, dividers-only treatment used across every
          destination page. */}
      <section className="bg-cream pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {trust.map((item) => {
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

      {/* Farewell strip — a single welcoming line, matching the reference
          (no supporting text here). */}
      <section className="bg-sand py-8 text-center">
        <p className="text-lg font-bold italic text-primary">{farewell.heading}</p>
      </section>
    </>
  )
}
