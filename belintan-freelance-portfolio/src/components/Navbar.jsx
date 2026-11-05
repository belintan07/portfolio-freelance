import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/work' },
    { label: 'Video Editing', path: '/services', dot: true },
    { label: 'Estimator', path: '/#estimator', isAnchor: true },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/#hero', isAnchor: true },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <nav className="rounded-full px-5 py-3 flex items-center justify-between apple-glass transition-all shadow-[0_10px_35px_rgba(0,0,0,0.6)]">

        {/* Brand Logo - Fully Clickable */}
        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer" aria-label="Belintan Home">
          <div className="w-8 h-8 rounded-full bg-[#ff7a1a] flex items-center justify-center font-extrabold text-[#0a0703] text-sm shadow-[0_0_14px_rgba(255,122,26,0.6)] group-hover:scale-105 transition-transform">
            B
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-white text-sm leading-none">
              BELINTAN
            </span>
            <span className="text-[9px] tracking-wider text-[#ff913d] font-mono leading-tight mt-0.5">
              ProfileBelintan.com
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Clean Slugs */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-semibold tracking-wide">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.path}
                className="transition-colors px-2.5 py-1 rounded-lg text-[#b8b2a7] hover:text-white flex items-center gap-1.5"
              >
                {link.dot && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                )}
                <span>{link.label}</span>
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className={`transition-colors px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${isActive(link.path)
                    ? 'text-white bg-white/10 font-bold'
                    : 'text-[#b8b2a7] hover:text-white'
                  }`}
              >
                {link.dot && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                )}
                <span>{link.label}</span>
              </Link>
            )
          ))}
        </div>

        {/* Action CTAs + Live Clock Chip (Inspired by Rishi Thakor) */}
        <div className="flex items-center gap-2.5">
          {/* Live IST Local Time Clock */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#b5afa4]" title="Local Time in Tuticorin (IST)">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-white font-bold">{timeStr || '9:41 AM'}</span>
            <span className="text-[#6e6960]">•</span>
            <span>{dateStr || '3 Nov'}</span>
          </div>

          <a
            href="https://github.com/belintan07"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c2bcb2] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="GitHub Profile"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          <a
            href="https://linkedin.com/in/belintanben"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c2bcb2] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          <a
            href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20hire%20you%20for%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#ff7a1a] to-[#ff913d] text-[#0a0703] text-xs font-extrabold tracking-wider uppercase shadow-[0_4px_20px_rgba(255,122,26,0.45)] hover:shadow-[0_6px_25px_rgba(255,122,26,0.65)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>HIRE ME</span>
            <span className="text-sm font-black">&rarr;</span>
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-3xl bg-[#0c0d13]/98 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a
                key={link.label}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-between text-[#b8b2a7] hover:text-white hover:bg-white/5"
              >
                <div className="flex items-center gap-2">
                  {link.dot && (
                    <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]"></span>
                  )}
                  <span>{link.label}</span>
                </div>
                <span className="text-xs text-[#9d978a]">&rarr;</span>
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-2xl text-sm font-semibold transition-colors flex items-center justify-between ${isActive(link.path)
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-[#b8b2a7] hover:text-white hover:bg-white/5'
                  }`}
              >
                <div className="flex items-center gap-2">
                  {link.dot && (
                    <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]"></span>
                  )}
                  <span>{link.label}</span>
                </div>
                <span className="text-xs text-[#9d978a]">&rarr;</span>
              </Link>
            )
          ))}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-1">
            <a
              href="tel:+918610662871"
              className="py-2.5 text-center rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs hover:bg-white/10 transition-colors"
            >
              Call: +91 86106 62871
            </a>
            <a
              href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'd%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-center rounded-full bg-gradient-to-r from-[#ff7a1a] to-[#ff913d] text-[#0a0703] font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(255,122,26,0.45)] transition-colors"
            >
              WhatsApp Instant Quote &rarr;
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
