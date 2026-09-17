import { ArrowLeft, ArrowRight, Lock, Pencil } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GHANA_RELOCATION_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useRelocationFlow } from '../../context/RelocationFlowContext.jsx'

function ReviewRow({ label, value }) {
  return (
    <div className="border-t border-border py-2.5 first:border-t-0 first:pt-0 sm:flex sm:gap-6">
      <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-muted-foreground sm:w-56 sm:shrink-0">
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
  const { request } = useRelocationFlow()
  const copy = GHANA_RELOCATION_FLOW.steps.review
  const editTo = '/ghana/complete-relocation-package/request'

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={GHANA_RELOCATION_FLOW.stepLabels} current={2} />}
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
          </Reveal>

          <Reveal
            delay={80}
            className="mt-6 rounded-2xl border border-navy/20 bg-navy/10 p-4 text-sm text-primary sm:p-5"
          >
            {copy.description}
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-5">
              <ReviewSection number={1} title="Personal Information" editTo={editTo}>
                <ReviewRow label="Full Name" value={request.fullName} />
                <ReviewRow label="Email Address" value={request.email} />
                <ReviewRow label="Phone Number" value={request.phone} />
                <ReviewRow label="Current Country of Residence" value={request.currentCountry} />
                <ReviewRow label="Nationality(ies)" value={request.nationality} />
                <ReviewRow label="Preferred Contact Method" value={request.contactMethod} />
              </ReviewSection>

              <ReviewSection number={2} title="Relocation Plans" editTo={editTo}>
                <ReviewRow label="When do you plan to move to Ghana?" value={request.moveTimeframe} />
                <ReviewRow
                  label="Main purpose of relocation"
                  value={request.purpose === 'Other' ? request.otherPurpose : request.purpose}
                />
                <ReviewRow
                  label="Will you be relocating alone or with others?"
                  value={request.relocatingWith === 'Other' ? request.otherRelocatingWith : request.relocatingWith}
                />
                <ReviewRow label="Number of people (including yourself)" value={request.numPeople} />
                <ReviewRow
                  label="Top 3 goals for living in Ghana"
                  value={withOther(request.topGoals, request.otherTopGoal)}
                />
              </ReviewSection>

              <ReviewSection number={3} title="Preferred Locations & Housing" editTo={editTo}>
                <ReviewRow label="Area(s) considering" value={withOther(request.areas, request.otherArea)} />
                <ReviewRow
                  label="Type of housing"
                  value={request.housingType === 'Other' ? request.otherHousingType : request.housingType}
                />
                <ReviewRow label="Estimated monthly living budget (USD)" value={request.budgetRange} />
                <ReviewRow
                  label="What's most important in a neighborhood"
                  value={withOther(request.neighborhoodPriorities, request.otherNeighborhoodPriority)}
                />
              </ReviewSection>

              <ReviewSection number={4} title="Immigration, Residency & Official Processes" editTo={editTo}>
                <ReviewRow label="Do you currently have a visa or residency permit for Ghana?" value={request.hasVisa} />
                <ReviewRow label="Which residency option are you most interested in?" value={request.residencyOption} />
                <ReviewRow label="Specific questions about immigration/residency" value={request.immigrationQuestions} />
              </ReviewSection>

              <ReviewSection number={5} title="Work, Business, Banking & Education" editTo={editTo}>
                <ReviewRow label="Interested in working in Ghana?" value={request.interestedWorking} />
                <ReviewRow label="Interested in starting a business?" value={request.interestedBusiness} />
                <ReviewRow label="Need information on banking?" value={request.needBanking} />
                <ReviewRow label="School-age children or education information?" value={request.needEducation} />
              </ReviewSection>

              <ReviewSection number={6} title="Healthcare & Insurance" editTo={editTo}>
                <ReviewRow label="Need information on healthcare in Ghana?" value={request.needHealthcare} />
                <ReviewRow label="Interested in international health insurance options?" value={request.needInsurance} />
                <ReviewRow label="Specific healthcare questions" value={request.healthcareQuestions} />
              </ReviewSection>

              <ReviewSection number={7} title="Transportation & Daily Life" editTo={editTo}>
                <ReviewRow label="Transportation information helpful" value={request.transportInfo.join(', ')} />
                <ReviewRow label="Other daily life topics" value={request.dailyLifeTopics.join(', ')} />
              </ReviewSection>

              <ReviewSection number={8} title="Preparing for Your Move" editTo={editTo}>
                <ReviewRow label="Support needed before your move" value={request.moveSupport.join(', ')} />
                <ReviewRow label="Have you visited Ghana before?" value={request.visitedBefore} />
                <ReviewRow label="Other preparation questions or concerns" value={request.prepQuestions} />
              </ReviewSection>

              <ReviewSection number={9} title="Settling In" editTo={editTo}>
                <ReviewRow
                  label="Most helpful information as you settle in"
                  value={withOther(request.settlingInfo, request.otherSettlingDetails)}
                />
              </ReviewSection>

              <ReviewSection number={10} title="Your Questions" editTo={editTo}>
                <ReviewRow label="Additional questions or topics" value={request.additionalQuestions} />
              </ReviewSection>

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
                    onClick={() => navigate('/ghana/complete-relocation-package/payment')}
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
              heading="Complete Relocation Package"
              photo="/Pictures/explore/ghana-card-background.webp"
              photoAlt="Cape Coast Castle overlooking the Ghanaian coastline at sunset"
              includes={GHANA_RELOCATION_FLOW.includes}
              includesHeading="Complete Relocation Package Includes"
              caption={copy.sidebarCaption}
            />
          </div>
        </div>
      </section>
    </>
  )
}
