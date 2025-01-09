import { EmergencyProtocol } from '../../types/emergency';

export const palsProtocol: EmergencyProtocol = {
  id: 'pals',
  type: 'pals',
  title: 'PALS - AHA 2023',
  description: 'Protocolo de Suporte Avançado de Vida em Pediatria baseado nas diretrizes da American Heart Association (AHA) 2023. Objetivo: Ressuscitação cardiopulmonar pediátrica de alta qualidade.',
  category: 'Pediatria',
  initialStepId: 'initial-assessment',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'American Heart Association',
  evidenceLevel: 'A',
  references: [
    'AHA PALS Guidelines 2023',
    'ERC Pediatric Life Support 2021',
    'Brazilian Guidelines for Pediatric CPR 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Avaliação Inicial',
      description: 'Verificar:\n\n1. Responsividade\n2. Respiração\n3. Pulso central (10s)\n\nSe ausente:\n• Iniciar RCP\n• Chamar ajuda\n• Solicitar DEA/monitor',
      shortDescription: 'Resposta + Resp',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 30,
        alert: true
      },
      nextSteps: ['high-quality-cpr']
    },
    {
      id: 'high-quality-cpr',
      order: 2,
      title: 'RCP de Alta Qualidade',
      description: 'Compressões:\n• Frequência: 100-120/min\n• Profundidade: 1/3 do tórax\n• Retorno total do tórax\n• Minimizar interrupções\n\nRelação:\n• 15:2 com via aérea avançada\n• 30:2 sem via aérea (1 socorrista)\n• 15:2 sem via aérea (2 socorristas)',
      shortDescription: 'RCP',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 120,
        alert: true
      },
      nextSteps: ['rhythm-check']
    },
    {
      id: 'rhythm-check',
      order: 3,
      title: 'Verificar Ritmo',
      description: 'Avaliar ritmo:\n\nChocável:\n• FV\n• TV sem pulso\n\nNão chocável:\n• Assistolia\n• AESP\n\nMinimizar interrupção das compressões',
      shortDescription: 'Ritmo',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 10,
        alert: true
      },
      nextSteps: ['shockable-rhythm', 'non-shockable-rhythm']
    },
    {
      id: 'shockable-rhythm',
      order: 4,
      title: 'Ritmo Chocável',
      description: '1. Choque:\n• 2 J/kg primeira vez\n• 4 J/kg subsequentes\n\n2. Retomar RCP imediatamente\n\n3. Acesso vascular\n\n4. Epinefrina 0,01 mg/kg (0,1 mL/kg 1:10.000)\n• Repetir a cada 3-5 min',
      shortDescription: 'Choque',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Epinefrina',
          dose: '0,01 mg/kg',
          route: 'IV/IO',
          notes: 'Máx 1mg. Repetir 3-5 min'
        }
      ],
      timer: {
        type: 'interval',
        interval: 120,
        alert: true
      },
      nextSteps: ['amiodarone-administration']
    },
    {
      id: 'non-shockable-rhythm',
      order: 4,
      title: 'Ritmo Não-Chocável',
      description: '1. Continuar RCP\n\n2. Acesso vascular\n\n3. Epinefrina 0,01 mg/kg\n• Primeira dose imediata\n• Repetir 3-5 min\n\n4. Buscar causas reversíveis',
      shortDescription: 'Não-chocável',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Epinefrina',
          dose: '0,01 mg/kg',
          route: 'IV/IO',
          notes: 'Máx 1mg. Repetir 3-5 min'
        }
      ],
      timer: {
        type: 'interval',
        interval: 120,
        alert: true
      },
      nextSteps: ['reversible-causes']
    },
    {
      id: 'amiodarone-administration',
      order: 5,
      title: 'Amiodarona/Lidocaína',
      description: 'Após 2º choque sem sucesso:\n\nAmiodarona:\n• 5 mg/kg IV/IO\n• Pode repetir 2x\n\nOU\n\nLidocaína:\n• 1 mg/kg IV/IO\n• Pode repetir\n\nContinuar RCP + buscar causas',
      shortDescription: 'Antiarrítmico',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Amiodarona',
          dose: '5 mg/kg',
          route: 'IV/IO',
          notes: 'Máx 300mg. Pode repetir 2x'
        },
        {
          drug: 'Lidocaína',
          dose: '1 mg/kg',
          route: 'IV/IO',
          notes: 'Pode repetir se necessário'
        }
      ],
      nextSteps: ['reversible-causes']
    },
    {
      id: 'reversible-causes',
      order: 6,
      title: 'Causas Reversíveis',
      description: 'Avaliar e tratar:\n\nHipovolemia\nHipóxia\nH+ (acidose)\nHipo/Hipercalemia\nHipotermia\nTensão pneumotórax\nTamponamento\nToxinas\nTrombose pulmonar\nTrombose coronária',
      shortDescription: '10 H e T',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['post-rosc']
    },
    {
      id: 'post-rosc',
      order: 7,
      title: 'Pós-RCE',
      description: '1. Otimizar oxigenação (SpO2 94-99%)\n\n2. Manter PaCO2 35-45 mmHg\n\n3. Pressão adequada para idade\n\n4. Considerar TTM\n\n5. Tratar causa base\n\n6. Avaliar neuroproteção',
      shortDescription: 'Pós-RCE',
      criticalAction: true,
      requiresConfirmation: true
    }
  ]
};