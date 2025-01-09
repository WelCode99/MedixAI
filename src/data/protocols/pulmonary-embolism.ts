import { EmergencyProtocol } from '../../types/emergency';

export const pulmonaryEmbolismProtocol: EmergencyProtocol = {
  id: 'pulmonary-embolism',
  type: 'pulmonary-embolism',
  title: 'TEP Agudo - ESC 2023',
  description: 'Protocolo de atendimento ao Tromboembolismo Pulmonar Agudo baseado nas diretrizes da European Society of Cardiology (ESC) 2023.',
  category: 'Cardiovascular',
  initialStepId: 'initial-assessment',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'European Society of Cardiology',
  evidenceLevel: 'A',
  references: [
    'ESC Guidelines on Acute Pulmonary Embolism 2023',
    'CHEST Guidelines on Antithrombotic Therapy 2023',
    'Brazilian Guidelines for Pulmonary Embolism 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Avaliação Inicial',
      description: '1. Sinais vitais + ECG\n2. Avaliar estabilidade\n3. Calcular PESI score\n4. Identificar sinais de disfunção VD:\n• Taquicardia\n• Hipotensão\n• Hipoxemia\n• Alterações ECG',
      shortDescription: 'PESI + Estabilidade',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['risk-stratification']
    },
    {
      id: 'risk-stratification',
      order: 2,
      title: 'Estratificação de Risco',
      description: 'Alto Risco:\n• PCR/Choque/Instabilidade\n\nRisco Intermediário-Alto:\n• PESI III-V + Disfunção VD + ↑Troponina\n\nRisco Intermediário-Baixo:\n• PESI III-V + Disfunção VD ou ↑Troponina\n\nBaixo Risco:\n• PESI I-II, sem disfunção VD',
      shortDescription: 'Risco',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['diagnostic-confirmation']
    },
    {
      id: 'diagnostic-confirmation',
      order: 3,
      title: 'Confirmação Diagnóstica',
      description: '1. Exames:\n• D-dímero se baixa prob.\n• AngioTC tórax\n• Eco se instável\n\n2. Coletar:\n• Troponina\n• BNP\n• Gasometria\n• Função renal',
      shortDescription: 'AngioTC',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 1800,
        alert: true
      },
      nextSteps: ['initial-treatment']
    },
    {
      id: 'initial-treatment',
      order: 4,
      title: 'Tratamento Inicial',
      description: '1. Anticoagulação:\n• Heparina não fracionada IV\n• Enoxaparina SC\n\n2. Suporte:\n• O2 suplementar\n• Suporte pressórico\n• Analgesia\n\n3. Monitorização contínua',
      shortDescription: 'Anticoagulação',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Heparina',
          dose: '80 UI/kg bolus + 18 UI/kg/h',
          route: 'IV',
          notes: 'Ajustar para TTPa 1.5-2.5x'
        },
        {
          drug: 'Enoxaparina',
          dose: '1 mg/kg 12/12h',
          route: 'SC',
          notes: 'Ajustar para ClCr < 30'
        }
      ],
      nextSteps: ['reperfusion-decision']
    },
    {
      id: 'reperfusion-decision',
      order: 5,
      title: 'Decisão de Reperfusão',
      description: 'Trombolítico se:\n1. Alto risco (PCR/choque)\n2. Intermediário-alto selecionados\n\nDose:\n• Alteplase 100mg em 2h ou\n• Tenecteplase peso-ajustada\n\nContraindicações:\n• Sangramento ativo\n• AVC recente\n• Cirurgia recente',
      shortDescription: 'Reperfusão',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Alteplase',
          dose: '100mg',
          route: 'IV',
          notes: 'Infundir em 2h'
        }
      ],
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 6,
      title: 'Monitorização',
      description: '1. Sinais vitais horários\n2. Oximetria contínua\n3. Diurese\n4. Sangramento\n\nExames seriados:\n• TTPa se HNF\n• Hemograma\n• Função renal',
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