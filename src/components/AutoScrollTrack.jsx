import { useEffect, useRef, useState } from 'react'

// Pixels per second the strip drifts at while idle.
const AUTO_SPEED = 45
// Pointer movement past this many pixels counts as a drag rather than a
// tap, so a drag never also fires the click on the card underneath.
const DRAG_THRESHOLD = 4

/**
 * The continuous, freely-draggable auto-scrolling strip behind "Where we
 * work / Explore our Destinations" on the homepage (originally built for
 * DestinationsTicker.jsx — extracted here so other card rows, like
 * Services, can slide the same way without duplicating this drag/autoplay
 * engine). Renders `items` twice back to back (the second copy hidden from
 * assistive tech) so the drift can wrap seamlessly once it has drifted
 * through one full copy.
 *
 * Driven entirely by a CSS transform on an inner track, rather than native
 * scrolling (`element.scrollLeft`) — Safari treats a continuous,
 * gesture-free `scrollLeft` write as exactly the kind of unattended
 * auto-scroll its anti-"scroll-jacking" heuristics are built to suppress,
 * so a rAF-loop-plus-scrollLeft version plays in Chrome/Firefox but sits
 * frozen in real Safari. A `transform` is a plain paint property with no
 * scrolling semantics attached, so no such heuristic applies to it — and it
 * doubles as the one mechanism for both the idle autoplay drift and direct
 * pointer dragging (mouse and touch alike, via the Pointer Events API),
 * rather than mixing native scroll for one and JS scroll for the other.
 */
export function AutoScrollTrack({ items, itemKey, renderItem, ariaLabel, gapClassName = 'gap-5' }) {
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
  }, [items])

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
    <div
      ref={outerRef}
      role="group"
      aria-label={ariaLabel}
      className="cursor-grab overflow-hidden touch-pan-y select-none active:cursor-grabbing"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = true)}
      onFocusCapture={onFocusCapture}
      onBlur={() => (pausedRef.current = false)}
      onPointerDown={onPointerDown}
      onClickCapture={onClickCapture}
      onDragStart={(event) => event.preventDefault()}
    >
      <div ref={trackRef} className={`flex w-max ${gapClassName} will-change-transform`}>
        {items.map((item) => (
          <div key={itemKey(item)}>{renderItem(item, false)}</div>
        ))}
        {items.map((item) => (
          <div key={`${itemKey(item)}-dup`}>{renderItem(item, true)}</div>
        ))}
      </div>
    </div>
  )
}
