import { MedicalCalculator } from '../../../types/calculator';

export const graceCalculator: MedicalCalculator = {
  id: 'grace-score',
  name: 'GRACE 2.0 ACS Risk Score',
  category: 'cardiology',
  description: 'Predicts in-hospital and 6-month mortality in acute coronary syndrome patients',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      min: 20,
      max: 100,
      unit: 'years'
    },
    {
      id: 'heart_rate',
      label: 'Heart Rate',
      type: 'number',
      required: true,
      min: 30,
      max: 250,
      unit: 'bpm'
    },
    {
      id: 'systolic_bp',
      label: 'Systolic Blood Pressure',
      type: 'number',
      required: true,
      min: 50,
      max: 250,
      unit: 'mmHg'
    },
    {
      id: 'creatinine',
      label: 'Creatinine',
      type: 'number',
      required: true,
      min: 0.1,
      max: 15,
      step: 0.1,
      unit: 'mg/dL'
    },
    {
      id: 'killip_class',
      label: 'Killip Class',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: 'Class I - No heart failure' },
        { value: 2, label: 'Class II - Rales, S3, elevated JVP' },
        { value: 3, label: 'Class III - Pulmonary edema' },
        { value: 4, label: 'Class IV - Cardiogenic shock' }
      ]
    },
    {
      id: 'cardiac_arrest',
      label: 'Cardiac Arrest at Admission',
      type: 'checkbox',
      required: true
    },
    {
      id: 'st_deviation',
      label: 'ST-Segment Deviation',
      type: 'checkbox',
      required: true
    },
    {
      id: 'elevated_enzymes',
      label: 'Elevated Cardiac Enzymes',
      type: 'checkbox',
      required: true
    }
  ],
  calculate: (values) => {
    let score = 0;
    
    // Age points
    if (values.age <= 30) score += 0;
    else if (values.age <= 40) score += 8;
    else if (values.age <= 50) score += 25;
    else if (values.age <= 60) score += 41;
    else if (values.age <= 70) score += 58;
    else if (values.age <= 80) score += 75;
    else score += 91;

    // Heart rate points
    if (values.heart_rate < 50) score += 0;
    else if (values.heart_rate <= 70) score += 3;
    else if (values.heart_rate <= 90) score += 9;
    else if (values.heart_rate <= 110) score += 15;
    else if (values.heart_rate <= 150) score += 24;
    else if (values.heart_rate <= 200) score += 38;
    else score += 46;

    // Systolic BP points
    if (values.systolic_bp < 80) score += 58;
    else if (values.systolic_bp <= 100) score += 53;
    else if (values.systolic_bp <= 120) score += 43;
    else if (values.systolic_bp <= 140) score += 34;
    else if (values.systolic_bp <= 160) score += 24;
    else if (values.systolic_bp <= 200) score += 10;
    else score += 0;

    // Creatinine points
    if (values.creatinine < 0.4) score += 1;
    else if (values.creatinine <= 0.8) score += 3;
    else if (values.creatinine <= 1.2) score += 5;
    else if (values.creatinine <= 1.6) score += 7;
    else if (values.creatinine <= 2.0) score += 9;
    else if (values.creatinine <= 4.0) score += 15;
    else score += 20;

    // Killip class points
    score += (Number(values.killip_class) - 1) * 20;

    // Other points
    if (values.cardiac_arrest) score += 39;
    if (values.st_deviation) score += 28;
    if (values.elevated_enzymes) score += 14;

    let risk: 'low' | 'moderate' | 'high' | 'very-high';
    
    if (score <= 108) {
      risk = 'low';
    } else if (score <= 140) {
      risk = 'moderate';
    } else {
      risk = 'high';
    }

    return {
      score,
      risk,
      interpretation: `GRACE Score: ${score} points`,
      recommendation: getRecommendation(score),
      details: [
        {
          label: 'In-hospital Mortality',
          value: getInHospitalMortality(score),
          interpretation: 'Predicted mortality during hospitalization'
        },
        {
          label: '6-month Mortality',
          value: getSixMonthMortality(score),
          interpretation: 'Predicted mortality at 6 months'
        }
      ]
    };
  },
  references: [
    'Fox KA, et al. Should patients with acute coronary disease be stratified for management according to their risk? Derivation, external validation and outcomes using the updated GRACE risk score. BMJ Open. 2014;4:e004425',
    '2020 ESC Guidelines for the management of acute coronary syndromes in patients presenting without persistent ST-segment elevation',
    'GRACE 2.0 ACS Risk Calculator'
  ]
};

function getInHospitalMortality(score: number): string {
  if (score <= 108) return '< 1%';
  if (score <= 140) return '1-3%';
  return '> 3%';
}

function getSixMonthMortality(score: number): string {
  if (score <= 108) return '< 3%';
  if (score <= 140) return '3-8%';
  return '> 8%';
}

function getRecommendation(score: number): string {
  if (score <= 108) {
    return 'Low risk. Consider early non-invasive evaluation if no other high-risk features.';
  } else if (score <= 140) {
    return 'Intermediate risk. Consider early invasive strategy within 24h.';
  }
  return 'High risk. Early invasive strategy recommended within 24h. Consider immediate invasive strategy if unstable.';
}