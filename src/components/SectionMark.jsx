import { useEffect, useRef, useState } from 'react'

/**
 * The short rule that marks a heading throughout the reference site —
 * except there it isn't static: an IntersectionObserver toggles an
 * "animate" class on scroll and the line grows from nothing up to full
 * length over 1s. Reproduced here the same way, via `scale` off a
 * `transform-origin` edge so the growth is GPU-driven rather than a
 * layout-thrashing width/height animation.
 *
 * `orientation="vertical"` (default) gives the tall mark that sits above a
 * section heading; `"horizontal"` gives the short rule that grows rightward
 * next to a mini-heading, e.g. the How It Works steps.
 */
export function SectionMark({ light = false, orientation = 'vertical', className = '' }) {
  const ref = useRef(null)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [visible, setVisible] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '-40px 0px -40px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  const shape =
    orientation === 'horizontal'
      ? `h-px flex-1 origin-left scale-x-0 ${visible ? 'scale-x-100' : ''}`
      : `mb-6 h-16 w-px origin-top scale-y-0 ${visible ? 'scale-y-100' : ''}`

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`block transition-transform duration-1000 ease-out ${shape} ${
        light ? 'bg-primary-foreground/30' : 'bg-copper/40'
      } ${className}`}
    />
  )
}
