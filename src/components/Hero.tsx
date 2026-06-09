import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log('Autoplay was prevented or video loading: ', err);
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center pt-36 pb-24 px-6 md:px-8 overflow-hidden bg-[#03000a]"
    >
      {/* High-end ambient background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <video
            ref={videoRef}
            poster="/src/assets/images/luxury_dining_gray_1780927250593.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover brightness-65 contrast-110 scale-102"
          >
            <source src="/hero_video2.mp4" type="video/mp4" />
          </video>
          {/* Soft gradient mask to blend images seamlessly into the deep background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#03000a] via-transparent to-[#03000a]" />
        </div>

        {/* Ambient radial vignette mask matching dark moody black & purple cyber style */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#03000a_85%)] pointer-events-none" />

        {/* Dynamic neon color leaks for luxury futuristic cyber-lounge shimmer */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-900/10 blur-[130px] rounded-full pointer-events-none" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(14,165,233,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center justify-center">
        
        {/* Subtle Accent Intro Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center space-x-2 bg-purple-900/15 backdrop-blur-xl border border-purple-500/20 rounded-full px-5 py-2 mb-8 shadow-[0_4px_24px_rgba(124,58,237,0.1)]"
        >
          <Sparkles size={11} className="text-sky-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#cebfff] uppercase">
            RESTAURANT WEB ENGINEERING
          </span>
        </motion.div>

        {/* Epic Typographical Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] text-white font-serif max-w-4xl"
        >
          Bespoke Digital Spaces <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-355 to-cyan-400 italic font-mono uppercase text-xl sm:text-3xl lg:text-4.5xl tracking-widest font-black block mt-3 pr-2">
            Crafted for Exceptional Restaurants
          </span>
        </motion.h1>

        {/* Subheading with high scannable layout guidelines */}
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mt-6 font-sans"
        >
          High-performance websites for restaurants, cafés, bars, and hospitality brands.
        </motion.p>

        {/* CTA Buttons structured with Immersive UI exact style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="px-10 py-4.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-xs tracking-widest uppercase rounded-full transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-[0_12px_40px_rgba(30,64,175,0.25)] active:scale-95"
          >
            Start Your Project
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="px-10 py-4.5 border border-sky-500/20 bg-sky-950/20 backdrop-blur-md hover:bg-sky-950/40 text-sky-300 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-sm"
          >
            Explore Portfolio
          </button>
        </motion.div>

      </div>
    </section>
  );
}
