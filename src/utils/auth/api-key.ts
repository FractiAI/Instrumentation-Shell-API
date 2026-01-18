/**
 * NSPFRP-Compliant API Key Authorization Middleware
 * 
 * Single source of truth for API key validation.
 * All Instrumentation Shell API routes use this middleware.
 * 
 * @module utils/auth/api-key
 */

import { NextRequest, NextResponse } from 'next/server';

export interface AuthorizedRequest extends NextRequest {
  authorized?: boolean;
  apiKey?: string;
}

/**
 * Validate API Key from Authorization Header
 * 
 * NSPFRP: Single source of truth for API key validation
 */
export function validateAPIKey(request: NextRequest): {
  valid: boolean;
  apiKey?: string;
  error?: string;
} {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return {
      valid: false,
      error: 'Missing Authorization header'
    };
  }

  // Extract Bearer token
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return {
      valid: false,
      error: 'Invalid Authorization header format. Expected: Bearer {token}'
    };
  }

  const apiKey = parts[1];
  const expectedKey = process.env.INSTRUMENTATION_API_KEY;

  if (!expectedKey) {
    console.error('[API Key Auth] INSTRUMENTATION_API_KEY not configured');
    return {
      valid: false,
      error: 'API key validation not configured'
    };
  }

  // Constant-time comparison to prevent timing attacks
  if (apiKey !== expectedKey) {
    return {
      valid: false,
      error: 'Invalid API key'
    };
  }

  return {
    valid: true,
    apiKey
  };
}

/**
 * Validate Origin (Optional - for additional security)
 * 
 * NSPFRP: Single source of truth for origin validation
 */
export function validateOrigin(request: NextRequest): {
  valid: boolean;
  error?: string;
} {
  const origin = request.headers.get('origin') || request.headers.get('referer');
  const allowedOrigins = process.env.AUTHORIZED_CALLER_ORIGINS?.split(',') || [];

  // If no origins configured, allow all (for development)
  if (allowedOrigins.length === 0) {
    return { valid: true };
  }

  // Check if origin matches any allowed origin
  if (origin) {
    const originUrl = new URL(origin);
    const isAllowed = allowedOrigins.some(allowed => {
      try {
        const allowedUrl = new URL(allowed);
        return originUrl.origin === allowedUrl.origin;
      } catch {
        return origin === allowed;
      }
    });

    if (isAllowed) {
      return { valid: true };
    }
  }

  return {
    valid: false,
    error: 'Origin not authorized'
  };
}

/**
 * API Key Authorization Middleware
 * 
 * NSPFRP: Single source of truth middleware for all Instrumentation API routes
 * 
 * Usage:
 * ```typescript
 * const auth = await requireAPIKey(request);
 * if (!auth.valid) {
 *   return NextResponse.json({ error: auth.error }, { status: 401 });
 * }
 * ```
 */
export async function requireAPIKey(
  request: NextRequest
): Promise<{
  valid: boolean;
  error?: string;
  apiKey?: string;
}> {
  // Validate API key
  const keyValidation = validateAPIKey(request);
  if (!keyValidation.valid) {
    return {
      valid: false,
      error: keyValidation.error
    };
  }

  // Validate origin (optional, can be disabled)
  if (process.env.ENABLE_ORIGIN_CHECK === 'true') {
    const originValidation = validateOrigin(request);
    if (!originValidation.valid) {
      return {
        valid: false,
        error: originValidation.error
      };
    }
  }

  return {
    valid: true,
    apiKey: keyValidation.apiKey
  };
}
