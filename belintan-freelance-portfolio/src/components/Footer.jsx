import { Link } from 'react-router-dom';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-5 relative z-10 bg-[#0d0e12]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand & Summary */}
        <div className="md:col-span-5 flex flex-col items-start">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#3b66f5] flex items-center justify-center font-bold text-white text-sm">
              B
            </div>
            <span className="font-extrabold text-white text-lg tracking-tight">
              BELINTAN<span className="text-[#ff7a1a]">.COM</span>
            </span>
          </Link>
          <p className="text-xs text-[#9d978a] leading-relaxed max-w-sm mb-4">
            Full-stack software engineer and MBA strategist delivering high-converting web applications, Node.js backends, Python AI automation pipelines, and custom Model Context Protocol servers.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-[#a39d91]">
            <span>Canonical: <strong>https://ProfileBelintan.com</strong></span>
          </div>
        </div>

        {/* Navigation Slugs */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">Page Slugs</h4>
          <ul className="space-y-2 text-xs font-medium text-[#b5afa4]">
            <li><Link to="/" className="hover:text-white transition-colors">/ (Home)</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">/services</Link></li>
            <li><Link to="/work" className="hover:text-white transition-colors">/work</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">/pricing</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">/contact</Link></li>
          </ul>
        </div>

        {/* SEO & Legal */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#d4a373] mb-4">Legal &amp; Machine</h4>
          <ul className="space-y-2 text-xs font-mono text-[#9d978a]">
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><a href="/sitemap.xml" target="_blank" className="hover:text-white transition-colors">sitemap.xml</a></li>
            <li><a href="/robots.txt" target="_blank" className="hover:text-white transition-colors">robots.txt</a></li>
            <li><a href="/llms.txt" target="_blank" className="hover:text-[#38bdf8] transition-colors">llms.txt (AI Spec)</a></li>
            <li><Link to="/404" className="hover:text-[#ff7a1a] transition-colors">404 Page</Link></li>
          </ul>
        </div>

        {/* Direct Contact (Clickable Phone & Email) */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4">Direct Contact</h4>
          <div className="space-y-2.5 text-xs text-[#b5afa4]">
            <div>
              <span className="block text-[10px] font-mono text-[#8e887d] uppercase">Call Direct</span>
              <a href="tel:+918610662871" className="text-sm font-bold text-white hover:text-[#3b66f5] transition-colors">
                +91 86106 62871
              </a>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-[#8e887d] uppercase">Email Direct</span>
              <a href="mailto:belintan07@gmail.com" className="text-sm font-bold text-white hover:text-[#3b66f5] transition-colors">
                belintan07@gmail.com
              </a>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>WhatsApp: +91 86106 62871</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e685e]">
        <p>&copy; {CURRENT_YEAR} Belintan. Built with React 19, Tailwind CSS, Node.js, and Python. All rights reserved.</p>
        <p className="mt-2 sm:mt-0 font-mono">Tuticorin, India • Worldwide Remote</p>
      </div>
    </footer>
  );
}
