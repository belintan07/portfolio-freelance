import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

export default function PrivacyPolicyPage() {
  useSEO({
    title: 'Privacy Policy | ProfileBelintan.com',
    description: 'Privacy policy and client data handling practices for ProfileBelintan.com web development, content creation, and consulting services.',
    canonical: 'https://ProfileBelintan.com/privacy-policy',
  });

  return (
    <div className="min-h-screen bg-[#0e0f13] text-[#eae7e1] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-5 pt-36 pb-24 w-full">
        <div className="mb-10">
          <span className="text-xs font-mono text-[#d4a373] uppercase tracking-widest block mb-2">
            ( LEGAL &amp; COMPLIANCE )
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#9e988f] font-mono mt-2">
            Last Updated: November 2026 • Canonical Domain: https://ProfileBelintan.com
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#b5afa4] leading-relaxed border-t border-white/10 pt-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Overview</h2>
            <p>
              This Privacy Policy explains how Belintan ("I", "me", "my", or "ProfileBelintan.com") collects, uses, and safeguards information when you visit this website or contact me regarding freelance web development, Node.js engineering, Python AI pipelines, video editing & content creation, or US night shift consulting contracts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Information Collected</h2>
            <p className="mb-2">
              I only collect information you voluntarily provide through contact forms, email, or direct WhatsApp inquiries:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#dcd7ce]">
              <li>Contact details: Name, email address, phone number, and company name.</li>
              <li>Project specifications: Technical briefs, budget estimates, and architecture requirements.</li>
              <li>Standard technical logs: Anonymous browser telemetry, IP address, and page visit metrics via standard server logs for performance diagnostics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Use of Information</h2>
            <p>
              Your information is used strictly to communicate regarding your project scope, prepare formal proposals, execute agreed development milestones, and provide technical support. Your data is never sold, leased, or distributed to third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Client Confidentiality and NDAs</h2>
            <p>
              All proprietary business logic, trade secrets, database schemas, and intellectual property shared during our engagements are treated with strict confidentiality. Non-disclosure agreements (NDAs) are signed prior to reviewing private codebases or proprietary data upon request.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Third-Party Services</h2>
            <p>
              This site utilizes standard infrastructure services including Vercel, Node.js hosting, Google Fonts, and WhatsApp for direct communication. These services operate under their own independent privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">6. Contact and Data Requests</h2>
            <p>
              If you have questions regarding this policy or wish to request the deletion of any inquiry information, contact me directly:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white space-y-1">
              <div>Belintan • Full-Stack Software Engineer</div>
              <div>Email: <a href="mailto:belintan07@gmail.com" className="text-[#3b66f5] hover:underline">belintan07@gmail.com</a></div>
              <div>Phone / WhatsApp: <a href="tel:+918610662871" className="text-[#3b66f5] hover:underline">+91 86106 62871</a></div>
              <div>Tuticorin, Tamil Nadu, India</div>
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
