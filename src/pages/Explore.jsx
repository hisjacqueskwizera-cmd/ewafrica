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

function ServiceList({ items, light = false, className = '' }) {
  return (
    <ul className={`space-y-1.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-2 text-xs leading-relaxed ${
            light ? 'text-primary-foreground/85' : 'text-muted-foreground'
          }`}
        >
          <CheckCircle2
            className={`mt-0.5 size-3.5 shrink-0 ${light ? 'text-gold' : 'text-copper'}`}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

// East Africa's cards use the same card language as the homepage's
// "Explore our Destinations" ticker (DestinationsTicker's DestinationCard):
// full-bleed photo, square corners, a bottom-up black gradient, a title
// that lifts on hover and an uppercase "Explore" line that turns gold —
// with this page's flag and service checklist added over the gradient.
// The featured card (Tanzania) spans two columns and also carries its
// description, on a deeper gradient so the longer copy stays readable.
// Cards take a min-height rather than a fixed aspect ratio so every card
// stretches to its grid row instead of one sitting shorter than its
// neighbour.
function DestinationCountryCard({ country, featured = false }) {
  const cta = ctaFor(country)
  return (
    <HashLink
      id={country.slug}
      to={cta.to}
      className="group relative flex h-full min-h-[460px] scroll-mt-28 flex-col justify-end overflow-hidden bg-cocoa"
    >
      <img
        src={country.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
      />
      <div
        className={`absolute inset-0 bg-linear-to-t ${
          featured ? 'from-black/90 via-black/60 to-black/15' : 'from-black/90 via-black/35 to-transparent'
        }`}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black opacity-0 transition-opacity duration-[450ms] ease-out group-hover:opacity-[0.45]"
        aria-hidden="true"
      />
      <div className={`relative p-6 ${featured ? 'sm:p-8' : ''}`}>
        <div className="flex items-center gap-2.5 transition-transform duration-[450ms] ease-out group-hover:-translate-y-2.5">
          <Flag slug={country.slug} />
          <h3 className="truncate text-2xl font-semibold text-primary-foreground">
            {country.name}
          </h3>
        </div>
        {country.note && (
          <p className="mt-1 truncate text-sm text-primary-foreground/80">{country.note}</p>
        )}
        <ServiceList
          light
          items={country.services}
          className={`mt-4 ${featured ? 'gap-x-6 sm:columns-2' : ''}`}
        />
        {featured && (
          <div className="mt-4 max-w-2xl space-y-2 text-sm leading-relaxed text-primary-foreground/80">
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
    </HashLink>
  )
}

// One West Africa country card: photo, flag + name, a checklist of what we
// offer there, and a CTA.
function CountryCard({ country }) {
  const cta = ctaFor(country)
  return (
    <article
      id={country.slug}
      className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="aspect-4/3 w-full shrink-0 overflow-hidden">
        <img
          src={country.image}
          alt={`${country.name} landscape`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Flag slug={country.slug} />
          <h3 className="text-sm font-bold text-primary">{country.name}</h3>
        </div>
        <ServiceList items={country.services} className="mt-3 flex-1" />
        <HashLink
          to={cta.to}
          className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-cocoa px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          {cta.label}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </HashLink>
      </div>
    </article>
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
  const ghana = withCountry(west.featured)
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8 lg:pt-16">
          <Reveal>
            <RegionHeader icon={Palmtree} title={west.title} tagline={west.tagline} />
          </Reveal>

          {/* Ghana gets its own full-width featured row (it offers travel +
              relocation, the other three don't) — image beside content —
              and the remaining three countries form one even row below. */}
          <Reveal className="mt-10">
            <article
              id={ghana.slug}
              className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-2xl bg-card shadow-lift transition-all duration-300 hover:-translate-y-1.5 sm:flex-row"
            >
              <span className="absolute top-4 left-4 z-10 rounded-full bg-copper px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-copper-foreground">
                {ghana.badge}
              </span>
              <div className="aspect-4/3 w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-2/5">
                {/* object-top so the short, wide crop eats into the
                    statue's base rather than its head. */}
                <img
                  src={ghana.image}
                  alt={ghana.imageAlt}
                  loading="lazy"
                  className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <Flag slug={ghana.slug} />
                  <h3 className="text-sm font-bold text-primary">{ghana.name}</h3>
                </div>

                <div className="mt-2 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">
                      Travel Services
                    </p>
                    <ServiceList items={ghana.travelServices} className="mt-2" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-copper">
                      Relocation &amp; Living in Ghana
                    </p>
                    <ServiceList items={ghana.relocationServices} className="mt-2" />
                  </div>
                </div>

                <div className="mt-2 space-y-2 text-xs leading-relaxed text-muted-foreground">
                  {ghana.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <HashLink
                  to={ghana.to}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-copper px-4 py-2.5 text-xs font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
                >
                  Explore {ghana.name}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </HashLink>
              </div>
            </article>
          </Reveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {otherWest.map((country, i) => (
              <Reveal key={country.slug} delay={i * 90} className="h-full">
                <CountryCard country={country} />
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
          <p className="mt-4 text-xs text-muted-foreground">{footnote}</p>
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
