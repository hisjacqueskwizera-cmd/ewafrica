import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { ScrollManager } from './components/ScrollManager.jsx'
import { BeforeYouBookFlowProvider } from './context/BeforeYouBookFlowContext.jsx'
import { BorderCrossingFlowProvider } from './context/BorderCrossingFlowContext.jsx'
import { LandPropertyFlowProvider } from './context/LandPropertyFlowContext.jsx'
import { RelocationFlowProvider } from './context/RelocationFlowContext.jsx'
import { RightOfAbodeFlowProvider } from './context/RightOfAbodeFlowContext.jsx'
import { TravelAuditFlowProvider } from './context/TravelAuditFlowContext.jsx'
import { TravelPlannerFlowProvider } from './context/TravelPlannerFlowContext.jsx'
import { VisaGuidanceFlowProvider } from './context/VisaGuidanceFlowContext.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Benin } from './pages/Benin.jsx'
import { BeforeYouBookCheck } from './pages/BeforeYouBookCheck.jsx'
import { BorderCrossingGuide } from './pages/BorderCrossingGuide.jsx'
import { Explore } from './pages/Explore.jsx'
import { Gambia } from './pages/Gambia.jsx'
import { Ghana } from './pages/Ghana.jsx'
import { Home } from './pages/Home.jsx'
import { IndependentTourGuide } from './pages/IndependentTourGuide.jsx'
import { IndependentTourGuideCountry } from './pages/IndependentTourGuideCountry.jsx'
import { LandPropertyGuidance } from './pages/LandPropertyGuidance.jsx'
import { Malawi } from './pages/Malawi.jsx'
import { PersonalVisaGuidance } from './pages/PersonalVisaGuidance.jsx'
import { Placeholder } from './pages/Placeholder.jsx'
import { RelocationFullDetails } from './pages/RelocationFullDetails.jsx'
import { RelocationPackage } from './pages/RelocationPackage.jsx'
import { RightOfAbodeGuidance } from './pages/RightOfAbodeGuidance.jsx'
import { Rwanda } from './pages/Rwanda.jsx'
import { Senegal } from './pages/Senegal.jsx'
import { Tanzania } from './pages/Tanzania.jsx'
import { TravelAudit } from './pages/TravelAudit.jsx'
import { TravelPlanner } from './pages/TravelPlanner.jsx'
import { TravelPlannerServiceDetails } from './pages/TravelPlannerServiceDetails.jsx'
import { Uganda } from './pages/Uganda.jsx'
import { Zambia } from './pages/Zambia.jsx'
import { Confirmation as BeforeYouBookConfirmation } from './pages/before-you-book/Confirmation.jsx'
import { Payment as BeforeYouBookPayment } from './pages/before-you-book/Payment.jsx'
import { RequestForm as BeforeYouBookRequestForm } from './pages/before-you-book/RequestForm.jsx'
import { ReviewAnswers as BeforeYouBookReviewAnswers } from './pages/before-you-book/ReviewAnswers.jsx'
import { Confirmation } from './pages/travel-planner/Confirmation.jsx'
import { Payment } from './pages/travel-planner/Payment.jsx'
import { RequestForm } from './pages/travel-planner/RequestForm.jsx'
import { ReviewAnswers } from './pages/travel-planner/ReviewAnswers.jsx'
import { Confirmation as TravelAuditConfirmation } from './pages/travel-audit/Confirmation.jsx'
import { Payment as TravelAuditPayment } from './pages/travel-audit/Payment.jsx'
import { RequestForm as TravelAuditRequestForm } from './pages/travel-audit/RequestForm.jsx'
import { ReviewAnswers as TravelAuditReviewAnswers } from './pages/travel-audit/ReviewAnswers.jsx'
import { Confirmation as BorderCrossingConfirmation } from './pages/border-crossing/Confirmation.jsx'
import { Payment as BorderCrossingPayment } from './pages/border-crossing/Payment.jsx'
import { RequestForm as BorderCrossingRequestForm } from './pages/border-crossing/RequestForm.jsx'
import { ReviewAnswers as BorderCrossingReviewAnswers } from './pages/border-crossing/ReviewAnswers.jsx'
import { Confirmation as LandPropertyConfirmation } from './pages/land-property/Confirmation.jsx'
import { Payment as LandPropertyPayment } from './pages/land-property/Payment.jsx'
import { RequestForm as LandPropertyRequestForm } from './pages/land-property/RequestForm.jsx'
import { ReviewAnswers as LandPropertyReviewAnswers } from './pages/land-property/ReviewAnswers.jsx'
import { Confirmation as RightOfAbodeConfirmation } from './pages/right-of-abode/Confirmation.jsx'
import { Payment as RightOfAbodePayment } from './pages/right-of-abode/Payment.jsx'
import { RequestForm as RightOfAbodeRequestForm } from './pages/right-of-abode/RequestForm.jsx'
import { ReviewAnswers as RightOfAbodeReviewAnswers } from './pages/right-of-abode/ReviewAnswers.jsx'
import { Confirmation as RelocationConfirmation } from './pages/relocation/Confirmation.jsx'
import { Payment as RelocationPayment } from './pages/relocation/Payment.jsx'
import { RequestForm as RelocationRequestForm } from './pages/relocation/RequestForm.jsx'
import { ReviewAnswers as RelocationReviewAnswers } from './pages/relocation/ReviewAnswers.jsx'
import { Confirmation as VisaGuidanceConfirmation } from './pages/visa-guidance/Confirmation.jsx'
import { Payment as VisaGuidancePayment } from './pages/visa-guidance/Payment.jsx'
import { RequestForm as VisaGuidanceRequestForm } from './pages/visa-guidance/RequestForm.jsx'
import { ReviewAnswers as VisaGuidanceReviewAnswers } from './pages/visa-guidance/ReviewAnswers.jsx'

// The request wizard (reached via "View Details" on the Travel Planner
// card, which goes straight to the request form — the separate service-
// details/pricing-tiles step that used to sit in front of it is gone)
// shares one TravelPlannerFlowProvider so the form data entered in the
// request step is still there when Review/Payment/Confirmation read it
// back — the provider wraps only these routes, not the whole app, since
// nothing outside this flow needs that state.
function TravelPlannerFlowRoutes() {
  return (
    <TravelPlannerFlowProvider>
      <Routes>
        <Route path="request" element={<RequestForm />} />
        <Route path="review" element={<ReviewAnswers />} />
        <Route path="payment" element={<Payment />} />
        <Route path="confirmation" element={<Confirmation />} />
      </Routes>
    </TravelPlannerFlowProvider>
  )
}

// The Before You Book Check request wizard — a second, independent flow
// alongside TravelPlannerFlowRoutes above, reached from its own service
// detail page (BeforeYouBookCheck.jsx) rather than from the Travel
// Planner wizard's request step. Same shape, own provider, own state.
function BeforeYouBookFlowRoutes() {
  return (
    <BeforeYouBookFlowProvider>
      <Routes>
        <Route path="request" element={<BeforeYouBookRequestForm />} />
        <Route path="review" element={<BeforeYouBookReviewAnswers />} />
        <Route path="payment" element={<BeforeYouBookPayment />} />
        <Route path="confirmation" element={<BeforeYouBookConfirmation />} />
      </Routes>
    </BeforeYouBookFlowProvider>
  )
}

// The Travel Audit request wizard — a third independent flow alongside
// TravelPlannerFlowRoutes and BeforeYouBookFlowRoutes above, reached from
// its own service detail page (TravelAudit.jsx). Same shape, own
// provider, own state.
function TravelAuditFlowRoutes() {
  return (
    <TravelAuditFlowProvider>
      <Routes>
        <Route path="request" element={<TravelAuditRequestForm />} />
        <Route path="review" element={<TravelAuditReviewAnswers />} />
        <Route path="payment" element={<TravelAuditPayment />} />
        <Route path="confirmation" element={<TravelAuditConfirmation />} />
      </Routes>
    </TravelAuditFlowProvider>
  )
}

// The Border Crossing Guide request wizard — a fourth independent flow
// alongside the three above, reached from its own service detail page
// (BorderCrossingGuide.jsx). Same shape, own provider, own state.
function BorderCrossingFlowRoutes() {
  return (
    <BorderCrossingFlowProvider>
      <Routes>
        <Route path="request" element={<BorderCrossingRequestForm />} />
        <Route path="review" element={<BorderCrossingReviewAnswers />} />
        <Route path="payment" element={<BorderCrossingPayment />} />
        <Route path="confirmation" element={<BorderCrossingConfirmation />} />
      </Routes>
    </BorderCrossingFlowProvider>
  )
}

// Ghana's Land & Property Guidance request wizard — a fifth independent
// flow alongside the four above, reached from its own service detail page
// (LandPropertyGuidance.jsx). Same shape, own provider, own state; unlike
// the others this one is Ghana-only, so there's no destination picker.
function LandPropertyFlowRoutes() {
  return (
    <LandPropertyFlowProvider>
      <Routes>
        <Route path="request" element={<LandPropertyRequestForm />} />
        <Route path="review" element={<LandPropertyReviewAnswers />} />
        <Route path="payment" element={<LandPropertyPayment />} />
        <Route path="confirmation" element={<LandPropertyConfirmation />} />
      </Routes>
    </LandPropertyFlowProvider>
  )
}

// Ghana's Right of Abode Guidance questionnaire wizard — a sixth
// independent flow, reached from its own service detail page
// (RightOfAbodeGuidance.jsx). Same shape as LandPropertyFlowRoutes above:
// Ghana-only, own provider, own state.
function RightOfAbodeFlowRoutes() {
  return (
    <RightOfAbodeFlowProvider>
      <Routes>
        <Route path="request" element={<RightOfAbodeRequestForm />} />
        <Route path="review" element={<RightOfAbodeReviewAnswers />} />
        <Route path="payment" element={<RightOfAbodePayment />} />
        <Route path="confirmation" element={<RightOfAbodeConfirmation />} />
      </Routes>
    </RightOfAbodeFlowProvider>
  )
}

// Ghana's Complete Relocation Package request wizard — a seventh
// independent flow, reached from the Full Package Details page
// (RelocationFullDetails.jsx), not the summary landing page
// (RelocationPackage.jsx) directly. Same shape as the other Ghana Exclusive
// flows: Ghana-only, own provider, own state.
function RelocationFlowRoutes() {
  return (
    <RelocationFlowProvider>
      <Routes>
        <Route path="request" element={<RelocationRequestForm />} />
        <Route path="review" element={<RelocationReviewAnswers />} />
        <Route path="payment" element={<RelocationPayment />} />
        <Route path="confirmation" element={<RelocationConfirmation />} />
      </Routes>
    </RelocationFlowProvider>
  )
}

// Personal Visa Guidance — the one service on this list reached via a
// `:slug` route param rather than its own fixed URL, since the same flow
// serves every country's page (see the note on VisaGuidanceFlowContext).
// VisaGuidanceFlowProvider reads that param itself via useParams(), so it
// only needs to sit above these four step routes, not the whole app.
function VisaGuidanceFlowRoutes() {
  return (
    <VisaGuidanceFlowProvider>
      <Routes>
        <Route path="request" element={<VisaGuidanceRequestForm />} />
        <Route path="review" element={<VisaGuidanceReviewAnswers />} />
        <Route path="payment" element={<VisaGuidancePayment />} />
        <Route path="confirmation" element={<VisaGuidanceConfirmation />} />
      </Routes>
    </VisaGuidanceFlowProvider>
  )
}

function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/ghana" element={<Ghana />} />
          <Route path="/tanzania" element={<Tanzania />} />
          <Route path="/malawi" element={<Malawi />} />
          <Route path="/zambia" element={<Zambia />} />
          <Route path="/uganda" element={<Uganda />} />
          <Route path="/rwanda" element={<Rwanda />} />
          <Route path="/senegal" element={<Senegal />} />
          <Route path="/benin" element={<Benin />} />
          <Route path="/gambia" element={<Gambia />} />
          <Route path="/independent-tour-guide" element={<IndependentTourGuide />} />
          <Route
            path="/independent-tour-guide/:slug"
            element={<IndependentTourGuideCountry />}
          />
          <Route path="/travel-planner" element={<TravelPlanner />} />
          <Route
            path="/travel-planner/service-details"
            element={<TravelPlannerServiceDetails />}
          />
          <Route path="/travel-planner/before-you-book-check" element={<BeforeYouBookCheck />} />
          <Route
            path="/travel-planner/before-you-book-check/*"
            element={<BeforeYouBookFlowRoutes />}
          />
          <Route path="/travel-planner/travel-audit" element={<TravelAudit />} />
          <Route path="/travel-planner/travel-audit/*" element={<TravelAuditFlowRoutes />} />
          <Route path="/travel-planner/border-crossing-guide" element={<BorderCrossingGuide />} />
          <Route
            path="/travel-planner/border-crossing-guide/*"
            element={<BorderCrossingFlowRoutes />}
          />
          <Route path="/travel-planner/*" element={<TravelPlannerFlowRoutes />} />
          <Route path="/ghana/land-property-guidance" element={<LandPropertyGuidance />} />
          <Route path="/ghana/land-property-guidance/*" element={<LandPropertyFlowRoutes />} />
          <Route path="/ghana/right-of-abode-guidance" element={<RightOfAbodeGuidance />} />
          <Route path="/ghana/right-of-abode-guidance/*" element={<RightOfAbodeFlowRoutes />} />
          <Route path="/ghana/complete-relocation-package" element={<RelocationPackage />} />
          <Route
            path="/ghana/complete-relocation-package/full-details"
            element={<RelocationFullDetails />}
          />
          <Route path="/ghana/complete-relocation-package/*" element={<RelocationFlowRoutes />} />
          <Route path="/personal-visa-guidance/:slug" element={<PersonalVisaGuidance />} />
          <Route path="/personal-visa-guidance/:slug/*" element={<VisaGuidanceFlowRoutes />} />
          <Route
            path="*"
            element={
              <Placeholder
                eyebrow="Not Found"
                heading="Page Not Found"
                body="The page you're looking for doesn't exist. Let's get you back on route."
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
