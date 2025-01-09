import { EmergencyProtocol } from '../../types/emergency';

export const hypoglycemiaProtocol: EmergencyProtocol = {
  id: 'hypoglycemia',
  type: 'metabolic',
  title: 'Hipoglicemia - ADA 2024',
  description: 'Protocolo de atendimento à Hipoglicemia baseado nos Standards of Medical Care in Diabetes da American Diabetes Association 2024.',
  category: 'Endocrinologia',
  initialStepId: 'initial-assessment',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  source: 'American Diabetes Association',
  evidenceLevel: 'A',
  references: [
    'ADA Standards of Medical Care in Diabetes 2024',
    'Endocrine Society Clinical Practice Guidelines 2023',
    'Brazilian Diabetes Society Guidelines 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Avaliação Inicial',
      description: '1. Confirmar glicemia < 70mg/dL\n2. Avaliar nível consciência\n3. Verificar sintomas:\n• Adrenérgicos\n• Neuroglicopênicos\n4. Identificar causa',
      shortDescription: 'Glicemia + Sintomas',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['conscious-treatment', 'unconscious-treatment']
    },
    {
      id: 'conscious-treatment',
      order: 2,
      title: 'Paciente Consciente',
      description: '1. Carboidrato simples:\n• 15-20g glicose\n• 4 balas de glicose\n• 150mL suco\n\n2. Reavaliar em 15min\n3. Repetir se necessário',
      shortDescription: 'VO',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 900,
        alert: true
      },
      nextSteps: ['monitoring']
    },
    {
      id: 'unconscious-treatment',
      order: 2,
      title: 'Paciente Inconsciente',
      description: '1. Glicose 50% IV:\n• 20-50mL IV\n\n2. Se sem acesso:\n• Glucagon 1mg IM/SC/IN\n\n3. Reavaliar em 15min\n4. Repetir se necessário',
      shortDescription: 'IV/IM',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Glicose 50%',
          dose: '20-50mL',
          route: 'IV',
          notes: 'Bolus'
        },
        {
          drug: 'Glucagon',
          dose: '1mg',
          route: 'IM/SC/IN',
          notes: 'Se sem acesso IV'
        }
      ],
      nextSteps: ['monitoring']
    },
    {
      id: 'monitoring',
      order: 3,
      title: 'Monitorização',
      description: '1. HGT cada 15min até > 100\n2. Após estável:\n• HGT 1/1h por 4h\n3. Identificar causa\n4. Ajustar medicações\n5. Orientar prevenção',
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