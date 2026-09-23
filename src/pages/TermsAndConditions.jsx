import { LegalPage, LegalSection } from '../components/LegalPage.jsx'

const SECTIONS = [
  { id: 'about', label: '1. About East-West Africa Link' },
  { id: 'not-travel-agency', label: '2. Information & Guidance Service' },
  { id: 'accuracy', label: '3. Accuracy & Changing Information' },
  { id: 'visa-immigration', label: '4. Visa, Immigration & Permit Information' },
  { id: 'business-property', label: '5. Business, Investment, Land & Property' },
  { id: 'guide-match', label: '6. Independent Local Guide Match' },
  { id: 'transportation', label: '7. Transportation, Routes & Border Crossings' },
  { id: 'travel-planner-audit', label: '8. Travel Planner & Travel Audit' },
  { id: 'customer-responsibilities', label: '9. Customer Responsibilities' },
  { id: 'health-safety', label: '10. Health, Safety & Travel Advisories' },
  { id: 'third-party', label: '11. Third-Party Websites & Services' },
  { id: 'payments', label: '12. Paid Services, Cancellations & Refunds' },
  { id: 'no-guarantee', label: '13. No Guarantee of Results' },
  { id: 'liability', label: '14. Limitation of Liability' },
  { id: 'force-majeure', label: '15. Events Beyond Our Control' },
  { id: 'ip', label: '16. Intellectual Property' },
  { id: 'privacy-use', label: '17. Privacy & Website Use' },
  { id: 'governing-law', label: '18. Governing Law' },
  { id: 'severability', label: '19. Severability & Entire Agreement' },
  { id: 'contact', label: '20. Contact' },
]

export function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms & Conditions"
      effectiveDate="September 23, 2026"
      lastUpdated="September 23, 2026"
      sections={SECTIONS}
    >
      <p className="mb-8 text-[15px] leading-[1.7] text-primary/90 lg:text-base">
        Welcome to East-West Africa Link. These Terms &amp; Conditions ("Terms") govern your use
        of the East-West Africa Link website and any free or paid information, research,
        consultation, travel-planning, guide-matching, relocation, or related services provided by
        East-West Africa Link LLC ("East-West Africa Link," "we," "us," or "our"). By accessing
        our website, purchasing a service, requesting a consultation, submitting information to
        us, or otherwise using our services, you acknowledge that you have read and agree to these
        Terms. If you do not agree with these Terms, please do not purchase or use our paid
        services.
      </p>

      <LegalSection id="about" heading="1. About East-West Africa Link">
        <p>
          East-West Africa Link is an independent travel information, research, guidance, and
          connection service with a particular focus on East and West Africa.
        </p>
        <p>
          Our services may include travel planning, visa and permit research, border and
          transportation guidance, personalized route planning, Travel Audit services, independent
          local guide matching, relocation research, business and permit information, land and
          property research, and other customized travel, relocation, or business-related
          research.
        </p>
        <p>
          Some information is provided free of charge. Personalized research, consultations,
          planning, reviews, guide matching, and other customized services may require payment.
        </p>
      </LegalSection>

      <LegalSection id="not-travel-agency" heading="2. Information & Guidance Service — Not a Travel Agency">
        <p>
          Unless expressly stated otherwise, East-West Africa Link operates as an independent
          information, research, guidance, and connection service. We are not a traditional travel
          agency and generally do not operate or sell flights, buses, trains, ferries, hotels,
          tours, transportation, accommodation, or other third-party travel services.
        </p>
        <p>
          When we provide information about or connect a customer with a transportation provider,
          accommodation provider, guide, government agency, business, tour operator, or other
          third party, that party remains responsible for its own services. East-West Africa Link
          does not control third-party schedules, pricing, availability, policies, safety
          standards, performance, or conduct.
        </p>
      </LegalSection>

      <LegalSection id="accuracy" heading="3. Accuracy & Changing Travel Information">
        <p>Travel information can change quickly and sometimes without notice.</p>
        <p>
          We make reasonable efforts to provide practical, useful, and current information based
          on sources reasonably available at the time of research. However, we cannot guarantee
          the continuing accuracy of information concerning matters such as transportation
          schedules, fares, routes, border procedures, operating hours, visa requirements,
          immigration regulations, government fees, road conditions, security conditions, local
          laws, exchange rates, or business requirements.
        </p>
        <p>
          Customers should independently confirm critical information with the appropriate
          government authority, transportation provider, service provider, or other reliable
          source before relying upon it.
        </p>
      </LegalSection>

      <LegalSection id="visa-immigration" heading="4. Visa, Immigration & Permit Information">
        <p>
          East-West Africa Link may provide general or personalized research concerning visas,
          residence permits, work permits, business permits, immigration procedures, entry
          requirements, and related matters. This information is provided for informational and
          research purposes only.
        </p>
        <p>
          East-West Africa Link is not a government agency, embassy, consulate, immigration
          authority, or law firm and does not provide legal representation unless expressly stated
          otherwise. Government authorities have final authority over visas, permits, residence,
          entry, citizenship, immigration status, and related decisions.
        </p>
        <p>
          East-West Africa Link cannot guarantee visa approval, permit approval, admission into a
          country, processing times, government appointments, acceptance of documentation, or any
          other government decision. Customers remain responsible for confirming requirements with
          the appropriate official authority and for submitting complete and accurate
          applications.
        </p>
        <p className="font-semibold text-cocoa">Ghana Relocation and Right of Abode</p>
        <p>
          East-West Africa Link may provide research and informational consultations concerning
          relocation to Ghana, residence options, Right of Abode, citizenship-related pathways, and
          other Ghana immigration matters. Our role is to help customers understand publicly
          available requirements, procedures, terminology, documentation, and practical
          considerations.
        </p>
        <p>
          East-West Africa Link does not determine whether an individual qualifies for Right of
          Abode, residence, citizenship, or another immigration status and does not guarantee
          approval. Only the appropriate Ghanaian authorities can make those determinations.
          Customers should verify important requirements directly with the appropriate Ghanaian
          authority and seek advice from a qualified Ghanaian immigration attorney or other
          appropriately licensed professional where necessary.
        </p>
      </LegalSection>

      <LegalSection id="business-property" heading="5. Business, Investment, Land & Property Information">
        <p>
          East-West Africa Link may provide informational research relating to business
          registration, permits, work authorization, investment requirements, foreign ownership,
          land and property procedures, relocation, and establishing or operating a business. This
          information is educational and informational in nature.
        </p>
        <p>
          East-West Africa Link is not acting as your attorney, accountant, tax adviser, investment
          adviser, financial adviser, or real-estate broker. Before investing money, purchasing or
          leasing land, establishing a business, entering into a contract, or making another
          significant financial or legal commitment, customers should obtain appropriate
          independent professional advice in the country concerned.
        </p>
      </LegalSection>

      <LegalSection id="guide-match" heading="6. Independent Local Guide Match">
        <p>
          East-West Africa Link may introduce travelers to independent local guides and other
          independent service providers. These individuals are independent service providers and
          are not employees, agents, partners, or representatives of East-West Africa Link unless
          expressly stated otherwise.
        </p>
        <p>
          Our Guide Match service is a matching and introduction service. We may consider
          destination, experience, language, customer interests, availability, and other relevant
          information when making an introduction. A match or introduction does not constitute a
          guarantee or warranty regarding a guide or the services ultimately provided. The
          traveler is responsible for deciding whether to engage a particular guide.
        </p>
        <p>
          Unless expressly stated otherwise, guide fees are separate from any East-West Africa
          Link matching fee and are agreed upon and paid directly between the traveler and the
          guide.
        </p>
        <p className="font-semibold text-cocoa">
          Any agreement for guiding services is between the traveler and the independent guide
          unless East-West Africa Link expressly states otherwise in writing.
        </p>
        <p>
          East-West Africa Link does not control an independent guide's conduct, availability,
          performance, transportation, pricing, or services.
        </p>
      </LegalSection>

      <LegalSection id="transportation" heading="7. Transportation, Routes & Border Crossings">
        <p>
          East-West Africa Link may provide practical information concerning buses, minibuses,
          shared taxis, trains, ferries, motorcycles, boats, overland routes, border crossings, and
          other forms of transportation. Schedules, departure locations, fares, operators, road
          conditions, border procedures, and operating hours may change without notice.
        </p>
        <p>
          Information represents the best information reasonably available to us when the
          research or guidance is prepared. Customers are responsible for reconfirming critical
          transportation and border information before travel. East-West Africa Link does not
          operate or control third-party transportation providers or border authorities.
        </p>
      </LegalSection>

      <LegalSection id="travel-planner-audit" heading="8. Travel Planner & Travel Audit Services">
        <p>
          Customers may purchase personalized travel-planning, route-planning, itinerary-review,
          or Travel Audit services. We may review matters including route practicality,
          transportation connections, travel times, border crossings, visa considerations,
          scheduling, geographic routing, potential logistical problems, and alternative options.
        </p>
        <p>
          Our recommendations represent our assessment based on information reasonably available
          at the time the service is provided. They do not guarantee that a journey or itinerary
          will operate exactly as planned. Customers remain responsible for their final travel
          decisions.
        </p>
      </LegalSection>

      <LegalSection id="customer-responsibilities" heading="9. Customer Responsibilities">
        <p>
          Travel involves uncertainty and risk, and customers remain responsible for evaluating
          whether a destination, activity, transportation method, route, accommodation, guide,
          border crossing, or other service is appropriate for them.
        </p>
        <p>
          Customers are responsible for maintaining valid travel documents, obtaining necessary
          visas and permits, complying with entry and exit requirements, reviewing official travel
          advisories, obtaining appropriate health advice and travel insurance, confirming
          transportation and accommodation, protecting personal belongings, following local laws,
          and making appropriate personal safety decisions.
        </p>
        <p>
          Customers purchasing personalized services must also provide complete and accurate
          information. East-West Africa Link is not responsible for inaccurate guidance that
          results from materially incomplete, incorrect, or outdated information supplied by a
          customer.
        </p>
      </LegalSection>

      <LegalSection id="health-safety" heading="10. Health, Safety & Travel Advisories">
        <p>
          East-West Africa Link does not provide medical advice. Any health, vaccination,
          medication, disease, or travel-health information we provide is general information
          only. Travelers should consult qualified healthcare professionals and appropriate
          public-health authorities before traveling.
        </p>
        <p>
          Conditions can vary substantially within destinations and can change quickly.
          East-West Africa Link does not guarantee that any destination, neighborhood, route,
          transportation method, accommodation, guide, or activity is safe. Travelers should
          review current government travel advisories and other reliable sources and make their
          own decisions regarding travel and personal safety.
        </p>
      </LegalSection>

      <LegalSection id="third-party" heading="11. Third-Party Websites & Services">
        <p>
          Our website or personalized guidance may refer or link to government agencies,
          transportation providers, accommodation providers, guides, businesses, tour operators,
          or other third parties. These references are provided for convenience and informational
          purposes.
        </p>
        <p>
          East-West Africa Link does not control third-party websites or services and is not
          responsible for their content, accuracy, availability, pricing, policies, privacy
          practices, performance, or conduct. A reference or link does not necessarily constitute
          an endorsement.
        </p>
      </LegalSection>

      <LegalSection id="payments" heading="12. Paid Services, Cancellations & Refunds">
        <p>
          The price and scope of a paid service will be displayed on the website or otherwise
          communicated before purchase. Customers are responsible for reviewing the service
          description before purchasing.
        </p>
        <p>
          Payment purchases the research, consultation, planning, matching, review, or other
          service described at the time of purchase. It does not guarantee a particular travel,
          immigration, business, relocation, government, or other outcome.
        </p>
        <p>
          Because many services involve personalized work, research or preparation may begin
          shortly after an order is received. Unless a different policy is stated for a particular
          service, a customer may request cancellation before personalized work has begun. Once
          substantial personalized research, consultation preparation, itinerary analysis, guide
          matching, or another customized service has begun or has been delivered, fees may become
          non-refundable to the extent permitted by applicable law.
        </p>
        <p>
          If East-West Africa Link is unable to provide a purchased service, an appropriate refund
          or alternative resolution will be offered. Nothing in these Terms limits any
          non-waivable rights available under applicable consumer-protection law. See our{' '}
          <a href="/refund-policy" className="text-copper hover:underline">
            Refund &amp; Cancellation Policy
          </a>{' '}
          for further detail.
        </p>
      </LegalSection>

      <LegalSection id="no-guarantee" heading="13. No Guarantee of Results">
        <p>
          East-West Africa Link provides information, research, guidance, planning assistance, and
          connections. We do not guarantee particular outcomes, including successful travel, visa
          or permit approval, entry into a country, successful border crossing, transportation
          availability, guide availability or performance, successful relocation, business
          registration, investment outcomes, property transactions, or government decisions.
        </p>
        <p>Customers retain responsibility for their own decisions and actions.</p>
      </LegalSection>

      <LegalSection id="liability" heading="14. Limitation of Liability">
        <p>
          To the fullest extent permitted by applicable law, East-West Africa Link LLC and its
          owners, officers, employees, contractors, and representatives will not be liable for
          indirect, incidental, special, consequential, or similar damages arising from use of the
          website, information, research, guidance, recommendations, introductions, or services.
        </p>
        <p>
          This may include losses relating to transportation disruption, missed connections,
          denied entry, government decisions, third-party conduct, border closures, schedule
          changes, loss of property, or reliance on information that changed after it was
          provided. Nothing in these Terms excludes or limits liability that cannot legally be
          excluded or limited.
        </p>
      </LegalSection>

      <LegalSection id="force-majeure" heading="15. Events Beyond Our Control">
        <p>
          East-West Africa Link is not responsible for failure, delay, disruption, or changes
          caused by circumstances reasonably outside our control. These may include government
          action, border closures, war, civil unrest, strikes, natural disasters, severe weather,
          public-health emergencies, transportation cancellations, internet or telecommunications
          outages, or changes in laws and regulations.
        </p>
      </LegalSection>

      <LegalSection id="ip" heading="16. Intellectual Property">
        <p>
          Unless otherwise indicated, original written content, research, guides, graphics,
          branding, service descriptions, and other original materials created by East-West Africa
          Link are owned by or licensed to East-West Africa Link.
        </p>
        <p>
          Materials purchased or received through our services are intended for the customer's
          personal use unless otherwise authorized. Customers may not reproduce, republish,
          resell, distribute, or commercially exploit proprietary East-West Africa Link materials
          without prior written permission.
        </p>
      </LegalSection>

      <LegalSection id="privacy-use" heading="17. Privacy & Website Use">
        <p>
          Personal information submitted through forms, purchases, consultations, or
          communications will be handled in accordance with our{' '}
          <a href="/privacy-policy" className="text-copper hover:underline">
            Privacy Policy
          </a>
          . Customers should avoid sending sensitive personal information unless it is reasonably
          necessary for the requested service. East-West Africa Link will never request
          unnecessary passwords or account credentials.
        </p>
        <p>
          We attempt to keep our website available and functioning but cannot guarantee
          uninterrupted access. Website content, services, prices, and policies may be updated
          from time to time. For a purchased service, the Terms in effect at the time of purchase
          will generally govern that transaction, subject to applicable law.
        </p>
      </LegalSection>

      <LegalSection id="governing-law" heading="18. Governing Law">
        <p>
          To the extent permitted by applicable law, these Terms are governed by the laws of the
          State of Washington, United States, without regard to conflict-of-law principles.
          Nothing in these Terms is intended to eliminate consumer rights that cannot legally be
          waived.
        </p>
      </LegalSection>

      <LegalSection id="severability" heading="19. Severability & Entire Agreement">
        <p>
          If any provision of these Terms is found invalid or unenforceable, the remaining
          provisions will continue in effect to the fullest extent permitted by law.
        </p>
        <p>
          These Terms, together with any applicable service description, Privacy Policy, Refund
          Policy, Disclaimer, and other policies expressly incorporated into them, constitute the
          agreement between the customer and East-West Africa Link concerning the relevant website
          or service.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="20. Contact">
        <p>
          Questions regarding these Terms or an East-West Africa Link service may be submitted
          using the contact information displayed on our website.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
