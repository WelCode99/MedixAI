import { MedicalCalculator } from '../../../types/calculator';

export const vasopressorCalculator: MedicalCalculator = {
  id: 'vasopressors',
  name: 'Calculadora de Drogas Vasoativas',
  category: 'solutions',
  description: 'Cálculo de doses e taxas de infusão de vasopressores',
  version: '1.0',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'drug',
      label: 'Medicamento',
      type: 'select',
      required: true,
      options: [
        { value: 'norepinephrine', label: 'Noradrenalina' },
        { value: 'epinephrine', label: 'Adrenalina' },
        { value: 'dopamine', label: 'Dopamina' },
        { value: 'vasopressin', label: 'Vasopressina' }
      ]
    },
    {
      id: 'weight',
      label: 'Peso do Paciente',
      type: 'number',
      required: true,
      min: 0,
      unit: 'kg'
    },
    {
      id: 'dose',
      label: 'Dose Desejada',
      type: 'number',
      required: true,
      min: 0,
      unit: 'mcg/kg/min'
    }
  ],
  calculate: (values) => {
    const { drug, weight, dose } = values;
    
    // Concentrações padrão
    const concentrations = {
      norepinephrine: 16, // mcg/mL
      epinephrine: 16,    // mcg/mL
      dopamine: 1600,     // mcg/mL
      vasopressin: 0.4    // U/mL
    };

    const concentration = concentrations[drug as keyof typeof concentrations];
    
    // Cálculo da taxa de infusão
    const infusionRate = (dose * weight * 60) / concentration;

    return {
      score: infusionRate,
      interpretation: `Taxa de Infusão: ${infusionRate.toFixed(1)} mL/h`,
      recommendation: `Infundir a ${infusionRate.toFixed(1)} mL/h`,
      details: [
        {
          label: 'Taxa de Infusão',
          value: `${infusionRate.toFixed(1)} mL/h`
        },
        {
          label: 'Dose',
          value: `${dose} mcg/kg/min`
        },
        {
          label: 'Concentração',
          value: `${concentration} mcg/mL`
        }
      ]
    };
  },
  references: [
    'Surviving Sepsis Campaign Guidelines 2021',
    'SCCM Guidelines for Vasopressor Support'
  ]
};