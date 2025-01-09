import { MedicalCalculator } from '../../../types/calculator';

export const timiStemiCalculator: MedicalCalculator = {
  id: 'timi-stemi',
  name: 'TIMI Risk Score para IAMCSST',
  description: 'Avaliação de risco de mortalidade em 30 dias em pacientes com IAM com supra de ST',
  category: 'cardiovascular',
  version: '1.0',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'age',
      label: 'Idade ≥ 75 anos',
      type: 'boolean',
      required: true
    },
    {
      id: 'diabetes',
      label: 'Diabetes, HAS ou Angina',
      type: 'boolean',
      required: true
    },
    {
      id: 'systolic_bp',
      label: 'PAS < 100 mmHg',
      type: 'boolean',
      required: true
    },
    {
      id: 'heart_rate',
      label: 'FC > 100 bpm',
      type: 'boolean',
      required: true
    },
    {
      id: 'killip',
      label: 'Killip II-IV',
      type: 'boolean',
      required: true
    },
    {
      id: 'weight',
      label: 'Peso < 67 kg',
      type: 'boolean',
      required: true
    },
    {
      id: 'anterior_st',
      label: 'Supra de ST anterior ou BRE',
      type: 'boolean',
      required: true
    },
    {
      id: 'time_to_treatment',
      label: 'Tempo para tratamento > 4h',
      type: 'boolean',
      required: true
    }
  ],
  calculate: (values) => {
    let score = 0;
    
    if (values.age) score += 3;
    if (values.diabetes) score += 1;
    if (values.systolic_bp) score += 3;
    if (values.heart_rate) score += 2;
    if (values.killip) score += 2;
    if (values.weight) score += 1;
    if (values.anterior_st) score += 1;
    if (values.time_to_treatment) score += 1;

    let risk: 'low' | 'moderate' | 'high' | 'very-high';
    let mortality: string;
    
    if (score <= 2) {
      risk = 'low';
      mortality = '2%';
    } else if (score <= 4) {
      risk = 'moderate';
      mortality = '5%';
    } else if (score <= 6) {
      risk = 'high';
      mortality = '12%';
    } else {
      risk = 'very-high';
      mortality = '> 20%';
    }

    return {
      score,
      risk,
      interpretation: `Score TIMI: ${score} pontos`,
      recommendation: `Mortalidade em 30 dias: ${mortality}`,
      details: [
        {
          label: 'Risco',
          value: risk,
          interpretation: `Mortalidade em 30 dias: ${mortality}`
        }
      ]
    };
  },
  references: [
    'Morrow DA, et al. TIMI risk score for ST-elevation myocardial infarction: A convenient, bedside, clinical score for risk assessment at presentation: An intravenous nPA for treatment of infarcting myocardium early II trial substudy. Circulation. 2000;102:2031-7'
  ]
};