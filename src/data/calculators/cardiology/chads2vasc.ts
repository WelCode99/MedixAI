import { MedicalCalculator } from '../../../types/calculator';

export const chads2vascCalculator: MedicalCalculator = {
  id: 'chads2-vasc',
  name: 'CHA₂DS₂-VASc Score',
  category: 'cardiology',
  description: 'Estimates stroke risk in patients with atrial fibrillation to guide anticoagulation therapy',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'chf',
      label: 'Congestive Heart Failure',
      type: 'checkbox',
      required: true,
      description: 'Signs/symptoms of heart failure or reduced ejection fraction'
    },
    {
      id: 'hypertension',
      label: 'Hypertension',
      type: 'checkbox',
      required: true,
      description: 'Blood pressure >140/90 mmHg or on antihypertensive medication'
    },
    {
      id: 'age',
      label: 'Age',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '< 65 years', points: 0 },
        { value: 1, label: '65-74 years', points: 1 },
        { value: 2, label: '≥ 75 years', points: 2 }
      ]
    },
    {
      id: 'diabetes',
      label: 'Diabetes Mellitus',
      type: 'checkbox',
      required: true,
      description: 'Fasting glucose ≥126mg/dL or on diabetes medication'
    },
    {
      id: 'stroke',
      label: 'Prior Stroke/TIA/Thromboembolism',
      type: 'checkbox',
      required: true
    },
    {
      id: 'vascular',
      label: 'Vascular Disease',
      type: 'checkbox',
      required: true,
      description: 'Prior MI, peripheral artery disease, or aortic plaque'
    },
    {
      id: 'sex',
      label: 'Sex Category',
      type: 'radio',
      required: true,
      options: [
        { value: 'male', label: 'Male', points: 0 },
        { value: 'female', label: 'Female', points: 1 }
      ]
    }
  ],
  calculate: (values) => {
    let score = 0;
    
    if (values.chf) score += 1;
    if (values.hypertension) score += 1;
    score += Number(values.age);
    if (values.diabetes) score += 1;
    if (values.stroke) score += 2;
    if (values.vascular) score += 1;
    if (values.sex === 'female') score += 1;

    let risk: 'low' | 'moderate' | 'high';
    let recommendation: string;
    
    if (score === 0) {
      risk = 'low';
      recommendation = 'Anticoagulation generally not recommended';
    } else if (score === 1) {
      risk = 'moderate';
      recommendation = 'Consider oral anticoagulation based on individual risk factors and patient preferences';
    } else {
      risk = 'high';
      recommendation = 'Oral anticoagulation recommended unless contraindicated';
    }

    return {
      score,
      risk,
      interpretation: `CHA₂DS₂-VASc Score: ${score} points`,
      recommendation,
      details: [
        {
          label: 'Annual Stroke Risk',
          value: getStrokeRisk(score),
          interpretation: 'Adjusted stroke rate per year without anticoagulation'
        }
      ]
    };
  },
  references: [
    'Lip GY, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the euro heart survey on atrial fibrillation. Chest. 2010;137:263-72',
    '2020 ESC Guidelines for the diagnosis and management of atrial fibrillation',
    '2019 AHA/ACC/HRS Focused Update of the 2014 AHA/ACC/HRS Guideline for the Management of Patients With Atrial Fibrillation'
  ]
};

function getStrokeRisk(score: number): string {
  const riskTable: Record<number, string> = {
    0: '0%',
    1: '1.3%',
    2: '2.2%',
    3: '3.2%',
    4: '4.0%',
    5: '6.7%',
    6: '9.8%',
    7: '9.6%',
    8: '6.7%',
    9: '15.2%'
  };
  return riskTable[score] || '> 15.2%';
}