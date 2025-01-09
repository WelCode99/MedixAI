import { ProtocolStep, TimerConfig } from '../../../types/emergency';

export function createStep(
  params: Partial<ProtocolStep>
): ProtocolStep {
  return {
    id: params.id || '',
    order: params.order || 0,
    title: params.title || '',
    description: params.description || '',
    shortDescription: params.shortDescription,
    timeframe: params.timeframe,
    timer: params.timer,
    medications: params.medications || [],
    criticalAction: params.criticalAction || false,
    requiresConfirmation: params.requiresConfirmation || false,
    alternatives: params.alternatives,
    references: params.references,
    nextSteps: params.nextSteps,
    imageUrl: params.imageUrl
  };
}