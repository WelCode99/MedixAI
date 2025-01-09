import { EmergencyProtocol } from '../../types/emergency';

export const strokeProtocol: EmergencyProtocol = {
  id: 'acute-stroke',
  type: 'stroke',
  title: 'AVC Isquêmico Agudo - AHA/ASA 2023',
  description: 'Protocolo baseado em evidências para manejo do AVC isquêmico agudo. Objetivo: Intervenção precoce para minimizar déficits neurológicos.',
  category: 'Neurologia',
  initialStepId: 'initial-assessment',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'American Heart Association/American Stroke Association',
  evidenceLevel: 'A',
  references: [
    'AHA/ASA Guidelines for Early Management of Acute Ischemic Stroke 2023 Update',
    'European Stroke Organisation Guidelines 2023',
    'Brazilian Stroke Society Guidelines 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Horário de Início',
      description: 'Registrar com precisão:\n• Hora do início dos sintomas\n• Hora do último momento visto bem\n• Contato com familiares/testemunhas\n\nATENÇÃO: Este é um dado crítico para decisão terapêutica!',
      shortDescription: 'NIHSS + Tempo',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['nihss-assessment']
    },
    {
      id: 'nihss-assessment',
      order: 2,
      title: 'Escala NIHSS',
      description: 'Realizar avaliação completa NIHSS:\n• Nível de consciência\n• Movimentos oculares\n• Campos visuais\n• Paralisia facial\n• Força motora\n• Ataxia\n• Sensibilidade\n• Linguagem\n• Disartria\n• Extinção/Negligência',
      shortDescription: 'Avaliar NIHSS',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['imaging']
    },
    {
      id: 'imaging',
      order: 3,
      title: 'TC de Crânio Urgente',
      description: 'TC sem contraste IMEDIATA:\n• Meta: realizar em até 25 minutos\n• Avaliar sinais precoces de isquemia\n• Descartar hemorragia\n• Considerar angioTC se suspeita de oclusão de grande vaso',
      shortDescription: 'TC Crânio',
      timeframe: '20 minutos',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 1500,
        alert: true
      },
      nextSteps: ['thrombolysis-decision']
    },
    {
      id: 'thrombolysis-decision',
      order: 4,
      title: 'Decisão Trombólise',
      description: 'Critérios de Elegibilidade:\n• < 4.5 horas do início\n• NIHSS 4-25\n• Sem hemorragia na TC\n• Sem contraindicações absolutas\n\nConsiderar trombectomia se:\n• Oclusão de grande vaso\n• < 6 horas do início',
      shortDescription: 'Avaliar rtPA',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['rtpa-administration', 'supportive-care']
    },
    {
      id: 'rtpa-administration',
      order: 5,
      title: 'Administração rtPA',
      description: 'Alteplase 0.9mg/kg (máximo 90mg):\n• 10% em bolus IV\n• 90% em infusão de 1 hora\n\nMonitorar:\n• PA a cada 15 min por 2h\n• NIHSS a cada 15 min\n• Sinais de sangramento',
      shortDescription: 'rtPA',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Alteplase',
          dose: '0.9mg/kg',
          route: 'IV',
          maxDose: '90mg',
          notes: '10% bolus, 90% em 1h'
        }
      ],
      timer: {
        type: 'countdown',
        duration: 3600,
        alert: true
      },
      nextSteps: ['monitoring']
    }
  ]
};