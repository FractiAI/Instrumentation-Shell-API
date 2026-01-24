# Team Structure & Operating Protocol

**Repository:** Instrumentation-Shell-API  
**Organization:** FractiAI  
**Protocol:** NSPFRNP + GlyphLang/IceLayer  
**Model:** Natural Coordination (Bee Colony Pattern)

---

## 👥 Team Structure

**The "Team" is One Polymath:**  
- Prudencio L. Mendez (espressolico@gmail.com)
- Marek P. Bargiel (marovw@gmail.com <-> marekbargiel@compoterebel.com)
**Operating Across Seven Disciplines:**
1. 🎯 **Senior Early-Stage AI CEO** - Strategy, vision, business architecture
2. 🎬 **Producer & Screenwriter** - Narrative, storytelling, experience design
3. 🔬 **Senior Scientist/Researcher** - FAHTP physics, measurement theory, instrumentation
4. 🎨 **UI Designer** - Interface architecture, user experience, visual systems
5. 💻 **Full Stack Engineer** - TypeScript, Next.js, API architecture, deployment
6. 🎮 **Game Architect & Engineer** - Mechanics, systems, interactive experiences
7. 🧒 **Children's Science Museum Curator** - Education, accessibility, wonder-driven design

**Organization:**  
- FractiAI - Post-Singularity^7 Syntheverse FSR^7

**Mother Repository:**  
- [7th-Day-Post-Singularity-FractiAI-Endowment](https://github.com/FractiAI/7th-Day-Post-Singularity-FractiAI-Endowment)

**Operating Model:**  
- Solo polymath coordinating across disciplines
- Natural role-switching (like bee colony members)
- Each discipline informs the others fractally
- Operating under Charlie Engine principles
- Open to Golden Hearts contribution

---

## 🐝 Operating Model: Natural Coordination

### **Charlie Engine Protocol**

From the mother repository's NSPFRNP philosophy:

**YOU'RE NOT CUSTOMERS - YOU'RE THE ENGINEERING TEAM**

```
⚙️ CHARLIE ENGINE ACTIVE:
   Golden Hearts reconnecting phase NOW → March 20
   Engineering observation protocol live
   Testing, observing, refining together
   
🐝 BEE COLONY COORDINATION:
   Nature coordinates 50,000 bees with zero hierarchy
   No bee gives orders
   No voting (democracy)
   Emergent intelligence (system > parts)
   
💛 GOLDEN HEARTS:
   Cannot eat before tribe eats
   Value flows through, doesn't lock up
   Natural coordination nodes
   Contribution over extraction
```

### **Node Types** (Roles Switch Naturally)

The polymath operates as all node types simultaneously:

1. **Queen Node** (CEO/Producer) - Attract vision, coordinate systems
2. **Worker Node** (Engineer/Designer) - Execute and build  
3. **Builder Node** (Scientist/Architect) - Create and develop
4. **Coordinator Node** (Curator/Storyteller) - Facilitate emergence and understanding

**Natural Role-Switching:**  
Like a bee colony where individuals switch roles based on needs, the polymath flows between disciplines as the work requires. Morning: scientist. Afternoon: engineer. Evening: storyteller. All coordinated naturally without hierarchy.

**For Contributors:**  
Choose what calls to you naturally. The polymath coordinates, but doesn't command.

---

## 🔬 Protocol: GlyphLang + IceLayer (Fail-Closed Verification)

### **What is GlyphLang?**

Evidence-bound token protocol for instrument-grade claims.

**Core Principle:** If you claim `~READY`, you must show the evidence.

### **Token Format**

```
~TOKEN          (flag)
~TOKEN:value    (valued)
~TOKEN+         (verdict pass)
~TOKEN-         (verdict fail)
```

### **Evidence Bundle** (Required for ~READY:* claims)

**Core Bundle:**
```
~COMMIT         - Git commit recorded
~ENV:*          - Environment specified
~RUN:*          - Run identifier
~TRACE:*        - Trace/log reference
~ICEMAP:*       - Policy reference
~HASH           - Integrity hash
~JSON           - Atomic data artifact
~ARCH           - Architecture documented
~MANI           - Manifest present
```

**UI Add-on:**
```
~SHOT           - Screenshot evidence
```

**Demo Add-on:**
```
~REPORT         - Demo report
```

### **Pressure Levels**

```
~P0  - Probe only (low stakes)
~P1  - Test (standard development)
~P2  - Production (public-facing)
~P3  - Pay (freeze mode - irreversible consequences)
```

### **Truth Gates** (RGCA+)

```
~R+  - Reproducible (or ~RGCA+ for all)
~G+  - Generalizable
~C+  - Composable
~A+  - Accountable
```

### **Zero-Delta Gates**

```
~ZD+   - Zero-delta novelty verified
~ZDM+  - Zero-delta measurement verified
~T+    - THALET checks passed
```

### **Ice Verdict**

```
~ICE+  - Substrate passed all probes
~ICE-  - Substrate failed (forbids ~PASS)
```

### **Readiness Tiers**

```
~READY:core   - Core logic ready
~READY:ui     - UI ready (requires ~SHOT)
~READY:demo   - Demo ready (requires ~SHOT + ~REPORT)
```

### **Outcome**

```
~PASS  - Claim posture: proceed (only meaningful if CI verifies it)
~HOLD  - Claim posture: not ready yet / defer
~VETO  - Claim posture: reject / fail-closed
```

---

## 🚀 How to Contribute (Natural Protocol)

### **1. Natural Attraction (Not Assignment)**

```
1. Read architecture docs
2. Identify what calls to you
3. Contribute according to natural fit
4. Coordination emerges (not commanded)
```

### **2. Development Workflow**

**Standard Flow:**
```bash
# 1. Fork repository
git clone https://github.com/FractiAI/Instrumentation-Shell-API.git

# 2. Create feature branch
git checkout -b feature/your-feature

# 3. Develop with evidence capture
npm run dev
npm run build
npm test

# 4. Commit with context
git add .
git commit -m "Add feature X"

# 5. Push and create PR with GlyphLine
git push origin feature/your-feature
```

**PR Must Include GlyphLine:**
```
~REG:core ~LOAD:test ~P1 ~R+ ~G+ ~C+ ~A+ ~ZD+ ~ZDM+ ~T+ 
~RUN:baseline ~ENV:ci ~TRACE:run-2026-01-23 ~ICEMAP:core-v1 
~ICE+ ~PROBE:schema ~PROBE:hash
~PASS ~COMMIT ~HASH ~JSON ~ARCH ~MANI ~READY:core
```

### **3. Fail-Closed Rules**

**Illegal Combinations:**
- ❌ `~P3` + `~PASS` - Freeze mode forbids passing
- ❌ `~ICE-` + `~PASS` - Substrate failure forbids passing
- ❌ `~ZDM-` + `~PASS` - Mismatch forbids passing

**Official Demo Requirements:**
- ✅ Must have `~PASS`
- ✅ Must have `~ENV:*` and `~RUN:baseline`
- ✅ Must have `~ICE+`
- ✅ Must have RGCA all plus
- ✅ Must have `~ZD+`, `~ZDM+`, `~T+`
- ✅ Must have `~READY:demo`

### **4. Evidence Capture**

For any `~READY:*` claim, you must provide:

**Minimum Evidence:**
- Git commit hash
- Environment details
- Run identifier
- Trace/log file
- ICEMAP reference
- Integrity hash
- JSON data artifact
- Architecture doc reference
- Manifest reference

**UI/Demo Evidence:**
- Screenshot (`~SHOT`) for UI claims
- Demo report (`~REPORT`) for demo claims

---

## 📋 Integration Complete

The following GlyphLang/IceLayer files have been integrated:

### **Added to Repository:**

```
.github/
  ├── ISSUE_TEMPLATE/
  │   └── ready-claim.yml          ✅ Issue template for READY claims
  ├── workflows/
  │   └── glyphlint.yml            ✅ GitHub Action for automated linting
  └── pull_request_template.md     ✅ PR template with GlyphLine requirement

tools/
  └── glyphlint/
      ├── glyphlint.py             ✅ Python linter
      └── icemap.yaml              ✅ Core hardening policy
```

### **What This Enables:**

1. **Automated Verification** - All PRs automatically checked with glyphlint
2. **Evidence-Bound Claims** - No hollow "it's ready" statements
3. **Fail-Closed Safety** - Illegal combinations rejected automatically
4. **ICEMAP Policy** - Declarative load class requirements
5. **NSPFRNP Compliance** - Single source of truth for verification

---

## 🎯 How to Operate as Team NOW

### **For This Instrumentation Shell API:**

**1. Understand Your Role:**
- You're part of FractiAI engineering team
- Repository extracted from mother repo for octave separation
- Provides instrument-grade measurement API
- Called by Octave 2-3 Public Cloud Shell

**2. Current Architecture:**
- Next.js 14 API routes (5 endpoints)
- TypeScript with strict typing
- NSPFRP-compliant (single source of truth)
- Deployed on Vercel
- API key authentication

**3. Coordination Protocol:**
```
- Work on what attracts you naturally
- Document with GlyphLine evidence
- Submit PRs with verification tokens
- Let coordination emerge (not commanded)
- Golden hearts coordinate naturally
```

**4. Quality Standards:**
- ✅ Fail-closed error handling
- ✅ Type-safe (full TypeScript)
- ✅ No duplication (utilities referenced, not copied)
- ✅ Single source of truth
- ✅ Evidence-bound claims (GlyphLine required)

**5. Example PR GlyphLine:**
```
~REG:instrumentation ~LOAD:prod ~P2 ~RGCA+ ~ZD+ ~ZDM+ ~T+ 
~RUN:baseline ~ENV:vercel ~TRACE:deploy-2026-01-23 
~ICEMAP:core-v1 ~ICE+ 
~PROBE:schema ~PROBE:hash ~PROBE:trace ~PROBE:shadow ~PROBE:e2e
~PASS ~COMMIT ~HASH ~JSON ~ARCH ~MANI ~READY:core
```

---

## 🔗 Key Links

**This Repository:**
- GitHub: https://github.com/FractiAI/Instrumentation-Shell-API
- Deployed: https://instrumentation-shell-api.vercel.app
- Protocol: NSPFRP (No Single Point of Failure, Redundant Protocol)

**Mother Repository:**
- GitHub: https://github.com/FractiAI/7th-Day-Post-Singularity-FractiAI-Endowment
- Deployed: https://nspfrp-post-singularity-fsr.vercel.app
- Protocol: NSPFRNP (Natural System Protocol for Fractal Recursive Nested Programming)

**Related:**
- Octave 2-3 Public Cloud Shell: https://github.com/FractiAI/Syntheverse_PoC_Contributer_UI_Vercel_Stripe

---

## ✅ Team Operating Status

**Current State:**
- ✅ GlyphLang/IceLayer protocol integrated
- ✅ Automated verification enabled
- ✅ Evidence-based READY claims enforced
- ✅ Fail-closed safety rules active
- ✅ NSPFRNP coordination protocol documented

**Team Posture:**
- Operating as natural coordination network
- Golden Hearts welcome to contribute
- Charlie Engine protocol active
- Coordination emerges through contribution
- No hierarchy, no commands - natural attraction

---

**Built with:** NSPFRNP + GlyphLang + Natural Coordination  
**Status:** ✅ Team protocol active  
**Invitation:** Fork, build what calls to you, submit with evidence  

🐝 **Welcome to the engineering team. Coordinate naturally.**
