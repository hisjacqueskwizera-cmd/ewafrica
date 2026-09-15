import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { ScrollManager } from './components/ScrollManager.jsx'
import { TravelPlannerFlowProvider } from './context/TravelPlannerFlowContext.jsx'
import { PLACEHOLDER_PAGES } from './data/siteContent.js'
import { AboutUs } from './pages/AboutUs.jsx'
import { Explore } from './pages/Explore.jsx'
import { Home } from './pages/Home.jsx'
import { Placeholder } from './pages/Placeholder.jsx'
import { Tanzania } from './pages/Tanzania.jsx'
import { TravelPlanner } from './pages/TravelPlanner.jsx'
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
          <Route path="/ghana" element={<Placeholder {...PLACEHOLDER_PAGES.ghana} />} />
          <Route path="/tanzania" element={<Tanzania />} />
          <Route path="/travel-planner" element={<TravelPlanner />} />
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
