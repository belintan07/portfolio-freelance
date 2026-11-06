-- ==============================================================================
-- Belintan Freelance Platform — Production PostgreSQL Database Schema
-- Canonical Domain: https://ProfileBelintan.com/
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Leads & Client Inquiries
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_code VARCHAR(32) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    contact VARCHAR(64) NOT NULL,
    company VARCHAR(255),
    service_interest VARCHAR(255),
    budget_range VARCHAR(64),
    message TEXT,
    status VARCHAR(32) DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'IN_DISCUSSION', 'DEMO_BOOKED', 'WON', 'LOST')),
    source VARCHAR(64) DEFAULT 'WEBSITE_PORTFOLIO',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_contact ON leads(contact);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- 2. Dynamic Project Estimates
CREATE TABLE IF NOT EXISTS estimates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    estimate_code VARCHAR(32) UNIQUE NOT NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    project_type VARCHAR(64) NOT NULL,
    features JSONB NOT NULL DEFAULT '[]',
    speed VARCHAR(32) DEFAULT 'standard',
    total_inr NUMERIC(10, 2) NOT NULL,
    total_usd NUMERIC(10, 2) NOT NULL,
    estimated_days INTEGER NOT NULL,
    recommended_plan VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_estimates_lead ON estimates(lead_id);

-- 3. WebRTC Softphone Call Detail Records (CDR)
CREATE TABLE IF NOT EXISTS call_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    call_code VARCHAR(32) UNIQUE NOT NULL,
    caller_number VARCHAR(64) NOT NULL,
    agent_id VARCHAR(64) DEFAULT 'Belintan',
    duration_seconds INTEGER NOT NULL DEFAULT 0,
    disposition VARCHAR(64) NOT NULL CHECK (disposition IN ('Demo Booked', 'Interested', 'Follow Up', 'Gatekeeper', 'Not Interested', 'Quote Sent', 'Requirements Finalized')),
    notes TEXT,
    recording_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_call_logs_caller ON call_logs(caller_number);
CREATE INDEX IF NOT EXISTS idx_call_logs_disposition ON call_logs(disposition);

-- 4. Gemini AI Sessions & Prompt Scopes
CREATE TABLE IF NOT EXISTS ai_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_code VARCHAR(32) UNIQUE NOT NULL,
    model_name VARCHAR(64) NOT NULL,
    prompt_mode VARCHAR(64) NOT NULL,
    user_prompt TEXT NOT NULL,
    response_length INTEGER DEFAULT 0,
    client_ip VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Auto-update timestamps trigger
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_leads_updated_at ON leads;
CREATE TRIGGER set_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();
