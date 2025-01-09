import { EmergencyProtocol } from '../../types/emergency';

export const lowerGiBleedingProtocol: EmergencyProtocol = {
  id: 'lower-gi-bleeding',
  type: 'gi-bleeding',
  title: 'HDB - ACG 2023',
  description: 'Protocolo de atendimento à Hemorragia Digestiva Baixa baseado nas diretrizes da American College of Gastroenterology (ACG) 2023.',
  category: 'Gastroenterologia',
  initialStepId: 'initial-assessment',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'American College of Gastroenterology',
  evidenceLevel: 'A',
  references: [
    'ACG Clinical Guideline: Lower GI Bleeding 2023',
    'ESGE Guidelines for Lower GI Bleeding 2023',
    'Brazilian Guidelines for Lower GI Bleeding 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Avaliação Inicial',
      description: '1. ABC + Sinais vitais\n2. Acessos calibrosos\n3. História:\n• Características do sangramento\n• Medicações\n• Comorbidades\n4. Exame físico completo',
      shortDescription: 'ABC + História',
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
      description: '1. Cristaloide:\n• 500mL bolus\n• Reavaliação frequente\n\n2. Transfusão se:\n• Hb < 7 (sem comorbidade)\n• Hb < 8 (cardiopata)\n\n3. Reversão anticoagulação se necessário',
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
      nextSteps: ['risk-assessment']
    },
    {
      id: 'risk-assessment',
      order: 3,
      title: 'Estratificação de Risco',
      description: 'Alto Risco:\n• Instabilidade HD\n• Sangramento ativo\n• Anticoagulação\n• Comorbidades graves\n\nBaixo Risco:\n• Estável\n• Sem comorbidades\n• Sangramento autolimitado',
      shortDescription: 'Risco',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['diagnostic-approach']
    },
    {
      id: 'diagnostic-approach',
      order: 4,
      title: 'Abordagem Diagnóstica',
      description: '1. Exames iniciais:\n• Hemograma\n• Coagulograma\n• Função renal\n\n2. Nasogastrica se dúvida HDA\n\n3. Considerar:\n• AngioTC se instável\n• Colonoscopia se estável',
      shortDescription: 'Diagnóstico',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 3600,
        alert: true
      },
      nextSteps: ['endoscopy-timing']
    },
    {
      id: 'endoscopy-timing',
      order: 5,
      title: 'Timing Colonoscopia',
      description: 'Muito urgente (< 12h):\n• Instabilidade persistente\n• Sangramento ativo grave\n\nUrgente (< 24h):\n• Alto risco estável\n\nEletiva (24-72h):\n• Baixo risco\n• Estável',
      shortDescription: 'Colonoscopia',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 43200,
        alert: true
      },
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 6,
      title: 'Monitorização',
      description: '1. Sinais vitais seriados\n2. Débito urinário\n3. Hemograma controle\n4. Ressangramento\n\nCritérios Alta:\n• Estável 24h\n• Sem sangramento\n• Causa identificada\n• Seguimento definido',
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