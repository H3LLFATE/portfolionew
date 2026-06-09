import React, { useState } from 'react';
import { motion } from 'motion/react';

// Custom Michelin-Star Style 8-pointed star separator SVG - Sky Blue Accent
const MichelinStar = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-4 h-4 mx-6 text-sky-450 inline-block shrink-0 transition-colors duration-350 group-hover:text-white group-hover:scale-110" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0L14.2 9.2L24 12L14.2 14.8L12 24L9.8 14.8L0 12L9.8 9.2Z" />
  </svg>
);

const KEYWORDS = [
  "React / Next.js",
  "Vercel Hosting",
  "Mobile-First Design",
  "Performance Optimization",
  "Tailwind CSS",
  "SEO & Schema",
  "Framer Motion",
  "WhatsApp Integration"
];

export default function TextRibbon() {
  const [isHovered, setIsHovered] = useState(false);

  // Create a duplicated list for infinite seamless scrolling
  const listItems = [...KEYWORDS, ...KEYWORDS, ...KEYWORDS, ...KEYWORDS];

  return (
    <div className="relative w-full overflow-hidden py-10 z-20">
      {/* Tilt & Skew Container - Physical ribbon sliced dynamic effect */}
      <div className="relative w-full transform -skew-y-[-1.5deg] lg:-skew-y-[-1deg] rotate-[-1deg] scale-[1.015]">
        
        {/* Sleek premium glass Frost Ribbon bar */}
        <div 
          id="text-scroller-ribbon"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full py-5 bg-gradient-to-r from-sky-950/40 via-black/90 to-blue-950/40 backdrop-blur-2xl border-y border-sky-500/20 shadow-[0_10px_40px_rgba(14,165,233,0.1)] overflow-hidden flex cursor-pointer"
        >
          {/* Edge shadow fades to ensure seamless screen entering/exiting visual flow */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060210] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#060210] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Marquee Container using motion to roll leftwards forever */}
          <motion.div
            className="flex items-center whitespace-nowrap shrink-0 flex-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: isHovered ? 120 : 55, // Slower default speed and slower hover speed
            }}
          >
            {/* First sequence */}
            <div className="flex items-center pr-4">
              {listItems.map((keyword, index) => (
                <div 
                  key={`first-${index}`} 
                  className="inline-flex items-center group font-sans"
                >
                  <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-neutral-300 transition-colors duration-300 hover:text-sky-300 select-none">
                    {keyword}
                  </span>
                  <MichelinStar />
                </div>
              ))}
            </div>

            {/* Second identical sequence - prevents any gaps visually */}
            <div className="flex items-center pr-4">
              {listItems.map((keyword, index) => (
                <div 
                  key={`second-${index}`} 
                  className="inline-flex items-center group font-sans"
                >
                  <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-neutral-300 transition-colors duration-300 hover:text-sky-300 select-none">
                    {keyword}
                  </span>
                  <MichelinStar />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
