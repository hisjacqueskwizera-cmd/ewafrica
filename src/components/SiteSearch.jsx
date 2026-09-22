import { ArrowRight, BookOpen, Compass, MapPin, Search, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { COUNTRIES } from '../data/siteContent.js'
import { searchSite } from '../data/searchIndex.js'
import { HashLink } from './HashLink.jsx'

const CATEGORY_ICONS = {
  Destination: MapPin,
  Guide: BookOpen,
  Service: Compass,
  Page: Compass,
}

// A handful of popular destinations shown before the visitor types
// anything — search should feel alive and useful the moment it opens,
// not just once there's a query to react to.
const QUICK_LINKS = COUNTRIES.slice(0, 6).map((country) => ({
  title: country.displayName ?? country.name,
  description: country.note,
  to: country.to,
  category: 'Destination',
  flag: country.flag,
}))

/**
 * The header's search trigger + its results overlay, in one component so
 * both the desktop icon and the mobile menu's icon can drive the same
 * instance. Clicking the trigger expands it into a real search box —
 * animated in, not just toggled — with live results across every
 * destination, service and practical guide on the site (see
 * data/searchIndex.js). Escape, an outside click, or picking a result all
 * close it the same way.
 */
export function SiteSearch({ triggerClassName, iconClassName = 'size-4' }) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const results = useMemo(() => searchSite(query), [query])
  const showing = query.trim() ? results : QUICK_LINKS

  const openSearch = () => {
    setOpen(true)
    setActiveIndex(-1)
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
  }

  const closeSearch = () => {
    setVisible(false)
    window.setTimeout(() => {
      setOpen(false)
      setQuery('')
      setActiveIndex(-1)
    }, 200)
  }

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSearch()
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, showing.length - 1))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, -1))
      } else if (event.key === 'Enter') {
        const target = showing[activeIndex] ?? showing[0]
        if (target) {
          document.getElementById(`site-search-result-${showing.indexOf(target)}`)?.click()
        }
      }
    }
    const onPointerDown = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) closeSearch()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open, showing, activeIndex])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className={triggerClassName}
        aria-label="Search the site"
        aria-expanded={open}
      >
        <Search className={iconClassName} aria-hidden="true" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[200]">
          <div
            className={`absolute inset-0 bg-cocoa/50 backdrop-blur-sm transition-opacity duration-200 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeSearch}
            aria-hidden="true"
          />

          <div className="absolute inset-x-0 top-[84px] flex justify-center px-4 sm:px-6">
            <div
              ref={panelRef}
              className={`w-full max-w-2xl origin-top overflow-hidden rounded-3xl bg-card shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out ${
                visible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-2 scale-95 opacity-0'
              }`}
            >
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <Search className="size-5 shrink-0 text-copper" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setActiveIndex(-1)
                  }}
                  placeholder="Search destinations, services, guides..."
                  className="w-full bg-transparent text-base text-primary placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Search"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-sand hover:text-primary"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {!query.trim() && (
                  <p className="flex items-center gap-1.5 px-3 pb-2 pt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    <Sparkles className="size-3.5 text-copper" aria-hidden="true" />
                    Popular destinations
                  </p>
                )}

                {query.trim() && results.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No results for &ldquo;{query}&rdquo; — try a country, a service, or a guide.
                  </p>
                )}

                {showing.map((result, i) => {
                  const Icon = CATEGORY_ICONS[result.category] ?? Compass
                  return (
                    <HashLink
                      key={`${result.to}-${result.title}`}
                      id={`site-search-result-${i}`}
                      to={result.to}
                      onClick={closeSearch}
                      className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors ${
                        i === activeIndex ? 'bg-sand' : 'hover:bg-sand/70'
                      }`}
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-copper group-hover:bg-copper/15">
                        {result.flag ? (
                          <span className="text-base leading-none">{result.flag}</span>
                        ) : (
                          <Icon className="size-4" aria-hidden="true" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-primary">
                            {result.title}
                          </span>
                          <span className="shrink-0 rounded-full bg-border/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                            {result.category}
                          </span>
                        </span>
                        {result.description && (
                          <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                            {result.description}
                          </span>
                        )}
                      </span>
                      <ArrowRight
                        className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </HashLink>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
