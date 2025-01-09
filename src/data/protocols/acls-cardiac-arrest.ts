import { EmergencyProtocol } from '../../types/emergency';

export const aclsCardiacArrest: EmergencyProtocol = {
  id: 'acls-cardiac-arrest',
  type: 'acls',
  title: 'RCP (ACLS) - AHA 2023',
  description: 'Protocolo de Ressuscitação Cardiopulmonar baseado nas diretrizes da American Heart Association (AHA) 2023. Objetivo: Restaurar a circulação espontânea em pacientes com parada cardiorrespiratória.',
  category: 'Cardiovascular',
  initialStepId: 'check-response',
  version: '2023.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'American Heart Association',
  evidenceLevel: 'A',
  references: [
    'AHA Guidelines for CPR and ECC 2023',
    'Circulation. 2023;148:e1-e183'
  ],
  steps: [
    {
      id: 'check-response',
      order: 0,
      title: 'Verificar Responsividade',
      description: 'Verifique responsividade e respiração.\n\nSe não responsivo:\n1. Acione a equipe de emergência\n2. Solicite desfibrilador\n3. Inicie RCP imediatamente',
      shortDescription: 'Checar resposta e respiração',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 10,
        alert: true
      },
      nextSteps: ['check-pulse']
    },
    {
      id: 'check-pulse',
      order: 1,
      title: 'Verificar Pulso',
      description: 'Cheque pulso carotídeo por 5-10 segundos. Se ausente, inicie RCP.',
      shortDescription: 'Pulso Central',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 10,
        alert: true
      },
      nextSteps: ['start-cpr']
    },
    {
      id: 'start-cpr',
      order: 2,
      title: 'Compressões de Alta Qualidade',
      description: 'Compressões torácicas:\n• Frequência: 100-120/min\n• Profundidade: 5-6 cm\n• Permitir retorno total do tórax\n• Minimizar interrupções (<10s)\n• Relação 30:2\n• Se via aérea avançada: compressões contínuas',
      shortDescription: 'RCP 30:2',
      timeframe: 'Imediato',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 120,
        alert: true,
        sound: true
      },
      nextSteps: ['rhythm-check']
    },
    {
      id: 'rhythm-check',
      order: 3,
      title: 'Verificar Ritmo',
      description: 'Avaliar ritmo no monitor:\n- Ritmos chocáveis: FV/TV sem pulso\n- Ritmos não chocáveis: Assistolia/AESP\n\nInterromper RCP apenas para análise',
      shortDescription: 'Avaliar ritmo',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 10,
        alert: true
      },
      nextSteps: ['shock-rhythm', 'non-shock-rhythm']
    },
    {
      id: 'shock-rhythm',
      order: 4,
      title: 'Ritmo Chocável',
      description: '1. Aplicar choque (bifásico 120-200J ou monofásico 360J)\n2. Reiniciar RCP imediatamente\n3. Preparar epinefrina\n4. Considerar via aérea avançada e acesso venoso',
      shortDescription: 'Choque + RCP',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'stopwatch',
        alert: true
      },
      nextSteps: ['epinephrine-administration']
    },
    {
      id: 'epinephrine-administration',
      order: 5,
      title: 'Epinefrina',
      description: '• Dose: 1mg IV/IO\n• Frequência: A cada 3-5 minutos\n• Diluir em 10ml SF 0,9%\n• Flush 20ml SF após\n\nManter RCP durante administração\n\nAtenção: Primeira dose deve ser administrada assim que possível em ritmos não chocáveis',
      shortDescription: 'Epinefrina 1mg',
      medications: [
        {
          drug: 'Epinefrina',
          dose: '1mg',
          route: 'IV/IO',
          frequency: 'A cada 3-5 minutos',
          notes: 'Diluir em 10ml SF 0,9%. Flush 20ml após.'
        }
      ],
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'interval',
        interval: 180,
        alert: true,
        sound: true
      },
      nextSteps: ['amiodarone-administration', 'rhythm-check']
    },
    {
      id: 'amiodarone-administration',
      order: 6,
      title: 'Administrar Amiodarona',
      description: '- Primeira dose: 300mg IV/IO em bolus\n- Segunda dose: 150mg IV/IO após 3-5 min\n- Considerar causas reversíveis (5H e 5T)',
      shortDescription: 'Amiodarona',
      medications: [
        {
          drug: 'Amiodarona',
          dose: '300mg primeira dose, 150mg segunda dose',
          route: 'IV/IO',
          notes: 'Após 2-3 choques sem sucesso'
        }
      ],
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'stopwatch',
        alert: true
      },
      nextSteps: ['rhythm-check']
    }
  ]
};