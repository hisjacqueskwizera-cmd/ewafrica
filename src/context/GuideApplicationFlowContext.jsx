import { createContext, useContext, useState } from 'react'

// One flat form-data shape covering every question across all 9 steps of
// the Independent Tour Guide Application (see the build spec). Kept as a
// single object — like every other request flow in this app — so the
// review step and PDF export can read it in one place. `primaryCountry` is
// the only field a country page pre-fills (question 1.6); everything else
// starts blank regardless of which country's "Apply" button was used.
export function makeDefaultApplication(primaryCountry = '') {
  return {
    // Step 1 — Applicant information
    fullLegalName: '',
    businessName: '',
    isAdult: '',
    nationality: '',
    countryOfResidence: '',
    primaryCountry,
    primaryCity: '',
    otherCities: '',
    mobile: '',
    email: '',
    website: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    otherSocial: '',

    // Step 2 — Guiding experience
    yearsExperience: '',
    startYear: '',
    guidedInternational: '',
    internationalCustomers12mo: '',
    marketsServed: '',
    orgHistory: [{ organization: '', position: '', dates: '' }],

    // Step 3 — Specialties and availability
    services: [],
    otherService: '',
    topPlaces: ['', '', '', '', ''],
    differentiator: '',
    availability: [],
    bookingLeadTime: '',

    // Step 4 — Languages
    englishLevel: '',
    englishPrivateTour: '',
    frenchLevel: '',
    frenchPrivateTour: '',
    otherLanguages: [],

    // Step 5 — Licenses and qualifications
    legallyPermitted: '',
    licenseRequired: '',
    licenseType: '',
    licenseNumber: '',
    issuingAuthority: '',
    licenseExpiration: '',
    associationMember: '',
    associationName: '',
    membershipNumber: '',
    qualifications: '',
    hasInsurance: '',
    insuranceDescription: '',

    // Step 6 — Safety and transportation
    firstAidCertified: '',
    firstAidCertName: '',
    firstAidIssuer: '',
    firstAidExpiration: '',
    illnessResponse: '',
    lostItemResponse: '',
    personallyTransports: '',
    usesThirdPartyTransport: '',
    thirdPartyLicensed: '',
    driverLicenseNumber: '',
    driverLicenseExpiration: '',
    vehicleMakeModel: '',
    vehicleYear: '',
    vehicleRegistration: '',
    maxPassengers: '',
    ownsVehicle: '',
    vehicleInsured: '',
    transportAuthorized: '',

    // Step 7 — References and history
    ref1: { name: '', company: '', position: '', relationship: '', phone: '', email: '', knownDuration: '' },
    ref2: { name: '', company: '', position: '', relationship: '', phone: '', email: '', knownDuration: '' },
    authorizeReferenceContact: false,
    hasOnlineReviews: '',
    googleReviews: '',
    tripadvisorReviews: '',
    facebookReviews: '',
    otherReviews: '',
    everSuspended: '',
    suspensionExplain: '',
    everBanned: '',
    banExplain: '',

    // Step 8 — Document uploads (File objects, this session only — see
    // FileUploadField's note; nothing here survives a refresh)
    documents: {
      govId: null,
      headshot: null,
      cv: null,
      experienceEvidence: null,
      license: null,
      certificates: null,
      associationProof: null,
      policeClearance: null,
      referenceEvidence: null,
      driverLicenseDoc: null,
      vehicleRegistrationDoc: null,
      vehicleInsuranceDoc: null,
      transportAuthDoc: null,
      firstAidCertDoc: null,
      languageCerts: null,
      trainingCerts: null,
      awards: null,
      testimonials: null,
    },

    // Step 9 — Declaration, review and submit
    privacyConsent: false,
    declarationConsent: false,
    signatureName: '',
  }
}

const GuideApplicationFlowContext = createContext(null)

export function GuideApplicationFlowProvider({ children, primaryCountry }) {
  const [data, setData] = useState(() => makeDefaultApplication(primaryCountry))
  const [ineligible, setIneligible] = useState(false)
  const [submission, setSubmission] = useState(null) // { referenceNumber, submittedAt }

  const update = (patch) => setData((prev) => ({ ...prev, ...patch }))

  const updateDocument = (key, file) =>
    setData((prev) => ({ ...prev, documents: { ...prev.documents, [key]: file } }))

  const reset = () => {
    setData(makeDefaultApplication(primaryCountry))
    setIneligible(false)
    setSubmission(null)
  }

  const submit = () => {
    const referenceNumber = `EWAL-TG-${Date.now().toString(36).toUpperCase()}`
    const submittedAt = new Date().toISOString()
    const record = { referenceNumber, submittedAt, country: data.primaryCountry, answers: data }
    try {
      const existing = JSON.parse(localStorage.getItem('guideApplications') || '[]')
      // Store the record without the raw File objects — those can't be
      // serialized to localStorage and there is no backend to upload them
      // to; only their filenames are kept for reference.
      const { documents, ...answersWithoutFiles } = record.answers
      const documentNames = Object.fromEntries(
        Object.entries(documents).map(([k, v]) => [k, v?.name ?? null]),
      )
      existing.push({ ...record, answers: { ...answersWithoutFiles, documentNames } })
      localStorage.setItem('guideApplications', JSON.stringify(existing))
    } catch {
      // localStorage can fail (private browsing, quota) — submission still
      // proceeds in memory so the confirmation/PDF step still works.
    }
    setSubmission({ referenceNumber, submittedAt })
    return { referenceNumber, submittedAt }
  }

  const value = {
    data,
    update,
    updateDocument,
    reset,
    submit,
    submission,
    ineligible,
    setIneligible,
  }

  return (
    <GuideApplicationFlowContext.Provider value={value}>{children}</GuideApplicationFlowContext.Provider>
  )
}

export function useGuideApplicationFlow() {
  const ctx = useContext(GuideApplicationFlowContext)
  if (!ctx) {
    throw new Error('useGuideApplicationFlow must be used within a GuideApplicationFlowProvider')
  }
  return ctx
}
