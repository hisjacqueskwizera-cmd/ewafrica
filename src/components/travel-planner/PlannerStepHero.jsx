// Every step of every service's wizard (Travel Planner, Before You Book
// Check, Travel Audit) reuses this short photo strip (rather than the
// site's full-height video PageIntro) — the same Kilimanjaro veranda shot
// used across all three services' own hero sections, so the whole request
// flow reads as one continuous experience regardless of which service it's
// for. `pt-28` clears the fixed 84px Header (see Header.jsx) plus breathing
// room.
//
// `stepper` is optional — only the Before You Book Check and Travel Audit
// flows pass a <PlannerStepper>, rendered here (over the same dark photo
// overlay, so its primary-foreground text stays legible) rather than as
// its own separate band, to avoid doubling up the pt-28 header clearance
// on every step.
//
// `badge`/`badgeImage` are also optional, and only the Travel Planner
// flow's own steps pass them (its umbrella-logo mark, matching the badge
// on the Travel Planner landing and service-details heroes) — Before You
// Book Check and Travel Audit don't have that mark and stay exactly as
// they were.
//
// `backgroundImage` defaults to the shared Kilimanjaro veranda shot used
// by Before You Book Check and Travel Audit; the Travel Planner flow's own
// steps override it with their own photo instead.
export function PlannerStepHero({
  cornerTagline,
  bannerTagline,
  stepper,
  badge,
  badgeImage,
  badgeImageAlt,
  backgroundImage = '/Pictures/Hero_Trv_PLNR.PNG',
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-8 pt-28 sm:px-6 lg:px-8"
        style={{ textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}
      >
        {badgeImage && (
          <img
            src={badgeImage}
            alt={badgeImageAlt ?? badge ?? ''}
            className="h-11 w-auto self-start sm:h-14"
          />
        )}
        {stepper}
        <p className="text-right text-xs italic leading-relaxed text-primary-foreground/90 sm:text-sm">
          {cornerTagline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="text-center text-base italic text-primary-foreground sm:text-lg">
          {bannerTagline}
        </p>
      </div>
    </section>
  )
}
