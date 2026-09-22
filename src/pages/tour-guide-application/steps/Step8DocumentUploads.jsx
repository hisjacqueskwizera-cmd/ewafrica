import { useState } from 'react'
import { Field, FileUploadField, SectionCard } from '../../../components/tour-guide-application/fields.jsx'
import { StepNav } from '../../../components/tour-guide-application/StepChrome.jsx'
import { useGuideApplicationFlow } from '../../../context/GuideApplicationFlowContext.jsx'

const ALWAYS_REQUIRED = [
  { key: 'govId', label: 'Government issued photo identification' },
  { key: 'headshot', label: 'Current professional photograph or headshot' },
  { key: 'cv', label: 'CV or resume showing tourism experience' },
  { key: 'experienceEvidence', label: 'Evidence of previous guiding experience or customer reviews' },
]

export function Step8DocumentUploads({ onNext, onBack }) {
  const { data, updateDocument } = useGuideApplicationFlow()
  const [errors, setErrors] = useState({})

  const licenseRequired = data.licenseRequired === 'Yes'
  const hasQualifications = data.qualifications.trim().length > 0
  const associationMember = data.associationMember === 'Yes'
  const personallyTransports = data.personallyTransports === 'Yes'
  const firstAidCertified = data.firstAidCertified === 'Yes'

  const handleNext = () => {
    const next = {}
    ALWAYS_REQUIRED.forEach(({ key, label }) => {
      if (!data.documents[key]) next[key] = `${label} is required.`
    })
    if (licenseRequired && !data.documents.license) {
      next.license = 'Required — you indicated a license/registration/certification is required or held.'
    }
    if (hasQualifications && !data.documents.certificates) {
      next.certificates = 'Required — you listed tourism/hospitality qualifications or certifications.'
    }
    if (associationMember && !data.documents.associationProof) {
      next.associationProof = 'Required — you indicated association membership.'
    }
    if (personallyTransports) {
      if (!data.documents.driverLicenseDoc) next.driverLicenseDoc = 'Required — you personally transport customers.'
      if (!data.documents.vehicleRegistrationDoc) next.vehicleRegistrationDoc = 'Required — you personally transport customers.'
      if (!data.documents.vehicleInsuranceDoc) next.vehicleInsuranceDoc = 'Required — you personally transport customers.'
    }
    setErrors(next)
    if (Object.keys(next).length === 0) onNext()
  }

  const onFile = (key) => (file, error) => {
    updateDocument(key, file)
    setErrors((prev) => ({ ...prev, [key]: error || undefined }))
  }

  return (
    <>
      <p className="mb-6 rounded-xl bg-cream p-4 text-sm text-muted-foreground">
        Accept clear files in PDF, JPG, JPEG or PNG format. Maximum 10 MB per file.
      </p>

      <SectionCard title="Required for Every Applicant">
        {ALWAYS_REQUIRED.map(({ key, label }) => (
          <Field key={key} label={label} required error={errors[key]}>
            <FileUploadField value={data.documents[key]} onChange={onFile(key)} />
          </Field>
        ))}
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="Required Where Applicable or Claimed">
        <Field
          label="Tour guide license, registration or certification"
          required={licenseRequired}
          hint={licenseRequired ? undefined : 'Optional'}
          error={errors.license}
        >
          <FileUploadField value={data.documents.license} onChange={onFile('license')} />
        </Field>
        <Field
          label="Tourism, hospitality or guiding certificates"
          required={hasQualifications}
          hint={hasQualifications ? undefined : 'Optional'}
          error={errors.certificates}
        >
          <FileUploadField value={data.documents.certificates} onChange={onFile('certificates')} />
        </Field>
        <Field
          label="Proof of professional association membership"
          required={associationMember}
          hint={associationMember ? undefined : 'Optional'}
          error={errors.associationProof}
        >
          <FileUploadField value={data.documents.associationProof} onChange={onFile('associationProof')} />
        </Field>
        <Field label="Police clearance or certificate of good conduct" hint="Optional — where obtainable or required">
          <FileUploadField value={data.documents.policeClearance} onChange={onFile('policeClearance')} />
        </Field>
        <Field label="Supporting evidence for professional references" hint="Optional — if requested during review">
          <FileUploadField value={data.documents.referenceEvidence} onChange={onFile('referenceEvidence')} />
        </Field>
      </SectionCard>

      {personallyTransports && (
        <>
          <div className="h-6" />
          <SectionCard title="Required — You Personally Transport Customers">
            <Field label="Driver's license" required error={errors.driverLicenseDoc}>
              <FileUploadField value={data.documents.driverLicenseDoc} onChange={onFile('driverLicenseDoc')} />
            </Field>
            <Field label="Vehicle registration" required error={errors.vehicleRegistrationDoc}>
              <FileUploadField value={data.documents.vehicleRegistrationDoc} onChange={onFile('vehicleRegistrationDoc')} />
            </Field>
            <Field label="Current vehicle insurance" required error={errors.vehicleInsuranceDoc}>
              <FileUploadField value={data.documents.vehicleInsuranceDoc} onChange={onFile('vehicleInsuranceDoc')} />
            </Field>
            <Field label="Passenger or commercial transportation authorization" hint="Optional — where required">
              <FileUploadField value={data.documents.transportAuthDoc} onChange={onFile('transportAuthDoc')} />
            </Field>
          </SectionCard>
        </>
      )}

      <div className="h-6" />

      <SectionCard title="Optional Supporting Documents">
        <Field label="First Aid or CPR certificate" hint={firstAidCertified ? undefined : 'Optional'}>
          <FileUploadField value={data.documents.firstAidCertDoc} onChange={onFile('firstAidCertDoc')} />
        </Field>
        <Field label="Language certificates" hint="Optional">
          <FileUploadField value={data.documents.languageCerts} onChange={onFile('languageCerts')} />
        </Field>
        <Field label="Tourism training certificates" hint="Optional">
          <FileUploadField value={data.documents.trainingCerts} onChange={onFile('trainingCerts')} />
        </Field>
        <Field label="Professional awards" hint="Optional">
          <FileUploadField value={data.documents.awards} onChange={onFile('awards')} />
        </Field>
        <Field label="Additional customer testimonials" hint="Optional">
          <FileUploadField value={data.documents.testimonials} onChange={onFile('testimonials')} />
        </Field>
      </SectionCard>

      <StepNav onBack={onBack} onNext={handleNext} nextLabel="Continue to Review" />
    </>
  )
}
