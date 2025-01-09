import { MedicalCalculator } from '../../../types/calculator';

export const nihssCalculator: MedicalCalculator = {
  id: 'nihss',
  name: 'NIH Stroke Scale',
  category: 'neurology',
  description: 'Systematic assessment tool for acute stroke patients',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  evidenceLevel: 'A',
  inputs: [
    {
      id: 'consciousness',
      label: '1a. Level of Consciousness',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - Alert', points: 0 },
        { value: 1, label: '1 - Drowsy', points: 1 },
        { value: 2, label: '2 - Obtunded', points: 2 },
        { value: 3, label: '3 - Coma/Unresponsive', points: 3 }
      ]
    },
    {
      id: 'orientation',
      label: '1b. LOC Questions',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - Answers both correctly', points: 0 },
        { value: 1, label: '1 - Answers one correctly', points: 1 },
        { value: 2, label: '2 - Answers neither correctly', points: 2 }
      ]
    },
    {
      id: 'commands',
      label: '1c. LOC Commands',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - Performs both tasks', points: 0 },
        { value: 1, label: '1 - Performs one task', points: 1 },
        { value: 2, label: '2 - Performs neither task', points: 2 }
      ]
    },
    {
      id: 'gaze',
      label: '2. Best Gaze',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - Normal', points: 0 },
        { value: 1, label: '1 - Partial gaze palsy', points: 1 },
        { value: 2, label: '2 - Forced deviation', points: 2 }
      ]
    },
    {
      id: 'visual',
      label: '3. Visual Fields',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - No visual loss', points: 0 },
        { value: 1, label: '1 - Partial hemianopia', points: 1 },
        { value: 2, label: '2 - Complete hemianopia', points: 2 },
        { value: 3, label: '3 - Bilateral hemianopia', points: 3 }
      ]
    },
    {
      id: 'facial',
      label: '4. Facial Palsy',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - Normal', points: 0 },
        { value: 1, label: '1 - Minor paralysis', points: 1 },
        { value: 2, label: '2 - Partial paralysis', points: 2 },
        { value: 3, label: '3 - Complete paralysis', points: 3 }
      ]
    },
    {
      id: 'left_arm',
      label: '5a. Left Arm Motor',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - No drift', points: 0 },
        { value: 1, label: '1 - Drift', points: 1 },
        { value: 2, label: '2 - Some effort against gravity', points: 2 },
        { value: 3, label: '3 - No effort against gravity', points: 3 },
        { value: 4, label: '4 - No movement', points: 4 }
      ]
    },
    {
      id: 'right_arm',
      label: '5b. Right Arm Motor',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - No drift', points: 0 },
        { value: 1, label: '1 - Drift', points: 1 },
        { value: 2, label: '2 - Some effort against gravity', points: 2 },
        { value: 3, label: '3 - No effort against gravity', points: 3 },
        { value: 4, label: '4 - No movement', points: 4 }
      ]
    },
    {
      id: 'left_leg',
      label: '6a. Left Leg Motor',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - No drift', points: 0 },
        { value: 1, label: '1 - Drift', points: 1 },
        { value: 2, label: '2 - Some effort against gravity', points: 2 },
        { value: 3, label: '3 - No effort against gravity', points: 3 },
        { value: 4, label: '4 - No movement', points: 4 }
      ]
    },
    {
      id: 'right_leg',
      label: '6b. Right Leg Motor',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - No drift', points: 0 },
        { value: 1, label: '1 - Drift', points: 1 },
        { value: 2, label: '2 - Some effort against gravity', points: 2 },
        { value: 3, label: '3 - No effort against gravity', points: 3 },
        { value: 4, label: '4 - No movement', points: 4 }
      ]
    },
    {
      id: 'ataxia',
      label: '7. Limb Ataxia',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - Absent', points: 0 },
        { value: 1, label: '1 - Present in one limb', points: 1 },
        { value: 2, label: '2 - Present in two limbs', points: 2 }
      ]
    },
    {
      id: 'sensory',
      label: '8. Sensory',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - Normal', points: 0 },
        { value: 1, label: '1 - Mild loss', points: 1 },
        { value: 2, label: '2 - Severe loss', points: 2 }
      ]
    },
    {
      id: 'language',
      label: '9. Best Language',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - No aphasia', points: 0 },
        { value: 1, label: '1 - Mild aphasia', points: 1 },
        { value: 2, label: '2 - Severe aphasia', points: 2 },
        { value: 3, label: '3 - Mute/global aphasia', points: 3 }
      ]
    },
    {
      id: 'dysarthria',
      label: '10. Dysarthria',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - Normal', points: 0 },
        { value: 1, label: '1 - Mild', points: 1 },
        { value: 2, label: '2 - Severe', points: 2 }
      ]
    },
    {
      id: 'extinction',
      label: '11. Extinction/Inattention',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - No abnormality', points: 0 },
        { value: 1, label: '1 - Mild', points: 1 },
        { value: 2, label: '2 - Severe', points: 2 }
      ]
    }
  ],
  calculate: (values) => {
    const score = Object.values(values).reduce((sum, value) => sum + Number(value), 0);
    
    let severity: 'low' | 'moderate' | 'high' | 'very-high';
    if (score <= 4) severity = 'low';
    else if (score <= 15) severity = 'moderate';
    else if (score <= 25) severity = 'high';
    else severity = 'very-high';

    return {
      score,
      risk: severity,
      interpretation: `NIHSS Score: ${score} points - ${severity.toUpperCase()} SEVERITY`,
      recommendation: getRecommendation(score),
      details: [
        {
          label: 'Stroke Severity',
          value: severity,
          interpretation: getInterpretation(score)
        },
        {
          label: 'Thrombolysis Consideration',
          value: score >= 4 && score <= 25 ? 'Candidate' : 'May not be candidate',
          interpretation: 'Based on NIHSS criteria alone'
        }
      ]
    };
  },
  references: [
    'Brott T, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20:864-870',
    'Lyden P. Using the National Institutes of Health Stroke Scale. Stroke. 2017;48:513-519',
    '2019 Update to the 2018 Guidelines for the Early Management of Acute Ischemic Stroke'
  ]
};

function getInterpretation(score: number): string {
  if (score <= 4) return 'Minor stroke';
  if (score <= 15) return 'Moderate stroke';
  if (score <= 25) return 'Severe stroke';
  return 'Very severe stroke';
}

function getRecommendation(score: number): string {
  if (score <= 4) {
    return 'Consider for TIA workup if symptoms resolved. Monitor for progression.';
  } else if (score <= 25) {
    return 'Evaluate for acute reperfusion therapy if within time window. Consider for clinical trials.';
  }
  return 'High risk of complications. Consider intensive care monitoring. Poor prognosis.';
}