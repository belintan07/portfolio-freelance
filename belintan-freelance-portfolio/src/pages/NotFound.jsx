import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: '404 - Page Not Found | ProfileBelintan.com',
    description: 'The requested page could not be located on ProfileBelintan.com. Return to homepage or browse active services and projects.',
    canonical: 'https://ProfileBelintan.com/404',
  });

  return (
    <div className="min-h-screen bg-[#0d0e12] text-[#eae7e1] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-5 pt-36 pb-20">
        <div className="max-w-2xl w-full text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#d4a373] mb-6">
            <span>HTTP STATUS: 404 NOT FOUND</span>
          </div>

          <div className="text-7xl sm:text-8xl font-black font-mono tracking-tight text-white mb-4">
            404
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The page you are searching for does not exist on ProfileBelintan.com
          </h1>

          <p className="mt-3 text-sm text-[#9d978a] max-w-md mx-auto leading-relaxed">
            The link you clicked may be broken or moved. Explore our core services or return to the main dashboard.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <Link
              to="/services"
              className="p-4 rounded-xl bg-[#13141b] border border-white/10 hover:border-[#3b66f5] transition-colors"
            >
              <span className="text-xs font-bold text-white block">Services</span>
              <span className="text-[11px] text-[#8e887d]">Web, Node, AI</span>
            </Link>

            <Link
              to="/work"
              className="p-4 rounded-xl bg-[#13141b] border border-white/10 hover:border-[#3b66f5] transition-colors"
            >
              <span className="text-xs font-bold text-white block">Portfolio</span>
              <span className="text-[11px] text-[#8e887d]">Case Studies</span>
            </Link>

            <Link
              to="/pricing"
              className="p-4 rounded-xl bg-[#13141b] border border-white/10 hover:border-[#3b66f5] transition-colors"
            >
              <span className="text-xs font-bold text-white block">Pricing</span>
              <span className="text-[11px] text-[#8e887d]">Estimator</span>
            </Link>

            <Link
              to="/contact"
              className="p-4 rounded-xl bg-[#13141b] border border-white/10 hover:border-[#3b66f5] transition-colors"
            >
              <span className="text-xs font-bold text-white block">Contact</span>
              <span className="text-[11px] text-[#8e887d]">Start a Project</span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-[#3b66f5] hover:bg-[#2f55e0] text-white text-xs font-semibold tracking-wide transition-colors"
            >
              Back to Homepage
            </Link>
            <a
              href="https://wa.me/918610662871?text=Hi%20Belintan,%20I'm%20looking%20for%20a%20page%20on%20ProfileBelintan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Report Broken Link on WhatsApp
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
