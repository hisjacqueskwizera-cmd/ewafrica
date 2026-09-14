// Stands in for photography we don't have (destinations, founder, Ghana
// monument, service imagery). A brand-toned gradient with a large faint
// line icon — clearly a graphic, not a fake photo. Swap in a real <img>
// wherever this is used once photos are available.

// Each tone pairs an opaque base fill with the gradient — the gradient's
// stops are semi-transparent, and without a solid background-color behind
// them they'd blend with whatever sits further back in the stacking
// context (here, the page's cream background), washing the whole panel
// out toward its lighter end.
const TONES = {
  copper: 'bg-copper from-copper via-copper/85 to-cocoa',
  forest: 'bg-forest from-forest via-forest/85 to-[#0f2117]',
  navy: 'bg-navy from-navy via-navy/90 to-[#0b1424]',
  cocoa: 'bg-cocoa from-cocoa via-cocoa/90 to-[#140b06]',
}

export function PlaceholderArt({ icon: Icon, tone = 'copper', fill = false, className = '' }) {
  // `fill` (absolute, stretched to the nearest positioned ancestor) and the
  // default (relative, sized by `className`) are mutually exclusive
  // `position` values — never combine them by also passing "absolute" in
  // `className`, Tailwind's generated stylesheet order (not class order)
  // would decide which one wins.
  const position = fill ? 'absolute inset-0' : 'relative'

  return (
    <div
      aria-hidden="true"
      className={`${position} flex items-center justify-center overflow-hidden bg-linear-to-br ${TONES[tone]} ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:14px_14px] text-primary-foreground" />
      {Icon && (
        <Icon
          className="relative size-16 text-primary-foreground/30"
          strokeWidth={1.25}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
