/**
 * Belintan Freelance Portfolio — Node.js Production Backend Server
 * Demonstrates high-performance Node.js architecture with zero external dependencies.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 5000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // ================= API ENDPOINTS =================
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');

    // 1. Freelancer Profile & Status
    if (pathname === '/api/freelancer' && req.method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'success',
        data: {
          name: 'Belintan',
          title: 'Full-Stack Freelance Software Engineer',
          education: 'MBA Graduate',
          location: 'Tuticorin, Tamil Nadu, India / Remote Worldwide',
          availability: 'OPEN_FOR_PROJECTS_AND_CONTRACTS',
          turnaroundHours: 24,
          stack: {
            frontend: ['React 19', 'Next.js', 'Tailwind CSS', 'Vite', 'TypeScript'],
            backend: ['Node.js', 'Express', 'Python', 'FastAPI', 'Java Spring Boot'],
            databases: ['PostgreSQL', 'MongoDB', 'Redis'],
            ai: ['OpenAI API', 'Gemini AI', 'Model Context Protocol (MCP / FastMCP)', 'LangChain', 'Automation Pipelines']
          },
          contact: {
            phone: '+91 86106 62871',
            whatsapp: '+91 86106 62871',
            email: 'belintan07@gmail.com',
            github: 'https://github.com/belintan07',
            linkedin: 'https://www.linkedin.com/in/belintanben'
          }
        }
      }));
      return;
    }

    // 2. Dynamic Estimate Calculator
    if (pathname === '/api/estimate' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const { projectType, features = [], speed = 'standard' } = JSON.parse(body || '{}');
          
          let basePrice = 4999;
          let baseDays = 4;
          if (projectType === 'business') { basePrice = 9999; baseDays = 8; }
          else if (projectType === 'webapp') { basePrice = 19999; baseDays = 14; }
          else if (projectType === 'ai') { basePrice = 14999; baseDays = 10; }
          else if (projectType === 'growth') { basePrice = 14999; baseDays = 14; }

          const featureCosts = {
            auth: 3500, payments: 4000, node_api: 5000,
            python_ai: 6000, mcp_server: 7500, admin: 4500, seo: 1500, mobile: 0,
            posters_10: 3500, videos_10: 5000, meta_ads: 4500, seo_offsite: 4000,
            api_integration: 5000
          };

          let addonPrice = features.reduce((acc, f) => acc + (featureCosts[f] || 0), 0);
          let totalInr = basePrice + addonPrice;
          let totalDays = baseDays + Math.round(features.length * 1.2);

          if (speed === 'express') {
            totalInr = Math.round(totalInr * 1.25);
            totalDays = Math.max(2, Math.round(totalDays * 0.6));
          }

          res.writeHead(200);
          res.end(JSON.stringify({
            status: 'success',
            estimate: {
              currency: 'INR',
              totalInr,
              totalUsd: Math.round(totalInr / 85),
              estimatedDays: totalDays,
              recommendedPlan: totalInr < 8000 ? 'Starter Landing Page' : (totalInr < 18000 ? 'Business Platform' : 'Full-Stack & AI Suite')
            }
          }));
        } catch {
          res.writeHead(400);
          res.end(JSON.stringify({ status: 'error', message: 'Invalid JSON payload' }));
        }
      });
      return;
    }

    // 3. Contact Lead Submission
    if (pathname === '/api/contact' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const lead = JSON.parse(body || '{}');
          console.log(`[LEAD RECEIVED] ${new Date().toISOString()} from ${lead.name} (${lead.contact})`);
          res.writeHead(200);
          res.end(JSON.stringify({
            status: 'success',
            message: 'Inquiry received. Belintan will reply within 24 hours.',
            leadId: `LEAD-${Date.now().toString(36).toUpperCase()}`
          }));
        } catch {
          res.writeHead(400);
          res.end(JSON.stringify({ status: 'error', message: 'Invalid JSON format' }));
        }
      });
      return;
    }

    // 4. Health Check
    if (pathname === '/api/health') {
      res.writeHead(200);
      res.end(JSON.stringify({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() }));
      return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ status: 'error', message: 'Endpoint not found' }));
    return;
  }

  // ================= STATIC ASSET SERVING =================
  let filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);
  
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for SPA routing
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Belintan Freelance Portfolio Node.js Server running at http://localhost:${PORT}`);
  console.log(`📡 API Endpoints: http://localhost:${PORT}/api/freelancer | http://localhost:${PORT}/api/health`);
});
