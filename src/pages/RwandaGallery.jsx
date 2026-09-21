import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { DestinationHero } from '../components/DestinationHero.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { RwandaSubNav } from '../components/RwandaSubNav.jsx'

// Header is a fixed 84px bar (see Header.jsx); RwandaSubNav sticks directly
// under it (also 56px tall), and every stacked gallery section sticks under
// the sub-nav in turn — see the "stack" comment further down.
const HEADER_HEIGHT = 84
const SUBNAV_HEIGHT = 56
const STACK_TOP = HEADER_HEIGHT + SUBNAV_HEIGHT

// One flat list of every photo (not video) tile, in on-page order, so the
// full-screen Lightbox can step forward/back through them regardless of
// which row a photo happens to sit in.
const PHOTOS = [
  {
    src: '/Rwanda_Gallery/Lake_Kivu/IMG_5202_web.jpg',
    alt: "Aerial panorama of Lake Kivu's islands and green hills",
    title: 'Lake Kivu',
    subtitle: 'Stunning lake views, rolling green hills and peaceful lakeside towns.',
  },
  {
    src: '/Rwanda_Gallery/Nyungwe/IMG_5233_web.jpg',
    alt: 'Canopy walkway suspended above Nyungwe Forest National Park',
    title: 'Nyungwe National Park',
    subtitle: "Walk above the rainforest on one of Africa's most spectacular canopy walkways.",
  },
  {
    src: '/Rwanda_Gallery/Calture/IMG_4973_web.jpg',
    alt: 'Intore dancers performing a traditional Rwandan dance',
    title: 'Rwandan Culture',
    subtitle: 'Music, dance and traditions that inspire.',
  },
  {
    src: '/Rwanda_Gallery/Tea_Plantation/IMG_5086_web.jpg',
    alt: 'Rolling tea plantation hills at sunset in Rwanda',
    title: 'Tea Plantations',
    subtitle: "Lush green hills and some of the world's finest tea.",
  },
  {
    src: '/Rwanda_Gallery/Butaro/IMG_5203_web.jpg',
    alt: 'Volcano and lake view from the Butaro highlands in northern Rwanda',
    title: 'Butaro Highlands',
    subtitle: 'Cool mountains, fresh air and breathtaking views in northern Rwanda.',
  },
  {
    src: '/Rwanda_Gallery/Akagera/IMG_5239_web.jpg',
    alt: 'Savannah, lakes and wetlands of Akagera National Park',
    title: 'Akagera National Park',
    subtitle: "Wide savannah landscapes, lakes and wetlands in Rwanda's eastern wilderness.",
  },
  {
    src: '/Rwanda_Gallery/Akagera/IMG_5300_web.jpg',
    alt: 'Two rhinos grazing beside a lake in Akagera National Park',
    title: 'Akagera National Park',
    subtitle: 'Rhinos, brought back from the brink of disappearance.',
  },
  {
    src: '/Rwanda_Gallery/Akagera/IMG_5301_web.jpg',
    alt: 'Giraffes among acacia trees in Akagera National Park',
    title: 'Akagera National Park',
    subtitle: 'Giraffes roaming the savannah hills.',
  },
]

/**
 * Pins its children under the header + sub-nav as the user scrolls, so the
 * next stack section slides up and covers it — a "stacking cards" scroll
 * effect. Requires an opaque background (passed via `className`) so the
 * covering section fully hides whatever is stacked beneath it.
 *
 * Each section needs its OWN containing block for `sticky` to release at
 * the right moment — sharing one flex/grid parent across all sections
 * would make them all share a single containing block and never let go
 * until the very end of the whole gallery. The outer `relative` div here
 * is that per-section containing block; its bottom padding is the extra
 * scroll "runway" the section stays pinned for before the next one
 * arrives and covers it.
 */
function StackSection({ children, className = '' }) {
  return (
    <div className="relative pb-14 sm:pb-20 lg:pb-24">
      <div className={`sticky ${className}`} style={{ top: STACK_TOP }}>
        {children}
      </div>
    </div>
  )
}

function VideoTile({ src, poster, alt, title, subtitle, className = '' }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <div
      className={`group relative w-full overflow-hidden border border-cocoa/10 bg-cocoa shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        className="size-full object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span
          className={`grid size-16 place-items-center rounded-full border-2 border-white/80 bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 ${
            playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          {playing ? (
            <Pause className="size-6" aria-hidden="true" />
          ) : (
            <Play className="ml-1 size-7" aria-hidden="true" />
          )}
        </span>
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="font-display text-base font-bold text-white drop-shadow-sm sm:text-lg lg:text-xl">
          {title}
        </h3>
        <p className="mt-1 text-[11px] leading-snug text-white/85 sm:text-xs lg:text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

function PhotoTile({ photo, className = '', onExpand }) {
  const { src, alt, title, subtitle } = photo
  return (
    <button
      type="button"
      onClick={() => onExpand?.(photo)}
      aria-label={`View ${title} full screen`}
      className={`group relative block w-full cursor-zoom-in overflow-hidden border border-cocoa/10 bg-[#f4efe8] shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
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

// Swipe distance (px) that counts as an intentional slide rather than a tap
// or scroll wobble.
const SWIPE_THRESHOLD = 50

/**
 * Full-screen lightbox for a clicked PhotoTile — steps through every photo
 * in the gallery (see PHOTOS) via on-screen Previous/Next arrows (desktop),
 * left/right swipes (touch devices), or the arrow keys. Plain `fixed`
 * overlay (not a portal) works fine here since it's rendered at the top
 * level of RwandaGallery, outside every Reveal wrapper; a `transform` on
 * an ancestor would otherwise re-anchor a `fixed` child to that ancestor
 * instead of the viewport.
 */
function Lightbox({ index, onClose, onNext, onPrev }) {
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
  const image = PHOTOS[index]

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
        aria-label="Previous image"
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
        aria-label="Next image"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 place-items-center rounded-full border border-white/30 p-2.5 text-white transition-colors hover:bg-white/10 sm:right-6 sm:grid"
      >
        <ChevronRight className="size-6" aria-hidden="true" />
      </button>

      <img
        src={image.src}
        alt={image.alt}
        onClick={(event) => event.stopPropagation()}
        className="max-h-full max-w-full object-contain"
      />
      <div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center"
        aria-hidden="true"
      >
        <p className="font-display text-lg font-bold text-white sm:text-xl">{image.title}</p>
        <p className="mt-1 text-xs text-white/80 sm:text-sm">{image.subtitle}</p>
        <p className="mt-2 text-[11px] uppercase tracking-wider text-white/50">
          {index + 1} / {PHOTOS.length}
        </p>
      </div>
    </div>
  )
}

// Decorative leaf-frame vignette applied behind every Rwanda page — the
// PNG's transparent center lets the page's own background color show
// through; only its corners carry any artwork.
const RWANDA_PAGE_BACKGROUND = {
  backgroundImage: 'url(/Pictures/Background/Rwanda_Background.PNG)',
  backgroundPosition: 'top center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
}

export function RwandaGallery() {
  useEffect(() => {
    document.title = 'Rwanda Photo & Video Gallery | East-West Africa Link'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const [lightboxIndex, setLightboxIndex] = useState(null)
  const showNext = () => setLightboxIndex((i) => (i + 1) % PHOTOS.length)
  const showPrev = () => setLightboxIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)
  const openAt = (photo) => setLightboxIndex(PHOTOS.indexOf(photo))

  return (
    <div className="bg-background min-h-screen" style={RWANDA_PAGE_BACKGROUND}>
      {/* Hero — the same full-viewport hero every destination page shares;
          the global Header goes transparent on top of it (see
          TRANSPARENT_HERO_ROUTES in Header.jsx). */}
      <DestinationHero
        heading="Explore Rwanda"
        description="A closer look at the landscapes, wildlife and culture that make Rwanda unforgettable."
        backgroundImage="/Pictures/Background/GalleryHero_Section.JPG"
        backgroundImageAlt="Aerial view of terraced green hills in Rwanda"
        overlayClassName="bg-black/35"
      />

      {/* Sub-nav — shared across every Rwanda page (Overview, Gallery,
          Practical Guide) so it stays visible and consistent as visitors
          move between them. Sticks directly under the fixed 84px header. */}
      <RwandaSubNav />

      {/* Page header — id/scroll-mt pair is the sub-nav's "Photo & Video
          Gallery" tab target, so clicking it lands just under the hero
          instead of at the very top of it. */}
      <section id="gallery-overview" className="scroll-mt-[140px] bg-cocoa py-10 sm:py-12">
        <div className="mx-auto flex w-[95%] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal once={false}>
            <h1 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
              Rwanda Photo &amp; Video Gallery
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              A glimpse into Rwanda&rsquo;s incredible landscapes, wildlife, and culture.
            </p>
          </Reveal>
          <Reveal once={false} delay={100} className="shrink-0 text-left sm:text-right">
            <p className="font-display text-2xl italic text-gold">Rwanda</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">
              A Remarkable Journey Awaits
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery — each block below is pinned in turn (StackSection) so it
          scrolls up, sticks under the sub-nav, and is then covered by the
          next block sliding over it, all the way through the page. */}
      <main>
        <div className="mx-auto w-[95%] py-3">
          {/* 1. Gorilla video — full-width, own native 16:9 aspect ratio
              (no cropping), autoplaying muted and looping. */}
          <StackSection className="bg-background">
            <Reveal once={false} big>
              <VideoTile
                src="/Rwanda_Gallery/Gorilla/gorilla.mp4"
                poster="/Rwanda_Gallery/Gorilla/gorilla_poster.jpg"
                alt="Mountain gorilla walking near a pool of water in Rwanda"
                title="Volcanoes National Park"
                subtitle="Home to Rwanda's mountain gorillas."
                className="aspect-video"
              />
            </Reveal>
          </StackSection>

          {/* 2. Kigali City — full-width video, shown at its native 16:9
              aspect ratio so the whole frame is visible. */}
          <StackSection className="bg-background">
            <Reveal once={false}>
              <VideoTile
                src="/Rwanda_Gallery/Kigali City/kigali.mp4"
                poster="/Rwanda_Gallery/Kigali City/kigali_poster.jpg"
                alt="Aerial view of Kigali city skyline at dusk"
                title="Kigali"
                subtitle="A vibrant, modern capital with a warm welcome and a bright future."
                className="aspect-video"
              />
            </Reveal>
          </StackSection>

          {/* 3. Lake Kivu / Nyungwe */}
          <StackSection className="bg-background">
            <div className="grid gap-3 sm:grid-cols-2">
              <Reveal once={false} delay={150}>
                <PhotoTile
                  photo={PHOTOS[0]}
                  onExpand={openAt}
                  className="h-[260px] sm:h-[320px] lg:h-[380px]"
                />
              </Reveal>
              <Reveal once={false} delay={250}>
                <PhotoTile
                  photo={PHOTOS[1]}
                  onExpand={openAt}
                  className="h-[260px] sm:h-[320px] lg:h-[380px]"
                />
              </Reveal>
            </div>
          </StackSection>

          {/* 4. Rwandan Culture — full width, right under Lake Kivu /
              Nyungwe, and bigger than the paired rows around it. */}
          <StackSection className="bg-background">
            <Reveal once={false}>
              <PhotoTile photo={PHOTOS[2]} onExpand={openAt} className="aspect-[3/2]" />
            </Reveal>
          </StackSection>

          {/* 5. Tea Plantations / Butaro Highlands (swapped with Akagera,
              which now runs full-width below). */}
          <StackSection className="bg-background">
            <div className="grid gap-3 sm:grid-cols-2">
              <Reveal once={false} delay={150}>
                <PhotoTile
                  photo={PHOTOS[3]}
                  onExpand={openAt}
                  className="h-[260px] sm:h-[320px] lg:h-[380px]"
                />
              </Reveal>
              <Reveal once={false} delay={250}>
                <PhotoTile
                  photo={PHOTOS[4]}
                  onExpand={openAt}
                  className="h-[260px] sm:h-[320px] lg:h-[380px]"
                />
              </Reveal>
            </div>
          </StackSection>

          {/* 6. Akagera National Park — full width (swapped with Butaro,
              which now runs in the row above). */}
          <StackSection className="bg-background">
            <Reveal once={false}>
              <PhotoTile
                photo={PHOTOS[5]}
                onExpand={openAt}
                className="h-[300px] sm:h-[380px] lg:h-[460px]"
              />
            </Reveal>
          </StackSection>

          {/* 7. Akagera National Park — two more animal sightings. */}
          <StackSection className="bg-background">
            <div className="grid gap-3 sm:grid-cols-2">
              <Reveal once={false} delay={150}>
                <PhotoTile
                  photo={PHOTOS[6]}
                  onExpand={openAt}
                  className="h-[260px] sm:h-[320px] lg:h-[380px]"
                />
              </Reveal>
              <Reveal once={false} delay={250}>
                <PhotoTile
                  photo={PHOTOS[7]}
                  onExpand={openAt}
                  className="h-[260px] sm:h-[320px] lg:h-[380px]"
                />
              </Reveal>
            </div>
          </StackSection>
        </div>
      </main>

      {/* Closing banner */}
      <section className="relative z-10 border-t border-border/60 bg-cream py-8">
        <div className="mx-auto flex w-[95%] flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-2xl italic text-primary">Rwanda</p>
            <p className="max-w-md text-xs font-semibold uppercase tracking-[0.14em] text-copper sm:text-[13px]">
              Where misty hills, ancient wildlife, and serene waters meet timeless culture.
            </p>
          </div>
          <HashLink
            to="/rwanda"
            className="inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Explore Rwanda
            <ArrowRight className="size-4" aria-hidden="true" />
          </HashLink>
        </div>
      </section>

      <Lightbox index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNext={showNext} onPrev={showPrev} />
    </div>
  )
}
