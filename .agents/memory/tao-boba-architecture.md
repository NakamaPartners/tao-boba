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

## Cup image edge treatment — FINAL approach (do not add more erosion passes)

### CSS (primary, consistent across all 5 cups)
Applied to `.cup-wrap img` in both base and mobile breakpoint rules:
```css
mask-image: radial-gradient(
  ellipse 86% 90% at 50% 52%,
  black 0%, black 52%, rgba(0,0,0,0.85) 63%,
  rgba(0,0,0,0.55) 73%, rgba(0,0,0,0.20) 83%, transparent 92%
);
-webkit-mask-image: /* same */;
```
Fully opaque centre → gradual dissolve → transparent at edge. Identical for all 5. Tune only these CSS values if more/less fade is needed — do NOT stack more ImageMagick erosion passes.

### PNG pipeline (applied once from clean source — do NOT stack more passes)
1. AI background removal
2. Initial alpha feathering (Dilate Disk:1.5 → blur 0x2.5 → level 3%,97% → CopyOpacity)
3. **Cream pre-blend**: `magick cup.png ( +clone -background '#f6f1e8' -flatten ) ( -clone 0 -alpha extract ) -compose CopyOpacity -composite output.png`
   - Shifts semi-transparent edge pixel *colours* toward cream so they're invisible on cream background

**Why cream pre-blend matters**: alpha erosion leaves semi-transparent dark pixels at edges. On a light background they show as a dark ghost fringe. Pre-blending shifts edge colours toward cream so transparent pixels are already cream-coloured → no dark halo.

**WARNING — stacking erosion passes**: applying multiple rounds of `-morphology Erode Disk:N -blur 0xN` destroyed the files (alpha mean dropped from ~72% to ~48%). Restoring from git commit `742d2b9` was required. The CSS mask handles all visible edge fading — PNG files should only have the cream pre-blend applied.

### Healthy source state
Git commit `742d2b9` has the cups at ~70-75% alpha mean — the best available state if files get over-processed again.

## Active cup files
- `taro-boba-smooth.png` — Ube Latte (tint: #f0eaf7, tone: #6b3fa0)
- `thai-tea-clean.png` — Thai Tea
- `matcha-boba-clean2.png` — Matcha Latte (has dark boba at bottom — most prone to dark fringe)
- `mango-boba-clean.png` — Passion Fruit Green Tea
- `cloud-green-tea-clean-final.png` — Strawberry Matcha Latte
