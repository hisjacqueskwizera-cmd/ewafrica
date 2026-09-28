/**
 * The shorter banner hero used on pages 2 and 3 of the Ghana Practical
 * Guide — page 1 keeps the full-viewport DestinationHero (it's the entry
 * point most visitors land on from the sub-nav or Ghana's own page), but a
 * second and third full-screen hero back to back inside the same flow
 * would be heavy. This is a compact photo strip instead, carrying the
 * "Page N of 3" context so it's clear which step of the guide this is.
 *
 * Carries the same soft black fade as Ghana's own hero (DestinationHero's
 * `mist`): dark on the left behind the text, easing out to the full photo
 * on the right.
 */
export function GhanaGuideSubHero({ page, heading, tagline, image, imageAlt }) {
  return (
    <section className="relative isolate flex min-h-[360px] items-end overflow-hidden text-primary-foreground sm:min-h-[420px]">
      <img
        src={image}
        alt={imageAlt ?? ''}
        loading="eager"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-full bg-gradient-to-r from-black/50 via-black/50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full bg-gradient-to-r from-black/50 via-black/50 to-transparent sm:w-[72%] lg:w-[65%]"
        aria-hidden="true"
      />
      <div
        className="relative z-[4] mx-auto w-full max-w-7xl px-4 pb-10 pt-32 sm:px-6 lg:px-8"
        style={{ textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Ghana Practical Guide · Page {page} of 3
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {heading}
        </h1>
        {tagline && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            {tagline}
          </p>
        )}
      </div>
    </section>
  )
}
