import {
  ArrowRight,
  BookOpen,
  Briefcase,
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
  Signpost,
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
import { BENIN_PAGE } from '../data/siteContent.js'

const ICONS = {
  FileText,
  Bus,
  Signpost,
  Users,
  Shield,
  Handshake,
  Briefcase,
  Globe2,
  CalendarDays,
  HeartPulse,
  Landmark,
  Compass,
  MapPin,
}

const BENIN_GALLERY_TILES = [
  {
    src: '/Pictures/Benin/Benin_Hero.jpg',
    alt: 'Sailing pirogue on Lake Nokoué, Benin',
    title: 'Lake Nokoué',
    subtitle: 'Sailing pirogues, timeless waterways',
  },
  {
    src: '/Pictures/Benin_Landing_Hero.JPG',
    alt: 'Ganvié stilt village on the water in Benin',
    title: 'Ganvié',
    subtitle: "Africa's Venice, a village on stilts",
  },
  {
    src: '/Pictures/Benin_Side_Image.JPG',
    alt: 'Traditional Vodun fetish statues in Benin',
    title: 'Vodun Heritage',
    subtitle: 'Sacred rites, living spirituality',
  },
  {
    src: '/Pictures/Benin/Back_River.jpg',
    alt: 'Palm-lined river channel in Benin',
    title: 'Palm-lined Waterways',
    subtitle: 'Quiet channels, lush scenery',
  },
  {
    src: '/Pictures/countries/Benin.jpg',
    alt: 'Beninese woman in traditional dress with her child',
    title: 'Beninese Culture',
    subtitle: 'Warmth, tradition, living heritage',
  },
]

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

export function Benin() {
  useEffect(() => {
    document.title = 'Explore Benin | East-West Africa Link'
  }, [])

  const { hero, services, places, routes, guide, closing, trust, farewell } = BENIN_PAGE

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

      <CountrySubNav slug="benin" countryName="Benin" />

      <PhotoGallerySection
        heading="A Glimpse of Benin"
        subheading="Stilt villages, sacred traditions and waterways — a first look at the sights and stories waiting across Benin."
        tiles={BENIN_GALLERY_TILES}
        variant="mosaic"
      />

      {/* Travel Services in Benin — four cards, including Independent Tour
          Guides. */}
      <section id="services" className="scroll-mt-[140px] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal once={false} className="flex items-center justify-center gap-4">
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Travel Services in Benin
            </h2>
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => {
              const Icon = ICONS[service.icon]
              return (
                <Reveal key={service.title} once={false} delay={i * 90}>
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
                            ? '/travel-planner?destination=benin'
                            : service.title.startsWith('Independent Tour Guides')
                              ? '/independent-tour-guide/benin'
                              : service.title === 'Border Crossing Guide'
                                ? '/travel-planner/border-crossing-guide?from=benin'
                                : service.title === 'Personal Visa Guidance'
                                  ? '/personal-visa-guidance/benin'
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

      {/* Where to go — real Benin destinations. */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <Reveal once={false} className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Where to Go in Benin
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A handful of destinations worth building your trip around.
            </p>
          </Reveal>

          <div className="mt-10 space-y-0">
            <div className="grid gap-0 lg:grid-cols-3">
              {places.slice(0, 3).map((place, i) => (
                <Reveal key={place.name} once={false} delay={i * 90}>
                  <article className="group flex h-full flex-col overflow-hidden border-b border-cocoa/10 bg-[#f4efe8] transition-transform duration-300 hover:-translate-y-0.5 lg:border-r lg:border-b-0 lg:last:border-r-0 lg:first:border-l-0">
                    <div className="relative aspect-[7/5] overflow-hidden">
                      <img
                        src={place.image ?? '/Pictures/countries/Benin.jpg'}
                        alt={place.imageAlt ?? place.name}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-4 top-4 grid size-10 shrink-0 place-items-center rounded-full bg-white/80 text-copper shadow-card ring-2 ring-white/70 backdrop-blur-sm">
                        <MapPin className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-4">
                      <h3 className="text-base font-bold uppercase tracking-[0.08em] text-primary sm:text-lg">
                        {place.name}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                        {place.text}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="grid gap-0 lg:grid-cols-3">
              {places.slice(3).map((place, i) => (
                <Reveal key={place.name} once={false} delay={(i + 3) * 90}>
                  <article className="group flex h-full flex-col overflow-hidden border-t border-cocoa/10 bg-[#f4efe8] transition-transform duration-300 hover:-translate-y-0.5 lg:border-r lg:last:border-r-0 lg:first:border-l-0">
                    <div className="relative aspect-[7/5] overflow-hidden">
                      <img
                        src={place.image ?? '/Pictures/countries/Benin.jpg'}
                        alt={place.imageAlt ?? place.name}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-4 top-4 grid size-10 shrink-0 place-items-center rounded-full bg-white/80 text-copper shadow-card ring-2 ring-white/70 backdrop-blur-sm">
                        <MapPin className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-4">
                      <h3 className="text-base font-bold uppercase tracking-[0.08em] text-primary sm:text-lg">
                        {place.name}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                        {place.text}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular overland routes — shared with every other country page,
          see RouteCard.jsx. */}
      <OverlandRoutesSection countryName="Benin" slug="benin" routes={routes} />

      {/* Practical guide preview — an accordion of real topic summaries. */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal once={false} className="overflow-hidden rounded-3xl bg-card shadow-lift lg:flex lg:items-stretch">
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

      {/* Need Personalized Guidance? */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal once={false} className="overflow-hidden rounded-3xl bg-cocoa text-primary-foreground shadow-card">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div className="flex flex-col gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                  <Compass className="size-5" aria-hidden="true" />
                </span>
                <span className="section-eyebrow !text-gold">{closing.eyebrow}</span>
                <p className="text-sm leading-relaxed text-primary-foreground/80">{closing.text}</p>
                <HashLink
                  to={closing.cta.to}
                  className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
                >
                  {closing.cta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </HashLink>
              </div>

              <div>
                <p className="text-sm font-semibold text-primary-foreground">
                  East-West Africa Link can help with:
                </p>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {closing.helpWith.map((item, i) => {
                    const Icon = ICONS[item.icon]
                    return (
                      <Reveal key={item.label} once={false} delay={i * 90}>
                        <div className="flex flex-col items-center gap-2 text-center">
                          <span className="grid size-11 place-items-center rounded-full border-2 border-copper text-copper">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          <span className="text-xs font-semibold text-primary-foreground">
                            {item.label}
                          </span>
                        </div>
                      </Reveal>
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {trust.map((item, i) => {
              const Icon = ICONS[item.icon]
              return (
                <Reveal key={item.title} once={false} delay={i * 90} className="lg:px-6">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="grid size-12 place-items-center rounded-full border-2 border-copper text-copper">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Farewell strip — a single welcoming line, matching the reference
          (no supporting text here). */}
      <section className="bg-sand py-8 text-center">
        <p className="text-lg font-bold italic text-primary">{farewell.heading}</p>
      </section>
    </>
  )
}
