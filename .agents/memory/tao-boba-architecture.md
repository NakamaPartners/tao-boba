---
name: Tao Boba homepage architecture
description: Design system, scene structure, and preserved engines — post full spec rebuild
---

## Reference sources (all three required, each for different scope)
- **Velora** (velora-template.framer.website) → hero compositional grammar only
- **Andtea** → product choreography, cup swap motion, scroll behavior
- **EN TEA / SABOE / HIGASHIYA / Sakurai / Kettl / Rishi** → editorial discipline, spacing, rhythm

## Typography (locked)
- `Space Grotesk` (500, 600, 700) — display: wordmark, product names, background glyph
- `DM Sans` (300, 400, 500) — body: all other text, nav, labels
- NO Cormorant Garamond anywhere (spec: "do not use as the automatic answer")

## Reference artboard
- **1440 × 900px** desktop primary
- Global gutter: **72px**
- Alignment lines: 72 | 88 | 840 | 955 | 1368

## Page scene rhythm (spec-exact)
| Scene | Height |
|-------|--------|
| Hero | 100svh (min 900px) |
| Bridge | 320px |
| Editorial | 1180px |
| 180px gap | — |
| Products | 500vh |
| 220px breath | — |
| Gallery | 1450px |
| Footer | auto |

## Scene 01 — Hero (Velora grammar)
All elements absolutely positioned within `position: relative; height: 100svh`:

| Element | Position |
|---------|----------|
| Photo | left: 88px, top: 306px, 620×390px, object-fit: cover |
| Intro text | left: 955px, top: 145px, width: 330px |
| TAO BOBA wordmark | left: 88px, top: 726px, 76px Space Grotesk 600, letter-spacing: -0.04em |
| Scroll cue | right: 72px, bottom: 36px, 10px, opacity: 0.55 |

**Three attention points only. No product on the right. No second competing photo.**

Entry animations (class `hero-init` added 60ms after mount):
- Photo inner: opacity 0→1, scale 1.02→1, 0.9s
- Intro inner: opacity 0→1, Y 12px→0, 0.7s, delay 0.2s
- Wordmark inner: clip-path reveal bottom→top, 0.7s, delay 0.3s

Scroll parallax (outer wrap refs get transform from JS tick):
- heroImgWrapEl: `translateY(-scrollY * 0.09)` (max ~45px up)
- heroIntroWrapEl: `translateY(-scrollY * 0.30)`
- heroWordWrapEl: `translateY(-scrollY * 0.15)`

**Why inner/outer separation:** animation and JS parallax both use `transform`. To avoid conflict: entry animation targets `.hero__X-inner`, parallax targets `.hero__X-wrap`. No override conflict.

## Scene 02 — Editorial (1180px absolute layout)
All absolutely positioned within `position: relative; height: 1180px; overflow: hidden`:

| Element | Position |
|---------|----------|
| Image A (portrait) | left: 72px, top: 120px, 540×680px |
| Image B (smaller) | left: 870px, top: 440px, 350×290px |
| Text block | left: 840px, top: 145px, width: 330px |

Parallax multipliers (applied as `translateY(-progress * factor)` where progress = px scrolled into section):
- Image A: 0.10×
- Image B: 0.38×
- Text: 0.20×

## Scene 03 — Product sequence (Andtea choreography)

**5 products, 500vh total scroll, sticky 100svh stage (full-width — NOT split panels)**

Layout within stage:
- Index `01 / 05`: `left: 94px, top: 120px`, 10px DM Sans
- Name: `left: 90px, top: 190px`, Space Grotesk 600, font-size per product (58–78px)
- Accent rule: `left: 90px, top: 330px`, 26×2px
- Description: `left: 90px, bottom: 140px`, 340px wide, 15px
- Background glyph: `left: 57% (≈820px), top: 50%`, `transform: translate(-50%,-50%)`, 180-280px Space Grotesk 700, opacity 7%, z-index: 0
- Cup stack: `left: 57%, top: 470px`, `transform: translate(-50%,-50%)`, 340×670px container, z-index: 1

**Cup overlaps glyph** (z-index 1 vs 0) — this is the Andtea spatial interaction requirement.

Cup scale compensation: `scale(2.1) translateY(-8%)` on `.cup-img` — compensates transparent canvas padding in PNGs. The 670px container × 2.1× visual = actual cup body appears 670px tall.

## Cup swap engine — DO NOT MODIFY
- Direct DOM injection into `.products__stack`
- Classes: `.is-entering`, `.is-exiting`, `.rev` on `.cup-wrap`
- Exit: 0.33s `cubic-bezier(.55,0,.85,.35)`
- Enter: 0.90s `cubic-bezier(.16,1,.3,1)`, delay 0.12s
- Once landed: COMPLETELY STILL. No idle animation.

## 5 Products
1. `cup_tao_luxe_no_bg.png` | "Tao Luxe" | 78px | bg: #f0ebe0 | word: "LUXE" | accent: #c9a96e
2. `drink_sip2_no_bg.png` | "Butterfly Mango" | 60px | bg: #ede9f4 | word: "MANGO" | accent: #8b6eb5
3. `cup_matcha_no_bg.png` | "Matcha Madness" | 63px | bg: #eaf0e6 | word: "MATCHA" | accent: #7aaa6a
4. `drink_sip3_no_bg.png` | "Strawberry Series" | 58px | bg: #fdf0f2 | word: "BERRY" | accent: #d4697a
5. `cup_brown_sugar_no_bg.png` | "Brown Sugar" | 74px | bg: #f0e8d8 | word: "SUGAR" | accent: #b87c4a

Note: `drink_sip2_no_bg.png` and `drink_sip3_no_bg.png` are cups on travertine pedestals with transparent/dark backgrounds (NOT isolated cup silhouettes like the others). May need scale adjustment.

## Scene 04 — Gallery (1450px absolute layout)
Three photos absolutely positioned, asymmetric, never same top coordinate:

| Element | Position |
|---------|----------|
| Gallery A | left: 0, top: 0, 45vw × 620px |
| Gallery B | right: 72px, top: 320px, 310×440px |
| Gallery C | left: 400px, top: 880px, 560×380px |

## Asset map (photo assignments)
- Hero: `hero_clean.png` — 5 drinks, object-position: center 42%
- Editorial A: `Float_into_summer_1786554467811.jpg` — matcha close-up, object-position: center top (crops text)
- Editorial B: `Five_signature_sips_1786554579731.jpg` — Butterfly Mango on travertine
- Gallery A: `🦋_Meet_your_new_summer_obsession_1786554450238.jpg` — dark purple/amber atmospheric
- Gallery B: `Float_into_summer_1786554470275.jpg` — amber float close-up
- Gallery C: `Experience...1786731632771.jpg` — ube matcha editorial portrait

## Important: "no_bg" PNG naming is misleading
- `drink_butterfly_mango_no_bg.png` = close-up editorial photo with dark/black BG (NOT transparent isolated cup)
- `drink_amber_float_no_bg.png` = same — editorial close-up, dark BG
- `drink_matcha_float_no_bg.png` = same — editorial close-up, dark BG
- These are used as scene PHOTOS (gallery/editorial), not product swap cups

## DO NOT reintroduce
- Split hero (left photo panel / right product panel) — this was the previous wrong approach
- Andtea split two-panel composition in the HERO (Andtea pattern applies only to Scene 03 products)
- Cormorant Garamond anywhere
- Italic as "premium" device for product names
- Any nav with mix-blend-mode: difference
- Scroll cue centered on viewport or on any panel seam
- Section headers with rule + label + italic heading pattern
- Equal 50/50 splits
- Product grids or cards
- Idle/floating/bobbing animations
