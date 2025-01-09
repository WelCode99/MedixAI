import { EmergencyDrug } from '../../types/drugs';

export const vasopressors: EmergencyDrug[] = [
  {
    id: 'norepinephrine',
    genericName: 'Norepinefrina',
    brandNames: ['Noradrenalina'],
    category: 'vasopressors',
    class: 'Vasopressor',
    mechanism: 'Agonista alfa-1 adrenérgico predominante',
    indications: [
      'Choque séptico',
      'Choque cardiogênico com hipotensão severa',
      'Choque distributivo'
    ],
    contraindications: [
      'Hipotensão por hipovolemia não corrigida'
    ],
    presentations: [
      {
        form: 'Ampola',
        concentration: '4mg/4ml',
        volume: '4ml'
      }
    ],
    dilutions: [
      {
        solution: 'SG 5%',
        volume: '250ml',
        finalConcentration: '64 mcg/ml',
        stability: '24 horas',
        instructions: [
          '4 ampolas (16mg) + 234ml SG5%',
          'Concentração final: 64 mcg/ml'
        ]
      }
    ],
    dosages: [
      {
        indication: 'Choque',
        loading: 'Não recomendado',
        maintenance: '0,05-2 mcg/kg/min',
        maxDose: '3,3 mcg/kg/min',
        adjustments: {
          elderly: 'Iniciar com doses mais baixas'
        }
      }
    ],
    administrationRoutes: ['EV contínuo'],
    monitoring: {
      parameters: [
        'Pressão arterial contínua',
        'Frequência cardíaca',
        'Perfusão periférica',
        'Débito urinário'
      ],
      frequency: 'Contínua'
    },
    adverseEffects: {
      common: [
        'Hipertensão',
        'Bradicardia reflexa',
        'Arritmias'
      ],
      severe: [
        'Isquemia periférica',
        'Necrose tecidual por extravasamento'
      ],
      management: {
        'Extravasamento': 'Interromper infusão, elevar membro, considerar antídoto local'
      }
    },
    interactions: [
      {
        drug: 'Betabloqueadores',
        severity: 'moderate',
        effect: 'Hipertensão por antagonismo',
        management: 'Monitorar PA'
      }
    ],
    notes: [
      'Preferir acesso venoso central',
      'Iniciar com 0,1 mcg/kg/min e titular conforme resposta',
      'Push-dose para emergência: 1ml (10mcg) em bolus'
    ],
    references: [
      'Surviving Sepsis Campaign Guidelines 2021',
      'European Society of Cardiology Guidelines 2021'
    ],
    lastUpdated: new Date('2024-01-01')
  }
];