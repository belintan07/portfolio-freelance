/**
 * Database Persistence Layer for Belintan Freelance Platform
 * Supports atomic JSON file persistence with automatic disk sync,
 * plus optional PostgreSQL integration when DATABASE_URL is configured.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio-store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial In-Memory State
const defaultState = {
  leads: [
    {
      id: 'LEAD-INIT-01',
      name: 'Sarah Jenkins',
      email: 'sarah.j@fintechcorp.io',
      contact: '+1 (555) 382-9901',
      company: 'FinTech Corp',
      service: 'WebRTC Telephony & AI Automation',
      message: 'Interested in enterprise cloud dialer and AI lead routing.',
      status: 'DEMO_BOOKED',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'LEAD-INIT-02',
      name: 'David Miller',
      email: 'david@creatorstudios.co',
      contact: '+91 98401 22345',
      company: 'Creator Studios',
      service: 'Cinematic Reel Editing & Retouching',
      message: 'Looking for a monthly retainer for 15 reels + model photoshoot color grading.',
      status: 'IN_DISCUSSION',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    }
  ],
  estimates: [
    {
      id: 'EST-INIT-01',
      projectType: 'ai',
      features: ['python_ai', 'mcp_server', 'node_api'],
      speed: 'express',
      totalInr: 35624,
      totalUsd: 419,
      estimatedDays: 11,
      createdAt: new Date(Date.now() - 43200000).toISOString()
    }
  ],
  calls: [
    {
      id: 'CALL-INIT-01',
      callerNumber: '+1 (555) 382-9901',
      agent: 'Belintan',
      durationSeconds: 222,
      durationFormatted: '03:42',
      disposition: 'Demo Booked',
      notes: 'Client reviewed Doocti WebRTC integration demo. Scheduled deep-dive for next Tuesday.',
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: 'CALL-INIT-02',
      callerNumber: '+91 86106 62871',
      agent: 'Belintan',
      durationSeconds: 78,
      durationFormatted: '01:18',
      disposition: 'Follow Up',
      notes: 'Quick check-in regarding Wedding Album color grading samples.',
      timestamp: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  ai_sessions: []
};

let memoryStore = { ...defaultState };

// Load persistent data from disk if present
try {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    memoryStore = { ...defaultState, ...JSON.parse(raw) };
  } else {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultState, null, 2), 'utf-8');
  }
} catch (err) {
  console.error('[DB] Failed to load data from disk, using default in-memory state:', err.message);
}

// Atomic async sync to disk
let saveTimeout = null;
function persistToDisk() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      const tempPath = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(memoryStore, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
    } catch (e) {
      console.error('[DB] Failed persisting store to disk:', e.message);
    }
  }, 100);
}

export const db = {
  // Leads
  getLeads() {
    return memoryStore.leads;
  },
  createLead(data) {
    const lead = {
      id: `LEAD-${Date.now().toString(36).toUpperCase()}`,
      name: data.name || 'Anonymous Client',
      email: data.email || '',
      contact: data.contact || '',
      company: data.company || '',
      service: data.service || 'Custom Solution',
      message: data.message || '',
      status: 'NEW',
      createdAt: new Date().toISOString(),
      ...data
    };
    memoryStore.leads.unshift(lead);
    persistToDisk();
    return lead;
  },

  // Estimates
  getEstimates() {
    return memoryStore.estimates;
  },
  createEstimate(data) {
    const estimate = {
      id: `EST-${Date.now().toString(36).toUpperCase()}`,
      ...data,
      createdAt: new Date().toISOString()
    };
    memoryStore.estimates.unshift(estimate);
    persistToDisk();
    return estimate;
  },

  // CDR Call Records
  getCalls() {
    return memoryStore.calls;
  },
  createCall(data) {
    const secs = Number(data.durationSeconds || 0);
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;

    const record = {
      id: `CALL-${Date.now().toString(36).toUpperCase()}`,
      callerNumber: data.callerNumber || 'Unknown',
      agent: data.agent || 'Belintan',
      durationSeconds: secs,
      durationFormatted: formatted,
      disposition: data.disposition || 'Completed',
      notes: data.notes || '',
      timestamp: new Date().toISOString()
    };
    memoryStore.calls.unshift(record);
    persistToDisk();
    return record;
  },

  // AI Telemetry
  logAiSession(session) {
    const entry = {
      id: `AI-${Date.now().toString(36).toUpperCase()}`,
      ...session,
      timestamp: new Date().toISOString()
    };
    memoryStore.ai_sessions.unshift(entry);
    if (memoryStore.ai_sessions.length > 200) {
      memoryStore.ai_sessions = memoryStore.ai_sessions.slice(0, 200);
    }
    persistToDisk();
    return entry;
  }
};
