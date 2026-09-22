import {
  ArrowRight,
  Briefcase,
  Bus,
  CalendarDays,
  FileText,
  Globe2,
  HeartPulse,
  Info,
  Sparkles,
  Wallet,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { BottomSheetModal } from '../components/BottomSheetModal.jsx'
import { CountrySubNav } from '../components/CountrySubNav.jsx'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { GhanaGuideFooterNav, GhanaGuidePills } from '../components/GhanaGuidePager.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { GHANA_DATA } from '../data/ghanaContent.js'
import { GHANA_PAGE } from '../data/siteContent.js'

const ICONS = {
  Sparkles,
  CalendarDays,
  Briefcase,
  FileText,
  HeartPulse,
  Wallet,
  Globe2,
  Bus,
}

// Page 1 of 3 in the Ghana Practical Guide — "Before You Travel": the
// welcome/orientation cards and everything to prepare before departure.
// Where to Go, food and culture live on page 2 (Experience Ghana), and
// safety/overland/packing on page 3 (Travel Smarter) — see
// GhanaPracticalGuideExperience.jsx and GhanaPracticalGuideTravelSmarter.jsx.
export function GhanaPracticalGuide() {
  useEffect(() => {
    document.title = 'Ghana Practical Guide — Before You Travel | East-West Africa Link'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const { planJourney } = GHANA_DATA
  const { hero } = GHANA_PAGE

  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <div className="bg-background min-h-screen">
      {/* Hero — the same full-viewport hero every other Ghana page shares.
          The only one of the guide's three pages that uses it, since it's
          the entry point most visitors land on. */}
      <DestinationHero
        heading={`${hero.titleLine1} ${hero.titleAccent}`}
        description={`${hero.subheading} ${hero.description}`}
        backgroundImage={hero.backgroundImage}
        backgroundImageAlt={hero.backgroundImageAlt}
      />

      {/* Sub-nav — shared across every Ghana page (Overview, Services,
          Popular Routes, Gallery, Practical Guide). Sticks directly under
          the fixed 84px header. */}
      <CountrySubNav
        slug="ghana"
        countryName="Ghana"
        practicalGuideTo="/ghana/practical-guide#guide-overview"
      />

      {/* Intro + page-flow pills */}
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
              Before You Travel
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Practical travel information to help you prepare for Ghana with confidence — a
              three-page guide, starting here.
            </p>
          </Reveal>

          <div className="mt-8">
            <GhanaGuidePills current={0} />
          </div>
        </div>
      </section>

      {/* Before You Travel — Welcome, When to Visit, Before You Go, Visa,
          Health, Money, SIM & Connectivity, Getting Around. */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
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

          <div className="mt-14">
            <GhanaGuideFooterNav current={0} />
          </div>
        </div>
      </section>

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
    </div>
  )
}
