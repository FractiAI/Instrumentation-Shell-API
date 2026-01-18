/**
 * NSPFRP-Compliant State Image API
 * 
 * POST /api/instrumentation/state-image
 * 
 * Process state images for encryption using fiberoptic state extraction.
 * 
 * NSPFRP: Single source of truth for state image processing.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAPIKey } from '@/utils/auth/api-key';
import { processStateImageWithNSPFRP } from '@/utils/nspfrp/state-imaging-protocol';
import { extractFiberopticState } from '@/utils/omnibeam/fiberoptic-state-extractor';

interface StateImageRequest {
  image: string; // Base64 encoded image
  coreOutput: {
    evaluation?: any;
    scores?: {
      novelty?: number;
      density?: number;
      coherence?: number;
      alignment?: number;
      pod_score?: number;
    };
    submissionHash: string;
  };
  options?: {
    channels?: 'rgb' | 'grayscale';
    keyLength?: number;
    iterations?: number;
  };
}

interface StateImageResponse {
  success: boolean;
  stateImage: {
    stateId: string;
    stateHash: string;
    encryptionKeyHash: string;
    coreOutputHash: string;
    submissionHash: string;
  };
  verification: {
    integrityVerified: boolean;
    timestamp: number;
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

    const formData = await request.formData();
    const imageFile = formData.get('image') as File;
    const coreOutputStr = formData.get('coreOutput') as string;
    const optionsStr = formData.get('options') as string | null;

    if (!imageFile || !coreOutputStr) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: image, coreOutput' },
        { status: 400 }
      );
    }

    // Parse core output
    const coreOutput = JSON.parse(coreOutputStr);
    const options = optionsStr ? JSON.parse(optionsStr) : {};

    // Convert File to Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // NSPFRP: Use state imaging protocol (single source of truth)
    const protection = await processStateImageWithNSPFRP(
      imageBuffer,
      coreOutput,
      options
    );

    const response: StateImageResponse = {
      success: true,
      stateImage: {
        stateId: protection.stateImage.stateId,
        stateHash: protection.stateImage.stateHash,
        encryptionKeyHash: protection.stateImage.encryptionKeyHash,
        coreOutputHash: protection.stateImage.coreOutputHash,
        submissionHash: protection.stateImage.submissionHash,
      },
      verification: {
        integrityVerified: protection.verification.integrityVerified,
        timestamp: protection.verification.timestamp,
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('[State Image API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process state image',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
