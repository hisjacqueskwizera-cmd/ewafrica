import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { stickyOffset } from '../utils/scroll.js'
import { HashLink } from './HashLink.jsx'

// Matches Header.jsx's fixed 84px bar — the sub-nav sticks directly under it.
const HEADER_HEIGHT = 84

// How far past the bottom of the sticky bars a section's top may sit and
// still count as "the section you're on" — absorbs sub-pixel rounding after
// a tab click scrolls it exactly into place.
const SPY_TOLERANCE = 8

// See lockTo: the visitor scrolling for themselves ends a clicked tab's hold.
const TAKEOVER_EVENTS = ['wheel', 'touchstart', 'keydown']
const MAX_LOCK_MS = 3000

const pathOf = (tab) => tab.to.split('#')[0]
const hashOf = (tab) => tab.to.split('#')[1]

/**
 * The sticky section bar under the header on every country page — shared by
 * CountrySubNav and RwandaSubNav. `tabs` are `{ label, to }`, and each is one
 * of two kinds, told apart by the page you're on:
 *
 * - Section tabs — their path is this page (`/ghana#services`). The one
 *   whose section is currently under the bar is highlighted, following the
 *   visitor as they scroll (scroll-spy); above every section, the first
 *   tab (Overview) is. A clicked tab lights up straight away and holds
 *   while the page glides to it, rather than flickering through every
 *   section it passes on the way.
 * - Page tabs — a page of their own (`/ghana/practical-guide`). Highlighted
 *   on that page and on any page under it, so Practical Guide stays lit on
 *   every page of a multi-page guide.
 */
export function SectionSubNav({ tabs, ariaLabel }) {
  const { pathname } = useLocation()
  const navRef = useRef(null)
  const lockRef = useRef(null)
  const updateRef = useRef(() => {})
  const [spyLabel, setSpyLabel] = useState(null)

  const sectionTabs = tabs.filter((tab) => pathOf(tab) === pathname)
  const tabsKey = tabs.map((tab) => tab.to).join('|')

  // Scroll-spy over this page's section tabs.
  useEffect(() => {
    const spied = tabs.filter((tab) => pathOf(tab) === pathname)
    if (spied.length === 0) return undefined
    let frame = 0

    const update = () => {
      frame = 0
      if (lockRef.current) return
      const line = stickyOffset() + SPY_TOLERANCE
      const { innerHeight, scrollY } = window
      // A section near the very end may never reach the bar — at the bottom
      // of the page, the lowest section still on screen counts instead.
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2
      let current = null
      let currentTop = -Infinity
      for (const tab of spied) {
        const el = hashOf(tab) && document.getElementById(hashOf(tab))
        if (!el) continue
        const top = el.getBoundingClientRect().top
        const reached = atBottom ? top < innerHeight : top <= line
        if (reached && top > currentTop) {
          current = tab
          currentTop = top
        }
      }
      setSpyLabel((current ?? spied[0]).label)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    updateRef.current = update
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // tabsKey stands in for `tabs`, which callers rebuild on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, tabsKey])

  // Holds a clicked section tab lit until the smooth scroll it starts has
  // actually arrived — not on the next "scroll ended" event, which can be a
  // stale one from an earlier scroll — or until the visitor takes over with
  // the wheel, a touch or a key. MAX_LOCK_MS is only a safety net.
  const releaseLockRef = useRef(() => {})
  useEffect(() => () => releaseLockRef.current(), [])
  const lockTo = (tab) => {
    releaseLockRef.current()
    if (pathOf(tab) !== pathname) return // navigating to another page
    const el = hashOf(tab) && document.getElementById(hashOf(tab))
    const maxY = document.documentElement.scrollHeight - window.innerHeight
    const targetY = el ? el.getBoundingClientRect().top + window.scrollY - stickyOffset() : 0
    const settleY = Math.round(Math.min(maxY, Math.max(0, targetY)))
    const startedAt = Date.now()

    lockRef.current = tab.label
    setSpyLabel(tab.label)

    const release = () => {
      clearInterval(poll)
      for (const type of TAKEOVER_EVENTS) window.removeEventListener(type, release)
      releaseLockRef.current = () => {}
      lockRef.current = null
      updateRef.current()
    }
    const poll = setInterval(() => {
      if (Math.abs(window.scrollY - settleY) <= 2 || Date.now() - startedAt > MAX_LOCK_MS) release()
    }, 100)
    for (const type of TAKEOVER_EVENTS) window.addEventListener(type, release, { passive: true })
    releaseLockRef.current = release
  }

  let activeLabel = null
  if (sectionTabs.length > 0) {
    activeLabel = spyLabel && sectionTabs.some((tab) => tab.label === spyLabel) ? spyLabel : sectionTabs[0].label
  } else {
    // The most specific page tab this page sits under, if exactly one.
    const under = tabs.filter((tab) => pathname.startsWith(`${pathOf(tab)}/`))
    const deepest = Math.max(...under.map((tab) => pathOf(tab).length))
    const matches = under.filter((tab) => pathOf(tab).length === deepest)
    if (matches.length === 1) activeLabel = matches[0].label
  }

  // Keep the highlighted tab in view when the bar scrolls sideways (phones).
  useEffect(() => {
    const nav = navRef.current
    const link = nav?.querySelector('[aria-current]')
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return
    const left = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2
    nav.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [activeLabel])

  return (
    <div
      data-sticky-bar
      className="sticky z-30 border-b border-border/70 bg-cream/95 backdrop-blur-sm"
      style={{ top: HEADER_HEIGHT }}
    >
      <nav
        ref={navRef}
        className="mx-auto flex h-14 w-[95%] items-center gap-6 overflow-x-auto text-sm font-semibold lg:justify-center"
        aria-label={ariaLabel}
      >
        {tabs.map((tab) => {
          const active = tab.label === activeLabel
          return (
            <HashLink
              key={tab.label}
              to={tab.to}
              onClick={() => lockTo(tab)}
              aria-current={active ? 'location' : undefined}
              className={`shrink-0 whitespace-nowrap border-b-2 pb-1 transition-colors ${
                active
                  ? 'border-copper text-primary'
                  : 'border-transparent text-muted-foreground hover:text-primary'
              }`}
            >
              {tab.label}
            </HashLink>
          )
        })}
      </nav>
    </div>
  )
}
