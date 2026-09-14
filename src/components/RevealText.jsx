import { useEffect, useRef, useState } from 'react'

/**
 * Splits `text` into words and blur-reveals them left to right as the line
 * scrolls into view — the reference site drives this exact effect with
 * GSAP + ScrollTrigger + SplitType, scrubbed to scroll position. This is a
 * dependency-free approximation: an IntersectionObserver fires the reveal
 * once, and a small per-word transition-delay stands in for the scrub,
 * cascading the same blur-in-from-below sweep without pulling in GSAP.
 */
export function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  wordClassName = '',
  delay = 0,
}) {
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
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key -- words can repeat
          key={i}
          className={`inline-block whitespace-pre transition-[filter,opacity,transform] duration-700 ease-out ${
            visible ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-2 opacity-0 blur-[6px]'
          } ${wordClassName}`}
          style={{ transitionDelay: visible ? `${delay + i * 35}ms` : '0ms' }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
