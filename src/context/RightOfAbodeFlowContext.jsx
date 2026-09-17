import { createContext, useContext, useState } from 'react'
import { GHANA_RIGHT_OF_ABODE_FLOW } from '../data/siteContent.js'

const DEFAULT_REQUEST = {
  // Section 1: Personal Information
  fullName: '',
  email: '',
  whatsapp: '',
  nationality: '',
  currentCountry: '',
  city: '',
  // Section 2: Basis for Right of Abode
  wasGhanaianCitizen: '',
  howAcquired: '',
  lostCitizenship: '',
  seekingByDescent: '',
  familyConnection: '',
  // Section 3: Ghana Residence & Immigration History
  livedInGhana: '',
  whenHowLong: '',
  immigrationStatus: '',
  previouslyApplied: '',
  previousApplyExplain: '',
  // Section 4: Current Circumstances & Long-Term Plans
  moveDate: '',
  intendLength: '',
  mainPurpose: '',
  areasConsidering: '',
  // Section 5: Eligibility & Supporting Information
  haveReferees: '',
  criminalOffence: '',
  financialMeans: '',
  financialExplain: '',
  contributionPlan: '',
  contributionExplain: '',
  // Section 6: Documents You Currently Have
  documents: [],
  // Section 7: Your Questions
  questions: '',
}

const RightOfAbodeFlowContext = createContext(null)

/**
 * Holds the Right of Abode Guidance questionnaire's form data across all 4
 * steps (request → review → payment → confirmation). Mirrors
 * LandPropertyFlowContext exactly — Ghana-only, flat-priced, no
 * destinationSlugs field. See GHANA_RIGHT_OF_ABODE_FLOW.price for the
 * single flat fee this service charges.
 */
export function RightOfAbodeFlowProvider({ children }) {
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
    price: GHANA_RIGHT_OF_ABODE_FLOW.price,
    paid,
    setPaid,
  }

  return (
    <RightOfAbodeFlowContext.Provider value={value}>{children}</RightOfAbodeFlowContext.Provider>
  )
}

export function useRightOfAbodeFlow() {
  const ctx = useContext(RightOfAbodeFlowContext)
  if (!ctx) {
    throw new Error('useRightOfAbodeFlow must be used within a RightOfAbodeFlowProvider')
  }
  return ctx
}
