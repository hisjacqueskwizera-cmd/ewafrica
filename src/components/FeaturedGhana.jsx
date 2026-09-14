import { ArrowRight, CalendarDays, Headphones, Home as HomeIcon, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GHANA_FEATURES } from '../data/siteContent.js'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'
import { SectionMark } from './SectionMark.jsx'

const ICONS = {
  Users,
  CalendarDays,
  Home: HomeIcon,
  Headphones,
}

// Full-bleed, edge to edge, the same photo-card language as Services and
// Explore Regions — square corners, the photo filling the whole frame, a
// scrim carrying the text — rather than the old inset rounded box with the
// photo pinned to a narrow side column.
export function FeaturedGhana() {
  return (
    <section className="relative overflow-hidden bg-cocoa text-primary-foreground">
      <Reveal big className="absolute inset-0">
        <img
          src="/Pictures/image_Ghana.webp"
          alt="The Kwame Nkrumah Memorial Park monument in Accra, Ghana"
          className="size-full object-cover object-[center_15%]"
        />
      </Reveal>
      <div
        className="absolute inset-0 bg-linear-to-b from-cocoa/40 via-cocoa/85 to-cocoa/95 lg:bg-linear-to-r lg:from-cocoa/95 lg:via-cocoa/80 lg:to-cocoa/20"
        aria-hidden="true"
      />

      {/* The country outline, floating over the photo on the open right
          side of the card — a slow, continuous bob (not scroll-tied) once
          it's scrolled/faded into view. Desktop only: there's no clear
          space for it once the content column takes the full width. */}
      <div
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block lg:right-12 xl:right-20"
        aria-hidden="true"
      >
        <Reveal big delay={300}>
          <img
            src="/Pictures/Flag-map_of_Ghana.png"
            alt=""
            className="w-44 animate-float drop-shadow-2xl xl:w-56"
          />
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="lg:max-w-xl">
          <Reveal>
            <SectionMark light />
            <span className="inline-flex w-fit items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gold backdrop-blur">
              Featured Country
            </span>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
              <RevealText as="span" text="" />{' '}
              <RevealText
                as="span"
                text="Ghana"
                delay={280}
                wordClassName="italic font-medium text-gold"
              />
            </h2>
          </Reveal>

          <Reveal delay={150} className="mt-5 max-w-xl space-y-4 text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
            <p>
              Ghana is one of West Africa's most welcoming and culturally rich destinations,
              where vibrant cities, historic coastal towns, beautiful beaches, traditional
              communities, and a powerful sense of heritage come together.
            </p>
            <p>
              Explore the energy of Accra, the history of Cape Coast and Elmina, the beauty
              of Ghana's coastline and countryside, and the traditions that make the country
              such a distinctive place to visit, live, and explore new opportunities.
            </p>
            <p>
              For many travelers especially members of the African diaspora Ghana offers
              something deeper: a chance to reconnect with history and heritage, build
              meaningful connections, and experience West Africa in a more personal way.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {GHANA_FEATURES.map((f, i) => {
              const Icon = ICONS[f.icon]
              return (
                <Reveal key={f.title} delay={250 + i * 100} className="flex items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-foreground/15 text-gold backdrop-blur">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-primary-foreground">{f.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-primary-foreground/65">
                      {f.text}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={650}>
            <Link
              to="/ghana"
              className="group mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
            >
              Explore Ghana Services
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 pb-10 sm:px-6 lg:px-8">
        <span
          className="hidden h-px max-w-24 flex-1 border-t border-dashed border-primary-foreground/30 sm:block"
          aria-hidden="true"
        />
        <p className="text-center text-sm font-bold text-primary-foreground sm:text-base">
          One-Stop. Many Solutions. Your Africa, Your Way.
        </p>
        <span
          className="hidden h-px max-w-24 flex-1 border-t border-dashed border-primary-foreground/30 sm:block"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
