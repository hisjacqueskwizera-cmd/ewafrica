import { useState } from 'react'
import {
  Field,
  RadioGroup,
  SectionCard,
  TextArea,
  TextInput,
} from '../../../components/tour-guide-application/fields.jsx'
import { StepNav } from '../../../components/tour-guide-application/StepChrome.jsx'
import { useGuideApplicationFlow } from '../../../context/GuideApplicationFlowContext.jsx'

export function Step5LicensesQualifications({ onNext, onBack }) {
  const { data, update } = useGuideApplicationFlow()
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    const next = {}
    if (!data.legallyPermitted) next.legallyPermitted = 'Please answer this question.'
    if (!data.licenseRequired) next.licenseRequired = 'Please answer this question.'
    if (data.licenseRequired === 'Yes') {
      if (!data.licenseType.trim()) next.licenseType = 'Required when licensing is required.'
      if (!data.licenseNumber.trim()) next.licenseNumber = 'Required when licensing is required.'
      if (!data.issuingAuthority.trim()) next.issuingAuthority = 'Required when licensing is required.'
    } else if (!data.licenseType.trim()) {
      // Not required — default to "Not applicable" if left blank.
      update({ licenseType: 'Not applicable' })
    }
    if (!data.associationMember) next.associationMember = 'Please answer this question.'
    if (data.associationMember === 'Yes' && !data.associationName.trim()) {
      next.associationName = 'Required when you are a member of an association.'
    }
    if (!data.hasInsurance) next.hasInsurance = 'Please answer this question.'
    if (data.hasInsurance === 'Yes' && !data.insuranceDescription.trim()) {
      next.insuranceDescription = 'Please describe your professional insurance.'
    }
    setErrors(next)
    if (Object.keys(next).length === 0) onNext()
  }

  return (
    <>
      <SectionCard title="Legal Eligibility">
        <Field label="Are you legally permitted to provide paid tour guiding services where you operate?" required error={errors.legallyPermitted}>
          <RadioGroup
            name="legallyPermitted"
            value={data.legallyPermitted}
            onChange={(v) => update({ legallyPermitted: v })}
            options={['Yes', 'No', 'Not sure']}
          />
        </Field>
        <Field label="Are tour guides required to be licensed, registered, or certified where you operate?" required error={errors.licenseRequired}>
          <RadioGroup
            name="licenseRequired"
            value={data.licenseRequired}
            onChange={(v) => update({ licenseRequired: v })}
            options={['Yes', 'No', 'Not sure']}
          />
        </Field>
        {data.licenseRequired === 'Yes' && (
          <>
            <Field label="License, registration or certification type" required error={errors.licenseType}>
              <TextInput value={data.licenseType} onChange={(v) => update({ licenseType: v })} />
            </Field>
            <Field label="License, registration or certification number" required error={errors.licenseNumber}>
              <TextInput value={data.licenseNumber} onChange={(v) => update({ licenseNumber: v })} />
            </Field>
            <Field label="Issuing authority" required error={errors.issuingAuthority}>
              <TextInput value={data.issuingAuthority} onChange={(v) => update({ issuingAuthority: v })} />
            </Field>
            <Field label="Expiration date" hint="Optional — if the credential has one">
              <TextInput type="date" value={data.licenseExpiration} onChange={(v) => update({ licenseExpiration: v })} />
            </Field>
          </>
        )}
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="Association and Qualifications">
        <Field label="Are you a member of a recognized professional tour guide or tourism association?" required error={errors.associationMember}>
          <RadioGroup
            name="associationMember"
            value={data.associationMember}
            onChange={(v) => update({ associationMember: v })}
            options={['Yes', 'No']}
          />
        </Field>
        {data.associationMember === 'Yes' && (
          <>
            <Field label="Association name" required error={errors.associationName}>
              <TextInput value={data.associationName} onChange={(v) => update({ associationName: v })} />
            </Field>
            <Field label="Membership number" hint="Optional">
              <TextInput value={data.membershipNumber} onChange={(v) => update({ membershipNumber: v })} />
            </Field>
          </>
        )}
        <Field label="List relevant tourism, hospitality or guiding qualifications and certifications" hint="Optional">
          <TextArea value={data.qualifications} onChange={(v) => update({ qualifications: v })} />
        </Field>
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="Insurance">
        <Field label="Do you maintain professional public liability or tour guide insurance?" required error={errors.hasInsurance}>
          <RadioGroup
            name="hasInsurance"
            value={data.hasInsurance}
            onChange={(v) => update({ hasInsurance: v })}
            options={['Yes', 'No', 'Not available in my location']}
          />
        </Field>
        {data.hasInsurance === 'Yes' && (
          <Field label="Describe your professional insurance" required error={errors.insuranceDescription}>
            <TextArea value={data.insuranceDescription} onChange={(v) => update({ insuranceDescription: v })} />
          </Field>
        )}
      </SectionCard>

      <StepNav onBack={onBack} onNext={handleNext} />
    </>
  )
}
