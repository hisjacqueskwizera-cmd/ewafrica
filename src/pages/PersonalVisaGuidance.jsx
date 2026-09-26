import { CheckCircle2, ChevronRight, Clock, FileText, Info, Mail, Phone, Search, ShieldCheck } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { COUNTRIES, VISA_GUIDANCE_FLOW, followUpForCountry } from '../data/siteContent.js'
import { FLAGS } from '../data/countryFlags.js'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { PlannerBackground } from '../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../components/travel-planner/PlannerSidebar.jsx'

const ICONS = { Search, FileText, Mail, Phone, Clock, ShieldCheck }

// Hero/sidebar photo for the country-agnostic entry point, where there's no
// destination photo to use yet.
const GENERIC_IMAGE = '/Pictures/VisaGuidance/Hero.JPG'
const SIDEBAR_IMAGE = '/Pictures/VisaGuidance/Hero.JPG'

/**
 * Personal Visa Guidance — served at two URLs:
 *
 * - `/personal-visa-guidance/:slug` — the per-country page every destination
 *   page links to, with that country's photo, copy and request flow.
 * - `/personal-visa-guidance` — the country-agnostic entry point the
 *   homepage's "Visa & Entry" card uses. Same service, same flat price
 *   (VISA_GUIDANCE_FLOW.price is one rate for every country), just no
 *   destination assumed: the visitor picks one from the chooser below,
 *   which hands off to the per-country page above.
 */
export function PersonalVisaGuidance() {
  const { slug } = useParams()
  const country = COUNTRIES.find((c) => c.slug === slug)

  useEffect(() => {
    document.title = country
      ? `Personal Visa Guidance — ${country.name} | East-West Africa Link`
      : 'Personal Visa Guidance | East-West Africa Link'
  }, [country])

  // No slug at all is the valid country-agnostic entry point; only a slug
  // that matches no country is a dead link worth sending home.
  if (slug && !country) return <Navigate to="/" replace />

  const followUp = followUpForCountry(slug)
  const includesWithFollowUp = [...VISA_GUIDANCE_FLOW.includes, { icon: 'Phone', text: followUp }]

  return (
    <>
      <PlannerBackground />
      <PageIntro
        badge={country ? country.name : 'Visa & Entry'}
        titleLine1="Personal Visa"
        titleAccent="Guidance"
        tagline={[
          country
            ? `Get clear, personalized guidance for your ${country.name} visa application.`
            : 'Get clear, personalized guidance for your visa application, wherever you are heading.',
        ]}
        description="Practical information to help you understand requirements, prepare your application, and avoid common delays."
        backgroundImage={country ? country.image : GENERIC_IMAGE}
        backgroundImageAlt={
          country ? `A scenic view of ${country.name}` : 'A passport and visa paperwork at an airport entry desk'
        }
        // The generic backdrop keeps its original color so the image reads
        // naturally without the warm cocoa wash added to the page hero.
        overlay={false}
      />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-copper">
            Home
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          {country && (
            <>
              <Link to={country.to} className="hover:text-copper">
                {country.name}
              </Link>
              <ChevronRight className="size-3" aria-hidden="true" />
            </>
          )}
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
                    {country ? `Planning to visit ${country.name}?` : 'Planning a trip across East or West Africa?'}{' '}
                    Our Personal Visa Guidance service provides clear, up-to-date information based on
                    your travel plans and nationality. We research the requirements, outline the
                    application process, and help you prepare the necessary documents so you can apply
                    with confidence.
                  </p>
                  <p>
                    Every traveler&apos;s situation is different. We provide personalized guidance based on
                    your travel dates, nationality, purpose of travel, and country of residence.
                  </p>
                </div>
              </Reveal>

              {/* Country-agnostic arrivals pick a destination here — visa
                  rules are per-country, so everything past this point runs
                  through that country's own page and request flow. */}
              {!country && (
                <div id="choose-destination" className="scroll-mt-28">
                  <Reveal delay={100} className="mt-8 rounded-3xl bg-cream p-6 sm:p-8">
                    <h2 className="text-lg font-bold text-primary">Choose Your Destination</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Visa and entry requirements differ from country to country. Tell us where
                      you&apos;re heading and we&apos;ll tailor the guidance to it.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {COUNTRIES.map((option) => (
                        <Link
                          key={option.slug}
                          to={`/personal-visa-guidance/${option.slug}`}
                          className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-primary transition-colors hover:border-copper hover:bg-sand/60"
                        >
                          <img
                            src={FLAGS[option.slug]}
                            alt=""
                            aria-hidden="true"
                            className="h-4 w-[21.33px] shrink-0 rounded-[3px] object-cover ring-1 ring-inset ring-black/10"
                          />
                          <span className="flex-1">{option.name}</span>
                          <ChevronRight className="size-4 shrink-0 text-copper" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  </Reveal>
                </div>
              )}

              <Reveal delay={100} className="mt-8 flex items-start gap-4 rounded-3xl bg-cream p-6">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-primary">
                    Optional 20-Minute Phone Consultation
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    Before you submit your {country ? `${country.name} ` : ''}visa application, you can
                    schedule a 20-minute phone consultation to discuss your questions and review your
                    plans.
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
                    country ? `Tourists visiting ${country.name}` : 'Tourists visiting East or West Africa',
                    country
                      ? `Travelers visiting ${country.name} for tourism, business, or an extended stay`
                      : 'Travelers going for tourism, business, or an extended stay',
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
                    country
                      ? `For official decisions, please consult the appropriate authorities in ${country.name}.`
                      : 'For official decisions, please consult the appropriate authorities in your destination country.',
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
              photo={country ? country.image : SIDEBAR_IMAGE}
              photoAlt={
                country ? `A scenic view of ${country.name}` : 'A passport and visa paperwork at an airport entry desk'
              }
              price={VISA_GUIDANCE_FLOW.price}
              includes={includesWithFollowUp}
              includesHeading="What's Included"
              caption={country ? [`${country.name}, Africa`] : ['East and West Africa']}
              primaryCta={
                country
                  ? { label: 'Start Your Request', to: `/personal-visa-guidance/${country.slug}/request` }
                  : { label: 'Choose Your Destination', to: '/personal-visa-guidance#choose-destination' }
              }
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
            <Link
              to={country ? country.to : '/explore'}
              className="text-sm font-semibold text-primary hover:text-copper"
            >
              ← Back to {country ? country.name : 'Explore Destinations'}
            </Link>
            <p className="mt-6 text-base italic text-muted-foreground">
              Explore {country ? country.name : 'Africa'} with confidence. We&apos;re here to help.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
