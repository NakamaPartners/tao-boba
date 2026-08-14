import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
import cookie1Path from "@assets/The_cookie_everyone_comes_back_for._🤎Now_AVAILABLE_@thetaobob_1786554694737.jpg";
import cookie2Path from "@assets/The_cookie_everyone_comes_back_for._🤎Now_AVAILABLE_@thetaobob_1786554697585.jpg";

const drinks = [
  {
    image: summerSipsLineupPath,
    name: "Summer Sips",
    series: "Seasonal Collection",
    description: "Five signature flavors born from summer. Sparkling, layered, and impossible to resist.",
    typographyWord: "SUMMER",
    bg: "#f5f0e8",
  },
  {
    image: matchaFloatPath,
    name: "Cloud Foam Matcha",
    series: "Signature Series",
    description: "Premium ceremonial matcha meets our house cloud foam. Rich, grassy, impossibly smooth.",
    typographyWord: "MATCHA",
    bg: "#edf0e8",
  },
  {
    image: amberFloatPath,
    name: "Amber Cream Float",
    series: "Signature Series",
    description: "A golden amber tea base finished with slow-poured cream foam. Warm and unhurried.",
    typographyWord: "AMBER",
    bg: "#f5ede0",
  },
  {
    image: sip2Path,
    name: "Butterfly Mango Breeze",
    series: "Summer Limited",
    description: "Butterfly pea flower transforms with mango, blooming from amber to violet before your eyes.",
    typographyWord: "MANGO",
    bg: "#f0ecf5",
  },
  {
    image: sip3Path,
    name: "Rose Water Lychee",
    series: "Signature Series",
    description: "Delicate rose water, fresh lychee, and sparkling water. Light, floral, and precise.",
    typographyWord: "ROSE",
    bg: "#f5ecea",
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleScroll();
    handleResize();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Section 2: Pinned Drink Scroll
  const section2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s2Progress } = useScroll({ target: section2Ref, offset: ["start start", "end end"] });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const indicatorHeight = useTransform(s2Progress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(s2Progress, "change", (latest) => {
    const newIndex = Math.min(Math.floor(latest * 5), 4);
    if (newIndex !== currentIndex) {
      setDirection(newIndex > currentIndex ? 'forward' : 'backward');
      setCurrentIndex(newIndex);
    }
  });

  // Section 4: Parallax Story
  const section4Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s4Progress } = useScroll({ target: section4Ref, offset: ["start end", "end start"] });
  const leftY = useTransform(s4Progress, [0, 1], ["-15%", "15%"]);
  const rightY = useTransform(s4Progress, [0, 1], ["5%", "-5%"]);

  // Section 5: Atmospheric Full-Width
  const section5Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s5Progress } = useScroll({ target: section5Ref, offset: ["start end", "end start"] });
  const row1X = useTransform(s5Progress, [0, 1], ["0%", "-20%"]);
  const row2X = useTransform(s5Progress, [0, 1], ["-20%", "0%"]);
  const row3X = useTransform(s5Progress, [0, 1], ["0%", "-20%"]);
  const bgY = useTransform(s5Progress, [0, 1], ["-15%", "15%"]);

  return (
    <div className="w-full bg-background text-foreground selection:bg-primary/20">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={logoPath} alt="Tao Boba" className="h-8 w-auto object-contain invert" />
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="https://www.thetaoboba.com/menu" className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity">Menu</a>
            <a href="https://www.exploretock.com/taoboba" className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity">Order</a>
          </div>

          <button className="md:hidden text-foreground p-2" onClick={() => setMobileMenuOpen(true)} data-testid="button-open-menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-10"
          >
            <button className="absolute top-6 right-6 p-2 text-foreground" onClick={() => setMobileMenuOpen(false)} data-testid="button-close-menu">
              <X className="w-8 h-8" />
            </button>
            <a href="https://www.thetaoboba.com/menu" className="text-4xl font-serif tracking-wide hover:opacity-60" onClick={() => setMobileMenuOpen(false)}>Menu</a>
            <a href="https://www.exploretock.com/taoboba" className="text-4xl font-serif tracking-wide hover:opacity-60" onClick={() => setMobileMenuOpen(false)}>Order</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 01 HERO */}
      <section className="relative min-h-[100dvh] w-full flex flex-col md:flex-row bg-background pt-20 md:pt-0">
        {/* Left Text / Actions */}
        <div className="w-full md:w-[45%] flex flex-col justify-end p-6 md:p-12 relative z-20 order-2 md:order-1 h-[40vh] md:h-[100dvh]">
          <div className="absolute top-[-4rem] md:top-1/2 left-6 md:left-12 md:-translate-y-1/2 z-30 pointer-events-none w-[120%]">
            <h1 className="font-serif font-medium leading-[0.85] text-foreground" style={{ fontSize: "clamp(4.5rem, 12vw, 14rem)" }}>
              THE ART<br/>OF BOBA
            </h1>
          </div>

          <a href="https://www.exploretock.com/taoboba" className="text-sm uppercase tracking-widest border-b border-foreground/30 hover:border-foreground transition-colors pb-1 inline-block w-max mb-8 md:mb-0 pointer-events-auto" data-testid="link-order-hero">
            Order Online →
          </a>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-[55%] h-[60vh] md:h-[100dvh] order-1 md:order-2">
          <img src={butterflyMangoBreezeHeroPath} className="w-full h-full object-cover" alt="Butterfly Mango Breeze" />
        </div>

        {/* Ticker */}
        <div className="absolute bottom-4 md:bottom-8 w-full overflow-hidden z-20 pointer-events-none text-foreground/40">
          <div className="ticker-track text-xs md:text-sm uppercase tracking-[0.2em]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="mx-4 whitespace-nowrap">
                THE ART OF BOBA · DENVER, CO · EST. 2021 · 
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 02 PINNED SCROLL EXPERIENCE */}
      <section ref={section2Ref} className="relative w-full" style={{ height: "600vh" }}>
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center bg-background">
          {/* Animated Background */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={drinks[currentIndex].bg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-0"
              style={{ backgroundColor: drinks[currentIndex].bg }}
            />
          </AnimatePresence>

          {/* Typography Band behind everything */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={drinks[currentIndex].typographyWord}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="font-serif font-bold text-black opacity-[0.07] whitespace-nowrap"
                style={{ fontSize: "clamp(6rem, 20vw, 22rem)", lineHeight: 1 }}
              >
                {drinks[currentIndex].typographyWord}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-center relative z-10 w-full pt-16 md:pt-0">
            {/* Left: Text Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center h-1/3 md:h-full z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-md"
                >
                  <p className="text-xs uppercase tracking-[0.2em] mb-4 text-foreground/60">
                    {drinks[currentIndex].series}
                  </p>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                    {drinks[currentIndex].name}
                  </h2>
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8">
                    {drinks[currentIndex].description}
                  </p>
                  <a href="https://www.thetaoboba.com/menu" className="text-sm uppercase tracking-widest border-b border-foreground/30 hover:border-foreground transition-colors pb-1 inline-block pointer-events-auto" data-testid={`link-view-menu-${currentIndex}`}>
                    View Menu →
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Drink Image */}
            <div className="w-full md:w-1/2 h-2/3 md:h-full flex items-center justify-center relative z-10">
              <AnimatePresence mode="sync" custom={direction}>
                <motion.img
                  key={currentIndex}
                  custom={direction}
                  variants={{
                    initial: (dir: 'forward' | 'backward') => ({
                      y: dir === 'forward' ? 200 : -200,
                      rotate: dir === 'forward' ? -20 : 20,
                      opacity: 0,
                      x: 0,
                      scale: 1,
                    }),
                    animate: {
                      y: 0,
                      rotate: 0,
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.12
                      }
                    },
                    exit: (dir: 'forward' | 'backward') => ({
                      y: dir === 'forward' ? -120 : 120,
                      x: dir === 'forward' ? 30 : -20,
                      rotate: dir === 'forward' ? 35 : -25,
                      scale: 0.7,
                      opacity: 0,
                      transition: {
                        duration: 0.33,
                        ease: "easeIn"
                      }
                    })
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  src={drinks[currentIndex].image}
                  alt={drinks[currentIndex].name}
                  className="absolute max-h-[60vh] md:max-h-[75vh] w-[80%] md:w-[70%] object-contain mix-blend-multiply"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Scroll Progress Indicator */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-[30vh] bg-foreground/10 mr-4 md:mr-12 z-30">
            <motion.div 
              className="w-full bg-foreground origin-top"
              style={{ height: indicatorHeight }}
            />
          </div>
        </div>
      </section>

      {/* 04 EDITORIAL PARALLAX STORY */}
      <section ref={section4Ref} className="py-32 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            <motion.div className="w-full md:w-1/2 flex flex-col gap-12" style={{ y: isMobile ? 0 : leftY }}>
              <div className="aspect-[3/4] w-full bg-muted overflow-hidden">
                <img src={petitGateauPath} alt="Petit Gateau" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square w-full bg-muted md:w-4/5 ml-auto overflow-hidden">
                <img src={cookie1Path} alt="Cookies" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div className="w-full md:w-1/2 flex flex-col justify-center py-12 md:py-0" style={{ y: isMobile ? 0 : rightY }}>
              <h2 className="font-serif text-4xl md:text-6xl mb-10 leading-tight">Crafted with Intention</h2>
              <div className="space-y-6 text-lg text-foreground/80 leading-relaxed font-light">
                <p>
                  Tao Boba was born from a simple belief: boba deserves the same craft as any great culinary art. We source premium teas, pair them with house-made syrups, and layer flavors the way a chef layers a dish.
                </p>
                <p>
                  Every cup is assembled by hand. The foam is poured slow. The pearls are cooked fresh each morning. Nothing here is automated. Nothing is rushed.
                </p>
              </div>
              <blockquote className="my-12 pl-6 border-l border-foreground/30">
                <p className="font-serif text-2xl italic leading-snug">
                  "Every drink we make tells a story. We want you to taste it."
                </p>
              </blockquote>
              <div>
                <a href="https://www.thetaoboba.com/about" className="text-sm uppercase tracking-widest border-b border-foreground/30 hover:border-foreground transition-colors pb-1 inline-block" data-testid="link-read-story">
                  Read Our Story →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 05 ATMOSPHERIC FULL-WIDTH */}
      <section ref={section5Ref} className="relative h-[80vh] md:h-[100dvh] w-full overflow-hidden bg-foreground flex flex-col items-center justify-center">
        <motion.img 
          src={sip4Path} 
          alt="Atmosphere"
          className="absolute inset-0 w-full h-[130%] object-cover opacity-25"
          style={{ y: bgY }}
        />
        <div className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none select-none gap-2 md:gap-4 overflow-hidden">
          <motion.div style={{ x: row1X }} className="whitespace-nowrap w-[150%] flex justify-center">
            <h2 className="font-serif text-white/20 uppercase" style={{ fontSize: "clamp(3rem, 10vw, 10rem)", lineHeight: 0.9 }}>THE ART OF BOBA · THE ART OF BOBA</h2>
          </motion.div>
          <motion.div style={{ x: row2X }} className="whitespace-nowrap w-[150%] flex justify-center ml-[10%]">
            <h2 className="font-serif text-white/20 uppercase" style={{ fontSize: "clamp(3rem, 10vw, 10rem)", lineHeight: 0.9 }}>THE ART OF BOBA · THE ART OF BOBA</h2>
          </motion.div>
          <motion.div style={{ x: row3X }} className="whitespace-nowrap w-[150%] flex justify-center">
            <h2 className="font-serif text-white/20 uppercase" style={{ fontSize: "clamp(3rem, 10vw, 10rem)", lineHeight: 0.9 }}>THE ART OF BOBA · THE ART OF BOBA</h2>
          </motion.div>
        </div>
      </section>

      {/* 06 LOCATION + SEASONAL */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-16 md:gap-32">
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-12">Visit Us</p>
                
                <div className="font-serif leading-[1.1] mb-16" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                  <p>1550 S Federal Blvd</p>
                  <p>Denver, CO 80219</p>
                </div>
                
                <div className="space-y-6 text-lg font-light mb-16">
                  <div className="flex flex-col sm:flex-row sm:gap-12 border-b border-border pb-6">
                    <span className="text-foreground/50 uppercase tracking-widest text-sm w-32 mb-2 sm:mb-0">Hours</span>
                    <span>Mon-Sun, 11am - 9pm</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-12 border-b border-border pb-6">
                    <span className="text-foreground/50 uppercase tracking-widest text-sm w-32 mb-2 sm:mb-0">Phone</span>
                    <span>(303) 993-7686</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8">
                <a href="https://www.exploretock.com/taoboba" className="text-sm uppercase tracking-widest border-b border-foreground/30 hover:border-foreground transition-colors pb-1 w-max" data-testid="link-order-location">
                  ORDER ONLINE →
                </a>
                <a href="https://maps.google.com/?q=1550+S+Federal+Blvd,+Denver,+CO+80219" target="_blank" rel="noreferrer" className="text-sm uppercase tracking-widest border-b border-foreground/30 hover:border-foreground transition-colors pb-1 w-max" data-testid="link-directions-location">
                  GET DIRECTIONS →
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-12 md:text-right">Seasonal Now</p>
              <div className="w-full bg-muted overflow-hidden">
                <img src={cookie2Path} alt="Petit Gateaux" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000" />
              </div>
              <p className="font-serif text-3xl mt-8">Petit Gateaux</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
            <div className="col-span-1 flex flex-col justify-between">
              <img src={logoPath} alt="Tao Boba" className="h-8 md:h-10 w-auto object-contain mb-8" />
              <p className="font-serif text-lg italic text-background/80">The Art of Boba</p>
            </div>
            
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-background/40">Menu</h4>
              <ul className="space-y-4">
                <li><a href="https://www.thetaoboba.com/menu" className="hover:text-background/70 transition-colors font-light tracking-wide">Menu</a></li>
                <li><a href="https://www.exploretock.com/taoboba" className="hover:text-background/70 transition-colors font-light tracking-wide">Order Online</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-background/40">Visit</h4>
              <ul className="space-y-4">
                <li><a href="https://maps.google.com/?q=1550+S+Federal+Blvd,+Denver,+CO+80219" target="_blank" rel="noreferrer" className="hover:text-background/70 transition-colors font-light tracking-wide">Directions</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-background/40">Connect</h4>
              <ul className="space-y-4">
                <li><a href="https://instagram.com/thetaobobadenver" target="_blank" rel="noreferrer" className="hover:text-background/70 transition-colors font-light tracking-wide">Instagram</a></li>
                <li><a href="https://facebook.com/thetaoboba" target="_blank" rel="noreferrer" className="hover:text-background/70 transition-colors font-light tracking-wide">Facebook</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-background/40 font-light">
            <p>2025 Tao Boba. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
