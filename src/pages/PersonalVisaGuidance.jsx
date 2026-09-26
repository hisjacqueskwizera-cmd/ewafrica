import {
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Info,
  Mail,
  Phone,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { COUNTRIES, followUpForCountry } from '../data/siteContent.js'
import { FLAGS } from '../data/countryFlags.js'
import { VISA_PRICING_PER_COUNTRY } from '../data/visaGuidanceData.js'
import { PageIntro } from '../components/PageIntro.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { PlannerBackground } from '../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../components/travel-planner/PlannerSidebar.jsx'
import { PhoneConsultationModal } from '../components/visa-guidance/PhoneConsultationModal.jsx'

const ICONS = { Search, FileText, Mail, Phone, Clock, ShieldCheck }
const GENERIC_IMAGE = '/Pictures/VisaGuidance/Hero.JPG'
const MAX_COUNTRIES = 4

export function PersonalVisaGuidance() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const country = COUNTRIES.find((c) => c.slug === slug)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [selected, setSelected] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    document.title = country
      ? `Personal Visa Guidance — ${country.name} | East-West Africa Link`
      : 'Visa Guidance | East-West Africa Link'
  }, [country])

  if (slug && !country) return <Navigate to="/personal-visa-guidance" replace />

  const followUp = country
    ? followUpForCountry(slug)
    : '3 follow-up clarification emails (within 7 days after delivery).'

  const includesWithFollowUp = [
    { icon: 'Search', text: 'Personalized research and guidance' },
    { icon: 'FileText', text: 'Clear information on requirements and process' },
    { icon: 'Mail', text: 'Delivered by email (typically 3–5 business days)' },
    { icon: 'Phone', text: followUp },
  ]

  const toggleCountry = (cSlug) => {
    setErrorMsg('')
    setSelected((prev) => {
      if (prev.includes(cSlug)) return prev.filter((s) => s !== cSlug)
      if (prev.length >= MAX_COUNTRIES) {
        setErrorMsg(`You can select up to ${MAX_COUNTRIES} countries at a time.`)
        return prev
      }
      return [...prev, cSlug]
    })
  }

  const handleContinue = () => {
    if (selected.length === 0) {
      setErrorMsg('Please select at least one country to continue.')
      return
    }
    setErrorMsg('')
    navigate(`/personal-visa-guidance/multi/overview?destinations=${selected.join(',')}`)
  }

  const selectedCount = selected.length
  const totalPrice = selectedCount * VISA_PRICING_PER_COUNTRY

  // Landing page (no slug)
  if (!country) {
    return (
      <>
        <PlannerBackground />
        <PageIntro
          badge="Visa &amp; Entry"
          titleLine1="Visa"
          titleAccent="Guidance"
          tagline={[
            'Get clear, reliable visa and entry guidance for your trip. We provide personalized information based on your travel dates, nationality, purpose of travel, and country of residence.',
          ]}
          description="Practical information to help you understand requirements, prepare your application, and avoid common delays."
          backgroundImage={GENERIC_IMAGE}
          backgroundImageAlt="A veranda table with a map of Africa overlooking Mount Kilimanjaro"
          overlay={false}
        />

        <div className="border-b border-border bg-card/60 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8">
            <Link to="/" className="hover:text-copper">Home</Link>
            <ChevronRight className="size-3" aria-hidden="true" />
            <span className="font-semibold text-primary">Visa Guidance</span>
          </div>
        </div>

        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_340px]">

              <div className="space-y-6">
                {/* Unified Country Selection Card */}
                <Reveal className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-primary">Select Your Destination(s)</h2>
                      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Select one or more countries — up to {MAX_COUNTRIES}. Then click <strong>Continue</strong>.
                      </p>
                    </div>
                    <span className="self-start shrink-0 rounded-full bg-sand/80 px-3.5 py-1.5 font-bold text-copper text-sm">
                      ${VISA_PRICING_PER_COUNTRY}{' '}
                      <span className="text-xs text-muted-foreground font-normal">per country</span>
                    </span>
                  </div>

                  {errorMsg && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {COUNTRIES.map((c) => {
                      const isSelected = selected.includes(c.slug)
                      const isDisabled = !isSelected && selectedCount >= MAX_COUNTRIES
                      return (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => toggleCountry(c.slug)}
                          disabled={isDisabled}
                          className={`group flex items-center justify-between rounded-2xl border-2 p-3.5 text-left transition-all ${
                            isSelected
                              ? 'border-copper bg-copper/5 shadow-sm'
                              : isDisabled
                              ? 'border-border bg-card opacity-40 cursor-not-allowed'
                              : 'border-border bg-card hover:border-copper/50 hover:bg-sand/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={FLAGS[c.slug]}
                              alt=""
                              aria-hidden="true"
                              className="h-4 w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-inset ring-black/10"
                            />
                            <span className={`text-sm font-bold transition-colors ${isSelected ? 'text-copper' : 'text-primary group-hover:text-copper'}`}>
                              {c.name}
                            </span>
                          </div>
                          <span className={`grid size-5 shrink-0 place-items-center rounded-full border-2 transition-all ${isSelected ? 'border-copper bg-copper text-white' : 'border-border bg-card group-hover:border-copper/60'}`}>
                            {isSelected && (
                              <svg viewBox="0 0 12 10" fill="none" className="size-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="1 5 4.5 9 11 1" />
                              </svg>
                            )}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-muted-foreground">
                      {selectedCount === 0 ? (
                        <span className="italic">No countries selected yet.</span>
                      ) : (
                        <>
                          <span className="font-bold text-primary">{selectedCount}</span>{' '}
                          {selectedCount === 1 ? 'country' : 'countries'} selected —{' '}
                          <span className="font-bold text-copper">${totalPrice} total</span>
                        </>
                      )}
                    </div>
                    <button
                      id="visa-continue-btn"
                      type="button"
                      onClick={handleContinue}
                      disabled={selectedCount === 0}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-copper px-7 py-3 text-sm font-bold text-copper-foreground shadow-sm hover:bg-copper/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </Reveal>

                {/* Optional Phone Consultation Card */}
                <Reveal
                  delay={100}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                      <Phone className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-primary">Optional 20-Minute Phone Consultation</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        Before you submit your visa request, you can schedule a 20-minute phone consultation to discuss your questions and review your plans.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPhoneModal(true)}
                    className="shrink-0 rounded-full border-2 border-copper px-5 py-2 text-xs font-bold text-copper hover:bg-copper hover:text-copper-foreground transition-all"
                  >
                    Learn More
                  </button>
                </Reveal>
              </div>

              {/* Right Sidebar */}
              <aside className="space-y-6">
                <div className="overflow-hidden rounded-3xl shadow-card border border-border">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src="/Pictures/VisaGuidance/Hero.JPG"
                      alt="Mount Kilimanjaro overlooking African savanna"
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    <p className="absolute bottom-3 inset-x-3 text-center text-xs italic font-semibold text-white">
                      Extraordinary Places. Smoother Journeys.
                    </p>
                  </div>
                  <div className="p-5 bg-card">
                    {selectedCount > 0 && (
                      <div className="border-b border-border pb-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Your Selection</h4>
                          <span className="text-xs font-semibold text-copper">
                            {selectedCount} {selectedCount === 1 ? 'country' : 'countries'}
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {selected.map((s) => {
                            const item = COUNTRIES.find((c) => c.slug === s)
                            if (!item) return null
                            return (
                              <div key={s} className="flex items-center gap-2.5 text-xs font-medium text-primary">
                                <img src={FLAGS[s]} alt="" className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-black/10" />
                                {item.name}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    <div className="border-b border-border pb-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary">What&apos;s Included</h4>
                      <ul className="mt-3 space-y-2.5 text-xs text-muted-foreground">
                        <li className="flex items-start gap-2.5"><Search className="size-4 shrink-0 text-copper mt-0.5" /><span>Personalized research and guidance</span></li>
                        <li className="flex items-start gap-2.5"><FileText className="size-4 shrink-0 text-copper mt-0.5" /><span>Clear information on requirements and process</span></li>
                        <li className="flex items-start gap-2.5"><Mail className="size-4 shrink-0 text-copper mt-0.5" /><span>Delivered by email (typically 3–5 business days)</span></li>
                        <li className="flex items-start gap-2.5"><Phone className="size-4 shrink-0 text-copper mt-0.5" /><span>3 follow-up clarification emails (within 7 days after delivery)</span></li>
                      </ul>
                    </div>
                    <div className="pt-4">
                      {selectedCount > 0 ? (
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</span>
                            <p className="text-xs text-muted-foreground">
                              {selectedCount} {selectedCount === 1 ? 'country' : 'countries'} × ${VISA_PRICING_PER_COUNTRY}
                            </p>
                          </div>
                          <p className="text-3xl font-extrabold text-primary">${totalPrice}</p>
                        </div>
                      ) : (
                        <p className="text-3xl font-extrabold text-primary">
                          ${VISA_PRICING_PER_COUNTRY}{' '}
                          <span className="text-xs font-normal text-muted-foreground">per country</span>
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground border-t border-border pt-3">
                        <ShieldCheck className="size-4 text-forest" />
                        <span>Secure &amp; Encrypted · Your information is safe with us.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <PhoneConsultationModal isOpen={showPhoneModal} onClose={() => setShowPhoneModal(false)} />
      </>
    )
  }

  // Per-country service page (slug provided)
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
        overlay={false}
      />

      <div className="border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-copper">Home</Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <Link to="/personal-visa-guidance" className="hover:text-copper">Visa Guidance</Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <Link to={country.to} className="hover:text-copper">{country.name}</Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="font-semibold text-primary">Personal Visa Guidance</span>
        </div>
      </div>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <div>
              <Reveal>
                <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">About This Service</h1>
                <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <p>
                    Planning to visit {country.name}? Our Personal Visa Guidance service provides clear, up-to-date information based on your travel plans and nationality. We research the requirements, outline the application process, and help you prepare the necessary documents so you can apply with confidence.
                  </p>
                  <p>
                    Every traveler&apos;s situation is different. We provide personalized guidance based on your travel dates, nationality, purpose of travel, and country of residence.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-8 flex items-start gap-4 rounded-3xl bg-cream p-6">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-primary">Optional 20-Minute Phone Consultation</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    Before you submit your {country.name} visa application, you can schedule a 20-minute phone consultation to discuss your questions and review your plans.
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
              price={VISA_PRICING_PER_COUNTRY}
              includes={includesWithFollowUp}
              includesHeading="What's Included"
              caption={[`${country.name}, Africa`]}
              primaryCta={{
                label: 'Start Your Request',
                to: `/personal-visa-guidance/${country.slug}/request`,
              }}
            />
          </div>

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

      <PhoneConsultationModal isOpen={showPhoneModal} onClose={() => setShowPhoneModal(false)} />
    </>
  )
}
