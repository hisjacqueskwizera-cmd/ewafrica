import { createContext, useContext, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { COUNTRIES, TRAVEL_PLANNER_FLOW } from '../data/siteContent.js'

const DEFAULT_REQUEST = {
  // Your Contact Details
  fullName: '',
  email: '',
  phone: '',
  // Your Trip — destinationSlugs is the only source of truth for "how many
  // countries": it's carried in from the landing page's picker (see
  // TravelPlanner.jsx's "View Details" link, built with a ?destinations=
  // query string) rather than asked again here, so there's no separate
  // countryCount field to keep in sync with it.
  destinationSlugs: [],
  arrivalDate: '',
  departureDate: '',
  datesFlexible: false,
  travellerCount: '',
  placesConsidering: '',
  // Your Travel Interests
  interests: [],
  otherInterest: '',
  // Your Travel Style
  travelStyle: '',
  accommodation: '',
  // Getting Around
  gettingAround: [],
  // Your Current Plans
  bookedStatus: '',
  alreadyArranged: '',
  roughItinerary: '',
  // What Do You Need Help With?
  helpWith: '',
  additionalNotes: '',
}

const TravelPlannerFlowContext = createContext(null)

/**
 * Holds the Travel Planner request wizard's form data across all 4 steps
 * (request → review → payment → confirmation). Lives above the step routes
 * in App.jsx, so it survives client-side navigation between them — it does
 * NOT persist across a hard refresh (no sessionStorage), since this is a
 * fairly short flow a visitor is expected to complete in one sitting.
 */
export function TravelPlannerFlowProvider({ children }) {
  const [searchParams] = useSearchParams()
  const [request, setRequest] = useState(() => {
    // Read once on mount — the landing page's "View Details" link is the
    // only entry point into this flow (RequestForm redirects back out if
    // nothing came through), so this is the visitor's carried-over pick,
    // up to the same 4-country max the picker itself enforces.
    const slugs = (searchParams.get('destinations') ?? '')
      .split(',')
      .filter((slug) => COUNTRIES.some((c) => c.slug === slug))
      .slice(0, 4)
    return { ...DEFAULT_REQUEST, destinationSlugs: slugs }
  })
  const [paid, setPaid] = useState(false)

  const updateRequest = (patch) => setRequest((prev) => ({ ...prev, ...patch }))

  const toggleListValue = (field, value) => {
    setRequest((prev) => {
      const list = prev[field]
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
      return { ...prev, [field]: next }
    })
  }

  const resetRequest = () => {
    setRequest(DEFAULT_REQUEST)
    setPaid(false)
  }

  // Prices throughout the flow follow the carried-over selection directly
  // — never a separately-asked count — so this is the one place that turns
  // "how many countries" into a tier; everything downstream reads `tier`.
  const count = Math.max(request.destinationSlugs.length, 1)
  const tier = useMemo(
    () => TRAVEL_PLANNER_FLOW.tiers.find((t) => t.countries === count),
    [count],
  )

  const value = {
    request,
    updateRequest,
    toggleListValue,
    resetRequest,
    tier,
    paid,
    setPaid,
  }

  return (
    <TravelPlannerFlowContext.Provider value={value}>{children}</TravelPlannerFlowContext.Provider>
  )
}

export function useTravelPlannerFlow() {
  const ctx = useContext(TravelPlannerFlowContext)
  if (!ctx) {
    throw new Error('useTravelPlannerFlow must be used within a TravelPlannerFlowProvider')
  }
  return ctx
}
