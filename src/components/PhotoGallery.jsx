import { Reveal } from './Reveal.jsx'

/**
 * A single captioned photo tile — image, bottom gradient, title + subtitle.
 * Shared by every destination page's "Gallery" section (see
 * PhotoGallerySection below) so the treatment stays identical across
 * countries: hover lift, zoom-on-hover image, dark gradient caption.
 */
export function GalleryTile({ src, alt, title, subtitle, className = '' }) {
  return (
    <div
      className={`relative w-full overflow-hidden border border-cocoa/10 bg-[#f4efe8] shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift ${className}`}
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
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
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

/**
 * Destination-page "Gallery" section — a heading/subheading pair plus a
 * photo layout, in one of three variants depending on how many distinct
 * photos are actually available for that country:
 *
 * - "mosaic" (5 photos): one large hero tile + a 2x2 grid of smaller
 *   tiles, e.g. Benin, Ghana, Tanzania, Zambia.
 * - "duo" (2 photos): a large tile beside one smaller tile, e.g. Rwanda.
 * - "single" (1 photo): one full-width landscape tile, for countries with
 *   only one usable photo in the project so far (Malawi, Senegal, Gambia,
 *   Uganda).
 */
export function PhotoGallerySection({ heading, subheading, tiles, variant = 'mosaic' }) {
  return (
    <section className="bg-cream py-14 sm:py-16 lg:py-20">
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

      {variant === 'mosaic' && <MosaicLayout tiles={tiles} />}
      {variant === 'duo' && <DuoLayout tiles={tiles} />}
      {variant === 'single' && <SingleLayout tiles={tiles} />}
    </section>
  )
}

function MosaicLayout({ tiles }) {
  const [hero, ...rest] = tiles
  const left = rest.slice(0, 2)
  const right = rest.slice(2, 4)

  return (
    <div className="mx-auto mt-10 w-[96%] max-w-none sm:w-[92%] lg:w-[88%] xl:w-[85%]">
      <div className="grid gap-px lg:grid-cols-[1.8fr_1fr_1fr]">
        <Reveal once={false} big className="group" from="left">
          <GalleryTile {...hero} className="h-[380px] sm:h-[480px] lg:h-[820px]" />
        </Reveal>

        <div className="grid grid-cols-2 gap-px lg:grid-cols-1">
          {left.map((photo, index) => (
            <Reveal key={photo.src} once={false} className="group h-full" delay={150 + index * 150}>
              <GalleryTile {...photo} className="h-[190px] sm:h-[240px] lg:h-[406px]" />
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-px lg:grid-cols-1">
          {right.map((photo, index) => (
            <Reveal key={photo.src} once={false} className="group h-full" delay={300 + index * 150}>
              <GalleryTile {...photo} className="h-[190px] sm:h-[240px] lg:h-[406px]" />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

function DuoLayout({ tiles }) {
  const [hero, side] = tiles

  return (
    <div className="mx-auto mt-10 w-[96%] max-w-none sm:w-[92%] lg:w-[88%] xl:w-[80%]">
      <div className="grid gap-px sm:grid-cols-[1.6fr_1fr]">
        <Reveal once={false} big className="group" from="left">
          <GalleryTile {...hero} className="h-[300px] sm:h-[420px] lg:h-[520px]" />
        </Reveal>
        <Reveal once={false} className="group" delay={150}>
          <GalleryTile {...side} className="h-[220px] sm:h-[420px] lg:h-[520px]" />
        </Reveal>
      </div>
    </div>
  )
}

function SingleLayout({ tiles }) {
  const [photo] = tiles

  return (
    <div className="mx-auto mt-10 w-[96%] max-w-none sm:w-[88%] lg:w-[75%] xl:w-[65%]">
      <Reveal once={false} big className="group">
        <GalleryTile {...photo} className="h-[300px] sm:h-[420px] lg:h-[520px]" />
      </Reveal>
    </div>
  )
}
