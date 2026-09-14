import {
  ArrowRight,
  Backpack,
  Compass,
  FileText,
  Globe2,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { useEffect } from 'react'
import { ABOUT_PAGE } from '../data/siteContent.js'
import { HashLink } from '../components/HashLink.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { SectionMark } from '../components/SectionMark.jsx'

const ICONS = {
  Globe2,
  FileText,
  Handshake,
  ShieldCheck,
  Backpack,
  Lightbulb,
}

export function AboutUs() {
  useEffect(() => {
    document.title = 'About Us | East-West Africa Link'
  }, [])

  const { hero, mission, approach, founder, trust, closing } = ABOUT_PAGE

  return (
    <>
      {/* The hero now carries what used to be a separate "Who We Are"
          section (eyebrow, heading, tagline row, paragraph) directly — see
          the comment on ABOUT_PAGE.hero in siteContent.js. */}
      <PageIntro {...hero} />

      {/* Our Mission & Our Approach — a light checkerboard layout (cream
          background, not the dark full-bleed photo treatment used
          elsewhere): text/photo on the top row, photo/text on the bottom
          row, so each block sits diagonally opposite its matching photo.
          py-[139px]/py-[171px] is the old py-16/py-24 +75px each side
          (+150px total section height).

          Each row is its own flex row (not a shared 2-col grid) so the
          image can take a fixed, wider lg:w-[666px] — 150px over the
          ~516px it rendered at as a plain 1fr grid column — while its
          paired text just flexes to fill what's left, instead of both
          sharing one equal-width column. */}
      <section className="bg-cream py-[139px] lg:py-[171px]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
            <Reveal from="left" className="lg:flex-1">
              <span className="grid size-14 place-items-center rounded-full border-2 border-copper text-copper">
                <Target className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                Our Mission
              </h2>
              <span className="mt-3 block h-1 w-16 rounded-full bg-copper" aria-hidden="true" />
              <div className="mt-5 space-y-4 text-sm leading-relaxed sm:text-base">
                <p className="font-bold text-copper">{mission.lead}</p>
                {mission.body.map((paragraph) => (
                  <p key={paragraph} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal
              from="right"
              className="overflow-hidden rounded-2xl shadow-card lg:w-[666px] lg:shrink-0"
            >
              <img
                src={mission.image}
                alt={mission.imageAlt}
                loading="lazy"
                className="aspect-4/3 size-full object-cover"
              />
            </Reveal>
          </div>

          <div className="mt-10 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:items-center lg:gap-14">
            <Reveal
              from="left"
              className="overflow-hidden rounded-2xl shadow-card lg:w-[666px] lg:shrink-0"
            >
              <img
                src={approach.image}
                alt={approach.imageAlt}
                loading="lazy"
                className="aspect-4/3 size-full object-cover"
              />
            </Reveal>

            <Reveal from="right" className="lg:flex-1">
              <span className="grid size-14 place-items-center rounded-full border-2 border-copper text-copper">
                <Compass className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                Our Approach
              </h2>
              <span className="mt-3 block h-1 w-16 rounded-full bg-copper" aria-hidden="true" />
              <div className="mt-5 space-y-4 text-sm leading-relaxed sm:text-base">
                {approach.body.map((paragraph) => (
                  <p key={paragraph} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
                <p className="font-bold text-primary">{approach.closing}</p>
              </div>
            </Reveal>
          </div>

          {/* Anchors the Mission/Approach block with one CTA, the way the
              reference site's credentials section ends in a button. */}
          <Reveal delay={150} className="mt-14 flex justify-center lg:mt-20">
            <HashLink to="/#contact" className="btn-copper">
              Get Personalized Guidance
              <ArrowRight className="size-4" aria-hidden="true" />
            </HashLink>
          </Reveal>
        </div>
      </section>

      {/* Meet the Founder — the same photo-left/copy-right composition as
          the homepage's Founder teaser, expanded into the full bio plus two
          highlight callouts. This is what the homepage's "Read The Full
          Bio" button links to (/about#founder). */}
      <section id="founder" className="border-t border-border bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal from="left" className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-3xl shadow-lift">
                <img
                  src={founder.photo}
                  alt={founder.photoAlt}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover"
                />
              </div>
              <blockquote className="mt-6 font-display text-lg italic leading-snug text-muted-foreground">
                "{founder.quote}"
                <footer className="mt-2 text-sm font-bold not-italic text-primary">
                  — {founder.quoteAttribution}
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={120} className="min-w-0">
              <SectionMark />
              <span className="section-eyebrow">{founder.eyebrow}</span>
              <h2 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl lg:text-[2.75rem]">
                {founder.heading}
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {founder.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {founder.highlights.map((item) => {
                  const Icon = ICONS[item.icon]
                  return (
                    <div key={item.title}>
                      <span className="grid size-12 place-items-center rounded-full border-2 border-copper text-copper">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-lg font-bold text-primary">{item.title}</h3>
                      <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
                        {item.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        <p className="font-bold text-copper">{item.closing}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-cream py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {trust.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 text-center lg:px-6"
                >
                  <span className="grid size-12 place-items-center rounded-full border-2 border-copper text-copper">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* Closing banner — one full-bleed photo carrying the page's single
          closing CTA. */}
      <section className="relative isolate overflow-hidden">
        <img
          src={closing.image}
          alt={closing.imageAlt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-cocoa/90 via-cocoa/55 to-cocoa/20"
          aria-hidden="true"
        />
        <Reveal className="relative mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl lg:text-4xl">
            {closing.heading}
          </h2>
          <span
            className="mx-auto mt-3 block h-1 w-16 rounded-full bg-copper"
            aria-hidden="true"
          />
          <p className="mt-5 text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
            Every journey is different. Whether Africa is your next adventure, your future home, or
            a place where you are exploring new opportunities,{' '}
            <span className="font-bold text-primary-foreground">East-West Africa Link</span> is
            here to help you research, prepare, connect, and move forward with greater confidence.
          </p>
          <p className="mt-4 italic text-copper">{closing.tagline}</p>
        </Reveal>
      </section>
    </>
  )
}
