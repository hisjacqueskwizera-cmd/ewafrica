// Decorative leaf-frame vignette applied behind every Rwanda page (Overview,
// Gallery, Practical Guide) — the PNG's transparent center lets the page's
// own cream background show through; only its corners carry any artwork.
//
// Applied as the SAME element's own `background`, not a separate
// `fixed`/`z-index` layer: this content is deeply nested under many
// `<Reveal>`-wrapped sections, and those apply a `transform` (even at rest,
// `translateY(0)` still counts), which creates a stacking context that
// paints above a sibling with a negative z-index — so a separate layer
// behind the content ends up invisible almost everywhere. Baking a
// semi-transparent wash directly into this element's own background stack
// (painted before its children, guaranteed) sidesteps that entirely — this
// is also how the very first version of this background worked, just at
// full strength.
//
// The 40%-opacity look comes from layering a solid cream gradient (60%
// opaque) on TOP of the image within the same `background-image` stack,
// rather than an actual `opacity`, which would fade the page content
// sitting on top of it too. Every section on the page is meant to sit
// directly on this shared wash — page sections should stay transparent
// (no `bg-cream`/`bg-background` of their own) rather than painting a flat
// color over it, or the artwork disappears behind that section.
//
// `background-attachment: fixed` is intentionally NOT used here. It's only
// reliably supported on `<html>`/`<body>` — on an ordinary nested element
// like this one, several browsers (notably Safari, and most mobile
// browsers) fail to paint it at all, which is why the background was
// disappearing entirely in some browsers. It also forces a full repaint of
// the background on every scroll frame, which is what made scrolling feel
// janky. Plain scroll-with-the-page attachment fixes both.
//
// The source art is served as a .webp (re-encoded from the original
// Rwanda_Background.PNG, same pixels, quality 80) — 322KB vs. the PNG's
// 1MB, so painting this large a background costs a lot less decode/memory
// on every Rwanda page without changing how it looks.
export const RWANDA_PAGE_BACKGROUND_STYLE = {
  backgroundImage:
    'linear-gradient(rgba(252, 246, 236, 0.6), rgba(252, 246, 236, 0.6)), url(/Pictures/Background/Rwanda_Background.webp)',
  backgroundPosition: 'top center, top center',
  backgroundRepeat: 'no-repeat, no-repeat',
  backgroundSize: 'cover, cover',
}
