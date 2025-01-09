import { MedicalCalculator } from '../../../types/calculator';

export const graceCalculator: MedicalCalculator = {
  id: 'grace',
  name: 'GRACE Score 2.0',
  description: 'Avaliação de risco em Síndrome Coronariana Aguda',
  category: 'cardiovascular',
  version: '2.0',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'age',
      label: 'Idade',
      type: 'number',
      required: true,
      min: 18,
      max: 120,
      unit: 'anos'
    },
    {
      id: 'heart_rate',
      label: 'Frequência Cardíaca',
      type: 'number',
      required: true,
      min: 30,
      max: 250,
      unit: 'bpm'
    },
    {
      id: 'systolic_bp',
      label: 'Pressão Arterial Sistólica',
      type: 'number',
      required: true,
      min: 50,
      max: 250,
      unit: 'mmHg'
    },
    {
      id: 'creatinine',
      label: 'Creatinina',
      type: 'number',
      required: true,
      min: 0.1,
      max: 15,
      unit: 'mg/dL'
    },
    {
      id: 'killip_class',
      label: 'Classe Killip',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: 'I - Sem sinais de ICC' },
        { value: 2, label: 'II - Estertores, B3 ou EJVD' },
        { value: 3, label: 'III - Edema pulmonar' },
        { value: 4, label: 'IV - Choque cardiogênico' }
      ]
    },
    {
      id: 'cardiac_arrest',
      label: 'PCR na admissão',
      type: 'boolean',
      required: true
    },
    {
      id: 'st_deviation',
      label: 'Desvio do segmento ST',
      type: 'boolean',
      required: true
    },
    {
      id: 'elevated_enzymes',
      label: 'Enzimas cardíacas elevadas',
      type: 'boolean',
      required: true
    }
  ],
  calculate: (values) => {
    let score = 0;
    
    // Age points
    if (values.age <= 30) score += 0;
    else if (values.age <= 40) score += 8;
    else if (values.age <= 50) score += 25;
    else if (values.age <= 60) score += 41;
    else if (values.age <= 70) score += 58;
    else if (values.age <= 80) score += 75;
    else score += 91;

    // Heart rate points
    if (values.heart_rate < 50) score += 0;
    else if (values.heart_rate <= 70) score += 3;
    else if (values.heart_rate <= 90) score += 9;
    else if (values.heart_rate <= 110) score += 15;
    else if (values.heart_rate <= 150) score += 24;
    else if (values.heart_rate <= 200) score += 38;
    else score += 46;

    // Systolic BP points
    if (values.systolic_bp < 80) score += 58;
    else if (values.systolic_bp <= 100) score += 43;
    else if (values.systolic_bp <= 120) score += 28;
    else if (values.systolic_bp <= 140) score += 14;
    else if (values.systolic_bp <= 160) score += 10;
    else if (values.systolic_bp <= 200) score += 0;
    else score += 0;

    // Creatinine points
    if (values.creatinine <= 0.39) score += 1;
    else if (values.creatinine <= 0.79) score += 3;
    else if (values.creatinine <= 1.19) score += 5;
    else if (values.creatinine <= 1.59) score += 7;
    else if (values.creatinine <= 1.99) score += 9;
    else if (values.creatinine <= 3.99) score += 15;
    else score += 20;

    // Killip class points
    score += (values.killip_class - 1) * 20;

    // Other points
    if (values.cardiac_arrest) score += 39;
    if (values.st_deviation) score += 28;
    if (values.elevated_enzymes) score += 14;

    let risk: 'low' | 'moderate' | 'high' | 'very-high';
    let mortality: string;
    
    if (score <= 108) {
      risk = 'low';
      mortality = '< 1%';
    } else if (score <= 140) {
      risk = 'moderate';
      mortality = '1-3%';
    } else if (score <= 172) {
      risk = 'high';
      mortality = '3-8%';
    } else {
      risk = 'very-high';
      mortality = '> 8%';
    }

    return {
      score,
      risk,
      interpretation: `Score GRACE: ${score} pontos`,
      recommendation: `Risco de mortalidade hospitalar: ${mortality}`,
      details: [
        {
          label: 'Risco',
          value: risk,
          interpretation: `Mortalidade hospitalar: ${mortality}`
        }
      ]
    };
  },
  references: [
    'Fox KA, et al. Should patients with acute coronary disease be stratified for management according to their risk? Derivation, external validation and outcomes using the updated GRACE risk score. BMJ Open. 2014;4:e004425',
    'Eagle KA, et al. A validated prediction model for all forms of acute coronary syndrome: estimating the risk of 6-month postdischarge death in an international registry. JAMA. 2004;291:2727-33'
  ]
};