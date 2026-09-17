import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VISA_GUIDANCE_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useVisaGuidanceFlow } from '../../context/VisaGuidanceFlowContext.jsx'

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

function RadioOption({ name, checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-sm text-primary">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="size-4 accent-copper"
      />
      {label}
    </label>
  )
}

function Select({ value, onChange, options, placeholder, required }) {
  return (
    <select required={required} value={value} onChange={onChange} className={inputClass}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export function RequestForm() {
  const { country, request, updateRequest, toggleListValue, price } = useVisaGuidanceFlow()
  const copy = VISA_GUIDANCE_FLOW.steps.request

  useEffect(() => {
    document.title = `Start Your Request — ${country.name} | East-West Africa Link`
  }, [country])

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(`/personal-visa-guidance/${country.slug}/review`)
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={VISA_GUIDANCE_FLOW.stepLabels} current={1} />}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
              {country.name} Personal Visa Guidance
            </p>
            <h1 className="mt-1 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {copy.heading}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Tell us about your travel plans and visa questions so we can provide the most helpful
              guidance.
            </p>
          </Reveal>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <SectionCard number={1} title="Your Information">
                <div className="grid gap-5 sm:grid-cols-2">
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
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone Number" required>
                    <input
                      required
                      type="tel"
                      value={request.phone}
                      onChange={(e) => updateRequest({ phone: e.target.value })}
                      placeholder="e.g. 206 123 4567"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Nationality / Passport Country" required>
                    <input
                      required
                      value={request.nationality}
                      onChange={(e) => updateRequest({ nationality: e.target.value })}
                      placeholder="Select your nationality"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Country of Residence" required>
                    <input
                      required
                      value={request.countryOfResidence}
                      onChange={(e) => updateRequest({ countryOfResidence: e.target.value })}
                      placeholder="Select your country of residence"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={2} title="Your Travel Plans">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={`Intended Date of Travel to ${country.name}`} required>
                    <input
                      required
                      type="date"
                      value={request.travelDate}
                      onChange={(e) => updateRequest({ travelDate: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Expected Length of Stay" required>
                    <Select
                      required
                      value={request.lengthOfStay}
                      onChange={(e) => updateRequest({ lengthOfStay: e.target.value })}
                      options={VISA_GUIDANCE_FLOW.lengthOfStayOptions}
                      placeholder="Select length of stay"
                    />
                  </Field>
                  <Field label="Purpose of Travel" required>
                    <Select
                      required
                      value={request.purpose}
                      onChange={(e) => updateRequest({ purpose: e.target.value })}
                      options={VISA_GUIDANCE_FLOW.purposeOptions}
                      placeholder="Select purpose of travel"
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={3} title="Visa Application Background">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={`Have you already started your ${country.name} visa application?`} required>
                    <div className="flex flex-wrap gap-4">
                      {VISA_GUIDANCE_FLOW.yesNoOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="applicationStarted"
                          checked={request.applicationStarted === option}
                          onChange={() => updateRequest({ applicationStarted: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>
                  <Field label={`Have you previously applied for a ${country.name} visa?`} required>
                    <div className="flex flex-wrap gap-4">
                      {VISA_GUIDANCE_FLOW.yesNoOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="previouslyApplied"
                          checked={request.previouslyApplied === option}
                          onChange={() => updateRequest({ previouslyApplied: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>
                </div>
              </SectionCard>

              <SectionCard
                number={4}
                title="What would you like help understanding?"
                subtitle="Select all that apply."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {VISA_GUIDANCE_FLOW.helpOptions.map((option) => (
                    <CheckboxOption
                      key={option}
                      checked={request.helpTopics.includes(option)}
                      onChange={() => toggleListValue('helpTopics', option)}
                      label={option}
                    />
                  ))}
                  <CheckboxOption
                    checked={request.helpTopics.includes('Other')}
                    onChange={() => toggleListValue('helpTopics', 'Other')}
                    label="Other (please specify)"
                  />
                </div>
                {request.helpTopics.includes('Other') && (
                  <input
                    value={request.otherHelpTopic}
                    onChange={(e) => updateRequest({ otherHelpTopic: e.target.value })}
                    placeholder="Tell us more (optional)"
                    aria-label="Other, please specify"
                    className={inputClass}
                  />
                )}
              </SectionCard>

              <SectionCard number={5} title="Additional Information">
                <Field label="Please tell us about your question or situation." required>
                  <textarea
                    required
                    rows={4}
                    value={request.situation}
                    onChange={(e) => updateRequest({ situation: e.target.value })}
                    placeholder="Share any details that will help us provide the most useful guidance (e.g. your travel plans, specific questions, or recent changes)."
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={6} title="Phone Consultation (Optional)">
                <Field
                  label={`Would you like a 20-minute phone consultation before you submit your ${country.name} visa application?`}
                  required
                >
                  <div className="space-y-2">
                    {VISA_GUIDANCE_FLOW.phoneConsultOptions.map((option) => (
                      <RadioOption
                        key={option}
                        name="phoneConsult"
                        checked={request.phoneConsult === option}
                        onChange={() => updateRequest({ phoneConsult: option })}
                        label={option}
                      />
                    ))}
                  </div>
                </Field>
              </SectionCard>

              <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                <Link
                  to={`/personal-visa-guidance/${country.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-copper"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back to Service Details
                </Link>
                <button type="submit" className="btn-copper w-full sm:w-auto">
                  {copy.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <PlannerSidebar
              heading="Service Price"
              photo={country.image}
              photoAlt={`A scenic view of ${country.name}`}
              price={price}
              includes={VISA_GUIDANCE_FLOW.includes}
              includesHeading="What's Included"
              caption={[`${country.name}, Africa`]}
            />
          </form>
        </div>
      </section>
    </>
  )
}
