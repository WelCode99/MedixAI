import { EmergencyProtocol, ProtocolStep } from '../../../types/emergency';
import { validateProtocol } from '../../../lib/utils/protocol-validation';

export function createProtocol(
  params: Partial<EmergencyProtocol>
): EmergencyProtocol {
  const protocol: EmergencyProtocol = {
    id: params.id || '',
    type: params.type || 'emergency',
    title: params.title || '',
    description: params.description || '',
    category: params.category || 'Outros',
    initialStepId: params.initialStepId || '',
    steps: params.steps || [],
    version: params.version || '1.0',
    lastUpdated: params.lastUpdated || new Date(),
    source: params.source || '',
    evidenceLevel: params.evidenceLevel || 'B',
    references: params.references || []
  };

  if (!validateProtocol(protocol)) {
    throw new Error('Invalid protocol configuration');
  }

  return protocol;
}