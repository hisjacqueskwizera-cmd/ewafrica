import { Home, ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../../components/Reveal.jsx'

export function IneligibleNotice() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-cocoa text-primary-foreground">
            <ShieldAlert className="size-8" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-primary sm:text-3xl">
            You Must Be at Least 18 Years Old
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            The East-West Africa Link Independent Tour Guide Network requires applicants to be at
            least 18 years old. Based on your answer, you are not currently eligible to apply.
          </p>
          <Link to="/" className="btn-outline-dark mt-8 inline-flex">
            <Home className="size-4" aria-hidden="true" />
            Return to Home
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
