import { useState } from 'react'
import {
  ConsentCheckbox,
  Field,
  RadioGroup,
  SectionCard,
  TextArea,
  TextInput,
} from '../../../components/tour-guide-application/fields.jsx'
import { StepNav } from '../../../components/tour-guide-application/StepChrome.jsx'
import { useGuideApplicationFlow } from '../../../context/GuideApplicationFlowContext.jsx'

function ReferenceFields({ label, reference, onChange, errors, prefix }) {
  return (
    <SectionCard title={label}>
      <Field label="Name" required error={errors[`${prefix}.name`]}>
        <TextInput value={reference.name} onChange={(v) => onChange({ name: v })} />
      </Field>
      <Field label="Company or organization" required error={errors[`${prefix}.company`]}>
        <TextInput value={reference.company} onChange={(v) => onChange({ company: v })} />
      </Field>
      <Field label="Position" required error={errors[`${prefix}.position`]}>
        <TextInput value={reference.position} onChange={(v) => onChange({ position: v })} />
      </Field>
      <Field label="Relationship to applicant" required error={errors[`${prefix}.relationship`]}>
        <TextInput value={reference.relationship} onChange={(v) => onChange({ relationship: v })} />
      </Field>
      <Field label="Telephone or WhatsApp" required error={errors[`${prefix}.phone`]}>
        <TextInput type="tel" value={reference.phone} onChange={(v) => onChange({ phone: v })} />
      </Field>
      <Field label="Email" required error={errors[`${prefix}.email`]}>
        <TextInput type="email" value={reference.email} onChange={(v) => onChange({ email: v })} />
      </Field>
      <Field label="How long they have known you professionally" required error={errors[`${prefix}.knownDuration`]}>
        <TextInput value={reference.knownDuration} onChange={(v) => onChange({ knownDuration: v })} />
      </Field>
    </SectionCard>
  )
}

export function Step7ReferencesHistory({ onNext, onBack }) {
  const { data, update } = useGuideApplicationFlow()
  const [errors, setErrors] = useState({})

  const validateRef = (ref, prefix, errs) => {
    ;['name', 'company', 'position', 'relationship', 'phone', 'email', 'knownDuration'].forEach((k) => {
      if (!ref[k].trim()) errs[`${prefix}.${k}`] = 'Required.'
    })
  }

  const handleNext = () => {
    const next = {}
    validateRef(data.ref1, 'ref1', next)
    validateRef(data.ref2, 'ref2', next)
    if (!data.authorizeReferenceContact) next.authorizeReferenceContact = 'You must authorize us to contact your references.'
    if (!data.hasOnlineReviews) next.hasOnlineReviews = 'Please answer this question.'
    if (!data.everSuspended) next.everSuspended = 'Please answer this question.'
    if (data.everSuspended === 'Yes' && !data.suspensionExplain.trim()) {
      next.suspensionExplain = 'Please explain.'
    }
    if (!data.everBanned) next.everBanned = 'Please answer this question.'
    if (data.everBanned === 'Yes' && !data.banExplain.trim()) {
      next.banExplain = 'Please explain.'
    }
    setErrors(next)
    if (Object.keys(next).length === 0) onNext()
  }

  return (
    <>
      <ReferenceFields
        label="Professional Reference 1"
        reference={data.ref1}
        onChange={(patch) => update({ ref1: { ...data.ref1, ...patch } })}
        errors={errors}
        prefix="ref1"
      />
      <div className="h-6" />
      <ReferenceFields
        label="Professional Reference 2"
        reference={data.ref2}
        onChange={(patch) => update({ ref2: { ...data.ref2, ...patch } })}
        errors={errors}
        prefix="ref2"
      />

      <div className="h-6" />
      <ConsentCheckbox
        checked={data.authorizeReferenceContact}
        onChange={(v) => update({ authorizeReferenceContact: v })}
      >
        I authorize East-West Africa Link to contact the references listed above.
      </ConsentCheckbox>
      {errors.authorizeReferenceContact && (
        <p className="mt-2 text-xs font-semibold text-red-700">{errors.authorizeReferenceContact}</p>
      )}

      <div className="h-6" />

      <SectionCard title="Reviews">
        <Field label="Do you have previous customer reviews available online?" required error={errors.hasOnlineReviews}>
          <RadioGroup
            name="hasOnlineReviews"
            value={data.hasOnlineReviews}
            onChange={(v) => update({ hasOnlineReviews: v })}
            options={['Yes', 'No']}
          />
        </Field>
        {data.hasOnlineReviews === 'Yes' && (
          <>
            <Field label="Google reviews link" hint="Optional">
              <TextInput type="url" value={data.googleReviews} onChange={(v) => update({ googleReviews: v })} />
            </Field>
            <Field label="Tripadvisor reviews link" hint="Optional">
              <TextInput type="url" value={data.tripadvisorReviews} onChange={(v) => update({ tripadvisorReviews: v })} />
            </Field>
            <Field label="Facebook reviews link" hint="Optional">
              <TextInput type="url" value={data.facebookReviews} onChange={(v) => update({ facebookReviews: v })} />
            </Field>
            <Field label="Other reviews link" hint="Optional">
              <TextInput type="url" value={data.otherReviews} onChange={(v) => update({ otherReviews: v })} />
            </Field>
          </>
        )}
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="Professional Conduct">
        <Field
          label="Have you ever been suspended, disciplined, or had a professional tour guide license or registration revoked?"
          required
          error={errors.everSuspended}
        >
          <RadioGroup
            name="everSuspended"
            value={data.everSuspended}
            onChange={(v) => update({ everSuspended: v })}
            options={['Yes', 'No']}
          />
        </Field>
        {data.everSuspended === 'Yes' && (
          <Field label="Please explain the suspension, discipline or revocation" required error={errors.suspensionExplain}>
            <TextArea value={data.suspensionExplain} onChange={(v) => update({ suspensionExplain: v })} />
          </Field>
        )}
        <Field
          label="Have you ever been removed or permanently banned from a tour company, booking platform, tourism association or similar organization for misconduct, safety concerns, fraud, harassment or serious customer complaints?"
          required
          error={errors.everBanned}
        >
          <RadioGroup
            name="everBanned"
            value={data.everBanned}
            onChange={(v) => update({ everBanned: v })}
            options={['Yes', 'No']}
          />
        </Field>
        {data.everBanned === 'Yes' && (
          <Field label="Please explain the removal or ban" required error={errors.banExplain}>
            <TextArea value={data.banExplain} onChange={(v) => update({ banExplain: v })} />
          </Field>
        )}
      </SectionCard>

      <StepNav onBack={onBack} onNext={handleNext} />
    </>
  )
}
