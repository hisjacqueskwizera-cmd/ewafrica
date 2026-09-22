import {
  ArrowRight,
  Backpack,
  Bike,
  Bus,
  Camera,
  Car,
  CheckCircle2,
  Clock,
  CloudRain,
  Coins,
  FileText,
  Leaf,
  MapPin,
  Plane,
  RouteIcon,
  ShieldCheck,
  Signpost,
  Smartphone,
  Sun,
  Syringe,
  Users,
  Wallet,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { BottomSheetModal } from '../components/BottomSheetModal.jsx'
import { CountrySubNav } from '../components/CountrySubNav.jsx'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { UGANDA_DATA } from '../data/ugandaGuideContent.js'

const ICONS = {
  Sun,
  CloudRain,
  FileText,
  Syringe,
  ShieldCheck,
  Coins,
  Smartphone,
  Bus,
  Bike,
  Car,
  Plane,
  Signpost,
  Clock,
  Wallet,
  Backpack,
  Users,
  Leaf,
  Camera,
  RouteIcon,
  MapPin,
}

export function UgandaPracticalGuide() {
  useEffect(() => {
    document.title = 'Uganda Practical Travel Guide | East-West Africa Link'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const {
    hero,
    seasons,
    prepare,
    topPlaces,
    currency,
    sim,
    gettingAround,
    travelingOverland,
    firstTimeTips,
    closing,
    farewell,
  } = UGANDA_DATA

  const [selectedPlace, setSelectedPlace] = useState(null)

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <DestinationHero
        heading={hero.heading}
        description={`${hero.tagline}. ${hero.intro}`}
        backgroundImage={hero.backgroundImage}
        backgroundImageAlt={hero.backgroundImageAlt}
      />

      <CountrySubNav
        slug="uganda"
        countryName="Uganda"
        practicalGuideTo="/uganda/practical-guide#guide-overview"
      />

      {/* Intro */}
      <section id="guide-overview" className="relative scroll-mt-[140px] overflow-hidden pt-14 pb-4 sm:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-0 size-64 animate-float rounded-full bg-copper/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal big className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {hero.tagline}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {hero.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 1. When to Visit */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-4">
            <span className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block" aria-hidden="true" />
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              {seasons.heading}
            </h2>
            <span className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block" aria-hidden="true" />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {seasons.items.map((season, idx) => {
              const Icon = ICONS[season.icon] || Sun
              return (
                <Reveal key={season.label} delay={idx * 90} className="flex h-full">
                  <div className="flex h-full w-full flex-col gap-3 rounded-3xl bg-card p-6 shadow-card">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand/70 text-copper">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-primary">{season.label}</h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-copper">{season.tag}</p>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {season.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <p className="mt-6 text-center text-xs italic text-muted-foreground">{seasons.note}</p>
        </div>
      </section>

      {/* 2. Before You Go / Visa & Entry / Health & Vaccinations / Staying Safe */}
      <section className="border-y border-border/50 bg-cream/50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {prepare.cards.map((card, idx) => {
              const Icon = ICONS[card.icon] || FileText
              return (
                <Reveal key={card.id} delay={idx * 90} className="flex h-full">
                  <div className="group grid h-full w-full grid-cols-1 overflow-hidden rounded-3xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:grid-cols-5">
                    <div className="order-2 col-span-3 flex flex-col justify-between p-6 sm:order-1 sm:p-7">
                      <div>
                        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand/70 text-copper shadow-xs">
                          <Icon className="size-6" aria-hidden="true" />
                        </span>
                        <h3 className="mt-4 font-display text-lg font-bold text-primary">
                          {card.title}
                        </h3>
                        <div className="mt-2 space-y-2">
                          {card.paragraphs.map((p) => (
                            <p key={p} className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>

                      {card.cta && (
                        <HashLink
                          to={card.cta.to}
                          className="btn-copper mt-5 w-full justify-center text-xs py-2.5"
                        >
                          {card.cta.label}
                          <ArrowRight className="size-3.5" aria-hidden="true" />
                        </HashLink>
                      )}
                    </div>
                    <div className="order-1 col-span-2 aspect-video overflow-hidden bg-sand sm:aspect-auto sm:order-2">
                      <img
                        src={card.image}
                        alt={card.imageAlt ?? ''}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Where to Go */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {topPlaces.heading}
            </h2>
            {topPlaces.subheading && (
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {topPlaces.subheading}
              </p>
            )}
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topPlaces.places.map((place, idx) => (
              <Reveal key={place.id} delay={idx * 70} className="flex h-full">
                <article
                  id={place.id}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-sand">
                    <img
                      src={place.image}
                      alt={place.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"
                      aria-hidden="true"
                    />
                    {place.tag && (
                      <span className="absolute bottom-3 left-3 rounded-full bg-cocoa/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-xs">
                        {place.tag}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary">{place.name}</h3>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {place.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPlace(place)}
                      className="btn-copper mt-6 w-full cursor-pointer justify-center text-xs py-2.5"
                    >
                      Learn More
                      <ArrowRight
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Money, SIM Cards & Getting Around */}
      <section className="border-y border-border/50 bg-cream/50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              Money, SIM Cards &amp; Getting Around
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* Currency, SIM, Getting Around */}
            <div className="space-y-4">
              {[currency, sim].map((block) => {
                const Icon = ICONS[block.icon] || Coins
                return (
                  <Reveal key={block.title}>
                    <div className="rounded-2xl bg-card p-5 shadow-card">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand/70 text-copper">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
                          {block.title}
                        </h3>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        {block.paragraphs.map((p) => (
                          <p key={p} className="text-xs leading-relaxed text-muted-foreground">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )
              })}

              <Reveal>
                <div className="rounded-2xl bg-card p-5 shadow-card">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand/70 text-copper">
                      <Bus className="size-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
                      {gettingAround.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {gettingAround.intro}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {gettingAround.modes.map((mode) => {
                      const ModeIcon = ICONS[mode.icon] || Bus
                      return (
                        <div key={mode.label} className="flex flex-col items-center gap-1.5 text-center">
                          <span className="grid size-10 place-items-center rounded-full bg-sand/70 text-copper">
                            <ModeIcon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="text-[10px] leading-tight text-muted-foreground">
                            {mode.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    {gettingAround.note}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Traveling Overland — pictorial, full-height beside the
                stacked column above. */}
            <Reveal>
              <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-cocoa text-primary-foreground shadow-card">
                <div className="aspect-video w-full overflow-hidden bg-sand sm:aspect-auto sm:flex-1">
                  <img
                    src={travelingOverland.image}
                    alt={travelingOverland.imageAlt ?? ''}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3 p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                      <Signpost className="size-4" aria-hidden="true" />
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wide">
                      {travelingOverland.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-primary-foreground/85">
                    {travelingOverland.intro}
                  </p>
                  <div>
                    <p className="text-xs font-semibold text-primary-foreground/90">
                      {travelingOverland.label}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-3">
                      {travelingOverland.neighbours.map((n) => (
                        <span
                          key={n.name}
                          className="inline-flex items-center gap-1.5 text-xs text-primary-foreground/90"
                        >
                          <span aria-hidden="true">{n.flag}</span>
                          {n.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-primary-foreground/70">
                    {travelingOverland.note}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2.5">
                    {travelingOverland.ctas.map((cta) => (
                      <HashLink
                        key={cta.label}
                        to={cta.to}
                        className="inline-flex items-center gap-1.5 rounded-full bg-copper px-4 py-2 text-xs font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
                      >
                        {cta.label}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </HashLink>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. First-Time Traveler Tips */}
      <section className="border-y border-border/50 bg-cream/50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-4">
            <span className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block" aria-hidden="true" />
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              {firstTimeTips.heading}
            </h2>
            <span className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block" aria-hidden="true" />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {firstTimeTips.items.map((tip, idx) => {
              const Icon = ICONS[tip.icon] || Users
              return (
                <Reveal key={tip.title} delay={idx * 70} className="flex h-full">
                  <div className="flex h-full w-full flex-col items-center gap-2.5 text-center">
                    <span className="grid size-12 place-items-center rounded-full border-2 border-copper text-copper">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-xs font-bold text-primary">{tip.title}</h3>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">{tip.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Not Sure Where to Start? */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal big className="relative isolate overflow-hidden rounded-3xl shadow-lift">
            <img
              src={closing.backgroundImage}
              alt="A heron silhouetted at sunset on Lake Victoria, Uganda"
              loading="lazy"
              className="absolute inset-0 -z-20 size-full object-cover"
            />
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-cocoa/95 via-cocoa/85 to-cocoa/50"
              aria-hidden="true"
            />

            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:p-12">
              <div className="flex flex-col items-start gap-3 text-primary-foreground">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                  <Users className="size-5" aria-hidden="true" />
                </span>
                <h2 className="font-display text-xl font-bold sm:text-2xl">{closing.heading}</h2>
                <p className="max-w-md text-sm leading-relaxed text-primary-foreground/85">
                  {closing.text}
                </p>
                <HashLink
                  to={closing.cta.to}
                  className="mt-2 inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
                >
                  {closing.cta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </HashLink>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/80">
                  {closing.helpWithLabel}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {closing.helpWith.map((item) => {
                    const Icon = ICONS[item.icon] || FileText
                    return (
                      <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                        <span className="grid size-11 place-items-center rounded-full border-2 border-copper text-copper">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="text-[11px] font-semibold text-primary-foreground">
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

      {/* Farewell strip */}
      <section className="bg-sand py-8 text-center">
        <p className="text-lg font-bold italic text-primary">{farewell.heading}</p>
        <p className="mt-1 text-sm text-muted-foreground">{farewell.text}</p>
      </section>

      {/* --- Modal: Place details --- */}
      {selectedPlace && (
        <BottomSheetModal
          open={Boolean(selectedPlace)}
          onClose={() => setSelectedPlace(null)}
          title={selectedPlace.name}
          eyebrow={selectedPlace.tag}
        >
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="aspect-16/9 w-full object-cover"
              />
            </div>

            <div>
              <h4 className="font-display text-base font-bold text-primary">Overview &amp; Highlights</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {selectedPlace.details.highlight}
              </p>
            </div>

            <div className="rounded-xl bg-sand/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-copper">
                Best Season to Visit
              </p>
              <p className="mt-1 text-xs sm:text-sm text-primary">
                {selectedPlace.details.bestSeason}
              </p>
            </div>

            <div>
              <h4 className="font-display text-base font-bold text-primary">Top Activities &amp; Experiences</h4>
              <ul className="mt-3 space-y-2">
                {selectedPlace.details.activities.map((act) => (
                  <li key={act} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-copper/30 bg-cream p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Practical Traveler Tip
              </p>
              <p className="mt-1 text-xs sm:text-sm italic text-muted-foreground">
                "{selectedPlace.details.practicalTip}"
              </p>
            </div>

            <div className="pt-2">
              <HashLink
                to="/travel-planner?destination=uganda"
                className="btn-copper w-full justify-center text-xs py-3"
              >
                Plan a Trip to {selectedPlace.name}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
          </div>
        </BottomSheetModal>
      )}
    </div>
  )
}
