import { createContext, useContext, useState } from 'react'
import { GHANA_LAND_PROPERTY_FLOW } from '../data/siteContent.js'

const DEFAULT_REQUEST = {
  // Your Contact Information
  fullName: '',
  email: '',
  phone: '',
  // Section 1: Your Plan
  purposes: [],
  otherPurpose: '',
  lengthOfStay: '',
  propertyType: '',
  stayPurpose: '',
  locations: [],
  otherLocation: '',
  havePropertyInMind: '',
  visitedProperty: '',
  budgetRange: '',
  timeframe: '',
  citizenship: '',
  questions: '',
  // Section 2: Property Details
  intendedUse: '',
  sizeNeeded: '',
  landPreference: '',
  titlePreference: '',
  utilitiesNeeded: '',
  preferredAreas: '',
  maxDistance: '',
  nearestCity: '',
  otherRequirements: '',
  featurePriority: '',
  // Section 3: Research Focus
  researchFocus: [],
}

const LandPropertyFlowContext = createContext(null)

/**
 * Holds the Land & Property Guidance request wizard's form data across all
 * 4 steps (request → review → payment → confirmation). Lives above the
 * step routes in App.jsx, mirroring BeforeYouBookFlowContext for the
 * (separate) Before You Book Check service — same shape, but this service
 * is Ghana-only and flat-priced, so there is no destinationSlugs field and
 * no priced-by-selection logic: price is just GHANA_LAND_PROPERTY_FLOW.price.
 */
export function LandPropertyFlowProvider({ children }) {
  const [request, setRequest] = useState(DEFAULT_REQUEST)
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

  const value = {
    request,
    updateRequest,
    toggleListValue,
    resetRequest,
    price: GHANA_LAND_PROPERTY_FLOW.price,
    paid,
    setPaid,
  }

  return (
    <LandPropertyFlowContext.Provider value={value}>{children}</LandPropertyFlowContext.Provider>
  )
}

export function useLandPropertyFlow() {
  const ctx = useContext(LandPropertyFlowContext)
  if (!ctx) {
    throw new Error('useLandPropertyFlow must be used within a LandPropertyFlowProvider')
  }
  return ctx
}
