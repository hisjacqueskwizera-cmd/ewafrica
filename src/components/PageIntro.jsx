import { ArrowRight } from 'lucide-react'
import { HashLink } from './HashLink.jsx'
import { HeroVideoBackground } from './HeroVideoBackground.jsx'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'

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
 * `overlayTone="neutral"` swaps the default warm cocoa-tinted scrim for a
 * plain black one — for a naturally light/blue-sky photo (unlike the
 * site's usual darker backdrops) where the cocoa tint reads as an unwanted
 * brown cast rather than a mood-setting one. Defaults to `"warm"`
 * (unchanged cocoa tint) everywhere this isn't passed.
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
  overlayTone = 'warm',
}) {
  return (
    <section
      id={id}
      className="relative flex min-h-[640px] items-center overflow-hidden text-primary-foreground sm:min-h-[92vh]"
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
        className={`absolute inset-0 z-[3] bg-linear-to-b ${
          overlayTone === 'neutral'
            ? 'from-black/55 via-black/20 to-black/60'
            : 'from-cocoa/60 via-cocoa/30 to-cocoa/75'
        }`}
        aria-hidden="true"
      />
      {/* A soft vignette behind the copy — centered on small screens where
          the block is still centered, shifted under the right column once
          the sm:justify-end split below kicks in. */}
      <div
        className="absolute inset-0 z-[3] hidden sm:block"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 68% 55%, rgba(0,0,0,0.32), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-[4] flex justify-center px-4 py-24 sm:justify-end sm:px-6 lg:px-8">
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
            <Reveal>
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
            </Reveal>

            <h1 className="mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.05] text-balance text-primary-foreground">
              <RevealText as="span" text={titleLine1} />
              {titleAccent && (
                <>
                  <br />
                  <RevealText
                    as="span"
                    text={titleAccent}
                    delay={300}
                    wordClassName="italic font-medium text-gold"
                  />
                </>
              )}
            </h1>

            {tagline && (
              <Reveal delay={200}>
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
              </Reveal>
            )}

            <Reveal delay={250}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:mx-0 sm:text-lg">
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
            <Reveal delay={350} className="mt-8 text-center sm:text-left">
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
              <Reveal delay={450}>
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
