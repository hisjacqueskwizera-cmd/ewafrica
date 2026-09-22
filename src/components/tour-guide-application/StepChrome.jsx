import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Reveal } from '../Reveal.jsx'

// Short labels for the numbered stepper — one entry per step (1–8 are the
// form steps, 9 is the review/submit page). Kept short on purpose since
// all 9 need to sit comfortably in a grid at phone widths.
export const STEP_LABELS = [
  'Applicant Info',
  'Experience',
  'Specialties',
  'Languages',
  'Licenses',
  'Safety',
  'References',
  'Documents',
  'Review & Submit',
]

/**
 * The numbered step indicator every step page (and the review page) shows
 * at the top — a circle + label per step, not just "Step X of 9". Laid out
 * as a full-width responsive grid (3 columns on phones, 5 on tablets, all 9
 * across on desktop) rather than a single scrolling row — a fixed-width
 * horizontal row either overflowed and got clipped at the screen edges on
 * phones, or needed a scrollbar that hid steps off-screen; the grid always
 * shows every step, uncropped, using the full width available to it.
 * Rendered full-bleed by the page (outside the narrower column the actual
 * form fields sit in) — see ApplicationStep.jsx / ReviewAnswers.jsx.
 */
export function StepProgress({ current, total, title, purpose }) {
  return (
    <Reveal className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <ol className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-5 lg:grid-cols-9">
        {STEP_LABELS.map((label, i) => {
          const step = i + 1
          const done = step < current
          const active = step === current
          return (
            <li key={label} className="flex flex-col items-center gap-1.5 text-center">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold sm:size-9 ${
                  done
                    ? 'bg-forest text-primary-foreground'
                    : active
                      ? 'bg-copper text-copper-foreground'
                      : 'bg-border text-muted-foreground'
                }`}
              >
                {done ? <Check className="size-4" aria-hidden="true" /> : step}
              </span>
              <span
                className={`text-[11px] font-semibold leading-tight sm:text-xs ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
            </li>
          )
        })}
      </ol>

      <div className="mt-6 text-center">
        <h1 className="text-xl font-bold text-primary sm:text-2xl">{title}</h1>
        {purpose && <p className="mt-1 text-sm text-muted-foreground">{purpose}</p>}
      </div>
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
