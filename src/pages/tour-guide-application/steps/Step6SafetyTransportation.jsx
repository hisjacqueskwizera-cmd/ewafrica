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

export function Step6SafetyTransportation({ onNext, onBack }) {
  const { data, update } = useGuideApplicationFlow()
  const [errors, setErrors] = useState({})

  const handleNext = () => {
    const next = {}
    if (!data.firstAidCertified) next.firstAidCertified = 'Please answer this question.'
    if (data.firstAidCertified === 'Yes') {
      if (!data.firstAidCertName.trim()) next.firstAidCertName = 'Required when you hold this certification.'
      if (!data.firstAidIssuer.trim()) next.firstAidIssuer = 'Required when you hold this certification.'
    }
    if (!data.illnessResponse.trim()) next.illnessResponse = 'This field is required.'
    if (!data.lostItemResponse.trim()) next.lostItemResponse = 'This field is required.'
    if (!data.personallyTransports) next.personallyTransports = 'Please answer this question.'
    if (!data.usesThirdPartyTransport) next.usesThirdPartyTransport = 'Please answer this question.'
    if (data.usesThirdPartyTransport === 'Yes' && !data.thirdPartyLicensed) {
      next.thirdPartyLicensed = 'Please answer this question.'
    }
    if (data.personallyTransports === 'Yes') {
      if (!data.driverLicenseNumber.trim()) next.driverLicenseNumber = 'Required — you personally transport customers.'
      if (!data.driverLicenseExpiration) next.driverLicenseExpiration = 'Required — you personally transport customers.'
      if (!data.vehicleMakeModel.trim()) next.vehicleMakeModel = 'Required — you personally transport customers.'
      if (!data.vehicleYear) next.vehicleYear = 'Required — you personally transport customers.'
      if (!data.vehicleRegistration.trim()) next.vehicleRegistration = 'Required — you personally transport customers.'
      if (!data.maxPassengers) next.maxPassengers = 'Required — you personally transport customers.'
      if (!data.ownsVehicle) next.ownsVehicle = 'Required — you personally transport customers.'
      if (!data.vehicleInsured) next.vehicleInsured = 'Required — you personally transport customers.'
      if (!data.transportAuthorized) next.transportAuthorized = 'Required — you personally transport customers.'
    }
    setErrors(next)
    if (Object.keys(next).length === 0) onNext()
  }

  return (
    <>
      <SectionCard title="Emergency Readiness">
        <Field label="Do you currently hold First Aid or CPR certification?" required error={errors.firstAidCertified}>
          <RadioGroup
            name="firstAidCertified"
            value={data.firstAidCertified}
            onChange={(v) => update({ firstAidCertified: v })}
            options={['Yes', 'No']}
          />
        </Field>
        {data.firstAidCertified === 'Yes' && (
          <>
            <Field label="First Aid or CPR certification" required error={errors.firstAidCertName}>
              <TextInput value={data.firstAidCertName} onChange={(v) => update({ firstAidCertName: v })} />
            </Field>
            <Field label="Issuing organization" required error={errors.firstAidIssuer}>
              <TextInput value={data.firstAidIssuer} onChange={(v) => update({ firstAidIssuer: v })} />
            </Field>
            <Field label="Certification expiration date" hint="Optional">
              <TextInput type="date" value={data.firstAidExpiration} onChange={(v) => update({ firstAidExpiration: v })} />
            </Field>
          </>
        )}
        <Field label="A customer becomes seriously ill during your tour. What would you do?" required error={errors.illnessResponse}>
          <TextArea value={data.illnessResponse} onChange={(v) => update({ illnessResponse: v })} />
        </Field>
        <Field
          label="A customer's passport or telephone is lost or stolen during your tour. What assistance would you provide?"
          required
          error={errors.lostItemResponse}
        >
          <TextArea value={data.lostItemResponse} onChange={(v) => update({ lostItemResponse: v })} />
        </Field>
      </SectionCard>

      <div className="h-6" />

      <SectionCard title="Transportation">
        <Field label="Do you personally transport customers?" required error={errors.personallyTransports}>
          <RadioGroup
            name="personallyTransports"
            value={data.personallyTransports}
            onChange={(v) => update({ personallyTransports: v })}
            options={['Yes', 'No']}
          />
        </Field>
        <Field label="Do you use third party drivers or vehicles?" required error={errors.usesThirdPartyTransport}>
          <RadioGroup
            name="usesThirdPartyTransport"
            value={data.usesThirdPartyTransport}
            onChange={(v) => update({ usesThirdPartyTransport: v })}
            options={['Yes', 'No']}
          />
        </Field>
        {data.usesThirdPartyTransport === 'Yes' && (
          <Field
            label="When using third party transportation, do you work with licensed or authorized providers where required?"
            required
            error={errors.thirdPartyLicensed}
          >
            <RadioGroup
              name="thirdPartyLicensed"
              value={data.thirdPartyLicensed}
              onChange={(v) => update({ thirdPartyLicensed: v })}
              options={['Yes', 'No', 'Not applicable']}
            />
          </Field>
        )}
      </SectionCard>

      {data.personallyTransports === 'Yes' && (
        <>
          <div className="h-6" />
          <SectionCard title="Vehicle Details" subtitle="Required because you personally transport customers.">
            <Field label="Driver's license number" required error={errors.driverLicenseNumber}>
              <TextInput value={data.driverLicenseNumber} onChange={(v) => update({ driverLicenseNumber: v })} />
            </Field>
            <Field label="Driver's license expiration date" required error={errors.driverLicenseExpiration}>
              <TextInput type="date" value={data.driverLicenseExpiration} onChange={(v) => update({ driverLicenseExpiration: v })} />
            </Field>
            <Field label="Vehicle make and model" required error={errors.vehicleMakeModel}>
              <TextInput value={data.vehicleMakeModel} onChange={(v) => update({ vehicleMakeModel: v })} />
            </Field>
            <Field label="Vehicle year" required error={errors.vehicleYear}>
              <TextInput type="number" min="1950" max={new Date().getFullYear() + 1} value={data.vehicleYear} onChange={(v) => update({ vehicleYear: v })} />
            </Field>
            <Field label="Vehicle registration number" required error={errors.vehicleRegistration}>
              <TextInput value={data.vehicleRegistration} onChange={(v) => update({ vehicleRegistration: v })} />
            </Field>
            <Field label="Maximum passenger capacity" required error={errors.maxPassengers}>
              <TextInput type="number" min="1" value={data.maxPassengers} onChange={(v) => update({ maxPassengers: v })} />
            </Field>
            <Field label="Do you own the vehicle?" required error={errors.ownsVehicle}>
              <RadioGroup name="ownsVehicle" value={data.ownsVehicle} onChange={(v) => update({ ownsVehicle: v })} options={['Yes', 'No']} />
            </Field>
            <Field label="Does the vehicle have current insurance?" required error={errors.vehicleInsured}>
              <RadioGroup name="vehicleInsured" value={data.vehicleInsured} onChange={(v) => update({ vehicleInsured: v })} options={['Yes', 'No']} />
            </Field>
            <Field label="Are you legally authorized to transport paying passengers where required?" required error={errors.transportAuthorized}>
              <RadioGroup
                name="transportAuthorized"
                value={data.transportAuthorized}
                onChange={(v) => update({ transportAuthorized: v })}
                options={['Yes', 'No', 'Not applicable']}
              />
            </Field>
          </SectionCard>
        </>
      )}

      <StepNav onBack={onBack} onNext={handleNext} />
    </>
  )
}
