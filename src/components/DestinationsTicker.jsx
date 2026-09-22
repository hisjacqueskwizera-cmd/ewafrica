import { ArrowRight, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { DESTINATIONS } from '../data/siteContent.js'
import { PlaceholderArt } from './PlaceholderArt.jsx'
import { SectionTitle } from './section-heading.jsx'

// One card in the auto-scrolling destinations ticker. `hidden` marks the
// duplicated second copy of the row (rendered so the strip has a full loop's
// worth of width to scroll through before wrapping) so assistive tech only
// ever hears each destination once — its link is also dropped from the tab
// order.
//
// Same card language as the Services row and Explore Regions: full-bleed
// photo, square corners, a bottom-up black gradient, serif title, and an
// uppercase "Explore" line — rather than this card's old rounded corners
// and corner map-pin badge.
//
// The row runs full-bleed (no max-w container), so a fixed card width lets
// more cards fit as the monitor gets wider — up around 6 on a large desktop.
// From lg up, the width itself scales with the viewport (clamped between
// 20rem and 36rem) so roughly 4 stay visible at once no matter how wide the
// screen is, instead of shrinking the row to crop the count.
//
// Height is set explicitly (the old 3:4 aspect-ratio height, plus a flat
// 50px) rather than via aspect-[3/4], since the lg width is itself a
// clamp/vw expression and the height needs to track it.
function DestinationCard({ d, hidden }) {
  return (
    <Link
      to={d.to}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      draggable={false}
      className="group relative w-64 h-[391px] shrink-0 overflow-hidden bg-cocoa sm:w-72 sm:h-[434px] lg:w-[clamp(20rem,25vw-1rem,36rem)] lg:h-[calc(clamp(20rem,25vw-1rem,36rem)*4/3+50px)]"
    >
      {d.image ? (
        <img
          src={d.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          draggable={false}
          className="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
        />
      ) : (
        <PlaceholderArt
          icon={MapPin}
          tone={d.tone}
          className="size-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
        />
      )}
      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black opacity-0 transition-opacity duration-[450ms] ease-out group-hover:opacity-[0.45]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-6">
        {d.featured && (
          <p className="truncate text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary-foreground/80">
            {d.featuredLabel || 'Featured Country'}
          </p>
        )}
        <h3 className="mt-1 truncate text-2xl font-semibold text-primary-foreground transition-transform duration-[450ms] ease-out group-hover:-translate-y-2.5">
          {d.name}
        </h3>
        {d.note && (
          <p className="mt-1 truncate text-sm text-primary-foreground/80">{d.note}</p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/90 transition-colors group-hover:text-gold">
          Explore
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

// Pixels per second the strip drifts at while idle.
const AUTO_SPEED = 45
// Pointer movement past this many pixels counts as a drag rather than a
// tap, so a drag never also fires the click on the card underneath.
const DRAG_THRESHOLD = 4

// Driven entirely by a CSS transform on an inner track, rather than native
// scrolling (`element.scrollLeft`) — Safari treats a continuous,
// gesture-free `scrollLeft` write as exactly the kind of unattended
// auto-scroll its anti-"scroll-jacking" heuristics are built to suppress,
// so the old rAF-loop-plus-scrollLeft version played in Chrome/Firefox but
// sat frozen in real Safari. A `transform` is a plain paint property with
// no scrolling semantics attached, so no such heuristic applies to it —
// and it doubles as the one mechanism for both the idle autoplay drift and
// direct pointer dragging (mouse and touch alike, via the Pointer Events
// API), rather than mixing native scroll for one and JS scroll for the
// other.
export function DestinationsTicker() {
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  // Current scroll offset in px, and half the track's rendered width (the
  // point one full, un-duplicated copy of the list ends) — refs, since
  // they're read/written every animation frame and must never themselves
  // trigger a re-render.
  const offsetRef = useRef(0)
  const loopWidthRef = useRef(0)
  const pausedRef = useRef(false)
  const draggingRef = useRef(false)
  const dragRef = useRef({ pointerId: null, startX: 0, startOffset: 0, moved: false })

  const applyOffset = () => {
    const track = trackRef.current
    if (track) track.style.transform = `translateX(${-offsetRef.current}px)`
  }

  const wrapOffset = () => {
    const loopWidth = loopWidthRef.current
    if (loopWidth <= 0) return
    offsetRef.current = ((offsetRef.current % loopWidth) + loopWidth) % loopWidth
  }

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) loopWidthRef.current = trackRef.current.scrollWidth / 2
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Auto-scrolls the strip at a constant speed, wrapping back to the start
  // once it has drifted through one full copy of the list (the list is
  // rendered twice below, so the wrap lands on an identical frame and reads
  // as seamless). Paused on hover/focus and while the user is dragging.
  useEffect(() => {
    if (reduceMotion) return
    let frame
    let last = null
    const tick = (time) => {
      if (last == null) last = time
      const dt = (time - last) / 1000
      last = time
      if (!pausedRef.current && !draggingRef.current) {
        offsetRef.current += AUTO_SPEED * dt
        wrapOffset()
        applyOffset()
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduceMotion])

  // One unified drag path for mouse and touch alike (Pointer Events cover
  // both), tracked via window-level listeners so a drag that leaves the
  // strip mid-gesture keeps following the pointer.
  const dragListenersRef = useRef(null)

  useEffect(() => {
    const onMove = (event) => {
      if (!draggingRef.current) return
      if (event.pointerId !== dragRef.current.pointerId) return
      const dx = event.clientX - dragRef.current.startX
      if (Math.abs(dx) > DRAG_THRESHOLD) dragRef.current.moved = true
      offsetRef.current = dragRef.current.startOffset - dx
      wrapOffset()
      applyOffset()
    }
    const onUp = () => {
      draggingRef.current = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
    dragListenersRef.current = { onMove, onUp }
    // In case the component unmounts mid-drag (route change, etc.) — a
    // normal pointerup already removes these itself via onUp above.
    return onUp
  }, [])

  const onPointerDown = (event) => {
    draggingRef.current = true
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: offsetRef.current,
      moved: false,
    }
    const { onMove, onUp } = dragListenersRef.current
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  const onClickCapture = (event) => {
    if (dragRef.current.moved) {
      event.preventDefault()
      dragRef.current.moved = false
    }
  }

  // With no native scroll container, the browser's normal "scroll the
  // focused element into view" behavior has nothing to act on — so a
  // keyboard user tabbing to a card currently off to the side would focus
  // something they can't see. Nudge the track's own offset instead
  // whenever focus lands on a card outside the visible window.
  const onFocusCapture = (event) => {
    const outer = outerRef.current
    const card = event.target.closest('a')
    if (!outer || !card) return
    const outerRect = outer.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    if (cardRect.left < outerRect.left) {
      offsetRef.current -= outerRect.left - cardRect.left
    } else if (cardRect.right > outerRect.right) {
      offsetRef.current += cardRect.right - outerRect.right
    } else {
      return
    }
    wrapOffset()
    applyOffset()
  }

  return (
    <section id="destinations" className="overflow-hidden pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Where we work" title="Explore our Destinations" />
      </div>

      <div
        ref={outerRef}
        role="group"
        aria-label="Explore our destinations"
        className="mt-10 cursor-grab overflow-hidden touch-pan-y select-none active:cursor-grabbing"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocus={() => (pausedRef.current = true)}
        onFocusCapture={onFocusCapture}
        onBlur={() => (pausedRef.current = false)}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
      >
        <div ref={trackRef} className="flex w-max gap-5 will-change-transform">
          {DESTINATIONS.map((d) => (
            <DestinationCard key={d.slug} d={d} />
          ))}
          {DESTINATIONS.map((d) => (
            <DestinationCard key={`${d.slug}-dup`} d={d} hidden />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 flex justify-center">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-semibold text-copper hover:underline"
          >
            <span>View all destinations</span>
            <span className="grid size-8 place-items-center rounded-full bg-copper text-copper-foreground">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
