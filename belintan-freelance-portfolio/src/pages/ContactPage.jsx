import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

export default function ContactPage() {
  useSEO({
    title: 'Contact & Booking | Belintan B - Full-Stack, AI & Video Content Creator',
    description: 'Direct project booking with Belintan B for Web Apps, Node & Python APIs, Cloud Telephony CRM, and Video Editing & 9:16 Social Media Content Creation.',
    canonical: 'https://ProfileBelintan.com/contact',
  });

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: 'Modern Web Application',
    budget: '$300 - $600 / ₹25k - ₹50k',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      setErrorMessage('Please provide your name and contact details so Belintan can reply.');
      return;
    }
    setErrorMessage('');
    const msg = `*New Freelance Project Booking*\n` +
      `*Name:* ${formData.name}\n` +
      `*Contact:* ${formData.contact}\n` +
      `*Category:* ${formData.projectType}\n` +
      `*Budget:* ${formData.budget}\n` +
      `*Scope:* ${formData.message || 'Standard Consultation'}`;

    window.open(`https://wa.me/918610662871?text=${encodeURIComponent(msg)}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-[#eae7e1] flex flex-col justify-between relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none ambient-mesh opacity-60" />
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[450px] bg-[#ff7a1a]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-5 pt-36 pb-24 z-10 w-full">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 text-xs font-mono text-[#10b981] uppercase tracking-widest mb-4">
            ( DIRECT KICKOFF )
          </div>

          {/* EXACTLY ONE H1 HEADING */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Start Your Project with Belintan
          </h1>

          <p className="mt-4 text-base text-[#b5afa4] leading-relaxed">
            Direct communication with Belintan for Full-Stack Web Development, AI Tools, Cloud Telephony CRM, and Video Editing &amp; 9:16 Social Reels. Guaranteed response within 2 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">

          {/* Contact Details Card */}
          <div className="md:col-span-5 double-bezel rounded-3xl p-1.5">
            <div className="double-bezel-core rounded-[calc(24px-4px)] p-6 bg-[#0d0e14] space-y-6">

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff913d] block mb-1">Direct Call &amp; WhatsApp</span>
                <div className="flex flex-col gap-1">
                  <a href="tel:+918610662871" className="text-base font-bold text-white hover:text-[#ff7a1a] transition-colors" title="Call directly">
                    +91 86106 62871 (Call)
                  </a>
                  <a href="https://wa.me/918610662871" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#10b981] hover:underline">
                    &rarr; Open WhatsApp Chat
                  </a>
                </div>
                <p className="text-[11px] text-[#9d978a] mt-1">Instant voice call and direct WhatsApp messaging</p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8] block mb-1">Official Email</span>
                <a href="mailto:belintan07@gmail.com" className="text-base font-bold text-white hover:text-[#38bdf8] transition-colors">
                  belintan07@gmail.com
                </a>
                <p className="text-[11px] text-[#9d978a] mt-0.5">RFPs, NDAs &amp; project briefs</p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#10b981] block mb-1">Location &amp; Availability</span>
                <p className="text-sm font-semibold text-white">Tuticorin, TN, India • Remote Worldwide</p>
                <p className="text-[11px] text-[#10b981] font-mono mt-0.5">● Available for Worldwide Remote Contracts</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9d978a] block mb-2">Code &amp; Professional</span>
                <div className="flex gap-3">
                  <a href="https://github.com/belintan07" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-white/10">
                    GitHub ↗
                  </a>
                  <a href="https://www.linkedin.com/in/belintanben" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-white/10">
                    LinkedIn ↗
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="md:col-span-7 double-bezel rounded-3xl p-1.5">
            <div className="double-bezel-core rounded-[calc(24px-4px)] p-8 bg-[#0d0e14]">

              {/* Error Message Alert */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono">
                  {errorMessage}
                </div>
              )}

              {formSubmitted ? (
                <div className="py-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#10b981]/20 border border-[#10b981] text-[#10b981] flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Inquiry Routed!</h3>
                  <p className="text-xs text-[#9d978a] max-w-sm mx-auto mb-6">
                    Your project details have been formatted and dispatched to WhatsApp. Belintan will connect with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setFormSubmitted(false); setErrorMessage(''); }}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#b5afa4] mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7a1a]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#b5afa4] mb-1">WhatsApp / Email *</label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="Your phone number or email"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7a1a]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#b5afa4] mb-1">Project Category</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#11121a] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7a1a]"
                      >
                        <option value="Video Editing & 9:16 Social Reels (Instagram / YouTube / TikTok)">Video Editing &amp; 9:16 Social Reels</option>
                        <option value="Freelance Content Creator & Social Media Retainer">Freelance Content Creator &amp; Social Retainer</option>
                        <option value="Omnichannel Cloud Telephony & CRM Call Center App (Doocti Style)">Omnichannel Cloud Telephony &amp; CRM</option>
                        <option value="Local-First Offline Web App & Google Sheets Duplicate">Local-First Offline App (Sheets Duplicate)</option>
                        <option value="Modern Web Application">Modern Web Application (React &amp; Node)</option>
                        <option value="Custom MCP Server & AI Agent Tools">Custom MCP Server &amp; AI Tools</option>
                        <option value="Marketing & Growth Bundle (10 Posters, 10 Videos, 2 Meta Ads, 1 Mo SEO)">Marketing &amp; Growth Bundle</option>
                        <option value="Starter Landing Page">Starter Landing Page</option>
                        <option value="Enterprise Architecture & Retainer">Enterprise Architecture &amp; Retainer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#b5afa4] mb-1">Estimated Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#11121a] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7a1a]"
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
                      placeholder="Tell me about your goals, timeline, and requirements..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff7a1a]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-pill w-full text-xs py-3 justify-center"
                  >
                    <span>Dispatch Project Inquiry to WhatsApp</span>
                    <div className="icon-box w-5 h-5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
