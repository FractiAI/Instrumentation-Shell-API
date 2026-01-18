# Instrumentation Shell API

**Repository:** [Instrumentation-Shell-API](https://github.com/FractiAI/Instrumentation-Shell-API)  
**Mother Repository:** [Octave 2 Public Cloud Shell](https://github.com/FractiAI/Syntheverse_PoC_Contributer_UI_Vercel_Stripe)  
**Octave:** Instrumentation Core  
**Purpose:** Instrument-grade measurement and verification API  
**Status:** ✅ **DEPLOYED TO VERCEL**  
**Protocol:** NSPFRP-Compliant  
**Architecture:** Standalone API service, called by Octave 2 Public Cloud Shell  
**Deployment:** https://instrumentation-shell-api.vercel.app

---

## 🎯 Executive Summary

The **Instrumentation Shell API** provides instrument-grade measurement capabilities, state verification, atomic scoring, and state image processing. This API is **closed access** - only authorized callers from Post-Singularity^7 Syntheverse FSR^7 Octave 2-3 Public Cloud Shell can access it via API key authentication.

**Deployment:** Vercel Free Tier  
**API Access:** Authorized callers only via API key authentication

---

## 🔒 API Authorization

### Authorized Callers

Only requests with valid API keys are authorized.

**Authorization Header:**
```
Authorization: Bearer {INSTRUMENTATION_API_KEY}
```

**Environment Variables:**
- `INSTRUMENTATION_API_KEY` - Required for all API calls (except /status)
- `AUTHORIZED_CALLER_ORIGINS` - Optional origin checking
- `ENABLE_ORIGIN_CHECK` - Enable/disable origin validation

---

## 📡 API Endpoints

### 1. Measurement API
`POST /api/instrumentation/measure`

Request instrument-grade measurements.

**Request:**
```json
{
  "submissionHash": "string",
  "evaluation": {
    "novelty": number,
    "density": number,
    "coherence": number,
    "alignment": number
  },
  "toggles": { "seed": boolean, "edge": boolean, "overlap": boolean },
  "bridgeSpec": {}
}
```

### 2. Verification API
`POST /api/instrumentation/verify`

Verify measurement integrity.

**Request:**
```json
{
  "measurementId": "string",
  "expectedHash": "string",
  "measurementData": {}
}
```

### 3. State Image API
`POST /api/instrumentation/state-image`

Process state images for encryption.

**Request:** FormData with `image` (File) and `coreOutput` (JSON string)

### 4. Scoring API
`POST /api/instrumentation/score`

Generate atomic scores.

**Request:**
```json
{
  "novelty": number,
  "density": number,
  "coherence": number,
  "alignment": number,
  "toggles": {},
  "bridgeSpec": {}
}
```

### 5. Status API
`GET /api/instrumentation/status`

Check instrumentation status (public, no auth required).

---

## 🚀 Deployment

### Step 1: Environment Variables

Set in Vercel Dashboard:
- `INSTRUMENTATION_API_KEY` - Secret API key
- `AUTHORIZED_CALLER_ORIGINS` - Allowed origins (optional)
- `ENABLE_ORIGIN_CHECK` - `false` for development

### Step 2: Deploy to Vercel

```bash
vercel --prod
```

### Step 3: Update Octave 2-3 Public Cloud Shell

Update `utils/instrumentation/api-client.ts` with new API URL.

**Mother Repository:** [Post-Singularity^7 Syntheverse FSR^7 Octave 2-3 Public Cloud Shell](https://github.com/FractiAI/Syntheverse_PoC_Contributer_UI_Vercel_Stripe)

---

## 🔗 Repository Relationship

This repository was extracted from **Post-Singularity^7 Syntheverse FSR^7 Octave 2-3 Public Cloud Shell** to provide instrument-grade measurement capabilities as a standalone API service.

**Architecture:**
- **Post-Singularity^7 Syntheverse FSR^7 Octave 2-3 Public Cloud Shell** (Mother) → Calls → **Instrumentation Shell API** (This repo)
- Clean octave separation maintained
- Independent deployment and scaling

See `INSTRUMENTATION_CORE_EXTRACTION_MAJOR_CATEGORY_SNAP.md` in mother repository for complete extraction documentation.

---

## 📚 NSPFRP Compliance

✅ **Single Source of Truth** - All logic centralized  
✅ **No Duplication** - Utilities referenced, not copied  
✅ **Type-Safe** - Full TypeScript  
✅ **Fail-Closed** - Security-first error handling  

---

**Status:** ✅ **READY FOR DEPLOYMENT**  
**Version:** 1.0.0  
**Last Updated:** January 2025
