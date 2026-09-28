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
import { GHANA_GUIDE_PAGES, GhanaGuideFooterNav } from '../components/GhanaGuidePager.jsx'
import { GhanaGuideSubHero } from '../components/GhanaGuideSubHero.jsx'
import { GuidePageSubNav } from '../components/GuidePageSubNav.jsx'
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
      {/* Hero — the same size/shape as every page of this guide (see
          GhanaGuideSubHero) so the three pages read as one flow rather
          than page 1 standing apart with a full-viewport treatment the
          other two don't have. */}
      <GhanaGuideSubHero
        page={1}
        heading="Before You Travel"
        tagline="Practical travel information to help you prepare for Ghana with confidence."
        image={hero.backgroundImage}
        imageAlt={hero.backgroundImageAlt}
      />

      {/* Sub-nav — shared across every Ghana page (Overview, Services,
          Popular Routes, Gallery, Practical Guide). Sticks directly under
          the fixed 84px header. */}
      <CountrySubNav
        slug="ghana"
        countryName="Ghana"
        practicalGuideTo="/ghana/practical-guide#guide-overview"
      />

      {/* Page-flow sub-sub-nav — sticks directly under CountrySubNav, the
          same way CountrySubNav sticks under the header. */}
      <GuidePageSubNav pages={GHANA_GUIDE_PAGES} guideLabel="Ghana Practical Guide" />

      {/* Before You Travel — Welcome, When to Visit, Before You Go, Visa,
          Health, Money, SIM & Connectivity, Getting Around. */}
      <section
        id="guide-overview"
        className="relative scroll-mt-[200px] overflow-hidden py-12 sm:py-16 lg:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-0 size-64 animate-float rounded-full bg-copper/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-10 size-56 animate-float rounded-full bg-forest/10 blur-3xl [animation-delay:1.5s]"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
