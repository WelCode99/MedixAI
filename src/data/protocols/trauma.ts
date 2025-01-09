import { EmergencyProtocol } from '../../types/emergency';

export const traumaProtocol: EmergencyProtocol = {
  id: 'trauma-arrest',
  type: 'trauma',
  title: 'PCR em Trauma - ATLS 11ª Ed.',
  description: 'Protocolo de atendimento à Parada Cardiorrespiratória Traumática baseado no ATLS 11ª edição (2022). Objetivo: Identificar e tratar causas reversíveis de PCR traumática.',
  category: 'Trauma',
  initialStepId: 'initial-assessment',
  version: '2022.1',
  lastUpdated: new Date('2023-12-01'),
  source: 'American College of Surgeons',
  evidenceLevel: 'A',
  references: [
    'ATLS 11th Edition, American College of Surgeons, 2022',
    'European Resuscitation Council Guidelines 2021',
    'Trauma Association of Canada Guidelines 2023'
  ],
  steps: [
    {
      id: 'initial-assessment',
      order: 1,
      title: 'Avaliação Inicial',
      description: 'Prioridades:\n\n1. Segurança da cena\n2. EPI adequado\n3. Avaliar responsividade\n4. Verificar pulso central (10s)\n5. Iniciar RCP se ausente\n\nAtenção: Considerar riscos de trauma cervical',
      shortDescription: 'Cena + ABC',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 30,
        alert: true
      },
      nextSteps: ['hemorrhage-control']
    },
    {
      id: 'hemorrhage-control',
      order: 2,
      title: 'Controle de Hemorragia',
      description: 'Controle imediato:\n\n• Compressão direta\n• Torniquete se extremidades\n• Curativo hemostático\n• Clampeamento se necessário\n\nIdentificar fontes de sangramento externo',
      shortDescription: 'Hemorragia',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 60,
        alert: true
      },
      nextSteps: ['reversible-causes']
    },
    {
      id: 'reversible-causes',
      order: 3,
      title: 'Causas Reversíveis',
      description: 'Identificar e tratar:\n\n• Hipóxia → Via aérea definitiva\n• Hipovolemia → Ressuscitação volêmica\n• Pneumotórax → Descompressão com agulha\n• Tamponamento → Pericardiocentese\n\nConsiderar toracotomia de ressuscitação se indicado',
      shortDescription: 'Causas 4H4T',
      criticalAction: true,
      requiresConfirmation: true,
      timer: {
        type: 'countdown',
        duration: 300,
        alert: true
      },
      nextSteps: ['airway-breathing']
    },
    {
      id: 'airway-breathing',
      order: 4,
      title: 'Via Aérea e Ventilação',
      description: '1. Via Aérea:\n• IOT precoce\n• Proteção cervical\n• Considerar via cirúrgica\n\n2. Ventilação:\n• FiO2 100%\n• Volume corrente 6-8 mL/kg\n• Evitar hiperventilação',
      shortDescription: 'Via Aérea',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['circulation']
    },
    {
      id: 'circulation',
      order: 5,
      title: 'Circulação',
      description: '1. Acessos:\n• 2 acessos calibrosos\n• Considerar IO se difícil acesso\n\n2. Fluidos:\n• Cristaloide aquecido\n• Considerar sangue O-\n• Ácido tranexâmico 1g\n\n3. Meta: PAS > 90mmHg',
      shortDescription: 'Circulação',
      criticalAction: true,
      requiresConfirmation: true,
      medications: [
        {
          drug: 'Ácido Tranexâmico',
          dose: '1g',
          route: 'IV',
          notes: 'Em 10 min, seguido de 1g em 8h'
        }
      ],
      nextSteps: ['thoracotomy-decision']
    },
    {
      id: 'thoracotomy-decision',
      order: 6,
      title: 'Decisão Toracotomia',
      description: 'Indicações:\n\n1. Trauma penetrante torácico\n2. PCR testemunhada < 15 min\n3. Sinais de vida prévios\n\nContraindicações:\n• PCR > 15 min\n• Trauma fechado sem sinais vitais\n• Trauma craniano grave',
      shortDescription: 'Toracotomia',
      criticalAction: true,
      requiresConfirmation: true,
      nextSteps: ['definitive-care']
    },
    {
      id: 'definitive-care',
      order: 7,
      title: 'Cuidados Definitivos',
      description: '1. Transporte rápido\n2. Comunicar centro cirúrgico\n3. Ativar banco de sangue\n4. Preparar para cirurgia\n\nConsiderar critérios para término dos esforços se não houver resposta',
      shortDescription: 'Transporte',
      criticalAction: true,
      requiresConfirmation: true
    }
  ]
};