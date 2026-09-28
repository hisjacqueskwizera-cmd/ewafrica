import { ArrowRight, Camera, CheckCircle2, Handshake, Info, UtensilsCrossed } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BottomSheetModal } from '../components/BottomSheetModal.jsx'
import { CountrySubNav } from '../components/CountrySubNav.jsx'
import { GHANA_GUIDE_PAGES, GhanaGuideFooterNav } from '../components/GhanaGuidePager.jsx'
import { GhanaGuideSubHero } from '../components/GhanaGuideSubHero.jsx'
import { GuidePageSubNav } from '../components/GuidePageSubNav.jsx'
import { HashLink } from '../components/HashLink.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { GHANA_DATA } from '../data/ghanaContent.js'

const ICONS = { Handshake, Camera }

// Page 2 of 3 in the Ghana Practical Guide — "Experience Ghana": where to
// go, what to eat, and the culture/etiquette and photography notes that
// round out the picture. Before-you-travel logistics live on page 1;
// safety/overland/packing on page 3.
export function GhanaPracticalGuideExperience() {
  useEffect(() => {
    document.title = 'Ghana Practical Guide — Experience Ghana | East-West Africa Link'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const { topPlaces, taste, cultureEtiquette, photography } = GHANA_DATA

  const [selectedPlace, setSelectedPlace] = useState(null)

  return (
    <div className="bg-background min-h-screen">
      <GhanaGuideSubHero
        page={2}
        heading="Experience Ghana"
        tagline="History. Culture. Nature. People. A journey worth taking."
        image="/Pictures/Ghana_card_Background.JPG"
        imageAlt="Cape Coast Castle overlooking the Atlantic at sunset"
      />

      <CountrySubNav
        slug="ghana"
        countryName="Ghana"
        practicalGuideTo="/ghana/practical-guide#guide-overview"
      />

      <GuidePageSubNav pages={GHANA_GUIDE_PAGES} guideLabel="Ghana Practical Guide" />

      {/* Where to Go */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {topPlaces.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {topPlaces.subheading}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topPlaces.places.map((place, idx) => (
              <Reveal key={place.id} delay={idx * 70} className="flex h-full">
                <article
                  id={place.id}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-sand">
                    <img
                      src={place.image}
                      alt={place.name}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"
                      aria-hidden="true"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-cocoa/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-xs">
                      {place.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="font-display text-base font-bold text-primary">
                        {place.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {place.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPlace(place)}
                      className="btn-copper mt-5 w-full cursor-pointer justify-center text-xs py-2.5"
                    >
                      Learn More
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* A Taste of Ghana */}
      <section className="border-y border-border/50 bg-cream/50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {taste.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {taste.subheading}
            </p>
          </Reveal>

          <Reveal big className="mt-10 overflow-hidden rounded-3xl shadow-card">
            <img
              src={taste.image}
              alt={taste.imageAlt ?? ''}
              loading="lazy"
              className="aspect-[21/9] w-full object-cover"
            />
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {taste.dishes.map((dish, idx) => (
              <Reveal key={dish.title} delay={idx * 90} className="flex h-full">
                <div className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-sand">
                    <img
                      src={dish.image}
                      alt={dish.imageAlt ?? dish.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 left-3 grid size-9 place-items-center rounded-full bg-cocoa/85 text-primary-foreground backdrop-blur-xs">
                      <UtensilsCrossed className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6 sm:p-7">
                    <h3 className="font-display text-lg font-bold text-primary">{dish.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {dish.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={taste.dishes.length * 90} className="mt-8">
            <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-copper/30 bg-cream p-4 sm:p-5">
              <Info className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{taste.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Culture & Etiquette + Photography */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {[cultureEtiquette, photography].map((block, idx) => {
              const Icon = ICONS[block.icon] || Info
              return (
                <Reveal key={block.heading} delay={idx * 100}>
                  <div className="h-full rounded-3xl bg-card p-6 shadow-card sm:p-7">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sand/70 text-copper">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold text-primary">
                      {block.heading}
                    </h3>
                    <div className="mt-3 space-y-3">
                      {block.paragraphs.map((p) => (
                        <p key={p} className="text-sm leading-relaxed text-muted-foreground">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <div className="mt-14">
            <GhanaGuideFooterNav current={1} />
          </div>
        </div>
      </section>

      {/* --- Modal: Place details --- */}
      {selectedPlace && (
        <BottomSheetModal
          open={Boolean(selectedPlace)}
          onClose={() => setSelectedPlace(null)}
          title={selectedPlace.name}
          eyebrow={selectedPlace.tag}
        >
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="aspect-16/9 w-full object-cover"
              />
            </div>

            <div>
              <h4 className="font-display text-base font-bold text-primary">Overview &amp; Highlights</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {selectedPlace.details.highlight}
              </p>
            </div>

            <div className="rounded-xl bg-sand/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-copper">
                Best Season to Visit
              </p>
              <p className="mt-1 text-xs sm:text-sm text-primary">
                {selectedPlace.details.bestSeason}
              </p>
            </div>

            <div>
              <h4 className="font-display text-base font-bold text-primary">Top Activities &amp; Experiences</h4>
              <ul className="mt-3 space-y-2">
                {selectedPlace.details.activities.map((act) => (
                  <li key={act} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-copper/30 bg-cream p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Practical Traveler Tip
              </p>
              <p className="mt-1 text-xs sm:text-sm italic text-muted-foreground">
                "{selectedPlace.details.practicalTip}"
              </p>
            </div>

            <div className="pt-2">
              <HashLink
                to="/travel-planner?destination=ghana"
                className="btn-copper w-full justify-center text-xs py-3"
              >
                Plan a Trip to {selectedPlace.name}
                <ArrowRight className="size-4" aria-hidden="true" />
              </HashLink>
            </div>
          </div>
        </BottomSheetModal>
      )}
    </div>
  )
}
