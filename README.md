# Instrumentation Shell API

**Repository:** Instrumentation-Shell-API  
**Octave:** Instrumentation Core  
**Purpose:** Instrument-grade measurement and verification API  
**Status:** ✅ **READY FOR VERCEL DEPLOYMENT**  
**Protocol:** NSPFRP-Compliant  
**Architecture:** Standalone API service, calls Octave 2 Public Cloud Shell

---

## 🎯 Executive Summary

The **Instrumentation Shell API** provides instrument-grade measurement capabilities, state verification, atomic scoring, and state image processing. This API is **closed access** - only authorized callers from Octave 2 Public Cloud Shell can access it via API key authentication.

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

### Step 3: Update Octave 2 Public Cloud Shell

Update `utils/instrumentation/api-client.ts` with new API URL.

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
