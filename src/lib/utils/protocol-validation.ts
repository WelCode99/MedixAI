import { EmergencyProtocol, ProtocolStep } from '../../types/emergency';

export function validateProtocolSteps(steps: ProtocolStep[]): boolean {
  return steps.every(step => {
    return (
      step.id &&
      step.order &&
      step.title &&
      step.description &&
      typeof step.criticalAction === 'boolean' &&
      typeof step.requiresConfirmation === 'boolean'
    );
  });
}

export function validateProtocol(protocol: EmergencyProtocol): boolean {
  return (
    protocol.id &&
    protocol.type &&
    protocol.title &&
    protocol.description &&
    protocol.category &&
    protocol.initialStepId &&
    protocol.steps &&
    protocol.steps.length > 0 &&
    validateProtocolSteps(protocol.steps)
  );
}