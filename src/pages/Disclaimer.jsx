import { LegalPage, LegalSection } from '../components/LegalPage.jsx'

const SECTIONS = [
  { id: 'general-information', label: '1. General Information & Changing Conditions' },
  { id: 'independent-service', label: '2. Independent Information Service' },
  { id: 'visa-immigration', label: '3. Visa, Immigration & Permit Information' },
  { id: 'travel-planner', label: '4. Travel Planner, Transportation & Border Crossings' },
  { id: 'travel-audit', label: '5. Travel Audit & Itinerary Review' },
  { id: 'local-guides', label: '6. Independent Local Guides' },
  { id: 'relocation-business', label: '7. Relocation, Business, Investment & Property' },
  { id: 'health-safety', label: '8. Travel Safety & Health' },
  { id: 'third-party', label: '9. Third-Party Services & Websites' },
  { id: 'no-guarantee', label: '10. No Guarantee of Results' },
  { id: 'research-dates', label: '11. Research Dates, Prices & Estimates' },
  { id: 'liability', label: '12. Limitation of Liability' },
  { id: 'contact', label: '13. Contact' },
]

export function Disclaimer() {
  return (
    <LegalPage
      title="Website Disclaimer"
      effectiveDate="September 23, 2026"
      lastUpdated="September 23, 2026"
      sections={SECTIONS}
    >
      <p className="mb-8 text-[15px] leading-[1.7] text-primary/90 lg:text-base">
        East-West Africa Link LLC ("East-West Africa Link," "we," "us," or "our") provides
        independent travel information, research, guidance, planning assistance, and connections
        relating primarily to East and West Africa. By using this website or purchasing our
        services, you acknowledge the following.
      </p>

      <LegalSection id="general-information" heading="1. General Information & Changing Conditions">
        <p>
          We make reasonable efforts to provide practical and current information based on sources
          reasonably available at the time of publication or research.
        </p>
        <p>
          However, travel conditions, government requirements, transportation schedules, fares,
          border procedures, visa rules, laws, regulations, fees, security conditions, and other
          circumstances may change without notice. East-West Africa Link does not guarantee that
          information will remain complete, current, or applicable to every individual situation.
        </p>
        <p>
          Customers should independently confirm critical information before making important
          travel, immigration, legal, business, financial, or property decisions.
        </p>
      </LegalSection>

      <LegalSection id="independent-service" heading="2. Independent Information Service">
        <p>
          East-West Africa Link is an independent information, research, guidance, planning, and
          connection service. Unless expressly stated otherwise, we are not a travel agency, tour
          operator, transportation company, government agency, embassy, consulate, immigration
          authority, law firm, accounting firm, investment adviser, financial adviser, or
          real-estate brokerage.
        </p>
        <p>
          Third-party organizations, guides, transportation providers, businesses, accommodation
          providers, government agencies, and other service providers remain responsible for their
          own services and decisions.
        </p>
      </LegalSection>

      <LegalSection id="visa-immigration" heading="3. Visa, Immigration & Permit Information">
        <p>
          East-West Africa Link may provide general information and personalized research
          concerning visas, entry requirements, residence permits, work permits, business permits,
          investor permits, and related immigration matters. This information is provided for
          informational and research purposes only and does not constitute legal advice or legal
          representation.
        </p>
        <p>
          Only the appropriate government authority can determine eligibility, approve or refuse
          visas or permits, grant immigration status, or authorize entry into a country.
          East-West Africa Link does not guarantee visa or permit approval, entry, immigration
          status, government processing times, or other official decisions. Customers should
          confirm important requirements directly with the appropriate government authority.
        </p>
        <p className="font-semibold text-cocoa">Ghana Relocation and Right of Abode</p>
        <p>
          East-West Africa Link may provide informational research and consultations concerning
          relocation to Ghana, residence options, Right of Abode, citizenship-related pathways, and
          related matters. We are not affiliated with the Ghana Immigration Service or another
          Ghanaian government authority and do not determine eligibility for Right of Abode,
          residence, citizenship, or any other immigration status. Only the appropriate Ghanaian
          authorities can make those determinations. Customers should verify requirements with the
          relevant Ghanaian authority and seek qualified legal advice where necessary.
        </p>
      </LegalSection>

      <LegalSection id="travel-planner" heading="4. Travel Planner, Transportation & Border Crossings">
        <p>
          East-West Africa Link may provide personalized Travel Planner services and practical
          information concerning routes, buses, minibuses, shared taxis, trains, ferries, boats,
          motorcycles, local transportation, overland routes, and border crossings.
        </p>
        <p>
          Travel Planner recommendations are based on information reasonably available at the time
          the plan is prepared. Transportation schedules, fares, operators, departure locations,
          routes, journey times, border procedures, operating hours, road conditions, and
          availability may change without notice. East-West Africa Link does not own, operate,
          supervise, or control third-party transportation providers or border authorities.
          Travelers should reconfirm important transportation, route, and border information
          before travel.
        </p>
      </LegalSection>

      <LegalSection id="travel-audit" heading="5. Travel Audit & Itinerary Review">
        <p>
          East-West Africa Link may review customer-created itineraries through its Travel Audit
          or related services. Our review may identify potential routing problems, transportation
          issues, border considerations, visa or entry concerns, unrealistic travel times,
          scheduling concerns, or alternative options.
        </p>
        <p>
          A Travel Audit represents an informed assessment based on information reasonably
          available at the time of review. It does not guarantee that a proposed journey will
          proceed exactly as anticipated. Customers remain responsible for their final itinerary
          and travel decisions.
        </p>
      </LegalSection>

      <LegalSection id="local-guides" heading="6. Independent Local Guides">
        <p>
          East-West Africa Link may introduce travelers to independent local guides and other
          independent service providers. Unless expressly stated otherwise, these individuals are
          not employees, agents, partners, or representatives of East-West Africa Link. Our role
          is to research, match, introduce, and, where applicable, assist with initial
          coordination.
        </p>
        <p>
          Guide fees are separate from East-West Africa Link fees unless expressly stated
          otherwise and are generally agreed upon directly between the traveler and guide.
          Although we may take reasonable steps to evaluate potential guides, we cannot guarantee a
          guide's future conduct, availability, performance, safety, or suitability for every
          traveler. Customers remain responsible for deciding whether to engage a particular
          guide.
        </p>
      </LegalSection>

      <LegalSection id="relocation-business" heading="7. Relocation, Business, Investment & Property Information">
        <p>
          East-West Africa Link may provide informational research concerning relocation, business
          registration, permits, investment requirements, foreign ownership, land and property
          procedures, neighborhoods, and practical living considerations. This information is
          educational and informational in nature.
        </p>
        <p>
          We do not provide legal, tax, accounting, investment, securities, financial, surveying,
          title, or real-estate brokerage services. Before investing money, purchasing or leasing
          property, establishing a business, entering into contracts, or making significant
          financial or legal commitments, customers should conduct appropriate due diligence and
          obtain independent professional advice.
        </p>
      </LegalSection>

      <LegalSection id="health-safety" heading="8. Travel Safety & Health">
        <p>
          Travel involves uncertainty and risk. Political conditions, crime, civil unrest, weather,
          public-health events, road conditions, transportation conditions, and other circumstances
          may change rapidly. East-West Africa Link does not guarantee the safety of any
          destination, neighborhood, transportation method, border crossing, guide, route,
          accommodation, or activity.
        </p>
        <p>
          Travelers are responsible for reviewing current official travel advisories and making
          their own decisions concerning personal safety. East-West Africa Link does not provide
          medical advice. Any health, vaccination, disease, medication, insurance, or travel-health
          information is general information only. Travelers should consult appropriate healthcare
          professionals and public-health authorities regarding their individual needs.
        </p>
      </LegalSection>

      <LegalSection id="third-party" heading="9. Third-Party Services & Websites">
        <p>
          Our website, Travel Planner documents, research, or personalized guidance may contain
          references or links to government agencies, guides, transportation providers,
          accommodation providers, businesses, payment processors, or other third parties. These
          references are provided for convenience and informational purposes.
        </p>
        <p>
          East-West Africa Link does not control third-party websites or services and is not
          responsible for their content, accuracy, pricing, availability, privacy practices,
          policies, conduct, or performance.
        </p>
      </LegalSection>

      <LegalSection id="no-guarantee" heading="10. No Guarantee of Results">
        <p>
          East-West Africa Link provides information, research, guidance, planning assistance, and
          connections. We cannot guarantee any particular outcome, including:
        </p>
        <ul>
          <li>Visa or permit approval</li>
          <li>Admission into a country</li>
          <li>Successful border crossing</li>
          <li>Transportation availability</li>
          <li>Government processing times</li>
          <li>Successful relocation</li>
          <li>Business registration or approval</li>
          <li>Investment or property outcomes</li>
          <li>Guide availability or performance</li>
          <li>Completion of a Travel Planner itinerary or other journey exactly as planned</li>
        </ul>
        <p>Customers remain responsible for their own decisions and actions.</p>
      </LegalSection>

      <LegalSection id="research-dates" heading="11. Research Dates, Prices & Estimates">
        <p>
          Where appropriate, personalized research, Travel Planner documents, Travel Audits, or
          other reports may state "Information researched or verified as of: [date]." This
          indicates when the information was reviewed.
        </p>
        <p>
          Transportation fares, government fees, guide rates, exchange rates, accommodation
          prices, and other costs should generally be treated as estimates unless expressly
          identified as fixed. Customers should reconfirm significant prices, requirements, and
          other critical information before acting.
        </p>
      </LegalSection>

      <LegalSection id="liability" heading="12. Limitation of Liability">
        <p>
          To the fullest extent permitted by applicable law, East-West Africa Link LLC and its
          owners, officers, employees, contractors, and representatives will not be liable for
          indirect, incidental, special, consequential, or similar losses arising from reliance
          upon information, guidance, recommendations, introductions, Travel Planner services,
          Travel Audits, or other services provided through the website.
        </p>
        <p>Nothing in this Disclaimer excludes or limits liability that cannot legally be excluded or limited.</p>
      </LegalSection>

      <LegalSection id="contact" heading="13. Contact">
        <p>Questions regarding this Disclaimer may be directed to East-West Africa Link LLC using the contact details below.</p>
      </LegalSection>
    </LegalPage>
  )
}
