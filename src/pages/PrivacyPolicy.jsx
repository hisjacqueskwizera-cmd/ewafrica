import { LegalPage, LegalSection } from '../components/LegalPage.jsx'

const SECTIONS = [
  { id: 'information-we-collect', label: '1. Information We May Collect' },
  { id: 'sensitive-information', label: '2. Passport & Sensitive Information' },
  { id: 'how-we-use', label: '3. How We Use Information' },
  { id: 'payment-information', label: '4. Payment Information' },
  { id: 'guide-match-sharing', label: '5. Local Guide Match & Information Sharing' },
  { id: 'service-providers', label: '6. Service Providers' },
  { id: 'cookies', label: '7. Cookies & Website Analytics' },
  { id: 'marketing', label: '8. Marketing Communications' },
  { id: 'sale-of-information', label: '9. Sale of Personal Information' },
  { id: 'security-retention', label: '10. Information Security & Retention' },
  { id: 'international', label: '11. International Information Sharing' },
  { id: 'children', label: "12. Children's Privacy" },
  { id: 'choices', label: '13. Privacy Choices & Requests' },
  { id: 'third-party-sites', label: '14. Third-Party Websites' },
  { id: 'changes', label: '15. Changes to This Privacy Policy' },
  { id: 'contact', label: '16. Contact Us' },
]

export function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      effectiveDate="September 23, 2026"
      lastUpdated="September 23, 2026"
      sections={SECTIONS}
    >
      <p className="mb-8 text-[15px] leading-[1.7] text-primary/90 lg:text-base">
        East-West Africa Link LLC ("East-West Africa Link," "we," "us," or "our") respects your
        privacy and is committed to handling personal information responsibly. This Privacy
        Policy explains what information we may collect when you visit our website, contact us,
        purchase a service, request personalized research or guidance, submit an itinerary,
        request a Local Guide Match, schedule a consultation, or otherwise interact with East-West
        Africa Link. By using our website or voluntarily providing information to us, you
        acknowledge the practices described in this Privacy Policy.
      </p>

      <LegalSection id="information-we-collect" heading="1. Information We May Collect">
        <p>Depending on the service requested, we may collect information such as:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Telephone or messaging contact information</li>
          <li>Country of residence</li>
          <li>Nationality or citizenship when relevant to visa or immigration research</li>
          <li>Destination countries</li>
          <li>Travel dates</li>
          <li>Proposed itineraries</li>
          <li>Travel, transportation, or accommodation preferences</li>
          <li>Visa, permit, relocation, or business-related information</li>
          <li>Travel Audit submissions</li>
          <li>Local Guide Match information</li>
          <li>Consultation requests and communications</li>
          <li>Purchase and transaction information</li>
          <li>Other information you voluntarily provide</li>
        </ul>
        <p>We ask customers to provide only information reasonably necessary for the requested service.</p>
      </LegalSection>

      <LegalSection id="sensitive-information" heading="2. Passport & Sensitive Information">
        <p>
          Some visa, immigration, permit, or relocation services may require information relating
          to nationality, passport held, immigration circumstances, or travel history.
        </p>
        <p>
          Unless specifically requested and reasonably necessary for a service, please do not send
          copies of passports, national identification cards, financial account numbers,
          passwords, or other highly sensitive information. If additional documentation is
          necessary, we will explain what is required and why.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use" heading="3. How We Use Information">
        <p>We may use personal information to:</p>
        <ul>
          <li>Respond to inquiries</li>
          <li>Provide purchased services</li>
          <li>Conduct personalized travel research</li>
          <li>Provide visa and permit research or guidance</li>
          <li>Conduct Travel Audits</li>
          <li>Research transportation and border-crossing options</li>
          <li>Prepare relocation or business-related research</li>
          <li>Conduct Ghana relocation or Right of Abode consultations</li>
          <li>Match travelers with independent local guides</li>
          <li>Communicate regarding an order, consultation, or request</li>
          <li>Process payments</li>
          <li>Maintain business records</li>
          <li>Improve our website and services</li>
          <li>Prevent fraud or misuse</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          We do not use personal information for materially unrelated purposes without an
          appropriate basis or notice.
        </p>
      </LegalSection>

      <LegalSection id="payment-information" heading="4. Payment Information">
        <p>
          Payments may be processed by third-party payment providers. East-West Africa Link
          generally does not directly store complete credit-card or debit-card numbers when
          payment information is entered through a third-party processor. Payment providers
          maintain their own privacy and security practices.
        </p>
      </LegalSection>

      <LegalSection id="guide-match-sharing" heading="5. Local Guide Match & Information Sharing">
        <p>
          When a customer requests or purchases a Local Guide Match, East-West Africa Link may
          share limited information with a potential independent guide where reasonably necessary
          to determine availability, suitability, or facilitate an introduction. This may include:
        </p>
        <ul>
          <li>First name</li>
          <li>Destination</li>
          <li>Travel dates</li>
          <li>Number of travelers</li>
          <li>Language preferences</li>
          <li>General interests</li>
          <li>Type of assistance requested</li>
          <li>Relevant meeting or itinerary information</li>
        </ul>
        <p>
          We seek to limit information shared with guides to what is reasonably necessary.
          Independent guides are separate service providers and may have their own privacy
          practices.
        </p>
      </LegalSection>

      <LegalSection id="service-providers" heading="6. Service Providers">
        <p>
          We may use third-party companies to assist with operating our website and business,
          including providers of:
        </p>
        <ul>
          <li>Website hosting</li>
          <li>Payment processing</li>
          <li>Email</li>
          <li>Scheduling</li>
          <li>Website analytics</li>
          <li>Customer communications</li>
          <li>Cloud storage</li>
          <li>Business administration</li>
        </ul>
        <p>
          These providers may process information as reasonably necessary to provide services to
          East-West Africa Link.
        </p>
      </LegalSection>

      <LegalSection id="cookies" heading="7. Cookies & Website Analytics">
        <p>
          Our website may use cookies and similar technologies to remember preferences, understand
          website usage, improve performance, maintain security, and measure traffic. Where
          required by applicable law, visitors will be provided appropriate information or choices
          regarding non-essential cookies. Users may also be able to restrict or delete cookies
          through their browser settings.
        </p>
      </LegalSection>

      <LegalSection id="marketing" heading="8. Marketing Communications">
        <p>
          If East-West Africa Link offers newsletters, travel updates, promotional emails, or
          similar communications, users may choose whether to subscribe. Promotional
          communications will include a method for unsubscribing. Communications relating to
          purchases, consultations, customer requests, or service delivery are not considered
          promotional communications.
        </p>
      </LegalSection>

      <LegalSection id="sale-of-information" heading="9. Sale of Personal Information">
        <p>
          East-West Africa Link does not sell personal information to third parties for monetary
          compensation. If our data practices materially change, this Privacy Policy will be
          updated as appropriate.
        </p>
      </LegalSection>

      <LegalSection id="security-retention" heading="10. Information Security & Retention">
        <p>
          East-West Africa Link takes reasonable administrative and technical measures intended to
          protect personal information. However, no website, email system, internet transmission,
          or electronic storage system can be guaranteed to be completely secure.
        </p>
        <p>
          We retain personal information only for as long as reasonably necessary for purposes
          such as providing services, maintaining appropriate business and transaction records,
          resolving disputes, complying with tax or legal obligations, preventing fraud, and
          protecting legitimate business interests. Information that is no longer reasonably
          necessary may be deleted or anonymized in accordance with our practices and applicable
          law.
        </p>
      </LegalSection>

      <LegalSection id="international" heading="11. International Information Sharing">
        <p>
          East-West Africa Link focuses on international travel and may work with independent
          guides or other service providers located outside the United States. Where a requested
          service reasonably requires it, limited personal information may be transmitted to or
          accessed from another country. Privacy and data-protection laws vary between countries.
        </p>
        <p>
          We seek to limit international disclosures to information reasonably necessary to
          provide the requested service.
        </p>
      </LegalSection>

      <LegalSection id="children" heading="12. Children's Privacy">
        <p>
          East-West Africa Link's services are intended primarily for adults. We do not knowingly
          solicit personal information directly from children under 13 through our website. A
          parent or legal guardian arranging travel involving a minor may provide information
          reasonably necessary for the requested service.
        </p>
      </LegalSection>

      <LegalSection id="choices" heading="13. Privacy Choices & Requests">
        <p>
          Depending on applicable law and the circumstances, individuals may have rights
          concerning their personal information. You may contact East-West Africa Link to request:
        </p>
        <ul>
          <li>Access to certain personal information we maintain about you</li>
          <li>Correction of inaccurate information</li>
          <li>Deletion of certain information</li>
          <li>Information regarding how your information is used</li>
          <li>Removal from marketing communications</li>
        </ul>
        <p>
          Some information may need to be retained for legal, accounting, transaction,
          fraud-prevention, or other legitimate business purposes.
        </p>
      </LegalSection>

      <LegalSection id="third-party-sites" heading="14. Third-Party Websites">
        <p>
          Our website may link to government agencies, transportation providers, accommodation
          providers, payment processors, guides, businesses, and other third-party websites.
          East-West Africa Link does not control the privacy practices of third parties. Visitors
          should review the privacy policies of third-party websites where appropriate.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="15. Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy periodically to reflect changes in our services,
          technology, legal requirements, or business practices. The Last Updated date at the
          beginning of this Policy will indicate when the most recent revision occurred.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="16. Contact Us">
        <p>Questions or requests concerning this Privacy Policy may be directed to East-West Africa Link LLC using the contact details below.</p>
      </LegalSection>
    </LegalPage>
  )
}
