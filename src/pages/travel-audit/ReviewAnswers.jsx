import { ArrowLeft, ArrowRight, Lock, Pencil } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES, TRAVEL_AUDIT_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useTravelAuditFlow } from '../../context/TravelAuditFlowContext.jsx'

function countryNames(slugs) {
  const names = slugs.filter(Boolean).map((slug) => COUNTRIES.find((c) => c.slug === slug)?.name)
  return names.filter(Boolean)
}

function ReviewRow({ label, value }) {
  return (
    <div className="border-t border-border py-2.5 first:border-t-0 first:pt-0 sm:flex sm:gap-6">
      <dt className="text-xs font-semibold uppercase tracking-[0.04em] text-muted-foreground sm:w-48 sm:shrink-0">
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
  const { request } = useTravelAuditFlow()
  const copy = TRAVEL_AUDIT_FLOW.steps.review
  const editTo = '/travel-planner/travel-audit/request'
  const names = countryNames(request.destinationSlugs)

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={TRAVEL_AUDIT_FLOW.stepLabels} current={2} />}
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">Travel Audit</p>
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

              <ReviewSection number={2} title="Trip Details" editTo={editTo}>
                <ReviewRow label="Number of Countries" value={String(names.length || '')} />
                <ReviewRow label="Destinations" value={names.join(', ')} />
              </ReviewSection>

              <ReviewSection number={3} title="Travel Timeline" editTo={editTo}>
                <ReviewRow
                  label="When do you plan to travel?"
                  value={
                    request.travelMonth && request.travelYear
                      ? `${request.travelMonth} ${request.travelYear}`
                      : ''
                  }
                />
                <ReviewRow label="How long will you be traveling?" value={request.duration} />
              </ReviewSection>

              <ReviewSection number={4} title="What Have You Already Booked?" editTo={editTo}>
                {TRAVEL_AUDIT_FLOW.bookedOptions.map((option) => (
                  <ReviewRow
                    key={option}
                    label={option}
                    value={request.alreadyBooked.includes(option) ? 'Yes' : 'No'}
                  />
                ))}
                <ReviewRow
                  label="Other"
                  value={request.alreadyBooked.includes('Other') ? request.otherAlreadyBooked : ''}
                />
              </ReviewSection>

              <ReviewSection number={5} title="Current Bookings" editTo={editTo}>
                <ReviewRow label="Your notes" value={request.currentBookings} />
              </ReviewSection>

              <ReviewSection number={6} title="What Would You Like Us to Review?" editTo={editTo}>
                <ReviewRow label="Your concerns or questions" value={request.reviewRequest} />
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
                    onClick={() => navigate('/travel-planner/travel-audit/payment')}
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
              heading="About This Service"
              includes={TRAVEL_AUDIT_FLOW.includes}
              includesHeading="Travel Audit Includes"
              caption={copy.sidebarCaption}
            />
          </div>
        </div>
      </section>
    </>
  )
}
