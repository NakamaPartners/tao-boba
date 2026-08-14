import { useEffect, useRef, useState } from 'react';

import logoPath        from "@assets/image_1786554649837.png";
import heroPhotoPath   from "@assets/🦋_Meet_your_new_summer_obsession._Butterfly_Mango_Breeze—spar_1786554450238.jpg";
// Original studio shot for hero panel — cream background blends with white panel naturally
import heroCupJpgPath  from "@assets/Tao_Luxe_Line_1786723849605.jpeg";
import edit1Path       from "@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554467811.jpg";
import edit2Path       from "@assets/Have_you_tried_Petit_Gateau_at_Tao_Boba_yet_🍰_Its_the_kind_of_1786554447103.jpg";
import edit3Path       from "@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554470275.jpg";
// Transparent PNGs for the series floating cup (needed for the tinted backgrounds)
import cupTaoLuxePath  from "@assets/cup_tao_luxe_no_bg.png";
import cupMatchaPath   from "@assets/cup_matcha_no_bg.png";
import cupBrownSugarPath from "@assets/cup_brown_sugar_no_bg.png";

/* ─── content ─────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    name:  'Tao Luxe',
    tint:  '#f7f4ee',
    word:  'TAO LUXE',
    cup:   cupTaoLuxePath,
    notes: [
      ['Golden Oolong & Butterfly Pea', 'A two-tone gradient that shifts from golden amber to deep violet as it rises. The layering is the point — stirring is optional.'],
      ['Signature Luxe Foam', 'House-whipped cream poured slow so the two layers meet without mixing. Holds its line from first sip to last.'],
      ['Hand-Assembled to Order', 'Every Tao Luxe is built per order. The sequence of layering matters. Nothing is premixed, nothing is held.'],
    ],
  },
  {
    name:  'Matcha Madness',
    tint:  '#f0f5ee',
    word:  'MATCHA',
    cup:   cupMatchaPath,
    notes: [
      ['Ceremonial Grade', 'Japanese ceremonial-grade matcha prepared cold for a clean, grassy finish — not the bitterness that comes from hot extraction.'],
      ['Three-Layer Build', 'Matcha over strawberry over taro. Three distinct flavors. Drink them layered or stirred — both are the right answer.'],
      ['Fresh Pearls Daily', 'Tapioca pearls cooked each morning in brown sugar syrup. None carry over. If we run out, the drink is pulled for the day.'],
    ],
  },
  {
    name:  'Brown Sugar',
    tint:  '#f5efe6',
    word:  'BROWN SUGAR',
    cup:   cupBrownSugarPath,
    notes: [
      ['Slow-Roasted Syrup', 'Brown sugar cooked over low heat until it deeply caramelizes. Complex and dark — not just sweet.'],
      ['House Milk Tea Base', 'Strong black tea steeped twice for body, blended with whole milk. No creamers. No shortcuts.'],
      ['Same-Day Pearls', 'Fresh tapioca every morning in the same brown sugar syrup. Soft all the way through. Never hard at the center.'],
    ],
  },
] as const;

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── component ────────────────────────────────────────────────────── */
export default function Home() {
  /* DOM refs that the scroll engine writes to directly */
  const seriesEl    = useRef<HTMLElement>(null);
  const stageEl     = useRef<HTMLDivElement>(null);
  const stackEl     = useRef<HTMLDivElement>(null);
  const nameEl      = useRef<HTMLSpanElement>(null);
  const notesEl     = useRef<HTMLDivElement>(null);
  const bandEl      = useRef<HTMLDivElement>(null);
  const railEl      = useRef<HTMLUListElement>(null);
  const editEl      = useRef<HTMLElement>(null);
  const editCols    = useRef<HTMLDivElement[]>([]);
  const originEl    = useRef<HTMLElement>(null);
  const originType  = useRef<HTMLDivElement>(null);
  const originBg    = useRef<HTMLDivElement>(null);

  /* live cup tracking — outside React state so scroll handler never stales */
  const currentRef  = useRef(-1);
  const liveCup     = useRef<HTMLDivElement | null>(null);

  /* rail highlighting is React-managed (no animation, just colour) */
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── cup transition — exact port of reference goTo() ──────────── */
  function goTo(i: number, dir: number) {
    if (i === currentRef.current) return;
    if (!stackEl.current || !stageEl.current) return;

    const p   = PRODUCTS[i];
    const rev = dir < 0;

    /* build incoming wrapper + real <img> */
    const incoming = document.createElement('div');
    incoming.className = 'cup-wrap';
    const img = document.createElement('img');
    img.src       = p.cup;
    img.className = 'cup-img';
    img.alt       = p.name;
    incoming.appendChild(img);
    stackEl.current.appendChild(incoming);

    /* exit the current cup */
    if (liveCup.current && !REDUCED) {
      const out = liveCup.current;
      out.classList.add('is-exiting');
      if (rev) out.classList.add('rev');
      out.addEventListener('animationend', () => out.remove(), { once: true });
    } else if (liveCup.current) {
      liveCup.current.remove();
    }

    /* enter the new cup */
    if (!REDUCED) {
      incoming.classList.add('is-entering');
      if (rev) incoming.classList.add('rev');
    }
    liveCup.current = incoming;

    /* background tint — CSS transition handles the crossfade */
    stageEl.current.style.backgroundColor = p.tint;

    /* wordband — static text swap */
    if (bandEl.current)
      bandEl.current.textContent = (p.word + '\u00A0\u00A0').repeat(8);

    /* heading — 0s, fade-swap class reflow trick */
    if (nameEl.current) {
      nameEl.current.textContent = p.name;
      nameEl.current.classList.remove('fade-swap');
      void nameEl.current.offsetWidth;          // force reflow → restart animation
      nameEl.current.classList.add('fade-swap');
    }

    /* notes — +0.12s via .d2 CSS delay */
    if (notesEl.current) {
      notesEl.current.innerHTML = '';
      p.notes.forEach(([h, b]) => {
        const d    = document.createElement('div');
        d.className = 'note fade-swap d2';
        d.innerHTML = `<h3>${h} <em>✦</em></h3><p>${b}</p>`;
        notesEl.current!.appendChild(d);
      });
    }

    currentRef.current = i;
    setActiveIdx(i);   /* triggers rail re-render */
  }

  /* ── mount: boot + scroll engine ─────────────────────────────────── */
  useEffect(() => {
    goTo(0, 1);

    /* series scrub */
    function updateSeries() {
      const el = seriesEl.current;
      if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p     = Math.min(Math.max(-rect.top / total, 0), 0.9999);
      const i     = Math.floor(p * PRODUCTS.length);
      if (i !== currentRef.current) goTo(i, i > currentRef.current ? 1 : -1);
    }

    /* editorial parallax — left 1 : right 0.2 */
    function updateParallax() {
      const el = editEl.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      const p = (vh - rect.top) / (vh + rect.height);
      editCols.current.forEach(col => {
        const rate = parseFloat(col.dataset.rate ?? '1');
        col.style.transform =
          `translate3d(0,${(-(p - 0.5) * 260 * rate).toFixed(2)}px,0)`;
      });
    }

    /* velocity-coupled marquee + parallax bg */
    let mqX = 0, vel = 0, lastY = window.scrollY, typeW = 0, rafId = 0;

    function measure() {
      if (originType.current) typeW = originType.current.scrollWidth / 4;
    }

    function tick() {
      const y   = window.scrollY;
      const raw = y - lastY; lastY = y;
      vel += (raw - vel) * 0.18;

      const base = REDUCED ? 0 : 0.55;
      mqX -= base + Math.abs(vel) * 0.45;
      if (typeW && mqX <= -typeW) mqX += typeW;
      if (originType.current)
        originType.current.style.transform =
          `translate3d(${mqX.toFixed(2)}px,0,0)`;

      if (originBg.current && originEl.current) {
        const r = originEl.current.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const pp = (window.innerHeight - r.top) / (window.innerHeight + r.height);
          originBg.current.style.transform =
            `translate3d(0,${((pp - 0.5) * -90).toFixed(2)}px,0)`;
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    measure();
    updateSeries();
    updateParallax();

    let queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        updateSeries();
        updateParallax();
        queued = false;
      });
    }
    const onResize = () => { measure(); onScroll(); };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── render ───────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <header className="masthead" aria-label="Tao Boba">
        <div className="mark">
          <img src={logoPath} className="mark__logo" alt="Tao Boba" />
        </div>
      </header>
      <a href="https://www.thetaoboba.com/menu"       className="nav-link">Menu</a>
      <a href="https://www.exploretock.com/taoboba"   className="nav-order">Order</a>

      {/* ── 1 · HERO ────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__media">
          <img src={heroPhotoPath} className="hero__bg" alt="" />

          {/* 90-deg looping marquee — the Andtea signature */}
          <div className="marquee-v" aria-hidden="true">
            <span className="marquee-v__track">
              THE ART OF BOBA&nbsp;&nbsp;
              THE ART OF BOBA&nbsp;&nbsp;
              THE ART OF BOBA&nbsp;&nbsp;
              THE ART OF BOBA&nbsp;&nbsp;
            </span>
          </div>

          <div className="hero__caption">Denver, Colorado · Est. 2021</div>
        </div>

        <div className="hero__panel">
          <img src={heroCupJpgPath} className="hero__cup" alt="Tao Luxe" />
          <div className="hero__scroll"><i />Scroll</div>
        </div>
      </section>

      {/* ── 2 · SERIES · pinned + scrubbed ──────────────────────────── */}
      {/*
        Outer is tall (n × 100svh). Inner is sticky.
        Scroll progress through outer drives the product index.
        Cup is absolutely still at rest — motion only at index boundaries.
      */}
      <section
        className="series"
        ref={seriesEl}
        style={{ height: `${PRODUCTS.length * 100}svh` }}
      >
        <div
          className="series__stage"
          ref={stageEl}
          style={{ backgroundColor: PRODUCTS[0].tint }}
        >
          {/* left rail — React manages is-on so there's no stale closure */}
          <nav className="rail" aria-label="Drink index">
            <ul ref={railEl}>
              {PRODUCTS.map((p, i) => (
                <li key={i} className={i === activeIdx ? 'is-on' : ''}>
                  {p.name}
                  <span className="sub">Tao Boba</span>
                </li>
              ))}
            </ul>
          </nav>

          {/* center body — name + notes managed by goTo() via refs */}
          <div className="series__body">
            <h1 className="series__title">
              <span className="name" ref={nameEl}>{PRODUCTS[0].name}</span>
              <span className="suffix">Series</span>
            </h1>
            <div className="notes" ref={notesEl}>
              {/* populated by goTo() on mount */}
            </div>
          </div>

          {/* right: cup stack — entirely direct-DOM, never touched by React */}
          <div className="series__stack" ref={stackEl} />

          <div className="cta-series">
            <a href="https://www.thetaoboba.com/menu">
              View the series <i />
            </a>
          </div>

          {/* word band — swaps text, does not scroll */}
          <div className="wordband" ref={bandEl} aria-hidden="true" />
        </div>
      </section>

      {/* ── 3 · EDITORIAL · two columns at different parallax rates ──── */}
      {/*
        Left  data-rate="1"   → travels ±130px across scroll range
        Right data-rate="0.2" → travels ±26px  — barely moves
        Ratio 1 : 0.2 matches reference exactly
      */}
      <section className="editorial" ref={editEl}>
        <div
          className="col col--media"
          data-rate="1"
          ref={el => { if (el) editCols.current[0] = el }}
        >
          <div className="frame">
            <img src={edit1Path} alt="Craft 01" />
          </div>
          <div className="frame tall">
            <img src={edit2Path} alt="Craft 02" />
          </div>
          <div className="frame">
            <img src={edit3Path} alt="Craft 03" />
          </div>
        </div>

        <div
          className="col col--copy"
          data-rate="0.2"
          ref={el => { if (el) editCols.current[1] = el }}
        >
          <div>
            <p className="eyebrow">The tea</p>
            <h2>Premium leaves, brewed for the cup</h2>
            <p>
              We source single-origin teas prepared to extract what makes each
              varietal distinct. No blending to mask. No shortcuts in the brew.
            </p>
            <a className="more" href="https://www.thetaoboba.com/menu">
              Our menu <i />
            </a>
          </div>
          <div>
            <p className="eyebrow">The pour</p>
            <h2>Layers that hold from first sip to last</h2>
            <p>
              Cream is folded, not poured, so the two layers meet without
              mixing. The cup holds its line long after it leaves the counter.
            </p>
            <a className="more" href="https://www.thetaoboba.com/menu">
              View drinks <i />
            </a>
          </div>
          <div>
            <p className="eyebrow">The pearls</p>
            <h2>Made the same morning. No carry-over.</h2>
            <p>
              Tapioca pearls are cooked fresh each morning. If they run out,
              the drink is pulled — not replaced with yesterday's batch.
            </p>
            <a className="more" href="https://www.exploretock.com/taoboba">
              Order now <i />
            </a>
          </div>
        </div>
      </section>

      {/* ── 4 · ORIGIN · velocity-coupled marquee ────────────────────── */}
      <section className="origin" ref={originEl}>
        <div
          className="origin__bg"
          ref={originBg}
          style={{
            backgroundImage:    `url(${heroPhotoPath})`,
            backgroundSize:     'cover',
            backgroundPosition: 'center 35%',
          }}
        />
        <div className="origin__type" ref={originType} aria-hidden="true">
          <span>MADE IN DENVER</span>
          <span>MADE IN DENVER</span>
          <span>MADE IN DENVER</span>
          <span>MADE IN DENVER</span>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="foot">
        <div className="foot__meta">
          11:00 – 21:00<br />
          (303) 993-7686<br />
          1550 S Federal Blvd, Denver CO 80219
        </div>
        <div className="foot__mark">
          <img src={logoPath} className="foot__logo" alt="Tao Boba" />
        </div>
        <button
          className="totop"
          onClick={() => scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' })}
        >
          ↑<br />TOP
        </button>
      </footer>
    </>
  );
}
