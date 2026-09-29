import { DestinationHero, HeroBadge } from './DestinationHero.jsx'

/**
 * The intro banner on home, Contact and the service pages — a thin adapter
 * onto DestinationHero, the site's one hero design, so every page's hero
 * looks and behaves the same with only its content and backdrop changing.
 * It maps this component's long-standing content shape (as stored in
 * siteContent.js) onto DestinationHero's props:
 *
 * - `badge` → a HeroBadge pill above the heading, or `badgeImage` (+
 *   `badgeImageAlt`) for a pre-built graphic such as the Travel Planner's
 *   umbrella mark.
 * - `titleLine1` + `titleAccent` → the heading, the accent in italic copper.
 * - `tagline` (bullet-separated phrases), `description`, `trustItems` (icons
 *   already resolved to components) and the two CTAs, as-is.
 * - The backdrop: `backgroundImage` (+ `backgroundImageAlt`), or
 *   `backgroundVideos`, or the site-wide video reel when neither is given.
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
  const eyebrow = badgeImage ? (
    <img
      src={badgeImage}
      alt={badgeImageAlt ?? badge ?? ''}
      className="h-[67px] w-auto sm:h-[78px] lg:h-[90px]"
    />
  ) : badge ? (
    <HeroBadge>{badge}</HeroBadge>
  ) : null

  return (
    <DestinationHero
      id={id}
      eyebrow={eyebrow}
      heading={titleLine1}
      headingAccent={titleAccent || undefined}
      tagline={tagline}
      description={description}
      trustItems={trustItems}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      backgroundImage={backgroundImage}
      backgroundImageAlt={backgroundImageAlt}
      backgroundVideos={backgroundVideos}
    />
  )
}
