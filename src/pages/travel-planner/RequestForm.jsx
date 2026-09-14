import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES, TRAVEL_PLANNER_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useTravelPlannerFlow } from '../../context/TravelPlannerFlowContext.jsx'

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

function RadioOption({ name, value, checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-sm text-primary">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="size-4 accent-copper"
      />
      {label}
    </label>
  )
}

function CheckboxOption({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-sm text-primary">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-copper" />
      {label}
    </label>
  )
}

export function RequestForm() {
  useEffect(() => {
    document.title = 'Your Travel Planner Request | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request, updateRequest, toggleListValue, tier } = useTravelPlannerFlow()
  const copy = TRAVEL_PLANNER_FLOW.steps.request
  const destinationNames = request.destinationSlugs
    .map((slug) => COUNTRIES.find((c) => c.slug === slug)?.name)
    .filter(Boolean)

  // The only way into this flow is the landing page's "View Details",
  // which won't even link here without at least one country picked (see
  // TravelPlanner.jsx) — this just catches a direct/bookmarked visit with
  // nothing carried over, rather than showing a request form with no
  // destination and no way to price it.
  useEffect(() => {
    if (request.destinationSlugs.length === 0) navigate('/travel-planner', { replace: true })
  }, [request.destinationSlugs, navigate])

  if (request.destinationSlugs.length === 0) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/travel-planner/review')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero cornerTagline={copy.cornerTagline} bannerTagline={copy.bannerTagline} />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
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
                title="Your Contact Details"
                subtitle="We will use this information to send your travel plan and any follow-up emails."
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
                  <Field label="Phone / WhatsApp Number" required>
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

              <SectionCard number={2} title="Your Trip">
                {/* Carried straight over from the landing page's picker —
                    not asked again here. Editing means going back to
                    change the selection, not re-picking inline. */}
                <div>
                  <span className="text-sm font-semibold text-primary">Your Destination(s)</span>
                  <p className="mt-1.5 text-base font-bold text-primary">
                    {destinationNames.join(', ')}
                  </p>
                  <Link
                    to="/travel-planner"
                    className="mt-1 inline-block text-xs font-semibold text-copper hover:underline"
                  >
                    Change destinations
                  </Link>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="When are you planning to travel?" required>
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        required
                        type="date"
                        aria-label="Arrival date"
                        value={request.arrivalDate}
                        onChange={(e) => updateRequest({ arrivalDate: e.target.value })}
                        className={inputClass}
                      />
                      <input
                        required
                        type="date"
                        aria-label="Departure date"
                        value={request.departureDate}
                        onChange={(e) => updateRequest({ departureDate: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={request.datesFlexible}
                        onChange={(e) => updateRequest({ datesFlexible: e.target.checked })}
                        className="size-3.5 accent-copper"
                      />
                      My dates are flexible
                    </label>
                  </Field>

                  <Field label="How many people are travelling?" required>
                    <select
                      required
                      value={request.travellerCount}
                      onChange={(e) => updateRequest({ travellerCount: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Select number</option>
                      {['1', '2', '3', '4', '5', '6+'].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field
                  label="Which places are you already considering?"
                  hint="It is fine if you are not sure yet."
                >
                  <textarea
                    rows={2}
                    value={request.placesConsidering}
                    onChange={(e) => updateRequest({ placesConsidering: e.target.value })}
                    placeholder="e.g. cities, regions, national parks, or specific places"
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={3} title="Your Travel Interests">
                <div>
                  <span className="text-sm font-semibold text-primary">
                    What are you most interested in? (Select all that apply)
                  </span>
                  <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
                    {TRAVEL_PLANNER_FLOW.interestOptions.map((option) => (
                      <CheckboxOption
                        key={option}
                        checked={request.interests.includes(option)}
                        onChange={() => toggleListValue('interests', option)}
                        label={option}
                      />
                    ))}
                    <CheckboxOption
                      checked={request.interests.includes('Other')}
                      onChange={() => toggleListValue('interests', 'Other')}
                      label="Other (please specify)"
                    />
                  </div>
                  {request.interests.includes('Other') && (
                    <input
                      value={request.otherInterest}
                      onChange={(e) => updateRequest({ otherInterest: e.target.value })}
                      placeholder="Enter your interests"
                      className={`${inputClass} mt-2.5`}
                    />
                  )}
                </div>
              </SectionCard>

              <SectionCard number={4} title="Your Travel Style">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <span className="text-sm font-semibold text-primary">
                      How would you describe your preferred way of travelling?{' '}
                      <span className="text-copper">*</span>
                    </span>
                    <div className="mt-2 space-y-1.5">
                      {TRAVEL_PLANNER_FLOW.travelStyleOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="travelStyle"
                          value={option}
                          checked={request.travelStyle === option}
                          onChange={() => updateRequest({ travelStyle: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-primary">
                      What type of accommodation do you generally prefer?
                    </span>
                    <div className="mt-2 space-y-1.5">
                      {TRAVEL_PLANNER_FLOW.accommodationOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="accommodation"
                          value={option}
                          checked={request.accommodation === option}
                          onChange={() => updateRequest({ accommodation: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard number={5} title="Getting Around">
                <div>
                  <span className="text-sm font-semibold text-primary">
                    How do you expect to travel during your trip? (Select all that apply)
                  </span>
                  <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                    {TRAVEL_PLANNER_FLOW.gettingAroundOptions.map((option) => (
                      <CheckboxOption
                        key={option}
                        checked={request.gettingAround.includes(option)}
                        onChange={() => toggleListValue('gettingAround', option)}
                        label={option}
                      />
                    ))}
                  </div>
                </div>
              </SectionCard>

              <SectionCard number={6} title="Your Current Plans">
                <div>
                  <span className="text-sm font-semibold text-primary">
                    Have you already booked or paid for any part of this trip?{' '}
                    <span className="text-copper">*</span>
                  </span>
                  <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                    {TRAVEL_PLANNER_FLOW.bookedStatusOptions.map((option) => (
                      <RadioOption
                        key={option}
                        name="bookedStatus"
                        value={option}
                        checked={request.bookedStatus === option}
                        onChange={() => updateRequest({ bookedStatus: option })}
                        label={option}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="If yes, what have you already arranged?">
                    <textarea
                      rows={2}
                      value={request.alreadyArranged}
                      onChange={(e) => updateRequest({ alreadyArranged: e.target.value })}
                      placeholder="Enter details (flights, accommodation, transportation, tours, etc.)"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Do you already have a rough itinerary or route?">
                    <textarea
                      rows={2}
                      value={request.roughItinerary}
                      onChange={(e) => updateRequest({ roughItinerary: e.target.value })}
                      placeholder="You may share what you have planned so far."
                      className={inputClass}
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={7} title="What Do You Need Help With?">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="What would you most like us to help you with?" required>
                    <textarea
                      required
                      rows={2}
                      value={request.helpWith}
                      onChange={(e) => updateRequest({ helpWith: e.target.value })}
                      placeholder="Tell us your main questions, concerns or areas of focus."
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Is there anything else we should know about your trip?">
                    <textarea
                      rows={2}
                      value={request.additionalNotes}
                      onChange={(e) => updateRequest({ additionalNotes: e.target.value })}
                      placeholder="Add any additional information here."
                      className={inputClass}
                    />
                  </Field>
                </div>
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

            <PlannerSidebar price={tier?.price} caption={copy.sidebarCaption} />
          </form>
        </div>
      </section>
    </>
  )
}
