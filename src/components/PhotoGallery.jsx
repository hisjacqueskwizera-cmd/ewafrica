import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { HashLink } from './HashLink.jsx'
import { MediaLightbox } from './MediaGallery.jsx'
import { Reveal } from './Reveal.jsx'

/**
 * A single captioned photo tile — image, bottom gradient, title + subtitle.
 * Shared by every destination page's "Gallery" section (see
 * PhotoGallerySection below) so the treatment stays identical across
 * countries: hover lift, zoom-on-hover image, dark gradient caption.
 * Clicking/tapping it opens the full-screen lightbox at this photo.
 */
export function GalleryTile({ src, alt, title, subtitle, className = '', onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
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

/**
 * Destination-page "Gallery" section — a heading/subheading pair plus a
 * photo layout, in one of three variants depending on how many distinct
 * photos are actually available for that country:
 *
 * - "mosaic" (5 photos): one large hero tile + a 2x2 grid of smaller
 *   tiles, e.g. Benin, Ghana, Tanzania, Zambia.
 * - "duo" (2 photos): a large tile beside one smaller tile, e.g. Rwanda.
 * - "single" (1 photo): one full-width landscape tile, for countries with
 *   only one usable photo in the project so far (Senegal, Gambia).
 *
 * Every photo (across the mosaic, its extraTiles row, or the duo/single
 * layouts) opens the same full-screen Lightbox on click/tap — Previous/
 * Next arrows on tablet/desktop, left/right swipe on touch, and arrow
 * keys — stepping through every photo in the section in on-page order.
 *
 * Pass `viewAllLink` (shape: { label, to }) when the country has a
 * dedicated full gallery page worth linking to, e.g. Rwanda's
 * /rwanda/gallery — omit it for countries without one yet.
 *
 * Pass `extraTiles` (mosaic only, 1 or 2 photos) for a country with more
 * genuinely distinct photos than the mosaic's fixed 5-tile layout can
 * hold — renders as one more row below the mosaic (full-width for a
 * single extra photo, side-by-side for two) rather than forcing a photo
 * out or stretching the mosaic itself. Its separator uses the same
 * hairline gap as the mosaic above it, so every gap in the section reads
 * as one consistent grid rather than two different layouts stacked.
 */
export function PhotoGallerySection({
  heading,
  subheading,
  tiles,
  variant = 'mosaic',
  viewAllLink,
  extraTiles,
  transparent = false,
}) {
  const allPhotos = variant === 'mosaic' ? [...tiles, ...(extraTiles ?? [])] : tiles
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const showNext = () => setLightboxIndex((i) => (i + 1) % allPhotos.length)
  const showPrev = () => setLightboxIndex((i) => (i - 1 + allPhotos.length) % allPhotos.length)

  return (
    <section
      id="gallery"
      className={`scroll-mt-[140px] py-14 sm:py-16 lg:py-20 ${transparent ? '' : 'bg-cream'}`}
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <Reveal once={false} className="flex items-center justify-center gap-4">
          <span
            className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
            aria-hidden="true"
          />
          <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">
            {heading}
          </h2>
          <span
            className="hidden h-px max-w-24 flex-1 border-t border-dashed border-copper/50 sm:block"
            aria-hidden="true"
          />
        </Reveal>
        {subheading && (
          <Reveal once={false} delay={80}>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
              {subheading}
            </p>
          </Reveal>
        )}
      </div>

      {variant === 'mosaic' && (
        <MosaicLayout tiles={tiles} onOpenAt={setLightboxIndex} />
      )}
      {variant === 'duo' && <DuoLayout tiles={tiles} onOpenAt={setLightboxIndex} />}
      {variant === 'single' && <SingleLayout tiles={tiles} onOpenAt={setLightboxIndex} />}

      {variant === 'mosaic' && extraTiles?.length > 0 && (
        <div className="mx-auto mt-px w-[96%] max-w-none sm:w-[92%] lg:w-[88%] xl:w-[85%]">
          <div className={`grid gap-px ${extraTiles.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {extraTiles.map((tile, index) => (
              <Reveal key={tile.src} once={false} delay={450 + index * 100} className="group">
                <GalleryTile
                  {...tile}
                  onOpen={() => setLightboxIndex(tiles.length + index)}
                  className="h-[220px] sm:h-[300px] lg:h-[380px]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {viewAllLink && (
        <Reveal once={false} delay={200} className="mt-8 text-center">
          <HashLink
            to={viewAllLink.to}
            className="inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {viewAllLink.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </HashLink>
        </Reveal>
      )}

      <MediaLightbox
        items={allPhotos.map((photo) => ({ ...photo, type: 'photo' }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={showNext}
        onPrev={showPrev}
      />
    </section>
  )
}

function MosaicLayout({ tiles, onOpenAt }) {
  const [hero, ...rest] = tiles
  const left = rest.slice(0, 2)
  const right = rest.slice(2, 4)

  return (
    <div className="mx-auto mt-10 w-[96%] max-w-none sm:w-[92%] lg:w-[88%] xl:w-[85%]">
      <div className="grid gap-px lg:grid-cols-[1.8fr_1fr_1fr]">
        <Reveal once={false} big className="group" from="left">
          <GalleryTile
            {...hero}
            onOpen={() => onOpenAt(0)}
            className="h-[380px] sm:h-[480px] lg:h-[820px]"
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-px lg:grid-cols-1">
          {left.map((photo, index) => (
            <Reveal key={photo.src} once={false} className="group h-full" delay={150 + index * 150}>
              <GalleryTile
                {...photo}
                onOpen={() => onOpenAt(1 + index)}
                className="h-[190px] sm:h-[240px] lg:h-[406px]"
              />
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-px lg:grid-cols-1">
          {right.map((photo, index) => (
            <Reveal key={photo.src} once={false} className="group h-full" delay={300 + index * 150}>
              <GalleryTile
                {...photo}
                onOpen={() => onOpenAt(3 + index)}
                className="h-[190px] sm:h-[240px] lg:h-[406px]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

function DuoLayout({ tiles, onOpenAt }) {
  const [hero, side] = tiles

  return (
    <div className="mx-auto mt-10 w-[96%] max-w-none sm:w-[92%] lg:w-[88%] xl:w-[80%]">
      <div className="grid gap-px sm:grid-cols-[1.6fr_1fr]">
        <Reveal once={false} big className="group" from="left">
          <GalleryTile {...hero} onOpen={() => onOpenAt(0)} className="h-[300px] sm:h-[420px] lg:h-[520px]" />
        </Reveal>
        <Reveal once={false} className="group" delay={150}>
          <GalleryTile
            {...side}
            onOpen={() => onOpenAt(1)}
            className="h-[220px] sm:h-[420px] lg:h-[520px]"
          />
        </Reveal>
      </div>
    </div>
  )
}

function SingleLayout({ tiles, onOpenAt }) {
  const [photo] = tiles

  return (
    <div className="mx-auto mt-10 w-[96%] max-w-none sm:w-[88%] lg:w-[75%] xl:w-[65%]">
      <Reveal once={false} big className="group">
        <GalleryTile
          {...photo}
          onOpen={() => onOpenAt(0)}
          className="h-[300px] sm:h-[420px] lg:h-[520px]"
        />
      </Reveal>
    </div>
  )
}
