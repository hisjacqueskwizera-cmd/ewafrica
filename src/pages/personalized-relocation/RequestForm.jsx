import { ArrowLeft, ArrowRight, ClipboardList, User } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GHANA_PERSONALIZED_RELOCATION_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { usePersonalizedRelocationFlow } from '../../context/PersonalizedRelocationFlowContext.jsx'

function CardHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 bg-cream px-5 py-4 sm:px-6">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cocoa text-primary-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div>
        <h2 className="text-base font-bold text-primary sm:text-lg">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  )
}

function Field({ number, label, required, hint, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-primary">
        {number && <span className="text-muted-foreground">{number}. </span>}
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

// Every checkbox group in this form ends with an "Other (please specify)"
// option — this renders that shared trio so each question below stays a
// short list of props rather than repeating the same JSX eight times.
function CheckboxGroupWithOther({ field, options, request, toggleListValue, updateRequest, otherField, extra }) {
  return (
    <>
      <div className="grid gap-2.5 sm:grid-cols-2">
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
        {extra}
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
    document.title = 'Start Your Request | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request, updateRequest, toggleListValue, price } = usePersonalizedRelocationFlow()
  const copy = GHANA_PERSONALIZED_RELOCATION_FLOW.steps.request
  const F = GHANA_PERSONALIZED_RELOCATION_FLOW

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/ghana/personalized-relocation-guidance/review')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={F.stepLabels} current={1} />}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
              Ghana Personalized Relocation Guidance
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
              <Reveal className="overflow-hidden rounded-2xl border border-border bg-card">
                <CardHeader
                  icon={User}
                  title="Your Contact Information"
                  subtitle="This information will be used to communicate with you about your request."
                />
                <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
                  <Field label="Full Name" required>
                    <input
                      required
                      value={request.fullName}
                      onChange={(e) => updateRequest({ fullName: e.target.value })}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email Address" required>
                    <input
                      required
                      type="email"
                      value={request.email}
                      onChange={(e) => updateRequest({ email: e.target.value })}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone / WhatsApp Number" required>
                    <input
                      required
                      type="tel"
                      value={request.phone}
                      onChange={(e) => updateRequest({ phone: e.target.value })}
                      placeholder="+1 234 567 8900"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Current Country of Residence" required>
                    <input
                      required
                      value={request.currentCountry}
                      onChange={(e) => updateRequest({ currentCountry: e.target.value })}
                      placeholder="Select your country"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </Reveal>

              <Reveal delay={80} className="overflow-hidden rounded-2xl border border-border bg-card">
                <CardHeader
                  icon={ClipboardList}
                  title="Relocation Questionnaire"
                  subtitle="Please answer the following questions to help us prepare your personalized relocation guidance for Ghana."
                />
                <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
                  <Field number={1} label="When are you planning to move to Ghana?" required>
                    <div className="space-y-2">
                      {F.timeframeOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="moveTimeframe"
                          checked={request.moveTimeframe === option}
                          onChange={() => updateRequest({ moveTimeframe: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>

                  <Field number={2} label="How long are you planning to live in Ghana?" required>
                    <div className="space-y-2">
                      {F.lengthOfStayOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="lengthOfStay"
                          checked={request.lengthOfStay === option}
                          onChange={() => updateRequest({ lengthOfStay: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>

                  <Field number={3} label="What is the main reason for your move?" required hint="Select all that apply.">
                    <CheckboxGroupWithOther
                      field="moveReasons"
                      otherField="otherMoveReason"
                      options={F.moveReasonOptions}
                      request={request}
                      toggleListValue={toggleListValue}
                      updateRequest={updateRequest}
                    />
                  </Field>

                  <Field number={4} label="Which part of Ghana are you considering?" required hint="Select all that apply.">
                    <CheckboxGroupWithOther
                      field="areas"
                      otherField="otherArea"
                      options={F.areaOptions}
                      request={request}
                      toggleListValue={toggleListValue}
                      updateRequest={updateRequest}
                      extra={
                        <CheckboxOption
                          checked={request.notSureArea}
                          onChange={() => updateRequest({ notSureArea: !request.notSureArea })}
                          label="I am not sure and would like guidance"
                        />
                      }
                    />
                  </Field>

                  <Field number={5} label="What type of area would best suit you?" hint="Select all that apply.">
                    <CheckboxGroupWithOther
                      field="areaTypes"
                      otherField="otherAreaType"
                      options={F.areaTypeOptions}
                      request={request}
                      toggleListValue={toggleListValue}
                      updateRequest={updateRequest}
                    />
                  </Field>

                  <Field number={6} label="What type of housing are you considering?" required>
                    <div className="space-y-2">
                      {F.housingTypeOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="housingType"
                          checked={request.housingType === option}
                          onChange={() => updateRequest({ housingType: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>

                  <Field number={7} label="What monthly housing budget are you considering?" required>
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        required
                        value={request.housingBudgetAmount}
                        onChange={(e) => updateRequest({ housingBudgetAmount: e.target.value })}
                        placeholder="e.g. 1,000"
                        className={inputClass}
                      />
                      <select
                        required
                        value={request.housingBudgetCurrency}
                        onChange={(e) => updateRequest({ housingBudgetCurrency: e.target.value })}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Select currency
                        </option>
                        {F.currencyOptions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Field>

                  <Field
                    number={8}
                    label="What is your approximate monthly living budget, excluding major one-time relocation costs?"
                    required
                  >
                    <div className="grid grid-cols-2 gap-2.5">
                      <input
                        value={request.livingBudgetAmount}
                        onChange={(e) => updateRequest({ livingBudgetAmount: e.target.value })}
                        placeholder="e.g. 1,500"
                        disabled={request.livingBudgetNotDetermined}
                        className={inputClass}
                      />
                      <select
                        value={request.livingBudgetCurrency}
                        onChange={(e) => updateRequest({ livingBudgetCurrency: e.target.value })}
                        disabled={request.livingBudgetNotDetermined}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Select currency
                        </option>
                        {F.currencyOptions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-2">
                      <CheckboxOption
                        checked={request.livingBudgetNotDetermined}
                        onChange={() =>
                          updateRequest({ livingBudgetNotDetermined: !request.livingBudgetNotDetermined })
                        }
                        label="Not yet determined"
                      />
                    </div>
                  </Field>

                  <Field number={9} label="What are your most important lifestyle priorities?" hint="Select all that apply.">
                    <CheckboxGroupWithOther
                      field="lifestylePriorities"
                      otherField="otherLifestylePriority"
                      options={F.lifestylePriorityOptions}
                      request={request}
                      toggleListValue={toggleListValue}
                      updateRequest={updateRequest}
                    />
                  </Field>

                  <Field
                    number={10}
                    label="Do you have any particular healthcare or insurance concerns you would like addressed?"
                  >
                    <textarea
                      rows={3}
                      value={request.healthcareConcerns}
                      onChange={(e) => updateRequest({ healthcareConcerns: e.target.value })}
                      placeholder="Please share any specific questions or concerns (optional)"
                      className={inputClass}
                    />
                  </Field>

                  <Field number={11} label="How do you expect to get around in Ghana?" required>
                    <div className="space-y-2">
                      {F.transportationOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="transportation"
                          checked={request.transportation === option}
                          onChange={() => updateRequest({ transportation: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>

                  <Field number={12} label="Would you like guidance related to banking in Ghana?" required>
                    <div className="flex flex-wrap gap-4">
                      {F.yesNoOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="bankingGuidance"
                          checked={request.bankingGuidance === option}
                          onChange={() => updateRequest({ bankingGuidance: option })}
                          label={option}
                        />
                      ))}
                    </div>
                    {request.bankingGuidance === 'Yes' && (
                      <textarea
                        rows={2}
                        value={request.bankingDetails}
                        onChange={(e) => updateRequest({ bankingDetails: e.target.value })}
                        placeholder="Examples: opening a bank account, account requirements, international transfers, and access to banking services."
                        className={`${inputClass} mt-2`}
                      />
                    )}
                  </Field>

                  <Field
                    number={13}
                    label="Will you be working, conducting business, or exploring business opportunities in Ghana?"
                    required
                  >
                    <div className="space-y-2">
                      {F.businessOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="businessInvolvement"
                          checked={request.businessInvolvement === option}
                          onChange={() => updateRequest({ businessInvolvement: option })}
                          label={option}
                        />
                      ))}
                    </div>
                    {request.businessInvolvement && request.businessInvolvement !== 'No' && (
                      <input
                        value={request.businessPlans}
                        onChange={(e) => updateRequest({ businessPlans: e.target.value })}
                        placeholder="Your plans (optional)"
                        className={`${inputClass} mt-2`}
                      />
                    )}
                  </Field>

                  <Field
                    number={14}
                    label="Would you like your guidance to include longer-term stay or residency considerations?"
                    hint="This section provides general practical information only and does not replace immigration or legal advice."
                  >
                    <div className="flex flex-wrap gap-4">
                      {F.yesNoNotSureOptions.map((option) => (
                        <RadioOption
                          key={option}
                          name="residencyConsiderations"
                          checked={request.residencyConsiderations === option}
                          onChange={() => updateRequest({ residencyConsiderations: option })}
                          label={option}
                        />
                      ))}
                    </div>
                  </Field>

                  <Field
                    number={15}
                    label="What are the three most important things you want help with before relocating to Ghana?"
                    required
                    hint="Please list up to three key areas."
                  >
                    <textarea
                      required
                      rows={3}
                      value={request.topThreeHelp}
                      onChange={(e) => updateRequest({ topThreeHelp: e.target.value })}
                      placeholder="Please list up to three key areas."
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    number={16}
                    label="What specific questions or concerns would you like us to address in your personalized guidance?"
                    required
                  >
                    <textarea
                      required
                      rows={3}
                      value={request.specificQuestions}
                      onChange={(e) => updateRequest({ specificQuestions: e.target.value })}
                      placeholder="Please share your questions or concerns."
                      className={inputClass}
                    />
                  </Field>

                  <Field
                    number={17}
                    label="Is there anything else about your circumstances, priorities, or plans that would help us prepare your guidance?"
                  >
                    <textarea
                      rows={3}
                      value={request.additionalInfo}
                      onChange={(e) => updateRequest({ additionalInfo: e.target.value })}
                      placeholder="Additional information (optional)."
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="border-t border-border p-5 sm:p-6">
                  <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                    <input
                      required
                      type="checkbox"
                      checked={request.consentChecked}
                      onChange={(e) => updateRequest({ consentChecked: e.target.checked })}
                      className="mt-0.5 size-4 shrink-0 accent-copper"
                    />
                    {F.consentText}
                  </label>
                </div>
              </Reveal>

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
              heading="Personalized Relocation Guidance"
              photo="/Pictures/countries/Ghana.jpg"
              photoAlt="Independence Arch in Accra, Ghana"
              price={price}
              includes={F.includes}
              includesHeading="Personalized Relocation Guidance Includes"
              caption={copy.sidebarCaption}
            />
          </form>
        </div>
      </section>
    </>
  )
}
