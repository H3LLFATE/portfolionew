import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

import { PORTFOLIO_IMAGES, PORTFOLIO_DEMO_URL } from '@/links.js';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  // ROW 1
  {
    id: 'altitude-42',
    title: 'Altitude 42 Sky Bar',
    category: 'Bars & Lounges',
    subtitle: 'Panoramic Rooftop Fine Dining Menu Portal',
    image: PORTFOLIO_IMAGES.imgAltitude42,
  },
  {
    id: 'maharaja-spice-palace',
    title: "Maharaja's Spice Palace",
    category: 'Fine Dining',
    subtitle: 'Michelin-Starred Classical Indian Cuisine',
    image: PORTFOLIO_IMAGES.imgMaharajaSpice,
  },
  {
    id: 'maharaja',
    title: 'Maharaja Royal Suite',
    category: 'Fine Dining',
    subtitle: 'Premium Hospitality Platform & Multi-lingual Booking',
    image: PORTFOLIO_IMAGES.imgMaharaja,
  },
  {
    id: 'sakura-dining',
    title: 'Sakura Modern Kitchen',
    category: 'Asian Cuisine',
    subtitle: 'Contemporary Haute Japanese Dining & Omakase Booking',
    image: PORTFOLIO_IMAGES.imgSakura,
  },
  // ROW 2
  {
    id: 'golden-dragon',
    title: 'Golden Dragon Bistro',
    category: 'Asian Cuisine',
    subtitle: 'Authentic Szechuan Gastronomy High-Speed Digital Menu',
    image: PORTFOLIO_IMAGES.imgChineseRestaurant,
  },
  {
    id: 'fusion-bistro',
    title: 'Horizon Fusion Bistro',
    category: 'Bars & Lounges',
    subtitle: 'Modern Hybrid Gastropub Interactive Digital Bar List',
    image: PORTFOLIO_IMAGES.imgFusionBistro,
  },
  {
    id: 'sora-kl',
    title: 'Sora KL High Lounge',
    category: 'Bars & Lounges',
    subtitle: 'VIP Japanese Rooftop Club Layout & Skyline Gallery',
    image: PORTFOLIO_IMAGES.imgSoraKL,
  },
  {
    id: 'sweet-heaven',
    title: 'Sweet Heaven Café',
    category: 'Cafes & Sweets',
    subtitle: 'French Artisanal Pâtisserie custom catering platform',
    image: PORTFOLIO_IMAGES.imgSweetHeaven,
  },
  // ROW 3 (reused images to create 3 rows of 4 columns, as requested)
  {
    id: 'altitude-42-reused',
    title: 'Altitude 42 VIP Lounge',
    category: 'Bars & Lounges',
    subtitle: 'Bespoke menu selection and fine culinary booking layout',
    image: PORTFOLIO_IMAGES.imgAltitude42,
  },
  {
    id: 'maharaja-reused',
    title: 'The Taj Maharaja Palace',
    category: 'Fine Dining',
    subtitle: 'Regal dining hospitality platform design',
    image: PORTFOLIO_IMAGES.imgMaharaja,
  },
  {
    id: 'golden-dragon-reused',
    title: 'Golden Szechuan Bistro',
    category: 'Asian Cuisine',
    subtitle: 'Automated ultra-responsive tabletop menu rendering',
    image: PORTFOLIO_IMAGES.imgChineseRestaurant,
  },
  {
    id: 'sora-kl-reused',
    title: 'Sora KL Neon Club',
    category: 'Bars & Lounges',
    subtitle: 'Immersive VIP Club Skyline layout showcase',
    image: PORTFOLIO_IMAGES.imgSoraKL,
  }
];

export default function Portfolio() {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex === null) return;
    setActiveItemIndex((activeItemIndex + 1) % GALLERY_ITEMS.length);
    setIsZoomed(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex === null) return;
    setActiveItemIndex((activeItemIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    setIsZoomed(false);
  };

  return (
    <section 
      id="portfolio" 
      className="relative py-28 bg-[#03000a] border-t border-white/[0.04] overflow-hidden"
    >
      {/* Subtle Background Lighting Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-sky-950/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-sky-950/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Overlay Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(14,165,233,0.012)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-sky-400 uppercase bg-sky-500/10 px-4 py-1.5 rounded-full inline-flex items-center space-x-1 shadow-sm">
            <span>OUR PORTFOLIO</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-5 font-serif uppercase">
            SELECTED CREATIVE PROJECTS
          </h2>
          <div className="w-16 h-[2px] bg-sky-500/30 mx-auto mt-4" />
          <p className="text-neutral-400 text-sm md:text-base font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Exactly 12 screens compiled into a flat, premium showcase grid. Touch to preview with zoom light-box details.
          </p>
        </ScrollReveal>

        {/* 
          Premium 3x4 Photo Grid:
          - Stuck extremely close together (gap-1 or gap-[4px])
          - Absolutely no container cards, no frames, no shadows
          - Perfectly flat grid layout as per user request
        */}
        <div className="w-full py-10 flex justify-center overflow-visible">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] md:gap-[4px] w-full max-w-5.5xl">
            {GALLERY_ITEMS.map((item, index) => (
              <motion.a
                key={item.id}
                href={PORTFOLIO_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.03 }}
                className="group relative cursor-pointer overflow-hidden aspect-[16/10] bg-zinc-950 block"
                id={`portfolio-item-${item.id}`}
              >
                {/* Clean Image with absolutely no frames, borders, shadows or cards */}
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Glassmorphic Minimal Text Overlay on hover only */}
                <div className="absolute inset-0 bg-black/80 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] text-left">
                  <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-white font-serif font-bold text-sm mt-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-neutral-300 font-light mt-1 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                  <div className="mt-3 flex items-center space-x-1 text-sky-400 text-[10px] font-mono tracking-wider">
                    <span>LAUNCH PROJECT LIVE</span>
                    <Maximize2 size={10} className="w-2.5 h-2.5 animate-pulse" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Minimal High-Fidelity Lightbox Overlay */}
        <AnimatePresence>
          {activeItemIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 md:p-8"
              onClick={() => {
                setActiveItemIndex(null);
                setIsZoomed(false);
              }}
            >
              {/* Lightbox Header Close controls */}
              <div className="w-full flex justify-between items-center z-10 max-w-7xl" onClick={(e) => e.stopPropagation()}>
                <div className="text-left">
                  <h4 className="text-[10px] font-mono tracking-[0.2em] text-sky-400 uppercase">
                    {GALLERY_ITEMS[activeItemIndex].category}
                  </h4>
                  <p className="text-white font-serif text-xl font-bold mt-0.5">
                    {GALLERY_ITEMS[activeItemIndex].title}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveItemIndex(null);
                    setIsZoomed(false);
                  }}
                  className="p-3 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-full transition-colors border border-white/5 cursor-pointer backdrop-blur-md"
                  aria-label="Close Lightbox"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Immersive Image Display Frame */}
              <div className="relative flex items-center justify-center w-full max-w-5xl h-[65vh] md:h-[70vh]">
                
                {/* Navigation: Prev Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 md:-left-16 p-4 bg-black/60 hover:bg-neutral-900 border border-white/10 hover:border-sky-400/50 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer shadow-lg z-20"
                  aria-label="Previous Concept"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Main high-resolution screenshot frame */}
                <div 
                  className={`relative max-w-full max-h-full rounded-xl border border-white/10 shadow-2xl select-none flex items-center justify-center transition-all duration-300 ${
                    isZoomed ? 'overflow-auto p-4 bg-black/65 scrollbar-thin scrollbar-thumb-sky-500/20' : 'overflow-hidden'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={GALLERY_ITEMS[activeItemIndex].image}
                    alt={GALLERY_ITEMS[activeItemIndex].title}
                    referrerPolicy="no-referrer"
                    className={`transition-all duration-300 ease-out rounded-lg ${
                      isZoomed 
                        ? 'max-w-none max-h-none md:max-h-[140vh] w-[130%] md:w-[150%] h-auto cursor-zoom-out' 
                        : 'max-w-full max-h-[60vh] md:max-h-[65vh] object-contain cursor-zoom-in'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(!isZoomed);
                    }}
                  />
                  
                  {/* Zoom Hint Badge */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 active:scale-95 text-[9px] font-mono uppercase tracking-widest text-sky-400 px-3 py-1.5 rounded-full border border-white/10 hover:border-sky-500/40 transition-all duration-200 shadow-md cursor-pointer pointer-events-auto"
                  >
                    {isZoomed ? 'Click to Fit' : 'Click to Zoom'}
                  </button>
                  
                  {/* Subtle caption backdrop line - hidden when zoomed to clear screen detail */}
                  {!isZoomed && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-5 text-center pointer-events-none">
                      <p className="text-neutral-350 text-xs font-sans max-w-lg mx-auto leading-relaxed">
                        {GALLERY_ITEMS[activeItemIndex].subtitle}
                      </p>
                    </div>
                  )}
                </div>

                {/* Navigation: Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 md:-right-16 p-4 bg-black/60 hover:bg-neutral-900 border border-white/10 hover:border-sky-400/50 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer shadow-lg z-20"
                  aria-label="Next Concept"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Lightbox Footer pagination indicator */}
              <div className="text-center z-10 text-neutral-500 font-mono text-xs select-none" onClick={(e) => e.stopPropagation()}>
                Concept {activeItemIndex + 1} of {GALLERY_ITEMS.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

