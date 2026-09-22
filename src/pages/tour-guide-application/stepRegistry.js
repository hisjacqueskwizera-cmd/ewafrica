import { Step1ApplicantInfo } from './steps/Step1ApplicantInfo.jsx'
import { Step2GuidingExperience } from './steps/Step2GuidingExperience.jsx'
import { Step3SpecialtiesAvailability } from './steps/Step3SpecialtiesAvailability.jsx'
import { Step4Languages } from './steps/Step4Languages.jsx'
import { Step5LicensesQualifications } from './steps/Step5LicensesQualifications.jsx'
import { Step6SafetyTransportation } from './steps/Step6SafetyTransportation.jsx'
import { Step7ReferencesHistory } from './steps/Step7ReferencesHistory.jsx'
import { Step8DocumentUploads } from './steps/Step8DocumentUploads.jsx'

// Steps 1–8 of the 9-step application (step 9, Declaration/Review/Submit,
// is its own dedicated ReviewAnswers.jsx page, not part of this registry).
export const APPLICATION_STEPS = [
  {
    number: 1,
    title: 'Applicant Information',
    purpose: 'Identity, location, and contact information.',
    Component: Step1ApplicantInfo,
  },
  {
    number: 2,
    title: 'Guiding Experience',
    purpose: 'Minimum experience and professional background.',
    Component: Step2GuidingExperience,
  },
  {
    number: 3,
    title: 'Specialties and Availability',
    purpose: 'Services, destinations, and working availability.',
    Component: Step3SpecialtiesAvailability,
  },
  {
    number: 4,
    title: 'Languages',
    purpose: 'English, French, and other language ability.',
    Component: Step4Languages,
  },
  {
    number: 5,
    title: 'Licenses and Qualifications',
    purpose: 'Legal eligibility, credentials, association, and insurance.',
    Component: Step5LicensesQualifications,
  },
  {
    number: 6,
    title: 'Safety and Transportation',
    purpose: 'Emergency readiness and transport compliance.',
    Component: Step6SafetyTransportation,
  },
  {
    number: 7,
    title: 'References and History',
    purpose: 'References, reviews, and professional conduct.',
    Component: Step7ReferencesHistory,
  },
  {
    number: 8,
    title: 'Document Uploads',
    purpose: 'Required and conditional supporting documents.',
    Component: Step8DocumentUploads,
  },
]

export const TOTAL_STEPS = 9 // 8 form steps + the review/submit step
