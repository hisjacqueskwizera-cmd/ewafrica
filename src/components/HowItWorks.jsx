import { ArrowRight, MessageSquareText, Search, Send } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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

// While the line runs down the left rail, its tip stays pinned at this
// height on screen (as a fraction of the viewport), so it grows down the
// page in step with the scroll, just ahead of where the visitor is reading.
const DRAW_LINE = 0.7

// Once the rail turns the corner, the run across the icons is drawn over
// this much scrolling (as a fraction of the viewport height), so it
// finishes while the icon row is still comfortably on screen.
const ACROSS_SCROLL = 0.3

const clamp01 = (value) => Math.min(1, Math.max(0, value))

export function HowItWorks() {
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const iconRefs = useRef([])
  const pathRefs = useRef([])
  const [geometry, setGeometry] = useState(null)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  // Builds the line off the real layout: it drops in at the very top of
  // this section — directly under Our Services — runs down the left
  // margin, breaks around the "How We Guide Your Journey" heading instead
  // of drawing across it, picks back up underneath, curves in from the
  // left to meet Tell Us at its own height, threads through each icon
  // edge to edge, and carries on past You Connect. Re-measured on resize
  // and once web fonts have settled, since either can move the heading
  // and shift everything below it.
  //
  // Each piece is its own path with its own scroll window (`start`/`end`,
  // in container px at the draw line). Browsers restart the dash pattern
  // at every sub-path of a single path, so one path with gaps would draw
  // all of its pieces at once instead of one after another.
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
      const turnY = iconY - radius

      // The rail follows the draw line one-to-one, so its pieces' scroll
      // windows are just their own top and bottom.
      const rail = [
        // From under Our Services down to just above the heading.
        { d: `M ${railX} 0 V ${headingTop}`, start: 0, end: headingTop },
        // Resumes below the heading, down to where it turns the corner.
        { d: `M ${railX} ${headingBottom} V ${turnY}`, start: headingBottom, end: turnY },
      ]

      const across = [
        // Curves in from the side to meet the first icon.
        {
          d: `M ${railX} ${turnY} A ${radius} ${radius} 0 0 0 ${railX + radius} ${iconY} H ${icon1Left}`,
          length: (Math.PI * radius) / 2 + (icon1Left - railX - radius),
        },
        // Icon to icon, edge to edge.
        ...iconRects.slice(0, -1).map((icon, i) => {
          const from = x(icon.right)
          const to = x(iconRects[i + 1].left)
          return { d: `M ${from} ${iconY} H ${to}`, length: to - from }
        }),
        // And on past the last step.
        {
          d: `M ${x(lastIcon.right)} ${iconY} H ${x(lastIcon.right) + tailWidth}`,
          length: tailWidth,
        },
      ]

      // The run across shares one scroll window after the turn, handed
      // out to each piece in proportion to its length so the tip moves
      // at a steady pace from the corner to the end of the line.
      const acrossLength = across.reduce((sum, piece) => sum + piece.length, 0) || 1
      const acrossScroll = window.innerHeight * ACROSS_SCROLL
      let drawn = 0
      const acrossWindows = across.map(({ d, length }) => {
        const start = turnY + (drawn / acrossLength) * acrossScroll
        drawn += length
        const end = turnY + (drawn / acrossLength) * acrossScroll
        return { d, start, end }
      })

      setGeometry({
        segments: [...rail, ...acrossWindows],
        width: containerRect.width,
        height: containerRect.height,
      })
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

  // Scrubs the line's draw directly to scroll position: it draws from
  // top to end as the visitor scrolls down and retreats the same way
  // scrolling back up. Written straight to the paths rather than through
  // state, so scrolling doesn't re-render the section every frame, and
  // in a layout effect so the first frame is already at the right point.
  useLayoutEffect(() => {
    if (reducedMotion || !geometry) return
    let ticking = false

    const update = () => {
      ticking = false
      const container = containerRef.current
      if (!container) return
      const vh = window.innerHeight || document.documentElement.clientHeight
      // Which point of the section (in its own px) is at the draw line.
      const at = vh * DRAW_LINE - container.getBoundingClientRect().top

      geometry.segments.forEach(({ start, end }, i) => {
        const path = pathRefs.current[i]
        if (!path) return
        const drawn = end > start ? clamp01((at - start) / (end - start)) : Number(at >= start)
        path.style.strokeDashoffset = String(1 - drawn)
        // A zero-length dash still paints a dot with round caps.
        path.style.visibility = drawn > 0 ? 'visible' : 'hidden'
      })
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
  }, [reducedMotion, geometry])

  return (
    <div ref={containerRef} className="relative pt-16 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-46rem] top-[64%] hidden -translate-y-1/2 opacity-50 md:block md:right-[-42rem] md:top-[62%] lg:right-[-36rem] lg:top-[64%]"
        style={{
          backgroundImage: "url('/images/home/map-of-africa.webp')",
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
          {geometry.segments.map((segment, i) => (
            <path
              key={i}
              ref={(el) => (pathRefs.current[i] = el)}
              d={segment.d}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              // Normalizes each piece to a length of 1, so the scroll
              // effect can draw it with a 0–1 dash offset.
              {...(!reducedMotion && { pathLength: 1, strokeDasharray: '1 1' })}
            />
          ))}
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
                <h3 className="text-2xl font-semibold text-primary sm:text-[28px]">
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
