import flagBJ from 'flag-icons/flags/4x3/bj.svg'
import flagGH from 'flag-icons/flags/4x3/gh.svg'
import flagGM from 'flag-icons/flags/4x3/gm.svg'
import flagMW from 'flag-icons/flags/4x3/mw.svg'
import flagRW from 'flag-icons/flags/4x3/rw.svg'
import flagSN from 'flag-icons/flags/4x3/sn.svg'
import flagTZ from 'flag-icons/flags/4x3/tz.svg'
import flagUG from 'flag-icons/flags/4x3/ug.svg'
import flagZM from 'flag-icons/flags/4x3/zm.svg'

// Flag image for each country, keyed by its COUNTRIES slug.
//
// Each flag imported individually (rather than the flag-icons package's
// single CSS file, which references all ~200 flags it ships and would
// have Vite bundle every one of them) so only the 9 countries this site
// actually covers ship to the browser. Real SVGs, not emoji — emoji flags
// render as a bare two-letter code on Windows (Segoe UI Emoji has no flag
// glyphs), so they weren't reliably visible there.
export const FLAGS = {
  ghana: flagGH,
  tanzania: flagTZ,
  malawi: flagMW,
  zambia: flagZM,
  uganda: flagUG,
  rwanda: flagRW,
  senegal: flagSN,
  benin: flagBJ,
  gambia: flagGM,
}
