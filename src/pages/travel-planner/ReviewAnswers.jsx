import { ArrowLeft, ArrowRight, Lock, Pencil } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES, TRAVEL_PLANNER_FLOW } from '../../data/siteContent.js'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useTravelPlannerFlow } from '../../context/TravelPlannerFlowContext.jsx'

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

// Mirrors RequestForm's PdfRequestSections — same fields, same 1/2/3-country
// wording differences, read-only.
function PdfReviewSections({ request, names, count, editTo }) {
  const interests = [...request.interests.filter((i) => i !== 'Other'), request.otherInterest]
    .filter(Boolean)
    .join(', ')

  const destinationLabel =
    count === 1
      ? 'Which country are you traveling to?'
      : count === 2
        ? 'Which two countries are you planning to visit?'
        : 'Which three countries are you planning to visit?'

  const dates =
    request.arrivalDate && request.departureDate
      ? `${request.arrivalDate} – ${request.departureDate}`
      : ''

  const daysPerCountry = request.destinationSlugs
    .map((slug) => {
      const name = COUNTRIES.find((c) => c.slug === slug)?.name ?? slug
      const days = request.daysPerCountry[slug]
      return days ? `${name}: ${days}` : null
    })
    .filter(Boolean)
    .join(', ')

  const travellers = [
    request.adults && `${request.adults} adult${request.adults === '1' ? '' : 's'}`,
    request.children && `${request.children} child${request.children === '1' ? '' : 'ren'}`,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <>
      <ReviewSection number={2} title="Your Trip" editTo={editTo}>
        <ReviewRow label={destinationLabel} value={names.join(', ')} />
        <ReviewRow label="When are you travelling" value={dates} />
        <ReviewRow label="Dates are flexible" value={request.datesFlexible ? 'Yes' : 'No'} />
        {request.datesFlexible && (
          <ReviewRow label="Approximate travel period" value={request.datesApproxPeriod} />
        )}
        {count > 1 && <ReviewRow label="Days in each country" value={daysPerCountry} />}
        {count === 2 && <ReviewRow label="Which country first" value={request.visitOrder} />}
        {count === 3 && (
          <ReviewRow
            label="Planned order / route"
            value={
              request.visitOrderUnsure
                ? "Not sure — please recommend the best route"
                : request.visitOrder
            }
          />
        )}
        <ReviewRow label="How many people" value={travellers} />
        <ReviewRow label="Main purpose of trip" value={request.purpose} />
        <ReviewRow
          label={
            count === 1
              ? 'Places interested in visiting'
              : 'Places interested in visiting (each country)'
          }
          value={request.placesConsidering}
        />
      </ReviewSection>

      <ReviewSection number={3} title="Your Travel Interests" editTo={editTo}>
        <ReviewRow label="Selected experiences" value={interests} />
      </ReviewSection>

      <ReviewSection number={4} title="Your Travel Style & Budget" editTo={editTo}>
        <ReviewRow label="Preferred travel style" value={request.travelStylePdf} />
        <ReviewRow label="Approximate budget" value={request.budget} />
        <ReviewRow label="Preferred accommodation type" value={request.accommodationTypePdf} />
      </ReviewSection>

      <ReviewSection number={5} title="Getting Around" editTo={editTo}>
        <ReviewRow label="Travel within country/countries" value={request.gettingAroundPdf} />
        {count > 1 && (
          <ReviewRow label="Travel between countries" value={request.betweenCountriesTravel} />
        )}
      </ReviewSection>

      <ReviewSection number={6} title="Your Preferences" editTo={editTo}>
        <ReviewRow label="Must-include activities" value={request.mustInclude} />
        <ReviewRow label="Activities/places to avoid" value={request.avoid} />
        <ReviewRow label="Accessibility / dietary needs" value={request.accessibilityNeeds} />
      </ReviewSection>

      <ReviewSection number={7} title="Your Current Plans" editTo={editTo}>
        <ReviewRow label="Already booked" value={request.bookedStatus} />
        <ReviewRow label="Details already arranged" value={request.alreadyArranged} />
      </ReviewSection>

      <ReviewSection number={8} title="Anything Else" editTo={editTo}>
        <ReviewRow label="Anything else" value={request.additionalNotes} />
      </ReviewSection>
    </>
  )
}

// Mirrors RequestForm's LegacyRequestSections — unchanged 4-country flow.
function LegacyReviewSections({ request, names, editTo }) {
  const interests = [...request.interests.filter((i) => i !== 'Other'), request.otherInterest]
    .filter(Boolean)
    .join(', ')

  return (
    <>
      <ReviewSection number={2} title="Your Trip" editTo={editTo}>
        <ReviewRow label="Your destination(s)" value={names.join(', ')} />
        <ReviewRow
          label="When are you travelling"
          value={
            request.arrivalDate && request.departureDate
              ? `${request.arrivalDate} – ${request.departureDate}`
              : ''
          }
        />
        <ReviewRow label="Dates are flexible" value={request.datesFlexible ? 'Yes' : 'No'} />
        <ReviewRow label="How many people" value={request.travellerCount} />
        <ReviewRow label="Places already considering" value={request.placesConsidering} />
      </ReviewSection>

      <ReviewSection number={3} title="Your Travel Interests" editTo={editTo}>
        <ReviewRow label="Selected interests" value={interests} />
      </ReviewSection>

      <ReviewSection number={4} title="Your Travel Style" editTo={editTo}>
        <ReviewRow label="Preferred way of travelling" value={request.travelStyle} />
        <ReviewRow label="Accommodation preference" value={request.accommodation} />
      </ReviewSection>

      <ReviewSection number={5} title="Getting Around" editTo={editTo}>
        <ReviewRow label="Expected transportation" value={request.gettingAround.join(', ')} />
      </ReviewSection>

      <ReviewSection number={6} title="Your Current Plans" editTo={editTo}>
        <ReviewRow label="Already booked or paid" value={request.bookedStatus} />
        <ReviewRow label="What's already arranged" value={request.alreadyArranged} />
        <ReviewRow label="Rough itinerary" value={request.roughItinerary} />
      </ReviewSection>

      <ReviewSection number={7} title="What Do You Need Help With?" editTo={editTo}>
        <ReviewRow label="Main help needed" value={request.helpWith} />
        <ReviewRow label="Anything else" value={request.additionalNotes} />
      </ReviewSection>
    </>
  )
}

export function ReviewAnswers() {
  useEffect(() => {
    document.title = 'Review Your Answers | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  // count comes from context (not request.destinationSlugs.length directly)
  // so it stays the same effective count RequestForm used to decide
  // Pdf-vs-Legacy — otherwise a visitor who promised "4" on Service
  // Details but only finished picking 1-3 countries would see Pdf review
  // labels for data that was actually collected via the Legacy questions.
  const { request, tier, count } = useTravelPlannerFlow()
  const copy = TRAVEL_PLANNER_FLOW.steps.review
  const editTo = '/travel-planner/request'
  const names = countryNames(request.destinationSlugs)

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero cornerTagline={copy.cornerTagline} bannerTagline={copy.bannerTagline} />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {copy.heading}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {copy.description}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-5">
              <ReviewSection number={1} title="Your Contact Details" editTo={editTo}>
                <ReviewRow label="Full Name" value={request.fullName} />
                <ReviewRow label="Email Address" value={request.email} />
                <ReviewRow label="Phone / WhatsApp Number" value={request.phone} />
              </ReviewSection>

              {count <= 3 ? (
                <PdfReviewSections request={request} names={names} count={count} editTo={editTo} />
              ) : (
                <LegacyReviewSections request={request} names={names} editTo={editTo} />
              )}

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
                    onClick={() => navigate('/travel-planner/payment')}
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

            <PlannerSidebar price={tier?.price} caption={copy.sidebarCaption} />
          </div>
        </div>
      </section>
    </>
  )
}
