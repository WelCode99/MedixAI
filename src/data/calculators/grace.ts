import { MedicalCalculator } from '../../types/calculator';

export const graceCalculator: MedicalCalculator = {
  id: 'grace',
  name: 'GRACE 2.0',
  description: 'Estratificação de risco em Síndrome Coronariana Aguda',
  category: 'Cardiologia',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
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
      min: 20,
      max: 300,
      unit: 'bpm'
    },
    {
      id: 'systolic_bp',
      label: 'Pressão Arterial Sistólica',
      type: 'number',
      required: true,
      min: 40,
      max: 300,
      unit: 'mmHg'
    },
    {
      id: 'creatinine',
      label: 'Creatinina',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      unit: 'mg/dL'
    },
    {
      id: 'killip',
      label: 'Classe Killip',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: 'I - Sem ICC' },
        { value: 2, label: 'II - Estertores/B3/Estase jugular' },
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
    // Implementação do algoritmo GRACE 2.0
    let score = 0;
    
    // Idade
    if (values.age < 30) score += 0;
    else if (values.age < 40) score += 8;
    else if (values.age < 50) score += 25;
    else if (values.age < 60) score += 41;
    else if (values.age < 70) score += 58;
    else if (values.age < 80) score += 75;
    else score += 91;

    // Frequência cardíaca
    if (values.heart_rate < 50) score += 0;
    else if (values.heart_rate < 70) score += 3;
    else if (values.heart_rate < 90) score += 9;
    else if (values.heart_rate < 110) score += 15;
    else if (values.heart_rate < 150) score += 24;
    else if (values.heart_rate < 200) score += 38;
    else score += 46;

    // PAS
    if (values.systolic_bp < 80) score += 58;
    else if (values.systolic_bp < 100) score += 53;
    else if (values.systolic_bp < 120) score += 43;
    else if (values.systolic_bp < 140) score += 34;
    else if (values.systolic_bp < 160) score += 24;
    else if (values.systolic_bp < 200) score += 10;
    else score += 0;

    // Creatinina
    if (values.creatinine < 0.4) score += 1;
    else if (values.creatinine < 0.8) score += 3;
    else if (values.creatinine < 1.2) score += 5;
    else if (values.creatinine < 1.6) score += 7;
    else if (values.creatinine < 2.0) score += 9;
    else if (values.creatinine < 4.0) score += 15;
    else score += 20;

    // Classe Killip
    score += (values.killip - 1) * 20;

    // PCR
    if (values.cardiac_arrest) score += 39;

    // Desvio ST
    if (values.st_deviation) score += 28;

    // Enzimas
    if (values.elevated_enzymes) score += 14;

    let risk: 'low' | 'moderate' | 'high';
    let recommendation: string;

    if (score <= 108) {
      risk = 'low';
      recommendation = 'Baixo risco. Considerar alta precoce se outros fatores favoráveis.';
    } else if (score <= 140) {
      risk = 'moderate';
      recommendation = 'Risco intermediário. Monitorização intra-hospitalar.';
    } else {
      risk = 'high';
      recommendation = 'Alto risco. Considerar estratégia invasiva precoce.';
    }

    return {
      score,
      interpretation: `Score GRACE 2.0: ${score} pontos`,
      risk,
      recommendation,
      details: [
        `Mortalidade hospitalar: ${getHospitalMortality(score)}%`,
        `Mortalidade em 6 meses: ${getSixMonthMortality(score)}%`,
        `Classificação: ${getRiskCategory(score)}`
      ]
    };
  },
  references: [
    'GRACE 2.0 ACS Risk Calculator',
    'ESC Guidelines for ACS 2020',
    'ACC/AHA Guidelines for NSTE-ACS 2021'
  ]
};

function getHospitalMortality(score: number): string {
  if (score <= 108) return '< 1';
  if (score <= 140) return '1-3';
  return '> 3';
}

function getSixMonthMortality(score: number): string {
  if (score <= 108) return '< 3';
  if (score <= 140) return '3-8';
  return '> 8';
}

function getRiskCategory(score: number): string {
  if (score <= 108) return 'Risco Baixo';
  if (score <= 140) return 'Risco Intermediário';
  return 'Risco Alto';
}