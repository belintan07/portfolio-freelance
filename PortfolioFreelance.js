< !DOCTYPE html >
    <html lang="en" class="scroll-smooth">
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Belintan - Full-Stack Web Developer | AI-Powered Solutions</title>

                    <!-- Fonts: Inter & Space Grotesk -->
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
                                <script src="https://cdn.tailwindcss.com"></script>

                                <script>
                                    tailwind.config = {
                                        theme: {
                                        extend: {
                                        fontFamily: {
                                        sans: ['Inter', 'sans-serif'],
                                    display: ['Space Grotesk', 'sans-serif'],
                    },
                                    colors: {
                                        brand: {
                                        dark: '#0A0A1A',
                                    surface: '#12122A',
                                    mint: '#34D399',
                                    sky: '#38BDF8',
                                    purple: '#818CF8',
                                    light: '#F0F0FF',
                                    muted: '#6868A0'
                        }
                    },
                                    backgroundImage: {
                                        'gradient-brand': 'linear-gradient(135deg, #34D399 0%, #38BDF8 50%, #818CF8 100%)',
                    },
                                    animation: {
                                        'fade-in': 'fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                                    'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    },
                                    keyframes: {
                                        fadeIn: {
                                        '0%': {opacity: '0', filter: 'blur(10px)' },
                                    '100%': {opacity: '1', filter: 'blur(0)' },
                        },
                                    slideUp: {
                                        '0%': {opacity: '0', transform: 'translateY(40px)' },
                                    '100%': {opacity: '1', transform: 'translateY(0)' },
                        }
                    }
                }
            }
        }
                                </script>

                                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
                                <style>
                                    .sidebar {
                                        position: fixed;
                                        top: 0;
                                        left: 0;
                                        width: 260px;
                                        height: 100%;
                                        background: rgba(18, 18, 42, 0.8);
                                        backdrop-filter: blur(12px);
                                        border-right: 1px solid rgba(255, 255, 255, 0.05);
                                        transition: transform 0.4s, width 0.4s;
                                        z-index: 60;
                                    }
                                    .sidebar-header {
                                        display: flex;
                                        align-items: center;
                                        height: 72px;
                                        padding: 0 1.25rem 0 0;
                                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                                    }
                                    .sidebar .sidebar-header button {
                                        width: 64px;
                                        background: transparent;
                                        border: 0;
                                        color: #F0F0FF;
                                        cursor: pointer;
                                    }
                                    .sidebar-header span {
                                        font-family: 'Space Grotesk', sans-serif;
                                        font-size: 24px;
                                        font-weight: 700;
                                        color: #34D399;
                                    }
                                    .sidebar button.nav-btn {
                                        position: relative;
                                        display: flex;
                                        gap: 16px;
                                        align-items: center;
                                        height: 50px;
                                        width: 100%;
                                        background: transparent;
                                        border: 0;
                                        font-family: inherit;
                                        font-size: 16px;
                                        padding: 0 25px;
                                        color: #A0A0C0;
                                        cursor: pointer;
                                        transition: 0.3s;
                                    }
                                    .sidebar button.nav-btn:hover {
                                        color: #F0F0FF;
                                        background: rgba(255, 255, 255, 0.05);
                                    }
                                    .sidebar button.nav-btn.active {
                                        background: rgba(52, 211, 153, 0.1);
                                        color: #34D399;
                                        border-right: 3px solid #34D399;
                                    }
                                    .sidebar button.nav-btn span:nth-child(2) {
                                        flex: 1 1 auto;
                                        text-align: left;
                                    }
                                    .main-content {
                                        margin-left: 260px;
                                        width: calc(100% - 260px);
                                        transition: margin 0.4s, width 0.4s;
                                    }
                                    @media (max-width: 768px) {
                                        .sidebar {
                                            transform: translateX(-100%);
                                        }
                                        .sidebar.open {
                                            transform: translateX(0);
                                        }
                                        .main-content {
                                            margin-left: 0;
                                            width: 100%;
                                        }
                                    }

                                    body {
                                        background - color: #0A0A1A;
                                    color: #F0F0FF;
                                    overflow-x: hidden;
        }

                                    /* Noise Texture Overlay */
                                    body::after {
                                        content: '';
                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    pointer-events: none;
                                    z-index: 9999;
                                    opacity: 0.03;
                                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

                                    /* Custom Scrollbar */
                                    ::-webkit-scrollbar {width: 8px; }
                                    ::-webkit-scrollbar-track {background: #12122A; }
                                    ::-webkit-scrollbar-thumb {background: #34D399; border-radius: 4px; }
                                    ::-webkit-scrollbar-thumb:hover {background: #6EE7B7; }

                                    ::selection {background: #34D399; color: #0A0A1A; }

                                    /* Glassmorphism */
                                    .glass-card {
                                        background: rgba(18, 18, 42, 0.6);
                                    backdrop-filter: blur(12px);
                                    -webkit-backdrop-filter: blur(12px);
                                    border: 1px solid rgba(255, 255, 255, 0.05);
        }

                                    .hide-scrollbar::-webkit-scrollbar {display: none; }
                                    .hide-scrollbar {-ms - overflow - style: none; scrollbar-width: none; }
                                </style>
                            </head>
                            <body class="antialiased font-sans relative">

                                <!-- Sidebar -->
                                <aside class="sidebar" id="app-sidebar">
                                    <header class="sidebar-header">
                                        <button type="button" onclick="document.getElementById('app-sidebar').classList.toggle('open')">
                                            <span class="material-symbols-outlined">menu</span>
                                        </button>
                                        <span>Belintan.</span>
                                    </header>
                                    <div class="mt-4">
                                        <button class="nav-btn active" onclick="navigate(this, '#')">
                                            <span class="material-symbols-outlined">home</span>
                                            <span>Home</span>
                                        </button>
                                        <button class="nav-btn" onclick="navigate(this, '#work')">
                                            <span class="material-symbols-outlined">inventory_2</span>
                                            <span>Projects</span>
                                        </button>
                                        <button class="nav-btn" onclick="navigate(this, '#skills')">
                                            <span class="material-symbols-outlined">star</span>
                                            <span>Skills</span>
                                        </button>
                                        <button class="nav-btn" onclick="navigate(this, '#contact')">
                                            <span class="material-symbols-outlined">mail</span>
                                            <span>Contact</span>
                                        </button>
                                    </div>
                                </aside>

                                <div class="main-content">
                                <!-- Top Progress Bar (Simulated) -->
                                <div class="fixed top-0 left-0 h-[3px] bg-gradient-brand z-50 w-full opacity-90"></div>

                                <!-- Mobile Navbar -->
                                <nav class="md:hidden fixed top-0 left-0 w-full z-40 glass-card border-b-0 py-4 transition-all duration-300">
                                    <div class="px-6 flex items-center justify-between">
                                        <a href="#" class="font-display font-bold text-2xl tracking-tighter text-brand-light">Belintan<span class="text-brand-mint">.</span></a>
                                        <button class="text-brand-light" onclick="document.getElementById('app-sidebar').classList.toggle('open')">
                                            <span class="material-symbols-outlined">menu</span>
                                        </button>
                                    </div>
                                </nav>

                                <!-- Hero Section -->
                                <section class="relative min-h-screen flex items-center pt-20 overflow-hidden">
                                    <!-- Ambient Glow -->
                                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[120px] pointer-events-none"></div>
                                    <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-mint/10 rounded-full blur-[100px] pointer-events-none"></div>

                                    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                                        <div class="flex flex-col items-start animate-fade-in">
                                            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-brand-mint mb-6 border border-brand-mint/20">
                                                <span class="relative flex h-2 w-2">
                                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
                                                    <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-mint"></span>
                                                </span>
                                                Available for freelance work
                                            </div>

                                            <h1 class="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
                                                Building <span class="text-transparent bg-clip-text bg-gradient-brand">Exceptional</span><br>
                                                    Digital Experiences.
                                            </h1>

                                            <p class="text-lg text-brand-muted max-w-xl mb-10 leading-relaxed font-light">
                                                I'm Belintan, an MBA Graduate & Certified Frontend Developer specializing in high-performance, AI-powered web solutions that elevate your brand and drive business growth.
                                            </p>

                                            <div class="flex flex-wrap items-center gap-4">
                                                <a href="#work" class="inline-flex items-center justify-center px-8 py-3.5 bg-brand-mint text-brand-dark rounded-full font-semibold hover:bg-white transition-all transform hover:scale-105">
                                                    View Projects
                                                </a>
                                                <a href="https://github.com" target="_blank" class="inline-flex items-center justify-center w-12 h-12 rounded-full glass-card hover:border-brand-mint transition-colors text-brand-light">
                                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                </a>
                                            </div>
                                        </div>

                                        <div class="relative hidden lg:block animate-fade-in" style="animation-delay: 0.2s">
                                            <div class="relative w-full aspect-square max-w-md mx-auto">
                                                <!-- Tech Stack Orbit Simulation -->
                                                <div class="absolute inset-0 border border-brand-surface rounded-full animate-[spin_20s_linear_infinite]"></div>
                                                <div class="absolute inset-8 border border-brand-surface rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                                                <!-- Profile / Graphic -->
                                                <div class="absolute inset-12 rounded-full p-1.5 bg-gradient-brand shadow-[0_0_40px_rgba(52,211,153,0.4)] flex items-center justify-center transition-all duration-500 hover:shadow-[0_0_80px_rgba(56,189,248,0.8)] hover:scale-105 group cursor-pointer z-10">
                                                    <img src="./images/profile.jpg" alt="Belintan" class="w-full h-full object-cover rounded-full border-4 border-brand-dark transition-all duration-500 group-hover:scale-105">
                                                </div>

                                                <!-- Floating Icons (React, Next, JS, etc) -->
                                                <div class="absolute top-10 left-10 glass-card p-3 rounded-xl animate-bounce" style="animation-duration: 3s;">
                                                    <svg class="w-8 h-8 text-brand-sky" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22.61l-10-5.61v-10l10-5.61 10 5.61v10l-10 5.61zm-8-14.47v8.8l8 4.49 8-4.49v-8.8l-8-4.49-8 4.49z" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>

                                <!-- Projects Section -->
                                <section id="work" class="py-24 relative">
                                    <div class="max-w-7xl mx-auto px-6 lg:px-8">
                                        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16">
                                            <div>
                                                <h2 class="font-display text-4xl md:text-5xl font-bold text-brand-light mb-4">Featured Work</h2>
                                                <p class="text-brand-muted max-w-xl">A selection of recent projects focused on AI integration and premium frontend architecture.</p>
                                            </div>
                                            <a href="#" class="mt-6 md:mt-0 inline-flex items-center gap-2 text-brand-mint hover:text-white transition-colors font-medium">
                                                View all projects
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                            </a>
                                        </div>

                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <!-- Project 1 -->
                                            <div class="glass-card rounded-2xl p-6 group cursor-pointer hover:border-brand-mint/50 transition-all duration-500 hover:-translate-y-2">
                                                <div class="w-full h-64 rounded-xl bg-brand-surface overflow-hidden relative mb-6">
                                                    <div class="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60 z-10"></div>
                                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" alt="Dashboard" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                                                        <div class="absolute bottom-4 left-4 z-20 flex gap-2">
                                                            <span class="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">Next.js</span>
                                                            <span class="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">AI APIs</span>
                                                        </div>
                                                </div>
                                                <h3 class="font-display text-2xl font-bold mb-2 group-hover:text-brand-mint transition-colors">AI Support Agent</h3>
                                                <p class="text-brand-muted text-sm mb-4 line-clamp-2">An intelligent customer support dashboard integrating advanced LLMs to automate tier-1 support queries for tech startups.</p>
                                            </div>

                                            <!-- Project 2 -->
                                            <div class="glass-card rounded-2xl p-6 group cursor-pointer hover:border-brand-sky/50 transition-all duration-500 hover:-translate-y-2">
                                                <div class="w-full h-64 rounded-xl bg-brand-surface overflow-hidden relative mb-6">
                                                    <div class="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-60 z-10"></div>
                                                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" alt="E-Commerce" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                                                        <div class="absolute bottom-4 left-4 z-20 flex gap-2">
                                                            <span class="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">React</span>
                                                            <span class="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">Tailwind</span>
                                                        </div>
                                                </div>
                                                <h3 class="font-display text-2xl font-bold mb-2 group-hover:text-brand-sky transition-colors">E-Commerce Platform</h3>
                                                <p class="text-brand-muted text-sm mb-4 line-clamp-2">A high-performance storefront designed for conversion, featuring lightning-fast load times and seamless checkout flows.</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <!-- Skills Section -->
                                <section id="skills" class="py-24 relative overflow-hidden">
                                    <div class="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-sky/10 rounded-full blur-[100px] pointer-events-none"></div>
                                    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                                        <h2 class="font-display text-4xl md:text-5xl font-bold text-center mb-16">Tech Arsenal</h2>

                                        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                            <!-- Skill items -->
                                            <div class="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                                                <div class="text-brand-mint font-display font-semibold">JavaScript</div>
                                            </div>
                                            <div class="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                                                <div class="text-brand-sky font-display font-semibold">React</div>
                                            </div>
                                            <div class="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                                                <div class="text-brand-purple font-display font-semibold">Next.js</div>
                                            </div>
                                            <div class="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                                                <div class="text-brand-light font-display font-semibold">Tailwind CSS</div>
                                            </div>
                                            <div class="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                                                <div class="text-brand-mint font-display font-semibold">TypeScript</div>
                                            </div>
                                            <div class="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                                                <div class="text-brand-light font-display font-semibold">Node.js</div>
                                            </div>
                                            <div class="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                                                <div class="text-brand-sky font-display font-semibold">Python</div>
                                            </div>
                                            <div class="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                                                <div class="text-brand-purple font-display font-semibold">AI APIs</div>
                                            </div>
                                            <div class="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                                                <div class="text-brand-mint font-display font-semibold">Git</div>
                                            </div>
                                            <div class="glass-card p-6 rounded-xl text-center hover:bg-brand-surface transition-colors border border-white/5 hover:border-brand-mint/30">
                                                <div class="text-brand-light font-display font-semibold">Figma</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <!-- Footer / CTA -->
                                <footer id="contact" class="pt-24 pb-12 border-t border-white/5 mt-12">
                                    <div class="max-w-4xl mx-auto px-6 text-center">
                                        <h2 class="font-display text-4xl md:text-6xl font-bold mb-6">Let's build something <span class="text-brand-mint">extraordinary.</span></h2>
                                        <p class="text-brand-muted text-lg mb-10 max-w-2xl mx-auto">Open for freelance opportunities. If you want to build a modern web app or discuss an idea, my inbox is always open.</p>

                                        <a href="mailto:belintan07@gmail.com" class="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-brand-dark bg-brand-light rounded-full hover:bg-brand-mint transition-colors">
                                            Say Hello
                                        </a>

                                        <div class="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-brand-muted">
                                            <p>&copy; 2026 Belintan. All rights reserved.</p>
                                            <div class="flex space-x-6 mt-4 md:mt-0">
                                                <a href="#" class="hover:text-brand-light transition-colors">LinkedIn</a>
                                                <a href="#" class="hover:text-brand-light transition-colors">GitHub</a>
                                                <a href="#" class="hover:text-brand-light transition-colors">Twitter</a>
                                            </div>
                                        </div>
                                    </div>
                                </footer>

                                <!-- Intersection Observer for Scroll Animations -->
                                <script>
                                    const observerOptions = {root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries, observer) => {
                                        entries.forEach(entry => {
                                            if (entry.isIntersecting) {
                                                entry.target.classList.add('animate-slide-up');
                                                entry.target.style.opacity = '1';
                                                observer.unobserve(entry.target);
                                            }
                                        });
        }, observerOptions);

        document.querySelectorAll('.glass-card').forEach(el => {
                                        el.style.opacity = '0';
                                    observer.observe(el);
        });
                                </script>
                                <script>
                                    function navigate(btn, target) {
                                        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                                        btn.classList.add('active');
                                        window.location.hash = target;
                                        if (window.innerWidth <= 768) {
                                            document.getElementById('app-sidebar').classList.remove('open');
                                        }
                                    }
                                </script>
                                </div>
                            </body>
                        </html>
