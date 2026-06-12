import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Sparkles, MessageCircle, Star } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  quickReplies?: Array<{ label: string; action: string }>;
}

interface LeadData {
  name: string;
  restaurantName: string;
  contact: string;
}

type LeadCaptureStep = 'none' | 'name' | 'restaurant' | 'contact' | 'completed';

export default function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Hello! Welcome to Nexus BlueOrbit Web. 🍾 I'm your AI pricing and design assistant.",
      timestamp: new Date(),
    },
    {
      id: 'welcome-2',
      sender: 'ai',
      text: "I help visionary restaurant brands & culinary spaces analyze custom designs, evaluate speed parameters, and pick the perfect high-performance web package. How may I help you today?",
      timestamp: new Date(),
      quickReplies: [
        { label: "💰 Compare Pricing Tiers", action: "pricing" },
        { label: "⏱️ What is the 10-day timeline?", action: "timeline" },
        { label: "📸 Why custom site over Instagram?", action: "instagram" },
        { label: "📱 Mobile Speed optimization?", action: "mobile" },
        { label: "✨ Launch Project Blueprint", action: "start" },
        { label: "📲 WhatsApp Nexus BlueOrbit Web directly", action: "no_answer" },
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadCaptureStep, setLeadCaptureStep] = useState<LeadCaptureStep>('none');
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    restaurantName: '',
    contact: '',
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleQuickReply = (action: string) => {
    let userText = '';
    switch (action) {
      case 'pricing':
        userText = '💰 Compare Pricing Tiers';
        break;
      case 'timeline':
        userText = '⏱️ Explain the 10-day timeline';
        break;
      case 'instagram':
        userText = '📸 Why do I need a website if I have Instagram?';
        break;
      case 'mobile':
        userText = '📱 Tell me about Mobile Speed calibration';
        break;
      case 'start':
        userText = '✨ I want to start a custom project';
        break;
      case 'back_menu':
        userText = '🔙 Return to main options';
        break;
      case 'no_answer':
        userText = '📲 Talk to Nexus BlueOrbit Web';
        break;
      default:
        userText = action;
    }

    addMessage(userText, 'user');
    setIsTyping(true);

    setTimeout(() => {
      generateResponse(action, userText);
    }, 1100);
  };

  const addMessage = (text: string, sender: 'user' | 'ai', quickReplies?: Array<{ label: string; action: string }>) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      sender,
      text,
      timestamp: new Date(),
      quickReplies,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const generateResponse = (action: string, text: string) => {
    setIsTyping(false);

    if (leadCaptureStep !== 'none' && leadCaptureStep !== 'completed') {
      handleLeadCaptureProgress(text);
      return;
    }

    // Strip punctuation to make matching extremely robust and pleasant
    const cleanedText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();

    // 0.1 High-fidelity Detailed Greetings ("hi", "hello", "hey", "yo")
    const greetings = ['hi', 'hello', 'hey', 'yo', 'greetings', 'howdy', 'good morning', 'good afternoon', 'good evening', 'hola', 'sup', 'morning', 'afternoon'];
    const matchesGreeting = greetings.some(word => 
      cleanedText === word || 
      cleanedText.startsWith(word + ' ') || 
      cleanedText.endsWith(' ' + word) || 
      cleanedText.includes(' ' + word + ' ')
    );

    if (matchesGreeting && action !== 'pricing' && action !== 'timeline' && action !== 'instagram' && action !== 'mobile' && action !== 'start') {
      // Pick a warm greeting based on time of day or nice randomized responses
      const hour = new Date().getHours();
      let timeGreeting = "Hi there! 👋";
      if (hour < 12) timeGreeting = "Good morning! ☕";
      else if (hour < 17) timeGreeting = "Good afternoon!☀️";
      else timeGreeting = "Good evening! 🥂";

      addMessage(
        `${timeGreeting} Warmest welcome to Nexus BlueOrbit Web. It is an absolute pleasure to meet you! \n\n` +
        "I'm your dedicated AI Gastronomy Strategist, engineered specifically to help visionary restaurant owners, cafes, and gourmet spaces design ultra-premium, ultra-fast web outposts.\n\n" +
        "How can I help boost your establishment's performance brand today? Let's check out our pricing tiers, mapping structures, or the exact 10-day launch blueprint!",
        'ai',
        [
          { label: "💰 Compare Pricing Tiers", action: "pricing" },
          { label: "⏱️ Our 10-Day Timeline", action: "timeline" },
          { label: "📸 Website vs Instagram?", action: "instagram" },
          { label: "✨ Launch Project Blueprint", action: "start" },
          { label: "📲 WhatsApp Nexus BlueOrbit Web directly", action: "no_answer" }
        ]
      );
      return;
    }

    // 0.2 "How are you" / "How's it going" Check
    const physicalMoodKeywords = ['how are you', 'how are u', 'how is it going', 'hows it going', 'how you doing', 'how u doing', 'doing today', 'whats up', 'sup'];
    const matchesMood = physicalMoodKeywords.some(phrase => cleanedText.includes(phrase));
    if (matchesMood) {
      addMessage(
        "I am doing outstandingly well! 🚀 Just calibrated a localized page speed mockup and got a rendering paint score of 0.4 seconds. I'm always energized when discussing responsive culinary aesthetics.\n\n" +
        "How are things cooking on your end? Are you looking to launch a brand new venue, or is your existing website loading slower than comfortable?",
        'ai',
        [
          { label: "💰 View Package Options", action: "pricing" },
          { label: "⏱️ Check 10-day Speed Deliverables", action: "timeline" },
          { label: "📱 Discuss Mobile Speed", action: "mobile" }
        ]
      );
      return;
    }

    // 0.3 "Who are you" / "What do you do" / "Who created you" Check
    const identityKeywords = ['who are you', 'what are you', 'your name', 'who built you', 'who made you', 'who created you', 'what do you do'];
    const matchesIdentity = identityKeywords.some(phrase => cleanedText.includes(phrase));
    if (matchesIdentity) {
      addMessage(
        "I am the **Nexus BlueOrbit Web AI Specialist**! 🍾 My system is designed specifically around high-performance restaurant engineering, catering menus, and local search engine mapping.\n\n" +
        "I was engineered in collaboration with **Nexus BlueOrbit Web**, our Lead Developer here at Nexus BlueOrbit Web. I'm here to run structural comparisons, explain page optimizations, and help you pick the perfect digital tier for your venue.\n\n" +
        "If your requirements go beyond our standard blueprints, I can put you directly in touch with Nexus BlueOrbit Web on WhatsApp anytime!",
        'ai',
        [
          { label: "💰 Pricing Packages", action: "pricing" },
          { label: "📲 Talk to Nexus BlueOrbit Web", action: "no_answer" },
          { label: "🔙 Return to Menu", action: "back_menu" }
        ]
      );
      return;
    }

    // 0.4 Gratitude / Approvals check ("thanks", "thank you", "awesome", "cool", "nice")
    const gratitudeKeywords = ['thank you', 'thanks', 'ty', 'appreciate', 'awesome', 'cool', 'great', 'nice', 'wonderful', 'perfect', 'cheers'];
    const matchesGratitude = gratitudeKeywords.some(phrase => 
      cleanedText === phrase || 
      cleanedText.startsWith(phrase + ' ') || 
      cleanedText.endsWith(' ' + phrase)
    );
    if (matchesGratitude) {
      addMessage(
        "You are absolutely welcome! 🥂 It's my absolute culinary privilege to assist you. Creating flawless visual menu grids is what gets us out of bed in the morning.\n\n" +
        "Whenever you're ready, we can run through our high-performance packages or map out a custom launch strategy for your brand.",
        'ai',
        [
          { label: "💰 View Pricing Tiers", action: "pricing" },
          { label: "✨ Start Project Blueprint", action: "start" },
          { label: "🔙 Return to Options", action: "back_menu" }
        ]
      );
      return;
    }

    // 0.5 Location Queries ("where are you based", "kuala lumpur", "malaysia")
    const locationKeywords = ['location', 'where are you', 'where are u', 'based', 'kuala lumpur', 'malaysia', 'where located', 'address'];
    const matchesLocation = locationKeywords.some(phrase => cleanedText.includes(phrase));
    if (matchesLocation) {
      addMessage(
        "Our core agency is based in beautiful **Kuala Lumpur, Malaysia**! 🇲🇾 \n\n" +
        "However, we design and host premium restaurant frontends for gastronomy clients globally. Because everything is built on lightning-fast serverless CDNs, your digital menus will load instantly in under 1.5 seconds, whether your diners are in Bukit Bintang, Singapore, New York, or anywhere else on Earth.",
        'ai',
        [
          { label: "📱 Check speed params", action: "mobile" },
          { label: "💰 Compare Tiers", action: "pricing" },
          { label: "🔙 Return to Menu", action: "back_menu" }
        ]
      );
      return;
    }

    // 1. Pricing Response
    if (action === 'pricing' || cleanedText.includes('price') || cleanedText.includes('pricing') || cleanedText.includes('package') || cleanedText.includes('cost') || cleanedText.includes('how much') || cleanedText.includes('rm')) {
      addMessage(
        "Nexus BlueOrbit Web offers three high-performance investment tiers custom-engineered to capture diners instantly:\n\n" +
        "• **Basic Package (RM800 – RM1,200)**: Single-page layout optimized to mobile touchpoints. Includes printable-quality menus, Google Maps layer, and direct WhatsApp shopping card links.\n\n" +
        "• **Commercial Package [Most Popular] (RM1,800 – RM2,800)**: Multi-page custom React framework with category-filtered active menus, advanced local Google Maps/Places SEO schema, and a custom online table inquiry portal.\n\n" +
        "• **Luxury Package (RM3,500 – RM5,000)**: An immersive culinary theater with rich scroll animations, high-fidelity gallery configurations, dietary allergens lookup tags, and complete automated booking schedules.\n\n" +
        "I highly recommend the **Commercial Package** for active pizzerias and high-traffic lounges. Shall we begin a blueprint review?",
        'ai',
        [
          { label: "✨ Launch Project Blueprint", action: "start" },
          { label: "📱 Discuss Mobile Speed", action: "mobile" },
          { label: "🔙 Main Options", action: "back_menu" }
        ]
      );
      return;
    }

    // 2. Timeline Response
    if (action === 'timeline' || cleanedText.includes('timeline') || cleanedText.includes('how long') || cleanedText.includes('days') || cleanedText.includes('duration') || cleanedText.includes('time')) {
      addMessage(
        "Our agency follows an exact, transparent **10-day timeline schedule** to guarantee unmatched speed and pixel precision:\n\n" +
        "• **Day 1–3 (Visual Blueprinting)**: We align on digital menu logic, structure wireframes, and design fine visual mood boards.\n\n" +
        "• **Day 4–7 (Interactive React Engineering)**: Code generation inside responsive frameworks, active culinary filters, and custom messaging pipelines.\n\n" +
        "• **Day 8–10 (Speed Calibration & Live Launch)**: Compression of assets, indexing Google local search schema directories, verifying 99% Lighthouse PageSpeed score, and linking the live domain.\n\n" +
        "Check out our previous live demo showcase here: **https://demo-mu-two-82.vercel.app/**",
        'ai',
        [
          { label: "✨ Launch Project Blueprint", action: "start" },
          { label: "💰 Check Investment Packages", action: "pricing" },
          { label: "🔙 Return to Options", action: "back_menu" }
        ]
      );
      return;
    }

    // 3. Instagram Objection Handler
    if (action === 'instagram' || cleanedText.includes('instagram') || cleanedText.includes('ig') || cleanedText.includes('social') || cleanedText.includes('facebook') || cleanedText.includes('why web')) {
      addMessage(
        "Instagram is excellent for organic community updates, but rely on it exclusively and you are draining active dining sales:\n\n" +
        "• **Zero Loading Friction**: Diners won't swipe through tiny, outdated Instagram highlights. A bespoke website displays physical food lists on an interactive mobile board with zero squinting.\n\n" +
        "• **Google Maps Domination**: When local diners search 'Best Sourdough Cafe Kuala Lumpur' on Google Search, Instagram handles won't rank. Our optimized local SEO schema delivers you directly onto their maps.\n\n" +
        "• **No Commission Deductions**: Skip external restaurant aggregation commissions. Direct reservation inquires secure your core profit margins.\n\n" +
        "Ready to establish a dedicated, high-speed outpost?",
        'ai',
        [
          { label: "✨ Build Custom Outlet", action: "start" },
          { label: "💰 View Package Costs", action: "pricing" },
          { label: "🔙 Main Options", action: "back_menu" }
        ]
      );
      return;
    }

    // 4. Mobile Speed optimization Response
    if (action === 'mobile' || cleanedText.includes('mobile') || cleanedText.includes('speed') || cleanedText.includes('load') || cleanedText.includes('phone') || cleanedText.includes('slow') || cleanedText.includes('lighthouse')) {
      addMessage(
        "A slow website ruins hungry appetites. Our key standard is keeping mobile sites responsive and instant. 📱\n\n" +
        "Over 85% of physical restaurant searches happen on smartphones. We use serverless compression and custom code structures to hit a guaranteed **99+ performance score on Lighthouse PageSpeed**.\n\n" +
        "That means your pages render in less than 1.5 seconds, avoiding bounce rates and clunky PDF downloads.",
        'ai',
        [
          { label: "💰 Check Pricing Packages", action: "pricing" },
          { label: "📸 Why not Instagram?", action: "instagram" },
          { label: "✨ Start Blueprint", action: "start" }
        ]
      );
      return;
    }

    // 5. Start Project Lead Capture
    if (action === 'start' || cleanedText.includes('start') || cleanedText.includes('enquiry') || cleanedText.includes('hire') || cleanedText.includes('contact') || cleanedText.includes('quote') || cleanedText.includes('book')) {
      setLeadCaptureStep('name');
      addMessage(
        "A superb decision. 🥂 Let's gather your brief project profile. Nexus BlueOrbit Web (Agency Lead) will analyze these details and reach out to you within 2 hours.\n\n" +
        "To start, could you share your **Name**?",
        'ai'
      );
      return;
    }

    // 5.5 WhatsApp Sync Support
    if (action === 'no_answer' || cleanedText.includes('whatsapp') || cleanedText.includes('bhaghat') || cleanedText.includes('direct') || cleanedText.includes('chat') || cleanedText.includes('person') || cleanedText.includes('call')) {
      const whatsappMsg = "Hi Nexus BlueOrbit Web, I'm analyzing a digital build for my dining space on the Nexus BlueOrbit Web AI Assistant and would love to ask you a specific question regarding my culinary project!";
      const whatsappUrl = `https://wa.me/60146231699?text=${encodeURIComponent(whatsappMsg)}`;
      
      addMessage(
        "Excellent. Let's sync you directly with our Principal Developer. 📲\n\n" +
        "Click the link below to load a direct WhatsApp link with Nexus BlueOrbit Web. They are ready to discuss bespoke parameters immediately.",
        'ai',
        [
          { label: "📲 Text Nexus BlueOrbit Web on WhatsApp", action: whatsappUrl },
          { label: "🔙 Main Screen", action: "back_menu" }
        ]
      );
      return;
    }

    // 6. Return menu / options reset
    if (action === 'back_menu' || cleanedText.includes('menu') || cleanedText.includes('back') || cleanedText.includes('restart') || cleanedText.includes('options') || cleanedText.includes('help') || cleanedText === 'main') {
      addMessage(
        "How can Nexus BlueOrbit Web boost your culinary establishment's performance brand today?",
        'ai',
        [
          { label: "💰 Compare Pricing Tiers", action: "pricing" },
          { label: "⏱️ What is the 10-day timeline?", action: "timeline" },
          { label: "📸 Why custom site over Instagram?", action: "instagram" },
          { label: "📱 Mobile Speed optimization?", action: "mobile" },
          { label: "✨ Launch Project Blueprint", action: "start" },
          { label: "📲 WhatsApp Nexus BlueOrbit Web directly", action: "no_answer" },
        ]
      );
      return;
    }

    // Default response mapping
    addMessage(
      "That sounds highly intriguing! Our team specializes in coding bespoke premium restaurant experiences.\n\n" +
      "If you would like to map out specialized requirements, we can start a direct project outline or contact the developer directly.",
      'ai',
      [
        { label: "✨ Launch Project Outline", action: "start" },
        { label: "📲 Chat on WhatsApp", action: "no_answer" },
        { label: "🔙 Return to Menu", action: "back_menu" }
      ]
    );
  };

  const handleLeadCaptureProgress = (text: string) => {
    if (leadCaptureStep === 'name') {
      setLeadData((prev) => ({ ...prev, name: text }));
      setLeadCaptureStep('restaurant');
      addMessage(
        `Nice to connect, ${text}! 🍽️\n\n` +
        "Next, what is the **Name of your restaurant, bakery, or culinary culinary establishment**?",
        'ai'
      );
    } else if (leadCaptureStep === 'restaurant') {
      setLeadData((prev) => ({ ...prev, restaurantName: text }));
      setLeadCaptureStep('contact');
      addMessage(
        `Excellent! **${text}** sounds exceptional.\n\n` +
        "Finally, what is your preferred **Email address or Phone number** so Nexus BlueOrbit Web can send over your custom visual mood board?",
        'ai'
      );
    } else if (leadCaptureStep === 'contact') {
      const finalData = { ...leadData, contact: text };
      setLeadData(finalData);
      setLeadCaptureStep('completed');

      addMessage(
        "Splendid! 🥂 Your project profile is safely compiled.\n\n" +
        `• **Contact Person**: ${finalData.name}\n` +
        `• **Establishment Name**: ${finalData.restaurantName}\n` +
        `• **Contact Information**: ${finalData.contact}\n\n` +
        "Nexus BlueOrbit Web will review these parameters and message you within 2 hours. Let's build a masterpiece!",
        'ai',
        [
          { label: "🔙 Return to Main", action: "back_menu" }
        ]
      );
      
      console.log('Nexus BlueOrbit Web Client Captured AI Lead:', finalData);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    addMessage(userText, 'user');
    setIsTyping(true);

    setTimeout(() => {
      generateResponse(userText, userText);
    }, 1100);
  };

  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, index) => {
      let elements: React.ReactNode = line;
      if (line.includes('**')) {
        const parts = line.split('**');
        elements = parts.map((part, idx) => (idx % 2 === 1 ? <strong key={idx} className="font-semibold text-white">{part}</strong> : part));
      }
      return (
        <p key={index} className={index > 0 ? "mt-1.5" : ""}>
          {elements}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Chat Bubble Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          id="ai-chat-bubble"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(30,64,175,0.3)] border border-white/10 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-white relative group"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {isOpen ? <X size={22} className="stroke-[2.5]" /> : <MessageSquare size={22} className="stroke-[2.5]" />}
          
          {/* Unread Alert Animation Indicator Dot */}
          {!isOpen && (
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500 border border-[#060210]"></span>
            </span>
          )}

          {/* Tooltip Overlay */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#060210] border border-sky-500/20 text-sky-400 text-[10px] uppercase font-mono tracking-widest px-3.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block shadow-lg">
            Ask Nexus BlueOrbit Web AI
          </div>
        </motion.button>
      </div>

      {/* Floating Interactive Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat-panel"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] h-[550px] bg-[#020516]/95 backdrop-blur-3xl border border-sky-500/20 rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden z-50 text-left"
          >
            {/* Custom Electric Neon Sky Blue Header */}
            <div className="bg-gradient-to-r from-blue-950/40 via-sky-900/10 to-cyan-950/30 border-b border-sky-500/15 p-4 shrink-0 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative w-9 h-9 bg-sky-950 border border-sky-500/30 rounded-xl flex items-center justify-center text-sky-400">
                  <Bot size={18} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-sky-450 rounded-full border border-[#0d0925]" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-white font-serif font-semibold text-sm">Nexus BlueOrbit Web AI Specialist</h4>
                    <Sparkles size={11} className="text-sky-400" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#cebfff] uppercase block leading-none mt-1">
                    Gastronomy Web Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-sky-500/15 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Conversation Core Logger */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-sky-950/5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white border border-blue-400/20 rounded-2xl rounded-tr-sm'
                        : 'bg-sky-950/20 text-neutral-200 border border-sky-500/10 rounded-2xl rounded-tl-sm'
                    } px-4 py-2.5 text-xs sm:text-sm max-w-[85%] shadow-md whitespace-pre-line`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                  <span className="text-[9px] font-mono text-neutral-450 uppercase mt-1 px-1">
                    {msg.sender === 'user' ? 'You' : 'Assistant'} · {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {/* Message Action Chips */}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-2 mt-3 max-w-[95%] shrink-0">
                      {msg.quickReplies.map((reply, i) => {
                        const isLink = reply.action.startsWith('http');
                        if (isLink) {
                          return (
                            <a
                              key={i}
                              href={reply.action}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white font-extrabold rounded-full px-3 py-1.5 text-[11px] transition-all duration-300 cursor-pointer shrink-0 hover:scale-[1.02] flex items-center justify-center space-x-1.5 shadow-md"
                            >
                              <span>{reply.label}</span>
                            </a>
                          );
                        }
                        return (
                          <button
                            key={i}
                            onClick={() => handleQuickReply(reply.action)}
                            className="bg-sky-950/20 hover:bg-sky-900/30 text-neutral-305 hover:text-white border border-sky-500/15 hover:border-sky-500/35 rounded-full px-3 py-1.5 text-[11px] transition-all duration-300 cursor-pointer shrink-0 hover:scale-[1.02]"
                          >
                            {reply.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {/* Loader Typing indicator */}
              {isTyping && (
                <div className="flex flex-col items-start animate-pulse">
                  <div className="bg-sky-950/20 border border-sky-500/10 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[9px] font-mono text-neutral-450 uppercase mt-1">
                    Consulting Nexus BlueOrbit Web specs...
                  </span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar Form */}
            <form
              onSubmit={handleFormSubmit}
              className="p-3 bg-sky-950/10 border-t border-sky-500/15 shrink-0 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  leadCaptureStep === 'name' ? "Enter your Name..." :
                  leadCaptureStep === 'restaurant' ? "Enter restaurant name..." :
                  leadCaptureStep === 'contact' ? "Enter your Email / Phone..." :
                  "Inquire about specs, pricing, speed..."
                }
                className="flex-1 bg-black/60 border border-sky-500/15 focus:border-cyan-400/40 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-550 outline-none transition-all duration-300 font-sans"
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="p-3 bg-gradient-to-tr from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 border border-sky-500/20 text-white rounded-xl transition-all duration-300 disabled:opacity-30 flex items-center justify-center cursor-pointer active:scale-95"
                aria-label="Submit message"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
