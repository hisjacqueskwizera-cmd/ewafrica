import {
  ArrowRight,
  Bus,
  CheckCircle2,
  CloudRain,
  Coins,
  FileText,
  Globe2,
  Info,
  Lightbulb,
  RouteIcon,
  ShieldCheck,
  Sparkles,
  Sun,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { BottomSheetModal } from '../components/BottomSheetModal.jsx'
import { CountrySubNav } from '../components/CountrySubNav.jsx'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { TANZANIA_DATA } from '../data/tanzaniaGuideContent.js'

const ICONS = {
  Sun,
  CloudRain,
  FileText,
  ShieldCheck,
  Coins,
  Globe2,
  Bus,
  RouteIcon,
  Lightbulb,
}

export function TanzaniaPracticalGuide() {
  useEffect(() => {
    document.title = 'Tanzania Practical Travel Guide | East-West Africa Link'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const { seasons, topPlaces, planJourney, travelSmarter, zanzibarCta } = TANZANIA_DATA

  const [selectedPlace, setSelectedPlace] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedTip, setSelectedTip] = useState(null)

  return (
    <div className="bg-background min-h-screen">
      {/* Hero — the same full-viewport hero every other Tanzania page shares. */}
      <DestinationHero
        heading="Tanzania & Zanzibar"
        description="A practical guide for first-time travelers to Tanzania — Karibu Tanzania, welcome! Tanzania is one of Africa's most rewarding destinations, a land of incredible wildlife, rich cultures and warm, welcoming people."
        backgroundImage="/Pictures/Tanzania/TZ_Hero_Section/IMG_4452.JPG"
        backgroundImageAlt="A Maasai traveler watching a herd of zebras cross the Tanzanian savannah"
        overlayClassName="bg-black/35"
      />

      {/* Sub-nav — shared across every Tanzania page. Sticks directly under
          the fixed 84px header. */}
      <CountrySubNav
        slug="tanzania"
        countryName="Tanzania"
        practicalGuideTo="/tanzania/practical-guide#guide-overview"
      />

      {/* Intro */}
      <section id="guide-overview" className="relative scroll-mt-[140px] overflow-hidden pt-14 pb-4 sm:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-0 size-64 animate-float rounded-full bg-copper/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-10 size-56 animate-float rounded-full bg-forest/10 blur-3xl [animation-delay:1.5s]"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal big className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex items-center justify-center gap-3">
              <span className="h-px w-10 border-t border-copper/50" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-copper">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Karibu Tanzania
              </span>
              <span className="h-px w-10 border-t border-copper/50" aria-hidden="true" />
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              Extraordinary Journeys Await
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Whether you are drawn to iconic safaris, the country's beautiful islands, or vibrant
              cities, Tanzania offers unforgettable experiences for every traveler. This practical
              guide gives you everything you need to plan with confidence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 1. When to Visit */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {seasons.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {seasons.subheading}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                      <p className="text-xs font-bold uppercase tracking-wider text-copper">
                        {season.tag}
                      </p>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {season.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 2. Where to Go */}
      <section className="border-y border-border/50 bg-cream/50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {topPlaces.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {topPlaces.subheading}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topPlaces.places.map((place, idx) => (
              <Reveal key={place.id} delay={idx * 90} className="flex h-full">
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
                    <span className="absolute bottom-3 left-3 rounded-full bg-cocoa/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-xs">
                      {place.tag}
                    </span>
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
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Before You Travel */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {planJourney.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {planJourney.subheading}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {planJourney.cards.map((card, idx) => {
              const Icon = ICONS[card.icon] || Info
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
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {card.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedPlan(card)}
                        className="btn-copper mt-5 w-full cursor-pointer justify-center text-xs py-2.5"
                      >
                        {card.buttonText}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="order-1 col-span-2 aspect-video overflow-hidden bg-sand sm:order-2 sm:aspect-auto">
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

      {/* 4. Travel Smarter */}
      <section className="border-y border-border/50 bg-cream/50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {travelSmarter.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {travelSmarter.subheading}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {travelSmarter.cards.map((card, idx) => {
              const Icon = ICONS[card.icon] || Info
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
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {card.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedTip(card)}
                        className="btn-copper mt-5 w-full cursor-pointer justify-center text-xs py-2.5"
                      >
                        Read More
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="order-1 col-span-2 aspect-video overflow-hidden bg-sand sm:order-2 sm:aspect-auto">
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

      {/* 5. Continue to Zanzibar CTA Banner */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20">
          <Reveal big>
            <div className="relative isolate overflow-hidden rounded-3xl bg-cocoa text-primary-foreground shadow-lift sm:rounded-4xl">
              <img
                src={zanzibarCta.backgroundImage}
                alt="Aerial view of Stone Town and its beach, Zanzibar"
                loading="lazy"
                className="absolute inset-0 -z-20 size-full object-cover"
              />
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-cocoa/90 via-cocoa/50 to-cocoa/20"
                aria-hidden="true"
              />

              <div className="relative flex flex-col items-center gap-6 p-8 text-center sm:p-12 lg:p-16">
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    {zanzibarCta.heading}
                  </h2>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-gold/90 sm:text-base">
                    {zanzibarCta.subheading}
                  </p>
                  <p className="mt-2 font-display text-base italic text-primary-foreground/80 sm:text-lg">
                    {zanzibarCta.tagline}
                  </p>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                  {zanzibarCta.description}
                </p>
                <HashLink to={zanzibarCta.cta.to} className="btn-copper">
                  {zanzibarCta.cta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </HashLink>
              </div>
            </div>
          </Reveal>
        </div>
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
                to="/travel-planner?destination=tanzania"
                className="btn-copper w-full justify-center text-xs py-3"
              >
                Plan a Trip to {selectedPlace.name}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
          </div>
        </BottomSheetModal>
      )}

      {/* --- Modal: Before You Travel details --- */}
      {selectedPlan && (
        <BottomSheetModal
          open={Boolean(selectedPlan)}
          onClose={() => setSelectedPlan(null)}
          title={selectedPlan.title}
          eyebrow="Practical Travel Information"
        >
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {selectedPlan.details.overview}
            </p>

            <div className="space-y-4">
              {selectedPlan.details.points.map((pt) => (
                <div key={pt.label} className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5">
                  <h4 className="font-bold text-sm text-primary">{pt.label}</h4>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {pt.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <HashLink
                to={selectedPlan.cta?.to ?? '/travel-planner?destination=tanzania'}
                className="btn-copper w-full justify-center text-xs py-3"
              >
                {selectedPlan.cta?.label ?? 'Get Personalized Planning Guidance'}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
          </div>
        </BottomSheetModal>
      )}

      {/* --- Modal: Travel Smarter details --- */}
      {selectedTip && (
        <BottomSheetModal
          open={Boolean(selectedTip)}
          onClose={() => setSelectedTip(null)}
          title={selectedTip.title}
          eyebrow="Practical Travel Information"
        >
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {selectedTip.details.overview}
            </p>

            <div className="space-y-4">
              {selectedTip.details.points.map((pt) => (
                <div key={pt.label} className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5">
                  <h4 className="font-bold text-sm text-primary">{pt.label}</h4>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {pt.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <HashLink
                to={selectedTip.cta?.to ?? '/travel-planner?destination=tanzania'}
                className="btn-copper w-full justify-center text-xs py-3"
              >
                {selectedTip.cta?.label ?? 'Get Personalized Planning Guidance'}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
          </div>
        </BottomSheetModal>
      )}
    </div>
  )
}
