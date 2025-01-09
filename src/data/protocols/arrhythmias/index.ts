import { EmergencyProtocol } from '../../../types/emergency';
import { arrhythmiaSteps } from './steps';
import { arrhythmiaMedications } from './medications';

export const arrhythmiasProtocol: EmergencyProtocol = {
  id: 'cardiac-arrhythmias',
  type: 'arrhythmias',
  title: 'Arritmias Cardíacas - AHA/ACC/HRS 2024',
  description: 'Protocolo de atendimento às Arritmias Cardíacas baseado nas diretrizes da American Heart Association/American College of Cardiology/Heart Rhythm Society 2024.',
  category: 'Cardiovascular',
  initialStepId: 'initial-assessment',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  source: 'AHA/ACC/HRS Guidelines',
  evidenceLevel: 'A',
  references: [
    'AHA/ACC/HRS Guidelines for Management of Patients With Ventricular Arrhythmias 2024',
    'AHA/ACC/HRS Guidelines for Management of SVT 2024',
    'Brazilian Guidelines for Cardiac Arrhythmias 2023'
  ],
  steps: arrhythmiaSteps
};