import {
  ArrowRight,
  BookOpen,
  Bus,
  CalendarDays,
  CheckCircle2,
  Compass,
  FileText,
  Globe2,
  Handshake,
  HeartPulse,
  Landmark,
  MapPin,
  Shield,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useEffect } from 'react'
import { Accordion } from '../components/Accordion.jsx'
import { CountrySubNav } from '../components/CountrySubNav.jsx'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { PhotoGallerySection } from '../components/PhotoGallery.jsx'
import { OverlandRoutesSection } from '../components/RouteCard.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { SENEGAL_PAGE } from '../data/siteContent.js'

const SENEGAL_GALLERY_TILES = [
  {
    src: '/Pictures/Senegal/Gallery/goree_waterfront.jpg',
    alt: "Gorée Island's colonial waterfront seen from the water, Senegal",
    title: 'Gorée Island',
    subtitle: 'A UNESCO World Heritage waterfront',
  },
  {
    src: '/Pictures/Senegal/Gallery/goree_fort.jpg',
    alt: 'The old fort on Gorée Island with a fishing pirogue passing by',
    title: 'Castel Fort, Gorée',
    subtitle: 'The old fort above the Atlantic',
  },
  {
    src: '/Pictures/Senegal/Gallery/saint_louis_pirogues.jpg',
    alt: "Colorful painted pirogues in Saint-Louis' fishing harbor, Senegal",
    title: 'Saint-Louis',
    subtitle: 'Colorful pirogues fill the harbor',
  },
  {
    src: '/Pictures/Senegal/Gallery/goree_lane.jpg',
    alt: 'A bougainvillea-lined sandy lane on Gorée Island, Senegal',
    title: 'Gorée Island',
    subtitle: 'Bougainvillea-lined lanes',
  },
  {
    src: '/Pictures/Senegal/Gallery/zebu_cattle.jpg',
    alt: 'Long-horned zebu cattle herded through a dusty village street in Senegal',
    title: 'Village Life',
    subtitle: 'Cattle herded through a dusty street',
  },
]

const SENEGAL_GALLERY_EXTRA_TILES = [
  {
    src: '/Pictures/Senegal/Gallery/saint_louis_carriages.jpg',
    alt: "Horse-drawn carriages on Saint-Louis' colonial streets, Senegal",
    title: 'Saint-Louis',
    subtitle: 'Colonial streets and horse-drawn carriages',
  },
  {
    src: '/Pictures/Senegal/Gallery/goree_memorial.jpg',
    alt: 'The Statue of the Liberation from Slavery on Gorée Island, Senegal',
    title: 'Gorée Island',
    subtitle: 'A memorial to freedom and remembrance',
  },
]

const ICONS = {
  FileText,
  Bus,
  ShieldCheck,
  Users,
  Shield,
  Globe2,
  Handshake,
  CalendarDays,
  MapPin,
  HeartPulse,
  Landmark,
  Compass,
}

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

export function Senegal() {
  useEffect(() => {
    document.title = 'Explore Senegal | East-West Africa Link'
  }, [])

  const { hero, services, routes, guide, closing, trust, farewell } = SENEGAL_PAGE

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

      <CountrySubNav slug="senegal" countryName="Senegal" />

      <PhotoGallerySection
        heading="A Glimpse of Senegal"
        subheading="Golden light, red earth and iconic baobabs — a first look at the sights waiting across Senegal."
        tiles={SENEGAL_GALLERY_TILES}
        variant="mosaic"
        extraTiles={SENEGAL_GALLERY_EXTRA_TILES}
      />

      {/* Travel Services in Senegal */}
      <section id="services" className="scroll-mt-[140px] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-4">
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Travel Services in Senegal
            </h2>
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
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
                      <CardCta
                        to={
                          service.title === 'Travel Planner'
                            ? '/travel-planner?destination=senegal'
                            : service.title === 'Border Crossing Guide'
                              ? '/travel-planner/border-crossing-guide?from=senegal'
                              : service.title === 'Personal Visa Guidance'
                                ? '/personal-visa-guidance/senegal'
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
        </div>
      </section>

      {/* Popular overland routes — shared with every other country page,
          see RouteCard.jsx. */}
      <OverlandRoutesSection countryName="Senegal" slug="senegal" routes={routes} />

      {/* Practical guide — an accordion of real topic summaries. */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-card shadow-lift lg:flex lg:items-stretch">
            <div className="p-8 sm:p-10 lg:w-3/5 lg:p-12">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                  <BookOpen className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-xl font-bold uppercase tracking-[0.08em] text-primary sm:text-2xl">
                  {guide.heading}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {guide.intro}
              </p>
              <div className="mt-5">
                <Accordion
                  items={guide.topics.map((topic) => ({ ...topic, icon: ICONS[topic.icon] }))}
                />
              </div>
            </div>
            <div className="aspect-4/3 lg:aspect-auto lg:w-2/5">
              <img
                src={guide.image}
                alt={guide.imageAlt}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Need Personalized Guidance? — guidance copy on the left, a photo
          panel on the right listing what we help with. */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-cocoa text-primary-foreground shadow-card">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col gap-4 p-8 sm:p-10">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                  <Users className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <span className="section-eyebrow !text-gold">{closing.eyebrow}</span>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                    {closing.text}
                  </p>
                </div>
                <HashLink
                  to={closing.cta.to}
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
                >
                  {closing.cta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </HashLink>
              </div>

              <div className="relative isolate overflow-hidden p-8 sm:p-10">
                <img
                  src={closing.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 size-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-cocoa/80" aria-hidden="true" />
                <p className="text-sm font-semibold text-primary-foreground">
                  East-West Africa Link can help with:
                </p>
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {closing.helpWith.map((item) => {
                    const Icon = ICONS[item.icon]
                    return (
                      <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                        <span className="grid size-11 place-items-center rounded-full border-2 border-copper text-copper">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-semibold text-primary-foreground">
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

      {/* Trust row — same flat, dividers-only treatment used across every
          destination page. */}
      <section className="bg-cream pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {trust.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="flex flex-col items-center gap-3 text-center lg:px-6">
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

      {/* Farewell strip — a light, welcoming close rather than a dark
          cocoa bar. */}
      <section className="bg-sand py-8 text-center">
        <p className="text-lg font-bold italic text-primary">{farewell.heading}</p>
        <p className="mt-1 text-sm text-muted-foreground">{farewell.text}</p>
      </section>
    </>
  )
}
