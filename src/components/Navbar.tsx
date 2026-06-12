import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage?: 'home' | 'team';
  onNavigate?: (page: 'home' | 'team', targetSectionId?: string) => void;
}

export default function Navbar({ currentPage = 'home', onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Portfolio', target: 'portfolio', page: 'home' as const },
    { label: 'Core Benefits', target: 'benefits', page: 'home' as const },
    { label: 'Our Team', target: 'about', page: 'team' as const },
    { label: 'Packages', target: 'packages', page: 'home' as const },
    { label: 'Our Process', target: 'process', page: 'home' as const },
  ];

  const handleLogoClick = () => {
    onNavigate?.('home');
  };

  const handleItemClick = (item: typeof menuItems[0]) => {
    setIsMobileMenuOpen(false);
    onNavigate?.(item.page, item.page === 'home' ? item.target : undefined);
  };

  const handleContactClick = () => {
    setIsMobileMenuOpen(false);
    onNavigate?.('home', 'contact');
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b py-3 md:py-4 ${
          isScrolled
            ? 'bg-[#03000a]/75 backdrop-blur-3xl border-white/[0.04] shadow-[0_8px_32px_0_rgba(0,0,0,0.85)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between relative">
          {/* Logo brand - Nexus BlueOrbit Web */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 text-left cursor-pointer group"
          >
            <img 
              src="/favicon.png" 
              alt="Nexus BlueOrbit Web Logo" 
              className="w-10 h-10 object-contain rounded-xl border border-white/20 shadow-[0_0_20px_rgba(30,64,175,0.35)] transition-all duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-sm xl:text-xl font-bold tracking-widest uppercase text-white font-mono leading-none">
                Nexus BlueOrbit Web
              </span>
              <span className="hidden xl:block text-[9px] font-mono tracking-wider text-sky-400 uppercase leading-none mt-1">
                Nexus BlueOrbit Web
              </span>
            </div>
          </button>

          {/* Centered Desktop Navigation */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center space-x-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            {menuItems.map((item) => {
              const isActive = (item.page === 'team' && currentPage === 'team') || 
                               (item.page === 'home' && currentPage === 'home' && false);
              return (
                <button
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  className={`px-2.5 xl:px-3.5 py-1.5 rounded-full text-[11px] xl:text-xs font-light tracking-widest uppercase cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'text-sky-300 bg-sky-500/10 border border-sky-450/20' 
                      : 'text-white/70 hover:text-sky-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center">
            <button
               onClick={handleContactClick}
               className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold px-4 xl:px-6 py-2.5 rounded-full text-[11px] xl:text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_12px_32px_-10px_rgba(30,64,175,0.3)] hover:scale-[1.03] border border-white/20 cursor-pointer"
            >
              <span>Build My Site</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
               onClick={handleContactClick}
              className="bg-sky-500/10 backdrop-blur-md hover:bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center space-x-1 cursor-pointer"
            >
              <PhoneCall size={10} className="animate-pulse" />
              <span>Free Call</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full bg-sky-950/20 backdrop-blur-xl border border-sky-500/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Right-aligned Dropdown Box */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 right-6 z-50 w-72 bg-[#06040c]/95 border border-white/[0.08] backdrop-blur-3xl rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] lg:hidden flex flex-col"
          >
            {/* Header within dropdown */}
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]">
              <span className="text-[9px] tracking-[0.2em] font-mono text-sky-400 uppercase font-bold">
                NAVIGATION MENU
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 px-1.5 text-[9px] font-mono tracking-widest text-neutral-400 hover:text-white bg-white/5 border border-white/10 rounded-md transition-colors"
              >
                CLOSE
              </button>
            </div>

            {/* List of clean, highly curated menu links */}
            <div className="flex flex-col space-y-3">
              {menuItems.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  className={`text-[11px] font-mono tracking-widest text-left uppercase py-1 cursor-pointer transition-colors block ${
                    (item.page === 'team' && currentPage === 'team')
                      ? 'text-sky-300'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Action panel at bottom */}
            <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-col space-y-4">
              <button
                onClick={handleContactClick}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-black py-3 rounded-full text-[10px] tracking-widest uppercase shadow-[0_8px_20px_-5px_rgba(14,165,233,0.3)] transition-all duration-300 cursor-pointer"
              >
                <span>Start Custom Project</span>
                <ArrowRight size={11} />
              </button>
              
              <div className="text-center text-neutral-500 text-[8px] font-mono uppercase tracking-wider">
                Nexus BlueOrbit Web © 2026
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
