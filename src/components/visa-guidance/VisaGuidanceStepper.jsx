import { Check } from 'lucide-react'

export function VisaGuidanceStepper({ steps, currentStep }) {
  return (
    <div className="mx-auto w-full max-w-4xl py-6 px-4">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const stepNum = idx + 1
          const isDone = stepNum < currentStep
          const isActive = stepNum === currentStep
          const isFuture = stepNum > currentStep

          const label = typeof step === 'string' ? step : step.label
          const subLabel = typeof step === 'object' ? step.subLabel : null

          return (
            <div key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2">
                <span
                  className={`grid size-7 sm:size-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                    isDone
                      ? 'bg-copper text-primary-foreground'
                      : isActive
                        ? 'bg-copper text-primary-foreground ring-4 ring-copper/20'
                        : 'border border-border bg-card text-muted-foreground'
                  }`}
                >
                  {isDone ? <Check className="size-4 stroke-[2.5]" aria-hidden="true" /> : stepNum}
                </span>

                <div className="flex flex-col items-center max-w-[110px] sm:max-w-[130px]">
                  <span
                    className={`text-[11px] sm:text-xs leading-tight ${
                      isActive
                        ? 'font-bold text-primary'
                        : isDone
                          ? 'font-semibold text-primary'
                          : 'font-medium text-muted-foreground'
                    }`}
                  >
                    {stepNum}. {label}
                  </span>
                  {subLabel && (
                    <span className="text-[10px] text-muted-foreground/80 hidden sm:block mt-0.5">
                      {subLabel}
                    </span>
                  )}
                </div>
              </div>

              {stepNum < steps.length && (
                <div
                  className={`mx-2 sm:mx-4 mt-[-22px] sm:mt-[-26px] h-0.5 flex-1 transition-colors ${
                    isDone ? 'bg-copper' : 'bg-border'
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
