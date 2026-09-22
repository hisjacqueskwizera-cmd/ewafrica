import { jsPDF } from 'jspdf'

const yn = (v) => (v ? v : 'Not provided')
const list = (arr) => (arr && arr.length ? arr.join(', ') : 'None provided')

/**
 * Builds the plain "question: answer" sections shown on the review page and
 * baked into the downloadable PDF — one source of truth for both, so the
 * PDF never drifts from what the applicant actually reviewed.
 */
export function buildApplicationSections(data) {
  return [
    {
      title: '1. Applicant Information',
      rows: [
        ['Full legal name', yn(data.fullLegalName)],
        ['Professional or business name', yn(data.businessName)],
        ['At least 18 years old', yn(data.isAdult)],
        ['Nationality', yn(data.nationality)],
        ['Country of residence', yn(data.countryOfResidence)],
        ['Primary guiding country', yn(data.primaryCountry)],
        ['City or primary guiding location', yn(data.primaryCity)],
        ['Additional cities or regions', yn(data.otherCities)],
        ['Mobile / WhatsApp', yn(data.mobile)],
        ['Email', yn(data.email)],
        ['Website', yn(data.website)],
        ['Facebook', yn(data.facebook)],
        ['Instagram', yn(data.instagram)],
        ['LinkedIn', yn(data.linkedin)],
        ['Other professional social media', yn(data.otherSocial)],
      ],
    },
    {
      title: '2. Guiding Experience',
      rows: [
        ['Years of professional guiding experience', yn(data.yearsExperience)],
        ['Year began professional guiding', yn(data.startYear)],
        ['Guided international travelers', yn(data.guidedInternational)],
        ['International customers, past 12 months', yn(data.internationalCustomers12mo)],
        ['Nationalities / markets most commonly served', yn(data.marketsServed)],
        ...data.orgHistory
          .filter((e) => e.organization || e.position || e.dates)
          .map((e, i) => [
            `Organization ${i + 1}`,
            `${e.organization || '—'} — ${e.position || '—'} (${e.dates || '—'})`,
          ]),
      ],
    },
    {
      title: '3. Specialties and Availability',
      rows: [
        ['Guiding services provided', list(data.services)],
        ['Other guiding service', yn(data.otherService)],
        ['Places/attractions/experiences known well', list(data.topPlaces.filter(Boolean))],
        ['What makes your service different', yn(data.differentiator)],
        ['Typical availability', list(data.availability)],
        ['Booking lead time', yn(data.bookingLeadTime)],
      ],
    },
    {
      title: '4. Languages',
      rows: [
        ['Spoken English', yn(data.englishLevel)],
        ['Can conduct a full private tour in English', yn(data.englishPrivateTour)],
        ['Spoken French', yn(data.frenchLevel)],
        ['Can conduct a full private tour in French', yn(data.frenchPrivateTour)],
        ...data.otherLanguages
          .filter((l) => l.language)
          .map((l) => [`Other language`, `${l.language} — ${l.proficiency || 'Not rated'}`]),
      ],
    },
    {
      title: '5. Licenses and Qualifications',
      rows: [
        ['Legally permitted to guide for pay', yn(data.legallyPermitted)],
        ['Licensing/registration/certification required', yn(data.licenseRequired)],
        ['License/registration/certification type', yn(data.licenseType)],
        ['License/registration/certification number', yn(data.licenseNumber)],
        ['Issuing authority', yn(data.issuingAuthority)],
        ['Expiration date', yn(data.licenseExpiration)],
        ['Member of a professional tour guide/tourism association', yn(data.associationMember)],
        ['Association name', yn(data.associationName)],
        ['Membership number', yn(data.membershipNumber)],
        ['Relevant qualifications/certifications', yn(data.qualifications)],
        ['Maintains professional liability/tour guide insurance', yn(data.hasInsurance)],
        ['Insurance description', yn(data.insuranceDescription)],
      ],
    },
    {
      title: '6. Safety and Transportation',
      rows: [
        ['Holds First Aid/CPR certification', yn(data.firstAidCertified)],
        ['First Aid/CPR certification', yn(data.firstAidCertName)],
        ['Issuing organization', yn(data.firstAidIssuer)],
        ['Certification expiration date', yn(data.firstAidExpiration)],
        ['Response — customer seriously ill', yn(data.illnessResponse)],
        ['Response — passport/phone lost or stolen', yn(data.lostItemResponse)],
        ['Personally transports customers', yn(data.personallyTransports)],
        ['Uses third party drivers/vehicles', yn(data.usesThirdPartyTransport)],
        ['Third party providers licensed/authorized', yn(data.thirdPartyLicensed)],
        ["Driver's license number", yn(data.driverLicenseNumber)],
        ["Driver's license expiration", yn(data.driverLicenseExpiration)],
        ['Vehicle make and model', yn(data.vehicleMakeModel)],
        ['Vehicle year', yn(data.vehicleYear)],
        ['Vehicle registration number', yn(data.vehicleRegistration)],
        ['Maximum passenger capacity', yn(data.maxPassengers)],
        ['Owns the vehicle', yn(data.ownsVehicle)],
        ['Vehicle currently insured', yn(data.vehicleInsured)],
        ['Authorized to transport paying passengers', yn(data.transportAuthorized)],
      ],
    },
    {
      title: '7. References and History',
      rows: [
        ['Reference 1', `${data.ref1.name} — ${data.ref1.company}, ${data.ref1.position}`],
        ['Reference 1 contact', `${data.ref1.phone} / ${data.ref1.email}`],
        ['Reference 1 relationship / known for', `${data.ref1.relationship} — ${data.ref1.knownDuration}`],
        ['Reference 2', `${data.ref2.name} — ${data.ref2.company}, ${data.ref2.position}`],
        ['Reference 2 contact', `${data.ref2.phone} / ${data.ref2.email}`],
        ['Reference 2 relationship / known for', `${data.ref2.relationship} — ${data.ref2.knownDuration}`],
        ['Authorized to contact references', data.authorizeReferenceContact ? 'I agree' : 'Not agreed'],
        ['Online reviews available', yn(data.hasOnlineReviews)],
        ['Google reviews', yn(data.googleReviews)],
        ['Tripadvisor reviews', yn(data.tripadvisorReviews)],
        ['Facebook reviews', yn(data.facebookReviews)],
        ['Other reviews', yn(data.otherReviews)],
        ['Ever suspended / disciplined / revoked', yn(data.everSuspended)],
        ['Explanation', yn(data.suspensionExplain)],
        ['Ever removed / banned from a platform or association', yn(data.everBanned)],
        ['Explanation', yn(data.banExplain)],
      ],
    },
    {
      title: '8. Document Uploads',
      rows: Object.entries(data.documents ?? {}).map(([key, file]) => [
        key,
        file ? `Attached — ${file.name}` : 'Not attached',
      ]),
    },
    {
      title: '9. Declaration',
      rows: [
        ['Applicant Privacy Notice acknowledged', data.privacyConsent ? 'I agree' : 'Not agreed'],
        ['Applicant Declaration agreed', data.declarationConsent ? 'I agree' : 'Not agreed'],
        ['Signature (typed full name)', yn(data.signatureName)],
      ],
    },
  ]
}

/**
 * Renders the submitted application to a PDF and triggers a browser
 * download — client-side only, since this project has no backend to
 * generate or store the file server-side.
 */
export function generateApplicationPdf({ data, referenceNumber, submittedAt, countryLabel }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 48
  const maxWidth = pageWidth - margin * 2
  let y = margin

  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage()
      y = margin
    }
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('East-West Africa Link', margin, y)
  y += 20
  doc.setFontSize(13)
  doc.text('Independent Tour Guide Application', margin, y)
  y += 22

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Country: ${countryLabel}`, margin, y)
  y += 14
  doc.text(`Reference number: ${referenceNumber}`, margin, y)
  y += 14
  doc.text(`Submitted: ${new Date(submittedAt).toLocaleString()}`, margin, y)
  y += 24

  const sections = buildApplicationSections(data)

  sections.forEach((section) => {
    ensureSpace(28)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text(section.title, margin, y)
    y += 16
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)

    section.rows.forEach(([label, value]) => {
      const text = `${label}: ${String(value)}`
      const lines = doc.splitTextToSize(text, maxWidth)
      ensureSpace(lines.length * 12 + 4)
      doc.text(lines, margin, y)
      y += lines.length * 12 + 4
    })
    y += 10
  })

  doc.save(`East-West-Africa-Link-Tour-Guide-Application-${referenceNumber}.pdf`)
}
