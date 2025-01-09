
import { MedicalCalculator } from '../../../types/calculator';

export const framinghamDiabetesCalculator: MedicalCalculator = {
  id: 'framinghamDiabetes',
  name: 'Framingham Diabetes Risk Score',
  category: 'endocrinology',
  description: 'Estimates risk of developing diabetes based on Framingham data',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'B',
  inputs: [
    {
      id: 'age',
      label: 'Age (years)',
      type: 'number',
      required: true,
      min: 18,
      max: 99,
      step: 1,
    },
    {
      id: 'bmi',
      label: 'BMI',
      type: 'number',
      required: true,
      min: 15,
      max: 50,
      step: 0.1,
    },
    {
      id: 'hdl',
      label: 'HDL Cholesterol (mg/dL)',
      type: 'number',
      required: true,
      min: 10,
      max: 100,
      step: 1,
    },
    {
      id: 'bpMed',
      label: 'On Blood Pressure Medication',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'No' },
        { value: '1', label: 'Yes' }
      ]
    }
  ],
  calculate: (values) => {
    const agePoints = Math.floor((Number(values.age) - 20) / 5);
    const bmiPoints = Math.floor((Number(values.bmi) - 18) / 3);
    const hdlPoints = Number(values.hdl) < 40 ? 2 : 0;
    const bpPoints = Number(values.bpMed) ? 1 : 0;
    const score = agePoints + bmiPoints + hdlPoints + bpPoints;
    let interpretation = 'Low risk of diabetes';
    if (score >= 8) interpretation = 'Elevated risk of diabetes';
    return {
      score,
      risk: score >= 8 ? 'high' : 'moderate',
      interpretation,
      recommendation: 'Lifestyle modifications and regular screening recommended'
    };
  },
  references: [
    'Wilson PW, et al. Prediction of incident diabetes mellitus in middle-aged adults. The Framingham Offspring Study. Arch Intern Med. 2007;167:1068-1074.'
  ]
};