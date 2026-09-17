import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Pencil } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GHANA_PERSONALIZED_RELOCATION_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { usePersonalizedRelocationFlow } from '../../context/PersonalizedRelocationFlowContext.jsx'

function ReviewRow({ number, label, value }) {
  return (
    <div className="border-t border-border py-2.5 first:border-t-0 first:pt-0 sm:flex sm:gap-6">
      <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-muted-foreground sm:w-64 sm:shrink-0">
        {number && `${number}. `}
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-primary sm:mt-0">{value || 'Not provided'}</dd>
    </div>
  )
}

function ReviewSection({ number, title, editTo, children }) {
  return (
    <Reveal className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between gap-3 bg-cream px-5 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cocoa text-xs font-bold text-primary-foreground">
            {number}
          </span>
          <h2 className="text-sm font-bold text-primary sm:text-base">{title}</h2>
        </div>
        <Link
          to={editTo}
          className="inline-flex items-center gap-1 text-xs font-bold text-copper hover:underline"
        >
          Edit
          <Pencil className="size-3" aria-hidden="true" />
        </Link>
      </div>
      <dl className="px-5 py-4 sm:px-6">{children}</dl>
    </Reveal>
  )
}

// Every "Other" checkbox group is reviewed the same way: the selected
// list with "Other" swapped out for whatever was typed into its text
// field, joined into one readable line.
function withOther(list, otherValue) {
  if (!list.includes('Other')) return list.join(', ')
  return [...list.filter((v) => v !== 'Other'), otherValue].filter(Boolean).join(', ')
}

export function ReviewAnswers() {
  useEffect(() => {
    document.title = 'Review Your Answers | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request } = usePersonalizedRelocationFlow()
  const copy = GHANA_PERSONALIZED_RELOCATION_FLOW.steps.review
  const F = GHANA_PERSONALIZED_RELOCATION_FLOW
  const editTo = '/ghana/personalized-relocation-guidance/request'

  const areasValue = [
    ...request.areas,
    request.otherArea && !request.areas.includes('Other') ? request.otherArea : null,
    request.notSureArea ? 'I am not sure and would like guidance' : null,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={F.stepLabels} current={2} />}
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
          </Reveal>

          <Reveal
            delay={80}
            className="mt-6 rounded-2xl border border-navy/20 bg-navy/10 p-4 text-sm text-primary sm:p-5"
          >
            {copy.description}
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-5">
              <ReviewSection number={1} title="Your Contact Information" editTo={editTo}>
                <ReviewRow label="Full Name" value={request.fullName} />
                <ReviewRow label="Email Address" value={request.email} />
                <ReviewRow label="Phone / WhatsApp Number" value={request.phone} />
                <ReviewRow label="Current Country of Residence" value={request.currentCountry} />
              </ReviewSection>

              <ReviewSection number={2} title="Your Relocation Information" editTo={editTo}>
                <ReviewRow number={1} label="When are you planning to move to Ghana?" value={request.moveTimeframe} />
                <ReviewRow number={2} label="How long are you planning to live in Ghana?" value={request.lengthOfStay} />
                <ReviewRow
                  number={3}
                  label="What is the main reason for your move?"
                  value={withOther(request.moveReasons, request.otherMoveReason)}
                />
                <ReviewRow number={4} label="Which part of Ghana are you considering?" value={areasValue} />
                <ReviewRow
                  number={5}
                  label="What type of area would best suit you?"
                  value={withOther(request.areaTypes, request.otherAreaType)}
                />
                <ReviewRow number={6} label="What type of housing are you considering?" value={request.housingType} />
                <ReviewRow
                  number={7}
                  label="What monthly housing budget are you considering?"
                  value={
                    request.housingBudgetAmount
                      ? `${request.housingBudgetAmount} ${request.housingBudgetCurrency}`
                      : ''
                  }
                />
                <ReviewRow
                  number={8}
                  label="Approximate monthly living budget"
                  value={
                    request.livingBudgetNotDetermined
                      ? 'Not yet determined'
                      : request.livingBudgetAmount
                        ? `${request.livingBudgetAmount} ${request.livingBudgetCurrency}`
                        : ''
                  }
                />
                <ReviewRow
                  number={9}
                  label="Most important lifestyle priorities"
                  value={withOther(request.lifestylePriorities, request.otherLifestylePriority)}
                />
                <ReviewRow
                  number={10}
                  label="Healthcare or insurance concerns"
                  value={request.healthcareConcerns}
                />
                <ReviewRow number={11} label="How do you expect to get around in Ghana?" value={request.transportation} />
                <ReviewRow
                  number={12}
                  label="Would you like guidance related to banking in Ghana?"
                  value={
                    request.bankingGuidance === 'Yes' && request.bankingDetails
                      ? `Yes — ${request.bankingDetails}`
                      : request.bankingGuidance
                  }
                />
                <ReviewRow
                  number={13}
                  label="Working, conducting business, or exploring business opportunities?"
                  value={
                    request.businessInvolvement && request.businessPlans
                      ? `${request.businessInvolvement} — ${request.businessPlans}`
                      : request.businessInvolvement
                  }
                />
                <ReviewRow
                  number={14}
                  label="Include longer-term stay or residency considerations?"
                  value={request.residencyConsiderations}
                />
                <ReviewRow number={15} label="Top 3 things you want help with" value={request.topThreeHelp} />
                <ReviewRow number={16} label="Specific questions or concerns" value={request.specificQuestions} />
                <ReviewRow number={17} label="Anything else about your circumstances or plans" value={request.additionalInfo} />
              </ReviewSection>

              <Reveal delay={100} className="flex items-start gap-2.5 rounded-2xl bg-forest/10 p-4 text-sm text-primary sm:p-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
                <p>{F.consentText}</p>
              </Reveal>

              <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                <Link
                  to={copy.back.to}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-copper"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {copy.back.label}
                </Link>
                <div className="flex flex-col items-center gap-2 sm:items-end">
                  <button
                    type="button"
                    onClick={() => navigate('/ghana/personalized-relocation-guidance/payment')}
                    className="btn-copper w-full sm:w-auto"
                  >
                    {copy.cta}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="size-3 text-copper" aria-hidden="true" />
                    Secure &amp; Encrypted — your information is safe and protected.
                  </p>
                </div>
              </div>
            </div>

            <PlannerSidebar
              heading="Personalized Relocation Guidance"
              photo="/Pictures/countries/Ghana.jpg"
              photoAlt="Independence Arch in Accra, Ghana"
              includes={F.includes}
              includesHeading="Personalized Relocation Guidance Includes"
              caption={copy.sidebarCaption}
            />
          </div>
        </div>
      </section>
    </>
  )
}
