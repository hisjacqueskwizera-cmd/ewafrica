import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { TOUR_GUIDE_PAGES } from '../../data/siteContent.js'
import {
  ConsentCheckbox,
  Field,
  SectionCard,
  TextInput,
} from '../../components/tour-guide-application/fields.jsx'
import { StepNav, StepProgress } from '../../components/tour-guide-application/StepChrome.jsx'
import { Reveal } from '../../components/Reveal.jsx'
import { useGuideApplicationFlow } from '../../context/GuideApplicationFlowContext.jsx'
import { buildApplicationSections } from '../../lib/generateApplicationPdf.js'
import { APPLICATION_STEPS, TOTAL_STEPS } from './stepRegistry.js'
import { IneligibleNotice } from './IneligibleNotice.jsx'

// Which numbered wizard step (1–8) each review section corresponds to, so
// "Edit" can send the applicant straight back to it.
const SECTION_TO_STEP = [1, 2, 3, 4, 5, 6, 7, 8]

export function ReviewAnswers() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const countryData = TOUR_GUIDE_PAGES[slug]
  const { data, update, submit, ineligible } = useGuideApplicationFlow()
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (countryData) document.title = `Review Application — ${countryData.countryLabel} | East-West Africa Link`
  }, [countryData])

  if (!countryData) return <Navigate to="/independent-tour-guide" replace />
  if (ineligible) return <IneligibleNotice />

  const sections = buildApplicationSections(data)

  const handleSubmit = () => {
    const next = {}
    if (!data.privacyConsent) next.privacyConsent = 'You must acknowledge the Applicant Privacy Notice.'
    if (!data.declarationConsent) next.declarationConsent = 'You must agree to the Applicant Declaration.'
    if (!data.signatureName.trim()) next.signatureName = 'Type your full name as your electronic signature.'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      submit()
      navigate(`/independent-tour-guide/${slug}/apply/confirmation`)
      window.scrollTo(0, 0)
    }
  }

  return (
    <section className="pt-[104px] pb-10 lg:pt-[124px] lg:pb-14">
      <StepProgress
        current={9}
        total={TOTAL_STEPS}
        title="Declaration, Review and Submit"
        purpose="Review every answer below, then read and agree to the declaration before submitting."
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="space-y-6">
          {sections.slice(0, 8).map((section, i) => (
            <SectionCard
              key={section.title}
              title={
                <span className="flex items-center justify-between gap-3">
                  {section.title}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/independent-tour-guide/${slug}/apply/step/${SECTION_TO_STEP[i]}`)
                    }
                    className="shrink-0 text-xs font-bold text-copper hover:underline"
                  >
                    Edit
                  </button>
                </span>
              }
            >
              <dl className="space-y-2 text-sm">
                {section.rows.map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5 border-b border-border/60 pb-2 last:border-0 sm:flex-row sm:justify-between sm:gap-4">
                    <dt className="font-semibold text-primary sm:w-1/2">{label}</dt>
                    <dd className="text-muted-foreground sm:w-1/2 sm:text-right">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </SectionCard>
          ))}
        </div>

        <div className="h-8" />

        <Reveal className="rounded-2xl border border-border bg-cream p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">
          <h2 className="text-base font-bold text-primary">Applicant Privacy Notice</h2>
          <p className="mt-2">
            Information and documents submitted through this application will be used by East-West
            Africa Link for guide vetting, verification, network administration, and consideration
            for customer referrals. Personal identification and verification documents will not be
            displayed publicly as part of a guide profile. Information may be verified with
            professional references, issuing authorities, or relevant professional organizations
            where appropriate.
          </p>
        </Reveal>

        <div className="h-4" />

        <ConsentCheckbox checked={data.privacyConsent} onChange={(v) => update({ privacyConsent: v })}>
          I have read and understand the Applicant Privacy Notice.
        </ConsentCheckbox>
        {errors.privacyConsent && <p className="mt-2 text-xs font-semibold text-red-700">{errors.privacyConsent}</p>}

        <div className="h-6" />

        <Reveal className="rounded-2xl border border-border bg-cream p-5 text-sm leading-relaxed text-muted-foreground sm:p-6">
          <h2 className="text-base font-bold text-primary">Applicant Declaration</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>The information and documents I provided are true, accurate and complete to the best of my knowledge.</li>
            <li>I authorize East-West Africa Link to verify licenses, registrations, memberships, references, qualifications and other information reasonably necessary to evaluate my application.</li>
            <li>I understand that acceptance does not make me an employee and does not guarantee customer referrals or income.</li>
            <li>I understand that I remain free to accept or decline individual referrals and negotiate my services, itinerary and pricing directly with the customer.</li>
            <li>I am responsible for maintaining all licenses, registrations, permits, insurance and other legal requirements applicable to my services.</li>
            <li>I agree to provide professional, ethical, respectful and safe service to referred customers.</li>
            <li>I understand that false, incomplete or misleading information may result in rejection or removal from the network.</li>
          </ul>
        </Reveal>

        <div className="h-4" />

        <ConsentCheckbox checked={data.declarationConsent} onChange={(v) => update({ declarationConsent: v })}>
          I agree to the Applicant Declaration.
        </ConsentCheckbox>
        {errors.declarationConsent && (
          <p className="mt-2 text-xs font-semibold text-red-700">{errors.declarationConsent}</p>
        )}

        <div className="h-6" />

        <SectionCard title="Signature">
          <Field label="Applicant full name" required hint="Typed electronic signature." error={errors.signatureName}>
            <TextInput value={data.signatureName} onChange={(v) => update({ signatureName: v })} />
          </Field>
        </SectionCard>

        <StepNav
          onBack={() => navigate(`/independent-tour-guide/${slug}/apply/step/8`)}
          onNext={handleSubmit}
          nextLabel="Submit Application"
        />
      </div>
    </section>
  )
}
