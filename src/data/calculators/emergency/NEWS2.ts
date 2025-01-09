import { MedicalCalculator } from '../../../types/calculator';

export const news2Calculator: MedicalCalculator = {
  id: 'news2',
  name: 'NEWS 2 Score',
  category: 'emergency',
  description: 'National Early Warning Score 2 - Avaliação de deterioração clínica',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'respiratory_rate',
      label: 'Frequência Respiratória',
      type: 'select',
      required: true,
      options: [
        { value: '3', label: '≤8', points: 3 },
        { value: '1', label: '9-11', points: 1 },
        { value: '0', label: '12-20', points: 0 },
        { value: '2', label: '21-24', points: 2 },
        { value: '3', label: '≥25', points: 3 }
      ]
    },
    {
      id: 'spo2',
      label: 'SpO2',
      type: 'select',
      required: true,
      options: [
        { value: '3', label: '≤91', points: 3 },
        { value: '2', label: '92-93', points: 2 },
        { value: '1', label: '94-95', points: 1 },
        { value: '0', label: '≥96', points: 0 }
      ]
    },
    {
      id: 'supplemental_o2',
      label: 'Oxigênio Suplementar',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'Não', points: 0 },
        { value: '2', label: 'Sim', points: 2 }
      ]
    },
    {
      id: 'temperature',
      label: 'Temperatura',
      type: 'select',
      required: true,
      options: [
        { value: '3', label: '≤35.0', points: 3 },
        { value: '1', label: '35.1-36.0', points: 1 },
        { value: '0', label: '36.1-38.0', points: 0 },
        { value: '1', label: '38.1-39.0', points: 1 },
        { value: '2', label: '≥39.1', points: 2 }
      ]
    }
  ],
  calculate: (values) => {
    let score = 0;
    Object.values(values).forEach(val => {
      score += Number(val);
    });

    let risk = 'low';
    let recommendation = '';

    if (score >= 7) {
      risk = 'high';
      recommendation = 'Avaliação urgente por equipe de resposta rápida';
    } else if (score >= 5) {
      risk = 'medium';
      recommendation = 'Avaliação urgente por equipe clínica';
    } else {
      recommendation = 'Manter monitorização regular';
    }

    return {
      score,
      risk,
      interpretation: `Score NEWS 2: ${score}`,
      recommendation
    };
  }
};
