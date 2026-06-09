import React from 'react';
import { motion } from 'motion/react';
import { Zap, Search, Sparkles, Smartphone } from 'lucide-react';
import architecturalBg from '../assets/images/architectural_bg_1780950994811.png';
import ScrollReveal from './ScrollReveal';

const BENEFITS_DATA = [
  {
    id: 'benefit-1',
    title: 'Instant Execution',
    description: 'Lightning-fast websites that load instantly on any device.',
    icon: Zap
  },
  {
    id: 'benefit-2',
    title: 'Local Discovery',
    description: 'Local SEO and Google Maps optimization built into every project.',
    icon: Search
  },
  {
    id: 'benefit-3',
    title: 'Atmosphere & Identity',
    description: 'Premium designs that reflect your restaurant\'s atmosphere and identity.',
    icon: Sparkles
  },
  {
    id: 'benefit-4',
    title: 'Modern Mobile Menus',
    description: 'Modern mobile-first menus designed for effortless browsing.',
    icon: Smartphone
  }
];

export default function Benefits() {
  return (
    <section 
      id="benefits" 
      className="relative py-28 bg-[#03000a] border-t border-white/[0.04] overflow-hidden"
    >
      {/* Immersive high-tech graphic background covering the section */}
      <div className="absolute inset-0 z-0">
        <img 
          src={architecturalBg} 
          alt="Architectural Standards Background" 
          className="w-full h-full object-cover opacity-60 brightness-[0.7] contrast-[1.1]" 
          referrerPolicy="no-referrer"
        />
        {/* Deep modern ambient blends to keep text readable on top/bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03000a] via-transparent to-[#03000a] opacity-95" />
        <div className="absolute inset-0 bg-[#03000a]/20" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Title Block */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-300 uppercase bg-sky-505/10 px-3.5 py-1 rounded-full">
            STANDARDS & PERFORMANCE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-4 font-serif">
            Built to Turn <span className="inline-block italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400 uppercase font-mono pr-4">Visitors Into Guests</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent mx-auto mt-6" />
          <p className="text-neutral-350 text-sm md:text-base font-light max-w-xl mx-auto mt-5 leading-relaxed font-sans">
            A beautiful website is only the start. We design and build seamless, high-performance web experiences engineered to showcase your brand.
          </p>
        </ScrollReveal>

        {/* Benefits Grid - 4-card structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {BENEFITS_DATA.map((benefit, i) => {
            const IconComponent = benefit.icon;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                key={benefit.id}
                className="group relative glass-premium glass-premium-hover p-8 rounded-3xl"
              >
                {/* Visual accent top line highlight */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-sky-500/10 to-transparent group-hover:via-sky-400/40 transition-all duration-500" />
                
                <div className="flex flex-col sm:flex-row items-start sm:space-x-5 space-y-4 sm:space-y-0">
                  {/* Icon Container with glowing sky blue ring effect */}
                  <div className="flex-shrink-0 p-3.5 rounded-2xl bg-neutral-900/45 border border-white/[0.06] text-sky-400 group-hover:text-[#03000a] group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-cyan-400 transition-all duration-300 shadow-md">
                    <IconComponent size={20} className="transition-transform duration-500 group-hover:rotate-12" />
                  </div>
 
                  {/* Prose */}
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-serif font-semibold tracking-wide text-white group-hover:text-sky-300 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed mt-2.5 font-sans">
                       {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
