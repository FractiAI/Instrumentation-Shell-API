#!/usr/bin/env python3
"""glyphlint

A tiny fail-closed linter for GlyphLang v0.3 + IceLayer v0.1.

Design goals:
- Parse tokens from free text (PR body, issue comment, etc.)
- Enforce minimal adoption (require a GlyphLine) when configured
- Enforce fail-closed rules around:
  - pressure/outcome legality (e.g., ~P3 forbids ~PASS)
  - Ice verdict vs outcome (~ICE- forbids ~PASS)
  - ICEMAP policy for required probes + veto signals + minimum pressure
  - Official claim legality (~DEMO:official)

This is shorthand validation, not a full interpreter.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Set

try:
    import yaml  # type: ignore
except Exception:  # pragma: no cover
    yaml = None

ALLOWED_TOKEN_RE = re.compile(r"^~[A-Za-z0-9:\+\-\?\!_\/\.\|]+$")

PRESSURE_ORDER = {"P0": 0, "P1": 1, "P2": 2, "P3": 3}


@dataclass
class PolicyLoad:
    min_pressure: str
    required_probes: List[str]
    veto_signals: List[str]


@dataclass
class Policy:
    icemap_id: str
    loads: Dict[str, PolicyLoad]
    official_require: dict


def load_policy(path: Path) -> Policy:
    raw_text = path.read_text(encoding="utf-8")
    if path.suffix.lower() in (".yaml", ".yml"):
        if yaml is None:
            raise RuntimeError("PyYAML not installed. Run: pip install pyyaml")
        raw = yaml.safe_load(raw_text) or {}
    else:
        raw = json.loads(raw_text)

    loads: Dict[str, PolicyLoad] = {}
    for load_name, spec in (raw.get("loads") or {}).items():
        spec = spec or {}
        loads[load_name] = PolicyLoad(
            min_pressure=str(spec.get("min_pressure", "P0")),
            required_probes=list(spec.get("required_probes") or []),
            veto_signals=list(spec.get("veto_signals") or []),
        )

    return Policy(
        icemap_id=str(raw.get("icemap_id", "")),
        loads=loads,
        official_require=raw.get("official_require") or {},
    )


def read_text(path: Optional[Path]) -> str:
    if path is None:
        return sys.stdin.read()
    return path.read_text(encoding="utf-8", errors="replace")


def extract_tokens(text: str) -> List[str]:
    # Split on whitespace; keep only ~-prefixed units.
    # Arrow markers (->) are narrative; ignored.
    words = re.split(r"\s+", text)
    return [w.strip() for w in words if w.strip().startswith("~")]


def first_value(tokens_in_order: List[str], prefix: str) -> Optional[str]:
    for t in tokens_in_order:
        if t.startswith(prefix):
            return t[len(prefix):]
    return None


def parse_pressure(tokens: Set[str]) -> Optional[str]:
    # Prefer highest found
    for p in ("~P3", "~P2", "~P1", "~P0"):
        if p in tokens:
            return p[1:]  # "P1" etc.
    return None


def rgca_all_plus(tokens: Set[str]) -> bool:
    if "~RGCA+" in tokens:
        return True
    return all(t in tokens for t in ("~R+", "~G+", "~C+", "~A+"))


def ready_tier(tokens: Set[str]) -> Optional[str]:
    for t in ("~READY:demo", "~READY:ui", "~READY:core"):
        if t in tokens:
            return t.split(":", 1)[1]
    return None


def enforce_ready_evidence(tokens: Set[str], errors: List[str]) -> None:
    """Enforce that any ~READY:* claim is backed by a minimum evidence bundle.

    Fail-closed: if you want to say READY, you must show the artifacts.
    """

    def has(base: str) -> bool:
        # accept exact token (~JSON) or a valued form (~JSON:atomic.json)
        return base in tokens or any(t.startswith(base + ":") for t in tokens)

    def has_prefix(prefix: str) -> bool:
        return any(t.startswith(prefix) for t in tokens)

    ready_claimed = any(t.startswith("~READY:") for t in tokens)
    if not ready_claimed:
        return

    missing: List[str] = []

    # Core evidence markers
    for base in ("~COMMIT", "~HASH", "~JSON", "~ARCH", "~MANI"):
        if not has(base):
            missing.append(base)

    # Required valued identity markers
    for prefix in ("~ENV:", "~RUN:", "~TRACE:", "~ICEMAP:"):
        if not has_prefix(prefix):
            missing.append(prefix + "*")

    if missing:
        errors.append("READY requires evidence tokens missing: " + ", ".join(sorted(missing)))

    # UI tier
    if "~READY:ui" in tokens or "~READY:demo" in tokens:
        if not has("~SHOT"):
            errors.append("READY:ui requires ~SHOT")

    # Demo tier
    if "~READY:demo" in tokens:
        if not has("~REPORT"):
            errors.append("READY:demo requires ~REPORT")


def enforce_illegal_combos(tokens: Set[str], errors: List[str]) -> None:
    pressure = parse_pressure(tokens)
    if pressure == "P3" and "~PASS" in tokens:
        errors.append("~P3 forbids ~PASS (freeze mode)")

    if "~ICE-" in tokens and "~PASS" in tokens:
        errors.append("~ICE- forbids ~PASS (substrate failed)")

    if "~ZDM-" in tokens and "~PASS" in tokens:
        errors.append("~ZDM- forbids ~PASS (mismatch detected)")


def enforce_icemap(policy: Policy, tokens_in_order: List[str], tokens: Set[str], errors: List[str]) -> None:
    load = first_value(tokens_in_order, "~LOAD:")
    icemap = first_value(tokens_in_order, "~ICEMAP:")

    if load is None:
        return

    if load not in policy.loads:
        errors.append(f"Unknown ~LOAD:{load} for policy {policy.icemap_id}")
        return

    load_spec = policy.loads[load]

    # Require explicit pressure token for any declared load (fail-closed)
    p = parse_pressure(tokens)
    if p is None:
        errors.append(f"~LOAD:{load} requires an explicit pressure token (~P0/~P1/~P2/~P3)")
    else:
        if PRESSURE_ORDER.get(p, -1) < PRESSURE_ORDER.get(load_spec.min_pressure, -1):
            errors.append(f"Pressure too low for ~LOAD:{load}: need ~{load_spec.min_pressure} or higher")

    # Require ICEMAP for high load classes
    if load in {"prod", "public", "pay"} and icemap is None:
        errors.append(f"~LOAD:{load} requires ~ICEMAP:<id>")

    # If ICEMAP present, it must match this policy file
    if icemap is not None and icemap != policy.icemap_id:
        errors.append(f"~ICEMAP:{icemap} does not match policy file icemap_id={policy.icemap_id}")

    # Required probes
    present_probes = {t.split(":", 1)[1] for t in tokens if t.startswith("~PROBE:") and ":" in t}
    missing_probes = [pp for pp in load_spec.required_probes if pp not in present_probes]
    if missing_probes:
        errors.append(f"Missing required probes for ~LOAD:{load}: " + ", ".join(missing_probes))

    # Veto signals forbid PASS
    present_signals = {t.split(":", 1)[1] for t in tokens if t.startswith("~SIG:") and ":" in t}
    veto_hit = [s for s in load_spec.veto_signals if s in present_signals]
    if veto_hit and "~PASS" in tokens:
        errors.append("Veto signals present (" + ", ".join(veto_hit) + ") so ~PASS is illegal")


def enforce_official(policy: Policy, tokens_in_order: List[str], tokens: Set[str], errors: List[str]) -> None:
    if "~DEMO:official" not in tokens:
        return

    req = policy.official_require or {}

    # Must be PASS
    if req.get("require_pass", False) and "~PASS" not in tokens:
        errors.append("~DEMO:official requires ~PASS")

    # ENV + RUN
    env = first_value(tokens_in_order, "~ENV:")
    run = first_value(tokens_in_order, "~RUN:")
    if req.get("env_required", False) and env is None:
        errors.append("~DEMO:official requires ~ENV:<...>")
    if req.get("run_required", False) and run is None:
        errors.append("~DEMO:official requires ~RUN:<...>")
    if run is not None and req.get("run_must_be") and run != req.get("run_must_be"):
        errors.append(f"~DEMO:official requires ~RUN:{req.get('run_must_be')}")

    # ICE verdict
    ice_need = req.get("ice_must_be")
    if ice_need == "+" and "~ICE+" not in tokens:
        errors.append("~DEMO:official requires ~ICE+")

    # Truth gates
    if req.get("require_rgca_all_plus", False) and not rgca_all_plus(tokens):
        errors.append("~DEMO:official requires RGCA all plus (~RGCA+ or ~R+ ~G+ ~C+ ~A+)")

    if req.get("require_zd_plus", False) and "~ZD+" not in tokens:
        errors.append("~DEMO:official requires ~ZD+")
    if req.get("require_zdm_plus", False) and "~ZDM+" not in tokens:
        errors.append("~DEMO:official requires ~ZDM+")
    if req.get("require_thalet_plus", False) and "~T+" not in tokens:
        errors.append("~DEMO:official requires ~T+")

    # Readiness tier
    tier = ready_tier(tokens)
    need_tier = req.get("require_ready_tier")
    if need_tier and tier != need_tier:
        errors.append(f"~DEMO:official requires ~READY:{need_tier}")

    # Optional gates
    if req.get("require_bridgespec_plus", False) and "~BS+" not in tokens:
        errors.append("~DEMO:official requires ~BS+")
    if req.get("require_tb_plus", False) and "~TB+" not in tokens:
        errors.append("~DEMO:official requires ~TB+")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--icemap", required=True, help="Path to icemap.yaml (or .json)")
    ap.add_argument("--text", help="Path to text file to lint (default: stdin)")
    ap.add_argument("--require", action="store_true", help="Fail if no ~tokens found (enforce adoption)")
    args = ap.parse_args()

    env_require = os.environ.get("GLYPHLINT_REQUIRE", "").strip().lower() in {"1", "true", "yes"}
    require = args.require or env_require

    policy = load_policy(Path(args.icemap))

    text = read_text(Path(args.text) if args.text else None)
    tokens_list = extract_tokens(text)

    if require and not tokens_list:
        print("glyphlint: FAIL (no ~tokens found; add a GlyphLine)")
        return 2

    errors: List[str] = []

    # Validate token charset
    for t in tokens_list:
        if not ALLOWED_TOKEN_RE.match(t):
            errors.append(f"Invalid token characters: {t}")

    tokens: Set[str] = set(tokens_list)

    # Built-in legality checks
    enforce_illegal_combos(tokens, errors)

    # Ready tier evidence
    enforce_ready_evidence(tokens, errors)

    # ICEMAP enforcement
    enforce_icemap(policy, tokens_list, tokens, errors)

    # Official claim enforcement
    enforce_official(policy, tokens_list, tokens, errors)

    if errors:
        print("glyphlint: FAIL")
        for e in errors:
            print("- " + e)
        return 1

    print("glyphlint: PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
