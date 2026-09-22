import { ArrowRight, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { REGIONS } from '../data/siteContent.js'
import { HashLink } from './HashLink.jsx'
import { ImageSlideshow } from './ImageSlideshow.jsx'
import { PlaceholderArt } from './PlaceholderArt.jsx'
import { Reveal } from './Reveal.jsx'
import { CenteredSectionTitle } from './section-heading.jsx'

export function ExploreRegions() {
  // Captured once at mount, same as Reveal — a cycling background slideshow
  // is exactly the kind of motion prefers-reduced-motion asks us to skip, so
  // those viewers get the first slide as a still image instead.
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  return (
    <section id="explore" className="bg-cream pb-16 lg:pb-20">
      {/* Widened 360px past the usual max-w-7xl (180px per card) — the grid
          below splits this container into two equal columns via
          lg:grid-cols-2, so the extra room lands on each card evenly. */}
      <div className="mx-auto max-w-[1640px] px-4 sm:px-6 lg:px-8">
        <CenteredSectionTitle eyebrow="Regions" title="Explore East and West Africa" />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {REGIONS.map((region, i) => (
            <Reveal key={region.id} delay={i * 100}>
              <article className="group relative isolate h-full overflow-hidden shadow-card">
                {region.slides?.length > 0 && !reducedMotion ? (
                  <ImageSlideshow
                    images={region.slides}
                    className="transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
                  />
                ) : region.slides?.[0] ?? region.image ? (
                  <img
                    src={region.slides?.[0] ?? region.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
                  />
                ) : (
                  <PlaceholderArt
                    icon={MapPin}
                    tone={region.tone}
                    fill
                    className="transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]"
                  />
                )}
                <div
                  className="absolute inset-0 bg-linear-to-r from-cocoa/50 via-cocoa/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative flex min-h-[420px] flex-col justify-between p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-foreground transition-transform duration-[450ms] ease-out group-hover:-translate-y-2.5">
                      {region.name}
                    </h3>
                    <ul className="mt-5 space-y-2 text-sm text-primary-foreground/85">
                      {region.countries.map((country) =>
                        country.to ? (
                          <li key={country.name}>
                            <Link
                              to={country.to}
                              className="inline-flex items-center gap-1.5 font-bold text-gold"
                            >
                              <img
                                src="/Pictures/location.webp"
                                alt=""
                                aria-hidden="true"
                                className="size-3.5 shrink-0 invert"
                              />
                              {country.name}
                              <span className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
                                Featured
                              </span>
                            </Link>
                          </li>
                        ) : (
                          <li key={country.name} className="flex items-center gap-1.5">
                            <img
                              src="/Pictures/location.webp"
                              alt=""
                              aria-hidden="true"
                              className="size-3.5 shrink-0 invert"
                            />
                            {country.name}
                          </li>
                        ),
                      )}
                      {region.more && (
                        <li className="italic text-primary-foreground/60">{region.more}</li>
                      )}
                    </ul>
                  </div>

                  <HashLink
                    to={region.to}
                    className="group/cta mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-copper py-1.5 pl-6 pr-1.5 text-sm font-semibold text-copper transition-colors hover:bg-copper hover:text-copper-foreground"
                  >
                    Explore {region.name}
                    <span className="grid size-8 place-items-center rounded-full bg-copper text-copper-foreground transition-colors group-hover/cta:bg-copper-foreground group-hover/cta:text-copper">
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </HashLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
