import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  FileText,
  HelpCircle,
  Info,
  Lock,
  Mail,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { COUNTRIES } from '../../data/siteContent.js'
import { FLAGS } from '../../data/countryFlags.js'
import {
  COMMON_COUNTRIES,
  COMMON_NATIONALITIES,
  DATES_FLEXIBILITY_OPTIONS,
  ENTRY_METHOD_OPTIONS,
  MULTI_COUNTRY_STEP_LABELS,
  PASSPORT_TYPE_OPTIONS,
  PHONE_DIAL_CODES,
  SINGLE_COUNTRY_STEP_LABELS,
  TRAVELING_WITH_OPTIONS,
  VISA_PRICING_PER_COUNTRY,
  VISA_PURPOSE_OPTIONS,
} from '../../data/visaGuidanceData.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { VisaGuidanceStepper } from '../../components/visa-guidance/VisaGuidanceStepper.jsx'
import { useVisaGuidanceFlow } from '../../context/VisaGuidanceFlowContext.jsx'

function SectionHeader({ number, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 bg-cream/70 px-5 py-4 border-b border-border sm:px-6">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cocoa text-sm font-bold text-primary-foreground shadow-xs">
        {number}
      </span>
      <div>
        <h2 className="text-base font-bold text-primary sm:text-lg">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  )
}

function Field({ label, required, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-bold uppercase tracking-wider text-primary">
        {label}
        {required && <span className="text-copper"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-primary placeholder:text-muted-foreground/60 focus-visible:outline-2 focus-visible:outline-copper transition-colors'

export function RequestForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const {
    destinationSlugs,
    setDestinationSlugs,
    selectedCountries,
    count,
    price,
    country,
    isMultiCountry,
    userInfo,
    updateUserInfo,
    passportDetails,
    updatePassportDetails,
    tripDetails,
    updateTripDetails,
    countryDetails,
    updateCountryDetail,
    additionalInfo,
    updateAdditionalInfo,
    addDestination,
    removeDestination,
  } = useVisaGuidanceFlow()

  // Active tab for Country Details section
  const [activeCountryTab, setActiveCountryTab] = useState(
    destinationSlugs[0] ?? 'ghana',
  )
  const [addCountryDropdownOpen, setAddCountryDropdownOpen] = useState(false)
  const [validationError, setValidationError] = useState('')

  // Sync if destinations present in search params
  useEffect(() => {
    const queryDests = searchParams.get('destinations')
    if (queryDests) {
      const parsed = queryDests
        .split(',')
        .map((s) => s.trim())
        .filter((s) => COUNTRIES.some((c) => c.slug === s))
      if (parsed.length > 0 && destinationSlugs.length === 0) {
        setDestinationSlugs(parsed)
      }
    }
  }, [searchParams])

  // Keep activeCountryTab valid
  useEffect(() => {
    if (!destinationSlugs.includes(activeCountryTab) && destinationSlugs.length > 0) {
      setActiveCountryTab(destinationSlugs[0])
    }
  }, [destinationSlugs, activeCountryTab])

  useEffect(() => {
    document.title = isMultiCountry
      ? 'Start Your Multi-Country Visa Guidance Request | East-West Africa Link'
      : `Start Your Request — ${country?.name ?? 'Visa Guidance'} | East-West Africa Link`
  }, [isMultiCountry, country])

  const currentCountryDetail = countryDetails[activeCountryTab] ?? {}
  const activeCountryObj = COUNTRIES.find((c) => c.slug === activeCountryTab)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate required fields
    if (!userInfo.fullName.trim() || !userInfo.email.trim() || !userInfo.phone.trim()) {
      setValidationError('Please complete all required fields in Section 1 (Your Information).')
      window.scrollTo({ top: 200, behavior: 'smooth' })
      return
    }

    if (destinationSlugs.length === 0) {
      setValidationError('Please select at least one destination country.')
      return
    }

    setValidationError('')
    if (isMultiCountry) {
      navigate('/personal-visa-guidance/multi/review')
    } else {
      navigate(`/personal-visa-guidance/${destinationSlugs[0] ?? country.slug}/review`)
    }
  }

  const handleBack = () => {
    if (isMultiCountry) {
      navigate(`/personal-visa-guidance/multi/overview?destinations=${destinationSlugs.join(',')}`)
    } else {
      navigate(`/personal-visa-guidance/${destinationSlugs[0] ?? country.slug}`)
    }
  }

  const unusedCountries = COUNTRIES.filter((c) => !destinationSlugs.includes(c.slug))

  return (
    <>
      <PlannerBackground />

      {/* Top Stepper */}
      <div className="border-b border-border bg-card/40 backdrop-blur-sm">
        {isMultiCountry ? (
          <VisaGuidanceStepper steps={MULTI_COUNTRY_STEP_LABELS} currentStep={3} />
        ) : (
          <VisaGuidanceStepper steps={SINGLE_COUNTRY_STEP_LABELS} currentStep={1} />
        )}
      </div>

      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header with Title and Delivery Time Badge */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between border-b border-border pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-copper">
                {isMultiCountry ? 'Multi-Country Package' : `${country?.name ?? 'Africa'} Guidance`}
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
                {isMultiCountry ? 'Visa Guidance – Multiple Countries' : `Visa Guidance – ${country?.name}`}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                Tell us about your trip and we&apos;ll provide clear, reliable visa and entry guidance for each selected country.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-sky-200/80 bg-sky-50/70 p-3.5 sm:p-4 text-xs text-sky-950 flex items-center gap-3">
              <Clock className="size-5 shrink-0 text-sky-700" />
              <div>
                <strong className="block font-bold text-sky-900">Typical delivery: 3–5 business days</strong>
                <span className="text-sky-800">You&apos;ll receive a detailed response with guidance for each selected country.</span>
              </div>
            </div>
          </div>

          {validationError && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {validationError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Form Column */}
            <div className="space-y-8">
              {/* SECTION 1: Your Information */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <SectionHeader
                  number={1}
                  title="Your Information"
                  subtitle="We'll use this information to contact you about your visa guidance."
                />
                <div className="p-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" required>
                      <input
                        required
                        type="text"
                        value={userInfo.fullName}
                        onChange={(e) => updateUserInfo({ fullName: e.target.value })}
                        placeholder="First and last name"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Email Address" required>
                      <input
                        required
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => updateUserInfo({ email: e.target.value })}
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label="Phone / WhatsApp" required hint="Used for order confirmation and follow-up consultation scheduling.">
                    <div className="flex gap-2">
                      <select
                        value={userInfo.phoneDialCode}
                        onChange={(e) => updateUserInfo({ phoneDialCode: e.target.value })}
                        className="w-36 rounded-xl border border-border bg-background px-2.5 py-2.5 text-sm text-primary font-medium focus-visible:outline-copper"
                      >
                        {PHONE_DIAL_CODES.map((item) => (
                          <option key={item.code + item.country} value={item.code}>
                            {item.flag} {item.code} ({item.country})
                          </option>
                        ))}
                      </select>
                      <input
                        required
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => updateUserInfo({ phone: e.target.value })}
                        placeholder="+1 234 567 8900"
                        className={`flex-1 ${inputClass}`}
                      />
                    </div>
                  </Field>
                </div>
              </div>

              {/* SECTION 2: Passport & Current Situation */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <SectionHeader
                  number={2}
                  title="Passport & Current Situation"
                  subtitle="Tell us about your passport and where you are now."
                />
                <div className="p-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Passport Nationality" required>
                      <select
                        required
                        value={passportDetails.nationality}
                        onChange={(e) => updatePassportDetails({ nationality: e.target.value })}
                        className={inputClass}
                      >
                        <option value="">Select your nationality</option>
                        {COMMON_NATIONALITIES.map((nat) => (
                          <option key={nat} value={nat}>
                            {nat}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Do you hold any additional nationality or passport?
                      </span>
                      <div className="flex items-center gap-6 pt-1">
                        <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                          <input
                            type="radio"
                            name="hasAdditionalNationality"
                            checked={passportDetails.hasAdditionalNationality === 'yes'}
                            onChange={() => updatePassportDetails({ hasAdditionalNationality: 'yes' })}
                            className="size-4 accent-copper"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                          <input
                            type="radio"
                            name="hasAdditionalNationality"
                            checked={passportDetails.hasAdditionalNationality === 'no'}
                            onChange={() => updatePassportDetails({ hasAdditionalNationality: 'no' })}
                            className="size-4 accent-copper"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  {passportDetails.hasAdditionalNationality === 'yes' && (
                    <Field label="If yes, please specify">
                      <input
                        type="text"
                        value={passportDetails.additionalNationalityDetails}
                        onChange={(e) =>
                          updatePassportDetails({ additionalNationalityDetails: e.target.value })
                        }
                        placeholder="e.g. United Kingdom, Canada, Ghana"
                        className={inputClass}
                      />
                    </Field>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Country of Residence" required>
                      <select
                        required
                        value={passportDetails.countryOfResidence}
                        onChange={(e) => updatePassportDetails({ countryOfResidence: e.target.value })}
                        className={inputClass}
                      >
                        <option value="">Select country</option>
                        {COMMON_COUNTRIES.map((ctry) => (
                          <option key={ctry} value={ctry}>
                            {ctry}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Current location (country you are applying from)" required>
                      <select
                        required
                        value={passportDetails.currentLocation}
                        onChange={(e) => updatePassportDetails({ currentLocation: e.target.value })}
                        className={inputClass}
                      >
                        <option value="">Select country</option>
                        {COMMON_COUNTRIES.map((ctry) => (
                          <option key={ctry} value={ctry}>
                            {ctry}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Passport Type" required>
                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        {PASSPORT_TYPE_OPTIONS.map((opt) => (
                          <label key={opt.value} className="flex items-center gap-2 text-xs sm:text-sm text-primary cursor-pointer">
                            <input
                              type="radio"
                              name="passportType"
                              value={opt.value}
                              checked={passportDetails.passportType === opt.value}
                              onChange={(e) => updatePassportDetails({ passportType: e.target.value })}
                              className="size-4 accent-copper"
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </Field>

                    <Field label="Passport Expiration Date" required>
                      <input
                        required
                        type="date"
                        value={passportDetails.passportExpiration}
                        onChange={(e) => updatePassportDetails({ passportExpiration: e.target.value })}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Trip Details */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <SectionHeader
                  number={3}
                  title="Trip Details"
                  subtitle="Tell us about your planned trip."
                />
                <div className="p-6 space-y-6">
                  {/* Which countries tag selector */}
                  <Field label="Which countries are you requesting visa guidance for?" required>
                    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-sand/30 p-2.5">
                      {destinationSlugs.map((slug) => {
                        const item = COUNTRIES.find((c) => c.slug === slug)
                        if (!item) return null
                        return (
                          <span
                            key={slug}
                            className="inline-flex items-center gap-2 rounded-xl bg-card px-3 py-1.5 text-xs font-bold text-primary shadow-xs border border-border"
                          >
                            <img
                              src={FLAGS[slug]}
                              alt=""
                              className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-black/10"
                            />
                            {item.name}
                            <button
                              type="button"
                              onClick={() => removeDestination(slug)}
                              aria-label={`Remove ${item.name}`}
                              className="ml-1 text-muted-foreground hover:text-red-600 transition-colors"
                            >
                              <X className="size-3.5" />
                            </button>
                          </span>
                        )
                      })}

                      {unusedCountries.length > 0 && (
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setAddCountryDropdownOpen((prev) => !prev)}
                            className="inline-flex items-center gap-1 rounded-xl border border-dashed border-copper px-3 py-1.5 text-xs font-bold text-copper hover:bg-copper/5 transition-colors"
                          >
                            <Plus className="size-3.5" />
                            Add Country
                            <ChevronDown className="size-3" />
                          </button>

                          {addCountryDropdownOpen && (
                            <div className="absolute left-0 top-full z-20 mt-1 max-h-48 w-56 overflow-y-auto rounded-2xl border border-border bg-card p-1.5 shadow-xl">
                              {unusedCountries.map((c) => (
                                <button
                                  key={c.slug}
                                  type="button"
                                  onClick={() => {
                                    addDestination(c.slug)
                                    setAddCountryDropdownOpen(false)
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-primary hover:bg-sand/60 transition-colors"
                                >
                                  <img
                                    src={FLAGS[c.slug]}
                                    alt=""
                                    className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-black/10"
                                  />
                                  {c.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Field>

                  {/* Planned order of travel */}
                  <Field
                    label="Planned order of travel"
                    required
                    hint="Example: Tanzania → Malawi → Zambia"
                  >
                    <input
                      required
                      type="text"
                      value={tripDetails.plannedOrder}
                      onChange={(e) => updateTripDetails({ plannedOrder: e.target.value })}
                      placeholder="e.g. Tanzania → Malawi → Zambia"
                      className={inputClass}
                    />
                  </Field>

                  {/* Dates & Flexibility */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Overall travel dates" required>
                      <div className="flex items-center gap-2">
                        <input
                          required
                          type="date"
                          value={tripDetails.startDate}
                          onChange={(e) => updateTripDetails({ startDate: e.target.value })}
                          className={inputClass}
                        />
                        <span className="text-xs text-muted-foreground font-semibold">to</span>
                        <input
                          required
                          type="date"
                          value={tripDetails.endDate}
                          onChange={(e) => updateTripDetails({ endDate: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </Field>

                    <Field label="Are your dates fixed or flexible?" required>
                      <div className="flex items-center gap-6 pt-2">
                        {DATES_FLEXIBILITY_OPTIONS.map((opt) => (
                          <label key={opt.value} className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                            <input
                              type="radio"
                              name="datesFlexible"
                              value={opt.value}
                              checked={tripDetails.datesFlexible === opt.value}
                              onChange={(e) => updateTripDetails({ datesFlexible: e.target.value })}
                              className="size-4 accent-copper"
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </Field>
                  </div>

                  {/* Purpose */}
                  <Field label="Main purpose of travel (overall)" required hint="e.g. Tourism, Business, Family visit, Relocation, Other">
                    <select
                      required
                      value={tripDetails.mainPurpose}
                      onChange={(e) => updateTripDetails({ mainPurpose: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Select purpose</option>
                      {VISA_PURPOSE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Land travel question */}
                  <div className="space-y-3 rounded-2xl border border-border bg-cream/40 p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                      Will any part of your trip involve traveling between any of the selected countries by land? *
                    </span>
                    <div className="flex items-center gap-6">
                      {['yes', 'no', 'unsure'].map((val) => (
                        <label key={val} className="flex items-center gap-2 text-sm text-primary capitalize cursor-pointer">
                          <input
                            type="radio"
                            name="travelByLand"
                            value={val}
                            checked={tripDetails.travelByLand === val}
                            onChange={(e) => updateTripDetails({ travelByLand: e.target.value })}
                            className="size-4 accent-copper"
                          />
                          {val === 'unsure' ? 'Not sure yet' : val}
                        </label>
                      ))}
                    </div>

                    {tripDetails.travelByLand === 'yes' && (
                      <Field label="If yes, which countries will you travel between by land?">
                        <input
                          type="text"
                          value={tripDetails.landCountries}
                          onChange={(e) => updateTripDetails({ landCountries: e.target.value })}
                          placeholder="e.g. Tanzania → Malawi, Malawi → Zambia"
                          className={inputClass}
                        />
                      </Field>
                    )}
                  </div>

                  {/* Apply while traveling */}
                  <div className="space-y-3 rounded-2xl border border-border bg-cream/40 p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                      Do you expect to apply for any of these visas while already traveling? *
                    </span>
                    <div className="flex items-center gap-6">
                      {['yes', 'no', 'unsure'].map((val) => (
                        <label key={val} className="flex items-center gap-2 text-sm text-primary capitalize cursor-pointer">
                          <input
                            type="radio"
                            name="applyWhileTraveling"
                            value={val}
                            checked={tripDetails.applyWhileTraveling === val}
                            onChange={(e) => updateTripDetails({ applyWhileTraveling: e.target.value })}
                            className="size-4 accent-copper"
                          />
                          {val === 'unsure' ? 'Not sure yet' : val}
                        </label>
                      ))}
                    </div>

                    {tripDetails.applyWhileTraveling === 'yes' && (
                      <div className="grid gap-4 sm:grid-cols-2 pt-1">
                        <Field label="If yes, which country/countries will you need to apply for while traveling?">
                          <input
                            type="text"
                            value={tripDetails.applyWhileTravelingCountries}
                            onChange={(e) =>
                              updateTripDetails({ applyWhileTravelingCountries: e.target.value })
                            }
                            placeholder="e.g. Zambia"
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Where do you expect to be when you apply? (country/city if known)">
                          <input
                            type="text"
                            value={tripDetails.applyWhileTravelingLocation}
                            onChange={(e) =>
                              updateTripDetails({ applyWhileTravelingLocation: e.target.value })
                            }
                            placeholder="e.g. Dar es Salaam, Tanzania"
                            className={inputClass}
                          />
                        </Field>
                      </div>
                    )}
                  </div>

                  {/* Traveling with */}
                  <Field label="Are you traveling alone or with others?" required>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {TRAVELING_WITH_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs sm:text-sm cursor-pointer transition-colors ${
                            tripDetails.travelingWith === opt.value
                              ? 'border-copper bg-copper/5 font-bold text-primary'
                              : 'border-border bg-background text-muted-foreground hover:bg-sand/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="travelingWith"
                            value={opt.value}
                            checked={tripDetails.travelingWith === opt.value}
                            onChange={(e) => updateTripDetails({ travelingWith: e.target.value })}
                            className="size-4 accent-copper"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </Field>
                </div>
              </div>

              {/* SECTION 4: Country Details (Tabbed per Country!) */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <SectionHeader
                  number={4}
                  title="Country Details"
                  subtitle="Provide details for each selected country. The questions are the same for each country."
                />

                {/* Country Tabs */}
                <div className="flex border-b border-border bg-sand/30 overflow-x-auto">
                  {destinationSlugs.map((slug) => {
                    const c = COUNTRIES.find((x) => x.slug === slug)
                    if (!c) return null
                    const isActive = activeCountryTab === slug
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => setActiveCountryTab(slug)}
                        className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
                          isActive
                            ? 'border-copper bg-card text-copper shadow-xs'
                            : 'border-transparent text-muted-foreground hover:text-primary hover:bg-sand/60'
                        }`}
                      >
                        <img
                          src={FLAGS[slug]}
                          alt=""
                          className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-black/10"
                        />
                        {c.name}
                      </button>
                    )
                  })}
                </div>

                {/* Tab Content */}
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-copper">
                    <Info className="size-4" />
                    Details for {activeCountryObj?.name ?? 'Country'}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Expected arrival date" required>
                      <input
                        required
                        type="date"
                        value={currentCountryDetail.arrivalDate ?? ''}
                        onChange={(e) => updateCountryDetail(activeCountryTab, 'arrivalDate', e.target.value)}
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Expected departure date" required>
                      <input
                        required
                        type="date"
                        value={currentCountryDetail.departureDate ?? ''}
                        onChange={(e) => updateCountryDetail(activeCountryTab, 'departureDate', e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label="Or intended length of stay" hint="If specific dates aren't finalized yet (e.g. 7 days, 3 weeks, 2 months)">
                    <input
                      type="text"
                      value={currentCountryDetail.lengthOfStay ?? ''}
                      onChange={(e) => updateCountryDetail(activeCountryTab, 'lengthOfStay', e.target.value)}
                      placeholder="e.g. 7 days, 3 weeks, 2 months"
                      className={inputClass}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="How will you enter?" required hint="Air, land, or sea">
                      <select
                        required
                        value={currentCountryDetail.entryMethod ?? ''}
                        onChange={(e) => updateCountryDetail(activeCountryTab, 'entryMethod', e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select entry method</option>
                        {ENTRY_METHOD_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Expected entry point (if known)" hint="e.g. Kilimanjaro Airport, Namanga border, Dar es Salaam port">
                      <input
                        type="text"
                        value={currentCountryDetail.entryPoint ?? ''}
                        onChange={(e) => updateCountryDetail(activeCountryTab, 'entryPoint', e.target.value)}
                        placeholder="e.g. Kilimanjaro Airport, Namanga border"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={`Is this your first visit to ${activeCountryObj?.name}?`} required>
                      <div className="flex items-center gap-6 pt-2">
                        {['yes', 'no'].map((val) => (
                          <label key={val} className="flex items-center gap-2 text-sm text-primary capitalize cursor-pointer">
                            <input
                              type="radio"
                              name={`firstVisit_${activeCountryTab}`}
                              value={val}
                              checked={currentCountryDetail.firstVisit === val}
                              onChange={(e) => updateCountryDetail(activeCountryTab, 'firstVisit', e.target.value)}
                              className="size-4 accent-copper"
                            />
                            {val}
                          </label>
                        ))}
                      </div>
                    </Field>

                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Have you previously been refused a visa or entry to {activeCountryObj?.name}? *
                      </span>
                      <div className="flex items-center gap-6 pt-1">
                        {['yes', 'no'].map((val) => (
                          <label key={val} className="flex items-center gap-2 text-sm text-primary capitalize cursor-pointer">
                            <input
                              type="radio"
                              name={`refused_${activeCountryTab}`}
                              value={val}
                              checked={currentCountryDetail.previouslyRefused === val}
                              onChange={(e) => updateCountryDetail(activeCountryTab, 'previouslyRefused', e.target.value)}
                              className="size-4 accent-copper"
                            />
                            {val}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {currentCountryDetail.previouslyRefused === 'yes' && (
                    <Field label="If yes, please briefly explain (optional)">
                      <input
                        type="text"
                        value={currentCountryDetail.refusalExplanation ?? ''}
                        onChange={(e) => updateCountryDetail(activeCountryTab, 'refusalExplanation', e.target.value)}
                        placeholder="e.g. date, reason, and country"
                        className={inputClass}
                      />
                    </Field>
                  )}

                  <div className="space-y-3 rounded-2xl border border-border bg-cream/40 p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                      Is your purpose of travel to {activeCountryObj?.name} the same as your main trip purpose? *
                    </span>
                    <div className="flex items-center gap-6">
                      {['yes', 'no'].map((val) => (
                        <label key={val} className="flex items-center gap-2 text-sm text-primary capitalize cursor-pointer">
                          <input
                            type="radio"
                            name={`purposeSame_${activeCountryTab}`}
                            value={val}
                            checked={currentCountryDetail.purposeSameAsMain === val}
                            onChange={(e) => updateCountryDetail(activeCountryTab, 'purposeSameAsMain', e.target.value)}
                            className="size-4 accent-copper"
                          />
                          {val}
                        </label>
                      ))}
                    </div>

                    {currentCountryDetail.purposeSameAsMain === 'no' && (
                      <Field label={`If no, what is your purpose of travel to ${activeCountryObj?.name}?`}>
                        <select
                          value={currentCountryDetail.specificPurpose ?? ''}
                          onChange={(e) => updateCountryDetail(activeCountryTab, 'specificPurpose', e.target.value)}
                          className={inputClass}
                        >
                          <option value="">Select purpose</option>
                          {VISA_PURPOSE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </Field>
                    )}
                  </div>

                  <Field label={`Any specific visa or entry questions for ${activeCountryObj?.name}? (optional)`}>
                    <textarea
                      rows={3}
                      value={currentCountryDetail.questions ?? ''}
                      onChange={(e) => updateCountryDetail(activeCountryTab, 'questions', e.target.value)}
                      placeholder="e.g. I plan to attend a conference. Do I need a business visa?"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>

              {/* SECTION 5: Additional Information */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <SectionHeader
                  number={5}
                  title="Additional Information"
                  subtitle="Let us know if there is anything else we should consider for your visa guidance."
                />
                <div className="p-6 space-y-5">
                  <Field label="Do you have any existing visas or residence permits that may affect this trip? (optional)">
                    <textarea
                      rows={2}
                      value={additionalInfo.existingVisas}
                      onChange={(e) => updateAdditionalInfo({ existingVisas: e.target.value })}
                      placeholder="e.g. US visa, UK visa, Schengen visa, residence permit, etc."
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Anything else we should know about your itinerary or circumstances? (optional)">
                    <textarea
                      rows={3}
                      value={additionalInfo.otherCircumstances}
                      onChange={(e) => updateAdditionalInfo({ otherCircumstances: e.target.value })}
                      placeholder="e.g. special situations, previous visa refusals, longer-term plans, etc."
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>

              {/* Navigation Buttons matching Image 3 */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-primary hover:bg-sand/60 transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </button>

                <div className="flex flex-col items-center sm:items-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.99] transition-all"
                  >
                    Review Your Answers
                    <ArrowRight className="size-4" />
                  </button>
                  <span className="text-[11px] text-muted-foreground mt-1 font-medium">
                    Next: Confirm details and continue to secure payment.
                  </span>
                </div>
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
                    {destinationSlugs.map((slug) => {
                      const item = COUNTRIES.find((c) => c.slug === slug)
                      if (!item) return null
                      return (
                        <div
                          key={slug}
                          className="flex items-center justify-between rounded-xl bg-cream/70 px-3 py-2 text-xs font-medium text-primary"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={FLAGS[slug]}
                              alt=""
                              className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-black/10"
                            />
                            <span className="font-bold">{item.name}</span>
                          </div>
                          {destinationSlugs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDestination(slug)}
                              className="text-muted-foreground hover:text-red-600 transition-colors p-0.5"
                            >
                              <X className="size-3.5" />
                            </button>
                          )}
                        </div>
                      )
                    })}
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
                </div>
              </div>
            </aside>
          </form>
        </div>
      </section>
    </>
  )
}
