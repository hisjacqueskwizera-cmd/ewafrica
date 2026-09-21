/**
 * Decorative leaf-frame vignette applied behind every Rwanda page — the
 * PNG's transparent center lets the page's own background color show
 * through; only its corners carry any artwork. Kept as its own `fixed`
 * layer (rather than a `background-image` directly on the page wrapper)
 * so its opacity can be dialed down without fading the actual page
 * content too.
 */
export function RwandaPageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-50"
      style={{
        backgroundImage: 'url(/Pictures/Background/Rwanda_Background.PNG)',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    />
  )
}
