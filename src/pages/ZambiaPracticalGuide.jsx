import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  Coins,
  Info,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { BottomSheetModal } from '../components/BottomSheetModal.jsx'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { ZAMBIA_DATA } from '../data/zambiaContent.js'

const ICONS = {
  Calendar,
  Car,
  Coins,
  ShieldCheck,
}

export function ZambiaPracticalGuide() {
  useEffect(() => {
    document.title = 'Zambia Practical Travel Guide | East-West Africa Link'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const { topPlaces, planJourney, whyExplore, readyToExplore } = ZAMBIA_DATA

  // State for modals
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <div className="bg-background min-h-screen">
      {/* Hero — the same full-viewport hero every destination page shares. */}
      <DestinationHero
        heading="Zambia Practical Guide"
        description="Everything you need to plan a smooth, confident trip — from Victoria Falls and safari country to money, transport and border crossings."
        backgroundImage="/Pictures/zambia/Hero_Section/Zambia_Pr_Hero_Section.JPG"
        backgroundImageAlt="The Zambezi River rushing through the Batoka Gorge below Victoria Falls, Zambia"
      />

      {/* Subtle top sub-nav / breadcrumb */}
      <div className="border-b border-border/60 bg-cream/70 py-3.5 backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <HashLink
            to="/zambia"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-copper"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to Zambia Overview
          </HashLink>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-copper">
            Zambia Practical Guide
          </span>
        </div>
      </div>

      {/* 1. Top Places to Experience in Zambia */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {topPlaces.heading}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {topPlaces.subheading}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topPlaces.places.map((place, idx) => (
              <Reveal key={place.id} delay={idx * 100} className="flex h-full">
                <article
                  id={place.id}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-card shadow-card transition-shadow duration-300 hover:shadow-lift"
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
                      <h2 className="font-display text-xl font-bold text-primary">{place.name}</h2>
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
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Plan Your Zambia Journey */}
      <section className="bg-cream/50 border-y border-border/50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {planJourney.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {planJourney.subheading}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {planJourney.cards.map((card, idx) => {
              const Icon = ICONS[card.icon] || Info
              return (
                <Reveal key={card.id} delay={idx * 100} className="flex h-full">
                  <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-card p-6 text-center shadow-card transition-shadow duration-300 hover:shadow-lift sm:p-7">
                    <div className="flex flex-col items-center">
                      <span className="grid size-14 place-items-center rounded-2xl bg-sand/70 text-copper shadow-xs">
                        <Icon className="size-7" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-bold text-primary">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {card.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan(card)}
                      className="btn-copper mt-6 w-full cursor-pointer justify-center text-xs py-2.5"
                    >
                      {card.buttonText}
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Why Explore Zambia? */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {whyExplore.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {whyExplore.subheading}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {whyExplore.cards.map((card, idx) => (
              <Reveal key={card.title} delay={idx * 120} className="flex h-full">
                <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-card shadow-card transition-shadow duration-300 hover:shadow-lift">
                  <div className="aspect-16/10 w-full overflow-hidden bg-sand">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="font-display text-xl font-bold text-primary">{card.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ready to Explore Zambia? CTA Banner */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-3xl bg-cocoa text-primary-foreground shadow-lift sm:rounded-4xl">
              {/* Background photo */}
              <img
                src={readyToExplore.backgroundImage}
                alt="Zambia river at sunset with wildlife"
                loading="lazy"
                className="absolute inset-0 -z-20 size-full object-cover"
              />
              {/* Warm gradient overlay matching mockup */}
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-cocoa/90 via-cocoa/75 to-cocoa/45"
                aria-hidden="true"
              />

              <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_2fr_1fr] lg:items-center lg:p-16">
                {/* Left watermark script */}
                <div className="hidden lg:block">
                  <p className="font-display text-3xl italic tracking-wide text-gold/90">
                    {readyToExplore.leftWatermark[0]}
                  </p>
                  <p className="mt-1 font-display text-xl italic tracking-wider text-primary-foreground/75">
                    {readyToExplore.leftWatermark[1]}
                  </p>
                  <div className="mt-3 h-px w-16 bg-gold/50" aria-hidden="true" />
                </div>

                {/* Center content */}
                <div className="text-center">
                  <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    {readyToExplore.heading}
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                    {readyToExplore.description}
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <HashLink
                      to={readyToExplore.primaryBtn.to}
                      className="btn-copper w-full sm:w-auto"
                    >
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
                  </div>
                </div>

                {/* Right watermark vertical list */}
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

      {/* --- Modals for Places --- */}
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
                to="/travel-planner/service-details?destinations=zambia"
                className="btn-copper w-full justify-center text-xs py-3"
              >
                Plan a Trip to {selectedPlace.name}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
          </div>
        </BottomSheetModal>
      )}

      {/* --- Modals for Planning Journey Cards --- */}
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
                to="/travel-planner/service-details?destinations=zambia"
                className="btn-copper w-full justify-center text-xs py-3"
              >
                Get Personalized Planning Guidance
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
          </div>
        </BottomSheetModal>
      )}
    </div>
  )
}
