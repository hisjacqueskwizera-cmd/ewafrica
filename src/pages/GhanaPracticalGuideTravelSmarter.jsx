import {
  ArrowRight,
  Handshake,
  Info,
  Lightbulb,
  RouteIcon,
  Shield,
  Users,
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

const ICONS = { Shield, RouteIcon, Lightbulb, Users, Handshake }

// Page 3 of 3 in the Ghana Practical Guide — "Travel Smarter": staying
// safe, overland connections, first-timer tips, packing, and responsible
// travel, closing with the site-wide "need help" CTA. Before-you-travel
// logistics live on page 1; where to go / food / culture on page 2.
export function GhanaPracticalGuideTravelSmarter() {
  useEffect(() => {
    document.title = 'Ghana Practical Guide — Travel Smarter | East-West Africa Link'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const { travelSmarter, readyToExplore } = GHANA_DATA

  const [selectedTip, setSelectedTip] = useState(null)

  return (
    <div className="bg-background min-h-screen">
      <GhanaGuideSubHero
        page={3}
        heading="Travel Smarter"
        tagline="Practical advice for moving around Ghana with confidence."
        image="/Pictures/Ghana/Gallery/fishing_boats.jpg"
        imageAlt="A coastal road along Ghana's Atlantic shoreline"
      />

      <CountrySubNav
        slug="ghana"
        countryName="Ghana"
        practicalGuideTo="/ghana/practical-guide#guide-overview"
      />

      <GuidePageSubNav pages={GHANA_GUIDE_PAGES} guideLabel="Ghana Practical Guide" />

      <section className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
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

      {/* Need Help Planning Ghana? CTA Banner */}
      <section className="pb-6 sm:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GhanaGuideFooterNav current={2} />
        </div>
      </section>

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
