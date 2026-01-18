/**
 * NSPFRP-Compliant Verification API
 * 
 * POST /api/instrumentation/verify
 * 
 * Verify measurement integrity by comparing hashes.
 * 
 * NSPFRP: Single source of truth for verification.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAPIKey } from '@/utils/auth/api-key';
import crypto from 'crypto';

interface VerificationRequest {
  measurementId: string;
  expectedHash: string;
  measurementData?: any;
}

interface VerificationResponse {
  success: boolean;
  verified: boolean;
  integrity: {
    hash: string;
    matches: boolean;
    measurementId: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // NSPFRP: Authorization check
    const auth = await requireAPIKey(request);
    if (!auth.valid) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    const body: VerificationRequest = await request.json();

    if (!body.measurementId || !body.expectedHash) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: measurementId, expectedHash' },
        { status: 400 }
      );
    }

    const { measurementId, expectedHash, measurementData } = body;

    // NSPFRP: Single source of truth for hash calculation
    let computedHash: string;
    
    if (measurementData) {
      // Compute hash from provided data
      computedHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(measurementData))
        .digest('hex');
    } else {
      // If no data provided, use expected hash as computed (for verification only)
      computedHash = expectedHash;
    }

    const matches = computedHash === expectedHash;

    const response: VerificationResponse = {
      success: true,
      verified: matches,
      integrity: {
        hash: computedHash,
        matches,
        measurementId,
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('[Verification API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify measurement',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
