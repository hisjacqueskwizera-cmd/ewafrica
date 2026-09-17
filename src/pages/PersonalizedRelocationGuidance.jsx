import {
  BedDouble,
  Briefcase,
  Bus,
  CalendarClock,
  ChevronRight,
  Clock,
  HeartPulse,
  Home as HomeIcon,
  Info,
  Landmark,
  Mail,
  MessageCircleQuestion,
  Plane,
  Search,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CONTACT_INFO,
  GHANA_PERSONALIZED_RELOCATION_FLOW,
  GHANA_PERSONALIZED_RELOCATION_PAGE,
} from '../data/siteContent.js'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { WhatsAppIcon } from '../components/social-icons.jsx'
import { PlannerBackground } from '../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../components/travel-planner/PlannerSidebar.jsx'

const ICONS = {
  HomeIcon,
  BedDouble,
  Wallet,
  HeartPulse,
  Landmark,
  Bus,
  CalendarClock,
  Briefcase,
  Plane,
  MessageCircleQuestion,
  Clock,
  Mail,
  ShieldCheck,
  Search,
}

export function PersonalizedRelocationGuidance() {
  useEffect(() => {
    document.title = 'Personalized Relocation Guidance | East-West Africa Link'
  }, [])

  const {
    hero,
    intro,
    whoFor,
    mayInclude,
    whatMakesPersonalized,
    whatYouReceive,
    followUpSupport,
    howItWorks,
    delivery,
    importantToKnow,
    sidebar,
    stats,
    closing,
  } = GHANA_PERSONALIZED_RELOCATION_PAGE

  const requestHref = '/ghana/personalized-relocation-guidance/request'

  return (
    <>
      <PlannerBackground />
      <PageIntro {...hero} />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-copper">
            Home
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <Link to="/ghana" className="hover:text-copper">
            Ghana Exclusive
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="font-semibold text-primary">Personalized Relocation Guidance</span>
        </div>
      </div>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <Reveal>
                <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                  {intro.heading}
                </h1>
                <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {intro.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-10">
                <h2 className="text-lg font-bold text-primary">{whoFor.heading}</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {whoFor.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={125} className="mt-10">
                <h2 className="text-lg font-bold text-primary">{mayInclude.heading}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{mayInclude.intro}</p>
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-5">
                  {mayInclude.items.map((item) => {
                    const Icon = ICONS[item.icon]
                    return (
                      <div key={item.text} className="flex flex-col items-center gap-2 text-center">
                        <span className="grid size-12 place-items-center rounded-full border-2 border-copper text-copper">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <p className="text-xs font-bold text-primary">{item.text}</p>
                        <p className="text-[11px] leading-snug text-muted-foreground">{item.hint}</p>
                      </div>
                    )
                  })}
                </div>
              </Reveal>

              <Reveal delay={150} className="mt-10">
                <h2 className="text-lg font-bold text-primary">{whatMakesPersonalized.heading}</h2>
                <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {whatMakesPersonalized.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={165} className="mt-10 grid gap-6 rounded-3xl bg-cream p-6 sm:grid-cols-2 sm:p-8">
                <div>
                  <h3 className="text-sm font-bold text-primary">{whatYouReceive.heading}</h3>
                  <div className="mt-2 space-y-2 text-xs leading-relaxed text-muted-foreground">
                    {whatYouReceive.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    <p className="font-semibold text-primary">{delivery}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary">{followUpSupport.heading}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{followUpSupport.intro}</p>
                  <ul className="mt-2 space-y-1.5">
                    {followUpSupport.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-forest" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[11px] italic text-muted-foreground">{followUpSupport.note}</p>
                </div>
              </Reveal>

              <Reveal delay={190} className="mt-10">
                <h2 className="text-lg font-bold text-primary">{howItWorks.heading}</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-5">
                  {howItWorks.steps.map((step, i) => (
                    <div key={step.title} className="flex flex-col items-center gap-2 text-center">
                      <span className="grid size-9 place-items-center rounded-full bg-cocoa text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <p className="text-xs font-bold text-primary">{step.title}</p>
                      <p className="text-[11px] leading-snug text-muted-foreground">{step.text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={200} className="mt-10 flex items-start gap-3 rounded-3xl bg-cream p-6">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                  <Info className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-primary">{importantToKnow.heading}</h3>
                  {importantToKnow.paragraphs.map((p) => (
                    <p key={p} className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>

              {/* Need help before purchasing? */}
              <Reveal
                delay={225}
                className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center"
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
                  <p className="text-base font-bold text-primary">Need help before purchasing?</p>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                    General questions about our services, pricing, or how the website works can be sent
                    through WhatsApp or email.
                  </p>
                </div>
              </Reveal>
            </div>

            <PlannerSidebar
              heading={sidebar.title}
              photo="/Pictures/countries/Ghana.jpg"
              photoAlt="Independence Arch in Accra, Ghana"
              price={GHANA_PERSONALIZED_RELOCATION_FLOW.price}
              includes={GHANA_PERSONALIZED_RELOCATION_FLOW.includes}
              includesHeading="Personalized Relocation Guidance Includes"
              caption={[sidebar.tagline]}
              primaryCta={{ label: 'Start Your Request', to: requestHref }}
            />
          </div>

          {/* Stats row */}
          <Reveal delay={100} className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
            {stats.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                  <span className="grid size-11 place-items-center rounded-full border-2 border-copper text-copper">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-primary sm:text-sm">{item.title}</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">{item.text}</p>
                  </div>
                </div>
              )
            })}
          </Reveal>

          <Reveal delay={150} className="mt-12 text-center">
            <Link to="/ghana" className="text-sm font-semibold text-primary hover:text-copper">
              ← Back to Ghana
            </Link>
            <p className="mt-6 text-base italic text-muted-foreground">{closing}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
