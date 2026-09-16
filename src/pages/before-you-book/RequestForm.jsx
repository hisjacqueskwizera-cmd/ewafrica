import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BEFORE_YOU_BOOK_FLOW, COUNTRIES } from '../../data/siteContent.js'
import { DestinationPicker } from '../../components/DestinationPicker.jsx'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useBeforeYouBookFlow } from '../../context/BeforeYouBookFlowContext.jsx'

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

function CheckboxOption({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-sm text-primary">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-copper" />
      {label}
    </label>
  )
}

// Read-only summary shown when destinations were already picked on the
// Travel Planner landing page's picker — mirrors the Travel Planner
// flow's own DestinationSummary (same "don't re-ask" rule), just pointed
// back at /travel-planner, the one place that picker lives.
function DestinationSummary({ destinationNames }) {
  return (
    <div>
      <span className="text-sm font-semibold text-primary">Your planned destinations</span>
      <p className="mt-1.5 text-base font-bold text-primary">{destinationNames.join(', ')}</p>
      <Link
        to="/travel-planner"
        className="mt-1 inline-block text-xs font-semibold text-copper hover:underline"
      >
        Change destinations
      </Link>
    </div>
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
  const { request, updateRequest, toggleListValue, price } = useBeforeYouBookFlow()
  const copy = BEFORE_YOU_BOOK_FLOW.steps.request

  // Captured once, at mount, from whatever the context seeded from the URL
  // — not derived from request.destinationSlugs on every render, since
  // that would flip this flag the moment someone picks a country in the
  // inline picker below (arrivedWithSelection === false) and switch them
  // over to the read-only summary mid-selection.
  const [arrivedWithSelection] = useState(() => request.destinationSlugs.length > 0)
  const [countChoice, setCountChoice] = useState('')

  const destinationNames = request.destinationSlugs
    .map((slug) => COUNTRIES.find((c) => c.slug === slug)?.name)
    .filter(Boolean)

  const years = [new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2]

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/travel-planner/before-you-book-check/review')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={BEFORE_YOU_BOOK_FLOW.stepLabels} current={1} />}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
              Before You Book Check
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
                subtitle="We will use this information to send your review and any follow-up emails."
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

              <SectionCard number={2} title="Your Planned Destinations">
                {arrivedWithSelection ? (
                  <DestinationSummary destinationNames={destinationNames} />
                ) : (
                  <>
                    <Field
                      label="How many countries are you planning to visit?"
                      required
                      hint="Choose 1, 2, 3, or 4 countries."
                    >
                      <select
                        required
                        value={countChoice}
                        onChange={(e) => {
                          const next = Number(e.target.value)
                          setCountChoice(next)
                          if (request.destinationSlugs.length > next) {
                            updateRequest({ destinationSlugs: request.destinationSlugs.slice(0, next) })
                          }
                        }}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Select number of countries
                        </option>
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'country' : 'countries'}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field
                      label="Select your destination(s)"
                      required
                      hint={`You can select up to ${countChoice || 4} ${countChoice === 1 ? 'country' : 'countries'}.`}
                    >
                      <DestinationPicker
                        countries={COUNTRIES}
                        values={request.destinationSlugs}
                        onChange={(slugs) => updateRequest({ destinationSlugs: slugs })}
                        max={countChoice || 4}
                      />
                    </Field>
                  </>
                )}
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

                  <Field label="How long do you plan to stay?" required hint="Select duration.">
                    <select
                      required
                      value={request.duration}
                      onChange={(e) => updateRequest({ duration: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select duration
                      </option>
                      {BEFORE_YOU_BOOK_FLOW.durationOptions.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={4} title="What Are You Planning to Book?" subtitle="Check all that apply.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {BEFORE_YOU_BOOK_FLOW.bookingOptions.map((option) => (
                    <CheckboxOption
                      key={option}
                      checked={request.bookingPlans.includes(option)}
                      onChange={() => toggleListValue('bookingPlans', option)}
                      label={option}
                    />
                  ))}
                  <CheckboxOption
                    checked={request.bookingPlans.includes('Other')}
                    onChange={() => toggleListValue('bookingPlans', 'Other')}
                    label="Other (please specify)"
                  />
                </div>
                {request.bookingPlans.includes('Other') && (
                  <input
                    value={request.otherBookingPlan}
                    onChange={(e) => updateRequest({ otherBookingPlan: e.target.value })}
                    placeholder="Please specify"
                    aria-label="Other booking plans"
                    className={inputClass}
                  />
                )}
              </SectionCard>

              <SectionCard number={5} title="Share Your Planned Itinerary or Ideas">
                <Field label="Tell us what you have in mind so far">
                  <textarea
                    rows={4}
                    value={request.itinerary}
                    onChange={(e) => updateRequest({ itinerary: e.target.value })}
                    placeholder="For example: I plan to visit Accra and Cape Coast in Ghana for 7 days. I am considering flying into Accra and taking a private driver to Cape Coast..."
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={6} title="Specific Questions or Concerns">
                <Field label="What would you like us to check or advise on before you book?" required>
                  <textarea
                    required
                    rows={4}
                    value={request.questions}
                    onChange={(e) => updateRequest({ questions: e.target.value })}
                    placeholder="For example: Are these destinations realistic for my timeframe? Are there any travel restrictions? Is this a good route? Any suggestions to improve my plans?"
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
              heading="Before You Book Check"
              price={price}
              includes={BEFORE_YOU_BOOK_FLOW.includes}
              includesHeading="Before You Book Check Includes"
              caption={copy.sidebarCaption}
            />
          </form>
        </div>
      </section>
    </>
  )
}
