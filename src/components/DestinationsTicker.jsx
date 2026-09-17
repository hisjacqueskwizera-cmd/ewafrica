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
        <h3 className="truncate text-2xl font-semibold text-primary-foreground transition-transform duration-[450ms] ease-out group-hover:-translate-y-2.5">
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
// After a touch drag ends, autoplay waits this long before resuming — long
// enough for the browser's momentum/inertia scrolling to settle rather than
// fighting it.
const TOUCH_SETTLE_MS = 600
// Pointer movement past this many pixels counts as a drag rather than a
// tap, so a mouse-drag never also fires the click on the card underneath.
const DRAG_THRESHOLD = 4

export function DestinationsTicker() {
  const trackRef = useRef(null)
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  // Refs, not state — they're read every animation frame and must never
  // trigger a re-render themselves.
  const pausedRef = useRef(false)
  const draggingRef = useRef(false)
  const dragRef = useRef({ pointerId: null, startX: 0, startScrollLeft: 0, moved: false })
  const touchSettleTimeoutRef = useRef(null)

  // Auto-scrolls the strip at a constant speed, wrapping back to the start
  // once it has scrolled through one full copy of the list (the list is
  // rendered twice below, so the wrap lands on an identical frame and reads
  // as seamless). Paused on hover/focus and while the user is dragging.
  useEffect(() => {
    const track = trackRef.current
    if (!track || reduceMotion) return
    let frame
    let last = null
    const tick = (time) => {
      if (last == null) last = time
      const dt = (time - last) / 1000
      last = time
      if (!pausedRef.current && !draggingRef.current) {
        track.scrollLeft += AUTO_SPEED * dt
      }
      const loopWidth = track.scrollWidth / 2
      if (loopWidth > 0 && track.scrollLeft >= loopWidth) {
        track.scrollLeft -= loopWidth
        // Keep the in-progress drag's reference point in step with the wrap.
        if (draggingRef.current) dragRef.current.startScrollLeft -= loopWidth
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduceMotion])

  useEffect(() => () => clearTimeout(touchSettleTimeoutRef.current), [])

  // Mouse dragging is tracked via window-level listeners rather than this
  // element's own onPointerMove/onPointerUp plus setPointerCapture. Pointer
  // capture keeps delivering move events once the cursor leaves the strip
  // mid-drag, which is exactly why it was here — but while captured, the
  // browser also retargets the *click* event that follows pointerup to the
  // capturing element instead of hit-testing normally, so the card's own
  // click (and the navigation it triggers) is silently swallowed even
  // after capture is released in the pointerup handler itself, because the
  // click has already been dispatched with the overridden target by then.
  // Window listeners get the same "track outside the element" behavior
  // without ever touching click targeting, which is why a touch tap (never
  // captured here — it scrolls natively) worked while a mouse click didn't.
  //
  // Built once, in an effect, as a matched { onMove, onUp } pair — rather
  // than as two separately memoized callbacks — so neither has to refer to
  // the other by its outer binding name before that binding exists.
  const dragListenersRef = useRef(null)

  useEffect(() => {
    const onMove = (event) => {
      if (!draggingRef.current) return
      if (event.pointerId !== dragRef.current.pointerId) return
      const track = trackRef.current
      if (!track) return
      const dx = event.clientX - dragRef.current.startX
      if (Math.abs(dx) > DRAG_THRESHOLD) dragRef.current.moved = true
      track.scrollLeft = dragRef.current.startScrollLeft - dx
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

  // Touch scrolls natively (the track is a real overflow-x-auto element),
  // so only mouse needs manual click-and-drag handling here.
  const onPointerDown = (event) => {
    clearTimeout(touchSettleTimeoutRef.current)
    draggingRef.current = true
    if (event.pointerType !== 'mouse') return
    const track = trackRef.current
    if (!track) return
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
      moved: false,
    }
    const { onMove, onUp } = dragListenersRef.current
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  const onPointerUp = (event) => {
    if (event.pointerType === 'mouse') return
    touchSettleTimeoutRef.current = setTimeout(() => {
      draggingRef.current = false
    }, TOUCH_SETTLE_MS)
  }

  const onClickCapture = (event) => {
    if (dragRef.current.moved) {
      event.preventDefault()
      dragRef.current.moved = false
    }
  }

  return (
    <section id="destinations" className="overflow-hidden pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Where we work" title="Explore our Destinations" />
      </div>

      <div
        ref={trackRef}
        role="group"
        aria-label="Explore our destinations"
        className="mt-10 flex cursor-grab touch-pan-x select-none gap-5 overflow-x-auto active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocus={() => (pausedRef.current = true)}
        onBlur={() => (pausedRef.current = false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
      >
        {DESTINATIONS.map((d) => (
          <DestinationCard key={d.slug} d={d} />
        ))}
        {DESTINATIONS.map((d) => (
          <DestinationCard key={`${d.slug}-dup`} d={d} hidden />
        ))}
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
