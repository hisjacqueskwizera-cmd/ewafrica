import { CircleCheckBig, Download, Home, Mail } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { TOUR_GUIDE_PAGES } from '../../data/siteContent.js'
import { Reveal } from '../../components/Reveal.jsx'
import { useGuideApplicationFlow } from '../../context/GuideApplicationFlowContext.jsx'
import { generateApplicationPdf } from '../../lib/generateApplicationPdf.js'

export function Confirmation() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const countryData = TOUR_GUIDE_PAGES[slug]
  const { data, submission, reset } = useGuideApplicationFlow()

  useEffect(() => {
    document.title = 'Application Received | East-West Africa Link'
  }, [])

  // Reached without actually submitting (direct link, refresh after the
  // in-memory context reset) — send back to the start of this country's
  // application rather than showing a confirmation for nothing.
  useEffect(() => {
    if (!submission && countryData) {
      navigate(`/independent-tour-guide/${slug}/apply`, { replace: true })
    }
  }, [submission, countryData, slug, navigate])

  if (!countryData) return <Navigate to="/independent-tour-guide" replace />
  if (!submission) return null

  const handleDownload = () => {
    generateApplicationPdf({
      data,
      referenceNumber: submission.referenceNumber,
      submittedAt: submission.submittedAt,
      countryLabel: countryData.countryLabel,
    })
  }

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-forest text-primary-foreground">
            <CircleCheckBig className="size-8" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-primary sm:text-3xl">Application Received</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Thank you for applying to join the East-West Africa Link Independent Tour Guide
            Network. We will review your application, supporting documents, and references.
            Submission does not guarantee acceptance or customer referrals. We will contact you by
            email if additional information or an interview is required.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 rounded-2xl border border-border bg-card p-6 text-left sm:p-8">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="font-semibold text-primary">Application reference:</dt>
              <dd className="font-bold text-copper">{submission.referenceNumber}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="font-semibold text-primary">Country:</dt>
              <dd>{countryData.countryLabel}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-semibold text-primary">Submitted:</dt>
              <dd>{new Date(submission.submittedAt).toLocaleString()}</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-cream p-4 text-xs leading-relaxed text-muted-foreground">
            <Mail className="mt-0.5 size-4 shrink-0 text-copper" aria-hidden="true" />
            <p>
              A copy of this confirmation and your reference number will be sent to{' '}
              <span className="font-semibold text-primary">{data.email || 'your email address'}</span>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={handleDownload} className="btn-copper justify-center">
            <Download className="size-4" aria-hidden="true" />
            Download Application as PDF
          </button>
          <Link to="/" onClick={reset} className="btn-outline-dark justify-center">
            <Home className="size-4" aria-hidden="true" />
            Return to Home
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
