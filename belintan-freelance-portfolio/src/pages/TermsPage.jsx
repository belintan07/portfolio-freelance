import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

export default function TermsPage() {
  useSEO({
    title: 'Terms & Conditions | Belintan Freelance',
    description: 'Terms and conditions governing freelance software development contracts, milestone deliverables, and code ownership with Belintan.',
    canonical: 'https://ProfileBelintan.com/terms',
  });

  return (
    <div className="min-h-screen bg-[#0e0f13] text-[#eae7e1] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-5 pt-36 pb-24 w-full">
        <div className="mb-10">
          <span className="text-xs font-mono text-[#d4a373] uppercase tracking-widest block mb-2">
            ( LEGAL &amp; AGREEMENTS )
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-[#9e988f] font-mono mt-2">
            Last Updated: November 2026 • Canonical Domain: https://ProfileBelintan.com
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#b5afa4] leading-relaxed border-t border-white/10 pt-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Scope of Engagement</h2>
            <p>
              These Terms and Conditions govern all freelance software development, web engineering, backend architecture, Python AI scripting, and retainer contracts executed between the client ("Client") and Belintan ("Developer"). Each project is initiated through an agreed scope of work, timeline, and milestone structure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Milestone Delivery and Approvals</h2>
            <p>
              Projects proceed through clear, documented phases. Work is submitted to the Client on staging environments or staging branches for review. The Client provides feedback within 3 to 5 business days. Once a milestone is signed off, the next development sprint commences.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Intellectual Property and Source Code Handover</h2>
            <p>
              Upon 100% completion of agreed payments, 100% full intellectual property rights and full source code ownership are transferred to the Client. The Client receives complete Git repository transfers, configuration files, and documentation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Payment Terms</h2>
            <p className="mb-2">
              Payment schedules are structured by project tier:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#dcd7ce]">
              <li>Fixed Projects: Typically 50% upfront deposit to secure the sprint slot, and 50% upon final production sign-off.</li>
              <li>Dedicated Engineering Retainers: Invoiced bi-weekly or monthly in advance for reserved hours.</li>
              <li>Accepted channels: Direct Bank Wire (NEFT/IMPS/SWIFT), Wise, Stripe, or UPI for domestic Indian clients.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Warranty and Bug Support</h2>
            <p>
              Every delivered project includes a standard 14 to 30 day warranty period post-deployment to address any functional discrepancies or bugs within the original project scope at zero additional cost.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">6. Inquiries and Formal Contracts</h2>
            <p>
              To request formal contracts, Master Service Agreements (MSAs), or custom enterprise terms, reach out directly:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white space-y-1">
              <div>Belintan • Full-Stack Software Engineer</div>
              <div>Email: <a href="mailto:belintan07@gmail.com" className="text-[#3b66f5] hover:underline">belintan07@gmail.com</a></div>
              <div>Phone / WhatsApp: <a href="tel:+918610662871" className="text-[#3b66f5] hover:underline">+91 86106 62871</a></div>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10">
          <Link to="/" className="text-xs text-[#d4a373] hover:text-white transition-colors">
            &larr; Return to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
