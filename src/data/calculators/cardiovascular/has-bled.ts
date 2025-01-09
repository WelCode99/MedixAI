import { MedicalCalculator } from '../../../types/calculator';

export const hasbledCalculator: MedicalCalculator = {
  id: 'has-bled',
  name: 'HAS-BLED Score',
  description: 'Avaliação de risco de sangramento em pacientes em anticoagulação',
  category: 'cardiovascular',
  version: '1.0',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'hypertension',
      label: 'Hipertensão (PAS > 160 mmHg)',
      type: 'boolean',
      required: true
    },
    {
      id: 'renal_disease',
      label: 'Doença Renal (Diálise, Tx renal ou Cr > 2.26 mg/dL)',
      type: 'boolean',
      required: true
    },
    {
      id: 'liver_disease',
      label: 'Doença Hepática (Cirrose ou Bilirrubina > 2x LSN + TGO/TGP/FA > 3x LSN)',
      type: 'boolean',
      required: true
    },
    {
      id: 'stroke',
      label: 'AVC prévio',
      type: 'boolean',
      required: true
    },
    {
      id: 'bleeding',
      label: 'Sangramento prévio ou predisposição',
      type: 'boolean',
      required: true
    },
    {
      id: 'labile_inr',
      label: 'INR lábil (< 60% do tempo na faixa)',
      type: 'boolean',
      required: true
    },
    {
      id: 'elderly',
      label: 'Idade > 65 anos',
      type: 'boolean',
      required: true
    },
    {
      id: 'drugs',
      label: 'Medicamentos (antiplaquetários, AINEs)',
      type: 'boolean',
      required: true
    },
    {
      id: 'alcohol',
      label: 'Álcool (≥ 8 doses/semana)',
      type: 'boolean',
      required: true
    }
  ],
  calculate: (values) => {
    let score = 0;
    
    if (values.hypertension) score += 1;
    if (values.renal_disease) score += 1;
    if (values.liver_disease) score += 1;
    if (values.stroke) score += 1;
    if (values.bleeding) score += 1;
    if (values.labile_inr) score += 1;
    if (values.elderly) score += 1;
    if (values.drugs) score += 1;
    if (values.alcohol) score += 1;

    let risk: 'low' | 'moderate' | 'high';
    let bleedingRisk: string;
    
    if (score <= 1) {
      risk = 'low';
      bleedingRisk = '0.9-3.4% por ano';
    } else if (score <= 2) {
      risk = 'moderate';
      bleedingRisk = '4.1-8.2% por ano';
    } else {
      risk = 'high';
      bleedingRisk = '> 8.9% por ano';
    }

    return {
      score,
      risk,
      interpretation: `Score HAS-BLED: ${score} pontos`,
      recommendation: `Risco de sangramento maior: ${bleedingRisk}`,
      details: [
        {
          label: 'Risco',
          value: risk,
          interpretation: `Risco de sangramento maior: ${bleedingRisk}`
        }
      ]
    };
  },
  references: [
    'Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation: the Euro Heart Survey. Chest. 2010;138:1093-100'
  ]
};