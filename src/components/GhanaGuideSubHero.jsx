import { AccentHeading, Haze, HeroBadge } from './DestinationHero.jsx'
import { useFullBleedHero } from './heroPresence.js'

/**
 * The shorter banner hero on each page of the Ghana Practical Guide — a
 * full-screen hero on every page of one flow would be heavy, so this is a
 * compact photo strip instead, carrying the "Page N of 3" context so it's
 * clear which step of the guide this is.
 *
 * Same design as the site's full-screen heroes (DestinationHero), just
 * shorter: the page label in the site's hero pill, the heading (accent
 * word in italic copper) and the tagline each on their own soft black
 * haze, and the header transparent over its dark top gradient.
 */
export function GhanaGuideSubHero({ page, heading, tagline, image, imageAlt }) {
  useFullBleedHero()

  return (
    <section className="relative isolate flex min-h-[380px] items-end overflow-hidden text-primary-foreground sm:min-h-[440px]">
      <img
        src={image}
        alt={imageAlt ?? ''}
        loading="eager"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="hero-scrim pointer-events-none absolute inset-0 z-[3]" aria-hidden="true" />
      {/* Same side margins as DestinationHero, so the copy lines up with
          every full-screen hero's. */}
      <div className="hero-copy relative z-[4] w-full px-6 pb-12 pt-32 sm:px-10 lg:px-16">
        <HeroBadge>Ghana Practical Guide · Page {page} of 3</HeroBadge>
        <Haze className="mt-6 w-fit">
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-primary-foreground sm:text-5xl lg:text-6xl">
            <AccentHeading text={heading} />
          </h1>
        </Haze>
        {tagline && (
          <Haze className="mt-6 max-w-xl">
            <p className="text-base leading-relaxed text-primary-foreground">{tagline}</p>
          </Haze>
        )}
      </div>
    </section>
  )
}
