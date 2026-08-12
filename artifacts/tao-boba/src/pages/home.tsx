import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin } from 'lucide-react';

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

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryItems = [
    { src: petitGateauPath, caption: "Petit Gateaux", span: "col-span-1 row-span-2", aspect: "aspect-[3/4]" },
    { src: summerSipsLineupPath, caption: "Summer Sips Lineup", span: "col-span-2 row-span-1", aspect: "aspect-video" },
    { src: sip2Path, caption: "Butterfly Season", span: "col-span-1 row-span-1", aspect: "aspect-square" },
    { src: matchaFloatPath, caption: "Cloud Foam Matcha", span: "col-span-1 row-span-2", aspect: "aspect-[3/4]" },
    { src: sip3Path, caption: "Amber Cream Float", span: "col-span-1 row-span-1", aspect: "aspect-square" },
    { src: sip4Path, caption: "The Full Collection", span: "col-span-2 row-span-1", aspect: "aspect-[21/9]" },
    { src: sip5Path, caption: "Rose Water Fizz", span: "col-span-1 row-span-1", aspect: "aspect-square" },
    { src: amberFloatPath, caption: "Mango Cascade", span: "col-span-1 row-span-1", aspect: "aspect-[3/4]" },
  ];

  const menuItems = [
    { name: "Butterfly Mango Breeze", price: "$7.50" },
    { name: "Cloud Foam Matcha", price: "$7.00" },
    { name: "Amber Cream Float", price: "$6.50" },
    { name: "Rose Water Lychee", price: "$6.50" },
    { name: "Brown Sugar Tiger Milk Tea", price: "$7.00" },
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden">
      
      {/* 01 NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoPath} alt="Tao Boba" className="h-10 w-auto object-contain" />
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="https://www.thetaoboba.com/menu" className="text-sm tracking-widest uppercase hover:text-primary transition-colors">Menu</a>
            <a href="https://www.thetaoboba.com/about" className="text-sm tracking-widest uppercase hover:text-primary transition-colors">Our Story</a>
            <a href="https://www.exploretock.com/taoboba" className="text-sm tracking-widest uppercase hover:text-primary transition-colors">Order</a>
          </div>

          <div className="hidden md:block">
            <a href="https://www.exploretock.com/taoboba" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors">
              ORDER ONLINE
            </a>
          </div>

          <button className="md:hidden text-foreground p-2" onClick={() => setMobileMenuOpen(true)}>
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
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-6 right-6 p-2" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8 text-muted-foreground hover:text-foreground" />
            </button>
            <a href="https://www.thetaoboba.com/menu" className="text-2xl font-serif tracking-wide hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Menu</a>
            <a href="https://www.thetaoboba.com/about" className="text-2xl font-serif tracking-wide hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
            <a href="https://www.exploretock.com/taoboba" className="text-2xl font-serif tracking-wide hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Order</a>
            <a href="https://www.exploretock.com/taoboba" className="mt-8 border border-primary text-primary px-8 py-3 rounded-full tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Order Online
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 02 HERO */}
      <section className="relative min-h-[100dvh] flex flex-col-reverse md:flex-row pt-20 md:pt-0">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 md:py-0 z-10 bg-gradient-to-t from-background via-background to-transparent md:bg-none">
          <motion.div initial="hidden" animate="visible" variants={STAGGER} className="max-w-xl">
            <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight mb-6">
              The Art of Boba
            </motion.h1>
            <motion.p variants={FADE_UP} className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-md">
              Denver's premier boba studio. Every drink, a craft. Every visit, an experience.
            </motion.p>
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4">
              <a href="https://www.exploretock.com/taoboba" className="flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium tracking-wide hover:bg-primary/90 transition-all active:scale-95">
                ORDER ONLINE
              </a>
              <a href="https://www.thetaoboba.com/menu" className="flex items-center justify-center border border-border text-foreground px-8 py-4 rounded-full font-medium tracking-wide hover:border-foreground transition-all active:scale-95">
                VIEW MENU
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={butterflyMangoBreezeHeroPath} 
            alt="Butterfly Mango Breeze" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background md:bg-gradient-to-r md:from-background md:via-transparent md:to-transparent" />
        </div>
      </section>

      {/* 03 TRUST BAR */}
      <section className="border-y border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap md:flex-nowrap items-center divide-y md:divide-y-0 md:divide-x divide-border py-4 md:py-0">
            <div className="w-full md:w-1/4 py-4 md:py-6 px-4 flex flex-col items-center justify-center text-center">
              <div className="text-primary tracking-widest text-lg mb-1">★★★★★ 4.8</div>
              <div className="text-xs text-muted-foreground tracking-widest uppercase">300+ Reviews</div>
            </div>
            <div className="w-full md:w-1/4 py-4 md:py-6 px-4 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 text-foreground mb-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-serif text-lg">Denver Favorite</span>
              </div>
            </div>
            <div className="w-full md:w-1/4 py-4 md:py-6 px-4 flex flex-col items-center justify-center text-center">
              <div className="text-sm text-muted-foreground leading-relaxed">
                Vegan options <br/>
                Dairy-Free & Gluten-Free available
              </div>
            </div>
            <div className="w-full md:w-1/4 py-4 md:py-6 px-4 flex flex-col items-center justify-center text-center">
              <div className="font-serif italic text-lg text-foreground/80">
                The Art of Boba since 2021
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 LOCAL FAVORITES GALLERY */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-4">Local Favorites</h2>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">Curated selections</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
          {galleryItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`group relative overflow-hidden rounded-lg bg-card ${item.span} ${item.aspect}`}
            >
              <img 
                src={item.src} 
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-white font-serif text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 05 THE CRAFT */}
      <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <img src={sip6Path} alt="The Craft" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -inset-4 border border-primary/20 rounded-lg -z-10 translate-x-4 translate-y-4"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER}
            className="w-full md:w-1/2 max-w-xl"
          >
            <motion.h2 variants={FADE_UP} className="text-4xl md:text-5xl font-serif mb-8">The Craft</motion.h2>
            <motion.p variants={FADE_UP} className="text-lg text-muted-foreground leading-relaxed mb-6">
              Tao Boba was born from a simple belief: boba deserves the same intention as any great culinary craft. We source premium teas, pair them with house-made syrups, and layer flavors the way a chef layers a dish.
            </motion.p>
            
            <motion.blockquote variants={FADE_UP} className="pl-6 border-l-2 border-primary my-10">
              <p className="text-2xl font-serif italic leading-snug">
                "Every drink we make tells a story. We want you to taste it."
              </p>
            </motion.blockquote>

            <motion.div variants={FADE_UP}>
              <a href="https://www.thetaoboba.com/about" className="inline-block border border-foreground text-foreground px-8 py-3 rounded-full tracking-wide hover:bg-foreground hover:text-background transition-colors duration-300">
                READ OUR STORY
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 06 MENU PREVIEW */}
      <section className="py-24 md:py-32 container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Signature Drinks</h2>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">Crafted to perfection</p>
        </motion.div>

        <div className="flex flex-col gap-2 mb-16">
          {menuItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex justify-between items-end py-4 group"
            >
              <div className="flex-grow border-b border-border border-dashed mb-1.5 mx-4 group-hover:border-primary/50 transition-colors"></div>
              <div className="order-first font-serif text-xl md:text-2xl">{item.name}</div>
              <div className="order-last text-lg text-muted-foreground">{item.price}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a href="https://www.thetaoboba.com/menu" className="inline-block border border-primary text-primary px-10 py-4 rounded-full tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
            SEE FULL MENU
          </a>
        </div>
      </section>

      {/* 07 ORDER & VISIT */}
      <section className="py-24 border-t border-border bg-secondary/10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Come Find Us</h2>
            
            <div className="space-y-6 text-lg mb-10">
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Location</p>
                <p>1550 S Federal Blvd, Denver, CO 80219</p>
              </div>
              
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Hours</p>
                <p>Mon-Sun 11am - 9pm</p>
              </div>
              
              <div>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Contact</p>
                <p>(303) 993-7686</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium">Pickup</span>
              <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium">Delivery</span>
            </div>

            <div>
              <a href="https://www.exploretock.com/taoboba" className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-medium tracking-wide hover:bg-primary/90 transition-all active:scale-95">
                ORDER ONLINE
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 min-h-[400px] bg-card border border-border rounded-lg overflow-hidden relative group">
            {/* Minimal stylized map placeholder */}
            <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center z-10 pointer-events-none p-6 text-center">
              <MapPin className="w-12 h-12 text-primary mb-4 opacity-80" />
              <h3 className="font-serif text-2xl mb-2">Tao Boba Denver</h3>
              <p className="text-muted-foreground">1550 S Federal Blvd</p>
              <a href="https://maps.google.com/?q=1550+S+Federal+Blvd,+Denver,+CO+80219" target="_blank" rel="noreferrer" className="mt-6 border border-border px-6 py-2 rounded-full text-sm hover:border-primary transition-colors pointer-events-auto">
                Get Directions
              </a>
            </div>
            {/* Map background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDIwaDQwTTAgNDBoNDBNMjAgMHY0ME00MCAwdjQwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIvPjwvc3ZnPg==')]"></div>
          </div>
        </div>
      </section>

      {/* 08 FOOTER */}
      <footer className="bg-black text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1">
              <img src={logoPath} alt="Tao Boba" className="h-12 w-auto object-contain mb-6 opacity-90" />
              <p className="font-serif text-xl italic text-white/80">The Art of Boba</p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/50 mb-6">Menu</h4>
              <ul className="space-y-4">
                <li><a href="https://www.thetaoboba.com/menu" className="hover:text-primary transition-colors">Menu</a></li>
                <li><a href="https://www.thetaoboba.com/menu" className="hover:text-primary transition-colors">Drinks</a></li>
                <li><a href="https://www.thetaoboba.com/menu" className="hover:text-primary transition-colors">Food</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/50 mb-6">Visit</h4>
              <ul className="space-y-4">
                <li><a href="#location" className="hover:text-primary transition-colors">Location</a></li>
                <li><a href="#hours" className="hover:text-primary transition-colors">Hours</a></li>
                <li><a href="https://www.exploretock.com/taoboba" className="hover:text-primary transition-colors">Delivery</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/50 mb-6">Connect</h4>
              <ul className="space-y-4">
                <li><a href="https://instagram.com/thetaobobadenver" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="https://facebook.com/thetaoboba" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Facebook</a></li>
                <li><a href="https://www.exploretock.com/taoboba" className="hover:text-primary transition-colors">Order Online</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
            <p>© 2025 Tao Boba. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
