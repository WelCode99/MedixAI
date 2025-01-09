import { ProtocolStep } from '../../../types/emergency';
import { hypertensiveMedications } from './medications';

export const hypertensiveSteps: ProtocolStep[] = [
  {
    id: 'initial-assessment',
    order: 1,
    title: 'Avaliação Inicial',
    description: '1. Confirmar PA elevada\n2. Identificar LOA:\n• Neurológico\n• Cardíaco\n• Renal\n3. Classificar:\n• Emergência vs Urgência',
    shortDescription: 'PA + LOA',
    criticalAction: true,
    requiresConfirmation: true,
    timer: {
      type: 'countdown',
      duration: 300,
      alert: true
    },
    nextSteps: ['emergency-treatment', 'urgency-treatment']
  },
  // ... other steps
];