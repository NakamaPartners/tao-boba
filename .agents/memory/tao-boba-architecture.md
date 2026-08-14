---
name: Tao Boba homepage architecture
description: Design system, structure, and preserved engine — post Andtea-reference reset
---

## Design direction (current, approved direction)

**Primary reference: Andtea.com** — specifically its split photo/product composition, enormous letterform-as-texture behind cups, per-drink tinted right panel, and scroll-driven cup choreography.

Supporting references: EN TEA, SABOE, Higashiya, Sakurai, Kettl, Rishi — for elegance, spacing, and restraint ONLY. These must not push toward barren minimalism.

**Target feel:** Visually rich, structurally minimal. Art-directed brand experience, not empty art-school page, not Framer template.

## Page structure (current build)

| # | Scene | Key composition |
|---|-------|----------------|
| 01 | **Hero** | Split grid 53/47. Left: hero_clean.png (5 drinks, warm concrete). Right: warm cream #f0ebe0, Tao Luxe cup with scale compensation, enormous "TAO" glyph behind, brand title + location bottom-left. |
| 02 | **Editorial** | Two columns 60/40. Left: matchaUbe tall portrait. Right: matchaMango upper half, editorial prose lower half. |
| 03 | **Drink Series** | Pinned scroll (3×100svh). Split 52/48. Left: photo panel crossfades per drink. Right: tinted panel, cup swap engine, glyph per drink. |
| 04 | **Atmosphere** | Full-bleed craftPhoto (cloud foam), gradient overlay, editorial text lower-left. |
| 05 | **Footer** | 3-column: contact / logo / order link. |

## Andtea composition model (must be preserved)
- **Left panel**: Rich lifestyle/process photography, full-bleed, full height
- **Right panel**: Single product on warm tinted background, enormous italic serif letterform behind cup (`rgba(0,0,0,.044)`), product name + note upper-left, cup large and centered-right
- Thin hairline divider between panels (`rgba(0,0,0,.07)`)
- "Scroll" cue centered at bottom of hero
- Nav: `mix-blend-mode: difference` so it reads on both dark photo and light cream

## Cup swap engine — DO NOT MODIFY

- Direct DOM manipulation in `goTo()`, mirroring Andtea
- Keyframe classes: `.is-entering`, `.is-exiting`, `.rev`
- **Timing (exact):** exit 0.33s ease-exit, enter 0.90s ease-tail, delay 0.12s
- Cup PNGs: `scale(2.1) translateY(-8%)` on `.cup-img` compensates for transparent canvas padding
- Hero cup: SAME scale compensation — `transform: scale(2.1) translateY(-8%)` on `.hero__cup-img`
- Photo crossfade: `photoEl.current.style.opacity = '0'` → 200ms delay → swap `backgroundImage` → `opacity = '1'`
- Left panel uses background-image (not an `<img>`) so backgroundImage swap works via inline style

## Refs in use (series)
- `seriesEl` — outer `<section>` for scroll calculation
- `stackEl` — cup DOM target
- `panelEl` — right panel, receives `backgroundColor` on drink change
- `photoEl` — left panel div, receives `backgroundImage` + opacity crossfade
- `nameEl` — drink name `<h2>`
- `noteEl` — note `<p>`
- `glyphEl` — background letterform div
- `accentEl` — coloured accent `<span>`
- `idxEl` — "01 — 03" counter

## Key CSS tokens
- `--edge: clamp(24px, 4vw, 64px)` — page margin
- `--panel-p: clamp(20px, 3.5vw, 52px)` — inner panel padding
- Hero/series right panel bg per drink: `#f0ebe0` / `#e8f0e4` / `#f0e8d8`
- Glyph size: `clamp(150px, 27vw, 440px)` in series, `clamp(160px, 26vw, 420px)` in hero

## Images used
- `hero_clean.png` — hero left panel (5 drinks, cleaned of text)
- `cup_tao_luxe_no_bg.png`, `cup_matcha_no_bg.png`, `cup_brown_sugar_no_bg.png` — transparent cup PNGs
- `Experience_the_Art_of_Denver_Matcha...1625374/1628291/1632771.jpg` — matcha editorial photos (mango/banana/ube)
- `Float_into_summer_with_every_sip...1786554467811.jpg` — atmosphere section photo

## DO NOT reintroduce
- Section numbers ("01", "02"...)
- Repeated label + rule + italic heading pattern on every section
- 50/50 equal split hero
- Boxed CTA buttons
- Three-product grids
- Alternating text/image "craft" modules
- Marquee bands over dark photos
- Any translateY scroll reveals (opacity only, or none)
