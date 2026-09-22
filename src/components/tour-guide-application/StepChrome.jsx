import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Reveal } from '../Reveal.jsx'

/** "Step 3 of 9" progress bar + step name/purpose, shared by every step page. */
export function StepProgress({ current, total, title, purpose }) {
  const pct = Math.round((current / total) * 100)
  return (
    <Reveal className="mb-8">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-copper">
        <span>
          Step {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-copper transition-all" style={{ width: `${pct}%` }} />
      </div>
      <h1 className="mt-4 text-xl font-bold text-primary sm:text-2xl">{title}</h1>
      {purpose && <p className="mt-1 text-sm text-muted-foreground">{purpose}</p>}
    </Reveal>
  )
}

/** Back / Continue footer shared by every step page. */
export function StepNav({ onBack, onNext, nextLabel = 'Continue', backLabel = 'Back' }) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      {onBack ? (
        <button type="button" onClick={onBack} className="btn-outline-dark justify-center">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      <button type="button" onClick={onNext} className="btn-copper justify-center">
        {nextLabel}
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
