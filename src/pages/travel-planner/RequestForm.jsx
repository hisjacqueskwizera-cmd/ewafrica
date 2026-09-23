import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COUNTRIES, TRAVEL_PLANNER_FLOW } from '../../data/siteContent.js'
import { DestinationPicker } from '../../components/DestinationPicker.jsx'
import { PlannerBackground } from '../../components/travel-planner/PlannerBackground.jsx'
import { PlannerSidebar } from '../../components/travel-planner/PlannerSidebar.jsx'
import { PlannerStepHero } from '../../components/travel-planner/PlannerStepHero.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useTravelPlannerFlow } from '../../context/TravelPlannerFlowContext.jsx'

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

function RadioOption({ name, value, checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-sm text-primary">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="size-4 accent-copper"
      />
      {label}
    </label>
  )
}

function CheckboxOption({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-sm text-primary">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-copper" />
      {label}
    </label>
  )
}

// Read-only "Your Destination(s)" block shared by both question sets —
// shown once destinations are known, whether carried over from the landing
// page's picker or just picked inline below by DestinationPickerField.
// Only ever changed by going back to /travel-planner, never re-picked here.
function DestinationSummary({ label, destinationNames }) {
  return (
    <div>
      <span className="text-sm font-semibold text-primary">{label}</span>
      <p className="mt-1.5 text-base font-bold text-primary">{destinationNames.join(', ')}</p>
      <Link
        to="/travel-planner"
        className="mt-1 inline-block text-xs font-semibold text-copper hover:underline"
      >
        Change destinations
      </Link>
    </div>
  )
}

// Shown instead of DestinationSummary when nothing was carried over from
// either the landing page's picker or the Service Details page's own
// summary — mirrors Before You Book Check's own request form, which asks
// inline rather than leaving the visitor stuck with no way to proceed.
// `max` is the count already promised on Service Details (or 4 for a
// direct/bookmarked visit with no promise at all).
function DestinationPickerField({ label, hint, values, onChange, max }) {
  return (
    <Field label={label} required hint={hint}>
      <DestinationPicker countries={COUNTRIES} values={values} onChange={onChange} max={max} />
    </Field>
  )
}

// ---------------------------------------------------------------------
// PDF-matching question set — 1, 2 or 3 countries. Wording is lifted
// verbatim from the reference "Travel Planner Questions" document (see
// TRAVEL_PLANNER_FLOW's *Pdf option lists in siteContent.js), grouped into
// the same thematic SectionCards as the rest of this form rather than one
// card per numbered question. The 4-country flow keeps its own,
// pre-existing question set below (LegacyRequestSections) — untouched.
// ---------------------------------------------------------------------
function PdfRequestSections({
  request,
  updateRequest,
  toggleListValue,
  setDaysForCountry,
  destinationNames,
  count,
  arrivedWithSelection,
}) {
  const destinationQuestion =
    count === 1
      ? 'Which country are you traveling to?'
      : count === 2
        ? 'Which two countries are you planning to visit?'
        : 'Which three countries are you planning to visit?'

  const countriesPhrase = count === 1 ? 'the country' : count === 2 ? 'each country' : 'each country'
  const includedPhrase =
    count === 1 ? '' : count === 2 ? ' in either country' : ' in any of the three countries'
  const betweenOptions = TRAVEL_PLANNER_FLOW.betweenCountriesOptionsPdf[count]
  const betweenWord = count === 2 ? 'the two countries' : 'the three countries'

  return (
    <>
      <SectionCard number={2} title="Your Trip">
        {arrivedWithSelection ? (
          <DestinationSummary label={destinationQuestion} destinationNames={destinationNames} />
        ) : (
          <DestinationPickerField
            label={destinationQuestion}
            hint={`You can select up to ${count} ${count === 1 ? 'country' : 'countries'}.`}
            values={request.destinationSlugs}
            onChange={(slugs) => updateRequest({ destinationSlugs: slugs })}
            max={count}
          />
        )}

        <Field
          label="What are your planned travel dates?"
          required
          hint="If your dates are flexible, please indicate your approximate travel period."
        >
          <div className="grid grid-cols-2 gap-2.5">
            <input
              required
              type="date"
              aria-label="Arrival date"
              value={request.arrivalDate}
              onChange={(e) => updateRequest({ arrivalDate: e.target.value })}
              className={inputClass}
            />
            <input
              required
              type="date"
              aria-label="Departure date"
              value={request.departureDate}
              onChange={(e) => updateRequest({ departureDate: e.target.value })}
              className={inputClass}
            />
          </div>
          <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={request.datesFlexible}
              onChange={(e) => updateRequest({ datesFlexible: e.target.checked })}
              className="size-3.5 accent-copper"
            />
            My dates are flexible
          </label>
          {request.datesFlexible && (
            <input
              value={request.datesApproxPeriod}
              onChange={(e) => updateRequest({ datesApproxPeriod: e.target.value })}
              placeholder="e.g. Late July for around 2 weeks"
              aria-label="Approximate travel period"
              className={`${inputClass} mt-2`}
            />
          )}
        </Field>

        {count > 1 && (
          <Field
            label="How many days do you plan to spend in each country?"
            hint="If you are unsure, we can help recommend how to divide your time."
          >
            <div className="grid gap-2.5 sm:grid-cols-2">
              {request.destinationSlugs.map((slug) => {
                const name = COUNTRIES.find((c) => c.slug === slug)?.name ?? slug
                return (
                  <label key={slug} className="flex items-center gap-2 text-sm text-primary">
                    <span className="w-24 shrink-0 font-semibold">{name}</span>
                    <input
                      type="number"
                      min="0"
                      value={request.daysPerCountry[slug] ?? ''}
                      onChange={(e) => setDaysForCountry(slug, e.target.value)}
                      placeholder="Days"
                      aria-label={`Days in ${name}`}
                      className={inputClass}
                    />
                  </label>
                )
              })}
            </div>
          </Field>
        )}

        {count === 2 && (
          <Field
            label="Which country do you plan to visit first?"
            hint="If you are unsure about the best order, please indicate that."
          >
            <div className="space-y-1.5">
              {[...destinationNames, 'Not sure — please advise'].map((option) => (
                <RadioOption
                  key={option}
                  name="visitOrder"
                  value={option}
                  checked={request.visitOrder === option}
                  onChange={() => updateRequest({ visitOrder: option })}
                  label={option}
                />
              ))}
            </div>
          </Field>
        )}

        {count === 3 && (
          <Field
            label="In what order do you plan to visit the three countries?"
            hint="If you are unsure about the best route, please indicate that."
          >
            <input
              value={request.visitOrder}
              onChange={(e) => updateRequest({ visitOrder: e.target.value })}
              disabled={request.visitOrderUnsure}
              placeholder={`e.g. ${destinationNames.join(', then ')}`}
              className={`${inputClass} disabled:opacity-50`}
            />
            <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={request.visitOrderUnsure}
                onChange={(e) => updateRequest({ visitOrderUnsure: e.target.checked })}
                className="size-3.5 accent-copper"
              />
              I'm not sure — please recommend the best route
            </label>
          </Field>
        )}

        <Field
          label="How many people are traveling?"
          required
          hint="Please include the number of adults and children, if applicable."
        >
          <div className="grid grid-cols-2 gap-2.5">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Adults</span>
              <input
                required
                type="number"
                min="1"
                value={request.adults}
                onChange={(e) => updateRequest({ adults: e.target.value })}
                className={`${inputClass} mt-1`}
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground">Children</span>
              <input
                type="number"
                min="0"
                value={request.children}
                onChange={(e) => updateRequest({ children: e.target.value })}
                className={`${inputClass} mt-1`}
              />
            </label>
          </div>
        </Field>

        <Field
          label="What is the main purpose of your trip?"
          hint="For example: vacation, cultural travel, visiting friends or family, business, relocation research, or another reason."
        >
          <input
            value={request.purpose}
            onChange={(e) => updateRequest({ purpose: e.target.value })}
            placeholder="e.g. vacation, cultural travel, business"
            className={inputClass}
          />
        </Field>

        <Field
          label={
            count === 1
              ? 'Which cities, regions, or places are you interested in visiting?'
              : 'Which cities, regions, or places are you interested in visiting in each country?'
          }
          hint="If you are unsure, you can leave this open for recommendations."
        >
          <textarea
            rows={2}
            value={request.placesConsidering}
            onChange={(e) => updateRequest({ placesConsidering: e.target.value })}
            placeholder="e.g. cities, regions, national parks, or specific places"
            className={inputClass}
          />
        </Field>
      </SectionCard>

      <SectionCard number={3} title="Your Travel Interests">
        <div>
          <span className="text-sm font-semibold text-primary">
            What type of experiences are you most interested in?
          </span>
          <p className="mt-0.5 text-xs text-muted-foreground">
            For example: culture and history, wildlife, beaches, nature, food, nightlife, local
            communities, markets, hiking, or relaxation.
          </p>
          <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
            {TRAVEL_PLANNER_FLOW.experienceOptionsPdf.map((option) => (
              <CheckboxOption
                key={option}
                checked={request.interests.includes(option)}
                onChange={() => toggleListValue('interests', option)}
                label={option}
              />
            ))}
            <CheckboxOption
              checked={request.interests.includes('Other')}
              onChange={() => toggleListValue('interests', 'Other')}
              label="Other (please specify)"
            />
          </div>
          {request.interests.includes('Other') && (
            <input
              value={request.otherInterest}
              onChange={(e) => updateRequest({ otherInterest: e.target.value })}
              placeholder="Enter your interests"
              className={`${inputClass} mt-2.5`}
            />
          )}
        </div>
      </SectionCard>

      <SectionCard number={4} title="Your Travel Style & Budget">
        <div>
          <span className="text-sm font-semibold text-primary">
            What is your preferred travel style?
          </span>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5">
            {TRAVEL_PLANNER_FLOW.travelStyleOptionsPdf.map((option) => (
              <RadioOption
                key={option}
                name="travelStylePdf"
                value={option}
                checked={request.travelStylePdf === option}
                onChange={() => updateRequest({ travelStylePdf: option })}
                label={option}
              />
            ))}
          </div>
        </div>

        <Field
          label={
            count === 1
              ? 'What approximate budget are you planning for your trip?'
              : 'What approximate budget are you planning for the entire trip?'
          }
          hint="Please exclude international airfare unless you would like us to consider it when planning."
        >
          <input
            value={request.budget}
            onChange={(e) => updateRequest({ budget: e.target.value })}
            placeholder="e.g. $1,500 – $2,000"
            className={inputClass}
          />
        </Field>

        <div>
          <span className="text-sm font-semibold text-primary">
            What type of accommodation do you prefer?
          </span>
          <p className="mt-0.5 text-xs text-muted-foreground">
            For example: hotels, guesthouses, apartments, lodges, hostels, or a mixture.
          </p>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5">
            {TRAVEL_PLANNER_FLOW.accommodationTypeOptionsPdf.map((option) => (
              <RadioOption
                key={option}
                name="accommodationTypePdf"
                value={option}
                checked={request.accommodationTypePdf === option}
                onChange={() => updateRequest({ accommodationTypePdf: option })}
                label={option}
              />
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard number={5} title="Getting Around">
        <div>
          <span className="text-sm font-semibold text-primary">
            How would you prefer to travel within {countriesPhrase}?
          </span>
          <p className="mt-0.5 text-xs text-muted-foreground">
            For example: private driver, public transportation, domestic flights where appropriate,
            taxis/ride-hailing, rental vehicle, or a mixture.
          </p>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5">
            {TRAVEL_PLANNER_FLOW.gettingAroundOptionsPdf.map((option) => (
              <RadioOption
                key={option}
                name="gettingAroundPdf"
                value={option}
                checked={request.gettingAroundPdf === option}
                onChange={() => updateRequest({ gettingAroundPdf: option })}
                label={option}
              />
            ))}
          </div>
        </div>

        {count > 1 && (
          <div>
            <span className="text-sm font-semibold text-primary">
              How would you prefer to travel between {betweenWord}?
            </span>
            <p className="mt-0.5 text-xs text-muted-foreground">
              If you are unsure, we can recommend the most practical{' '}
              {count === 2 ? 'option' : 'route'}.
            </p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5">
              {betweenOptions.map((option) => (
                <RadioOption
                  key={option}
                  name="betweenCountriesTravel"
                  value={option}
                  checked={request.betweenCountriesTravel === option}
                  onChange={() => updateRequest({ betweenCountriesTravel: option })}
                  label={option}
                />
              ))}
            </div>
          </div>
        )}
      </SectionCard>

      <SectionCard number={6} title="Your Preferences">
        <Field
          label={`Are there any specific activities, attractions, or experiences you definitely want included${includedPhrase}?`}
        >
          <textarea
            rows={2}
            value={request.mustInclude}
            onChange={(e) => updateRequest({ mustInclude: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Are there any activities, places, or types of travel you would prefer to avoid?">
          <textarea
            rows={2}
            value={request.avoid}
            onChange={(e) => updateRequest({ avoid: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Do you have any mobility, accessibility, dietary, or other practical requirements we should consider?">
          <textarea
            rows={2}
            value={request.accessibilityNeeds}
            onChange={(e) => updateRequest({ accessibilityNeeds: e.target.value })}
            className={inputClass}
          />
        </Field>
      </SectionCard>

      <SectionCard number={7} title="Your Current Plans">
        <div>
          <span className="text-sm font-semibold text-primary">
            Have you already booked any part of this trip?
          </span>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {TRAVEL_PLANNER_FLOW.bookedStatusOptions.map((option) => (
              <RadioOption
                key={option}
                name="bookedStatus"
                value={option}
                checked={request.bookedStatus === option}
                onChange={() => updateRequest({ bookedStatus: option })}
                label={option}
              />
            ))}
          </div>
        </div>
        <Field label="If yes, please provide the relevant details such as accommodation, transportation, tours, or activities.">
          <textarea
            rows={2}
            value={request.alreadyArranged}
            onChange={(e) => updateRequest({ alreadyArranged: e.target.value })}
            className={inputClass}
          />
        </Field>
      </SectionCard>

      <SectionCard number={8} title="Anything Else">
        <Field label="Is there anything else you would like us to know when preparing your Travel Planner?">
          <textarea
            rows={2}
            value={request.additionalNotes}
            onChange={(e) => updateRequest({ additionalNotes: e.target.value })}
            className={inputClass}
          />
        </Field>
      </SectionCard>
    </>
  )
}

// ---------------------------------------------------------------------
// Pre-existing 4-country question set — unchanged.
// ---------------------------------------------------------------------
function LegacyRequestSections({
  request,
  updateRequest,
  toggleListValue,
  destinationNames,
  arrivedWithSelection,
}) {
  return (
    <>
      <SectionCard number={2} title="Your Trip">
        {arrivedWithSelection ? (
          <DestinationSummary label="Your Destination(s)" destinationNames={destinationNames} />
        ) : (
          <DestinationPickerField
            label="Your Destination(s)"
            hint="You can select up to 4 countries."
            values={request.destinationSlugs}
            onChange={(slugs) => updateRequest({ destinationSlugs: slugs })}
            max={4}
          />
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="When are you planning to travel?" required>
            <div className="grid grid-cols-2 gap-2.5">
              <input
                required
                type="date"
                aria-label="Arrival date"
                value={request.arrivalDate}
                onChange={(e) => updateRequest({ arrivalDate: e.target.value })}
                className={inputClass}
              />
              <input
                required
                type="date"
                aria-label="Departure date"
                value={request.departureDate}
                onChange={(e) => updateRequest({ departureDate: e.target.value })}
                className={inputClass}
              />
            </div>
            <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={request.datesFlexible}
                onChange={(e) => updateRequest({ datesFlexible: e.target.checked })}
                className="size-3.5 accent-copper"
              />
              My dates are flexible
            </label>
          </Field>

          <Field label="How many people are travelling?" required>
            <select
              required
              value={request.travellerCount}
              onChange={(e) => updateRequest({ travellerCount: e.target.value })}
              className={inputClass}
            >
              <option value="">Select number</option>
              {['1', '2', '3', '4', '5', '6+'].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Which places are you already considering?"
          hint="It is fine if you are not sure yet."
        >
          <textarea
            rows={2}
            value={request.placesConsidering}
            onChange={(e) => updateRequest({ placesConsidering: e.target.value })}
            placeholder="e.g. cities, regions, national parks, or specific places"
            className={inputClass}
          />
        </Field>
      </SectionCard>

      <SectionCard number={3} title="Your Travel Interests">
        <div>
          <span className="text-sm font-semibold text-primary">
            What are you most interested in? (Select all that apply)
          </span>
          <div className="mt-2 grid gap-2.5 sm:grid-cols-3">
            {TRAVEL_PLANNER_FLOW.interestOptions.map((option) => (
              <CheckboxOption
                key={option}
                checked={request.interests.includes(option)}
                onChange={() => toggleListValue('interests', option)}
                label={option}
              />
            ))}
            <CheckboxOption
              checked={request.interests.includes('Other')}
              onChange={() => toggleListValue('interests', 'Other')}
              label="Other (please specify)"
            />
          </div>
          {request.interests.includes('Other') && (
            <input
              value={request.otherInterest}
              onChange={(e) => updateRequest({ otherInterest: e.target.value })}
              placeholder="Enter your interests"
              className={`${inputClass} mt-2.5`}
            />
          )}
        </div>
      </SectionCard>

      <SectionCard number={4} title="Your Travel Style">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <span className="text-sm font-semibold text-primary">
              How would you describe your preferred way of travelling?{' '}
              <span className="text-copper">*</span>
            </span>
            <div className="mt-2 space-y-1.5">
              {TRAVEL_PLANNER_FLOW.travelStyleOptions.map((option) => (
                <RadioOption
                  key={option}
                  name="travelStyle"
                  value={option}
                  checked={request.travelStyle === option}
                  onChange={() => updateRequest({ travelStyle: option })}
                  label={option}
                />
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold text-primary">
              What type of accommodation do you generally prefer?
            </span>
            <div className="mt-2 space-y-1.5">
              {TRAVEL_PLANNER_FLOW.accommodationOptions.map((option) => (
                <RadioOption
                  key={option}
                  name="accommodation"
                  value={option}
                  checked={request.accommodation === option}
                  onChange={() => updateRequest({ accommodation: option })}
                  label={option}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard number={5} title="Getting Around">
        <div>
          <span className="text-sm font-semibold text-primary">
            How do you expect to travel during your trip? (Select all that apply)
          </span>
          <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
            {TRAVEL_PLANNER_FLOW.gettingAroundOptions.map((option) => (
              <CheckboxOption
                key={option}
                checked={request.gettingAround.includes(option)}
                onChange={() => toggleListValue('gettingAround', option)}
                label={option}
              />
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard number={6} title="Your Current Plans">
        <div>
          <span className="text-sm font-semibold text-primary">
            Have you already booked or paid for any part of this trip?{' '}
            <span className="text-copper">*</span>
          </span>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {TRAVEL_PLANNER_FLOW.bookedStatusOptions.map((option) => (
              <RadioOption
                key={option}
                name="bookedStatus"
                value={option}
                checked={request.bookedStatus === option}
                onChange={() => updateRequest({ bookedStatus: option })}
                label={option}
              />
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="If yes, what have you already arranged?">
            <textarea
              rows={2}
              value={request.alreadyArranged}
              onChange={(e) => updateRequest({ alreadyArranged: e.target.value })}
              placeholder="Enter details (flights, accommodation, transportation, tours, etc.)"
              className={inputClass}
            />
          </Field>
          <Field label="Do you already have a rough itinerary or route?">
            <textarea
              rows={2}
              value={request.roughItinerary}
              onChange={(e) => updateRequest({ roughItinerary: e.target.value })}
              placeholder="You may share what you have planned so far."
              className={inputClass}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard number={7} title="What Do You Need Help With?">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="What would you most like us to help you with?" required>
            <textarea
              required
              rows={2}
              value={request.helpWith}
              onChange={(e) => updateRequest({ helpWith: e.target.value })}
              placeholder="Tell us your main questions, concerns or areas of focus."
              className={inputClass}
            />
          </Field>
          <Field label="Is there anything else we should know about your trip?">
            <textarea
              rows={2}
              value={request.additionalNotes}
              onChange={(e) => updateRequest({ additionalNotes: e.target.value })}
              placeholder="Add any additional information here."
              className={inputClass}
            />
          </Field>
        </div>
      </SectionCard>
    </>
  )
}

export function RequestForm() {
  useEffect(() => {
    document.title = 'Your Travel Planner Request | East-West Africa Link'
  }, [])

  const navigate = useNavigate()
  const { request, updateRequest, toggleListValue, setDaysForCountry, tier, count } =
    useTravelPlannerFlow()
  const copy = TRAVEL_PLANNER_FLOW.steps.request
  const destinationNames = request.destinationSlugs
    .map((slug) => COUNTRIES.find((c) => c.slug === slug)?.name)
    .filter(Boolean)

  // Captured once, at mount, from whatever the context seeded from the URL
  // — not derived from request.destinationSlugs on every render, since
  // that would flip this flag the moment someone picks a country in the
  // inline picker below and switch them over to the read-only summary
  // mid-selection. Mirrors Before You Book Check's own RequestForm.
  const [arrivedWithSelection] = useState(() => request.destinationSlugs.length > 0)

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/travel-planner/review')
  }

  return (
    <>
      <PlannerBackground />
      <PlannerStepHero
        badge="Travel Planner"
        badgeImage="/Pictures/umbrella.PNG"
        badgeImageAlt="Travel Planner"
        backgroundImage="/Pictures/TRV_HR.PNG"
      />

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

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <SectionCard
                number={1}
                title="Your Contact Details"
                subtitle="We will use this information to send your travel plan and any follow-up emails."
              >
                <div className="grid gap-5 sm:grid-cols-3">
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
                  <Field label="Phone / WhatsApp Number" required>
                    <input
                      required
                      type="tel"
                      value={request.phone}
                      onChange={(e) => updateRequest({ phone: e.target.value })}
                      placeholder="e.g. +1 206 350 1330"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </SectionCard>

              {count <= 3 ? (
                <PdfRequestSections
                  request={request}
                  updateRequest={updateRequest}
                  toggleListValue={toggleListValue}
                  setDaysForCountry={setDaysForCountry}
                  destinationNames={destinationNames}
                  count={count}
                  arrivedWithSelection={arrivedWithSelection}
                />
              ) : (
                <LegacyRequestSections
                  request={request}
                  updateRequest={updateRequest}
                  toggleListValue={toggleListValue}
                  destinationNames={destinationNames}
                  arrivedWithSelection={arrivedWithSelection}
                />
              )}

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

            <PlannerSidebar price={tier?.price} caption={copy.sidebarCaption} />
          </form>
        </div>
      </section>
    </>
  )
}
