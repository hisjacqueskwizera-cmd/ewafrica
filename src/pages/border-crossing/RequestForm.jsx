import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BORDER_CROSSING_FLOW, COUNTRIES } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useBorderCrossingFlow } from '../../context/BorderCrossingFlowContext.jsx'

function SectionCard({ number, title, subtitle, children }) {
  return (
    <Reveal className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-start gap-3 bg-cream px-5 py-4 sm:px-6">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cocoa text-sm font-bold text-primary-foreground">
          {number}
        </span>
        <div>
          <h2 className="text-base font-bold text-primary sm:text-lg">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </Reveal>
  )
}

function Field({ label, required, hint, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-primary">
        {label}
        {required && <span className="text-copper"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-primary placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-copper'

function RadioOption({ name, value, checked, onChange, label, hint }) {
  return (
    <label className="flex items-start gap-2.5 rounded-xl border border-border p-3.5 text-sm text-primary has-checked:border-copper has-checked:bg-cream">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 size-4 shrink-0 accent-copper"
      />
      <span>
        <span className="block font-semibold">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span>}
      </span>
    </label>
  )
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function RequestForm() {
  useEffect(() => {
    document.title = 'Your Request | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request, updateRequest, price, isCustomQuote } = useBorderCrossingFlow()
  const copy = BORDER_CROSSING_FLOW.steps.request

  const years = [new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2]

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/travel-planner/border-crossing-guide/review')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={BORDER_CROSSING_FLOW.stepLabels} current={1} />}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
              Border Crossing Guide
            </p>
            <h1 className="mt-1 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {copy.heading}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {copy.description}
            </p>
          </Reveal>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <SectionCard
                number={1}
                title="Your Contact Information"
                subtitle="We will use this information to send your guide and any follow-up emails."
              >
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Full Name" required>
                    <input
                      required
                      value={request.fullName}
                      onChange={(e) => updateRequest({ fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email Address" required>
                    <input
                      required
                      type="email"
                      value={request.email}
                      onChange={(e) => updateRequest({ email: e.target.value })}
                      placeholder="Enter your email address"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone Number" required>
                    <input
                      required
                      type="tel"
                      value={request.phone}
                      onChange={(e) => updateRequest({ phone: e.target.value })}
                      placeholder="e.g. +1 206 350 1330"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={2} title="Your Travel Route">
                <Field
                  label="How many border crossings does your trip involve?"
                  required
                  hint="5 or more crossings receive a custom quote."
                >
                  <select
                    required
                    value={request.crossingCount}
                    onChange={(e) => updateRequest({ crossingCount: e.target.value })}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select number of border crossings
                    </option>
                    {BORDER_CROSSING_FLOW.crossingCountOptions.map((n) => (
                      <option key={n} value={n}>
                        {n === 5 ? '5 or more' : n} border crossing{n === 1 ? '' : 's'}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Where are you traveling from?" required>
                    <div className="grid grid-cols-2 gap-2.5">
                      <select
                        required
                        aria-label="Country traveling from"
                        value={request.fromCountrySlug}
                        onChange={(e) => updateRequest({ fromCountrySlug: e.target.value })}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Select country
                        </option>
                        {COUNTRIES.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <input
                        value={request.fromCity}
                        onChange={(e) => updateRequest({ fromCity: e.target.value })}
                        placeholder="City / area (optional)"
                        aria-label="City or area traveling from"
                        className={inputClass}
                      />
                    </div>
                  </Field>

                  <Field label="Where are you traveling to?" required>
                    <div className="grid grid-cols-2 gap-2.5">
                      <select
                        required
                        aria-label="Country traveling to"
                        value={request.toCountrySlug}
                        onChange={(e) => updateRequest({ toCountrySlug: e.target.value })}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Select country
                        </option>
                        {COUNTRIES.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <input
                        value={request.toCity}
                        onChange={(e) => updateRequest({ toCity: e.target.value })}
                        placeholder="City / area (optional)"
                        aria-label="City or area traveling to"
                        className={inputClass}
                      />
                    </div>
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={3} title="Your Travel Plans (Tentative)">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="When do you plan to travel?" required hint="Select month and year.">
                    <div className="grid grid-cols-2 gap-2.5">
                      <select
                        required
                        aria-label="Travel month"
                        value={request.travelMonth}
                        onChange={(e) => updateRequest({ travelMonth: e.target.value })}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Month
                        </option>
                        {MONTHS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <select
                        required
                        aria-label="Travel year"
                        value={request.travelYear}
                        onChange={(e) => updateRequest({ travelYear: e.target.value })}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Year
                        </option>
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Field>

                  <Field label="How long will you stay?" required hint="Select duration.">
                    <select
                      required
                      value={request.duration}
                      onChange={(e) => updateRequest({ duration: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select duration
                      </option>
                      {BORDER_CROSSING_FLOW.durationOptions.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={4} title="Purpose of Your Trip">
                <Field label="What is the purpose of your trip?" required>
                  <select
                    required
                    value={request.purpose}
                    onChange={(e) => updateRequest({ purpose: e.target.value })}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select purpose of travel
                    </option>
                    {BORDER_CROSSING_FLOW.purposeOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>
                {request.purpose === 'Other' && (
                  <input
                    value={request.otherPurpose}
                    onChange={(e) => updateRequest({ otherPurpose: e.target.value })}
                    placeholder="Please specify"
                    aria-label="Other purpose of travel"
                    className={inputClass}
                  />
                )}
              </SectionCard>

              <SectionCard
                number={5}
                title="Do You Already Know Which Border Crossing You Plan to Use?"
                subtitle="If you're not sure, that's okay — we'll recommend the best options for you."
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {BORDER_CROSSING_FLOW.certaintyOptions.map((option) => (
                    <RadioOption
                      key={option.value}
                      name="certainty"
                      value={option.value}
                      checked={request.certainty === option.value}
                      onChange={() => updateRequest({ certainty: option.value })}
                      label={option.label}
                      hint={option.hint}
                    />
                  ))}
                </div>
                {(request.certainty === 'idea' || request.certainty === 'known') && (
                  <Field label="Which border crossing(s) are you considering?">
                    <input
                      value={request.crossingDetails}
                      onChange={(e) => updateRequest({ crossingDetails: e.target.value })}
                      placeholder="e.g. Namanga (Kenya–Tanzania)"
                      className={inputClass}
                    />
                  </Field>
                )}
              </SectionCard>

              <SectionCard number={6} title="Additional Information">
                <Field label="Any details that will help us better understand your trip">
                  <textarea
                    rows={4}
                    value={request.additionalInfo}
                    onChange={(e) => updateRequest({ additionalInfo: e.target.value })}
                    placeholder="Write your message here..."
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                <Link
                  to={copy.back.to}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-copper"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {copy.back.label}
                </Link>
                <button type="submit" className="btn-copper w-full sm:w-auto">
                  {copy.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <PlannerSidebar
              heading="About This Service"
              price={price}
              priceLabel={isCustomQuote ? 'Custom Quote' : undefined}
              includes={BORDER_CROSSING_FLOW.includes}
              includesHeading="Border Crossing Guide Includes"
              caption={copy.sidebarCaption}
            />
          </form>
        </div>
      </section>
    </>
  )
}
