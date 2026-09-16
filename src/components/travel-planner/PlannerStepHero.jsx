// Every step of the wizard reuses this short photo strip (rather than the
// site's full-height video PageIntro) — same Tanzania.jpg savanna shot
// already used elsewhere in the project, since there's no dedicated,
// prop-free Kilimanjaro landscape asset to match the reference exactly.
// `pt-28` clears the fixed 84px Header (see Header.jsx) plus breathing room.
//
// `stepper` is optional — only the Before You Book Check flow passes a
// <PlannerStepper>, rendered here (over the same dark photo overlay, so its
// primary-foreground text stays legible) rather than as its own separate
// band, to avoid doubling up the pt-28 header clearance on every step.
export function PlannerStepHero({ cornerTagline, bannerTagline, stepper }) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src="/Pictures/countries/Tanzania.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-cocoa/55" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-8 pt-28 sm:px-6 lg:px-8">
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
