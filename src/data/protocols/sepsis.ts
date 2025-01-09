import { EmergencyProtocol } from '../../types/emergency';

export const sepsisProtocol: EmergencyProtocol = {
  id: 'sepsis-severe',
  type: 'sepsis',
  title: 'Sepse Grave - SSC 2023',
  description: 'Protocolo de atendimento à Sepse baseado na Surviving Sepsis Campaign 2023. Intervenções tempo-dependentes.',
  category: 'Infectologia',
  initialStepId: 'initial-assessment',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'Surviving Sepsis Campaign',
  evidenceLevel: 'A',
  references: [
    'Surviving Sepsis Campaign: International Guidelines 2023',
    'SCCM/ESICM Sepsis Guidelines 2023',
    'Brazilian Sepsis Committee Guidelines 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Triagem qSOFA',
      description: 'Avaliar critérios qSOFA:\n• Frequência respiratória ≥ 22/min\n• PAS ≤ 100 mmHg\n• Alteração do estado mental\n\nScore ≥ 2 indica alto risco',
      shortDescription: 'qSOFA',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['cultures']
    },
    {
      id: 'cultures',
      order: 2,
      title: 'Coleta de Culturas',
      description: 'Coletar ANTES dos antibióticos:\n• Hemoculturas (2 pares)\n• Urocultura\n• Culturas de outros sítios suspeitos\n\nNÃO ATRASAR antibióticos > 45min',
      shortDescription: 'Culturas',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 900,
        alert: true
      },
      nextSteps: ['antibiotics']
    },
    {
      id: 'antibiotics',
      order: 3,
      title: 'Antibioticoterapia',
      description: 'Iniciar antibióticos em até 1 hora:\n\nFoco Pulmonar:\n• Ceftriaxona 2g IV + Azitromicina 500mg IV\n\nFoco Abdominal:\n• Piperacilina-Tazobactam 4.5g IV\n\nFoco Urinário:\n• Cefepime 2g IV\n\nFoco Indeterminado:\n• Meropenem 1g IV + Vancomicina 15-20mg/kg',
      shortDescription: 'ATB < 1h',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Antibióticos',
          dose: 'Conforme foco',
          route: 'IV',
          notes: 'Primeira dose em bolus'
        }
      ],
      timer: {
        type: 'countdown',
        duration: 3600,
        alert: true
      },
      nextSteps: ['fluid-resuscitation']
    },
    {
      id: 'fluid-resuscitation',
      order: 4,
      title: 'Ressuscitação Volêmica',
      description: 'Cristaloides 30ml/kg em 3 horas:\n• Ringer Lactato preferencial\n• Avaliar resposta a volume\n• Considerar albumina se necessário volume expressivo\n\nMetas:\n• PAM ≥ 65mmHg\n• Lactato < 2\n• Diurese > 0.5ml/kg/h',
      shortDescription: 'Cristaloides 30ml/kg',
      timeframe: '1ª hora',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Cristaloide',
          dose: '30ml/kg',
          route: 'IV',
          notes: 'Preferir Ringer Lactato'
        }
      ],
      timer: {
        type: 'countdown',
        duration: 10800, // 3 horas
        alert: true
      },
      nextSteps: ['vasopressors']
    },
    {
      id: 'vasopressors',
      order: 5,
      title: 'Vasopressores',
      description: 'Se hipotensão persistente após volume:\n\n1ª escolha:\n• Noradrenalina 0.05-3.3 mcg/kg/min\n\n2ª escolha (adicionar):\n• Vasopressina 0.01-0.04 U/min\n\nMeta: PAM ≥ 65mmHg',
      shortDescription: 'Noradrenalina',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Noradrenalina',
          dose: '0.05-3.3 mcg/kg/min',
          route: 'IV contínuo',
          notes: 'Acesso central preferencial'
        }
      ],
      timer: {
        type: 'interval',
        interval: 900, // 15 minutos
        alert: true
      },
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 6,
      title: 'Monitorização',
      description: 'Monitorização contínua:\n• Lactato a cada 2-4h\n• Balanço hídrico horário\n• Saturação venosa central\n• Sinais de hipoperfusão\n\nConsiderar monitorização invasiva se choque refratário',
      shortDescription: 'Monitorar',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 3600,
        alert: true
      },
      nextSteps: ['reassessment']
    }
  ]
};