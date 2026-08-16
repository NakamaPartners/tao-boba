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
import cup2 from '@assets/brown-sugar-boba-clean.png';
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
  name: string; short: string; photo: string;
  tint: string; tone: string;
  copy: readonly [string, string];
  particles: Ptcl[];
}> = [
  {
    name:  'Ube Latte',
    short: 'Ube',
    photo: cup1,
    tint:  '#f0eaf7',
    tone:  '#6b3fa0',
    copy:  [
      'Creamy ube latte with earthy purple taro — rich, sweet and unmistakably vibrant.',
      'Bold in color, smooth in taste. The drink that turns heads first.',
    ],
    /* ube petals (deep purple), lavender circles, cream dots */
    particles: [
      { shape:'circle', color:'#7c3aed', w:11,h:11, x:12, top:4,  delay:0,   dur:1.8, rot:0, drot:0, dx:6  },
      { shape:'circle', color:'#6d28d9', w:9, h:9,  x:35, top:9,  delay:0.4, dur:1.7, rot:0, drot:0, dx:-5 },
      { shape:'circle', color:'#8b5cf6', w:12,h:12, x:58, top:3,  delay:0.8, dur:1.9, rot:0, drot:0, dx:7  },
      { shape:'circle', color:'#5b21b6', w:8, h:8,  x:80, top:11, delay:1.4, dur:1.6, rot:0, drot:0, dx:-4 },
      { shape:'circle', color:'#a78bfa', w:10,h:10, x:22, top:13, delay:0.2, dur:2.0, rot:0, drot:0, dx:5  },
      { shape:'circle', color:'#c4b5fd', w:7, h:7,  x:48, top:7,  delay:0.9, dur:1.8, rot:0, drot:0, dx:-3 },
      { shape:'circle', color:'#4c1d95', w:9, h:9,  x:68, top:15, delay:1.6, dur:1.7, rot:0, drot:0, dx:4  },
      { shape:'petal',  color:'#7c3aed', w:13,h:9,  x:30, top:5,  delay:0.5, dur:2.2, rot:30,  drot:140, dx:8  },
      { shape:'petal',  color:'#a78bfa', w:15,h:10, x:72, top:8,  delay:1.2, dur:2.4, rot:-25, drot:155, dx:-7 },
      { shape:'circle', color:'rgba(245,240,255,.85)', w:6,h:6, x:44,top:16, delay:0.7, dur:2.0, rot:0, drot:0, dx:3  },
    ],
  },
  {
    name:  'Authentic Milk Tea',
    short: 'Milk Tea',
    photo: cup2,
    tint:  '#f4ede0',
    tone:  '#8b5e3c',
    copy:  [
      'Classic milk tea with brown sugar boba — the one that started it all.',
      'Creamy, warming and deeply satisfying. Timeless for a reason.',
    ],
    /* brown sugar swirls (dark amber circles), boba pearls, cream dots */
    particles: [
      { shape:'circle', color:'rgba(101,62,20,.90)',  w:10,h:10, x:12, top:4,  delay:0,   dur:1.7, rot:0, drot:0, dx:5  },
      { shape:'circle', color:'rgba(139,94,60,.85)',  w:8, h:8,  x:35, top:9,  delay:0.4, dur:1.6, rot:0, drot:0, dx:-4 },
      { shape:'circle', color:'rgba(80,45,12,.90)',   w:11,h:11, x:58, top:3,  delay:0.8, dur:1.8, rot:0, drot:0, dx:6  },
      { shape:'circle', color:'rgba(120,78,35,.85)',  w:7, h:7,  x:78, top:11, delay:1.3, dur:1.6, rot:0, drot:0, dx:-4 },
      { shape:'circle', color:'rgba(40,20,5,.90)',    w:9, h:9,  x:22, top:13, delay:0.2, dur:1.9, rot:0, drot:0, dx:4  },
      { shape:'circle', color:'rgba(30,15,5,.85)',    w:7, h:7,  x:50, top:16, delay:1.0, dur:1.7, rot:0, drot:0, dx:-3 },
      { shape:'circle', color:'rgba(50,28,8,.80)',    w:8, h:8,  x:70, top:14, delay:1.6, dur:1.8, rot:0, drot:0, dx:5  },
      { shape:'circle', color:'rgba(210,175,130,.80)', w:6,h:6, x:42, top:6,  delay:0.6, dur:2.0, rot:0, drot:0, dx:3  },
      { shape:'circle', color:'rgba(230,200,160,.75)', w:5,h:5, x:65, top:18, delay:1.4, dur:1.9, rot:0, drot:0, dx:-3 },
      { shape:'circle', color:'rgba(185,140,90,.70)',  w:7,h:7, x:88, top:7,  delay:0.9, dur:1.6, rot:0, drot:0, dx:-4 },
    ],
  },
  {
    name:  'Matcha Latte',
    short: 'Matcha',
    photo: cup3,
    tint:  '#edf2e8',
    tone:  '#3d6b35',
    copy:  [
      'Rich matcha poured over fresh milk, layered with boba pearls at the base.',
      'Deep, earthy and creamy. The purist\'s pick.',
    ],
    /* matcha powder dots, tea leaves, cream circles */
    particles: [
      { shape:'circle', color:'rgba(61,107,53,.95)',  w:9, h:9,  x:15, top:4,  delay:0,   dur:1.6, rot:0, drot:0, dx:5  },
      { shape:'circle', color:'rgba(74,124,63,.90)',  w:7, h:7,  x:38, top:9,  delay:0.4, dur:1.5, rot:0, drot:0, dx:-4 },
      { shape:'circle', color:'rgba(90,158,58,.85)',  w:8, h:8,  x:60, top:3,  delay:0.8, dur:1.7, rot:0, drot:0, dx:6  },
      { shape:'circle', color:'rgba(53,94,43,.90)',   w:6, h:6,  x:80, top:11, delay:1.3, dur:1.5, rot:0, drot:0, dx:-4 },
      { shape:'circle', color:'rgba(106,170,64,.80)', w:5, h:5,  x:25, top:14, delay:0.2, dur:1.8, rot:0, drot:0, dx:3  },
      { shape:'circle', color:'rgba(40,20,5,.85)',    w:8, h:8,  x:48, top:16, delay:1.1, dur:1.7, rot:0, drot:0, dx:-3 },
      { shape:'circle', color:'rgba(30,15,5,.80)',    w:6, h:6,  x:68, top:13, delay:1.7, dur:1.6, rot:0, drot:0, dx:4  },
      { shape:'leaf',   color:'#3d6b35', w:12,h:17, x:8,  top:5,  delay:0.6, dur:2.2, rot:20,  drot:170, dx:7  },
      { shape:'leaf',   color:'#4a7c3f', w:10,h:14, x:72, top:7,  delay:1.4, dur:2.0, rot:-25, drot:155, dx:-6 },
      { shape:'circle', color:'rgba(255,250,245,.75)', w:6, h:6, x:35, top:6,  delay:0.9, dur:2.1, rot:0, drot:0, dx:4  },
    ],
  },
  {
    name:  'Passion Fruit Green Tea',
    short: 'Passion Fruit',
    photo: cup4,
    tint:  '#f6f2e4',
    tone:  '#5a8c2a',
    copy:  [
      'Sun-bright passionfruit poured over chilled green tea, with boba and coconut jelly.',
      'Tropical, layered and built for heat. Every sip is a different depth.',
    ],
    /* passion fruit seeds (golden), green tea leaves, boba pearls (dark) */
    particles: [
      { shape:'circle', color:'#c8a820', w:10,h:10, x:15, top:4,  delay:0,   dur:1.7, rot:0, drot:0, dx:5  },
      { shape:'circle', color:'#e4c030', w:8, h:8,  x:38, top:8,  delay:0.5, dur:1.6, rot:0, drot:0, dx:-4 },
      { shape:'circle', color:'#d4b025', w:11,h:11, x:60, top:3,  delay:1.0, dur:1.8, rot:0, drot:0, dx:6  },
      { shape:'circle', color:'#b89010', w:7, h:7,  x:82, top:10, delay:1.5, dur:1.6, rot:0, drot:0, dx:-5 },
      { shape:'circle', color:'rgba(60,30,10,.90)',  w:9, h:9,  x:25, top:12, delay:0.3, dur:1.9, rot:0, drot:0, dx:4  },
      { shape:'circle', color:'rgba(40,20,5,.85)',   w:7, h:7,  x:55, top:16, delay:1.2, dur:1.7, rot:0, drot:0, dx:-3 },
      { shape:'leaf',   color:'#4a7c3f', w:12,h:17, x:10, top:6,  delay:0.7, dur:2.0, rot:25,  drot:160, dx:7  },
      { shape:'leaf',   color:'#5a9e3a', w:10,h:15, x:45, top:5,  delay:1.4, dur:2.2, rot:-20, drot:150, dx:-6 },
      { shape:'leaf',   color:'#3d6b35', w:13,h:18, x:72, top:9,  delay:0.2, dur:1.9, rot:40,  drot:165, dx:8  },
      { shape:'circle', color:'rgba(255,240,200,.85)', w:6,h:6, x:68,top:14, delay:0.8, dur:2.0, rot:0, drot:0, dx:-4 },
    ],
  },
  {
    name:  'Strawberry Matcha Latte',
    short: 'Strawberry',
    photo: cup5,
    tint:  '#fce9ee',
    tone:  '#d4486a',
    copy:  [
      'Bright strawberry meets earthy matcha cream in a vivid two-tone pour.',
      'Sweet, lush and striking. A drink that looks as good as it tastes.',
    ],
    /* matcha leaves (green), strawberry dots (red/pink), cream circles */
    particles: [
      { shape:'leaf',   color:'#4a7c3f', w:13,h:19, x:10, top:3,  delay:0,   dur:2.1, rot:20,  drot:165, dx:7  },
      { shape:'leaf',   color:'#5a9e3a', w:11,h:16, x:35, top:8,  delay:0.5, dur:2.3, rot:-30, drot:150, dx:-8 },
      { shape:'leaf',   color:'#3d6b35', w:14,h:20, x:60, top:4,  delay:1.0, dur:2.0, rot:40,  drot:170, dx:9  },
      { shape:'leaf',   color:'#6aab42', w:10,h:15, x:80, top:11, delay:1.6, dur:2.4, rot:-15, drot:155, dx:-6 },
      { shape:'circle', color:'#e8325a', w:11,h:11, x:20, top:5,  delay:0.3, dur:1.7, rot:0,   drot:0,   dx:5  },
      { shape:'circle', color:'#f06080', w:9, h:9,  x:48, top:9,  delay:0.8, dur:1.6, rot:0,   drot:0,   dx:-4 },
      { shape:'circle', color:'#c02050', w:12,h:12, x:68, top:6,  delay:1.3, dur:1.8, rot:0,   drot:0,   dx:6  },
      { shape:'circle', color:'rgba(240,96,128,.85)', w:8,h:8, x:85,top:14, delay:1.9, dur:1.6, rot:0, drot:0, dx:-5 },
      { shape:'circle', color:'rgba(255,230,235,.90)', w:7,h:7, x:30,top:14, delay:0.6, dur:1.9, rot:0, drot:0, dx:3  },
      { shape:'circle', color:'rgba(255,220,230,.80)', w:5,h:5, x:55,top:17, delay:1.5, dur:2.0, rot:0, drot:0, dx:-3 },
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
  const bandEl           = useRef<HTMLDivElement>(null);
  const ghostEl          = useRef<HTMLDivElement>(null);

  const currentIdx  = useRef(-1);
  const lastScrollY = useRef(0);
  const animTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    /* text updates */
    if (titleEl.current) titleEl.current.textContent = p.name;
    if (indexEl.current)
      indexEl.current.textContent = `${String(next + 1).padStart(2, '0')} / 05`;
    if (ghostEl.current)
      ghostEl.current.textContent = String(next + 1).padStart(2, '0');
    if (noteEl.current) {
      noteEl.current.innerHTML = `
        <div class="product-note-item"><h3>Flavor</h3><p>${p.copy[0]}</p></div>
        <div class="product-note-item"><h3>Finish</h3><p>${p.copy[1]}</p></div>
      `;
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
        li.innerHTML = `${p.short}<span>Series ${String(i + 1).padStart(2, '0')}</span>`;
        if (i === 0) li.classList.add('active');
        railEl.current!.appendChild(li);
      });
    }

    /* init first product */
    changeProduct(0, false);

    /* unified scroll handler — matches prototype onScroll() exactly */
    function onScroll() {
      const y = window.scrollY;

      /* hero parallax */
      if (heroImgEl.current && !REDUCED) {
        heroImgEl.current.style.transform =
          `translateY(${Math.min(18, y * 0.025) - 6}%) scale(1.02)`;
      }

      /* editorial parallax — same 0.06 rate, alternating direction */
      if (!REDUCED) {
        document.querySelectorAll<HTMLElement>('.parallax-photo').forEach((el, n) => {
          const r = el.parentElement?.getBoundingClientRect();
          if (!r) return;
          const p = (window.innerHeight - r.top) * 0.06 * (n % 2 ? -0.6 : 1);
          el.style.transform =
            `translate3d(0,${Math.max(-42, Math.min(42, p))}px,0) scale(1.04)`;
        });
      }

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

      lastScrollY.current = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animTimer.current) clearTimeout(animTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ═══════════════════════════════════ RENDER ══════════════════════════════ */
  return (
    <>
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
          <div className="ed-copy">
            <h2>Not just sweetness.<br />A study in texture.</h2>
            <span className="ed-sub">Dessert as a little ritual</span>
            <div className="rule" />
            <p>
              Crack, pull, pour, bite. Tao's most memorable moments happen where
              texture becomes part of the experience: glossy shells, soft centers,
              fruit, cream, tea and contrast.
            </p>
          </div>
          <div className="ed-photo">
            <img
              className="parallax-photo"
              src={petitPurple}
              alt="Purple petit gateau broken open"
            />
          </div>
        </div>

        <div className="ed-row row-b">
          <div className="ed-photo">
            <img
              className="parallax-photo"
              src={petitOrange}
              alt="Orange petit gateau broken open"
            />
          </div>
          <div className="ed-copy right">
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
          <div className="product-copy-head">
            <p className="product-index" ref={indexEl}>01 / 05</p>
            <h2 className="product-title" ref={titleEl}>
              {PRODUCTS[0].name}
            </h2>
          </div>

          <div className="product-copy-body">
            <div className="product-note" ref={noteEl}>
              <div className="product-note-item">
                <h3>Flavor</h3>
                <p>{PRODUCTS[0].copy[0]}</p>
              </div>
              <div className="product-note-item">
                <h3>Finish</h3>
                <p>{PRODUCTS[0].copy[1]}</p>
              </div>
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
          <div className="ed-copy">
            <h2>One season.<br />One reason to go green.</h2>
            <span className="ed-sub">The Golden Rose special</span>
            <div className="rule" />
            <p>
              Rose cream on ceremonial matcha, poured slow until it settles into
              layers. A Tao seasonal, made in-house while the season holds.
            </p>
          </div>
          <div className="ed-photo campaign-crop golden">
            <img
              className="parallax-photo"
              src={goldenRose}
              alt="Golden Rose Matcha Latte"
            />
          </div>
        </div>

        <div className="ed-row row-e">
          <div className="ed-photo campaign-crop cupid">
            <img
              className="parallax-photo"
              src={cupidLove}
              alt="Cupid Love seasonal drink"
            />
          </div>
          <div className="ed-copy right">
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
        <div className="closing-rule" aria-hidden="true" />
        <span className="kicker">Five signatures · one collection</span>
        <h2 className="closing-headline">Come back<br />to the drinks.</h2>
        <p className="closing-address">
          1550 S Federal Blvd · Denver, CO · Mon–Sun 11:00–21:00
        </p>
        <a
          href="https://www.exploretock.com/taoboba"
          className="closing-cta"
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
