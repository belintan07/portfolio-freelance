"""
Belintan Freelance Portfolio — Python AI Lead & Project Analysis Engine
Demonstrates automated lead scoring, scope extraction, and proposal generation.
"""

import sys
import json
from datetime import datetime

def analyze_client_lead(lead_data):
    """
    Parses client project inquiry, calculates recommended tech stack,
    and returns a structured proposal outline.
    """
    project_type = lead_data.get("project_type", "Website Development").lower()
    budget = lead_data.get("budget", "Flexible")
    details = lead_data.get("message", "")
    
    # Intelligent Stack Selection
    recommended_stack = ["React 19", "Tailwind CSS"]
    if "api" in details.lower() or "backend" in details.lower() or "database" in details.lower():
        recommended_stack.extend(["Node.js", "Express", "PostgreSQL"])
    if "ai" in details.lower() or "automation" in details.lower() or "scrape" in details.lower():
        recommended_stack.extend(["Python", "FastAPI", "OpenAI / Gemini"])
    if "mobile" in details.lower() or "app" in details.lower():
        recommended_stack.append("Progressive Web App (PWA)")

    # Complexity Scoring
    complexity_score = min(10, max(2, len(recommended_stack) * 1.5))
    estimated_turnaround_days = int(complexity_score * 1.8)

    proposal = {
        "timestamp": datetime.now().isoformat(),
        "client_name": lead_data.get("name", "Prospective Client"),
        "contact": lead_data.get("contact", "Not provided"),
        "project_classification": project_type,
        "complexity_score": f"{complexity_score}/10",
        "recommended_stack": recommended_stack,
        "estimated_turnaround_days": f"{estimated_turnaround_days} days",
        "next_steps": [
            "Schedule 15-min discovery call via WhatsApp",
            "Prepare detailed technical wireframe & database schema",
            "Initiate Sprint 1: Core layout & architecture"
        ]
    }
    
    return proposal

if __name__ == "__main__":
    sample_lead = {
        "name": "Sarah Jenkins",
        "contact": "+1 (555) 234-5678",
        "project_type": "Full-Stack Web App",
        "budget": "₹25,000 - ₹50,000",
        "message": "Looking for a high-speed customer dashboard with automated Python data scraping and Node.js APIs."
    }
    
    result = analyze_client_lead(sample_lead)
    print("=" * 60)
    print("BELINTAN FREELANCE — PYTHON AI LEAD ANALYSIS")
    print("=" * 60)
    print(json.dumps(result, indent=2))
    print("=" * 60)
