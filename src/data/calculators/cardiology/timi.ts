import { MedicalCalculator } from '../../../types/calculator';

export const timiCalculator: MedicalCalculator = {
  id: 'timi-score',
  name: 'TIMI Risk Score for NSTEMI/UA',
  category: 'cardiology',
  description: 'Predicts 14-day mortality, new/recurrent MI, or severe recurrent ischemia requiring urgent revascularization in NSTEMI/UA patients',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'age',
      label: 'Age ≥ 65 years',
      type: 'checkbox',
      required: true
    },
    {
      id: 'cad_risk_factors',
      label: '≥ 3 CAD Risk Factors',
      type: 'checkbox',
      required: true,
      description: 'Hypertension, diabetes, family history, hyperlipidemia, current smoking'
    },
    {
      id: 'known_cad',
      label: 'Known CAD (Stenosis ≥ 50%)',
      type: 'checkbox',
      required: true
    },
    {
      id: 'aspirin',
      label: 'Aspirin use in past 7 days',
      type: 'checkbox',
      required: true
    },
    {
      id: 'severe_angina',
      label: '≥ 2 anginal events in past 24h',
      type: 'checkbox',
      required: true
    },
    {
      id: 'st_changes',
      label: 'ST deviation ≥ 0.5mm',
      type: 'checkbox',
      required: true
    },
    {
      id: 'elevated_markers',
      label: 'Elevated cardiac markers',
      type: 'checkbox',
      required: true
    }
  ],
  calculate: (values) => {
    let score = 0;
    
    if (values.age) score += 1;
    if (values.cad_risk_factors) score += 1;
    if (values.known_cad) score += 1;
    if (values.aspirin) score += 1;
    if (values.severe_angina) score += 1;
    if (values.st_changes) score += 1;
    if (values.elevated_markers) score += 1;

    let risk: 'low' | 'moderate' | 'high' | 'very-high';
    let mortality: string;
    
    if (score <= 2) {
      risk = 'low';
      mortality = '3%';
    } else if (score <= 4) {
      risk = 'moderate';
      mortality = '5-13%';
    } else if (score <= 6) {
      risk = 'high';
      mortality = '13-20%';
    } else {
      risk = 'very-high';
      mortality = '> 20%';
    }

    return {
      score,
      risk,
      interpretation: `TIMI Score: ${score} points - ${risk.toUpperCase()} RISK`,
      recommendation: getRiskRecommendation(score),
      details: [
        {
          label: 'Risk Category',
          value: risk,
          interpretation: `${mortality} risk of death/MI/urgent revascularization at 14 days`
        }
      ]
    };
  },
  references: [
    'Antman EM, et al. The TIMI risk score for unstable angina/non-ST elevation MI: A method for prognostication and therapeutic decision making. JAMA. 2000;284(7):835-842',
    'Amsterdam EA, et al. 2014 AHA/ACC Guideline for the Management of Patients with Non-ST-Elevation Acute Coronary Syndromes',
    '2020 ESC Guidelines for the management of acute coronary syndromes in patients presenting without persistent ST-segment elevation'
  ]
};

function getRiskRecommendation(score: number): string {
  if (score <= 2) {
    return 'Consider early discharge with outpatient follow-up if no other high-risk features';
  } else if (score <= 4) {
    return 'Consider admission to cardiology ward. Early invasive strategy may be beneficial';
  } else {
    return 'Recommend early invasive strategy and intensive medical therapy';
  }
}