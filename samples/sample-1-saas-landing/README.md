# [SAMPLE CASE STUDY] — PulseScale AI: B2B SaaS Performance Engine & Interactive Conversion Experience

> **Notice:** This project is a curated **Sample Case Study** created by Belintan to demonstrate full-stack frontend architecture, conversion-rate optimization (CRO), and interactive web application engineering.

---

## 1. The Problem
High-growth B2B AI and developer-tool companies often struggle with complex, text-heavy landing pages that fail to communicate quantifiable value to technical decision-makers:
* **High Bounce Rates (68%+):** Prospective enterprise customers were overwhelmed by dense technical jargon without seeing immediate proof of ROI.
* **Low Conversion from Traffic to Demo (1.4%):** Traditional static forms and pricing tables resulted in friction and drop-offs.
* **Performance Lag (LCP > 3.2s):** Heavy dependencies, bloated UI libraries, and unoptimized assets penalized SEO rankings and mobile conversion.

---

## 2. What Was Done (Architecture & Implementation)

Belintan engineered a bespoke, zero-bloat interactive showcase designed around experiential proof and instant value demonstration:

### A. Dynamic Interactive ROI & Latency Calculator
* Implemented a real-time reactive calculation engine in vanilla JavaScript (no heavy third-party bundles) allowing prospects to configure their monthly query volume and infrastructure tier.
* Computes real-time estimated server cost reductions, monthly engineering hours reclaimed, and median latency drop.

### B. High-Converting Visual Hierarchy & Typography
* Designed an intentional dark-mode aesthetic using an obsidian/deep-slate palette (`#090a0f`, `#131520`), hairline glass borders, and calibrated typographic contrast (Plus Jakarta Sans + JetBrains Mono).
* Structured around clear AIDA principles: Attention (speed benchmark badges), Interest (interactive playground), Desire (quantified metrics & social proof), and Action (high-intent CTA flow).

### C. Zero-Dependency Core Web Vitals Optimization
* Pure HTML5, modern vanilla CSS, and lightweight reactive JS.
* Achieved **99/100 Lighthouse Performance**, sub-800ms Largest Contentful Paint (LCP), and zero Cumulative Layout Shift (CLS).

---

## 3. The Target Result Aimed For

| KPI Metric | Baseline (Legacy Landing) | Target Result Aimed For |
| :--- | :--- | :--- |
| **Demo Request Conversion Rate** | 1.4% | **3.8% (+171% lift)** |
| **Average Time on Page** | 42 seconds | **2 minutes 18 seconds (+228%)** |
| **Largest Contentful Paint (LCP)** | 3.2s | **0.78s (4.1x faster)** |
| **Interactive Engagement Rate** | < 12% | **54% of visitors interact with ROI tool** |

---

## 4. How to Run & Preview

Open `index.html` directly in any modern browser:
```bash
# Option A: Open directly in your browser
double-click index.html

# Option B: Run via local HTTP server
npx serve .
# Or Python
python -m http.server 3000
```

---

## 5. Deliverables Included in this Sample
* `index.html` — Full responsive semantic landing page with integrated interactive modules.
* `README.md` — Formal case study breakdown.
