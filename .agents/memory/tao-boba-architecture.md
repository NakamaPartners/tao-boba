---
name: Tao Boba homepage architecture
description: Design system, visual grammar, and preserved engine for the Tao Boba homepage
---

## Visual grammar (unified — applied to every section)

Every section below the hero opens with **the same gesture**:
- `border-top: 1px solid var(--ink-12)` thin rule
- `.sec-label` — 9px, letter-spacing .30em, uppercase, ink-30 color
- `.sec-title` — Cormorant Garamond italic, 300 weight, clamp(26px→48px)

This is the one repeated pattern that makes all sections feel like one website.

## Section inventory

| Section | Class | Background | Notes |
|---------|-------|------------|-------|
| Hero    | `.hero` | paper white | 50/50 split grid. Photo left, text right. |
| Collection | `.collection` | paper white | Images bleed to page edges. No frames. 45/55 split. |
| Series  | `.series` | tinted (per-drink) | Pinned sticky scroll. Intentionally different bg. |
| Craft   | `.craft` | paper white | Two alternating spreads. Images bleed to edges. |
| Origin  | `.origin` | dark photo | Velocity marquee. Only atmospheric section. |
| Footer  | `.foot` | paper white | 3-col grid |

## Cup swap engine — DO NOT MODIFY
- Direct DOM manipulation inside `useEffect` (mirrors Andtea `goTo()`)
- Keyframes on `.cup-wrap` (NOT `.cup-img`)
- **Exact timing:** exit 0.33s ease-exit, enter 0.90s ease-tail delay 0.12s
- Cup PNGs have transparent canvas padding → compensate with `transform: scale(2.1) translateY(-8%)` on `.cup-img`
- `bandEl` ref removed — wordband was removed from series
- `editEl`, `editCols` refs removed — editorial parallax was removed

## Images
- Hero photo: `hero_clean.png` (AI-cleaned, no Summer Sips text/logo)
- Original: `image_1786729078505.png` (has baked-in text — don't use as hero)
- Matcha series: `Experience_the_Art_of_Denver_Matcha...1625374/1628291/1632771.jpg`
- Cup PNGs: `cup_tao_luxe_no_bg.png`, `cup_matcha_no_bg.png`, `cup_brown_sugar_no_bg.png`

## Scroll reveals
- Opacity only — no translateY. `[data-reveal]` → `.revealed`
- References (Higashiya/Saboe): content appears, doesn't slide

**Why:** translateY reveals feel like UI feedback. Opacity-only feels like breath — content materializes.

## What NOT to reintroduce
- Custom cursor (removed, was slowing interactions)
- Hero mouse parallax (removed, user asked for static hero)
- Word band / `.wordband` on series (removed, too loud against quiet aesthetic)
- Editorial parallax columns — replaced with static craft spreads
- Warm cream background on editorial — all sections now white except series tint + origin

## Key design tokens
- `--gutter`: clamp(24px, 4.5vw, 72px) — outer page margin
- `--pg`: clamp(40px, 5.5vw, 96px) — panel interior padding (hero text panel)
- Collection spread bleeds via `no-gutter` on parent + negative margin on craft images
