import { ProtocolStep } from '../../../types/emergency';
import { hypoglycemiaMedications } from './medications';

export const hypoglycemiaSteps: ProtocolStep[] = [
  {
    id: 'initial-assessment',
    order: 1,
    title: 'Avaliação Inicial',
    description: '1. Confirmar glicemia < 70mg/dL\n2. Avaliar nível consciência\n3. Verificar sintomas:\n• Adrenérgicos\n• Neuroglicopênicos\n4. Identificar causa',
    shortDescription: 'Glicemia + Sintomas',
    criticalAction: true,
    requiresConfirmation: true,
    timer: {
      type: 'countdown',
      duration: 300,
      alert: true
    },
    nextSteps: ['conscious-treatment', 'unconscious-treatment']
  },
  // ... other steps
];