import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DESTINATIONS } from '../data/siteContent.js'
import { PlaceholderArt } from './PlaceholderArt.jsx'
import { SectionTitle } from './section-heading.jsx'

// One card in the auto-scrolling destinations ticker. `hidden` marks the
// duplicated second copy of the row (rendered so the marquee has a full
// width to slide by before looping) so assistive tech only ever hears each
// destination once — its link is also dropped from the tab order.
//
// Same card language as the Services row and Explore Regions: full-bleed
// photo, square corners, a bottom-up black gradient, serif title, and an
// uppercase "Explore" line — rather than this card's old rounded corners
// and corner map-pin badge.
//
// The row runs full-bleed (no max-w container), so a fixed card width lets
// more cards fit as the monitor gets wider — up around 6 on a large desktop.
// From lg up, the width itself scales with the viewport (clamped between
// 20rem and 36rem) so roughly 4 stay visible at once no matter how wide the
// screen is, instead of shrinking the row to crop the count.
//
// Height is set explicitly (the old 3:4 aspect-ratio height, plus a flat
// 50px) rather than via aspect-[3/4], since the lg width is itself a
// clamp/vw expression and the height needs to track it.
function DestinationCard({ d, hidden }) {
  return (
    <Link
      to={d.to}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className="group relative w-64 h-[391px] shrink-0 overflow-hidden bg-cocoa sm:w-72 sm:h-[434px] lg:w-[clamp(20rem,25vw-1rem,36rem)] lg:h-[calc(clamp(20rem,25vw-1rem,36rem)*4/3+50px)]"
    >
      {d.image ? (
        <img
          src={d.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
        />
      ) : (
        <PlaceholderArt
          icon={MapPin}
          tone={d.tone}
          className="size-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
        />
      )}
      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black opacity-0 transition-opacity duration-[450ms] ease-out group-hover:opacity-[0.45]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="truncate text-2xl font-semibold text-primary-foreground transition-transform duration-[450ms] ease-out group-hover:-translate-y-2.5">
          {d.name}
        </h3>
        {d.note && (
          <p className="mt-1 truncate text-sm text-primary-foreground/80">{d.note}</p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/90 transition-colors group-hover:text-gold">
          Explore
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

export function DestinationsTicker() {
  return (
    <section id="destinations" className="overflow-hidden pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Where we work" title="Explore our Destinations" />
      </div>

      <div className="relative mt-10" role="group" aria-label="Explore our destinations">
        <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {DESTINATIONS.map((d) => (
            <DestinationCard key={d.slug} d={d} />
          ))}
          {DESTINATIONS.map((d) => (
            <DestinationCard key={`${d.slug}-dup`} d={d} hidden />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 flex justify-center">
          <a
            href="/#explore"
            className="inline-flex items-center gap-2 text-sm font-semibold text-copper hover:underline"
          >
            <span>View all destinations</span>
            <span className="grid size-8 place-items-center rounded-full bg-copper text-copper-foreground">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
