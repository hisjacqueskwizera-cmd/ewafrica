import { useState } from 'react'
import {
  Field,
  RadioGroup,
  SectionCard,
  Select,
  TextInput,
} from '../../../components/tour-guide-application/fields.jsx'
import { StepNav } from '../../../components/tour-guide-application/StepChrome.jsx'
import { useGuideApplicationFlow } from '../../../context/GuideApplicationFlowContext.jsx'

// A short, common list rather than every country on earth — applicants can
// still type a value not on this list is not possible with a <select>, so
// this stays a free-text field for country of residence in practice; kept
// as a curated dropdown of likely countries plus "Other" for anyone else.
const RESIDENCE_COUNTRIES = [
  'Ghana',
  'Benin',
  'Tanzania',
  'Kenya',
  'Nigeria',
  'United Kingdom',
  'United States',
  'France',
  'Other',
]

const PRIMARY_COUNTRY_OPTIONS = ['Zanzibar', 'Benin', 'Ghana']

export function Step1ApplicantInfo({ onNext }) {
  const { data, update, setIneligible } = useGuideApplicationFlow()
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    if (data.isAdult === 'No') {
      setIneligible(true)
      return
    }
    const next = {}
    if (!data.fullLegalName.trim()) next.fullLegalName = 'Full legal name is required.'
    if (!data.isAdult) next.isAdult = 'Please confirm you are at least 18 years old.'
    if (!data.nationality.trim()) next.nationality = 'Nationality is required.'
    if (!data.countryOfResidence) next.countryOfResidence = 'Country of residence is required.'
    if (!data.primaryCountry) next.primaryCountry = 'Please select where you primarily guide.'
    if (!data.primaryCity.trim()) next.primaryCity = 'City or primary guiding location is required.'
    if (!data.mobile.trim()) next.mobile = 'Mobile or WhatsApp number is required.'
    if (!data.email.trim()) next.email = 'Email address is required.'
    setErrors(next)
    if (Object.keys(next).length === 0) onNext()
  }

  return (
    <>
      <SectionCard title="Identity">
        <Field label="Full legal name" required error={errors.fullLegalName}>
          <TextInput value={data.fullLegalName} onChange={(v) => update({ fullLegalName: v })} />
        </Field>
        <Field label="Professional or business name" hint="Optional">
          <TextInput value={data.businessName} onChange={(v) => update({ businessName: v })} />
        </Field>
        <Field label="Are you at least 18 years old?" required error={errors.isAdult}>
          <RadioGroup
            name="isAdult"
            value={data.isAdult}
            onChange={(v) => update({ isAdult: v })}
            options={['Yes', 'No']}
          />
        </Field>
        <Field label="Nationality" required error={errors.nationality}>
          <TextInput value={data.nationality} onChange={(v) => update({ nationality: v })} />
        </Field>
        <Field label="Country of residence" required error={errors.countryOfResidence}>
          <Select
            value={data.countryOfResidence}
            onChange={(v) => update({ countryOfResidence: v })}
            options={RESIDENCE_COUNTRIES}
          />
        </Field>
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="Where You Guide">
        <Field
          label="Where do you primarily provide tour guide services?"
          required
          error={errors.primaryCountry}
          hint="Pre-filled from the page you applied from — confirm or change it."
        >
          <RadioGroup
            name="primaryCountry"
            value={data.primaryCountry}
            onChange={(v) => update({ primaryCountry: v })}
            options={PRIMARY_COUNTRY_OPTIONS}
          />
        </Field>
        <Field label="City or primary guiding location" required error={errors.primaryCity}>
          <TextInput value={data.primaryCity} onChange={(v) => update({ primaryCity: v })} />
        </Field>
        <Field label="Additional cities or regions where you guide" hint="Optional">
          <TextInput value={data.otherCities} onChange={(v) => update({ otherCities: v })} />
        </Field>
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="Contact Information">
        <Field label="Mobile or WhatsApp number" required error={errors.mobile}>
          <TextInput type="tel" value={data.mobile} onChange={(v) => update({ mobile: v })} />
        </Field>
        <Field label="Email address" required error={errors.email}>
          <TextInput type="email" value={data.email} onChange={(v) => update({ email: v })} />
        </Field>
        <Field label="Website" hint="Optional">
          <TextInput type="url" value={data.website} onChange={(v) => update({ website: v })} />
        </Field>
        <Field label="Facebook" hint="Optional">
          <TextInput type="url" value={data.facebook} onChange={(v) => update({ facebook: v })} />
        </Field>
        <Field label="Instagram" hint="Optional">
          <TextInput type="url" value={data.instagram} onChange={(v) => update({ instagram: v })} />
        </Field>
        <Field label="LinkedIn" hint="Optional">
          <TextInput type="url" value={data.linkedin} onChange={(v) => update({ linkedin: v })} />
        </Field>
        <Field label="Other professional social media" hint="Optional">
          <TextInput type="url" value={data.otherSocial} onChange={(v) => update({ otherSocial: v })} />
        </Field>
      </SectionCard>

      <StepNav onNext={handleNext} />
    </>
  )
}
