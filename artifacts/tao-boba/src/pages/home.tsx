import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './tao-editorial.css';

import logoPath from "@assets/image_1786554649837.png";
import petitGateauPath from "@assets/Have_you_tried_Petit_Gateau_at_Tao_Boba_yet_🍰_Its_the_kind_of_1786554447103.jpg";
import butterflyMangoBreezeHeroPath from "@assets/🦋_Meet_your_new_summer_obsession._Butterfly_Mango_Breeze—spar_1786554450238.jpg";
import matchaFloatPath from "@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554467811.jpg";
import amberFloatPath from "@assets/Float_into_summer_with_every_sip._☁️🥭Creamy_cloud_foam_meets__1786554470275.jpg";
import summerSipsLineupPath from "@assets/Five_signature_sips._One_beautiful_lineup._🧋✨Designed_to_be_a_1786554551803.jpg";
import sip2Path from "@assets/Five_signature_sips._One_beautiful_lineup._🧋✨Designed_to_be_a_1786554579731.jpg";
import sip3Path from "@assets/Five_signature_sips._One_beautiful_lineup._🧋✨Designed_to_be_a_1786554582662.jpg";
import sip4Path from "@assets/Five_signature_sips._One_beautiful_lineup._🧋✨Designed_to_be_a_1786554597701.jpg";
import sip5Path from "@assets/Five_signature_sips._One_beautiful_lineup._🧋✨Designed_to_be_a_1786554600646.jpg";
import sip6Path from "@assets/Five_signature_sips._One_beautiful_lineup._🧋✨Designed_to_be_a_1786554603857.jpg";

const DRINKS = [
  {
    name: 'Butterfly Mango',
    category: 'Signature Breeze',
    short: 'Butterfly',
    image: sip2Path,
    tint: '#f7f2ec',
    notes: [
      ['Layered by density', 'The visual separation is part of the drink: bright fruit below, tea and butterfly pea above.'],
      ['Built for contrast', 'Tropical mango sweetness against a more aromatic tea finish keeps the cup vivid without feeling heavy.'],
      ['Made to be seen', 'Color is treated as part of the recipe, not decoration added after the fact.'],
    ],
  },
  {
    name: 'Cloud Foam Matcha',
    category: 'Matcha Series',
    short: 'Matcha',
    image: matchaFloatPath,
    tint: '#f1f3e9',
    notes: [
      ['Whisked fresh', 'Matcha is the focus, with the cloud foam acting as a soft counterpoint rather than hiding the tea.'],
      ['Texture first', 'Creamy foam and a cleaner tea body create the contrast that makes each layer distinct.'],
      ['Green as identity', 'The color stays central to the composition so the drink carries the visual character.'],
    ],
  },
  {
    name: 'Amber Cream Float',
    category: 'Tea + Cream',
    short: 'Amber',
    image: amberFloatPath,
    tint: '#f7f0e7',
    notes: [
      ['Deep tea base', 'A darker tea profile gives the cream top enough structure to feel balanced rather than dessert-heavy.'],
      ['Soft finish', 'The upper layer stays visibly separate until the first sip, then gradually folds into the tea.'],
      ['Simple on purpose', 'The strongest cups do not need many elements when the proportions are right.'],
    ],
  },
  {
    name: 'Rose Water Lychee',
    category: 'Fruit Tea Series',
    short: 'Rose',
    image: sip4Path,
    tint: '#f8eeee',
    notes: [
      ['Floral, not perfumed', 'Lychee carries the sweetness while rose water stays light enough to read as aroma.'],
      ['Bright profile', 'A cleaner fruit-tea structure makes this one feel crisp and highly visual.'],
      ['Seasonal energy', 'Soft pinks and clear layers keep the drink playful without making the page loud.'],
    ],
  },
  {
    name: 'Brown Sugar Tiger',
    category: 'Milk Tea Series',
    short: 'Tiger',
    image: sip5Path,
    tint: '#f5f0e9',
    notes: [
      ['Caramelized depth', 'Brown sugar is allowed to remain visually imperfect, leaving the streaks that give the cup its identity.'],
      ['Milk as contrast', 'The pale body gives the darker sugar enough room to feel graphic and rich.'],
      ['A familiar signature', 'Recognizable boba language, treated with the same visual discipline as the seasonal drinks.'],
    ],
  },
];

const cupVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? '100%' : '-100%',
    x: '0%',
    rotate: direction > 0 ? -20 : 20,
    scale: 0.76,
    opacity: 0,
    filter: 'blur(2px)',
  }),
  center: {
    y: '0%', x: '0%', rotate: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
    transition: { duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? '-100%' : '100%',
    x: direction > 0 ? '8%' : '-8%',
    rotate: direction > 0 ? 35 : -35,
    scale: 0.75,
    opacity: 0,
    filter: 'blur(3px)',
    transition: { duration: 0.33, ease: [0.55, 0, 0.85, 0.35] as [number, number, number, number] },
  }),
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const currentRef = useRef(0);
  const seriesRef = useRef<HTMLElement | null>(null);
  const editARef = useRef<HTMLImageElement | null>(null);
  const editBRef = useRef<HTMLImageElement | null>(null);
  const essayMediaRef = useRef<HTMLDivElement | null>(null);
  const essayCopyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const section = seriesRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight;
        if (total > 0) {
          const progress = Math.min(Math.max(-rect.top / total, 0), 0.9999);
          const next = Math.floor(progress * DRINKS.length);
          if (next !== currentRef.current) {
            setDirection(next > currentRef.current ? 1 : -1);
            currentRef.current = next;
            setCurrent(next);
          }
        }
      }

      const vh = window.innerHeight;
      const editorial = editARef.current?.closest('.tao-editorial');
      if (editorial) {
        const r = editorial.getBoundingClientRect();
        if (r.bottom > -200 && r.top < vh + 200) {
          const p = (vh - r.top) / (vh + r.height);
          if (editARef.current) editARef.current.style.transform = `translate3d(0, ${(-(p - 0.5) * 260).toFixed(1)}px, 0) scale(1.05)`;
          if (editBRef.current) editBRef.current.style.transform = `translate3d(0, ${(-(p - 0.5) * 105).toFixed(1)}px, 0) scale(1.04)`;
        }
      }

      const essay = essayMediaRef.current?.closest('.tao-essay');
      if (essay) {
        const r = essay.getBoundingClientRect();
        if (r.bottom > -200 && r.top < vh + 200) {
          const p = (vh - r.top) / (vh + r.height);
          if (essayMediaRef.current) essayMediaRef.current.style.transform = `translate3d(0, ${(-(p - 0.5) * 220).toFixed(1)}px, 0)`;
          if (essayCopyRef.current) essayCopyRef.current.style.transform = `translate3d(0, ${(-(p - 0.5) * 44).toFixed(1)}px, 0)`;
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const drink = DRINKS[current];

  return (
    <main className="tao-page">
      <header className="tao-masthead">
        <img className="tao-masthead__logo" src={logoPath} alt="Tao Boba" />
      </header>

      <button className="tao-menu-button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
        <span /><span />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="tao-menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>
            <button className="tao-menu-overlay__close" onClick={() => setMenuOpen(false)}>Close</button>
            <nav>
              <a href="#series" onClick={() => setMenuOpen(false)}>Drinks</a>
              <a href="#craft" onClick={() => setMenuOpen(false)}>Craft</a>
              <a href="https://www.thetaoboba.com/menu">Menu</a>
              <a href="https://www.exploretock.com/taoboba">Order</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="tao-hero">
        <div className="tao-hero__photo">
          <img src={summerSipsLineupPath} alt="Tao Boba summer drinks" />
          <div className="tao-hero__vertical-type" aria-hidden="true">
            TAO BOBA · DENVER · TAO BOBA · DENVER · TAO BOBA · DENVER · TAO BOBA · DENVER ·
          </div>
          <p className="tao-hero__caption">Summer Sips · Denver</p>
        </div>
        <div className="tao-hero__panel">
          <img className="tao-hero__product" src={butterflyMangoBreezeHeroPath} alt="Butterfly Mango Breeze" />
          <div className="tao-hero__product-mask" />
          <p className="tao-hero__scroll">Scroll down</p>
        </div>
      </section>

      <section className="tao-editorial" id="craft">
        <div className="tao-editorial__row">
          <div className="tao-editorial__copy tao-editorial__copy--left">
            <p className="tao-editorial__eyebrow">Tea, chosen with intention</p>
            <h2 className="tao-editorial__title">The tea is not the background.</h2>
            <div className="tao-editorial__rule" />
            <p className="tao-editorial__body">Tao’s drinks work best when the tea still has a voice. We build around contrast — aromatic tea, bright fruit, creamy layers, and textures that stay distinct from the first look to the last sip.</p>
          </div>
          <div className="tao-editorial__media">
            <img ref={editARef} src={matchaFloatPath} alt="Tao Boba matcha drink" />
          </div>
          <span className="tao-editorial__wave" aria-hidden="true">~</span>
        </div>

        <div className="tao-editorial__row tao-editorial__row--reverse">
          <div className="tao-editorial__media">
            <img ref={editBRef} src={petitGateauPath} alt="Tao Boba dessert and drink detail" />
          </div>
          <div className="tao-editorial__copy tao-editorial__copy--right">
            <p className="tao-editorial__eyebrow">Built in layers</p>
            <h2 className="tao-editorial__title">Texture is part of the recipe.</h2>
            <div className="tao-editorial__rule" />
            <p className="tao-editorial__body">Cloud foam, fruit, tea, milk and boba are allowed to remain visibly different. The point is not to hide the process. The point is to make the process part of what you want to taste.</p>
          </div>
          <span className="tao-editorial__wave" aria-hidden="true">~</span>
        </div>

        <div className="tao-editorial__row">
          <div className="tao-editorial__copy tao-editorial__copy--left">
            <p className="tao-editorial__eyebrow">Color from the cup</p>
            <h2 className="tao-editorial__title">The drink carries the color.</h2>
            <div className="tao-editorial__rule" />
            <p className="tao-editorial__body">The page stays quiet so the product can be vivid. Mango, matcha, butterfly pea, brown sugar and fruit do the visual work rather than an artificial website palette competing with them.</p>
          </div>
          <div className="tao-editorial__media">
            <img src={sip6Path} alt="Tao Boba seasonal drink" />
          </div>
          <span className="tao-editorial__wave" aria-hidden="true">~</span>
        </div>
      </section>

      <section ref={seriesRef} className="tao-series" id="series" style={{ height: `${DRINKS.length * 100}svh` }}>
        <div className="tao-series__stage" style={{ backgroundColor: drink.tint }}>
          <nav className="tao-series__rail" aria-label="Featured drink series">
            <ul>
              {DRINKS.map((item, index) => (
                <li key={item.short} className={index === current ? 'is-active' : ''}>{item.short}</li>
              ))}
            </ul>
          </nav>

          <div className="tao-series__copy">
            <p className="tao-series__index">{String(current + 1).padStart(2, '0')} / {String(DRINKS.length).padStart(2, '0')}</p>
            <AnimatePresence mode="wait">
              <motion.div key={`${drink.name}-copy`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .45, ease: [0.16,1,0.3,1] }}>
                <h2 className="tao-series__heading">{drink.name}</h2>
                <p className="tao-series__category">{drink.category}</p>
                <div className="tao-series__notes">
                  {drink.notes.map(([title, body]) => (
                    <div className="tao-series__note" key={title}>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="tao-series__product">
            <AnimatePresence initial={false} custom={direction}>
              <motion.figure
                key={drink.name}
                className="tao-series__product-frame"
                custom={direction}
                variants={cupVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <img src={drink.image} alt={drink.name} />
              </motion.figure>
            </AnimatePresence>
          </div>

          <a className="tao-series__cta" href="https://www.thetaoboba.com/menu">View series</a>
          <div className="tao-series__band" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => <span key={i}>{drink.short.toUpperCase()}</span>)}
          </div>
        </div>
      </section>

      <section className="tao-essay">
        <div className="tao-essay__media" ref={essayMediaRef}>
          <img src={sip3Path} alt="Tao Boba product composition" />
          <img src={sip5Path} alt="Tao Boba seasonal drink composition" />
        </div>
        <div className="tao-essay__copy" ref={essayCopyRef}>
          <div>
            <h2>A drink should feel considered before you taste it.</h2>
            <p>The visual side is not separate from the recipe. Color, layers, texture, garnish and glass shape all change the way a drink is understood before the first sip.</p>
          </div>
          <div>
            <h2>Made in Denver. Built around the cup.</h2>
            <p>This direction keeps the interface quiet and lets Tao’s drinks, desserts and in-store world carry the personality. The result should feel like a beverage brand first and a website second.</p>
          </div>
        </div>
      </section>

      <footer className="tao-footer">
        <div className="tao-footer__type" aria-hidden="true">TAO BOBA TAO BOBA</div>
        <div className="tao-footer__meta">1550 S Federal Blvd<br />Denver, Colorado</div>
        <img className="tao-footer__logo" src={logoPath} alt="Tao Boba" />
        <a className="tao-footer__order" href="https://www.exploretock.com/taoboba">Order online →</a>
      </footer>
    </main>
  );
}
