import { COUNTRIES } from '../data/siteContent.js'
import { FLAGS } from '../data/countryFlags.js'

/**
 * The country tiles Personal Visa Guidance introduced — a flag, the
 * country's name and a round check per country, in a 1/2/3-column grid —
 * shared by every flow that asks a visitor to pick destinations, so they
 * all select countries exactly the same way.
 *
 * Up to `max` can be ticked. Once that many are, the remaining tiles fade
 * out and disable themselves until one is unticked. With `max={1}` the
 * grid behaves like a radio group instead: ticking another country swaps
 * the selection rather than making the visitor untick the first one.
 *
 * `error` shows the same red notice above the tiles Personal Visa Guidance
 * uses for "Please select at least one country to continue."
 */
export function CountrySelectGrid({
  values,
  onChange,
  max = 4,
  countries = COUNTRIES,
  error,
  ariaLabel = 'Countries',
  className = '',
}) {
  const single = max === 1
  const atMax = values.length >= max

  const toggle = (slug) => {
    if (values.includes(slug)) onChange(values.filter((s) => s !== slug))
    else if (single) onChange([slug])
    else if (!atMax) onChange([...values, slug])
  }

  return (
    <div className={className}>
      {error && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700"
        >
          {error}
        </div>
      )}

      <div role="group" aria-label={ariaLabel} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((c) => {
          const isSelected = values.includes(c.slug)
          const isDisabled = !single && !isSelected && atMax
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => toggle(c.slug)}
              disabled={isDisabled}
              aria-pressed={isSelected}
              className={`group flex items-center justify-between rounded-2xl border-2 p-3.5 text-left transition-all ${
                isSelected
                  ? 'border-copper bg-copper/5 shadow-sm'
                  : isDisabled
                    ? 'border-border bg-card opacity-40 cursor-not-allowed'
                    : 'border-border bg-card hover:border-copper/50 hover:bg-sand/30'
              }`}
            >
              <span className="flex items-center gap-3">
                <img
                  src={FLAGS[c.slug]}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-inset ring-black/10"
                />
                <span
                  className={`text-sm font-bold transition-colors ${
                    isSelected ? 'text-copper' : 'text-primary group-hover:text-copper'
                  }`}
                >
                  {c.name}
                </span>
              </span>
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full border-2 transition-all ${
                  isSelected
                    ? 'border-copper bg-copper text-white'
                    : 'border-border bg-card group-hover:border-copper/60'
                }`}
              >
                {isSelected && (
                  <svg
                    viewBox="0 0 12 10"
                    fill="none"
                    className="size-3"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="1 5 4.5 9 11 1" />
                  </svg>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * CountrySelectGrid laid out as one of the request forms' fields — the
 * same label/asterisk/hint styling as their own `Field`, but on a
 * <fieldset> rather than a <label>: a label wrapping the tiles would make
 * a click on its text tick the first country.
 */
export function CountrySelectField({ id, label, required, hint, ...gridProps }) {
  return (
    <fieldset id={id} className="block">
      <legend className="text-sm font-semibold text-primary">
        {label}
        {required && <span className="text-copper"> *</span>}
      </legend>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
      <CountrySelectGrid ariaLabel={label} className="mt-3" {...gridProps} />
    </fieldset>
  )
}
