import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

// Swipe distance (px) that counts as an intentional slide rather than a
// tap or scroll wobble.
const SWIPE_THRESHOLD = 50

/**
 * A single gallery tile — photo or video (`item.type`), with the same
 * caption treatment either way. Videos autoplay muted/looped inline as a
 * preview; clicking (or tapping) ANY tile — photo or video — opens the
 * full-screen Lightbox at that item, matching `onOpen`'s index.
 */
export function MediaTile({ item, className = '', onOpen }) {
  const { type, src, poster, alt, title, subtitle } = item

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${title} full screen`}
      className={`group relative block w-full cursor-zoom-in overflow-hidden border border-cocoa/10 bg-[#f4efe8] shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      {type === 'video' ? (
        <video
          src={src}
          poster={poster}
          aria-label={alt}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className="size-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      {type === 'video' && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="grid size-14 place-items-center rounded-full border-2 border-white/80 bg-white/15 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 size-6" aria-hidden="true" />
          </span>
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-5">
        <h3 className="font-display text-base font-bold text-white drop-shadow-sm sm:text-lg lg:text-xl">
          {title}
        </h3>
        <p className="mt-1 text-[11px] leading-snug text-white/85 sm:text-xs lg:text-sm">
          {subtitle}
        </p>
      </div>
    </button>
  )
}

/**
 * Full-screen viewer for a `MediaTile` grid — steps through every item
 * (photo AND video alike) via on-screen Previous/Next arrows (desktop),
 * left/right swipes (touch devices), or the arrow keys. A video plays
 * with its own controls once opened; photos just fill the frame.
 *
 * Plain `fixed` overlay (not a portal) — safe as long as it's rendered at
 * the top level of the page, outside any ancestor with a `transform`
 * (which would re-anchor a `fixed` child to that ancestor instead of the
 * viewport — `<Reveal>` wrappers are the usual culprit).
 */
export function MediaLightbox({ items, index, onClose, onNext, onPrev }) {
  const touchStartX = useRef(null)

  useEffect(() => {
    if (index === null) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrev()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [index, onClose, onNext, onPrev])

  if (index === null) return null
  const item = items[index]

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return
    const deltaX = event.changedTouches[0].clientX - touchStartX.current
    if (deltaX > SWIPE_THRESHOLD) onPrev()
    else if (deltaX < -SWIPE_THRESHOLD) onNext()
    touchStartX.current = null
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 sm:p-8"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close full-screen view"
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      {/* Previous/Next — desktop-only; touch devices use the swipe
          gesture instead (see handleTouchStart/handleTouchEnd above). */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onPrev()
        }}
        aria-label="Previous"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full border border-white/30 p-2.5 text-white transition-colors hover:bg-white/10 sm:left-6 sm:grid"
      >
        <ChevronLeft className="size-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
        aria-label="Next"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full border border-white/30 p-2.5 text-white transition-colors hover:bg-white/10 sm:right-6 sm:grid"
      >
        <ChevronRight className="size-6" aria-hidden="true" />
      </button>

      {item.type === 'video' ? (
        <video
          key={item.src}
          src={item.src}
          poster={item.poster}
          aria-label={item.alt}
          autoPlay
          loop
          controls
          playsInline
          onClick={(event) => event.stopPropagation()}
          className="max-h-[85vh] max-w-full object-contain"
        />
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          onClick={(event) => event.stopPropagation()}
          className="max-h-full max-w-full object-contain"
        />
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center"
        aria-hidden="true"
      >
        <p className="font-display text-lg font-bold text-white sm:text-xl">{item.title}</p>
        <p className="mt-1 text-xs text-white/80 sm:text-sm">{item.subtitle}</p>
        <p className="mt-2 text-[11px] uppercase tracking-wider text-white/50">
          {index + 1} / {items.length}
        </p>
      </div>
    </div>
  )
}
