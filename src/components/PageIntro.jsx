import { ArrowRight } from 'lucide-react'
import { HashLink } from './HashLink.jsx'
import { HeroVideoBackground } from './HeroVideoBackground.jsx'
import { Reveal } from './Reveal.jsx'

// Same display-type scale and weight as DestinationHero/About Us's hero
// heading — every page's intro banner now shares one font treatment
// (serif, normal weight, this exact size scale) rather than PageIntro
// having its own separate sans/semibold/clamp() scale.
const HEADING =
  'font-display text-[3rem] font-normal leading-[1.1] text-balance text-primary-foreground sm:text-[4rem] lg:text-[5.375rem]'

/**
 * The site's shared dark hero/intro banner — badge, heading, optional
 * tagline/description/CTAs, all at the same size and layout regardless of
 * page. Originally the homepage Hero only, pulled out here so every page's
 * intro reuses the exact composition, with only the copy (and now,
 * optionally, the backdrop) changing between pages.
 *
 * `titleAccent`, `tagline` (a bullet-separated word/phrase list, e.g.
 * ['Information', 'Guidance', 'Connections']) and the two CTAs are all
 * optional — pages that don't need a second heading line, a tagline row,
 * or any buttons can simply omit them.
 *
 * The backdrop is the site's rotating video (HeroVideoBackground, cycling
 * through the shared HERO_VIDEOS) by default. Pass `backgroundVideos` (an
 * array in HERO_VIDEOS' shape) to rotate through a page's own dedicated
 * clips instead — the Tanzania hero, for instance. Pass `backgroundImage`
 * (+ `backgroundImageAlt`) to use a single static photo instead of any
 * video. Same gradient/vignette/copy treatment in every case, just a
 * different backdrop.
 *
 * Composition anchors the copy to the right side of the frame (stacking
 * back to a centered single column on small screens, where there's no
 * room for a true left/right split) so the backdrop reads as an open
 * canvas on the left.
 *
 * `trustItems` is an optional row of 2-4 short credentials below the
 * description (icon + bold title above a lighter subtitle, divided by thin
 * vertical rules on sm+ screens) — pass `icon` as an actual lucide
 * component (already resolved by the caller), not an icon name, so this
 * shared component stays icon-agnostic.
 *
 * `badgeImage` (+ `badgeImageAlt`) swaps the plain text `badge` pill for a
 * pre-built graphic (e.g. an umbrella mark with its own baked-in label) —
 * pass whichever one the page actually has; `badge` still doubles as the
 * image's fallback alt text if `badgeImageAlt` is omitted.
 *
 * No color wash over the backdrop — the photo or video shows at full
 * strength; the text carries its own shadow for legibility instead.
 */
export function PageIntro({
  id,
  badge,
  badgeImage,
  badgeImageAlt,
  titleLine1,
  titleAccent,
  tagline,
  description,
  trustItems,
  primaryCta,
  secondaryCta,
  backgroundImage,
  backgroundImageAlt,
  backgroundVideos,
}) {
  return (
    <section
      id={id}
      className="relative flex h-svh min-h-[600px] items-center overflow-hidden text-primary-foreground"
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
        className="relative z-[4] flex justify-center px-4 py-24 sm:justify-end sm:px-6 lg:px-8"
        style={{ textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}
      >
        {/* Every child below shares this wrapper's own left edge
            (items-start) instead of each being independently
            right-anchored — the copy block (capped at max-w-2xl) and the
            trust-items row (its own, often wider, natural width) would
            otherwise start at different x-positions. The wrapper itself
            has no fixed width, so it sizes to its widest child, and
            *that* is what gets pinned to the right side of the frame via
            the section's own justify-end above. */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="max-w-2xl text-center sm:text-left">
            {/* One shared blur-fade reveal for the whole intro block — same
                timing/easing as DestinationHero's, instead of the previous
                per-word RevealText cascade plus separately-timed pieces. */}
            <Reveal delay={150} blur>
              {badgeImage ? (
                <img
                  src={badgeImage}
                  alt={badgeImageAlt ?? badge ?? ''}
                  className="h-[67px] w-auto sm:h-[78px] lg:h-[90px]"
                />
              ) : (
                <span className="inline-flex items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
                  {badge}
                </span>
              )}

              <h1 className={`mt-6 ${HEADING}`}>
                {titleLine1}
                {titleAccent && (
                  <>
                    <br />
                    <em className="font-medium italic text-gold">{titleAccent}</em>
                  </>
                )}
              </h1>

              {tagline && (
                <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-base font-bold text-primary-foreground sm:justify-start">
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

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:mx-0 sm:text-lg">
                {description}
              </p>
            </Reveal>
          </div>

          {/* Its own (unconstrained-width) row, not nested in the max-w-2xl
              copy block above — three icon + two-line items, divided by
              bold vertical rules on sm+ screens, are wider than that
              column allows, so this can grow past it rather than every
              item wrapping onto its own row. Still shares the copy
              block's exact left edge via the shared wrapper's items-start
              above. */}
          {trustItems && (
            <Reveal delay={350} blur className="mt-8 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:justify-start sm:gap-x-0">
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
                    <div className="text-left">
                      <p className="text-sm font-bold text-primary-foreground">{item.title}</p>
                      <p className="text-xs text-primary-foreground/70">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="max-w-2xl">
              <Reveal delay={450} blur>
                <div className="mt-9 flex flex-wrap justify-center gap-4 sm:justify-start">
                  {primaryCta && (
                    <HashLink to={primaryCta.to} className="btn-copper">
                      {primaryCta.label}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </HashLink>
                  )}
                  {secondaryCta && (
                    <HashLink to={secondaryCta.to} className="btn-outline-light uppercase">
                      {secondaryCta.label}
                    </HashLink>
                  )}
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
