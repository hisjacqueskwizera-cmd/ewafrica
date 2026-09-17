import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GHANA_RIGHT_OF_ABODE_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useRightOfAbodeFlow } from '../../context/RightOfAbodeFlowContext.jsx'

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
  useEffect(() => {
    document.title = 'Right of Abode Guidance Questionnaire | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request, updateRequest, toggleListValue, price } = useRightOfAbodeFlow()
  const copy = GHANA_RIGHT_OF_ABODE_FLOW.steps.request

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/ghana/right-of-abode-guidance/review')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={GHANA_RIGHT_OF_ABODE_FLOW.stepLabels} current={1} />}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
              Right of Abode Guidance
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
              <SectionCard number={1} title="Personal Information">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name (as on passport)" required>
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
                  <Field label="WhatsApp Number" hint="Optional.">
                    <input
                      type="tel"
                      value={request.whatsapp}
                      onChange={(e) => updateRequest({ whatsapp: e.target.value })}
                      placeholder="e.g. +1 206 350 1330"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Nationality" required>
                    <input
                      required
                      value={request.nationality}
                      onChange={(e) => updateRequest({ nationality: e.target.value })}
                      placeholder="Enter your nationality"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Current Country of Residence" required>
                    <input
                      required
                      value={request.currentCountry}
                      onChange={(e) => updateRequest({ currentCountry: e.target.value })}
                      placeholder="Enter your current country"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="City" hint="Optional.">
                    <input
                      value={request.city}
                      onChange={(e) => updateRequest({ city: e.target.value })}
                      placeholder="Enter your city"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={2} title="Basis for Right of Abode">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Have you ever been a Ghanaian citizen?" required>
                    <Select
                      required
                      value={request.wasGhanaianCitizen}
                      onChange={(e) => updateRequest({ wasGhanaianCitizen: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.yesNoOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="If yes, how did you acquire Ghanaian citizenship?">
                    <Select
                      value={request.howAcquired}
                      onChange={(e) => updateRequest({ howAcquired: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.citizenshipAcquiredOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="Did you lose or renounce Ghanaian citizenship after acquiring another nationality?">
                    <Select
                      value={request.lostCitizenship}
                      onChange={(e) => updateRequest({ lostCitizenship: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.yesNoUnsureOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="Are you seeking Right of Abode based on African descent in the diaspora?" required>
                    <Select
                      required
                      value={request.seekingByDescent}
                      onChange={(e) => updateRequest({ seekingByDescent: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.yesNoOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                </div>
                <Field label="Please describe your Ghanaian family connection, former citizenship, ancestry, or other basis for seeking Right of Abode.">
                  <textarea
                    rows={3}
                    value={request.familyConnection}
                    onChange={(e) => updateRequest({ familyConnection: e.target.value })}
                    placeholder="Type your answer here..."
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={3} title="Ghana Residence & Immigration History">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Have you lived in Ghana before?" required>
                    <Select
                      required
                      value={request.livedInGhana}
                      onChange={(e) => updateRequest({ livedInGhana: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.yesNoOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="If yes, approximately when and for how long?">
                    <input
                      value={request.whenHowLong}
                      onChange={(e) => updateRequest({ whenHowLong: e.target.value })}
                      placeholder="e.g. 2015 – 2018, 3 years"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="What is your current or most recent immigration status in Ghana?">
                    <Select
                      value={request.immigrationStatus}
                      onChange={(e) => updateRequest({ immigrationStatus: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.immigrationStatusOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="Have you previously applied for Ghanaian residence, citizenship, Right of Abode, or another long-term status?">
                    <Select
                      value={request.previouslyApplied}
                      onChange={(e) => updateRequest({ previouslyApplied: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.yesNoOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                </div>
                <Field label="If yes, please briefly explain.">
                  <textarea
                    rows={3}
                    value={request.previousApplyExplain}
                    onChange={(e) => updateRequest({ previousApplyExplain: e.target.value })}
                    placeholder="Type your answer here..."
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={4} title="Current Circumstances & Long-Term Plans">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="When do you expect to move to or return to Ghana?" hint="e.g. March 2026">
                    <input
                      value={request.moveDate}
                      onChange={(e) => updateRequest({ moveDate: e.target.value })}
                      placeholder="MM / YYYY"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="How long do you intend to live in Ghana?">
                    <Select
                      value={request.intendLength}
                      onChange={(e) => updateRequest({ intendLength: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.intendLengthOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="What is your main purpose for living in Ghana?">
                    <Select
                      value={request.mainPurpose}
                      onChange={(e) => updateRequest({ mainPurpose: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.purposeOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="Which areas or regions of Ghana are you considering?">
                    <input
                      value={request.areasConsidering}
                      onChange={(e) => updateRequest({ areasConsidering: e.target.value })}
                      placeholder="e.g. Accra, Kumasi, Cape Coast"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={5} title="Eligibility & Supporting Information">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Do you have two Ghanaian citizens who may be able to act as referees for you?" required>
                    <Select
                      required
                      value={request.haveReferees}
                      onChange={(e) => updateRequest({ haveReferees: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.yesNoOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="Have you ever been convicted of a criminal offence in any country?" required>
                    <Select
                      required
                      value={request.criminalOffence}
                      onChange={(e) => updateRequest({ criminalOffence: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.yesNoOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="Do you have evidence of your financial means or ability to support yourself in Ghana?">
                    <Select
                      value={request.financialMeans}
                      onChange={(e) => updateRequest({ financialMeans: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.yesNoOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="Have you made, or do you plan to make, a contribution to Ghana through business, investment, employment, professional work, community involvement, charity, or another activity?">
                    <Select
                      value={request.contributionPlan}
                      onChange={(e) => updateRequest({ contributionPlan: e.target.value })}
                      options={GHANA_RIGHT_OF_ABODE_FLOW.yesNoOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                </div>
                <Field label="If yes (financial means), please briefly explain.">
                  <textarea
                    rows={3}
                    value={request.financialExplain}
                    onChange={(e) => updateRequest({ financialExplain: e.target.value })}
                    placeholder="Type your answer here..."
                    className={inputClass}
                  />
                </Field>
                <Field label="If yes (contribution), please briefly describe.">
                  <textarea
                    rows={3}
                    value={request.contributionExplain}
                    onChange={(e) => updateRequest({ contributionExplain: e.target.value })}
                    placeholder="Type your answer here..."
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={6} title="Documents You Currently Have" subtitle="Select all that apply.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {GHANA_RIGHT_OF_ABODE_FLOW.documentOptions.map((option) => (
                    <CheckboxOption
                      key={option}
                      checked={request.documents.includes(option)}
                      onChange={() => toggleListValue('documents', option)}
                      label={option}
                    />
                  ))}
                </div>
              </SectionCard>

              <SectionCard number={7} title="Your Questions">
                <Field
                  label="What specific questions or concerns would you like us to address in your personalized Right of Abode Guidance?"
                  required
                >
                  <textarea
                    required
                    rows={4}
                    value={request.questions}
                    onChange={(e) => updateRequest({ questions: e.target.value })}
                    placeholder="Type your answer here..."
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
              heading="Right of Abode Guidance"
              photo="/Pictures/image_Ghana.webp"
              photoAlt="Cape Coast Castle overlooking the Ghanaian coastline"
              price={price}
              includes={GHANA_RIGHT_OF_ABODE_FLOW.includes}
              includesHeading="Right of Abode Guidance Includes"
              caption={copy.sidebarCaption}
            />
          </form>
        </div>
      </section>
    </>
  )
}
