import { useEffect, useRef, useState } from 'react';

import logoPath          from "@assets/image_1786554649837.png";
import heroSummerPath    from "@assets/hero_clean.png";
import heroOriginPath    from "@assets/🦋_Meet_your_new_summer_obsession._Butterfly_Mango_Breeze—spar_1786554450238.jpg";
import edit1Path         from "@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554467811.jpg";
import edit2Path         from "@assets/Have_you_tried_Petit_Gateau_at_Tao_Boba_yet_🍰_Its_the_kind_of_1786554447103.jpg";
import edit3Path         from "@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554470275.jpg";
import cupTaoLuxePath    from "@assets/cup_tao_luxe_no_bg.png";
import cupMatchaPath     from "@assets/cup_matcha_no_bg.png";
import cupBrownSugarPath from "@assets/cup_brown_sugar_no_bg.png";
import matchaMango       from "@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731625374.jpg";
import matchaBanana      from "@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731628291.jpg";
import matchaUbe         from "@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731632771.jpg";

/* ─── content ─────────────────────────────────────────────────────── */
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
  /* series refs */
  const seriesEl   = useRef<HTMLElement>(null);
  const stageEl    = useRef<HTMLDivElement>(null);
  const stackEl    = useRef<HTMLDivElement>(null);
  const nameEl     = useRef<HTMLSpanElement>(null);
  const notesEl    = useRef<HTMLDivElement>(null);
  const bandEl     = useRef<HTMLDivElement>(null);
  const railEl     = useRef<HTMLUListElement>(null);
  const ghostEl    = useRef<HTMLDivElement>(null);
  const accentEl   = useRef<HTMLSpanElement>(null);
  /* editorial parallax */
  const editEl     = useRef<HTMLElement>(null);
  const editCols   = useRef<HTMLDivElement[]>([]);
  /* origin marquee */
  const originEl   = useRef<HTMLElement>(null);
  const originType = useRef<HTMLDivElement>(null);
  const originBg   = useRef<HTMLDivElement>(null);

  const currentRef = useRef(-1);
  const liveCup    = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── cup transition ── */
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

    if (bandEl.current)
      bandEl.current.textContent = (p.word + '\u00A0\u00A0').repeat(10);

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

    /* series scrub */
    function updateSeries() {
      const el = seriesEl.current; if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p     = Math.min(Math.max(-rect.top / total, 0), 0.9999);
      const i     = Math.floor(p * PRODUCTS.length);
      if (i !== currentRef.current) goTo(i, i > currentRef.current ? 1 : -1);
    }

    /* editorial parallax */
    function updateParallax() {
      const el = editEl.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      const p = (vh - rect.top) / (vh + rect.height);
      editCols.current.forEach(col => {
        const rate = parseFloat(col.dataset.rate ?? '1');
        col.style.transform = `translate3d(0,${(-(p - 0.5) * 220 * rate).toFixed(2)}px,0)`;
      });
    }

    /* velocity marquee */
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
          originBg.current.style.transform = `translate3d(0,${((pp - 0.5) * -90).toFixed(2)}px,0)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    measure();

    /* scroll reveals */
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.10 });
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

    updateSeries();
    updateParallax();

    let queued = false;
    function onScroll() {
      if (queued) return; queued = true;
      requestAnimationFrame(() => { updateSeries(); updateParallax(); queued = false; });
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
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header className="masthead">
        <img src={logoPath} className="mark__logo" alt="Tao Boba" />
      </header>
      <a href="https://www.thetaoboba.com/menu"     className="nav-link">Menu</a>
      <a href="https://www.exploretock.com/taoboba" className="nav-order">Order</a>

      {/* ════════════════════════════════════════════════════════════
          01 — HERO  Static catalog spread
          Left: Summer Sips photo  |  Right: editorial brand panel
          ════════════════════════════════════════════════════════════ */}
      <section className="hero">

        {/* Photo side */}
        <div className="hero__media">
          <img
            src={heroSummerPath}
            className="hero__bg"
            alt="Tao Boba Summer Sips — five seasonal drinks on concrete pedestals"
          />
        </div>

        {/* Text side */}
        <div className="hero__panel">

          <div className="hero__top">
            <p className="hero__tag">
              Tao Boba &nbsp;·&nbsp; Denver, CO &nbsp;·&nbsp; Est. 2021
            </p>
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

      {/* ════════════════════════════════════════════════════════════
          02 — MATCHA COLLECTION  Three-column editorial product grid
          ════════════════════════════════════════════════════════════ */}
      <section className="mcollection">
        <div className="mcollection__header" data-reveal>
          <div className="mcollection__label">
            <span className="eyebrow">Seasonal Series &nbsp;·&nbsp; Summer 2026</span>
            <h2 className="mcollection__title">
              Four flavors.<br /><em>One Matcha Journey.</em>
            </h2>
          </div>
          <a
            href="https://www.thetaoboba.com/menu"
            className="cta-line mcollection__cta"
          >
            Explore the menu <i />
          </a>
        </div>

        <div className="mcollection__grid">
          {[
            { src: matchaMango,  name: 'Mango Matcha',           note: 'Tropical mango meets ceremonial matcha — bright, fruity, and electric.' },
            { src: matchaBanana, name: 'Banana Pudding Matcha',  note: 'Smooth banana layered under a creamy matcha pour. Naturally sweet.' },
            { src: matchaUbe,    name: 'Ube Matcha',             note: 'Earthy purple ube blended with deep-green matcha. Striking in the cup.' },
          ].map(({ src, name, note }, i) => (
            <article className="mcollection__item" key={i} data-reveal>
              <div className="mcollection__frame">
                <img src={src} alt={name} />
              </div>
              <div className="mcollection__meta">
                <span className="mcollection__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="mcollection__name">{name}</h3>
                  <p className="mcollection__note">{note}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          03 — SERIES  Pinned scroll, 3-drink catalog
          ════════════════════════════════════════════════════════════ */}
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
          {/* Ghost letterform — behind everything */}
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

          <div className="wordband" ref={bandEl} aria-hidden="true" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          03 — CRAFT  Editorial spread — image col / copy col
          ════════════════════════════════════════════════════════════ */}
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
              Single-origin teas prepared to extract what makes each
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
              Cream is folded, not poured. Two layers meet without mixing.
              The cup holds its line long after it leaves the counter.
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

      {/* ════════════════════════════════════════════════════════════
          04 — ORIGIN  Velocity-coupled marquee
          ════════════════════════════════════════════════════════════ */}
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
