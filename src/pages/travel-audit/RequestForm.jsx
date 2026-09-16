import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES, TRAVEL_AUDIT_FLOW } from '../../data/siteContent.js'
import { DestinationPicker } from '../../components/DestinationPicker.jsx'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useTravelAuditFlow } from '../../context/TravelAuditFlowContext.jsx'

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
// Travel Planner landing page's picker — mirrors Before You Book Check's
// own request form (same "don't re-ask" rule), just pointed back at
// /travel-planner, the one place that picker lives.
function DestinationSummary({ destinationNames }) {
  return (
    <div>
      <span className="text-sm font-semibold text-primary">Your destination(s)</span>
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
  const { request, updateRequest, toggleListValue, price } = useTravelAuditFlow()
  const copy = TRAVEL_AUDIT_FLOW.steps.request

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
    navigate('/travel-planner/travel-audit/review')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={TRAVEL_AUDIT_FLOW.stepLabels} current={1} />}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">Travel Audit</p>
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

              <SectionCard number={2} title="Your Trip Details">
                {arrivedWithSelection ? (
                  <DestinationSummary destinationNames={destinationNames} />
                ) : (
                  <>
                    <Field
                      label="How many countries are included in your trip?"
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

              <SectionCard number={3} title="Your Travel Timeline">
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

                  <Field label="How long will you be traveling?" required hint="Select duration.">
                    <select
                      required
                      value={request.duration}
                      onChange={(e) => updateRequest({ duration: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select duration
                      </option>
                      {TRAVEL_AUDIT_FLOW.durationOptions.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </SectionCard>

              <SectionCard
                number={4}
                title="What Have You Already Booked?"
                subtitle="Check all that apply."
              >
                <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {TRAVEL_AUDIT_FLOW.bookedOptions.map((option) => (
                      <CheckboxOption
                        key={option}
                        checked={request.alreadyBooked.includes(option)}
                        onChange={() => toggleListValue('alreadyBooked', option)}
                        label={option}
                      />
                    ))}
                    <CheckboxOption
                      checked={request.alreadyBooked.includes('Other')}
                      onChange={() => toggleListValue('alreadyBooked', 'Other')}
                      label="Other (please specify)"
                    />
                  </div>
                  <div className="flex items-start gap-2.5 rounded-xl bg-cream p-4 text-xs text-primary sm:max-w-56">
                    <Info className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                    <div>
                      <p className="font-bold">Please Note</p>
                      <p className="mt-0.5 text-muted-foreground">
                        You can share your booking details or paste confirmation information in the
                        next section.
                      </p>
                    </div>
                  </div>
                </div>
                {request.alreadyBooked.includes('Other') && (
                  <input
                    value={request.otherAlreadyBooked}
                    onChange={(e) => updateRequest({ otherAlreadyBooked: e.target.value })}
                    placeholder="Please specify"
                    aria-label="Other already booked"
                    className={inputClass}
                  />
                )}
              </SectionCard>

              <SectionCard number={5} title="Share Your Current Bookings">
                <Field label="Tell us what you have already booked. Include dates, flight numbers, accommodation names, transport details, or any other confirmed plans.">
                  <textarea
                    rows={4}
                    value={request.currentBookings}
                    onChange={(e) => updateRequest({ currentBookings: e.target.value })}
                    placeholder="For example: I have booked a flight from New York to Accra on March 10. I have 4 nights at a hotel in Accra, a bus from Accra to Kumasi, and a flight from Accra to Zanzibar on March 15..."
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={6} title="What Would You Like Us to Review?">
                <Field label="Let us know any specific concerns or questions you have about your current bookings or plans." required>
                  <textarea
                    required
                    rows={4}
                    value={request.reviewRequest}
                    onChange={(e) => updateRequest({ reviewRequest: e.target.value })}
                    placeholder="For example: Are my connections realistic? Is there a better route? Are there any travel restrictions? Do you see any potential problems with my itinerary?"
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
              includes={TRAVEL_AUDIT_FLOW.includes}
              includesHeading="Travel Audit Includes"
              caption={copy.sidebarCaption}
            />
          </form>
        </div>
      </section>
    </>
  )
}
