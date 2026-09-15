import { useEffect, useRef, useState } from 'react'

// Keep in sync with --animate-slide-fade-in / --animate-slide-fade-out in
// index.css.
const FADE_MS = 2000
// How long each slide stays fully visible between crossfades.
const HOLD_MS = 4000

// Start downloading an upcoming slide as soon as the one before it appears,
// so it's normally already cached by the time its crossfade is due.
function preload(src) {
  const image = new Image()
  image.src = src
}

/**
 * A background slideshow: shows `images` one at a time in order, crossfading
 * each into the next and looping back to the first after the last.
 *
 * Every change is a full crossfade — the incoming slide fades in on top while
 * the outgoing one fades out underneath it, and the outgoing slide is only
 * removed once it has faded out completely. The first slide fades in too, as
 * soon as it has loaded.
 *
 * No slide can pop in part-way through a fade: the next slide is first
 * mounted invisibly as `incoming`, and the crossfade only starts once that
 * exact <img> element has loaded and decoded its image. Cycling — and with
 * it, downloading upcoming slides — only runs while the slideshow is on (or
 * about to come on) screen.
 */
export function ImageSlideshow({ images, className = '' }) {
  const rootRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [current, setCurrent] = useState(0)
  const [previous, setPrevious] = useState(null)
  const [incoming, setIncoming] = useState(null)
  const incomingRef = useRef(null)
  const [firstLoaded, setFirstLoaded] = useState(false)

  const queueIncoming = (index) => {
    incomingRef.current = index
    setIncoming(index)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '200px',
    })
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || images.length < 2) return
    const next = (current + 1) % images.length
    preload(images[next])
    const timer = setTimeout(() => queueIncoming(next), FADE_MS + HOLD_MS)
    return () => clearTimeout(timer)
  }, [inView, current, images])

  // Remove the outgoing slide a moment after its fade-out has finished (its
  // animation holds it at opacity 0 until then).
  useEffect(() => {
    if (previous == null) return
    const timer = setTimeout(() => setPrevious(null), FADE_MS + 100)
    return () => clearTimeout(timer)
  }, [previous])

  const handleIncomingLoad = (index, image) => {
    image
      .decode()
      .catch(() => {})
      .then(() => {
        if (incomingRef.current !== index) return
        incomingRef.current = null
        setIncoming(null)
        setPrevious(current)
        setCurrent(index)
      })
  }

  // A slide that fails to load is skipped rather than faded in as a blank.
  const handleIncomingError = (index) => {
    const after = (index + 1) % images.length
    if (after === current) {
      incomingRef.current = null
      setIncoming(null)
    } else {
      queueIncoming(after)
    }
  }

  const imageClass = 'absolute inset-0 size-full object-cover'

  return (
    <div ref={rootRef} className={`absolute inset-0 bg-cocoa ${className}`} aria-hidden="true">
      {previous != null && (
        <img
          key={previous}
          src={images[previous]}
          alt=""
          className={`${imageClass} animate-slide-fade-out`}
        />
      )}
      {/* Keyed by slide, so each element keeps its image as it moves from
          incoming → current → previous, and switching its class is what
          starts each fade. */}
      <img
        key={current}
        src={images[current]}
        alt=""
        loading="lazy"
        onLoad={() => setFirstLoaded(true)}
        className={`${imageClass} ${firstLoaded ? 'animate-slide-fade-in' : 'opacity-0'}`}
      />
      {incoming != null && (
        <img
          key={incoming}
          src={images[incoming]}
          alt=""
          onLoad={(event) => handleIncomingLoad(incoming, event.currentTarget)}
          onError={() => handleIncomingError(incoming)}
          className={`${imageClass} opacity-0`}
        />
      )}
    </div>
  )
}
