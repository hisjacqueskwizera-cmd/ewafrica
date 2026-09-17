import {
  Briefcase,
  Bus,
  ChevronRight,
  Clock,
  Globe2,
  Headphones,
  Home as HomeIcon,
  Mail,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GHANA_RELOCATION_DETAILS_PAGE, GHANA_RELOCATION_FLOW, GHANA_RELOCATION_PAGE } from '../data/siteContent.js'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { PlannerBackground } from '../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../components/travel-planner/PlannerSidebar.jsx'

const ICONS = { Globe2, HomeIcon, Briefcase, Bus, Users, Headphones }
const STAT_ICONS = { Clock, Mail, ShieldCheck, Search }

export function RelocationFullDetails() {
  useEffect(() => {
    document.title = 'Full Package Details | East-West Africa Link'
  }, [])

  const { hero, sections } = GHANA_RELOCATION_DETAILS_PAGE
  const { sidebar, stats } = GHANA_RELOCATION_PAGE
  const requestHref = '/ghana/complete-relocation-package/request'

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
          <Link to="/ghana/complete-relocation-package" className="hover:text-copper">
            Complete Relocation Package
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="font-semibold text-primary">Full Package Details</span>
        </div>
      </div>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {sections.map((section, i) => {
                const Icon = ICONS[section.icon]
                return (
                  <Reveal
                    key={section.title}
                    delay={i * 60}
                    className="overflow-hidden rounded-3xl border border-border bg-card sm:flex sm:items-stretch"
                  >
                    <div className="flex-1 p-6 sm:p-7">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <h2 className="text-lg font-bold text-primary">{section.title}</h2>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.text}</p>
                      {section.items.length > 0 && (
                        <ul className="mt-4 space-y-1.5">
                          {section.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-muted-foreground"
                            >
                              <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-copper" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {section.image && (
                      <div className="aspect-4/3 shrink-0 overflow-hidden sm:aspect-auto sm:w-56">
                        <img
                          src={section.image}
                          alt={section.imageAlt}
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      </div>
                    )}
                  </Reveal>
                )
              })}
            </div>

            <PlannerSidebar
              heading={sidebar.title}
              photo="/Pictures/explore/ghana-card-background.webp"
              photoAlt="Cape Coast Castle overlooking the Ghanaian coastline at sunset"
              price={GHANA_RELOCATION_FLOW.price}
              includes={GHANA_RELOCATION_FLOW.includes}
              includesHeading="Complete Relocation Package Includes"
              caption={[sidebar.tagline]}
              primaryCta={{ label: 'Start Your Request', to: requestHref }}
            />
          </div>

          {/* Stats row */}
          <Reveal delay={100} className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
            {stats.map((item) => {
              const Icon = STAT_ICONS[item.icon]
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
            <Link
              to="/ghana/complete-relocation-package"
              className="text-sm font-semibold text-primary hover:text-copper"
            >
              ← Back to Complete Relocation Package
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
