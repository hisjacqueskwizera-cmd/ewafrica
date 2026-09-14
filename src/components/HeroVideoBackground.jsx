import { useEffect, useRef, useState } from 'react'
import { HERO_VIDEOS } from '../data/heroVideos.js'

// Keep in sync with the `duration-[…]` class on the <video> elements below —
// this is how long the crossfade takes, and also how far ahead of a clip's
// cutoff (its natural end, or its watch cap) we start the swap, so the
// incoming clip has already begun decoding before it's visible instead of
// cold-starting exactly when the fade begins.
const CROSSFADE_SECONDS = 2

// Two backstops around playback, both no-ops once a clip has already
// crossfaded normally (triggerCrossfade's own advancedRef guard covers
// that) — see the comment on playWithFallback for what each one is for.
const STARTED_TIMEOUT_SECONDS = 8
const MAX_SLOT_SECONDS = 25

/**
 * Rotates through every clip in `videos` (the site-wide HERO_VIDEOS by
 * default — pass a different list, e.g. TZ_HERO_VIDEOS, for a page with
 * its own dedicated footage), one at a time, crossfading between two
 * stacked <video> elements. Only ever two videos are loaded at once (the
 * one playing and the one queued next) so we never pull the full playlist
 * of footage on page load. Each clip plays in full — reaching either its
 * own natural end or its configured watch cap, whichever comes first —
 * except the swap itself starts a little early so the crossfade has real
 * motion on both sides instead of fading in a frozen first frame.
 */
export function HeroVideoBackground({ videos = HERO_VIDEOS }) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [slots, setSlots] = useState([videos[0], videos[1] ?? videos[0]])
  const [front, setFront] = useState(0)
  const pointerRef = useRef(1)
  const isFirstRun = useRef(true)
  const advancedRef = useRef([false, false])
  const videoRefs = [useRef(null), useRef(null)]
  // Pending STARTED/MAX_SLOT timers per slot — see playWithFallback. Tracked
  // so a slot's own timers from a past tenure can be canceled before it's
  // reused, instead of sitting armed and firing against whatever new clip
  // has since taken over that slot.
  const fallbackTimersRef = useRef([[], []])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(query.matches)
    const handler = (event) => setReduceMotion(event.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  // Start slot 0 playing on mount. Slot 1 (queued next) stays paused until
  // its own crossfade is triggered — starting it any earlier would mean
  // viewers join it already in progress once it becomes visible.
  useEffect(() => {
    if (reduceMotion) return
    playWithFallback(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion])

  // Once a crossfade has started, queue the *following* clip into the slot
  // that just went to the back — but only once its fade-out has actually
  // finished. Swapping its `src` any earlier resets that <video> element
  // immediately, so the tail of its fade-out would show the next clip's
  // first frame instead of its own content fading away.
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    const backSlot = front === 0 ? 1 : 0
    const timer = setTimeout(() => {
      const nextPointer = (pointerRef.current + 1) % videos.length
      setSlots((prev) => {
        const next = [...prev]
        next[backSlot] = videos[nextPointer]
        return next
      })
      pointerRef.current = nextPointer
      advancedRef.current[backSlot] = false
    }, CROSSFADE_SECONDS * 1000)
    return () => clearTimeout(timer)
  }, [front, videos])

  const clearFallbackTimers = (slotIndex) => {
    fallbackTimersRef.current[slotIndex].forEach(clearTimeout)
    fallbackTimersRef.current[slotIndex] = []
  }

  const triggerCrossfade = (fromSlot) => {
    if (advancedRef.current[fromSlot]) return
    advancedRef.current[fromSlot] = true
    // This slot's tenure is over (however it got triggered — a normal
    // timeupdate/ended crossfade, onError, or one of the two backstops
    // below) — cancel its own pending backstop timers so neither can fire
    // later against whatever new clip eventually occupies this slot.
    clearFallbackTimers(fromSlot)
    const toSlot = fromSlot === 0 ? 1 : 0
    playWithFallback(toSlot)
    setFront(toSlot)
  }

  // .play(), plus two backstops — deliberately *not* keyed off `duration`,
  // since that alone can't tell "broken" apart from "playing fine but the
  // browser hasn't determined a real duration yet" (some fragmented-MP4
  // exports report `Infinity` until enough of the stream has buffered,
  // even mid-playback):
  //
  // 1. If the clip still hasn't actually started advancing (currentTime is
  //    still ~0) after STARTED_TIMEOUT_SECONDS, it never got going at all
  //    — most often a file that isn't "web-optimized" (its moov atom, the
  //    index the browser needs for duration/seek info, sits after the
  //    frame data instead of before it) and sometimes just never starts
  //    decoding over a plain <video src>. Skip it.
  // 2. Regardless of whether it started, no clip gets to occupy a slot
  //    past MAX_SLOT_SECONDS. A clip with a normal, known duration always
  //    crossfades via handleTimeUpdate well before this fires, so it's a
  //    backstop, not the common path — it exists for a clip that IS
  //    playing but never reports a finite duration (the fragmented-MP4
  //    case above), which would otherwise never trigger the duration-based
  //    crossfade (nothing to compare against) or `ended` (blocked by the
  //    `loop` attribute) and would loop on that slot forever.
  const playWithFallback = (slotIndex) => {
    // Cancel anything left over from this slot's last tenure first — belt
    // and braces alongside the clear in triggerCrossfade, since this is
    // also the function that arms new timers for this slot.
    clearFallbackTimers(slotIndex)
    const video = videoRefs[slotIndex].current
    video?.play?.().catch(() => {})
    const startedTimer = setTimeout(() => {
      if (video && video.currentTime < 0.5) triggerCrossfade(slotIndex)
    }, STARTED_TIMEOUT_SECONDS * 1000)
    const maxSlotTimer = setTimeout(() => {
      triggerCrossfade(slotIndex)
    }, MAX_SLOT_SECONDS * 1000)
    fallbackTimersRef.current[slotIndex] = [startedTimer, maxSlotTimer]
  }

  const handleTimeUpdate = (slotIndex) => {
    const video = videoRefs[slotIndex].current
    if (!video) return
    const { capSeconds } = slots[slotIndex]
    const duration = Number.isFinite(video.duration) ? video.duration : null
    const effectiveEnd = capSeconds != null ? Math.min(duration ?? Infinity, capSeconds) : duration
    if (effectiveEnd == null) return
    if (video.currentTime >= effectiveEnd - CROSSFADE_SECONDS) {
      triggerCrossfade(slotIndex)
    }
  }

  if (reduceMotion) {
    return (
      <div className="absolute inset-0 bg-linear-to-br from-forest to-cocoa" aria-hidden="true" />
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-cocoa" aria-hidden="true">
      {slots.map((video, slotIndex) => (
        <video
          key={slotIndex}
          ref={videoRefs[slotIndex]}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
            front === slotIndex ? 'z-[2] opacity-100' : 'z-[1] opacity-0'
          }`}
          src={video.src}
          muted
          loop
          playsInline
          autoPlay={slotIndex === 0}
          preload="auto"
          onTimeUpdate={() => handleTimeUpdate(slotIndex)}
          onEnded={() => triggerCrossfade(slotIndex)}
          onError={() => triggerCrossfade(slotIndex)}
        />
      ))}
    </div>
  )
}
