import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

/**
 * A single-open accordion — one topic expanded at a time, click again (or
 * click another) to switch. Height animates via the CSS grid-template-rows
 * trick (0fr <-> 1fr on a wrapper around an overflow-hidden inner div)
 * rather than measuring scrollHeight in JS, so it stays a plain CSS
 * transition like the rest of the site's motion.
 */
export function Accordion({ items, textClassName = 'text-primary', answerClassName = 'text-muted-foreground' }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={item.label} className="border-b border-border last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-bold sm:text-base ${textClassName}`}
            >
              <span className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-copper">
                  <item.icon className="size-4" aria-hidden="true" />
                </span>
                {item.label}
              </span>
              <ChevronDown
                className={`size-4 shrink-0 transition-transform duration-300 ${answerClassName} ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className={`pb-4 pl-12 text-sm leading-relaxed ${answerClassName}`}>
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
