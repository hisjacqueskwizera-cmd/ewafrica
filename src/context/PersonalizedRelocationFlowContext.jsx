import { createContext, useContext, useState } from 'react'
import { GHANA_PERSONALIZED_RELOCATION_FLOW } from '../data/siteContent.js'

const DEFAULT_REQUEST = {
  // Your Contact Information
  fullName: '',
  email: '',
  phone: '',
  currentCountry: '',
  // Relocation Questionnaire
  moveTimeframe: '',
  lengthOfStay: '',
  moveReasons: [],
  otherMoveReason: '',
  areas: [],
  otherArea: '',
  notSureArea: false,
  areaTypes: [],
  otherAreaType: '',
  housingType: '',
  housingBudgetAmount: '',
  housingBudgetCurrency: '',
  livingBudgetAmount: '',
  livingBudgetCurrency: '',
  livingBudgetNotDetermined: false,
  lifestylePriorities: [],
  otherLifestylePriority: '',
  healthcareConcerns: '',
  transportation: '',
  bankingGuidance: '',
  bankingDetails: '',
  businessInvolvement: '',
  businessPlans: '',
  residencyConsiderations: '',
  topThreeHelp: '',
  specificQuestions: '',
  additionalInfo: '',
  consentChecked: false,
}

const PersonalizedRelocationFlowContext = createContext(null)

/**
 * Holds the Personalized Relocation Guidance request wizard's form data
 * across all 4 steps (request → review → payment → confirmation). Mirrors
 * LandPropertyFlowContext/RightOfAbodeFlowContext/RelocationFlowContext
 * exactly — Ghana-only, flat-priced. See
 * GHANA_PERSONALIZED_RELOCATION_FLOW.price for the single flat fee this
 * (lighter, standalone) service charges — not to be confused with the
 * separate Complete Relocation Package and its own RelocationFlowContext.
 */
export function PersonalizedRelocationFlowProvider({ children }) {
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
    price: GHANA_PERSONALIZED_RELOCATION_FLOW.price,
    paid,
    setPaid,
  }

  return (
    <PersonalizedRelocationFlowContext.Provider value={value}>
      {children}
    </PersonalizedRelocationFlowContext.Provider>
  )
}

export function usePersonalizedRelocationFlow() {
  const ctx = useContext(PersonalizedRelocationFlowContext)
  if (!ctx) {
    throw new Error(
      'usePersonalizedRelocationFlow must be used within a PersonalizedRelocationFlowProvider',
    )
  }
  return ctx
}
