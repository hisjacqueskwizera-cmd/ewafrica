import { createContext, useContext, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { COUNTRIES, priceForTravelAudit } from '../data/siteContent.js'

const DEFAULT_REQUEST = {
  // Your Contact Information
  fullName: '',
  email: '',
  phone: '',
  // Your Trip Details — carried in from the Travel Planner landing page's
  // picker (?destinations=) when the visitor already chose there;
  // otherwise starts empty and RequestForm asks for it inline instead of
  // silently having no destinations at all (see RequestForm's own picker).
  destinationSlugs: [],
  // Your Travel Timeline
  travelMonth: '',
  travelYear: '',
  duration: '',
  // What Have You Already Booked?
  alreadyBooked: [],
  otherAlreadyBooked: '',
  // Share Your Current Bookings
  currentBookings: '',
  // What Would You Like Us to Review?
  reviewRequest: '',
}

const TravelAuditFlowContext = createContext(null)

/**
 * Holds the Travel Audit request wizard's form data across all 4 steps
 * (request → review → payment → confirmation). Lives above the step routes
 * in App.jsx, mirroring BeforeYouBookFlowContext for that (separate)
 * service — same shape, but its own request object and its own pricing
 * rule (see priceForTravelAudit in siteContent.js): tiered by country
 * count, plus a flat surcharge whenever Ghana is selected.
 */
export function TravelAuditFlowProvider({ children }) {
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

  const price = useMemo(() => priceForTravelAudit(request.destinationSlugs), [request.destinationSlugs])

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
    <TravelAuditFlowContext.Provider value={value}>{children}</TravelAuditFlowContext.Provider>
  )
}

export function useTravelAuditFlow() {
  const ctx = useContext(TravelAuditFlowContext)
  if (!ctx) {
    throw new Error('useTravelAuditFlow must be used within a TravelAuditFlowProvider')
  }
  return ctx
}
