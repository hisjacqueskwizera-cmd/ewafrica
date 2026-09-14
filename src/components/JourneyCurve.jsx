import { useEffect, useRef, useState } from 'react'

// A compact vertical-then-quarter-turn-then-horizontal path — the same
// hand-drawn corner the reference site draws next to its step headings.
const PATH = 'M40 0 V70 A40 40 0 0 0 80 110 H160'
const PATH_LENGTH = 199

/**
 * A line that draws itself in via stroke-dasharray/dashoffset. Two modes:
 *
 * - Pass `progress` (0→1) to make it a *controlled*, continuously
 *   scroll-scrubbed draw — for wiring several marks to one shared
 *   `useScrollProgress` value so they draw in sequence as the section
 *   scrolls, growing and shrinking with scroll position in both
 *   directions rather than firing once.
 * - Omit it and the component tracks its own visibility via
 *   IntersectionObserver and draws itself in once, the simpler case for a
 *   standalone decorative mark.
 */
export function JourneyCurve({ className = '', progress }) {
  const ref = useRef(null)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [autoVisible, setAutoVisible] = useState(reducedMotion)
  const controlled = progress !== undefined

  useEffect(() => {
    if (controlled || reducedMotion) return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAutoVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [controlled, reducedMotion])

  const drawn = controlled ? progress : autoVisible ? 1 : 0

  return (
    <svg ref={ref} viewBox="0 0 160 110" fill="none" aria-hidden="true" className={className}>
      <path
        d={PATH}
        stroke="currentColor"
        strokeWidth="1"
        style={{
          strokeDasharray: PATH_LENGTH,
          strokeDashoffset: PATH_LENGTH * (1 - drawn),
          transition: controlled ? 'none' : 'stroke-dashoffset 1.4s ease-out',
        }}
      />
    </svg>
  )
}
