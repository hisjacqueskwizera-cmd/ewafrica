import { useEffect, useRef, useState } from 'react'

/**
 * Tracks how far an element has scrolled through a viewport-relative
 * window, as a continuous 0→1 value — not a one-shot "has it appeared yet"
 * flag. The window is ~8 viewport heights tall (progress starts climbing
 * while the element's top is still 4 screens below the bottom of the
 * screen, and only reaches 1 after it's scrolled past 3+ screens above the
 * top), so the sweep needs on the order of 50 mouse-wheel scrolls to play
 * out fully rather than finishing within a screen or two.
 *
 * This is what a real scroll-scrubbed animation needs: something that
 * grows and shrinks in lockstep with scroll position (including scrolling
 * back up), rather than a transition that plays once and is done.
 * Recomputed on scroll and resize, both rAF-throttled.
 *
 * Returns `[ref, progress]` — attach `ref` to the element whose scroll
 * position should drive the animation.
 */
export function useScrollProgress() {
  const ref = useRef(null)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0)

  useEffect(() => {
    if (reducedMotion) return
    const node = ref.current
    if (!node) return

    let ticking = false

    const update = () => {
      ticking = false
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const start = vh * 5
      const end = vh * -3.2
      const raw = (start - rect.top) / (start - end)
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reducedMotion])

  return [ref, progress]
}
