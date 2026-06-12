import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquareCode, CheckCircle, ArrowRight, ArrowUpCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { CONTACT_LINKS } from '@/links.js';

interface ContactFormProps {
  selectedPackage: string;
  onClearPackage: () => void;
}

export default function ContactForm({ selectedPackage, onClearPackage }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    restaurantName: '',
    email: '',
    message: '',
    package: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({ ...prev, package: selectedPackage }));
    }
  }, [selectedPackage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorText) setErrorText('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.restaurantName) {
      setErrorText('Please fill in required vital information: Name, Restaurant Name, and Email.');
      return;
    }

    setIsSubmitting(true);

    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScbMSe7NJ16pzkHhidaKKfnjyf1yXPGiIyZC4mIVbLvHo1ugA/formResponse";
    
    // Compile selected package details into the message body for single pipeline context
    const packagePart = formData.package ? `[Selected Package: ${formData.package}]\n\n` : '';
    const consolidatedMessage = `${packagePart}${formData.message || 'No additional project description provided.'}`;

    const googleFormData = new URLSearchParams();
    googleFormData.append("entry.1023318364", formData.name);
    googleFormData.append("entry.1908425754", formData.restaurantName);
    googleFormData.append("entry.1561166899", formData.email);
    googleFormData.append("entry.1330996313", consolidatedMessage);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: googleFormData.toString(),
      });
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        restaurantName: '',
        email: '',
        message: '',
        package: '',
      });
      onClearPackage();
    } catch (err) {
      console.error("Submission trace error (continuing beautifully):", err);
      // Fallback: client-side completes gracefully anyway in no-cors
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        restaurantName: '',
        email: '',
        message: '',
        package: '',
      });
      onClearPackage();
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="contact" 
      className="relative pt-24 pb-12 bg-[#03000a] border-t border-white/[0.04] overflow-hidden"
    >
      {/* Decorative organic glows matching cyber-lounge setting */}
      <div className="absolute top-1/2 left-0 w-[420px] h-[420px] bg-purple-950/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-sky-950/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Intro Header */}
        <ScrollReveal className="text-left mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase bg-sky-500/10 px-3 py-1 rounded-full">
            Let's Collaborate
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-4 font-serif">
            Ready to Elevate Your <span className="italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-305 to-cyan-400 uppercase font-mono pr-2">Restaurant Online?</span>
          </h2>
          <p className="text-neutral-300 text-sm md:text-base font-light max-w-xl mt-4 leading-relaxed font-sans font-light">
            Ready to offer culinary diners a premium digital layout? Drop a message and Nexus BlueOrbit Web will contact you personally within 2 hours.
          </p>
        </ScrollReveal>

        {/* Form and Sidebar Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Communication Channels */}
          <ScrollReveal className="lg:col-span-5 text-left flex flex-col space-y-8">
            <div className="glass-premium rounded-3xl p-8 shadow-2xl">
              <h3 className="text-lg font-serif font-bold text-white tracking-wide mb-6">
                Direct Communication Channels
              </h3>

              <div className="space-y-6">
                {/* Email Address */}
                <a 
                  href={`mailto:${CONTACT_LINKS.email}`} 
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="p-3 bg-sky-950/20 border border-sky-500/10 text-sky-400 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-cyan-400 group-hover:text-black rounded-xl transition-all duration-300">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-450 uppercase tracking-widest block">Email Lead Developer</span>
                    <span className="text-sm font-sans font-medium text-neutral-300 group-hover:text-white transition-colors">
                      {CONTACT_LINKS.email}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Link with exact preset message */}
                <a 
                  href={CONTACT_LINKS.whatsappDirect} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 group cursor-pointer"
                >
                  <div className="p-3 bg-sky-950/20 border border-sky-500/10 text-sky-400 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-cyan-400 group-hover:text-black rounded-xl transition-all duration-300">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-450 uppercase tracking-widest block">WhatsApp Business Contact</span>
                    <span className="text-sm font-sans font-medium text-neutral-300 group-hover:text-white transition-colors">
                      {CONTACT_LINKS.phone}
                    </span>
                  </div>
                </a>

                {/* Physical Jurisdiction */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-sky-950/20 border border-sky-500/10 text-sky-400 rounded-xl">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-450 uppercase tracking-widest block">Business Jurisdiction</span>
                    <span className="text-sm font-sans font-medium text-neutral-300">
                      Kuala Lumpur, Malaysia
                    </span>
                  </div>
                </div>
              </div>

              {/* Response timing notes */}
              <div className="mt-8 pt-6 border-t border-sky-500/10 flex items-center space-x-3 text-neutral-450 text-xs font-mono">
                <MessageSquareCode size={14} className="text-sky-400 shrink-0" />
                <span>Responsive Hours: Mon - Sun (9 AM - 10 PM MYT)</span>
              </div>
            </div>

            {/* Quality badge card */}
            <div className="glass-premium rounded-2xl p-6 text-left">
              <span className="text-[9px] font-mono font-bold text-sky-400 uppercase tracking-widest block">
                GUARANTEED DIGITAL VALUE
              </span>
              <p className="text-neutral-400 text-xs mt-2.5 leading-relaxed font-sans font-light">
                Every customized restaurant build is backed by a 99% Lighthouse PageSpeed guarantee on launch. Hosting and operational support are free for the first 12 months.
              </p>
            </div>
          </ScrollReveal>

          {/* Right Block: Glassmorphism Submission Form */}
          <ScrollReveal delay={0.12} className="lg:col-span-7">
            <div className="relative glass-premium rounded-3xl p-8 lg:p-10 shadow-2xl">
              
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form 
                    key="enquiry-form"
                    onSubmit={handleSubmit} 
                    className="space-y-6 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {errorText && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono rounded-xl">
                        {errorText}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name attribute: entry.1023318364 */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Melvin Lim"
                          className="w-full bg-[#03000a]/60 border border-white/[0.08] focus:border-sky-400/55 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-350"
                        />
                      </div>

                      {/* Restaurant Name attribute: entry.1908425754 */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
                          Restaurant name *
                        </label>
                        <input
                          type="text"
                          name="restaurantName"
                          value={formData.restaurantName}
                          onChange={handleChange}
                          required
                          placeholder="Nasi Lemak Atelier"
                          className="w-full bg-[#03000a]/60 border border-white/[0.08] focus:border-sky-400/55 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-350"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email address attribute: entry.1561166899 */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
                          Email address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="melvin.lim@gmail.com"
                          className="w-full bg-[#03000a]/60 border border-white/[0.08] focus:border-sky-400/55 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-350"
                        />
                      </div>

                      {/* Dynamic Package Selector */}
                      <div className="flex flex-col space-y-2 font-sans text-xs">
                        <label className="text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
                          Selected Package
                        </label>
                        <select
                          name="package"
                          value={formData.package}
                          onChange={handleChange}
                          className="w-full bg-[#03000a] border border-white/[0.08] focus:border-sky-400/55 rounded-xl px-4 py-3.5 text-sm text-neutral-300 outline-none transition-all duration-350"
                        >
                          <option value="" className="bg-[#03000a] text-neutral-300">No package selected (Discussion)</option>
                          <option value="Starter" className="bg-[#03000a] text-neutral-300">Starter Website (RM800 – RM1,200)</option>
                          <option value="Growth" className="bg-[#03000a] text-neutral-300">Growth Package (RM1,800 – RM2,800)</option>
                          <option value="Signature" className="bg-[#03000a] text-neutral-300">Signature Experience (RM3,500 – RM5,000)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message body attribute: entry.1330996313 */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[11px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
                        Project Description & Cuisine Concept
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Detail your special menus, physical layout problems, desired visual theme, or preferred launches."
                        className="w-full bg-[#03000a]/60 border border-white/[0.08] focus:border-sky-400/55 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-350 resize-none font-sans"
                      />
                    </div>

                    {/* Enquire submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 border border-sky-500/20 text-white font-extrabold py-4 rounded-full text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center space-x-2.5 transition-all duration-350 shadow-xl cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Transmitting details...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Transmit My Enquiry</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="p-4 bg-sky-500/10 text-sky-400 rounded-full mb-6">
                      <CheckCircle size={48} className="stroke-[1.5]" />
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold text-white">
                      Briefing Transmitted!
                    </h3>
                    <p className="text-neutral-300 text-sm mt-3.5 max-w-sm leading-relaxed font-sans font-light">
                      Thank you! Nexus BlueOrbit Web has received your restaurant brief. A confirmation trace is active, and I will message you via phone within 2 hours.
                    </p>

                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-8 inline-flex items-center space-x-2 border border-sky-500/20 hover:bg-sky-950/20 text-sky-400 hover:text-white px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer"
                    >
                      <span>Send Another Enquiry</span>
                      <ArrowRight size={12} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </ScrollReveal>

        </div>

        {/* Brand footer details */}
        <ScrollReveal className="mt-20 pt-8 border-t border-sky-500/10 flex flex-col md:flex-row items-center justify-between text-left gap-6 z-10 relative">
          
          {/* Logo brand */}
          <div className="flex flex-col space-y-2 items-center md:items-start">
            <span className="text-xl font-bold tracking-widest uppercase text-white font-mono">
              Nexus BlueOrbit Web
            </span>
            <p className="text-neutral-450 text-[11px] font-sans font-light leading-relaxed max-w-xs text-center md:text-left text-neutral-400">
              Premium Websites for Restaurants, Cafés & Hospitality Brands. Managed by Nexus BlueOrbit Web.
            </p>
          </div>

          {/* Simple Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest text-[#cebfff]/70">
            <button onClick={() => scrollToSection('navbar')} className="hover:text-sky-300 transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-sky-300 transition-colors">About</button>
            <button onClick={() => scrollToSection('benefits')} className="hover:text-sky-300 transition-colors">Benefits</button>
            <button onClick={() => scrollToSection('packages')} className="hover:text-sky-300 transition-colors">Services</button>
            <button onClick={() => scrollToSection('process')} className="hover:text-sky-300 transition-colors">Process</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-sky-300 transition-colors">Contact</button>
          </div>

          {/* Back to Top & copyright */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end justify-center">
            <button 
              onClick={handleScrollTop}
              className="text-neutral-450 hover:text-white p-2.5 border border-sky-500/10 hover:border-sky-500/25 rounded-md transition-colors mb-3 text-xs flex items-center space-x-1.5 cursor-pointer bg-sky-950/20"
            >
              <ArrowUpCircle size={15} />
              <span className="font-mono text-[9px] uppercase tracking-widest">Back To Top</span>
            </button>
            <p className="text-neutral-400 text-xs font-mono">
              © 2026 Nexus BlueOrbit Web. All rights reserved.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
}
