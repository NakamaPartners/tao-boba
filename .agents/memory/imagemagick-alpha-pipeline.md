---
name: ImageMagick alpha pipeline for cup cutouts
description: The only reliable approach for transparent PNG processing on the Tao Boba cups — what breaks transparency and what doesn't.
---

# ImageMagick Alpha Pipeline for Cup Cutouts

## Rule
Use **only** direct `-channel Alpha` manipulation on the already-transparent `raw_no_bg.png` output from `removeImageBackground`. Never extract, recompose, or multiply against a gradient mask.

## Working command
```bash
magick <input_raw_no_bg.png> \
  -channel Alpha \
  -blur 0x1.2 \     # feathers edges (2.5 for more aggressive rounding)
  -level 12%,88% \  # transparent pixels stay at 0, opaque stay at 255
  +channel \
  <output_clean.png>
```

## Verify before using on site
```bash
magick <output>.png -format "corner: %[pixel:u.p{10,10}]" info:
# Must show srgba(0,0,0,0)
```

## What BREAKS transparency (never use these)
- `-alpha off -compose CopyOpacity -composite` — resets all alpha to 1 first, then often fails to restore it
- `-channel Alpha -compose Multiply -composite` with an RGB gradient — when the gradient has no alpha channel, this can set background pixels to opaque
- `-morphology Smooth Disk:N` with large N (≥ 2.5) followed by level — Close operation expands opacity into background; combined with level can make transparent corners opaque

## Why `removeImageBackground` output IS transparent
- The tool returns a proper RGBA PNG with background pixels at alpha=0
- The ReadFile viewer and browser direct-PNG view render transparent areas as GRAY or BLACK — this is viewer behavior, not a file issue
- Verify with pixel sampling, not visual inspection

## For bottom edge artifacts (table surface remnants)
Apply stronger level (12%,82%) and larger blur (2.5) — this cuts more aggressively near semi-transparent edge pixels. Avoid gradient masks.

**Why:** The Multiply gradient approach that worked for previews (compositing onto colored bg) does NOT work for in-place alpha modification. The direct `-channel Alpha` approach is the only safe one.
