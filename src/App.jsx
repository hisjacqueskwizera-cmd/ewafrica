import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { ScrollManager } from './components/ScrollManager.jsx'
import { BeforeYouBookFlowProvider } from './context/BeforeYouBookFlowContext.jsx'
import { TravelPlannerFlowProvider } from './context/TravelPlannerFlowContext.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Benin } from './pages/Benin.jsx'
import { BeforeYouBookCheck } from './pages/BeforeYouBookCheck.jsx'
import { Explore } from './pages/Explore.jsx'
import { Gambia } from './pages/Gambia.jsx'
import { Ghana } from './pages/Ghana.jsx'
import { Home } from './pages/Home.jsx'
import { Malawi } from './pages/Malawi.jsx'
import { Placeholder } from './pages/Placeholder.jsx'
import { Rwanda } from './pages/Rwanda.jsx'
import { Senegal } from './pages/Senegal.jsx'
import { Tanzania } from './pages/Tanzania.jsx'
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
          <Route path="/travel-planner/*" element={<TravelPlannerFlowRoutes />} />
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
