import {
  ArrowRight,
  Banknote,
  BookOpen,
  Bus,
  Camera,
  Car,
  CheckCircle2,
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
  ShieldCheck,
  Signpost,
  Smartphone,
  Sun,
  Thermometer,
  Users,
  Waves,
} from 'lucide-react'
import { useEffect } from 'react'
import { HashLink } from '../components/HashLink.jsx'
import { OverlandRoutesSection } from '../components/RouteCard.jsx'
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
  ShieldCheck,
  Users,
  Globe2,
  Handshake,
  BookOpen,
}

export function Zambia() {
  useEffect(() => {
    document.title = 'Travel Services for Zambia | East-West Africa Link'
  }, [])

  const {
    landingHero,
    servicesIntro,
    services,
    routes,
    landingTrust,
    closing,
    seasons,
    beforeYouGo,
    places,
    currency,
    simCards,
    gettingAround,
    overland,
    tips,
    helpWith,
    helpPhoto,
  } = ZAMBIA_PAGE

  return (
    <>
      {/* Hero — same full-viewport height, flat cocoa tint, serif display
          heading (same size scale) and single blur-fade reveal as every
          other destination page's DestinationHero, just composed inline
          here since this page also carries an eyebrow/tagline and a script
          watermark column that DestinationHero doesn't have a slot for. */}
      <section className="relative isolate flex h-svh min-h-[600px] items-center overflow-hidden px-4 text-primary-foreground sm:px-6 lg:px-8">
        <img
          src={landingHero.image}
          alt={landingHero.imageAlt}
          loading="eager"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-cocoa/45" aria-hidden="true" />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={150} blur>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              {landingHero.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-[3rem] font-normal leading-[1.1] text-balance sm:text-[4rem] lg:text-[5.375rem]">
              {landingHero.title}
            </h1>
            <p className="mt-4 text-lg font-semibold sm:text-xl">{landingHero.tagline}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
              {landingHero.description}
            </p>
          </Reveal>
          <Reveal delay={350} blur className="hidden text-right lg:block">
            <p className="font-display text-4xl italic text-primary-foreground/90">
              {landingHero.watermark}
            </p>
            <div className="mt-3 ml-auto h-px w-14 bg-gold" aria-hidden="true" />
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground/80">
              {landingHero.watermarkCaption.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Explore Our Services */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {servicesIntro.heading}
            </h2>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-copper">
              {servicesIntro.eyebrow}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {servicesIntro.description}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = ICONS[service.icon]
              return (
                <Reveal key={service.title} delay={i * 100}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-card">
                    <div className="aspect-4/3 overflow-hidden">
                      <img
                        src={service.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-center p-6 pt-0 text-center">
                      <span className="relative z-10 -mt-7 grid size-14 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground shadow-card">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-xl font-bold text-primary">{service.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      <ul className="mt-4 flex-1 space-y-1.5 self-stretch text-left">
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
                      <HashLink to={service.to} className="btn-copper mt-5 w-full justify-center">
                        View Details
                        <ArrowRight className="size-4" aria-hidden="true" />
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
      <OverlandRoutesSection countryName="Zambia" routes={routes} />

      {/* Trust row — flat, dividers-only row matching the reference. */}
      <section className="border-y border-border bg-cream py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {landingTrust.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="flex items-center justify-center gap-3 lg:px-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-bold leading-snug text-primary">
                    {item.title}
                    <br />
                    {item.title2}
                  </p>
                </div>
              )
            })}
          </Reveal>
        </div>
      </section>

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
                to="/travel-planner/border-crossing-guide?from=zambia"
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

      {/* Closing — full-bleed photo band with a script watermark, closing
          the landing page the way it opened. */}
      <section className="relative isolate overflow-hidden px-4 py-16 text-primary-foreground sm:px-6 lg:px-8 lg:py-20">
        <img
          src={closing.image}
          alt={closing.imageAlt}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-cocoa/55" aria-hidden="true" />
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-lg">
            <p className="font-display text-3xl italic text-primary-foreground/90">
              {closing.watermark}
            </p>
            <h2 className="mt-3 text-xl font-bold uppercase tracking-[0.04em] sm:text-2xl">
              {closing.heading}
            </h2>
            <div className="mt-3 h-px w-14 bg-gold" aria-hidden="true" />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
              {closing.body}
            </p>
          </Reveal>
          <Reveal delay={120} className="border-l-2 border-gold py-1 pl-5">
            <p className="font-display text-lg italic leading-snug sm:text-xl">
              {closing.quote.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
