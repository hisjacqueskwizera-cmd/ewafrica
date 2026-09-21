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
// The 50%-opacity look comes from layering a solid cream gradient on TOP
// of the image within the same `background-image` stack, rather than an
// actual `opacity`, which would fade the page content sitting on top of it
// too.
export const RWANDA_PAGE_BACKGROUND_STYLE = {
  backgroundImage:
    'linear-gradient(rgba(252, 246, 236, 0.5), rgba(252, 246, 236, 0.5)), url(/Pictures/Background/Rwanda_Background.PNG)',
  backgroundPosition: 'top center, top center',
  backgroundRepeat: 'no-repeat, no-repeat',
  backgroundSize: 'cover, cover',
  backgroundAttachment: 'fixed, fixed',
}
