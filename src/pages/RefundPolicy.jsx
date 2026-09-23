import { LegalPage, LegalSection } from '../components/LegalPage.jsx'

const SECTIONS = [
  { id: 'before-work-begins', label: 'Before Work Begins' },
  { id: 'after-work-begins', label: 'After Work Has Begun' },
  { id: 'completed-services', label: 'Completed Services' },
  { id: 'guide-match', label: 'Local Guide Match' },
  { id: 'consultations', label: 'Consultations' },
  { id: 'unable-to-provide', label: 'If We Cannot Provide the Service' },
  { id: 'government-outcomes', label: 'Government & Third-Party Outcomes' },
  { id: 'checkout', label: 'Checkout Agreement' },
]

export function RefundPolicy() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      effectiveDate="September 23, 2026"
      sections={SECTIONS}
    >
      <p className="mb-8 text-[15px] leading-[1.7] text-primary/90 lg:text-base">
        East-West Africa Link provides personalized research, consultations, Travel Planner
        services, Travel Audits, guide matching, and other customized information services.
        Because many services require work to begin specifically for an individual customer, the
        following cancellation and refund policy applies unless a different policy is clearly
        stated for a particular service.
      </p>

      <LegalSection id="before-work-begins" heading="Before Work Begins">
        <p>
          You may cancel a paid personalized service for a full refund before East-West Africa
          Link has begun substantive work on your request.
        </p>
      </LegalSection>

      <LegalSection id="after-work-begins" heading="After Work Has Begun">
        <p>
          Once personalized research, consultation preparation, Travel Audit review, Travel
          Planner work, guide matching, or other substantive customized work has begun, the
          service fee is generally non-refundable, except where required by applicable law.
        </p>
      </LegalSection>

      <LegalSection id="completed-services" heading="Completed Services">
        <p>
          Once a consultation has taken place or personalized research, a Travel Audit, Travel
          Planner, Guide Match, or other purchased service has been substantially completed or
          delivered, the service is non-refundable except where required by law.
        </p>
        <p>
          A customer's decision not to use the information provided, contact a matched guide,
          undertake a proposed trip, or proceed with a visa, relocation, business, or other plan
          does not by itself create a right to a refund.
        </p>
      </LegalSection>

      <LegalSection id="guide-match" heading="Local Guide Match">
        <p>
          The East-West Africa Link fee covers the matching, research, introduction, and/or
          coordination service described in the purchased tier. Guide fees are separate unless
          expressly stated otherwise.
        </p>
        <p>
          A refund is not automatically available merely because a customer later decides not to
          hire or meet a matched independent guide. If East-West Africa Link is unable to provide
          the purchased Guide Match service, we will offer an appropriate replacement, credit, or
          refund depending on the circumstances.
        </p>
      </LegalSection>

      <LegalSection id="consultations" heading="Consultations">
        <p>
          Customers may request to reschedule a consultation by contacting us at least 24 hours
          before the scheduled consultation. A consultation missed without adequate notice may be
          treated as completed and non-refundable. East-West Africa Link may make reasonable
          exceptions for emergencies at its discretion.
        </p>
      </LegalSection>

      <LegalSection id="unable-to-provide" heading="If We Cannot Provide the Service">
        <p>
          If East-West Africa Link is unable to provide a purchased service, we will offer an
          appropriate refund, credit, rescheduling option, or alternative resolution.
        </p>
      </LegalSection>

      <LegalSection id="government-outcomes" heading="Government & Third-Party Outcomes">
        <p>
          Payments are for East-West Africa Link's research, information, consultation, matching,
          Travel Planner, Travel Audit, or other planning services — not for a guaranteed outcome.
        </p>
        <p>No refund is due solely because:</p>
        <ul>
          <li>A visa or permit is denied</li>
          <li>Entry into a country is denied</li>
          <li>Government requirements change</li>
          <li>A transportation schedule changes</li>
          <li>A border closes or procedures change</li>
          <li>A customer changes travel plans</li>
          <li>A relocation or business plan does not proceed</li>
          <li>A government authority reaches a different conclusion</li>
        </ul>
        <p>
          Nothing in this Policy limits rights that cannot legally be waived under applicable
          consumer-protection law.
        </p>
      </LegalSection>

      <LegalSection id="checkout" heading="Checkout Agreement">
        <p>
          By completing your purchase, you acknowledge that you have reviewed and agree to this
          Refund &amp; Cancellation Policy and the East-West Africa Link{' '}
          <a href="/terms-and-conditions" className="text-copper hover:underline">
            Terms &amp; Conditions
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}
