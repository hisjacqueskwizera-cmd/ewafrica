import {
  ArrowRight,
  Banknote,
  Bus,
  Camera,
  Car,
  Clock,
  CloudRain,
  Coins,
  FileText,
  Globe2,
  Handshake,
  Heart,
  Info,
  PawPrint,
  Route as RouteIcon,
  Shield,
  Signpost,
  Smartphone,
  Sun,
  Thermometer,
  Users,
  Waves,
} from 'lucide-react'
import { useEffect } from 'react'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { ZAMBIA_PAGE } from '../data/siteContent.js'

const ICONS = {
  Sun,
  Thermometer,
  CloudRain,
  Waves,
  Clock,
  Banknote,
  Signpost,
  PawPrint,
  Heart,
  FileText,
  Bus,
  RouteIcon,
  Shield,
  Users,
  Globe2,
  Handshake,
}

export function Zambia() {
  useEffect(() => {
    document.title = 'Explore Zambia | East-West Africa Link'
  }, [])

  const { hero, seasons, beforeYouGo, places, currency, simCards, gettingAround, overland, tips, helpWith, helpPhoto, trust, farewell } =
    ZAMBIA_PAGE

  return (
    <>
      {/* Hero — the same full-viewport hero every destination page shares,
          lifted from About Us. */}
      <DestinationHero heading="Explore Zambia" description={hero.description} backgroundImage={hero.image} backgroundImageAlt={hero.imageAlt} />

      {/* When to Visit */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-cocoa text-primary-foreground">
              <Camera className="size-4" aria-hidden="true" />
            </span>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">When to Visit</h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.map((season, i) => {
              const Icon = ICONS[season.icon]
              return (
                <Reveal key={season.period} delay={i * 90}>
                  <div className="flex h-full flex-col rounded-2xl bg-card p-6 shadow-card">
                    <Icon className="size-6 text-copper" aria-hidden="true" />
                    <span className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-copper">
                      {season.period}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-primary">{season.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {season.text}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Before You Go / Where to Go / Money & Getting Around */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal className="flex h-full flex-col rounded-3xl bg-card p-6 shadow-card sm:p-7">
              <span className="grid size-11 place-items-center rounded-full bg-cocoa text-primary-foreground">
                <Globe2 className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-primary">Before You Go</h3>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-copper">
                Visa &amp; Entry
              </p>
              <div className="mt-2 flex-1 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {beforeYouGo.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <HashLink
                to="/#contact"
                className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-cocoa px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Get Personal Visa Guidance
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </HashLink>
            </Reveal>

            <Reveal delay={90} className="flex h-full flex-col rounded-3xl bg-card p-6 shadow-card sm:p-7">
              <span className="grid size-11 place-items-center rounded-full bg-cocoa text-primary-foreground">
                <Camera className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-primary">Where to Go</h3>
              <ul className="mt-3 flex-1 space-y-3">
                {places.map((place) => (
                  <li key={place.name}>
                    <p className="text-sm font-bold text-primary">{place.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {place.text}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180} className="flex h-full flex-col rounded-3xl bg-card p-6 shadow-card sm:p-7">
              <span className="grid size-11 place-items-center rounded-full bg-cocoa text-primary-foreground">
                <Car className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-primary">
                Money, SIM Cards &amp; Getting Around
              </h3>

              <div className="mt-3 flex items-start gap-2">
                <Coins className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-copper">Currency</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{currency}</p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2">
                <Smartphone className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-copper">
                    SIM Cards &amp; Data
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{simCards}</p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2">
                <Bus className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-copper">
                    Getting Around
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Travel in Zambia may involve:
                  </p>
                  <ul className="mt-1 grid grid-cols-1 gap-x-4 gap-y-1 text-xs text-muted-foreground sm:grid-cols-2">
                    {gettingAround.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="mt-1 size-1 shrink-0 rounded-full bg-copper" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs italic leading-relaxed text-muted-foreground">
                    Distances can be long — allow enough time between destinations.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Traveling overland */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl shadow-lift lg:grid lg:grid-cols-5">
            <div className="relative isolate overflow-hidden p-8 text-primary-foreground sm:p-10 lg:col-span-3">
              <img
                src={overland.image}
                alt={overland.imageAlt}
                aria-hidden="true"
                className="absolute inset-0 -z-10 size-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-cocoa/80" aria-hidden="true" />
              <span className="grid size-11 place-items-center rounded-full border-2 border-copper text-copper">
                <Signpost className="size-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-xl font-bold sm:text-2xl">Traveling Overland?</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80">
                {overland.text}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {overland.neighbours.map((country) => (
                  <span
                    key={country}
                    className="rounded-full border border-primary-foreground/25 px-3 py-1 text-xs font-semibold text-primary-foreground"
                  >
                    {country}
                  </span>
                ))}
              </div>
              <p className="mt-4 max-w-md text-xs italic leading-relaxed text-primary-foreground/70">
                {overland.note}
              </p>
            </div>

            <div className="flex flex-col gap-4 bg-card p-8 sm:p-10 lg:col-span-2">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-copper">
                <RouteIcon className="size-5" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Rather than providing all the details here, we can research the specific route you
                are planning.
              </p>
              <HashLink
                to="/travel-planner?destination=zambia"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-cocoa px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Plan My Route
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
              <HashLink
                to="/#contact"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
              >
                Get a Border Crossing Guide
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>

              <div className="mt-2 flex items-start gap-3 rounded-xl bg-sand p-4">
                <Info className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-primary">
                    Tour Guide Service
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Tour Guide service is not available in Zambia at this time.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* First-time traveler tips */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-cocoa text-primary-foreground">
              <Info className="size-4" aria-hidden="true" />
            </span>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">First-Time Traveler Tips</h2>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {tips.map((tip, i) => {
              const Icon = ICONS[tip.icon]
              return (
                <Reveal key={tip.title} delay={i * 70} className="flex flex-col items-center text-center">
                  <Icon className="size-6 text-copper" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-bold text-primary">{tip.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{tip.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Not sure where to start? */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-cocoa text-primary-foreground shadow-card">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.2fr_0.8fr] lg:items-center">
              <div className="flex flex-col gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                  <Users className="size-5" aria-hidden="true" />
                </span>
                <span className="section-eyebrow !text-gold">Not Sure Where to Start?</span>
                <p className="text-sm leading-relaxed text-primary-foreground/80">
                  Tell us where you are traveling, when you plan to go and what you need help with.
                </p>
                <HashLink
                  to="/#contact"
                  className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
                >
                  Get Personalized Guidance
                  <ArrowRight className="size-4" aria-hidden="true" />
                </HashLink>
              </div>

              <div>
                <p className="text-sm font-semibold text-primary-foreground">
                  East-West Africa Link can help with:
                </p>
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {helpWith.map((item) => {
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

              <div className="hidden aspect-square overflow-hidden rounded-2xl lg:block">
                <img src={helpPhoto} alt="" aria-hidden="true" className="size-full object-cover" />
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

      {/* Farewell strip — a light, welcoming close rather than a dark cocoa
          bar, matching the reference. */}
      <section className="bg-sand py-8 text-center">
        <p className="text-lg font-bold italic text-primary">{farewell.heading}</p>
        <p className="mt-1 text-sm text-muted-foreground">{farewell.text}</p>
      </section>
    </>
  )
}
