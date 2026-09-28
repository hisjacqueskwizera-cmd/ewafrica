import { COUNTRY_HEROES } from '../data/countryHeroes.js'
import { FLAGS } from '../data/countryFlags.js'
import { COUNTRIES } from '../data/siteContent.js'
import { DestinationHero } from './DestinationHero.jsx'

// The flag + country name shown above a country's service hero, followed
// by the service's label — the same pill as the site's other hero badges
// (see PageIntro), but on a dark glass fill: country heroes have no scrim,
// and the gold label would wash out over bright backdrops like Tanzania's
// sunset or Victoria Falls.
function CountryHeroBadge({ country, label }) {
  return (
    // Two rows on phones (flag + name, then the label) so a long name like
    // "Tanzania & Zanzibar" never breaks mid-pill; one row from sm up.
    <span className="inline-flex flex-col items-start gap-1.5 rounded-2xl border border-primary-foreground/30 bg-black/35 px-4 py-3 font-bold uppercase text-gold backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4 sm:rounded-full sm:px-6">
      <span className="flex items-center gap-3">
        <img
          src={FLAGS[country.slug]}
          alt=""
          aria-hidden="true"
          className="h-6 w-9 shrink-0 rounded-[3px] object-cover ring-1 ring-inset ring-black/10 sm:h-8 sm:w-12"
        />
        <span className="text-base tracking-[0.1em] text-primary-foreground sm:text-2xl">
          {country.name}
        </span>
      </span>
      <span className="hidden h-6 w-px bg-primary-foreground/40 sm:block" aria-hidden="true" />
      <span className="text-xs tracking-[0.16em] sm:text-sm">{label}</span>
    </span>
  )
}

/**
 * A country's own hero — the same backdrop and design as its country page
 * (see COUNTRY_HEROES) — carrying a service page's heading and copy, with
 * the country's flag and name and the service's `label` in a badge above.
 * Used by the Travel Planner and its service pages when they're for one
 * country (see heroCountrySlug).
 *
 * Pass a service page's own PageIntro-shaped `pageHero` to reuse its copy
 * as-is — its badge as the label, its title as the heading, its tagline and
 * description as the paragraph — or give `label`/`heading`/`description`
 * directly.
 */
export function CountryServiceHero({
  slug,
  pageHero,
  label = pageHero?.badge,
  heading = `${pageHero?.titleLine1 ?? ''} ${pageHero?.titleAccent ?? ''}`.trim(),
  description = [...(pageHero?.tagline ?? []), pageHero?.description].filter(Boolean).join(' '),
}) {
  const country = COUNTRIES.find((c) => c.slug === slug)
  return (
    <DestinationHero
      eyebrow={<CountryHeroBadge country={country} label={label} />}
      heading={heading}
      description={description}
      {...COUNTRY_HEROES[slug]}
    />
  )
}
