import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

const BASE_PRICES = {
  landing: { inr: 4999, days: 4 },
  business: { inr: 9999, days: 8 },
  growth: { inr: 14999, days: 14 },
  webapp: { inr: 19999, days: 14 },
  ai: { inr: 14999, days: 10 },
};

const FEATURE_PRICES = {
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

const FEATURE_LABELS = {
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

export default function PricingPage() {
  useSEO({
    title: 'Transparent Freelance Pricing & Cost Estimator | Belintan Freelance',
    description: 'Upfront freelance packages from ₹4,999 ($60 USD) to complete growth bundles (₹14,999) and custom web solutions with live cost estimation.',
    canonical: 'https://ProfileBelintan.com/pricing',
  });

  const [projectType, setProjectType] = useState('landing');
  const [selectedFeatures, setSelectedFeatures] = useState(['mobile', 'whatsapp', 'contact_form', 'seo']);
  const [timelineSpeed, setTimelineSpeed] = useState('standard');

  const estimate = useMemo(() => {
    const base = BASE_PRICES[projectType] || BASE_PRICES.landing;
    let priceInr = base.inr;

    selectedFeatures.forEach(f => {
      // Starter Landing Page includes contact_form, so do not charge it as an add-on
      if (projectType === 'landing' && f === 'contact_form') {
        return;
      }
      priceInr += (FEATURE_PRICES[f] || 0);
    });

    // Included features (mobile, whatsapp, and included contact_form) add no time
    const timeAddingFeatures = selectedFeatures.filter(
      f => f !== 'mobile' && f !== 'whatsapp' && !(projectType === 'landing' && f === 'contact_form')
    );
    let days = base.days + Math.round(timeAddingFeatures.length * 1.2);

    if (timelineSpeed === 'express') {
      priceInr = Math.round(priceInr * 1.25);
      days = Math.max(2, Math.round(days * 0.6));
    }

    const priceUsd = Math.round(priceInr / 85);
    return { priceInr, priceUsd, days };
  }, [projectType, selectedFeatures, timelineSpeed]);

  const toggleFeature = (id) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const sendWhatsAppEstimate = () => {
    const feats = selectedFeatures.map(f => FEATURE_LABELS[f] || f).join(', ');
    const msg = `*Freelance Project Inquiry & Estimate*\n` +
      `*Package Type:* ${projectType.toUpperCase()}\n` +
      `*Timeline:* ${timelineSpeed.toUpperCase()} (~${estimate.days} Days)\n` +
      `*Selected Features:* ${feats || 'Basic Setup'}\n` +
      `*Calculated Price:* ₹${estimate.priceInr.toLocaleString()} (~$${estimate.priceUsd} USD)\n\n` +
      `Hi Belintan! I saw your freelance pricing and would like to hire you for my project. Let's discuss!`;

    window.open(`https://wa.me/918610662871?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-[#eae7e1] flex flex-col justify-between relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none ambient-mesh opacity-60" />
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[450px] bg-[#10b981]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-5 pt-36 pb-24 z-10 w-full">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-xs font-mono text-[#10b981] uppercase tracking-widest mb-4">
            ( AFFORDABLE FREELANCE PRICING )
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Clear, Honest Pricing For Your Website
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#b5afa4] leading-relaxed">
            No agency markups, no surprise fees. Dedicated 1-on-1 personal attention, quick turnarounds, and full ownership of your clean code.
          </p>
        </div>

        {/* 4 Pricing Packages */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-24">

          {/* Tier 1 */}
          <div className="double-bezel rounded-[28px] p-2 flex flex-col justify-between">
            <div className="double-bezel-core rounded-[calc(28px-6px)] p-6 h-full flex flex-col justify-between bg-[#0d0e14]">
              <div>
                <span className="text-[10px] font-mono text-[#9d978a] uppercase tracking-wider">Fast Launch</span>
                <h2 className="text-lg font-bold text-white mt-1">Starter Landing Page</h2>
                <div className="my-5">
                  <span className="text-3xl font-extrabold text-[#ff7a1a]">₹4,999</span>
                  <span className="text-xs text-[#9d978a] font-mono block mt-0.5">(~$60 USD)</span>
                </div>
                <ul className="space-y-2 text-xs font-mono text-[#b5afa4] pb-6 border-b border-white/10">
                  <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> 1 High-Converting Page</li>
                  <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> WhatsApp Lead Triggers</li>
                  <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Responsive Mobile-First</li>
                  <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Working Contact Form</li>
                  <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> 3-5 Days Turnaround</li>
                </ul>
              </div>
              <a href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20book%20the%20Starter%20Landing%20Page" target="_blank" rel="noopener noreferrer" className="mt-6 btn-pill text-xs justify-center font-bold">
                Book Starter Page
              </a>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="double-bezel rounded-[28px] p-2 flex flex-col justify-between">
            <div className="double-bezel-core rounded-[calc(28px-6px)] p-6 h-full flex flex-col justify-between bg-[#0d0e14]">
              <div>
                <span className="text-[10px] font-mono text-[#9d978a] uppercase tracking-wider">Multi-Page</span>
                <h2 className="text-lg font-bold text-white mt-1">Business Website</h2>
                <div className="my-5">
                  <span className="text-3xl font-extrabold text-white">₹9,999</span>
                  <span className="text-xs text-[#9d978a] font-mono block mt-0.5">(~$120 USD)</span>
                </div>
                <ul className="space-y-2 text-xs font-mono text-[#b5afa4] pb-6 border-b border-white/10">
                  <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Up to 6 Custom Pages</li>
                  <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Complete On-Page SEO</li>
                  <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Contact &amp; Quote Forms</li>
                  <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> 7-10 Days Turnaround</li>
                </ul>
              </div>
              <a href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20book%20the%20Business%20Website" target="_blank" rel="noopener noreferrer" className="mt-6 btn-pill text-xs justify-center font-bold">
                Book Business Site
              </a>
            </div>
          </div>

          {/* Tier 3: Growth Bundle */}
          <div className="double-bezel rounded-[28px] p-2 flex flex-col justify-between border-[#ff7a1a] shadow-[0_0_35px_rgba(255,122,26,0.25)] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#ff7a1a] text-black font-extrabold text-[10px] uppercase tracking-widest shadow-md">
              POPULAR
            </div>
            <div className="double-bezel-core rounded-[calc(28px-6px)] p-6 h-full flex flex-col justify-between bg-[#12131d]">
              <div>
                <span className="text-[10px] font-mono text-[#ff913d] uppercase tracking-wider">All-in-One Growth</span>
                <h2 className="text-lg font-bold text-white mt-1">Marketing &amp; SEO Bundle</h2>
                <div className="my-5">
                  <span className="text-3xl font-extrabold text-[#ff7a1a]">₹14,999</span>
                  <span className="text-xs text-[#9d978a] font-mono block mt-0.5">(~$180 USD • 1 Month)</span>
                </div>
                <ul className="space-y-2 text-xs font-mono text-white pb-6 border-b border-white/10">
                  <li className="flex items-center gap-2"><span className="text-[#ff7a1a]">✓</span> <strong>10 Advertising Posters</strong></li>
                  <li className="flex items-center gap-2"><span className="text-[#ff7a1a]">✓</span> <strong>10 Video Reels (9:16)</strong></li>
                  <li className="flex items-center gap-2"><span className="text-[#ff7a1a]">✓</span> <strong>2 Meta Ad Campaigns</strong></li>
                  <li className="flex items-center gap-2"><span className="text-[#ff7a1a]">✓</span> <strong>1 Mo Off-Site SEO</strong></li>
                  <li className="flex items-center gap-2"><span className="text-[#ff7a1a]">✓</span> Weekly ROI &amp; Rank Reports</li>
                </ul>
              </div>
              <a href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20book%20the%20Marketing%20and%20Growth%20Bundle" target="_blank" rel="noopener noreferrer" className="mt-6 btn-pill text-xs justify-center font-bold bg-[#ff7a1a] text-black">
                Book Growth Bundle
              </a>
            </div>
          </div>

          {/* Tier 4 */}
          <div className="double-bezel rounded-[28px] p-2 flex flex-col justify-between">
            <div className="double-bezel-core rounded-[calc(28px-6px)] p-6 h-full flex flex-col justify-between bg-[#0d0e14]">
              <div>
                <span className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-wider">Enterprise &amp; AI</span>
                <h2 className="text-lg font-bold text-white mt-1">Full-Stack &amp; AI Suite</h2>
                <div className="my-5">
                  <span className="text-3xl font-extrabold text-white">Custom</span>
                  <span className="text-xs text-[#9d978a] font-mono block mt-0.5">(From ₹19,999 / ~$240 USD)</span>
                </div>
                <ul className="space-y-2 text-xs font-mono text-[#b5afa4] pb-6 border-b border-white/10">
                  <li className="flex items-center gap-2"><span className="text-[#38bdf8]">✓</span> React + Node.js Backend</li>
                  <li className="flex items-center gap-2"><span className="text-[#38bdf8]">✓</span> Custom Python MCP Servers</li>
                  <li className="flex items-center gap-2"><span className="text-[#38bdf8]">✓</span> Database &amp; Auth Architecture</li>
                  <li className="flex items-center gap-2"><span className="text-[#38bdf8]">✓</span> Stripe &amp; Cloud Webhook Setup</li>
                </ul>
              </div>
              <a href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20discuss%20a%20Custom%20Full-Stack%20Contract" target="_blank" rel="noopener noreferrer" className="mt-6 btn-pill text-xs justify-center font-bold">
                Discuss Custom Scope
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Dynamic Project Cost Estimator */}
        <div className="max-w-4xl mx-auto double-bezel rounded-[32px] p-2">
          <div className="double-bezel-core rounded-[calc(32px-8px)] p-6 sm:p-10 bg-[#0d0e14]">

            <div className="text-center mb-8 pb-6 border-b border-white/10">
              <span className="text-xs font-mono text-[#ff7a1a] uppercase tracking-wider">Live Quotation Tool</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Calculate Your Exact Project Cost</h2>
              <p className="text-xs text-[#9d978a] mt-1">Customize your scope and instantly export your quote to WhatsApp.</p>
            </div>

            {/* Step 1: Base Tier */}
            <div className="mb-6">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#b5afa4] mb-3">
                1. Select Foundation Tier
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
                    className={`p-4 rounded-2xl text-left transition-all border ${projectType === item.id ? 'bg-[#ff7a1a]/15 border-[#ff7a1a] text-white shadow-md' : 'bg-white/5 border-white/10 text-[#9d978a] hover:border-white/20'}`}
                  >
                    <span className="block font-bold text-sm text-white">{item.label}</span>
                    <span className="block text-xs text-[#8e887d] mt-1 font-mono">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Add-on Capabilities */}
            <div className="mb-6">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#b5afa4] mb-3">
                2. Select Needed Features &amp; Add-ons
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
                    className={`p-3 rounded-xl text-left transition-all border ${selectedFeatures.includes(item.id) ? 'bg-[#10b981]/15 border-[#10b981] text-white' : 'bg-white/5 border-white/10 text-[#9d978a] hover:border-white/20'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{item.label}</span>
                      {selectedFeatures.includes(item.id) && <span className="text-[#10b981] text-xs font-bold">✓</span>}
                    </div>
                    <span className="text-[10px] font-mono text-[#a39d91] block mt-1">{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Speed */}
            <div className="mb-8">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#b5afa4] mb-3">
                3. Delivery Timeline Speed
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTimelineSpeed('standard')}
                  className={`p-3 rounded-xl text-left transition-all border ${timelineSpeed === 'standard' ? 'bg-[#ff7a1a]/15 border-[#ff7a1a]' : 'bg-white/5 border-white/10 text-[#9d978a]'}`}
                >
                  <span className="block font-bold text-xs text-white">Standard Delivery</span>
                  <span className="block text-[11px] text-[#8e887d]">Default milestone pace</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTimelineSpeed('express')}
                  className={`p-3 rounded-xl text-left transition-all border ${timelineSpeed === 'express' ? 'bg-[#ff7a1a]/15 border-[#ff7a1a]' : 'bg-white/5 border-white/10 text-[#9d978a]'}`}
                >
                  <span className="block font-bold text-xs text-white">Express Delivery (+25%)</span>
                  <span className="block text-[11px] text-[#8e887d]">Priority fast-track sprint</span>
                </button>
              </div>
            </div>

            {/* Calculation Output Bar */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-[#9d978a]">Estimated Investment:</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-extrabold text-[#ff7a1a]">₹{estimate.priceInr.toLocaleString()}</span>
                  <span className="text-sm font-mono text-[#38bdf8]">(~${estimate.priceUsd} USD)</span>
                </div>
                <span className="text-xs font-mono text-[#10b981] block mt-1">
                  Estimated Delivery: ~{estimate.days} Days
                </span>
              </div>

              <button
                type="button"
                onClick={sendWhatsAppEstimate}
                className="btn-pill text-xs py-3 px-6 w-full sm:w-auto justify-center"
              >
                <span>Export Estimate to WhatsApp</span>
                <div className="btn-icon-circle w-5 h-5 ml-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </button>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
