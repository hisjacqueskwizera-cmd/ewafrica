// Shared across the Travel Planner landing page and every step of the
// request wizard (request → review → payment → confirmation), so the same
// backdrop reads as one continuous experience across the whole flow rather
// than just the landing page. A `position: fixed` div pinned behind every
// section, never scrolling with the page — not CSS `background-attachment:
// fixed`, which has patchy mobile-Safari support.
export function PlannerBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-30"
      style={{
        backgroundImage: `url(${encodeURI('/Pictures/Background on travel planner landing page.PNG')})`,
      }}
      aria-hidden="true"
    />
  )
}
