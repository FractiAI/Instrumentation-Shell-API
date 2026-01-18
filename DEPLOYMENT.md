# Instrumentation Shell API: Vercel Deployment Guide

**Status:** ✅ **READY FOR DEPLOYMENT**  
**Protection:** API Key Bearer Token Authentication  
**Environment:** Vercel Production

---

## 🔐 API Protection Configuration

The Instrumentation Shell API is protected using **Bearer Token authentication** via the `Authorization` header.

### Required Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```env
# REQUIRED: API Key for authentication
INSTRUMENTATION_API_KEY=your-secret-api-key-here

# OPTIONAL: Origin validation (comma-separated list)
AUTHORIZED_CALLER_ORIGINS=https://syntheverse-poc.vercel.app,https://octave-2-public-cloud-shell.vercel.app

# OPTIONAL: Enable origin checking (set to "true" to enable)
ENABLE_ORIGIN_CHECK=false

# REQUIRED: Node environment
NODE_ENV=production
```

### API Authentication

All API routes (except `/api/instrumentation/status`) require authentication:

**Authorization Header:**
```
Authorization: Bearer {INSTRUMENTATION_API_KEY}
```

**Example Request:**
```bash
curl -X POST https://your-api.vercel.app/api/instrumentation/score \
  -H "Authorization: Bearer your-secret-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "novelty": 2000,
    "density": 2500,
    "coherence": 3000,
    "alignment": 2500
  }'
```

---

## 🚀 Deployment Steps

### 1. Deploy to Vercel

```bash
cd instrumentation-shell-api
vercel --prod
```

Or connect the GitHub repository to Vercel for automatic deployments.

### 2. Configure Environment Variables

In Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add `INSTRUMENTATION_API_KEY` (required)
3. Add `AUTHORIZED_CALLER_ORIGINS` (optional)
4. Set `ENABLE_ORIGIN_CHECK` to `"false"` (optional, for development)

### 3. Verify Deployment

**Status Endpoint (Public, no auth required):**
```bash
curl https://your-api.vercel.app/api/instrumentation/status
```

**Expected Response:**
```json
{
  "success": true,
  "status": "operational",
  "octave": "instrumentation-core",
  "version": "1.0.0"
}
```

**Protected Endpoint (Requires auth):**
```bash
curl -X POST https://your-api.vercel.app/api/instrumentation/score \
  -H "Authorization: Bearer {INSTRUMENTATION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"novelty": 2000, "density": 2500, "coherence": 3000, "alignment": 2500}'
```

---

## 🔒 Security Features

### 1. API Key Authentication
- ✅ Bearer token authentication on all protected routes
- ✅ Constant-time comparison to prevent timing attacks
- ✅ Secure key storage in Vercel environment variables

### 2. Origin Validation (Optional)
- ✅ Configurable origin whitelist
- ✅ Prevents unauthorized cross-origin requests
- ✅ Can be disabled for development

### 3. Security Headers
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `Strict-Transport-Security`
- ✅ `X-Robots-Tag: noindex, nofollow`

### 4. CORS Configuration
- ✅ Controlled CORS headers
- ✅ Method restrictions (GET, POST, OPTIONS)
- ✅ Content-Type validation

---

## 📡 API Endpoints

### 1. Status (Public)
- **Endpoint:** `GET /api/instrumentation/status`
- **Auth:** None required
- **Purpose:** Health check and status

### 2. Score (Protected)
- **Endpoint:** `POST /api/instrumentation/score`
- **Auth:** Required (Bearer token)
- **Purpose:** Generate atomic scores

### 3. Measure (Protected)
- **Endpoint:** `POST /api/instrumentation/measure`
- **Auth:** Required (Bearer token)
- **Purpose:** Request instrument-grade measurements

### 4. Verify (Protected)
- **Endpoint:** `POST /api/instrumentation/verify`
- **Auth:** Required (Bearer token)
- **Purpose:** Verify measurement integrity

### 5. State Image (Protected)
- **Endpoint:** `POST /api/instrumentation/state-image`
- **Auth:** Required (Bearer token)
- **Purpose:** Process state images

---

## ✅ Deployment Checklist

- [ ] Deploy to Vercel
- [ ] Set `INSTRUMENTATION_API_KEY` in Vercel environment variables
- [ ] (Optional) Set `AUTHORIZED_CALLER_ORIGINS` for origin validation
- [ ] (Optional) Set `ENABLE_ORIGIN_CHECK` to `"false"` for development
- [ ] Verify status endpoint is accessible
- [ ] Test protected endpoint with API key
- [ ] Update main repository to use new API URL
- [ ] Test integration from main application

---

## 🔗 Integration

After deployment, update the main repository to use the Instrumentation Shell API:

**API URL:** `https://your-instrumentation-api.vercel.app`

**Example Client Code:**
```typescript
const response = await fetch('https://your-api.vercel.app/api/instrumentation/score', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.INSTRUMENTATION_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    novelty: 2000,
    density: 2500,
    coherence: 3000,
    alignment: 2500,
  }),
});
```

---

**Status:** ✅ **Ready for Vercel Deployment with API Protection**
