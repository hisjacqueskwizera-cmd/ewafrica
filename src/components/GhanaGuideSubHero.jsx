/**
 * The shorter banner hero used on pages 2 and 3 of the Ghana Practical
 * Guide — page 1 keeps the full-viewport DestinationHero (it's the entry
 * point most visitors land on from the sub-nav or Ghana's own page), but a
 * second and third full-screen hero back to back inside the same flow
 * would be heavy. This is a compact photo strip instead, carrying the
 * "Page N of 3" context so it's clear which step of the guide this is.
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
        className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-32 sm:px-6 lg:px-8"
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
