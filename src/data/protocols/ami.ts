import { EmergencyProtocol } from '../../types/emergency';

export const amiProtocol: EmergencyProtocol = {
  id: 'ami-stemi',
  type: 'ami',
  title: 'IAM com Supra de ST - ESC/AHA 2023',
  description: 'Protocolo para manejo do Infarto Agudo do Miocárdio com Supradesnivelamento do ST baseado nas diretrizes da European Society of Cardiology (ESC) 2022 e atualizações da American Heart Association/American College of Cardiology (AHA/ACC) 2023.',
  category: 'Cardiovascular',
  initialStepId: 'initial-assessment',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'ESC/AHA Guidelines',
  evidenceLevel: 'A',
  references: [
    'ESC Guidelines for STEMI 2022',
    'ACC/AHA Guidelines Update 2023',
    'Brazilian Society of Cardiology Guidelines 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'ECG 12 Derivações',
      description: 'Realizar ECG em até 10 minutos da chegada.\n\nAvaliar:\n• Supradesnivelamento do ST\n• Localização do IAM\n• Sinais de IAM de VD\n• Alterações especulares',
      shortDescription: 'ECG < 10min',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 600,
        alert: true
      },
      nextSteps: ['initial-medications']
    },
    {
      id: 'initial-medications',
      order: 2,
      title: 'Medicações Iniciais',
      description: 'Administrar IMEDIATAMENTE:\n\n1. AAS 150-300mg VO (mastigável)\n2. Segunda antiagregação:\n   • Ticagrelor 180mg VO ou\n   • Prasugrel 60mg VO ou\n   • Clopidogrel 600mg VO\n\n3. Heparina:\n   • HNF 60 UI/kg (máx 4000 UI) ou\n   • Enoxaparina 1mg/kg SC',
      shortDescription: 'AAS + P2Y12',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'AAS',
          dose: '150-300mg',
          route: 'VO',
          notes: 'Mastigável'
        },
        {
          drug: 'Ticagrelor',
          dose: '180mg',
          route: 'VO',
          notes: 'Preferencial se disponível'
        },
        {
          drug: 'Heparina',
          dose: '60 UI/kg',
          route: 'IV',
          maxDose: '4000 UI',
          notes: 'Bolus inicial'
        }
      ],
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['reperfusion-strategy']
    },
    {
      id: 'reperfusion-strategy',
      order: 3,
      title: 'Estratégia de Reperfusão',
      description: 'Definir estratégia baseada em:\n\n• Tempo do início dos sintomas\n• Disponibilidade de ICP primária\n• Contraindicações para fibrinólise\n\nICP primária se:\n• Disponível em até 120 min\n• Centro com alto volume\n• Operador experiente',
      shortDescription: 'ICP vs Fibrinólise',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 900,
        alert: true
      },
      nextSteps: ['pci-pathway', 'fibrinolysis-pathway']
    },
    {
      id: 'pci-pathway',
      order: 4,
      title: 'Via ICP Primária',
      description: 'Preparar para ICP:\n\n1. Ativar laboratório de hemodinâmica\n2. Manter tempo porta-balão < 90 min\n3. Monitorar ECG contínuo\n4. Preparar para complicações\n\nConsiderar suporte circulatório se choque',
      shortDescription: 'ICP Primária',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 5400,
        alert: true
      },
      nextSteps: ['monitoring']
    },
    {
      id: 'fibrinolysis-pathway',
      order: 4,
      title: 'Via Fibrinolítica',
      description: 'Se escolhida fibrinólise:\n\n1. Verificar contraindicações\n2. Tenecteplase (peso-ajustada):\n   < 60kg: 30mg\n   60-70kg: 35mg\n   70-80kg: 40mg\n   80-90kg: 45mg\n   ≥ 90kg: 50mg\n\n3. Avaliar critérios de reperfusão em 60-90 min',
      shortDescription: 'Fibrinólise',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Tenecteplase',
          dose: 'Peso-ajustada',
          route: 'IV',
          notes: 'Bolus único'
        }
      ],
      timer: {
        type: 'countdown',
        duration: 1800,
        alert: true
      },
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 5,
      title: 'Monitorização',
      description: '• Monitorização contínua de ECG\n• Controle pressórico\n• Oximetria\n• Avaliar reperfusão\n• Ecocardiograma\n• Marcadores de necrose\n\nIdentificar e tratar complicações:\n• Arritmias\n• Insuficiência cardíaca\n• Choque cardiogênico',
      shortDescription: 'Monitorar',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 900,
        alert: true
      }
    }
  ]
};