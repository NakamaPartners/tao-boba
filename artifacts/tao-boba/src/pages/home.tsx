import { useEffect, useRef } from 'react';

/* ── assets ─────────────────────────────────────────────────────────────── */
import logoPath  from '@assets/image_1786554649837.png';

// Hero — video (?url forces Vite to emit as a static asset and return its URL)
import heroVid    from '@assets/hero-video.mp4?url';
import heroPoster from '@assets/hero-poster.jpg?url';

// Editorial (Scene 02)
import editA     from '@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554467811.jpg';
import editB     from '@assets/Five_signature_sips._One_beautiful_lineup._🧋✨Designed_to_be_a_1786554579731.jpg';

// Gallery (Scene 04)
import gallA     from '@assets/🦋_Meet_your_new_summer_obsession._Butterfly_Mango_Breeze—spar_1786554450238.jpg';
import gallB     from '@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554470275.jpg';
import gallC     from '@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731632771.jpg';

// Product editorial photos — full frame with travertine pedestals
import prod1     from '@assets/image_1786781531560.png';   // Butterfly Mango Jasmine Breeze
import prod2     from '@assets/image_1786781538133.png';   // Shiso Yuzu Breeze
import prod3     from '@assets/image_1786781543351.png';   // Cloud Mango Green Tea
import prod4     from '@assets/image_1786781565200.png';   // Cloud Mango Matcha
import prod5     from '@assets/image_1786781578255.png';   // Mango Passion Fruit Breeze

/* ── product data ────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    name:     'Butterfly Mango\nJasmine Breeze',
    nameFlat: 'Butterfly Mango Jasmine Breeze',
    fontSize: '52px',
    bg:       '#f0ecf5',
    word:     'BUTTERFLY',
    photo:    prod1,
    accent:   '#7b5ea7',
    desc:     'Butterfly pea flower meets mango jasmine. Violet to amber — the color changes as the ice shifts.',
  },
  {
    name:     'Shiso Yuzu\nBreeze',
    nameFlat: 'Shiso Yuzu Breeze',
    fontSize: '62px',
    bg:       '#f5edee',
    word:     'YUZU',
    photo:    prod2,
    accent:   '#c0526d',
    desc:     'Bright shiso leaf over yuzu citrus. Built cold, no shortcuts — vivid all the way to the bottom.',
  },
  {
    name:     'Cloud Mango\nGreen Tea',
    nameFlat: 'Cloud Mango Green Tea',
    fontSize: '58px',
    bg:       '#f3eeea',
    word:     'CLOUD',
    photo:    prod3,
    accent:   '#c88b35',
    desc:     'Cloud foam drifts over mango green tea. One sip gets you both — the airy and the sweet.',
  },
  {
    name:     'Cloud Mango\nMatcha',
    nameFlat: 'Cloud Mango Matcha',
    fontSize: '64px',
    bg:       '#edf3ea',
    word:     'MATCHA',
    photo:    prod4,
    accent:   '#5c8e50',
    desc:     'Ceremonial-grade matcha falls through mango — three distinct layers. Drink it in any order.',
  },
  {
    name:     'Mango Passion\nFruit Breeze',
    nameFlat: 'Mango Passion Fruit Breeze',
    fontSize: '54px',
    bg:       '#f5eeea',
    word:     'MANGO',
    photo:    prod5,
    accent:   '#d97a3a',
    desc:     'Mango meets passion fruit tartness. The ratio is deliberate. Sweet, then bright, then gone.',
  },
] as const;

const N = PRODUCTS.length;

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {

  /* ── hero parallax refs ────────────────────────────────────────────────── */
  const heroVidWrapEl  = useRef<HTMLDivElement>(null);
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
  const photoPanelEl = useRef<HTMLDivElement>(null);
  const nameEl      = useRef<HTMLHeadingElement>(null);
  const descEl      = useRef<HTMLParagraphElement>(null);
  const glyphEl     = useRef<HTMLDivElement>(null);
  const idxEl       = useRef<HTMLSpanElement>(null);
  const accentEl    = useRef<HTMLSpanElement>(null);

  const currentIdx  = useRef(-1);
  const livePhoto   = useRef<HTMLDivElement | null>(null);

  /* ── photo swap engine (Andtea timing — DO NOT TOUCH) ───────────────────
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

    /* name — preserve newlines as <br> */
    if (nameEl.current) {
      nameEl.current.innerHTML = p.name.replace(/\n/g, '<br>');
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

    /* photo swap — same Andtea timing as cup swap, adapted for full photos */
    if (!photoPanelEl.current) { currentIdx.current = i; return; }

    const incoming = document.createElement('div');
    incoming.className = 'photo-wrap';
    const img = document.createElement('img');
    img.src = p.photo; img.alt = p.nameFlat; img.className = 'prod-photo';
    incoming.appendChild(img);
    photoPanelEl.current.appendChild(incoming);

    if (livePhoto.current && !REDUCED) {
      const out = livePhoto.current;
      out.classList.add('is-exiting');
      if (rev) out.classList.add('rev');
      out.addEventListener('animationend', () => out.remove(), { once: true });
    } else if (livePhoto.current) {
      livePhoto.current.remove();
    }

    if (!REDUCED) {
      incoming.classList.add('is-entering');
      if (rev) incoming.classList.add('rev');
    }
    livePhoto.current  = incoming;
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
        if (heroVidWrapEl.current)
          heroVidWrapEl.current.style.transform = `translateY(${-sy * 0.09}px)`;
        if (heroIntroWrapEl.current)
          heroIntroWrapEl.current.style.transform = `translateY(${-sy * 0.30}px)`;
        if (heroWordWrapEl.current)
          heroWordWrapEl.current.style.transform = `translateY(${-sy * 0.15}px)`;
      }

      /* editorial parallax */
      if (editSecEl.current && !REDUCED) {
        const r = editSecEl.current.getBoundingClientRect();
        const p = Math.max(0, -r.top);
        if (p < 1800) {
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
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="hdr">
        <img src={logoPath} alt="Tao Boba" className="hdr__mark" />
        <nav className="hdr__nav">
          <a href="https://www.thetaoboba.com/menu" className="hdr__link">Menu</a>
          <a href="https://www.exploretock.com/taoboba" className="hdr__link">Order</a>
        </nav>
      </header>

      {/* ══════════════════════════════════ SCENE 01 — HERO ══════════════════
          Velora compositional grammar. Video replaces static photo.
          · Video          lower-left   (left: 88px, top: 306px, 620×390)
          · Small intro    upper-right  (left: 955px, top: 145px, w: 330px)
          · TAO BOBA       below video  (left: 88px, top: 726px, 76px)
          · Scroll cue     lower-right  (right: 72px, bottom: 36px)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="hero">

        {/* Video — outer gets parallax translateY, inner gets entry animation */}
        <div className="hero__photo-wrap" ref={heroVidWrapEl}>
          <div className="hero__photo-inner">
            <video
              className="hero__photo"
              src={heroVid}
              poster={heroPoster}
              autoPlay
              muted
              loop
              playsInline
            />
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

        {/* TAO BOBA wordmark */}
        <div className="hero__wordmark-wrap" ref={heroWordWrapEl}>
          <div className="hero__wordmark-inner" aria-label="Tao Boba">
            TAO BOBA
          </div>
        </div>

        {/* Scroll cue — lower right */}
        <span className="hero__scroll" aria-hidden="true">Scroll ↓</span>

      </section>

      {/* ══════════════════════════════ BRIDGE ════════════════════════════════ */}
      <div className="bridge">
        <span className="bridge__line" data-reveal>Art-directed. Denver-made.</span>
      </div>

      {/* ══════════════════════════════ SCENE 02 — EDITORIAL ══════════════════ */}
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
          Andtea layout: text left, full editorial photo right.
          Photos are used full-frame — travertine pedestals included.
          500vh scroll | sticky 100svh stage | Andtea swap timing preserved.
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

          {/* Name — upper left, large display */}
          <h2
            className="products__name"
            ref={nameEl}
            style={{ fontSize: PRODUCTS[0].fontSize }}
            dangerouslySetInnerHTML={{ __html: PRODUCTS[0].name.replace(/\n/g, '<br>') }}
          />

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

          {/* Background glyph — behind photo panel, left zone only */}
          <div className="products__glyph" ref={glyphEl} aria-hidden="true">
            {PRODUCTS[0].word}
          </div>

          {/* Photo panel — right side, full height, DOM injection target */}
          <div className="products__photo-panel" ref={photoPanelEl} />

        </div>
      </section>

      {/* ══════════════════════════ SCENE 04 — PHOTOGRAPHY ═══════════════════ */}
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
