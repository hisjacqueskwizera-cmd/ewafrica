import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HashLink } from './HashLink.jsx'

// The header's hover mega-menu, the same idea as the reference site's
// "African Safari" dropdown: hover (or focus) the trigger and a panel of
// destination cards drops down. Lives as a `fixed` panel pinned to the
// header's own height so it spans the full viewport width regardless of
// where the small "Explore" link itself sits in the nav row, and is
// positioned with no gap beneath its trigger so the mouse never crosses
// empty space between the two — the classic way a CSS-only (no JS state)
// hover dropdown avoids closing prematurely.
//
// Opening/closing itself stays pure CSS (group-hover/group-focus-within) —
// but closing on a *click* can't be, because a client-side route change
// doesn't move the mouse or necessarily blur the link, so :hover/:focus-within
// would otherwise stay true and leave the panel sitting over the new page.
// `forceClosed` (driven by Header's click/mouse-leave state) overrides the
// hover/focus classes to snap the panel shut immediately on click.
export function ExploreMenu({ countries, forceClosed, onNavigate }) {
  return (
    <div
      // A forced close skips the fade (duration-0) so the panel is gone the
      // instant something is clicked; hover open/close keeps the 200ms fade.
      className={`fixed inset-x-0 top-[84px] z-[99] transition-[opacity,visibility] ${
        forceClosed
          ? 'invisible opacity-0 duration-0'
          : 'invisible opacity-0 duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100'
      }`}
      role="menu"
    >
      <div className="border-t border-border bg-background shadow-[0_24px_40px_-24px_rgba(20,14,8,0.35)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <span className="section-eyebrow">Where We Work</span>

          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {countries.map((country) => (
              <Link
                key={country.slug}
                to={country.to}
                role="menuitem"
                onClick={onNavigate}
                className="group/card relative block aspect-[3/4] overflow-hidden bg-cocoa"
              >
                <img
                  src={country.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover/card:scale-[1.08]"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-lg font-semibold text-primary-foreground transition-transform duration-[450ms] ease-out group-hover/card:-translate-y-1">
                    {country.displayName ?? country.name}
                  </h3>
                  {country.note && (
                    <p className="mt-0.5 truncate text-xs text-primary-foreground/75">
                      {country.note}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex justify-center border-t border-border pt-6">
            <HashLink
              to="/explore"
              role="menuitem"
              onClick={onNavigate}
              className="group/cta inline-flex items-center gap-2 text-sm font-bold text-copper hover:underline"
            >
              Explore All Destinations
              <span className="grid size-7 place-items-center rounded-full bg-copper text-copper-foreground transition-transform group-hover/cta:translate-x-0.5">
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </HashLink>
          </div>
        </div>
      </div>
    </div>
  )
}
