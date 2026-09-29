import { ArrowRight } from 'lucide-react'
import { HashLink } from './HashLink.jsx'
import { HeroVideoBackground } from './HeroVideoBackground.jsx'
import { Reveal } from './Reveal.jsx'
import { useFullBleedHero } from './heroPresence.js'

// Every hero's heading: large editorial serif, capped in width so longer
// titles break onto a second line the way the reference design does
// ("Travel & / Relocation in Ghana").
const HEADING =
  'max-w-[40rem] font-display text-[3rem] font-normal leading-[1.1] text-balance text-white sm:text-[3.75rem] lg:text-[4.5rem]'

// Heading with its accent set in italic, lighter copper — `accent` when the
// content names one ("Africa Journey"), otherwise the heading's last word.
export function AccentHeading({ text, accent }) {
  if (accent) {
    return (
      <>
        {text} <em className="font-medium text-copper-light">{accent}</em>
      </>
    )
  }
  const split = text.lastIndexOf(' ')
  if (split === -1) return <em className="font-medium text-copper-light">{text}</em>
  return (
    <>
      {text.slice(0, split)} <em className="font-medium text-copper-light">{text.slice(split + 1)}</em>
    </>
  )
}

// A soft black haze behind one block of hero copy, so it reads over any
// photo or video — bright or dark — without darkening the rest of the
// backdrop. The title and the paragraph each get their own: a wide, soft
// one behind the title, and a denser one (`strong`) behind the paragraph,
// whose smaller text needs more contrast.
export function Haze({ children, className = '', strong = false }) {
  return (
    <div className={`relative isolate ${className}`}>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -z-10 rounded-[2.5rem] ${
          strong
            ? '-inset-x-6 -inset-y-5 bg-black/55 blur-xl sm:-inset-x-8'
            : '-inset-x-8 -inset-y-5 bg-black/45 blur-2xl sm:-inset-x-12 sm:-inset-y-6'
        }`}
      />
      {children}
    </div>
  )
}

// The pill above a heading when a page has a plain text label (country or
// service name): dark frosted glass, white text and a gold edge, so it
// reads over any backdrop.
export function HeroBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/70 bg-black/55 py-2 pl-3.5 pr-5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_6px_24px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md">
      <span className="size-2 shrink-0 rounded-full bg-gold ring-4 ring-gold/25" aria-hidden="true" />
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
      className="relative isolate flex min-h-[max(100svh,600px)] items-center overflow-hidden px-6 pb-16 pt-28 text-left text-primary-foreground sm:px-10 lg:px-16"
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

      <div
        className="relative z-[4] w-full max-w-5xl"
        style={{ textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}
      >
        <Reveal delay={150} blur>
          <div className="max-w-3xl">
            {eyebrow && <div className="mb-7">{eyebrow}</div>}

            <Haze className="w-fit">
              <h1 className={headingClassName ?? HEADING}>
                <AccentHeading text={heading} accent={headingAccent} />
              </h1>
            </Haze>

            {(tagline || description) && (
              <Haze strong className="mt-8 max-w-[36rem]">
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
                  <p className="text-base leading-[1.7] text-primary-foreground/95 md:text-[1.0625rem]">
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
                    <div>
                      <p className="text-sm font-bold text-primary-foreground">{item.title}</p>
                      <p className="text-xs text-primary-foreground/75">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Haze>
          </Reveal>
        )}

        {(primaryCta || secondaryCta) && (
          <Reveal delay={450} blur>
            <div className="mt-9 flex flex-wrap gap-4">
              {primaryCta && (
                <HashLink to={primaryCta.to} className="btn-copper">
                  {primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </HashLink>
              )}
              {secondaryCta && (
                <HashLink
                  to={secondaryCta.to}
                  className="btn-outline-light bg-black/25 uppercase backdrop-blur-sm"
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
