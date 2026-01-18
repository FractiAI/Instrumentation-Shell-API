/**
 * Instrumentation Shell API Types
 * 
 * NSPFRP: Single source of truth for type definitions
 */

export interface MeasurementRequest {
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

export interface MeasurementResponse {
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

export interface VerificationRequest {
  measurementId: string;
  expectedHash: string;
  measurementData?: any;
}

export interface VerificationResponse {
  success: boolean;
  verified: boolean;
  integrity: {
    hash: string;
    matches: boolean;
    measurementId: string;
  };
}

export interface ScoreRequest {
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

export interface ScoreResponse {
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

export interface StatusResponse {
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
