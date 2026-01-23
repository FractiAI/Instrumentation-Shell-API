# GlyphLang Quick Reference

**For Instrumentation Shell API Contributors**

---

## 🎯 Quick Token Reference

### **Core Tokens**

```
~REG:<region>           - Region identifier (e.g., ~REG:core)
~LOAD:<class>           - Load class (probe|test|prod|public|pay)
~P0, ~P1, ~P2, ~P3      - Pressure levels (0=low, 3=freeze)
~ENV:<environment>      - Environment (ci|dev|staging|vercel)
~RUN:<identifier>       - Run identifier (baseline|canary|shadow)
~TRACE:<reference>      - Trace/log reference
~ICEMAP:<id>            - Policy reference (core-v1)
```

### **Truth Gates**

```
~R+  - Reproducible (pass)
~G+  - Generalizable (pass)
~C+  - Composable (pass)
~A+  - Accountable (pass)
~RGCA+ - All four truth gates passed
```

### **Zero-Delta Gates**

```
~ZD+   - Zero-delta novelty verified
~ZD-   - Zero-delta failed
~ZDM+  - Zero-delta measurement verified
~ZDM-  - Measurement mismatch
~T+    - THALET checks passed
~T-    - THALET checks failed
```

### **Ice Verdict**

```
~ICE+  - Substrate passed all probes
~ICE-  - Substrate failed
~ICE?  - Substrate uncertain
```

### **Probes**

```
~PROBE:schema   - Schema validation
~PROBE:hash     - Hash integrity check
~PROBE:trace    - Trace verification
~PROBE:shadow   - Shadow testing
~PROBE:e2e      - End-to-end testing
~PROBE:diff     - Differential analysis
~PROBE:replay   - Replay verification
```

### **Signals** (Veto if present)

```
~SIG:mismatch   - Data mismatch detected
~SIG:leak       - Information leak detected
~SIG:crack      - Security crack detected
~SIG:seep       - Gradual degradation detected
~SIG:drift      - Behavior drift detected
```

### **Evidence Markers**

```
~COMMIT         - Git commit recorded
~HASH           - Integrity hash present
~JSON           - Atomic JSON artifact
~ARCH           - Architecture documented
~MANI           - Manifest present
~SHOT           - Screenshot evidence
~REPORT         - Demo report
```

### **Readiness**

```
~READY:core     - Core logic ready
~READY:ui       - UI ready (requires ~SHOT)
~READY:demo     - Demo ready (requires ~SHOT + ~REPORT)
```

### **Outcome**

```
~PASS           - All checks passed
~HOLD           - Not ready yet
~FAIL           - Failed verification
```

### **Demo**

```
~DEMO:official  - Official demo claim (strict requirements)
~DEMO:wip       - Work in progress demo
```

---

## 📋 Common GlyphLines

### **Basic Test Claim**

```
~REG:core ~LOAD:test ~P1 ~R+ ~G+ ~C+ ~A+ ~ZD+ ~ZDM+ ~T+ 
~RUN:baseline ~ENV:ci ~TRACE:test-2026-01-23 ~ICEMAP:core-v1 
~ICE+ ~PASS
```

### **Production Ready**

```
~REG:api ~LOAD:prod ~P2 ~RGCA+ ~ZD+ ~ZDM+ ~T+ 
~RUN:baseline ~ENV:vercel ~TRACE:deploy-2026-01-23 
~ICEMAP:core-v1 ~ICE+ ~PASS ~COMMIT ~HASH ~JSON ~ARCH ~MANI 
~READY:core
```

### **UI Ready**

```
~REG:ui ~LOAD:prod ~P2 ~RGCA+ ~ZD+ ~ZDM+ ~T+ 
~RUN:baseline ~ENV:vercel ~TRACE:ui-test-2026-01-23 
~ICEMAP:core-v1 ~ICE+ ~PASS ~COMMIT ~HASH ~JSON ~ARCH ~MANI 
~SHOT ~READY:ui
```

### **Official Demo**

```
~REG:demo ~LOAD:public ~P2 ~RGCA+ ~ZD+ ~ZDM+ ~T+ 
~RUN:baseline ~ENV:vercel ~TRACE:demo-2026-01-23 
~ICEMAP:core-v1 ~ICE+ ~PASS ~COMMIT ~HASH ~JSON ~ARCH ~MANI 
~SHOT ~REPORT ~READY:demo ~DEMO:official
```

### **Freeze Mode (Pay)**

```
~REG:payment ~LOAD:pay ~P3 ~RGCA+ ~ZD+ ~ZDM+ ~T+ 
~RUN:baseline ~ENV:prod ~TRACE:payment-2026-01-23 
~ICEMAP:core-v1 ~ICE+ ~HOLD ~COMMIT ~HASH ~JSON ~ARCH ~MANI
```
*(Note: ~P3 forbids ~PASS - must use ~HOLD)*

---

## ❌ Illegal Combinations

```
~P3 + ~PASS             ❌ Freeze mode forbids passing
~ICE- + ~PASS           ❌ Substrate failure forbids passing
~ZDM- + ~PASS           ❌ Mismatch forbids passing
~READY:* without bundle ❌ Evidence required
```

---

## 📦 Evidence Bundle Requirements

### **For ANY ~READY:* claim:**

**Core Bundle (ALL required):**
- [ ] `~COMMIT` - Git commit hash
- [ ] `~ENV:*` - Environment specified
- [ ] `~RUN:*` - Run identifier
- [ ] `~TRACE:*` - Trace reference
- [ ] `~ICEMAP:*` - Policy reference
- [ ] `~HASH` - Integrity hash
- [ ] `~JSON` - Atomic data artifact
- [ ] `~ARCH` - Architecture doc
- [ ] `~MANI` - Manifest

**UI Add-on:**
- [ ] `~SHOT` - Screenshot (required for ~READY:ui)

**Demo Add-on:**
- [ ] `~REPORT` - Demo report (required for ~READY:demo)

---

## 🔍 Load Class → Requirements Matrix

| Load | Pressure | Probes Required | Veto Signals |
|------|----------|-----------------|--------------|
| probe | P0+ | schema | mismatch, leak, crack |
| test | P1+ | schema, hash | mismatch, leak, crack |
| prod | P2+ | schema, hash, trace, shadow, e2e | mismatch, leak, crack, seep, drift |
| public | P2+ | schema, hash, trace, shadow, e2e, diff, replay | mismatch, leak, crack, seep, drift |
| pay | P3+ | schema, hash, trace, shadow, e2e, diff, replay | mismatch, leak, crack, seep, drift |

---

## 🧪 Testing Your GlyphLine

```bash
# Create test file with your GlyphLine
echo "YOUR_GLYPHLINE_HERE" > test.txt

# Run glyphlint
python tools/glyphlint/glyphlint.py \
  --icemap tools/glyphlint/icemap.yaml \
  --text test.txt

# Expected output:
# glyphlint: PASS  ✅
# or
# glyphlint: FAIL  ❌
# - Error message here
```

---

## 📝 PR Template Usage

When creating a PR, include:

```markdown
## Summary
Brief description of changes.

## GlyphLine
~REG:instrumentation ~LOAD:prod ~P2 ~RGCA+ ~ZD+ ~ZDM+ ~T+ 
~RUN:baseline ~ENV:vercel ~TRACE:deploy-2026-01-23 
~ICEMAP:core-v1 ~ICE+ ~PASS ~COMMIT ~HASH ~JSON ~ARCH ~MANI 
~READY:core

## Evidence Checklist
- [x] ~COMMIT recorded
- [x] ~ENV:* present
... (complete checklist)
```

---

## 🚀 Quick Start for Contributors

### **1. Make Changes**
```bash
git checkout -b feature/my-feature
# Make your changes
npm run build
npm test
```

### **2. Capture Evidence**
```bash
# Get commit hash
git rev-parse HEAD

# Get run trace
npm test > trace.log

# Create integrity hash
shasum -a 256 dist/bundle.js
```

### **3. Build GlyphLine**
```
~REG:instrumentation ~LOAD:test ~P1 ~RGCA+ ~ZD+ ~ZDM+ ~T+ 
~RUN:baseline ~ENV:ci ~TRACE:test-$(date +%Y-%m-%d) 
~ICEMAP:core-v1 ~ICE+ ~PASS ~COMMIT ~HASH ~ARCH
```

### **4. Create PR with GlyphLine**
- Use PR template
- Include evidence bundle if claiming ~READY
- Automated glyphlint will verify

---

## 🎓 Learning Path

**Level 1 - Basic:**
- Understand token syntax (~TOKEN, ~TOKEN:value)
- Know pressure levels (P0-P3)
- Recognize truth gates (RGCA)

**Level 2 - Intermediate:**
- Build complete GlyphLines
- Understand load classes
- Capture evidence properly

**Level 3 - Advanced:**
- Know ICEMAP policy details
- Understand probe requirements
- Master fail-closed rules
- Make official demo claims

---

## 📖 Full Documentation

- **[TEAM.md](./TEAM.md)** - Team structure and natural coordination protocol
- **[GLYPHLANG_INTEGRATION.md](./GLYPHLANG_INTEGRATION.md)** - Complete integration details
- **[README.md](./README.md)** - Main project documentation

---

**Protocol:** GlyphLang v0.3 + IceLayer v0.1  
**Status:** ✅ Active and enforced  
**Principle:** Evidence or hold. No hollow claims.

🔬 **Fail-closed verification enabled.**
