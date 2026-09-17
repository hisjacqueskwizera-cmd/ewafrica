import { createContext, useContext, useState } from 'react'
import { GHANA_RELOCATION_FLOW } from '../data/siteContent.js'

const DEFAULT_REQUEST = {
  // Section 1: Personal Information
  fullName: '',
  email: '',
  phone: '',
  currentCountry: '',
  nationality: '',
  contactMethod: '',
  // Section 2: Relocation Plans
  moveTimeframe: '',
  purpose: '',
  otherPurpose: '',
  relocatingWith: '',
  otherRelocatingWith: '',
  numPeople: '',
  topGoals: [],
  otherTopGoal: '',
  // Section 3: Preferred Locations & Housing
  areas: [],
  otherArea: '',
  housingType: '',
  otherHousingType: '',
  budgetRange: '',
  neighborhoodPriorities: [],
  otherNeighborhoodPriority: '',
  // Section 4: Immigration, Residency & Official Processes
  hasVisa: '',
  residencyOption: '',
  immigrationQuestions: '',
  // Section 5: Work, Business, Banking & Education
  interestedWorking: '',
  interestedBusiness: '',
  needBanking: '',
  needEducation: '',
  // Section 6: Healthcare & Insurance
  needHealthcare: '',
  needInsurance: '',
  healthcareQuestions: '',
  // Section 7: Transportation & Daily Life
  transportInfo: [],
  dailyLifeTopics: [],
  // Section 8: Preparing for Your Move
  moveSupport: [],
  visitedBefore: '',
  prepQuestions: '',
  // Section 9: Settling In
  settlingInfo: [],
  otherSettlingDetails: '',
  // Section 10: Your Questions
  additionalQuestions: '',
}

const RelocationFlowContext = createContext(null)

/**
 * Holds the Complete Relocation Package request wizard's form data across
 * all 4 steps (request → review → payment → confirmation). Mirrors
 * LandPropertyFlowContext/RightOfAbodeFlowContext exactly — Ghana-only,
 * flat-priced. See GHANA_RELOCATION_FLOW.price for the single flat fee
 * this service charges.
 */
export function RelocationFlowProvider({ children }) {
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
    price: GHANA_RELOCATION_FLOW.price,
    paid,
    setPaid,
  }

  return (
    <RelocationFlowContext.Provider value={value}>{children}</RelocationFlowContext.Provider>
  )
}

export function useRelocationFlow() {
  const ctx = useContext(RelocationFlowContext)
  if (!ctx) {
    throw new Error('useRelocationFlow must be used within a RelocationFlowProvider')
  }
  return ctx
}
