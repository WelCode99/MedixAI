import { EmergencyProtocol } from '../../types/emergency';

export const hypertensiveCrisisProtocol: EmergencyProtocol = {
  id: 'hypertensive-crisis',
  type: 'hypertension',
  title: 'Crise Hipertensiva - AHA/ACC 2024',
  description: 'Protocolo de atendimento à Crise Hipertensiva baseado nas diretrizes da American Heart Association/American College of Cardiology 2024.',
  category: 'Cardiovascular',
  initialStepId: 'initial-assessment',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  source: 'AHA/ACC Guidelines',
  evidenceLevel: 'A',
  references: [
    'AHA/ACC Guidelines for Hypertensive Crisis Management 2024',
    'ESC Guidelines for Arterial Hypertension 2023',
    'Brazilian Guidelines for Hypertensive Crisis 2023'
  ],
  steps: [
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
    {
      id: 'emergency-treatment',
      order: 2,
      title: 'Emergência Hipertensiva',
      description: 'Indicações:\n• Encefalopatia\n• SCA\n• ICC aguda\n• Dissecção aórtica\n\nMeta: ↓ 25% PA em 1h\nInternação em UTI',
      shortDescription: 'Emergência',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Nitroprussiato',
          dose: '0.3-10 mcg/kg/min',
          route: 'IV',
          notes: 'Titular cada 2min'
        },
        {
          drug: 'Nitroglicerina',
          dose: '5-200 mcg/min',
          route: 'IV',
          notes: 'Se SCA/ICC'
        }
      ],
      nextSteps: ['monitoring']
    },
    {
      id: 'urgency-treatment',
      order: 2,
      title: 'Urgência Hipertensiva',
      description: 'Sem LOA aguda\nMeta: ↓ PA em 24-48h\n\nOpções:\n1. Captopril 25mg VO\n2. Clonidina 0.1-0.2mg VO\n3. Amlodipina 5-10mg VO',
      shortDescription: 'Urgência',
      criticalAction: false,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Captopril',
          dose: '25mg',
          route: 'VO',
          notes: 'Pode repetir 1h'
        }
      ],
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 3,
      title: 'Monitorização',
      description: '1. PA cada 15min (emergência)\n2. ECG seriado\n3. Função renal\n4. Sinais de LOA\n5. Resposta ao tratamento\n6. Ajuste de doses',
      shortDescription: 'Monitorar',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 900,
        alert: true
      }
    }
  ]
};