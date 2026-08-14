import { useEffect, useRef } from 'react';

import logoPath          from "@assets/image_1786554649837.png";
import cupTaoLuxePath    from "@assets/cup_tao_luxe_no_bg.png";
import cupMatchaPath     from "@assets/cup_matcha_no_bg.png";
import cupBrownSugarPath from "@assets/cup_brown_sugar_no_bg.png";

/* ─── drinks ──────────────────────────────────────────────────────────────
   One sentence per drink. An observation, not a spec sheet.
─────────────────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    name:   'Tao Luxe',
    tint:   '#f5f0e6',
    word:   'TAO',
    cup:    cupTaoLuxePath,
    accent: '#c9a96e',
    note:   'A two-tone gradient — amber to violet — built by hand, one layer at a time.',
  },
  {
    name:   'Matcha Madness',
    tint:   '#ecf2e8',
    word:   'MATCHA',
    cup:    cupMatchaPath,
    accent: '#7aaa6a',
    note:   'Ceremonial-grade matcha over strawberry over taro. Both layered and stirred are the right answer.',
  },
  {
    name:   'Brown Sugar',
    tint:   '#f3ebe0',
    word:   'BROWN',
    cup:    cupBrownSugarPath,
    accent: '#b87c4a',
    note:   'Slow-roasted syrup, steeped twice, poured over pearls made the same morning.',
  },
] as const;

const REDUCED =
  typeof matchMedia !== 'undefined' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Home() {
  const seriesEl  = useRef<HTMLElement>(null);
  const stageEl   = useRef<HTMLDivElement>(null);
  const stackEl   = useRef<HTMLDivElement>(null);
  const nameEl    = useRef<HTMLHeadingElement>(null);
  const noteEl    = useRef<HTMLParagraphElement>(null);
  const ghostEl   = useRef<HTMLDivElement>(null);
  const accentEl  = useRef<HTMLSpanElement>(null);
  const idxEl     = useRef<HTMLSpanElement>(null);

  const currentRef = useRef(-1);
  const liveCup    = useRef<HTMLDivElement | null>(null);

  /* ── cup swap — direct DOM, Andtea timing preserved exactly ──────── */
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
      nameEl.current.classList.remove('text-in');
      void nameEl.current.offsetWidth;
      nameEl.current.classList.add('text-in');
    }
    if (noteEl.current) {
      noteEl.current.textContent = p.note;
      noteEl.current.classList.remove('text-in');
      void noteEl.current.offsetWidth;
      noteEl.current.classList.add('text-in');
    }
    if (idxEl.current) {
      idxEl.current.textContent =
        `${String(i + 1).padStart(2, '0')} — ${String(PRODUCTS.length).padStart(2, '0')}`;
    }

    currentRef.current = i;
  }

  useEffect(() => {
    goTo(0, 1);

    function updateSeries() {
      const el = seriesEl.current; if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p     = Math.min(Math.max(-rect.top / total, 0), 0.9999);
      const i     = Math.floor(p * PRODUCTS.length);
      if (i !== currentRef.current) goTo(i, i > currentRef.current ? 1 : -1);
    }

    let queued = false;
    function onScroll() {
      if (queued) return; queued = true;
      requestAnimationFrame(() => { updateSeries(); queued = false; });
    }

    addEventListener('scroll', onScroll, { passive: true });
    updateSeries();
    return () => removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────────────────
          Two elements only. No background, no borders, no weight.
          Phoenix mark (white PNG) darkened via CSS filter.
      ──────────────────────────────────────────────────────────────── */}
      <nav className="nav" aria-label="Site navigation">
        <img src={logoPath} className="nav__mark" alt="Tao Boba" />
        <a href="https://www.thetaoboba.com/menu" className="nav__link">
          Menu
        </a>
      </nav>

      {/* ══════════════════════════════════════════════════════ HERO ════
          One object. Nothing else. Vast negative space to the left.
          The cup is a designed object — not a product photo.
      ═══════════════════════════════════════════════════════════════ */}
      <section className="hero" aria-label="Tao Boba">
        <div className="hero__cup">
          <img
            src={cupTaoLuxePath}
            alt="Tao Luxe"
            className="hero__cup-img"
          />
        </div>
        <p className="hero__loc">Denver, CO</p>
      </section>

      {/* ══════════════════════════════════════════════ TRANSITION ══════
          Empty space — then a single sentence sitting alone in it.
          Not a section header. Not centered. An observation.
      ═══════════════════════════════════════════════════════════════ */}
      <div className="breath" aria-hidden="true" />
      <div className="observation">
        <p className="observation__text">
          Crafted in sequence.<br />
          Each layer placed deliberately,<br />
          not mixed.
        </p>
      </div>
      <div className="breath breath--sm" aria-hidden="true" />

      {/* ══════════════════════════════════════════════════ DRINKS ══════
          Pinned scroll. One drink at a time. Cup is the visual moment.
          Background tint shifts per drink.
          Swap engine preserved exactly — Andtea timing unchanged.
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="series"
        ref={seriesEl}
        style={{ height: `${PRODUCTS.length * 100}svh` }}
        aria-label="The drinks"
      >
        <div
          className="series__stage"
          ref={stageEl}
          style={{ backgroundColor: PRODUCTS[0].tint }}
        >
          <div className="ghost-letter" ref={ghostEl} aria-hidden="true" />

          {/* Identity block — upper-left, absolutely placed */}
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

          {/* Cup — right side, dominant */}
          <div className="series__stack" ref={stackEl} />
        </div>
      </section>
    </>
  );
}
