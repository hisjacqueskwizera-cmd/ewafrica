import { ArrowLeft, ArrowRight, Lock, Pencil } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GHANA_RIGHT_OF_ABODE_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useRightOfAbodeFlow } from '../../context/RightOfAbodeFlowContext.jsx'

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

export function ReviewAnswers() {
  useEffect(() => {
    document.title = 'Review Your Answers | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request } = useRightOfAbodeFlow()
  const copy = GHANA_RIGHT_OF_ABODE_FLOW.steps.review
  const editTo = '/ghana/right-of-abode-guidance/request'

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={GHANA_RIGHT_OF_ABODE_FLOW.stepLabels} current={2} />}
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
                <ReviewRow label="Full Name (as on passport)" value={request.fullName} />
                <ReviewRow label="Email Address" value={request.email} />
                <ReviewRow label="WhatsApp Number" value={request.whatsapp} />
                <ReviewRow label="Nationality" value={request.nationality} />
                <ReviewRow label="Current Country of Residence" value={request.currentCountry} />
                <ReviewRow label="City" value={request.city} />
              </ReviewSection>

              <ReviewSection number={2} title="Basis for Right of Abode" editTo={editTo}>
                <ReviewRow label="Have you ever been a Ghanaian citizen?" value={request.wasGhanaianCitizen} />
                <ReviewRow label="If yes, how did you acquire citizenship?" value={request.howAcquired} />
                <ReviewRow label="Did you lose or renounce Ghanaian citizenship?" value={request.lostCitizenship} />
                <ReviewRow
                  label="Are you seeking Right of Abode based on African descent in the diaspora?"
                  value={request.seekingByDescent}
                />
                <ReviewRow label="Family connection / basis" value={request.familyConnection} />
              </ReviewSection>

              <ReviewSection number={3} title="Ghana Residence & Immigration History" editTo={editTo}>
                <ReviewRow label="Have you lived in Ghana before?" value={request.livedInGhana} />
                <ReviewRow label="If yes, when and for how long?" value={request.whenHowLong} />
                <ReviewRow label="Current or most recent immigration status" value={request.immigrationStatus} />
                <ReviewRow label="Previously applied for residence/citizenship/Right of Abode?" value={request.previouslyApplied} />
                <ReviewRow label="If yes, explanation" value={request.previousApplyExplain} />
              </ReviewSection>

              <ReviewSection number={4} title="Current Circumstances & Long-Term Plans" editTo={editTo}>
                <ReviewRow label="When do you expect to move to or return to Ghana?" value={request.moveDate} />
                <ReviewRow label="How long do you intend to live in Ghana?" value={request.intendLength} />
                <ReviewRow label="Main purpose for living in Ghana" value={request.mainPurpose} />
                <ReviewRow label="Areas or regions being considered" value={request.areasConsidering} />
              </ReviewSection>

              <ReviewSection number={5} title="Eligibility & Supporting Information" editTo={editTo}>
                <ReviewRow label="Two Ghanaian citizens who may act as referees?" value={request.haveReferees} />
                <ReviewRow label="Ever convicted of a criminal offence in any country?" value={request.criminalOffence} />
                <ReviewRow label="Evidence of financial means?" value={request.financialMeans} />
                <ReviewRow label="If yes, explanation" value={request.financialExplain} />
                <ReviewRow label="Made or plan to make a contribution to Ghana?" value={request.contributionPlan} />
                <ReviewRow label="If yes, description" value={request.contributionExplain} />
              </ReviewSection>

              <ReviewSection number={6} title="Documents You Currently Have" editTo={editTo}>
                <ReviewRow label="Selected" value={request.documents.join(', ')} />
              </ReviewSection>

              <ReviewSection number={7} title="Your Questions" editTo={editTo}>
                <ReviewRow label="Questions or concerns" value={request.questions} />
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
                    onClick={() => navigate('/ghana/right-of-abode-guidance/payment')}
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
              heading="Right of Abode Guidance"
              photo="/Pictures/image_Ghana.webp"
              photoAlt="Cape Coast Castle overlooking the Ghanaian coastline"
              includes={GHANA_RIGHT_OF_ABODE_FLOW.includes}
              includesHeading="Right of Abode Guidance Includes"
              caption={copy.sidebarCaption}
            />
          </div>
        </div>
      </section>
    </>
  )
}
