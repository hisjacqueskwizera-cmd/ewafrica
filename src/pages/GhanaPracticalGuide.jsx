import {
  ArrowRight,
  Bus,
  CalendarDays,
  CheckCircle2,
  FileText,
  Globe2,
  Handshake,
  HeartPulse,
  Info,
  Lightbulb,
  RouteIcon,
  Shield,
  Sparkles,
  UtensilsCrossed,
  Users,
  Wallet,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { BottomSheetModal } from '../components/BottomSheetModal.jsx'
import { CountrySubNav } from '../components/CountrySubNav.jsx'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { GHANA_DATA } from '../data/ghanaContent.js'
import { GHANA_PAGE } from '../data/siteContent.js'

const ICONS = {
  CalendarDays,
  FileText,
  HeartPulse,
  Wallet,
  Globe2,
  Bus,
  Shield,
  RouteIcon,
  Lightbulb,
  Users,
  Handshake,
}

export function GhanaPracticalGuide() {
  useEffect(() => {
    document.title = 'Ghana Practical Travel Guide | East-West Africa Link'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const { topPlaces, planJourney, travelSmarter, taste, readyToExplore } = GHANA_DATA
  const { hero } = GHANA_PAGE

  const [selectedPlace, setSelectedPlace] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedTip, setSelectedTip] = useState(null)

  return (
    <div className="bg-background min-h-screen">
      {/* Hero — the same full-viewport hero every other Ghana page shares. */}
      <DestinationHero
        heading={`${hero.titleLine1} ${hero.titleAccent}`}
        description={`${hero.subheading} ${hero.description}`}
        backgroundImage={hero.backgroundImage}
        backgroundImageAlt={hero.backgroundImageAlt}
        overlayClassName="bg-black/35"
      />

      {/* Sub-nav — shared across every Ghana page (Overview, Services,
          Popular Routes, Gallery, Practical Guide). Sticks directly under
          the fixed 84px header. */}
      <CountrySubNav
        slug="ghana"
        countryName="Ghana"
        practicalGuideTo="/ghana/practical-guide#guide-overview"
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
                Akwaaba, Ghana
              </span>
              <span className="h-px w-10 border-t border-copper/50" aria-hidden="true" />
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              Travel Smarter, From Accra to the North
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Ghana blends history, heritage, nature and warm West African hospitality. This
              practical guide gives you everything you need to plan with confidence and make the
              most of your time here.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 1. Where to Go */}
      <section className="py-12 sm:py-16 lg:py-20">
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

      {/* 2. Before You Travel */}
      <section className="border-y border-border/50 bg-cream/50 py-12 sm:py-16 lg:py-20">
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

      {/* 3. Travel Smarter */}
      <section className="py-12 sm:py-16 lg:py-20">
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

      {/* 4. A Taste of Ghana */}
      <section className="border-y border-border/50 bg-cream/50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {taste.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {taste.subheading}
            </p>
          </Reveal>

          <Reveal big className="mt-10 overflow-hidden rounded-3xl shadow-card">
            <img
              src={taste.image}
              alt={taste.imageAlt ?? ''}
              loading="lazy"
              className="aspect-[21/9] w-full object-cover"
            />
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {taste.dishes.map((dish, idx) => (
              <Reveal key={dish.title} delay={idx * 90} className="flex h-full">
                <div className="flex h-full w-full flex-col gap-3 rounded-3xl bg-card p-6 shadow-card sm:p-7">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand/70 text-copper">
                    <UtensilsCrossed className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-primary">{dish.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {dish.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={taste.dishes.length * 90} className="mt-8">
            <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-copper/30 bg-cream p-4 sm:p-5">
              <Info className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{taste.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Need Help Planning Ghana? CTA Banner */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20">
          <Reveal big>
            <div className="relative isolate overflow-hidden rounded-3xl bg-cocoa text-primary-foreground shadow-lift sm:rounded-4xl">
              <img
                src={readyToExplore.backgroundImage}
                alt="Ghana coastline at sunset"
                loading="lazy"
                className="absolute inset-0 -z-20 size-full object-cover"
              />
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-cocoa/90 via-cocoa/75 to-cocoa/45"
                aria-hidden="true"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 size-48 animate-float rounded-full bg-gold/20 blur-3xl"
              />

              <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_2fr_1fr] lg:items-center lg:p-16">
                <div className="hidden lg:block">
                  <p className="font-display text-3xl italic tracking-wide text-gold/90">
                    {readyToExplore.leftWatermark[0]}
                  </p>
                  <p className="mt-1 font-display text-xl italic tracking-wider text-primary-foreground/75">
                    {readyToExplore.leftWatermark[1]}
                  </p>
                  <div className="mt-3 h-px w-16 bg-gold/50" aria-hidden="true" />
                </div>

                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    {readyToExplore.heading}
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                    {readyToExplore.description}
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                    <HashLink to={readyToExplore.primaryBtn.to} className="btn-copper w-full sm:w-auto">
                      {readyToExplore.primaryBtn.text}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </HashLink>
                    <HashLink
                      to={readyToExplore.secondaryBtn.to}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/60 bg-primary-foreground/10 px-7 py-3.5 text-sm font-bold text-primary-foreground backdrop-blur-xs transition-all hover:bg-primary-foreground/25 sm:w-auto"
                    >
                      {readyToExplore.secondaryBtn.text}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </HashLink>
                    <HashLink
                      to={readyToExplore.tertiaryBtn.to}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/60 bg-primary-foreground/10 px-7 py-3.5 text-sm font-bold text-primary-foreground backdrop-blur-xs transition-all hover:bg-primary-foreground/25 sm:w-auto"
                    >
                      {readyToExplore.tertiaryBtn.text}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </HashLink>
                  </div>
                </div>

                <div className="hidden text-right lg:block">
                  <div className="space-y-1">
                    {readyToExplore.rightWatermark.map((word) => (
                      <p
                        key={word}
                        className="font-display text-lg italic tracking-widest text-primary-foreground/75"
                      >
                        {word}
                      </p>
                    ))}
                  </div>
                </div>
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
                to="/travel-planner?destination=ghana"
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
                to={selectedPlan.cta?.to ?? '/travel-planner?destination=ghana'}
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
                to={selectedTip.cta?.to ?? '/travel-planner?destination=ghana'}
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
