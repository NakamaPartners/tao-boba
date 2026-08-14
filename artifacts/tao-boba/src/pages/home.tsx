import { useEffect, useRef, useState } from 'react';

import logoPath         from "@assets/image_1786554649837.png";
import heroSummerPath   from "@assets/image_1786729078505.png";
import heroOriginPath   from "@assets/🦋_Meet_your_new_summer_obsession._Butterfly_Mango_Breeze—spar_1786554450238.jpg";
import edit1Path        from "@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554467811.jpg";
import edit2Path        from "@assets/Have_you_tried_Petit_Gateau_at_Tao_Boba_yet_🍰_Its_the_kind_of_1786554447103.jpg";
import edit3Path        from "@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554470275.jpg";
import cupTaoLuxePath   from "@assets/cup_tao_luxe_no_bg.png";
import cupMatchaPath    from "@assets/cup_matcha_no_bg.png";
import cupBrownSugarPath from "@assets/cup_brown_sugar_no_bg.png";

/* ─── content ─────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    name:  'Tao Luxe',
    tint:  '#f7f2e8',
    word:  'TAO',
    cup:   cupTaoLuxePath,
    accent: '#c9a96e',
    notes: [
      ['Golden Oolong & Butterfly Pea', 'A two-tone gradient that shifts from golden amber to deep violet as it rises. The layering is the point — stirring is optional.'],
      ['Signature Luxe Foam', 'House-whipped cream poured slow so the two layers meet without mixing. Holds its line from first sip to last.'],
      ['Hand-Assembled to Order', 'Every Tao Luxe is built per order. The sequence of layering matters. Nothing is premixed, nothing is held.'],
    ],
  },
  {
    name:  'Matcha Madness',
    tint:  '#eef3ea',
    word:  'MATCHA',
    cup:   cupMatchaPath,
    accent: '#7aaa6a',
    notes: [
      ['Ceremonial Grade', 'Japanese ceremonial-grade matcha prepared cold for a clean, grassy finish — not the bitterness that comes from hot extraction.'],
      ['Three-Layer Build', 'Matcha over strawberry over taro. Three distinct flavors. Drink them layered or stirred — both are the right answer.'],
      ['Fresh Pearls Daily', 'Tapioca pearls cooked each morning in brown sugar syrup. None carry over. If we run out, the drink is pulled for the day.'],
    ],
  },
  {
    name:  'Brown Sugar',
    tint:  '#f5ede0',
    word:  'BROWN',
    cup:   cupBrownSugarPath,
    accent: '#b87c4a',
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
  /* DOM refs — scroll engine writes directly, bypassing React */
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

  /* new refs */
  const ghostEl     = useRef<HTMLDivElement>(null);   // ghost letter behind cup
  const accentEl    = useRef<HTMLSpanElement>(null);  // series accent bar colour
  const heroImgEl   = useRef<HTMLImageElement>(null); // for mouse parallax
  const cursorDotEl = useRef<HTMLDivElement>(null);
  const cursorRingEl= useRef<HTMLDivElement>(null);

  const currentRef  = useRef(-1);
  const liveCup     = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── cup transition ──────────────────────────────────────────────── */
  function goTo(i: number, dir: number) {
    if (i === currentRef.current) return;
    if (!stackEl.current || !stageEl.current) return;

    const p   = PRODUCTS[i];
    const rev = dir < 0;

    const incoming = document.createElement('div');
    incoming.className = 'cup-wrap';
    const img = document.createElement('img');
    img.src       = p.cup;
    img.className = 'cup-img';
    img.alt       = p.name;
    incoming.appendChild(img);
    stackEl.current.appendChild(incoming);

    if (liveCup.current && !REDUCED) {
      const out = liveCup.current;
      out.classList.add('is-exiting');
      if (rev) out.classList.add('rev');
      out.addEventListener('animationend', () => out.remove(), { once: true });
    } else if (liveCup.current) {
      liveCup.current.remove();
    }

    if (!REDUCED) {
      incoming.classList.add('is-entering');
      if (rev) incoming.classList.add('rev');
    }
    liveCup.current = incoming;

    /* stage tint */
    stageEl.current.style.backgroundColor = p.tint;

    /* accent colour on the series title rule */
    if (accentEl.current) {
      accentEl.current.style.background = p.accent;
    }

    /* word band */
    if (bandEl.current)
      bandEl.current.textContent = (p.word + '\u00A0\u00A0').repeat(10);

    /* ghost letter — first word, italic serif, enormous */
    if (ghostEl.current) {
      ghostEl.current.textContent = p.word;
      ghostEl.current.classList.remove('ghost-pop');
      void ghostEl.current.offsetWidth;
      ghostEl.current.classList.add('ghost-pop');
    }

    /* heading */
    if (nameEl.current) {
      nameEl.current.textContent = p.name;
      nameEl.current.classList.remove('fade-swap');
      void nameEl.current.offsetWidth;
      nameEl.current.classList.add('fade-swap');
    }

    /* notes */
    if (notesEl.current) {
      notesEl.current.innerHTML = '';
      p.notes.forEach(([h, b]) => {
        const d     = document.createElement('div');
        d.className = 'note fade-swap d2';
        d.innerHTML = `<h3>${h}</h3><p>${b}</p>`;
        notesEl.current!.appendChild(d);
      });
    }

    currentRef.current = i;
    setActiveIdx(i);
  }

  /* ── mount ───────────────────────────────────────────────────────── */
  useEffect(() => {
    /* ── 0 · load reveal ─────────────────────────────────────────── */
    const loadTimer = setTimeout(() => {
      document.documentElement.classList.add('is-loaded');
    }, 80);

    /* ── 1 · custom cursor ───────────────────────────────────────── */
    let cx = 0, cy = 0, rx = 0, ry = 0;
    const inHero = () => window.scrollY < window.innerHeight * 0.9;

    function onMouseMove(e: MouseEvent) {
      cx = e.clientX;
      cy = e.clientY;

      if (cursorDotEl.current) {
        cursorDotEl.current.style.transform = `translate(${cx - 3}px,${cy - 3}px)`;
        cursorDotEl.current.classList.toggle('c--light', inHero());
      }

      /* hero parallax — subtle, only while hero fills viewport */
      if (heroImgEl.current && inHero()) {
        const xd = (cx / window.innerWidth  - 0.5) * -28;
        const yd = (cy / window.innerHeight - 0.5) * -16;
        heroImgEl.current.style.transform = `translate(${xd.toFixed(2)}px,${yd.toFixed(2)}px) scale(1.07)`;
      } else if (heroImgEl.current && !inHero()) {
        heroImgEl.current.style.transform = 'scale(1.07)';
      }
    }

    let cursorRaf = 0;
    function animateCursor() {
      rx += (cx - rx) * 0.10;
      ry += (cy - ry) * 0.10;
      if (cursorRingEl.current) {
        cursorRingEl.current.style.transform = `translate(${(rx - 22).toFixed(2)}px,${(ry - 22).toFixed(2)}px)`;
        cursorRingEl.current.classList.toggle('c--light', inHero());
      }
      cursorRaf = requestAnimationFrame(animateCursor);
    }
    cursorRaf = requestAnimationFrame(animateCursor);
    addEventListener('mousemove', onMouseMove, { passive: true });

    /* hover expansion */
    const links = Array.from(document.querySelectorAll('a,button'));
    const onEnter = () => cursorRingEl.current?.classList.add('c--expand');
    const onLeave = () => cursorRingEl.current?.classList.remove('c--expand');
    links.forEach(l => { l.addEventListener('mouseenter', onEnter); l.addEventListener('mouseleave', onLeave); });

    /* ── 2 · scroll reveal (IntersectionObserver) ────────────────── */
    const revealEls = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));

    /* ── 3 · series boot ─────────────────────────────────────────── */
    goTo(0, 1);

    function updateSeries() {
      const el = seriesEl.current;
      if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p     = Math.min(Math.max(-rect.top / total, 0), 0.9999);
      const i     = Math.floor(p * PRODUCTS.length);
      if (i !== currentRef.current) goTo(i, i > currentRef.current ? 1 : -1);
    }

    /* ── 4 · editorial parallax (1 : 0.2) ───────────────────────── */
    function updateParallax() {
      const el = editEl.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      const p = (vh - rect.top) / (vh + rect.height);
      editCols.current.forEach(col => {
        const rate = parseFloat(col.dataset.rate ?? '1');
        col.style.transform = `translate3d(0,${(-(p - 0.5) * 260 * rate).toFixed(2)}px,0)`;
      });
    }

    /* ── 5 · velocity-coupled origin marquee ─────────────────────── */
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
        originType.current.style.transform = `translate3d(${mqX.toFixed(2)}px,0,0)`;

      if (originBg.current && originEl.current) {
        const r = originEl.current.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const pp = (window.innerHeight - r.top) / (window.innerHeight + r.height);
          originBg.current.style.transform = `translate3d(0,${((pp - 0.5) * -90).toFixed(2)}px,0)`;
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
      requestAnimationFrame(() => { updateSeries(); updateParallax(); queued = false; });
    }
    const onResize = () => { measure(); onScroll(); };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);

    return () => {
      clearTimeout(loadTimer);
      removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(cursorRaf);
      cancelAnimationFrame(rafId);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      links.forEach(l => { l.removeEventListener('mouseenter', onEnter); l.removeEventListener('mouseleave', onLeave); });
      io.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── render ───────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── CURSOR ──────────────────────────────────────────────────── */}
      <div className="cursor-dot"  ref={cursorDotEl}  aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRingEl} aria-hidden="true" />

      {/* ── HEADER ──────────────────────────────────────────────────── */}
      <header className="masthead" aria-label="Tao Boba">
        <div className="mark">
          <img src={logoPath} className="mark__logo" alt="Tao Boba" />
        </div>
      </header>
      <a href="https://www.thetaoboba.com/menu"     className="nav-link">Menu</a>
      <a href="https://www.exploretock.com/taoboba" className="nav-order">Order</a>

      {/* ════════════════════════════════════════════════════════════════
          1 · HERO — full-bleed Summer Sips, mouse parallax, cinematic reveal
          ════════════════════════════════════════════════════════════════ */}
      <section className="hero">

        {/* Full-bleed image — JS writes transform directly for parallax */}
        <img
          ref={heroImgEl}
          src={heroSummerPath}
          className="hero__bg"
          alt="Tao Boba Summer Sips — five seasonal drinks on concrete pedestals"
        />

        {/* Gradient veil: top dark (nav) + bottom dark (text) */}
        <div className="hero__veil" aria-hidden="true" />

        {/* 90-deg rotating marquee — the Andtea signature */}
        <div className="marquee-v" aria-hidden="true">
          <span className="marquee-v__track">
            THE ART OF BOBA&nbsp;&nbsp;
            THE ART OF BOBA&nbsp;&nbsp;
            THE ART OF BOBA&nbsp;&nbsp;
            THE ART OF BOBA&nbsp;&nbsp;
          </span>
        </div>

        {/* Editorial display — bottom right, animates in on load */}
        <div className="hero__display">
          <p className="hero__eyebrow">The Art of</p>
          <p className="hero__headline">Boba.</p>
        </div>

        {/* Bottom-left location caption */}
        <div className="hero__caption">Denver, Colorado · Est. 2021</div>

        {/* Bottom-centre scroll indicator */}
        <div className="hero__scroll"><i />Scroll</div>

        {/* Full-width info ticker at very bottom */}
        <div className="hero__strip" aria-hidden="true">
          <span className="hero__strip-track">
            SUMMER SIPS&nbsp;&nbsp;·&nbsp;&nbsp;THE ART OF BOBA&nbsp;&nbsp;·&nbsp;&nbsp;OPEN DAILY 11–9&nbsp;&nbsp;·&nbsp;&nbsp;1550 S FEDERAL BLVD, DENVER&nbsp;&nbsp;·&nbsp;&nbsp;(303) 993-7686&nbsp;&nbsp;·&nbsp;&nbsp;
            SUMMER SIPS&nbsp;&nbsp;·&nbsp;&nbsp;THE ART OF BOBA&nbsp;&nbsp;·&nbsp;&nbsp;OPEN DAILY 11–9&nbsp;&nbsp;·&nbsp;&nbsp;1550 S FEDERAL BLVD, DENVER&nbsp;&nbsp;·&nbsp;&nbsp;(303) 993-7686&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2 · SERIES — pinned scroll, 3 drinks, cup swap + ghost letter
          ════════════════════════════════════════════════════════════════ */}
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
          {/* Giant ghost letterform behind the cup — swaps with drink */}
          <div className="ghost-letter" ref={ghostEl} aria-hidden="true" />

          {/* Left index rail */}
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

          {/* Centre body — name + notes managed by goTo() */}
          <div className="series__body">
            <h1 className="series__title">
              <span className="name" ref={nameEl}>{PRODUCTS[0].name}</span>
              <span className="suffix">
                {/* coloured rule bar — JS swaps colour via accentEl */}
                <span className="suffix__bar" ref={accentEl}
                  style={{ background: PRODUCTS[0].accent }} />
                Series
              </span>
            </h1>
            <div className="notes" ref={notesEl} />
          </div>

          {/* Right cup stack — entirely direct-DOM */}
          <div className="series__stack" ref={stackEl} />

          <div className="cta-series">
            <a href="https://www.thetaoboba.com/menu">
              View the series <i />
            </a>
          </div>

          {/* Word band at stage floor */}
          <div className="wordband" ref={bandEl} aria-hidden="true" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3 · EDITORIAL — two columns at different parallax rates
              Left data-rate="1" → ±130px  Right data-rate="0.2" → ±26px
          ════════════════════════════════════════════════════════════════ */}
      <section className="editorial" ref={editEl}>
        <div
          className="col col--media"
          data-rate="1"
          ref={el => { if (el) editCols.current[0] = el }}
        >
          <div className="frame" data-reveal>
            <img src={edit1Path} alt="Craft 01" />
          </div>
          <div className="frame tall" data-reveal>
            <img src={edit2Path} alt="Craft 02" />
          </div>
          <div className="frame" data-reveal>
            <img src={edit3Path} alt="Craft 03" />
          </div>
        </div>

        <div
          className="col col--copy"
          data-rate="0.2"
          ref={el => { if (el) editCols.current[1] = el }}
        >
          <div data-reveal>
            <p className="eyebrow">The tea</p>
            <h2>Premium leaves,<br />brewed for the cup</h2>
            <p>
              We source single-origin teas prepared to extract what makes each
              varietal distinct. No blending to mask. No shortcuts in the brew.
            </p>
            <a className="more" href="https://www.thetaoboba.com/menu">
              Our menu <i />
            </a>
          </div>
          <div data-reveal>
            <p className="eyebrow">The pour</p>
            <h2>Layers that hold<br />from first sip to last</h2>
            <p>
              Cream is folded, not poured, so the two layers meet without
              mixing. The cup holds its line long after it leaves the counter.
            </p>
            <a className="more" href="https://www.thetaoboba.com/menu">
              View drinks <i />
            </a>
          </div>
          <div data-reveal>
            <p className="eyebrow">The pearls</p>
            <h2>Made the same morning.<br />No carry-over.</h2>
            <p>
              Tapioca pearls cooked fresh each morning. If they run out,
              the drink is pulled — not replaced with yesterday's batch.
            </p>
            <a className="more" href="https://www.exploretock.com/taoboba">
              Order now <i />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4 · ORIGIN — velocity-coupled marquee
          ════════════════════════════════════════════════════════════════ */}
      <section className="origin" ref={originEl}>
        <div
          className="origin__bg"
          ref={originBg}
          style={{
            backgroundImage:    `url(${heroOriginPath})`,
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
          Mon – Sun &nbsp; 11:00 – 21:00<br />
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
