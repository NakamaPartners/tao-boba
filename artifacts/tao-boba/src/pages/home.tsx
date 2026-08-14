import { useEffect, useRef } from 'react';

import logoPath       from "@assets/image_1786554649837.png";
import heroPhotoPath  from "@assets/hero_clean.png";

import matchaMango    from "@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731625374.jpg";
import matchaBanana   from "@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731628291.jpg";
import matchaUbe      from "@assets/Experience_the_Art_of_Denver_MatchaSavor_the_unique_flavors_of_1786731632771.jpg";

import craftPhoto     from "@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554467811.jpg";

import cupTaoLuxe     from "@assets/cup_tao_luxe_no_bg.png";
import cupMatcha      from "@assets/cup_matcha_no_bg.png";
import cupBrownSugar  from "@assets/cup_brown_sugar_no_bg.png";

/* ─── drink data ──────────────────────────────────────────────────────────────
   `photo`  = left-panel image shown while this drink is active in the series
   `tint`   = right-panel background colour per drink
   `word`   = enormous background letterform in the right panel
─────────────────────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    name:   'Tao Luxe',
    tint:   '#f0ebe0',
    word:   'TAO',
    cup:    cupTaoLuxe,
    accent: '#c9a96e',
    photo:  matchaMango,
    note:   'A two-tone gradient — amber to violet — built by hand, one layer at a time.',
  },
  {
    name:   'Matcha Madness',
    tint:   '#e8f0e4',
    word:   'MATCHA',
    cup:    cupMatcha,
    accent: '#7aaa6a',
    photo:  matchaUbe,
    note:   'Ceremonial-grade matcha over strawberry over taro. Drink it either way.',
  },
  {
    name:   'Brown Sugar',
    tint:   '#f0e8d8',
    word:   'BROWN',
    cup:    cupBrownSugar,
    accent: '#b87c4a',
    photo:  matchaBanana,
    note:   'Slow-roasted syrup. Same-day pearls. Never a shortcut.',
  },
] as const;

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Home() {
  /* ── refs ────────────────────────────────────────────────────────────── */
  const seriesEl  = useRef<HTMLElement>(null);
  const stackEl   = useRef<HTMLDivElement>(null);
  const panelEl   = useRef<HTMLDivElement>(null);   // right panel — gets bg tint
  const photoEl   = useRef<HTMLDivElement>(null);   // left panel — gets photo swap
  const nameEl    = useRef<HTMLHeadingElement>(null);
  const noteEl    = useRef<HTMLParagraphElement>(null);
  const glyphEl   = useRef<HTMLDivElement>(null);
  const accentEl  = useRef<HTMLSpanElement>(null);
  const idxEl     = useRef<HTMLSpanElement>(null);

  const currentRef  = useRef(-1);
  const liveCup     = useRef<HTMLDivElement | null>(null);
  const photoTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── cup swap — direct DOM, Andtea timing preserved exactly ────────── */
  function goTo(i: number, dir: number) {
    if (i === currentRef.current) return;
    if (!stackEl.current) return;

    const p   = PRODUCTS[i];
    const rev = dir < 0;

    /* inject incoming cup */
    const incoming = document.createElement('div');
    incoming.className = 'cup-wrap';
    const img = document.createElement('img');
    img.src = p.cup; img.className = 'cup-img'; img.alt = p.name;
    incoming.appendChild(img);
    stackEl.current.appendChild(incoming);

    /* exit outgoing cup */
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

    /* right panel background tint */
    if (panelEl.current) panelEl.current.style.backgroundColor = p.tint;
    if (accentEl.current) accentEl.current.style.background = p.accent;

    /* background letterform */
    if (glyphEl.current) {
      glyphEl.current.textContent = p.word;
      glyphEl.current.classList.remove('glyph-pop');
      void glyphEl.current.offsetWidth;
      glyphEl.current.classList.add('glyph-pop');
    }

    /* drink name */
    if (nameEl.current) {
      nameEl.current.textContent = p.name;
      nameEl.current.classList.remove('text-in');
      void nameEl.current.offsetWidth;
      nameEl.current.classList.add('text-in');
    }

    /* note */
    if (noteEl.current) {
      noteEl.current.textContent = p.note;
      noteEl.current.classList.remove('text-in');
      void noteEl.current.offsetWidth;
      noteEl.current.classList.add('text-in');
    }

    /* index counter */
    if (idxEl.current) {
      idxEl.current.textContent =
        `${String(i + 1).padStart(2, '0')} — ${String(PRODUCTS.length).padStart(2, '0')}`;
    }

    /* left-panel photo crossfade */
    if (photoEl.current) {
      if (photoTimer.current) clearTimeout(photoTimer.current);
      photoEl.current.style.opacity = '0';
      photoTimer.current = setTimeout(() => {
        if (photoEl.current) {
          photoEl.current.style.backgroundImage = `url(${p.photo})`;
          photoEl.current.style.opacity = '1';
        }
      }, REDUCED ? 0 : 200);
    }

    currentRef.current = i;
  }

  useEffect(() => {
    /* initialise first drink */
    goTo(0, 1);

    /* scroll → drink index */
    function updateSeries() {
      const el = seriesEl.current; if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p     = Math.min(Math.max(-rect.top / total, 0), 0.9999);
      const i     = Math.floor(p * PRODUCTS.length);
      if (i !== currentRef.current) goTo(i, i > currentRef.current ? 1 : -1);
    }

    /* scroll reveals */
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

    let queued = false;
    function onScroll() {
      if (queued) return; queued = true;
      requestAnimationFrame(() => { updateSeries(); queued = false; });
    }

    addEventListener('scroll', onScroll, { passive: true });
    updateSeries();

    return () => {
      removeEventListener('scroll', onScroll);
      io.disconnect();
      if (photoTimer.current) clearTimeout(photoTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────────────────────
          Sits above both panels. mix-blend-mode:difference so it reads
          on both the dark photography and the cream product panel.
      ─────────────────────────────────────────────────────────────────── */}
      <nav className="nav">
        <img src={logoPath} className="nav__mark" alt="Tao Boba" />
        <a href="https://www.exploretock.com/taoboba" className="nav__order">
          Order
        </a>
      </nav>

      {/* ══════════════════════════════════════════════════════ 01  HERO ════
          Left: rich group photography — five drinks, warm concrete
          Right: brand identity on warm cream + signature cup
          Pattern from Andtea: photo left / product right / glyph behind
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="hero">

        <div
          className="hero__photo"
          style={{ backgroundImage: `url(${heroPhotoPath})` }}
        />

        <div className="hero__panel">
          {/* enormous background letterform */}
          <div className="hero__glyph" aria-hidden="true">TAO</div>

          {/* static hero cup */}
          <div className="hero__cup">
            <img src={cupTaoLuxe} alt="Tao Luxe" className="hero__cup-img" />
          </div>

          {/* brand text — lower-left of right panel */}
          <div className="hero__brand">
            <h1 className="hero__title">
              The Art<br /><em>of Boba.</em>
            </h1>
            <p className="hero__sub">Tao Boba &nbsp;·&nbsp; Denver, CO</p>
          </div>
        </div>

        {/* scroll cue */}
        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>

      </section>

      {/* ══════════════════════════════════════════════ 02  EDITORIAL ═══════
          Rich photography spread — asymmetric proportions.
          Large matcha photo left, secondary image top-right, prose below.
          No equal columns. Varied image heights.
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="editorial" aria-label="Summer collection">

        <div className="editorial__primary">
          <img src={matchaUbe} alt="" />
        </div>

        <div className="editorial__side">
          <div className="editorial__upper">
            <img src={matchaMango} alt="" />
          </div>
          <div className="editorial__prose" data-reveal>
            <span className="edt-label">Summer · 2026</span>
            <p className="edt-body">
              Single-origin matcha.<br />
              Three expressions, one obsession.
            </p>
            <a href="https://www.thetaoboba.com/menu" className="edt-link">
              Full menu
            </a>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════ 03  DRINK SERIES ════
          Pinned scroll — Andtea cup choreography.
          Left panel: photography per drink, crossfades on change.
          Right panel: cup on tinted background, enormous glyph behind.
          Timing preserved exactly from Andtea reference.
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="series"
        ref={seriesEl}
        style={{ height: `${PRODUCTS.length * 100}svh` }}
        aria-label="Our drinks"
      >
        <div className="series__stage">

          {/* Left: photo panel */}
          <div
            className="series__photo"
            ref={photoEl}
            style={{ backgroundImage: `url(${PRODUCTS[0].photo})` }}
          />

          {/* Right: product panel */}
          <div
            className="series__panel"
            ref={panelEl}
            style={{ backgroundColor: PRODUCTS[0].tint }}
          >
            {/* enormous background letterform */}
            <div className="series__glyph" ref={glyphEl} aria-hidden="true" />

            {/* drink identity */}
            <div className="series__ident">
              <span className="series__idx" ref={idxEl} aria-hidden="true">
                01 — {String(PRODUCTS.length).padStart(2, '0')}
              </span>
              <h2 className="series__name" ref={nameEl}>
                {PRODUCTS[0].name}
              </h2>
              <span
                className="series__accent"
                ref={accentEl}
                style={{ background: PRODUCTS[0].accent }}
              />
              <p className="series__note" ref={noteEl}>
                {PRODUCTS[0].note}
              </p>
            </div>

            {/* cup DOM target */}
            <div className="series__stack" ref={stackEl} />
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════ 04  ATMOSPHERE ══════
          One full-bleed atmospheric photo. Short editorial text overlay.
          The one moment of warmth and context on an otherwise precise page.
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="atmosphere">
        <div className="atmosphere__photo">
          <img src={craftPhoto} alt="" />
        </div>
        <div className="atmosphere__text" data-reveal>
          <p className="atmosphere__line">
            Every layer placed<br />with intention.
          </p>
          <span className="atmosphere__sub">Made daily &nbsp;·&nbsp; Denver, CO</span>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="foot">
        <div className="foot__info">
          <p>Mon – Sun &nbsp; 11 : 00 – 21 : 00</p>
          <p>1550 S Federal Blvd, Denver CO 80219</p>
          <p>(303) 993-7686</p>
        </div>
        <div className="foot__center">
          <img src={logoPath} className="foot__logo" alt="Tao Boba" />
        </div>
        <div className="foot__right">
          <a href="https://www.exploretock.com/taoboba">Order Online</a>
        </div>
      </footer>
    </>
  );
}
