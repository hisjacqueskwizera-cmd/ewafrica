import {
  Calendar,
  CircleCheckBig,
  Clock,
  Compass,
  FileText,
  Home,
  Mail,
  Shield,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES, TRAVEL_PLANNER_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useTravelPlannerFlow } from '../../context/TravelPlannerFlowContext.jsx'

function InfoBox({ icon: Icon, title, children }) {
  return (
    <Reveal className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2.5 bg-cream px-5 py-3.5 sm:px-6">
        <Icon className="size-4 text-copper" aria-hidden="true" />
        <h2 className="text-sm font-bold text-primary sm:text-base">{title}</h2>
      </div>
      <div className="space-y-2 p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">
        {children}
      </div>
    </Reveal>
  )
}

export function Confirmation() {
  useEffect(() => {
    document.title = 'Payment Received | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request, tier, paid, resetRequest } = useTravelPlannerFlow()
  const copy = TRAVEL_PLANNER_FLOW.steps.confirmation

  // Reached this page without actually going through the payment step (a
  // direct link, a refresh after the in-memory context reset, etc.) — send
  // them back to the start rather than showing a confirmation for a
  // request that was never "paid".
  useEffect(() => {
    if (!paid) navigate('/travel-planner', { replace: true })
  }, [paid, navigate])

  if (!paid) return null

  const destinationNames = request.destinationSlugs
    .filter(Boolean)
    .map((slug) => COUNTRIES.find((c) => c.slug === slug)?.name)
    .filter(Boolean)
    .join(', ')

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero cornerTagline={copy.cornerTagline} bannerTagline={copy.bannerTagline} />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-forest text-primary-foreground">
              <CircleCheckBig className="size-8" aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {copy.heading}
            </h1>
            <h2 className="mt-1 text-xl font-bold text-copper sm:text-2xl">
              Thank You, {(request.fullName || 'Traveller').toUpperCase()}!
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-bold text-primary sm:text-base">
              {copy.intro}
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {copy.body}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <InfoBox icon={FileText} title="Your Request">
                <dl className="space-y-2">
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-semibold text-primary">Service:</dt>
                    <dd>{request.destinationSlugs.length}-Country Travel Planner</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-semibold text-primary">Countries selected:</dt>
                    <dd>{destinationNames || 'Not provided'}</dd>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <dt className="font-semibold text-primary">Amount paid:</dt>
                    <dd>${tier?.price ?? '—'}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="font-semibold text-primary">Payment status:</dt>
                    <dd className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1 text-xs font-bold text-primary-foreground">
                      Paid
                      <CircleCheckBig className="size-3.5" aria-hidden="true" />
                    </dd>
                  </div>
                </dl>
              </InfoBox>

              <InfoBox icon={Clock} title="What Happens Next">
                <p>{copy.whatsNext}</p>
                <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-cream p-4">
                  <Calendar className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-primary">Typical delivery: 3–5 business days</p>
                    <p className="text-xs">{copy.deliveryNote}</p>
                  </div>
                </div>
              </InfoBox>

              <InfoBox icon={Mail} title="Follow-up">
                <p>{copy.followUp}</p>
              </InfoBox>

              <InfoBox icon={Mail} title="Confirmation Sent">
                <p>A confirmation has been sent to:</p>
                <p className="font-bold text-primary">{request.email || 'your email address'}</p>
                <p>{copy.confirmationNote}</p>
              </InfoBox>

              <Reveal className="flex items-start gap-2.5 rounded-2xl bg-navy/10 p-5 text-sm text-primary">
                <Shield className="mt-0.5 size-5 shrink-0 text-navy" aria-hidden="true" />
                <div>
                  <p className="font-bold">Secure &amp; Encrypted</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {copy.secureNote} {copy.secureNote2}
                  </p>
                </div>
              </Reveal>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  onClick={resetRequest}
                  className="btn-outline-dark flex-1 justify-center"
                >
                  <Home className="size-4" aria-hidden="true" />
                  Return to Home
                </Link>
                <Link
                  to="/#explore"
                  onClick={resetRequest}
                  className="btn-copper flex-1 justify-center"
                >
                  <Compass className="size-4" aria-hidden="true" />
                  Explore More Destinations
                </Link>
              </div>
            </div>

            <PlannerSidebar
              heading={copy.sidebarHeading}
              caption={copy.sidebarCaption}
              secondaryPhoto="/Pictures/countries/Zambia.jpg"
              secondaryPhotoAlt="Victoria Falls with a rainbow arcing over the gorge"
              secondaryCaption={copy.sidebarCaption2}
            />
          </div>
        </div>
      </section>
    </>
  )
}
