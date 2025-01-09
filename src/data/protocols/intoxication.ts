import { EmergencyProtocol } from '../../types/emergency';

export const intoxicationProtocol: EmergencyProtocol = {
  id: 'acute-intoxication',
  type: 'intoxication',
  title: 'Intoxicações Exógenas Agudas',
  description: 'Protocolo de atendimento às Intoxicações Exógenas Agudas baseado nas diretrizes do CIATox e UpToDate 2024.',
  category: 'Toxicologia',
  initialStepId: 'initial-assessment',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  source: 'CIATox/UpToDate',
  evidenceLevel: 'B',
  references: [
    'Manual de Toxicologia Clínica - CIATox 2023',
    'UpToDate - Acute Toxic Exposure Management 2024',
    'WHO Guidelines for Poison Control 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Avaliação Inicial',
      description: '1. ABC + Sinais Vitais\n\n2. História:\n• Agente tóxico\n• Dose/quantidade\n• Via de exposição\n• Tempo decorrido\n• Sintomas\n\n3. Exame físico direcionado\n\n4. Contatar CIATox',
      shortDescription: 'ABC + História',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['stabilization']
    },
    {
      id: 'stabilization',
      order: 2,
      title: 'Estabilização',
      description: '1. Via Aérea:\n• IOT se necessário\n• Glasgow < 8\n• Insuf. respiratória\n\n2. Circulação:\n• Acesso venoso\n• Hidratação\n• Monitorização\n\n3. Antídotos específicos se indicado',
      shortDescription: 'Estabilizar',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['decontamination']
    },
    {
      id: 'decontamination',
      order: 3,
      title: 'Descontaminação',
      description: 'Avaliar indicação:\n\n1. Cutânea:\n• Remover roupas\n• Lavar com água\n\n2. Ocular:\n• Irrigação contínua\n\n3. Digestiva:\n• Carvão ativado se indicado\n• Lavagem gástrica (raro)',
      shortDescription: 'Descontaminar',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Carvão Ativado',
          dose: '1g/kg',
          route: 'VO/SNG',
          notes: 'Até 50g, diluir 1:4 em água'
        }
      ],
      nextSteps: ['specific-measures']
    },
    {
      id: 'specific-measures',
      order: 4,
      title: 'Medidas Específicas',
      description: 'Antídotos comuns:\n\n1. Paracetamol → N-acetilcisteína\n2. Opióides → Naloxona\n3. BZD → Flumazenil\n4. Organofosforados → Atropina\n5. Metanol → Etanol/Fomepizol\n\nConsultar CIATox para doses',
      shortDescription: 'Antídotos',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'N-acetilcisteína',
          dose: '150mg/kg em 1h, depois 50mg/kg em 4h, depois 100mg/kg em 16h',
          route: 'IV',
          notes: 'Para intoxicação por paracetamol'
        },
        {
          drug: 'Naloxona',
          dose: '0,4-2mg',
          route: 'IV/IM/IN',
          notes: 'Pode repetir 2-3min'
        }
      ],
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 5,
      title: 'Monitorização',
      description: '1. Sinais vitais seriados\n2. Nível consciência\n3. ECG se indicado\n4. Exames laboratoriais:\n• Gasometria\n• Eletrólitos\n• Função renal/hepática\n• Screening toxicológico',
      shortDescription: 'Monitorar',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 1800,
        alert: true
      },
      nextSteps: ['disposition']
    },
    {
      id: 'disposition',
      order: 6,
      title: 'Disposição',
      description: '1. Critérios UTI:\n• Instabilidade HD\n• IOT/VM\n• Disfunção orgânica\n\n2. Critérios alta:\n• Assintomático\n• Período observação\n• Risco baixo\n\n3. Notificação compulsória',
      shortDescription: 'Destino',
      criticalAction: false,
      requiresConfirmation: true
    }
  ]
};