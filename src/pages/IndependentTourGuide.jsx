import { ArrowRight, Compass, Mail, ShieldCheck, Users } from 'lucide-react'
import { useEffect } from 'react'
import { CONTACT_INFO, COUNTRIES, TOUR_GUIDE_LANDING_PAGE } from '../data/siteContent.js'
import { HashLink } from '../components/HashLink.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { WhatsAppIcon } from '../components/social-icons.jsx'

const ICONS = { Users, ShieldCheck, Compass }

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

      {/* Trust row */}
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

      {/* Choose Your Destination */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {intro.heading}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {intro.description}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 text-left lg:grid-cols-3">
            {destinations.map((dest, i) => {
              const country = COUNTRIES.find((c) => c.slug === dest.slug)
              return (
                <Reveal key={dest.slug} delay={i * 100}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-card">
                    <div className="aspect-4/3 overflow-hidden">
                      <img
                        src={country?.image}
                        alt={dest.label ?? country?.name ?? ''}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-xl font-bold text-primary">
                        {dest.label ?? country?.name}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {dest.description}
                      </p>
                      <span className="mt-4 inline-flex w-fit items-center rounded-full bg-sand px-3 py-1 text-xs font-semibold text-cocoa">
                        {destinationBadge}
                      </span>
                      <HashLink
                        to={`/independent-tour-guide/${dest.slug}`}
                        className="btn-copper mt-5 w-full justify-center"
                      >
                        View Details
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </HashLink>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Guide Network is Coming Soon */}
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
