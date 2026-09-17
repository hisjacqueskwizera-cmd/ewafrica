import { ArrowLeft, ArrowRight, CheckCircle2, Info, Lock, Pencil } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VISA_GUIDANCE_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { PlannerStepper } from '../../components/travel-planner/PlannerStepper.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useVisaGuidanceFlow } from '../../context/VisaGuidanceFlowContext.jsx'

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

const WHATS_NEXT = [
  { title: 'Continue to Secure Payment', text: 'You will be taken to a secure payment page to complete your request.' },
  { title: 'We Confirm Your Request', text: 'You will receive a confirmation email with your request details.' },
  { title: 'We Begin Your Research', text: 'You will receive your personalized guidance by email (typically 3–5 business days) and any included follow-up support.' },
]

export function ReviewAnswers() {
  const { country, request } = useVisaGuidanceFlow()
  const copy = VISA_GUIDANCE_FLOW.steps.review
  const editTo = `/personal-visa-guidance/${country.slug}/request`

  useEffect(() => {
    document.title = `Review Your Answers — ${country.name} | East-West Africa Link`
  }, [country])

  const navigate = useNavigate()

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        cornerTagline={copy.cornerTagline}
        bannerTagline={copy.bannerTagline}
        stepper={<PlannerStepper steps={VISA_GUIDANCE_FLOW.stepLabels} current={2} />}
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
          </Reveal>

          <Reveal
            delay={80}
            className="mt-6 flex items-start gap-3 rounded-2xl border border-forest/20 bg-forest/10 p-4 text-sm text-primary sm:p-5"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
            {copy.description}
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-5">
              <ReviewSection number={1} title="Your Information" editTo={editTo}>
                <ReviewRow label="Full Name" value={request.fullName} />
                <ReviewRow label="Email Address" value={request.email} />
                <ReviewRow label="Phone Number" value={request.phone} />
                <ReviewRow label="Nationality / Passport Country" value={request.nationality} />
                <ReviewRow label="Country of Residence" value={request.countryOfResidence} />
              </ReviewSection>

              <ReviewSection number={2} title="Your Travel Plans" editTo={editTo}>
                <ReviewRow label={`Intended Date of Travel to ${country.name}`} value={request.travelDate} />
                <ReviewRow label="Expected Length of Stay" value={request.lengthOfStay} />
                <ReviewRow label="Purpose of Travel" value={request.purpose} />
              </ReviewSection>

              <ReviewSection number={3} title="Visa Application Background" editTo={editTo}>
                <ReviewRow
                  label={`Have you already started your ${country.name} visa application?`}
                  value={request.applicationStarted}
                />
                <ReviewRow
                  label={`Have you previously applied for a ${country.name} visa?`}
                  value={request.previouslyApplied}
                />
              </ReviewSection>

              <ReviewSection number={4} title="What You Would Like Help Understanding" editTo={editTo}>
                <ReviewRow
                  label="Selected"
                  value={
                    request.helpTopics.includes('Other')
                      ? [...request.helpTopics.filter((t) => t !== 'Other'), request.otherHelpTopic]
                          .filter(Boolean)
                          .join(', ')
                      : request.helpTopics.join(', ')
                  }
                />
              </ReviewSection>

              <ReviewSection number={5} title="Your Question or Situation" editTo={editTo}>
                <ReviewRow label="Your Message" value={request.situation} />
              </ReviewSection>

              <ReviewSection number={6} title="Phone Consultation" editTo={editTo}>
                <ReviewRow
                  label={`Would you like a 20-minute phone consultation before you submit your ${country.name} visa application?`}
                  value={request.phoneConsult}
                />
              </ReviewSection>

              <Reveal delay={100} className="overflow-hidden rounded-2xl border border-navy/20 bg-navy/10">
                <div className="flex items-center gap-2.5 px-5 py-3.5 sm:px-6">
                  <Info className="size-4 text-navy" aria-hidden="true" />
                  <h2 className="text-sm font-bold text-primary sm:text-base">What Happens Next</h2>
                </div>
                <ol className="space-y-3 px-5 pb-5 sm:px-6">
                  {WHATS_NEXT.map((item, i) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-primary">{item.title}</p>
                        <p className="text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                <Link
                  to={editTo}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-copper"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back to Edit
                </Link>
                <div className="flex flex-col items-center gap-2 sm:items-end">
                  <button
                    type="button"
                    onClick={() => navigate(`/personal-visa-guidance/${country.slug}/payment`)}
                    className="btn-copper w-full sm:w-auto"
                  >
                    {copy.cta}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="size-3 text-copper" aria-hidden="true" />
                    Your information is secure and encrypted.
                  </p>
                </div>
              </div>
            </div>

            <PlannerSidebar
              heading="Service Summary"
              photo={country.image}
              photoAlt={`A scenic view of ${country.name}`}
              includes={VISA_GUIDANCE_FLOW.includes}
              includesHeading="What's Included"
              caption={[`${country.name}, Africa`]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
