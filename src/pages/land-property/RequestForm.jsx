import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GHANA_LAND_PROPERTY_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useLandPropertyFlow } from '../../context/LandPropertyFlowContext.jsx'

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

export function RequestForm() {
  useEffect(() => {
    document.title = 'Your Request | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request, updateRequest, toggleListValue, price } = useLandPropertyFlow()
  const copy = GHANA_LAND_PROPERTY_FLOW.steps.request

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/ghana/land-property-guidance/review')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={GHANA_LAND_PROPERTY_FLOW.stepLabels} current={1} />}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
              Land & Property Guidance
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
                subtitle="We will use this information to send your guidance and any follow-up emails."
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

              <SectionCard number={2} title="Your Plan">
                <Field
                  label="What is the main purpose of your land or property interest in Ghana?"
                  required
                  hint="Select all that apply."
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {GHANA_LAND_PROPERTY_FLOW.purposeOptions.map((option) => (
                      <CheckboxOption
                        key={option}
                        checked={request.purposes.includes(option)}
                        onChange={() => toggleListValue('purposes', option)}
                        label={option}
                      />
                    ))}
                    <CheckboxOption
                      checked={request.purposes.includes('Other')}
                      onChange={() => toggleListValue('purposes', 'Other')}
                      label="Other (please specify)"
                    />
                  </div>
                  {request.purposes.includes('Other') && (
                    <input
                      value={request.otherPurpose}
                      onChange={(e) => updateRequest({ otherPurpose: e.target.value })}
                      placeholder="Please specify"
                      aria-label="Other purpose"
                      className={`${inputClass} mt-3`}
                    />
                  )}
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="How long do you plan to stay in Ghana?">
                    <select
                      value={request.lengthOfStay}
                      onChange={(e) => updateRequest({ lengthOfStay: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {GHANA_LAND_PROPERTY_FLOW.lengthOfStayOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="What type of property are you interested in?" required>
                    <select
                      required
                      value={request.propertyType}
                      onChange={(e) => updateRequest({ propertyType: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select property type
                      </option>
                      {GHANA_LAND_PROPERTY_FLOW.propertyTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="What is the purpose of your stay in Ghana?">
                    <select
                      value={request.stayPurpose}
                      onChange={(e) => updateRequest({ stayPurpose: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {GHANA_LAND_PROPERTY_FLOW.stayPurposeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Are you a Ghanaian citizen or a foreign national?" required>
                    <select
                      required
                      value={request.citizenship}
                      onChange={(e) => updateRequest({ citizenship: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {GHANA_LAND_PROPERTY_FLOW.citizenshipOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Where in Ghana are you interested in?" hint="Select all that apply.">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {GHANA_LAND_PROPERTY_FLOW.locationOptions.map((option) => (
                      <CheckboxOption
                        key={option}
                        checked={request.locations.includes(option)}
                        onChange={() => toggleListValue('locations', option)}
                        label={option}
                      />
                    ))}
                    <CheckboxOption
                      checked={request.locations.includes('Other')}
                      onChange={() => toggleListValue('locations', 'Other')}
                      label="Other (please specify)"
                    />
                  </div>
                  {request.locations.includes('Other') && (
                    <input
                      value={request.otherLocation}
                      onChange={(e) => updateRequest({ otherLocation: e.target.value })}
                      placeholder="Please specify"
                      aria-label="Other location"
                      className={`${inputClass} mt-3`}
                    />
                  )}
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Do you already have a specific property in mind?">
                    <select
                      value={request.havePropertyInMind}
                      onChange={(e) => updateRequest({ havePropertyInMind: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {GHANA_LAND_PROPERTY_FLOW.yesNoOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Have you visited the property or area?">
                    <select
                      value={request.visitedProperty}
                      onChange={(e) => updateRequest({ visitedProperty: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {GHANA_LAND_PROPERTY_FLOW.yesNoOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="What is your estimated budget range?">
                    <select
                      value={request.budgetRange}
                      onChange={(e) => updateRequest({ budgetRange: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select budget range
                      </option>
                      {GHANA_LAND_PROPERTY_FLOW.budgetOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="What is your preferred timeframe to purchase or secure the property?">
                    <select
                      value={request.timeframe}
                      onChange={(e) => updateRequest({ timeframe: e.target.value })}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select timeframe
                      </option>
                      {GHANA_LAND_PROPERTY_FLOW.timeframeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Questions / Comments" hint="Tell us anything else that would help us prepare your guidance.">
                  <textarea
                    rows={4}
                    value={request.questions}
                    onChange={(e) => updateRequest({ questions: e.target.value })}
                    placeholder="For example: I am interested in beachfront land for a small villa project. Please advise on ownership structure and fees."
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={3} title="Property Details" subtitle="Optional — share as much as you know.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Intended use">
                    <input
                      value={request.intendedUse}
                      onChange={(e) => updateRequest({ intendedUse: e.target.value })}
                      placeholder="e.g. Residential (Villa / Home)"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Size needed">
                    <input
                      value={request.sizeNeeded}
                      onChange={(e) => updateRequest({ sizeNeeded: e.target.value })}
                      placeholder="e.g. 0.5 – 1 acre"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Land preference">
                    <input
                      value={request.landPreference}
                      onChange={(e) => updateRequest({ landPreference: e.target.value })}
                      placeholder="e.g. Beachfront / Ocean view"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Title preference">
                    <input
                      value={request.titlePreference}
                      onChange={(e) => updateRequest({ titlePreference: e.target.value })}
                      placeholder="e.g. Freehold"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Utilities needed">
                    <input
                      value={request.utilitiesNeeded}
                      onChange={(e) => updateRequest({ utilitiesNeeded: e.target.value })}
                      placeholder="e.g. Water, Electricity, Road access"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Preferred areas / neighborhoods">
                    <input
                      value={request.preferredAreas}
                      onChange={(e) => updateRequest({ preferredAreas: e.target.value })}
                      placeholder="e.g. Cape Coast area"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Maximum distance to city center">
                    <input
                      value={request.maxDistance}
                      onChange={(e) => updateRequest({ maxDistance: e.target.value })}
                      placeholder="e.g. Within 30 minutes"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Nearest city / town">
                    <input
                      value={request.nearestCity}
                      onChange={(e) => updateRequest({ nearestCity: e.target.value })}
                      placeholder="e.g. Cape Coast"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Other requirements">
                    <input
                      value={request.otherRequirements}
                      onChange={(e) => updateRequest({ otherRequirements: e.target.value })}
                      placeholder="e.g. Safe area, Clear title, Good future value"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Property features priority">
                    <input
                      value={request.featurePriority}
                      onChange={(e) => updateRequest({ featurePriority: e.target.value })}
                      placeholder="e.g. Access to beach, Quiet area, Good road access"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={4} title="Research Focus" subtitle="Select all that apply.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {GHANA_LAND_PROPERTY_FLOW.researchFocusOptions.map((option) => (
                    <CheckboxOption
                      key={option}
                      checked={request.researchFocus.includes(option)}
                      onChange={() => toggleListValue('researchFocus', option)}
                      label={option}
                    />
                  ))}
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

            <PlannerSidebar
              heading="Land & Property Guidance"
              price={price}
              includes={GHANA_LAND_PROPERTY_FLOW.includes}
              includesHeading="Land & Property Guidance Includes"
              caption={copy.sidebarCaption}
            />
          </form>
        </div>
      </section>
    </>
  )
}
