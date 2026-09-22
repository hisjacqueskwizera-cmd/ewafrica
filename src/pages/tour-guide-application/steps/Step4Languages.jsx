import { useState } from 'react'
import {
  Field,
  RadioGroup,
  RepeatableGroup,
  SectionCard,
  Select,
  TextInput,
} from '../../../components/tour-guide-application/fields.jsx'
import { StepNav } from '../../../components/tour-guide-application/StepChrome.jsx'
import { useGuideApplicationFlow } from '../../../context/GuideApplicationFlowContext.jsx'

export const LANGUAGE_LEVELS = ['None', 'Basic', 'Intermediate', 'Advanced', 'Fluent', 'Native or bilingual']

export function Step4Languages({ onNext, onBack }) {
  const { data, update } = useGuideApplicationFlow()
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    const next = {}
    if (!data.englishLevel) next.englishLevel = 'Please rate your spoken English.'
    if (!data.englishPrivateTour) next.englishPrivateTour = 'Please answer this question.'
    if (!data.frenchLevel) next.frenchLevel = 'Please rate your spoken French.'
    if (!data.frenchPrivateTour) next.frenchPrivateTour = 'Please answer this question.'
    setErrors(next)
    if (Object.keys(next).length === 0) onNext()
  }

  return (
    <>
      <SectionCard title="English">
        <Field label="Rate your spoken English" required error={errors.englishLevel}>
          <RadioGroup
            name="englishLevel"
            value={data.englishLevel}
            onChange={(v) => update({ englishLevel: v })}
            options={LANGUAGE_LEVELS}
          />
        </Field>
        <Field label="Can you comfortably conduct an entire private tour in English?" required error={errors.englishPrivateTour}>
          <RadioGroup
            name="englishPrivateTour"
            value={data.englishPrivateTour}
            onChange={(v) => update({ englishPrivateTour: v })}
            options={['Yes', 'No']}
          />
        </Field>
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="French">
        <Field label="Rate your spoken French" required error={errors.frenchLevel}>
          <RadioGroup
            name="frenchLevel"
            value={data.frenchLevel}
            onChange={(v) => update({ frenchLevel: v })}
            options={LANGUAGE_LEVELS}
          />
        </Field>
        <Field label="Can you comfortably conduct an entire private tour in French?" required error={errors.frenchPrivateTour}>
          <RadioGroup
            name="frenchPrivateTour"
            value={data.frenchPrivateTour}
            onChange={(v) => update({ frenchPrivateTour: v })}
            options={['Yes', 'No']}
          />
        </Field>
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="Other Languages" subtitle="Optional — up to three entries.">
        <RepeatableGroup
          entries={data.otherLanguages}
          onChange={(v) => update({ otherLanguages: v })}
          max={3}
          min={0}
          emptyEntry={() => ({ language: '', proficiency: '' })}
          renderEntry={(entry, patch) => (
            <>
              <TextInput placeholder="Language" value={entry.language} onChange={(v) => patch({ language: v })} />
              <Select
                value={entry.proficiency}
                onChange={(v) => patch({ proficiency: v })}
                options={LANGUAGE_LEVELS}
                placeholder="Proficiency"
              />
            </>
          )}
        />
      </SectionCard>

      <StepNav onBack={onBack} onNext={handleNext} />
    </>
  )
}
