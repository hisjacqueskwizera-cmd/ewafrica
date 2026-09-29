import { COUNTRY_HEROES } from '../data/countryHeroes.js'
import { FLAGS } from '../data/countryFlags.js'
import { COUNTRIES } from '../data/siteContent.js'
import { DestinationHero } from './DestinationHero.jsx'

const PILL =
  'inline-flex border border-gold/70 bg-black/55 font-bold uppercase shadow-[0_6px_24px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md'

function CountryName({ country }) {
  return (
    <span className="tracking-[0.1em] text-primary-foreground">{country.name}</span>
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
        className={`${PILL} items-center gap-3 rounded-full px-5 py-2.5 text-base sm:px-6 sm:py-3 sm:text-2xl`}
      >
        <CountryName country={country} />
        <Flag country={country} className="h-6 w-9 sm:h-8 sm:w-12" />
      </span>
    )
  }

  if (mark) {
    // The mark is a standalone graphic (an umbrella over its own outlined
    // "TRAVEL PLANNER" pill), so it stands at full size rather than
    // squeezed into a pill. The country pill beside it is half its height,
    // which lines it up with the mark's own pill; on phones it drops below.
    return (
      <span className="flex flex-wrap items-end gap-x-4 gap-y-3">
        <img
          src={mark.src}
          alt={mark.alt}
          className="h-[72px] w-auto shrink-0 sm:h-[88px] lg:h-24"
        />
        <span
          className={`${PILL} h-9 items-center gap-3 rounded-full px-4 text-base sm:h-11 sm:px-5 sm:text-xl lg:h-12 lg:text-2xl`}
        >
          <CountryName country={country} />
          <Flag country={country} className="h-5 w-[30px] sm:h-6 sm:w-9 lg:h-7 lg:w-[42px]" />
        </span>
      </span>
    )
  }

  return (
    // Two rows on phones (the service name, then country + flag) so a long
    // name like "Tanzania & Zanzibar" never breaks mid-pill; one row from
    // sm up.
    <span
      className={`${PILL} flex-col items-start gap-1.5 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-full sm:px-6`}
    >
      <span className="text-xs tracking-[0.16em] text-gold sm:text-sm">{label}</span>
      <span className="hidden h-6 w-px bg-primary-foreground/40 sm:block" aria-hidden="true" />
      <span className="flex items-center gap-3 text-base sm:text-2xl">
        <CountryName country={country} />
        <Flag country={country} className="h-6 w-9 sm:h-8 sm:w-12" />
      </span>
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
