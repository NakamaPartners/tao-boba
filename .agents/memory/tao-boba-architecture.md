---
name: Tao Boba homepage architecture
description: Design system, visual grammar, and preserved engine for the Tao Boba homepage (post-reset)
---

## Design direction (reset — previous direction rejected)

The previous direction ("premium cafe/restaurant template with editorial fonts") was explicitly rejected.
New direction: **editorial brand composition** — closer to a Japanese art book, brand monograph, or exhibition catalogue.
References: EN TEA concept, SABOE, Higashiya, Sakurai Tea, Kettl, Rishi Tea (spatial intelligence only — not their branding).
Andtea remains the reference for **product choreography and motion only**.

Key brief rules (must be enforced on all future additions):
- Empty space is part of the design — do not fill it
- One idea per visual moment
- No sec-head pattern (label + rule + italic heading repeated on every section)
- No section numbers ("01")
- No boxed CTA buttons
- No hover zoom on images
- No obvious grids (50/50, 3-column, alternating spreads)
- No three-product grids
- No marquee bands over dark photos
- Text narrow: 280–400px max-width
- Aggressive whitespace: 160–300px vertical breathing room between thoughts
- Think in **scenes**, not sections

## Current page state (approved to this point)

Only three things have been built and approved for visual language review:
1. **Nav** — phoenix mark top-left (inverted filter), "Menu" text link top-right. Nothing else.
2. **Hero** — one Tao Luxe cup PNG on `#f7f4ef` warm off-white. Cup right-of-center, bottom-anchored. "Denver, CO" bottom-left only. No headline, no CTA, no split.
3. **Observation transition** — `clamp(120px,22vh,280px)` empty breath, then a single 3-line sentence left-offset at `clamp(10%,16vw,220px)` padding-left.
4. **Series first state** — pinned scroll, cup dominant right, drink name large Cormorant upper-left, single note sentence (not bullets), index counter "01 — 03", ghost letter, tint transitions.

**Do not add new sections until the user approves this visual language.**

## Cup swap engine — DO NOT MODIFY

- Direct DOM manipulation inside `useEffect`
- Keyframe classes: `.is-entering`, `.is-exiting`, `.rev`
- **Exact timing:** exit 0.33s ease-exit, enter 0.90s ease-tail, delay 0.12s
- Cup PNGs have large transparent canvas padding → compensate with `transform: scale(2.1) translateY(-8%)` on `.cup-img` in the **series stack only**
- In the **hero**, no scale compensation is applied — the transparent areas are intentional negative space
- Once settled, cups must be completely still — no idle animation

## Hero cup note

`cup_tao_luxe_no_bg.png` has significant transparent padding (hence the scale(2.1) need in series).
In the hero: `height: 96svh`, no scale. Cup object appears at ~46svh effective — surrounded by transparent air.
This is correct and intentional — the space is part of the composition.

## Images available

- `cup_tao_luxe_no_bg.png`, `cup_matcha_no_bg.png`, `cup_brown_sugar_no_bg.png` — transparent cup PNGs
- `image_1786554649837.png` — phoenix logo (white on transparent → `filter: invert(1)` to darken)
- `hero_clean.png` — cleaned Summer Sips photo (usable later)
- Various editorial/social photos in attached_assets

## Key CSS tokens

- `--edge: clamp(28px, 4.5vw, 68px)` — distance from page edge
- `--paper: #fafaf8`, `--hero-bg: #f7f4ef`
- No `--gutter` container concept. No max-width anywhere.
- Each element positioned specifically — not inside a shared container
