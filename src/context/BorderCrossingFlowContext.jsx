import { createContext, useContext, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BORDER_CROSSING_FLOW, COUNTRIES, priceForBorderCrossing } from '../data/siteContent.js'

const DEFAULT_REQUEST = {
  // Your Contact Information
  fullName: '',
  email: '',
  phone: '',
  // Your Travel Route — carried in from a country page's own Border
  // Crossing Guide card (?from=<slug>) when the visitor already arrived
  // with a starting country in mind; otherwise starts empty and the
  // request form just asks for it directly (this service isn't tied to
  // the shared /travel-planner picker the other three services use, since
  // it's about a single route, not a multi-country trip).
  crossingCount: '',
  fromCountrySlug: '',
  fromCity: '',
  toCountrySlug: '',
  toCity: '',
  // Your Travel Plans (Tentative)
  travelMonth: '',
  travelYear: '',
  duration: '',
  // Purpose of Your Trip
  purpose: '',
  otherPurpose: '',
  // Do You Already Know Which Border Crossing You Plan to Use?
  certainty: '',
  crossingDetails: '',
  // Additional Information
  additionalInfo: '',
}

const BorderCrossingFlowContext = createContext(null)

/**
 * Holds the Border Crossing Guide request wizard's form data across all 4
 * steps (request → review → payment → confirmation). Lives above the step
 * routes in App.jsx, mirroring TravelAuditFlowContext/BeforeYouBookFlow
 * Context for the other two flat-rate-by-count services — same shape, but
 * priced by how many border crossings the route involves (not country
 * count) via priceForBorderCrossing in siteContent.js.
 */
export function BorderCrossingFlowProvider({ children }) {
  const [searchParams] = useSearchParams()
  const [request, setRequest] = useState(() => {
    const from = searchParams.get('from')
    const fromCountrySlug = COUNTRIES.some((c) => c.slug === from) ? from : ''
    return { ...DEFAULT_REQUEST, fromCountrySlug }
  })
  const [paid, setPaid] = useState(false)

  const updateRequest = (patch) => setRequest((prev) => ({ ...prev, ...patch }))

  const resetRequest = () => {
    setRequest(DEFAULT_REQUEST)
    setPaid(false)
  }

  const crossingCount = Number(request.crossingCount) || 0
  const isCustomQuote = crossingCount >= BORDER_CROSSING_FLOW.customQuoteAt
  const price = useMemo(() => priceForBorderCrossing(crossingCount), [crossingCount])

  const value = {
    request,
    updateRequest,
    resetRequest,
    crossingCount,
    isCustomQuote,
    price,
    paid,
    setPaid,
  }

  return (
    <BorderCrossingFlowContext.Provider value={value}>{children}</BorderCrossingFlowContext.Provider>
  )
}

export function useBorderCrossingFlow() {
  const ctx = useContext(BorderCrossingFlowContext)
  if (!ctx) {
    throw new Error('useBorderCrossingFlow must be used within a BorderCrossingFlowProvider')
  }
  return ctx
}
