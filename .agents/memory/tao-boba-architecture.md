---
name: Tao Boba homepage architecture
description: Key decisions for the Tao Boba landing page — what to preserve and what to watch out for
---

## Cup swap engine
- Direct DOM manipulation inside `useEffect` (mirrors the Andtea reference `goTo()` function)
- CSS keyframes on `.cup-wrap` (not `.cup-img`) drive cupIn/cupOut animations
- Transform on `.cup-img` (scale(2.1) translateY(-8%)) corrects for PNG canvas whitespace — do NOT remove
- `currentRef` and `liveCup` refs track state outside React to avoid stale closures
- Series section outer `height: ${PRODUCTS.length * 100}svh`; inner is `position: sticky`

## Animation numbers (from Andtea reference teardown — do not "round off")
- Exit: 0.33s cubic-bezier(.55,0,.85,.35) y=-100%, x=+8%, rotate=+35deg, scale=0.75, blur=3px
- Enter: 0.90s cubic-bezier(.16,1,.3,1) delay=0.12s from y=+100%, rotate=-20deg, scale=0.76
- At rest: absolutely still. No idle float.

## Hero
- Phase 3 hero: full-bleed `image_1786729078505.png` (Summer Sips flatlay, 5 drinks on concrete pedestals)
- Object-position: center 62% to show drinks, not the cream sky
- Mouse parallax: JS writes transform on `.hero__bg` ref directly
- Load reveal: `is-loaded` class added to `<html>` at 80ms, drives CSS transitions for all elements
- Editorial text bottom-right: `.hero__display` with eyebrow "The Art of" + italic "Boba."
- Info ticker strip: `hero__strip` at absolute bottom, `backdrop-filter: blur(14px)`, `stripScroll` animation

## Ghost letterform (series)
- `.ghost-letter` positioned absolute in `.series__stage`, z-index:0, behind all grid content
- goTo() swaps text content to first word of p.word (TAO / MATCHA / BROWN)
- Uses `ghost-pop` animation (remove, force reflow, add) — same pattern as `fade-swap`
- Font: Cormorant Garamond italic, clamp(140px,26vw,380px), rgba(0,0,0,.045)

## Custom cursor
- `.cursor-dot` snaps immediately via direct transform in `onMouseMove`
- `.cursor-ring` lerps at 0.10 factor per RAF frame
- `.c--light` class when `scrollY < innerHeight * 0.9` (hero zone)
- `.c--expand` class on mouseenter of any `a, button`
- CSS manages ring size expansion via top/left/width/height transitions

## Images
- Hero: `attached_assets/image_1786729078505.png` (Summer Sips campaign shot, square 1:1)
- Origin section bg: the butterfly/mango atmosphere photo (dark, high contrast)
- Cup PNGs: transparent backgrounds, require scale(2.1) translateY(-8%) to compensate for canvas padding
- `cup_tao_luxe_no_bg.png`, `cup_matcha_no_bg.png`, `cup_brown_sugar_no_bg.png`

**Why:** Direct DOM manipulation was chosen over Framer Motion because it reproduces the exact CSS animation behavior from the Andtea reference without React re-render interference during rapid scroll events.
