import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

export default function ServicesPage() {
  useSEO({
    title: 'Freelance Web Design & Development Services | Belintan',
    description: 'Affordable, beginner-friendly freelance services: responsive websites, modern landing pages, small business web design, quick bug fixes, and basic SEO.',
    canonical: 'https://ProfileBelintan.com/services',
  });

  const services = [
    {
      num: '01',
      title: 'One-Page Portfolios & Landing Pages',
      tag: 'HTML5 • Tailwind CSS • React',
      badge: 'Fast Launch',
      desc: 'Clean, modern, and high-converting single-page websites tailored for freelancers, personal portfolios, resumes, and new product launches.',
      points: ['100% Mobile & tablet responsive', 'Direct WhatsApp & phone call triggers', 'Working contact and lead inquiry form']
    },
    {
      num: '02',
      title: 'Small Business Websites (3-5 Pages)',
      tag: 'Multi-Page • Responsive • Google Maps',
      badge: 'Most Popular',
      desc: 'Complete digital presence for local shops, cafes, clinics, consultants, and service providers with Home, About, Services, Gallery, and Contact pages.',
      points: ['Up to 5 custom-designed pages', 'Interactive Google Maps location embed', 'Fast loading times & clean code']
    },
    {
      num: '03',
      title: 'Website Redesigns & Modernization',
      tag: 'UI Overhaul • Speed Boost • Mobile',
      badge: 'Visual Makeover',
      desc: 'Transform outdated, slow, or broken websites into sleek, modern, and mobile-friendly experiences that build trust with visitors.',
      points: ['Modern typography & color palette', 'Smooth animations & layout cleanups', 'Improved mobile user experience']
    },
    {
      num: '04',
      title: 'Quick Bug Fixes & Content Updates',
      tag: 'HTML/CSS • JavaScript • Form Fixes',
      badge: '24-48h Delivery',
      desc: 'Need a fast tweak? I fix broken contact forms, misaligned CSS layouts, broken links, and update your site text, logos, and images.',
      points: ['Rapid turnaround within 24 to 48 hours', 'Cross-browser testing (Chrome, Safari, Edge)', 'Zero downtime during updates']
    },
    {
      num: '05',
      title: 'WhatsApp & Lead Form Integration',
      tag: 'WhatsApp API • Formspree • Email Alerts',
      badge: 'Lead Capture',
      desc: 'Connect visitors directly to your phone or inbox with pre-filled WhatsApp chat links and reliable contact forms that deliver inquiries instantly.',
      points: ['Instant WhatsApp lead notifications', 'Spam-protected contact forms', 'Direct click-to-call mobile buttons']
    },
    {
      num: '06',
      title: 'Basic Google SEO & Search Presence',
      tag: 'Meta Tags • Google Maps • Sitemap',
      badge: 'Search Visibility',
      desc: 'Help customers find you on Google. I configure essential meta tags, open graph social share cards, sitemap.xml, and Google Search Console indexing.',
      points: ['Optimized title & meta descriptions', 'Google Search Console verification', 'Local Google Maps business link']
    },
    {
      num: '07',
      title: 'Domain & Free Hosting Assistance',
      tag: 'Vercel • Netlify • Custom Domains',
      badge: 'Hassle-Free Launch',
      desc: 'Get your website live without high server fees. I help you connect your custom domain name and set up secure, free SSL hosting on modern platforms.',
      points: ['Assistance purchasing & pointing your domain', 'Free automated SSL certificate (HTTPS)', 'Zero costly monthly server overhead']
    },
    {
      num: '08',
      title: 'Ongoing Maintenance & Monthly Support',
      tag: 'Monthly Checkups • Content Edits',
      badge: 'Peace of Mind',
      desc: 'Keep your website secure, fresh, and up to date without headaches. Dedicated monthly support for content changes, backups, and bug fixes.',
      points: ['Monthly text and photo updates', 'Regular performance & link checks', 'Priority response over WhatsApp']
    }
  ];

  return (
    <div className="min-h-screen bg-[#07070a] text-[#eae7e1] flex flex-col justify-between relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none ambient-mesh opacity-60" />
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[450px] bg-[#ff7a1a]/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-5 pt-36 pb-24 z-10 w-full">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7a1a]/10 border border-[#ff7a1a]/20 text-xs font-mono text-[#ff913d] uppercase tracking-widest mb-4">
            ( SERVICES &amp; CAPABILITIES )
          </div>
          
          {/* EXACTLY ONE H1 HEADING */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Comprehensive Engineering &amp; Growth Services
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#b5afa4] leading-relaxed">
            Full-stack engineering depth combined with revenue-focused digital marketing. From modern web applications and custom MCP AI servers to high-converting advertising creatives and scalable cloud architectures.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/pricing" className="btn-pill text-xs py-2.5 px-6">
              <span>View Pricing Packages</span>
            </Link>
            <Link to="/contact" className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-all">
              Book Project Consultation →
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <div key={srv.num} className="double-bezel rounded-3xl p-1.5 group hover:border-[#ff7a1a]/40 transition-all">
              <div className="double-bezel-core rounded-[calc(24px-4px)] p-8 h-full flex flex-col justify-between bg-[#0d0e14]/90">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono text-[#ff7a1a] font-bold">{srv.num}</span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#a39d91]">
                      {srv.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#ff913d] transition-colors">
                    {srv.title}
                  </h2>
                  <p className="text-xs font-mono text-[#38bdf8] mb-4">{srv.tag}</p>
                  <p className="text-xs text-[#9d978a] leading-relaxed mb-6">{srv.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <ul className="space-y-1.5 text-xs text-[#c2bcb2]">
                    {srv.points.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[#10b981]">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#ff7a1a]/15 via-white/5 to-[#38bdf8]/15 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Need a customized scope or dedicated retainer?</h3>
            <p className="text-xs text-[#9d978a]">Get a customized architecture proposal and pricing estimate within 24 hours.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/pricing" className="btn-pill text-xs py-2.5 px-5">
              <span>Launch Quote Estimator</span>
            </Link>
            <a
              href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20discuss%20a%20custom%20service%20bundle"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10"
            >
              WhatsApp Belintan
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
