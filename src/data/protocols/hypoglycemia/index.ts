import { EmergencyProtocol } from '../../../types/emergency';
import { hypoglycemiaSteps } from './steps';
import { hypoglycemiaMedications } from './medications';

export const hypoglycemiaProtocol: EmergencyProtocol = {
  id: 'hypoglycemia',
  type: 'metabolic',
  title: 'Hipoglicemia - ADA 2024',
  description: 'Protocolo de atendimento à Hipoglicemia baseado nos Standards of Medical Care in Diabetes da American Diabetes Association 2024.',
  category: 'Endocrinologia',
  initialStepId: 'initial-assessment',
  version: '2024.1',
  lastUpdated: new Date('2024-01-01'),
  source: 'American Diabetes Association',
  evidenceLevel: 'A',
  references: [
    'ADA Standards of Medical Care in Diabetes 2024',
    'Endocrine Society Clinical Practice Guidelines 2023',
    'Brazilian Diabetes Society Guidelines 2023'
  ],
  steps: hypoglycemiaSteps
};