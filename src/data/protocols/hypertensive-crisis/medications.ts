import { MedicationDose } from '../../../types/emergency';

export const hypertensiveMedications: Record<string, MedicationDose[]> = {
  emergency: [
    {
      drug: 'Nitroprussiato',
      dose: '0.3-10 mcg/kg/min',
      route: 'IV',
      notes: 'Titular cada 2min'
    },
    {
      drug: 'Nitroglicerina',
      dose: '5-200 mcg/min',
      route: 'IV',
      notes: 'Se SCA/ICC'
    }
  ],
  // ... other medication categories
};