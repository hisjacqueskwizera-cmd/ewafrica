import { useState } from 'react'
import {
  CheckboxGroup,
  Field,
  FixedList,
  SectionCard,
  Select,
  TextArea,
  TextInput,
} from '../../../components/tour-guide-application/fields.jsx'
import { StepNav } from '../../../components/tour-guide-application/StepChrome.jsx'
import { useGuideApplicationFlow } from '../../../context/GuideApplicationFlowContext.jsx'

export const GUIDING_SERVICES = [
  'City and neighborhood tours',
  'History and heritage',
  'Culture and local life',
  'Markets and shopping',
  'Food and culinary experiences',
  'Beaches and coastal experiences',
  'Boat and water experiences',
  'Wildlife and safari guiding',
  'Nature and ecotourism',
  'Hiking and trekking',
  'Photography tours',
  'Festivals, music and nightlife',
  'Family friendly experiences',
  'Business or professional visits',
  'Community based experiences',
  'Custom or other',
]

export const AVAILABILITY_OPTIONS = [
  'Weekdays',
  'Weekends',
  'Mornings',
  'Afternoons',
  'Evenings',
  'Full day tours',
  'Multi day tours',
  'Seasonal or on request',
]

const BOOKING_LEAD_TIME_OPTIONS = [
  'Same day when available',
  '1 to 2 days',
  '3 to 7 days',
  '1 to 2 weeks',
  'More than 2 weeks',
]

export function Step3SpecialtiesAvailability({ onNext, onBack }) {
  const { data, update } = useGuideApplicationFlow()
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    const next = {}
    if (data.services.length === 0) next.services = 'Select at least one guiding service.'
    if (data.services.includes('Custom or other') && !data.otherService.trim()) {
      next.otherService = 'Please describe the other guiding service.'
    }
    if (data.topPlaces.some((p) => !p.trim())) next.topPlaces = 'All five places are required.'
    if (!data.differentiator.trim()) next.differentiator = 'This field is required.'
    if (data.availability.length === 0) next.availability = 'Select at least one availability option.'
    if (!data.bookingLeadTime) next.bookingLeadTime = 'Please select a booking lead time.'
    setErrors(next)
    if (Object.keys(next).length === 0) onNext()
  }

  return (
    <>
      <SectionCard title="Guiding Services" subtitle="Select all that apply.">
        <Field label="Which guiding services do you personally provide?" required error={errors.services}>
          <CheckboxGroup value={data.services} onChange={(v) => update({ services: v })} options={GUIDING_SERVICES} />
        </Field>
        {data.services.includes('Custom or other') && (
          <Field label="Other guiding service" required error={errors.otherService}>
            <TextInput value={data.otherService} onChange={(v) => update({ otherService: v })} />
          </Field>
        )}
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="What You Know Best">
        <Field label="List five places, attractions or experiences you know particularly well" required error={errors.topPlaces}>
          <FixedList values={data.topPlaces} onChange={(v) => update({ topPlaces: v })} placeholder="Place" count={5} />
        </Field>
        <Field label="What makes your guiding service different from other guides in your area?" required error={errors.differentiator}>
          <TextArea value={data.differentiator} onChange={(v) => update({ differentiator: v })} />
        </Field>
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="Availability" subtitle="Select all that apply.">
        <Field label="What is your typical guiding availability?" required error={errors.availability}>
          <CheckboxGroup
            value={data.availability}
            onChange={(v) => update({ availability: v })}
            options={AVAILABILITY_OPTIONS}
          />
        </Field>
        <Field label="How far in advance do you normally require bookings?" required error={errors.bookingLeadTime}>
          <Select
            value={data.bookingLeadTime}
            onChange={(v) => update({ bookingLeadTime: v })}
            options={BOOKING_LEAD_TIME_OPTIONS}
          />
        </Field>
      </SectionCard>

      <StepNav onBack={onBack} onNext={handleNext} />
    </>
  )
}
