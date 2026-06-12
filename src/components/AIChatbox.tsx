import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Sparkles, MessageCircle, Star } from 'lucide-react';
import { CONTACT_LINKS } from '@/links.js';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  quickReplies?: Array<{ label: string; action: string }>;
}



export default function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Hello! Welcome to Nexus BlueOrbit Web. 👋 I'm your AI assistant.",
      timestamp: new Date(),
    },
    {
      id: 'welcome-2',
      sender: 'ai',
      text: "I help local businesses and restaurants analyze design options, evaluate loading speeds, and pick the perfect website package. How may I help you today?",
      timestamp: new Date(),
      quickReplies: [
        { label: "💰 Compare Pricing Tiers", action: "pricing" },
        { label: "⏱️ Our 10-day timeline?", action: "timeline" },
        { label: "📸 Why custom site over Instagram?", action: "instagram" },
        { label: "📱 Mobile Speed optimization?", action: "mobile" },
        { label: "📁 View Portfolio work", action: "portfolio" },
        { label: "📲 Chat / Contact Us", action: "contact_options" },
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
      case 'contact_options':
      case 'no_answer':
        userText = '📲 Chat / Contact Us';
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

    // Strip punctuation to make matching extremely robust
    const cleanedText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();

    // 1. CONTACT RULE: If user asks for direct contact or developer channels,
    // immediately show contact options without asking for Name/Email first.
    const isContactTrigger = 
      action === 'contact_options' || 
      action === 'no_answer' || 
      cleanedText.includes('contact') || 
      cleanedText.includes('whatsapp') || 
      cleanedText.includes('instagram') || 
      cleanedText.includes('ig') || 
      cleanedText.includes('hire') || 
      cleanedText.includes('quote') || 
      cleanedText.includes('enquiry') || 
      cleanedText.includes('speak to someone') || 
      cleanedText.includes('call') || 
      cleanedText.includes('developer') || 
      cleanedText.includes('chat with us') || 
      cleanedText.includes('person') || 
      cleanedText.includes('sync') ||
      cleanedText.includes('email');

    if (isContactTrigger) {
      addMessage(
        "You can reach our team directly through:\n\n" +
        "📲 WhatsApp\n" +
        "📸 Instagram\n" +
        "📧 Email\n\n" +
        "We usually reply within 2 hours.\n\n" +
        "If you'd like a recommendation before contacting us, tell me what type of business you run.",
        'ai',
        [
          { label: "📲 Chat on WhatsApp", action: CONTACT_LINKS.whatsappDirect },
          { label: "📸 Chat on Instagram", action: CONTACT_LINKS.instagram },
          { label: "📧 Email Us", action: `mailto:${CONTACT_LINKS.email}` },
          { label: "🔙 Return to Menu", action: "back_menu" }
        ]
      );
      return;
    }

    // 2. Greetings triggers
    const greetings = ['hi', 'hello', 'hey', 'yo', 'greetings', 'howdy', 'good morning', 'good afternoon', 'good evening', 'hola', 'sup', 'morning', 'afternoon'];
    const matchesGreeting = greetings.some(word => 
      cleanedText === word || 
      cleanedText.startsWith(word + ' ') || 
      cleanedText.endsWith(' ' + word) || 
      cleanedText.includes(' ' + word + ' ')
    );
    if (matchesGreeting) {
      addMessage(
        "Hello! Welcome to Nexus BlueOrbit Web. 👋 I'm your AI assistant.\n\n" +
        "I help local businesses and restaurants analyze design options, evaluate loading speeds, and pick the perfect website package. How may I help you today?",
        'ai',
        [
          { label: "💰 Compare Pricing Tiers", action: "pricing" },
          { label: "⏱️ Our 10-day timeline?", action: "timeline" },
          { label: "📸 Why custom site over Instagram?", action: "instagram" },
          { label: "📱 Mobile Speed optimization?", action: "mobile" },
          { label: "📁 View Portfolio work", action: "portfolio" },
          { label: "📲 Chat / Contact Us", action: "contact_options" },
        ]
      );
      return;
    }

    // 3. Mood Triggers
    const physicalMoodKeywords = ['how are you', 'how are u', 'how is it going', 'hows it going', 'how you doing', 'how u doing', 'doing today', 'whats up', 'sup'];
    const matchesMood = physicalMoodKeywords.some(phrase => cleanedText.includes(phrase));
    if (matchesMood) {
      addMessage(
        "I am doing outstandingly well! 🚀 Just calibrated a localized page speed mockup and got a rendering paint score of 0.4 seconds. I'm always energized when discussing responsive website performance.\n\n" +
        "How are things going on your end? Are you looking to launch a brand new site, or is your existing website loading slower than you'd like?",
        'ai',
        [
          { label: "💰 View Package Options", action: "pricing" },
          { label: "⏱️ Check 10-day Speed Deliverables", action: "timeline" },
          { label: "📱 Discuss Mobile Speed", action: "mobile" }
        ]
      );
      return;
    }

    // 4. Identity Triggers
    const identityKeywords = ['who are you', 'what are you', 'your name', 'who built you', 'who made you', 'who created you', 'what do you do'];
    const matchesIdentity = identityKeywords.some(phrase => cleanedText.includes(phrase));
    if (matchesIdentity) {
      addMessage(
        "I am the **Nexus BlueOrbit Web AI Specialist**! 🍾 My system is designed specifically to help local businesses and restaurants find the right web design, local search mapping, and pricing solutions.\n\n" +
        "I was engineered in collaboration with **Nexus BlueOrbit Web**, our Lead Developer. I'm here to run structural comparisons, explain page speed optimizations, and help you pick the perfect digital tier for your business.\n\n" +
        "If you want to connect directly, you can reach out on WhatsApp or Instagram at any time!",
        'ai',
        [
          { label: "💰 Pricing Packages", action: "pricing" },
          { label: "📲 Chat / Contact Us", action: "contact_options" },
          { label: "🔙 Return to Menu", action: "back_menu" }
        ]
      );
      return;
    }

    // 5. Gratitude / Approvals check
    const gratitudeKeywords = ['thank you', 'thanks', 'ty', 'appreciate', 'awesome', 'cool', 'great', 'nice', 'wonderful', 'perfect', 'cheers'];
    const matchesGratitude = gratitudeKeywords.some(phrase => 
      cleanedText === phrase || 
      cleanedText.startsWith(phrase + ' ') || 
      cleanedText.endsWith(' ' + phrase)
    );
    if (matchesGratitude) {
      addMessage(
        "You are absolutely welcome! 🥂 It's my privilege to assist you. Building clean, high-performance web layouts that help businesses attract customers is what we love to do.\n\n" +
        "Whenever you're ready, we can run through our web packages or discuss a custom launch strategy for your brand.",
        'ai',
        [
          { label: "💰 View Pricing Tiers", action: "pricing" },
          { label: "📲 Chat / Contact Us", action: "contact_options" },
          { label: "🔙 Return to Options", action: "back_menu" }
        ]
      );
      return;
    }

    // 6. Location Queries
    const locationKeywords = ['location', 'where are you', 'where are u', 'based', 'kuala lumpur', 'malaysia', 'where located', 'address'];
    const matchesLocation = locationKeywords.some(phrase => cleanedText.includes(phrase));
    if (matchesLocation) {
      addMessage(
        "Our core agency is based in beautiful **Kuala Lumpur, Malaysia**! 🇲🇾 \n\n" +
        "However, we design and host premium frontends for local businesses and hospitality brands globally. Because everything is built on serverless CDNs, your website will load instantly in under 1.5 seconds, whether your customers are in Kuala Lumpur, Singapore, New York, or anywhere else on Earth.",
        'ai',
        [
          { label: "📱 Check speed params", action: "mobile" },
          { label: "💰 Compare Tiers", action: "pricing" },
          { label: "🔙 Return to Menu", action: "back_menu" }
        ]
      );
      return;
    }

    // 7. Pricing & Packages Inquiry
    const isPricingQuery = 
      action === 'pricing' || 
      cleanedText.includes('price') || 
      cleanedText.includes('pricing') || 
      cleanedText.includes('package') || 
      cleanedText.includes('cost') || 
      cleanedText.includes('how much') || 
      cleanedText.includes('rm');

    if (isPricingQuery) {
      addMessage(
        "Our websites typically range from RM800 to RM5,000+ depending on the features needed.\n\n" +
        "Here is our current package structure:\n" +
        "• **Starter (RM800 – RM1,200)**: Ideal for businesses establishing an online presence.\n" +
        "• **Growth (RM1,800 – RM2,800)**: Best for established businesses wanting stronger visibility and more information pages.\n" +
        "• **Signature (RM3,500 – RM5,000+)**: Best for businesses needing advanced custom features, reservations, integrations, or premium design.\n\n" +
        "Based on the information currently available, this appears to be the package structure. If anything has recently changed, our team can provide the latest details.\n\n" +
        "To recommend the right option, what type of business do you run?",
        'ai',
        [
          { label: "📲 Chat / Contact Us", action: "contact_options" },
          { label: "🔙 Return to Menu", action: "back_menu" }
        ]
      );
      return;
    }

    // 8. Timeline Response
    const isTimelineQuery = 
      action === 'timeline' || 
      cleanedText.includes('timeline') || 
      cleanedText.includes('how long') || 
      cleanedText.includes('days') || 
      cleanedText.includes('duration') || 
      cleanedText.includes('time') ||
      cleanedText.includes('10 days') ||
      cleanedText.includes('10day');

    if (isTimelineQuery) {
      addMessage(
        "Many projects take longer because of agency workloads, approval delays, or changing requirements.\n\n" +
        "The 10-day timeline refers to the development process once requirements and content have been confirmed.\n\n" +
        "Fast delivery does not mean rushed work. It means efficient planning, communication, and execution.",
        'ai',
        [
          { label: "💰 Check Packages", action: "pricing" },
          { label: "📁 View Portfolio work", action: "portfolio" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // 9. Instagram Objection Handler
    const isInstagramQuery = 
      action === 'instagram' || 
      cleanedText.includes('instagram') || 
      cleanedText.includes('ig') || 
      cleanedText.includes('social') || 
      cleanedText.includes('facebook') || 
      cleanedText.includes('why web');

    if (isInstagramQuery) {
      addMessage(
        "Instagram is excellent for engagement and community building.\n\n" +
        "A website gives customers a dedicated place to find information, menus, services, contact details, locations, and booking options.\n\n" +
        "The strongest businesses typically use both together. Instagram helps people discover you. A website helps them trust you.",
        'ai',
        [
          { label: "💰 Compare Pricing Tiers", action: "pricing" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // 10. Do I really need a website? Objection Handler
    const isNeedQuery = 
      cleanedText.includes('need') || 
      cleanedText.includes('urgent') || 
      cleanedText.includes('important') || 
      cleanedText.includes('really need');

    if (isNeedQuery) {
      addMessage(
        "A website isn't necessary for every business.\n\n" +
        "If Instagram already brings consistent customers, answers common questions, displays your services clearly, and generates bookings, then a website may not be urgent.\n\n" +
        "However, many customers search Google before social media. A website helps businesses appear more professional, easier to find, and easier to contact.\n\n" +
        "The real question isn't whether you need a website. It's whether potential customers can easily find the information they need when they're ready to buy.",
        'ai',
        [
          { label: "💰 Compare Pricing Tiers", action: "pricing" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // 11. Price Objection Handler
    const isPriceObjection = 
      cleanedText.includes('expensive') || 
      cleanedText.includes('price too high') || 
      cleanedText.includes('high price') || 
      cleanedText.includes('cost too much') || 
      cleanedText.includes('too expensive');

    if (isPriceObjection) {
      addMessage(
        "I understand.\n\n" +
        "Many businesses initially focus on the cost of a website.\n\n" +
        "A useful way to look at it is the value of a single new customer. If a website helps bring even a few additional customers each month, it can often pay for itself over time.\n\n" +
        "That said, not every business needs the largest package. I'd be happy to recommend the most practical option for your situation.",
        'ai',
        [
          { label: "💰 Compare Pricing Tiers", action: "pricing" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // 12. Small Business Objection Handler
    const isSmallBusinessObjection = 
      cleanedText.includes('small') || 
      cleanedText.includes('small business') || 
      cleanedText.includes('food stall') || 
      cleanedText.includes('micro');

    if (isSmallBusinessObjection) {
      addMessage(
        "Smaller businesses often benefit the most from a professional online presence.\n\n" +
        "Customers frequently judge credibility within seconds. A clean website can help even a small local business appear more established and trustworthy.",
        'ai',
        [
          { label: "💰 Compare Pricing Tiers", action: "pricing" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // 13. AI Website Objection Handler
    const isAIObjection = 
      cleanedText.includes('builder') || 
      cleanedText.includes('generate') || 
      cleanedText.includes('wix') || 
      cleanedText.includes('can ai');

    if (isAIObjection) {
      addMessage(
        "AI can generate layouts, text, and designs.\n\n" +
        "The challenge is turning those pieces into a professional website that loads quickly, works properly, represents the business well, and creates trust with customers.\n\n" +
        "Most businesses don't struggle with generating a website. They struggle with creating one that customers want to use.",
        'ai',
        [
          { label: "💰 Compare Pricing Tiers", action: "pricing" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // 14. Mobile Speed optimization / Technical Response
    const isMobileQuery = 
      action === 'mobile' || 
      cleanedText.includes('mobile') || 
      cleanedText.includes('speed') || 
      cleanedText.includes('load') || 
      cleanedText.includes('phone') || 
      cleanedText.includes('slow') || 
      cleanedText.includes('lighthouse');

    if (isMobileQuery) {
      addMessage(
        "We build fast, mobile-friendly websites that load quickly on any device. 📱\n\n" +
        "Over 85% of local searches happen on smartphones. Keeping load speeds fast reduces bounce rates and ensures customers don't leave your page out of frustration.\n\n" +
        "Our team targets a 99+ performance score on Lighthouse PageSpeed to keep your site responsive and instant.",
        'ai',
        [
          { label: "💰 Compare Pricing Tiers", action: "pricing" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // 15. Portfolio Questions
    const isPortfolioQuery = 
      action === 'portfolio' || 
      cleanedText.includes('portfolio') || 
      cleanedText.includes('examples') || 
      cleanedText.includes('websites') || 
      cleanedText.includes('demos') || 
      cleanedText.includes('previous work');

    if (isPortfolioQuery) {
      addMessage(
        "Here are some examples of our previous work:\n\n" +
        "• **Altitude 42 Sky Bar**: Rooftop fine dining menu portal.\n" +
        "• **Maharaja's Spice Palace**: Premium Indian dining site.\n" +
        "• **Sakura Modern Kitchen**: Japanese dining & omakase booking layout.\n" +
        "• **Sweet Heaven Café**: French pâtisserie catering platform.\n\n" +
        "You can explore our live portfolio showcase here: **https://demo-mu-two-82.vercel.app/**\n\n" +
        "What type of business are you running? I can recommend examples most relevant to your industry.",
        'ai',
        [
          { label: "🍕 Restaurant / Café", action: "cafe_query" },
          { label: "💼 Service / Local Business", action: "service_query" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // 16. LEAD QUALIFICATION / Recommendation inputs (bakery, cafe, restaurant, bar, lounge, shop, academy, service, local business, pizza, hotel, hospitality, cafe_query, service_query)
    const isBakeryOrCafe = 
      action === 'cafe_query' ||
      cleanedText.includes('bakery') || 
      cleanedText.includes('café') || 
      cleanedText.includes('cafe') || 
      cleanedText.includes('food stall') || 
      cleanedText.includes('small shop') || 
      cleanedText.includes('pizza') || 
      cleanedText.includes('sweets') || 
      cleanedText.includes('shop');

    const isLargeBusiness = 
      action === 'service_query' ||
      cleanedText.includes('restaurant') || 
      cleanedText.includes('bar') || 
      cleanedText.includes('lounge') || 
      cleanedText.includes('academy') || 
      cleanedText.includes('service') || 
      cleanedText.includes('local business') || 
      cleanedText.includes('hotel') || 
      cleanedText.includes('hospitality');

    if (isBakeryOrCafe) {
      addMessage(
        "For a café, bakery, or small business, we typically recommend our **Starter Package (RM800 – RM1,200)**. It's ideal for establishing an online presence with a clean, professional one-page layout, your menu/services, and direct WhatsApp contact.\n\n" +
        "Do you already have a website, or would this be a new project?",
        'ai',
        [
          { label: "🆕 New Project", action: "new_project" },
          { label: "🔄 Redesign Existing Site", action: "redesign_project" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    if (isLargeBusiness) {
      addMessage(
        "For an established restaurant, bar, or service business, we typically recommend our **Growth Package (RM1,800 – RM2,800)** or **Signature Package (RM3,500 – RM5,000+)** depending on whether you need features like online reservations or custom integrations.\n\n" +
        "Do you already have a website, or would this be a redesign?",
        'ai',
        [
          { label: "🆕 New Project", action: "new_project" },
          { label: "🔄 Redesign Existing Site", action: "redesign_project" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // 17. Project status (new/redesign) triggers
    if (action === 'new_project' || cleanedText.includes('new website') || cleanedText.includes('new project') || cleanedText === 'new') {
      addMessage(
        "Starting fresh is a great opportunity. We can build a fast, mobile-friendly website tailored to your brand from the ground up, making sure potential customers can easily find you.\n\n" +
        "Do customers currently find you through Google, social media, or referrals?",
        'ai',
        [
          { label: "🔍 Google Search", action: "find_google" },
          { label: "📸 Social Media", action: "find_social" },
          { label: "👥 Referrals", action: "find_referrals" }
        ]
      );
      return;
    }

    if (action === 'redesign_project' || cleanedText.includes('redesign website') || cleanedText.includes('redesign project') || cleanedText === 'redesign') {
      addMessage(
        "A redesign is perfect for improving load speeds, modernizing the layout, and boosting your Google search rankings. We can import your existing content and make it look much more professional.\n\n" +
        "Do customers currently find you through Google, social media, or referrals?",
        'ai',
        [
          { label: "🔍 Google Search", action: "find_google" },
          { label: "📸 Social Media", action: "find_social" },
          { label: "👥 Referrals", action: "find_referrals" }
        ]
      );
      return;
    }

    // 18. Customer discovery channel triggers
    if (action === 'find_google' || cleanedText === 'google search' || cleanedText === 'google') {
      addMessage(
        "Appearing on Google Search and Google Maps is vital for local discovery. We build structured local SEO schemas into all our sites to make sure you rank high when local customers search for your services.\n\n" +
        "Would you like to check out some of our portfolio examples?",
        'ai',
        [
          { label: "📁 View Portfolio work", action: "portfolio" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    if (action === 'find_social' || cleanedText === 'social media' || cleanedText === 'social') {
      addMessage(
        "Social media is great for daily engagement, but a dedicated website builds credibility and helps convert followers into paying customers without distraction.\n\n" +
        "Would you like to check out some of our portfolio examples?",
        'ai',
        [
          { label: "📁 View Portfolio work", action: "portfolio" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    if (action === 'find_referrals' || cleanedText === 'referrals') {
      addMessage(
        "Referral customers are highly valuable. A professional website acts as a validation tool so that when someone is referred to you, they are instantly impressed and can find your contact info easily.\n\n" +
        "Would you like to check out some of our portfolio examples?",
        'ai',
        [
          { label: "📁 View Portfolio work", action: "portfolio" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // 19. Menu reset / Fallback Options Reset
    const isMenuReset = 
      action === 'back_menu' || 
      cleanedText.includes('menu') || 
      cleanedText.includes('back') || 
      cleanedText.includes('restart') || 
      cleanedText.includes('options') || 
      cleanedText.includes('help') || 
      cleanedText === 'main';

    if (isMenuReset) {
      addMessage(
        "I'd be happy to help. I can answer questions about:\n\n" +
        "• Website pricing\n" +
        "• Website features\n" +
        "• Restaurant websites\n" +
        "• Local business websites\n" +
        "• SEO\n" +
        "• Website speed\n" +
        "• Project timelines\n" +
        "• Portfolio examples\n" +
        "• Contact options\n\n" +
        "What would you like to know?",
        'ai',
        [
          { label: "💰 Compare Pricing Tiers", action: "pricing" },
          { label: "⏱️ Our 10-day timeline?", action: "timeline" },
          { label: "📸 Why custom site over Instagram?", action: "instagram" },
          { label: "📱 Mobile Speed optimization?", action: "mobile" },
          { label: "📁 View Portfolio work", action: "portfolio" },
          { label: "📲 Chat / Contact Us", action: "contact_options" }
        ]
      );
      return;
    }

    // Default Fallback response
    addMessage(
      "I'd be happy to help.\n\n" +
      "I can answer questions about:\n" +
      "• Website pricing\n" +
      "• Website features\n" +
      "• Restaurant websites\n" +
      "• Local business websites\n" +
      "• SEO\n" +
      "• Website speed\n" +
      "• Project timelines\n" +
      "• Portfolio examples\n" +
      "• Contact options\n\n" +
      "What would you like to know?",
      'ai',
      [
        { label: "💰 Compare Pricing Tiers", action: "pricing" },
        { label: "⏱️ Our 10-day timeline?", action: "timeline" },
        { label: "📸 Why custom site over Instagram?", action: "instagram" },
        { label: "📁 View Portfolio work", action: "portfolio" },
        { label: "📲 Chat / Contact Us", action: "contact_options" }
      ]
    );
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
                <div className="relative w-9 h-9 bg-sky-950 border border-sky-500/30 rounded-xl overflow-hidden flex items-center justify-center">
                  <img 
                    src="/favicon.png" 
                    alt="Nexus BlueOrbit Web Logo" 
                    className="w-full h-full object-contain"
                  />
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
                        const isLink = reply.action.startsWith('http') || reply.action.startsWith('mailto:');
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
                placeholder="Inquire about specs, pricing, speed..."
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
