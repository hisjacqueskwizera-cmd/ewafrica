import { Mail, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CONTACT_INFO, COUNTRIES, NAV_LINKS } from '../data/siteContent.js'
import { ExploreMenu } from './ExploreMenu.jsx'
import { HashLink } from './HashLink.jsx'
import { SiteSearch } from './SiteSearch.jsx'
import { WhatsAppIcon } from './social-icons.jsx'

// The nav Rothschild Safaris runs is deliberately sparse — contact handled
// by a phone number + pill CTA on the other side. We mirror that: Contact
// drops out of the desktop row (the CTA is the contact path) while the
// mobile panel still lists everything for full discoverability. Home stays
// in the desktop row, ahead of Explore, as an explicit link alongside the logo.
const PRIMARY_NAV = NAV_LINKS.filter((link) => link.label !== 'Contact')

// A small, balanced sample for the Explore mega-menu — two west, two east —
// rather than just the first four in COUNTRIES, which would skew east.
const EXPLORE_MENU_SLUGS = ['ghana', 'tanzania', 'rwanda', 'senegal']
const EXPLORE_MENU_COUNTRIES = EXPLORE_MENU_SLUGS.map((slug) =>
  COUNTRIES.find((country) => country.slug === slug),
).filter(Boolean)

// Routes whose hero opens on a full-bleed dark photo/video, edge-to-edge
// behind the fixed header — the same transparent, light-on-dark header
// treatment as Home before scrolling makes sense there too, rather than a
// solid bar sitting awkwardly on top of the dark hero from first paint.
// Every destination page shares the same DestinationHero now (see
// src/components/DestinationHero.jsx), so all of them are listed here.
const TRANSPARENT_HERO_ROUTES = [
  '/',
  '/about',
  '/explore',
  '/travel-planner',
  '/tanzania',
  '/tanzania/practical-guide',
  '/tanzania/zanzibar-guide',
  '/ghana',
  '/ghana/practical-guide',
  '/ghana/practical-guide/experience',
  '/ghana/practical-guide/travel-smarter',
  '/malawi',
  '/zambia',
  '/zambia/practical-guide',
  '/uganda',
  '/uganda/practical-guide',
  '/rwanda',
  '/rwanda/gallery',
  '/rwanda/practical-guide',
  '/gambia',
  '/senegal',
  '/benin',
  '/independent-tour-guide',
]

export function Header() {
  const location = useLocation()
  const hasTransparentHero = TRANSPARENT_HERO_ROUTES.includes(location.pathname)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12)
  const [menuOpen, setMenuOpen] = useState(false)
  // Forces the Explore mega-menu shut the instant a country card (or its
  // CTA) is clicked — see the comment on ExploreMenu's `forceClosed` prop.
  // Resets on mouse-leave so hovering the trigger again opens it normally.
  const [exploreForceClosed, setExploreForceClosed] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Every other route keeps the solid header from the first paint.
  const solid = scrolled || !hasTransparentHero

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const navLinkClass = `text-sm font-medium tracking-wide transition-colors hover:underline underline-offset-4 ${
    solid ? 'text-muted-foreground hover:text-primary' : 'text-primary-foreground/90 hover:text-white'
  }`

  const iconBtnClass = `hidden size-10 items-center justify-center rounded-full border transition-colors lg:inline-flex ${
    solid
      ? 'border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground'
      : 'border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10'
  }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow] duration-300 ${
        solid ? 'border-b border-border bg-background' : 'border-b border-transparent bg-transparent'
      } ${scrolled ? 'shadow-[0_12px_30px_-24px_rgba(20,14,8,0.6)]' : ''}`}
    >
      {/* Three-column bar — nav / logo / contact — so the logo stays dead
          centre regardless of how much the side groups hold. */}
      <div className="mx-auto grid h-[84px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {PRIMARY_NAV.map((link) => {
            if (link.label === 'Explore') {
              // A hover/focus mega-menu, CSS-driven (group-hover /
              // group-focus-within) rather than React state — the trigger
              // and its panel share one group, and the panel sits flush
              // against the header's bottom edge with no gap, so the
              // pointer never has to cross empty space between them.
              return (
                <div
                  key={link.label}
                  className="group relative"
                  onMouseLeave={() => setExploreForceClosed(false)}
                >
                  <HashLink
                    to={link.to}
                    className={navLinkClass}
                    // Clicking the trigger itself (it navigates to /explore)
                    // snaps the panel shut too, same as clicking a card in it.
                    onClick={(event) => {
                      setExploreForceClosed(true)
                      event.currentTarget.blur()
                    }}
                  >
                    {link.label}
                  </HashLink>
                  <ExploreMenu
                    countries={EXPLORE_MENU_COUNTRIES}
                    forceClosed={exploreForceClosed}
                    onNavigate={(event) => {
                      setExploreForceClosed(true)
                      event.currentTarget.blur()
                    }}
                  />
                </div>
              )
            }
            return link.isRoute ? (
              <Link key={link.label} to={link.to} className={navLinkClass}>
                {link.label}
              </Link>
            ) : (
              <HashLink key={link.label} to={link.to} className={navLinkClass}>
                {link.label}
              </HashLink>
            )
          })}
        </nav>

        <Link
          to="/"
          className="col-start-2 flex shrink-0 items-center justify-self-center"
          aria-label="East-West Africa Link home"
        >
          <img
            src={solid ? '/Logos/New_logo/Logo_Dark.webp' : '/Logos/New_logo/Logo_White.webp'}
            alt="East-West Africa Link"
            className="h-[78px] w-auto transition-opacity duration-300"
          />
        </Link>

        <div className="flex items-center justify-end gap-3">
          <SiteSearch triggerClassName={iconBtnClass} />

          <a href={CONTACT_INFO.emailHref} className={iconBtnClass} aria-label="Email us">
            <Mail className="size-4" aria-hidden="true" />
          </a>

          <a
            href={CONTACT_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtnClass}
            aria-label="Chat with us on WhatsApp"
          >
            <WhatsAppIcon className="size-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            className={`inline-flex size-10 items-center justify-center rounded-lg border transition-colors md:hidden ${
              solid ? 'border-border text-primary' : 'border-primary-foreground/30 text-primary-foreground'
            }`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t transition-[max-height] duration-300 md:hidden ${
          menuOpen ? 'max-h-125 border-border' : 'max-h-0 border-transparent'
        }`}
      >
        <nav className="flex flex-col gap-1 bg-card px-4 pb-4 pt-4 sm:px-6" aria-label="Mobile">
          {NAV_LINKS.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={closeMenu}
                className="border-b border-border py-3 text-[15px] font-medium text-primary"
              >
                {link.label}
              </Link>
            ) : (
              <HashLink
                key={link.label}
                to={link.to}
                onClick={closeMenu}
                className="border-b border-border py-3 text-[15px] font-medium text-primary"
              >
                {link.label}
              </HashLink>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3 bg-card px-4 pb-6 pt-2 sm:px-6">
          <SiteSearch
            triggerClassName="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary"
          />
          <a
            href={CONTACT_INFO.emailHref}
            aria-label="Email us"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary"
          >
            <Mail className="size-4" aria-hidden="true" />
          </a>
          <a
            href={CONTACT_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary"
          >
            <WhatsAppIcon className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
