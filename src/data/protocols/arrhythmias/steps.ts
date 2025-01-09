import { ProtocolStep } from '../../../types/emergency';
import { arrhythmiaMedications } from './medications';

export const arrhythmiaSteps: ProtocolStep[] = [
  {
    id: 'initial-assessment',
    order: 1,
    title: 'Avaliação Inicial',
    description: '1. ABC + Sinais vitais\n2. ECG 12 derivações\n3. Avaliar estabilidade:\n• Hipotensão\n• Dor torácica\n• Dispneia\n• Alteração nível consciência',
    shortDescription: 'ABC + ECG',
    criticalAction: true,
    requiresConfirmation: true,
    timer: {
      type: 'countdown',
      duration: 300,
      alert: true
    },
    nextSteps: ['rhythm-identification']
  },
  // ... other steps
];