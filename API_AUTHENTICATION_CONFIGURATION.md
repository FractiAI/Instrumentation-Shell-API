# API Authentication Configuration

**Status:** ✅ **CONFIRMED - API Authentication Enabled by Default**  
**Date:** January 17, 2025

---

## 🔐 Authentication Status

**CONFIRMED:** No one else can call the API except authorized users with a valid API key.

### Current Protection

All API endpoints (except `/api/instrumentation/status`) require authentication via Bearer token:

```
Authorization: Bearer {INSTRUMENTATION_API_KEY}
```

---

## ⚙️ Configurable Authentication

Authentication can be enabled/disabled via environment variable configuration:

### Environment Variable: `ENABLE_API_AUTH`

- **Default:** `true` (authentication REQUIRED)
- **Values:**
  - `ENABLE_API_AUTH=true`: **Authentication required** - Only users with valid API key can call the API
  - `ENABLE_API_AUTH=false`: **Authentication disabled** - Anyone can call the API (DEVELOPMENT/TESTING ONLY)

### Configuration Example

**Production (Authentication Required):**
```env
ENABLE_API_AUTH=true
INSTRUMENTATION_API_KEY=your-secret-api-key-here
```

**Development/Testing (Authentication Disabled):**
```env
ENABLE_API_AUTH=false
# INSTRUMENTATION_API_KEY not required when auth is disabled
```

⚠️ **WARNING:** Never set `ENABLE_API_AUTH=false` in production environments.

---

## 📋 Protected API Endpoints

All these endpoints require authentication when `ENABLE_API_AUTH=true`:

1. **POST /api/instrumentation/score** - Generate atomic scores
2. **POST /api/instrumentation/measure** - Request instrument-grade measurements
3. **POST /api/instrumentation/verify** - Verify measurement integrity
4. **POST /api/instrumentation/state-image** - Process state images

### Public Endpoint (No Auth Required)

- **GET /api/instrumentation/status** - Health check and status (always public)

---

## 🔒 Security Features

### 1. API Key Validation
- ✅ Bearer token format: `Authorization: Bearer {token}`
- ✅ Constant-time comparison to prevent timing attacks
- ✅ Secure key storage in environment variables
- ✅ Configurable enable/disable via `ENABLE_API_AUTH`

### 2. Origin Validation (Optional)
- ✅ Configurable via `AUTHORIZED_CALLER_ORIGINS` (comma-separated list)
- ✅ Enabled via `ENABLE_ORIGIN_CHECK=true`
- ✅ Prevents unauthorized cross-origin requests

### 3. Security Headers
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `Strict-Transport-Security`
- ✅ `X-Robots-Tag: noindex, nofollow`

---

## 📝 Implementation Details

### Auth Middleware Location

**File:** `instrumentation-shell-api/src/utils/auth/api-key.ts`

**Function:** `requireAPIKey(request: NextRequest)`

### Usage in API Routes

```typescript
import { requireAPIKey } from '@/utils/auth/api-key';

export async function POST(request: NextRequest) {
  // Check authentication (configurable)
  const auth = await requireAPIKey(request);
  if (!auth.valid) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: 401 }
    );
  }
  
  // API route logic here...
}
```

---

## ✅ Confirmation Summary

**Question:** Can anyone else call the API except authorized users?  
**Answer:** ✅ **NO** - Only authorized users with a valid API key can call the API.

**Configuration:** ✅ **YES** - Authentication is configurable via `ENABLE_API_AUTH` environment variable:
- Default: `true` (authentication required)
- Can be set to `false` for development/testing only
- Never disable in production

---

**Status:** ✅ **CONFIRMED - API Authentication Enabled and Configurable**
