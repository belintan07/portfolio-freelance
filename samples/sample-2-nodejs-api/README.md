# [SAMPLE CASE STUDY] — VaultFlow: Resilient Node.js Webhook & Idempotent Transaction Engine

> **Notice:** This project is a curated **Sample Case Study & Working API Prototype** created by Belintan to demonstrate backend systems architecture, payment security, idempotent webhook processing, and concurrency resilience in Node.js.

---

## 1. The Problem
A fast-growing fintech SaaS platform faced severe billing anomalies during marketing campaigns:
* **Duplicate Charges & Financial Anomalies:** Network timeouts caused payment gateways (e.g., Stripe) to retry webhooks, resulting in double-crediting customer subscriptions and duplicate order fulfillments.
* **Dropped Webhooks During Traffic Surges (8.2% drop rate):** Concurrent webhook storms overwhelmed the unbuffered database layer, causing gateway timeouts (HTTP 504) and lost order events.
* **Vulnerability to Replay Attacks:** Endpoints lacked cryptographically validated HMAC replay protection and timestamp verification windows.

---

## 2. What Was Done (Architecture & Implementation)

Belintan engineered a fault-tolerant, idempotent transaction processing engine in Node.js:

```text
[Payment Gateway / Webhook]
           │
           ▼ (HMAC-SHA256 Signature + Timestamp Header)
[1. Cryptographic Signature Verifier]
           │
           ▼
[2. Distributed Idempotency Lock Engine]
      ├── If Key Seen & Complete ──► Return Cached HTTP 200 (No duplicate work)
      ├── If Key In-Progress ──────► Concurrency Lock (HTTP 409 Retry-After)
      └── If New Key ──────────────► Proceed to Atomic Processing
           │
           ▼
[3. Circuit-Breaker Worker & Exponential Retry Queue]
           │
           ▼
[4. Immutable Audit Ledger & Event Log]
```

### Core Technical Features:
1. **Cryptographic Webhook Verification:** Full HMAC SHA-256 signature verification with a strict 300-second drift tolerance window to prevent replay exploits.
2. **Atomic Idempotency Engine:** Prevents duplicate execution even under rapid concurrent duplicate requests using deterministic transaction keys.
3. **Resilient Retry Queue & Circuit Breaker:** Failed downstream operations automatically enter exponential backoff retries with Dead-Letter-Queue (DLQ) quarantine.
4. **Interactive Browser Testbench (`/`):** Built-in visual playground allowing reviewers, clients, and QA engineers to trigger mock webhooks, test duplicate rejections, simulate failures, and view ledger telemetry in real-time.

---

## 3. The Target Result Aimed For

| KPI Metric | Baseline (Legacy System) | Target Result Aimed For |
| :--- | :--- | :--- |
| **Duplicate Charge Incidents** | 14-20 per week | **0 (Zero duplicate charges guaranteed)** |
| **Webhook Delivery Capture Rate** | 91.8% | **99.99% under burst spikes** |
| **Median Response Latency** | 420ms (Database bottleneck) | **32ms (Asynchronous ledger worker)** |
| **Replay Attack Vulnerability** | Unprotected | **100% Cryptographically Rejected** |

---

## 4. How to Run the Prototype

This prototype runs instantly with standard Node.js (v18+ recommended):

```bash
# 1. Navigate to the project directory
cd samples/sample-2-nodejs-api

# 2. Start the server (Zero external dependencies needed!)
node server.js

# 3. Open the interactive visual testbench in your browser:
# http://localhost:4000
```

---

## 5. API Endpoints Reference

* `POST /api/webhooks/payment` — Ingests signed payment webhooks with `Idempotency-Key` and `X-Signature` headers.
* `GET /api/transactions` — Retrieves real-time immutable audit ledger.
* `POST /api/simulate-load` — Triggers a concurrent batch of duplicate requests to test idempotency locks.
* `GET /api/health` — Returns node memory, uptime, and queue health statistics.
