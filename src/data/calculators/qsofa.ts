import { MedicalCalculator } from '../../types/calculator';

export const qsofaCalculator: MedicalCalculator = {
  id: 'qsofa',
  name: 'qSOFA (Quick SOFA)',
  description: 'Avaliação rápida de disfunção orgânica relacionada à sepse',
  category: 'Sepse',
  inputs: [
    {
      id: 'respiratory_rate',
      label: 'Frequência Respiratória',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      unit: 'irpm'
    },
    {
      id: 'systolic_bp',
      label: 'Pressão Arterial Sistólica',
      type: 'number',
      required: true,
      min: 0,
      max: 300,
      unit: 'mmHg'
    },
    {
      id: 'altered_mentation',
      label: 'Alteração do Estado Mental',
      type: 'boolean',
      required: true
    }
  ],
  calculate: (values) => {
    let score = 0;
    
    if (values.respiratory_rate >= 22) score++;
    if (values.systolic_bp <= 100) score++;
    if (values.altered_mentation) score++;

    return {
      score,
      interpretation: `Score qSOFA: ${score}/3`,
      recommendation: score >= 2 
        ? 'Alto risco de desfecho desfavorável. Considerar avaliação completa para sepse.'
        : 'Baixo risco. Manter monitorização conforme quadro clínico.',
      risk: score >= 2 ? 'high' : 'low'
    };
  },
  references: [
    'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016'
  ]
};