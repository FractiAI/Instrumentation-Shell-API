/**
 * NSPFRP-Compliant Measurement API
 * 
 * POST /api/instrumentation/measure
 * 
 * Request instrument-grade measurements for submissions.
 * 
 * NSPFRP: Single source of truth for measurement requests.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAPIKey } from '@/utils/auth/api-key';
import { AtomicScorer } from '@/utils/scoring/AtomicScorer';
import crypto from 'crypto';

interface MeasurementRequest {
  submissionHash: string;
  evaluation: {
    novelty: number;
    density: number;
    coherence: number;
    alignment: number;
    pod_score?: number;
  };
  metadata?: Record<string, any>;
  toggles?: {
    seed?: boolean;
    edge?: boolean;
    overlap?: boolean;
  };
  bridgeSpec?: any;
}

interface MeasurementResponse {
  success: boolean;
  measurement: {
    id: string;
    timestamp: string;
    scores: {
      novelty: number;
      density: number;
      coherence: number;
      alignment: number;
      final: number;
    };
    atomic_score: any;
    integrity: {
      hash: string;
      verified: boolean;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    // NSPFRP: Authorization check (single source of truth)
    const auth = await requireAPIKey(request);
    if (!auth.valid) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    const body: MeasurementRequest = await request.json();

    // Validate request
    if (!body.submissionHash || !body.evaluation) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: submissionHash, evaluation' },
        { status: 400 }
      );
    }

    const { submissionHash, evaluation, toggles, bridgeSpec } = body;

    // NSPFRP: Use AtomicScorer (single source of truth for scoring)
    const scorer = AtomicScorer.getInstance();
    const atomicScore = scorer.computeScore({
      novelty: evaluation.novelty,
      density: evaluation.density,
      coherence: evaluation.coherence,
      alignment: evaluation.alignment,
      toggles: toggles || {},
      seed: null,
      bridgeSpec: bridgeSpec || null,
    });

    // Generate measurement ID
    const measurementId = crypto
      .createHash('sha256')
      .update(`${submissionHash}-${Date.now()}`)
      .digest('hex')
      .substring(0, 16);

    // Create integrity hash
    const integrityHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(atomicScore))
      .digest('hex');

    const response: MeasurementResponse = {
      success: true,
      measurement: {
        id: measurementId,
        timestamp: new Date().toISOString(),
        scores: {
          novelty: evaluation.novelty,
          density: evaluation.density,
          coherence: evaluation.coherence,
          alignment: evaluation.alignment,
          final: atomicScore.final,
        },
        atomic_score: atomicScore,
        integrity: {
          hash: integrityHash,
          verified: true,
        },
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('[Measurement API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process measurement request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
