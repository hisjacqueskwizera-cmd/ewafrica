import { CheckCircle2, ChevronRight, Clock, FileText, Info, Mail, Phone, Search, ShieldCheck } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { COUNTRIES, VISA_GUIDANCE_FLOW, followUpForCountry } from '../data/siteContent.js'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { PlannerBackground } from '../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../components/travel-planner/PlannerSidebar.jsx'

const ICONS = { Search, FileText, Mail, Phone, Clock, ShieldCheck }

export function PersonalVisaGuidance() {
  const { slug } = useParams()
  const country = COUNTRIES.find((c) => c.slug === slug)

  useEffect(() => {
    if (country) document.title = `Personal Visa Guidance — ${country.name} | East-West Africa Link`
  }, [country])

  if (!country) return <Navigate to="/" replace />

  const requestHref = `/personal-visa-guidance/${country.slug}/request`
  const followUp = followUpForCountry(country.slug)

  const includesWithFollowUp = [
    ...VISA_GUIDANCE_FLOW.includes,
    { icon: 'Phone', text: followUp },
  ]

  return (
    <>
      <PlannerBackground />
      <PageIntro
        badge={country.name}
        titleLine1="Personal Visa"
        titleAccent="Guidance"
        tagline={[`Get clear, personalized guidance for your ${country.name} visa application.`]}
        description="Practical information to help you understand requirements, prepare your application, and avoid common delays."
        backgroundImage={country.image}
        backgroundImageAlt={`A scenic view of ${country.name}`}
        overlayTone="neutral"
      />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-copper">
            Home
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <Link to={country.to} className="hover:text-copper">
            {country.name}
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="font-semibold text-primary">Personal Visa Guidance</span>
        </div>
      </div>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <Reveal>
                <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                  About This Service
                </h1>
                <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <p>
                    Planning to visit {country.name}? Our Personal Visa Guidance service provides clear,
                    up-to-date information based on your travel plans and nationality. We research the
                    requirements, outline the application process, and help you prepare the necessary
                    documents so you can apply with confidence.
                  </p>
                  <p>
                    Every traveler&apos;s situation is different. We provide personalized guidance based on
                    your travel dates, nationality, purpose of travel, and country of residence.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-8 flex items-start gap-4 rounded-3xl bg-cream p-6">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-primary">
                    Optional 20-Minute Phone Consultation
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    Before you submit your {country.name} visa application, you can schedule a
                    20-minute phone consultation to discuss your questions and review your plans.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={125} className="mt-10">
                <h2 className="text-lg font-bold text-primary">What&apos;s Included</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {[
                    { icon: 'Search', title: 'Personalized Research', text: 'We research the latest visa requirements based on your situation.' },
                    { icon: 'FileText', title: 'Clear Information', text: 'A written summary of requirements and the application process.' },
                    { icon: 'Mail', title: 'Delivered by Email', text: 'Receive your guidance by email (typically 3–5 business days).' },
                    { icon: 'Phone', title: 'Follow-Up Support', text: followUp },
                  ].map((item) => {
                    const Icon = ICONS[item.icon]
                    return (
                      <div key={item.title} className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border-2 border-copper text-copper">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-sm font-bold text-primary">{item.title}</h3>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Reveal>

              <Reveal delay={150} className="mt-10">
                <h2 className="text-lg font-bold text-primary">Who Is This For?</h2>
                <ul className="mt-4 space-y-2.5">
                  {[
                    `Tourists visiting ${country.name}`,
                    `Travelers visiting ${country.name} for tourism, business, or an extended stay`,
                    'Those planning a longer stay and needing clear visa guidance',
                    'Travelers who want reliable information before applying',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={175} className="mt-10">
                <h2 className="flex items-center gap-2 text-lg font-bold text-primary">
                  <Info className="size-5 text-copper" aria-hidden="true" />
                  Important to Know
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {[
                    'This service provides independent research and practical guidance.',
                    'We do not submit applications on your behalf.',
                    'We do not provide legal representation or immigration filing services.',
                    `For official decisions, please consult the appropriate authorities in ${country.name}.`,
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <PlannerSidebar
              heading="Service Price"
              photo={country.image}
              photoAlt={`A scenic view of ${country.name}`}
              price={VISA_GUIDANCE_FLOW.price}
              includes={includesWithFollowUp}
              includesHeading="What's Included"
              caption={[`${country.name}, Africa`]}
              primaryCta={{ label: 'Start Your Request', to: requestHref }}
            />
          </div>

          {/* Stats row */}
          <Reveal delay={100} className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
            {[
              { icon: 'Clock', title: 'Typical Delivery', text: '3–5 business days' },
              { icon: 'Mail', title: 'Delivered by Email', text: 'Clear, personalized guidance' },
              { icon: 'ShieldCheck', title: 'Secure & Encrypted', text: 'Your information is safe with us.' },
              { icon: 'Search', title: 'Independent Guidance', text: 'Real advice. No booking bias.' },
            ].map((item) => {
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
            <Link to={country.to} className="text-sm font-semibold text-primary hover:text-copper">
              ← Back to {country.name}
            </Link>
            <p className="mt-6 text-base italic text-muted-foreground">
              Explore {country.name} with confidence. We&apos;re here to help.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
