import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TextRibbon from './components/TextRibbon';
import Benefits from './components/Benefits';
import Portfolio from './components/Portfolio';
import AboutMe from './components/AboutMe';
import Services from './components/Services';
import HowIWork from './components/HowIWork';
import ContactForm from './components/ContactForm';
import AIChatbox from './components/AIChatbox';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<'home' | 'team'>('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleClearPackage = () => {
    setSelectedPackage('');
  };

  const handleNavigate = (page: 'home' | 'team', targetSectionId?: string) => {
    setCurrentPage(page);
    if (targetSectionId) {
      setTimeout(() => {
        const element = document.getElementById(targetSectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#03000a] text-white font-sans antialiased selection:bg-sky-500/30 selection:text-sky-100 overflow-hidden relative">
      {/* Background Soft Organic Glassy Bubbles - Neon Sky Blue */}
      <div className="fixed top-[-10%] left-[-10%] w-[650px] h-[650px] bg-sky-950/[0.05] rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[750px] h-[750px] bg-sky-950/[0.04] rounded-full blur-[190px] pointer-events-none z-0" />

      {/* Slim Neon Blue-to-Cyan Scroll Progress Indicator */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 shadow-[0_1px_15px_rgba(14,165,233,0.5)] origin-left z-[9999] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Dynamic solid layout grids */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Hero />
              <TextRibbon />
              <Benefits />
              <Portfolio />
              <Services onSelectPackage={handleSelectPackage} />
              <HowIWork />
              <ContactForm 
                selectedPackage={selectedPackage} 
                onClearPackage={handleClearPackage} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pt-24 min-h-screen"
            >
              {/* Standalone Team Hero introductory header */}
              <div className="relative py-20 bg-[#03000a] text-center overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-sky-950/5 rounded-full blur-[110px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-sky-950/5 rounded-full blur-[110px] pointer-events-none" />
                
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                  <span className="text-xs font-mono font-bold tracking-widest text-sky-305 uppercase bg-sky-505/10 px-3.5 py-1 rounded-full">
                    Elite Digital Designers
                  </span>
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mt-4 tracking-tight leading-[1.12]">
                    The Minds Behind <br />
                    <span className="inline-block italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-305 to-cyan-400 uppercase font-mono pr-4">The Nexus BlueOrbit Web Standard</span>
                  </h1>
                  <p className="text-neutral-350 text-sm md:text-base font-light max-w-2xl mx-auto mt-6 leading-relaxed font-sans">
                    Meet the specialized architectural experts delivering hands-on engineering execution and precise culinary domain experience.
                  </p>
                  
                  {/* Visual Accent Backlink Button */}
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => handleNavigate('home')}
                      className="group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-sky-450 hover:from-blue-500 hover:to-sky-400 text-white font-bold px-6 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.03] border border-white/20 cursor-pointer shadow-md"
                    >
                      <span>← Back to Home Showcase</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Our Team page components */}
              <AboutMe />

              {/* Minimalist Team Page Footer / Contact Link */}
              <div className="py-20 border-t border-white/[0.04] bg-[#03000a] text-center relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                  <h3 className="text-2xl font-serif text-white font-bold tracking-tight mb-4">
                    Have a Vision you Want Executed?
                  </h3>
                  <p className="text-neutral-400 text-xs md:text-sm font-light max-w-lg mx-auto mb-8 font-sans">
                    Let Nexus BlueOrbit Web and the core engineering team bring your restaurant's elite digital layout to life.
                  </p>
                  <button
                    onClick={() => handleNavigate('home', 'contact')}
                    className="px-8 py-3.5 bg-sky-505/10 border border-sky-400/30 hover:border-sky-450/60 text-sky-300 font-bold text-xs tracking-widest uppercase rounded-full transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    Contact Our Engineers Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sleek Floating AI Assistant Virtual Chatbox */}
      <AIChatbox />
    </div>
  );
}

