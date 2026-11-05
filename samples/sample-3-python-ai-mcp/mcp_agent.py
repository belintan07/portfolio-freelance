"""
CortexMCP: Enterprise Python AI Agent & Model Context Protocol Server
SAMPLE CASE STUDY & PROTOTYPE — Built by Belintan

Standard-compliant MCP tool server implementing JSON-RPC 2.0 communication
and grounded executive intelligence synthesis.
"""

import json
import sys
from datetime import datetime
from typing import Dict, Any, List

# Realistic Mock Corpus of B2B Customer Signals
CUSTOMER_SIGNALS = [
    {
        "id": "SIG-801",
        "company": "Apex Logistics (ARR: $120,000)",
        "source": "Zendesk Escalation",
        "category": "pricing",
        "sentiment_score": -0.85,
        "urgency": "HIGH",
        "content": "Recent 30% price tier changes without prior notice broke our budget allocation. Renewal in 45 days is at risk if grandfathered rate isn't offered.",
        "churn_risk_pct": 82
    },
    {
        "id": "SIG-802",
        "company": "CloudWave Systems (ARR: $45,000)",
        "source": "Gong Sales Call",
        "category": "performance",
        "sentiment_score": -0.40,
        "urgency": "MEDIUM",
        "content": "Dashboard query response times slowed down significantly after the v2.4 rollout. Team is requesting dedicated caching.",
        "churn_risk_pct": 35
    },
    {
        "id": "SIG-803",
        "company": "Vanguard FinTech (ARR: $280,000)",
        "source": "Executive QBR",
        "category": "feature_request",
        "sentiment_score": 0.75,
        "urgency": "LOW",
        "content": "Loving the MCP agent integration. Would like webhook export capabilities directly to Datadog for our compliance team.",
        "churn_risk_pct": 8
    },
    {
        "id": "SIG-804",
        "company": "Nordic Health (ARR: $85,000)",
        "source": "Support Ticket #4910",
        "category": "pricing",
        "sentiment_score": -0.65,
        "urgency": "HIGH",
        "content": "Seat-based pricing model makes it cost-prohibitive to add our 20 clinical coordinators. Evaluating alternative open-source tooling.",
        "churn_risk_pct": 74
    }
]

OPERATIONAL_METRICS = {
    "net_revenue_retention": {"value": "114.2%", "status": "HEALTHY", "target": "> 110%"},
    "gross_churn_rate": {"value": "1.8%", "status": "WARN", "target": "< 1.5%"},
    "median_api_latency": {"value": "34ms", "status": "EXCELLENT", "target": "< 50ms"},
    "support_ticket_sla_attainment": {"value": "98.4%", "status": "HEALTHY", "target": "> 95%"}
}

class CortexMCPAgent:
    """Core Model Context Protocol Agent Implementation"""

    def __init__(self):
        self.server_name = "cortex-mcp-intelligence-engine"
        self.server_version = "2.1.0"

    def list_tools(self) -> List[Dict[str, Any]]:
        """Returns the formal MCP tool specifications"""
        return [
            {
                "name": "analyze_customer_signals",
                "description": "Scans customer feedback, escalations, and sales notes to detect churn risks and sentiment trends.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "enum": ["all", "pricing", "performance", "feature_request"],
                            "description": "Feedback category to filter by"
                        },
                        "min_churn_risk": {
                            "type": "number",
                            "description": "Minimum churn risk percentage threshold (0-100)"
                        }
                    },
                    "required": ["category"]
                }
            },
            {
                "name": "generate_executive_brief",
                "description": "Synthesizes raw operational signals into a structured C-suite briefing with prioritized action items.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "focus_area": {
                            "type": "string",
                            "enum": ["revenue_risk", "product_roadmap", "operational_health"],
                            "description": "Strategic topic for the briefing"
                        }
                    },
                    "required": ["focus_area"]
                }
            },
            {
                "name": "query_operational_metrics",
                "description": "Retrieves real-time SaaS operational KPIs and SLA adherence status.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "metric_id": {
                            "type": "string",
                            "description": "ID of the metric or 'all' for full scoreboard"
                        }
                    },
                    "required": ["metric_id"]
                }
            }
        ]

    def call_tool(self, name: str, arguments: Dict[str, Any]) -> Dict[str, Any]:
        """Dispatches an MCP tool call with schema-validated execution"""
        if name == "analyze_customer_signals":
            cat = arguments.get("category", "all")
            min_risk = arguments.get("min_churn_risk", 0)
            
            filtered = [
                s for s in CUSTOMER_SIGNALS
                if (cat == "all" or s["category"] == cat) and s["churn_risk_pct"] >= min_risk
            ]

            total_arr_at_risk = sum(
                int(s["company"].split("$")[1].split(",")[0].replace(")", "").replace("000", "000"))
                for s in filtered if s["churn_risk_pct"] > 50
            )

            return {
                "total_signals_analyzed": len(filtered),
                "high_churn_risk_count": sum(1 for s in filtered if s["churn_risk_pct"] > 50),
                "estimated_arr_at_risk": f"${total_arr_at_risk:,}",
                "signals": filtered
            }

        elif name == "generate_executive_brief":
            focus = arguments.get("focus_area", "revenue_risk")
            now_str = datetime.now().strftime("%Y-%m-%d %H:%M")

            brief = {
                "brief_id": f"EXEC-BRIEF-{int(datetime.now().timestamp())}",
                "generated_at": now_str,
                "focus_area": focus.upper(),
                "executive_summary": (
                    "Immediate commercial intervention required for 2 tier-1 accounts representing $205,000 ARR. "
                    "Primary vulnerability stems from recent pricing restructure friction rather than technical capability."
                ),
                "key_findings": [
                    "Apex Logistics ($120k ARR) renewal at 82% churn risk due to surprise 30% price tier jump.",
                    "Nordic Health ($85k ARR) actively surveying open-source alternatives due to coordinator seat pricing.",
                    "API latency and platform reliability remain healthy (34ms median latency), eliminating tech infrastructure as a churn factor."
                ],
                "recommended_actions": [
                    {"priority": "P0", "action": "Author grandfathered renewal agreement for Apex Logistics within 48h.", "owner": "VP Sales"},
                    {"priority": "P1", "action": "Introduce tiered 'viewer/coordinator' seats for healthcare clients.", "owner": "Head of Product"},
                    {"priority": "P2", "action": "Ship Datadog webhook telemetry integration requested by Vanguard FinTech.", "owner": "Engineering Lead"}
                ]
            }
            return brief

        elif name == "query_operational_metrics":
            metric_id = arguments.get("metric_id", "all")
            if metric_id == "all":
                return OPERATIONAL_METRICS
            elif metric_id in OPERATIONAL_METRICS:
                return {metric_id: OPERATIONAL_METRICS[metric_id]}
            else:
                return {"error": f"Metric '{metric_id}' not found.", "available": list(OPERATIONAL_METRICS.keys())}

        else:
            raise ValueError(f"Unknown MCP Tool: {name}")

    def handle_json_rpc(self, request_str: str) -> str:
        """Processes standard JSON-RPC 2.0 Model Context Protocol requests"""
        try:
            req = json.loads(request_str)
            req_id = req.get("id")
            method = req.get("method")
            params = req.get("params", {})

            if method == "tools/list":
                res = {"jsonrpc": "2.0", "id": req_id, "result": {"tools": self.list_tools()}}
            elif method == "tools/call":
                tool_name = params.get("name")
                tool_args = params.get("arguments", {})
                tool_res = self.call_tool(tool_name, tool_args)
                res = {"jsonrpc": "2.0", "id": req_id, "result": {"content": [{"type": "text", "text": json.dumps(tool_res, indent=2)}]}}
            else:
                res = {"jsonrpc": "2.0", "id": req_id, "error": {"code": -32601, "message": f"Method {method} not found"}}
            return json.dumps(res, indent=2)
        except Exception as e:
            return json.dumps({"jsonrpc": "2.0", "id": None, "error": {"code": -32603, "message": str(e)}})

if __name__ == "__main__":
    agent = CortexMCPAgent()
    print("==================================================================")
    print(f"⚡ {agent.server_name} v{agent.server_version} (Model Context Protocol)")
    print("⚡ Case Study Prototype 3/3 (Built by Belintan)")
    print("==================================================================")
    print(f"Tools available: {[t['name'] for t in agent.list_tools()]}")
    print("\nRunning in interactive mode. Use cli_runner.py or web_dashboard.html for visual preview.")
