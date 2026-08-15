import { useEffect, useRef } from 'react';

/* ── assets ─────────────────────────────────────────────────────────────── */
// Hero — NOTE: file named 'cookies' contains the actual pour shot; 'pink-pour' contains cookies
import pinkPour    from '@assets/cookies_1786791932026.jpg';

// Editorial — petit gateau (before products)
import petitPurple from '@assets/petit-purple_1786791932035.jpg';
import petitOrange from '@assets/petit-orange_1786791932032.jpg';

// Lower story — seasonal campaign (after products)
import goldenRose  from '@assets/golden-rose_1786791932029.jpg';
import cupidLove   from '@assets/cupid-love_1786791932027.jpg';

// Product cups — prototype set
import cup1 from '@assets/butterfly-mango-jasmine_1786791932019.png';
import cup2 from '@assets/cloud-mango-green-tea_1786791932021.png';
import cup3 from '@assets/cloud-mango-matcha_1786791932022.png';
import cup4 from '@assets/mango-passionfruit_1786791932031.png';
import cup5 from '@assets/shiso-yuzu_1786791932037.png';

/* ── product data (matches prototype JS array exactly) ─────────────────── */
const PRODUCTS = [
  {
    name:  'Butterfly Mango Jasmine',
    short: 'Butterfly',
    photo: cup1,
    tint:  '#f3edf7',
    tone:  '#7651aa',
    copy:  [
      'Floral jasmine meets ripe mango in a vivid purple-to-gold gradient.',
      'Bright, aromatic and visually unmistakable — a signature that leads with color.',
    ] as const,
  },
  {
    name:  'Cloud Mango Green Tea',
    short: 'Cloud Green',
    photo: cup2,
    tint:  '#f6f0e7',
    tone:  '#b77627',
    copy:  [
      'Mango green tea finished with a soft cloud of cream.',
      'A lighter, cleaner profile with a creamy finish and a warm amber body.',
    ] as const,
  },
  {
    name:  'Cloud Mango Matcha',
    short: 'Matcha',
    photo: cup3,
    tint:  '#eff2e7',
    tone:  '#5d733d',
    copy:  [
      'Matcha, milk and mango stack into one of Tao\'s most recognizable layered drinks.',
      'Earthy green tea, fruit and cream create contrast in both flavor and color.',
    ] as const,
  },
  {
    name:  'Mango Passionfruit',
    short: 'Mango',
    photo: cup4,
    tint:  '#f8f1df',
    tone:  '#d08a1d',
    copy:  [
      'Mango and passionfruit bring a bright tropical hit over ice.',
      'Juicy, crisp and built for the days when something refreshing is the whole point.',
    ] as const,
  },
  {
    name:  'Shiso Yuzu',
    short: 'Shiso Yuzu',
    photo: cup5,
    tint:  '#f7eceb',
    tone:  '#d74f63',
    copy:  [
      'Yuzu citrus and shiso create the sharpest, most aromatic drink in the set.',
      'Fresh, vivid and a little unexpected — a clean finish to the collection.',
    ] as const,
  },
] as const;

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
        <div className="brand">TAO BOBA</div>
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
            good to look at as they do to sip — colorful, layered, and
            unmistakably its own.
          </p>
          <div className="vertical-word" aria-hidden="true">
            TAO BOBA · TAO BOBA · TAO BOBA ·
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
              texture becomes part of the experience — glossy shells, soft centers,
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
            <h2>Built to be looked at.<br />Made to disappear.</h2>
            <span className="ed-sub">Small things, fully considered</span>
            <div className="rule" />
            <p>
              The page should feel the same way: composed without feeling stiff,
              rich without feeling busy, and always giving the product enough room
              to carry the color.
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
          <div className="product-copy">
            <p className="product-index" ref={indexEl}>01 / 05</p>
            <h2 className="product-title" ref={titleEl}>
              {PRODUCTS[0].name}
            </h2>
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
          <div className="cup-stack" ref={stackEl} />

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
            <h2>Seasonal drinks,<br />same point of view.</h2>
            <span className="ed-sub">Color without the noise</span>
            <div className="rule" />
            <p>
              Limited drinks can be playful without changing the entire visual
              language. Warm space, one strong image, and the drink still gets to
              be the loudest thing in the room.
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
            <span className="ed-sub">The drink stays the hero</span>
            <div className="rule" />
            <p>
              Even when the campaign changes, Tao should still feel like Tao:
              expressive drinks, soft neutrals around them, and a composition that
              gives color room to breathe.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CLOSING — three-cup composition ══════════
          Cloud Mango Matcha (left, -5°) / Butterfly (center, z-index 2) /
          Shiso Yuzu (right, +5°). Large Baskerville word at bottom.
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="closing">
        <div className="closing-copy">
          <span className="kicker">Five signatures · one collection</span>
          <h2>Come back to the drinks.</h2>
          <p>
            Desserts and seasonal releases add to the world, but the brand should
            always resolve around what Tao is first: a boba and tea bar.
          </p>
        </div>
        <div className="closing-cups" aria-label="Tao Boba signature drinks">
          <img src={cup3} alt="Cloud Mango Matcha" />
          <img src={cup1} alt="Butterfly Mango Jasmine" />
          <img src={cup5} alt="Shiso Yuzu" />
        </div>
        <div className="closing-word" aria-hidden="true">TAO BOBA · TAO BOBA ·</div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">TAO BOBA</div>
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
