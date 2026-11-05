"use client";

import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
          (entry.target as HTMLElement).style.opacity = "1";
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".glass-card").forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top Progress Bar (Simulated) */}
      <div className="fixed top-0 left-0 h-[3px] bg-gradient-brand z-50 w-full opacity-90"></div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-40 glass-card border-b-0 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="font-logo font-normal text-4xl tracking-wide text-brand-light flex items-center gap-2">
            Belintan
          </a>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-brand-muted">
            <a href="#about" className="hover:text-brand-mint transition-colors">About</a>
            <a href="#work" className="hover:text-brand-mint transition-colors">Projects</a>
            <a href="#skills" className="hover:text-brand-mint transition-colors">Skills</a>
            <a href="#contact" className="hover:text-brand-mint transition-colors">Contact</a>
          </div>
          <a href="mailto:belintan07@gmail.com" className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-brand-dark bg-brand-mint rounded-full hover:bg-brand-sky transition-colors">
            Let's Talk
          </a>
          <button className="md:hidden text-brand-light">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-mint/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-brand-mint mb-6 border border-brand-mint/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-mint"></span>
              </span>
              Available for freelance work
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Building <span className="text-transparent bg-clip-text bg-gradient-brand">Exceptional</span><br />
              Digital Experiences.
            </h1>

            <p className="text-lg text-brand-muted max-w-xl mb-10 leading-relaxed font-light">
              I'm Belintan, an MBA Graduate & Certified Frontend Developer specializing in high-performance, AI-powered web solutions that elevate your brand and drive business growth.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#work" className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-mint text-brand-dark rounded-full font-semibold hover:bg-white transition-all transform hover:scale-105">
                View Projects
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-12 h-12 rounded-full glass-card hover:border-brand-mint transition-colors text-brand-light">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Tech Stack Orbit Simulation */}
              <div className="absolute inset-0 border border-brand-surface rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-8 border border-brand-surface rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

              {/* Profile / Graphic */}
              <div className="absolute inset-12 rounded-full p-1.5 bg-gradient-brand shadow-[0_0_40px_rgba(52,211,153,0.4)] flex items-center justify-center transition-all duration-500 hover:shadow-[0_0_80px_rgba(56,189,248,0.8)] hover:scale-105 group cursor-pointer z-10">
                <img src="/images/profile.jpg" alt="Belintan" className="w-full h-full object-cover rounded-full border-4 border-brand-dark transition-all duration-500 group-hover:scale-105" />
              </div>

              {/* Floating Icons */}
              <div className="absolute top-10 left-10 glass-card p-3 rounded-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <svg className="w-8 h-8 text-brand-sky" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22.61l-10-5.61v-10l10-5.61 10 5.61v10l-10 5.61zm-8-14.47v8.8l8 4.49 8-4.49v-8.8l-8-4.49-8 4.49z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-light mb-4">Featured Work</h2>
              <p className="text-brand-muted max-w-xl">A selection of recent projects focused on AI integration and premium frontend architecture.</p>
            </div>
            <a href="#" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-brand-mint hover:text-white transition-colors font-medium">
              View all projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:border-brand-mint/50 transition-all duration-500 hover:-translate-y-2">
              <div className="w-full h-64 rounded-xl bg-brand-surface overflow-hidden relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60 z-10"></div>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" alt="Dashboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">Next.js</span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">AI APIs</span>
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-brand-mint transition-colors">AI Support Agent</h3>
              <p className="text-brand-muted text-sm mb-4 line-clamp-2">An intelligent customer support dashboard integrating advanced LLMs to automate tier-1 support queries for tech startups.</p>
            </div>

            {/* Project 2 */}
            <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:border-brand-sky/50 transition-all duration-500 hover:-translate-y-2">
              <div className="w-full h-64 rounded-xl bg-brand-surface overflow-hidden relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60 z-10"></div>
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" alt="E-Commerce" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">React</span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">Tailwind</span>
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-brand-sky transition-colors">E-Commerce Platform</h3>
              <p className="text-brand-muted text-sm mb-4 line-clamp-2">A high-performance storefront designed for conversion, featuring lightning-fast load times and seamless checkout flows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-sky/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">Tech Arsenal</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Python', 'AI APIs', 'Git', 'Figma'].map((skill, i) => (
              <div key={skill} className="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                <div className={`font-display font-semibold ${
                  i % 3 === 0 ? 'text-brand-mint' : i % 3 === 1 ? 'text-brand-sky' : 'text-brand-purple'
                }`}>{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer id="contact" className="pt-24 pb-12 border-t border-white/5 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">Let's build something <span className="text-brand-mint">extraordinary.</span></h2>
          <p className="text-brand-muted text-lg mb-10 max-w-2xl mx-auto">Open for freelance opportunities. If you want to build a modern web app or discuss an idea, my inbox is always open.</p>
          
          <a href="mailto:belintan07@gmail.com" className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-brand-dark bg-brand-light rounded-full hover:bg-brand-mint transition-colors">
            Say Hello
          </a>

          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-brand-muted">
            <p>&copy; 2026 Belintan. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-brand-light transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-brand-light transition-colors">GitHub</a>
              <a href="#" className="hover:text-brand-light transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
