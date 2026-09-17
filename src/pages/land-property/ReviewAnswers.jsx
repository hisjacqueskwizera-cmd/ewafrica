import { ArrowLeft, ArrowRight, Lock, Pencil } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GHANA_LAND_PROPERTY_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useLandPropertyFlow } from '../../context/LandPropertyFlowContext.jsx'

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
  const { request } = useLandPropertyFlow()
  const copy = GHANA_LAND_PROPERTY_FLOW.steps.review
  const editTo = '/ghana/land-property-guidance/request'

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={GHANA_LAND_PROPERTY_FLOW.stepLabels} current={2} />}
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
          </Reveal>

          <Reveal
            delay={80}
            className="mt-6 rounded-2xl border border-navy/20 bg-navy/10 p-4 text-sm text-primary sm:p-5"
          >
            {copy.description}
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-5">
              <ReviewSection number={1} title="Contact Information" editTo={editTo}>
                <ReviewRow label="Full Name" value={request.fullName} />
                <ReviewRow label="Email Address" value={request.email} />
                <ReviewRow label="Phone Number" value={request.phone} />
              </ReviewSection>

              <ReviewSection number={2} title="Your Plan" editTo={editTo}>
                <ReviewRow
                  label="Main purpose"
                  value={
                    request.purposes.includes('Other')
                      ? [...request.purposes.filter((p) => p !== 'Other'), request.otherPurpose]
                          .filter(Boolean)
                          .join(', ')
                      : request.purposes.join(', ')
                  }
                />
                <ReviewRow label="Length of stay in Ghana" value={request.lengthOfStay} />
                <ReviewRow label="Property type" value={request.propertyType} />
                <ReviewRow label="Purpose of stay in Ghana" value={request.stayPurpose} />
                <ReviewRow
                  label="Location(s)"
                  value={
                    request.locations.includes('Other')
                      ? [...request.locations.filter((l) => l !== 'Other'), request.otherLocation]
                          .filter(Boolean)
                          .join(', ')
                      : request.locations.join(', ')
                  }
                />
                <ReviewRow label="Already have a property in mind?" value={request.havePropertyInMind} />
                <ReviewRow label="Visited the property or area?" value={request.visitedProperty} />
                <ReviewRow label="Budget range" value={request.budgetRange} />
                <ReviewRow label="Preferred timeframe" value={request.timeframe} />
                <ReviewRow label="Nationality" value={request.citizenship} />
                <ReviewRow label="Questions / Comments" value={request.questions} />
              </ReviewSection>

              <ReviewSection number={3} title="Property Details" editTo={editTo}>
                <ReviewRow label="Intended use" value={request.intendedUse} />
                <ReviewRow label="Size needed" value={request.sizeNeeded} />
                <ReviewRow label="Land preference" value={request.landPreference} />
                <ReviewRow label="Title preference" value={request.titlePreference} />
                <ReviewRow label="Utilities needed" value={request.utilitiesNeeded} />
                <ReviewRow label="Preferred areas / neighborhoods" value={request.preferredAreas} />
                <ReviewRow label="Maximum distance to city center" value={request.maxDistance} />
                <ReviewRow label="Nearest city / town" value={request.nearestCity} />
                <ReviewRow label="Other requirements" value={request.otherRequirements} />
                <ReviewRow label="Property features priority" value={request.featurePriority} />
              </ReviewSection>

              <ReviewSection number={4} title="Research Focus" editTo={editTo}>
                <ReviewRow label="Requested" value={request.researchFocus.join(', ')} />
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
                    onClick={() => navigate('/ghana/land-property-guidance/payment')}
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
              heading="Land & Property Guidance"
              includes={GHANA_LAND_PROPERTY_FLOW.includes}
              includesHeading="Land & Property Guidance Includes"
              caption={copy.sidebarCaption}
            />
          </div>
        </div>
      </section>
    </>
  )
}
