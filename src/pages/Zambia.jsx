import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  FileText,
  Info,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { useEffect } from 'react'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { ZAMBIA_DATA } from '../data/zambiaContent.js'

const SERVICE_ICONS = {
  FileText,
  Compass,
  ShieldCheck,
}

export function Zambia() {
  useEffect(() => {
    document.title = 'Zambia — A Land of Natural Beauty and Opportunity | East-West Africa Link'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const {
    hero,
    travelInZambia,
    servicesIntro,
    services,
    overlandRoutesIntro,
    routes,
    travelingOverland,
    practicalGuideBanner,
  } = ZAMBIA_DATA

  return (
    <div className="bg-background min-h-screen">
      {/* 1. Hero Section matching Image 3 */}
      <section className="relative isolate flex min-h-[580px] h-[75vh] max-h-[800px] items-center overflow-hidden px-4 text-primary-foreground sm:px-6 lg:px-8">
        <img
          src={hero.image}
          alt={hero.title}
          loading="eager"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        {/* Subtle dark gradient overlay so text is crisp */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/35 to-black/45"
          aria-hidden="true"
        />

        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* Left Hero Content */}
          <Reveal delay={100} className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              {hero.eyebrow}
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] text-balance text-primary-foreground sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
              {hero.description}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <HashLink to="/zambia/practical-guide" className="btn-copper text-sm">
                {hero.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
          </Reveal>

          {/* Right Hero Quote & Location Badge */}
          <Reveal delay={250} className="flex flex-col items-start lg:items-end">
            <div className="text-left lg:text-right">
              {hero.watermarkQuote.map((line) => (
                <p
                  key={line}
                  className="font-display text-2xl sm:text-3xl italic leading-tight text-primary-foreground/95 drop-shadow-sm"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-full bg-black/40 px-3.5 py-1.5 text-xs font-semibold text-primary-foreground/90 backdrop-blur-xs">
              <MapPin className="size-3.5 text-gold" aria-hidden="true" />
              <span>{hero.locationBadge}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Travel in Zambia Section matching Image 3 with custom safari silhouette background */}
      <section
        id="travel-in-zambia"
        className="relative isolate overflow-hidden bg-cream py-16 lg:py-24"
        style={{
          backgroundImage: 'url(/Pictures/Background/zambia_travel_section_bg.png)',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        {/* Background silhouette overlay */}
        <img
          src="/Pictures/Background/zambia_travel_section_bg.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full object-cover object-bottom"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Text & CTA Button */}
            <div className="lg:col-span-6 relative z-10">
              <Reveal>
                <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
                  {travelInZambia.heading}
                </h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-copper">
                  {travelInZambia.eyebrow}
                </p>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {travelInZambia.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <HashLink to="/zambia/practical-guide" className="btn-copper text-sm">
                    {travelInZambia.cta}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </HashLink>
                </div>
              </Reveal>
            </div>

            {/* Right Column: 3 Horizontal Highlight Cards */}
            <div className="lg:col-span-6 relative z-10 space-y-4">
              {travelInZambia.cards.map((card, idx) => (
                <Reveal key={card.id} delay={idx * 120}>
                  <HashLink
                    to={card.to}
                    className="group flex items-center gap-4 sm:gap-6 rounded-3xl bg-card/95 backdrop-blur-xs p-4 sm:p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift border border-border/40"
                  >
                    <div className="size-24 sm:size-28 shrink-0 overflow-hidden rounded-2xl bg-sand">
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                      />
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-primary group-hover:text-copper transition-colors">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {card.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <span className="grid size-10 sm:size-11 place-items-center rounded-full bg-copper text-copper-foreground shadow-xs transition-transform duration-300 group-hover:scale-110">
                        <ChevronRight className="size-5" aria-hidden="true" />
                      </span>
                    </div>
                  </HashLink>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explore Our Services Section */}
      <section id="services" className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {servicesIntro.heading}
            </h2>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-copper">
              {servicesIntro.eyebrow}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {servicesIntro.description}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon] || FileText
              return (
                <Reveal key={service.title} delay={i * 100} className="flex h-full">
                  <article className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-card shadow-card transition-shadow duration-300 hover:shadow-lift">
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-sand">
                      <img
                        src={service.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col items-center p-6 pt-0 text-center sm:p-7 sm:pt-0">
                      <span className="relative z-10 -mt-7 grid size-14 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground shadow-card border-4 border-card">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-display text-xl font-bold text-primary">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>

                      <ul className="mt-5 flex-1 space-y-2 self-stretch text-left">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground"
                          >
                            <CheckCircle2
                              className="mt-0.5 size-4 shrink-0 text-copper"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <HashLink to={service.to} className="btn-copper mt-6 w-full justify-center text-xs py-2.5">
                        View Details
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </HashLink>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>

          {/* Popular Overland Routes Subsection */}
          <div id="popular-overland-routes" className="mt-20">
            <Reveal className="text-center">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-copper">
                {overlandRoutesIntro.heading}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                {overlandRoutesIntro.subtitle}
              </p>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {routes.map((route, i) => (
                <Reveal key={route.to} delay={i * 80}>
                  <HashLink
                    to={`/travel-planner/border-crossing-guide?from=zambia&to=${route.to.toLowerCase()}`}
                    className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-cocoa shadow-card"
                  >
                    <img
                      src={route.image}
                      alt={`Zambia to ${route.to}`}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h4 className="font-display text-lg font-bold text-primary-foreground">
                        Zambia → {route.to}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs text-primary-foreground/80">
                        {route.text}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground/90 transition-colors group-hover:text-gold">
                        BORDER CROSSING GUIDE
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </HashLink>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Traveling Overland? Banner Box matching Image 3 */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-card shadow-card border border-border/60 lg:grid lg:grid-cols-12">
              {/* Left photo segment */}
              <div className="relative min-h-[220px] lg:col-span-3 lg:min-h-full">
                <img
                  src={travelingOverland.image}
                  alt="Victoria Falls gorge"
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>

              {/* Center information segment */}
              <div className="p-6 sm:p-8 lg:col-span-5 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full bg-sand text-copper">
                      <Compass className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-2xl font-bold text-primary">
                      {travelingOverland.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {travelingOverland.description}
                  </p>

                  {/* Country pills */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {travelingOverland.neighbours.map((country) => (
                      <span
                        key={country}
                        className="rounded-full border border-border bg-cream/70 px-3 py-1 text-xs font-semibold text-primary"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-6 text-xs italic text-muted-foreground">
                  {travelingOverland.note}
                </p>
              </div>

              {/* Right actions segment */}
              <div className="bg-sand/30 border-t border-border/50 p-6 sm:p-8 lg:col-span-4 lg:border-t-0 lg:border-l lg:p-10 flex flex-col justify-between gap-5">
                <div>
                  <div className="flex items-start gap-3">
                    <MapPin className="size-4 shrink-0 text-copper mt-0.5" aria-hidden="true" />
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {travelingOverland.researchText}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <HashLink
                      to={travelingOverland.planRouteTo}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs transition-transform hover:-translate-y-0.5"
                    >
                      Plan My Route
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </HashLink>

                    <HashLink
                      to={travelingOverland.borderGuideTo}
                      className="btn-copper w-full justify-center text-xs sm:text-sm py-2.5"
                    >
                      Get a Border Crossing Guide
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </HashLink>
                  </div>
                </div>

                {/* Tour Guide Service info notice */}
                <div className="flex items-start gap-2.5 rounded-xl bg-sand/70 p-3.5">
                  <Info className="size-4 shrink-0 text-copper mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      Tour Guide Service
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {travelingOverland.tourGuideUnavailable}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Practical Guide Callout Banner Section matching Image 3 with custom silhouette */}
      <section className="relative isolate overflow-hidden bg-cream/80 py-16 sm:py-20 lg:py-24 border-t border-border/50">
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-center">
            <span className="grid size-12 place-items-center rounded-full bg-sand text-copper shadow-xs">
              <BookOpen className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {practicalGuideBanner.title}
            </h2>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-copper">
              {practicalGuideBanner.eyebrow}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              {practicalGuideBanner.description}
            </p>
            <div className="mt-8">
              <HashLink
                to={practicalGuideBanner.to}
                className="btn-copper px-8 py-3.5 text-sm sm:text-base"
              >
                {practicalGuideBanner.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
          </Reveal>
        </div>

        {/* User-provided background silhouette at bottom of practical guide banner */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-40 sm:h-52 lg:h-60 opacity-80"
          aria-hidden="true"
        >
          <img
            src={practicalGuideBanner.backgroundSilhouette}
            alt=""
            className="size-full object-cover object-bottom"
          />
        </div>
      </section>
    </div>
  )
}
