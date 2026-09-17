import { createContext, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { COUNTRIES } from '../data/siteContent.js'

const DEFAULT_REQUEST = {
  // Your Information
  fullName: '',
  email: '',
  phone: '',
  nationality: '',
  countryOfResidence: '',
  // Your Travel Plans
  travelDate: '',
  lengthOfStay: '',
  purpose: '',
  // Visa Application Background
  applicationStarted: '',
  previouslyApplied: '',
  // What would you like help understanding?
  helpTopics: [],
  otherHelpTopic: '',
  // Additional Information
  situation: '',
  // Phone Consultation
  phoneConsult: '',
}

const VisaGuidanceFlowContext = createContext(null)

/**
 * Holds the Personal Visa Guidance request wizard's form data across all 4
 * steps (request → review → payment → confirmation). Unlike the Ghana
 * Exclusive flows, this one is reached via a `:slug` route param (see
 * VisaGuidanceFlowRoutes in App.jsx) since the same flow serves every
 * country — the Provider resolves that slug once, on mount, into the
 * matching COUNTRIES entry so every step can read `country` without
 * re-parsing the route itself.
 */
export function VisaGuidanceFlowProvider({ children }) {
  const { slug } = useParams()
  const country = COUNTRIES.find((c) => c.slug === slug) ?? COUNTRIES[0]
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
    country,
    request,
    updateRequest,
    toggleListValue,
    resetRequest,
    price: 45,
    paid,
    setPaid,
  }

  return (
    <VisaGuidanceFlowContext.Provider value={value}>{children}</VisaGuidanceFlowContext.Provider>
  )
}

export function useVisaGuidanceFlow() {
  const ctx = useContext(VisaGuidanceFlowContext)
  if (!ctx) {
    throw new Error('useVisaGuidanceFlow must be used within a VisaGuidanceFlowProvider')
  }
  return ctx
}
