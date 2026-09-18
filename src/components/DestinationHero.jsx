import { HeroVideoBackground } from './HeroVideoBackground.jsx'
import { Reveal } from './Reveal.jsx'

// Same display-type scale as About Us's hero heading.
const HEADING =
  'font-display text-[3rem] font-normal leading-[1.1] text-balance text-white sm:text-[4rem] lg:text-[5.375rem]'

// Italicizes the last word — the same roman/italic pairing About Us's
// AccentHeading uses throughout its display type (e.g. "Our Mission",
// "Who We Are").
function AccentHeading({ text }) {
  const split = text.lastIndexOf(' ')
  if (split === -1) return <em>{text}</em>
  return (
    <>
      {text.slice(0, split)} <em>{text.slice(split + 1)}</em>
    </>
  )
}

/**
 * The destination pages' shared hero — full-viewport height, a flat cocoa
 * tint over the backdrop, a large serif heading with an italicized accent
 * word, and one description paragraph, left-aligned. This is About Us's
 * own hero section (src/pages/AboutUs.jsx) lifted out so every
 * destination page can share it exactly, rather than each page's earlier
 * badge/tagline/CTA hero grammar (PageIntro's, or each bespoke page's own
 * variant).
 *
 * Pass `backgroundImage` (+ `backgroundImageAlt`) for a static photo, or
 * `backgroundVideos` (HERO_VIDEOS-shaped) to rotate a page's own dedicated
 * clips the way About Us rotates the site-wide reel — Tanzania is the
 * only destination with any of its own footage.
 *
 * `overlay` (default `true`) tints the backdrop so white heading type stays
 * readable. Pass `false` to show the photo at full strength, or
 * `overlayClassName` to replace the default cocoa wash (Zambia uses a
 * neutral black one so the falls photo isn't recast chocolate).
 */
export function DestinationHero({
  heading,
  headingClassName,
  description,
  backgroundImage,
  backgroundImageAlt,
  backgroundVideos,
  overlay = true,
  overlayClassName = 'bg-cocoa/45',
}) {
  return (
    <section className="relative isolate flex h-svh min-h-[600px] items-center overflow-hidden px-10 text-left text-primary-foreground lg:px-16">
      {backgroundImage ? (
        <img
          src={backgroundImage}
          alt={backgroundImageAlt ?? ''}
          aria-hidden={!backgroundImageAlt}
          loading="eager"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <HeroVideoBackground videos={backgroundVideos} />
      )}
      {overlay && (
        <div className={`absolute inset-0 z-[3] ${overlayClassName}`} aria-hidden="true" />
      )}
      <div className="relative z-[4] w-full max-w-5xl">
        <Reveal delay={150} blur>
          <div className="mt-9 max-w-3xl">
            <h1 className={headingClassName ?? HEADING}>
              <AccentHeading text={heading} />
            </h1>
            <p className="mt-6 max-w-[640px] text-base leading-[1.7] text-primary-foreground/90 md:text-lg">
              {description}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
