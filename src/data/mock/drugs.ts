import { Drug } from '../../types/pharmacy/drug';

export const mockDrugs: Drug[] = [
  {
    id: '1',
    genericName: 'Amoxicilina',
    brandNames: ['Amoxil', 'Novocilin'],
    categories: ['antibiotic'],
    systemTargets: ['respiratory'],
    mechanismOfAction: 'Inibição da síntese da parede celular bacteriana',
    indications: {
      primary: ['Infecções respiratórias', 'Otite média'],
      secondary: ['Infecções urinárias não complicadas']
    },
    contraindications: ['Hipersensibilidade a penicilinas'],
    presentations: [
      { form: 'Cápsula', concentration: '500mg' },
      { form: 'Suspensão', concentration: '250mg/5mL' }
    ],
    dosages: [
      {
        indication: 'Infecções respiratórias',
        route: 'oral',
        adult: {
          standard: '500mg',
          frequency: '8/8h',
          duration: '7-10 dias'
        },
        pediatric: {
          calculation: 'weight * 50',
          frequency: '8/8h'
        }
      }
    ],
    pharmacokinetics: {
      absorption: 'Rápida absorção oral',
      halfLife: '1-2 horas'
    },
    adverseEffects: {
      common: [
        { effect: 'Diarreia', frequency: 'common', severity: 'mild' },
        { effect: 'Náusea', frequency: 'common', severity: 'mild' }
      ],
      severe: [
        { effect: 'Reação anafilática', frequency: 'rare', severity: 'severe' }
      ]
    },
    interactions: [],
    warnings: ['Ajuste de dose em insuficiência renal'],
    monitoring: {
      parameters: ['Função renal', 'Sinais de alergia'],
      frequency: 'Início do tratamento'
    },
    references: [
      {
        id: 'ref1',
        title: 'Diretrizes Brasileiras de Antibioticoterapia',
        source: 'SBI',
        year: 2023
      }
    ],
    lastUpdated: new Date(),
    tags: ['antibiótico', 'penicilina', 'betalactâmico']
  },
  // Add more mock drugs here...
];