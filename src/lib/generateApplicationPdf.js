import { jsPDF } from 'jspdf'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const yn = (v) => (v ? v : 'Not provided')
const list = (arr) => (arr && arr.length ? arr.join(', ') : 'None provided')

const DOCUMENT_LABELS = {
  govId: 'Government issued photo identification',
  headshot: 'Current professional photograph or headshot',
  cv: 'CV or resume showing tourism experience',
  experienceEvidence: 'Evidence of previous guiding experience or customer reviews',
  license: 'Tour guide license, registration or certification',
  certificates: 'Tourism, hospitality or guiding certificates',
  associationProof: 'Proof of professional association membership',
  policeClearance: 'Police clearance or certificate of good conduct',
  referenceEvidence: 'Supporting evidence for professional references',
  driverLicenseDoc: "Driver's license",
  vehicleRegistrationDoc: 'Vehicle registration',
  vehicleInsuranceDoc: 'Current vehicle insurance',
  transportAuthDoc: 'Passenger or commercial transportation authorization',
  firstAidCertDoc: 'First Aid or CPR certificate',
  languageCerts: 'Language certificates',
  trainingCerts: 'Tourism training certificates',
  awards: 'Professional awards',
  testimonials: 'Additional customer testimonials',
}

/**
 * Builds the plain "question: answer" sections shown on the review page —
 * grouped by wizard step (1–8), matching the step numbering the applicant
 * actually saw and the "Edit" links on the review page. Kept separate from
 * `buildPdfParts` below, which regroups the same data into the reference
 * "Part 1–11" document layout for the downloadable PDF.
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
          .map((l, i) => [`Other language ${i + 1}`, `${l.language} — ${l.proficiency || 'Not rated'}`]),
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
        ['Suspension / discipline / revocation explanation', yn(data.suspensionExplain)],
        ['Ever removed / banned from a platform or association', yn(data.everBanned)],
        ['Removal / ban explanation', yn(data.banExplain)],
      ],
    },
    {
      title: '8. Document Uploads',
      rows: Object.entries(DOCUMENT_LABELS).map(([key, label]) => [
        label,
        data.documents?.[key] ? `Attached — ${data.documents[key].name}` : 'Not attached',
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
 * Regroups the same application data into the East-West Africa Link
 * "Independent Tour Guide Application & Vetting Form" reference document's
 * own 11-part structure/wording, for the downloadable PDF specifically —
 * the on-screen review page keeps its own step-numbered grouping above.
 */
function buildPdfParts(data) {
  return [
    {
      title: 'PART 1 — APPLICANT INFORMATION',
      rows: [
        ['Full Legal Name', yn(data.fullLegalName)],
        ['Professional/Business Name', yn(data.businessName)],
        ['At least 18 years old', yn(data.isAdult)],
        ['Nationality', yn(data.nationality)],
        ['Country of Residence', yn(data.countryOfResidence)],
        ['Primary Guiding Country', yn(data.primaryCountry)],
        ['City / Primary Guiding Location', yn(data.primaryCity)],
        ['Additional Cities/Regions Where You Guide', yn(data.otherCities)],
        ['Mobile/WhatsApp Number', yn(data.mobile)],
        ['Email Address', yn(data.email)],
        ['Website', yn(data.website)],
        ['Facebook', yn(data.facebook)],
        ['Instagram', yn(data.instagram)],
        ['LinkedIn', yn(data.linkedin)],
        ['Other', yn(data.otherSocial)],
      ],
    },
    {
      title: 'PART 2 — GUIDING EXPERIENCE',
      rows: [
        ['Years worked professionally as a tour guide', yn(data.yearsExperience)],
        ['Year began professional guiding', yn(data.startYear)],
        ['Guided international travelers', yn(data.guidedInternational)],
        ['International customers, past 12 months', yn(data.internationalCustomers12mo)],
        ['Nationalities/markets most commonly served', yn(data.marketsServed)],
        ...data.orgHistory
          .filter((e) => e.organization || e.position || e.dates)
          .flatMap((e, i) => [
            [`Organization ${i + 1}`, yn(e.organization)],
            ['Position/Relationship', yn(e.position)],
            ['Dates', yn(e.dates)],
          ]),
      ],
    },
    {
      title: 'PART 3 — TOUR SPECIALIZATIONS',
      rows: [
        ['Services personally provided', list(data.services)],
        ['Other', yn(data.otherService)],
        ['Destination expertise (five places known well)', list(data.topPlaces.filter(Boolean))],
        ['What makes your service different', yn(data.differentiator)],
        ['Typical guiding availability', list(data.availability)],
        ['Booking lead time', yn(data.bookingLeadTime)],
      ],
    },
    {
      title: 'PART 4 — LANGUAGES',
      rows: [
        ['Spoken English', yn(data.englishLevel)],
        ['Can conduct a full private tour in English', yn(data.englishPrivateTour)],
        ['Spoken French', yn(data.frenchLevel)],
        ['Can conduct a full private tour in French', yn(data.frenchPrivateTour)],
        ...data.otherLanguages
          .filter((l) => l.language)
          .map((l, i) => [`Other Language ${i + 1}`, `${l.language} — ${l.proficiency || 'Not rated'}`]),
      ],
    },
    {
      title: 'PART 5 — PROFESSIONAL LICENSES & QUALIFICATIONS',
      rows: [
        ['Legally permitted to provide paid tour-guiding services', yn(data.legallyPermitted)],
        ['Tour guides required to be licensed/registered/certified', yn(data.licenseRequired)],
        ['License/Registration Type', yn(data.licenseType)],
        ['License/Registration Number', yn(data.licenseNumber)],
        ['Issuing Authority', yn(data.issuingAuthority)],
        ['Expiration Date', yn(data.licenseExpiration)],
        ['Member of a professional tour-guide/tourism association', yn(data.associationMember)],
        ['Association', yn(data.associationName)],
        ['Membership Number', yn(data.membershipNumber)],
        ['Relevant tourism/hospitality/guiding qualifications', yn(data.qualifications)],
        ['Maintains professional/public liability/tour-guide insurance', yn(data.hasInsurance)],
        ['Insurance description', yn(data.insuranceDescription)],
      ],
    },
    {
      title: 'PART 6 — SAFETY & EMERGENCY PREPAREDNESS',
      rows: [
        ['Holds First Aid or CPR certification', yn(data.firstAidCertified)],
        ['Certification', yn(data.firstAidCertName)],
        ['Issuing Organization', yn(data.firstAidIssuer)],
        ['Expiration Date', yn(data.firstAidExpiration)],
        ['Emergency Scenario 1 — customer seriously ill', yn(data.illnessResponse)],
        ['Emergency Scenario 2 — passport/telephone lost or stolen', yn(data.lostItemResponse)],
      ],
    },
    {
      title: 'PART 7 — TRANSPORTATION',
      rows: [
        ['Personally transports customers', yn(data.personallyTransports)],
        ['Uses third-party drivers or vehicles', yn(data.usesThirdPartyTransport)],
        ['Works with licensed/authorized third-party providers', yn(data.thirdPartyLicensed)],
        ["Driver's License Number", yn(data.driverLicenseNumber)],
        ['License Expiration', yn(data.driverLicenseExpiration)],
        ['Vehicle Make/Model', yn(data.vehicleMakeModel)],
        ['Vehicle Year', yn(data.vehicleYear)],
        ['Vehicle Registration Number', yn(data.vehicleRegistration)],
        ['Maximum Passenger Capacity', yn(data.maxPassengers)],
        ['Owns the vehicle', yn(data.ownsVehicle)],
        ['Vehicle has current insurance', yn(data.vehicleInsured)],
        ['Legally authorized to transport paying passengers', yn(data.transportAuthorized)],
      ],
    },
    {
      title: 'PART 8 — PROFESSIONAL REFERENCES',
      rows: [
        ['Reference 1 — Name', yn(data.ref1.name)],
        ['Reference 1 — Company/Organization', yn(data.ref1.company)],
        ['Reference 1 — Position', yn(data.ref1.position)],
        ['Reference 1 — Relationship to Applicant', yn(data.ref1.relationship)],
        ['Reference 1 — Telephone/WhatsApp', yn(data.ref1.phone)],
        ['Reference 1 — Email', yn(data.ref1.email)],
        ['Reference 1 — Known professionally for', yn(data.ref1.knownDuration)],
        ['Reference 2 — Name', yn(data.ref2.name)],
        ['Reference 2 — Company/Organization', yn(data.ref2.company)],
        ['Reference 2 — Position', yn(data.ref2.position)],
        ['Reference 2 — Relationship to Applicant', yn(data.ref2.relationship)],
        ['Reference 2 — Telephone/WhatsApp', yn(data.ref2.phone)],
        ['Reference 2 — Email', yn(data.ref2.email)],
        ['Reference 2 — Known professionally for', yn(data.ref2.knownDuration)],
        [
          'Applicant Authorization to contact references',
          data.authorizeReferenceContact ? '[X] I Agree' : '[ ] Not agreed',
        ],
      ],
    },
    {
      title: 'PART 9 — CUSTOMER REVIEWS & PROFESSIONAL HISTORY',
      rows: [
        ['Previous customer reviews available online', yn(data.hasOnlineReviews)],
        ['Google', yn(data.googleReviews)],
        ['Tripadvisor', yn(data.tripadvisorReviews)],
        ['Facebook', yn(data.facebookReviews)],
        ['Other', yn(data.otherReviews)],
        ['Ever suspended, disciplined, or had a license/registration revoked', yn(data.everSuspended)],
        ['If yes, explanation', yn(data.suspensionExplain)],
        [
          'Ever removed/permanently banned from a platform, association or similar organization',
          yn(data.everBanned),
        ],
        ['If yes, explanation', yn(data.banExplain)],
      ],
    },
    {
      title: 'PART 10 — REQUIRED DOCUMENT UPLOADS',
      rows: [
        ...Object.entries(DOCUMENT_LABELS).map(([key, label]) => [
          label,
          data.documents?.[key] ? `[X] Attached — ${data.documents[key].name}` : '[ ] Not attached',
        ]),
        [
          'Applicant Privacy Notice',
          data.privacyConsent
            ? '[X] I have read and understand the Applicant Privacy Notice.'
            : '[ ] Not acknowledged',
        ],
      ],
    },
    {
      title: 'PART 11 — APPLICANT DECLARATION',
      rows: [
        [
          'Declaration',
          data.declarationConsent
            ? '[X] I certify the information provided is true, accurate and complete, and agree to the Applicant Declaration in full.'
            : '[ ] Not agreed',
        ],
        ['Applicant Name', yn(data.signatureName)],
        ['Signature', yn(data.signatureName)],
        ['Date', new Date().toLocaleDateString()],
      ],
    },
  ]
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const COLORS = {
  cocoa: [88, 36, 3],
  copper: [208, 121, 54],
  forest: [31, 61, 43],
  cream: [252, 246, 236],
  sand: [239, 225, 196],
  muted: [91, 76, 60],
  border: [225, 213, 190],
}

// pdf-lib wants 0–1 floats, not the 0–255 triples jsPDF uses above.
const rgb01 = ([r, g, b]) => rgb(r / 255, g / 255, b / 255)

function fileKind(file) {
  const type = (file.type || '').toLowerCase()
  const name = (file.name || '').toLowerCase()
  if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf'
  if (type === 'image/png' || name.endsWith('.png')) return 'png'
  if (type === 'image/jpeg' || type === 'image/jpg' || name.endsWith('.jpg') || name.endsWith('.jpeg')) {
    return 'jpg'
  }
  return 'unknown'
}

function triggerBlobDownload(bytes, filename) {
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

const A4 = [595.28, 841.89]
const PAGE_MARGIN = 48

/**
 * Renders the submitted application to a PDF matching the branded
 * "Independent Tour Guide Application & Vetting Form" reference layout
 * (logo header, PART-numbered sections with tinted headers, footer
 * tagline on every page) and triggers a browser download — client-side
 * only, since this project has no backend to generate or store the file
 * server-side.
 */
export async function generateApplicationPdf({ data, referenceNumber, submittedAt, countryLabel }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 48
  const maxWidth = pageWidth - margin * 2
  const footerY = pageHeight - 34

  let logo = null
  try {
    logo = await loadImage('/Logos/East-West.png')
  } catch {
    logo = null // Missing/blocked image shouldn't stop the download.
  }
  const logoAspect = logo ? logo.naturalHeight / logo.naturalWidth : 0.64

  let y = margin

  const drawMasthead = () => {
    const logoW = 150
    const logoH = logoW * logoAspect
    if (logo) doc.addImage(logo, 'PNG', margin, y, logoW, logoH)
    doc.setTextColor(...COLORS.cocoa)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(17)
    const title = doc.splitTextToSize('Independent Tour Guide Application & Vetting Form', maxWidth)
    doc.text(title, margin, y + logoH + 22)
    let ty = y + logoH + 22 + title.length * 20
    doc.setTextColor(...COLORS.copper)
    doc.setFontSize(10.5)
    doc.text('PRIVATE & CONFIDENTIAL', margin, ty)
    ty += 14
    doc.setDrawColor(...COLORS.copper)
    doc.setLineWidth(1.5)
    doc.line(margin, ty, pageWidth - margin, ty)
    y = ty + 20

    doc.setDrawColor(...COLORS.border)
    doc.setFillColor(...COLORS.sand)
    const introLines = doc.setFont('helvetica', 'normal').setFontSize(9.5).splitTextToSize(
      'Thank you for your interest in joining the East-West Africa Link Independent Tour Guide Network. East-West Africa Link connects travelers with experienced independent local tour guides. Acceptance into our guide network does not constitute employment by East-West Africa Link and does not guarantee customer referrals.\n\nGuides accepted into the network remain independent professionals and are responsible for their own services, availability, pricing, itineraries, licensing, taxes, insurance, and compliance with applicable local laws.',
      maxWidth - 24,
    )
    const boxH = introLines.length * 12 + 24
    doc.roundedRect(margin, y, maxWidth, boxH, 4, 4, 'FD')
    doc.setTextColor(...COLORS.cocoa)
    doc.text(introLines, margin + 12, y + 18)
    y += boxH + 14

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9.5)
    doc.setTextColor(...COLORS.cocoa)
    doc.text(
      'East-West Africa Link generally requires a minimum of three years of professional guiding experience.',
      margin,
      y,
    )
    y += 22

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...COLORS.muted)
    doc.text(`Country: ${countryLabel}    Reference: ${referenceNumber}`, margin, y)
    y += 12
    doc.text(`Submitted: ${new Date(submittedAt).toLocaleString()}`, margin, y)
    y += 20
  }

  const drawContinuationHeader = () => {
    const logoW = 46
    const logoH = logoW * logoAspect
    if (logo) doc.addImage(logo, 'PNG', margin, margin - 10, logoW, logoH)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...COLORS.cocoa)
    doc.text('Independent Tour Guide Application & Vetting Form', pageWidth - margin, margin, {
      align: 'right',
    })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...COLORS.copper)
    doc.text('PRIVATE & CONFIDENTIAL', pageWidth - margin, margin + 12, { align: 'right' })
    doc.setDrawColor(...COLORS.border)
    doc.setLineWidth(0.75)
    doc.line(margin, margin + 22, pageWidth - margin, margin + 22)
    y = margin + 38
  }

  const drawFooter = () => {
    doc.setDrawColor(...COLORS.border)
    doc.setLineWidth(0.75)
    doc.line(margin, footerY, pageWidth - margin, footerY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...COLORS.muted)
    doc.text('TRAVEL  •  CULTURE  •  OPPORTUNITY', margin, footerY + 14)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(...COLORS.copper)
    doc.text('A More Connected Africa', pageWidth - margin, footerY + 14, { align: 'right' })
  }

  const ensureSpace = (needed) => {
    if (y + needed > footerY - 10) {
      doc.addPage()
      drawContinuationHeader()
    }
  }

  drawMasthead()

  const parts = buildPdfParts(data)

  parts.forEach((part) => {
    ensureSpace(28)
    doc.setFillColor(...COLORS.sand)
    doc.rect(margin, y, maxWidth, 20, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...COLORS.cocoa)
    doc.text(part.title, margin + 8, y + 14)
    y += 30

    doc.setFontSize(9.5)
    part.rows.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold')
      const labelLines = doc.splitTextToSize(`${label}:`, maxWidth)
      ensureSpace(labelLines.length * 12 + 2)
      doc.setTextColor(...COLORS.cocoa)
      doc.text(labelLines, margin, y)
      y += labelLines.length * 12

      doc.setFont('helvetica', 'normal')
      const valueLines = doc.splitTextToSize(String(value), maxWidth)
      ensureSpace(valueLines.length * 12 + 6)
      doc.setTextColor(...COLORS.muted)
      doc.text(valueLines, margin, y)
      y += valueLines.length * 12 + 8
    })
    y += 8
  })

  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    drawFooter()
  }

  // The answers document above is everything jsPDF can do on its own. The
  // uploaded documents themselves (Part 10) still need to physically be in
  // the file — jsPDF can only draw fresh pages, it can't import an existing
  // PDF's pages, so pdf-lib takes over from here: load jsPDF's output as
  // the base document, then for every attached file either draw it onto a
  // new branded page (images) or copy its actual pages in after a branded
  // divider page (PDFs).
  const merged = await PDFDocument.load(doc.output('arraybuffer'))
  await appendAttachments(merged, data.documents)
  triggerBlobDownload(
    await merged.save(),
    `East-West-Africa-Link-Tour-Guide-Application-${referenceNumber}.pdf`,
  )
}

/**
 * Draws the shared small branded header (logo + title + PRIVATE &
 * CONFIDENTIAL) and footer tagline pdf-lib side, matching the jsPDF
 * continuation-page header/footer above, onto one page of the merged
 * document — used for every attachment/divider page added below.
 */
function drawAttachmentChrome(page, { logoImage, fontBold, fontRegular, fontItalic }) {
  const { width, height } = page.getSize()
  const logoW = 40
  const logoH = logoImage ? logoW * (logoImage.height / logoImage.width) : 0
  if (logoImage) {
    page.drawImage(logoImage, {
      x: PAGE_MARGIN,
      y: height - PAGE_MARGIN - logoH + 10,
      width: logoW,
      height: logoH,
    })
  }
  page.drawText('Independent Tour Guide Application & Vetting Form', {
    x: PAGE_MARGIN + logoW + 12,
    y: height - PAGE_MARGIN - 2,
    size: 9.5,
    font: fontBold,
    color: rgb01(COLORS.cocoa),
  })
  page.drawText('PRIVATE & CONFIDENTIAL', {
    x: PAGE_MARGIN + logoW + 12,
    y: height - PAGE_MARGIN - 14,
    size: 8.5,
    font: fontRegular,
    color: rgb01(COLORS.copper),
  })
  page.drawLine({
    start: { x: PAGE_MARGIN, y: height - PAGE_MARGIN - 22 },
    end: { x: width - PAGE_MARGIN, y: height - PAGE_MARGIN - 22 },
    thickness: 0.75,
    color: rgb01(COLORS.border),
  })

  const footerY = PAGE_MARGIN - 6
  page.drawLine({
    start: { x: PAGE_MARGIN, y: footerY },
    end: { x: width - PAGE_MARGIN, y: footerY },
    thickness: 0.75,
    color: rgb01(COLORS.border),
  })
  page.drawText('TRAVEL  •  CULTURE  •  OPPORTUNITY', {
    x: PAGE_MARGIN,
    y: footerY - 14,
    size: 7.5,
    font: fontRegular,
    color: rgb01(COLORS.muted),
  })
  const tagline = 'A More Connected Africa'
  page.drawText(tagline, {
    x: width - PAGE_MARGIN - fontItalic.widthOfTextAtSize(tagline, 8),
    y: footerY - 14,
    size: 8,
    font: fontItalic,
    color: rgb01(COLORS.copper),
  })
}

/**
 * Appends every uploaded document — the actual file content, not just its
 * filename — to `merged`, in the same order Part 10 lists them. Images get
 * one labeled page of their own; PDFs get a short divider page followed by
 * every page of the applicant's actual uploaded PDF, copied in as-is.
 */
async function appendAttachments(merged, documents) {
  const entries = Object.entries(DOCUMENT_LABELS).filter(([key]) => documents?.[key])
  if (entries.length === 0) return

  const [fontRegular, fontBold, fontItalic] = await Promise.all([
    merged.embedFont(StandardFonts.Helvetica),
    merged.embedFont(StandardFonts.HelveticaBold),
    merged.embedFont(StandardFonts.HelveticaOblique),
  ])

  let logoImage = null
  try {
    const logoBytes = await fetch('/Logos/East-West.png').then((res) => res.arrayBuffer())
    logoImage = await merged.embedPng(logoBytes)
  } catch {
    logoImage = null // Branding is best-effort — a missing/blocked logo shouldn't stop attachments.
  }

  const chromeFonts = { logoImage, fontRegular, fontBold, fontItalic }

  for (const [key, label] of entries) {
    const file = documents[key]
    const kind = fileKind(file)
    let bytes
    try {
      bytes = await file.arrayBuffer()
    } catch {
      continue // Unreadable file (rare) — skip rather than fail the whole download.
    }

    if (kind === 'png' || kind === 'jpg') {
      const page = merged.addPage(A4)
      drawAttachmentChrome(page, chromeFonts)
      const { width, height } = page.getSize()
      page.drawText(`Attachment — ${label}`, {
        x: PAGE_MARGIN,
        y: height - PAGE_MARGIN - 60,
        size: 13,
        font: fontBold,
        color: rgb01(COLORS.cocoa),
      })
      page.drawText(file.name, {
        x: PAGE_MARGIN,
        y: height - PAGE_MARGIN - 76,
        size: 9,
        font: fontRegular,
        color: rgb01(COLORS.muted),
      })

      try {
        const image = kind === 'png' ? await merged.embedPng(bytes) : await merged.embedJpg(bytes)
        const availW = width - PAGE_MARGIN * 2
        const availH = height - PAGE_MARGIN - 100 - PAGE_MARGIN
        const scale = Math.min(availW / image.width, availH / image.height, 1)
        const w = image.width * scale
        const h = image.height * scale
        page.drawImage(image, {
          x: PAGE_MARGIN + (availW - w) / 2,
          y: PAGE_MARGIN + (availH - h) / 2,
          width: w,
          height: h,
        })
      } catch {
        page.drawText('This image could not be read and is not shown here.', {
          x: PAGE_MARGIN,
          y: height - PAGE_MARGIN - 110,
          size: 9.5,
          font: fontRegular,
          color: rgb01(COLORS.muted),
        })
      }
      continue
    }

    if (kind === 'pdf') {
      const divider = merged.addPage(A4)
      drawAttachmentChrome(divider, chromeFonts)
      const { width, height } = divider.getSize()
      divider.drawText(`Attachment — ${label}`, {
        x: PAGE_MARGIN,
        y: height - PAGE_MARGIN - 60,
        size: 13,
        font: fontBold,
        color: rgb01(COLORS.cocoa),
      })
      divider.drawText(file.name, {
        x: PAGE_MARGIN,
        y: height - PAGE_MARGIN - 76,
        size: 9,
        font: fontRegular,
        color: rgb01(COLORS.muted),
      })

      try {
        const sourceDoc = await PDFDocument.load(bytes)
        const copiedPages = await merged.copyPages(sourceDoc, sourceDoc.getPageIndices())
        copiedPages.forEach((page) => merged.addPage(page))
        divider.drawText(
          `The following ${copiedPages.length} page${copiedPages.length === 1 ? '' : 's'} are the applicant's uploaded document.`,
          {
            x: PAGE_MARGIN,
            y: height - PAGE_MARGIN - 100,
            size: 9.5,
            font: fontRegular,
            color: rgb01(COLORS.muted),
          },
        )
      } catch {
        divider.drawText('This PDF could not be read and is not included here.', {
          x: PAGE_MARGIN,
          y: height - PAGE_MARGIN - 100,
          size: 9.5,
          font: fontRegular,
          color: rgb01(COLORS.muted),
        })
      }
      continue
    }

    // Unsupported file type slipped through (shouldn't happen — the upload
    // field only accepts pdf/jpg/jpeg/png) — note it rather than silently
    // dropping it.
    const page = merged.addPage(A4)
    drawAttachmentChrome(page, chromeFonts)
    const { width, height } = page.getSize()
    page.drawText(`Attachment — ${label}`, {
      x: PAGE_MARGIN,
      y: height - PAGE_MARGIN - 60,
      size: 13,
      font: fontBold,
      color: rgb01(COLORS.cocoa),
    })
    page.drawText(`${file.name} — unsupported file type, not shown here.`, {
      x: PAGE_MARGIN,
      y: height - PAGE_MARGIN - 76,
      size: 9.5,
      font: fontRegular,
      color: rgb01(COLORS.muted),
    })
  }
}
