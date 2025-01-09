import { MedicalCalculator } from '../../types/calculator';

export const chads2vascCalculator: MedicalCalculator = {
  id: 'chads2-vasc',
  name: 'CHA₂DS₂-VASc',
  description: 'Avaliação de risco de AVC em pacientes com fibrilação atrial não valvar',
  category: 'Cardiologia',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  inputs: [
    {
      id: 'chf',
      label: 'Insuficiência Cardíaca Congestiva',
      type: 'boolean',
      required: true,
      description: 'História de ICC ou FEVE ≤ 40%'
    },
    {
      id: 'hypertension',
      label: 'Hipertensão',
      type: 'boolean',
      required: true,
      description: 'PA > 140/90 ou em tratamento'
    },
    {
      id: 'age',
      label: 'Idade',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '< 65 anos' },
        { value: 1, label: '65-74 anos' },
        { value: 2, label: '≥ 75 anos' }
      ]
    },
    {
      id: 'diabetes',
      label: 'Diabetes',
      type: 'boolean',
      required: true,
      description: 'Em tratamento ou HbA1c > 6.5%'
    },
    {
      id: 'stroke',
      label: 'AVC/AIT/Tromboembolismo prévio',
      type: 'boolean',
      required: true
    },
    {
      id: 'vascular',
      label: 'Doença Vascular',
      type: 'boolean',
      required: true,
      description: 'IAM prévio, DAP ou placa aórtica'
    },
    {
      id: 'sex',
      label: 'Sexo',
      type: 'radio',
      required: true,
      options: [
        { value: 'male', label: 'Masculino' },
        { value: 'female', label: 'Feminino' }
      ]
    }
  ],
  calculate: (values) => {
    let score = 0;
    
    if (values.chf) score += 1;
    if (values.hypertension) score += 1;
    if (values.age === 1) score += 1;
    if (values.age === 2) score += 2;
    if (values.diabetes) score += 1;
    if (values.stroke) score += 2;
    if (values.vascular) score += 1;
    if (values.sex === 'female') score += 1;

    let risk: 'low' | 'moderate' | 'high';
    let recommendation: string;

    if (score === 0) {
      risk = 'low';
      recommendation = 'Anticoagulação geralmente não recomendada';
    } else if (score === 1) {
      risk = 'moderate';
      recommendation = 'Considerar anticoagulação baseado em fatores individuais';
    } else {
      risk = 'high';
      recommendation = 'Anticoagulação oral recomendada';
    }

    return {
      score,
      interpretation: `Score CHA₂DS₂-VASc: ${score} pontos`,
      risk,
      recommendation,
      details: [
        `Risco anual de AVC: ${getRiskPercentage(score)}%`,
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
    0: '0',
    1: '1.3',
    2: '2.2',
    3: '3.2',
    4: '4.0',
    5: '6.7',
    6: '9.8',
    7: '9.6',
    8: '6.7',
    9: '15.2'
  };
  return riskTable[score] || '> 15.2';
}

function getRiskCategory(score: number): string {
  if (score === 0) return 'Risco Baixo';
  if (score === 1) return 'Risco Moderado';
  return 'Risco Alto';
}