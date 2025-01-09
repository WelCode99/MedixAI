import { EmergencyProtocol } from '../../types/emergency';

export const dkaProtocol: EmergencyProtocol = {
  id: 'diabetic-ketoacidosis',
  type: 'dka',
  title: 'Cetoacidose Diabética - ADA 2024',
  description: 'Protocolo de atendimento à Cetoacidose Diabética baseado nos Standards of Medical Care in Diabetes da American Diabetes Association 2024.',
  category: 'Endocrinologia',
  initialStepId: 'initial-assessment',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  source: 'American Diabetes Association',
  evidenceLevel: 'A',
  references: [
    'ADA Standards of Medical Care in Diabetes 2024',
    'AACE Clinical Practice Guidelines 2023',
    'Endocrine Society Guidelines 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Diagnóstico CAD',
      description: 'Critérios:\n\n1. Glicemia > 250 mg/dL\n2. pH < 7.3 ou HCO3 < 15\n3. Cetonemia/cetonúria\n\nClassificação:\n• Leve: pH 7.25-7.3\n• Moderada: pH 7.0-7.24\n• Grave: pH < 7.0',
      shortDescription: 'Diagnóstico',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['initial-management']
    },
    {
      id: 'initial-management',
      order: 2,
      title: 'Manejo Inicial',
      description: '1. Acesso venoso calibroso\n\n2. Exames iniciais:\n• Glicemia\n• Gasometria\n• Eletrólitos\n• Função renal\n• Cetonas\n• ECG\n\n3. Monitorização contínua',
      shortDescription: 'Exames + Acesso',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['fluid-resuscitation']
    },
    {
      id: 'fluid-resuscitation',
      order: 3,
      title: 'Ressuscitação Volêmica',
      description: '1. SF 0,9% 15-20 mL/kg/h (1-1.5L/h)\n\n2. Ajustar para:\n• Status volêmico\n• Função cardíaca\n• Função renal\n\n3. Meta:\n• Débito urinário > 0.5mL/kg/h\n• Melhora perfusão',
      shortDescription: 'Volume',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'SF 0,9%',
          dose: '15-20 mL/kg/h',
          route: 'IV',
          notes: 'Primeira hora: 1-1.5L'
        }
      ],
      timer: {
        type: 'countdown',
        duration: 3600,
        alert: true
      },
      nextSteps: ['insulin-therapy']
    },
    {
      id: 'insulin-therapy',
      order: 4,
      title: 'Insulinoterapia',
      description: '1. Regular IV:\n• Bolus: 0.1 U/kg\n• Infusão: 0.1 U/kg/h\n\n2. Ajustar para:\n• ↓ glicemia 50-75 mg/dL/h\n• Se queda > 100, ↓ infusão 50%\n\n3. Quando glicemia < 200:\n• Reduzir para 0.02-0.05 U/kg/h\n• Iniciar glicose 5-10%',
      shortDescription: 'Insulina',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Insulina Regular',
          dose: '0.1 U/kg bolus + 0.1 U/kg/h',
          route: 'IV',
          notes: 'Ajustar conforme resposta'
        }
      ],
      timer: {
        type: 'interval',
        interval: 3600,
        alert: true
      },
      nextSteps: ['potassium-replacement']
    },
    {
      id: 'potassium-replacement',
      order: 5,
      title: 'Reposição de Potássio',
      description: 'K+ < 3.3: 20-30 mEq/h\nK+ 3.3-5.3: 20-30 mEq/L\nK+ > 5.3: Não repor\n\nMonitorar a cada 2h\nManter K+ > 4.0\n\nAtenção: ECG para K+ < 3.3',
      shortDescription: 'Potássio',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'KCl',
          dose: '20-30 mEq/h',
          route: 'IV',
          notes: 'Conforme nível sérico'
        }
      ],
      timer: {
        type: 'interval',
        interval: 7200,
        alert: true
      },
      nextSteps: ['bicarbonate-therapy']
    },
    {
      id: 'bicarbonate-therapy',
      order: 6,
      title: 'Terapia com Bicarbonato',
      description: 'Indicações:\n• pH < 6.9\n• K+ > 6.4\n• Risco arritmia\n\nDose:\n• 100 mEq em 400mL\n• Infundir em 2h\n\nReavaliar pH em 2h',
      shortDescription: 'Bicarbonato',
      criticalAction: false,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Bicarbonato de Sódio',
          dose: '100 mEq',
          route: 'IV',
          notes: 'Diluir em 400mL, 2h'
        }
      ],
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 7,
      title: 'Monitorização',
      description: '1. A cada 1-2h:\n• Glicemia\n• Eletrólitos\n• Gasometria\n\n2. A cada 4h:\n• Cetonas\n• Anion gap\n\n3. Contínuo:\n• Sinais vitais\n• Balanço hídrico\n• Estado mental',
      shortDescription: 'Monitorar',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 3600,
        alert: true
      },
      nextSteps: ['resolution-criteria']
    },
    {
      id: 'resolution-criteria',
      order: 8,
      title: 'Critérios Resolução',
      description: '• Glicemia < 200 mg/dL\n• HCO3 ≥ 15 mEq/L\n• pH > 7.3\n• Anion gap normal\n• Paciente alimentando\n\nTransição para SC:\n• Iniciar basal + bolus\n• Manter IV 2-3h após',
      shortDescription: 'Resolução',
      criticalAction: true,
      requiresConfirmation: true
    }
  ]
};