import { createContext, useContext, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { COUNTRIES, priceForSelection } from '../data/siteContent.js'

const DEFAULT_REQUEST = {
  // Your Contact Information
  fullName: '',
  email: '',
  phone: '',
  // Your Planned Destinations — carried in from the Travel Planner landing
  // page's picker (?destinations=) when the visitor already chose there;
  // otherwise starts empty and RequestForm asks for it inline instead of
  // silently having no destinations at all (see RequestForm's own picker).
  destinationSlugs: [],
  // Your Travel Plans (Tentative)
  travelMonth: '',
  travelYear: '',
  duration: '',
  // What Are You Planning to Book?
  bookingPlans: [],
  otherBookingPlan: '',
  // Share Your Planned Itinerary or Ideas
  itinerary: '',
  // Specific Questions or Concerns
  questions: '',
}

const BeforeYouBookFlowContext = createContext(null)

/**
 * Holds the Before You Book Check request wizard's form data across all 4
 * steps (request → review → payment → confirmation). Lives above the step
 * routes in App.jsx, mirroring TravelPlannerFlowContext for the (separate)
 * Travel Planner service — same shape, but its own request object and its
 * own pricing rule (see priceForSelection in siteContent.js): tiered by
 * country count, plus a flat surcharge whenever Ghana is selected.
 */
export function BeforeYouBookFlowProvider({ children }) {
  const [searchParams] = useSearchParams()
  const [request, setRequest] = useState(() => {
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

  const price = useMemo(() => priceForSelection(request.destinationSlugs), [request.destinationSlugs])

  const value = {
    request,
    updateRequest,
    toggleListValue,
    resetRequest,
    price,
    paid,
    setPaid,
  }

  return (
    <BeforeYouBookFlowContext.Provider value={value}>{children}</BeforeYouBookFlowContext.Provider>
  )
}

export function useBeforeYouBookFlow() {
  const ctx = useContext(BeforeYouBookFlowContext)
  if (!ctx) {
    throw new Error('useBeforeYouBookFlow must be used within a BeforeYouBookFlowProvider')
  }
  return ctx
}
