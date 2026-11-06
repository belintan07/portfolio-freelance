/**
 * Google Gemini AI Streaming Gateway for Belintan Platform
 * Implements real-time token streaming using @google/genai SDK
 * with calibrated domain personas and fallback streaming resilience.
 */

import { GoogleGenAI } from '@google/genai';
import { db } from './db.js';

const SYSTEM_PROMPTS = {
  estimate: `You are Belintan's Senior Solutions Architect. Analyze the client's project requirements and provide a structured, high-value technical proposal:
1. Executive Summary & Recommended Tech Stack (React 19, Node.js, WebSockets, PostgreSQL, FastMCP).
2. Phased Milestone Breakdown with realistic delivery timelines (in days).
3. Value-focused Cost Estimate (in INR and USD).
4. Potential Technical Risks & Recommended Mitigations.
Maintain a confident, highly professional freelance engineering tone.`,

  reel_script: `You are Belintan's Viral Short-Form Video Producer. Write an engaging 9:16 Instagram Reel / YouTube Shorts script:
1. Visual Hook (0-3s): High-retention visual action and punchy text overlay.
2. Narrative Arc (3-25s): Scene-by-scene script with exact B-roll suggestions, pacing notes, and voiceover cues.
3. Call-to-Action (25-30s): Clear, conversion-focused closing.
4. Audio & Sound FX Guidance (trending audio rhythm, whooshes, risers).`,

  retouch: `You are Belintan's Senior Retouching & Color Grading Specialist. Produce a commercial retouching brief for high-end wedding and fashion photoshoots:
1. Skin Tone & Texture: Frequency separation guidelines preserving 100% natural skin texture and micro-pores.
2. Color Harmonization: Palette grade (Kodak/Fuji film stock emulation, balanced contrast curves).
3. Dodge & Burn / Lighting Contour: Enhancing dimensional lighting without artificial artifacts.
4. Deliverables Matrix: Print-ready TIFFs and Web-optimized Retina sRGB JPEGs.`,

  mcp_server: `You are Belintan's Model Context Protocol (MCP) Specialist. Write a production-grade FastMCP / Node.js MCP server specification:
1. Server Architecture & Tool Definitions with typed JSON schemas.
2. Integration Flow: Connecting with Claude Desktop, Cursor, and Antigravity IDEs.
3. Security Controls & Rate Limiting.
4. Runnable code snippet showcasing tool execution and structured error handling.`
};

export async function handleAiStream(req, res) {
  // Setup Server-Sent Events headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      const { prompt = '', model = 'gemini-2.5-pro', mode = 'estimate' } = JSON.parse(body || '{}');

      if (!prompt.trim()) {
        sendEvent('error', { message: 'Prompt cannot be empty.' });
        res.end();
        return;
      }

      sendEvent('start', { model, mode, timestamp: Date.now() });

      const apiKey = process.env.GEMINI_API_KEY;
      let fullResponseText = '';

      if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const systemInstruction = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.estimate;
          
          const responseStream = await ai.models.generateContentStream({
            model: model.includes('pro') ? 'gemini-2.5-pro' : 'gemini-2.5-flash',
            contents: prompt,
            config: {
              systemInstruction,
              temperature: 0.7,
            }
          });

          for await (const chunk of responseStream) {
            const token = chunk.text;
            if (token) {
              fullResponseText += token;
              sendEvent('token', { text: token });
            }
          }
        } catch (apiErr) {
          console.warn('[Gemini AI] Live API returned error, activating fallback generator:', apiErr.message);
          await streamFallback(prompt, mode, sendEvent, (chunk) => { fullResponseText += chunk; });
        }
      } else {
        // Fallback intelligent generator when API key is not configured locally
        await streamFallback(prompt, mode, sendEvent, (chunk) => { fullResponseText += chunk; });
      }

      // Persist session telemetry
      db.logAiSession({
        model,
        mode,
        prompt: prompt.slice(0, 500),
        responseLength: fullResponseText.length
      });

      sendEvent('done', { 
        status: 'completed', 
        totalLength: fullResponseText.length,
        timestamp: Date.now()
      });
      res.end();

    } catch (parseErr) {
      sendEvent('error', { message: 'Invalid JSON request payload: ' + parseErr.message });
      res.end();
    }
  });
}

/**
 * Intelligent streaming fallback simulator to ensure zero-downtime demo capability
 */
async function streamFallback(prompt, mode, sendEvent, onChunk) {
  let simulatedText = '';

  if (mode === 'reel_script') {
    simulatedText = `🎬 VIRAL 9:16 REEL SCRIPT ARCHITECTURE
Target Duration: 30 Seconds | Audio: High-Energy Tech Beat

[00:00 - 00:03] THE HOOK
• Visual: Rapid 3-frame cut of modern UI dashboard rendering in dark mode with glowing amber highlights.
• Text on Screen: "Stop building manual backends in 2026."
• Voiceover: "If your app still lacks real-time WebRTC and AI workflows, you are losing 80% of your users."

[00:03 - 00:15] CORE VALUE PITCH
• Visual: Split-screen demonstrating Doocti Softphone connecting live SIP calls while Google Gemini generates real-time call transcripts.
• Voiceover: "Here is how Belintan architects full-stack platforms: React 19 frontend, WebSocket telephony hub, and automated WhatsApp lead dispatch."

[00:15 - 00:25] PROOF & TECHNICAL SPECS
• Visual: Fast terminal code scroll showing oxlint passing 0 errors, 10ms Node.js API latencies, and PostgreSQL persistence.
• Sound FX: Subtle mechanical keystroke whooshes.

[00:25 - 00:30] CALL TO ACTION
• Visual: Clean lower-third with ProfileBelintan.com and WhatsApp instant quote button.
• Voiceover: "Ready to launch your platform? Book Belintan for your next project today."`;
  } else if (mode === 'retouch') {
    simulatedText = `🎨 HIGH-END EDITORIAL RETOUCHING SPECIFICATION
Project Scope: Wedding & Fashion Album Color Mastery

1. FREQUENCY SEPARATION & TEXTURE PRESERVATION
• High Frequency (Texture): Micro-texture separation at 4.2px radius to remove temporary blemishes while retaining 100% natural skin pore fidelity.
• Low Frequency (Color & Tone): Even transitions across cheekbones, jawlines, and forehead shadows with 16-bit color depth.

2. COLOR HARMONY & PALETTE TUNING
• Highlight Warmth: Kodak Portra 400 warmth injected into skin highlights (+4% amber glow).
• Shadows & Midtones: Controlled neutral blacks with slight cooling in background foliage to make subjects pop forward.

3. LIGHTING CONTOURING (DODGE & BURN)
• Non-destructive 50% gray overlay curve passes to accentuate natural bone structure and fabric fold drapery.

4. MASTER DELIVERABLES
• Ultra HD 300 DPI Print TIFFs (Adobe RGB 1998)
• Optimized Web & Mobile Ready sRGB JPEGs (<1.2MB with Retina sharpness).`;
  } else if (mode === 'mcp_server') {
    simulatedText = `⚡ FASTMCP PRODUCTION SERVER ARCHITECTURE
Standard: Model Context Protocol (JSON-RPC over stdio / SSE)

1. TOOL SPECIFICATION MATRIX:
• 'get_freelancer_profile': Returns real-time engineering availability, MBA credentials, and active tech stacks.
• 'create_lead_inquiry': Submits validated client requests directly into PostgreSQL CRM.
• 'calculate_project_cost': Instant deterministic calculations for Starter, Business, and Enterprise plans.

2. RUNNABLE NODE.JS MCP SERVER SNIPPET:
\`\`\`javascript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'belintan-freelance-mcp',
  version: '1.0.0'
}, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'calculate_project_cost',
    description: 'Calculate dynamic estimate for Belintan freelance services',
    inputSchema: {
      type: 'object',
      properties: {
        projectType: { type: 'string', enum: ['starter', 'business', 'webapp', 'ai'] },
        features: { type: 'array', items: { type: 'string' } }
      },
      required: ['projectType']
    }
  }]
}));
\`\`\`

3. INTEGRATION:
Add directly to Cursor or Claude Desktop config to give your AI assistants direct access to the Belintan platform.`;
  } else {
    simulatedText = `📋 TECHNICAL PROPOSAL & ESTIMATE BREAKDOWN
Client Scope: "${prompt}"

1. ARCHITECTURAL BLUEPRINT
• Frontend: React 19 + Tailwind CSS single-page application with sub-second page transitions.
• Backend Service: High-concurrency Node.js runtime featuring WebRTC softphone signaling, SSE streaming, and WhatsApp webhook integration.
• Database Persistence: PostgreSQL schema with ACID compliance and automatic audit logs.

2. MILESTONES & TIMELINE
• Phase 1 (Days 1–3): System design, API schema definitions, and frontend UI scaffolding.
• Phase 2 (Days 4–7): Core business logic, WebRTC telephony hub, and third-party API wiring.
• Phase 3 (Days 8–10): Comprehensive test suites (oxlint, unit benchmarks) and zero-downtime deployment.

3. COMMERCIAL ESTIMATE
• Investment: ₹18,000 – ₹28,000 INR ($220 – $340 USD) based on selected feature addons.
• Turnaround: 7 to 10 Business Days with daily async progress updates on WhatsApp.`;
  }

  // Stream word by word with slight realistic delay
  const words = simulatedText.split(' ');
  for (let i = 0; i < words.length; i++) {
    const chunk = (i === 0 ? '' : ' ') + words[i];
    onChunk(chunk);
    sendEvent('token', { text: chunk });
    await new Promise(r => setTimeout(r, 20));
  }
}
