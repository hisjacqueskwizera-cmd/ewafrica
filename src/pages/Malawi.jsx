import {
  ArrowRight,
  BookOpen,
  Bus,
  CalendarDays,
  CheckCircle2,
  FileText,
  Globe2,
  Handshake,
  IdCard,
  Lightbulb,
  MapPin,
  Plane,
  Route as RouteIcon,
  Shield,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Accordion } from '../components/Accordion.jsx'
import { BottomSheetModal } from '../components/BottomSheetModal.jsx'
import { CountrySubNav } from '../components/CountrySubNav.jsx'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { PhotoGallerySection } from '../components/PhotoGallery.jsx'
import { OverlandRoutesSection, RouteCardButton } from '../components/RouteCard.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { MALAWI_PAGE } from '../data/siteContent.js'

const MALAWI_GALLERY_TILES = [
  {
    src: '/Pictures/Malawi.JPG',
    alt: 'The MV Ilala ferry crossing Lake Malawi',
    title: 'Lake Malawi',
    subtitle: "The MV Ilala crossing Africa's warm heart",
  },
  {
    src: '/Pictures/Malawi/Gallery/majete_elephants.jpg',
    alt: 'Elephants along the Shire River in Majete Wildlife Reserve, Malawi',
    title: 'Majete Wildlife Reserve',
    subtitle: 'Elephants along the Shire River',
  },
  {
    src: '/Pictures/Malawi/Gallery/lake_malawi_sunset.jpg',
    alt: 'Sunset over Lake Malawi framed by a palm tree',
    title: 'Lake Malawi',
    subtitle: "Sunset over Africa's warm heart",
  },
  {
    src: '/Pictures/Malawi/Gallery/likoma_cathedral.jpg',
    alt: "St Peter's Cathedral on Likoma Island, Lake Malawi",
    title: 'Likoma Island',
    subtitle: "St Peter's Cathedral, a lakeside landmark",
  },
  {
    src: '/Pictures/Malawi/Gallery/tea_plantation.jpg',
    alt: 'Rolling tea plantations in the Malawian highlands',
    title: 'Highland Tea Estates',
    subtitle: 'Rolling tea plantations in the highlands',
  },
]

const MALAWI_GALLERY_EXTRA_TILES = [
  {
    src: '/Pictures/Malawi/Gallery/majete_zebras.jpg',
    alt: 'Zebras at dawn in Majete Wildlife Reserve, Malawi',
    title: 'Majete Wildlife Reserve',
    subtitle: 'Zebras grazing at first light',
  },
  {
    src: '/Pictures/Malawi/Gallery/usisya_village.jpg',
    alt: 'Usisya village and Lake Malawi seen from the highlands above',
    title: 'Usisya',
    subtitle: 'A remote lakeshore village seen from above',
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
  RouteIcon,
  IdCard,
  CalendarDays,
  MapPin,
  Plane,
  Wallet,
  Lightbulb,
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

export function Malawi() {
  useEffect(() => {
    document.title = 'Explore Malawi | East-West Africa Link'
  }, [])

  const { hero, services, routes, lakeBorder, guide, ctas, trust, farewell } = MALAWI_PAGE

  // Whether the Lake Malawi Border Crossings modal is open — its card
  // sits in the same "Popular Overland Routes" grid as the three ordinary
  // land-border routes (see the note on MALAWI_PAGE.lakeBorder).
  const [lakeBorderOpen, setLakeBorderOpen] = useState(false)

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

      <CountrySubNav slug="malawi" countryName="Malawi" />

      <PhotoGallerySection
        heading="A Glimpse of Malawi"
        subheading="Africa's warm heart, one great lake — a first look at the sights waiting across Malawi."
        tiles={MALAWI_GALLERY_TILES}
        variant="mosaic"
        extraTiles={MALAWI_GALLERY_EXTRA_TILES}
      />

      {/* Travel Services in Malawi — three cards, no Independent Tour
          Guides card (Malawi has no independent tour guide network yet). */}
      <section id="services" className="scroll-mt-[140px] py-16 lg:py-20">
        <div className="mx-auto max-w-none px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-center gap-4">
            <span
              className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
              aria-hidden="true"
            />
            <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
              Travel Services in Malawi
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
                    {/* Every card's image box takes the Travel Planner art's own
                        landscape ratio, so all of them line up at the same
                        height: the art fills its box edge to edge with
                        nothing cropped, and the sibling photos cover theirs.
                        (Malawi and Zambia's art is 3:2 rather than 16:9, so
                        object-contain keeps those uncropped too.) */}
                    <div className="aspect-[3/2] overflow-hidden rounded-t-3xl bg-sand">
                      <img
                        src={service.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className={
                          service.title === 'Travel Planner'
                            ? 'size-full object-contain'
                            : 'size-full object-cover'
                        }
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
                            ? '/travel-planner/service-details?destinations=malawi'
                            : service.title === 'Border Crossing Guide'
                              ? '/travel-planner/border-crossing-guide?from=malawi'
                              : service.title === 'Personal Visa Guidance'
                                ? '/personal-visa-guidance/malawi'
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
          see RouteCard.jsx. The 4th card (Likoma Lake Crossings) is
          Malawi's own Lake Malawi ferry crossings — a RouteCardButton
          rather than an ordinary RouteCard, since its full content (see
          the note on MALAWI_PAGE.lakeBorder) is opened in a modal instead
          of a direct link. */}
      <OverlandRoutesSection
        countryName="Malawi"
        slug="malawi"
        routes={routes}
        extraCard={
          <RouteCardButton
            image={lakeBorder.card.image}
            imageAlt="The Ilala ferry crossing Lake Malawi toward the mountains beyond"
            title={`Malawi → ${lakeBorder.card.title}`}
            text={lakeBorder.card.text}
            ctaLabel="Border Crossing Guide"
            imagePosition="object-[68%_45%]"
            onClick={() => setLakeBorderOpen(true)}
          />
        }
      />

      {/* First-time traveller's guide — an accordion of real topic
          summaries, not a flat checklist. */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-card shadow-lift lg:flex lg:items-stretch">
            <div className="p-8 sm:p-10 lg:w-3/5 lg:p-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-copper">
                <BookOpen className="size-4" aria-hidden="true" />
                {guide.eyebrow}
              </span>
              <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{guide.heading}</h2>
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

      {/* Two side-by-side CTAs — planning a route vs. needing a border
          guide, each with its own column instead of one combined banner. */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-cocoa text-primary-foreground shadow-card">
            <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-primary-foreground/15">
              {ctas.map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <div key={item.eyebrow} className="flex flex-col gap-4 p-8 sm:p-10">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="section-eyebrow !text-gold">{item.eyebrow}</span>
                      <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                        {item.text}
                      </p>
                    </div>
                    <HashLink
                      to={item.cta.to}
                      className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
                    >
                      {item.cta.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </HashLink>
                  </div>
                )
              })}
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

      {/* Farewell strip */}
      <section className="bg-cocoa py-6 text-center text-primary-foreground">
        <p className="text-sm font-bold">{farewell.heading}</p>
        <p className="mt-1 text-xs text-primary-foreground/70">{farewell.text}</p>
      </section>

      {/* Lake Malawi Border Crossings — every field from the reference
          graphic, opened from the "Likoma Lake Crossings" card above
          rather than laid out as its own full-page section. */}
      <BottomSheetModal
        open={lakeBorderOpen}
        onClose={() => setLakeBorderOpen(false)}
        eyebrow={lakeBorder.banner.badge}
        title={`${lakeBorder.banner.title} ${lakeBorder.banner.titleAccent}`}
      >
        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold text-primary">{lakeBorder.banner.subtitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lakeBorder.banner.text}</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
              {lakeBorder.eyebrow}
            </p>
            <h3 className="mt-1 text-lg font-bold text-primary">{lakeBorder.heading}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{lakeBorder.intro}</p>

            <div className="mt-4 space-y-4">
              {lakeBorder.destinations.map((dest) => (
                <div key={dest.name} className="flex gap-4 rounded-2xl bg-cream p-3">
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}, on the shore of Lake Malawi`}
                    loading="lazy"
                    className="size-20 shrink-0 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-primary">
                      {dest.name}, {dest.country}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{dest.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-navy/10 p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy/15 text-navy">
                <BookOpen className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-navy">
                  {lakeBorder.guideBand.eyebrow}
                </p>
                <h3 className="mt-1 text-base font-bold text-primary">{lakeBorder.guideBand.heading}</h3>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{lakeBorder.guideBand.text}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {lakeBorder.guideBand.items.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-primary">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            <HashLink
              to={lakeBorder.guideBand.cta.to}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-cocoa px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {lakeBorder.guideBand.cta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </HashLink>
          </div>

          <p className="text-xs italic leading-relaxed text-muted-foreground">{lakeBorder.note}</p>
        </div>
      </BottomSheetModal>
    </>
  )
}
