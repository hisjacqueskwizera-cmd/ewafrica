import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Car,
  CheckCircle2,
  Compass,
  Info,
  Palmtree,
  UtensilsCrossed,
  Users,
} from 'lucide-react'
import { useEffect } from 'react'
import { CountrySubNav } from '../components/CountrySubNav.jsx'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { ZANZIBAR_DATA } from '../data/zanzibarContent.js'

const ICONS = {
  Users,
  Bus,
  Car,
  Compass,
  UtensilsCrossed,
}

export function ZanzibarGuide() {
  useEffect(() => {
    document.title = 'Zanzibar Culture & Practical Guide | East-West Africa Link'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const { hero, sections, moreToExplore } = ZANZIBAR_DATA

  return (
    <div className="bg-background min-h-screen">
      {/* Hero — same shared hero treatment as every other Tanzania page. */}
      <DestinationHero
        heading={hero.heading}
        description={`${hero.subheading}. ${hero.description}`}
        backgroundImage={hero.image}
        backgroundImageAlt={hero.imageAlt}
        overlayClassName="bg-black/35"
      />

      <CountrySubNav slug="tanzania" countryName="Tanzania" galleryTo="/tanzania#gallery" />

      {/* Breadcrumb back to the Tanzania Practical Guide */}
      <div className="border-b border-border/60 bg-cream/70 py-3.5 backdrop-blur-xs">
        <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <HashLink
            to="/tanzania/practical-guide"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-copper"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to Tanzania Practical Guide
          </HashLink>
        </div>
      </div>

      {/* Sections */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
            {sections.map((section, idx) => {
              const Icon = ICONS[section.icon] || Info
              return (
                <Reveal key={section.id} delay={idx * 90} className="flex h-full">
                  <article
                    id={section.id}
                    className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-card shadow-card"
                  >
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-sand">
                      <img
                        src={section.image}
                        alt={section.imageAlt ?? ''}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                      <span className="-mt-9 grid size-11 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground shadow-card">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>

                      <div>
                        <h3 className="font-display text-lg font-bold text-primary">
                          {section.title}
                        </h3>
                        <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-copper">
                          {section.subtitle}
                        </p>
                      </div>

                      {section.intro && (
                        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {section.intro}
                        </p>
                      )}

                      {section.bullets && (
                        <ul className="space-y-2">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-copper" aria-hidden="true" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.transportModes && (
                        <div className="space-y-3">
                          {section.transportModes.map((mode) => {
                            const ModeIcon = ICONS[mode.icon] || Info
                            return (
                              <div key={mode.title} className="flex items-start gap-3">
                                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-sand/70 text-copper">
                                  <ModeIcon className="size-4" aria-hidden="true" />
                                </span>
                                <div>
                                  <p className="text-xs font-bold text-primary">{mode.title}</p>
                                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                    {mode.text}
                                  </p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {section.list && (
                        <ul className="grid grid-cols-1 gap-1.5">
                          {section.list.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-copper" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.outro && (
                        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {section.outro}
                        </p>
                      )}

                      {section.helpText && (
                        <div className="mt-auto space-y-3 rounded-2xl bg-sand/50 p-4">
                          <span className="grid size-9 place-items-center rounded-full bg-cocoa text-primary-foreground">
                            <Users className="size-4" aria-hidden="true" />
                          </span>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {section.helpText}
                          </p>
                          <HashLink
                            to={section.cta.to}
                            className="btn-copper w-full cursor-pointer justify-center text-xs py-2.5"
                          >
                            {section.cta.label}
                            <ArrowRight className="size-3.5" aria-hidden="true" />
                          </HashLink>
                        </div>
                      )}

                      {section.quote && (
                        <p className="font-display text-sm italic text-primary/80">{section.quote}</p>
                      )}

                      {section.goodToKnow && (
                        <div className="mt-auto rounded-2xl border border-copper/30 bg-cream p-4">
                          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-copper">
                            <Palmtree className="size-3.5" aria-hidden="true" />
                            Good to Know
                          </p>
                          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                            {section.goodToKnow}
                          </p>
                        </div>
                      )}

                      {section.note && (
                        <div className="mt-auto rounded-2xl bg-sand/50 p-4">
                          <p className="text-xs leading-relaxed text-muted-foreground">{section.note}</p>
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* More to Explore CTA */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal big>
            <div className="relative isolate overflow-hidden rounded-3xl bg-cocoa text-primary-foreground shadow-lift sm:rounded-4xl">
              <img
                src={moreToExplore.backgroundImage}
                alt="Beach and palm trees in Zanzibar"
                loading="lazy"
                className="absolute inset-0 -z-20 size-full object-cover"
              />
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-cocoa/90 via-cocoa/70 to-cocoa/40"
                aria-hidden="true"
              />

              <div className="relative flex flex-col gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
                <div className="flex items-start gap-4 sm:items-center">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                    <Palmtree className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold sm:text-2xl">{moreToExplore.heading}</h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
                      {moreToExplore.text}
                    </p>
                  </div>
                </div>
                <HashLink
                  to={moreToExplore.cta.to}
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5 sm:self-center"
                >
                  {moreToExplore.cta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </HashLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
