import { ArrowRight, CheckCircle2, Umbrella } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SERVICES, TRAVEL_PLANNER_UMBRELLA } from '../data/siteContent.js'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'
import { SectionMark } from './SectionMark.jsx'

// How long each group of 3 stays on screen before autoplay advances to the
// next one.
const STAY_MS = 3500
const PAGE_SIZE = 3

// A landscape, full-bleed photo card: image fills the frame, a bottom-up
// gradient carries the title so it stays legible over any photo, corners
// stay sharp. Same card language across the whole row — services and the
// umbrella card alike — just with different content in the overlay.
//
// The hover state is the reference site's own recipe, lifted straight from
// its CSS: the photo zooms to 1.08 (.6s), a second flat black layer fades
// in on top for extra contrast (.45s), the title lifts 10px, and the
// description — hidden by default — drops into view via max-height +
// opacity + a small rise (~.4s). `group-focus-within` mirrors it for
// keyboard focus, since `:hover` alone would leave it keyboard-inaccessible.
//
function PhotoCard({ to, image, children }) {
  return (
    <HashLink
      to={to}
      draggable={false}
      className="group relative block h-[350px] w-full overflow-hidden bg-cocoa sm:h-[390px]"
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black opacity-0 transition-opacity duration-[450ms] ease-out group-hover:opacity-[0.45] group-focus-within:opacity-[0.45]"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col justify-end p-6">{children}</div>
    </HashLink>
  )
}

function CardTitle({ children, className = '' }) {
  return (
    <h3
      className={`transition-transform duration-[450ms] ease-out group-hover:-translate-y-2.5 group-focus-within:-translate-y-2.5 ${className}`}
    >
      {children}
    </h3>
  )
}

// Hidden until hover/focus, then unfolds — max-height + opacity + a small
// rise, exactly the reference site's `.hover-card-desc` transition.
//
// `expand` is the literal group-hover/group-focus-within max-height pair —
// a prop rather than a template-interpolated class, since Tailwind's JIT
// scanner needs the full class name written out somewhere in the source to
// generate it; a dynamically-built string like `max-h-${n}` wouldn't be
// picked up. Defaults to the original cards' max-h-32; the umbrella card
// passes a taller one since it reveals both a paragraph and a checklist.
function CardReveal({
  children,
  className = '',
  expand = 'group-hover:max-h-32 group-focus-within:max-h-32',
}) {
  return (
    <div
      className={`max-h-0 translate-y-3 overflow-hidden opacity-0 transition-[max-height,opacity,transform] duration-[400ms] ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 ${expand} ${className}`}
    >
      {children}
    </div>
  )
}

function ServiceCard({ s }) {
  return (
    <PhotoCard to={s.to} image={s.image}>
      <CardTitle className="text-2xl font-semibold text-primary-foreground">{s.title}</CardTitle>
      <CardReveal>
        <p className="pt-2 text-sm leading-relaxed text-primary-foreground/80">{s.description}</p>
      </CardReveal>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/90 transition-colors group-hover:text-gold">
        Learn More
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </span>
    </PhotoCard>
  )
}

function UmbrellaCard() {
  return (
    <PhotoCard to={TRAVEL_PLANNER_UMBRELLA.to} image="/Pictures/caption.jpg">
      <Umbrella className="size-6 text-gold" aria-hidden="true" />
      <CardTitle className="mt-3 text-2xl font-semibold leading-snug text-primary-foreground">
        {TRAVEL_PLANNER_UMBRELLA.title}
        <br />
        <span className="italic">{TRAVEL_PLANNER_UMBRELLA.subtitle}</span>
      </CardTitle>
      <CardReveal expand="group-hover:max-h-52 group-focus-within:max-h-52">
        <p className="pt-2 text-xs leading-relaxed text-primary-foreground/85">
          {TRAVEL_PLANNER_UMBRELLA.description}
        </p>
        <ul className="mt-2.5 space-y-1.5">
          {TRAVEL_PLANNER_UMBRELLA.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs font-semibold text-primary-foreground/85"
            >
              <CheckCircle2 className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </CardReveal>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/90 transition-colors group-hover:text-gold">
        Learn More
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </span>
    </PhotoCard>
  )
}

// Every card, in order — the 5 services plus the Travel Planner umbrella.
const CARD_ITEMS = [
  ...SERVICES.map((s) => ({ key: s.title, render: () => <ServiceCard s={s} /> })),
  { key: 'umbrella', render: () => <UmbrellaCard /> },
]

// Grouped into pages of 3 — with 6 cards total that's an even 2 pages, but
// this stays correct if a card is ever added or removed (a trailing page
// just ends up with fewer than 3).
const PAGES = Array.from({ length: Math.ceil(CARD_ITEMS.length / PAGE_SIZE) }, (_, i) =>
  CARD_ITEMS.slice(i * PAGE_SIZE, i * PAGE_SIZE + PAGE_SIZE),
)

// Pointer movement past this many pixels counts as a drag rather than a
// tap, so a mouse-drag never also fires the click on the card underneath.
const DRAG_THRESHOLD = 4
// After a touch drag ends, autoplay waits this long before resuming — long
// enough for the browser's momentum/inertia scrolling to settle rather than
// fighting it.
const TOUCH_SETTLE_MS = 600

export function Services() {
  const trackRef = useRef(null)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  // Refs, not state — read from event handlers that fire between renders
  // and must never themselves trigger one.
  const draggingRef = useRef(false)
  const dragRef = useRef({ pointerId: null, startX: 0, startScrollLeft: 0, moved: false })
  const touchSettleTimeoutRef = useRef(null)
  // Captured lazily at mount so the initial render already reflects the OS
  // setting (no extra render just to sync it) — the effect below only wires
  // up the listener for later changes.
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (event) => setReduceMotion(event.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  useEffect(() => () => clearTimeout(touchSettleTimeoutRef.current), [])

  // Scrolls the strip to a given page — used by autoplay, the dots, and to
  // settle on the nearest page once a mouse-drag ends.
  const scrollToPage = useCallback((target) => {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(PAGES.length - 1, target))
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' })
  }, [])

  // Keeps `page` (for the dots) in sync with wherever the strip is actually
  // scrolled to — from autoplay, a dot click, or the user dragging/swiping.
  const onScroll = () => {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    const next = Math.round(track.scrollLeft / track.clientWidth)
    setPage((current) => (next === current ? current : next))
  }

  // Autoplay — advances one page at a time, pausing on hover/focus/drag and
  // skipped entirely for prefers-reduced-motion. Wraps from the last page
  // back to the first as a plain scroll backward — with only two pages a
  // forward-only "duplicate strip" loop isn't worth the complexity it buys
  // the destinations ticker above.
  useEffect(() => {
    if (paused || reduceMotion || PAGES.length <= 1) return
    const id = setTimeout(() => {
      scrollToPage((page + 1) % PAGES.length)
    }, STAY_MS)
    return () => clearTimeout(id)
  }, [page, paused, reduceMotion, scrollToPage])

  // Touch scrolls (and snaps) natively, so only mouse needs manual
  // click-and-drag handling here.
  const onPointerDown = (event) => {
    clearTimeout(touchSettleTimeoutRef.current)
    setPaused(true)
    draggingRef.current = true
    const track = trackRef.current
    // Grabbing the strip mid-autoplay would otherwise leave the browser's
    // native smooth-scroll animation still running underneath the drag,
    // fighting it and making the strip overshoot — cut it off at wherever
    // it currently sits.
    if (track) track.scrollTo({ left: track.scrollLeft, behavior: 'auto' })
    if (event.pointerType !== 'mouse' || !track) return
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    }
    track.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event) => {
    if (!draggingRef.current || event.pointerType !== 'mouse') return
    if (event.pointerId !== dragRef.current.pointerId) return
    const track = trackRef.current
    if (!track) return
    const dx = event.clientX - dragRef.current.startX
    if (Math.abs(dx) > DRAG_THRESHOLD) dragRef.current.moved = true
    track.scrollLeft = dragRef.current.startScrollLeft - dx
  }

  const onPointerUp = (event) => {
    draggingRef.current = false
    if (event.pointerType === 'mouse') {
      const track = trackRef.current
      if (track) scrollToPage(Math.round(track.scrollLeft / track.clientWidth))
      setPaused(false)
      return
    }
    // Touch: let momentum scrolling finish before autoplay resumes.
    touchSettleTimeoutRef.current = setTimeout(() => setPaused(false), TOUCH_SETTLE_MS)
  }

  const onClickCapture = (event) => {
    if (dragRef.current.moved) {
      event.preventDefault()
      dragRef.current.moved = false
    }
  }

  return (
    <section id="services" className="overflow-hidden bg-cream pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionMark />
            <div className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
              <RevealText as="h2" text="Our" className="text-primary" />
              <RevealText
                as="h2"
                text="Services"
                delay={200}
                className="italic font-medium text-copper"
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* 3 cards at a time, one page per scroll-snap stop. Full-bleed to
          both screen edges — same pattern as Tanzania's Popular Overland
          Routes cards — with a small lg:px-3 gutter rather than lg:px-0 so
          the row doesn't read like it's been cut off flush against the
          edge. */}
      <div
        ref={trackRef}
        role="group"
        aria-label="Our Services"
        className="mt-10 flex cursor-grab touch-pan-x select-none snap-x snap-mandatory overflow-x-auto px-4 active:cursor-grabbing sm:px-6 lg:px-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={onScroll}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
      >
        {PAGES.map((group, i) => (
          <div
            key={i}
            className="grid w-full shrink-0 snap-start grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5"
          >
            {group.map((item) => (
              <div key={item.key}>{item.render()}</div>
            ))}
          </div>
        ))}
      </div>

      {PAGES.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {PAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show services group ${i + 1} of ${PAGES.length}`}
              aria-current={i === page}
              onClick={() => scrollToPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? 'w-6 bg-copper' : 'w-1.5 bg-primary/20 hover:bg-primary/40'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
