import { EmergencyProtocol } from '../../types/emergency';

export const eclampsiaProtocol: EmergencyProtocol = {
  id: 'eclampsia',
  type: 'eclampsia',
  title: 'Eclâmpsia',
  description: 'Protocolo de atendimento à Eclâmpsia',
  category: 'Obstetrícia',
  initialStepId: 'initial-assessment',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'ACOG Practice Bulletin',
  evidenceLevel: 'A',
  references: [
    'ACOG Practice Bulletin 2022',
    'WHO Guidelines 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Avaliação Inicial',
      description: 'ABC. Posição em DLE. Proteção contra trauma.',
      shortDescription: 'ABC + DLE',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['magnesium-sulfate']
    }
  ]
};