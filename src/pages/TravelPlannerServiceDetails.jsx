import {
  Bus,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Heart,
  Info,
  ListOrdered,
  Map,
  Mail,
  Milestone,
  Route,
  ShieldCheck,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  CONTACT_INFO,
  COUNTRIES,
  TRAVEL_PLANNER_DETAILS_PAGE,
  TRAVEL_PLANNER_PAGE,
} from '../data/siteContent.js'
import { CountryServiceHero, TravelPlannerBadge } from '../components/CountryServiceHero.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { WhatsAppIcon } from '../components/social-icons.jsx'
import { PlannerBackground } from '../components/travel-planner/PlannerBackground.jsx'
import { DestinationPicker } from '../components/travel-planner/DestinationPicker.jsx'
import { PlannerSidebar } from '../components/travel-planner/PlannerSidebar.jsx'
import { heroCountrySlug, TRAVEL_PLANNER_MARK } from '../data/countryHeroes.js'

const ICONS = {
  Map,
  ListOrdered,
  Heart,
  Bus,
  Milestone,
  Clock,
  Route,
  CalendarClock,
  ClipboardCheck,
  Mail,
  ShieldCheck,
}

export function TravelPlannerServiceDetails() {
  useEffect(() => {
    document.title = 'Travel Planner Service Details | East-West Africa Link'
  }, [])

  // Countries are chosen here, after the service — the landing page's
  // cards link straight through with no selection. Arriving with none is
  // fine: the picker below waits for a pick, and the request CTA stays
  // disabled until at least one country is chosen. Picks live in the URL
  // query (see DestinationPicker), so the price, hero and request link all
  // follow without leaving the page.
  const [searchParams] = useSearchParams()
  const destinationSlugs = (searchParams.get('destinations') ?? '')
    .split(',')
    .filter((slug) => COUNTRIES.some((c) => c.slug === slug))
    .slice(0, 4)
  const destinationNames = destinationSlugs
    .map((slug) => COUNTRIES.find((c) => c.slug === slug)?.name)
    .filter(Boolean)

  const { travelPlannerTiers } = TRAVEL_PLANNER_PAGE
  const price = travelPlannerTiers.find((t) => t.countries === destinationSlugs.length)?.price
  const requestHref = `/travel-planner/request?destinations=${destinationSlugs.join(',')}`

  const {
    hero,
    intro,
    yourDestinations,
    whatWeHelpPlan,
    whatYouReceive,
    followUpSupport,
    delivery,
    importantToKnow,
    sidebar,
    stats,
    closing,
  } = TRAVEL_PLANNER_DETAILS_PAGE

  return (
    <>
      <PlannerBackground />
      {/* For one country, that country's own hero with this page's copy
          (see CountryServiceHero); for several, this page's own hero. */}
      {heroCountrySlug(destinationSlugs) ? (
        <CountryServiceHero
          slug={heroCountrySlug(destinationSlugs)}
          pageHero={hero}
          mark={TRAVEL_PLANNER_MARK}
        />
      ) : (
        <PageIntro
          {...hero}
          eyebrow={<TravelPlannerBadge countrySlugs={destinationSlugs} />}
        />
      )}

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-copper">
            Home
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <Link to="/travel-planner" className="hover:text-copper">
            Travel Planner
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="font-semibold text-primary">Service Details</span>
        </div>
      </div>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <Reveal>
                <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                  {intro.heading}
                </h1>
                <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {intro.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100} className="relative z-20 mt-10 rounded-3xl bg-cream p-6 sm:p-8">
                <h2 className="text-lg font-bold text-primary">{yourDestinations.heading}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{yourDestinations.subtext}</p>

                <div className="mt-6 flex flex-col items-start gap-5">
                  <DestinationPicker />
                  {price != null && <p className="text-3xl font-bold text-primary">${price}</p>}
                </div>
              </Reveal>

              <Reveal delay={125} className="mt-10">
                <h2 className="text-lg font-bold text-primary">{whatWeHelpPlan.heading}</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {whatWeHelpPlan.items.map((item) => {
                    const Icon = ICONS[item.icon]
                    return (
                      <li
                        key={item.text}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <Icon className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
                        {item.text}
                      </li>
                    )
                  })}
                </ul>
              </Reveal>

              <Reveal delay={150} className="mt-10">
                <h2 className="text-lg font-bold text-primary">{whatYouReceive.heading}</h2>
                <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {whatYouReceive.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={175} className="mt-10">
                <h2 className="text-lg font-bold text-primary">{followUpSupport.heading}</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-3">
                  {followUpSupport.items.map((item) => (
                    <div key={item.label} className="rounded-2xl bg-cream p-5">
                      <h3 className="text-sm font-bold text-primary">{item.label}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={190} className="mt-10 grid gap-6 rounded-3xl bg-cream p-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                    <Mail className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-primary">Delivery</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{delivery}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                    <Info className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-primary">{importantToKnow.heading}</h3>
                    {importantToKnow.paragraphs.map((p) => (
                      <p key={p} className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Need help before purchasing? */}
              <Reveal
                delay={200}
                className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center"
              >
                <div className="flex shrink-0 -space-x-2">
                  <a
                    href={CONTACT_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with us on WhatsApp"
                    className="grid size-11 place-items-center rounded-full border-2 border-cream bg-forest text-primary-foreground"
                  >
                    <WhatsAppIcon className="size-4" aria-hidden="true" />
                  </a>
                  <a
                    href={CONTACT_INFO.emailHref}
                    aria-label="Email us"
                    className="grid size-11 place-items-center rounded-full border-2 border-cream bg-cocoa text-primary-foreground"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                  </a>
                </div>
                <div>
                  <p className="text-base font-bold text-primary">Need help before purchasing?</p>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                    General questions about our services, pricing, or how the website works can be sent
                    through WhatsApp or email.
                  </p>
                </div>
              </Reveal>
            </div>

            <PlannerSidebar
              heading={sidebar.title}
              countrySlug={heroCountrySlug(destinationSlugs) || undefined}
              price={price}
              includesHeading="Your Travel Planner Includes"
              caption={destinationNames.length > 0 ? [destinationNames.join(', ')] : [sidebar.tagline]}
              primaryCta={{
                label: 'Start Your Request',
                to: requestHref,
                disabled: destinationSlugs.length === 0,
              }}
            />
          </div>

          {/* Stats row */}
          <Reveal delay={100} className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
            {stats.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid size-11 place-items-center rounded-full border-2 border-copper text-copper">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-primary sm:text-sm">{item.title}</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </Reveal>

          <Reveal delay={150} className="mt-12 text-center">
            <Link
              to="/travel-planner"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-copper px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-copper transition-colors hover:bg-copper hover:text-copper-foreground"
            >
              ← Back to Travel Planner
            </Link>
            <p className="mt-6 text-base italic text-muted-foreground">{closing}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
