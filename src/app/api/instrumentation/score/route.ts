/**
 * NSPFRP-Compliant Scoring API
 * 
 * POST /api/instrumentation/score
 * 
 * Generate atomic scores using AtomicScorer.
 * 
 * NSPFRP: Single source of truth for scoring.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAPIKey } from '@/utils/auth/api-key';
import { AtomicScorer } from '@/utils/scoring/AtomicScorer';

interface ScoreRequest {
  novelty: number;
  density: number;
  coherence: number;
  alignment: number;
  toggles?: {
    seed?: boolean;
    edge?: boolean;
    overlap?: boolean;
  };
  bridgeSpec?: any;
}

interface ScoreResponse {
  success: boolean;
  atomicScore: {
    final: number;
    trace: any;
    integrityHash: string;
    precision?: {
      n_hat: number;
      bubble_class: string;
      tier: string;
    };
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

    const body: ScoreRequest = await request.json();

    // Validate required fields
    if (
      typeof body.novelty !== 'number' ||
      typeof body.density !== 'number' ||
      typeof body.coherence !== 'number' ||
      typeof body.alignment !== 'number'
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid required fields: novelty, density, coherence, alignment' },
        { status: 400 }
      );
    }

    // NSPFRP: Use AtomicScorer (single source of truth)
    const scorer = AtomicScorer.getInstance();
    const atomicScore = scorer.computeScore({
      novelty: body.novelty,
      density: body.density,
      coherence: body.coherence,
      alignment: body.alignment,
      toggles: body.toggles || {},
      seed: null,
      bridgeSpec: body.bridgeSpec || null,
    });

    // Generate integrity hash
    const integrityHash = require('crypto')
      .createHash('sha256')
      .update(JSON.stringify(atomicScore))
      .digest('hex');

    const response: ScoreResponse = {
      success: true,
      atomicScore: {
        final: atomicScore.final,
        trace: atomicScore.trace,
        integrityHash,
        precision: atomicScore.trace.precision ? {
          n_hat: atomicScore.trace.precision.n_hat,
          bubble_class: atomicScore.trace.precision.bubble_class,
          tier: atomicScore.trace.precision.tier,
        } : undefined,
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('[Scoring API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to compute atomic score',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
