import { useEffect, useRef, useState } from 'react'

/**
 * Fades + slides its children in once they scroll into view. Skips the
 * animation entirely (renders visible immediately) for
 * prefers-reduced-motion.
 *
 * By default the reveal only ever plays once (fires on first intersection,
 * then stops observing). Pass `once={false}` to have it replay every time
 * the element crosses into or out of view — scrolling back up hides it
 * again so scrolling back down re-triggers the animation too.
 *
 * Pass `big` for a more dramatic version (larger rise + a scale pop) where
 * the default subtle fade/slide isn't enough to read clearly.
 *
 * Pass `from="left"` or `from="right"` to slide in horizontally instead of
 * rising — for copy sitting beside a full-bleed photo rather than stacked
 * in a normal document flow.
 *
 * Pass `blur` for the soft-focus-to-sharp sweep large editorial headings
 * use instead of (or alongside) the rise — the text sits slightly blurred
 * and low-opacity until it scrolls into view, then resolves into focus.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  once = true,
  big = false,
  from = null,
  blur = false,
}) {
  const ref = useRef(null)
  // Captured once at mount — stays fixed regardless of how `visible` toggles
  // afterwards, unlike deriving it from `visible` itself.
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [visible, setVisible] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) return // shown immediately — nothing to observe
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion, once])

  const hiddenState = from
    ? `${from === 'left' ? '-translate-x-10' : 'translate-x-10'} opacity-0`
    : big
      ? 'translate-y-10 scale-90 opacity-0'
      : 'translate-y-6 opacity-0'
  const visibleState = from
    ? 'translate-x-0 opacity-100'
    : big
      ? 'translate-y-0 scale-100 opacity-100'
      : 'translate-y-0 opacity-100'

  return (
    <div
      ref={ref}
      className={`transition-all ${big ? 'duration-1000' : blur ? 'duration-[1100ms]' : 'duration-700'} ease-out ${
        visible ? visibleState : hiddenState
      } ${blur ? (visible ? 'blur-none' : 'blur-[6px]') : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
