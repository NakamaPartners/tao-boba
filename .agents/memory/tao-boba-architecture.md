---
name: Tao Boba homepage architecture
description: Current build ported from standalone prototype (index_1786791907881.html). All sections, tokens, and JS engine match prototype exactly.
---

## Source of truth
The standalone prototype HTML is at `attached_assets/index_1786791907881.html`.
All layout, tokens, copy, and JS logic are ported from it verbatim.
When in doubt, diff against that file — not the old Velora/Andtea notes (now deleted).

## Design tokens (index.css :root)
- `--paper: #f6f1e8` / `--paper-2: #fbf8f2`
- `--ink: #171613` / `--muted: #716b62` / `--tan: #d1b08b` / `--line: #ded5c9`
- `--gutter: clamp(24px, 8.2vw, 118px)` / `--header: 82px`
- Body font: `"Helvetica Neue", Arial, sans-serif` (system — NO Google Fonts import)
- Display/accent font: `Baskerville, Georgia, serif` (word band, ghost glyph, wave glyphs)

## Page section order
1. **Masthead** — fixed, `mix-blend-mode: multiply`, centered logo image
2. **Hero** — CSS grid `1.42fr 1fr`, left = photo, right = panel (kicker + h1 + copy + vertical word)
3. **Editorial** — petit gateau (petit-purple + petit-orange), center 1px dividing line, Baskerville `~` waves, two rows A/B
4. **Product scroll** — 500vh pinned, 3-col grid (`13% | 50% | 34%`), left rail nav, Flavor+Finish notes, ghost glyph (number), word band (4× short name)
5. **Lower story** — golden-rose + cupid-love editorial, same grammar as #3
6. **Closing** — three-cup composition (cloud-mango-matcha / butterfly / shiso-yuzu), "Come back to the drinks."
7. **Footer** — large "TAO BOBA" 200-weight wordmark, meta right, bottom bar

## Masthead logo
- File: `image_1786792835874.png` (black bg, white phoenix + wordmark)
- Rendered with `filter: invert(1)` on the `<img>` — makes it black-on-white
- Masthead has `mix-blend-mode: multiply` — white bg multiplies away, black phoenix stays dark
- `.nav-order` "Order" link: `position:fixed; top:29px; right:var(--gutter); z-index:81`

## Hero image
- File: `attached_assets/hero_clean_2.png` — AI-inpainted clean version of the Summer Sips photo (text and logo removed from source)
- `object-position: center 55%` — shows full drink composition
- **No gradient overlay** — text was removed from the image itself, not masked
- `.hero-small` is `display:none` (not needed with this hero image)
- JS parallax: `translateY(${Math.min(18, y*0.025) - 6}%) scale(1.02)` applied to `heroImgEl` ref

## Asset map (current, all in attached_assets/)
| Prototype name | Actual file |
|---|---|
| hero | `image_1786792870459.png` |
| logo | `image_1786792835874.png` |
| petit-purple | `petit-purple_1786791932035.jpg` |
| petit-orange | `petit-orange_1786791932032.jpg` |
| golden-rose | `golden-rose_1786791932029.jpg` |
| cupid-love | `cupid-love_1786791932027.jpg` |
| cup1 Butterfly | `butterfly-mango-jasmine_1786791932019.png` |
| cup2 Cloud Green Tea | `cloud-mango-green-tea_1786791932021.png` |
| cup3 Cloud Matcha | `cloud-mango-matcha_1786791932022.png` |
| cup4 Mango Passionfruit | `mango-passionfruit_1786791932031.png` |
| cup5 Shiso Yuzu | `shiso-yuzu_1786791932037.png` |

**Filename trap:** `pink-pour_1786791932037.png` = actual cookies photo (mislabeled). `cookies_1786791932026.jpg` = actual pink pour shot. Currently NOT used as hero (replaced by Summer Sips).

## Cup swap engine (DO NOT MODIFY)
- Direct DOM injection into `.cup-stack` ref — NOT React state
- Rail nav built by JS in `useEffect` into `<ul ref={railEl}>`
- Exit: `.out` class, `0.33s cubic-bezier(.55,0,.85,.35)`
- Enter: `.in` class, `0.90s cubic-bezier(.16,1,.3,1)`, delay `0.12s`
- Cleanup: `setTimeout 1050ms` removes stale wrappers
- Reverse direction: `.rev` class added when scrolling upward
- `REDUCED` flag gates all animation for `prefers-reduced-motion`

## Product data (5 drinks, matches prototype JS array exactly)
- Butterfly Mango Jasmine | short: Butterfly | tint: #f3edf7
- Cloud Mango Green Tea   | short: Cloud Green | tint: #f6f0e7
- Cloud Mango Matcha      | short: Matcha | tint: #eff2e7
- Mango Passionfruit      | short: Mango | tint: #f8f1df
- Shiso Yuzu              | short: Shiso Yuzu | tint: #f7eceb

## Scroll handler (unified, passive listener)
Three jobs in one `onScroll()`:
1. Hero parallax on `heroImgEl` ref
2. `.parallax-photo` elements — alternating direction, `±42px` max, `scale(1.04)`
3. Product scrub — `Math.floor(prog * 5)` mapped to 0–4, triggers `changeProduct(next, reverse)`

**Why:**  single listener avoids multiple RAF conflicts and matches prototype exactly.
