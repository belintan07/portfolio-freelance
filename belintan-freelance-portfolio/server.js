/**
 * Belintan Freelance Portfolio — Production Backend & Telephony Service
 * Powers Doocti WebRTC Softphone, Google Gemini AI Studio,
 * WhatsApp Cloud API Webhooks, Dynamic Quoting, and MCP Tooling.
 * 
 * Canonical URL: https://ProfileBelintan.com/
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Modular Subsystems
import { db } from './server/db.js';
import { setupTelephonyServer } from './server/telephony.js';
import { handleAiStream } from './server/ai.js';
import { whatsapp } from './server/whatsapp.js';
import { MCP_TOOLS, executeMcpTool } from './server/mcp.js';

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
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // ================= API ENDPOINTS =================
  if (pathname.startsWith('/api/')) {
    
    // 1. Google Gemini AI Streaming Gateway (SSE)
    if (pathname === '/api/ai/stream' && req.method === 'POST') {
      return handleAiStream(req, res);
    }

    // 2. WhatsApp Business Cloud API Webhooks
    if (pathname === '/api/whatsapp/webhook') {
      if (req.method === 'GET') {
        return whatsapp.verifyWebhook(parsedUrl, res);
      }
      if (req.method === 'POST') {
        return whatsapp.handleInboundMessage(req, res);
      }
    }

    // JSON API Response Helper
    const sendJson = (statusCode, data) => {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    };

    // 3. Health & System Diagnostic
    if (pathname === '/api/health' && req.method === 'GET') {
      return sendJson(200, {
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: Date.now(),
        environment: process.env.NODE_ENV || 'production',
        services: {
          webrtc_telephony: 'ACTIVE',
          gemini_ai_stream: 'ACTIVE',
          whatsapp_webhook: 'ACTIVE',
          persistence_store: 'ACTIVE'
        }
      });
    }

    // 4. Freelancer Profile & Status
    if (pathname === '/api/freelancer' && req.method === 'GET') {
      return sendJson(200, {
        status: 'success',
        data: {
          name: 'Belintan',
          title: 'Full-Stack Freelance Software Engineer',
          education: 'MBA Graduate',
          location: 'Tuticorin, Tamil Nadu, India / Remote Worldwide',
          canonicalUrl: 'https://ProfileBelintan.com/',
          availability: 'OPEN_FOR_PROJECTS_AND_CONTRACTS',
          turnaroundHours: 24,
          stack: {
            frontend: ['React 19', 'Next.js', 'Tailwind CSS', 'Vite', 'TypeScript'],
            backend: ['Node.js', 'Express', 'Python', 'FastAPI', 'Java Spring Boot'],
            databases: ['PostgreSQL', 'MongoDB', 'Redis'],
            telephony: ['Doocti Cloud WebRTC', 'SIP Gateway', 'WebSocket'],
            ai: ['Google Gemini 2.5 Pro', 'OpenAI', 'Model Context Protocol (FastMCP)', 'LangChain'],
            creative: ['Cinematic Video Editing (Premiere/DaVinci)', 'Wedding Album Color Grading', 'Model Photo Retouching']
          },
          contact: {
            phone: '+91 86106 62871',
            whatsapp: '+91 86106 62871',
            email: 'belintan07@gmail.com',
            github: 'https://github.com/belintan07',
            linkedin: 'https://www.linkedin.com/in/belintanben'
          }
        }
      });
    }

    // 5. Dynamic Estimate Calculator & Persistence
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
          else if (projectType === 'creative') { basePrice = 7999; baseDays = 5; }

          const featureCosts = {
            auth: 3500, payments: 4000, node_api: 5000,
            python_ai: 6000, mcp_server: 7500, admin: 4500, seo: 1500, mobile: 0,
            posters_10: 3500, videos_10: 5000, meta_ads: 4500, seo_offsite: 4000,
            api_integration: 5000
          };

          const addonPrice = features.reduce((acc, f) => acc + (featureCosts[f] || 0), 0);
          let totalInr = basePrice + addonPrice;
          let totalDays = baseDays + Math.round(features.length * 1.2);

          if (speed === 'express') {
            totalInr = Math.round(totalInr * 1.25);
            totalDays = Math.max(2, Math.round(totalDays * 0.6));
          }

          const estimateRecord = db.createEstimate({
            projectType,
            features,
            speed,
            totalInr,
            totalUsd: Math.round(totalInr / 85),
            estimatedDays: totalDays,
            recommendedPlan: totalInr < 10000 ? 'Starter' : (totalInr < 25000 ? 'Business Platform' : 'Full-Stack & AI Suite')
          });

          return sendJson(200, {
            status: 'success',
            estimate: estimateRecord
          });
        } catch (e) {
          return sendJson(400, { status: 'error', message: 'Invalid JSON payload: ' + e.message });
        }
      });
      return;
    }

    // 6. Contact Inquiry & Automated WhatsApp Dispatch
    if (pathname === '/api/contact' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const leadData = JSON.parse(body || '{}');
          
          if (!leadData.name || !leadData.contact) {
            return sendJson(400, { status: 'error', message: 'Name and contact number are required.' });
          }

          // Persist lead into database
          const savedLead = db.createLead(leadData);

          // Dispatch instant priority WhatsApp alert to Belintan
          await whatsapp.notifyBelintanOfLead(savedLead);

          return sendJson(200, {
            status: 'success',
            message: 'Inquiry received. Belintan has been notified and will reply within 24 hours.',
            leadId: savedLead.id
          });
        } catch (e) {
          return sendJson(400, { status: 'error', message: 'Invalid JSON format: ' + e.message });
        }
      });
      return;
    }

    // 7. CRM Leads Feed
    if (pathname === '/api/leads' && req.method === 'GET') {
      return sendJson(200, { status: 'success', data: db.getLeads() });
    }

    // 8. Call Detail Records (CDR)
    if (pathname === '/api/calls') {
      if (req.method === 'GET') {
        return sendJson(200, { status: 'success', data: db.getCalls() });
      }
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
          try {
            const callData = JSON.parse(body || '{}');
            const savedCall = db.createCall(callData);
            return sendJson(200, { status: 'success', data: savedCall });
          } catch (e) {
            return sendJson(400, { status: 'error', message: 'Invalid call payload: ' + e.message });
          }
        });
        return;
      }
    }

    // 9. MCP Tool Discovery & Execution
    if (pathname === '/api/mcp/tools' && req.method === 'GET') {
      return sendJson(200, { tools: MCP_TOOLS });
    }
    if (pathname === '/api/mcp/execute' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const { tool, arguments: args } = JSON.parse(body || '{}');
          const result = await executeMcpTool(tool, args);
          return sendJson(200, { status: 'success', result });
        } catch (e) {
          return sendJson(400, { status: 'error', message: e.message });
        }
      });
      return;
    }

    // Endpoint Not Found
    return sendJson(404, { status: 'error', message: `API Endpoint ${pathname} not found` });
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

// Attach WebRTC Telephony WebSocket Server
setupTelephonyServer(server);

// Start Unified Server
server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 BELINTAN PRODUCTION BACKEND & TELEPHONY HUB`);
  console.log(`🌐 Web & API URL:   http://localhost:${PORT}`);
  console.log(`📞 WebRTC Softphone: ws://localhost:${PORT}/ws/telephony`);
  console.log(`🤖 Gemini AI Stream: POST http://localhost:${PORT}/api/ai/stream`);
  console.log(`📱 WhatsApp Webhook: http://localhost:${PORT}/api/whatsapp/webhook`);
  console.log(`======================================================\n`);
});
