
import { MedicalCalculator } from '../../../types/calculator';

export const hasBledCalculator: MedicalCalculator = {
  id: 'hasBled',
  name: 'HAS-BLED Score',
  category: 'cardiology',
  description: 'Estimates risk of major bleeding in patients with atrial fibrillation',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'hypertension',
      label: 'Uncontrolled Hypertension',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'No', points: 0 },
        { value: '1', label: 'Yes', points: 1 }
      ]
    },
    {
      id: 'abnormal_renal_liver',
      label: 'Renal/Liver Disease',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'No', points: 0 },
        { value: '1', label: 'Yes (one)', points: 1 },
        { value: '2', label: 'Yes (both)', points: 2 }
      ]
    },
    {
      id: 'stroke_history',
      label: 'Stroke History',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'No', points: 0 },
        { value: '1', label: 'Yes', points: 1 }
      ]
    },
    {
      id: 'bleeding_history',
      label: 'Bleeding History or Predisposition',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'No', points: 0 },
        { value: '1', label: 'Yes', points: 1 }
      ]
    },
    {
      id: 'labile_inr',
      label: 'Labile INR',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'No', points: 0 },
        { value: '1', label: 'Yes', points: 1 }
      ]
    },
    {
      id: 'elderly',
      label: 'Age > 65',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'No', points: 0 },
        { value: '1', label: 'Yes', points: 1 }
      ]
    },
    {
      id: 'drugs_alcohol',
      label: 'Drugs/Alcohol',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'No', points: 0 },
        { value: '1', label: 'Yes (one)', points: 1 },
        { value: '2', label: 'Yes (both)', points: 2 }
      ]
    }
  ],
  calculate: (values) => {
    let score = 0;
    Object.values(values).forEach(val => {
      score += Number(val);
    });
    let interpretation = 'Low risk';
    if (score >= 3) interpretation = 'High risk';
    return {
      score,
      risk: score >= 3 ? 'high' : 'moderate',
      interpretation,
      recommendation: 'Consider close monitoring and bleeding risk mitigation'
    };
  },
  references: [
    'Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess bleeding risk in anticoagulated AF patients. Chest. 2010;138(5):1093-1100.'
  ]
};