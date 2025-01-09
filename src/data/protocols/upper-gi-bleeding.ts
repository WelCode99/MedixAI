import { EmergencyProtocol } from '../../types/emergency';

export const upperGiBleedingProtocol: EmergencyProtocol = {
  id: 'upper-gi-bleeding',
  type: 'gi-bleeding',
  title: 'HDA - ACG 2023',
  description: 'Protocolo de atendimento à Hemorragia Digestiva Alta baseado nas diretrizes da American College of Gastroenterology (ACG) 2023.',
  category: 'Gastroenterologia',
  initialStepId: 'initial-assessment',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'American College of Gastroenterology',
  evidenceLevel: 'A',
  references: [
    'ACG Clinical Guideline: Upper GI Bleeding 2023',
    'ESGE Guidelines for Non-variceal Upper GI Bleeding 2023',
    'Brazilian Guidelines for Upper GI Bleeding 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Avaliação Inicial',
      description: '1. ABC + Sinais vitais\n2. Acessos calibrosos\n3. Classificar gravidade:\n• Glasgow-Blatchford\n• AIMS65\n4. História:\n• Medicações\n• Comorbidades\n• Cirrose',
      shortDescription: 'ABC + Scores',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['resuscitation']
    },
    {
      id: 'resuscitation',
      order: 2,
      title: 'Ressuscitação',
      description: '1. Cristaloide:\n• 500mL bolus\n• Reavaliação frequente\n\n2. Transfusão se:\n• Hb < 7 (não cirrótico)\n• Hb < 8 (cirrótico/cardiopata)\n\n3. Plaquetas se < 50.000',
      shortDescription: 'Volume',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Cristaloide',
          dose: '500mL',
          route: 'IV',
          notes: 'Bolus, repetir conforme resposta'
        }
      ],
      nextSteps: ['medical-therapy']
    },
    {
      id: 'medical-therapy',
      order: 3,
      title: 'Terapia Medicamentosa',
      description: '1. IBP:\n• Omeprazol 80mg IV bolus\n• 8mg/h infusão contínua\n\n2. Se suspeita varizes:\n• Octreotide 50mcg IV\n• 50mcg/h infusão\n• ATB profilático\n\n3. Reversão anticoagulação se necessário',
      shortDescription: 'IBP + Octreotide',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Omeprazol',
          dose: '80mg bolus + 8mg/h',
          route: 'IV',
          notes: 'Infusão contínua 72h'
        },
        {
          drug: 'Octreotide',
          dose: '50mcg bolus + 50mcg/h',
          route: 'IV',
          notes: 'Se suspeita varizes'
        }
      ],
      nextSteps: ['endoscopy-timing']
    },
    {
      id: 'endoscopy-timing',
      order: 4,
      title: 'Timing Endoscopia',
      description: 'Muito urgente (< 12h):\n• Instabilidade\n• Hematemese fresca\n\nUrgente (< 24h):\n• Estável + alto risco\n• Glasgow-Blatchford > 8\n\nEletiva (< 72h):\n• Baixo risco\n• Estável',
      shortDescription: 'EDA',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 43200,
        alert: true
      },
      nextSteps: ['post-endoscopy']
    },
    {
      id: 'post-endoscopy',
      order: 5,
      title: 'Pós-Endoscopia',
      description: '1. Manter IBP:\n• Alto risco: infusão 72h\n• Baixo risco: oral\n\n2. Se varizes:\n• Manter octreotide 3-5d\n• Propranolol após estável\n\n3. Monitorizar:\n• Ressangramento\n• Hb seriado',
      shortDescription: 'Seguimento',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 7200,
        alert: true
      }
    }
  ]
};