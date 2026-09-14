import { ArrowRight } from 'lucide-react'
import { HOW_IT_WORKS } from '../data/siteContent.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { HashLink } from './HashLink.jsx'
import { JourneyCurve } from './JourneyCurve.jsx'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'
import { SectionMark } from './SectionMark.jsx'

// A straight rule whose length is driven directly by a 0→1 progress value
// rather than a fixed-duration transition — scrub it with scroll and it
// grows and shrinks in lockstep, in both directions, instead of firing
// once and staying put.
function GrowLine({ progress }) {
  return (
    <span
      className="h-px flex-1 origin-left bg-copper/40"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  )
}

export function HowItWorks() {
  const [rowRef, progress] = useScrollProgress()
  // One continuous sequence, apportioned across the row: the corner curve
  // draws first, then the Tell Us→We Research rule, then the We Research→
  // You Connect rule — so scrolling further genuinely extends the line
  // from the second step to the third, rather than everything appearing
  // at once. Scrolling back up retreats it the same way, since it's a
  // direct function of scroll position, not a one-shot transition.
  const curveProgress = Math.min(1, progress / 0.3)
  const segmentProgress = [
    Math.min(1, Math.max(0, (progress - 0.3) / 0.35)),
    Math.min(1, Math.max(0, (progress - 0.65) / 0.35)),
  ]

  return (
    <div className="pt-16 lg:pt-20">
      <SectionMark />
      <div className="max-w-lg text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
        <RevealText as="h2" text="How We Guide" className="text-primary" />
        <RevealText
          as="h2"
          text="Your Journey"
          delay={200}
          className="italic font-medium text-copper"
        />
      </div>

      {/* Each mini-heading is followed, in the same grid cell, by a
          straight rule that grows toward the next column — the rule and
          its cell share width with the paragraph grid below, so the two
          rows always line up. The whole sequence is scrubbed to how far
          this row has scrolled through the viewport: scroll down and you
          watch it draw from Tell Us through We Research and on to You
          Connect; scroll back up and it retreats the same way. */}
      <div ref={rowRef} className="relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
        <JourneyCurve
          progress={curveProgress}
          className="absolute -left-3 -top-14 hidden h-24 w-20 text-copper/40 sm:block lg:-top-16 lg:h-28 lg:w-24"
        />

        {HOW_IT_WORKS.map((step, index) => (
          <div key={step.title}>
            <div className="flex items-baseline gap-4">
              <h3 className="whitespace-nowrap text-2xl font-semibold text-primary sm:text-[28px]">
                {step.title}
              </h3>
              {index < HOW_IT_WORKS.length - 1 && (
                <GrowLine progress={segmentProgress[index]} />
              )}
            </div>
            <Reveal delay={index * 150} once={false}>
              <p className="mt-4 max-w-70 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {step.description}
              </p>
            </Reveal>
          </div>
        ))}
      </div>

      <Reveal
        delay={HOW_IT_WORKS.length * 150}
        once={false}
        className="mt-12 flex justify-start sm:justify-end"
      >
        <HashLink to="/#contact" className="btn-outline-dark uppercase tracking-[0.08em]">
          Begin Your Journey
          <ArrowRight className="size-4" aria-hidden="true" />
        </HashLink>
      </Reveal>
    </div>
  )
}
