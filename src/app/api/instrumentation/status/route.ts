/**
 * NSPFRP-Compliant Status API
 * 
 * GET /api/instrumentation/status
 * 
 * Public endpoint to check instrumentation status.
 * No authorization required.
 * 
 * NSPFRP: Single source of truth for status information.
 */

import { NextRequest, NextResponse } from 'next/server';

interface StatusResponse {
  success: boolean;
  status: 'active' | 'maintenance' | 'error';
  version: string;
  octave: string;
  timestamp: string;
  capabilities: {
    measurement: boolean;
    verification: boolean;
    stateImage: boolean;
    scoring: boolean;
  };
}

export async function GET(request: NextRequest) {
  try {
    // Public endpoint - no authorization required
    const response: StatusResponse = {
      success: true,
      status: 'active',
      version: '1.0.0',
      octave: 'instrumentation-core',
      timestamp: new Date().toISOString(),
      capabilities: {
        measurement: true,
        verification: true,
        stateImage: true,
        scoring: true,
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('[Status API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
