import { ArrowRight, BookOpen, Bus, Car, CheckCircle2, FileText, Users } from 'lucide-react'
import { useEffect } from 'react'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { OverlandRoutesSection } from '../components/RouteCard.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { UGANDA_PAGE } from '../data/siteContent.js'

const ICONS = { FileText, Bus, Car, Users }

export function Uganda() {
  useEffect(() => {
    document.title = 'Explore Uganda | East-West Africa Link'
  }, [])

  const { hero, services, routes, guideItems, helpWith, closingLine } = UGANDA_PAGE

  return (
    <>
      {/* Hero — the same full-viewport hero every destination page shares,
          lifted from About Us. */}
      <DestinationHero
        heading={hero.heading}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        backgroundImageAlt={hero.backgroundImageAlt}
      />

      {/* Travel Services in Uganda — same card shape as every other
          destination page: description, checklist bullets, then a
          button. */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-4">
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-copper/50 sm:block"
              aria-hidden="true"
            />
            <h2 className="text-center text-lg font-bold uppercase tracking-[0.1em] text-primary sm:text-xl">
              Travel Services in Uganda
            </h2>
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-copper/50 sm:block"
              aria-hidden="true"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {services.map((service, i) => {
              const Icon = ICONS[service.icon]
              return (
                <Reveal key={service.title} delay={i * 90}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-card">
                    <div className="aspect-4/3 overflow-hidden">
                      <img
                        src={service.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>
                    <span className="relative z-10 -mt-6 ml-6 grid size-12 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground shadow-card">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-1 flex-col p-6 pt-3">
                      <h3 className="text-base font-bold text-primary">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {service.text}
                      </p>
                      <ul className="mt-4 flex-1 space-y-1.5">
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
                      <HashLink
                        to={
                          service.title === 'Travel Planner'
                            ? '/travel-planner?destination=uganda'
                            : service.title === 'Border Crossing Guide'
                              ? '/travel-planner/border-crossing-guide?from=uganda'
                              : service.title === 'Personal Visa Guidance'
                                ? '/personal-visa-guidance/uganda'
                                : '/#contact'
                        }
                        className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-cocoa px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                      >
                        {service.cta}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
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
      <OverlandRoutesSection countryName="Uganda" slug="uganda" routes={routes} />

      {/* Explore Uganda repeat banner + Practical Guide */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal from="left" className="relative isolate min-h-72 overflow-hidden rounded-3xl">
              <img
                src={hero.backgroundImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 -z-10 size-full object-cover"
              />
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-cocoa/90 via-cocoa/40 to-transparent"
                aria-hidden="true"
              />
              <div className="relative flex h-full flex-col justify-end p-8 sm:p-10">
                <span className="block h-1 w-12 rounded-full bg-copper" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-bold text-primary-foreground sm:text-3xl">
                  Explore Uganda
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/85">
                  {hero.description}
                </p>
              </div>
            </Reveal>

            <Reveal from="right" delay={120} className="flex overflow-hidden rounded-3xl bg-card shadow-lift">
              <div className="flex-1 p-8 sm:p-10">
                <span className="grid size-11 place-items-center rounded-full bg-cocoa text-primary-foreground">
                  <BookOpen className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-primary">Practical Guide</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A quick introduction for first-time travelers to Uganda.
                </p>
                <ul className="mt-4 space-y-2">
                  {guideItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <HashLink
                  to="/#contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Read the Practical Guide
                  <ArrowRight className="size-4" aria-hidden="true" />
                </HashLink>
              </div>
              <div className="hidden w-1/3 shrink-0 sm:block">
                <img
                  src={hero.backgroundImage}
                  alt="Uganda's green hills and forests"
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Need Personalized Guidance? — one continuous banner: guidance
          copy on the left, a divider, then the "can help with" list, with
          the photo bleeding through on the right. */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="relative isolate overflow-hidden rounded-3xl text-primary-foreground shadow-card">
            <img
              src={hero.backgroundImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-10 size-full object-cover"
            />
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-cocoa/95 via-cocoa/85 to-cocoa/30"
              aria-hidden="true"
            />
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:divide-x lg:divide-primary-foreground/20">
              <div className="flex flex-col gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                  <Users className="size-5" aria-hidden="true" />
                </span>
                <span className="section-eyebrow !text-gold">Need Personalized Guidance?</span>
                <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/85">
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

              <div className="lg:pl-8">
                <p className="text-sm font-semibold text-primary-foreground">
                  East-West Africa Link can help with:
                </p>
                <div className="mt-5 flex flex-wrap gap-6">
                  {helpWith.map((item) => {
                    const Icon = ICONS[item.icon]
                    return (
                      <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                        <span className="grid size-11 place-items-center rounded-full border-2 border-copper text-copper">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="max-w-24 text-xs font-semibold text-primary-foreground">
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

      {/* Closing line — no "You're welcome" farewell here, just the site's
          own tagline. */}
      <section className="bg-sand py-8">
        <div className="mx-auto flex max-w-2xl items-center justify-center gap-4 px-4">
          <span
            className="hidden h-px max-w-16 flex-1 border-t border-dashed border-copper/50 sm:block"
            aria-hidden="true"
          />
          <p className="text-center text-lg font-bold italic text-primary">{closingLine}</p>
          <span
            className="hidden h-px max-w-16 flex-1 border-t border-dashed border-copper/50 sm:block"
            aria-hidden="true"
          />
        </div>
      </section>
    </>
  )
}
