import { CheckCircle2, ChevronRight, ClipboardList, Clock, Mail, Search, ShieldCheck, Users } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GHANA_RELOCATION_FLOW, GHANA_RELOCATION_PAGE } from '../data/siteContent.js'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { PlannerBackground } from '../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../components/travel-planner/PlannerSidebar.jsx'

const ICONS = { Clock, Mail, ShieldCheck, Search }

export function RelocationPackage() {
  useEffect(() => {
    document.title = 'Complete Relocation Package | East-West Africa Link'
  }, [])

  const { hero, about, whatYouReceive, fullDetailsBand, sidebar, stats, closing } = GHANA_RELOCATION_PAGE

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
          <span className="font-semibold text-primary">Complete Relocation Package</span>
        </div>
      </div>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <Reveal className="flex items-center gap-2.5">
                <Users className="size-5 text-copper" aria-hidden="true" />
                <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                  {about.heading}
                </h1>
              </Reveal>
              <Reveal delay={80} className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Reveal>

              <Reveal delay={125} className="mt-10">
                <h2 className="flex items-center gap-2.5 text-lg font-bold text-primary">
                  <CheckCircle2 className="size-5 text-forest" aria-hidden="true" />
                  {whatYouReceive.heading}
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {whatYouReceive.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal
                delay={165}
                className="mt-10 flex flex-col gap-4 rounded-3xl bg-cocoa p-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                    <ClipboardList className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold">{fullDetailsBand.heading}</h3>
                    <p className="mt-1 max-w-md text-sm text-primary-foreground/80">{fullDetailsBand.text}</p>
                  </div>
                </div>
                <Link
                  to={fullDetailsBand.cta.to}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5"
                >
                  {fullDetailsBand.cta.label}
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>

            <PlannerSidebar
              heading={sidebar.title}
              photo="/Pictures/explore/ghana-card-background.webp"
              photoAlt="Cape Coast Castle overlooking the Ghanaian coastline at sunset"
              price={GHANA_RELOCATION_FLOW.price}
              includes={GHANA_RELOCATION_FLOW.includes}
              includesHeading="Complete Relocation Package Includes"
              caption={[sidebar.tagline]}
              primaryCta={{ label: 'See Full Package Details', to: fullDetailsBand.cta.to }}
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
