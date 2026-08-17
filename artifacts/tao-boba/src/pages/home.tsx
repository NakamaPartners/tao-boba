import { useEffect, useRef } from 'react';

/* ── assets ─────────────────────────────────────────────────────────────── */
// Hero — Summer Sips five-drink lineup (text/logo covered by CSS gradient overlay)
import pinkPour    from '@assets/hero_clean_2.png';

// Actual brand logo (phoenix + TAO BOBA wordmark)
import logoImg     from '@assets/image_1786792835874.png';

// Editorial — petit gateau (before products)
import petitPurple from '@assets/petit-purple_1786791932035.jpg';
import petitOrange from '@assets/petit-orange_1786791932032.jpg';

// Lower story — seasonal campaign (after products)
import goldenRose  from '@assets/golden-rose_1786791932029.jpg';
import cupidLove   from '@assets/cupid-love_1786791932027.jpg';

// Product cups — prototype set
import cup1 from '@assets/taro-boba-smooth.png';
import cup2 from '@assets/thai-tea-clean.png';
import cup3 from '@assets/matcha-boba-clean2.png';
import cup4 from '@assets/mango-boba-clean.png';
import cup5 from '@assets/cloud-green-tea-clean-final.png';

/* ── product data (matches prototype JS array exactly) ─────────────────── */
/* ── particle type ─────────────────────────────────────────────────────────── */
interface Ptcl {
  shape: 'circle' | 'leaf' | 'wedge' | 'petal';
  color: string;
  w: number; h: number;    // px
  x: number; top: number;  // % within cup-stack
  delay: number; dur: number; // seconds
  rot: number; drot: number; dx: number; // rotation + drift
}

const PRODUCTS: ReadonlyArray<{
  name: string; short: string; category: string; photo: string;
  tint: string; tone: string;
  notes: ReadonlyArray<readonly [string, string]>;
  particles: Ptcl[];
}> = [
  {
    name:  'Ube Latte',
    short: 'Ube',
    category: 'Speciality Drinks',
    photo: cup1,
    tint:  '#f0eaf7',
    tone:  '#6b3fa0',
    notes: [
      ['Flavor', 'Steamed purple yam whisked into cold milk. Earthy and only faintly sweet, closer to taro root than to candy, with a vanilla edge sitting underneath it.'],
      ['Build',  'The ube paste is folded in by hand rather than pumped from a syrup bottle, which is why the colour streaks through the cup instead of sitting flat.'],
      ['Finish', 'Thick, round and slow. It coats the tongue and stays there, so most people drink it more slowly than they mean to.'],
    ],
    /* ube pearls with gradient sheen, gold sparkles, lavender foam */
    particles: [
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #ddd6fe, #7c3aed 55%, #3b0764)', w:17,h:17, x:10, top:3,  delay:0,   dur:3.2, rot:0,   drot:0,   dx:7  },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #c4b5fd, #6d28d9 55%, #2e1065)', w:13,h:13, x:38, top:8,  delay:0.8, dur:3.6, rot:0,   drot:0,   dx:-6 },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #ede9fe, #8b5cf6 50%, #4c1d95)', w:15,h:15, x:64, top:2,  delay:1.5, dur:3.0, rot:0,   drot:0,   dx:8  },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #ddd6fe, #5b21b6 55%, #2e1065)', w:11,h:11, x:86, top:10, delay:2.2, dur:3.4, rot:0,   drot:0,   dx:-5 },
      { shape:'sparkle', color:'rgba(255,215,0,0.95)',  w:13,h:13, x:24, top:5,  delay:0.4, dur:2.8, rot:0,   drot:180, dx:5  },
      { shape:'sparkle', color:'rgba(255,215,0,0.88)',  w:9, h:9,  x:74, top:12, delay:1.9, dur:3.2, rot:22,  drot:200, dx:-4 },
      { shape:'petal',   color:'#a78bfa',               w:17,h:12, x:18, top:7,  delay:1.1, dur:4.2, rot:30,  drot:130, dx:9  },
      { shape:'petal',   color:'#7c3aed',               w:15,h:10, x:52, top:4,  delay:2.5, dur:4.5, rot:-20, drot:148, dx:-8 },
      { shape:'circle',  color:'rgba(237,233,254,0.70)', w:9, h:9,  x:44, top:15, delay:1.0, dur:3.8, rot:0,   drot:0,   dx:3  },
      { shape:'circle',  color:'rgba(245,243,255,0.55)', w:6, h:6,  x:88, top:5,  delay:1.7, dur:3.5, rot:0,   drot:0,   dx:-3 },
    ],
  },
  {
    name:  'Classic Milk Tea',
    short: 'Milk Tea',
    category: 'Milk Tea Series',
    photo: cup2,
    tint:  '#f7ede0',
    tone:  '#c85a0a',
    notes: [
      ['Flavor', 'Black tea brewed full and poured over ice, then finished with fresh milk so the creaminess arrives last and lingers.'],
      ['Build',  'Tea first, milk second — the cup comes to you in two tones and the two of them find each other as you drink.'],
      ['Finish', 'Smooth, clean, and just sweet enough. The kind of drink that does not ask anything of you.'],
    ],
    /* boba pearls with gradient sheen, gold sparkles, cream milk drops */
    particles: [
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #6b5040, #1c0a00 55%, #000)', w:18,h:18, x:8,  top:3,  delay:0,   dur:3.4, rot:0,   drot:0,   dx:6  },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #7a5e48, #2a1200 55%, #000)', w:14,h:14, x:40, top:8,  delay:0.8, dur:3.8, rot:0,   drot:0,   dx:-7 },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #5a4030, #150800 60%, #000)', w:16,h:16, x:66, top:2,  delay:1.6, dur:3.2, rot:0,   drot:0,   dx:8  },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #8a6850, #201000 55%, #000)', w:11,h:11, x:84, top:11, delay:2.3, dur:3.6, rot:0,   drot:0,   dx:-5 },
      { shape:'sparkle', color:'rgba(255,215,0,0.95)',           w:12,h:12, x:26, top:5,  delay:0.5, dur:2.9, rot:15,  drot:190, dx:4  },
      { shape:'sparkle', color:'rgba(255,200,80,0.90)',          w:8, h:8,  x:58, top:13, delay:2.0, dur:3.3, rot:-10, drot:210, dx:-4 },
      { shape:'drop',    color:'rgba(245,230,200,0.80)',         w:10,h:14, x:18, top:8,  delay:1.2, dur:4.1, rot:10,  drot:30,  dx:5  },
      { shape:'drop',    color:'rgba(255,240,215,0.75)',         w:8, h:11, x:76, top:6,  delay:2.8, dur:4.4, rot:-15, drot:-25, dx:-6 },
      { shape:'circle',  color:'rgba(255,248,235,0.65)',         w:9, h:9,  x:50, top:15, delay:0.7, dur:3.9, rot:0,   drot:0,   dx:3  },
    ],
  },
  {
    name:  'Matcha Latte',
    short: 'Matcha',
    category: 'Matcha Series',
    photo: cup3,
    tint:  '#edf2e8',
    tone:  '#3d6b35',
    notes: [
      ['Flavor', 'Ceremonial grade, whisked to order. Grassy and full rather than bitter, with the sweetness arriving from the milk and from nothing else.'],
      ['Build',  'Whisked in the cup, never pre-mixed and never held. Matcha that has sat for an hour goes flat, and no amount of sugar hides it.'],
      ['Finish', 'Clean and short. It leaves the palate quickly, which is the point — it is the one drink on the board you can have two of.'],
    ],
    /* matcha pearls with sheen, dark boba, gold sparkles, ceremonial leaves */
    particles: [
      { shape:'circle',  color:'radial-gradient(circle at 35% 35%, #b5d97a, #3d6b35 55%, #1a3010)', w:13,h:13, x:14, top:4,  delay:0,   dur:3.2, rot:0,   drot:0,   dx:5  },
      { shape:'circle',  color:'radial-gradient(circle at 35% 35%, #a3c75a, #2f5a28 55%, #152810)', w:10,h:10, x:42, top:9,  delay:0.6, dur:3.6, rot:0,   drot:0,   dx:-5 },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #6b4a30, #0f0500 60%, #000)',    w:16,h:16, x:64, top:3,  delay:1.3, dur:3.4, rot:0,   drot:0,   dx:7  },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #5a3c28, #0a0300 60%, #000)',    w:13,h:13, x:86, top:10, delay:2.1, dur:3.8, rot:0,   drot:0,   dx:-6 },
      { shape:'sparkle', color:'rgba(255,215,0,0.95)',                                              w:11,h:11, x:28, top:6,  delay:0.4, dur:2.8, rot:0,   drot:180, dx:4  },
      { shape:'sparkle', color:'rgba(255,215,0,0.85)',                                              w:8, h:8,  x:72, top:12, delay:1.9, dur:3.1, rot:20,  drot:200, dx:-3 },
      { shape:'leaf',    color:'#3d6b35',                                                           w:16,h:22, x:6,  top:5,  delay:0.8, dur:4.3, rot:18,  drot:165, dx:8  },
      { shape:'leaf',    color:'#4a7c3f',                                                           w:13,h:18, x:50, top:7,  delay:2.3, dur:4.6, rot:-28, drot:152, dx:-7 },
      { shape:'circle',  color:'rgba(255,252,245,0.65)',                                            w:9, h:9,  x:34, top:15, delay:1.0, dur:3.9, rot:0,   drot:0,   dx:3  },
    ],
  },
  {
    name:  'Passion Fruit Green Tea',
    short: 'Passion Fruit',
    category: 'Fruit Tea Series',
    photo: cup4,
    tint:  '#f6f2e4',
    tone:  '#5a8c2a',
    notes: [
      ['Flavor', 'Sun-bright passionfruit poured over chilled green tea, with boba and coconut jelly settled through the bottom third of the cup.'],
      ['Build',  'The fruit is pressed the same morning and the seeds are left in. They are texture, and they are proof it did not come from a bottle.'],
      ['Finish', 'Tropical, layered and built for heat. Every sip reaches a different depth, and the last one is the sweetest of them.'],
    ],
    /* passion fruit seeds with amber glow, dark boba pearls, gold sparkles */
    particles: [
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #fde68a, #b45309 55%, #7c2d00)', w:14,h:14, x:12, top:4,  delay:0,   dur:3.3, rot:0,   drot:0,   dx:6  },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #fcd34d, #92400e 55%, #4a1800)', w:11,h:11, x:40, top:8,  delay:0.7, dur:3.7, rot:0,   drot:0,   dx:-5 },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #fef08a, #ca8a04 50%, #713f00)', w:13,h:13, x:66, top:3,  delay:1.4, dur:3.5, rot:0,   drot:0,   dx:7  },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #6b4a30, #0f0500 60%, #000)',    w:16,h:16, x:86, top:10, delay:2.2, dur:3.0, rot:0,   drot:0,   dx:-6 },
      { shape:'sparkle', color:'rgba(255,215,0,0.95)',                                              w:13,h:13, x:22, top:5,  delay:0.3, dur:2.8, rot:0,   drot:185, dx:5  },
      { shape:'sparkle', color:'rgba(255,220,50,0.88)',                                             w:9, h:9,  x:54, top:13, delay:1.8, dur:3.2, rot:18,  drot:195, dx:-4 },
      { shape:'leaf',    color:'#4a7c3f',                                                           w:15,h:21, x:8,  top:6,  delay:1.0, dur:4.4, rot:22,  drot:162, dx:8  },
      { shape:'leaf',    color:'#5a9e3a',                                                           w:12,h:17, x:48, top:5,  delay:2.5, dur:4.1, rot:-18, drot:148, dx:-7 },
      { shape:'circle',  color:'rgba(255,245,210,0.70)',                                            w:8, h:8,  x:76, top:14, delay:0.8, dur:3.8, rot:0,   drot:0,   dx:-3 },
    ],
  },
  {
    name:  'Strawberry Matcha Latte',
    short: 'Strawberry',
    category: 'Matcha Madness',
    photo: cup5,
    tint:  '#fce9ee',
    tone:  '#d4486a',
    notes: [
      ['Flavor', 'Strawberry puree under whisked matcha and cold milk. Tart, green and creamy all at once — three flavours that never quite merge.'],
      ['Build',  'Three densities stacked cold: fruit, then milk, then matcha. Pour them out of order and you get a brown cup, so we do not.'],
      ['Finish', 'Bright, then grassy, then round. It shifts as it settles, which is why it reaches you unstirred and stays that way.'],
    ],
    /* strawberry spheres with sheen, matcha leaves, gold sparkles, cream foam */
    particles: [
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #fca5a5, #e8325a 55%, #881337)', w:16,h:16, x:10, top:3,  delay:0,   dur:3.3, rot:0,   drot:0,   dx:7  },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #fbcfe8, #c02050 55%, #9f0030)', w:12,h:12, x:42, top:9,  delay:0.7, dur:3.7, rot:0,   drot:0,   dx:-5 },
      { shape:'circle',  color:'radial-gradient(circle at 30% 30%, #fda4af, #be185d 55%, #831843)', w:14,h:14, x:68, top:4,  delay:1.5, dur:3.5, rot:0,   drot:0,   dx:6  },
      { shape:'sparkle', color:'rgba(255,215,0,0.95)',                                              w:12,h:12, x:25, top:6,  delay:0.4, dur:2.9, rot:0,   drot:180, dx:4  },
      { shape:'sparkle', color:'rgba(255,200,100,0.88)',                                            w:8, h:8,  x:80, top:12, delay:2.1, dur:3.3, rot:15,  drot:195, dx:-5 },
      { shape:'leaf',    color:'#4a7c3f',                                                           w:15,h:21, x:6,  top:5,  delay:0.9, dur:4.3, rot:20,  drot:160, dx:9  },
      { shape:'leaf',    color:'#3d6b35',                                                           w:13,h:18, x:55, top:7,  delay:2.4, dur:4.6, rot:-30, drot:152, dx:-8 },
      { shape:'circle',  color:'rgba(255,235,242,0.70)',                                            w:9, h:9,  x:34, top:14, delay:1.2, dur:3.8, rot:0,   drot:0,   dx:3  },
      { shape:'circle',  color:'rgba(240,252,240,0.60)',                                            w:7, h:7,  x:86, top:6,  delay:1.8, dur:4.0, rot:0,   drot:0,   dx:-3 },
    ],
  },
];

const N = PRODUCTS.length;

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {

  /* ── refs ──────────────────────────────────────────────────────────────── */
  const heroImgEl        = useRef<HTMLImageElement>(null);
  const productScrollEl  = useRef<HTMLElement>(null);
  const stageEl          = useRef<HTMLDivElement>(null);
  const railEl           = useRef<HTMLUListElement>(null);
  const stackEl          = useRef<HTMLDivElement>(null);
  const particlesEl      = useRef<HTMLDivElement>(null);
  const titleEl          = useRef<HTMLHeadingElement>(null);
  const indexEl          = useRef<HTMLParagraphElement>(null);
  const noteEl           = useRef<HTMLDivElement>(null);
  const noteDotsEl       = useRef<HTMLDivElement>(null);
  const bandEl           = useRef<HTMLDivElement>(null);
  const ghostEl          = useRef<HTMLDivElement>(null);
  const categoryEl       = useRef<HTMLParagraphElement>(null);

  const copyHeadEl     = useRef<HTMLDivElement>(null);
  const progressEl     = useRef<HTMLDivElement>(null);
  const rafId          = useRef<number>(0);
  const targetScrollY  = useRef(0);
  const smoothScrollY  = useRef(0);

  const currentIdx  = useRef(-1);
  const lastScrollY = useRef(0);
  const animTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  function setActiveNoteDot(next: number) {
    if (!noteDotsEl.current) return;

    [...noteDotsEl.current.children].forEach((dot, index) => {
      const isActive = index === next;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function goToNote(next: number) {
    if (!noteEl.current) return;

    noteEl.current.scrollTo({
      left: noteEl.current.clientWidth * next,
      behavior: 'smooth',
    });
    setActiveNoteDot(next);
  }

  /* ── cup swap engine — timing matches prototype exactly ─────────────────
     Exit:  0.33s cubic-bezier(.55,0,.85,.35)
     Enter: 0.90s cubic-bezier(.16,1,.3,1) + 0.12s delay
     Cleanup: setTimeout 1050ms removes stale wrappers
  ─────────────────────────────────────────────────────────────────────────── */
  function changeProduct(next: number, reverse: boolean) {
    if (next === currentIdx.current) return;
    const p = PRODUCTS[next];

    /* stage background */
    if (stageEl.current) stageEl.current.style.backgroundColor = p.tint;

    /* rail active state */
    if (railEl.current) {
      [...railEl.current.children].forEach((li, j) =>
        li.classList.toggle('active', j === next)
      );
    }

    /* text fade-out → update → fade-in */
    const doTextUpdate = () => {
      if (titleEl.current)    titleEl.current.textContent = p.name;
      if (categoryEl.current) categoryEl.current.textContent = p.category;
      if (indexEl.current)
        indexEl.current.textContent = `${String(next + 1).padStart(2, '0')} / 05`;
      if (ghostEl.current)
        ghostEl.current.textContent = String(next + 1).padStart(2, '0');
      if (noteEl.current) {
        noteEl.current.innerHTML = p.notes
          .map(([label, text], i) => `<div class="product-note-item" style="--note-i:${i}"><h3>${label}</h3><p>${text}</p></div>`)
          .join('');
        noteEl.current.scrollLeft = 0;
      }
      setActiveNoteDot(0);
    };

    const isFirstLoad = currentIdx.current === -1;
    if (!REDUCED && !isFirstLoad && (copyHeadEl.current || noteEl.current)) {
      const textEls = [copyHeadEl.current, noteEl.current].filter(Boolean) as HTMLElement[];
      const captured = next;
      textEls.forEach(el => {
        el.style.animation = 'none';
        void el.offsetHeight; // force reflow
        el.classList.add('text-leaving');
      });
      setTimeout(() => {
        if (currentIdx.current !== captured) return; // stale — another product queued
        doTextUpdate();
        textEls.forEach(el => {
          el.classList.remove('text-leaving');
          el.classList.add('text-entering');
          el.addEventListener('animationend', () => el.classList.remove('text-entering'), { once: true });
        });
      }, 130);
    } else {
      doTextUpdate();
    }

    if (bandEl.current) {
      bandEl.current.innerHTML =
        `<span>${p.short}</span><span>${p.short}</span><span>${p.short}</span><span>${p.short}</span>`;
    }

    /* cup swap */
    if (stackEl.current) {
      const old = stackEl.current.querySelector<HTMLDivElement>('.cup-wrap:last-child');
      if (old && !REDUCED) {
        old.classList.add('out');
        if (reverse) old.classList.add('rev');
        old.addEventListener('animationend', () => old.remove(), { once: true });
      } else if (old) {
        old.remove();
      }

      const incoming = document.createElement('div');
      incoming.className = 'cup-wrap';
      const img = document.createElement('img');
      img.src = p.photo;
      img.alt = p.name;
      incoming.appendChild(img);

      if (!REDUCED) {
        incoming.classList.add('in');
        if (reverse) incoming.classList.add('rev');
      }
      stackEl.current.appendChild(incoming);

      /* clean up stale wrappers after animation completes */
      if (animTimer.current) clearTimeout(animTimer.current);
      animTimer.current = setTimeout(() => {
        if (stackEl.current && incoming.isConnected) {
          [...stackEl.current.querySelectorAll<HTMLDivElement>('.cup-wrap')]
            .slice(0, -1)
            .forEach(el => el.remove());
          incoming.classList.remove('in', 'rev');
        }
      }, 1050);
    }

    /* particle burst — replace inner HTML to restart CSS animations */
    if (particlesEl.current) {
      particlesEl.current.innerHTML = p.particles.map(pt =>
        `<span class="ptcl ptcl-${pt.shape}" aria-hidden="true" style="` +
        `left:${pt.x}%;top:${pt.top}%;` +
        `width:${pt.w}px;height:${pt.h}px;` +
        `background:${pt.color};` +
        `animation-delay:${pt.delay}s;animation-duration:${pt.dur}s;` +
        `--rot:${pt.rot}deg;--dr:${pt.drot}deg;--dx:${pt.dx}px` +
        `"></span>`
      ).join('');
    }

    currentIdx.current = next;
  }

  /* ── scroll + parallax ──────────────────────────────────────────────────── */
  useEffect(() => {

    /* build rail nav (DOM, not React state — same pattern as prototype) */
    if (railEl.current && railEl.current.children.length === 0) {
      PRODUCTS.forEach((p, i) => {
        const li = document.createElement('li');
        li.innerHTML = `${p.category}<span>${p.name}</span>`;
        if (i === 0) li.classList.add('active');
        railEl.current!.appendChild(li);
      });
    }

    /* init first product */
    changeProduct(0, false);

    /* ── parallax helper — called from RAF loop ──────────────────────── */
    function applyParallax(y: number) {
      if (heroImgEl.current && !REDUCED) {
        heroImgEl.current.style.transform =
          `translateY(${Math.min(18, y * 0.025) - 6}%) scale(1.02)`;
      }
      if (!REDUCED) {
        document.querySelectorAll<HTMLElement>('.parallax-photo').forEach((el, n) => {
          const r = el.parentElement?.getBoundingClientRect();
          if (!r) return;
          const p = (window.innerHeight - r.top) * 0.075 * (n % 2 ? -0.55 : 1);
          el.style.transform =
            `translate3d(0,${Math.max(-42, Math.min(42, p))}px,0) scale(1.04)`;
        });
      }
    }

    /* ── RAF lerp loop — smooths parallax each frame ──────────────────── */
    function tick() {
      const diff = targetScrollY.current - smoothScrollY.current;
      if (Math.abs(diff) > 0.05) {
        smoothScrollY.current += diff * 0.055;
        applyParallax(smoothScrollY.current);
      }
      rafId.current = requestAnimationFrame(tick);
    }

    /* ── scroll handler — product scrub + masthead ─────────────────────
       Parallax is now RAF-driven (lerped). Only discrete changes here. */
    function onScroll() {
      const y = window.scrollY;
      targetScrollY.current = y;

      /* scroll progress bar */
      if (progressEl.current) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const prog = maxScroll > 0 ? Math.min(1, y / maxScroll) : 0;
        progressEl.current.style.transform = `scaleX(${prog})`;
      }

      /* hero scroll cue fades out once user starts scrolling */
      document.querySelector('.hero-scroll')?.classList.toggle('is-scrolled', y > 80);

      /* product series scrub */
      if (productScrollEl.current) {
        const rect      = productScrollEl.current.getBoundingClientRect();
        const sectionTop = y + rect.top;
        const max        = productScrollEl.current.offsetHeight - window.innerHeight;
        const prog       = Math.max(0, Math.min(0.999, (y - sectionTop) / max));
        const next       = Math.min(N - 1, Math.floor(prog * N));
        if (next !== currentIdx.current)
          changeProduct(next, y < lastScrollY.current);
      }

      /* masthead solidifies after first scroll */
      document.querySelector('.masthead')?.classList.toggle('scrolled', y > 40);

      lastScrollY.current = y;
    }

    /* ── IntersectionObserver for section reveals ──────────────────────── */
    const revealIO = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('revealed');
          revealIO.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => revealIO.observe(el));

    /* init */
    smoothScrollY.current = window.scrollY;
    targetScrollY.current = window.scrollY;
    applyParallax(window.scrollY);

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
      revealIO.disconnect();
      if (animTimer.current) clearTimeout(animTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ═══════════════════════════════════ RENDER ══════════════════════════════ */
  return (
    <>
      {/* ── Scroll progress bar ─────────────────────────────────────────────── */}
      <div className="scroll-progress" ref={progressEl} aria-hidden="true" />

      {/* ── MASTHEAD ────────────────────────────────────────────────────────── */}
      <header className="masthead">
        <div className="brand">
          <img src={logoImg} alt="Tao Boba: The Art of Boba" />
        </div>
      </header>
      <a
        href="https://www.exploretock.com/taoboba"
        className="nav-order"
      >
        Order
      </a>

      {/* ══════════════════════════════════════════════ HERO ══════════════════
          Split grid 1.42fr : 1fr.
          Left: full-height photo with JS parallax.
          Right: kicker + h1 + copy + vertical word.
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="hero" id="top">
        <div className="hero-media">
          <img
            ref={heroImgEl}
            src={pinkPour}
            alt="Matcha with pink cream being poured"
          />
        </div>
        <div className="hero-panel">
          <span className="kicker">Denver · Tea · Texture</span>
          <h1>Tea, color, and texture in every layer.</h1>
          <p className="hero-copy">
            Tao Boba turns tea, fruit, cream and texture into drinks that feel as
            good to look at as they do to sip: colorful, layered, and
            unmistakably its own.
          </p>
          <div className="marquee-wrap" aria-hidden="true">
            <div className="marquee-track">
              {'TAO BOBA · '.repeat(8)}
            </div>
          </div>
        </div>
        <div className="hero-small">A modern coffee + boba tea bar</div>
        <div className="hero-scroll" aria-hidden="true">Scroll</div>
      </section>

      {/* ═══════════════════════════ EDITORIAL — petit gateau ═════════════════
          Center dividing line + wave glyphs.
          Row A: copy left  / petit-purple right.
          Row B: petit-orange left / copy right.
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="editorial" id="story">
        <div className="wave w1" aria-hidden="true">~</div>
        <div className="wave w2" aria-hidden="true">~</div>

        <div className="ed-row row-a">
          <div className="ed-copy" data-reveal>
            <h2>Not just sweetness.<br />A study in texture.</h2>
            <span className="ed-sub">Dessert as a little ritual</span>
            <div className="rule" />
            <p>
              Crack, pull, pour, bite. Tao's most memorable moments happen where
              texture becomes part of the experience: glossy shells, soft centers,
              fruit, cream, tea and contrast.
            </p>
          </div>
          <div className="ed-photo" data-reveal data-delay="1">
            <img
              className="parallax-photo"
              src={petitPurple}
              alt="Purple petit gateau broken open"
            />
          </div>
        </div>

        <div className="ed-row row-b">
          <div className="ed-photo" data-reveal>
            <img
              className="parallax-photo"
              src={petitOrange}
              alt="Orange petit gateau broken open"
            />
          </div>
          <div className="ed-copy right" data-reveal data-delay="1">
            <h2>One flavor.<br />Three textures. One bite.</h2>
            <span className="ed-sub">Petit gateau, made in Denver</span>
            <div className="rule" />
            <p>
              Every petit gateau starts as a single idea: orange, ube, strawberry.
              It becomes a shell that cracks, a mousse that gives, and a center
              that's worth the whole thing.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ PRODUCT SEQUENCE — 500vh pinned ══════════
          3-column grid: 13% rail nav | 50% copy | 34% cup stack.
          Left rail: all 5 drinks, active indicator line.
          Center: index, title, Flavor + Finish notes.
          Right: cup swap at 70vh.
          Ghost glyph (number) top-right.
          Word band (repeated short name) bottom.
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="product-scroll"
        id="drinks"
        ref={productScrollEl}
      >
        <div
          className="product-stage"
          ref={stageEl}
          style={{ backgroundColor: PRODUCTS[0].tint }}
        >
          {/* Ghost glyph — number, Baskerville */}
          <div className="ghost-glyph" ref={ghostEl} aria-hidden="true">01</div>

          {/* Rail nav — built by JS in useEffect */}
          <nav className="series-rail" aria-label="Series index">
            <ul ref={railEl} />
          </nav>

          {/* Copy column */}
          <div className="product-copy-head" ref={copyHeadEl}>
            <p className="product-index" ref={indexEl}>01 / 05</p>
            <p className="product-category" ref={categoryEl}>{PRODUCTS[0].category}</p>
            <h2 className="product-title" ref={titleEl}>
              {PRODUCTS[0].name}
            </h2>
          </div>

          <div className="product-copy-body">
            <div
              className="product-note"
              ref={noteEl}
              onScroll={(event) => {
                const scroller = event.currentTarget;
                if (!scroller.clientWidth) return;

                const active = Math.max(
                  0,
                  Math.min(2, Math.round(scroller.scrollLeft / scroller.clientWidth)),
                );
                setActiveNoteDot(active);
              }}
            >
              {PRODUCTS[0].notes.map(([label, text]) => (
                <div className="product-note-item" key={label}>
                  <h3>{label}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div className="product-note-dots" ref={noteDotsEl} aria-label="Drink details">
              {['Flavor', 'Build', 'Finish'].map((label, index) => (
                <button
                  key={label}
                  type="button"
                  className={`product-note-dot${index === 0 ? ' active' : ''}`}
                  aria-label={`Show ${label}`}
                  aria-current={index === 0 ? 'true' : 'false'}
                  onClick={() => goToNote(index)}
                />
              ))}
            </div>
          </div>

          {/* Cup stack — DOM injection target */}
          <div className="cup-stack" ref={stackEl} aria-live="polite">
            <div className="cup-particles" ref={particlesEl} aria-hidden="true" />
          </div>

          {/* CTA */}
          <a className="product-cta" href="#essay">
            View collection <i />
          </a>

          {/* Word band — repeated short name, Baskerville */}
          <div className="word-band" ref={bandEl} aria-hidden="true">
            <span>{PRODUCTS[0].short}</span>
            <span>{PRODUCTS[0].short}</span>
            <span>{PRODUCTS[0].short}</span>
            <span>{PRODUCTS[0].short}</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ LOWER STORY — seasonal editorial ══════════
          Same visual grammar as first editorial.
          Row D: copy left / golden-rose right.
          Row E: cupid-love left / copy right.
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="lower-story" id="essay">
        <div className="wave" style={{ top: '18%' }} aria-hidden="true">~</div>
        <div className="wave" style={{ top: '61%' }} aria-hidden="true">~</div>

        <div className="ed-row row-d">
          <div className="ed-copy" data-reveal>
            <h2>One season.<br />One reason to go green.</h2>
            <span className="ed-sub">The Golden Rose special</span>
            <div className="rule" />
            <p>
              Rose cream on ceremonial matcha, poured slow until it settles into
              layers. A Tao seasonal, made in-house while the season holds.
            </p>
          </div>
          <div className="ed-photo campaign-crop golden" data-reveal data-delay="1">
            <img
              className="parallax-photo"
              src={goldenRose}
              alt="Golden Rose Matcha Latte"
            />
          </div>
        </div>

        <div className="ed-row row-e">
          <div className="ed-photo campaign-crop cupid" data-reveal>
            <img
              className="parallax-photo"
              src={cupidLove}
              alt="Cupid Love seasonal drink"
            />
          </div>
          <div className="ed-copy right" data-reveal data-delay="1">
            <h2>Pour, layer,<br />finish.</h2>
            <span className="ed-sub">Cupid Love, strawberry &amp; cream</span>
            <div className="rule" />
            <p>
              Strawberry tea at the base, taro pearls in the middle, and a soft
              cream cap poured to order. Each layer sets on its own. Yours to break.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CLOSING — full-width CTA panel ══════════
          Centered headline + address. No cups.
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="closing">
        <div className="closing-rule" aria-hidden="true" data-reveal />
        <span className="kicker" data-reveal data-delay="1">Five signatures · one collection</span>
        <h2 className="closing-headline" data-reveal data-delay="2">Come back<br />to the drinks.</h2>
        <p className="closing-address" data-reveal data-delay="3">
          1550 S Federal Blvd · Denver, CO · Mon–Sun 11:00–21:00
        </p>
        <a
          href="https://www.exploretock.com/taoboba"
          className="closing-cta"
          data-reveal data-delay="3"
        >
          Order now
        </a>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logoImg} alt="Tao Boba" />
          </div>
          <div className="footer-meta">
            Denver, Colorado<br />
            1550 S Federal Blvd<br />
            Mon – Sun 11:00 – 21:00
          </div>
        </div>
        <div className="footer-bottom">
          <span>Tea · Coffee · Boba · Dessert</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
