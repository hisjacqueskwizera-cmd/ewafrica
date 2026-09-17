import { ChevronRight, Clock, Info, Mail, Search, ShieldCheck } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_INFO, GHANA_RIGHT_OF_ABODE_FLOW, GHANA_RIGHT_OF_ABODE_PAGE } from '../data/siteContent.js'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { WhatsAppIcon } from '../components/social-icons.jsx'
import { PlannerBackground } from '../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../components/travel-planner/PlannerSidebar.jsx'

const ICONS = { Clock, Mail, ShieldCheck, Search }

export function RightOfAbodeGuidance() {
  useEffect(() => {
    document.title = 'Right of Abode Guidance | East-West Africa Link'
  }, [])

  const {
    hero,
    intro,
    whoFor,
    whatCanInclude,
    howItWorks,
    whatYouReceive,
    delivery,
    importantToKnow,
    sidebar,
    stats,
    closing,
  } = GHANA_RIGHT_OF_ABODE_PAGE

  const requestHref = '/ghana/right-of-abode-guidance/request'

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
          <span className="font-semibold text-primary">Right of Abode Guidance</span>
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
                <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {whoFor.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={125} className="mt-10">
                <h2 className="text-lg font-bold text-primary">{whatCanInclude.heading}</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {whatCanInclude.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={150} className="mt-10">
                <h2 className="text-lg font-bold text-primary">{howItWorks.heading}</h2>
                <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {howItWorks.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={165} className="mt-10">
                <h2 className="text-lg font-bold text-primary">{whatYouReceive.heading}</h2>
                <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {whatYouReceive.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={190} className="mt-10 grid gap-6 rounded-3xl bg-cream p-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                    <Mail className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-primary">Delivery</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{delivery}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
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
                </div>
              </Reveal>

              {/* Need help before purchasing? */}
              <Reveal
                delay={200}
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
              photo="/Pictures/image_Ghana.webp"
              photoAlt="Cape Coast Castle overlooking the Ghanaian coastline"
              price={GHANA_RIGHT_OF_ABODE_FLOW.price}
              includes={GHANA_RIGHT_OF_ABODE_FLOW.includes}
              includesHeading="Right of Abode Guidance Includes"
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
