import {
  ArrowRight,
  Briefcase,
  Bus,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe2,
  Handshake,
  HeartPulse,
  Home as HomeIcon,
  IdCard,
  Landmark,
  Shield,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react'
import { useEffect } from 'react'
import { Accordion } from '../components/Accordion.jsx'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { GHANA_PAGE } from '../data/siteContent.js'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'

const ICONS = {
  FileText,
  Bus,
  ShieldCheck,
  Users,
  Shield,
  Globe2,
  Handshake,
  IdCard,
  Briefcase,
  Wallet,
  HeartPulse,
  Home: HomeIcon,
  Landmark,
}

// Solid cocoa pill CTA — same shape every other destination page's service
// cards use. Every card here routes to /#contact except Travel Planner,
// which deep-links into the real flow (see the note on GHANA_PAGE above).
function CardCta({ to, children }) {
  return (
    <HashLink
      to={to}
      className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-cocoa px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
    >
      {children}
      <ArrowRight className="size-3.5" aria-hidden="true" />
    </HashLink>
  )
}

export function Ghana() {
  useEffect(() => {
    document.title = 'Ghana — Travel & Relocation | East-West Africa Link'
  }, [])

  const { hero, travelServices, residency, servicePackages, livingGuide, trust, farewell } =
    GHANA_PAGE

  return (
    <>
      {/* Hero — the same full-viewport hero every destination page shares,
          lifted from About Us. Ghana's subheading question and two
          description paragraphs fold into one flowing paragraph, matching
          About Us's own single-paragraph hero copy. */}
      <DestinationHero
        heading={`${hero.titleLine1} ${hero.titleAccent}`}
        description={`${hero.subheading} ${hero.description}`}
        backgroundImage={hero.backgroundImage}
        backgroundImageAlt={hero.backgroundImageAlt}
      />

      {/* Travel Services in Ghana — the same four cards every other
          destination page offers, so travelers (not just those relocating)
          have a clear path from this page too. */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-4">
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Travel Services in Ghana
            </h2>
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {travelServices.map((service, i) => {
              const Icon = ICONS[service.icon]
              return (
                <Reveal key={service.title} delay={i * 90}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-card">
                    <div className="aspect-4/3 overflow-hidden rounded-t-3xl">
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
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {service.text}
                      </p>
                      <CardCta
                        to={
                          service.title === 'Travel Planner'
                            ? '/travel-planner?destination=ghana'
                            : service.title === 'Independent Tour Guides'
                              ? '/independent-tour-guide/ghana'
                              : service.title === 'Border Crossing Guide'
                                ? '/travel-planner/border-crossing-guide?from=ghana'
                                : '/#contact'
                        }
                      >
                        {service.cta}
                      </CardCta>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Independent Tour Guide service is available in selected destinations and subject to
            guide availability.
          </p>
        </div>
      </section>

      {/* Residency & Immigration — photo / featured Right of Abode card /
          permit-pathway list as three distinct panels, plus a thin
          Ghana-flag accent strip on the far edge. */}
      <section id="right-of-abode" className="scroll-mt-28 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-4">
            <span
              className="hidden h-px max-w-16 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
            <div className="text-center">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
                {residency.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {residency.intro}
              </p>
            </div>
            <span
              className="hidden h-px max-w-16 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
          </Reveal>

          <Reveal
            delay={100}
            className="mt-10 overflow-hidden rounded-3xl shadow-lift lg:flex lg:items-stretch"
          >
            <div className="aspect-4/3 w-full shrink-0 overflow-hidden lg:aspect-auto lg:w-1/4">
              <img
                src={residency.image}
                alt={residency.imageAlt}
                loading="lazy"
                className="size-full object-cover object-top"
              />
            </div>

            <div className="flex flex-col justify-center gap-4 bg-gold/20 p-8 sm:p-10 lg:w-2/5">
              <span className="inline-flex w-fit items-center rounded-full bg-cocoa px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gold">
                {residency.featured.badge}
              </span>
              <div className="flex items-center gap-4">
                <img
                  src={residency.featured.image}
                  alt="Ghana"
                  className="h-9 w-14 shrink-0 rounded-[3px] object-cover shadow-card"
                />
                <h3 className="text-2xl font-bold text-primary sm:text-3xl">
                  {residency.featured.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-primary/75 sm:text-base">
                {residency.featured.text}
              </p>
              <HashLink
                to={residency.featured.cta.to}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
              >
                {residency.featured.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>

            <div className="flex flex-1 flex-col divide-y divide-border bg-card">
              {residency.pathways.map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <HashLink
                    key={item.title}
                    to="/#contact"
                    className="flex flex-1 items-center gap-4 p-6 transition-colors hover:bg-sand/50"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-copper">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-primary">{item.title}</h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                    <ChevronRight
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </HashLink>
                )
              })}
            </div>

            <div className="hidden shrink-0 lg:flex lg:w-6 lg:flex-col" aria-hidden="true">
              <span className="flex-1 bg-[#CE1126]" />
              <span className="flex-1 bg-[#FCD116]" />
              <span className="flex-1 bg-[#006B3F]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Explore Our Ghana Services — three priced relocation packages,
          previewed here and routed to /#contact for a real follow-up
          (no checkout flow exists yet). */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Explore Our Ghana Services
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Practical, personalized guidance to help you plan, relocate and settle in Ghana.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicePackages.map((service, i) => (
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
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-primary">{service.title}</h3>
                      <span className="shrink-0 text-base font-bold text-copper">
                        {service.price}
                      </span>
                    </div>
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
                      to="/#contact"
                      className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-cocoa px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                      View Details
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </HashLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ghana Living Guide — real, everyday-life information as an
          accordion (open a topic to read more) rather than tiles that all
          just point back to Contact. */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              {livingGuide.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {livingGuide.intro}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <Reveal className="rounded-3xl bg-card p-6 shadow-card sm:p-8">
              <Accordion
                items={livingGuide.topics.map((topic) => ({ ...topic, icon: ICONS[topic.icon] }))}
              />
              <HashLink
                to={livingGuide.cta.to}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {livingGuide.cta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </Reveal>

            <Reveal delay={90} className="grid grid-rows-2 gap-6">
              {livingGuide.sidePhotos.map((photo) => (
                <div key={photo.label} className="group relative overflow-hidden rounded-3xl shadow-card">
                  <img
                    src={photo.image}
                    alt={photo.alt}
                    loading="lazy"
                    className="size-full min-h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-cocoa/85 via-cocoa/10 to-transparent"
                    aria-hidden="true"
                  />
                  <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-primary-foreground">
                    {photo.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust row — same flat, dividers-only treatment as About, Founder,
          Explore and every other destination page. */}
      <section className="bg-cream pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {trust.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 text-center lg:px-6"
                >
                  <span className="grid size-12 place-items-center rounded-full border-2 border-copper text-copper">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* Farewell strip */}
      <section className="bg-cocoa py-6 text-center text-primary-foreground">
        <p className="text-sm font-bold">{farewell.heading}</p>
        <p className="mt-1 text-xs text-primary-foreground/70">{farewell.text}</p>
      </section>
    </>
  )
}
