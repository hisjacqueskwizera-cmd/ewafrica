import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { TOUR_GUIDE_PAGES } from '../../data/siteContent.js'
import { StepProgress } from '../../components/tour-guide-application/StepChrome.jsx'
import { useGuideApplicationFlow } from '../../context/GuideApplicationFlowContext.jsx'
import { APPLICATION_STEPS, TOTAL_STEPS } from './stepRegistry.js'
import { IneligibleNotice } from './IneligibleNotice.jsx'

export function ApplicationStep() {
  const { slug, stepNumber } = useParams()
  const navigate = useNavigate()
  const countryData = TOUR_GUIDE_PAGES[slug]
  const { ineligible } = useGuideApplicationFlow()

  const stepEntry = APPLICATION_STEPS.find((s) => s.number === Number(stepNumber))

  useEffect(() => {
    if (countryData && stepEntry) {
      document.title = `${stepEntry.title} — Tour Guide Application | East-West Africa Link`
    }
  }, [countryData, stepEntry])

  if (!countryData) return <Navigate to="/independent-tour-guide" replace />
  if (ineligible) return <IneligibleNotice />
  if (!stepEntry) return <Navigate to={`/independent-tour-guide/${slug}/apply/step/1`} replace />

  const { Component, title, purpose, number } = stepEntry

  const goNext = () => {
    if (number < APPLICATION_STEPS.length) {
      navigate(`/independent-tour-guide/${slug}/apply/step/${number + 1}`)
    } else {
      navigate(`/independent-tour-guide/${slug}/apply/review`)
    }
    window.scrollTo(0, 0)
  }

  const goBack = () => {
    if (number > 1) {
      navigate(`/independent-tour-guide/${slug}/apply/step/${number - 1}`)
    } else {
      navigate(`/independent-tour-guide/${slug}/apply`)
    }
    window.scrollTo(0, 0)
  }

  return (
    <section className="py-10 lg:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <StepProgress current={number} total={TOTAL_STEPS} title={title} purpose={purpose} />
        <Component onNext={goNext} onBack={goBack} />
      </div>
    </section>
  )
}
