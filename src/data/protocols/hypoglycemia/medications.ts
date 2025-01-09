import { MedicationDose } from '../../../types/emergency';

export const hypoglycemiaMedications: Record<string, MedicationDose[]> = {
  parenteral: [
    {
      drug: 'Glicose 50%',
      dose: '20-50mL',
      route: 'IV',
      notes: 'Bolus'
    },
    {
      drug: 'Glucagon',
      dose: '1mg',
      route: 'IM/SC/IN',
      notes: 'Se sem acesso IV'
    }
  ],
  // ... other medication categories
};