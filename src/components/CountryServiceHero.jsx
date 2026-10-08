import { COUNTRY_HEROES, TRAVEL_PLANNER_MARK } from '../data/countryHeroes.js'
import { FLAGS } from '../data/countryFlags.js'
import { COUNTRIES } from '../data/siteContent.js'
import { DestinationHero } from './DestinationHero.jsx'

const PILL =
  'inline-flex font-display font-semibold text-hero-accent'

function CountryName({ country }) {
  return (
    <span className="text-hero-accent">{country.name}</span>
  )
}

function Flag({ country, className }) {
  return (
    <img
      src={FLAGS[country.slug]}
      alt=""
      aria-hidden="true"
      className={`shrink-0 rounded-[3px] object-cover ring-1 ring-inset ring-black/10 ${className}`}
    />
  )
}

// The badge above a country's service hero, in this order: the service
// (its `mark` when given — the Travel Planner's umbrella — else its name;
// neither when `label` is null), then the country's name, then its flag —
// on dark glass with a gold edge, so it reads over bright backdrops like
// Tanzania's sunset or Victoria Falls.
function CountryHeroBadge({ country, label, mark }) {
  if (!mark && !label) {
    return (
      <span
        className={`${PILL} items-center gap-3 text-lg sm:text-xl`}
      >
        <CountryName country={country} />
        <Flag country={country} className="h-7 w-[42px] sm:h-9 sm:w-[54px]" />
      </span>
    )
  }

  if (mark) {
    // The mark is a standalone graphic (an umbrella over its own outlined
    // "TRAVEL PLANNER" pill), so it stands at full size rather than
    // squeezed into a pill. The country pill beside it is fixed to the
    // same height as the mark's own pill and bottom-aligned with it, so
    // both pills sit level on one line; on phones it drops below.
    return (
      <span className="flex flex-wrap items-end gap-x-4 gap-y-3">
        <img
          src={mark.src}
          alt={mark.alt}
          className="h-[72px] w-auto shrink-0 sm:h-[88px] lg:h-24"
        />
        <span
          className={`${PILL} h-9 items-center gap-3 text-lg sm:h-10 sm:text-xl lg:h-11`}
        >
          <CountryName country={country} />
          <Flag country={country} className="h-6 w-9 sm:h-7 sm:w-[42px] lg:h-8 lg:w-12" />
        </span>
      </span>
    )
  }

  return (
    // Two rows on phones (the service name, then country + flag) so a long
    // name like "Tanzania & Zanzibar" never breaks mid-pill; one row from
    // sm up.
    <span
      className={`${PILL} flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:gap-3`}
    >
      <span className="text-lg sm:text-xl">{label}</span>
      <span className="hidden h-5 w-px bg-primary-foreground/60 sm:block" aria-hidden="true" />
      <span className="flex items-center gap-3 text-lg sm:text-xl">
        <CountryName country={country} />
        <Flag country={country} className="h-7 w-[42px] sm:h-9 sm:w-[54px]" />
      </span>
    </span>
  )
}

/**
 * The Travel Planner's badge on its service pages: the umbrella mark with
 * the chosen countries' pills beside it — one pill for one country, a pill
 * each for several, and the mark alone before any country is picked. Used
 * by the Travel Planner service pages' fallback hero (see PageIntro's
 * `eyebrow`) so the mark shows on every state of the page.
 */
export function TravelPlannerBadge({ countrySlugs }) {
  const countries = countrySlugs
    .map((slug) => COUNTRIES.find((c) => c.slug === slug))
    .filter(Boolean)
  return (
    <span className="flex flex-wrap items-end gap-x-4 gap-y-3">
      <img
        src={TRAVEL_PLANNER_MARK.src}
        alt={TRAVEL_PLANNER_MARK.alt}
        className="h-[72px] w-auto shrink-0 sm:h-[88px] lg:h-24"
      />
      {countries.map((country) => (
        <span
          key={country.slug}
          className={`${PILL} h-9 items-center gap-3 text-lg sm:h-10 sm:text-xl lg:h-11`}
        >
          <CountryName country={country} />
          <Flag country={country} className="h-6 w-9 sm:h-7 sm:w-[42px] lg:h-8 lg:w-12" />
        </span>
      ))}
    </span>
  )
}

/**
 * A country's own hero — the same backdrop as its country page (see
 * COUNTRY_HEROES), in the site's one hero design — carrying a service
 * page's heading and copy, with the country's flag and name and the
 * service's `label` in a badge above. Used by the Travel Planner and its
 * service pages when they're for one country (see heroCountrySlug), and by
 * every country's Personal Visa Guidance and Independent Tour Guide pages.
 *
 * Pass a service page's own PageIntro-shaped `pageHero` to reuse its copy
 * as-is — its badge as the label, its title and accent as the heading, its
 * tagline and description as the paragraph — or give those directly.
 * `backdrop` swaps in a page's own media (DestinationHero's backdrop props)
 * in place of the country page's; `primaryCta`/`secondaryCta` add buttons;
 * `mark` (e.g. TRAVEL_PLANNER_MARK) shows a service's mark in the badge in
 * place of its label text; `label={null}` leaves the badge as just the
 * country's name and flag.
 */
export function CountryServiceHero({
  slug,
  pageHero,
  mark,
  label = pageHero?.badge,
  heading = pageHero?.titleLine1,
  headingAccent = pageHero?.titleAccent || undefined,
  tagline = pageHero?.tagline,
  description = pageHero?.description,
  backdrop,
  primaryCta,
  secondaryCta,
}) {
  const country = COUNTRIES.find((c) => c.slug === slug)
  return (
    <DestinationHero
      eyebrow={<CountryHeroBadge country={country} label={label} mark={mark} />}
      heading={heading}
      headingAccent={headingAccent}
      tagline={tagline}
      description={description}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      {...(backdrop ?? COUNTRY_HEROES[slug])}
    />
  )
}
