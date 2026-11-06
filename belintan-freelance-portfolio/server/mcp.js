/**
 * Model Context Protocol (MCP) Server for Belintan Freelance Platform
 * Exposes portfolio intelligence, quote estimation, and CRM operations
 * to AI engineering tools (Cursor, Claude, Antigravity).
 */

import { db } from './db.js';

export const MCP_TOOLS = [
  {
    name: 'get_freelancer_profile',
    description: "Returns Belintan's real-time freelance availability, MBA credentials, full tech stack, and portfolio stats.",
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'calculate_project_cost',
    description: 'Calculates dynamic cost, timeline, and package recommendation for software, AI, or creative projects.',
    inputSchema: {
      type: 'object',
      properties: {
        projectType: {
          type: 'string',
          enum: ['starter', 'business', 'webapp', 'ai', 'growth', 'creative'],
          description: 'Base project tier'
        },
        features: {
          type: 'array',
          items: { type: 'string' },
          description: 'Selected feature IDs e.g. ["auth", "payments", "python_ai", "mcp_server"]'
        },
        speed: {
          type: 'string',
          enum: ['standard', 'express'],
          description: 'Delivery speed. express offers 48h-72h turnaround with 1.25x rush multiplier.'
        }
      },
      required: ['projectType']
    }
  },
  {
    name: 'create_lead_inquiry',
    description: 'Registers a new client lead directly into Belintan’s persistent CRM with priority WhatsApp routing.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        contact: { type: 'string' },
        email: { type: 'string' },
        company: { type: 'string' },
        service: { type: 'string' },
        message: { type: 'string' }
      },
      required: ['name', 'contact', 'message']
    }
  },
  {
    name: 'get_call_dispositions',
    description: 'Retrieves recent call detail records (CDR) and dispositions from the Doocti WebRTC CRM dialer.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Number of recent calls to fetch (default: 10)' }
      }
    }
  }
];

export async function executeMcpTool(toolName, args = {}) {
  switch (toolName) {
    case 'get_freelancer_profile':
      return {
        name: 'Belintan',
        title: 'Full-Stack Freelance Software Engineer',
        education: 'MBA Graduate',
        location: 'Tuticorin, Tamil Nadu, India / Worldwide Remote',
        availability: 'IMMEDIATELY_AVAILABLE_FOR_CONTRACTS',
        canonicalUrl: 'https://ProfileBelintan.com/',
        contact: {
          phone: '+91 86106 62871',
          whatsapp: '+91 86106 62871',
          email: 'belintan07@gmail.com',
          github: 'https://github.com/belintan07',
          linkedin: 'https://www.linkedin.com/in/belintanben'
        },
        capabilities: [
          'High-performance React 19 / Next.js web applications',
          'Enterprise Node.js & Python FastAPI backend architectures',
          'Doocti Cloud WebRTC telephony softphone and SIP trunking',
          'Google Gemini 2.5 / OpenAI agent pipelines and FastMCP servers',
          'Cinematic 9:16 Instagram Reel editing and wedding photoshoot retouching'
        ]
      };

    case 'calculate_project_cost': {
      const { projectType, features = [], speed = 'standard' } = args;
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
        posters_10: 3500, videos_10: 5000, meta_ads: 4500, seo_offsite: 4000
      };

      const addonPrice = features.reduce((acc, f) => acc + (featureCosts[f] || 0), 0);
      let totalInr = basePrice + addonPrice;
      let totalDays = baseDays + Math.round(features.length * 1.2);

      if (speed === 'express') {
        totalInr = Math.round(totalInr * 1.25);
        totalDays = Math.max(2, Math.round(totalDays * 0.6));
      }

      return {
        currency: 'INR',
        totalInr,
        totalUsd: Math.round(totalInr / 85),
        estimatedDays: totalDays,
        recommendedPlan: totalInr < 10000 ? 'Starter' : (totalInr < 25000 ? 'Professional Business' : 'Enterprise & AI Suite')
      };
    }

    case 'create_lead_inquiry':
      return db.createLead(args);

    case 'get_call_dispositions': {
      const limit = args.limit || 10;
      return db.getCalls().slice(0, limit);
    }

    default:
      throw new Error(`Unrecognized MCP tool: ${toolName}`);
  }
}

// Stdio JSON-RPC runner if invoked directly
if (process.argv[1]?.endsWith('mcp.js')) {
  process.stdin.setEncoding('utf8');
  let buffer = '';

  process.stdin.on('data', async (chunk) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const msg = JSON.parse(line);
        if (msg.method === 'tools/list') {
          process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result: { tools: MCP_TOOLS } }) + '\n');
        } else if (msg.method === 'tools/call') {
          const result = await executeMcpTool(msg.params.name, msg.params.arguments);
          process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] } }) + '\n');
        }
      } catch (err) {
        process.stderr.write(`[MCP Error] ${err.message}\n`);
      }
    }
  });
}
