import { EmergencyProtocol } from '../../../types/emergency';
import { hypertensiveSteps } from './steps';
import { hypertensiveMedications } from './medications';

export const hypertensiveCrisisProtocol: EmergencyProtocol = {
  id: 'hypertensive-crisis',
  type: 'hypertension',
  title: 'Crise Hipertensiva - AHA/ACC 2024',
  description: 'Protocolo de atendimento à Crise Hipertensiva baseado nas diretrizes da American Heart Association/American College of Cardiology 2024.',
  category: 'Cardiovascular',
  initialStepId: 'initial-assessment',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  source: 'AHA/ACC Guidelines',
  evidenceLevel: 'A',
  references: [
    'AHA/ACC Guidelines for Hypertensive Crisis Management 2024',
    'ESC Guidelines for Arterial Hypertension 2023',
    'Brazilian Guidelines for Hypertensive Crisis 2023'
  ],
  steps: hypertensiveSteps
};