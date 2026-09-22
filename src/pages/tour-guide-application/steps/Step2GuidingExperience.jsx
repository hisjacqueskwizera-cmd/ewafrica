import { useState } from 'react'
import {
  Field,
  RadioGroup,
  RepeatableGroup,
  SectionCard,
  TextArea,
  TextInput,
} from '../../../components/tour-guide-application/fields.jsx'
import { StepNav } from '../../../components/tour-guide-application/StepChrome.jsx'
import { useGuideApplicationFlow } from '../../../context/GuideApplicationFlowContext.jsx'

export function Step2GuidingExperience({ onNext, onBack }) {
  const { data, update } = useGuideApplicationFlow()
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    const next = {}
    const years = Number(data.yearsExperience)
    if (!data.yearsExperience) next.yearsExperience = 'Years of professional guiding experience is required.'
    else if (years < 3) next.yearsExperience = 'A minimum of 3 years of professional guiding experience is required.'
    if (!data.startYear) next.startYear = 'Year you began professional guiding is required.'
    if (!data.guidedInternational) next.guidedInternational = 'Please answer whether you have guided international travelers.'
    if (data.guidedInternational === 'Yes' && !data.internationalCustomers12mo) {
      next.internationalCustomers12mo = 'Required when you have guided international travelers.'
    }
    const validOrgEntries = data.orgHistory.filter((e) => e.organization.trim() && e.position.trim() && e.dates.trim())
    if (validOrgEntries.length === 0) {
      next.orgHistory = 'At least one complete professional organization entry is required.'
    }
    setErrors(next)
    if (Object.keys(next).length === 0) onNext()
  }

  return (
    <>
      <SectionCard title="Minimum Experience">
        <Field
          label="How many years have you worked professionally as a tour guide?"
          required
          hint="Minimum: 3 years."
          error={errors.yearsExperience}
        >
          <TextInput
            type="number"
            min="0"
            value={data.yearsExperience}
            onChange={(v) => update({ yearsExperience: v })}
          />
        </Field>
        <Field label="Year you began professional guiding" required error={errors.startYear}>
          <TextInput
            type="number"
            min="1950"
            max={new Date().getFullYear()}
            value={data.startYear}
            onChange={(v) => update({ startYear: v })}
          />
        </Field>
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="International Travelers">
        <Field label="Have you guided international travelers?" required error={errors.guidedInternational}>
          <RadioGroup
            name="guidedInternational"
            value={data.guidedInternational}
            onChange={(v) => update({ guidedInternational: v })}
            options={['Yes', 'No']}
          />
        </Field>
        {data.guidedInternational === 'Yes' && (
          <>
            <Field
              label="Approximately how many international customers have you guided during the past 12 months?"
              required
              error={errors.internationalCustomers12mo}
            >
              <TextInput
                type="number"
                min="0"
                value={data.internationalCustomers12mo}
                onChange={(v) => update({ internationalCustomers12mo: v })}
              />
            </Field>
            <Field label="Which nationalities or international markets do you most commonly serve?" hint="Optional">
              <TextArea value={data.marketsServed} onChange={(v) => update({ marketsServed: v })} />
            </Field>
          </>
        )}
      </SectionCard>

      <div className="h-6" />

      <SectionCard
        title="Professional Organization History"
        subtitle="At least one complete entry is required; you may add up to two more."
      >
        <Field label="" error={errors.orgHistory}>
          <RepeatableGroup
            entries={data.orgHistory}
            onChange={(v) => update({ orgHistory: v })}
            max={3}
            emptyEntry={() => ({ organization: '', position: '', dates: '' })}
            renderEntry={(entry, patch) => (
              <>
                <TextInput
                  placeholder="Organization name"
                  value={entry.organization}
                  onChange={(v) => patch({ organization: v })}
                />
                <TextInput
                  placeholder="Position or professional relationship"
                  value={entry.position}
                  onChange={(v) => patch({ position: v })}
                />
                <TextInput
                  placeholder="Dates associated"
                  value={entry.dates}
                  onChange={(v) => patch({ dates: v })}
                />
              </>
            )}
          />
        </Field>
      </SectionCard>

      <StepNav onBack={onBack} onNext={handleNext} />
    </>
  )
}
