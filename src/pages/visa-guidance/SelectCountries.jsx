import { Check, ChevronRight, FileText, Info, Lock, Mail, Phone, Search, ShieldCheck, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES } from '../../data/siteContent.js'
import { FLAGS } from '../../data/countryFlags.js'
import { VISA_PRICING_PER_COUNTRY } from '../../data/visaGuidanceData.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { PhoneConsultationModal } from '../../components/visa-guidance/PhoneConsultationModal.jsx'
import { useVisaGuidanceFlow } from '../../context/VisaGuidanceFlowContext.jsx'

export function SelectCountries() {
  const navigate = useNavigate()
  const { destinationSlugs, toggleDestination, removeDestination, setDestinationSlugs } = useVisaGuidanceFlow()
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const MAX_COUNTRIES = 4

  useEffect(() => {
    document.title = 'Select Countries | Visa Guidance | East-West Africa Link'
  }, [])

  const selectedCount = destinationSlugs.length
  const totalPrice = selectedCount * VISA_PRICING_PER_COUNTRY

  const handleContinue = () => {
    if (selectedCount === 0) {
      setErrorMsg('Please select at least one country to continue.')
      return
    }
    setErrorMsg('')
    navigate(`/personal-visa-guidance/multi/overview?destinations=${destinationSlugs.join(',')}`)
  }

  const handleToggle = (slug) => {
    if (!destinationSlugs.includes(slug) && selectedCount >= MAX_COUNTRIES) {
      setErrorMsg(`You can select up to ${MAX_COUNTRIES} countries at a time.`)
      return
    }
    if (errorMsg) setErrorMsg('')
    toggleDestination(slug)
  }

  const steps = [
    { label: 'Choose Path', subLabel: 'Multiple Countries' },
    { label: 'Select Your Countries', subLabel: 'Choose two or more countries' },
    { label: 'Review & Details' },
    { label: 'Payment & Confirmation' },
  ]

  return (
    <>
      <PlannerBackground />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-copper">
            Home
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <Link to="/personal-visa-guidance" className="hover:text-copper">
            Visa Guidance
          </Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span className="font-semibold text-primary">Multi-Country Visa Guidance</span>
        </div>
      </div>

      {/* Stepper matching Image 4 */}
      <div className="border-b border-border bg-card/40">
        <div className="mx-auto max-w-4xl py-6 px-4">
          <div className="flex items-center justify-between">
            {steps.map((st, i) => {
              const num = i + 1
              const isDone = num === 1
              const isActive = num === 2
              return (
                <div key={st.label} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center text-center">
                    <span
                      className={`grid size-7 sm:size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                        isDone || isActive
                          ? 'bg-copper text-primary-foreground'
                          : 'border border-border bg-card text-muted-foreground'
                      }`}
                    >
                      {isDone ? <Check className="size-4 stroke-[3]" /> : num}
                    </span>
                    <span
                      className={`mt-1.5 text-[11px] sm:text-xs leading-tight ${
                        isActive ? 'font-bold text-copper' : isDone ? 'font-semibold text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {st.label}
                    </span>
                    {st.subLabel && (
                      <span className="text-[10px] text-muted-foreground hidden sm:block">
                        {st.subLabel}
                      </span>
                    )}
                  </div>
                  {num < steps.length && (
                    <div
                      className={`mx-2 sm:mx-4 -mt-5 sm:-mt-6 h-0.5 flex-1 ${
                        isDone ? 'bg-copper' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Main column */}
            <div className="space-y-6">
              <Reveal>
                <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
                  Select Your Destination(s)
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Select one or more countries — up to {MAX_COUNTRIES}. Then click <strong>Continue</strong> to proceed with your visa guidance request.
                </p>
              </Reveal>

              {/* Select Your Countries Card */}
              <Reveal delay={60} className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-primary">Choose Countries</h2>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      Select up to {MAX_COUNTRIES} countries and get visa guidance for all of them in one request.
                    </p>
                  </div>
                  <span className="self-start sm:self-auto rounded-full bg-sand/80 px-3.5 py-1.5 text-right font-bold text-copper text-sm">
                    ${VISA_PRICING_PER_COUNTRY} <span className="text-xs text-muted-foreground font-normal">per country</span>
                  </span>
                </div>

                {errorMsg && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {COUNTRIES.map((c) => {
                    const isSelected = destinationSlugs.includes(c.slug)
                    const isDisabled = !isSelected && selectedCount >= MAX_COUNTRIES
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => handleToggle(c.slug)}
                        disabled={isDisabled}
                        className={`group flex items-center justify-between rounded-2xl border-2 p-3.5 sm:p-4 text-left transition-all ${
                          isSelected
                            ? 'border-copper bg-copper/5 shadow-sm'
                            : isDisabled
                            ? 'border-border bg-card opacity-40 cursor-not-allowed'
                            : 'border-border bg-card hover:border-copper/40 hover:bg-sand/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={FLAGS[c.slug]}
                            alt=""
                            aria-hidden="true"
                            className="h-5 w-7 shrink-0 rounded-[3px] object-cover ring-1 ring-inset ring-black/10"
                          />
                          <span className={`text-sm font-bold transition-colors ${isSelected ? 'text-copper' : 'text-primary group-hover:text-copper'}`}>
                            {c.name}
                          </span>
                        </div>
                        <span
                          className={`grid size-5 shrink-0 place-items-center rounded-full border-2 transition-all ${
                            isSelected
                              ? 'border-copper bg-copper text-white'
                              : 'border-border bg-card group-hover:border-copper'
                          }`}
                        >
                          {isSelected && <Check className="size-3.5 stroke-[3]" />}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </Reveal>

              {/* Optional Phone Consultation Card */}
              <Reveal delay={120} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-primary">
                      Optional 20-Minute Phone Consultation
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      Before you submit your visa application, you can schedule a 20-minute phone consultation to discuss your questions and review your application.
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

            {/* Right Rail Sidebar */}
            <aside className="space-y-6">
              {/* Photo Banner */}
              <div className="overflow-hidden rounded-3xl shadow-card border border-border">
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src="/Pictures/VisaGuidance/Side.PNG"
                    alt="Passport control officer reviewing documents"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <p className="absolute bottom-3 inset-x-3 text-center text-xs font-semibold text-white/90">
                    Contrôle des Passeports · Passport Control
                  </p>
                </div>

                <div className="p-5 bg-card">
                  {/* Selected countries list */}
                  <div className="border-b border-border pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-primary">Your Selected Countries</h3>
                      <span className="text-xs font-semibold text-copper">
                        {selectedCount} {selectedCount === 1 ? 'country' : 'countries'} selected
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      {destinationSlugs.map((slug) => {
                        const item = COUNTRIES.find((c) => c.slug === slug)
                        if (!item) return null
                        return (
                          <div
                            key={slug}
                            className="flex items-center justify-between rounded-xl bg-cream/70 px-3 py-2 text-xs font-medium text-primary"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={FLAGS[slug]}
                                alt=""
                                className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-black/10"
                              />
                              <span className="font-bold">{item.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDestination(slug)}
                              aria-label={`Remove ${item.name}`}
                              className="text-muted-foreground hover:text-red-600 transition-colors p-0.5"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        )
                      })}
                      {destinationSlugs.length === 0 && (
                        <p className="text-xs italic text-muted-foreground py-1">
                          No countries selected yet.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="border-b border-border py-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                      What&apos;s Included
                    </h4>
                    <ul className="mt-3 space-y-2.5 text-xs text-muted-foreground">
                      <li className="flex items-start gap-2.5">
                        <Search className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>Personalized research and guidance</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <FileText className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>Clear information on requirements and process</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Mail className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>Delivered by email (typically 3–5 business days)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Phone className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>3 follow-up clarification emails (within 7 days after delivery).</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pricing Total */}
                  <div className="pt-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Total
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {selectedCount} {selectedCount === 1 ? 'country' : 'countries'} × ${VISA_PRICING_PER_COUNTRY}
                        </p>
                      </div>
                      <p className="text-3xl font-extrabold text-primary">${totalPrice}</p>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <ShieldCheck className="size-4 text-forest" />
                      <span>Secure &amp; Encrypted · Your information is safe with us.</span>
                    </div>

                    {/* CTA Button */}
                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={selectedCount === 0}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-copper px-5 py-3 text-center text-sm font-bold text-copper-foreground shadow-sm hover:bg-copper/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PhoneConsultationModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
      />
    </>
  )
}
