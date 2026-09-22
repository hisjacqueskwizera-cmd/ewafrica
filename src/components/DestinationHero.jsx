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
 * The destination pages' shared hero — full-viewport height, the photo or
 * video backdrop shown at full strength (no color tint), a large serif
 * heading with an italicized accent word, and one description paragraph,
 * left-aligned. This is About Us's
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
 * No color wash over the backdrop by default — the photo or video shows at
 * full strength; heading legibility comes from the text shadow instead.
 * Pass `mist` for the rare backdrop this isn't enough for (a bright/white
 * photo like Ghana's Cape Coast Castle hero) — it adds a soft dark fade
 * behind the header (top of the hero) and behind the heading/description
 * (left side, where they sit) without darkening the rest of the photo.
 */
export function DestinationHero({
  heading,
  headingClassName,
  description,
  backgroundImage,
  backgroundImageAlt,
  backgroundVideos,
  mist = false,
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
      {mist && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-56 bg-gradient-to-b from-black/55 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-full bg-gradient-to-r from-black/55 via-black/25 to-transparent sm:w-3/4 lg:w-2/3"
            aria-hidden="true"
          />
        </>
      )}
      <div
        className="relative z-[4] w-full max-w-5xl"
        style={{ textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}
      >
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
