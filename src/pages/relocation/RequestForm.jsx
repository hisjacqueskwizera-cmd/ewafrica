import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GHANA_RELOCATION_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useRelocationFlow } from '../../context/RelocationFlowContext.jsx'

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

// Every checkbox group in this form ends with an "Other (please specify)"
// option — this renders that shared trio (checkbox list + Other toggle +
// its text input) so each section below stays a short list of props
// rather than repeating the same JSX ten times.
function CheckboxGroupWithOther({ field, options, request, toggleListValue, updateRequest, otherField }) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <CheckboxOption
            key={option}
            checked={request[field].includes(option)}
            onChange={() => toggleListValue(field, option)}
            label={option}
          />
        ))}
        <CheckboxOption
          checked={request[field].includes('Other')}
          onChange={() => toggleListValue(field, 'Other')}
          label="Other (please specify)"
        />
      </div>
      {request[field].includes('Other') && (
        <input
          value={request[otherField]}
          onChange={(e) => updateRequest({ [otherField]: e.target.value })}
          placeholder="Please specify"
          aria-label="Other, please specify"
          className={`${inputClass} mt-3`}
        />
      )}
    </>
  )
}

export function RequestForm() {
  useEffect(() => {
    document.title = 'Your Information | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request, updateRequest, toggleListValue, price } = useRelocationFlow()
  const copy = GHANA_RELOCATION_FLOW.steps.request

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/ghana/complete-relocation-package/review')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={GHANA_RELOCATION_FLOW.stepLabels} current={1} />}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
              Complete Relocation Package
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
                  <Field label="Current Country of Residence" required>
                    <input
                      required
                      value={request.currentCountry}
                      onChange={(e) => updateRequest({ currentCountry: e.target.value })}
                      placeholder="Enter your current country"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Nationality(ies)" required>
                    <input
                      required
                      value={request.nationality}
                      onChange={(e) => updateRequest({ nationality: e.target.value })}
                      placeholder="Enter your nationality"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="Preferred Contact Method" required>
                  <div className="flex flex-wrap gap-4">
                    {GHANA_RELOCATION_FLOW.contactMethodOptions.map((option) => (
                      <RadioOption
                        key={option}
                        name="contactMethod"
                        checked={request.contactMethod === option}
                        onChange={() => updateRequest({ contactMethod: option })}
                        label={option}
                      />
                    ))}
                  </div>
                </Field>
              </SectionCard>

              <SectionCard number={2} title="Relocation Plans">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="When do you plan to move to Ghana?" required>
                    <Select
                      required
                      value={request.moveTimeframe}
                      onChange={(e) => updateRequest({ moveTimeframe: e.target.value })}
                      options={GHANA_RELOCATION_FLOW.timeframeOptions}
                      placeholder="Select timeframe"
                    />
                  </Field>
                  <Field label="Number of people (including yourself)">
                    <Select
                      value={request.numPeople}
                      onChange={(e) => updateRequest({ numPeople: e.target.value })}
                      options={GHANA_RELOCATION_FLOW.numPeopleOptions}
                      placeholder="Select number"
                    />
                  </Field>
                </div>

                <Field label="Main purpose of relocation" required>
                  <div className="flex flex-wrap gap-4">
                    {GHANA_RELOCATION_FLOW.purposeOptions.map((option) => (
                      <RadioOption
                        key={option}
                        name="purpose"
                        checked={request.purpose === option}
                        onChange={() => updateRequest({ purpose: option })}
                        label={option}
                      />
                    ))}
                    <RadioOption
                      name="purpose"
                      checked={request.purpose === 'Other'}
                      onChange={() => updateRequest({ purpose: 'Other' })}
                      label="Other (please specify)"
                    />
                  </div>
                  {request.purpose === 'Other' && (
                    <input
                      value={request.otherPurpose}
                      onChange={(e) => updateRequest({ otherPurpose: e.target.value })}
                      placeholder="Please specify"
                      aria-label="Other purpose"
                      className={`${inputClass} mt-3`}
                    />
                  )}
                </Field>

                <Field label="Will you be relocating alone or with others?" required>
                  <div className="flex flex-wrap gap-4">
                    {GHANA_RELOCATION_FLOW.relocatingWithOptions.map((option) => (
                      <RadioOption
                        key={option}
                        name="relocatingWith"
                        checked={request.relocatingWith === option}
                        onChange={() => updateRequest({ relocatingWith: option })}
                        label={option}
                      />
                    ))}
                    <RadioOption
                      name="relocatingWith"
                      checked={request.relocatingWith === 'Other'}
                      onChange={() => updateRequest({ relocatingWith: 'Other' })}
                      label="Other (please specify)"
                    />
                  </div>
                  {request.relocatingWith === 'Other' && (
                    <input
                      value={request.otherRelocatingWith}
                      onChange={(e) => updateRequest({ otherRelocatingWith: e.target.value })}
                      placeholder="Please specify"
                      aria-label="Other relocating with"
                      className={`${inputClass} mt-3`}
                    />
                  )}
                </Field>

                <Field label="What are your top 3 goals for living in Ghana?" hint="Select up to 3.">
                  <CheckboxGroupWithOther
                    field="topGoals"
                    otherField="otherTopGoal"
                    options={GHANA_RELOCATION_FLOW.topGoalsOptions}
                    request={request}
                    toggleListValue={toggleListValue}
                    updateRequest={updateRequest}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={3} title="Preferred Locations & Housing">
                <Field label="Which area(s) are you considering?" required hint="Select up to 3.">
                  <CheckboxGroupWithOther
                    field="areas"
                    otherField="otherArea"
                    options={GHANA_RELOCATION_FLOW.areaOptions}
                    request={request}
                    toggleListValue={toggleListValue}
                    updateRequest={updateRequest}
                  />
                </Field>

                <Field label="Type of housing you are interested in?" required>
                  <div className="flex flex-wrap gap-4">
                    {GHANA_RELOCATION_FLOW.housingTypeOptions.map((option) => (
                      <RadioOption
                        key={option}
                        name="housingType"
                        checked={request.housingType === option}
                        onChange={() => updateRequest({ housingType: option })}
                        label={option}
                      />
                    ))}
                    <RadioOption
                      name="housingType"
                      checked={request.housingType === 'Other'}
                      onChange={() => updateRequest({ housingType: 'Other' })}
                      label="Other (please specify)"
                    />
                  </div>
                  {request.housingType === 'Other' && (
                    <input
                      value={request.otherHousingType}
                      onChange={(e) => updateRequest({ otherHousingType: e.target.value })}
                      placeholder="Please specify"
                      aria-label="Other housing type"
                      className={`${inputClass} mt-3`}
                    />
                  )}
                </Field>

                <Field label="Estimated monthly living budget (USD)">
                  <Select
                    value={request.budgetRange}
                    onChange={(e) => updateRequest({ budgetRange: e.target.value })}
                    options={GHANA_RELOCATION_FLOW.budgetOptions}
                    placeholder="Select range"
                  />
                </Field>

                <Field label="What is most important to you in a neighborhood?" hint="Select up to 3.">
                  <CheckboxGroupWithOther
                    field="neighborhoodPriorities"
                    otherField="otherNeighborhoodPriority"
                    options={GHANA_RELOCATION_FLOW.neighborhoodPriorityOptions}
                    request={request}
                    toggleListValue={toggleListValue}
                    updateRequest={updateRequest}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={4} title="Immigration, Residency & Official Processes">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Do you currently have a visa or residency permit for Ghana?" required>
                    <Select
                      required
                      value={request.hasVisa}
                      onChange={(e) => updateRequest({ hasVisa: e.target.value })}
                      options={GHANA_RELOCATION_FLOW.hasVisaOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                  <Field label="Which residency option are you most interested in?">
                    <Select
                      value={request.residencyOption}
                      onChange={(e) => updateRequest({ residencyOption: e.target.value })}
                      options={GHANA_RELOCATION_FLOW.residencyOptionOptions}
                      placeholder="Select an option"
                    />
                  </Field>
                </div>
                <Field label="What specific questions do you have about immigration or residency?">
                  <textarea
                    rows={3}
                    value={request.immigrationQuestions}
                    onChange={(e) => updateRequest({ immigrationQuestions: e.target.value })}
                    placeholder="e.g. required documents, timelines, eligibility, etc."
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={5} title="Work, Business, Banking & Education">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Are you interested in working in Ghana?">
                    <div className="flex flex-wrap gap-4">
                      {GHANA_RELOCATION_FLOW.yesNoMaybeOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="interestedWorking"
                          checked={request.interestedWorking === option}
                          onChange={() => updateRequest({ interestedWorking: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>
                  <Field label="Are you interested in starting a business?">
                    <div className="flex flex-wrap gap-4">
                      {GHANA_RELOCATION_FLOW.yesNoMaybeOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="interestedBusiness"
                          checked={request.interestedBusiness === option}
                          onChange={() => updateRequest({ interestedBusiness: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>
                  <Field label="Do you need information on banking?">
                    <div className="flex flex-wrap gap-4">
                      {GHANA_RELOCATION_FLOW.yesNoMaybeOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="needBanking"
                          checked={request.needBanking === option}
                          onChange={() => updateRequest({ needBanking: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>
                  <Field label="Do you have school-age children or need education information?">
                    <div className="flex flex-wrap gap-4">
                      {GHANA_RELOCATION_FLOW.yesNoMaybeOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="needEducation"
                          checked={request.needEducation === option}
                          onChange={() => updateRequest({ needEducation: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={6} title="Healthcare & Insurance">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Do you need information on healthcare in Ghana?">
                    <div className="flex flex-wrap gap-4">
                      {GHANA_RELOCATION_FLOW.yesNoMaybeOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="needHealthcare"
                          checked={request.needHealthcare === option}
                          onChange={() => updateRequest({ needHealthcare: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>
                  <Field label="Are you interested in international health insurance options?">
                    <div className="flex flex-wrap gap-4">
                      {GHANA_RELOCATION_FLOW.yesNoMaybeOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="needInsurance"
                          checked={request.needInsurance === option}
                          onChange={() => updateRequest({ needInsurance: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>
                </div>
                <Field label="Any specific healthcare questions?">
                  <input
                    value={request.healthcareQuestions}
                    onChange={(e) => updateRequest({ healthcareQuestions: e.target.value })}
                    placeholder="e.g. hospitals, costs, insurance and healthcare options"
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={7} title="Transportation & Daily Life">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="What transportation information would be helpful?" hint="Select all that apply.">
                    <div className="space-y-2.5">
                      {GHANA_RELOCATION_FLOW.transportInfoOptions.map((option) => (
                        <CheckboxOption
                          key={option}
                          checked={request.transportInfo.includes(option)}
                          onChange={() => toggleListValue('transportInfo', option)}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>
                  <Field label="Any other daily life topics you would like covered?" hint="Select all that apply.">
                    <div className="space-y-2.5">
                      {GHANA_RELOCATION_FLOW.dailyLifeOptions.map((option) => (
                        <CheckboxOption
                          key={option}
                          checked={request.dailyLifeTopics.includes(option)}
                          onChange={() => toggleListValue('dailyLifeTopics', option)}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>
                </div>
              </SectionCard>

              <SectionCard number={8} title="Preparing for Your Move">
                <Field label="What support do you need before your move?" hint="Select all that apply.">
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {GHANA_RELOCATION_FLOW.moveSupportOptions.map((option) => (
                      <CheckboxOption
                        key={option}
                        checked={request.moveSupport.includes(option)}
                        onChange={() => toggleListValue('moveSupport', option)}
                        label={option}
                      />
                    ))}
                  </div>
                </Field>
                <Field label="Have you visited Ghana before?">
                  <div className="flex flex-wrap gap-4">
                    {GHANA_RELOCATION_FLOW.yesNoOptions.map((option) => (
                      <RadioOption
                        key={option}
                        name="visitedBefore"
                        checked={request.visitedBefore === option}
                        onChange={() => updateRequest({ visitedBefore: option })}
                        label={option}
                      />
                    ))}
                  </div>
                </Field>
                <Field label="Any other preparation questions or concerns?">
                  <textarea
                    rows={3}
                    value={request.prepQuestions}
                    onChange={(e) => updateRequest({ prepQuestions: e.target.value })}
                    placeholder="Tell us more..."
                    className={inputClass}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={9} title="Settling In">
                <Field label="What type of information would be most helpful as you settle in?" hint="Select up to 3.">
                  <CheckboxGroupWithOther
                    field="settlingInfo"
                    otherField="otherSettlingDetails"
                    options={GHANA_RELOCATION_FLOW.settlingInfoOptions}
                    request={request}
                    toggleListValue={toggleListValue}
                    updateRequest={updateRequest}
                  />
                </Field>
              </SectionCard>

              <SectionCard number={10} title="Your Questions">
                <Field label="Is there anything else you would like us to know?" hint="Please share any additional questions, concerns, or information that will help prepare your personalized relocation package.">
                  <textarea
                    rows={4}
                    value={request.additionalQuestions}
                    onChange={(e) => updateRequest({ additionalQuestions: e.target.value })}
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
              heading="Complete Relocation Package"
              photo="/Pictures/explore/ghana-card-background.webp"
              photoAlt="Cape Coast Castle overlooking the Ghanaian coastline at sunset"
              price={price}
              includes={GHANA_RELOCATION_FLOW.includes}
              includesHeading="Complete Relocation Package Includes"
              caption={copy.sidebarCaption}
            />
          </form>
        </div>
      </section>
    </>
  )
}
