import { EmergencyProtocol } from '../../../types/emergency';

export function validateProtocol(protocol: EmergencyProtocol): boolean {
  if (!protocol.id || !protocol.type || !protocol.title) {
    return false;
  }

  if (!protocol.steps || protocol.steps.length === 0) {
    return false;
  }

  if (!protocol.initialStepId || !protocol.steps.find(step => step.id === protocol.initialStepId)) {
    return false;
  }

  return true;
}