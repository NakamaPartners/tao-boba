import { useEffect, useRef, useState } from 'react';

import logoPath          from "@assets/image_1786554649837.png";
import heroSummerPath    from "@assets/hero_clean.png";
import heroOriginPath    from "@assets/🦋_Meet_your_new_summer_obsession._Butterfly_Mango_Breeze—spar_1786554450238.jpg";
import edit1Path         from "@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554467811.jpg";
import edit2Path         from "@assets/Have_you_tried_Petit_Gateau_at_Tao_Boba_yet_🍰_Its_the_kind_of_1786554447103.jpg";
import cupTaoLuxePath    from "@assets/cup_tao_luxe_no_bg.png";
import cupMatchaPath     from "@assets/cup_matcha_no_bg.png";
import cupBrownSugarPath from "@assets/cup_brown_sugar_no_bg.png";
import matchaMango       from "@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731625374.jpg";
import matchaBanana      from "@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731628291.jpg";
import matchaUbe         from "@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731632771.jpg";

/* ─── drinks ──────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    name:   'Tao Luxe',
    tint:   '#f7f2e8',
    word:   'TAO',
    cup:    cupTaoLuxePath,
    accent: '#c9a96e',
    notes: [
      ['Golden Oolong & Butterfly Pea', 'A two-tone gradient that shifts from golden amber to deep violet as it rises. The layering is the point — stirring is optional.'],
      ['Signature Luxe Foam', 'House-whipped cream poured slow so the two layers meet without mixing. Holds its line from first sip to last.'],
      ['Hand-Assembled to Order', 'Every Tao Luxe is built per order. The sequence of layering matters. Nothing is premixed, nothing is held.'],
    ],
  },
  {
    name:   'Matcha Madness',
    tint:   '#eef3ea',
    word:   'MATCHA',
    cup:    cupMatchaPath,
    accent: '#7aaa6a',
    notes: [
      ['Ceremonial Grade', 'Japanese ceremonial-grade matcha prepared cold for a clean, grassy finish — not the bitterness that comes from hot extraction.'],
      ['Three-Layer Build', 'Matcha over strawberry over taro. Three distinct flavors. Drink them layered or stirred — both are the right answer.'],
      ['Fresh Pearls Daily', 'Tapioca pearls cooked each morning in brown sugar syrup. None carry over. If we run out, the drink is pulled for the day.'],
    ],
  },
  {
    name:   'Brown Sugar',
    tint:   '#f5ede0',
    word:   'BROWN',
    cup:    cupBrownSugarPath,
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

export default function Home() {
  /* series */
  const seriesEl   = useRef<HTMLElement>(null);
  const stageEl    = useRef<HTMLDivElement>(null);
  const stackEl    = useRef<HTMLDivElement>(null);
  const nameEl     = useRef<HTMLSpanElement>(null);
  const notesEl    = useRef<HTMLDivElement>(null);
  const railEl     = useRef<HTMLUListElement>(null);
  const ghostEl    = useRef<HTMLDivElement>(null);
  const accentEl   = useRef<HTMLSpanElement>(null);
  /* origin */
  const originEl   = useRef<HTMLElement>(null);
  const originType = useRef<HTMLDivElement>(null);
  const originBg   = useRef<HTMLDivElement>(null);

  const currentRef = useRef(-1);
  const liveCup    = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── cup swap (direct DOM — Andtea pattern, preserved exactly) ── */
  function goTo(i: number, dir: number) {
    if (i === currentRef.current) return;
    if (!stackEl.current || !stageEl.current) return;

    const p   = PRODUCTS[i];
    const rev = dir < 0;

    const incoming = document.createElement('div');
    incoming.className = 'cup-wrap';
    const img = document.createElement('img');
    img.src = p.cup; img.className = 'cup-img'; img.alt = p.name;
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

    stageEl.current.style.backgroundColor = p.tint;
    if (accentEl.current) accentEl.current.style.background = p.accent;

    if (ghostEl.current) {
      ghostEl.current.textContent = p.word;
      ghostEl.current.classList.remove('ghost-pop');
      void ghostEl.current.offsetWidth;
      ghostEl.current.classList.add('ghost-pop');
    }
    if (nameEl.current) {
      nameEl.current.textContent = p.name;
      nameEl.current.classList.remove('fade-swap');
      void nameEl.current.offsetWidth;
      nameEl.current.classList.add('fade-swap');
    }
    if (notesEl.current) {
      notesEl.current.innerHTML = '';
      p.notes.forEach(([h, b]) => {
        const d = document.createElement('div');
        d.className = 'note fade-swap d2';
        d.innerHTML = `<h3>${h}</h3><p>${b}</p>`;
        notesEl.current!.appendChild(d);
      });
    }

    currentRef.current = i;
    setActiveIdx(i);
  }

  useEffect(() => {
    goTo(0, 1);

    /* scroll → series drink index */
    function updateSeries() {
      const el = seriesEl.current; if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p     = Math.min(Math.max(-rect.top / total, 0), 0.9999);
      const i     = Math.floor(p * PRODUCTS.length);
      if (i !== currentRef.current) goTo(i, i > currentRef.current ? 1 : -1);
    }

    /* velocity marquee + origin parallax */
    let mqX = 0, vel = 0, lastY = window.scrollY, typeW = 0, rafId = 0;
    function measure() {
      if (originType.current) typeW = originType.current.scrollWidth / 4;
    }
    function tick() {
      const y = window.scrollY;
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
          originBg.current.style.transform = `translate3d(0,${((pp - 0.5) * -80).toFixed(2)}px,0)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    measure();

    /* scroll reveals — opacity only, no translate */
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

    updateSeries();

    let queued = false;
    function onScroll() {
      if (queued) return; queued = true;
      requestAnimationFrame(() => { updateSeries(); queued = false; });
    }
    const onResize = () => { measure(); onScroll(); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      io.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────────── */}
      <header className="masthead">
        <img src={logoPath} className="mark__logo" alt="Tao Boba" />
      </header>
      <a href="https://www.thetaoboba.com/menu"     className="nav-link">Menu</a>
      <a href="https://www.exploretock.com/taoboba" className="nav-order">Order</a>

      {/* ══════════════════════════════════════════════════════════════
          01 — HERO
          Static split. Left: Summer Sips photo. Right: brand text.
          Pattern from Rishi / Kettl: label top-left, headline anchored
          low, CTAs at floor, vast whitespace in between.
      ══════════════════════════════════════════════════════════════ */}
      <section className="hero">

        <div className="hero__media">
          <img
            src={heroSummerPath}
            className="hero__bg"
            alt="Tao Boba — five seasonal drinks on concrete pedestals"
          />
        </div>

        <div className="hero__panel">
          <div className="hero__top">
            <p className="hero__tag">Tao Boba &nbsp;·&nbsp; Denver, CO &nbsp;·&nbsp; Est. 2021</p>
            <span className="hero__idx">01</span>
          </div>
          <div className="hero__center">
            <h1 className="hero__title">
              The Art<br />
              <em>of Boba.</em>
            </h1>
            <p className="hero__sub">
              Premium boba tea, crafted to order.<br />
              Open daily, 11 — 21.
            </p>
          </div>
          <nav className="hero__ctas">
            <a href="https://www.thetaoboba.com/menu" className="cta-line">
              View Menu <i />
            </a>
            <a href="https://www.exploretock.com/taoboba" className="cta-box">
              Order Now
            </a>
          </nav>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════
          02 — COLLECTION
          Images float as objects — two-column bleed spread.
          No frames, no cards. Section opener: thin rule + label.
          Grammar from en-tea / saboe: objects in space, not in containers.
      ══════════════════════════════════════════════════════════════ */}
      <section className="collection">

        <div className="collection__top">
          <div className="sec-head" data-reveal>
            <div>
              <span className="sec-label">Seasonal Collection · Summer 2026</span>
              <h2 className="sec-title">
                Four flavors.<br /><em>One Matcha Journey.</em>
              </h2>
            </div>
            <a href="https://www.thetaoboba.com/menu" className="cta-line collection__cta">
              Full menu <i />
            </a>
          </div>
        </div>

        {/* Two-column bleed spread: left = two squares, right = one tall */}
        <div className="collection__spread">
          <div className="collection__col-a">
            <div className="collection__slot">
              <img src={matchaMango}  alt="Mango Matcha" />
            </div>
            <div className="collection__slot">
              <img src={matchaBanana} alt="Banana Pudding Matcha" />
            </div>
          </div>
          <div className="collection__col-b">
            <img src={matchaUbe} alt="Ube Matcha" />
          </div>
        </div>

        {/* Three italic names beneath — aligned to the image columns */}
        <div className="collection__names" aria-hidden="true">
          <span><em>Mango Matcha</em></span>
          <span><em>Banana Pudding Matcha</em></span>
          <span><em>Ube Matcha</em></span>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════
          03 — SERIES
          Pinned scroll. Tinted stage differentiates this from the
          white sections — intentional: interactive vs. editorial.
          Cup swap engine preserved exactly.
      ══════════════════════════════════════════════════════════════ */}
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
          <div className="ghost-letter" ref={ghostEl} aria-hidden="true" />

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

          <div className="series__body">
            <p className="sec-label series__opener">The Drinks</p>
            <h1 className="series__title">
              <span className="name" ref={nameEl}>{PRODUCTS[0].name}</span>
              <span className="suffix">
                <span className="suffix__bar" ref={accentEl}
                  style={{ background: PRODUCTS[0].accent }} />
                Series
              </span>
            </h1>
            <div className="notes" ref={notesEl} />
          </div>

          <div className="series__stack" ref={stackEl} />

          <div className="cta-series">
            <a href="https://www.thetaoboba.com/menu">
              View the series <i />
            </a>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          04 — CRAFT
          Two alternating spreads: image bleeds to one edge, text floats
          on the other side in open space.
          No frames. No boxes. Generous inter-spread gap.
          Same sec-head opener as every other section.
      ══════════════════════════════════════════════════════════════ */}
      <section className="craft">

        <div className="collection__top">
          <div className="sec-head" data-reveal>
            <div>
              <span className="sec-label">The Craft</span>
              <h2 className="sec-title">
                What goes into<br /><em>every cup.</em>
              </h2>
            </div>
          </div>
        </div>

        {/* Spread 1: image left (bleeds), text right */}
        <div className="craft__spread" data-reveal>
          <div className="craft__img craft__img--left">
            <img src={edit1Path} alt="" />
          </div>
          <div className="craft__text">
            <span className="sec-label">The Tea</span>
            <h3>Ceremonial grade,<br />cold-brewed for clarity</h3>
            <p>
              Single-origin teas steeped cold to extract what makes each
              varietal distinct. No blending to mask. No shortcuts in the brew.
            </p>
            <a href="https://www.thetaoboba.com/menu" className="cta-line">
              Our menu <i />
            </a>
          </div>
        </div>

        {/* Spread 2: text left, image right (bleeds) */}
        <div className="craft__spread craft__spread--flip" data-reveal>
          <div className="craft__text">
            <span className="sec-label">The Cup</span>
            <h3>Assembled in order.<br />Never premixed.</h3>
            <p>
              Every drink is built in sequence. Cream folded, not poured.
              Two layers that hold their line from first sip to last.
            </p>
            <a href="https://www.exploretock.com/taoboba" className="cta-line">
              Order now <i />
            </a>
          </div>
          <div className="craft__img craft__img--right">
            <img src={edit2Path} alt="" />
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════
          05 — ORIGIN
          The one moment of atmosphere. Velocity marquee over dark photo.
      ══════════════════════════════════════════════════════════════ */}
      <section className="origin" ref={originEl}>
        <div
          className="origin__bg"
          ref={originBg}
          style={{ backgroundImage: `url(${heroOriginPath})` }}
        />
        <div className="origin__type" ref={originType} aria-hidden="true">
          <span>MADE IN DENVER</span>
          <span>MADE IN DENVER</span>
          <span>MADE IN DENVER</span>
          <span>MADE IN DENVER</span>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
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
