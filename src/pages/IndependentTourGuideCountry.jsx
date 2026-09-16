import {
  Binoculars,
  CheckCircle2,
  ClipboardCheck,
  Handshake,
  Landmark,
  Leaf,
  Mail,
  Palmtree,
  Store,
  Users,
  Waves,
} from 'lucide-react'
import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { CONTACT_INFO, TOUR_GUIDE_PAGES } from '../data/siteContent.js'
import { HashLink } from '../components/HashLink.jsx'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { WhatsAppIcon } from '../components/social-icons.jsx'

const ICONS = { Users, Landmark, Leaf, Palmtree, Store, Waves, Handshake, Binoculars, ClipboardCheck }

// One shared template for every country that actually has the Independent
// Tour Guide service (see TOUR_GUIDE_PAGES in siteContent.js — currently
// Ghana, Benin and Tanzania/Zanzibar, the same three EXPLORE_SERVICES_WITH_
// GUIDES already covers). Reached either directly (from that country's own
// page — see the CTA wiring in Ghana.jsx/Benin.jsx/DestinationPage.jsx) or
// via the generic landing page's "View Details" card.
export function IndependentTourGuideCountry() {
  const { slug } = useParams()
  const data = TOUR_GUIDE_PAGES[slug]

  useEffect(() => {
    if (data) document.title = `Independent Tour Guides — ${data.countryLabel} | East-West Africa Link`
  }, [data])

  if (!data) return <Navigate to="/independent-tour-guide" replace />

  const { hero, stats, intro, offer, vetting, howItWorks, comingSoon, countryLabel } = data

  return (
    <>
      <PageIntro {...hero} />

      {/* Stats row */}
      <section className="border-b border-border py-10 lg:py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <Reveal key={item.title} className="flex flex-col items-center gap-2 text-center">
                <span className="grid size-11 place-items-center rounded-full border-2 border-copper text-copper">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-primary sm:text-sm">{item.title}</h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">{item.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Independent Guide Network in Development */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <p className="section-eyebrow">{intro.eyebrow}</p>
              <h1 className="mt-3 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                {intro.heading}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {intro.body}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <img
                src={intro.image}
                alt={intro.imageAlt}
                loading="lazy"
                className="aspect-4/3 w-full rounded-2xl object-cover shadow-card"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What the Service Will Offer */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">{offer.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {offer.intro}
              </p>
              <p className="mt-3 text-sm font-semibold text-primary">{offer.lead}</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {offer.items.map((item) => {
                  const Icon = ICONS[item.icon]
                  return (
                    <div key={item.text} className="flex items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest/15 text-forest">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <p className="pt-1.5 text-sm leading-snug text-primary">{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Vetting Approach / How Guide Match Will Work / Coming Soon */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            <Reveal>
              <h2 className="text-lg font-bold text-primary">{vetting.heading}</h2>
              <div className="mt-2 h-px w-10 bg-copper" aria-hidden="true" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{vetting.intro}</p>
              <ul className="mt-4 space-y-2.5">
                {vetting.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-primary">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-lg font-bold text-primary">{howItWorks.heading}</h2>
              <div className="mt-2 h-px w-10 bg-copper" aria-hidden="true" />
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {howItWorks.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p>
                  <span className="font-bold text-primary">{howItWorks.feeNoteLead}</span>{' '}
                  {howItWorks.feeNoteRest}
                </p>
              </div>
              <img
                src={howItWorks.image}
                alt={howItWorks.imageAlt}
                loading="lazy"
                className="mt-5 aspect-video w-full rounded-2xl object-cover shadow-card"
              />
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-2xl bg-cream p-6">
                <h2 className="text-lg font-bold text-primary">Coming Soon</h2>
                <div className="mt-2 h-px w-10 bg-copper" aria-hidden="true" />
                <p className="mt-4 text-sm font-bold text-primary">{comingSoon.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {comingSoon.body}
                </p>
                <div className="mt-5 rounded-2xl border border-border bg-card p-5">
                  <Mail className="size-5 text-copper" aria-hidden="true" />
                  <HashLink to="/#contact" className="btn-copper mt-3 w-full justify-center">
                    {comingSoon.cta}
                  </HashLink>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {comingSoon.subtext}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Need help before purchasing? */}
          <Reveal
            delay={250}
            className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center"
          >
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
              <p className="text-base font-bold text-primary">Questions about {countryLabel}?</p>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                General questions about our services, pricing, or how the website works can be sent
                through WhatsApp or email.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
