import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  HelpCircle,
  Info,
  Lightbulb,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { COUNTRIES } from '../../data/siteContent.js'
import { FLAGS } from '../../data/countryFlags.js'
import { MULTI_COUNTRY_STEP_LABELS, VISA_PRICING_PER_COUNTRY } from '../../data/visaGuidanceData.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { PhoneConsultationModal } from '../../components/visa-guidance/PhoneConsultationModal.jsx'
import { VisaGuidanceStepper } from '../../components/visa-guidance/VisaGuidanceStepper.jsx'
import { useVisaGuidanceFlow } from '../../context/VisaGuidanceFlowContext.jsx'

export function MultiCountryOverview() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { destinationSlugs, setDestinationSlugs, removeDestination } = useVisaGuidanceFlow()
  const [showPhoneModal, setShowPhoneModal] = useState(false)

  // Sync if query param has destinations
  useEffect(() => {
    document.title = 'Multi-Country Personal Visa Guidance Overview | East-West Africa Link'
    const queryDests = searchParams.get('destinations')
    if (queryDests) {
      const parsed = queryDests
        .split(',')
        .map((s) => s.trim())
        .filter((s) => COUNTRIES.some((c) => c.slug === s))
      if (parsed.length > 0) {
        setDestinationSlugs(parsed)
        return
      }
    }
    if (destinationSlugs.length === 0) {
      setDestinationSlugs(['ghana', 'tanzania', 'malawi'])
    }
  }, [searchParams])

  const selectedCountries = destinationSlugs
    .map((s) => COUNTRIES.find((c) => c.slug === s))
    .filter(Boolean)

  const count = Math.max(selectedCountries.length, 1)
  const totalPrice = count * VISA_PRICING_PER_COUNTRY
  const countryNamesText = selectedCountries.map((c) => c.name).join(', ')

  const handleStartRequest = () => {
    navigate(`/personal-visa-guidance/multi/request?destinations=${destinationSlugs.join(',')}`)
  }

  return (
    <>
      <PlannerBackground />

      {/* Stepper on top matching Image 1 */}
      <div className="border-b border-border bg-card/40 backdrop-blur-sm">
        <VisaGuidanceStepper steps={MULTI_COUNTRY_STEP_LABELS} currentStep={2} />
      </div>

      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Main content column */}
            <div className="space-y-6">
              <Reveal>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                  <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
                    Your Multi-Country Personal Visa Guidance Request
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    You&apos;ve selected multiple countries! You&apos;ll now begin one request that covers all your selected destinations. We&apos;ll provide personalized visa and entry guidance for each country based on your travel details, nationality, purpose of travel, and country of residence.
                  </p>

                  {/* Your Selected Countries Pill Grid */}
                  <div className="mt-6 border-t border-border pt-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-primary">
                      Your Selected Countries
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {selectedCountries.map((c) => (
                        <span
                          key={c.slug}
                          className="inline-flex items-center gap-2 rounded-xl border border-border bg-sand/40 px-3.5 py-2 text-xs font-bold text-primary shadow-xs"
                        >
                          <img
                            src={FLAGS[c.slug]}
                            alt=""
                            className="h-4 w-6 rounded-[2px] object-cover ring-1 ring-black/10"
                          />
                          {c.name}
                        </span>
                      ))}
                      <Link
                        to="/personal-visa-guidance/multi/select-countries"
                        className="inline-flex items-center gap-1 rounded-xl border border-dashed border-copper px-3 py-2 text-xs font-bold text-copper hover:bg-copper/5 transition-colors"
                      >
                        + Change / Add Countries
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* What Happens Next */}
              <Reveal delay={60}>
                <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-800">
                    <FileText className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-primary">What Happens Next</h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      You&apos;ll answer a few questions about your travel plans, and we&apos;ll research the current visa and entry requirements for all your selected countries. Our guidance is tailored to your specific situation, including your travel dates, nationality, purpose of travel, and country of residence.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* What We'll Ask You */}
              <Reveal delay={90}>
                <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cocoa text-primary-foreground">
                    <HelpCircle className="size-5" />
                  </span>
                  <div className="w-full">
                    <h2 className="text-base font-bold text-primary">What We&apos;ll Ask You</h2>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      To provide accurate and personalized guidance, we&apos;ll ask for:
                    </p>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2 text-xs sm:text-sm text-primary">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>Your passport nationality</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>Your planned order of travel (between the selected countries)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>Your country of residence</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>Your purpose of visit (tourism, business, etc.)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>Your travel dates (or expected dates)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>Any additional travel details that may be relevant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Before You Start */}
              <Reveal delay={120}>
                <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sand text-copper">
                    <Lightbulb className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-primary">Before You Start</h2>
                    <div className="mt-3 space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>One request covers all your selected countries ({countryNamesText || 'Ghana, Tanzania & Zanzibar, and Malawi'}).</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>You&apos;ll receive a single, comprehensive set of guidance for all destinations.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>The more accurate information you provide, the more relevant and helpful your guidance will be.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Optional 20-Minute Phone Consultation */}
              <Reveal delay={150}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
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
                </div>
              </Reveal>

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleStartRequest}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-copper px-7 py-3.5 text-sm font-bold text-copper-foreground shadow-sm hover:bg-copper/90 active:scale-[0.99] transition-all"
                >
                  Start Your Request
                  <ArrowRight className="size-4" />
                </button>
                <span className="text-xs text-muted-foreground font-medium">
                  This will take about 5–10 minutes to complete.
                </span>
              </div>
            </div>

            {/* Right Rail Sidebar */}
            <aside className="space-y-6">
              <div className="overflow-hidden rounded-3xl shadow-card border border-border">
                {/* Image Banner matching Image 1 */}
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src="/Pictures/VisaGuidance/Side.PNG"
                    alt="East and West Africa landscape"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <p className="absolute bottom-3 inset-x-3 text-center text-xs italic font-semibold text-white">
                    East and West Africa
                  </p>
                </div>

                <div className="p-5 bg-card">
                  {/* Selected countries list */}
                  <div className="border-b border-border pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-primary">Your Selected Countries</h3>
                      <span className="text-xs font-semibold text-copper">
                        {count} countries selected
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
                        <span>Personalized research and guidance for all selected countries</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <FileText className="size-4 shrink-0 text-copper mt-0.5" />
                        <span>Clear information on visa requirements and process</span>
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

                  {/* Price */}
                  <div className="border-b border-border py-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      <span className="text-2xl font-extrabold text-primary">${VISA_PRICING_PER_COUNTRY}</span> per country
                    </p>
                    <div className="mt-2 flex items-baseline justify-between text-xs">
                      <span className="text-muted-foreground">{count} countries selected</span>
                      <span className="text-base font-extrabold text-primary">${totalPrice}</span>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <ShieldCheck className="size-4 text-forest" />
                      <span>Secure &amp; Encrypted · Your information is safe with us.</span>
                    </div>
                    {/* CTA Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleStartRequest}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-copper px-7 py-3.5 text-sm font-bold text-copper-foreground shadow-sm hover:bg-copper/90 active:scale-[0.99] transition-all"
                >
                  Start Your Request
                  <ArrowRight className="size-4" />
                </button>
              </div>
                  </div>

                  {/* Next: Start Your Request Box */}
                  <div className="mt-4 rounded-2xl border border-copper/30 bg-sand/50 p-3.5 text-xs leading-relaxed text-primary">
                    <div className="flex items-center gap-1.5 font-bold text-copper mb-1">
                      <Info className="size-3.5" />
                      Next: Start Your Request
                    </div>
                    You&apos;ll be asked a few questions about your travel plans, and then you can review your answers before making a secure payment.
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
