import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  Mail,
  Pencil,
  Phone,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES } from '../../data/siteContent.js'
import { FLAGS } from '../../data/countryFlags.js'
import { MULTI_COUNTRY_STEP_LABELS, SINGLE_COUNTRY_STEP_LABELS, VISA_PRICING_PER_COUNTRY } from '../../data/visaGuidanceData.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { VisaGuidanceStepper } from '../../components/visa-guidance/VisaGuidanceStepper.jsx'
import { useVisaGuidanceFlow } from '../../context/VisaGuidanceFlowContext.jsx'

function ReviewRow({ label, value }) {
  return (
    <div className="border-t border-border py-2.5 first:border-t-0 first:pt-0 sm:flex sm:gap-6">
      <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-muted-foreground sm:w-56 sm:shrink-0">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium text-primary sm:mt-0">
        {value ? String(value) : <span className="text-muted-foreground/60 italic">Not provided</span>}
      </dd>
    </div>
  )
}

function ReviewSection({ number, title, onEdit, children }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-3 bg-cream/70 px-5 py-3.5 sm:px-6 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cocoa text-xs font-bold text-primary-foreground">
            {number}
          </span>
          <h2 className="text-sm font-bold text-primary sm:text-base">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-copper hover:underline cursor-pointer"
        >
          Edit
          <Pencil className="size-3" aria-hidden="true" />
        </button>
      </div>
      <dl className="px-5 py-4 sm:px-6 divide-y divide-border/60">{children}</dl>
    </div>
  )
}

export function ReviewAnswers() {
  const navigate = useNavigate()
  const {
    destinationSlugs,
    selectedCountries,
    count,
    price,
    country,
    isMultiCountry,
    userInfo,
    passportDetails,
    tripDetails,
    countryDetails,
    additionalInfo,
  } = useVisaGuidanceFlow()

  const [activeTab, setActiveTab] = useState(destinationSlugs[0] ?? 'ghana')

  useEffect(() => {
    document.title = 'Review Your Answers | Visa Guidance | East-West Africa Link'
  }, [])

  const handleEdit = () => {
    if (isMultiCountry) {
      navigate('/personal-visa-guidance/multi/request')
    } else {
      navigate(`/personal-visa-guidance/${destinationSlugs[0] ?? country.slug}/request`)
    }
  }

  const handleContinue = () => {
    if (isMultiCountry) {
      navigate('/personal-visa-guidance/multi/payment')
    } else {
      navigate(`/personal-visa-guidance/${destinationSlugs[0] ?? country.slug}/payment`)
    }
  }

  const activeCountryDetail = countryDetails[activeTab] ?? {}
  const activeCountryObj = COUNTRIES.find((c) => c.slug === activeTab)

  return (
    <>
      <PlannerBackground />

      {/* Top Stepper */}
      <div className="border-b border-border bg-card/40 backdrop-blur-sm">
        {isMultiCountry ? (
          <VisaGuidanceStepper steps={MULTI_COUNTRY_STEP_LABELS} currentStep={4} />
        ) : (
          <VisaGuidanceStepper steps={SINGLE_COUNTRY_STEP_LABELS} currentStep={2} />
        )}
      </div>

      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-copper">
              {isMultiCountry ? 'Multi-Country Package' : `${country?.name ?? 'Africa'} Guidance`}
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
              Review Your Answers
            </h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Please check your information below. If you need to make changes, click Edit next to any section. When everything looks correct, continue to payment.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Review Cards Column */}
            <div className="space-y-6">
              {/* Section 1: Your Information */}
              <ReviewSection number={1} title="Your Information" onEdit={handleEdit}>
                <ReviewRow label="Full Name" value={userInfo.fullName} />
                <ReviewRow label="Email Address" value={userInfo.email} />
                <ReviewRow
                  label="Phone / WhatsApp"
                  value={userInfo.phone ? `${userInfo.phoneDialCode} ${userInfo.phone}` : ''}
                />
              </ReviewSection>

              {/* Section 2: Passport & Current Situation */}
              <ReviewSection number={2} title="Passport & Current Situation" onEdit={handleEdit}>
                <ReviewRow label="Passport Nationality" value={passportDetails.nationality} />
                <ReviewRow
                  label="Additional Nationality?"
                  value={
                    passportDetails.hasAdditionalNationality === 'yes'
                      ? `Yes (${passportDetails.additionalNationalityDetails || 'Specified'})`
                      : 'No'
                  }
                />
                <ReviewRow label="Country of Residence" value={passportDetails.countryOfResidence} />
                <ReviewRow label="Applying From (Current Location)" value={passportDetails.currentLocation} />
                <ReviewRow
                  label="Passport Type"
                  value={passportDetails.passportType ? passportDetails.passportType.toUpperCase() : ''}
                />
                <ReviewRow label="Passport Expiration" value={passportDetails.passportExpiration} />
              </ReviewSection>

              {/* Section 3: Trip Details */}
              <ReviewSection number={3} title="Trip Details" onEdit={handleEdit}>
                <ReviewRow
                  label="Selected Countries"
                  value={selectedCountries.map((c) => c.name).join(', ')}
                />
                <ReviewRow label="Planned Order of Travel" value={tripDetails.plannedOrder} />
                <ReviewRow
                  label="Travel Dates"
                  value={
                    tripDetails.startDate && tripDetails.endDate
                      ? `${tripDetails.startDate} to ${tripDetails.endDate} (${tripDetails.datesFlexible})`
                      : ''
                  }
                />
                <ReviewRow label="Main Purpose of Visit" value={tripDetails.mainPurpose} />
                <ReviewRow
                  label="Travel by Land?"
                  value={
                    tripDetails.travelByLand === 'yes'
                      ? `Yes (${tripDetails.landCountries || 'Routes planned'})`
                      : tripDetails.travelByLand === 'unsure'
                        ? 'Not sure yet'
                        : 'No'
                  }
                />
                <ReviewRow
                  label="Apply While Traveling?"
                  value={
                    tripDetails.applyWhileTraveling === 'yes'
                      ? `Yes (Applying for: ${tripDetails.applyWhileTravelingCountries || 'unspecified'}, from: ${tripDetails.applyWhileTravelingLocation || 'unspecified'})`
                      : tripDetails.applyWhileTraveling === 'unsure'
                        ? 'Not sure yet'
                        : 'No'
                  }
                />
                <ReviewRow
                  label="Traveling Companion(s)"
                  value={
                    tripDetails.travelingWith === 'alone'
                      ? 'Traveling alone'
                      : tripDetails.travelingWith === 'adults'
                        ? 'With another adult(s)'
                        : tripDetails.travelingWith === 'children'
                          ? 'With children or minors'
                          : ''
                  }
                />
              </ReviewSection>

              {/* Section 4: Country Details */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="flex items-center justify-between gap-3 bg-cream/70 px-5 py-3.5 sm:px-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cocoa text-xs font-bold text-primary-foreground">
                      4
                    </span>
                    <h2 className="text-sm font-bold text-primary sm:text-base">Country Details</h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-copper hover:underline cursor-pointer"
                  >
                    Edit
                    <Pencil className="size-3" aria-hidden="true" />
                  </button>
                </div>

                {/* Country Sub-Tabs */}
                <div className="flex border-b border-border bg-sand/30 overflow-x-auto">
                  {destinationSlugs.map((slug) => {
                    const c = COUNTRIES.find((x) => x.slug === slug)
                    if (!c) return null
                    const isActive = activeTab === slug
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => setActiveTab(slug)}
                        className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-colors whitespace-nowrap ${
                          isActive
                            ? 'border-copper bg-card text-copper'
                            : 'border-transparent text-muted-foreground hover:text-primary'
                        }`}
                      >
                        <img
                          src={FLAGS[slug]}
                          alt=""
                          className="h-3 w-4.5 rounded-[2px] object-cover ring-1 ring-black/10"
                        />
                        {c.name}
                      </button>
                    )
                  })}
                </div>

                <dl className="px-5 py-4 sm:px-6 divide-y divide-border/60">
                  <ReviewRow
                    label="Expected Arrival / Departure"
                    value={
                      activeCountryDetail.arrivalDate && activeCountryDetail.departureDate
                        ? `${activeCountryDetail.arrivalDate} to ${activeCountryDetail.departureDate}`
                        : activeCountryDetail.lengthOfStay || ''
                    }
                  />
                  <ReviewRow label="Intended Length of Stay" value={activeCountryDetail.lengthOfStay} />
                  <ReviewRow label="Entry Method" value={activeCountryDetail.entryMethod} />
                  <ReviewRow label="Expected Entry Point" value={activeCountryDetail.entryPoint} />
                  <ReviewRow
                    label={`First visit to ${activeCountryObj?.name}?`}
                    value={activeCountryDetail.firstVisit ? activeCountryDetail.firstVisit.toUpperCase() : ''}
                  />
                  <ReviewRow
                    label="Previously Refused Visa?"
                    value={
                      activeCountryDetail.previouslyRefused === 'yes'
                        ? `Yes (${activeCountryDetail.refusalExplanation || 'Details provided'})`
                        : 'No'
                    }
                  />
                  <ReviewRow
                    label="Purpose for this country"
                    value={
                      activeCountryDetail.purposeSameAsMain === 'yes'
                        ? `Same as main trip (${tripDetails.mainPurpose || 'General'})`
                        : activeCountryDetail.specificPurpose || 'Different purpose'
                    }
                  />
                  <ReviewRow
                    label="Specific Questions / Notes"
                    value={activeCountryDetail.questions}
                  />
                </dl>
              </div>

              {/* Section 5: Additional Information */}
              <ReviewSection number={5} title="Additional Information" onEdit={handleEdit}>
                <ReviewRow label="Existing Visas / Permits" value={additionalInfo.existingVisas} />
                <ReviewRow label="Other Circumstances" value={additionalInfo.otherCircumstances} />
              </ReviewSection>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-primary hover:bg-sand/60 transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  Back to Edit Request
                </button>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center gap-2 rounded-full bg-copper px-8 py-3.5 text-sm font-bold text-copper-foreground shadow-sm hover:bg-copper/90 active:scale-[0.99] transition-all"
                >
                  Continue to Secure Payment
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
                <div className="border-b border-border pb-4">
                  <h3 className="text-sm font-bold text-primary">Your Selected Countries</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {count} {count === 1 ? 'country' : 'countries'} selected
                  </p>

                  <div className="mt-3 space-y-2">
                    {selectedCountries.map((c) => (
                      <div
                        key={c.slug}
                        className="flex items-center gap-2 rounded-xl bg-cream/70 px-3 py-2 text-xs font-semibold text-primary"
                      >
                        <img
                          src={FLAGS[c.slug]}
                          alt=""
                          className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-black/10"
                        />
                        <span>{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-b border-border py-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    What&apos;s Included
                  </h4>
                  <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Search className="size-3.5 shrink-0 text-copper mt-0.5" />
                      <span>Personalized research and guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="size-3.5 shrink-0 text-copper mt-0.5" />
                      <span>Clear information on requirements and process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Mail className="size-3.5 shrink-0 text-copper mt-0.5" />
                      <span>Delivered by email (typically 3–5 business days)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Phone className="size-3.5 shrink-0 text-copper mt-0.5" />
                      <span>3 follow-up clarification emails (within 7 days)</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Total
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {count} × ${VISA_PRICING_PER_COUNTRY}
                      </p>
                    </div>
                    <p className="text-3xl font-extrabold text-primary">${price}</p>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <ShieldCheck className="size-4 text-forest" />
                    <span>Secure &amp; Encrypted</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleContinue}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-copper px-5 py-3 text-center text-sm font-bold text-copper-foreground shadow-sm hover:bg-copper/90 active:scale-[0.99] transition-all"
                  >
                    Continue to Payment
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
