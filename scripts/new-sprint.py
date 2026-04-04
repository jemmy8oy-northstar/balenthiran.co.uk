#!/usr/bin/env python3
"""
Create a new sprint in sprints.json.

Carries forward the latest sprint's board snapshots and appends a new sprint entry.
Prompts for sprint id, start date, end date, and optional goals.

Usage:
    python3 scripts/new-sprint.py

Or provide args directly:
    python3 scripts/new-sprint.py --id 26Q2W3/4 --start 2026-04-13 --end 2026-04-26
"""

import json
import copy
import argparse
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
SPRINTS_PATH = ROOT / "backend/Balenthiran.WebApi/Data/sprints.json"
VALIDATE_PATH = ROOT / "scripts/validate-sprints.mjs"


def load_sprints():
    with open(SPRINTS_PATH) as f:
        return json.load(f)


def save_sprints(sprints):
    with open(SPRINTS_PATH, "w") as f:
        json.dump(sprints, f, indent=2, ensure_ascii=False)


def next_sprint_id(last_id: str) -> str:
    """Suggest the next sprint id based on the last one (e.g. 26Q1W11/12 -> 26Q2W1/2)."""
    # Parse year, quarter, week pair
    try:
        year = last_id[:2]
        q = int(last_id[3])
        weeks = last_id[5:].split("/")
        w2 = int(weeks[1])
        next_w1 = w2 + 1
        next_w2 = w2 + 2
        if next_w1 > 12:
            next_q = q + 1
            next_w1 = 1
            next_w2 = 2
            if next_q > 4:
                year = str(int(year) + 1).zfill(2)
                next_q = 1
            return f"{year}Q{next_q}W{next_w1}/{next_w2}"
        return f"{year}Q{q}W{next_w1}/{next_w2}"
    except Exception:
        return ""


def main():
    parser = argparse.ArgumentParser(description="Create a new sprint entry.")
    parser.add_argument("--id", help="Sprint id, e.g. 26Q2W3/4")
    parser.add_argument("--start", help="Start date YYYY-MM-DD")
    parser.add_argument("--end", help="End date YYYY-MM-DD")
    parser.add_argument("--goals", nargs="*", help="Sprint goals (bare text, no brackets)")
    args = parser.parse_args()

    sprints = load_sprints()
    last = sprints[-1]
    suggested_id = next_sprint_id(last["id"])

    sprint_id = args.id or input(f"Sprint id [{suggested_id}]: ").strip() or suggested_id
    start_date = args.start or input("Start date (YYYY-MM-DD): ").strip()
    end_date = args.end or input("End date   (YYYY-MM-DD): ").strip()

    if not start_date or not end_date:
        print("❌ Start and end dates are required.")
        sys.exit(1)

    if any(s["id"] == sprint_id for s in sprints):
        print(f"❌ Sprint '{sprint_id}' already exists.")
        sys.exit(1)

    goals = args.goals or []
    if not goals:
        print("Enter goals one per line, blank line to finish (or press Enter to skip):")
        while True:
            g = input("  Goal: ").strip()
            if not g:
                break
            goals.append(g)

    new_sprint = {
        "id": sprint_id,
        "startDate": start_date,
        "endDate": end_date,
        "goals": goals,
        "changes": [],
        "boardSnapshots": copy.deepcopy(last["boardSnapshots"]),
    }

    sprints.append(new_sprint)
    save_sprints(sprints)

    print(f"\n✅ Created sprint {sprint_id} ({start_date} → {end_date})")
    if goals:
        print(f"   Goals: {goals}")

    print("\n🔍 Running validation...")
    result = subprocess.run(["node", str(VALIDATE_PATH)], capture_output=False)
    if result.returncode != 0:
        print("❌ Validation failed — check sprints.json.")
        sys.exit(1)


if __name__ == "__main__":
    main()
