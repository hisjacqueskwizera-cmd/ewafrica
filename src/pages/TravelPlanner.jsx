import {
  ArrowRight,
  Compass,
  FileText,
  Mail,
  Map,
  Route,
  Search,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  BEFORE_YOU_BOOK_FLOW,
  CONTACT_INFO,
  COUNTRIES,
  TRAVEL_AUDIT_FLOW,
  TRAVEL_PLANNER_PAGE,
} from '../data/siteContent.js'
import { COUNTRY_HEROES } from '../data/countryHeroes.js'
import { CountrySelectGrid } from '../components/CountrySelectGrid.jsx'
import { CountryServiceHero } from '../components/CountryServiceHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { PlaceholderArt } from '../components/PlaceholderArt.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { WhatsAppIcon } from '../components/social-icons.jsx'
import { PlannerBackground } from '../components/travel-planner/PlannerBackground.jsx'

const ICONS = { Route, Search, FileText, ShieldCheck, Users, Compass, User, Map }

// accent 'forest' vs 'copper' picks which brand color a card's icon badge
// and button render in — matches the reference's green "Before You Book
// Check" card standing apart from the two copper-brand cards either side.
const ACCENT = {
  copper: { badge: 'bg-cocoa text-primary-foreground', button: 'bg-copper text-copper-foreground' },
  forest: { badge: 'bg-forest text-primary-foreground', button: 'bg-forest text-primary-foreground' },
}

// count/hasGhana still drive what the price *would* be; isLocked+
// lockedCountryName override the caption with the one country the visitor
// arrived with (see the comment on TravelPlanner() below for when each case
// applies). requestHref/beforeYouBookHref/travelAuditHref each carry the
// selection into that service's own flow. Every card's "View Details" is
// always clickable — none of them dead-end a visitor who hasn't picked
// anything: each service's own details/request page picks up from there
// and lets them choose a country count if nothing was carried over. None
// of the three cards show a price on this page any more (showPrice below)
// — pricing only appears once a visitor is inside a service's own flow —
// but each service's own tiered-plus-Ghana-surcharge computation stays in
// place here so it's a one-line flip to bring it back.
function ServiceCard({
  service,
  isLocked,
  lockedCountryName,
  count,
  hasGhana,
  requestHref,
  beforeYouBookHref,
  travelAuditHref,
  needsSelection,
  onNeedSelection,
  delay,
}) {
  const Icon = ICONS[service.icon]
  const accent = ACCENT[service.accent]
  const { travelPlannerTiers } = TRAVEL_PLANNER_PAGE
  const showPrice = false
  const tiersFor = {
    beforeYouBook: BEFORE_YOU_BOOK_FLOW,
    travelAudit: TRAVEL_AUDIT_FLOW,
  }[service.key]
  const price =
    service.key === 'travelPlanner'
      ? travelPlannerTiers.find((t) => t.countries === count)?.price
      : tiersFor &&
        (tiersFor.tiers.find((t) => t.countries === count)?.price ?? 0) +
          (hasGhana ? tiersFor.ghanaSurcharge : 0)
  const priceLabel = isLocked
    ? lockedCountryName
    : `${count} ${count === 1 ? 'country' : 'countries'}`
  const href =
    service.key === 'travelPlanner'
      ? requestHref
      : service.key === 'beforeYouBook'
        ? beforeYouBookHref
        : service.key === 'travelAudit'
          ? travelAuditHref
          : '/#contact'
  const ctaClass = `mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${accent.button}`

  return (
    <Reveal delay={delay}>
      <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-card">
        {/* The card art is shown whole: full card width, at its own height
            (4:3 or 3:2), so nothing in the design is cropped. Only the
            placeholder for a service without art needs a fixed shape. */}
        <div
          className={`relative overflow-hidden rounded-t-3xl ${service.image ? '' : 'aspect-4/3'}`}
        >
          {service.image ? (
            <img
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
              className="block h-auto w-full"
            />
          ) : (
            <PlaceholderArt icon={Icon} tone={service.accent === 'forest' ? 'forest' : 'copper'} fill />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-cocoa/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-primary-foreground backdrop-blur">
            {service.badge}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center p-6 pt-0 text-center">
          <span
            className={`relative z-10 -mt-7 grid size-14 shrink-0 place-items-center rounded-full shadow-card ${accent.badge}`}
          >
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-xl font-bold text-primary">{service.title}</h3>

          {/* Pricing is hidden on every card here (showPrice above) — see
              each service's own flow for the actual price. */}
          {showPrice && (
            <>
              <p className="mt-3 text-3xl font-bold text-primary">${price}</p>
              {priceLabel && <p className="text-xs text-muted-foreground">({priceLabel} pricing)</p>}
            </>
          )}

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

          <ul className="mt-4 flex-1 space-y-1.5 self-stretch text-left">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
              >
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-copper" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          {needsSelection ? (
            // Nothing picked yet: point the visitor back up to the country
            // tiles rather than continuing without a destination.
            <button type="button" onClick={onNeedSelection} className={ctaClass}>
              View Details
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          ) : (
            <HashLink to={href} className={ctaClass}>
              View Details
              <ArrowRight className="size-4" aria-hidden="true" />
            </HashLink>
          )}
        </div>
      </article>
    </Reveal>
  )
}

export function TravelPlanner() {
  // Arriving from a country page's "Plan My Route"-style link (e.g.
  // /travel-planner?destination=tanzania) locks the page to that one
  // country — the picker doesn't even render, pricing is for 1 country
  // throughout. Arriving from anywhere else (header/nav, footer, a direct
  // visit) with no destination context instead opens the picker up to
  // choosing up to 4 countries, and pricing tracks how many are picked.
  // Read the param once — a later pick in the (unlocked) picker shouldn't
  // fight the URL if the visitor edits the query string.
  const [searchParams] = useSearchParams()
  const lockedSlug = (() => {
    const param = searchParams.get('destination')
    return COUNTRIES.some((c) => c.slug === param) ? param : null
  })()
  const isLocked = Boolean(lockedSlug)
  const lockedCountry = COUNTRIES.find((c) => c.slug === lockedSlug)

  useEffect(() => {
    document.title = lockedCountry
      ? `Travel Planner — ${lockedCountry.name} | East-West Africa Link`
      : 'Travel Planner | East-West Africa Link'
  }, [lockedCountry])

  const [destinationSlugs, setDestinationSlugs] = useState(() => (lockedSlug ? [lockedSlug] : []))
  const selectedCountries = destinationSlugs
    .map((slug) => COUNTRIES.find((c) => c.slug === slug))
    .filter(Boolean)
  const count = Math.max(destinationSlugs.length, 1)
  const hasGhana = destinationSlugs.includes('ghana')
  // This page is the one place destinations are chosen, so every card's
  // "View Details" needs at least one country picked first — the same rule
  // as Personal Visa Guidance's Continue. With none, it shows that page's
  // notice and scrolls back up to the tiles instead of continuing.
  const [selectionError, setSelectionError] = useState('')
  const needsSelection = destinationSlugs.length === 0
  const onNeedSelection = () => {
    setSelectionError('Please select at least one country to continue.')
    document
      .getElementById('destination-select')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const requestHref = `/travel-planner/service-details?destinations=${destinationSlugs.join(',')}`
  const beforeYouBookHref = `/travel-planner/before-you-book-check?destinations=${destinationSlugs.join(',')}`
  const travelAuditHref = `/travel-planner/travel-audit?destinations=${destinationSlugs.join(',')}`
  const { hero, countryHero, intro, services, helpBand, trust } = TRAVEL_PLANNER_PAGE
  // "The Gambia" reads as "Plan Your Gambia Journey" in the heading; the
  // badge above it keeps the full name.
  const fillCountry = (text) =>
    text.replaceAll('{country}', lockedCountry?.name.replace(/^The /, '') ?? '')
  // hero.trustItems stores icon names (data stays framework-agnostic);
  // resolve them to actual components here since PageIntro expects real
  // icon components, not strings — see the note on PageIntro's trustItems.
  const heroTrustItems = hero.trustItems?.map((item) => ({ ...item, icon: ICONS[item.icon] }))

  return (
    <>
      {/* Shared with every step of the request wizard (see
          PlannerBackground) — the lighter sections below drop their own
          bg-cream/bg-sand fills to let it show through; the hero keeps its
          own photo since that's opaque either way. */}
      <PlannerBackground />

      {/* Hero — arriving from a country page, that country's own hero
          (same backdrop, same design — see COUNTRY_HEROES) with its flag and
          name and the Travel Planner copy. Otherwise the shared PageIntro
          used on Home/About (badge/heading/tagline/description grammar),
          with this page's own photo and copy — see TRAVEL_PLANNER_PAGE.hero. */}
      {lockedCountry && COUNTRY_HEROES[lockedCountry.slug] ? (
        <CountryServiceHero
          slug={lockedCountry.slug}
          label="Travel Planner"
          heading={fillCountry(countryHero.heading)}
          description={fillCountry(countryHero.description)}
        />
      ) : (
        <PageIntro {...hero} trustItems={heroTrustItems} />
      )}

      {/* Choose the Support That Fits Your Trip */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {intro.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {intro.description}
            </p>
          </Reveal>

          {/* The same country selection card as Personal Visa Guidance. */}
          {!isLocked && (
            <Reveal
              delay={150}
              className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl border border-border bg-card p-6 text-left shadow-sm sm:p-8"
            >
              <div id="destination-select">
                <h3 className="text-xl font-bold text-primary">Select Your Destination(s)</h3>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  Select one or more countries — up to 4. Then choose a service below.
                </p>

                <CountrySelectGrid
                  values={destinationSlugs}
                  onChange={(next) => {
                    setSelectionError('')
                    setDestinationSlugs(next)
                  }}
                  max={4}
                  error={selectionError}
                  ariaLabel="Destinations"
                  className="mt-6"
                />
              </div>

              {/* The picks, listed back as soon as there are any — confirms
                  the selection right above the service cards that carry it. */}
              <div className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
                {selectedCountries.length === 0 ? (
                  <span className="italic">No countries selected yet.</span>
                ) : (
                  <>
                    <span className="font-bold text-primary">{selectedCountries.length}</span>{' '}
                    {selectedCountries.length === 1 ? 'country' : 'countries'} selected —{' '}
                    <span className="font-bold text-copper">
                      {selectedCountries.map((c) => c.name).join(', ')}
                    </span>
                  </>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Service cards */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard
                key={service.key}
                service={service}
                isLocked={isLocked}
                lockedCountryName={selectedCountries[0]?.name ?? ''}
                count={count}
                hasGhana={hasGhana}
                requestHref={requestHref}
                beforeYouBookHref={beforeYouBookHref}
                travelAuditHref={travelAuditHref}
                needsSelection={needsSelection}
                onNeedSelection={onNeedSelection}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Need help before purchasing? — light band with WhatsApp/email and
          the same flat trust-dividers row used on About Us and Tanzania. */}
      <section className="border-t border-border py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4 sm:items-center">
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
                <p className="text-base font-bold text-primary">{helpBand.heading}</p>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {helpBand.text}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-10">
              {trust.map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                    <span className="grid size-11 place-items-center rounded-full border-2 border-copper text-copper">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-primary sm:text-sm">{item.title}</h3>
                      <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">
                        {item.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
