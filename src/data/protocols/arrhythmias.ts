import { EmergencyProtocol } from '../../types/emergency';

export const arrhythmiasProtocol: EmergencyProtocol = {
  id: 'cardiac-arrhythmias',
  type: 'arrhythmias',
  title: 'Arritmias Cardíacas - AHA/ACC/HRS 2024',
  description: 'Protocolo de atendimento às Arritmias Cardíacas baseado nas diretrizes da American Heart Association/American College of Cardiology/Heart Rhythm Society 2024.',
  category: 'Cardiovascular',
  initialStepId: 'initial-assessment',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  source: 'AHA/ACC/HRS Guidelines',
  evidenceLevel: 'A',
  references: [
    'AHA/ACC/HRS Guidelines for Management of Patients With Ventricular Arrhythmias 2024',
    'AHA/ACC/HRS Guidelines for Management of SVT 2024',
    'Brazilian Guidelines for Cardiac Arrhythmias 2023'
  ],
  steps: [
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
    {
      id: 'rhythm-identification',
      order: 2,
      title: 'Identificação do Ritmo',
      description: 'Taquiarritmias:\n\nVentriculares:\n• TV monomórfica\n• TV polimórfica\n• FV\n\nSupraventriculares:\n• TSV\n• FA/Flutter\n• Taquicardia sinusal',
      shortDescription: 'Ritmo',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['vt-management', 'svt-management']
    },
    {
      id: 'vt-management',
      order: 3,
      title: 'Manejo TV/FV',
      description: 'Instável:\n• Cardioversão sincronizada\n• TV: 100J bifásico\n• FV: 200J bifásico\n\nEstável:\n• Amiodarona 150mg IV 10min\n• Procainamida 10mg/kg\n• Lidocaína 1-1.5mg/kg',
      shortDescription: 'TV/FV',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Amiodarona',
          dose: '150mg',
          route: 'IV',
          notes: 'Em 10 minutos'
        },
        {
          drug: 'Procainamida',
          dose: '10mg/kg',
          route: 'IV',
          notes: 'Máx 17mg/kg'
        }
      ],
      nextSteps: ['monitoring']
    },
    {
      id: 'svt-management',
      order: 3,
      title: 'Manejo TSV',
      description: 'Instável:\n• Cardioversão 50-100J\n\nEstável:\n1. Manobras vagais\n2. Adenosina:\n• 6mg IV rápido\n• Se necessário: 12mg\n3. Beta-bloqueador ou\nBloqueador canal Ca++',
      shortDescription: 'TSV',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Adenosina',
          dose: '6mg + 12mg se necessário',
          route: 'IV',
          notes: 'Bolus rápido'
        }
      ],
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 4,
      title: 'Monitorização',
      description: '1. Monitorização contínua\n2. Oximetria\n3. Controle pressórico\n4. ECG seriado\n5. Eletrólitos\n6. Função renal\n7. Avaliar anticoagulação',
      shortDescription: 'Monitorar',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 3600,
        alert: true
      }
    }
  ]
};