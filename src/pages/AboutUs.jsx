import { ArrowRight, FileText, Globe2, Handshake, ShieldCheck } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ABOUT_PAGE } from '../data/siteContent.js'
import { HashLink } from '../components/HashLink.jsx'
import { HeroVideoBackground } from '../components/HeroVideoBackground.jsx'
import { Reveal } from '../components/Reveal.jsx'

const ICONS = { Globe2, FileText, Handshake, ShieldCheck }

// Shared type scale for the page's editorial layout: light-weight display
// headings (36px → 50px) and generous 18px body copy on desktop.
const HEADING = 'font-display text-[2.25rem] font-normal leading-[1.2] lg:text-[3.125rem]'
const BODY = 'text-base leading-[1.6] lg:text-lg lg:leading-[1.5]'

// Every section heading sets its last word in italic — the roman/italic
// pairing that runs through the page's display type.
function AccentHeading({ as: Tag = 'h2', text, className = '' }) {
  const split = text.lastIndexOf(' ')
  return (
    <Tag className={className}>
      {split === -1 ? (
        <em>{text}</em>
      ) : (
        <>
          {text.slice(0, split)} <em>{text.slice(split + 1)}</em>
        </>
      )}
    </Tag>
  )
}

// Full-width cocoa band: heading on the left, right-aligned copy and a
// single outline CTA on the right (stacked on small screens).
function Band({ heading, cta, children }) {
  return (
    <section className="bg-cocoa px-[30px] py-[120px] text-primary-foreground lg:py-[100px]">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
        <Reveal className="lg:w-1/2">
          <AccentHeading text={heading} className={`${HEADING} max-w-[544px]`} />
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-10 lg:w-1/2 lg:items-end lg:text-right">
          <div className={`space-y-4 lg:max-w-[632px] ${BODY}`}>{children}</div>
          {cta}
        </Reveal>
      </div>
    </section>
  )
}

export function AboutUs() {
  useEffect(() => {
    document.title = 'About Us | East-West Africa Link'
  }, [])

  const { hero, mission, approach, founder, trust, closing } = ABOUT_PAGE
  const [styleOfTravel, whyCreated] = founder.highlights

  return (
    <>
      {/* Hero — full-screen video with just a breadcrumb and the page title,
          centered. The header sits transparent over it (see
          TRANSPARENT_HERO_ROUTES in Header.jsx). */}
      <section className="relative isolate flex h-svh min-h-[600px] items-center overflow-hidden px-10 text-left text-primary-foreground lg:px-16">
        <HeroVideoBackground />
        <div className="absolute inset-0 z-[3] bg-cocoa/45" aria-hidden="true" />
        <div className="relative z-[4] w-full max-w-5xl">
          <Reveal delay={150} blur>
            <div className="mt-9 max-w-3xl">
              <AccentHeading
                as="h1"
                text={hero.titleLine1}
                className="font-display text-[3rem] font-normal leading-[1.1] text-balance text-white sm:text-[4rem] lg:text-[5.375rem]"
              />
              <p className="mt-6 max-w-[640px] text-base leading-[1.7] text-primary-foreground/90 md:text-lg">
                East-West Africa Link was founded from decades of firsthand travel and experience
                across the African continent from North Africa to West, East, Central and Southern
                Africa, with a focus on practical guidance, trusted local connections, and helping
                people navigate Africa with confidence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Mission — tall photo left, copy right (photo first on mobile). */}
      <section className="px-[30px] pt-[120px] lg:pt-[200px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <img
            src={mission.image}
            alt={mission.imageAlt}
            loading="lazy"
            className="aspect-square w-full object-cover lg:aspect-[2/3]"
          />
          <Reveal className="lg:self-center">
            <AccentHeading text="Our Mission" className={`${HEADING} text-cocoa`} />
            <div className={`mt-10 max-w-[600px] space-y-4 text-cocoa lg:mt-[76px] ${BODY}`}>
              <p className="italic">{mission.lead}</p>
              {mission.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <HashLink
              to="/about#founder"
              className="mt-10 inline-flex items-center gap-2 border-b border-cocoa/50 pb-1 text-base text-cocoa transition-colors hover:border-cocoa lg:text-lg"
            >
              Meet the Founder
              <ArrowRight className="size-4" aria-hidden="true" />
            </HashLink>
          </Reveal>
        </div>
      </section>

      {/* Our Approach — copy with a wide photo beneath it on the left, one
          tall photo filling the right column (desktop only). The cocoa band
          follows straight on from the bottom of the photos. */}
      <section className="px-[30px] pt-[120px] lg:pt-[200px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-[50px]">
          <div className="flex flex-col">
            <Reveal>
              <AccentHeading text="Our Approach" className={`${HEADING} text-cocoa`} />
              <div className={`mt-10 max-w-[600px] space-y-4 text-cocoa lg:mt-[76px] ${BODY}`}>
                {approach.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="italic">{approach.closing}</p>
              </div>
            </Reveal>
            <div className="mt-12 lg:mt-auto lg:pt-20">
              <img
                src={approach.image}
                alt={approach.imageAlt}
                loading="lazy"
                className="aspect-square w-full object-cover lg:aspect-video"
              />
            </div>
          </div>
          <img
            src={approach.featureImage}
            alt={approach.featureImageAlt}
            loading="lazy"
            className="hidden size-full object-cover lg:block"
          />
        </div>
      </section>

      

      {/* Meet the Founder — photo left, bio and quote right. The homepage's
          "Read The Full Bio" button links here (/about#founder). The photo
          keeps its own wide shape on desktop (and stays in view beside the
          bio) rather than being enlarged into a tall crop. */}
      <section id="founder" className="px-[30px] py-[120px] lg:pt-[200px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-[50px]">
          <img
            src={founder.photo}
            alt={founder.photoAlt}
            loading="lazy"
            className="aspect-square w-full object-cover lg:sticky lg:top-28 lg:aspect-auto lg:self-start"
          />
          <Reveal className="lg:pt-9">
            <span className="section-eyebrow">{founder.eyebrow}</span>
            <AccentHeading text={founder.heading} className={`mt-3 ${HEADING} text-cocoa`} />
            <div className={`mt-10 max-w-[600px] space-y-4 text-cocoa lg:mt-[76px] ${BODY}`}>
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote className="mt-10 max-w-[600px] border-l border-cocoa/40 pl-6 font-display text-2xl italic leading-snug text-cocoa">
              “{founder.quote}”
              <footer className="mt-3 font-sans text-sm not-italic text-cocoa/80">
                — {founder.quoteAttribution}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      
      {/* Full-bleed photo feature — copy anchored bottom-left, CTA
          bottom-right. */}
      <section className="relative isolate flex min-h-[800px] items-end overflow-hidden px-[30px] lg:px-10">
        <img
          src={styleOfTravel.image}
          alt={styleOfTravel.imageAlt}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-t from-cocoa/85 via-cocoa/40 to-cocoa/10"
          aria-hidden="true"
        />
        <div className="flex w-full flex-col gap-10 pb-[100px] text-primary-foreground lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-[564px]">
            <AccentHeading
              text={styleOfTravel.title}
              className="font-display text-[2rem] font-normal leading-none lg:text-[2.625rem]"
            />
            <div className={`mt-6 space-y-4 ${BODY}`}>
              {styleOfTravel.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="italic">{styleOfTravel.closing}</p>
            </div>
          </Reveal>
          <HashLink to="/explore" className="btn-outline-light w-fit shrink-0 px-8 text-sm">
            Explore Destinations
          </HashLink>
        </div>
      </section>

      <Band
        heading={whyCreated.title}
        cta={
          <HashLink to="/#contact" className="btn-outline-light w-fit px-8 text-sm">
            Contact Us
          </HashLink>
        }
      >
        {whyCreated.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="italic">{whyCreated.closing}</p>
      </Band>
    </>
  )
}
