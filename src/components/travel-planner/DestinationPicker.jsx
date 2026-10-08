import { Plus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { COUNTRIES } from '../../data/siteContent.js'
import { FLAGS } from '../../data/countryFlags.js'

// Same flag treatment as the country tiles (real SVG flags, not emoji —
// see the note on countryFlags.js), paired with the country name in bold
// so the selection reads clearly at a glance.
function CountryChip({ slug, name, onRemove }) {
  return (
    <span className="inline-flex min-w-0 shrink items-center gap-1.5 rounded-full border border-border bg-card py-1 pl-3 pr-1 shadow-card sm:gap-2 sm:py-1.5 sm:pr-1.5">
      <img
        src={FLAGS[slug]}
        alt=""
        aria-hidden="true"
        className="h-4 w-[21.33px] shrink-0 rounded-[3px] object-cover ring-1 ring-inset ring-black/10"
      />
      <span className="min-w-0 truncate text-sm font-bold text-primary">{name}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-copper/15 hover:text-copper"
        >
          <X className="size-3" aria-hidden="true" />
        </button>
      )}
    </span>
  )
}

/**
 * The destination chooser every Travel Planner service page (Service
 * Details, Before You Book Check, Travel Audit) shows after the visitor
 * has picked a service — countries are chosen here, not on the landing
 * page. Reads and writes the ?destinations= query string in place, so the
 * page's price, hero and request link all follow without leaving it.
 *
 * Selected countries and the "+" button share one line: chips shrink and
 * their names truncate so nothing wraps onto a second line. The "+" opens
 * a small list of every country still addable; clicking outside (or
 * Escape) closes it. Up to 4 countries; removing the last one is allowed
 * (the page just waits for a new pick before enabling its request CTA).
 */
export function DestinationPicker() {
  const [searchParams, setSearchParams] = useSearchParams()
  const destinationSlugs = (searchParams.get('destinations') ?? '')
    .split(',')
    .filter((slug) => COUNTRIES.some((c) => c.slug === slug))
    .slice(0, 4)

  const updateDestinations = (slugs) =>
    setSearchParams(slugs.length > 0 ? { destinations: slugs.join(',') } : {})
  const removeDestination = (slug) =>
    updateDestinations(destinationSlugs.filter((s) => s !== slug))
  const addDestination = (slug) => {
    if (slug && destinationSlugs.length < 4 && !destinationSlugs.includes(slug)) {
      updateDestinations([...destinationSlugs, slug])
    }
  }
  const addableCountries = COUNTRIES.filter((c) => !destinationSlugs.includes(c.slug))

  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef(null)
  useEffect(() => {
    if (!pickerOpen) return
    const onPointerDown = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) setPickerOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setPickerOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [pickerOpen])

  return (
    <div className="flex w-full min-w-0 max-w-full flex-nowrap items-center gap-1.5 sm:gap-2">
      {destinationSlugs.length === 0 && (
        <span className="min-w-0 truncate text-sm italic text-muted-foreground">
          No countries selected yet — tap + to add.
        </span>
      )}
      {destinationSlugs.map((slug) => (
        <CountryChip
          key={slug}
          slug={slug}
          name={COUNTRIES.find((c) => c.slug === slug)?.name}
          onRemove={() => removeDestination(slug)}
        />
      ))}
      {addableCountries.length > 0 && destinationSlugs.length < 4 && (
        <div className="relative shrink-0" ref={pickerRef}>
          <button
            type="button"
            onClick={() => setPickerOpen((open) => !open)}
            aria-expanded={pickerOpen}
            aria-label="Add a destination"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-card text-copper shadow-card transition-colors hover:bg-copper/10"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
          {pickerOpen && (
            <div className="absolute right-0 top-full z-30 mt-2 w-56 max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-card sm:left-0 sm:right-auto">
              <p className="px-2.5 pb-1.5 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Add a destination
              </p>
              {addableCountries.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => addDestination(c.slug)}
                  className="flex min-h-11 w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm font-semibold text-primary transition-colors hover:bg-cream"
                >
                  <img
                    src={FLAGS[c.slug]}
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-[21.33px] shrink-0 rounded-[3px] object-cover ring-1 ring-inset ring-black/10"
                  />
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
