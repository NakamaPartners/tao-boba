import { useEffect, useRef } from 'react';

/* ── assets ─────────────────────────────────────────────────────────────── */
import logoPath  from '@assets/image_1786554649837.png';

// Hero
import heroImg   from '@assets/hero_clean.png';

// Editorial (Scene 02)
import editA     from '@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554467811.jpg';
import editB     from '@assets/Five_signature_sips._One_beautiful_lineup._🧋✨Designed_to_be_a_1786554579731.jpg';

// Gallery (Scene 04)
import gallA     from '@assets/🦋_Meet_your_new_summer_obsession._Butterfly_Mango_Breeze—spar_1786554450238.jpg';
import gallB     from '@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554470275.jpg';
import gallC     from '@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731632771.jpg';

// Cup PNGs — transparent or dark-bg product shots
import cup1      from '@assets/cup_tao_luxe_no_bg.png';
import cup2      from '@assets/drink_sip2_no_bg.png';
import cup3      from '@assets/cup_matcha_no_bg.png';
import cup4      from '@assets/drink_sip3_no_bg.png';
import cup5      from '@assets/cup_brown_sugar_no_bg.png';

/* ── product data ────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    name:    'Tao Luxe',
    fontSize:'78px',
    bg:      '#f0ebe0',
    word:    'LUXE',
    cup:     cup1,
    accent:  '#c9a96e',
    desc:    'Amber shifts to violet — one layer at a time. Built by hand, never rushed.',
  },
  {
    name:    'Butterfly Mango',
    fontSize:'60px',
    bg:      '#ede9f4',
    word:    'MANGO',
    cup:     cup2,
    accent:  '#8b6eb5',
    desc:    'Butterfly pea flower over mango jasmine. Color that changes as it reaches you.',
  },
  {
    name:    'Matcha Madness',
    fontSize:'63px',
    bg:      '#eaf0e6',
    word:    'MATCHA',
    cup:     cup3,
    accent:  '#7aaa6a',
    desc:    'Ceremonial-grade matcha over strawberry over taro. Three layers. Drink it either way.',
  },
  {
    name:    'Strawberry Series',
    fontSize:'58px',
    bg:      '#fdf0f2',
    word:    'BERRY',
    cup:     cup4,
    accent:  '#d4697a',
    desc:    'Bright, vivid, built cold. Strawberry and lychee, no shortcuts.',
  },
  {
    name:    'Brown Sugar',
    fontSize:'74px',
    bg:      '#f0e8d8',
    word:    'SUGAR',
    cup:     cup5,
    accent:  '#b87c4a',
    desc:    'Slow-roasted syrup. Same-day pearls. The one they always come back for.',
  },
] as const;

const N = PRODUCTS.length;

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {

  /* ── hero parallax refs ────────────────────────────────────────────────── */
  const heroImgWrapEl  = useRef<HTMLDivElement>(null);
  const heroIntroWrapEl = useRef<HTMLDivElement>(null);
  const heroWordWrapEl = useRef<HTMLDivElement>(null);

  /* ── editorial parallax refs ───────────────────────────────────────────── */
  const editSecEl   = useRef<HTMLElement>(null);
  const editImgAEl  = useRef<HTMLDivElement>(null);
  const editImgBEl  = useRef<HTMLDivElement>(null);
  const editTxtEl   = useRef<HTMLDivElement>(null);

  /* ── product swap refs ─────────────────────────────────────────────────── */
  const seriesEl    = useRef<HTMLElement>(null);
  const stageEl     = useRef<HTMLDivElement>(null);
  const stackEl     = useRef<HTMLDivElement>(null);
  const nameEl      = useRef<HTMLHeadingElement>(null);
  const descEl      = useRef<HTMLParagraphElement>(null);
  const glyphEl     = useRef<HTMLDivElement>(null);
  const idxEl       = useRef<HTMLSpanElement>(null);
  const accentEl    = useRef<HTMLSpanElement>(null);

  const currentIdx  = useRef(-1);
  const liveCup     = useRef<HTMLDivElement | null>(null);

  /* ── cup swap engine (Andtea timing — DO NOT TOUCH) ─────────────────────
     Outgoing: 0.33s ease-exit  |  Incoming: 0.90s ease-tail, delay 0.12s
  ─────────────────────────────────────────────────────────────────────────── */
  function goTo(i: number, dir: number) {
    if (i === currentIdx.current) return;
    const p   = PRODUCTS[i];
    const rev = dir < 0;

    /* background */
    if (stageEl.current)  stageEl.current.style.backgroundColor  = p.bg;
    if (accentEl.current) accentEl.current.style.background       = p.accent;

    /* background glyph */
    if (glyphEl.current) {
      glyphEl.current.textContent = p.word;
      glyphEl.current.classList.remove('glyph-pop');
      void glyphEl.current.offsetWidth;
      glyphEl.current.classList.add('glyph-pop');
    }

    /* name */
    if (nameEl.current) {
      nameEl.current.textContent  = p.name;
      nameEl.current.style.fontSize = p.fontSize;
      nameEl.current.classList.remove('swap-in');
      void nameEl.current.offsetWidth;
      nameEl.current.classList.add('swap-in');
    }

    /* description */
    if (descEl.current) {
      descEl.current.textContent = p.desc;
      descEl.current.classList.remove('swap-in');
      void descEl.current.offsetWidth;
      descEl.current.classList.add('swap-in');
    }

    /* index */
    if (idxEl.current) {
      idxEl.current.textContent =
        `${String(i + 1).padStart(2,'0')} / ${String(N).padStart(2,'0')}`;
    }

    /* cup swap */
    if (!stackEl.current) { currentIdx.current = i; return; }

    const incoming = document.createElement('div');
    incoming.className = 'cup-wrap';
    const img = document.createElement('img');
    img.src = p.cup; img.alt = p.name; img.className = 'cup-img';
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
    liveCup.current   = incoming;
    currentIdx.current = i;
  }

  /* ── scroll + parallax + init ───────────────────────────────────────────── */
  useEffect(() => {
    /* hero entry */
    const heroSec = document.querySelector('.hero');
    const t = setTimeout(() => heroSec?.classList.add('hero-init'), 60);

    /* reveals */
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      }), { threshold: 0.08 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

    /* init first product */
    goTo(0, 1);

    /* unified scroll tick */
    let raf = false;
    function tick() {
      const sy = window.scrollY;
      const vh = window.innerHeight;

      /* hero parallax — only while hero is on screen */
      if (sy < vh * 1.4 && !REDUCED) {
        if (heroImgWrapEl.current)
          heroImgWrapEl.current.style.transform = `translateY(${-sy * 0.09}px)`;
        if (heroIntroWrapEl.current)
          heroIntroWrapEl.current.style.transform = `translateY(${-sy * 0.30}px)`;
        if (heroWordWrapEl.current)
          heroWordWrapEl.current.style.transform = `translateY(${-sy * 0.15}px)`;
      }

      /* editorial parallax */
      if (editSecEl.current && !REDUCED) {
        const r = editSecEl.current.getBoundingClientRect();
        const p = Math.max(0, -r.top);          /* px scrolled past section top */
        if (p < 1800) {                          /* stop computing when far past */
          if (editImgAEl.current)
            editImgAEl.current.style.transform = `translateY(${-p * 0.10}px)`;
          if (editImgBEl.current)
            editImgBEl.current.style.transform = `translateY(${-p * 0.38}px)`;
          if (editTxtEl.current)
            editTxtEl.current.style.transform  = `translateY(${-p * 0.20}px)`;
        }
      }

      /* product series */
      if (seriesEl.current) {
        const r      = seriesEl.current.getBoundingClientRect();
        const total  = seriesEl.current.offsetHeight - vh;
        const pct    = Math.min(Math.max(-r.top / total, 0), 0.9999);
        const i      = Math.floor(pct * N);
        if (i !== currentIdx.current) goTo(i, i > currentIdx.current ? 1 : -1);
      }

      raf = false;
    }

    function onScroll() {
      if (raf) return;
      raf = true;
      requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    tick();

    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ═══════════════════════════════════ RENDER ══════════════════════════════ */
  return (
    <>
      {/* ── HEADER ───────────────────────────────────────────────────────────
          Fixed, 88px, logo left 72px, MENU + ORDER right ending at 1368px
      ─────────────────────────────────────────────────────────────────────── */}
      <header className="hdr">
        <img src={logoPath} alt="Tao Boba" className="hdr__mark" />
        <nav className="hdr__nav">
          <a href="https://www.thetaoboba.com/menu" className="hdr__link">Menu</a>
          <a href="https://www.exploretock.com/taoboba" className="hdr__link">Order</a>
        </nav>
      </header>

      {/* ══════════════════════════════════ SCENE 01 — HERO ══════════════════
          Velora compositional grammar:
          · Large photograph  lower-left   (left: 88px, top: 306px, 620×390)
          · Small intro text  upper-right  (left: 955px, top: 145px, w: 330px)
          · TAO BOBA wordmark below photo  (left: 88px, top: 726px, 76px)
          · Scroll cue        lower-right  (right: 72px, bottom: 36px)
          Three attention points only. No product on the right.
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="hero">

        {/* Photo — outer gets parallax translateY, inner gets entry animation */}
        <div className="hero__photo-wrap" ref={heroImgWrapEl}>
          <div className="hero__photo-inner">
            <img src={heroImg} alt="" className="hero__photo" />
          </div>
        </div>

        {/* Small intro — upper right */}
        <div className="hero__intro-wrap" ref={heroIntroWrapEl}>
          <div className="hero__intro-inner">
            <span className="hero__context">Tao Boba · Denver</span>
            <p className="hero__body">
              Each drink built<br />
              to be seen first.<br />
              Then tasted.
            </p>
            <a href="https://www.thetaoboba.com/menu" className="hero__small-link">
              Explore menu
            </a>
          </div>
        </div>

        {/* TAO BOBA wordmark — large, below photo, left-aligned */}
        <div className="hero__wordmark-wrap" ref={heroWordWrapEl}>
          <div className="hero__wordmark-inner" aria-label="Tao Boba">
            TAO BOBA
          </div>
        </div>

        {/* Scroll cue — lower right, NOT centered, NOT on seam */}
        <span className="hero__scroll" aria-hidden="true">Scroll ↓</span>

      </section>

      {/* ══════════════════════════════ BRIDGE ════════════════════════════════
          ~320px breathing zone between hero and editorial.
          One quiet line, intentionally offset right of center.
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bridge">
        <span className="bridge__line" data-reveal>Art-directed. Denver-made.</span>
      </div>

      {/* ══════════════════════════════ SCENE 02 — EDITORIAL ══════════════════
          Rich photography spread. All elements absolutely positioned.
          Image A: large portrait  left: 72  top: 120  540×680
          Image B: smaller         left: 870 top: 440  350×290
          Text:                    left: 840 top: 145  w: 330
          Parallax: A 0.10×  B 0.38×  text 0.20×
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="editorial" ref={editSecEl}>

        <div className="editorial__imgA" ref={editImgAEl}>
          <img src={editA} alt="" />
        </div>

        <div className="editorial__imgB" ref={editImgBEl}>
          <img src={editB} alt="" />
        </div>

        <div className="editorial__text" ref={editTxtEl} data-reveal>
          <span className="edt-label">Craft · 2026</span>
          <p className="edt-body">
            Every layer<br />is a decision.
          </p>
          <a href="https://www.thetaoboba.com/menu" className="edt-link">
            Full menu ↗
          </a>
        </div>

      </section>

      {/* ══════════════════════════ SCENE 03 — PRODUCT SEQUENCE ══════════════
          Andtea cup choreography — full viewport, 500vh scroll height.
          Text left, cup center-right at X≈820px Y≈470px.
          Background glyph centered on cup — cup OVERLAPS it (z-index).
          Spec: cup visible height 670px, "monumental."
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="products"
        ref={seriesEl}
        style={{ height: `${N * 100}svh` }}
        id="drinks"
      >
        <div
          className="products__stage"
          ref={stageEl}
          style={{ backgroundColor: PRODUCTS[0].bg }}
        >
          {/* Index — upper left */}
          <span className="products__idx" ref={idxEl}>
            01 / {String(N).padStart(2, '0')}
          </span>

          {/* Name — upper left, large */}
          <h2
            className="products__name"
            ref={nameEl}
            style={{ fontSize: PRODUCTS[0].fontSize }}
          >
            {PRODUCTS[0].name}
          </h2>

          {/* Accent rule */}
          <span
            className="products__accent"
            ref={accentEl}
            style={{ background: PRODUCTS[0].accent }}
          />

          {/* Description — lower left */}
          <p className="products__desc" ref={descEl}>
            {PRODUCTS[0].desc}
          </p>

          {/* Background glyph — centered on cup position, cup overlaps it */}
          <div className="products__glyph" ref={glyphEl} aria-hidden="true">
            {PRODUCTS[0].word}
          </div>

          {/* Cup DOM injection target */}
          <div className="products__stack" ref={stackEl} />

        </div>
      </section>

      {/* ══════════════════════════ SCENE 04 — PHOTOGRAPHY ═══════════════════
          ~1450px. Three photographic moments, NOT a grid.
          Asymmetric absolute positions. Staggered top coordinates.
          Image 1: left 0      top 0    45vw × 620px
          Image 2: right 72    top 320  310px × 440px
          Image 3: left 400    top 880  560px × 380px
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="gallery">

        <div className="gallery__a" data-reveal>
          <img src={gallA} alt="" />
        </div>

        <div className="gallery__b" data-reveal>
          <img src={gallB} alt="" />
        </div>

        <div className="gallery__c" data-reveal>
          <img src={gallC} alt="" />
        </div>

      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="foot">
        <div className="foot__col">
          <span className="foot__label">Hours</span>
          <p>Mon – Sun<br />11 : 00 – 21 : 00</p>
        </div>
        <div className="foot__center">
          <img src={logoPath} alt="Tao Boba" className="foot__mark" />
        </div>
        <div className="foot__col foot__col--right">
          <span className="foot__label">Location</span>
          <p>1550 S Federal Blvd<br />Denver CO 80219</p>
          <a
            href="https://www.exploretock.com/taoboba"
            className="foot__order"
          >
            Order Online →
          </a>
        </div>
      </footer>
    </>
  );
}
