import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { COUNTRIES } from '../data/siteContent.js'
import { VISA_PRICING_PER_COUNTRY } from '../data/visaGuidanceData.js'

const DEFAULT_COUNTRY_DETAIL = {
  arrivalDate: '',
  departureDate: '',
  lengthOfStay: '',
  entryMethod: '',
  entryPoint: '',
  firstVisit: '',
  previouslyRefused: '',
  refusalExplanation: '',
  purposeSameAsMain: 'yes',
  specificPurpose: '',
  questions: '',
}

const DEFAULT_USER_INFO = {
  fullName: '',
  email: '',
  phone: '',
  phoneDialCode: '+1',
}

const DEFAULT_PASSPORT_DETAILS = {
  nationality: '',
  hasAdditionalNationality: 'no',
  additionalNationalityDetails: '',
  countryOfResidence: '',
  currentLocation: '',
  passportType: 'ordinary',
  passportExpiration: '',
}

const DEFAULT_TRIP_DETAILS = {
  plannedOrder: '',
  startDate: '',
  endDate: '',
  datesFlexible: 'fixed',
  mainPurpose: '',
  travelByLand: 'no',
  landCountries: '',
  applyWhileTraveling: 'no',
  applyWhileTravelingCountries: '',
  applyWhileTravelingLocation: '',
  travelingWith: 'alone',
}

const DEFAULT_ADDITIONAL_INFO = {
  existingVisas: '',
  otherCircumstances: '',
}

const VisaGuidanceFlowContext = createContext(null)

export function VisaGuidanceFlowProvider({ children }) {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()

  const [destinationSlugs, setDestinationSlugs] = useState(() => {
    // 1. Check if slug param exists in URL and is a valid country
    if (slug && COUNTRIES.some((c) => c.slug === slug)) {
      return [slug]
    }
    // 2. Check ?destinations=... query param
    const queryDests = searchParams.get('destinations')
    if (queryDests) {
      const parsed = queryDests
        .split(',')
        .map((s) => s.trim())
        .filter((s) => COUNTRIES.some((c) => c.slug === s))
      if (parsed.length > 0) return parsed
    }
    // 3. Default empty
    return []
  })

  const [userInfo, setUserInfo] = useState(DEFAULT_USER_INFO)
  const [passportDetails, setPassportDetails] = useState(DEFAULT_PASSPORT_DETAILS)
  const [tripDetails, setTripDetails] = useState(DEFAULT_TRIP_DETAILS)
  const [countryDetails, setCountryDetails] = useState({})
  const [additionalInfo, setAdditionalInfo] = useState(DEFAULT_ADDITIONAL_INFO)
  const [paid, setPaid] = useState(false)

  // Ensure countryDetails has an entry for all selected countries
  useEffect(() => {
    setCountryDetails((prev) => {
      const next = { ...prev }
      let changed = false
      destinationSlugs.forEach((s) => {
        if (!next[s]) {
          next[s] = { ...DEFAULT_COUNTRY_DETAIL }
          changed = true
        }
      })
      return changed ? next : prev
    })
  }, [destinationSlugs])

  // Sync plannedOrder default if empty when countries change
  useEffect(() => {
    if (!tripDetails.plannedOrder && destinationSlugs.length > 1) {
      const names = destinationSlugs
        .map((s) => COUNTRIES.find((c) => c.slug === s)?.name)
        .filter(Boolean)
      setTripDetails((prev) => ({
        ...prev,
        plannedOrder: names.join(' → '),
      }))
    }
  }, [destinationSlugs, tripDetails.plannedOrder])

  const MAX_DESTINATIONS = 4

  const toggleDestination = (slugToToggle) => {
    setDestinationSlugs((prev) => {
      if (prev.includes(slugToToggle)) {
        return prev.filter((s) => s !== slugToToggle)
      } else {
        if (prev.length >= MAX_DESTINATIONS) return prev
        return [...prev, slugToToggle]
      }
    })
  }

  const addDestination = (slugToAdd) => {
    setDestinationSlugs((prev) => (prev.includes(slugToAdd) ? prev : [...prev, slugToAdd]))
  }

  const removeDestination = (slugToRemove) => {
    setDestinationSlugs((prev) => prev.filter((s) => s !== slugToRemove))
  }

  const updateUserInfo = (patch) => setUserInfo((prev) => ({ ...prev, ...patch }))
  const updatePassportDetails = (patch) => setPassportDetails((prev) => ({ ...prev, ...patch }))
  const updateTripDetails = (patch) => setTripDetails((prev) => ({ ...prev, ...patch }))
  const updateAdditionalInfo = (patch) => setAdditionalInfo((prev) => ({ ...prev, ...patch }))

  const updateCountryDetail = (countrySlug, field, value) => {
    setCountryDetails((prev) => ({
      ...prev,
      [countrySlug]: {
        ...(prev[countrySlug] ?? DEFAULT_COUNTRY_DETAIL),
        [field]: value,
      },
    }))
  }

  const resetRequest = () => {
    setDestinationSlugs([])
    setUserInfo(DEFAULT_USER_INFO)
    setPassportDetails(DEFAULT_PASSPORT_DETAILS)
    setTripDetails(DEFAULT_TRIP_DETAILS)
    setCountryDetails({})
    setAdditionalInfo(DEFAULT_ADDITIONAL_INFO)
    setPaid(false)
  }

  const selectedCountries = useMemo(
    () => destinationSlugs.map((s) => COUNTRIES.find((c) => c.slug === s)).filter(Boolean),
    [destinationSlugs],
  )

  const count = Math.max(selectedCountries.length, 1)
  const price = count * VISA_PRICING_PER_COUNTRY
  const isMultiCountry = selectedCountries.length > 1
  const country = selectedCountries[0] ?? (slug ? COUNTRIES.find((c) => c.slug === slug) : null) ?? COUNTRIES[0]

  const value = {
    destinationSlugs,
    setDestinationSlugs,
    selectedCountries,
    count,
    price,
    country,
    isMultiCountry,
    userInfo,
    updateUserInfo,
    passportDetails,
    updatePassportDetails,
    tripDetails,
    updateTripDetails,
    countryDetails,
    updateCountryDetail,
    additionalInfo,
    updateAdditionalInfo,
    toggleDestination,
    addDestination,
    removeDestination,
    paid,
    setPaid,
    resetRequest,
  }

  return (
    <VisaGuidanceFlowContext.Provider value={value}>
      {children}
    </VisaGuidanceFlowContext.Provider>
  )
}

export function useVisaGuidanceFlow() {
  const ctx = useContext(VisaGuidanceFlowContext)
  if (!ctx) {
    throw new Error('useVisaGuidanceFlow must be used within a VisaGuidanceFlowProvider')
  }
  return ctx
}
