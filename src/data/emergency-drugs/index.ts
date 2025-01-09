import { EmergencyDrug } from '../../types/drugs';
import { vasopressors } from './vasopressors';

export const emergencyDrugs: EmergencyDrug[] = [
  ...vasopressors,
  // Add other drug categories as they are implemented
];