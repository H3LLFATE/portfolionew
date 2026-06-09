import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, Sparkles, Calendar, Zap, Rocket } from 'lucide-react';
import architecturalBg from '../assets/images/architectural_bg_1780950994811.png';
import ScrollReveal from './ScrollReveal';

const TIMELINE_STEPS_DATA = [
  {
    number: '01',
    duration: 'Day 1–3',
    title: 'Discovery & Planning',
    description: 'Bespoke alignment on digital menu logic, high-fidelity mood boards matching your physical room, and complete sitemaps routing.',
    deliverable: 'Approved wireframes, interactive menu layouts flow chart, and confirmed culinary styling blueprints.',
    icon: Calendar,
    color: 'from-blue-950 to-blue-900 border-sky-500/20 text-sky-300'
  },
  {
    number: '02',
    duration: 'Day 4–7',
    title: 'Design & Development',
    description: 'Transforming approvals into clean React front-end components, lightning-fast animations, and custom mobile styling optimizations.',
    deliverable: 'Interactive staging links, active allergen filters tests, and fully operational WhatsApp shopping cards.',
    icon: Zap,
    color: 'from-blue-600 to-sky-500 border-sky-400/30 text-sky-300'
  },
  {
    number: '03',
    duration: 'Day 8–10',
    title: 'Testing & Launch',
    description: 'Rigorous 99% Lighthouse PageSpeed calibration, custom server asset compression, DNS connection updates, and going live.',
    deliverable: 'Completed live public domain, Google Maps local schema injected, and 12-month free maintenance trigger.',
    icon: Rocket,
    color: 'from-sky-600 to-sky-400 border-sky-300/60 text-sky-200'
  }
];

export default function HowIWork() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section 
      id="process" 
      className="relative py-28 bg-[#03000a] border-t border-white/[0.04] overflow-hidden"
    >
      {/* Immersive high-tech graphic background covering the section */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src={architecturalBg} 
          alt="10-Day Launch Schedule Background" 
          className="w-full h-full object-cover opacity-60 brightness-[0.6] contrast-[1.15]" 
          referrerPolicy="no-referrer"
        />
        {/* Soft edge gradients and color-correction layers for deep readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03000a] via-transparent to-[#03000a] opacity-98" />
        <div className="absolute inset-0 bg-[#03000a]/20" />
      </div>

      {/* Decorative vector overlays */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-sky-950/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-sky-950/5 rounded-full blur-[100px] pointer-events-none" />
 
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-305 uppercase bg-sky-505/10 px-3.5 py-1 rounded-full">
            LAUNCH SCHEDULE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-4 font-serif">
            10-Day <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400 uppercase font-mono pr-2">Launch Process</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent mx-auto mt-6" />
          <p className="text-neutral-350 text-sm md:text-base font-light max-w-2xl mx-auto mt-5 leading-relaxed font-sans">
            We follow an exact, structured timeline schedule. From initial alignment to the public live launch, everything is compiled on time.
          </p>
        </ScrollReveal>
 
        {/* Timeline Horizontal / Vertical Responsive Track */}
        <div className="relative mt-12">
          
          {/* Central connecting bar */}
          <div className="absolute top-24 left-[35px] lg:left-6 lg:right-6 lg:top-14 h-[calc(100%-80px)] lg:h-[2px] w-[2px] lg:w-[calc(100%-48px)] bg-gradient-to-b lg:bg-gradient-to-r from-sky-950 via-sky-500/10 to-cyan-500/5 pointer-events-none hidden md:block" />
 
          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
            {TIMELINE_STEPS_DATA.map((step, i) => {
              const StepIcon = step.icon;
              const isPassedOrActive = i <= activeStep;
              
              return (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  key={step.number}
                  className="group relative flex flex-col items-start md:flex-row lg:flex-col text-left space-y-4 md:space-y-0 lg:space-y-6 md:space-x-6 lg:space-x-0 cursor-pointer"
                  onMouseEnter={() => setActiveStep(i)}
                  onClick={() => setActiveStep(i)}
                >
                  
                  {/* Step Bubble Marker */}
                  <div className="flex-shrink-0 relative">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${
                      isPassedOrActive 
                        ? 'from-blue-600 to-cyan-400 border-sky-450 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                        : 'from-[#0a0618] to-[#160e35] border-white/[0.04] text-neutral-500'
                    } border hover:scale-[1.05] transition-all duration-300 flex items-center justify-center shadow-lg relative z-10 backdrop-blur-3xl`}>
                      <span className="text-lg font-mono font-bold">
                        {step.number}
                      </span>
                    </div>
 
                    {/* Active Pulse Circle decoration */}
                    {i === activeStep && (
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-sky-450 animate-ping opacity-75 z-20" />
                    )}
                  </div>
 
                  {/* Step Description details */}
                  <div className="flex-1">
                    
                    {/* Duration Badge */}
                    <div className={`inline-flex items-center space-x-1.5 ${
                      isPassedOrActive ? 'bg-sky-500/10 border-sky-400/20' : 'bg-sky-950/10 border-white/[0.03]'
                    } border rounded-full px-3 py-1.5 mb-4`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isPassedOrActive ? 'bg-sky-300' : 'bg-neutral-600'} shrink-0`} />
                      <span className="text-[10px] font-mono font-bold text-neutral-300 uppercase tracking-widest leading-none">
                        {step.duration}
                      </span>
                    </div>
 
                    <h3 className="text-lg font-serif font-bold text-white tracking-wide group-hover:text-sky-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-neutral-300 text-xs md:text-sm leading-relaxed mt-3.5 font-sans font-light min-h-[50px]">
                      {step.description}
                    </p>
 
                    {/* Key Deliverable Box */}
                    <div className={`mt-5 p-4 glass-premium ${
                      isPassedOrActive ? 'border-sky-400/25 shadow-lg' : 'border-white/[0.02]'
                    } rounded-2xl hover:border-sky-400/40 transition-all duration-350 text-left`}>
                      <div className="flex items-center space-x-2 text-sky-305 font-serif font-bold text-xs tracking-wide">
                        <ClipboardCheck size={13} className="text-sky-400 shrink-0" />
                        <span>Key Milestone Deliverable</span>
                      </div>
                      <p className="text-neutral-400 text-[11px] leading-relaxed mt-1.5 font-sans font-light">
                        {step.deliverable}
                      </p>
                    </div>
 
                  </div>
 
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
