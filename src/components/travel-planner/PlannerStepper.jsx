import { Check } from 'lucide-react'

/**
 * A 4-step progress bar (numbered circles joined by connecting lines) shown
 * at the top of the Before You Book Check wizard's four pages. The
 * (separate) Travel Planner flow doesn't have one of these — this is
 * specific to Before You Book Check's own reference design.
 */
export function PlannerStepper({ steps, current }) {
  return (
    <div className="mx-auto flex max-w-3xl items-start justify-between px-2">
      {steps.map((label, i) => {
        const step = i + 1
        const done = step < current
        const active = step === current
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2 text-center">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold sm:size-9 ${
                  done || active
                    ? 'bg-cocoa text-primary-foreground'
                    : 'bg-primary-foreground/15 text-primary-foreground/70'
                }`}
              >
                {done ? <Check className="size-4" aria-hidden="true" /> : step}
              </span>
              <span
                className={`max-w-20 text-[11px] font-semibold leading-tight sm:text-xs ${
                  active ? 'text-primary-foreground' : 'text-primary-foreground/70'
                }`}
              >
                {label}
              </span>
            </div>
            {step < steps.length && (
              <span
                className={`mx-2 mt-[-18px] h-px flex-1 sm:mt-[-20px] ${
                  done ? 'bg-cocoa' : 'bg-primary-foreground/20'
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
