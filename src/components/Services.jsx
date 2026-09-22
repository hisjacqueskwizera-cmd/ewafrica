import { ArrowRight, CheckCircle2, Umbrella } from 'lucide-react'
import { SERVICES, TRAVEL_PLANNER_UMBRELLA } from '../data/siteContent.js'
import { AutoScrollTrack } from './AutoScrollTrack.jsx'
import { HashLink } from './HashLink.jsx'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'
import { SectionMark } from './SectionMark.jsx'

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
// `hidden` marks the strip's duplicated second copy of each card (see
// AutoScrollTrack, which renders `items` twice for a seamless loop) so
// assistive tech only ever hears each card once, and its link drops out of
// the tab order.
function PhotoCard({ to, image, hidden, children }) {
  return (
    <HashLink
      to={to}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      draggable={false}
      className="group relative block h-[350px] w-72 shrink-0 overflow-hidden bg-cocoa sm:h-[390px] sm:w-80 lg:w-[clamp(18rem,22vw-1rem,26rem)]"
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        draggable={false}
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

export function Services() {
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
        </Reveal>
      </div>

      {/* Same continuous, freely-draggable auto-scrolling strip as "Where we
          work / Explore our Destinations" below — see AutoScrollTrack.jsx. */}
      <div className="mt-10 px-4 sm:px-6 lg:px-3">
        <AutoScrollTrack
          items={CARD_ITEMS}
          itemKey={(item) => item.key}
          renderItem={(item, hidden) => item.render(hidden)}
          ariaLabel="Our Services"
          gapClassName="gap-4 lg:gap-5"
        />
      </div>
    </section>
  )
}
