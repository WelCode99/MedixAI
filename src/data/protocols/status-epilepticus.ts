import { EmergencyProtocol } from '../../types/emergency';

export const statusEpilepticusProtocol: EmergencyProtocol = {
  id: 'status-epilepticus',
  type: 'status-epilepticus',
  title: 'Estado de Mal Epiléptico - NCS 2022',
  description: 'Protocolo para manejo do Estado de Mal Epiléptico (EME) baseado nas diretrizes da Neurocritical Care Society (NCS) 2022. Objetivo: Cessar as crises convulsivas o mais rápido possível para prevenir danos neurológicos permanentes.',
  category: 'Neurologia',
  initialStepId: 'initial-assessment',
  version: '2022.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'Neurocritical Care Society',
  evidenceLevel: 'A',
  references: [
    'Neurocritical Care Society Guidelines for Status Epilepticus 2022',
    'ILAE Guidelines for Status Epilepticus 2023',
    'Brazilian Academy of Neurology Guidelines 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Estabilização Inicial',
      description: 'Prioridades:\n• Garantir via aérea pérvia\n• Monitorizar oxigenação\n• Acessar circulação\n• Glicemia capilar\n• Monitorização cardíaca',
      shortDescription: 'ABC + Monitorização',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['benzodiazepine-phase']
    },
    {
      id: 'benzodiazepine-phase',
      order: 2,
      title: 'Fase 1: Benzodiazepínico',
      description: 'Escolher uma opção:\n\n1. Lorazepam 0,1 mg/kg IV (máx 4mg)\n2. Diazepam 0,15-0,2 mg/kg IV (máx 10mg)\n3. Midazolam 0,2 mg/kg IM (máx 10mg)\n\nPode repetir uma vez após 5 min se persistir',
      shortDescription: 'BZD',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Lorazepam',
          dose: '0,1 mg/kg',
          route: 'IV',
          maxDose: '4mg',
          notes: 'Primeira escolha se acesso IV'
        },
        {
          drug: 'Midazolam',
          dose: '0,2 mg/kg',
          route: 'IM',
          maxDose: '10mg',
          notes: 'Se sem acesso IV'
        }
      ],
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['second-line']
    },
    {
      id: 'second-line',
      order: 3,
      title: 'Fase 2: Segunda Linha',
      description: 'Se crises persistirem, escolher:\n\n1. Fenitoína 20 mg/kg IV (máx 50 mg/min)\n2. Fosfenitoína 20 mg/kg IV (máx 150 mg/min)\n3. Ácido Valproico 40 mg/kg IV (5-10 min)\n4. Levetiracetam 60 mg/kg IV (15 min)',
      shortDescription: 'Antiepiléptico',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Fenitoína',
          dose: '20 mg/kg',
          route: 'IV',
          notes: 'Infusão máx 50 mg/min'
        },
        {
          drug: 'Levetiracetam',
          dose: '60 mg/kg',
          route: 'IV',
          notes: 'Infundir em 15 min'
        }
      ],
      timer: {
        type: 'countdown',
        duration: 900,
        alert: true
      },
      nextSteps: ['refractory-phase']
    },
    {
      id: 'refractory-phase',
      order: 4,
      title: 'Fase 3: EME Refratário',
      description: 'Se crises persistirem após 20 min:\n\n1. Propofol 2-5 mg/kg IV bolus\n   → Manutenção 2-10 mg/kg/h\n\n2. Midazolam 0,2 mg/kg IV bolus\n   → Manutenção 0,1-2 mg/kg/h\n\n3. Tiopental 3-5 mg/kg IV bolus\n   → Manutenção 3-5 mg/kg/h\n\nPreparo para IOT e suporte ventilatório',
      shortDescription: 'Anestésicos',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Propofol',
          dose: '2-5 mg/kg bolus',
          route: 'IV',
          notes: 'Manutenção: 2-10 mg/kg/h'
        },
        {
          drug: 'Midazolam',
          dose: '0,2 mg/kg bolus',
          route: 'IV',
          notes: 'Manutenção: 0,1-2 mg/kg/h'
        }
      ],
      timer: {
        type: 'countdown',
        duration: 1200,
        alert: true
      },
      nextSteps: ['super-refractory']
    },
    {
      id: 'super-refractory',
      order: 5,
      title: 'EME Super-Refratário',
      description: '• Internar em UTI\n• Monitorização EEG contínua\n• Avaliação neurológica\n• Investigar e tratar causa base\n• Considerar:\n  - Cetamina\n  - Outros antiepilépticos\n  - Imunoterapia\n  - Dieta cetogênica',
      shortDescription: 'UTI + EEG',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 6,
      title: 'Monitorização Contínua',
      description: '• Monitorar sinais vitais\n• Avaliar resposta pupilar\n• Controle glicêmico\n• Eletrólitos (Na, K, Ca, Mg)\n• Gasometria arterial\n• Considerar profilaxia TVP\n• Proteção gástrica',
      shortDescription: 'Monitorização',
      criticalAction: false,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 3600,
        alert: true
      }
    }
  ]
};