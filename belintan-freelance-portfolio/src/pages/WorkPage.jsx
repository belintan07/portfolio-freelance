import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CrmDialerModal from '../components/CrmDialerModal';
import SheetFlowModal from '../components/SheetFlowModal';
import { useSEO } from '../hooks/useSEO';

export default function WorkPage() {
  useSEO({
    title: 'Selected Works, Live Apps & Video Editing | ProfileBelintan.com',
    description: 'Explore live applications and client case studies by Belintan: Doocti Cloud Telephony CRM, SheetFlow Offline Spreadsheet, 9:16 Social Reels, and GymFreaky fitness platform.',
    canonical: 'https://ProfileBelintan.com/work',
  });

  const [crmModalOpen, setCrmModalOpen] = useState(false);
  const [sheetModalOpen, setSheetModalOpen] = useState(false);

  const projects = [
    {
      id: 'doocti-crm',
      title: 'Doocti - Cloud Telephony & Calling CRM Softphone',
      tagline: 'Browser-based WebRTC VoIP softphone & omnichannel customer care',
      category: 'Cloud Telephony & CRM',
      img: '/images/location_finder.jpg',
      stack: ['React 19', 'WebRTC', 'WebSocket', 'Node.js', 'PostgreSQL'],
      metric: '100% In-Browser VoIP',
      desc: 'Enterprise call center telephony system inspired by Doocti (web-v2.doocti.com). Features interactive dialpad, live audio wave animation, caller ID, customer care ticket logs, and CRM deal pipeline synchronization.',
      highlights: ['Interactive in-browser WebRTC VoIP dialpad', 'Real-time audio visualizer & disposition tags', 'Lead CRM pipeline with instant disposition sync'],
      isInteractive: 'crm'
    },
    {
      id: 'sheetflow',
      title: 'SheetFlow - Local-First Offline Spreadsheet Engine',
      tagline: 'Google Sheets duplicate running locally with instant formula parser',
      category: 'Local-First PWA',
      img: '/images/habitrack.jpg',
      stack: ['React 19', 'IndexedDB', 'Formula Parser', 'LocalStorage'],
      metric: 'Zero Latency Offline',
      desc: 'Full-featured Google Sheets clone running locally with zero backend dependencies. Supports dynamic cells, formula parsing (=SUM, =AVG), instant CSV export, and responsive mobile touch controls.',
      highlights: ['100% offline formula parser (=SUM, arithmetic)', 'Local persistence via IndexedDB / LocalStorage', 'Responsive touch-friendly grid with CSV export'],
      isInteractive: 'sheet'
    },
    {
      id: 'viral-reels',
      title: 'Viral 9:16 Social Reels & Video Post-Production',
      tagline: 'High-retention vertical short-form video editing & motion typography',
      category: 'Video Editing & Content Creation',
      img: '/images/gymfreaky.jpg',
      stack: ['Premiere Pro', 'After Effects', 'CapCut Pro', 'Color Grading'],
      metric: '+350k Social Views',
      desc: 'End-to-end video post-production for social media creators and brands. Fast-paced pacing, dynamic animated subtitles, sound design, and retention-optimized visual storytelling.',
      highlights: ['Perfect 9:16 vertical ratio for Reels & Shorts', 'Motion graphics, subtitle typography & SFX', 'Retention-first pacing and hook optimization']
    },
    {
      id: 'gymfreaky',
      title: 'GymFreaky - Fitness & Transformation Platform',
      tagline: 'High-conversion fitness membership & workout scheduler',
      category: 'Web App & Marketing',
      img: '/images/gymfreaky.jpg',
      stack: ['React 19', 'Tailwind CSS', 'Node.js', 'Stripe'],
      metric: '320% Lead Growth',
      desc: 'Complete digital overhaul for GymFreaky. Features responsive class scheduling, membership tiers, automated WhatsApp lead triggers, and high-converting marketing landing page.',
      highlights: ['Automated membership onboarding', 'Instant WhatsApp inquiry integration', 'Mobile-first PWA with offline caching']
    },
    {
      id: 'habitrack',
      title: 'HabiTrack - Micro-Habit Streak PWA',
      tagline: 'Offline-first progressive web app with biometric habit streaks',
      category: 'Progressive Web App',
      img: '/images/habitrack.jpg',
      stack: ['React', 'IndexedDB', 'Service Worker', 'PWA'],
      metric: '99.9% Uptime Offline',
      desc: 'Daily productivity habit tracker engineered to run fully offline. Uses IndexedDB client-side database, background sync service workers, and visual streak progression metrics.',
      highlights: ['Instant load under 400ms', 'Full standalone installable PWA experience', 'Zero backend dependency for local data']
    },
    {
      id: 'geotrack',
      title: 'GeoTrack GIS - Real-Time Geospatial Platform',
      tagline: 'Fleet and asset tracking engine with sub-second geospatial updates',
      category: 'Full-Stack Architecture',
      img: '/images/location_finder.jpg',
      stack: ['Node.js', 'PostgreSQL / PostGIS', 'Leaflet', 'WebSocket'],
      metric: '45ms Geo-Latency',
      desc: 'High-throughput tracking dashboard for field logistics. Handles streaming coordinates via WebSockets, spatial polygon queries via PostgreSQL/PostGIS, and responsive GIS layers.',
      highlights: ['Real-time WebSocket telemetry stream', 'Spatial boundary geofencing alerts', 'Sub-50ms query latency on 100k+ coordinate points']
    },
    {
      id: 'nexus-ai',
      title: 'Nexus AI - Pipeline & Custom MCP Server',
      tagline: 'Model Context Protocol (MCP) server & automated LLM orchestration',
      category: 'AI & FastMCP Tooling',
      img: '/images/python_ai.jpg',
      stack: ['Python 3.11', 'FastMCP', 'OpenAI', 'Gemini API'],
      metric: '10x Workflow Speed',
      desc: 'Enterprise Model Context Protocol bridge allowing Claude and Cursor agents to securely query internal databases, trigger CRM actions, and parse sales leads autonomously.',
      highlights: ['FastMCP stdio & SSE bidirectional streaming', 'Tool-calling execution loops with guardrails', 'Seamless integration with Cursor & Claude Desktop']
    }
  ];

  return (
    <div className="min-h-screen bg-[#07070a] text-[#eae7e1] flex flex-col justify-between relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none ambient-mesh opacity-60" />
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[450px] bg-[#38bdf8]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-5 pt-36 pb-24 z-10 w-full">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-xs font-mono text-[#38bdf8] uppercase tracking-widest mb-4">
            ( SELECTED PORTFOLIO )
          </div>

          {/* EXACTLY ONE H1 HEADING */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Selected Works, Systems &amp; Case Studies
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#b5afa4] leading-relaxed">
            Every project represents production-tested engineering, high conversion architecture, and rigorous attention to detail. No templates, no boilerplate.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div key={proj.id} className="double-bezel rounded-[32px] p-2 group hover:border-[#ff7a1a]/40 transition-all">
              <div className="double-bezel-core rounded-[calc(32px-8px)] p-6 bg-[#0d0e14]/90 flex flex-col justify-between h-full">
                <div>
                  <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-white/10 relative">
                    <img
                      src={proj.img}
                      alt={proj.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#ff7a1a] font-bold">
                      {proj.metric}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8] block mb-1">
                    {proj.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ff913d] transition-colors">
                    {proj.title}
                  </h2>
                  <p className="text-xs text-[#9d978a] leading-relaxed mb-4">
                    {proj.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.stack.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#dcd7ce]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-1 text-xs text-[#b5afa4] mb-5">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[#10b981]">✓</span> {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between gap-4">
                    {proj.isInteractive === 'crm' ? (
                      <button
                        type="button"
                        onClick={() => setCrmModalOpen(true)}
                        className="px-4 py-2 rounded-xl bg-[#ff7a1a] hover:bg-[#ff913d] text-black font-extrabold text-xs tracking-wider transition-all shadow-[0_2px_15px_rgba(255,122,26,0.4)]"
                      >
                        ▶ Launch Softphone Dialer
                      </button>
                    ) : proj.isInteractive === 'sheet' ? (
                      <button
                        type="button"
                        onClick={() => setSheetModalOpen(true)}
                        className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-extrabold text-xs tracking-wider transition-all shadow-[0_2px_15px_rgba(16,185,129,0.4)]"
                      >
                        ▶ Launch Offline Sheet
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-[#9d978a]">Production Code Handover</span>
                    )}

                    <a
                      href={`https://wa.me/918610662871?text=Hi%20Belintan,%20I'm%20interested%20in%20a%20build%20like%20${encodeURIComponent(proj.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff7a1a] hover:text-[#ffa043] transition-colors"
                    >
                      <span>Inquire</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Client Guarantee Callout */}
        <div className="mt-16 text-center p-8 rounded-3xl bg-white/5 border border-white/10 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-2">Want to see private GitHub repositories or custom video samples?</h3>
          <p className="text-xs text-[#9d978a] mb-6">NDAs respected. Private live walk-throughs available upon request via video call or WhatsApp.</p>
          <a
            href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20see%20more%20project%20demos"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill text-xs py-2.5 px-6 inline-flex"
          >
            <span>Request Demo on WhatsApp</span>
          </a>
        </div>

      </main>

      {/* Modals */}
      <CrmDialerModal isOpen={crmModalOpen} onClose={() => setCrmModalOpen(false)} />
      <SheetFlowModal isOpen={sheetModalOpen} onClose={() => setSheetModalOpen(false)} />

      <Footer />
    </div>
  );
}
