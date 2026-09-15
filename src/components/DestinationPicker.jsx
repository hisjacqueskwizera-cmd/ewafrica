import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FLAGS } from '../data/countryFlags.js'

function Flag({ slug }) {
  return (
    <img
      src={FLAGS[slug]}
      alt=""
      aria-hidden="true"
      className="h-4 w-[21.33px] shrink-0 rounded-[3px] object-cover ring-1 ring-inset ring-black/10"
    />
  )
}

/**
 * A multi-select country picker styled as a pill (matching the reference
 * design) that shows a real flag next to every option — a native
 * <select>'s <option> elements can only hold plain text, so a custom
 * listbox is what it takes to put a flag icon inside each row instead of
 * just the country name.
 *
 * Up to `max` countries can be picked (Travel Planner prices by how many
 * are selected); picking one doesn't close the list, so several can be
 * chosen in one visit — it closes on an outside click, Escape, or clicking
 * the trigger again. Once `max` is reached, the remaining unselected rows
 * disable themselves rather than silently doing nothing on click.
 *
 * The open listbox is rendered through a portal straight into
 * document.body, positioned with fixed coordinates read off the trigger
 * button, rather than as a normal `absolute` child. Every section on this
 * page sits inside a `Reveal` wrapper, and `Reveal`'s transition/transform
 * classes make each one its own CSS stacking context — a plain
 * `position: absolute` + `z-index` child can't out-rank a *different*
 * stacking context (the next section down the page) no matter how high
 * its z-index goes, which is what let the following service cards paint
 * over the open list. A portal escapes that entirely.
 */
export function DestinationPicker({ countries, values, onChange, max = 4, className = '' }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const buttonRef = useRef(null)
  const listRef = useRef(null)
  const selected = countries.filter((country) => values.includes(country.slug))
  const atMax = values.length >= max

  const updateCoords = () => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      setCoords({ top: rect.bottom + 8, left: rect.left, width: rect.width })
    }
  }

  const toggleOpen = () => {
    if (!open) updateCoords()
    setOpen((isOpen) => !isOpen)
  }

  const toggleValue = (slug) => {
    if (values.includes(slug)) {
      onChange(values.filter((v) => v !== slug))
    } else if (!atMax) {
      onChange([...values, slug])
    }
  }

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event) => {
      if (buttonRef.current?.contains(event.target)) return
      if (listRef.current?.contains(event.target)) return
      setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', updateCoords, true)
    window.addEventListener('resize', updateCoords)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', updateCoords, true)
      window.removeEventListener('resize', updateCoords)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- updateCoords is stable enough here
  }, [open])

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-center gap-2.5 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-primary shadow-card transition-colors hover:border-copper/50"
      >
        {selected.length > 0 ? (
          <span className="flex -space-x-1.5">
            {selected.map((country) => (
              <Flag key={country.slug} slug={country.slug} />
            ))}
          </span>
        ) : null}
        {selected.length === 0
          ? `Select up to ${max} countries`
          : `${selected.length} ${selected.length === 1 ? 'country' : 'countries'} selected`}
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open &&
        coords &&
        createPortal(
          <ul
            ref={listRef}
            role="listbox"
            aria-label="Destinations"
            aria-multiselectable="true"
            style={{ top: coords.top, left: coords.left, width: coords.width }}
            className="fixed z-[150] max-h-72 overflow-y-auto rounded-2xl border border-border bg-card p-2 shadow-lift"
          >
            {countries.map((country) => {
              const isSelected = values.includes(country.slug)
              const disabled = !isSelected && atMax
              return (
                <li key={country.slug} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => toggleValue(country.slug)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                      disabled
                        ? 'cursor-not-allowed text-muted-foreground/40'
                        : isSelected
                          ? 'bg-sand/80 text-primary hover:bg-sand'
                          : 'text-muted-foreground hover:bg-sand/60'
                    }`}
                  >
                    <Flag slug={country.slug} />
                    <span className="flex-1">{country.name}</span>
                    {isSelected && <Check className="size-4 shrink-0 text-copper" aria-hidden="true" />}
                  </button>
                </li>
              )
            })}
          </ul>,
          document.body,
        )}
    </div>
  )
}
