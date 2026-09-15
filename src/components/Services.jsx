import { ArrowRight, CheckCircle2, Umbrella } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SERVICES, TRAVEL_PLANNER_UMBRELLA } from '../data/siteContent.js'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'
import { SectionMark } from './SectionMark.jsx'

// Each group of 3 stays fully in place for STAY_MS, then the next group
// slides in over SLIDE_MS — keep SLIDE_MS in sync with the strip's
// duration-700 class below.
const STAY_MS = 3000
const SLIDE_MS = 700
const PAGE_SIZE = 3

// A landscape, full-bleed photo card: image fills the frame, a bottom-up
// gradient carries the title so it stays legible over any photo, corners
// stay sharp. Same card language across the whole row — services and the
// umbrella card alike — just with different content in the overlay.
//
// The hover state is the reference site's own recipe, lifted straight from
// its CSS: the photo zooms to 1.08 (.6s), a second flat black layer fades
// in on top for extra contrast (.45s), the title lifts 10px, and the
// description — hidden by default — drops into view via max-height +
// opacity + a small rise (~.4s). `group-focus-within` mirrors it for
// keyboard focus, since `:hover` alone would leave it keyboard-inaccessible.
//
// `hidden` marks every card that isn't in the group currently on screen
// (including the strip's duplicate copy of each group — see SLIDES below)
// so assistive tech only ever hears the visible cards, and their links drop
// out of the tab order.
function PhotoCard({ to, image, hidden, children }) {
  return (
    <HashLink
      to={to}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className="group relative block h-[350px] w-full overflow-hidden bg-cocoa sm:h-[390px]"
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-black opacity-0 transition-opacity duration-[450ms] ease-out group-hover:opacity-[0.45] group-focus-within:opacity-[0.45]"
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col justify-end p-6">{children}</div>
    </HashLink>
  )
}

function CardTitle({ children, className = '' }) {
  return (
    <h3
      className={`transition-transform duration-[450ms] ease-out group-hover:-translate-y-2.5 group-focus-within:-translate-y-2.5 ${className}`}
    >
      {children}
    </h3>
  )
}

// Hidden until hover/focus, then unfolds — max-height + opacity + a small
// rise, exactly the reference site's `.hover-card-desc` transition.
//
// `expand` is the literal group-hover/group-focus-within max-height pair —
// a prop rather than a template-interpolated class, since Tailwind's JIT
// scanner needs the full class name written out somewhere in the source to
// generate it; a dynamically-built string like `max-h-${n}` wouldn't be
// picked up. Defaults to the original cards' max-h-32; the umbrella card
// passes a taller one since it reveals both a paragraph and a checklist.
function CardReveal({
  children,
  className = '',
  expand = 'group-hover:max-h-32 group-focus-within:max-h-32',
}) {
  return (
    <div
      className={`max-h-0 translate-y-3 overflow-hidden opacity-0 transition-[max-height,opacity,transform] duration-[400ms] ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 ${expand} ${className}`}
    >
      {children}
    </div>
  )
}

function ServiceCard({ s, hidden }) {
  return (
    <PhotoCard to={s.to} image={s.image} hidden={hidden}>
      <CardTitle className="text-2xl font-semibold text-primary-foreground">{s.title}</CardTitle>
      <CardReveal>
        <p className="pt-2 text-sm leading-relaxed text-primary-foreground/80">{s.description}</p>
      </CardReveal>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/90 transition-colors group-hover:text-gold">
        Learn More
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </span>
    </PhotoCard>
  )
}

function UmbrellaCard({ hidden }) {
  return (
    <PhotoCard to={TRAVEL_PLANNER_UMBRELLA.to} image="/Pictures/caption.jpg" hidden={hidden}>
      <Umbrella className="size-6 text-gold" aria-hidden="true" />
      <CardTitle className="mt-3 text-2xl font-semibold leading-snug text-primary-foreground">
        {TRAVEL_PLANNER_UMBRELLA.title}
        <br />
        <span className="italic">{TRAVEL_PLANNER_UMBRELLA.subtitle}</span>
      </CardTitle>
      <CardReveal expand="group-hover:max-h-52 group-focus-within:max-h-52">
        <p className="pt-2 text-xs leading-relaxed text-primary-foreground/85">
          {TRAVEL_PLANNER_UMBRELLA.description}
        </p>
        <ul className="mt-2.5 space-y-1.5">
          {TRAVEL_PLANNER_UMBRELLA.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs font-semibold text-primary-foreground/85"
            >
              <CheckCircle2 className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </CardReveal>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground/90 transition-colors group-hover:text-gold">
        Learn More
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </span>
    </PhotoCard>
  )
}

// Every card, in order — the 5 services plus the Travel Planner umbrella —
// each wrapped as a render function so ServiceCard/UmbrellaCard's own props
// (notably `hidden`) can be applied per-slide below without re-deriving this
// list on every render.
const CARD_ITEMS = [
  ...SERVICES.map((s) => ({ key: s.title, render: (hidden) => <ServiceCard s={s} hidden={hidden} /> })),
  { key: 'umbrella', render: (hidden) => <UmbrellaCard hidden={hidden} /> },
]

// Grouped into pages of 3 — with 6 cards total that's an even 2 pages, but
// this stays correct if a card is ever added or removed (a trailing page
// just ends up with fewer than 3).
const PAGES = Array.from({ length: Math.ceil(CARD_ITEMS.length / PAGE_SIZE) }, (_, i) =>
  CARD_ITEMS.slice(i * PAGE_SIZE, i * PAGE_SIZE + PAGE_SIZE),
)

// The strip holds every page twice in a row, and the carousel only ever
// moves forward (right to left) along it. Once it has slid onto the second
// copy of a page, it jumps back to the identical first copy with the
// transition switched off — an invisible swap — so looping from the last
// group back to the first still slides right to left instead of rewinding
// the whole strip left to right.
const SLIDES = [...PAGES, ...PAGES]

export function Services() {
  // Position along SLIDES; `page` (0…PAGES.length - 1) is which group it is.
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  // Set when `index` last changed through the invisible loop-back jump
  // rather than a slide — see the autoplay effect.
  const jumpedRef = useRef(false)
  // Captured lazily at mount so the initial render already reflects the OS
  // setting (no extra render just to sync it) — the effect below only wires
  // up the listener for later changes.
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const page = index % PAGES.length

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (event) => setReduceMotion(event.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  // After sliding onto a page's second copy, wait for the slide to finish,
  // then jump back to its first copy with no transition.
  useEffect(() => {
    if (index < PAGES.length) return
    const id = setTimeout(() => {
      jumpedRef.current = true
      setAnimate(false)
      setIndex((i) => i - PAGES.length)
    }, SLIDE_MS)
    return () => clearTimeout(id)
  }, [index])

  // Switch the transition back on only once the jump has been painted, so
  // the jump itself never animates.
  useEffect(() => {
    if (animate) return
    let inner
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true))
    })
    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [animate])

  // Autoplay: each group stays still for STAY_MS once its slide has
  // finished, then the next group slides in — paused on hover/focus (so a
  // card can actually be read) and skipped entirely for
  // prefers-reduced-motion, same as the rest of the site's autoplaying
  // elements (see HeroVideoBackground). The loop-back jump is instant, and
  // the slide that led to it has already played out, so it only needs the
  // stay time.
  useEffect(() => {
    if (paused || reduceMotion || PAGES.length <= 1) return
    const delay = jumpedRef.current ? STAY_MS : SLIDE_MS + STAY_MS
    jumpedRef.current = false
    const id = setTimeout(() => setIndex((i) => i + 1), delay)
    return () => clearTimeout(id)
  }, [index, paused, reduceMotion])

  // Dots move forward to the chosen group too (wrapping round through the
  // duplicate copy when it comes "before" the current one), never back.
  const goToPage = (target) => {
    setIndex((current) =>
      current >= PAGES.length
        ? current // mid loop-back; the jump lands in a moment
        : current + ((target - (current % PAGES.length) + PAGES.length) % PAGES.length),
    )
  }

  return (
    <section id="services" className="overflow-hidden bg-cream pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionMark />
            <div className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
              <RevealText as="h2" text="Our" className="text-primary" />
              <RevealText
                as="h2"
                text="Services"
                delay={200}
                className="italic font-medium text-copper"
              />
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-right sm:text-base">
            One team, every practical detail — explore how we support your journey across Africa.
          </p>
        </Reveal>
      </div>

      {/* 3 cards at a time: every page sits full-width side by side and the
          whole strip slides left by one page width on each advance, so the
          next group of 3 enters from the right while the current group
          exits to the left. Full-bleed to both screen edges — same pattern
          as Tanzania's Popular Overland Routes cards — with a small lg:px-3
          gutter rather than lg:px-0 so the row doesn't read like it's been
          cut off flush against the edge. */}
      <div
        className="relative mt-10 px-4 sm:px-6 lg:px-3"
        role="group"
        aria-label="Our Services"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className={`flex ${animate ? 'transition-transform duration-700 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((group, slide) => (
            <div
              key={slide}
              className="grid w-full shrink-0 grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5"
            >
              {group.map((item) => (
                <div key={item.key}>{item.render(slide !== index)}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {PAGES.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {PAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show services group ${i + 1} of ${PAGES.length}`}
              aria-current={i === page}
              onClick={() => goToPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? 'w-6 bg-copper' : 'w-1.5 bg-primary/20 hover:bg-primary/40'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
