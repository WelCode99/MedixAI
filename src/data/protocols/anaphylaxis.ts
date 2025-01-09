import { EmergencyProtocol } from '../../types/emergency';

export const anaphylaxisProtocol: EmergencyProtocol = {
  id: 'anaphylaxis-severe',
  type: 'anaphylaxis',
  title: 'Anafilaxia Grave - WAO 2023',
  description: 'Protocolo de atendimento à Anafilaxia Grave baseado nas diretrizes da World Allergy Organization (WAO) 2023. Objetivo: Reconhecimento e tratamento precoce da anafilaxia para prevenir desfechos graves.',
  category: 'Alergia/Imunologia',
  initialStepId: 'initial-assessment',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'World Allergy Organization',
  evidenceLevel: 'A',
  references: [
    'WAO Anaphylaxis Guidelines 2023',
    'EAACI Guidelines 2021',
    'Brazilian Guidelines for Anaphylaxis 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Avaliação Inicial',
      description: 'Confirmar anafilaxia:\n\n• Início agudo (minutos a horas)\n• Envolvimento de pele/mucosas + respiratório/cardiovascular\n• Hipotensão após exposição a alérgeno conhecido\n\nAvaliar:\n• Via aérea (edema, rouquidão)\n• Respiração (sibilos, estridor)\n• Circulação (PA, pulso)',
      shortDescription: 'ABC',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['epinephrine']
    },
    {
      id: 'epinephrine',
      order: 2,
      title: 'Adrenalina Intramuscular',
      description: 'Administrar IMEDIATAMENTE:\n\nAdultos:\n• Adrenalina 0,3-0,5mg IM (1:1000)\n• Face anterolateral da coxa\n• Pode repetir a cada 5-15min\n\nCrianças:\n• Adrenalina 0,01mg/kg IM (máx 0,3mg)\n\nNÃO ATRASAR A PRIMEIRA DOSE!',
      shortDescription: 'Adrenalina IM',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Adrenalina',
          dose: '0,3-0,5mg (adulto) ou 0,01mg/kg (criança)',
          route: 'IM',
          notes: 'Face anterolateral da coxa. Pode repetir 5-15min'
        }
      ],
      timer: {
        type: 'interval',
        interval: 300,
        alert: true
      },
      nextSteps: ['positioning-oxygen']
    },
    {
      id: 'positioning-oxygen',
      order: 3,
      title: 'Posicionamento e Oxigênio',
      description: '1. Posicionar paciente:\n• Se dispneia/vômitos: Semi-sentado\n• Se hipotensão: Decúbito dorsal com MMII elevados\n• Se gestante: DLE\n\n2. Oxigênio suplementar:\n• Alto fluxo (10-15 L/min)\n• Máscara não-reinalante\n• Titular para SpO2 > 94%',
      shortDescription: 'Posição + O2',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['fluid-resuscitation']
    },
    {
      id: 'fluid-resuscitation',
      order: 4,
      title: 'Ressuscitação Volêmica',
      description: 'Se hipotensão/choque:\n\n• Acesso venoso calibroso\n• Cristaloide 20mL/kg rápido\n• Repetir conforme necessário\n\nMonitorar resposta e sinais de sobrecarga',
      shortDescription: 'Volume IV',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Cristaloide',
          dose: '20mL/kg',
          route: 'IV',
          notes: 'Infusão rápida'
        }
      ],
      nextSteps: ['second-line']
    },
    {
      id: 'second-line',
      order: 5,
      title: 'Medicações Adjuvantes',
      description: 'Anti-histamínicos:\n• Difenidramina 25-50mg IV\n• Ranitidina 50mg IV\n\nCorticoides:\n• Metilprednisolona 125mg IV ou\n• Hidrocortisona 200mg IV\n\nBroncodilatador se broncoespasmo:\n• Salbutamol spray/nebulização',
      shortDescription: 'Anti-H1/H2 + Corticoide',
      criticalAction: false,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Difenidramina',
          dose: '25-50mg',
          route: 'IV'
        },
        {
          drug: 'Metilprednisolona',
          dose: '125mg',
          route: 'IV'
        }
      ],
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 6,
      title: 'Monitorização',
      description: 'Monitorização contínua:\n• Sinais vitais\n• Oximetria\n• Resposta ao tratamento\n\nObservar por 4-8h (até 24h se grave)\n\nPrescever:\n• Adrenalina auto-injetável\n• Plano de ação\n• Encaminhar alergista',
      shortDescription: 'Monitorar',
      criticalAction: false,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 900,
        alert: true
      }
    }
  ]
};