import { useEffect, useRef, useState } from 'react'
import { HERO_VIDEOS } from '../data/heroVideos.js'

// Keep in sync with the `duration-[2000ms]` class on the incoming <video>.
const CROSSFADE_MS = 2000

// `timeupdate` only fires every ~250ms, so the hand-over is armed a little
// earlier than the crossfade itself needs. That keeps the outgoing clip in
// motion right up to the end of the fade instead of freezing on its last
// frame underneath it.
const LEAD_SECONDS = 0.35

// A clip whose playback hasn't advanced for this long (a file the browser
// can't decode, a dropped connection) is skipped — but only into a clip
// that has already buffered, so a slow network never fades into a blank.
const STALL_MS = 8000

const HAVE_FUTURE_DATA = 3

function initialLayers(videoCount) {
  if (videoCount === 0) return { previous: null, current: null, next: null }
  return {
    previous: null,
    current: { id: 0, clip: 0 },
    next: { id: 1, clip: 1 % videoCount },
  }
}

// Whether a clip has reached the point where it should hand over: its
// natural end or its watch cap (whichever comes first), minus the crossfade.
// Never true while the browser doesn't know the duration of an uncapped
// clip — that clip hands over on `ended` instead.
function reachedCutoff(video, clip) {
  const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : null
  const cutoff = clip.capSeconds == null ? duration : Math.min(duration ?? Infinity, clip.capSeconds)
  return cutoff != null && video.currentTime >= cutoff - CROSSFADE_MS / 1000 - LEAD_SECONDS
}

/**
 * Rotates through every clip in `videos` (the site-wide HERO_VIDEOS by
 * default — pass a different list, e.g. TZ_HERO_VIDEOS, for a page with its
 * own dedicated footage), in order, crossfading from each clip to the next.
 *
 * Every playback gets its own <video> element, keyed by a fresh id, that
 * goes through exactly three roles: `next` (mounted hidden, preloading),
 * `current` (fades in on top and plays) and `previous` (stays fully opaque
 * underneath until the fade has finished), after which it's unmounted. So
 * outside a crossfade only two clips are ever loaded, and no element is
 * ever reused for a different clip — no `src` swaps, no reset frames
 * mid-fade, no stray events from whatever used to be in that element.
 *
 * Media events and timers read `layersRef` rather than render-time state,
 * so they always act on the latest layers.
 */
export function HeroVideoBackground({ videos = HERO_VIDEOS }) {
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  )
  const [layers, setLayers] = useState(() => initialLayers(videos.length))
  const [firstFrameShown, setFirstFrameShown] = useState(false)

  const layersRef = useRef(layers)
  const elementsRef = useRef(new Map())
  const nextIdRef = useRef(2)
  // The queued clip has buffered enough to start without stalling.
  const nextReadyRef = useRef(false)
  // The current clip is done (cutoff reached, ended, broken or stalled) and
  // hands over as soon as the queued clip is ready.
  const handOverRef = useRef(false)
  const failedClipsRef = useRef(new Set())
  const progressRef = useRef({ time: -1, at: 0 })
  const fadeTimerRef = useRef(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (event) => setReduceMotion(event.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  useEffect(() => () => clearTimeout(fadeTimerRef.current), [])

  const commit = (nextLayers) => {
    layersRef.current = nextLayers
    setLayers(nextLayers)
  }

  // A fresh layer for the first clip after `afterClip` that hasn't failed —
  // wrapping all the way round to `afterClip` itself if every other clip is
  // broken.
  const queueAfter = (afterClip) => {
    nextReadyRef.current = false
    for (let step = 1; step <= videos.length; step++) {
      const clip = (afterClip + step) % videos.length
      if (!failedClipsRef.current.has(clip)) return { id: nextIdRef.current++, clip }
    }
    return null
  }

  const finishCrossfade = () => {
    const { previous, current } = layersRef.current
    const outgoing = previous && elementsRef.current.get(previous.id)
    if (outgoing) {
      // Drop its buffer and decoder now rather than whenever the detached
      // element happens to be garbage-collected.
      outgoing.pause()
      outgoing.removeAttribute('src')
      outgoing.load()
    }
    commit({ previous: null, current, next: queueAfter(current.clip) })
  }

  const tryHandOver = () => {
    const { previous, current, next } = layersRef.current
    if (!handOverRef.current || previous || !next || !nextReadyRef.current) return
    handOverRef.current = false
    nextReadyRef.current = false
    progressRef.current = { time: -1, at: performance.now() }
    elementsRef.current.get(next.id)?.play().catch(() => {})
    // The incoming clip is buffered, so it can always be shown — even if the
    // very first clip never produced a frame.
    setFirstFrameShown(true)
    commit({ previous: current, current: next, next: null })
    fadeTimerRef.current = setTimeout(finishCrossfade, CROSSFADE_MS + 150)
  }

  const requestHandOver = (layer) => {
    if (layer.id !== layersRef.current.current?.id) return
    handOverRef.current = true
    tryHandOver()
  }

  const handleError = (layer) => {
    const { current, next } = layersRef.current
    if (layer.id === current?.id) {
      failedClipsRef.current.add(layer.clip)
      requestHandOver(layer)
    } else if (layer.id === next?.id) {
      failedClipsRef.current.add(layer.clip)
      commit({ ...layersRef.current, next: queueAfter(layer.clip) })
    }
  }

  // Start the first clip, then check on playback once a second. Media events
  // drive the normal hand-over; this catches what they can't: a clip that
  // stalled or never started, a queued clip that was ready before its
  // `canplay` listener was attached, and playback the browser paused on its
  // own (e.g. while the tab was in the background).
  useEffect(() => {
    if (reduceMotion) return
    const first = layersRef.current.current
    if (first) elementsRef.current.get(first.id)?.play().catch(() => {})

    const interval = setInterval(() => {
      const { current, next } = layersRef.current
      const video = current && elementsRef.current.get(current.id)
      const now = performance.now()
      if (!video || document.hidden) {
        progressRef.current = { time: -1, at: now }
        return
      }
      if (next && elementsRef.current.get(next.id)?.readyState >= HAVE_FUTURE_DATA) {
        nextReadyRef.current = true
      }
      if (video.paused && !video.ended) video.play().catch(() => {})
      if (video.currentTime !== progressRef.current.time) {
        progressRef.current = { time: video.currentTime, at: now }
      }
      handOverRef.current =
        video.ended ||
        failedClipsRef.current.has(current.clip) ||
        now - progressRef.current.at >= STALL_MS ||
        reachedCutoff(video, videos[current.clip])
      tryHandOver()
    }, 1000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, videos])

  if (reduceMotion || videos.length === 0) {
    return (
      <div className="absolute inset-0 bg-linear-to-br from-forest to-cocoa" aria-hidden="true" />
    )
  }

  const { previous, current, next } = layers

  return (
    <div className="absolute inset-0 overflow-hidden bg-cocoa" aria-hidden="true">
      {/* Ids only ever increase along previous → current → next, so this
          order is stable and React never has to move a playing <video>. */}
      {[previous, current, next].filter(Boolean).map((layer) => (
        <video
          key={layer.id}
          ref={(element) => {
            if (element) elementsRef.current.set(layer.id, element)
            else elementsRef.current.delete(layer.id)
          }}
          className={`absolute inset-0 size-full object-cover ${
            layer === current
              ? `z-[2] transition-opacity duration-[2000ms] ease-in-out ${
                  firstFrameShown ? 'opacity-100' : 'opacity-0'
                }`
              : layer === previous
                ? 'z-[1] opacity-100'
                : 'z-0 opacity-0'
          }`}
          src={videos[layer.clip].src}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            if (layer.id === layersRef.current.current?.id) setFirstFrameShown(true)
          }}
          onCanPlay={() => {
            if (layer.id !== layersRef.current.next?.id) return
            nextReadyRef.current = true
            tryHandOver()
          }}
          onTimeUpdate={(event) => {
            if (reachedCutoff(event.currentTarget, videos[layer.clip])) requestHandOver(layer)
          }}
          onEnded={() => requestHandOver(layer)}
          onError={() => handleError(layer)}
        />
      ))}
    </div>
  )
}
