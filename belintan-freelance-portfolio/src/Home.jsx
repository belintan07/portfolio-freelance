import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PullCord from './components/PullCord';
import CrmDialerModal from './components/CrmDialerModal';
import SheetFlowModal from './components/SheetFlowModal';
import { useSEO } from './hooks/useSEO';

export default function Home() {
  useSEO({
    title: 'ProfileBelintan.com | Belintan B - Full-Stack Developer, AI & Video Content Creator',
    description: 'Full-Stack Software Engineer, AI Systems Architect, and Video Editor / Content Creator. Live Doocti Telephony CRM, Offline Google Sheets Clone, and 9:16 Social Reels.',
    canonical: 'https://ProfileBelintan.com/',
  });

  const [activeTab, setActiveTab] = useState('node');
  const [apiLogs, setApiLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [crmModalOpen, setCrmModalOpen] = useState(false);
  const [sheetModalOpen, setSheetModalOpen] = useState(false);

  // Interactive Project Cost Estimator State (Beginner Freelance Packages)
  const [projectType, setProjectType] = useState('landing');
  const [selectedFeatures, setSelectedFeatures] = useState(['mobile', 'whatsapp', 'contact_form', 'seo']);
  const [timelineSpeed, setTimelineSpeed] = useState('standard');
  const [activeFaq, setActiveFaq] = useState(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: 'Starter Landing Page',
    budget: '$60 - $120 / ₹5k - ₹10k',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate dynamic project estimate
  const calculateEstimate = () => {
    let basePrice = 4999;
    let baseDays = 4;

    if (projectType === 'landing') {
      basePrice = 4999;
      baseDays = 4;
    } else if (projectType === 'business') {
      basePrice = 9999;
      baseDays = 8;
    } else if (projectType === 'growth') {
      basePrice = 14999;
      baseDays = 14;
    } else if (projectType === 'webapp') {
      basePrice = 19999;
      baseDays = 14;
    } else if (projectType === 'ai') {
      basePrice = 14999;
      baseDays = 10;
    }

    const featurePrices = {
      mobile: 0,
      whatsapp: 0,
      contact_form: 500,
      seo: 750,
      hosting: 750,
      speed: 999,
      gallery: 500,
      social: 400,
      support: 1000,
      blog: 1500,
      content: 800,
      extra_pages: 1200,
    };

    let addonTotal = 0;
    selectedFeatures.forEach(feat => {
      // Starter Landing Page includes contact_form, so do not charge it as an add-on
      if (projectType === 'landing' && feat === 'contact_form') {
        return;
      }
      addonTotal += (featurePrices[feat] || 0);
    });

    let total = basePrice + addonTotal;

    // Included features (mobile, whatsapp, and included contact_form) add no time
    const timeAddingFeatures = selectedFeatures.filter(
      feat => feat !== 'mobile' && feat !== 'whatsapp' && !(projectType === 'landing' && feat === 'contact_form')
    );
    let totalDays = baseDays + Math.round(timeAddingFeatures.length * 1.2);

    if (timelineSpeed === 'express') {
      total = Math.round(total * 1.25);
      totalDays = Math.max(2, Math.round(totalDays * 0.6));
    }

    const priceUsd = Math.round(total / 85);
    return { priceInr: total, priceUsd, days: totalDays };
  };

  const estimate = calculateEstimate();

  const toggleFeature = (id) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSimulateApi = (type) => {
    setIsSimulating(true);
    const timestamp = new Date().toLocaleTimeString();

    if (type === 'node') {
      setTimeout(() => {
        setApiLogs([
          `[${timestamp}] [NODE.JS] GET /api/v1/freelancer/profile - 200 OK (12ms)`,
          `[${timestamp}] [NODE.JS] Database Pool: PostgreSQL connected, Active Workers: 4`,
          `[${timestamp}] [NODE.JS] Response: { "engineer": "Belintan", "status": "AVAILABLE", "us_night_shift": "ACTIVE (EST/PST)" }`
        ]);
        setIsSimulating(false);
      }, 400);
    } else if (type === 'python') {
      setTimeout(() => {
        setApiLogs([
          `[${timestamp}] [PYTHON-AI] POST /api/v1/ai/pipeline/analyze - 200 OK (32ms)`,
          `[${timestamp}] [PYTHON-AI] Model Pipeline: Loaded Gemini and OpenAI LangChain Router`,
          `[${timestamp}] [PYTHON-AI] Result: { "lead_score": 98.4, "status": "Automated Lead Routing Active" }`
        ]);
        setIsSimulating(false);
      }, 450);
    } else if (type === 'mcp') {
      setTimeout(() => {
        setApiLogs([
          `[${timestamp}] [MCP-SERVER] FastMCP Initialized: 'belintan-enterprise-bridge' via Stdio/SSE`,
          `[${timestamp}] [MCP-SERVER] Tools Exposed: ['query_sales_crm', 'fetch_user_telemetry', 'trigger_pipeline']`,
          `[${timestamp}] [MCP-SERVER] Client Connected: Claude Desktop and Cursor Agent Authenticated`
        ]);
        setIsSimulating(false);
      }, 400);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      setErrorMessage('Please enter your name and contact details.');
      return;
    }
    setErrorMessage('');
    const msg = `*New Freelance Project Inquiry*\n` +
      `*Name:* ${formData.name}\n` +
      `*Contact:* ${formData.contact}\n` +
      `*Category:* ${formData.projectType}\n` +
      `*Budget:* ${formData.budget}\n` +
      `*Details:* ${formData.message || 'Consultation Request'}`;

    window.open(`https://wa.me/918610662871?text=${encodeURIComponent(msg)}`, '_blank');
    setFormSubmitted(true);
  };

  const sendEstimateToWhatsApp = () => {
    const featureLabels = {
      mobile: 'Mobile Responsive Layout (Included)',
      whatsapp: 'WhatsApp Direct Chat Button (Included)',
      contact_form: 'Working Contact / Inquiry Form',
      seo: 'Basic Google SEO & Meta Tags',
      hosting: 'Domain & Hosting Setup Assistance',
      speed: 'Page Speed & Performance Optimization',
      gallery: 'Photo & Portfolio Gallery',
      social: 'Social Media Links & Embeds',
      support: '30 Days Post-Launch Support',
      blog: 'Simple Blog / News Section',
      content: 'Content & Copywriting Help',
      extra_pages: '2 Extra Custom Pages',
    };

    const feats = selectedFeatures.map(f => featureLabels[f] || f).join(', ');
    const msg = `*Freelance Project Inquiry & Estimate*\n` +
      `*Package Type:* ${projectType.toUpperCase()}\n` +
      `*Timeline:* ${timelineSpeed.toUpperCase()} (~${estimate.days} Days)\n` +
      `*Selected Features:* ${feats || 'Basic Setup'}\n` +
      `*Calculated Price:* ₹${estimate.priceInr.toLocaleString()} (~$${estimate.priceUsd} USD)\n\n` +
      `Hi Belintan! I saw your freelance pricing and would like to hire you for my project. Let's discuss!`;

    window.open(`https://wa.me/918610662871?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-[#eae7e1] selection:bg-[#ff7a1a] selection:text-black relative overflow-x-hidden">

      {/* ========================================================
          3D SPACESHIP & MOON COSMIC HUD BACKDROP
      ======================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Amber Spaceship Core Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[550px] bg-gradient-to-b from-[#ff7a1a]/20 via-[#ff7a1a]/5 to-transparent blur-[120px]" />

        {/* Subtle Cyan / Deep Space Nebulae */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#06b6d4]/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-[#10b981]/5 rounded-full blur-[150px]" />

        {/* 3D Celestial Moon with Orbital Rings - Spaceship Viewport */}
        <div className="absolute top-12 right-12 lg:right-28 opacity-35 hover:opacity-75 transition-opacity duration-1000 hidden md:block">
          <div className="relative">
            <div className="moon-sphere-3d"></div>
            <div className="moon-orbit-ring"></div>
            {/* Holographic HUD Coordinates */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-[#ff913d]/60 uppercase whitespace-nowrap">
              ORBIT // 384,400 KM • LUNAR OBS
            </div>
          </div>
        </div>

        {/* Spaceship HUD Grid Overlay */}
        <div className="absolute inset-0 hud-grid opacity-25" />

        {/* Subtle Star Particles */}
        <div className="absolute top-20 left-1/4 w-1.5 h-1.5 rounded-full bg-white/70 animate-ping" />
        <div className="absolute top-40 right-1/3 w-1 h-1 rounded-full bg-[#ff913d]/60 animate-pulse" />
        <div className="absolute top-72 left-1/6 w-1 h-1 rounded-full bg-[#38bdf8]/60" />
      </div>

      <Navbar />
      <PullCord />

      {/* ========================================================
          HERO SECTION (Matching Video & Screenshot Layout 1:1)
      ======================================================== */}
      <section id="hero" className="relative pt-32 lg:pt-38 pb-20 lg:pb-32 px-5 max-w-7xl mx-auto z-10 video-glow-sweep">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Belintan 3D HD Suited Portrait in Double-Bezel Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="double-bezel rounded-[32px] p-2 bg-[#0c0d14] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">

                {/* Real Portrait — Belintan's actual photo */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 bg-[#12131b]">
                  <img
                    src="/images/belintan_real.jpg"
                    alt="Belintan — Video Editor & Full-Stack Developer"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  />

                  {/* Bottom Vignette for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                  {/* Dual Capsule Badge Over Photo Bottom (Matching Reference Exactly) */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff7a1a] text-[#0a0703] font-bold text-xs shadow-[0_4px_15px_rgba(255,122,26,0.5)]">
                      <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                      OPEN FOR PROJECTS
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono">
                      Tuticorin, IN / Remote
                    </span>
                  </div>
                </div>

                {/* Bottom Two-Column Credential Strip */}
                <div className="mt-4 px-3 pb-2 pt-3 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-white font-extrabold text-sm tracking-tight">MBA</div>
                    <div className="text-xs text-[#9d978a] mt-0.5">Business &amp; Strategy</div>
                  </div>
                  <div>
                    <div className="text-[#ff913d] font-extrabold text-sm tracking-tight">Certified</div>
                    <div className="text-xs text-[#9d978a] mt-0.5">Full-Stack &amp; AI</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Editorial Value Proposition & 2x2 Feature Bento Cards */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Orange Eyebrow Pill */}
            <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#ff7a1a]/30 bg-[#ff7a1a]/10 text-xs font-mono text-[#ff913d] uppercase tracking-wider mb-4">
              ( ABOUT BELINTAN )
            </div>

            {/* Exactly One H1 Headline (From Reference Screenshot) */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-white leading-[1.12]">
              Brands with a pulse, backed by rock-solid architecture.
            </h1>

            {/* Sub-paragraphs (From Reference Screenshot) */}
            <p className="mt-5 text-sm sm:text-base text-[#b5afa4] max-w-2xl leading-relaxed">
              I am an <strong className="text-white font-semibold">MBA graduate</strong>, certified <strong className="text-white font-semibold">frontend engineer</strong>, and seasoned <strong className="text-white font-semibold">backend developer</strong> proficient in Node.js, Python, and Java ecosystems.
            </p>

            <p className="mt-3 text-xs sm:text-sm text-[#9e988f] max-w-2xl leading-relaxed">
              Most developers only think in code, and most marketers only think in ad copies. Because of my business and engineering dual-background, I build web solutions that look stunning, load in milliseconds, and directly drive sales, inquiries, and customer retention.
            </p>

            {/* 4 Feature Bento Cards (2x2 Grid from Reference Screenshot) */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4 w-full">

              {/* Feature 1 */}
              <div className="p-4 rounded-2xl bg-[#0f1017] border border-white/10 hover:border-[#ff7a1a]/40 transition-all group">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#ff913d] transition-colors">
                  Fast Turnaround
                </h3>
                <p className="text-xs text-[#9d978a] leading-relaxed">
                  Clear milestones, no delays. From initial idea to live production deployment in days, not months.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-4 rounded-2xl bg-[#0f1017] border border-white/10 hover:border-[#ff7a1a]/40 transition-all group">
                <div className="text-2xl mb-2">⚙️</div>
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#ff913d] transition-colors">
                  Full-Stack Ownership
                </h3>
                <p className="text-xs text-[#9d978a] leading-relaxed">
                  I handle frontend UI, Node.js &amp; Python APIs, databases, domain setup, and cloud hosting end-to-end.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-4 rounded-2xl bg-[#0f1017] border border-white/10 hover:border-[#ff7a1a]/40 transition-all group">
                <div className="text-2xl mb-2">📈</div>
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#ff913d] transition-colors">
                  Conversion-First Code
                </h3>
                <p className="text-xs text-[#9d978a] leading-relaxed">
                  Built for SEO, sub-second loads, and high conversion rather than abstract aesthetic experiments.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-4 rounded-2xl bg-[#0f1017] border border-white/10 hover:border-[#ff7a1a]/40 transition-all group">
                <div className="text-2xl mb-2">💬</div>
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#ff913d] transition-colors">
                  Direct Communication
                </h3>
                <p className="text-xs text-[#9d978a] leading-relaxed">
                  Direct engineer contact, zero middle management, and transparent pricing with no hidden surprises.
                </p>
              </div>

            </div>

            {/* Quick Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff7a1a] to-[#ff913d] text-[#0a0703] font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(255,122,26,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Hire on WhatsApp</span>
                <span className="text-sm font-black">&rarr;</span>
              </a>

              <a
                href="#estimator"
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs tracking-wider transition-all flex items-center gap-2"
              >
                <span>Live Project Estimator</span>
                <span className="text-[#ff913d]">↓</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          SERVICES SECTION (No Emojis, No Em-Dashes)
      ======================================================== */}
      <section id="services" className="py-24 px-5 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="flex flex-col items-start mb-16">
          <div className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-3">
            ( SERVICES )
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering &amp; Growth Solutions
          </h2>
          <p className="mt-3 text-base text-[#9d978a] max-w-2xl">
            Everything required to build reliable software, automate internal workflows, and acquire paying customers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Service 1 */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 font-mono text-xs font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Modern Web Apps</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed">
                Responsive web applications built with React 19, Tailwind CSS, and clean semantic structure.
              </p>
            </div>
            <p className="text-[11px] font-mono text-[#d4a373] mt-6">React 19 • Vite • Tailwind</p>
          </div>

          {/* Service 2 — Video & Reel Editing */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 font-mono text-xs font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Video &amp; Reel Editing</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed">
                Short-form 9:16 Reels for Instagram, YouTube Shorts, and TikTok with animated captions, transitions, hooks, and sound sync.
              </p>
            </div>
            <p className="text-[11px] font-mono text-[#3b66f5] mt-6">9:16 HD • Captions • Sound Design</p>
          </div>

          {/* Service 3 — Album & Photo Editing */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 font-mono text-xs font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Album &amp; Photo Editing</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed">
                Wedding albums, event photography editing, skin retouching, colour grading, and cinematic photo enhancement.
              </p>
            </div>
            <p className="text-[11px] font-mono text-[#10b981] mt-6">Lightroom • Photoshop • Colour Grade</p>
          </div>

          {/* Service 4 — Model Photoshoot Editing */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 font-mono text-xs font-bold">
                04
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Model &amp; Photoshoot Editing</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed">
                Professional model portfolio retouching, fashion shoot colour grading, skin smoothing, and background compositing.
              </p>
            </div>
            <p className="text-[11px] font-mono text-[#d4a373] mt-6">Portfolio • Fashion • Retouching</p>
          </div>

          {/* Service 5 — Content Creator Retainer */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 font-mono text-xs font-bold">
                05
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Content Creator Retainer</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed">
                Monthly social media retainer — script, shoot direction, edit, and post. Consistent brand voice for organisations and personal brands.
              </p>
            </div>
            <p className="text-[11px] font-mono text-[#3b66f5] mt-6">Monthly • Instagram • YouTube</p>
          </div>

          {/* Service 6 — Advertising Posters & Banners */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 font-mono text-xs font-bold">
                06
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Advertising Posters &amp; Banners</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed">
                High-impact promotional creatives, event flyers, and brand banners formatted for print and digital social media.
              </p>
            </div>
            <p className="text-[11px] font-mono text-[#10b981] mt-6">Print &amp; Digital • Figma • Canva</p>
          </div>

          {/* Service 7: 1 Mo Off-Site SEO */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 font-mono text-xs font-bold">
                07
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1 Month Off-Site SEO</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed">
                High-DA contextual link acquisition, local business citations, and Google Map Pack optimization.
              </p>
            </div>
            <p className="text-[11px] font-mono text-[#d4a373] mt-6">Backlinks • Google Map Pack</p>
          </div>

          {/* Service 8: API Integration */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 font-mono text-xs font-bold">
                08
              </div>
              <h3 className="text-lg font-bold text-white mb-2">API Integration &amp; Webhooks</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed">
                Seamless third-party integrations with Stripe payments, Supabase, OAuth auth, and automated cloud webhooks.
              </p>
            </div>
            <p className="text-[11px] font-mono text-[#3b66f5] mt-6">Stripe • Webhooks • Cloud</p>
          </div>

        </div>
      </section>

      {/* ========================================================
          BACKEND CODE & MCP TERMINAL SHOWCASE
      ======================================================== */}
      <section id="backend-demo" className="py-24 px-5 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="flex flex-col items-start mb-12">
          <div className="text-xs font-mono text-[#3b66f5] tracking-widest uppercase mb-3">
            ( ARCHITECTURE SHOWCASE )
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Node.js &amp; Python Backend Engine
          </h2>
          <p className="mt-3 text-base text-[#9d978a] max-w-xl">
            Clean, modular backend code powering low-latency APIs and custom Model Context Protocol servers.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121319] overflow-hidden shadow-2xl">
          {/* Terminal Title Bar */}
          <div className="px-5 py-3.5 bg-[#0e0f14] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <span className="w-3 h-3 rounded-full bg-[#10b981]" />
              <span className="text-xs font-mono text-[#8e887d] ml-2">belintan-terminal</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('node')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${activeTab === 'node' ? 'bg-white/10 text-white font-bold' : 'text-[#8e887d] hover:text-white'}`}
              >
                server.js (Node)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('python')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${activeTab === 'python' ? 'bg-white/10 text-white font-bold' : 'text-[#8e887d] hover:text-white'}`}
              >
                ai_pipeline.py (Python)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mcp')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${activeTab === 'mcp' ? 'bg-white/10 text-white font-bold' : 'text-[#8e887d] hover:text-white'}`}
              >
                mcp_bridge.py (FastMCP)
              </button>
            </div>
          </div>

          {/* Terminal Code Body */}
          <div className="p-6 font-mono text-xs leading-relaxed text-[#c2bcb2] overflow-x-auto">
            {activeTab === 'node' && (
              <pre className="text-left">
                {`// server.js - High-performance Node.js REST API Architecture
import http from 'node:http';
import { Pool } from 'pg';

const db = new Pool({ connectionString: process.env.DATABASE_URL });

export async function handleFreelancerProfile(req, res) {
  const profile = {
    engineer: "Belintan",
    qualification: "MBA & Full-Stack Software Engineer",
    availability: "OPEN_FOR_CONTRACTS_AND_US_SHIFT",
    timezones: ["IST", "EST", "CST", "PST"],
    stack: ["React 19", "Node.js", "Python", "FastMCP", "PostgreSQL", "Redis"]
  };

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "success", data: profile }));
}`}
              </pre>
            )}

            {activeTab === 'python' && (
              <pre className="text-left">
                {`# ai_pipeline.py - Production Python AI Workflow
from fastapi import FastAPI
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

app = FastAPI(title="Belintan AI Systems Engine")

@app.post("/api/v1/ai/pipeline/analyze")
async def analyze_lead(payload: dict):
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an automated lead qualification engine."),
        ("human", "Evaluate client scope: {scope}")
    ])
    chain = prompt | llm
    result = await chain.ainvoke({"scope": payload.get("scope")})
    return {"status": "success", "analysis": result.content}`}
              </pre>
            )}

            {activeTab === 'mcp' && (
              <pre className="text-left">
                {`# mcp_bridge.py - Custom Model Context Protocol Server
from mcp.server.fastmcp import FastMCP
import psycopg2

mcp = FastMCP("belintan-enterprise-bridge")

@mcp.tool()
def query_sales_crm(client_query: str) -> str:
    """Query live PostgreSQL database schema for client pipeline records."""
    return f"Executed query for: {client_query} - Session authenticated via FastMCP."

if __name__ == "__main__":
    mcp.run(transport="stdio")`}
              </pre>
            )}
          </div>

          {/* Interactive Simulation Bar */}
          <div className="p-4 bg-[#0e0f14] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => handleSimulateApi(activeTab)}
              disabled={isSimulating}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold transition-colors disabled:opacity-50"
            >
              {isSimulating ? 'Executing Request...' : `Simulate ${activeTab.toUpperCase()} Request`}
            </button>

            <span className="text-[11px] font-mono text-[#8e887d]">
              Live server running on port 5000
            </span>
          </div>

          {/* Simulation Output Window */}
          {apiLogs.length > 0 && (
            <div className="p-4 bg-black/60 border-t border-white/10 text-xs font-mono text-[#10b981] space-y-1">
              {apiLogs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          DYNAMIC ESTIMATOR SECTION (No Emojis, No Em-Dashes)
      ======================================================== */}
      <section id="estimator" className="py-24 px-5 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="flex flex-col items-start mb-14">
          <div className="text-xs font-mono text-[#10b981] tracking-widest uppercase mb-3">
            ( ESTIMATOR )
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Project Cost Estimator
          </h2>
          <p className="mt-3 text-base text-[#9d978a] max-w-xl">
            Select your project requirements and export a formatted quote directly to WhatsApp.
          </p>
        </div>

        <div className="max-w-4xl rounded-2xl border border-white/10 bg-[#121319] p-6 sm:p-10">

          {/* Step 1 */}
          <div className="mb-8">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b5afa4] mb-3">
              1. Project Foundation Package
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'landing', label: 'Starter Landing Page', sub: '₹4,999 • 4 days' },
                { id: 'business', label: 'Business Website', sub: '₹9,999 • 8 days' },
                { id: 'growth', label: 'Marketing Bundle', sub: '₹14,999 • 14 days' },
                { id: 'webapp', label: 'Full-Stack App', sub: '₹19,999 • 14 days' },
                { id: 'ai', label: 'Python AI & MCP', sub: '₹14,999 • 10 days' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProjectType(item.id)}
                  className={`p-4 rounded-xl text-left transition-colors border ${projectType === item.id ? 'bg-[#3b66f5]/20 border-[#3b66f5] text-white' : 'bg-white/5 border-white/10 text-[#9d978a] hover:border-white/20'}`}
                >
                  <span className="block font-bold text-sm text-white">{item.label}</span>
                  <span className="block text-xs text-[#8e887d] mt-1 font-mono">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-8">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b5afa4] mb-3">
              2. Add-on Features
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'mobile', label: 'Mobile Responsive Layout', price: 'Included (₹0)' },
                { id: 'whatsapp', label: 'WhatsApp Direct Chat Button', price: 'Included (₹0)' },
                { id: 'contact_form', label: 'Working Contact / Inquiry Form', price: projectType === 'landing' ? 'Included in Landing' : '+₹500' },
                { id: 'seo', label: 'Basic Google SEO & Meta Tags', price: '+₹750' },
                { id: 'hosting', label: 'Domain & Hosting Setup Help', price: '+₹750' },
                { id: 'speed', label: 'Speed & Performance Boost', price: '+₹999' },
                { id: 'gallery', label: 'Photo & Portfolio Gallery', price: '+₹500' },
                { id: 'social', label: 'Social Media Links & Embeds', price: '+₹400' },
                { id: 'support', label: '30 Days Post-Launch Support', price: '+₹1,000' },
                { id: 'blog', label: 'Simple Blog / News Section', price: '+₹1,500' },
                { id: 'content', label: 'Content Writing Help', price: '+₹800' },
                { id: 'extra_pages', label: '2 Extra Custom Pages', price: '+₹1,200' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleFeature(item.id)}
                  className={`p-3 rounded-xl text-left transition-colors border ${selectedFeatures.includes(item.id) ? 'bg-[#10b981]/20 border-[#10b981] text-white' : 'bg-white/5 border-white/10 text-[#9d978a] hover:border-white/20'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{item.label}</span>
                    {selectedFeatures.includes(item.id) && <span className="text-[#10b981] text-xs font-bold">✓</span>}
                  </div>
                  <span className="text-[10px] font-mono text-[#8e887d] block mt-1">{item.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-8">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b5afa4] mb-3">
              3. Delivery Speed
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTimelineSpeed('standard')}
                className={`p-3 rounded-xl text-left transition-colors border ${timelineSpeed === 'standard' ? 'bg-[#3b66f5]/20 border-[#3b66f5] text-white' : 'bg-white/5 border-white/10 text-[#9d978a]'}`}
              >
                <span className="block font-bold text-xs text-white">Standard Delivery</span>
                <span className="block text-[11px] text-[#8e887d]">Standard milestone pace</span>
              </button>
              <button
                type="button"
                onClick={() => setTimelineSpeed('express')}
                className={`p-3 rounded-xl text-left transition-colors border ${timelineSpeed === 'express' ? 'bg-[#3b66f5]/20 border-[#3b66f5] text-white' : 'bg-white/5 border-white/10 text-[#9d978a]'}`}
              >
                <span className="block font-bold text-xs text-white">Express Delivery (+25%)</span>
                <span className="block text-[11px] text-[#8e887d]">Priority dedicated sprint</span>
              </button>
            </div>
          </div>

          {/* Output Summary */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#8e887d]">Calculated Investment:</span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-extrabold text-white">₹{estimate.priceInr.toLocaleString()}</span>
                <span className="text-sm font-mono text-[#3b66f5]">(~${estimate.priceUsd} USD)</span>
              </div>
              <span className="text-xs font-mono text-[#10b981] block mt-1">
                Estimated Delivery: ~{estimate.days} Business Days
              </span>
            </div>

            <button
              type="button"
              onClick={sendEstimateToWhatsApp}
              className="px-6 py-3.5 rounded-xl bg-[#3b66f5] hover:bg-[#2f55e0] text-white font-semibold text-xs tracking-wide transition-colors w-full sm:w-auto"
            >
              Export Estimate to WhatsApp
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          TRANSPARENT PRICING PACKAGES
      ======================================================== */}
      <section id="pricing" className="py-24 px-5 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="flex flex-col items-start mb-16">
          <div className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-3">
            ( PACKAGES )
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Transparent Pricing Packages
          </h2>
          <p className="mt-3 text-base text-[#9d978a] max-w-xl">
            Clear deliverables with zero hidden fees. Complete source code handover upon project completion.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

          {/* Tier 1 */}
          <div className="p-6 rounded-2xl bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#8e887d] uppercase tracking-wider">Fast Launch</span>
              <h3 className="text-lg font-bold text-white mt-1">Starter Landing Page</h3>
              <div className="my-5">
                <span className="text-3xl font-extrabold text-white">₹4,999</span>
                <span className="text-xs text-[#8e887d] font-mono block mt-0.5">(~$60 USD)</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-[#b5afa4] pb-6 border-b border-white/10">
                <li>• 1 High-Converting Page</li>
                <li>• WhatsApp Lead Triggers</li>
                <li>• Mobile Responsive PWA</li>
                <li>• 3-5 Days Turnaround</li>
              </ul>
            </div>
            <a
              href="https://wa.me/918610662871?text=Hi%20Belintan,%20I%20want%20to%20book%20the%20Starter%20Landing%20Page"
              className="mt-6 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs text-center transition-colors"
            >
              Book Starter Page
            </a>
          </div>

          {/* Tier 2 */}
          <div className="p-6 rounded-2xl bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#8e887d] uppercase tracking-wider">Multi-Page</span>
              <h3 className="text-lg font-bold text-white mt-1">Business Website</h3>
              <div className="my-5">
                <span className="text-3xl font-extrabold text-white">₹9,999</span>
                <span className="text-xs text-[#8e887d] font-mono block mt-0.5">(~$120 USD)</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-[#b5afa4] pb-6 border-b border-white/10">
                <li>• Up to 6 Custom Pages</li>
                <li>• Complete On-Page SEO</li>
                <li>• Contact &amp; Quote Forms</li>
                <li>• 7-10 Days Turnaround</li>
              </ul>
            </div>
            <a
              href="https://wa.me/918610662871?text=Hi%20Belintan,%20I%20want%20to%20book%20the%20Business%20Website"
              className="mt-6 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs text-center transition-colors"
            >
              Book Business Site
            </a>
          </div>

          {/* Tier 3: Growth Bundle */}
          <div className="p-6 rounded-2xl bg-[#13141b] border border-[#3b66f5] shadow-xl flex flex-col justify-between relative">
            <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-md bg-[#3b66f5] text-white font-bold text-[10px] uppercase tracking-wider">
              GROWTH BUNDLE
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#3b66f5] uppercase tracking-wider">Complete Promotion</span>
              <h3 className="text-lg font-bold text-white mt-1">Marketing &amp; SEO Bundle</h3>
              <div className="my-5">
                <span className="text-3xl font-extrabold text-white">₹14,999</span>
                <span className="text-xs text-[#8e887d] font-mono block mt-0.5">(~$180 USD • 1 Month)</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-[#dcd7ce] pb-6 border-b border-white/10">
                <li>• 10 Advertising Posters</li>
                <li>• 10 Video Reels (9:16)</li>
                <li>• 2 Meta Ad Campaigns</li>
                <li>• 1 Month Off-Site SEO</li>
                <li>• Weekly Rank Reports</li>
              </ul>
            </div>
            <a
              href="https://wa.me/918610662871?text=Hi%20Belintan,%20I%20want%20to%20book%20the%20Marketing%20and%20Growth%20Bundle"
              className="mt-6 px-4 py-3 rounded-xl bg-[#3b66f5] hover:bg-[#2f55e0] text-white font-semibold text-xs text-center transition-colors"
            >
              Book Growth Bundle
            </a>
          </div>

          {/* Tier 4 */}
          <div className="p-6 rounded-2xl bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#8e887d] uppercase tracking-wider">Enterprise &amp; AI</span>
              <h3 className="text-lg font-bold text-white mt-1">Full-Stack &amp; AI Suite</h3>
              <div className="my-5">
                <span className="text-3xl font-extrabold text-white">Custom</span>
                <span className="text-xs text-[#8e887d] font-mono block mt-0.5">(From ₹19,999 / ~$240 USD)</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-[#b5afa4] pb-6 border-b border-white/10">
                <li>• React and Node.js Backend</li>
                <li>• Custom Python MCP Server</li>
                <li>• Database &amp; Auth Architecture</li>
                <li>• Stripe &amp; Cloud Webhook Setup</li>
              </ul>
            </div>
            <a
              href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20discuss%20a%20Custom%20Full-Stack%20Contract"
              className="mt-6 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs text-center transition-colors"
            >
              Discuss Custom Scope
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================
          SELECTED WORKS SECTION (Clean Case Studies)
      ======================================================== */}
      <section id="work" className="py-24 px-5 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="flex flex-col items-start mb-16">
          <div className="text-xs font-mono text-[#3b66f5] tracking-widest uppercase mb-3">
            ( SELECTED PORTFOLIO )
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Case Studies &amp; Delivered Platforms
          </h2>
          <p className="mt-3 text-base text-[#9d978a] max-w-xl">
            Production systems engineered for performance, reliability, and sales conversion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Featured Live App 1: Doocti Omnichannel Cloud Telephony & CRM */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-[#ff7a1a]/30 shadow-[0_10px_35px_rgba(255,122,26,0.1)] flex flex-col justify-between group">
            <div>
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-white/10 bg-gradient-to-br from-[#12131c] to-[#0a0a0f] p-4 flex flex-col justify-between relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#ff7a1a]/20 text-[#ff913d] border border-[#ff7a1a]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a1a] animate-pulse"></span>
                    LIVE CALLING APP
                  </span>
                  <span className="text-[10px] font-mono text-[#9d978a]">WebRTC • Opus • SIP</span>
                </div>
                <div className="text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-[#ff7a1a]/20 border border-[#ff7a1a] flex items-center justify-center text-xl text-[#ff913d] mx-auto mb-2">
                    📞
                  </div>
                  <h4 className="text-sm font-bold text-white">Doocti Omnichannel Telephony</h4>
                  <p className="text-[11px] text-[#9d978a]">Interactive Agent Softphone, Deal CRM &amp; Live Audio Waves</p>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#10b981] bg-black/60 px-3 py-1.5 rounded-lg border border-white/5">
                  <span>Agent: Belintan (Ready)</span>
                  <span>Opus 48kHz Active</span>
                </div>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff913d] block mb-1">
                Cloud Telephony &amp; CRM Platform
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Doocti Calling &amp; Customer Care Softphone
              </h3>
              <p className="text-xs text-[#9d978a] leading-relaxed mb-4">
                Enterprise call center softphone replica with real-time dialpad, simulated WebRTC audio streaming, live call dispositions, customer contact notes, and sales deal pipeline sync.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-[#dcd7ce]">React 19 • WebRTC • WebSocket</span>
              <button
                type="button"
                onClick={() => setCrmModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#ff7a1a] hover:bg-[#ff913d] text-black font-extrabold text-xs tracking-wide transition-all shadow-[0_2px_15px_rgba(255,122,26,0.4)]"
              >
                ▶ Test Live Dialer
              </button>
            </div>
          </div>

          {/* Featured Live App 2: SheetFlow Offline Google Sheets Duplicate */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-[#10b981]/30 shadow-[0_10px_35px_rgba(16,185,129,0.1)] flex flex-col justify-between group">
            <div>
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-white/10 bg-gradient-to-br from-[#0c1410] to-[#08090d] p-4 flex flex-col justify-between relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                    LOCAL-FIRST SPREADSHEET
                  </span>
                  <span className="text-[10px] font-mono text-[#9d978a]">100% Offline • Zero Latency</span>
                </div>
                <div className="text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center text-xl text-[#10b981] mx-auto mb-2">
                    📊
                  </div>
                  <h4 className="text-sm font-bold text-white">SheetFlow: Google Sheets Clone</h4>
                  <p className="text-[11px] text-[#9d978a]">Dynamic Cells, Formula Parser (=SUM, =AVG), CSV Export</p>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#38bdf8] bg-black/60 px-3 py-1.5 rounded-lg border border-white/5">
                  <span>Storage: LocalStorage / IndexedDB</span>
                  <span>Mobile Touch Optimized</span>
                </div>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#10b981] block mb-1">
                Productivity Application
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                SheetFlow: Offline Spreadsheet Engine
              </h3>
              <p className="text-xs text-[#9d978a] leading-relaxed mb-4">
                Full-featured Google Sheets clone running locally on any mobile phone or desktop. Features reactive cell recalculation, mathematical formula parsing, inline formatting, and instant CSV data export.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-[#dcd7ce]">React 19 • Math Parser • LocalStorage</span>
              <button
                type="button"
                onClick={() => setSheetModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-black font-extrabold text-xs tracking-wide transition-all shadow-[0_2px_15px_rgba(16,185,129,0.4)]"
              >
                ▶ Test Live Sheet
              </button>
            </div>
          </div>

          {/* Featured Project 3: 9:16 Video Editing & Social Media Showreel */}
          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-white/10 bg-gradient-to-br from-[#1a131f] to-[#0c0d14] p-4 flex flex-col justify-between relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#a855f7]/20 text-[#c084fc] border border-[#a855f7]/30">
                    9:16 SOCIAL REELS
                  </span>
                  <span className="text-[10px] font-mono text-[#9d978a]">Premiere • After Effects</span>
                </div>
                <div className="text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-[#a855f7]/20 border border-[#a855f7] flex items-center justify-center text-xl text-[#c084fc] mx-auto mb-2">
                    🎬
                  </div>
                  <h4 className="text-sm font-bold text-white">Video Post-Production &amp; Reels</h4>
                  <p className="text-[11px] text-[#9d978a]">High-Retention Social Clips, Dynamic Captions &amp; Sound FX</p>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#ff913d] bg-black/60 px-3 py-1.5 rounded-lg border border-white/5">
                  <span>Format: 1080x1920 (9:16)</span>
                  <span>Audio Pacing: Optimized</span>
                </div>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-[#c084fc] block mb-1">
                Content Creation &amp; Video Editing
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Viral Social Media Reels &amp; Shorts
              </h3>
              <p className="text-xs text-[#9d978a] leading-relaxed mb-4">
                Short-form video editing calibrated for maximum watch time across Instagram, YouTube Shorts, and TikTok. Incorporates fast-paced cuts, animated subtitles, color grading, and custom B-roll integration.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-[#dcd7ce]">4K Post-Production • CapCut • Motion</span>
              <a
                href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20hire%20you%20for%20Video%20Editing%20and%20Reels"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#c084fc] hover:underline"
              >
                Inquire for Video &rarr;
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-white/10">
                <img src="/images/gymfreaky.jpg" alt="GymFreaky Fitness Platform" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#3b66f5] block mb-1">Web Platform</span>
              <h3 className="text-xl font-bold text-white mb-2">GymFreaky Fitness &amp; Booking</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed mb-4">
                Full-featured gym transformation platform with class scheduling, trainer profiles, and WhatsApp booking triggers.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-[#dcd7ce]">React 19 • Node.js • Tailwind</span>
              <a href="https://wa.me/918610662871?text=Hi%20Belintan,%20tell%20me%20about%20GymFreaky" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#3b66f5] hover:underline">
                Inquire &rarr;
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-white/10">
                <img src="/images/habitrack.jpg" alt="HabiTrack Habit Streaks PWA" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#10b981] block mb-1">Progressive Web App</span>
              <h3 className="text-xl font-bold text-white mb-2">HabiTrack Habit Streaks PWA</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed mb-4">
                Offline-capable micro-habit tracker with IndexedDB storage, biometric sync, and streak progression graphs.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-[#dcd7ce]">PWA • IndexedDB • React</span>
              <a href="https://wa.me/918610662871?text=Hi%20Belintan,%20tell%20me%20about%20HabiTrack" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#10b981] hover:underline">
                Inquire &rarr;
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-white/10">
                <img src="/images/location_finder.jpg" alt="GeoTrack GIS" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4a373] block mb-1">Geospatial Platform</span>
              <h3 className="text-xl font-bold text-white mb-2">GeoTrack GIS Dashboard</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed mb-4">
                Fleet coordinate tracking dashboard with WebSocket streaming and spatial polygon queries via PostGIS.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-[#dcd7ce]">Node.js • PostgreSQL • Leaflet</span>
              <a href="https://wa.me/918610662871?text=Hi%20Belintan,%20tell%20me%20about%20GeoTrack" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#d4a373] hover:underline">
                Inquire &rarr;
              </a>
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-[#13141b] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 border border-white/10">
                <img src="/images/python_ai.jpg" alt="Nexus AI" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#3b66f5] block mb-1">AI Systems</span>
              <h3 className="text-xl font-bold text-white mb-2">Nexus AI &amp; FastMCP Bridge</h3>
              <p className="text-xs text-[#9d978a] leading-relaxed mb-4">
                Custom Model Context Protocol server exposing enterprise databases and tools to Claude Desktop and Cursor.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-[#dcd7ce]">Python 3.11 • FastMCP • OpenAI</span>
              <a href="https://wa.me/918610662871?text=Hi%20Belintan,%20tell%20me%20about%20Nexus%20AI" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#3b66f5] hover:underline">
                Inquire &rarr;
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          FREQUENTLY ASKED QUESTIONS
      ======================================================== */}
      <section id="faq" className="py-24 px-5 max-w-4xl mx-auto border-t border-white/10 relative z-10">
        <div className="text-center mb-14">
          <div className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-3">
            ( FAQ )
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Common Client Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'How do you collaborate with remote clients worldwide?',
              a: 'I communicate directly through Slack, Discord, WhatsApp, and email, provide daily sprint updates, and schedule video calls on Google Meet or Zoom. All milestones and code are delivered transparently via GitHub.'
            },
            {
              q: 'What is a custom Model Context Protocol (MCP) server?',
              a: 'MCP is the open standard that connects AI agents (like Claude Desktop and Cursor) to your company databases, APIs, and file systems. I build custom Python FastMCP servers that let your AI securely query internal records and execute workflows.'
            },
            {
              q: 'Who owns the source code upon project completion?',
              a: 'You do. Upon completion of milestone payments, 100% full intellectual property and source code rights are transferred directly to your organization with complete Git commit histories.'
            },
            {
              q: 'What is included in the Marketing & Growth Bundle?',
              a: 'It includes 10 advertising posters formatted for print and digital, 10 vertical 9:16 video reels with animated captions, 2 complete Meta ad campaigns (Facebook and Instagram) with Pixel tracking, and 1 month of off-site SEO backlink building.'
            }
          ].map((faq, index) => (
            <div key={index} className="rounded-xl border border-white/10 bg-[#121319] overflow-hidden">
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-white hover:text-[#3b66f5] transition-colors"
              >
                <span>{faq.q}</span>
                <span className="font-mono text-xs text-[#8e887d]">{activeFaq === index ? '−' : '+'}</span>
              </button>
              {activeFaq === index && (
                <div className="px-5 pb-5 text-xs text-[#9d978a] leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          CONTACT SECTION
      ======================================================== */}
      <section id="contact" className="py-24 px-5 max-w-4xl mx-auto border-t border-white/10 relative z-10">
        <div className="text-center mb-14">
          <div className="text-xs font-mono text-[#3b66f5] tracking-widest uppercase mb-3">
            ( KICKOFF )
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Start Your Project with Belintan
          </h2>
          <p className="mt-3 text-base text-[#9d978a] max-w-md mx-auto">
            Direct communication with the engineer building your product. Fast response within 2 hours.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#b5afa4]">
            <span>Direct Call: <a href="tel:+918610662871" className="text-white hover:text-[#3b66f5] transition-colors underline underline-offset-4">+91 86106 62871</a></span>
            <span>-</span>
            <span>Direct Email: <a href="mailto:belintan07@gmail.com" className="text-white hover:text-[#3b66f5] transition-colors underline underline-offset-4">belintan07@gmail.com</a></span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121319] p-8">
          {formSubmitted ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/20 border border-[#10b981] text-[#10b981] flex items-center justify-center text-xl mx-auto mb-4 font-bold">
                OK
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Inquiry Dispatched</h3>
              <p className="text-xs text-[#9d978a] max-w-sm mx-auto mb-6">
                Your project details have been formatted and redirected to WhatsApp. Belintan will reply shortly.
              </p>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                  {errorMessage}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#b5afa4] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#3b66f5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#b5afa4] mb-1">WhatsApp or Email *</label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => {
                      setFormData({ ...formData, contact: e.target.value });
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Phone number or email address"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#3b66f5]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#b5afa4] mb-1">Project Category</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#14151c] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7a1a]"
                  >
                    <option value="Video Editing & 9:16 Social Reels (Instagram / YouTube / TikTok)">Video Editing &amp; 9:16 Social Reels</option>
                    <option value="Freelance Content Creator & Social Media Retainer">Freelance Content Creator &amp; Social Retainer</option>
                    <option value="Omnichannel Cloud Telephony & CRM Call Center App (Doocti Style)">Omnichannel Cloud Telephony &amp; CRM</option>
                    <option value="Local-First Offline Web App & Google Sheets Duplicate">Local-First Offline App (Sheets Duplicate)</option>
                    <option value="Modern Web Application">Modern Web Application</option>
                    <option value="Custom MCP Server & AI Agent Tools">Custom MCP Server &amp; AI Tools</option>
                    <option value="Marketing & Growth Bundle (10 Posters, 10 Videos, 2 Meta Ads, 1 Mo SEO)">Marketing &amp; Growth Bundle</option>
                    <option value="Starter Landing Page">Starter Landing Page</option>
                    <option value="Enterprise Architecture & Dedicated Retainer">Enterprise Architecture &amp; Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#b5afa4] mb-1">Estimated Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#14151c] border border-white/10 text-white text-sm focus:outline-none focus:border-[#3b66f5]"
                  >
                    <option value="$60 - $120 / ₹5k - ₹10k">$60 - $120 / ₹5k - ₹10k</option>
                    <option value="$120 - $300 / ₹10k - ₹25k">$120 - $300 / ₹10k - ₹25k</option>
                    <option value="$300 - $600 / ₹25k - ₹50k">$300 - $600 / ₹25k - ₹50k</option>
                    <option value="$600 - $1,500+ / ₹50,000+">$600 - $1,500+ (Enterprise Retainer)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#b5afa4] mb-1">Project Brief / Technical Notes</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project scope, target timeline, and goals..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#3b66f5]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#3b66f5] hover:bg-[#2f55e0] text-white text-xs font-semibold tracking-wide transition-colors"
              >
                Send Inquiry to WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ========================================================
          LIVE INTERACTIVE MODALS
      ======================================================== */}
      <CrmDialerModal isOpen={crmModalOpen} onClose={() => setCrmModalOpen(false)} />
      <SheetFlowModal isOpen={sheetModalOpen} onClose={() => setSheetModalOpen(false)} />

      <Footer />
    </div>
  );
}
