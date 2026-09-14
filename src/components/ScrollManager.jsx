import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToId } from '../utils/scroll.js'

/**
 * Runs on every route/hash change: scrolls to the hash target if present,
 * otherwise resets scroll to the top of the new page.
 */
export function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      // Wait a tick so the destination page has rendered its sections.
      const id = location.hash.replace('#', '')
      requestAnimationFrame(() => {
        setTimeout(() => scrollToId(id), 40)
      })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [location.pathname, location.hash])

  return null
}
