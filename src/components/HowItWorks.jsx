import { ArrowRight, MessageSquareText, Search, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { HOW_IT_WORKS } from '../data/siteContent.js'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'

const STEP_ICONS = {
  message: MessageSquareText,
  search: Search,
  handshake: Send,
}

// How round the turn from the vertical rail into the first icon is.
const CORNER_RADIUS = 28

// The rail runs in the gutter just outside the text column, so the SVG
// has to reach that far past the content box on the left.
const RAIL_GUTTER = 16
const SVG_BLEED = 40

export function HowItWorks() {
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const iconRefs = useRef([])
  const pathRef = useRef(null)
  const [geometry, setGeometry] = useState(null)
  const [pathLength, setPathLength] = useState(0)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [lineVisible, setLineVisible] = useState(false)

  // Builds the whole line as one SVG path measured off the real layout:
  // it drops in at the very top of this section — directly under Our
  // Services — runs down the left margin, breaks around the "How We
  // Guide Your Journey" heading instead of drawing across it, picks back
  // up underneath, curves in from the left to meet Tell Us at its own
  // height, threads through each icon edge to edge, and carries on past
  // You Connect. Re-measured on resize and once web fonts have settled,
  // since either can move the heading and shift everything below it.
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current
      const heading = headingRef.current
      const icons = iconRefs.current
      if (!container || !heading || icons.length < 3 || icons.some((el) => !el)) return

      const containerRect = container.getBoundingClientRect()
      const headingRect = heading.getBoundingClientRect()
      const iconRects = icons.map((el) => el.getBoundingClientRect())

      const x = (clientX) => clientX - containerRect.left
      const y = (clientY) => clientY - containerRect.top

      // The rail sits just outside the heading's own left edge, so the
      // vertical run never crosses any text.
      const railX = x(headingRect.left) - RAIL_GUTTER
      const headingTop = y(headingRect.top)
      const headingBottom = y(headingRect.bottom)

      const [firstIcon] = iconRects
      const lastIcon = iconRects[iconRects.length - 1]
      const iconY = y(firstIcon.top) + firstIcon.height / 2
      const icon1Left = x(firstIcon.left)

      // Keep the corner from overshooting when the gap between the
      // heading and the icons (or the rail and the icon) is tight.
      const radius = Math.max(
        0,
        Math.min(CORNER_RADIUS, (iconY - headingBottom) / 2, (icon1Left - railX) / 2),
      )

      const gapWidth = Math.max(0, iconRects[1].left - firstIcon.right)
      const tailWidth = Math.min(160, gapWidth || 120)

      // `M` starts a new sub-path, which is how the break around the
      // heading and the breaks at each icon are drawn — they add no
      // length, so a single dash offset still sweeps the whole line in
      // one continuous pass.
      const d = [
        // From under Our Services down to just above the heading.
        `M ${railX} 0 V ${headingTop}`,
        // Resumes below the heading and curves in from the side.
        `M ${railX} ${headingBottom} V ${iconY - radius}`,
        `A ${radius} ${radius} 0 0 0 ${railX + radius} ${iconY}`,
        `H ${icon1Left}`,
        // Icon to icon, edge to edge.
        ...iconRects.slice(0, -1).map((icon, i) => {
          const next = iconRects[i + 1]
          return `M ${x(icon.right)} ${iconY} H ${x(next.left)}`
        }),
        // And on past the last step.
        `M ${x(lastIcon.right)} ${iconY} H ${x(lastIcon.right) + tailWidth}`,
      ].join(' ')

      setGeometry({ d, width: containerRect.width, height: containerRect.height })
    }

    measure()
    window.addEventListener('resize', measure)
    // Web fonts can resize the heading after first paint, which moves
    // everything the line is pinned to.
    document.fonts?.ready.then(measure)

    const observer = new ResizeObserver(measure)
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      window.removeEventListener('resize', measure)
      observer.disconnect()
    }
  }, [])

  // The dash offset is what actually draws the line, so the path's real
  // length has to be read back once it exists.
  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength())
  }, [geometry])

  // A one-shot draw-in once the section scrolls into view, rather than
  // scrubbing the line to raw scroll position: this section can sit
  // anywhere on a page of any length, so a fixed scroll-distance window
  // (the old approach) either finishes drawing the line long before or
  // long after it's actually on screen. Triggering off intersection and
  // animating over a fixed duration means it always draws while the
  // visitor is actually looking at it, whatever the surrounding page.
  useEffect(() => {
    if (reducedMotion) return
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div ref={containerRef} className="relative pt-16 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-46rem] top-[64%] hidden -translate-y-1/2 opacity-50 md:block md:right-[-42rem] md:top-[62%] lg:right-[-36rem] lg:top-[64%]"
        style={{
          backgroundImage: "url('/Pictures/HowWeGuideYourJourney/Map_Of_Africa.PNG')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          width: '110rem',
          height: '68rem',
        }}
      />

      {geometry && (
        <svg
          aria-hidden="true"
          viewBox={`${-SVG_BLEED} 0 ${geometry.width + SVG_BLEED} ${geometry.height}`}
          preserveAspectRatio="none"
          fill="none"
          className="pointer-events-none absolute z-0 hidden text-copper/60 sm:block"
          style={{
            left: -SVG_BLEED,
            top: 0,
            width: geometry.width + SVG_BLEED,
            height: geometry.height,
          }}
        >
          <path
            ref={pathRef}
            d={geometry.d}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: reducedMotion || lineVisible ? 0 : pathLength,
              transition: reducedMotion ? 'none' : 'stroke-dashoffset 1.4s ease-out',
            }}
          />
        </svg>
      )}

      <div
        ref={headingRef}
        className="relative z-10 max-w-lg text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl"
      >
        <RevealText as="h2" text="How We Guide" className="text-primary" />
        <RevealText
          as="h2"
          text="Your Journey"
          delay={200}
          className="italic font-medium text-copper"
        />
      </div>

      <p className="relative z-10 mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        From your first question to your next chapter, we provide independent guidance,
        <br />
        local insight, and practical support across Africa.
      </p>

      <div className="relative z-10 mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {HOW_IT_WORKS.map((step, index) => {
          const Icon = STEP_ICONS[step.icon] || MessageSquareText

          return (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex justify-center">
                <div
                  ref={(el) => (iconRefs.current[index] = el)}
                  className="relative z-10 grid size-16 place-items-center rounded-full border border-copper/60 bg-transparent text-copper shadow-sm"
                >
                  <Icon className="size-7" strokeWidth={1.8} aria-hidden="true" />
                </div>
              </div>

              <div className="flex w-full flex-col items-center justify-center">
                <h3 className="whitespace-nowrap text-2xl font-semibold text-primary sm:text-[28px]">
                  {step.title}
                </h3>
              </div>
              <Reveal delay={index * 150} once={false}>
                <p className="mt-4 max-w-70 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.description}
                </p>
              </Reveal>
            </div>
          )
        })}
      </div>

      <Reveal
        delay={HOW_IT_WORKS.length * 150}
        once={false}
        className="mt-12 flex justify-start sm:justify-end"
      >
        <HashLink to="/#contact" className="btn-outline-dark uppercase tracking-[0.08em]">
          Begin Your Journey
          <ArrowRight className="size-4" aria-hidden="true" />
        </HashLink>
      </Reveal>
    </div>
  )
}
