import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Star, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { CONTACT_LINKS } from '@/links.js';

interface ServicesProps {
  onSelectPackage: (packageName: string) => void;
}

const PACKAGES = [
  {
    id: 'basic',
    name: 'Starter',
    price: 'RM800 – RM1,200',
    tagline: 'Professional Starter Website',
    description: 'Perfect for cafés, bakeries, food stalls, and small restaurants looking for a clean and professional online presence.',
    features: [
      'One-page responsive website',
      'Digital menu display',
      'WhatsApp integration',
      'Google Maps integration',
      'Mobile-optimized design',
      'Basic SEO setup'
    ],
    recommended: false,
    icon: Zap,
    color: 'border-sky-500/10'
  },
  {
    id: 'commercial',
    name: 'Growth',
    price: 'RM1,800 – RM2,800',
    tagline: 'Business Growth Package',
    description: 'Ideal for established restaurants and hospitality brands that need more content, stronger branding, and improved online visibility.',
    features: [
      'Multi-page website',
      'Premium custom design',
      'Gallery section',
      'Google Maps integration',
      'Enhanced SEO optimization',
      'Contact & enquiry forms',
      'Performance optimization'
    ],
    recommended: true,
    icon: Star,
    color: 'border-sky-404/35'
  },
  {
    id: 'luxury',
    name: 'Signature',
    price: 'RM3,500 – RM5,000+',
    tagline: 'Premium Custom Experience',
    description: 'Designed for premium restaurants, hospitality brands, and businesses requiring advanced functionality and a fully tailored digital experience.',
    features: [
      'Fully custom website design',
      'Advanced animations & modern UI',
      'Online reservation system integration',
      'Priority support',
      'Premium performance optimization',
      'Branding-focused user experience',
      'Custom integrations available upon request'
    ],
    recommended: false,
    icon: ShieldCheck,
    color: 'border-sky-500/10'
  }
];

export default function Services({ onSelectPackage }: ServicesProps) {

  const handleSelect = (packageName: string) => {
    onSelectPackage(packageName);
    // Smooth scroll down to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="packages" 
      className="relative py-28 bg-[#03000a] border-t border-white/[0.04] overflow-hidden"
    >
      {/* Dynamic atmospheric color leak blobs */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-950/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[450px] h-[450px] bg-sky-950/5 rounded-full blur-[125px] pointer-events-none" />
 
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(14,165,233,0.015)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
 
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Title Block */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-305 uppercase bg-sky-505/10 px-3.5 py-1 rounded-full">
            TRANSPARENT COOPERATION
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-4 font-serif">
            Investment <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400 uppercase font-mono pr-2">Tiers</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent mx-auto mt-6" />
          <p className="text-neutral-300 text-sm md:text-base font-light max-w-2xl mx-auto mt-5 leading-relaxed font-sans">
            Choose the pricing plan that best matches the dynamic needs of your venue. Real upfront value, transparent scopes, and zero unrequested costs.
          </p>
        </ScrollReveal>
 
        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {PACKAGES.map((pkg, i) => {
            const Icon = pkg.icon;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                key={pkg.id}
                className={`relative glass-premium p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                  pkg.recommended 
                    ? 'border-sky-400/40 shadow-[0_20px_50px_rgba(14,165,233,0.12)] scale-[1.03] lg:scale-[1.04]' 
                    : 'glass-premium-hover shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Recommended Badge */}
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-[10px] font-mono font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-left">
                  {/* Icon of Tier */}
                  <div className={`p-3 w-max rounded-xl bg-sky-950/20 border border-sky-500/10 text-sky-400 mb-6`}>
                    <Icon size={20} />
                  </div>

                  {/* Header Title */}
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                    {pkg.name}
                  </h3>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300 font-mono tracking-wide mt-2 block">
                    {pkg.price}
                  </span>
                  <p className="text-sky-305 text-[11px] font-mono uppercase tracking-wider block mt-1.5">
                    {pkg.tagline}
                  </p>
                  
                  <p className="text-neutral-350 text-xs mt-4 font-light leading-relaxed font-sans min-h-[48px]">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <div className="w-full h-[1px] bg-sky-500/10 my-6" />
                  
                  <ul className="space-y-3.5">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-neutral-300 font-sans font-light">
                        <Check size={14} className="text-sky-400 flex-shrink-0 mt-0.5 mr-2.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit Action Callback */}
                <button
                  onClick={() => handleSelect(pkg.name)}
                  className={`w-full mt-8 py-3.5 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                    pkg.recommended
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-lg shadow-sky-500/10'
                      : 'border border-sky-500/20 bg-sky-950/10 hover:bg-sky-950/30 text-sky-300 hover:text-white'
                  }`}
                >
                  <span>Select Plan</span>
                  <ArrowRight size={13} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Detail Blocks (Custom Features & Hosting) */}
        <ScrollReveal className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 text-left max-w-5xl mx-auto border-t border-white/[0.06] pt-16">
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
              Custom Features Available
            </h4>
            <p className="text-neutral-300 text-xs leading-relaxed font-sans font-light">
              Advanced databases, administrative dashboards, automation workflows, CRM integrations, AI assistants, SMS notifications, and other bespoke functionality can be added based on project requirements. Additional development and third-party service costs may apply.
            </p>
          </div>
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
              Hosting & Domain
            </h4>
            <p className="text-neutral-300 text-xs leading-relaxed font-sans font-light">
              Websites are deployed on Vercel. Clients may use a free Vercel subdomain or connect a custom domain. Domain registration and annual renewal fees are charged separately by the domain provider.
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic Footnote */}
        <ScrollReveal delay={0.15} className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-[10px] text-neutral-450 leading-relaxed font-mono">
            * Have specific integration requirements beyond these options? Contact Nexus BlueOrbit Web via <a href={CONTACT_LINKS.whatsappDirect} target="_blank" rel="noopener noreferrer" className="text-sky-400 select-all hover:underline">WhatsApp ({CONTACT_LINKS.phone})</a>.
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
