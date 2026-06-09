import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Award, Terminal, Briefcase, Search, Sparkles, Code2, Globe } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { TEAM_IMAGES } from '@/links.js';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: string;
  tag: string;
  image: string;
  description: string;
  skills: string[];
  funFact: string;
  location: string;
  badge: string;
}

const TEAM_MEMBERS_DETAILED: TeamMember[] = [
  {
    id: 'bhagat',
    name: 'Bhagat Singh',
    title: 'Agency Founder & Lead Developer',
    role: 'TECHNICAL ARCHITECT',
    tag: 'CORE ENGINE PROGRAMMER',
    image: TEAM_IMAGES.imgBhagat,
    description: 'Directing Not Decided’s high-performance engineering stack. Bhagat specializes in core technical architecture, custom API proxy gateways, ultra-fast routing, stable database models, and headless server integrations. His code ensures that high-fidelity menu assets yield load speeds under 0.2 seconds.',
    skills: ['React & Node.js Core API Coding', 'Vite & esbuild Configurations', 'Server-Side Speed Tuning', 'Cloud-Native Container Routing'],
    funFact: 'Hand-builds custom reactive compilers and analyzes luxury restaurant page layouts.',
    location: 'Kuala Lumpur, MY',
    badge: 'LEAD DEVELOPER'
  },
  {
    id: 'varshan',
    name: 'Varshan',
    title: 'Co-Founder & Director of Culinary Partnerships',
    role: 'HOSPITALITY INTEGRATION LEAD',
    tag: 'CLIENT SUCCESS & TIMELINE SYNC',
    image: TEAM_IMAGES.imgVarshan,
    description: 'Bridging the high-pressure restaurant kitchen with high-end digital design. Varshan translates culinary philosophies into beautiful digital features, managing prompt launch schedules, physical assets (integrated QR custom frameworks), and organizing client design-alignment reviews.',
    skills: ['Culinary Brand Aesthetics', 'High-Touch Partnership Sync', 'Launch Timeline Orchestration', 'Client-focused Interactive Systems'],
    funFact: 'Cultivates deep relations with elite regional chefs and curates authentic menu styling.',
    location: 'Kuala Lumpur, MY',
    badge: 'PARTNERSHIP DIRECTOR'
  },
  {
    id: 'guru',
    name: 'Guru',
    title: 'Head of Market Analysis & Local SEO',
    role: 'GROWTH & LOCAL DISCOVERY LEAD',
    tag: 'RESERVATION TRANSFORMATION EXPERT',
    image: TEAM_IMAGES.imgGuru,
    description: 'Transforming custom digital portfolios into high-traffic reservation assets. Guru specializes in structured schema.org JSONLD markup, Google Maps local search positioning, competitive audits, and fine-tuning customer acquisition funnels for upscale dining spaces.',
    skills: ['Local Schema.org & SEO Marker Code', 'Google Maps Position Targeting', 'Dining Acquisition Funnel Analytics', '100% Lighthouse Audit Matching'],
    funFact: 'Analyzes over 50 search engine criteria daily to ensure elite food brands dominate local traffic metrics.',
    location: 'Kuala Lumpur, MY',
    badge: 'OPTIMIZATION MASTER'
  }
];

export default function AboutMe() {
  return (
    <section 
      id="about" 
      className="relative py-28 bg-[#03000a] border-t border-white/[0.04] overflow-hidden"
    >
      {/* Premium ambient color leaks */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-indigo-950/5 rounded-full blur-[125px] pointer-events-none" />
 
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Title & Description Header */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-24 text-left">
          <div className="lg:col-span-7">
            <span className="text-[10px] font-mono tracking-[0.25em] text-sky-450 uppercase font-bold bg-sky-500/10 px-4 py-1.5 rounded-full w-max shadow-sm">
              THE ARTISANS BEHIND NOT DECIDED
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-serif mt-5">
              The Not Decided <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400 uppercase font-mono pr-2">Core Team</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-8 border-l border-white/[0.06] mt-4 lg:mt-0">
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed font-sans max-w-xl">
              Elite digital experiences aren't built by templates or commissions. They are forged hands-on by core engineers and specialized digital architects with deep hospitality focus.
            </p>
          </div>
        </ScrollReveal>
 
        {/* Stack of Dedicated Team Sections */}
        <div className="space-y-24 md:space-y-32">
          {TEAM_MEMBERS_DETAILED.map((member, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={member.id} 
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center text-left`}
              >
                {/* Member Photo Block - Alternates order on Large Screens */}
                <div className={`lg:col-span-5 ${!isEven ? 'lg:order-last' : ''}`}>
                  <ScrollReveal delay={0.05}>
                    <div className="group relative">
                      {/* Premium visual outer alignment frames */}
                      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-cyan-500/15 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
                      
                      {/* Interactive Border container */}
                      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] group-hover:border-sky-500/30 transition-all duration-500 aspect-[5/6] bg-neutral-900 shadow-2xl">
                        
                        {/* High fidelity image with zero frame/card styling Inside */}
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-750 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Soft subtle vignettes */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        
                        {/* Real-time Role badge floating */}
                        <div className="absolute top-4 left-4 bg-sky-950/80 backdrop-blur-md border border-sky-400/20 px-3.5 py-1.5 rounded-sm">
                          <span className="text-[10px] font-mono tracking-widest text-sky-400 font-bold uppercase">
                            {member.badge}
                          </span>
                        </div>

                        {/* Location bottom overlay */}
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-[10px] text-neutral-300 font-mono tracking-widest">
                          <MapPin size={10} className="text-sky-400" />
                          <span>{member.location}</span>
                        </div>
                      </div>

                      {/* Accent corner brackets */}
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-sky-500/30 pointer-events-none group-hover:border-sky-400 transition-colors" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-sky-500/30 pointer-events-none group-hover:border-sky-400 transition-colors" />
                    </div>
                  </ScrollReveal>
                </div>

                {/* Member Text & Core Accomplishments Section */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                  <ScrollReveal delay={0.1}>
                    <div>
                      <div className="flex items-center space-x-2.5 text-sky-405 font-mono text-[10px] uppercase tracking-widest font-bold">
                        <span className="p-1.5 bg-sky-500/10 rounded-md">
                          {idx === 0 ? <Code2 size={12} className="text-sky-400" /> : idx === 1 ? <Briefcase size={12} className="text-sky-400" /> : <Globe size={12} className="text-sky-400" />}
                        </span>
                        <span>{member.role}</span>
                      </div>
                      
                      <h3 className="text-2xl md:text-4xl font-bold text-white font-serif tracking-tight mt-3">
                        {member.name}
                      </h3>
                      
                      <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest mt-1.5">
                        {member.title}
                      </p>
                    </div>

                    <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed font-sans max-w-2xl mt-5">
                      {member.description}
                    </p>

                    {/* Skill Matrix Block */}
                    <div className="mt-6 pt-6 border-t border-white/[0.06]">
                      <h4 className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-[0.2em] mb-4">
                        CORE CAPABILITIES
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {member.skills.map((skill, sIdx) => (
                          <div 
                            key={sIdx} 
                            className="flex items-center space-x-2.5 text-xs text-neutral-300 font-sans"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personal Detail Block */}
                    <div className="mt-6 p-4 rounded-xl bg-sky-950/10 border border-white/[0.04] flex items-start space-x-3 max-w-xl">
                      <Sparkles size={14} className="text-sky-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase block font-bold">
                          CREATIVE INSIGHT
                        </span>
                        <p className="text-[11px] text-neutral-400 font-sans leading-relaxed mt-0.5">
                          "{member.funFact}"
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Industry Flag Footer */}
        <div className="mt-28 pt-8 border-t border-sky-500/10 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center space-x-2.5 text-left text-neutral-400 font-sans text-xs">
            <Award size={14} className="text-sky-400" />
            <span>Consistently maintaining elite production, ultra-speed loading assets, and secure backend deployment standards.</span>
          </div>
          <div className="flex items-center space-x-5 text-neutral-405 text-[10px] font-mono tracking-widest uppercase font-bold">
            <span>// LIGHTHOUSE CERTIFIED</span>
            <span>// 100% MOBILE COMPATIBLE</span>
          </div>
        </div>

      </div>
    </section>
  );
}
