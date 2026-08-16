---
name: Tao Boba homepage architecture
description: Core decisions for the Tao Boba React/Vite homepage — cup engine, scroll system, and glow approach
---

## Cup swap engine
- DOM-driven, not React state — `changeProduct()` in `home.tsx` writes directly to refs
- Cup swap timing: exit 0.33s cubic-bezier(.55,0,.85,.35), enter 0.90s + 0.12s delay
- Cleanup via `setTimeout(1050)` removes stale `.cup-wrap` nodes
- **DO NOT convert to React state** — it would break the swap animation

## Scroll system
- RAF + lerp loop (`smoothScrollY` lerps to `targetScrollY` at factor 0.1/frame) for parallax
- Raw `window.scrollY` used for discrete product scrub (not lerped — avoids timing drift)
- IntersectionObserver on `[data-reveal]` elements for section entrance animations
- Masthead gets `.scrolled` class after 40px scroll

## Product text fade
- `copyHeadEl` (wraps title/category/index) and `noteEl` get `.text-leaving` → update → `.text-entering`
- 130ms fade-out window before DOM update; stale-capture guard: `if (currentIdx.current !== captured) return`
- First load (currentIdx === -1) skips animation

## Cup image glow (CSS only, no JS)
- Pure white 5-layer `drop-shadow` on `.cup-wrap img`
- Layers: 2px / 10px / 24px / 48px / 80px, white at full→0.35 opacity
- Purpose: dissolves hard PNG cutout edge into the tinted stage background
- **Keep it pure white — no color-mix, no drink-color tinting** (user confirmed)
- Applied in two CSS blocks: base rule (~line 324) and one breakpoint override (~line 908)

## PNG processing pipeline (ImageMagick)
- Background removal: AI tool first, then `magick -channel Alpha -blur 0x2.0 -level 12%,88%`
- Edge feathering: `magick input.png ( +clone -channel Alpha -separate -morphology Dilate Disk:1.5 -blur 0x2.5 -level 3%,97% ) -alpha off -compose CopyOpacity -composite output.png`
- Safe ops: `-channel Alpha -blur`, `-level`, `-morphology Dilate`, `CopyOpacity` (confirmed working)
- Unsafe: Multiply gradient (breaks transparency per earlier sessions)

## Active cup files
- `taro-boba-smooth.png` — Ube Latte
- `thai-tea-clean.png` — Thai Tea
- `matcha-boba-clean2.png` — Matcha Latte
- `mango-boba-clean.png` — Passion Fruit Green Tea
- `cloud-green-tea-clean-final.png` — Strawberry Matcha Latte
