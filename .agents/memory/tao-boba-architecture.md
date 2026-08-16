---
name: Tao Boba homepage architecture
description: Core decisions for the Tao Boba React/Vite homepage — cup engine, scroll system, and edge treatment
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

## Cup image edge treatment (CSS + PNG pipeline)
- CSS filter on `.cup-wrap img`: two tiny `drop-shadow` in page cream color (6px + 18px) + contrast + saturate
- **No glow layer, no duplicate image** — previous attempts with blurred duplicate caused white blob
- Edge quality comes from ImageMagick pre-processing on the PNG files

## PNG edge pipeline (applied in sequence, cumulative)
1. AI background removal
2. `magick -channel Alpha -blur 0x2.0 -level 12%,88%` — initial alpha smoothing
3. `magick ( +clone -channel Alpha -separate -morphology Dilate Disk:1.5 -blur 0x2.5 -level 3%,97% ) -alpha off -compose CopyOpacity -composite` — edge feathering outward
4. `magick -channel Alpha -morphology Erode Disk:10 -blur 0x10 +channel` — fog pass 1
5. `magick -channel Alpha -morphology Erode Disk:22 -blur 0x20 +channel` — fog pass 2
6. `magick -channel Alpha -morphology Erode Disk:40 -blur 0x35 +channel` — fog pass 3
7. **Pre-blend toward cream**: `magick cup.png ( +clone -background '#f6f1e8' -flatten ) ( -clone 0 -alpha extract ) -compose CopyOpacity -composite output.png`

**Why step 7 is critical**: Alpha erosion leaves semi-transparent dark pixels at edges. On a light background they show as a dark ghost fringe. Pre-blending shifts edge pixel *colours* toward the background cream, so they become invisible when rendered — no dark halo.

**Rule**: after any alpha erosion on dark cups, always run the pre-blend step with the actual stage/page background color.

## Active cup files
- `taro-boba-smooth.png` — Ube Latte (tint: #f0eaf7, tone: #6b3fa0)
- `thai-tea-clean.png` — Thai Tea
- `matcha-boba-clean2.png` — Matcha Latte (has dark boba at bottom — most prone to dark fringe)
- `mango-boba-clean.png` — Passion Fruit Green Tea
- `cloud-green-tea-clean-final.png` — Strawberry Matcha Latte
