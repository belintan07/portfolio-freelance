# [SAMPLE CASE STUDY] — CortexMCP: Enterprise Python AI Agent & Model Context Protocol Server

> **Notice:** This project is a curated **Sample Case Study & Working AI Prototype** created by Belintan to demonstrate Python AI engineering, Model Context Protocol (MCP) tool design, structured synthesis, and operational automation.

---

## 1. The Problem
An enterprise B2B SaaS leadership team struggled with fragmented customer feedback and manual reporting:
* **14+ Hours Lost Weekly:** Product managers and CS leads manually combed through Zendesk tickets, churn exit surveys, and sales call notes to assemble Monday executive summaries.
* **Delayed Churn Alerts:** Early negative sentiment signals regarding pricing shifts and UI regressions went unnoticed for weeks until accounts churned.
* **LLM Hallucinations & Lack of Grounding:** Ad-hoc ChatGPT prompts by team members produced inconsistent, fabricated insights without audit trails or grounded schema.

---

## 2. What Was Done (Architecture & Implementation)

Belintan engineered a secure, standardized **Model Context Protocol (MCP)** agent server and execution pipeline in Python:

```text
[LLM Client: Claude Desktop / Cursor / Web UI]
                        │
                        ▼ (JSON-RPC 2.0 / MCP Protocol)
          [CortexMCP Tool Server]
                        │
      ┌─────────────────┼─────────────────┐
      ▼                 ▼                 ▼
[analyze_signals]  [gen_brief]  [query_metrics]
      │                 │                 │
      └─────────────────┼─────────────────┘
                        │
                        ▼
      [Deterministic Synthesis & Grounding Engine]
                        │
                        ▼
       [Executive Briefing & Churn Risk Radar]
```

### Core Architecture Highlights:
1. **Model Context Protocol (MCP) Compliance:** Exposes standardized tool manifests, JSON schema validation, and bidirectional JSON-RPC interfaces conforming to the open Anthropic MCP standard.
2. **Deterministic Grounding & Churn Risk Heuristics:** Employs multi-dimensional clustering across NPS, pricing sentiment, ticket severity, and contract size rather than unconstrained LLM generation.
3. **Multi-Interface Usability:**
   * **Terminal CLI (`cli_runner.py`):** Fast automated runs with rich colored terminal outputs.
   * **Interactive Web Dashboard (`web_dashboard.html`):** Browser-based visual workbench allowing clients to test tools in 1-click and inspect schemas.
   * **Direct Python Library (`mcp_agent.py`):** Standalone server ready for Claude Desktop config or Dockerization.

---

## 3. The Target Result Aimed For

| KPI Metric | Baseline (Manual Process) | Target Result Aimed For |
| :--- | :--- | :--- |
| **Weekly Executive Reporting Prep** | 14.5 hours / week | **< 1.5 hours / week (90% reduction)** |
| **High-Risk Churn Early Detection** | 3 - 4 weeks delayed | **Real-time instant detection (< 5 min)** |
| **Tool Execution Reliability** | Ad-hoc ungrounded LLM | **100% Schema-validated JSON-RPC execution** |
| **Standard MCP Portability** | Custom closed scripts | **Plugs into Claude, Cursor, or custom IDEs** |

---

## 4. How to Run the Prototype

### Option A: Interactive Browser Dashboard
Simply double-click `web_dashboard.html` or open it in any web browser to execute MCP tools and inspect outputs interactively.

### Option B: Terminal CLI Runner
```bash
# 1. Navigate to the directory
cd samples/sample-3-python-ai-mcp

# 2. Run the interactive CLI test suite (zero pip install required!)
python cli_runner.py
```

---

## 5. Excluded MCP Tools Reference

* `analyze_customer_signals(timeframe, category)` — Scans feedback corpus and flags churn warning scores.
* `generate_executive_brief(focus_area, tone)` — Produces C-suite decision memo with prioritized action items.
* `query_operational_metrics(metric_id)` — Fetches real-time latency, net revenue retention, and ticket SLAs.
* `list_tools()` — Returns the complete MCP tool capability schema.
