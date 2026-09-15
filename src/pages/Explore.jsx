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
// description and an optional badge, and adds a left-hand gradient so its
// longer copy stays readable. Its services can come as labelled groups
// (Ghana's travel vs relocation) instead of one list.
//
// A featured card with `imageSide: 'right'` (Ghana, whose photo is a tall
// portrait) shows its photo whole and uncovered in its own panel on the
// right — on top on phones — instead of cropping it into a darkened
// full-bleed background. Behind the copy sits the card's own
// `backgroundImage` when it has one (Ghana: Cape Coast Castle), shaded
// darkest on the left for readable text — otherwise a blurred, dimmed copy
// of the portrait, so the card still reads as one piece.
//
// Cards take a min-height rather than a fixed aspect ratio so every card
// stretches to its grid row instead of one sitting shorter than its
// neighbour.
function DestinationCountryCard({ country, featured = false }) {
  const cta = ctaFor(country)
  const serviceGroups = country.serviceGroups ?? [{ items: country.services }]
  const grouped = serviceGroups.length > 1
  const sidePortrait = featured && country.imageSide === 'right'

  return (
    <HashLink
      id={country.slug}
      to={cta.to}
      className={`group relative flex h-full min-h-[690px] scroll-mt-28 overflow-hidden bg-cocoa ${
        sidePortrait ? 'flex-col-reverse lg:flex-row' : 'flex-col justify-end'
      }`}
    >
      {sidePortrait ? (
        <>
          {country.backgroundImage ? (
            <>
              <img
                src={country.backgroundImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
              />
              {/* On phones/tablets the copy spans the whole card width, so the
                  photo gets an even shade; on desktop it's darkest behind the
                  copy on the left and eases off to the right so the photo
                  still reads clearly around the portrait. */}
              <div
                className="absolute inset-0 bg-black/65 lg:bg-transparent lg:bg-linear-to-r lg:from-black/80 lg:via-black/60 lg:to-black/20"
                aria-hidden="true"
              />
            </>
          ) : (
            <>
              <img
                src={country.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 size-full scale-110 object-cover opacity-35 blur-2xl"
              />
              <div
                className="absolute inset-0 bg-linear-to-r from-black/85 via-black/65 to-black/45"
                aria-hidden="true"
              />
            </>
          )}
        </>
      ) : (
        <>
          <img
            src={country.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
          />
          <div
            className={`absolute inset-0 bg-linear-to-t ${
              featured
                ? 'from-black/90 via-black/60 to-black/15'
                : 'from-black/90 via-black/35 to-transparent'
            }`}
            aria-hidden="true"
          />
          {featured && (
            <div
              className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent"
              aria-hidden="true"
            />
          )}
          <div
            className="absolute inset-0 bg-black opacity-0 transition-opacity duration-[450ms] ease-out group-hover:opacity-[0.45]"
            aria-hidden="true"
          />
        </>
      )}
      {country.badge && (
        <span className="absolute top-5 left-6 z-10 rounded-full bg-copper px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-copper-foreground sm:left-8">
          {country.badge}
        </span>
      )}

      <div
        className={`relative p-6 ${featured ? 'sm:p-8' : ''} ${
          sidePortrait ? 'flex flex-1 flex-col justify-end' : featured ? 'max-w-3xl' : ''
        }`}
      >
        <div className="flex items-center gap-2.5 transition-transform duration-[450ms] ease-out group-hover:-translate-y-2.5">
          <Flag slug={country.slug} />
          <h3 className="truncate text-2xl font-semibold text-primary-foreground">
            {country.name}
          </h3>
        </div>
        {country.note && (
          <p className="mt-1 truncate text-sm text-primary-foreground/80">{country.note}</p>
        )}

        <div className={`mt-4 grid gap-x-8 gap-y-4 ${grouped ? 'sm:grid-cols-2' : ''}`}>
          {serviceGroups.map((group) => (
            <div key={group.label ?? 'services'}>
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

        {featured && (
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-primary-foreground/80">
            {country.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/90 transition-colors group-hover:text-gold">
          {cta.label}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>

      {sidePortrait && (
        <div className="relative px-6 pt-6 sm:px-8 sm:pt-8 lg:w-[38%] lg:shrink-0 lg:py-8 lg:pr-8 lg:pl-0">
          <div className="h-full overflow-hidden">
            <img
              src={country.image}
              alt={country.imageAlt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04] lg:aspect-auto lg:h-full"
            />
          </div>
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
    imageSide: 'right',
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
