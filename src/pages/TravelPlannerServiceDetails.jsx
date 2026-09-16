import {
  Bus,
  Camera,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Route,
  Shield,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { COUNTRIES, TRAVEL_PLANNER_DETAILS_PAGE, TRAVEL_PLANNER_PAGE } from '../data/siteContent.js'
import { HashLink } from '../components/HashLink.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { PlannerBackground } from '../components/travel-planner/PlannerBackground.jsx'

const ICONS = { MapPin, Camera, Bus, Route, Clock, ClipboardCheck, Mail, MessageCircle, Users }

function CountTile({ n, price, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 px-4 py-5 text-center transition-colors ${
        selected
          ? 'border-forest bg-forest text-primary-foreground'
          : 'border-border bg-card text-primary hover:border-forest/40'
      }`}
    >
      <span
        className={`grid size-6 place-items-center rounded-full border-2 ${
          selected ? 'border-primary-foreground' : 'border-copper'
        }`}
      >
        {selected && <Check className="size-3.5" aria-hidden="true" />}
      </span>
      <span className="text-sm font-bold">
        {n} {n === 1 ? 'Country' : 'Countries'}
      </span>
      <span className="text-lg font-bold">${price}</span>
    </button>
  )
}

export function TravelPlannerServiceDetails() {
  useEffect(() => {
    document.title = 'Travel Planner Service Details | East-West Africa Link'
  }, [])

  // Carried over from the Travel Planner landing page's picker (its "View
  // Details" link on this card) — never re-picked here. If nothing was
  // carried over, the count tiles below let the visitor choose how many
  // countries they're planning before moving on; the specific countries
  // themselves are then picked inline on the request step if still
  // unknown — same "always give them a place to choose" logic Before You
  // Book Check's own request form uses.
  const [searchParams] = useSearchParams()
  const destinationSlugs = (searchParams.get('destinations') ?? '')
    .split(',')
    .filter((slug) => COUNTRIES.some((c) => c.slug === slug))
    .slice(0, 4)
  const destinationNames = destinationSlugs
    .map((slug) => COUNTRIES.find((c) => c.slug === slug)?.name)
    .filter(Boolean)
  const arrivedWithSelection = destinationSlugs.length > 0

  const [selectedCount, setSelectedCount] = useState(1)
  const { travelPlannerTiers } = TRAVEL_PLANNER_PAGE
  const count = arrivedWithSelection ? destinationSlugs.length : selectedCount
  const price = travelPlannerTiers.find((t) => t.countries === count)?.price
  const requestHref = arrivedWithSelection
    ? `/travel-planner/request?destinations=${destinationSlugs.join(',')}`
    : `/travel-planner/request?count=${selectedCount}`

  const { hero, intro, countPicker, included, info, closingPhoto, closingPhotoAlt, closingTagline } =
    TRAVEL_PLANNER_DETAILS_PAGE

  return (
    <>
      <PlannerBackground />
      <PageIntro {...hero} />

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
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {intro.heading}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {intro.description}
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-10 rounded-3xl bg-cream p-6 sm:p-8">
            <h2 className="text-lg font-bold text-primary sm:text-xl">{countPicker.heading}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {arrivedWithSelection
                ? `You're planning to visit ${destinationNames.join(', ')}.`
                : countPicker.subtext}
            </p>

            {arrivedWithSelection ? (
              <div className="mt-6 flex flex-col items-center gap-2">
                <p className="text-3xl font-bold text-primary">${price}</p>
                <Link
                  to="/travel-planner"
                  className="text-xs font-semibold text-copper hover:underline"
                >
                  Change destinations
                </Link>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {travelPlannerTiers.map((t) => (
                  <CountTile
                    key={t.countries}
                    n={t.countries}
                    price={t.price}
                    selected={selectedCount === t.countries}
                    onSelect={() => setSelectedCount(t.countries)}
                  />
                ))}
              </div>
            )}

            <HashLink to={requestHref} className="btn-copper mt-6 w-full justify-center sm:w-auto">
              Start Your Request
            </HashLink>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="size-3.5 text-copper" aria-hidden="true" />
              Secure &amp; Encrypted — Your information is safe with us.
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-16">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">{included.heading}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {included.description}
            </p>
            <div className="mx-auto mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
              {included.items.map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <div key={item.text} className="flex flex-col items-center gap-2 text-center">
                    <span className="grid size-12 place-items-center rounded-full border-2 border-copper text-copper">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <p className="text-xs font-semibold leading-snug text-primary">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>

          <Reveal
            delay={200}
            className="mt-16 grid gap-8 rounded-3xl bg-cream p-6 text-left sm:grid-cols-3 sm:p-8"
          >
            {info.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* Closing photo band */}
      <Reveal big className="relative isolate overflow-hidden">
        <img
          src={closingPhoto}
          alt={closingPhotoAlt}
          loading="lazy"
          className="h-64 w-full object-cover sm:h-80"
        />
        <div className="absolute inset-0 bg-cocoa/45" aria-hidden="true" />
        <p className="absolute inset-x-0 bottom-8 text-center font-serif text-2xl italic leading-snug text-primary-foreground sm:text-3xl">
          {closingTagline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </Reveal>
    </>
  )
}
