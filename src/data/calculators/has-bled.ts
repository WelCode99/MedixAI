import { MedicalCalculator } from '../../types/calculator';

export const hasbledCalculator: MedicalCalculator = {
  id: 'has-bled',
  name: 'HAS-BLED',
  description: 'Avaliação de risco de sangramento em pacientes anticoagulados',
  category: 'Cardiologia',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  inputs: [
    {
      id: 'hypertension',
      label: 'Hipertensão não controlada',
      type: 'boolean',
      required: true,
      description: 'PAS > 160 mmHg'
    },
    {
      id: 'renal',
      label: 'Disfunção Renal',
      type: 'boolean',
      required: true,
      description: 'Diálise, transplante ou Cr > 2.26 mg/dL'
    },
    {
      id: 'liver',
      label: 'Disfunção Hepática',
      type: 'boolean',
      required: true,
      description: 'Cirrose ou Bilirrubina > 2x normal ou AST/ALT/FA > 3x normal'
    },
    {
      id: 'stroke',
      label: 'AVC prévio',
      type: 'boolean',
      required: true
    },
    {
      id: 'bleeding',
      label: 'Sangramento prévio',
      type: 'boolean',
      required: true,
      description: 'História de sangramento ou predisposição'
    },
    {
      id: 'labile_inr',
      label: 'INR lábil',
      type: 'boolean',
      required: true,
      description: 'TTR < 60%'
    },
    {
      id: 'elderly',
      label: 'Idade > 65 anos',
      type: 'boolean',
      required: true
    },
    {
      id: 'drugs',
      label: 'Medicações predisponentes',
      type: 'boolean',
      required: true,
      description: 'Antiplaquetários ou anti-inflamatórios'
    },
    {
      id: 'alcohol',
      label: 'Álcool',
      type: 'boolean',
      required: true,
      description: '≥ 8 doses/semana'
    }
  ],
  calculate: (values) => {
    let score = 0;
    
    if (values.hypertension) score += 1;
    if (values.renal) score += 1;
    if (values.liver) score += 1;
    if (values.stroke) score += 1;
    if (values.bleeding) score += 1;
    if (values.labile_inr) score += 1;
    if (values.elderly) score += 1;
    if (values.drugs) score += 1;
    if (values.alcohol) score += 1;

    let risk: 'low' | 'moderate' | 'high';
    let recommendation: string;

    if (score < 2) {
      risk = 'low';
      recommendation = 'Baixo risco de sangramento. Monitorização de rotina.';
    } else if (score === 2) {
      risk = 'moderate';
      recommendation = 'Risco moderado. Considerar medidas preventivas.';
    } else {
      risk = 'high';
      recommendation = 'Alto risco. Necessária monitorização frequente e medidas preventivas.';
    }

    return {
      score,
      interpretation: `Score HAS-BLED: ${score} pontos`,
      risk,
      recommendation,
      details: [
        `Risco de sangramento: ${getRiskPercentage(score)}% ao ano`,
        `Classificação: ${getRiskCategory(score)}`
      ]
    };
  },
  references: [
    'ESC Guidelines for Atrial Fibrillation 2020',
    'AHA/ACC/HRS Guideline for AF Management 2019'
  ]
};

function getRiskPercentage(score: number): string {
  const riskTable: Record<number, string> = {
    0: '0.9',
    1: '3.4',
    2: '4.1',
    3: '5.8',
    4: '8.9',
    5: '9.1'
  };
  return riskTable[score] || '> 9.1';
}

function getRiskCategory(score: number): string {
  if (score < 2) return 'Risco Baixo';
  if (score === 2) return 'Risco Moderado';
  return 'Risco Alto';
}