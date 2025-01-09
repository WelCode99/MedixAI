import { EmergencyProtocol } from '../../types/emergency';

export const heartFailureProtocol: EmergencyProtocol = {
  id: 'acute-heart-failure',
  type: 'heart-failure',
  title: 'IC Aguda Descompensada - ESC/AHA 2023',
  description: 'Protocolo de atendimento à Insuficiência Cardíaca Aguda Descompensada baseado nas diretrizes da European Society of Cardiology (ESC) 2021 e atualização ACC/AHA/HFSA 2023.',
  category: 'Cardiovascular',
  initialStepId: 'initial-assessment',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'ESC/ACC/AHA Guidelines',
  evidenceLevel: 'A',
  references: [
    'ESC Guidelines for Heart Failure 2021',
    'ACC/AHA/HFSA Focused Update 2023',
    'Brazilian Guidelines for Acute Heart Failure 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Avaliação Inicial',
      description: '1. Sinais vitais + Oximetria\n2. Perfil hemodinâmico:\n• Quente-seco\n• Quente-úmido\n• Frio-seco\n• Frio-úmido\n\n3. Sinais de congestão:\n• Ortopneia\n• DPN\n• Edema\n• Turgência jugular',
      shortDescription: 'Perfil HD',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['oxygenation']
    },
    {
      id: 'oxygenation',
      order: 2,
      title: 'Oxigenação',
      description: '1. O2 suplementar se SpO2 < 90%\n\n2. VNI se:\n• Desconforto respiratório\n• SpO2 < 90% com O2\n• FR > 25\n\n3. IOT se:\n• Falha VNI\n• Fadiga\n• Rebaixamento',
      shortDescription: 'O2 + VNI',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['initial-therapy']
    },
    {
      id: 'initial-therapy',
      order: 3,
      title: 'Terapia Inicial',
      description: 'Baseada no perfil:\n\n1. Quente-úmido:\n• Diurético IV\n• Vasodilatador\n\n2. Frio-úmido:\n• Inotrópico\n• Diurético\n\n3. Frio-seco:\n• Inotrópico\n• Volume se necessário',
      shortDescription: 'Terapia',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Furosemida',
          dose: '40-80mg (ou 1-2,5x dose oral)',
          route: 'IV',
          notes: 'Bolus ou infusão contínua'
        },
        {
          drug: 'Nitroglicerina',
          dose: '10-200 mcg/min',
          route: 'IV',
          notes: 'Titular conforme PA'
        }
      ],
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 4,
      title: 'Monitorização',
      description: '1. Sinais vitais horários\n2. Balanço hídrico\n3. Débito urinário\n4. Oximetria contínua\n\nExames:\n• Função renal\n• Eletrólitos\n• BNP/NT-proBNP\n• Troponina',
      shortDescription: 'Monitorar',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 3600,
        alert: true
      },
      nextSteps: ['specific-therapy']
    },
    {
      id: 'specific-therapy',
      order: 5,
      title: 'Terapia Específica',
      description: '1. Diurético:\n• Furosemida 40-80mg IV\n• Considerar infusão contínua\n\n2. Vasodilatador:\n• Nitroglicerina 10-200 mcg/min\n• Nitroprussiato em refratários\n\n3. Inotrópico se necessário:\n• Dobutamina 2,5-20 mcg/kg/min\n• Milrinone se beta-bloqueado',
      shortDescription: 'Medicações',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Dobutamina',
          dose: '2,5-20 mcg/kg/min',
          route: 'IV',
          notes: 'Titular conforme resposta'
        },
        {
          drug: 'Milrinone',
          dose: '0,375-0,75 mcg/kg/min',
          route: 'IV',
          notes: 'Considerar em beta-bloqueados'
        }
      ],
      nextSteps: ['response-assessment']
    },
    {
      id: 'response-assessment',
      order: 6,
      title: 'Avaliação de Resposta',
      description: 'Avaliar em 6-12h:\n\n1. Melhora clínica:\n• Dispneia\n• Congestão\n• Perfusão\n\n2. Resposta diurética:\n• Débito urinário\n• Peso\n\n3. Função renal\n4. Eletrólitos',
      shortDescription: 'Resposta',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 21600,
        alert: true
      },
      nextSteps: ['optimization']
    },
    {
      id: 'optimization',
      order: 7,
      title: 'Otimização',
      description: '1. Identificar causa:\n• Isquemia\n• Arritmia\n• Infecção\n• Não adesão\n\n2. Ajustar medicações:\n• IECA/BRA\n• Beta-bloqueador\n• Espironolactona\n\n3. Considerar dispositivos:\n• CDI\n• TRC',
      shortDescription: 'Otimizar',
      criticalAction: false,
      requiresConfirmation: true
    }
  ]
};