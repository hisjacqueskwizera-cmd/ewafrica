import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Headphones,
  MapPin,
  Mountain,
  Palmtree,
  Shield,
  Users,
} from 'lucide-react'
import { useEffect } from 'react'
import { COUNTRIES, EXPLORE_PAGE } from '../data/siteContent.js'
import { FLAGS } from '../data/countryFlags.js'
import { HashLink } from '../components/HashLink.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { CenteredSectionTitle } from '../components/section-heading.jsx'

const ICONS = { Shield, Users, MapPin, Globe2 }

// Joins a page entry (services, description…) with that country's shared
// details in COUNTRIES — name, photo, note and link.
function withCountry(entry) {
  return { ...COUNTRIES.find((country) => country.slug === entry.slug), ...entry }
}

// A country's CTA goes to its own page where it has one. Countries without
// a page point at their own card on this page in COUNTRIES, so here they
// link to Contact instead of back to themselves.
function ctaFor(country) {
  return country.to.startsWith('/explore')
    ? { to: '/#contact', label: `Ask About ${country.name}` }
    : { to: country.to, label: `Explore ${country.name}` }
}

// Countries branded with a companion destination (currently just "Tanzania
// & Zanzibar") get that second half picked out in gold rather than shown
// as plain white text like the rest of the name.
function CountryName({ name }) {
  const [before, after] = name.split(' & ')
  if (!after) return name
  return (
    <>
      {before} &amp; <span className="text-gold">{after}</span>
    </>
  )
}

function Flag({ slug }) {
  return (
    <img
      src={FLAGS[slug]}
      alt=""
      aria-hidden="true"
      className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover shadow-sm"
    />
  )
}

function ServiceList({ items, className = '' }) {
  return (
    <ul className={`space-y-1.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-xs leading-relaxed text-primary-foreground/85"
        >
          <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

// Every country card on this page uses the same card language as the
// homepage's "Explore our Destinations" ticker (DestinationsTicker's
// DestinationCard): full-bleed photo, square corners, a bottom-up black
// gradient, a title that lifts on hover and an uppercase "Explore" line
// that turns gold — with the country's flag and service checklist added
// over the gradient.
//
// A featured card (Tanzania, Ghana) spans more columns, also carries its
// description and an optional badge, and renders its CTA as a solid gold
// pill rather than the plain text+arrow row every other card uses. Its
// services can come as labelled groups (Ghana's travel vs relocation)
// instead of one list, in which case a vertical rule separates the two
// columns. Its dark fade sits only behind the text block itself — not
// smeared across the whole photo — so pass `strongOverlay` for a featured
// card whose text block needs a darker shade to stay readable over a
// busier photo (Ghana's). Pass `descriptionFirst` to render the
// description paragraph(s) above the services instead of below (Ghana's
// own reference layout — Tanzania keeps services first), and `liftText`
// to lift the whole text block up off the card's bottom edge (Ghana's
// reference has noticeably more breathing room there than Tanzania's).
// `locationCaption` (with a pin icon) pins a "Place, Country" caption to
// the card's bottom-left corner.
//
// Cards take a min-height rather than a fixed aspect ratio so every card
// stretches to its grid row instead of one sitting shorter than its
// neighbour.
function DestinationCountryCard({ country, featured = false }) {
  const cta = ctaFor(country)
  const serviceGroups = country.serviceGroups ?? [{ items: country.services }]
  const grouped = serviceGroups.length > 1

  const Description = () =>
    country.description && (
      <div className="mt-4 max-w-sm space-y-2 text-sm leading-relaxed text-primary-foreground/80">
        {country.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    )

  return (
    <HashLink
      id={country.slug}
      to={cta.to}
      className="group relative flex h-full min-h-[690px] scroll-mt-28 flex-col justify-end overflow-hidden bg-cocoa"
    >
      <img
        src={country.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
      />
      {/* Non-featured cards keep the classic bottom-up fade behind their
          short title; featured cards fade only behind their own text
          block below (not the whole photo) — see that block's own
          background. */}
      {!featured && (
        <div
          className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent"
          aria-hidden="true"
        />
      )}
      {country.badge && (
        <span className="absolute top-5 left-6 z-10 rounded-full bg-copper px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-copper-foreground sm:left-8">
          {country.badge}
        </span>
      )}

      <div
        className={`relative p-6 ${featured ? 'sm:p-8' : ''} ${featured ? 'max-w-3xl' : ''} ${
          country.locationCaption ? 'pb-11 sm:pb-12' : ''
        } ${country.liftText ? 'mb-[6cm]' : ''}`}
        style={
          featured
            ? {
                // A radial glow anchored at the text block's bottom-left
                // (roughly where the copy is densest) fades outward in
                // every direction, so it blends into the photo instead of
                // ending in a hard rectangular edge the way a plain
                // linear/box gradient would.
                backgroundImage: `radial-gradient(120% 110% at 0% 100%, rgba(0,0,0,${
                  country.strongOverlay ? 0.8 : 0.65
                }) 0%, rgba(0,0,0,${country.strongOverlay ? 0.5 : 0.35}) 45%, rgba(0,0,0,0) 85%)`,
              }
            : undefined
        }
      >
        <div className="flex items-center gap-2.5 transition-transform duration-[450ms] ease-out group-hover:-translate-y-2.5">
          <Flag slug={country.slug} />
          <h3 className="truncate text-2xl font-semibold text-primary-foreground">
            <CountryName name={country.name} />
          </h3>
        </div>
        {country.note &&
          (featured ? (
            <>
              <p className="mt-1 font-display text-lg font-bold text-primary-foreground sm:text-xl">
                {country.note}
              </p>
              <span className="mt-3 block h-0.5 w-14 bg-gold" aria-hidden="true" />
            </>
          ) : (
            <p className="mt-1 truncate text-sm text-primary-foreground/80">{country.note}</p>
          ))}

        {featured && country.descriptionFirst && <Description />}

        <div
          className={`mt-4 grid gap-y-4 ${
            grouped ? 'sm:grid-cols-2 sm:divide-x sm:divide-primary-foreground/25' : 'gap-x-8'
          }`}
        >
          {serviceGroups.map((group, i) => (
            <div
              key={group.label ?? 'services'}
              className={grouped ? (i === 0 ? 'sm:pr-8' : 'sm:pl-8') : ''}
            >
              {group.label && (
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-gold">
                  {group.label}
                </p>
              )}
              <ServiceList
                items={group.items}
                className={featured && !grouped ? 'gap-x-6 sm:columns-2' : ''}
              />
            </div>
          ))}
        </div>

        {featured && !country.descriptionFirst && <Description />}

        {featured ? (
          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.1em] text-cocoa shadow-card transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
            {cta.label}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
        ) : (
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/90 transition-colors group-hover:text-gold">
            {cta.label}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
        )}
      </div>

      {country.locationCaption && (
        <div className="absolute bottom-5 left-6 z-10 flex items-center gap-1.5 text-xs font-medium text-primary-foreground/80 sm:bottom-6 sm:left-8">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {country.locationCaption}
        </div>
      )}
    </HashLink>
  )
}

// No "view all" CTA here — every country in the region is already listed
// in the grid directly below this header.
function RegionHeader({ icon: Icon, title, tagline }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h2 className="text-xl font-bold text-primary sm:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
      </div>
    </div>
  )
}

export function Explore() {
  useEffect(() => {
    document.title = 'Explore Africa | East-West Africa Link'
  }, [])

  const { hero, intro, east, west, trust, footnote, closing } = EXPLORE_PAGE
  const [featuredEast, ...otherEast] = east.countries.map(withCountry)
  const ghana = {
    ...withCountry(west.featured),
    // Full-bleed Cape Coast Castle photo, same treatment as every other
    // featured card — not the old side-portrait panel.
    image: west.featured.backgroundImage,
    strongOverlay: true,
    descriptionFirst: true,
    liftText: true,
    serviceGroups: [
      { label: 'Travel Services', items: west.featured.travelServices },
      { label: 'Relocation & Living in Ghana', items: west.featured.relocationServices },
    ],
  }
  const otherWest = west.countries.map(withCountry)

  return (
    <>
      <PageIntro {...hero} />

      <section className="pt-16 pb-10 lg:pt-20 lg:pb-12">
        <Reveal className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <CenteredSectionTitle title={intro} />
        </Reveal>
      </section>

      {/* East Africa */}
      <section id="east-africa" className="scroll-mt-24 overflow-hidden pb-16 lg:pb-20">
        <div className="mx-auto w-[90%]">
          <Reveal>
            <RegionHeader icon={Mountain} title={east.title} tagline={east.tagline} />
          </Reveal>
          {/* Tanzania takes a double-wide slot so the 5 cards resolve into
              complete rows: (2-wide + 1) / (1 + 1 + 1) on desktop,
              (2-wide) / (1 + 1) / (1 + 1) on tablets. */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal className="h-full sm:col-span-2">
              <DestinationCountryCard country={featuredEast} featured />
            </Reveal>
            {otherEast.map((country, i) => (
              <Reveal key={country.slug} delay={(i + 1) * 90} className="h-full">
                <DestinationCountryCard country={country} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* West Africa */}
      <section id="west-africa" className="scroll-mt-24 overflow-hidden bg-cream pb-16 lg:pb-20">
        <div className="mx-auto w-[90%] pt-14 lg:pt-16">
          <Reveal>
            <RegionHeader icon={Palmtree} title={west.title} tagline={west.tagline} />
          </Reveal>
          {/* Ghana gets its own full-width featured row (it offers travel +
              relocation, the other three don't) and the remaining three
              countries form one even row below — on tablets the last of
              them spans both columns so no card is left on its own. */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal className="h-full sm:col-span-2 lg:col-span-3">
              <DestinationCountryCard country={ghana} featured />
            </Reveal>
            {otherWest.map((country, i) => (
              <Reveal
                key={country.slug}
                delay={(i + 1) * 90}
                className="h-full sm:last:col-span-2 lg:last:col-span-1"
              >
                <DestinationCountryCard country={country} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="pb-16 lg:pb-20">
        <Reveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-3xl bg-sand/60 p-8 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="flex min-w-0 items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-card text-copper shadow-card">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
         
        </Reveal>
      </section>

      {/* Closing CTA */}
      <section className="pb-16 lg:pb-20">
        <Reveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-cocoa p-8 text-center text-primary-foreground sm:p-10 lg:flex-row lg:justify-between lg:text-left">
            <div className="flex items-center gap-4">
              <span className="hidden size-12 shrink-0 place-items-center rounded-full bg-primary-foreground/10 text-copper sm:grid">
                <Headphones className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold sm:text-xl">{closing.heading}</h2>
                <p className="mt-1 text-sm text-primary-foreground/75">{closing.text}</p>
              </div>
            </div>
            <HashLink
              to="/#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
            >
              {closing.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </HashLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}
