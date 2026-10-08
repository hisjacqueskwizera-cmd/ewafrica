import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Handshake,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useEffect } from 'react'
import { CONTACT_INFO, COUNTRIES, TOUR_GUIDE_LANDING_PAGE } from '../data/siteContent.js'
import { HashLink } from '../components/HashLink.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { WhatsAppIcon } from '../components/social-icons.jsx'

const ICONS = { Users, ShieldCheck, Compass }
const GUIDE_MATCH_ICONS = {
  Users,
  Phone,
  MessageCircle,
  Handshake,
  CheckCircle2,
}

const GUIDE_MATCH_STEPS = [
  {
    title: 'Tell Us About Your Trip',
    description: 'Share your travel details, interests, travel style and any special requests on our request form.',
    icon: 'Users',
  },
  {
    title: 'Optional 20-Minute Phone Conversation',
    description: 'After reviewing your request, we offer an optional 20-minute phone conversation to clarify your needs.',
    icon: 'Phone',
  },
  {
    title: 'We Speak With the Guide',
    description: 'We contact the selected guide and share your travel details so they understand your interests and expectations.',
    icon: 'MessageCircle',
  },
  {
    title: 'We Make the Introduction',
    description: 'We introduce you to the guide by email, including their contact information and relevant details.',
    icon: 'Handshake',
  },
  {
    title: 'You Communicate Directly With the Guide',
    description: 'You then communicate directly with the guide to discuss activities, itinerary details, pricing and arrangements for your trip.',
    icon: 'CheckCircle2',
  },
]

const GUIDE_BENEFITS = [
  {
    title: 'Vetted Guides',
    text: 'Experienced, independent guides we trust.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Local Knowledge',
    text: 'Real insights and authentic experiences.',
    icon: 'Compass',
  },
  {
    title: 'Direct Connection',
    text: 'You work directly with the guide for your trip.',
    icon: 'Users',
  },
  {
    title: 'A Deeper Experience',
    text: 'Go beyond the major tourist sites.',
    icon: 'Handshake',
  },
]

// The generic entry point into the Independent Tour Guide service — for a
// visitor arriving with no country context (the homepage services card,
// for instance). Every "Independent Tour Guide" link that already knows
// which country it's on (Ghana.jsx, Benin.jsx, Tanzania's DestinationPage)
// skips this page entirely and goes straight to that country's own detail
// page — see the ?destination-style locking note on TravelPlanner.jsx for
// the same pattern applied there.
export function IndependentTourGuide() {
  useEffect(() => {
    document.title = 'Independent Tour Guides | East-West Africa Link'
  }, [])

  const { hero, trust, intro, destinationBadge, destinations, comingSoon } = TOUR_GUIDE_LANDING_PAGE

  return (
    <>
      <PageIntro {...hero} />

      <section className="border-b border-border py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 sm:grid-cols-3 lg:px-8">
          {trust.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal key={item.title} className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-[#f7f3ee] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-3xl font-bold text-primary sm:text-4xl lg:text-[3.25rem]">
              {intro.heading}
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {intro.description}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 text-left sm:grid-cols-2 md:grid-cols-4">
            {destinations.map((dest, i) => {
              const country = COUNTRIES.find((c) => c.slug === dest.slug)
              const destPath = `/independent-tour-guide/${dest.slug}`

              return (
                <Reveal key={dest.slug} delay={i * 100}>
                  <HashLink
                    to={destPath}
                    className="group block h-full overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-transform duration-200 hover:-translate-y-1"
                  >
                    <article className="flex h-full flex-col">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={dest.image ?? country?.image}
                          alt={dest.label ?? country?.name ?? 'Guide destination'}
                          loading="lazy"
                          className="size-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-2">
                          <img
                            src={country?.flag || country?.image}
                            alt=""
                            className="h-5 w-auto rounded-[4px] object-cover ring-1 ring-border"
                          />
                          <h2 className="text-xl font-bold text-primary">
                            {dest.label ?? country?.name}
                          </h2>
                        </div>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {dest.description}
                        </p>
                        <span className="mt-4 inline-flex w-fit items-center rounded-full bg-sand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-cocoa">
                          {destinationBadge}
                        </span>
                        <span className="btn-copper mt-5 w-full justify-center">
                          {dest.label ?? country?.name}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </span>
                      </div>
                    </article>
                  </HashLink>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ee] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl lg:text-[3rem]">
              How the Guide Match Works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A simple, step-by-step process to connect you with the right local guide.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-5">
            {GUIDE_MATCH_STEPS.map((step, index) => {
              const Icon = GUIDE_MATCH_ICONS[step.icon]
              return (
                <Reveal key={step.title} delay={index * 100} className="h-full">
                  <div className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-[#EFE1C4] p-4 shadow-sm">
                    <div className="mb-4 flex items-center gap-2 text-copper">
                      <span className="grid size-8 place-items-center rounded-full bg-cocoa text-sm font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      {index < GUIDE_MATCH_STEPS.length - 1 && (
                        <ArrowRight className="size-4 text-copper/80" aria-hidden="true" />
                      )}
                    </div>

                    <div className="mb-4 flex items-center justify-center">
                      <span className="grid size-12 place-items-center rounded-full bg-forest/10 text-forest">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                    </div>

                    <h3 className="text-center text-base font-bold text-primary">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[#f7f3ee] py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
          {GUIDE_BENEFITS.map((item) => {
            const Icon = GUIDE_MATCH_ICONS[item.icon] ?? ICONS[item.icon]
            return (
              <Reveal key={item.title} className="rounded-2xl border border-border bg-[#EFE1C4] p-5 text-left shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-forest/10 text-forest">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-primary">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-cocoa text-primary-foreground">
        <img
          src="/images/countries/rwanda.webp"
          alt="Rwanda landscape"
          className="absolute inset-0 size-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-r from-cocoa/80 via-cocoa/60 to-cocoa/30" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-[3rem]">
              Ready to Find a Local Guide?
            </p>
            <p className="mt-3 text-base text-primary-foreground/80 sm:text-lg">
              Choose a destination above to meet our guides and start your request.
            </p>
          </div>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-white px-6 py-3 text-base font-semibold text-cocoa transition hover:-translate-y-0.5"
          >
            Explore Guide Destinations
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="border-t border-border bg-cream py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4 sm:items-center">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                <Users className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-base font-bold text-primary">{comingSoon.heading}</p>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {comingSoon.body}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:items-center">
              <div className="flex shrink-0 -space-x-2">
                <a
                  href={CONTACT_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with us on WhatsApp"
                  className="grid size-11 place-items-center rounded-full border-2 border-cream bg-forest text-primary-foreground"
                >
                  <WhatsAppIcon className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={CONTACT_INFO.emailHref}
                  aria-label="Email us"
                  className="grid size-11 place-items-center rounded-full border-2 border-cream bg-cocoa text-primary-foreground"
                >
                  <Mail className="size-4" aria-hidden="true" />
                </a>
              </div>
              <div>
                <p className="text-base font-bold text-primary">{comingSoon.contactHeading}</p>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {comingSoon.contactBody}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
