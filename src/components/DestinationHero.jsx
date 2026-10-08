import { ArrowRight } from 'lucide-react'
import { HashLink } from './HashLink.jsx'
import { HeroVideoBackground } from './HeroVideoBackground.jsx'
import { Reveal } from './Reveal.jsx'
import { useFullBleedHero } from './heroPresence.js'

const HEADING =
  'max-w-[42rem] font-display text-[2.75rem] font-semibold leading-[1.04] text-balance text-primary-foreground sm:text-[3.25rem] lg:text-[3.5rem]'

// Named accent phrases occupy their own line; unnamed last words stay inline.
export function AccentHeading({ text, accent }) {
  if (accent) {
    return (
      <>
        {text} <em className="block font-medium text-hero-accent">{accent}</em>
      </>
    )
  }
  const split = text.lastIndexOf(' ')
  if (split === -1) return <em className="font-medium text-hero-accent">{text}</em>
  return (
    <>
      {text.slice(0, split)} <em className="font-medium text-hero-accent">{text.slice(split + 1)}</em>
    </>
  )
}

export function Haze({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

export function HeroBadge({ children }) {
  return (
    <span className="hero-label-pill">
      {children}
    </span>
  )
}

/**
 * The site's one hero design, shared by every full-screen hero — home, the
 * country pages, the service pages, About, Contact and the rest (PageIntro
 * is a thin adapter onto this). Every page gets the same layout and only
 * its content and backdrop change:
 *
 * - The backdrop — a photo (`backgroundImage` + `backgroundImageAlt`) or
 *   rotating footage (`backgroundVideos`, HERO_VIDEOS-shaped; the site-wide
 *   reel when neither is given) — shown at full strength, edge to edge.
 * - Copy on the left: an optional `eyebrow` (a pill such as HeroBadge, or a
 *   country's flag and name), the `heading` — its accent in italic copper,
 *   `headingAccent` or else the last word — on its own soft black haze,
 *   then the paragraph (optional bold `tagline` phrases over the
 *   `description`) on a separate haze.
 * - Optional `trustItems` (icon + title + text, icons already resolved to
 *   components) and up to two buttons (`primaryCta`, `secondaryCta`).
 *
 * The fixed header sits transparent over it on a dark top gradient until
 * the visitor scrolls (see useFullBleedHero and Header.jsx).
 */
export function DestinationHero({
  id,
  eyebrow,
  heading,
  headingAccent,
  headingClassName,
  tagline,
  description,
  trustItems,
  primaryCta,
  secondaryCta,
  backgroundImage,
  backgroundImageAlt,
  backgroundVideos,
}) {
  useFullBleedHero()

  return (
    <section
      id={id}
      className="relative isolate flex min-h-[min(100svh,760px)] items-center overflow-hidden px-6 pb-12 pt-28 text-left text-primary-foreground sm:px-10 lg:px-16"
    >
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
      <div className="hero-scrim pointer-events-none absolute inset-0 z-[3]" aria-hidden="true" />

      <div className="hero-copy relative z-[4] w-full min-w-0 max-w-5xl">
        <Reveal delay={150} blur>
          <div className="max-w-3xl">
            {eyebrow && <div className="mb-3">{eyebrow}</div>}

            <Haze className="w-fit">
              <h1 className={headingClassName ?? HEADING}>
                <AccentHeading text={heading} accent={headingAccent} />
              </h1>
            </Haze>

            {(tagline || description) && (
              <Haze className="mt-5 max-w-[31rem]">
                {tagline && (
                  <p className="mb-3 flex flex-wrap items-center gap-2 text-base font-bold text-primary-foreground">
                    {tagline.map((word, i) => (
                      <span key={word} className="flex items-center gap-2">
                        {i > 0 && (
                          <span className="text-gold" aria-hidden="true">
                            •
                          </span>
                        )}
                        {word}
                      </span>
                    ))}
                  </p>
                )}
                {description && (
                  <p className="text-sm leading-[1.5] text-primary-foreground md:text-base">
                    {description}
                  </p>
                )}
              </Haze>
            )}
          </div>
        </Reveal>

        {trustItems && (
          <Reveal delay={350} blur className="mt-9">
            <Haze className="w-fit">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-5 sm:gap-x-0">
                {trustItems.map((item, i) => (
                  <div
                    key={item.title}
                    className={`flex items-center gap-3 ${
                      i > 0 ? 'sm:ml-6 sm:border-l-2 sm:border-gold/70 sm:pl-6' : ''
                    }`}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-gold text-gold">
                      <item.icon className="size-5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-primary-foreground">{item.title}</p>
                      <p className="text-xs text-primary-foreground/75 break-words">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Haze>
          </Reveal>
        )}

        {(primaryCta || secondaryCta) && (
          <Reveal delay={450} blur>
            <div className="mt-5 flex flex-wrap gap-3">
              {primaryCta && (
                <HashLink to={primaryCta.to} className="btn-copper">
                  {primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </HashLink>
              )}
              {secondaryCta && (
                <HashLink
                  to={secondaryCta.to}
                  className="btn-outline-light uppercase"
                >
                  {secondaryCta.label}
                </HashLink>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
