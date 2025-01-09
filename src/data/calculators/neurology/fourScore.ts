import { MedicalCalculator } from '../../../types/calculator';

export const fourScoreCalculator: MedicalCalculator = {
  id: 'four-score',
  name: 'FOUR Score',
  category: 'neurology',
  description: 'Full Outline of UnResponsiveness Score - Avaliação neurológica em UTI',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'eye_response',
      label: 'Resposta Ocular',
      type: 'select',
      required: true,
      options: [
        { value: '4', label: 'Olhos abertos, rastreamento ou piscando ao comando', points: 4 },
        { value: '3', label: 'Olhos abertos mas não rastreando', points: 3 },
        { value: '2', label: 'Olhos fechados mas abrem ao estímulo auditivo', points: 2 },
        { value: '1', label: 'Olhos fechados mas abrem ao estímulo doloroso', points: 1 },
        { value: '0', label: 'Olhos permanecem fechados com dor', points: 0 }
      ]
    },
    {
      id: 'motor_response',
      label: 'Resposta Motora',
      type: 'select',
      required: true,
      options: [
        { value: '4', label: 'Polegar para cima, punho fechado ou paz', points: 4 },
        { value: '3', label: 'Localiza dor', points: 3 },
        { value: '2', label: 'Flexão em resposta à dor', points: 2 },
        { value: '1', label: 'Extensão em resposta à dor', points: 1 },
        { value: '0', label: 'Sem resposta à dor ou estado mioclônico generalizado', points: 0 }
      ]
    }
  ],
  calculate: (values) => {
    let score = 0;
    Object.values(values).forEach(val => {
      score += Number(val);
    });

    let interpretation = '';
    let risk = 'moderate';

    if (score <= 4) {
      interpretation = 'Prognóstico desfavorável';
      risk = 'high';
    } else if (score <= 8) {
      interpretation = 'Prognóstico reservado';
      risk = 'moderate';
    } else {
      interpretation = 'Prognóstico favorável';
      risk = 'low';
    }

    return {
      score,
      risk,
      interpretation,
      recommendation: 'Manter monitorização neurológica contínua'
    };
  }
};
