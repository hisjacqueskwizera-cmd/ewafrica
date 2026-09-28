// How much of the top of the viewport is covered once the page scrolls:
// the fixed site header plus any sticky bars pinned under it (the country
// sub-navs mark themselves with `data-sticky-bar`). Measured live, so it's
// right on every page whatever combination of bars it has.
export function stickyOffset() {
  const header = document.querySelector('[data-site-header]')
  let bottom = header ? header.offsetHeight : 0
  for (const bar of document.querySelectorAll('[data-sticky-bar]')) {
    const pinnedTop = parseFloat(getComputedStyle(bar).top) || 0
    bottom = Math.max(bottom, pinnedTop + bar.offsetHeight)
  }
  return bottom
}

// Scrolls a section's top edge to just under the header and sticky bars,
// rather than under them where its heading would be hidden.
export function scrollToId(id, behavior = 'smooth') {
  if (!id) return
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - stickyOffset()
  window.scrollTo({ top: Math.max(0, Math.round(top)), behavior })
}
